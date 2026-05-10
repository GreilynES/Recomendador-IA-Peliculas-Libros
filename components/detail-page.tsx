"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Recommendation } from "@/lib/data"

type DetailPageProps = {
  recommendation: Recommendation
  onBack: () => void
  onNewSearch: () => void
}

export function DetailPage({ recommendation: rec, onBack, onNewSearch }: DetailPageProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <main className="min-h-screen bg-[var(--background)] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-10 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a resultados
        </button>

        <div className="grid grid-cols-3 gap-12">
          {/* Left — Poster */}
          <div className="col-span-1">
            {rec.imageUrl ? (
              <div className="w-full aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={rec.imageUrl} 
                  alt={rec.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className="w-full aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center"
                style={{ background: rec.color }}
              >
                <span className="text-9xl">{rec.emoji}</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => setIsFavorite((v) => !v)}
                className={cn(
                  "w-full py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer",
                  isFavorite
                    ? "bg-[var(--terracotta)] text-white hover:opacity-90"
                    : "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--beige)]"
                )}
              >
                <svg className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {isFavorite ? "Guardado en favoritos" : "Guardar en favoritos"}
              </button>
              <button className="w-full py-3.5 rounded-full bg-[var(--teal)] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[var(--teal-dark)] transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Ver enlace externo
              </button>
            </div>
          </div>

          {/* Right — Content */}
          <div className="col-span-2 flex flex-col gap-8">
            {/* Badge */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold",
                  rec.type === "movie" ? "bg-[var(--teal)] text-white" : "bg-[var(--terracotta)] text-white"
                )}>
                  {rec.type === "movie" ? "Película" : "Libro"}
                </span>
                <span className="text-sm text-[var(--muted-foreground)]">{rec.genre}</span>
              </div>
              <h1 className="font-serif text-5xl font-bold text-[var(--foreground)] leading-tight text-balance">
                {rec.title}
              </h1>
              <p className="mt-2 text-[var(--muted-foreground)] text-lg">{rec.meta}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {rec.stats?.map((stat) => (
                <div key={stat.label} className="bg-[var(--card)] rounded-2xl p-5 border border-[var(--border)] shadow-sm">
                  <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="font-serif text-xl font-bold text-[var(--foreground)]">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Synopsis */}
            <div className="bg-[var(--card)] rounded-2xl p-8 border border-[var(--border)] shadow-sm">
              <h2 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-4">Sinopsis</h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed">{rec.synopsis}</p>
            </div>

            {/* Why recommended */}
            <div className="bg-[var(--teal)]/5 rounded-2xl p-8 border border-[var(--teal)]/15">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--teal)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-serif text-lg font-semibold text-[var(--teal)] mb-2">Por qué Lumina te lo recomienda</h2>
                  <p className="text-[var(--foreground)] leading-relaxed">{rec.fullReason}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-3">Etiquetas</p>
              <div className="flex flex-wrap gap-2">
                {rec.tags?.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-[var(--beige)] text-[var(--foreground)] text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* New search CTA */}
            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
              <p className="text-sm text-[var(--muted-foreground)]">¿Quieres explorar más títulos?</p>
              <button
                onClick={onNewSearch}
                className="px-6 py-3 rounded-full bg-[var(--teal)] text-white text-sm font-medium hover:bg-[var(--teal-dark)] transition-colors cursor-pointer"
              >
                Nueva búsqueda
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
