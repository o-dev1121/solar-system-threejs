# NOVA ORBIS

NOVA ORBIS is a 3D scale model of the Solar System, built with Three.js using real data primarily sourced from NASA's Horizons system.

## Key Features

- **Installable and Offline:** Nova Orbis is a Progressive Web App (PWA), allowing you to install it on your mobile or desktop device, with offline navigation support after the first access with internet;

- **Time Machine:** speed up time, go back to the past, or enter a custom date to see what the Solar System looked like at the exact moment you were born;

- **Celestial Body Info:** search for a planet or moon to discover details like orbital period, average temperature, and more.

- **Layer Control:** toggle layers such as labels and orbit lines, or enable ambient lighting for areas not lit by the sun.

- **Responsive Design:** access the app on mobile or resize the window without losing features.

- **Optimized Performance:** uses culling, LOD, lazy loading, KTX2 textures, and other techniques for smooth performance with thousands of polygons.

## Points of Interest

The scene includes all planets, dwarf planets, their natural satellites, dozens of asteroids, and major comets.

Saturn is always a standout with its intricate ring system. Get up close to see the thousands of particles making up the gas giant’s rings.


Uranus, Neptune, and Jupiter also have ring systems — but did you know that the dwarf planet Haumea and the centaur Chariklo have rings too?

Another exciting event in the Solar System is the release of gas from active comets as they approach the Sun. Solar radiation and wind cause a glowing coma around the nucleus and a tail of gas and dust. Use the time machine to position a comet before Jupiter’s orbit and watch the phenomenon unfold.

And of course, don’t miss admiring our blue planet floating in space with its atmospheric layer and sunlight-based shader effects. Depending on the date, you might even catch a solar eclipse with the Moon's shadow cast on Earth—or witness a comet like Halley passing by.

## Accuracy

The physics of the celestial bodies follows the **Keplerian model** with secular precession (nodal and apsidal), based on orbital elements from epoch J2000 (January 1, 2000 at 10 a.m. Brasília time).

This means the position of celestial bodies at any given moment is determined using orbital information such as **semi-major axis, inclination, longitude of the ascending node, argument of periapsis, eccentricity, and mean anomaly** — the latter two used to calculate eccentric anomaly via Kepler’s equation and the true anomaly, which gives the body’s actual position in its elliptical orbit.

Orbital movement is further defined using the **orbital period and precessions** of the ascending node and argument of periapsis.

Unlike n-body or full numerical models, the Kepler-based approach doesn’t account for gravitational perturbations, which can lead to significant orbital variations over time. As a result, positions of some moons may deviate from more accurate models—like NASA’s Eyes on the Solar System—the farther the date is from J2000.

To reduce these inaccuracies, fine adjustments were made to apsidal/nodal precession and orbital periods. Some of the most corrected examples include Jupiter’s moons Valetudo, S/2003 J 23, S/2022 J 1, S/2022 J 2, and Saturn’s moons Bestla, Skrymir, S/2004 S 7, and S/2019 S 6.

For rotational movement, the main challenge is properly tilting a body's axis. For example, Earth tilts about 23°, but which direction does it tilt? For major planets and Earth’s Moon, **right ascension and declination (RA/DEC)** data were used to calculate the north pole vector and apply correct orientation using quaternions.

This is especially important for Saturn, whose rings remain correctly oriented, and Uranus, which has extreme tilt, making it roll along its orbit.

The RA/DEC method was also used to construct the **Laplace plane** for satellites orbiting close to their planets, which typically follow the planet’s equatorial plane. Other moons are referenced from the **Ecliptic plane**, aligning with the Horizons system.

# Credits

O banco de dados foi construído a partir da API [Le système solaire à portée de votre souris](https://api.le-systeme-solaire.net/), apesar de bastante modificada e atualizada com dados do [Horizons System, do Jet Propulsion Laboratory da NASA](https://ssd.jpl.nasa.gov/).

As texturas dos planetas, planetas-anões, Sol e Lua foram fornecidas pelo [Solar System Scope](https://www.solarsystemscope.com/textures/). Já as demais texturas foram baixadas dos sites [Free PBR](https://freepbr.com/), [Deviant Art](http://deviantart.com/) e [JPL/NASA](https://www.jpl.nasa.gov/).

O modelo usado para representar corpos sem equilíbrio hidrostático foi construído por Pasquill e disponibilizado em [Sketchfab](https://sketchfab.com/3d-models/asteroid-low-poly-9a43ef48a70647188576ccb5987b7e64).

A ideia do projeto nasceu de um curso básico de Three.js do canal [Zero to Mastery](https://www.youtube.com/watch?v=KM64t3pA4fs), no YouTube.

# Agradecimento

Agradeço sempre ao pessoal do [The Odin Project](https://www.theodinproject.com/) que me forneceu toda a base para me tornar um desenvolvedor web.

E ao Jet Propulsion Laboratory da NASA, por disponibilizar gratuitamente os dados orbitais de todos os objetos do Sistema Solar para a população, e ainda responder rapidamente e-mails de suporte técnico.
