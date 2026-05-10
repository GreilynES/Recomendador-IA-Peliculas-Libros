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

const cardStyle = {
  background: "rgba(23,18,14,0.9)",
  border: "1px solid rgba(199,162,124,0.1)",
}

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
    <main className="min-h-screen bg-[#0D0A07] pt-24 pb-20 relative">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[600px] h-[400px] bg-[#C7A27C]/4 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/2 left-0 w-[400px] h-[400px] bg-[#8B5E4A]/4 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">

        {/* Header */}
        <div className="mb-12">
          <button
            onClick={onEditPreferences}
            className="flex items-center gap-2 text-sm text-[#BBA892] hover:text-[#F3E8D7] transition-colors mb-6 cursor-pointer font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Editar preferencias
          </button>

          <div className="flex items-start justify-between gap-8">
            <div>
              <p className="text-[#C7A27C]/60 text-xs uppercase tracking-[0.2em] font-semibold mb-3">Tus recomendaciones</p>
              <h1 className="font-serif text-5xl font-bold text-[#F3E8D7]">
                {recommendations.length} títulos<br />para vos
              </h1>
              <div className="flex flex-wrap gap-2 mt-5">
                {preferences.genres.slice(0, 4).map((g) => (
                  <span key={g} className="px-3 py-1.5 rounded-full text-[#BBA892] text-xs font-semibold"
                    style={{ background: "rgba(30,24,19,0.8)", border: "1px solid rgba(199,162,124,0.15)" }}>
                    {g}
                  </span>
                ))}
                {preferences.mood && (
                  <span className="px-3 py-1.5 rounded-full text-[#C7A27C] text-xs font-semibold"
                    style={{ background: "rgba(199,162,124,0.1)", border: "1px solid rgba(199,162,124,0.25)" }}>
                    {preferences.mood}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onNewSearch}
              className="flex-shrink-0 px-7 py-3.5 rounded-full text-sm font-bold text-[#0D0A07] transition-all hover:-translate-y-0.5 cursor-pointer"
              style={{ background: "#C7A27C", boxShadow: "0 6px 24px rgba(199,162,124,0.25)" }}
            >
              Nueva búsqueda
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mt-10">
            {(["all", "movies", "books"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer"
                style={{
                  background: filter === f ? "#C7A27C" : "rgba(23,18,14,0.8)",
                  color: filter === f ? "#0D0A07" : "#BBA892",
                  border: filter === f ? "1px solid #C7A27C" : "1px solid rgba(199,162,124,0.15)",
                }}
              >
                {f === "all" ? "Todo" : f === "movies"
                  ? `Películas (${recommendations.filter(r => r.type === "movie").length})`
                  : `Libros (${recommendations.filter(r => r.type === "book").length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Movies */}
        {(filter === "all" || filter === "movies") && movies.length > 0 && (
          <section className="mb-16">
            {filter === "all" && (
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#C7A27C]"
                  style={{ background: "rgba(199,162,124,0.1)" }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#F3E8D7]">Películas</h2>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-max gap-4">
              {movies.map((rec, idx) => (
                <div key={rec.id} style={{
                  gridColumn: idx % 7 === 0 || idx % 7 === 3 ? "span 2" : "span 1",
                  gridRow: idx % 7 === 0 || idx % 7 === 3 ? "span 2" : "span 1",
                }}>
                  <RecommendationCard
                    rec={rec}
                    isFavorite={favorites.has(rec.id)}
                    onToggleFavorite={(e) => toggleFavorite(rec.id, e)}
                    onClick={() => onViewDetail(rec)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Books */}
        {(filter === "all" || filter === "books") && books.length > 0 && (
          <section>
            {filter === "all" && (
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#C7A27C]"
                  style={{ background: "rgba(199,162,124,0.1)" }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#F3E8D7]">Libros</h2>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-max gap-4">
              {books.map((rec, idx) => (
                <div key={rec.id} style={{
                  gridColumn: idx % 7 === 1 || idx % 7 === 4 ? "span 2" : "span 1",
                  gridRow: idx % 7 === 1 || idx % 7 === 4 ? "span 2" : "span 1",
                }}>
                  <RecommendationCard
                    rec={rec}
                    isFavorite={favorites.has(rec.id)}
                    onToggleFavorite={(e) => toggleFavorite(rec.id, e)}
                    onClick={() => onViewDetail(rec)}
                  />
                </div>
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
      className="group rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-1 h-full flex flex-col"
      style={{
        background: "rgba(23,18,14,0.9)",
        border: "1px solid rgba(199,162,124,0.1)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(0,0,0,0.6), 0 0 30px rgba(199,162,124,0.08)"
        ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(199,162,124,0.2)"
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)"
        ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(199,162,124,0.1)"
      }}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden" style={{ background: "#17120E" }}>
        {rec.imageUrl ? (
          <img
            src={rec.imageUrl}
            alt={rec.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: rec.color }}>
            <span className="text-5xl drop-shadow-lg">{rec.emoji}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A07] via-transparent to-transparent opacity-80" />

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: rec.type === "movie" ? "rgba(176,137,104,0.9)" : "rgba(139,94,74,0.9)",
              color: "#F3E8D7",
            }}>
            {rec.type === "movie" ? "Película" : "Libro"}
          </span>
        </div>

        {/* Favorite */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
          style={{
            background: isFavorite ? "#C7A27C" : "rgba(13,10,7,0.7)",
            border: "1px solid rgba(199,162,124,0.3)",
            color: isFavorite ? "#0D0A07" : "#C7A27C",
          }}
          aria-label={isFavorite ? "Quitar de favoritos" : "Guardar"}
        >
          <svg className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <div>
          <p className="text-[10px] font-bold text-[#C7A27C] uppercase tracking-widest mb-1">{rec.genre}</p>
          <h3 className="font-serif text-base font-bold text-[#F3E8D7] leading-snug group-hover:text-[#C7A27C] transition-colors">
            {rec.title}
          </h3>
          <p className="text-xs text-[#BBA892] mt-0.5">{rec.meta}</p>
        </div>
        <p className="text-xs text-[#BBA892] leading-relaxed line-clamp-2 flex-1">{rec.description}</p>

        {/* Reason */}
        <div className="rounded-xl px-3 py-2.5" style={{ background: "rgba(199,162,124,0.07)", border: "1px solid rgba(199,162,124,0.12)" }}>
          <p className="text-xs text-[#C7A27C] leading-relaxed">
            <span className="font-bold">✨ </span>{rec.reason}
          </p>
        </div>

        <div className="flex gap-2 mt-1">
          <button className="flex-1 py-2.5 rounded-full text-xs font-bold text-[#0D0A07] transition-all cursor-pointer hover:-translate-y-0.5"
            style={{ background: "#C7A27C", boxShadow: "0 4px 16px rgba(199,162,124,0.2)" }}>
            Ver más
          </button>
          <button className="px-3 py-2 rounded-full text-xs text-[#BBA892] hover:text-[#F3E8D7] transition-colors cursor-pointer"
            style={{ border: "1px solid rgba(199,162,124,0.15)" }}>
            Info
          </button>
        </div>
      </div>
    </article>
  )
}