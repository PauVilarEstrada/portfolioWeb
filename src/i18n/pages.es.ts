import type { PagesDict } from "./pages.en";

export const pagesEs: PagesDict = {
  common: {
    back: "Volver a proyectos",
    repo: "Código en GitHub ↗",
    tech: "Stack técnico",
  },

  pacman: {
    label: "Juego en Java · Diseño orientado a objetos",
    title: "Pacman Remake",
    subtitle:
      "El clásico arcade de 1980 reconstruido desde cero en **Java** — mismas reglas, envoltorio moderno: personajes seleccionables, **mapas personalizados cargados desde ficheros**, una IA de fantasmas que aprieta según sube tu puntuación y una máquina de estados limpia detrás de todo.",
    tags: ["Java", "POO", "Game loop", "IA de fantasmas", "Niveles propios"],
    ctaHow: "Cómo funciona",
    specs: [
      { v: "Java", l: "Lenguaje" },
      { v: "POO", l: "Arquitectura" },
      { v: "Grid", l: "Motor de tiles" },
      { v: "4", l: "Fantasmas" },
      { v: "∞", l: "Mapas propios" },
    ],
    gameTitle: "El juego",
    gameP:
      "Limpia el tablero sin que te pillen. El laberinto es una rejilla de tiles, los puntos están sobre las casillas transitables y cuatro fantasmas te buscan desde cuatro direcciones distintas. Cómete un power pellet y la caza se invierte durante unos segundos — la parte que convierte al Pacman en un juego de timing y no de reflejos.",
    gameCaption: "El tablero principal — puntos, power pellets y cuatro fantasmas de patrulla.",
    menuTitle: "Empezamos: menú y personajes",
    menuKicker: "Menú principal",
    menuH: "Una pantalla y todo a mano",
    menuP:
      "Empezar, elegir personaje, cargar un mapa propio o abrir los ajustes — sin submenús donde perderse. El menú es su propio estado en la máquina, así que el mundo del juego ni siquiera se instancia hasta que pulsas jugar.",
    charKicker: "Selección de personaje",
    charH: "Elige quién se come los puntos",
    charP:
      "Los personajes son pura presentación — sprites y color — y se intercambian al aparecer. La física, la hitbox y la velocidad son idénticas, así que tener favorito nunca cambia la dificultad.",
    mapsTitle: "Mapas propios — el tablero es dato, no código",
    mapsP:
      "Un nivel es un fichero de rejilla. El parser lo lee a una matriz de tiles y el renderer dibuja lo que encuentra, así que un laberinto nuevo está a un fichero de texto de distancia: dibuja los muros, coloca los puntos, marca los spawns y juega. Los niveles incluidos son simplemente los primeros escritos así.",
    mapsKicker: "Nivel personalizado",
    mapsH: "Carga tu propio laberinto",
    mapsP2:
      "Como muros, puntos y spawns son solo tipos de tile, el juego valida el mapa al cargarlo — un laberinto sin puntos o sin spawn sencillamente no arranca, en vez de reventar a mitad del primer frame.",
    mapCap1: "Un segundo trazado — pasillos más estrechos y menos escapatorias",
    mapCap2: "Nivel dos, construido con el mismo vocabulario de tiles",
    ghostTitle: "Los fantasmas son la curva de dificultad",
    ghostKicker: "Persecución y dispersión",
    ghostH: "Cuatro cazadores, cuatro ángulos",
    ghostP1:
      "Cada fantasma apunta a una *casilla*, no al jugador en sí — uno va a por ti, otro se adelanta, otro cubre la esquina hacia la que vas. Como sus objetivos difieren, te acaban haciendo una pinza en lugar de formar una fila detrás de ti.",
    ghostP2:
      "Además alternan entre perseguir y dispersarse a sus esquinas, que es lo que le da ritmo al tablero: presión, respiro, presión. A medida que sube la puntuación, las fases de persecución se alargan y las de dispersión se acortan.",
    howTitle: "Cómo está construido",
    howP:
      "Todo es Java puro con un diseño orientado a objetos — sin motor y sin framework. Cada mecánica de abajo está escrita a mano, que es exactamente lo que hacía que valiera la pena el proyecto.",
    build: [
      { t: "Sistema de entidades", p: "Pacman, los fantasmas, los muros y los puntos extienden una entidad base con posición, velocidad y método de render. Añadir un actor nuevo es heredar, no tocar el bucle." },
      { t: "Game loop", p: "Un bucle de paso fijo avanza cada entidad, resuelve colisiones y redibuja el tablero. La entrada se encola en vez de aplicarse al instante, así que un giro pulsado justo antes de un cruce sigue contando — eso es lo que hace que los controles se sientan finos." },
      { t: "Parser de mapas", p: "Los niveles son ficheros de rejilla: muros, puntos, power pellets y spawns. El parser convierte el fichero en una matriz de tiles, y por eso añadir un mapa nuevo no requiere una sola línea de código." },
      { t: "Colisiones", p: "AABB contra la rejilla para los muros y contra las cajas de entidad para puntos y fantasmas — barato, determinista e inmune al tunneling de las comprobaciones por distancia." },
      { t: "IA de fantasmas", p: "Cada fantasma alterna persecución y dispersión apuntando a una casilla en lugar de al jugador, de modo que los cuatro convergen desde ángulos distintos. El radio de persecución se ensancha según sube la puntuación." },
      { t: "Máquina de estados", p: "Jugar, pausa, nivel superado, game over y reinicio son estados explícitos con transiciones explícitas — nada de flags booleanos repartidos por el bucle." },
    ],
    extrasTitle: "Todo lo demás que un juego necesita",
    extrasP:
      "Las partes que nadie nota hasta que faltan: una pausa que congela de verdad la simulación en vez de esconderla, y unos ajustes que se aplican sin reiniciar.",
    extrasCap1: "Ajustes — se aplican en caliente, sin reiniciar",
    extrasCap2: "Pausa — un estado real, así que el bucle deja de avanzar",
    playTitle: "Pruébalo",
    playOutro: "El código completo — entidades, parser de tiles, IA de fantasmas y demás — está en GitHub.",
  },

  flappy: {
    label: "Juego en Unity · C# / Physics2D",
    title: "Flappy Bird — clon mejorado",
    subtitle:
      "Un botón, un pájaro y un muro infinito de tuberías. Hecho desde cero en **Unity** con físicas 2D ajustadas a mano, un **generador procedural de obstáculos con object pooling** y un **ranking online** — el juego más simple posible, tratado como un problema real de ingeniería del *game feel*.",
    tags: ["Unity", "C#", "Physics2D", "Object pooling", "Ranking"],
    ctaDemo: "Verlo en marcha",
    specs: [
      { v: "Unity", l: "Motor" },
      { v: "C#", l: "Lenguaje" },
      { v: "2D", l: "Físicas" },
      { v: "∞", l: "Tuberías procedurales" },
      { v: "Online", l: "Ranking" },
    ],
    demoTitle: "Míralo funcionando",
    demoP:
      "El vídeo es el juego tal cual se juega: el aleteo, la cadencia de las tuberías, la puntuación subiendo con cada hueco superado y la partida acabando en el instante exacto en que lo dice una hitbox.",
    demoCaption: "Demo completa de juego — grabada de una build real.",
    demoFallback: "Tu navegador no soporta vídeo incrustado.",
    screensTitle: "Tres pantallas, una regla",
    startKicker: "Inicio",
    startH: "Sin tutorial y sin muro de opciones",
    startP:
      "El pájaro flota, las tuberías esperan y un toque arranca la partida. Todo lo que el jugador necesita saber se lo enseñan los dos primeros segundos — que es exactamente el planteamiento del original.",
    playKicker: "En juego",
    playH: "Cada hueco es generado, ninguno es injusto",
    playP:
      "Los desplazamientos verticales se aleatorizan dentro de unos límites que garantizan un camino alcanzable desde el hueco anterior. Lo aleatorio es fácil; lo *aleatorio y siempre superable* es lo que costó ajustar.",
    overKicker: "Game over",
    overH: "Puntuación, récord y vuelta a empezar",
    overP:
      "La muerte se resuelve en un frame y el reinicio reconstruye el mundo desde un único punto de entrada, así que vuelves a volar antes de que te dé tiempo a frustrarte.",
    howTitle: "Cómo está construido el bucle",
    loop: [
      { t: "Gravedad y aleteo", p: "Un Rigidbody2D cae con una escala de gravedad ajustada; el toque sustituye la velocidad vertical en lugar de sumarse a ella, así que todos los aleteos suben exactamente lo mismo por rápido que estuvieras cayendo. Esa única decisión separa un pájaro controlable de uno resbaladizo." },
      { t: "Tuberías que nunca se repiten", p: "Los obstáculos salen de un pool de prefabs con desplazamiento vertical aleatorio y velocidad horizontal fija. Reciclarlas fuera de pantalla en vez de instanciar nuevas mantiene la asignación de memoria plana, así que los fps no se degradan por larga que sea la partida." },
      { t: "Puntuar con triggers", p: "Una zona de trigger invisible ocupa el hueco entre cada par de tuberías. Al atravesarla sube el contador — sin cálculos de distancia, sin dobles conteos y funcionando igual a cualquier velocidad." },
      { t: "Colisiones honestas", p: "OnTriggerEnter2D contra una hitbox de polígono calcada al sprite, no una caja perezosa. Una muerte tiene que parecer justa: si el jugador ve hueco entre el pájaro y la tubería, no puede morir." },
      { t: "Estado del juego", p: "Una máquina de estados por enum cubre listo, jugando, pausa, muerto y reinicio. El mundo se resetea desde un único punto de entrada, y por eso un reinicio nunca hereda una animación a medias ni una puntuación vieja." },
      { t: "El ranking", p: "Las puntuaciones se envían al morir y se leen en el menú, así que una partida se mide contra la de todos los demás y no solo contra tu intento anterior." },
    ],
    hardTitle: "Lo que de verdad costó",
    hard: [
      { icon: "🎯", h: "Colisiones que parezcan justas", p: "Una hitbox rectangular en un pájaro redondo te mata en huecos que claramente habías pasado. Calcar un polygon collider al sprite acabó con la sensación de que el juego hacía trampas." },
      { icon: "⚖️", h: "Equilibrio de dificultad", p: "La velocidad de las tuberías y el tamaño del hueco son dos mandos que se pelean. Pasar de “trivial” a “imposible” sin cruzar nunca por “aburrido” fue ajuste iterativo, no una fórmula." },
      { icon: "🔁", h: "Procedural, pero justo", p: "Un desplazamiento aleatorio con semilla y deltas acotados mantiene cada trazado variado y superable — nunca dos huecos consecutivos más separados de lo que cubre un solo aleteo." },
      { icon: "📉", h: "Mantener los fps planos", p: "Reciclar tuberías en lugar de instanciarlas hace que una partida de cinco minutos reserve la misma memoria que una de cinco segundos." },
    ],
    playTitle: "Pruébalo",
    playOutro: "El proyecto de Unity completo — scripts, prefabs y escenas — está en GitHub.",
  },

  ecommerce: {
    label: "Aplicación web full stack · React + Node.js",
    title: "Plataforma E-Commerce",
    subtitle:
      "Una tienda online completa, de punta a punta: navegar el catálogo, llenar un carrito que sobrevive a un refresco, iniciar sesión de forma segura y gestionar todo el inventario desde un **panel de administración** — con **caché Redis** en las rutas calientes y las imágenes servidas desde un CDN.",
    tags: ["React", "Node.js", "MongoDB", "Redis", "Cloudinary", "JWT", "Zustand"],
    ctaLive: "Abrir la tienda ↗",
    specs: [
      { v: "MERN", l: "Stack" },
      { v: "JWT", l: "Autenticación" },
      { v: "Redis", l: "Caché caliente" },
      { v: "CDN", l: "Imágenes" },
      { v: "REST", l: "API" },
    ],
    storefrontTitle: "La tienda",
    storefrontP:
      "La tienda abre con los productos destacados — la única consulta que lanza todo el mundo y que casi nadie cambia, que es justamente por lo que vive en Redis.",
    storefrontCaption: "Página de inicio — destacados servidos desde caché.",
    flowTitle: "De navegar a pagar",
    catKicker: "Catálogo",
    catH: "Primero filtrar, después pedir",
    catP:
      "Las categorías y los filtros forman parte de la ruta, así que un listado se puede compartir, funciona con el botón atrás y lo responde una consulta dirigida en vez de mandar el catálogo entero al navegador para esconder casi todo.",
    cartKicker: "Carrito",
    cartH: "Persistente, reconciliado y honesto",
    cartP:
      "El carrito se guarda por usuario y se restaura en la siguiente visita. Los totales se recalculan en el servidor al pagar — el número del cliente es una vista previa, nunca la fuente de verdad.",
    authKicker: "Cuentas",
    authH: "Iniciar sesión sin sustos",
    authP:
      "Las contraseñas se hashean antes de tocar la base de datos y el token de sesión vive en una cookie http-only. El rol viaja en el token, así que el área de administración la protege la API y no un simple ocultar en la interfaz.",
    adminTitle: "La parte de administración",
    adminP:
      "Una tienda es medio proyecto sin las herramientas para gestionarla. El panel crea, edita, borra y destaca productos, sube sus imágenes y refleja cada cambio en la tienda al momento — las claves cacheadas se invalidan al escribir.",
    adminCaption: "Panel de administración — inventario contra la misma API REST.",
    featuresTitle: "Qué hace",
    features: [
      { icon: "🔐", t: "Autenticación que aguanta un refresco", p: "El registro y el login emiten un JWT guardado en una cookie http-only en vez de en local storage, así que recargar no te desloguea y ningún script suelto puede leer el token." },
      { icon: "🛒", t: "Un carrito que se acuerda", p: "El estado del carrito vive en Zustand y se persiste por usuario, así que lo que añadiste en una visita sigue ahí en la siguiente — y las cantidades se contrastan con el stock real antes de pagar." },
      { icon: "🗂️", t: "Navegación que acota rápido", p: "Las rutas de categoría y los filtros disparan consultas en servidor en lugar de filtrar un payload gigante en el cliente, así que el listado sigue siendo rápido cuando crece el catálogo." },
      { icon: "🖼️", t: "Imágenes en un CDN", p: "Las subidas van a Cloudinary y la base de datos guarda solo la URL. La API nunca hace de proxy de binarios y las imágenes se sirven desde un edge cercano al comprador." },
      { icon: "⚡", t: "Redis en la ruta caliente", p: "La consulta de productos destacados es la más pedida y la que menos cambia, así que se cachea en Redis (Upstash) y se invalida al escribir, en vez de golpear MongoDB en cada carga." },
      { icon: "🛠️", t: "Un panel de admin de verdad", p: "Crear, actualizar, borrar y destacar productos desde el navegador — la misma API REST que lee la tienda, detrás de una comprobación de rol." },
    ],
    archTitle: "Cómo está montado",
    flow: [
      { t: "Cliente", p: "React + Vite, con Tailwind y Framer Motion. Zustand guarda los dos estados que cruzan toda la app — carrito y sesión — así que no hay prop drilling ni espaguetis de contextos." },
      { t: "API", p: "Express expone una superficie REST: productos, categorías, carrito, auth y admin. El middleware verifica el token y el rol en un único sitio en vez de ruta por ruta." },
      { t: "Datos", p: "MongoDB con Mongoose, alojado en Atlas. Los esquemas validan antes de escribir, así que un producto mal formado nunca llega a la colección." },
      { t: "Caché", p: "Redis se sitúa delante de los endpoints de lectura intensiva. Las escrituras invalidan las claves afectadas, que es lo que evita que la caché sea el motivo de que un precio se vea mal." },
      { t: "Multimedia", p: "Cloudinary almacena y transforma las imágenes de producto; la app solo guarda URLs." },
      { t: "Despliegue", p: "Desplegado en Render contra MongoDB Atlas y Upstash — una build pública y accesible, no una demo en localhost." },
    ],
    tryTitle: "Pruébala",
    tryP:
      "La tienda está desplegada y es código abierto. La instancia gratuita de Render se duerme cuando está inactiva, así que la primera carga tras un rato puede tardar unos segundos en despertar.",
    liveBtn: "Ver la tienda ↗",
    demoBtn: "Vídeo demo ↗",
  },
  nba: {
    label: "Analítica deportiva full-stack · ML y simulación",
    title: "NBA Vision",
    subtitle:
      "Un **laboratorio full-stack de analítica, proyección y simulación NBA**. Compara jugadores y equipos, proyecta una línea contra una defensa concreta, pronostica un partido y monta una plantilla con presupuesto para jugar contra un equipo real con un **simulador posesión a posesión** — en inglés y en castellano.",
    tags: ["React + TypeScript", "FastAPI", "XGBoost", "Regresión cuantílica", "Monte Carlo", "PostgreSQL", "Bilingüe"],
    ctaLive: "Ver la web en directo ↗",
    glance: [
      { v: "14", l: "Rutas" },
      { v: "4", l: "Modelos" },
      { v: "124", l: "Jugadores" },
      { v: "1.230", l: "Partidos simulados" },
      { v: "2", l: "Idiomas" },
      { v: "0", l: "Pasos de instalación" },
    ],
    whatTitle: "Qué es",
    whatP1:
      "NBA Vision responde a las preguntas que se hace un aficionado de verdad — *¿es bueno?, ¿qué hará esta noche?, ¿quién gana este partido?, ¿mi equipo podría con el suyo?* — y responde a cada una con un número, la incertidumbre que lo rodea y el razonamiento que lo ha producido.",
    whatP2:
      "Funciona **sin configurar nada**: instalas el frontend y tienes toda la web contra una liga demo incluida de 124 jugadores y un modelo base calibrado. Añades el backend y pasa a datos en vivo de stats.nba.com, caché en PostgreSQL y modelos entrenados — **el contrato de la API es idéntico, así que la interfaz no cambia**.",
    sectionsTitle: "Once secciones, una temporada",
    sectionsP:
      "Todo en la web describe una temporada — ahora mismo la **2025-26** — indicada en la cabecera y en cada perfil, para que ninguna página tenga que matizarse a sí misma.",
    routes: [
      { path: "/players", what: "Índice y perfil de siete pestañas: resumen, Scouting AI, tiro, avanzadas, splits, partido a partido, carrera y palmarés." },
      { path: "/season", what: "Ambas conferencias con el play-in, catorce clasificaciones estadísticas y las carreras de MVP / DPOY / ROY / MIP / 6MOY puntuadas." },
      { path: "/league", what: "Simula los 1.230 partidos, el play-in, el cuadro y las Finales — con una franquicia inventada por ti sustituyendo a una real." },
      { path: "/rookies", what: "La clase de draft: tablero con pick, universidad y país, más la carrera al Rookie del Año puntuada." },
      { path: "/compare", what: "De dos a cuatro jugadores puntuados categoría a categoría, con barras de percentil, radar superpuesto y ambos palmareses." },
      { path: "/teams", what: "Plantilla, estadísticas, defensa por posición, pabellón y taquilla, tope salarial frente a la línea de impuesto e historia del club." },
      { path: "/head-to-head", what: "Todos los enfrentamientos de un jugador contra un rival, con casa y fuera dibujados por separado." },
      { path: "/predict/player", what: "Puntos, rebotes, asistencias y triples contra una defensa concreta, con intervalo del 80% y línea over/under." },
      { path: "/predict/team", what: "Marcador, hándicap, total y probabilidad de victoria — en playoffs cambia de modelo y añade la probabilidad exacta de la serie." },
      { path: "/simulate", what: "Dos equipos reales, posesión a posesión. Deja fuera a un jugador y mira cómo se reparten sus minutos, y luego repite la jugada." },
      { path: "/builder", what: "Un presupuesto, la liga tasada a valor de mercado y tu plantilla jugando contra un equipo real a un segundo por minuto de partido." },
    ],
    playersTitle: "Fichas de jugador — del box score al percentil",
    playersP1:
      "Cada jugador tiene un perfil de siete pestañas. **Scouting AI** encuentra jugadores estadísticamente parecidos con una búsqueda de vecinos más cercanos ponderada sobre un vector de doce percentiles, etiqueta un arquetipo y escribe un informe de ojeo.",
    playersP2:
      "El informe es **basado en reglas a propósito**. Una etiqueta de k-means que diga “cluster 4” no explica nada; un umbral que dispara *“Protector del aro — ancla la pintura en rebote y tapón”* se explica solo. Cada frase la dispara un umbral de percentil, así que no hay prosa inventada.",
    assistantTitle: "El asistente: una IA que no puede contradecir a la página",
    assistantP1:
      "Las páginas de jugador y equipo llevan un asistente flotante que responde sobre *ese* jugador o *ese* equipo, en cualquiera de los dos idiomas. Si le preguntas por otro, lo dice y te enlaza a la página correcta.",
    assistantP2:
      "Corre **entero en el navegador**: sin modelo, sin API key y sin llamadas de red. Las respuestas se componen por reglas a partir de los mismos objetos que leen los gráficos, así que el panel **no puede contradecir la página en la que está**, y funciona sin conexión.",
    assistantBullets: [
      "Anclado por construcción — los mismos datos que los gráficos, así que no hay números alucinados",
      "Coste de inferencia cero y latencia cero: nada sale del navegador",
      "Se niega a hablar de lo que no está en la página en vez de improvisar",
      "Bilingüe: la misma respuesta se genera desde tokens sin idioma",
    ],
    modelsTitle: "Cómo funciona la IA — cuatro modelos separables",
    modelsP: "Cuatro modelos, separables para poder inspeccionar, sustituir o desactivar cada uno por su cuenta.",
    models: [
      {
        n: "01",
        title: "Proyección de jugador — regresión cuantílica con gradient boosting",
        body: "Para cada objetivo (puntos, rebotes, asistencias, minutos, triples) un modelo XGBoost de media más siete modelos de cuantil del 0,05 al 0,95. Cabezas cuantílicas en vez de “media ± k·σ” porque la dispersión es condicional: un base suplente con los minutos tasados y una estrella de 38 minutos con riesgo de faltas tienen formas completamente distintas. Los box scores no son gaussianos, así que asumir residuos normales tarifaría mal las colas de forma sistemática.",
        tags: ["XGBoost", "Regresión cuantílica", "Intervalos al 80%"],
      },
      {
        n: "02",
        title: "Cabeza secuencial — LSTM / Transformer",
        body: "Una media móvil es un resumen con pérdidas: un jugador en alza y otro oscilando alrededor de la misma media tienen idéntico promedio a diez partidos y distinta distribución para el siguiente. Un LSTM de dos capas lee los últimos 25 partidos y emite cuantiles monótonos por construcción, entrenado con pinball loss — así la cabeza profunda habla el mismo idioma que XGBoost y las dos se fusionan en espacio de cuantiles.",
        tags: ["PyTorch", "LSTM", "Pinball loss"],
      },
      {
        n: "03",
        title: "Modelo de equipo — Elo + four factors + corrección aprendida",
        body: "Un Elo con multiplicador por margen de victoria da el prior calibrado; las posesiones esperadas salen del ritmo de ambos equipos, los puntos del choque ataque-defensa, más ventaja de campo y descanso. Después un XGBoost corrige el residuo. Los playoffs tienen artefactos propios y ajustes estructurales, y la probabilidad del mejor de siete se calcula exacta enumerando los 2⁷ caminos.",
        tags: ["Elo", "Four factors", "Residuo con XGBoost"],
      },
      {
        n: "04",
        title: "Simulador de partido — Monte Carlo por posesiones",
        body: "En vez de muestrear un marcador final, juega el partido: posesiones alternas, un tirador extraído de los pesos de uso reales, el tiro resuelto contra la defensa, rebotes ofensivos que mantienen viva la posesión y fatiga acumulándose. Eso da un box score en vivo que cuadra por construcción, una narración con actores reales y eventos con reloj — que es justo lo que hace posible la repetición a un segundo por minuto.",
        tags: ["Monte Carlo", "Web Worker", "Calibrado a 226 puntos"],
      },
    ],
    leakageTitle: "La regla que importa: cero fuga temporal",
    leakageP1:
      "**Toda feature tiene que poder calcularse estrictamente antes del salto inicial.** Las ventanas móviles van desplazadas un partido, los ratings del rival son los del día anterior y el feature store se construye recorriendo los partidos de cada jugador en orden, escribiendo las features de los partidos `0..i-1` con el box score del partido `i` como etiqueta. Cualquier otro orden produce un modelo que brilla offline y no vale nada en vivo.",
    leakageP2:
      "La validación usa `GroupKFold` por temporada, y cada ejecución reporta su MAE de validación cruzada al lado del MAE de simplemente predecir el promedio de los últimos diez partidos. **Un modelo que no bate esa referencia no es un modelo, es una media más lenta**, y no se promociona.",
    simTitle: "Simulación — jugar el partido, no muestrear el marcador",
    simP1:
      "El simulador resuelve posesiones reales, así que la narración tiene actores reales y el box score cuadra por construcción. Deja fuera a un jugador y sus minutos se reparten, los ratings se mueven y el pronóstico cambia. Un barrido de confianza de 200 ejecuciones corre en un **Web Worker**, así que la página se mantiene a 60fps mientras calcula.",
    simP2:
      "Por encima de un partido cambia la granularidad: una temporada completa de 82 partidos para 30 equipos se resuelve con el modelo de ratings más una extracción con semilla, terminando 1.230 partidos en milisegundos y quedándose a menos de un punto del total real medio de la liga.",
    builderTitle: "El constructor — y por qué el cap hit es un precio equivocado",
    builderP1:
      "El cap hit es lo que a un jugador *le pagan*; el valor de mercado es lo que *vale*. Divergen constantemente — las estrellas con contrato de rookie son el mayor excedente del deporte — así que un presupuesto tasado solo por cap hit vendería a un pívot franquicia de 22 años por calderilla.",
    builderP2:
      "Los precios se reescalan para que el jugador más caro cueste siempre en torno al 38% del presupuesto que elijas — un equipo de 10 M$ y uno de 50 M$ se enfrentan a la misma forma de decisión.",
    dataTitle: "De dónde salen los datos",
    dataP1:
      "Todo lo que scrapea corre en un **worker offline**, nunca en un handler de petición, detrás de límites de tasa por fuente y una caché por niveles — una semana para el índice de jugadores, doce horas para los splits, un día para los contratos y sesenta segundos para lo que es realmente en vivo.",
    dataHeaders: ["Fuente", "Qué aporta", "Cómo se usa"],
    sources: [
      ["stats.nba.com (vía nba_api)", "Estadísticas oficiales y avanzadas", "Proveedor asíncrono e ingesta por lotes, ~0,6 req/s con token bucket"],
      ["Basketball-Reference", "Métricas históricas y avanzadas — PER, TS%, WS, BPM, VORP", "3,2 s entre peticiones, un solo worker"],
      ["Spotrac / HoopsHype", "Contratos, cap hits y opciones", "Scrapeado a diario por el worker offline"],
      ["RealGM", "Traspasos y movimientos", "El registro gratuito de transacciones más completo"],
      ["NBA.com/draft", "Draft y clase de rookies", "Endpoint drafthistory más el histórico de BRef"],
      ["SportsDataIO / Sportradar", "Alternativa en JSON estructurado", "Opcional: pones una clave y la ingesta cambia de fuente sola"],
      ["cdn.nba.com", "Fotos y escudos", "Enlazable; si falla, cae a una ficha con las iniciales"],
    ],
    dataP2:
      "**Por qué el proxy de backend no es opcional:** stats.nba.com no envía cabecera CORS, así que un navegador no puede llamarlo directamente nunca. Además identifica clientes y limita el tráfico lo bastante como para banear una IP de datacenter en minutos. El proceso de la API es lo único que habla con él.",
    archTitle: "Arquitectura — dos runtimes, un contrato",
    archSteps: [
      "**Worker de ingesta (offline, con rate limit):** equipos → jugadores → partidos → métricas avanzadas → contratos → feature store, cada noche.",
      "**PostgreSQL:** entidades normalizadas, un feature store correcto en el tiempo, un registro de modelos y un log de predicciones. El entrenamiento solo lee del feature store, que es lo que hace auditable la garantía de “cero fuga”.",
      "**Entrenador:** escribe los artefactos junto a sus métricas, inactivos por defecto. La promoción es deliberada y exige batir al modelo vigente.",
      "**FastAPI:** caché de lectura con bloqueos por clave y el registro de modelos delante de los artefactos entrenados.",
      "**Frontend React:** un único módulo sabe si existe backend. Sin URL de API corre un port en TypeScript del modelo base contra la liga incluida; con ella llama a FastAPI. Las formas de respuesta son idénticas.",
    ],
    archP:
      "Eso es lo que permite que la web sea un producto terminado y demostrable antes de haber entrenado un solo modelo — y por lo que “meter el modelo real” es un cambio de configuración, no una refactorización.",
    i18nTitle: "Bilingüe por construcción",
    i18nP1:
      "La web es completamente bilingüe. El idioma cambia los textos, los formatos de número y moneda (`113,5` y `55,2 M$` en español), fechas, ordinales y *las frases que generan los modelos*: la narración se vuelve a redactar sola, y los informes de ojeo y los componentes de los premios se escriben en tiempo de render desde tokens sin idioma.",
    i18nP2:
      "La completitud la impone el compilador y no una revisión: el diccionario español está **tipado contra el inglés**, así que una clave que falte o esté mal escrita rompe el build.",
    rulesTitle: "Las reglas de honestidad que sigue el proyecto",
    rules: [
      "**Ninguna proyección sale sin su incertidumbre** — cada pronóstico lleva intervalo y over/under construidos con cuantiles predichos",
      "**Todo número simulado va etiquetado** — sin artefacto entrenado la respuesta se marca como mock y la interfaz muestra un distintivo",
      "**El color nunca lleva el significado solo** — leyenda, etiquetas directas y vista de tabla en cada gráfico, con una paleta validada para daltonismo",
      "**Nada de gráficos de doble eje** — dos medidas con escalas distintas van en dos gráficos",
      "**Salida determinista** — proyecciones y simulaciones llevan semilla, así que la misma pregunta da siempre la misma respuesta",
      "**Nada bloquea el hilo principal** — las simulaciones corren en un Web Worker y toda superficie asíncrona tiene su estado de carga",
      "**Las métricas reconstruidas lo dicen** — en modo demo las avanzadas son aproximaciones y la asistencia está modelada; cada panel que las muestra lo advierte",
    ],
    seeTitle: "Míralo tú mismo",
    seeP:
      "La web está desplegada y es código abierto. Todo lo anterior corre en el navegador contra la liga demo incluida — sin backend, sin API key y sin registrarse.",
    disclaimer:
      "NBA Vision es un proyecto de portfolio. No está afiliado ni respaldado por la NBA. Imágenes © NBA, servidas desde cdn.nba.com.",
  },
  ultimus: {
    label: "Proyecto final de máster · Plataforma de ciberseguridad con IA",
    title: "Ultimus Defensor — BlueSentinel",
    subtitle:
      "Una **plataforma de ciberseguridad con IA** de principio a fin que combina detección de anomalías, clasificación de amenazas con MITRE ATT&CK y un asistente inteligente para BlueTeam — desarrollada como proyecto final del Máster en **Inteligencia Artificial y Big Data**.",
    tags: ["IA / ML", "Ciberseguridad", "MITRE ATT&CK", "Isolation Forest", "XGBoost", "LLM / RAG", "Python", "Big Data"],
    overviewTitle: "Visión general",
    overviewP1:
      "**Ultimus Defensor** es una plataforma de ciberseguridad pensada para analistas de BlueTeam. Une un **pipeline de detección de anomalías en tiempo real** con un **asistente de IA (BlueSentinel)** que identifica, clasifica y explica amenazas usando el marco MITRE ATT&CK.",
    overviewP2:
      "La plataforma ingiere logs de seguridad de varias fuentes, detecta anomalías con un ensemble especializado, mapea lo que encuentra a técnicas de MITRE ATT&CK y explica el resultado a través de un asistente conversacional anclado en un corpus curado de **más de 1.000 documentos de ciberseguridad**.",
    teamTitle: "Equipo y colaboración",
    teamP:
      "Desarrollado como **proyecto en grupo de cinco personas** para el Máster en IA y Big Data. Cada miembro se encargó de una parte: pipeline de ML, sistema RAG, frontend, ingeniería de datos e integración.",
    assistantTitle: "BlueSentinel — el asistente de IA para BlueTeam",
    assistantP:
      "BlueSentinel es un asistente conversacional especializado en ciberseguridad, impulsado por un **LLM con RAG (generación aumentada por recuperación)** sobre un corpus curado de documentos de seguridad. Funciona en dos modos:",
    assistantModes: [
      "**Modo consultor:** preguntas y respuestas generales de ciberseguridad — explicación de amenazas, estrategias de mitigación, detalle de técnicas MITRE y buenas prácticas de BlueTeam.",
      "**Modo log:** pegas logs en crudo, alertas de SIEM o un fragmento sospechoso y recibes un análisis estructurado: técnica identificada (ID de MITRE), táctica, cómo funciona el ataque y las acciones de respuesta recomendadas.",
    ],
    pipelineTitle: "Pipeline de detección — Isolation Forest → XGBoost",
    pipelineP:
      "El sistema de detección es una **cascada de dos etapas** que procesa logs de seguridad reales y mapea las anomalías encontradas a técnicas de MITRE ATT&CK:",
    pipelineSteps: [
      "**Etapa 1 — ensemble de Isolation Forest:** cinco modelos no supervisados especializados (proceso, red, fichero, general y otros) marcan comportamiento anómalo sin una sola etiqueta. Cada uno se centra en un dominio de datos distinto.",
      "**Etapa 2 — clasificador XGBoost:** las muestras anómalas se clasifican en una de **doce técnicas de MITRE ATT&CK**, con su nivel de confianza y su mapeo de técnica.",
      "**Salida:** JSON estructurado con las técnicas detectadas, niveles de confianza, tasas de anomalía, IDs de job y atribución por fuente. Exportable a CSV o JSON.",
    ],
    dashboardsTitle: "Cuadros de mando y analítica",
    dashboardsP: "Más allá de la detección, la plataforma da a un equipo de seguridad las vistas con las que realmente trabaja:",
    dashboards: [
      "Vista ejecutiva — resumen de riesgo y KPIs de un vistazo",
      "Orígenes de amenaza — geolocalización y atribución de fuente",
      "Informes de ataque — resúmenes de incidente exportables",
      "Salud de modelos — métricas de rendimiento por modelo",
      "Cobertura MITRE — mapa de calor de las técnicas mapeadas",
      "Cola de detección — estado del procesado de logs en tiempo real",
    ],
    techTitle: "Tecnologías clave",
    tech: ["Python", "Isolation Forest", "XGBoost", "LLM + RAG", "MITRE ATT&CK", "FastAPI", "React", "TypeScript", "Docker", "Pipelines Big Data", "Dataset COMISET", "JSON / CSV"],
    availabilityTitle: "Disponibilidad — académico y confidencial",
    availabilityP1:
      "Este proyecto **no está disponible públicamente en GitHub**. Fue el proyecto final del máster e incluye datasets de seguridad propietarios, modelos entrenados y configuración de LLM que se mantienen privados por integridad académica y protección de datos.",
    availabilityP2:
      "Si te interesa la memoria técnica completa, la metodología o una demostración guiada, pídemela directamente.",
    demoLabel: "Ver el vídeo demo →",
  },
  kdd: {
    label: "Proyecto académico · Investigación en ML / Big Data",
    title: "Sistema de detección de intrusiones — KDD Cup '99",
    subtitle:
      "Un IDS con machine learning que une **ciberseguridad**, **big data** e **inteligencia artificial** en un flujo de trabajo completo: ingeniería del dataset, análisis exploratorio, evaluación de modelos y un pipeline jerárquico de detección.",
    tags: ["IA", "Big Data", "Ciberseguridad", "Machine Learning", "Redes neuronales", "EDA / BI"],
    overviewTitle: "Visión general",
    overviewP:
      "El proyecto diseña un **sistema de detección de intrusiones** basado en **clasificación predictiva**. Usando KDD Cup '99 como referencia, construimos todo el flujo experimental: consolidación a gran escala, reducción y especialización controladas, análisis exploratorio, evaluación de varios enfoques de ML y un **pipeline jerárquico** final que mejora la interpretabilidad y la robustez operativa.",
    teamTitle: "Equipo y colaboración",
    teamP:
      "**Proyecto en grupo de cinco personas** dentro del máster. Participé en la preparación de datos, el análisis, el modelado y la integración.",
    dataTitle: "Ingeniería del dataset",
    dataP1:
      "El dataset original contiene **más de 5 millones de registros de conexión de red**. KDD'99 es conocido por su redundancia y sus sesgos de distribución — entrenar directamente sobre el conjunto completo infla los resultados y le quita valor a las conclusiones.",
    dataP2:
      "Así que aplicamos un proceso controlado de limpieza, reducción y diseño por tarea, con un conjunto de subsets especializados alineados con cada objetivo de detección.",
    dataBullets: [
      "**Dataset reducido principal (~42.301 registros):** la base común para el ML clásico y el análisis general.",
      "**Subsets especializados para la detección jerárquica:** uno por etapa (R2L/U2R frente al resto; DoS frente a Probe).",
      "**Dataset para red neuronal (~1,1M de registros):** una alternativa mayor, porque esas arquitecturas se benefician del tamaño de muestra.",
      "**19 datasets derivados en total**, construidos con distintas estrategias de filtrado y reetiquetado.",
    ],
    edaTitle: "Análisis exploratorio (EDA)",
    edaP:
      "El EDA guió el tratamiento de variables y la elección de modelos. Los datos mezclan tipos de variable, outliers extremos, colas pesadas y familias de ataque con firmas de comportamiento muy distintas.",
    edaBullets: [
      "**Distribución de clases** y desbalanceo, sobre todo en los ataques minoritarios R2L/U2R.",
      "**Outliers y asimetría** en las variables continuas, que motivaron transformaciones logarítmicas y un preprocesado robusto.",
      "**Señales de separabilidad:** patrones de volumen de tráfico para DoS/Probe frente a indicadores de autenticación para R2L/U2R.",
      "**Redundancia de variables** y estructura de correlación, para no inflar la dimensionalidad.",
    ],
    modelTitle: "Enfoque de modelado",
    modelP: "Implementamos y comparamos un conjunto de modelos deliberadamente diverso, para pesar cada sesgo inductivo contra cada subtarea.",
    modelBullets: [
      "**Supervisados:** KNN, árbol de decisión, random forest, XGBoost, SVM y regresión logística.",
      "**No supervisados (exploratorios):** K-Means y DBSCAN, para inspeccionar estructura y densidad.",
      "**MLP:** entrenado sobre el dataset grande y probado con tratamiento del desbalanceo (oversampling).",
      "**Experimentos multiclase:** distintas agrupaciones de etiquetas, para estudiar el compromiso entre granularidad y aprendibilidad.",
    ],
    pipelineTitle: "Solución final: pipeline jerárquico de detección",
    pipelineP:
      "Un **pipeline en varias etapas** con la forma en la que realmente se toman las decisiones en un IDS: primero amplio, después especializado. Mejora la interpretabilidad y permite tratar aparte las familias de ataque raras pero de alto impacto.",
    pipelineSteps: [
      "**Etapa 1 — detección binaria:** normal frente a ataque, con un árbol de decisión.",
      "**Etapa 2 — filtrado dirigido:** R2L/U2R frente al resto de ataques, con un árbol de decisión especializado.",
      "**Etapa 3 — familia de ataque de red:** DoS frente a Probe, con un ensemble de random forest.",
    ],
    outputsTitle: "Entregables",
    outputs: [
      "**Cuadro de mando en Power BI:** exploración interactiva — distribuciones de clase, patrones de protocolo y servicio, relaciones entre variables.",
      "**Visualizaciones en Tableau:** análisis complementario y material de presentación.",
      "**Interfaz web:** una capa de consolidación que presenta la salida de la inferencia jerárquica.",
    ],
    whyTitle: "Por qué importa este proyecto",
    why: [
      "**Alcance completo:** ingeniería de datos → EDA → modelado → evaluación → entregables.",
      "**Honesto metodológicamente:** señala las limitaciones del dataset en vez de aprovechar la redundancia para enseñar un número más bonito.",
      "**Pensamiento operativo:** la jerarquía refleja cómo se toma de verdad una decisión en un IDS.",
      "**Equilibrio:** rendimiento, eficiencia y explicabilidad tratados como restricciones simultáneas.",
    ],
    noticeTitle: "Aviso ético y legal",
    noticeP1:
      "Este trabajo es **estrictamente académico**, para investigación y evaluación docente. KDD Cup '99 es un benchmark histórico — **no es adecuado** como fuente de entrenamiento de un IDS en producción sobre una red moderna sin validación contemporánea y datos obtenidos legalmente.",
    noticeP2:
      "La memoria completa, los datasets internos y los detalles de implementación no se publican aquí. Escríbeme directamente si quieres la metodología, los resultados y los artefactos completos.",
  },
  mindflow: {
    label: "Publicado en Google Play · Juego Android · Proyecto en solitario",
    title: "MINDFLOW — Brain Puzzle Games",
    subtitle:
      "Mi **primer juego móvil publicado**: cuatro modos de puzzle lógico en una app Android offline y completamente silenciosa, hecha con **React Native y TypeScript**. Más de 1.200 niveles generados y verificados por solución, bilingüe y con anuncios — diseñado, construido, probado y publicado en la Play Store de principio a fin.",
    tags: ["React Native", "TypeScript", "Redux Toolkit", "Android", "AdMob", "Offline-first", "i18n", "Publicado"],
    ctaStore: "Descargar en Google Play ↗",
    ctaModes: "Ver los modos de juego",
    glanceTitle: "De un vistazo",
    glance: [
      { v: "4", l: "Modos de juego" },
      { v: "1.200", l: "Niveles verificados" },
      { v: "100%", l: "Juego offline" },
      { v: "ES / EN", l: "Localización completa" },
    ],
    whyTitle: "Por qué lo hice",
    whyP1:
      "Casi todos los juegos de puzzles que abría hacían justo lo contrario de lo que yo buscaba. Bucles de música altos, contrarrelojes, pantalla de login, barra de energía y necesidad de conexión. Juegos que te piden atención en vez de darte un sitio donde dejarla descansar.",
    whyP2:
      "**MINDFLOW es la versión que yo quería que existiera**: sin audio de ningún tipo, sin temporizadores, sin cuenta y sin internet. Solo un tablero y un problema con solución real. Toda la app está pensada para unos **30 minutos tranquilos al día** — suficiente para entrenar concentración y razonamiento lógico sin convertirse en otra cosa que tira de ti. Su lema es exactamente esa idea: *entrena la mente, descansa la cabeza*.",
    whyP3:
      "La otra mitad del motivo era personal. Quería llevar un proyecto hasta el final por todas las partes de publicar que un repo de portfolio no te enseña: políticas de la tienda, una política de privacidad y unos términos que resuelvan de verdad, consentimiento de anuncios con RGPD, firma de la release, un test cerrado con testers reales, monitorización de crashes y la revisión de Play Console. **Es la primera app que he publicado**, y pasar de un proyecto vacío de React Native a una ficha publicada me enseñó más que el propio código.",
    modesTitle: "Cuatro juegos, una app",
    modesP:
      "Tres modos lógicos por niveles y uno infinito de puntuación. Cada uno tiene sus reglas, su renderizador de tablero y su progreso, vidas y pistas independientes — así que atascarse en uno nunca bloquea los demás.",
    modes: [
      {
        name: "Path Painter",
        kind: "400 niveles",
        text: "Un **puzzle de trazo único**. Pinta todas las casillas libres de la rejilla con un solo trazo continuo, del punto de inicio a la meta, sin levantar el dedo ni cruzar tu propio camino.",
        rules: [
          "Cada nivel es un camino hamiltoniano verificado — siempre existe solución",
          "Los obstáculos bloquean casillas y reconfiguran la ruta",
          "La solución guardada es también el sistema de pistas",
        ],
      },
      {
        name: "Arrow Puzzle",
        kind: "400 niveles",
        text: "Un **puzzle de planificación**. Cada línea sale del tablero en la dirección a la que apunta — pero solo si no hay nada en medio. Encuentra el orden que despeja toda la rejilla sin una sola colisión.",
        rules: [
          "Una colisión cuesta una vida y reinicia el tablero",
          "Importa más el orden que la velocidad: no hay temporizadores",
          "La pista revela qué línea sacar a continuación",
        ],
      },
      {
        name: "Color Minesweeper",
        kind: "400 niveles",
        text: "El buscaminas reconstruido en torno a la **deducción pura**. Hay exactamente una bomba por fila, una por columna y una por color — así que siempre hay un camino lógico hasta la respuesta y nunca hay que adivinar.",
        rules: [
          "Un toque marca una casilla como segura; doble toque coloca una bandera",
          "Cada nivel se resolvió por fuerza bruta para garantizar solución única",
          "Una bandera mal puesta cuesta una vida; tres vidas por intento",
        ],
      },
      {
        name: "Break Infinite Blocks",
        kind: "Modo infinito",
        text: "El infinito. Arrastra piezas de un arsenal de **40 formas** a un tablero de 8×8; completa filas y columnas para eliminarlas. Encadena eliminaciones en jugadas consecutivas y el multiplicador sube.",
        rules: [
          "Escalera de combo: x1 → x5 → x10 → x50 → x100 → x200",
          "La previsualización muestra qué va a romper la pieza que sueltas",
          "Cada tanda de 3 piezas garantiza al menos una jugable",
          "Una segunda oportunidad con recompensa por partida; récords históricos y diarios guardados",
        ],
      },
    ],
    modesNote:
      "**Nota:** los cuatro tableros de arriba son diagramas ilustrativos que dibujé para explicar las reglas de cada modo — no son capturas del juego final. Para ver el juego real, mira la",
    modesNoteLink: "ficha de Google Play",
    levelsTitle: "Niveles, vidas y progresión",
    levelsP:
      "Cada uno de los tres modos por niveles trae **400 niveles** — **1.200 en total**. No están dibujados a mano uno a uno: los generan scripts y después se **verifican por fuerza bruta**, así que cada nivel de Path Painter tiene una solución válida de un solo trazo y cada tablero de Color Minesweeper tiene exactamente una solución. De esa solución verificada es de donde lee el sistema de pistas, lo que significa que una pista nunca puede señalar mal.",
    levelsBullets: [
      "**Los niveles 1 y 2 de cada modo** son tutoriales guiados, con un recorrido interactivo de seis tarjetas al abrir por primera vez (se puede saltar y repetir desde Ajustes)",
      "**3 vidas** y **3 estrellas de pista** por modo, contadas de forma independiente",
      "Se pueden ganar pistas extra viendo un vídeo con recompensa — siempre a elección del jugador, nunca obligatorio",
      "El progreso, las estrellas y los récords se guardan solos y sobreviven sin conexión",
      "Un registro de bienestar apunta la racha diaria, el tiempo jugado y los niveles superados por día",
    ],
    adsP:
      "La monetización está deliberadamente retrasada: los primeros niveles no tienen ni un anuncio y la cadencia de intersticiales solo se aprieta a medida que el jugador avanza.",
    adsHeaders: ["Niveles", "Cadencia de intersticiales", "Intención"],
    adsRows: [
      ["1 – 10", "Ninguno", "Que el jugador entre primero"],
      ["11 – 30", "Cada 5 niveles", "Introducir los anuncios con suavidad"],
      ["31 – 60", "Cada 3 niveles", "Jugador enganchado"],
      ["61 – 130", "Cada 2 niveles", "Jugador comprometido"],
      ["131 +", "Cada nivel", "Monetización de partida larga"],
    ],
    adsNote:
      "Sin conexión, el contador se guarda y el anuncio pendiente solo se muestra cuando el dispositivo vuelve a conectarse — el juego nunca se bloquea esperando una red que no tiene.",
    archTitle: "Arquitectura y notas de ingeniería",
    archP:
      "La regla que mantuve todo el rato: **la lógica de juego nunca vive en un componente**. El estado del tablero, la eliminación de líneas, las matemáticas del combo y la validación de niveles son módulos TypeScript puros con tests unitarios; los componentes de React Native solo renderizan y gestionan gestos.",
    archBullets: [
      "**Estado:** slices de Redux Toolkit por dominio — juego, ajustes, progreso y modo infinito",
      "**Persistencia:** todo a través de un único `StorageService` sobre AsyncStorage, con una interfaz deliberadamente pequeña para poder migrar a SQLite sin tocar la app",
      "**Renderizado:** interfaz propia y ligera en vez de una librería de componentes — control total del estilo minimalista y muchísimas menos dependencias nativas",
      "**Rendimiento:** el tablero de 8×8 está memoizado y la pieza arrastrada se mueve con `Animated.setValue`, así que arrastrar no provoca un re-render por frame",
      "**Feedback sin sonido:** un `HapticService` se lleva todo el canal de respuesta — acierto, error, combo y fin de partida",
      "**Anuncios:** `AdService` carga el SDK a la defensiva (si falta el módulo, el juego simplemente corre sin anuncios) y el consentimiento de Google UMP se pide antes de inicializar",
      "**Temas:** claro, oscuro y del sistema, siguiendo la apariencia del dispositivo en vivo",
      "**i18n:** español e inglés completos con i18next, conmutables desde Ajustes",
    ],
    shipTitle: "Del test cerrado a producción",
    shipP:
      "Google Play exige ahora un test cerrado de 14 días antes de que una cuenta de desarrollador personal nueva pueda publicar. Lo llevé como un ciclo de producto y no como un trámite: cada comentario se convirtió en un cambio registrado, publicado en una build nueva y verificado otra vez antes de pedir el acceso a producción.",
    shipSteps: [
      "**Cero crashes y cero bugs funcionales** en los dispositivos y versiones de Android probados. Todo el feedback fue sobre onboarding, presentación y personalización.",
      "**Cinco cambios publicados:** una opción de tema Sistema que sigue al dispositivo en vivo · un recorrido interactivo de seis tarjetas al abrir por primera vez · un acceso a “Valorar esta app” con la hoja nativa de reseña · una reescritura ASO del título y las descripciones corta y larga en los dos idiomas · nuevas capturas de tienda con un modo de juego por captura.",
      "**Cumplimiento listo antes de publicar:** política de privacidad y términos publicados, flujo de consentimiento de anuncios con UMP y opción accesible para gestionarlo, y Crashlytics conectado para la monitorización posterior.",
    ],
    shipNote:
      "La app salió como **Android App Bundle** firmado y va por la versión **1.1.1**, con correcciones posteriores guiadas por informes reales de Crashlytics y no por suposiciones.",
    downloadTitle: "Descarga y disponibilidad",
    downloadP:
      "MINDFLOW está **publicada y es gratuita en Google Play**, en todo el mundo, para Android. Sin cuenta, sin registro y sin conexión a internet para jugar.",
    storeMeta: "com.pvilar.mindflow · v1.1.1 · Gratis · Android",
    storeBtn: "Consíguela en Google Play ↗",
    storeListing: "Ficha en la tienda:",
  },
};
