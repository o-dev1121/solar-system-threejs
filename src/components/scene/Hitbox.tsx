import { Vector3, Group } from 'three';
import { Line2, LineSegments2 } from 'three/examples/jsm/Addons.js';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { Text, TextProps, Line } from '@react-three/drei';
import { useContext, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';

import useStickySize from '../../hooks/useStickySize';
import useDistanceCulling from '../../hooks/useDistanceCulling';
import LayerContext from '../../contexts/LayerContext';
import CameraContext from '../../contexts/CameraContext';
import CustomBillboard from './CustomBillboard';
import { getActiveLOD } from '../../utils/scene';
import { hitboxConfig } from '../../constants/ui';
import { useNavigate } from 'react-router-dom';

export default function Hitbox({
  bodyRef,
  circleRef,
  orbitRef,
  bodyRadius,
  bodyType,
  labelTitle,
  labelColor = 'white',
  circleColor = 'white',
  farStart,
  farEnd,
  nearStart,
  nearEnd,
}: {
  bodyRef: React.RefObject<Group | null>;
  circleRef: React.RefObject<Line2 | LineSegments2 | null>;
  orbitRef?: React.RefObject<Line2 | LineSegments2 | null>;
  bodyRadius: number;
  bodyType: BodyTypeOptions;
  labelTitle?: string;
  labelColor?: string;
  circleColor?: string;
  farStart?: number;
  farEnd?: number;
  nearStart?: number;
  nearEnd?: number;
}) {
  const hitboxRef = useRef<Group>(null);
  const lineRef = useRef<Line2>(null);
  const labelRef = useRef<TextProps>(null);
  const opacityRef = useRef(1);
  const visibilityRef = useRef(true);

  const { getLayer } = useContext(LayerContext);
  const { handleFocus } = useContext(CameraContext);

  const navigate = useNavigate();

  const labelLayer = getLayer('label', bodyType);
  const circleLayer = getLayer('hitbox', bodyType);

  const [pointerDownElement, setPointerDownElement] = useState<string>();

  useDistanceCulling({
    farStart,
    farEnd,
    nearStart,
    nearEnd,
    reference: bodyRef,
    targets: [lineRef, labelRef],
    visibilityRef,
    opacityRef,
  });

  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.material.opacity = opacityRef.current;
    }
  }, -2);

  useStickySize(hitboxRef, bodyRef, hitboxConfig.RADIUS, bodyRadius);

  const circlePoints = useMemo(() => {
    const points = [];
    const segments = 32;

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * 2 * Math.PI;
      const x = hitboxConfig.RADIUS * Math.cos(angle);
      const y = hitboxConfig.RADIUS * Math.sin(angle);
      points.push(new Vector3(x, y, 0));
    }

    return points;
  }, [hitboxConfig.RADIUS]);

  function handlePointerDown(e: ThreeEvent<PointerEvent>) {
    setPointerDownElement(e.object.uuid);
  }

  function handlePointerUp(e: ThreeEvent<PointerEvent>) {
    if (
      !bodyRef.current ||
      !visibilityRef.current ||
      !hitboxRef.current?.visible ||
      pointerDownElement !== e.object.uuid
    ) {
      return;
    }

    navigate(`corpos/${bodyRef.current.name}`);
    handleFocus(bodyRef.current.name);
    setPointerDownElement(undefined);
  }

  function handlePointerEnter() {
    if (
      !circleRef.current ||
      !visibilityRef.current ||
      !hitboxRef.current?.visible
    )
      return;

    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.classList.remove('cursor-grab');
      canvas.classList.remove('active:cursor-grabbing');
      canvas.classList.add('cursor-pointer');
    }

    gsap.to(circleRef.current.scale, {
      x: 1.3,
      y: 1.3,
      ease: 'power1.out',
      duration: 0.2,
    });

    if (orbitRef?.current) {
      const orbitLine = getActiveLOD(orbitRef.current) as Line2;
      if (orbitLine) orbitLine.material.linewidth = 2.5;
    }
    const lineMaterial = lineRef?.current?.material;
    if (lineMaterial) lineMaterial.linewidth = 2.5;
  }

  function handlePointerLeave() {
    if (
      !circleRef.current ||
      !visibilityRef.current ||
      !hitboxRef.current?.visible
    )
      return;

    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.classList.remove('cursor-pointer');
      canvas.classList.add('cursor-grab');
      canvas.classList.add('active:cursor-grabbing');
    }

    gsap.to(circleRef.current.scale, {
      x: 1,
      y: 1,
      ease: 'power1.out',
      duration: 0.2,
    });

    if (orbitRef?.current) {
      const orbitLine = getActiveLOD(orbitRef.current) as Line2;
      if (orbitLine) orbitLine.material.linewidth = 1.3;
    }
    const lineMaterial = lineRef?.current?.material;
    if (lineMaterial) lineMaterial.linewidth = 1.3;
  }

  return (
    <group
      ref={hitboxRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      name="hitbox"
    >
      <group ref={circleRef}>
        <Line
          ref={lineRef}
          visible={circleLayer?.value}
          points={circlePoints}
          color={circleColor}
          lineWidth={1.3}
          transparent
          opacity={opacityRef.current}
          depthWrite={false}
        />

        <mesh>
          <circleGeometry args={[hitboxConfig.RADIUS, 16]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>

      {labelTitle && (
        <CustomBillboard priority={-2} visible={labelLayer?.value}>
          <Text
            ref={labelRef}
            position={[0, hitboxConfig.RADIUS + 1, 0]}
            fontWeight={hitboxConfig.FONT_WEIGHT[bodyType]}
            fontSize={hitboxConfig.FONT_SIZE[bodyType]}
            letterSpacing={hitboxConfig.LETTER_SPACING[bodyType]}
            color={labelColor}
            anchorX="left"
            anchorY="bottom"
            textAlign="left"
          >
            {bodyType === 'moon' ? labelTitle : labelTitle.toUpperCase()}
          </Text>
        </CustomBillboard>
      )}
    </group>
  );
}
