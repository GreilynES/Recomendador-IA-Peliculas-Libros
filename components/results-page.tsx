"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Recommendation } from "@/lib/data"
import type { Preferences } from "./preferences-form"
import { ArrowLeft, Sparkles, Filter, Bookmark, Plus } from "lucide-react"
import { DynamicIcon } from "./ui/dynamic-icon"

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

  return (
    <main className="min-h-screen bg-background pt-32 pb-40 relative grain-subtle">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        {/* Header Section */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="flex flex-col gap-6 max-w-3xl">
            <button
              onClick={onEditPreferences}
              className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all cursor-pointer w-fit"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Ajustar sensibilidad
            </button>
            
            <div className="flex flex-col gap-4">
              <p className="text-primary font-bold tracking-[0.3em] uppercase text-[10px]">
                Curated Gallery
              </p>
              <h1 className="font-serif text-6xl md:text-8xl font-light text-foreground tracking-tight leading-[1.05]">
                Tus historias <br />
                <span className="italic font-extralight text-primary">encontradas</span>
              </h1>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {preferences.genres.map((g) => (
                <span key={g} className="px-4 py-2 rounded-full bg-card border border-border text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  {g}
                </span>
              ))}
              <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest italic">
                {preferences.mood}
              </span>
            </div>
          </div>

          <button
            onClick={onNewSearch}
            className="flex-shrink-0 px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest bg-foreground text-white hover:bg-primary transition-all duration-500 hover:editorial-shadow cursor-pointer"
          >
            Nueva Búsqueda
          </button>
        </div>

        {/* Filter Bar */}
        <div className="mb-16 flex items-center justify-between border-b border-border pb-8">
          <div className="flex gap-10">
            {(["all", "movies", "books"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative py-2 text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-500 cursor-pointer",
                  filter === f ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f === "all" ? "Todo" : f === "movies" ? "Películas" : "Libros"}
                {filter === f && (
                  <div className="absolute -bottom-8 left-0 right-0 h-1 bg-primary rounded-full animate-in fade-in zoom-in duration-500" />
                )}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground/40 italic text-sm">
            <Sparkles className="w-4 h-4" />
            <span>{filtered.length} resultados curados</span>
          </div>
        </div>

        {/* Grid Layout — Pinterest / Mubi Style */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {filtered.map((rec, idx) => (
            <RecommendationCard
              key={rec.id}
              rec={rec}
              isFavorite={favorites.has(rec.id)}
              onToggleFavorite={(e) => toggleFavorite(rec.id, e)}
              onClick={() => onViewDetail(rec)}
              priority={idx < 3}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

export function RecommendationCard({ rec, isFavorite, onToggleFavorite, onClick, priority }: { 
  rec: Recommendation; 
  isFavorite: boolean; 
  onToggleFavorite: (e: React.MouseEvent) => void; 
  onClick: () => void;
  priority?: boolean;
}) {
  return (
    <article
      onClick={onClick}
      className="break-inside-avoid group relative bg-card rounded-[2.5rem] border border-border overflow-hidden transition-all duration-700 cursor-pointer hover:editorial-shadow hover:border-primary/20 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-10 duration-1000"
    >
      {/* Visual Header */}
      <div className={cn("relative overflow-hidden", rec.type === "movie" ? "aspect-[16/9]" : "aspect-[3/4]")}>
        {rec.imageUrl ? (
          <img 
            src={rec.imageUrl} 
            alt={rec.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: rec.color }}
          >
            <DynamicIcon 
              name={rec.emoji} 
              className="w-24 h-24 text-white/80 group-hover:scale-110 transition-transform duration-700" 
              strokeWidth={1}
            />
          </div>
        )}
        
        {/* Overlay Badges */}
        <div className="absolute inset-x-6 top-6 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest text-foreground border border-white/20">
            {rec.type === "movie" ? "Película" : "Libro"}
          </span>
          
          <button
            onClick={onToggleFavorite}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer border",
              isFavorite 
                ? "bg-primary text-white border-primary" 
                : "bg-white/80 backdrop-blur-md text-foreground border-white/20 hover:bg-primary hover:text-white hover:border-primary"
            )}
          >
            <Bookmark className={cn("w-4 h-4 transition-transform duration-500", isFavorite ? "scale-110 fill-current" : "group-hover/btn:scale-110")} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 md:p-10 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.25em]">{rec.genre}</span>
            <div className="w-1 h-1 rounded-full bg-border" />
            <span className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">{rec.meta}</span>
          </div>
          
          <h3 className="font-serif text-3xl font-light text-foreground leading-tight group-hover:text-primary transition-colors duration-500">
            {rec.title}
          </h3>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed italic line-clamp-3">
          {rec.description}
        </p>

        {/* Curation Note */}
        <div className="pt-6 border-t border-border flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-bold text-foreground tracking-tight">Nota Editorial:</span> {rec.reason}
            </p>
          </div>
          
          <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary hover:text-foreground transition-all duration-500 group/btn">
            Ver detalles del acto
            <Plus className="w-3 h-3 group-hover/btn:rotate-90 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  )
}