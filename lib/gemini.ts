import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({ 
  model: "gemini-flash-latest",
  generationConfig: {
    responseMimeType: "application/json",
  }
});


export async function getRecommendationsFromGemini(preferences: any) {
  const prompt = `
    Eres un experto recomendador de libros y películas. 
    Basado en las siguientes preferencias del usuario, genera 4 recomendaciones (mezcla de libros y películas).
    
    Preferencias:
    - Géneros: ${preferences.generos?.join(", ") || "Cualquiera"}
    - Autores favoritos: ${preferences.autores?.join(", ") || "Cualquiera"}
    - Actores favoritos: ${preferences.actores?.join(", ") || "Cualquiera"}
    - Temas de interés: ${preferences.temas?.join(", ") || "Cualquiera"}

    Devuelve un JSON con la siguiente estructura:
    {
      "recommendations": [
        {
          "title": "Nombre de la obra",
          "type": "movie" | "book",
          "reason": "Breve razón de por qué se recomienda (1-2 frases)",
          "fullReason": "Explicación detallada de por qué encaja con sus gustos (3-4 frases)",
          "genre": "Género(s)",
          "meta": "Autor o Director y año",
          "emoji": "Un emoji representativo",
          "searchQuery": "Consulta de búsqueda optimizada para Google Books o TMDb"
        }
      ]
    }
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}
