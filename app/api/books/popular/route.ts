import { NextResponse } from "next/server"

export const revalidate = 900 // Revalidar cada 15 minutos

export async function GET() {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY
  
  try {
    // Usamos una búsqueda amplia para asegurar resultados
    const url = new URL("https://www.googleapis.com/books/v1/volumes")
    url.searchParams.set("q", "literatura espanola")
    url.searchParams.set("maxResults", "20")
    url.searchParams.set("langRestrict", "es")
    url.searchParams.set("printType", "books")
    if (apiKey) url.searchParams.set("key", apiKey)

    const response = await fetch(url.toString(), { next: { revalidate: 900 } })
    
    if (!response.ok) {
      console.error("Google Books API error:", response.status)
      return NextResponse.json({ results: [] })
    }

    const data = await response.json()
    
    const results = (data.items || []).map((item: any) => {
      const book = item.volumeInfo
      return {
        id: `book-${item.id}`,
        title: book.title,
        type: "book",
        genre: book.categories?.[0] || "Libro",
        meta: book.authors?.join(", ") || "Autor desconocido",
        description: book.description || "Sin descripción disponible.",
        reason: "Obra literaria seleccionada por su relevancia cultural.",
        fullReason: book.description || "Sin descripción detallada.",
        synopsis: book.description || "Sinopsis no disponible.",
        emoji: "BookOpen",
        color: "linear-gradient(135deg, #C98663, #8f5538)",
        imageUrl: (book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail)?.replace("http://", "https://") || null,
        tags: book.categories || ["Literatura"],
        stats: [
          { label: "Páginas", value: book.pageCount?.toString() || "N/A" },
          { label: "Publicación", value: book.publishedDate || "N/A" }
        ]
      }
    })

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json({ results: [] })
  }
}
