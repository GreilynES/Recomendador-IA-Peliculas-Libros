"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Recommendation } from "@/lib/data"
import type { Preferences } from "./preferences-form"

type ResultsPageProps = {
  preferences: Preferences
  recommendations: Recommendation[]
  onViewDetail: (rec: Recommendation) => void
  onEditPreferences: () => void
  onNewSearch: () => void
}

type FilterType = "all" | "movies" | "books"

export function ResultsPage({ preferences, recommendations, onViewDetail, onEditPreferences, onNewSearch }: ResultsPageProps) {
  const [filter, setFilter] = useState<FilterType>("all")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const filtered = recommendations.filter((r) => {
    if (filter === "all") return true
    if (filter === "movies") return r.type === "movie"
    return r.type === "book"
  })

  const movies = filtered.filter((r) => r.type === "movie")
  const books = filtered.filter((r) => r.type === "book")

  return (
    <main className="min-h-screen bg-[var(--background)] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-8">

        {/* Header */}
        <div className="mb-10">
          <button
            onClick={onEditPreferences}
            className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-6 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Editar preferencias
          </button>

          <div className="flex items-start justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--terracotta)] font-medium mb-3">Tus recomendaciones</p>
              <h1 className="font-serif text-4xl font-bold text-[var(--foreground)] text-balance">
                {recommendations.length} títulos seleccionados para ti
              </h1>
              {/* Preference pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {preferences.genres.slice(0, 4).map((g) => (
                  <span key={g} className="px-3 py-1 rounded-full bg-[var(--teal)]/10 text-[var(--teal)] text-xs font-medium">{g}</span>
                ))}
                {preferences.mood && (
                  <span className="px-3 py-1 rounded-full bg-[var(--terracotta)]/10 text-[var(--terracotta)] text-xs font-medium">{preferences.mood}</span>
                )}
                {preferences.storyType && (
                  <span className="px-3 py-1 rounded-full bg-[var(--beige)] text-[var(--muted-foreground)] text-xs font-medium">{preferences.storyType}</span>
                )}
              </div>
            </div>
            <button
              onClick={onNewSearch}
              className="flex-shrink-0 px-6 py-3 rounded-full bg-[var(--teal)] text-white text-sm font-medium hover:bg-[var(--teal-dark)] transition-colors shadow-md cursor-pointer"
            >
              Nueva búsqueda
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mt-8 border-b border-[var(--border)] pb-0">
            {(["all", "movies", "books"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-5 py-3 text-sm font-medium border-b-2 transition-all cursor-pointer -mb-px",
                  filter === f
                    ? "border-[var(--teal)] text-[var(--teal)]"
                    : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                )}
              >
                {f === "all" ? "Todo" : f === "movies" ? `Películas (${recommendations.filter(r => r.type === "movie").length})` : `Libros (${recommendations.filter(r => r.type === "book").length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Movies section */}
        {(filter === "all" || filter === "movies") && movies.length > 0 && (
          <section className="mb-14">
            {filter === "all" && (
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[var(--teal)]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[var(--foreground)]">Películas</h2>
              </div>
            )}
            <div className="grid grid-cols-4 gap-5">
              {movies.map((rec) => (
                <RecommendationCard
                  key={rec.id}
                  rec={rec}
                  isFavorite={favorites.has(rec.id)}
                  onToggleFavorite={(e) => toggleFavorite(rec.id, e)}
                  onClick={() => onViewDetail(rec)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Books section */}
        {(filter === "all" || filter === "books") && books.length > 0 && (
          <section>
            {filter === "all" && (
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[var(--terracotta)]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--terracotta)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[var(--foreground)]">Libros</h2>
              </div>
            )}
            <div className="grid grid-cols-4 gap-5">
              {books.map((rec) => (
                <RecommendationCard
                  key={rec.id}
                  rec={rec}
                  isFavorite={favorites.has(rec.id)}
                  onToggleFavorite={(e) => toggleFavorite(rec.id, e)}
                  onClick={() => onViewDetail(rec)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

type CardProps = {
  rec: Recommendation
  isFavorite: boolean
  onToggleFavorite: (e: React.MouseEvent) => void
  onClick: () => void
}

function RecommendationCard({ rec, isFavorite, onToggleFavorite, onClick }: CardProps) {
  return (
    <article
      onClick={onClick}
      className="group bg-[var(--card)] rounded-2xl overflow-hidden shadow-sm border border-[var(--border)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-[var(--beige)]">
        {rec.imageUrl ? (
          <img 
            src={rec.imageUrl} 
            alt={rec.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: rec.color }}
          >
            <span className="text-5xl">{rec.emoji}</span>
          </div>
        )}
        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium",
            rec.type === "movie" ? "bg-[var(--teal)] text-white" : "bg-[var(--terracotta)] text-white"
          )}>
            {rec.type === "movie" ? "Película" : "Libro"}
          </span>
        </div>
        {/* Favorite button */}
        <button
          onClick={onToggleFavorite}
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer",
            isFavorite
              ? "bg-[var(--terracotta)] text-white"
              : "bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm"
          )}
          aria-label={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
        >
          <svg className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <div>
          <p className="text-xs text-[var(--muted-foreground)] mb-1">{rec.genre}</p>
          <h3 className="font-serif text-base font-bold text-[var(--foreground)] leading-snug group-hover:text-[var(--teal)] transition-colors">
            {rec.title}
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{rec.meta}</p>
        </div>
        <p className="text-xs text-[var(--muted-foreground)] leading-relaxed line-clamp-2">{rec.description}</p>

        {/* Reason */}
        <div className="rounded-xl bg-[var(--teal)]/5 border border-[var(--teal)]/10 px-3 py-2">
          <p className="text-xs text-[var(--teal)] leading-relaxed">
            <span className="font-semibold">Por qué te lo recomendamos:</span> {rec.reason}
          </p>
        </div>

        <div className="flex gap-2 mt-1">
          <button className="flex-1 py-2 rounded-full bg-[var(--teal)] text-white text-xs font-medium hover:bg-[var(--teal-dark)] transition-colors cursor-pointer">
            Ver más
          </button>
          <button className="px-3 py-2 rounded-full border border-[var(--border)] text-[var(--muted-foreground)] text-xs hover:bg-[var(--beige)] transition-colors cursor-pointer">
            Info
          </button>
        </div>
      </div>
    </article>
  )
}
