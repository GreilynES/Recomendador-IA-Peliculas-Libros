import OpenAI from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

type PreferencesBody = {
  name: string
  genres: string[]
  movieActors: string
  bookAuthors: string
  storyType: string
  mood: string
  mediaType: "movies" | "books" | "both"
}

type AiRecommendation = {
  title: string
  type: "movie" | "book"
  reason: string
}

async function searchMovie(title: string) {
  const apiKey = process.env.TMDB_API_KEY

  if (!apiKey) return null

  const url = new URL("https://api.themoviedb.org/3/search/movie")
  url.searchParams.set("query", title)
  url.searchParams.set("language", "es-ES")
  url.searchParams.set("page", "1")

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${apiKey}`,
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
    imageUrl: book.imageLinks?.thumbnail || null,
  }
}

export async function POST(request: Request) {
  try {
    const preferences = (await request.json()) as PreferencesBody

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
    "reason": "Motivo breve de recomendación"
  }
]
`

    const aiResponse = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    })

    const text = aiResponse.output_text || "[]"
    const aiRecommendations = JSON.parse(text) as AiRecommendation[]

    const enrichedResults = await Promise.all(
      aiRecommendations.map(async (rec) => {
        const result =
          rec.type === "movie"
            ? await searchMovie(rec.title)
            : await searchBook(rec.title)

        if (!result) {
          return {
            id: `${rec.type}-${rec.title}`,
            title: rec.title,
            type: rec.type,
            genre: rec.type === "movie" ? "Película" : "Libro",
            meta: rec.type === "movie" ? "TMDb" : "Google Books",
            description: "No se encontró información detallada en la API externa.",
            reason: rec.reason,
            emoji: rec.type === "movie" ? "🎬" : "📚",
            color:
              rec.type === "movie"
                ? "linear-gradient(135deg, #2F7C7A, #1f4f4e)"
                : "linear-gradient(135deg, #C98663, #8f5538)",
            imageUrl: null,
          }
        }

        return {
          ...result,
          reason: rec.reason,
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