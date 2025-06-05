import { useMemo } from 'react';
import { Group } from 'three';
import { Detailed } from '@react-three/drei';
import { toModelScale } from '../utils';
import IrregularBody from './IrregularBody';
import useFocusOnBody from '../hooks/useFocusOnBody';

export default function Body({
  bodyRef,
  id,
  meanRadius,
  scaledEquaRadius,
  scaledPolarRadius,
  dimension,
  material,
  atmosphere,
  shine,
}: {
  bodyRef: React.RefObject<Group | null>;
  id: string;
  meanRadius: number;
  scaledEquaRadius: number;
  scaledPolarRadius: number;
  dimension?: string;
  material: React.ReactNode;
  atmosphere?: React.ReactNode;
  shine?: React.ReactNode;
}) {
  useFocusOnBody(id, bodyRef);

  const geometryInfo = useMemo(() => {
    let initialRadius: number;
    let deformation: [x: number, y: number, z: number];

    if (dimension && (!meanRadius || meanRadius < 150)) {
      const xyz = dimension.split('x').map(Number);
      initialRadius = 1;
      deformation = [
        toModelScale(xyz[0]) / 2,
        toModelScale(xyz[2]) / 2,
        toModelScale(xyz[1]) / 2,
      ];
    } else {
      const flattening = scaledPolarRadius / scaledEquaRadius;
      initialRadius = scaledEquaRadius;
      deformation = [1, flattening, 1];
    }

    return { initialRadius, deformation };
  }, []);

  const detailLevels = [
    { segments: 64, distance: 0 },
    { segments: 32, distance: 100 },
    { segments: 16, distance: 500 },
  ];

  return (
    <group ref={bodyRef} name={id}>
      {meanRadius < 150 ? (
        <IrregularBody geometryInfo={geometryInfo} />
      ) : (
        <Detailed distances={detailLevels.map((level) => level.distance)}>
          {detailLevels.map(({ segments }, index) => (
            <mesh key={index} scale={geometryInfo.deformation}>
              <sphereGeometry
                args={[geometryInfo.initialRadius, segments, segments]}
              />
              {material}
              {atmosphere}
              {shine}
            </mesh>
          ))}
        </Detailed>
      )}
    </group>
  );
}
