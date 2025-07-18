import { useEffect, useState } from 'react';

export default function useFetchBodies() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    sun?: BodyType;
    planets?: BodyType[];
    moons?: BodyType[];
    dwarfPlanets?: BodyType[];
    asteroids?: BodyType[];
    comets?: BodyType[];
  }>({});

  useEffect(() => {
    setLoading(true);

    fetch('/data/bodies.json')
      .then((res) => {
        if (!res.ok)
          throw new Error(`Erro ao carregar bodies.json: ${res.statusText}`);
        return res.json();
      })
      .then((bodies: BodyType[]) => {
        // prettier-ignore
        setData({
          sun: bodies.find((body) => body.bodyType === 'star'),
          planets: bodies.filter((body) => body.bodyType === 'planet'),
          moons: bodies.filter((body) => body.bodyType === 'moon'),
          dwarfPlanets: bodies.filter((body) => body.bodyType === 'dwarf-planet'),
          asteroids: bodies.filter((body) => body.bodyType === 'asteroid'),
          comets: bodies.filter((body) => body.bodyType === 'comet'),
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
