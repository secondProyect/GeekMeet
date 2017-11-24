const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/geekmeet', {useMongoClient: true});
const Game = require('../models/Game');

const games = [
  {
    name: 'Dragones y Mazmorras',
    description: "DnD es un juego que se trata de ponerse en la piel de un héroe fantástico, sea un guerrero, un mago, un cazador o un príncipe miedoso, mujeriego y capaz de venderle piedras a la gente como si fuesen oro, un juego en donde lo importante no es lo que ves sobre la mesa, si no lo que ves en tu cabeza",
    maxPlayers: 9
  },
  {
    name: "Saboteur",
    description: "Los jugadores se convierten en enanos buscadores de oro, que trabajan como mineros, excavando profundos túneles en la montaña en busca de tesoros, o en enanos saboteadores, que obstaculizan la búsqueda del oro de los demás. Los miembros de cada grupo deben apoyarse entre sí, aunque sólo pueden suponer cuál es el papel de los demás. Si los mineros consiguen crear un túnel hasta el tesoro, ganarán pepitas de oro, mientras que los saboteadores se irán con las manos vacías. Pero, si los mineros fallan, los saboteadores conseguirán el premio. ",
    maxPlayers: 10
  },
  {
    name: "Carcassonne",
    description: "La ciudad de Carcasona, en el sureste de Francia, es famosa por su ciudadela amurallada que data de la época romana y medieval. Los jugadores intentarán hacer fortuna situando a sus seguidores en los caminos, ciudades, monasterios y granjas que hay en la región, una región que irá cambiando a medida que avance el juego. Disponer acertadamente a estos seguidores, ya sean bandidos, caballeros, monjes o campesinos, será indispensable para alcanzar la victoria.",
    maxPlayers: 5
  },
  {
    name: "Monopoly",
    description: "Monopoly es uno de los juegos de mesa comerciales más vendidos del mundo. Como el nombre sugiere, el objetivo del juego es hacer unmonopolio de oferta, poseyendo todas las propiedades inmuebles que aparecen en el juego.",
    maxPlayers: 6
  },
  {
    name: "Alta Tension",
    description: "Alta Tensión es un juego creado por el conocido autor alemán Friedemann Friese y es considerado como uno de los mejores juegos de tablero de todos los tiempos. En este emocionante juego, los jugadores compiten por el control en la gestión eléctrica de un país, construyendo centrales eléctricas, incluyendo nuevas ciudades en su red y gestionando con cuidado los recursos de los que dependen",
    maxPlayers: 6
  },
  {
    name: "Colonos de Cátan",
    description: "Se trata de un juego que aúna la estrategia, la astucia y la capacidad para negociar y en el que los jugadores tratan de colonizar una isla, Catán, rica en recursos naturales. El objetivo es construir pueblos, ciudades y caminos sobre un tablero que es distinto cada vez, mientras se van acumulando varios tipos de cartas. Todos estos elementos proporcionan distintas puntuaciones, ganando la partida el primer jugador que llega a los diez puntos.",
    maxPlayers: 4
  },
  {
    name: "Risk",
    description: "Es un juego de estrategia basado en las Guerras Naponeólicas. Tu objetivo es simple: conquistar territorios enemigos creando un ejército, moviendo sus tropas y luchando en batallas. Dependiendo del resultado de los dados, ¡un jugador vencerá al enemigo o será vencido! Este emocionante juego está lleno de traiciones, alianzas y ataques sorpresa. En el campo de batalla, ¡todo puede ocurrir! Derrota todas las tropas enemigas en un territorio para conquistar ese territorio ¡y estar un paso más cerca de la conquista global! El jugador que complete primero su misión secreta -y revele la carta de Misión Secreta para demostrarlo - gana.",
    maxPlayers: 6
  },
  {
    name: "Bang",
    description: "Bang! es un popular juego de cartas al estilo Wild West, entre un grupo de Forajidos (Outlaws) y el Sheriff, (su enemigo). Están los Alguaciles (aliados del Sheriff), pero también hay un Renegado que ¡sólo persigue sus propios intereses!. En BANG! cada persona juega en un papel representando un famoso personaje inspirado en el Lejano Oeste.",
    maxPlayers: 7
  },
  {
    name: "Munchkin",
    description: "Munchkin es un juego de cartas de rol cuyo lema resume el objetivo del juego: Mata a los monstruos, roba el tesoro, apuñala a tus amigos. En Munchkin, un jugador empieza siendo un humano de nivel 1 sin clase y su objetivo consiste en alcanzar el nivel 10 antes de que los demás consigan hacerlo. Para ello, cada jugador debe enfrentarse a monstruos enclaustrados en mazmorras, superar maldiciones y emplear sabiamente el equipamiento encontrado en dichas mazmorras.",
    maxPlayers: 5
  },
  {
    name: "Ciudadelas",
    description: "Construye la Ciudadela más grande, con la Catedral más bella, el Ayuntamiento más imponente y un Castillo que haga que tus enemigos se lo piensen dos veces antes de atacar. Métete en la piel del Rey, del Obispo, del Mercader o incluso de los temibles Ladrón y Asesino. Si tu Ciudadela prospera, serás el ganador. ",
    maxPlayers: 7
  },
];

Game.create(games, (err, docs) => {
  if (err) {
    throw err;
  }
  games.forEach(e=>console.log(e.name));
  mongoose.connection.close();
});
