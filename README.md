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

## Precisão

A física dos corpos segue o **modelo kepleriano** com precessões seculares (nodal e apsidal), baseado em elementos orbitais para a época J2000 (1º de janeiro de 2000 às 10h no Horário de Brasília).

Isso significa que a posição dos corpos celestes em qualquer instante é determinada por informações sobre suas órbitas, como o **semi-eixo maior, inclinação, longitude do nó ascendente, argumento do periápside, excentricidade e anomalia média**, essas duas últimas sendo usadas para calcular a anomalia excêntrica, através da equação de Kepler, e a anomalia verdadeira, que é a posição real do corpo em sua órbita elíptica.

O movimento de translação é completado com a utilização do **período orbital e as precessões** do nodo ascendente e do argumento do periápside.

Diferente de modelos n-body e modelos numéricos completos, o modelo com base kepleriana não considera perturbações gravitacionais, que podem resultar em órbitas altamente variáveis ao longo do tempo. Por esse motivo, quanto mais longe do J2000, a posição de algumas luas deve apresentar desvios em relação a um modelo mais preciso, como o Eyes on the Solar System, da NASA.

Na tentativa de mitigar essas imprecisões, foram feitos alguns ajustes finos nos dados de precessão apsidal e nodal, e períodos orbitais. Os exemplos de correções mais extremas são as luas Valetudo, S/2003 J 23, S/2022 J 1 e S/2022 J 2 de Júpiter, e as luas Bestla, Skrymir, S/2004 S 7 e S/2019 S 6 de Saturno.

Com relação ao movimento de rotação, o principal desafio é inclinar o eixo de rotação do corpo celeste na direção correta. Sabemos que a Terra é tombada cerca de 23° em relação ao plano de sua órbita, mas para que lado ocorre essa inclinação? Para os principais planetas do Sistema Solar e para a nossa Lua foram utilizados dados disponíveis sobre a **ascensão reta e a declinação (RA/DEC)** para calcular o vetor do norte polar e inclinar os objetos corretamente, por meio de quarteniões.

Isso é particularmente importante nos casos de Saturno, que mantém seus anéis orientados exatamente como na vida real durante todo o período de simulação, além de Urano que possui uma obliquidade extrema, fazendo com que o planeta gire de lado como se estivesse rolando sobre sua órbita.

A estratégia de coordenadas RA/DEC também foi adotada para construir o **plano de Laplace** dos satélites mais próximos de seus planetas, que costumam orbitar próximos ao plano equatorial do corpo primário. As demais luas, quando existentes, são referenciadas a partir da **Eclíptica**, seguindo o referencial adotado pelo sistema Horizons.

# Credits

O banco de dados foi construído a partir da API [Le système solaire à portée de votre souris](https://api.le-systeme-solaire.net/), apesar de bastante modificada e atualizada com dados do [Horizons System, do Jet Propulsion Laboratory da NASA](https://ssd.jpl.nasa.gov/).

As texturas dos planetas, planetas-anões, Sol e Lua foram fornecidas pelo [Solar System Scope](https://www.solarsystemscope.com/textures/). Já as demais texturas foram baixadas dos sites [Free PBR](https://freepbr.com/), [Deviant Art](http://deviantart.com/) e [JPL/NASA](https://www.jpl.nasa.gov/).

O modelo usado para representar corpos sem equilíbrio hidrostático foi construído por Pasquill e disponibilizado em [Sketchfab](https://sketchfab.com/3d-models/asteroid-low-poly-9a43ef48a70647188576ccb5987b7e64).

A ideia do projeto nasceu de um curso básico de Three.js do canal [Zero to Mastery](https://www.youtube.com/watch?v=KM64t3pA4fs), no YouTube.

# Agradecimento

Agradeço sempre ao pessoal do [The Odin Project](https://www.theodinproject.com/) que me forneceu toda a base para me tornar um desenvolvedor web.

E ao Jet Propulsion Laboratory da NASA, por disponibilizar gratuitamente os dados orbitais de todos os objetos do Sistema Solar para a população, e ainda responder rapidamente e-mails de suporte técnico.
