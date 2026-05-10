import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "")


type PreferencesBody = {
  name: string
  genres: string[]
  movieActors: string
  bookAuthors: string
  storyType: string
  mood: string
  mediaType: "movies" | "books" | "both"
}

interface AiRecommendation {
  title: string;
  type: "movie" | "book";
  reason: string;
  fullReason: string;
  synopsis: string;
  tags: string[];
}

async function searchMovie(title: string) {
  const apiKey = process.env.TMDB_API_KEY

  if (!apiKey) return null

  const url = new URL("https://api.themoviedb.org/3/search/movie")
  url.searchParams.set("api_key", apiKey)
  url.searchParams.set("query", title)
  url.searchParams.set("language", "es-ES")
  url.searchParams.set("page", "1")

  const response = await fetch(url.toString(), {
    headers: {
      accept: "application/json",
    },
  })


  if (!response.ok) return null

  const data = await response.json()
  const movie = data.results?.[0]

  if (!movie) return null

  return {
    id: `movie-${movie.id}`,
    title: movie.title,
    type: "movie",
    genre: "Película",
    meta: movie.release_date
      ? `Estreno: ${movie.release_date.slice(0, 4)}`
      : "Película",
    description: movie.overview || "Sin descripción disponible.",
    reason: "",
    emoji: "🎬",
    color: "linear-gradient(135deg, #2F7C7A, #1f4f4e)",
    imageUrl: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
  }
}

async function searchBook(title: string) {
  const url = new URL("https://www.googleapis.com/books/v1/volumes")
  url.searchParams.set("q", title)
  url.searchParams.set("maxResults", "1")
  url.searchParams.set("langRestrict", "es")
  
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY
  if (apiKey) url.searchParams.set("key", apiKey)

  const response = await fetch(url.toString())

  if (!response.ok) return null

  const data = await response.json()
  const book = data.items?.[0]?.volumeInfo

  if (!book) return null

  return {
    id: `book-${data.items[0].id}`,
    title: book.title,
    type: "book",
    genre: book.categories?.[0] || "Libro",
    meta: book.authors?.join(", ") || "Autor no disponible",
    description: book.description || "Sin descripción disponible.",
    reason: "",
    emoji: "📚",
    color: "linear-gradient(135deg, #C98663, #8f5538)",
    imageUrl: (book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail)?.replace("http://", "https://") || null,
  }
}

export async function POST(request: Request) {
  try {
    const preferences = (await request.json()) as PreferencesBody
    console.log("Usando API Key (primeros 5 caracteres):", process.env.GOOGLE_GEMINI_API_KEY?.substring(0, 5))


    const prompt = `
Eres un recomendador inteligente de libros y películas.

Genera recomendaciones según estas preferencias del usuario:

Nombre: ${preferences.name}
Géneros: ${preferences.genres.join(", ")}
Actores favoritos: ${preferences.movieActors || "No indicó"}
Autores favoritos: ${preferences.bookAuthors || "No indicó"}
Tipo de historia: ${preferences.storyType}
Estado de ánimo: ${preferences.mood}
Tipo de contenido solicitado: ${preferences.mediaType}

Reglas:
- Si mediaType es "movies", recomienda solo películas.
- Si mediaType es "books", recomienda solo libros.
- Si mediaType es "both", recomienda mezcla de libros y películas.
- Devuelve títulos reales y conocidos.
- Devuelve exactamente 6 recomendaciones.
- Responde SOLO en JSON válido.
- No agregues explicación fuera del JSON.

Formato:
[
  {
    "title": "Nombre del título",
    "type": "movie",
    "reason": "Motivo breve",
    "fullReason": "Explicación detallada",
    "synopsis": "Resumen de la trama",
    "tags": ["etiqueta1", "etiqueta2"]
  }
]
`

    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      generationConfig: {
        responseMimeType: "application/json",
      }
    })




    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    let aiRecommendations: AiRecommendation[] = []
    try {
      // Intentar parsear directamente si Gemini respetó el responseMimeType
      aiRecommendations = JSON.parse(text)
    } catch (e) {
      // Si falla, intentar extraer de bloques de código markdown
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      const cleanText = jsonMatch ? jsonMatch[0] : "[]"
      aiRecommendations = JSON.parse(cleanText)
    }


    const enrichedResults = await Promise.all(
      aiRecommendations.map(async (rec) => {
        const externalData =
          rec.type === "movie"
            ? await searchMovie(rec.title)
            : await searchBook(rec.title)

        return {
          id: externalData?.id || `${rec.type}-${rec.title}-${Math.random().toString(36).substring(7)}`,
          title: externalData?.title || rec.title,
          type: rec.type,
          genre: externalData?.genre || (rec.type === "movie" ? "Película" : "Libro"),
          meta: externalData?.meta || (rec.type === "movie" ? "TMDb" : "Google Books"),
          description: externalData?.description || rec.reason,
          reason: rec.reason,
          fullReason: rec.fullReason || rec.reason,
          synopsis: externalData?.description || rec.synopsis || "Sinopsis no disponible.",
          emoji: externalData?.emoji || (rec.type === "movie" ? "🎬" : "📚"),
          color: externalData?.color || (rec.type === "movie" ? "linear-gradient(135deg, #2F7C7A, #1f4f4e)" : "linear-gradient(135deg, #C98663, #8f5538)"),
          imageUrl: externalData?.imageUrl || null,
          tags: rec.tags || [],
          stats: (externalData as any)?.stats || [
            { label: "Fuente", value: rec.type === "movie" ? "TMDb" : "Google Books" },
            { label: "Tipo", value: rec.type === "movie" ? "Film" : "Lectura" }
          ]
        }
      })
    )

    return NextResponse.json({
      recommendations: enrichedResults,
    })
  } catch (error) {
    console.error("Error generando recomendaciones:", error)

    return NextResponse.json(
      {
        error: "No se pudieron generar las recomendaciones.",
      },
      { status: 500 }
    )
  }
}