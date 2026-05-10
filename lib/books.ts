const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
const GOOGLE_BOOKS_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export async function searchBook(query: string) {
  try {
    let url = `${GOOGLE_BOOKS_BASE_URL}?q=${encodeURIComponent(query)}&maxResults=1&langRestrict=es`;
    if (GOOGLE_BOOKS_API_KEY) {
      url += `&key=${GOOGLE_BOOKS_API_KEY}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    return data.items?.[0] || null;
  } catch (error) {
    console.error("Error searching book:", error);
    return null;
  }
}
