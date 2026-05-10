import { getRecommendationsFromGemini } from "./gemini";
import { searchMovie, getTMDBImageUrl } from "./movies";
import { searchBook } from "./books";
import { Recommendation } from "./data";

export async function getDetailedRecommendations(preferences: any): Promise<Recommendation[]> {
  const geminiResponse = await getRecommendationsFromGemini(preferences);
  const recommendations = geminiResponse.recommendations;

  const detailedRecommendations = await Promise.all(
    recommendations.map(async (rec: any) => {
      let extraData: any = null;
      let imageUrl = null;
      let stats = [];

      if (rec.type === "movie") {
        extraData = await searchMovie(rec.searchQuery || rec.title);
        imageUrl = extraData ? getTMDBImageUrl(extraData.poster_path) : null;
        stats = [
          { label: "Calificación", value: extraData?.vote_average ? `${extraData.vote_average}/10` : "N/A" },
          { label: "Votos", value: extraData?.vote_count?.toString() || "N/A" }
        ];
      } else {
        extraData = await searchBook(rec.searchQuery || rec.title);
        imageUrl = extraData?.volumeInfo?.imageLinks?.thumbnail || null;
        stats = [
          { label: "Páginas", value: extraData?.volumeInfo?.pageCount?.toString() || "N/A" },
          { label: "Calificación", value: extraData?.volumeInfo?.averageRating ? `${extraData.volumeInfo.averageRating}/5` : "N/A" }
        ];
      }

      return {
        id: Math.random().toString(36).substring(7),
        type: rec.type,
        title: rec.title,
        genre: rec.genre,
        meta: rec.meta,
        description: extraData?.overview || extraData?.volumeInfo?.description || rec.reason,
        reason: rec.reason,
        fullReason: rec.fullReason,
        synopsis: extraData?.overview || extraData?.volumeInfo?.description || "No hay sinopsis disponible.",
        emoji: rec.emoji,
        color: rec.type === "movie" ? "linear-gradient(135deg, #1a3a4a 0%, #2F7C7A 100%)" : "linear-gradient(135deg, #1f3a2a 0%, #2F7C7A 100%)",
        tags: rec.genre.split(",").map((g: string) => g.trim()),
        stats: stats,
        imageUrl: imageUrl
      } as Recommendation;
    })
  );

  return detailedRecommendations;
}
