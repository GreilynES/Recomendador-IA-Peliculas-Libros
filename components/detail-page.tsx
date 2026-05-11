"use client"

import { cn } from "@/lib/utils"
import type { Recommendation } from "@/lib/data"
import { ArrowLeft, Sparkles, Star, Calendar, Globe, Bookmark, Share2, PlayCircle, BookOpen } from "lucide-react"
import { DynamicIcon } from "./ui/dynamic-icon"

type DetailPageProps = {
  recommendation: Recommendation
  onBack: () => void
  onNewSearch: () => void
}

export function DetailPage({ recommendation, onBack, onNewSearch }: DetailPageProps) {
  const rating = recommendation.stats.find(s => 
    s.label.toLowerCase().includes("calificación")
  )?.value || "N/A"

  return (
    <main className="min-h-screen bg-background grain-subtle animate-in fade-in duration-1000">
            {/* HERO SECTION — CINEMATIC */}
      <section className="relative min-h-[500px] md:h-[65vh] w-full flex flex-col justify-center overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          {recommendation.imageUrl ? (
            <img 
              src={recommendation.imageUrl} 
              alt={recommendation.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: recommendation.color }}>
              <DynamicIcon 
                name={recommendation.emoji} 
                className="w-32 md:w-48 h-32 md:h-48 text-white/40" 
                strokeWidth={1}
              />
            </div>
          )}
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* PRONOUNCED ORGANIC WAVE DIVIDER */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[1px] z-10">
          <svg 
            className="relative block w-[calc(100%+1.3px)] h-[40px] md:h-[60px]" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M0,0 C150,150 400,0 600,80 C800,160 1050,20 1200,100 V120 H0 Z" 
              fill="var(--background)"
              stroke="none"
            ></path>
          </svg>
        </div>

        {/* Navigation Overlays */}
        <div className="absolute top-28 left-0 right-0 z-30">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <button
              onClick={onBack}
              className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/90 hover:text-white transition-all cursor-pointer w-fit"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Volver a la galería
            </button>
          </div>
        </div>

        {/* Content Layer (Flex Flow) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-20 flex flex-col items-center gap-8 md:gap-12 text-center">
          {/* Identity & Title */}
          <div className="flex flex-col items-center gap-6 max-w-4xl">
            <h1 className="font-serif text-4xl md:text-7xl font-light text-white tracking-tight leading-[1.1]">
              {recommendation.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/70 text-[10px] font-bold uppercase tracking-[0.3em]">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{recommendation.meta.split("·")[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" />
                <span>{recommendation.genre}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="relative -mt-10 z-20 pb-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* Main Column */}
            <div className="lg:col-span-8 flex flex-col gap-16">
              
              {/* Synopsis */}
              <div className="flex flex-col gap-8 bg-card rounded-[3rem] p-12 md:p-16 border border-border editorial-shadow">
                <div className="flex flex-col gap-2">
                  <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">El Argumento</p>
                  <h2 className="font-serif text-4xl font-light">Sinopsis Editorial</h2>
                </div>
                <p className="text-foreground/80 text-xl leading-relaxed font-light italic">
                  {recommendation.description}
                </p>
                <div className="pt-8 border-t border-border">
                  <p className="text-muted-foreground leading-relaxed">
                    Cada historia seleccionada por Lumina pasa por un proceso de curaduría emocional. Buscamos obras que no solo entretengan, sino que dejen una huella duradera en tu sensibilidad cinematográfica y literaria.
                  </p>
                </div>
              </div>

              {/* Editorial Reason */}
              <div className="bg-primary/5 rounded-[3rem] p-12 md:p-16 border border-primary/20 editorial-shadow relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                <div className="flex items-start gap-8 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 editorial-shadow">
                    <Sparkles className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">¿Por qué Lumina?</p>
                    <h3 className="font-serif text-3xl font-light">Nota de Curaduría</h3>
                    <p className="text-foreground/70 text-lg leading-relaxed italic">
                      "{recommendation.reason}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              
              {/* Interaction Card */}
              <div className="bg-card rounded-[2.5rem] p-10 border border-border editorial-shadow sticky top-32">
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-6">
                    <h4 className="font-serif text-2xl font-light">Acciones</h4>
                    <div className="flex flex-col gap-3">
                      <button className="w-full py-5 rounded-full bg-foreground text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-all duration-500 editorial-shadow cursor-pointer flex items-center justify-center gap-3">
                        {recommendation.type === "movie" ? <PlayCircle className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                        {recommendation.type === "movie" ? "Ver Ahora" : "Empezar Lectura"}
                      </button>
                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={onNewSearch}
                          className="py-4 rounded-full border border-border text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          Nueva Búsqueda
                        </button>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="py-4 rounded-full border border-border text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-all cursor-pointer flex items-center justify-center gap-2">
                            <Bookmark className="w-3.5 h-3.5" />
                          </button>
                          <button className="py-4 rounded-full border border-border text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-all cursor-pointer flex items-center justify-center gap-2">
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-border flex flex-col gap-6">
                    <h4 className="font-serif text-xl font-light">Detalles Técnicos</h4>
                    <div className="flex flex-col gap-4">
                      {[
                        { label: "Director/Autor", value: recommendation.meta.split("·")[1]?.trim() || "N/A" },
                        { label: "Año", value: recommendation.meta.split("·")[0]?.trim() || "N/A" },
                        { label: "Género", value: recommendation.genre },
                        { label: "Puntuación", value: rating },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-[10px] tracking-widest uppercase">
                          <span className="text-muted-foreground/60 font-bold">{item.label}</span>
                          <span className="text-foreground font-bold">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote Section */}
              <div className="px-8 text-center">
                <p className="text-[10px] text-muted-foreground/40 italic leading-relaxed uppercase tracking-[0.2em]">
                  "Una historia no es solo lo que sucede, sino cómo nos hace sentir."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}