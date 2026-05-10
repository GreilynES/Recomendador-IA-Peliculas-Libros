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
    <main className="min-h-screen bg-[#0D0A07] pt-24 pb-20 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 right-1/3 w-[600px] h-[600px] bg-[#C7A27C]/4 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-[#8B5E4A]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#BBA892] hover:text-[#F3E8D7] transition-colors mb-10 cursor-pointer font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a resultados
        </button>

        <div className="grid grid-cols-3 gap-12">
          {/* Left — Poster */}
          <div className="col-span-1">
            {rec.imageUrl ? (
              <div className="w-full aspect-[2/3] rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.7)" }}>
                <img src={rec.imageUrl} alt={rec.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-full aspect-[2/3] rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ background: rec.color, boxShadow: "0 24px 80px rgba(0,0,0,0.7)" }}>
                <span className="text-9xl drop-shadow-xl">{rec.emoji}</span>
              </div>
            )}

            {/* Actions */}
            <div className="mt-5 flex flex-col gap-3">
              <button
                onClick={() => setIsFavorite((v) => !v)}
                className="w-full py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                style={
                  isFavorite
                    ? { background: "#C7A27C", color: "#0D0A07", boxShadow: "0 6px 24px rgba(199,162,124,0.3)" }
                    : { background: "rgba(23,18,14,0.8)", color: "#BBA892", border: "1px solid rgba(199,162,124,0.2)" }
                }
              >
                <svg className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {isFavorite ? "Guardado" : "Guardar"}
              </button>
              <button className="w-full py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer text-[#F3E8D7] hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #C7A27C, #8B5E4A)", boxShadow: "0 6px 24px rgba(199,162,124,0.25)" }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Ver más
              </button>
            </div>
          </div>

          {/* Right — Content */}
          <div className="col-span-2 flex flex-col gap-7">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 rounded-full text-xs font-bold"
                  style={{
                    background: rec.type === "movie" ? "rgba(176,137,104,0.9)" : "rgba(139,94,74,0.9)",
                    color: "#F3E8D7",
                  }}>
                  {rec.type === "movie" ? "Película" : "Libro"}
                </span>
                <span className="text-sm font-semibold text-[#C7A27C]">{rec.genre}</span>
              </div>
              <h1 className="font-serif text-6xl font-bold text-[#F3E8D7] leading-tight">
                {rec.title}
              </h1>
              <p className="mt-2 text-[#BBA892] text-lg font-medium">{rec.meta}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {rec.stats?.map((stat) => (
                <div key={stat.label} className="rounded-2xl p-5"
                  style={{ background: "rgba(23,18,14,0.8)", border: "1px solid rgba(199,162,124,0.1)" }}>
                  <p className="text-[10px] text-[#BBA892] uppercase tracking-wider font-bold mb-2">{stat.label}</p>
                  <p className="font-serif text-2xl font-bold text-[#C7A27C]">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Synopsis */}
            <div className="rounded-2xl p-8"
              style={{ background: "rgba(23,18,14,0.8)", border: "1px solid rgba(199,162,124,0.1)" }}>
              <h2 className="font-serif text-xl font-bold text-[#F3E8D7] mb-4">Sinopsis</h2>
              <p className="text-[#BBA892] leading-relaxed">{rec.synopsis}</p>
            </div>

            {/* Why recommended */}
            <div className="rounded-2xl p-8"
              style={{ background: "rgba(199,162,124,0.06)", border: "1px solid rgba(199,162,124,0.2)" }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "linear-gradient(135deg, #C7A27C, #8B5E4A)" }}>
                  <svg className="w-5 h-5 text-[#0D0A07]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-serif text-base font-bold text-[#C7A27C] mb-2">Por qué Lumina te lo recomienda</h2>
                  <p className="text-[#BBA892] leading-relaxed text-sm">{rec.fullReason}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#BBA892]/60 font-bold mb-3">Etiquetas</p>
              <div className="flex flex-wrap gap-2">
                {rec.tags?.map((tag) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full text-[#BBA892] text-sm font-medium"
                    style={{ background: "rgba(23,18,14,0.8)", border: "1px solid rgba(199,162,124,0.15)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-5 flex items-center justify-between"
              style={{ borderTop: "1px solid rgba(199,162,124,0.1)" }}>
              <p className="text-sm text-[#BBA892]">¿Quieres explorar más títulos?</p>
              <button
                onClick={onNewSearch}
                className="px-7 py-3 rounded-full text-sm font-bold text-[#0D0A07] transition-all hover:-translate-y-0.5 cursor-pointer"
                style={{ background: "#C7A27C", boxShadow: "0 6px 20px rgba(199,162,124,0.25)" }}
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