const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function searchMovie(query: string) {
  if (!TMDB_API_KEY) return null;
  
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=es-ES`
    );
    const data = await response.json();
    return data.results?.[0] || null;
  } catch (error) {
    console.error("Error searching movie:", error);
    return null;
  }
}

export function getTMDBImageUrl(path: string | null) {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/w500${path}`;
}
