export type Recommendation = {
  id: string
  type: "movie" | "book"
  title: string
  genre: string
  meta: string // director/author + year
  description: string
  reason: string
  fullReason: string
  synopsis: string
  emoji: string
  color: string
  tags: string[]
  stats: { label: string; value: string }[]
  imageUrl?: string | null
}

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: "m1",
    type: "movie",
    title: "Arrival",
    genre: "Ciencia Ficción · Drama",
    meta: "Denis Villeneuve · 2016",
    description: "Una lingüista es reclutada para comunicarse con extraterrestres que llegan a la Tierra.",
    reason: "Combina ciencia ficción reflexiva con profunda emoción narrativa, ideal para quien ama historias épicas.",
    fullReason: "Arrival conecta perfectamente con tu amor por la ciencia ficción reflexiva y las historias épicas. La película es una meditación sobre el lenguaje, el tiempo y la pérdida, narrada con la elegancia visual de Villeneuve. Si disfrutas de historias que te hacen pensar más allá del final, este es tu próximo film favorito.",
    synopsis: "Louise Banks es una reconocida lingüista que, junto a un equipo de científicos, tiene la misión de establecer comunicación con una especie alienígena que acaba de llegar a la Tierra en doce naves misteriosas. A medida que las tensiones globales aumentan, Louise se sumergirá en una carrera contra el tiempo para descifrar el lenguaje extraterrestre antes de que estalle una guerra mundial.",
    emoji: "Orbit",
    color: "linear-gradient(135deg, #1a3a4a 0%, #2F7C7A 100%)",
    tags: ["Lingüística", "Primer contacto", "Tiempo no lineal", "Amy Adams", "Intelectual", "Emotivo"],
    stats: [
      { label: "Calificación IMDb", value: "7.9/10" },
      { label: "Duración", value: "116 min" },
      { label: "Premios Oscar", value: "8 nominaciones" },
    ],
  },
  {
    id: "m2",
    type: "movie",
    title: "The Grand Budapest Hotel",
    genre: "Comedia · Drama",
    meta: "Wes Anderson · 2014",
    description: "Las aventuras de Gustave H., un legendario conserje de un famoso hotel europeo.",
    reason: "Narrativa épica y visualmente deslumbrante para quien ama las historias con mucha personalidad.",
    fullReason: "Si amas las historias con un estilo visual inconfundible y una narrativa que mezcla aventura, nostalgia y humor fino, The Grand Budapest Hotel es perfecta. Anderson crea un universo de capas donde cada plano es una obra de arte, y el guión te mantiene pegado a la pantalla con su ritmo y humor.",
    synopsis: "En la República de Zubrowka de los años 30, el excéntrico y encantador Gustave H. trabaja como conserje del legendario Grand Budapest Hotel. Junto a Zero, su joven botones, se ven envueltos en el robo de un famoso cuadro renacentista y la lucha por la herencia de una fortuna familiar.",
    emoji: "Hotel",
    color: "linear-gradient(135deg, #C98663 0%, #e8b89a 100%)",
    tags: ["Wes Anderson", "Humor fino", "Vintage", "Europa", "Ralph Fiennes", "Arte visual"],
    stats: [
      { label: "Calificación IMDb", value: "8.1/10" },
      { label: "Duración", value: "99 min" },
      { label: "Premios Oscar", value: "4 ganados" },
    ],
  },
  {
    id: "m3",
    type: "movie",
    title: "Past Lives",
    genre: "Drama · Romance",
    meta: "Celine Song · 2023",
    description: "Dos amigos de infancia se reencuentran décadas después y reflexionan sobre el destino y las conexiones que pudo ser.",
    reason: "Para quienes buscan historias íntimas y emocionalmente resonantes sobre el amor y la identidad.",
    fullReason: "Past Lives es exactamente lo que necesitas si tu estado de ánimo apunta a reflexionar sobre las elecciones de vida y las conexiones que moldean quiénes somos. La película no busca el drama fácil sino la complejidad emocional real, filmada con una delicadeza extraordinaria.",
    synopsis: "Nora y Hae Sung, dos profundos amigos de infancia en Seúl, se separan cuando la familia de Nora emigra a Canadá. 12 años después se reencuentran brevemente vía internet, y 12 años más tarde, Hae Sung viaja a Nueva York donde Nora construyó su vida. En 24 horas, los dos amigos tendrán que confrontar sus vidas, sus elecciones y qué significa el destino.",
    emoji: "Waves",
    color: "linear-gradient(135deg, #2b3a5c 0%, #6b8db5 100%)",
    tags: ["Romance", "Identidad", "Emigración", "Reflexivo", "A24", "Íntimo"],
    stats: [
      { label: "Calificación IMDb", value: "7.8/10" },
      { label: "Duración", value: "105 min" },
      { label: "Premios Oscar", value: "2 nominaciones" },
    ],
  },
  {
    id: "m4",
    type: "movie",
    title: "Dune: Parte Dos",
    genre: "Ciencia Ficción · Aventura",
    meta: "Denis Villeneuve · 2024",
    description: "Paul Atreides une fuerzas con los Fremen para vengar a su familia y cumplir con el destino mítico del universo.",
    reason: "Para quienes buscan narrativas épicas, mundos elaborados y una producción cinematográfica majestuosa.",
    fullReason: "Si te gustan los géneros épicos con profundidad política y worldbuilding extraordinario, Dune 2 es una experiencia cinematográfica irrepetible. La escala de la producción, el trabajo de Villeneuve y el reparto de estrellas crean algo que trasciende el blockbuster convencional.",
    synopsis: "Continuando donde terminó la primera parte, Paul Atreides viaja al sur del desierto de Arrakis para unirse a los Fremen en su lucha contra la Casa Harkonnen. Mientras consolida su papel como líder, Chani desconfía de las profecías que lo rodean. Paul deberá elegir entre el amor de Chani y el destino que lo lleva a una guerra santa galáctica.",
    emoji: "Sun",
    color: "linear-gradient(135deg, #5c3a1e 0%, #c4883a 100%)",
    tags: ["Épico", "Ciencia Ficción", "Política", "Zendaya", "Timothée Chalamet", "Desierto"],
    stats: [
      { label: "Calificación IMDb", value: "8.5/10" },
      { label: "Duración", value: "166 min" },
      { label: "Recaudación", value: "$714 millones" },
    ],
  },
  {
    id: "b1",
    type: "book",
    title: "El nombre del viento",
    genre: "Fantasía · Aventura",
    meta: "Patrick Rothfuss · 2007",
    description: "La historia de Kvothe, un mago legendario que narra su propia vida llena de música, magia y misterio.",
    reason: "Para lectores que buscan un mundo richísimo, prosa elegante y un protagonista inolvidable.",
    fullReason: "El nombre del viento es una de las obras de fantasía más aclamadas de la última década por razones muy claras: la prosa es exquisita, el protagonista es complejo y carismático, y el worldbuilding te atrapa desde las primeras páginas. Si disfrutas de historias épicas con corazón íntimo, este libro es imprescindible.",
    synopsis: "Kvothe es considerado el mayor mago que ha existido, además de músico, ladrón, guerrero y muchas cosas más según la leyenda. Ahora, retirado y de incógnito en una pequeña posada, acepta narrar su historia a un cronista durante tres días. Lo que comienza es un relato épico sobre la infancia en un clan de artistas viajeros, años de extrema pobreza, el ingreso a la Universidad de magia y la búsqueda de los misteriosos Chandrian.",
    emoji: "BookOpen",
    color: "linear-gradient(135deg, #1f3a2a 0%, #2F7C7A 100%)",
    tags: ["Magia", "Música", "Universidad", "Patrick Rothfuss", "Épico", "Trilogía"],
    stats: [
      { label: "Calificación GoodReads", value: "4.54/5" },
      { label: "Páginas", value: "662" },
      { label: "Serie", value: "Crónica del Asesino de Reyes #1" },
    ],
  },
  {
    id: "b2",
    type: "book",
    title: "Educated",
    genre: "Memorias · No ficción",
    meta: "Tara Westover · 2018",
    description: "Una mujer que jamás asistió a la escuela narra cómo se educó a sí misma hasta llegar a Cambridge.",
    reason: "Para quienes buscan historias de superación personal narradas con una honestidad conmovedora.",
    fullReason: "Educated es un libro que te cambia. La historia de Tara Westover sobre crecer en una familia extremista en Idaho y luego encontrar la educación como camino de liberación es tan poderosa como bien escrita. Si tu estado de ánimo apunta a inspirarte, este memoir es exactamente lo que necesitas.",
    synopsis: "Tara Westover nació en una familia mormona fundamentalista en Idaho. Sus padres no creían en el sistema médico ni en la educación formal, por lo que Tara nunca fue a la escuela. A los 17 años, casi sin saber leer bien, decidió estudiar sola para ingresar a la universidad. Lo que siguió fue un viaje extraordinario que la llevó a obtener un doctorado en Cambridge.",
    emoji: "GraduationCap",
    color: "linear-gradient(135deg, #4a2c2a 0%, #C98663 100%)",
    tags: ["Memorias", "Familia", "Educación", "Superación", "Estados Unidos", "Identidad"],
    stats: [
      { label: "Calificación GoodReads", value: "4.47/5" },
      { label: "Páginas", value: "334" },
      { label: "Semanas en NYT", value: "177 semanas" },
    ],
  },
  {
    id: "b3",
    type: "book",
    title: "La elegancia del erizo",
    genre: "Ficción literaria · Filosofía",
    meta: "Muriel Barbery · 2006",
    description: "Dos voces inusuales, una conserje y una niña prodigio, exploran la belleza oculta en lo cotidiano.",
    reason: "Para quienes aman la literatura que filosofa sin perder la humanidad y el humor.",
    fullReason: "La elegancia del erizo es exactamente el libro que necesitas si buscas una lectura reflexiva pero accesible. Barbery entreteje filosofía, arte y emoción a través de dos personajes extraordinariamente bien construidos. El resultado es una novela íntima y luminosa que te recuerda que la belleza está en los lugares más inesperados.",
    synopsis: "Renée Michel es la conserje del número 7 de la Rue de Grenelle, un edificio de lujo parisino. Cultísima y autodidacta, oculta su inteligencia bajo la apariencia de una simple conserje. Paloma, de 12 años, hija de una familia rica del edificio, ha decidido que la vida adulta carece de sentido y planea suicidarse a los 13. Ambas narran su visión del mundo hasta que un nuevo vecino japonés las une.",
    emoji: "Feather",
    color: "linear-gradient(135deg, #2a2a3a 0%, #7a7068 100%)",
    tags: ["Francia", "Filosofía", "Arte", "Belleza", "Cotidiano", "Literario"],
    stats: [
      { label: "Calificación GoodReads", value: "4.04/5" },
      { label: "Páginas", value: "359" },
      { label: "Copias vendidas", value: "+2 millones" },
    ],
  },
  {
    id: "b4",
    type: "book",
    title: "Klara y el Sol",
    genre: "Ciencia Ficción · Literario",
    meta: "Kazuo Ishiguro · 2021",
    description: "Una Amiga Artificial observa el mundo humano con una curiosidad e inteligencia sorprendentes.",
    reason: "Para quienes quieren ciencia ficción que profundiza en lo que significa ser humano.",
    fullReason: "Kazuo Ishiguro, Nobel de Literatura, crea en Klara y el Sol una de las narraciones más originales y emocionalmente ricas de la ciencia ficción contemporánea. La perspectiva de Klara, una robot que observa la humanidad con inocencia y agudeza, genera una de las reflexiones más hermosas sobre el amor, la soledad y la consciencia que encontrarás en la literatura reciente.",
    synopsis: "Klara es una Amiga Artificial, un robot solar diseñado para hacer compañía a adolescentes. Desde la vitrina de la tienda donde espera ser comprada, observa el mundo con una inteligencia y sensibilidad extraordinarias. Cuando Josie la elige, Klara se convierte en su compañera más fiel y comenzará a comprender la complejidad del amor humano de maneras que ni ella misma anticipaba.",
    emoji: "Bot",
    color: "linear-gradient(135deg, #1a3a5c 0%, #4a8ab5 100%)",
    tags: ["Inteligencia Artificial", "Ishiguro", "Nobel", "Adolescencia", "Futuro cercano", "Lírico"],
    stats: [
      { label: "Calificación GoodReads", value: "4.13/5" },
      { label: "Páginas", value: "307" },
      { label: "Premio Booker", value: "Longlist 2021" },
    ],
  },
]
