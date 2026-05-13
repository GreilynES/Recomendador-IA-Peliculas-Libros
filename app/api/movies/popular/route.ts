import { NextResponse } from "next/server"

export const revalidate = 900 // Revalidar cada 15 minutos (900 segundos)

export async function GET() {
  const apiKey = process.env.TMDB_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Missing TMDB_API_KEY" }, { status: 500 })
  }

  try {
    // Usamos una página aleatoria entre 1 y 5 para variar las opciones cada vez que revalide
    const randomPage = Math.floor(Math.random() * 5) + 1
    
    const url = new URL("https://api.themoviedb.org/3/discover/movie")
    url.searchParams.set("api_key", apiKey)
    url.searchParams.set("language", "es-ES")
    url.searchParams.set("sort_by", "primary_release_date.desc")
    url.searchParams.set("include_adult", "false") // Filtro -18
    url.searchParams.set("primary_release_date.lte", new Date().toISOString().split('T')[0])
    url.searchParams.set("page", randomPage.toString())

    const response = await fetch(url.toString(), { next: { revalidate: 900 } })
    if (!response.ok) throw new Error("Failed to fetch from TMDB")

    const data = await response.json()
    
    const results = data.results.map((movie: any) => ({
      id: `movie-${movie.id}`,
      title: movie.title,
      type: "movie",
      genre: "Película",
      meta: movie.release_date ? movie.release_date.slice(0, 4) : "Reciente",
      description: movie.overview || "Sin descripción disponible.",
      reason: "Estreno reciente seleccionado para tu galería.",
      fullReason: movie.overview,
      synopsis: movie.overview,
      emoji: "Clapperboard",
      color: "linear-gradient(135deg, #2F7C7A, #1f4f4e)",
      imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
      tags: ["Reciente", "Cine"],
      stats: [
        { label: "Calificación", value: `${movie.vote_average}/10` },
        { label: "Votos", value: movie.vote_count.toString() }
      ]
    }))

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error fetching movies:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
