"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { RecommendationCard } from "@/components/results-page"
import { DetailPage } from "@/components/detail-page"
import type { Recommendation } from "@/lib/data"
import { Sparkles, LoaderCircle, MousePointerClick } from "lucide-react"
import { DynamicIcon } from "@/components/ui/dynamic-icon"
import { cn } from "@/lib/utils"

export default function MoviesPage() {
  const [movies, setMovies] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMovie, setSelectedMovie] = useState<Recommendation | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/movies/popular")
        const data = await response.json()
        if (data.results) {
          setMovies(data.results)
        }
      } catch (error) {
        console.error("Error fetching movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (selectedMovie) {
    return (
      <>
        <Navbar variant="solid" />
        <DetailPage 
          recommendation={selectedMovie} 
          onBack={() => setSelectedMovie(null)} 
          onNewSearch={() => window.location.href = "/"}
        />
      </>
    )
  }

  return (
    <main className="min-h-screen bg-background grain-subtle pt-28 pb-32">
      <Navbar variant="solid" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <header className="mb-8 flex flex-col items-center text-center">
          <div className="flex flex-col items-center gap-3 max-w-3xl">
            <p className="text-primary font-bold tracking-[0.3em] uppercase text-[10px]">
              Cinema Collective
            </p>
            <h1 className="font-serif text-6xl md:text-8xl font-light text-foreground tracking-tight leading-[1.05]">
              Galería <br />
              <span className="italic font-extralight text-primary">Cinematográfica</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl italic">
              Explora nuestra selección curada de las películas más impactantes y resonantes del momento.
            </p>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
            <LoaderCircle className="w-12 h-12 text-primary animate-spin" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground animate-pulse">
              Consultando archivos fílmicos...
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              {movies.map((movie) => (
                <article 
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie)}
                  className="group cursor-pointer flex flex-col gap-6"
                >
                  <div className={cn(
                    "relative aspect-[16/9] rounded-[2rem] overflow-hidden border border-border transition-all duration-700 hover:editorial-shadow hover:border-primary/20 hover:-translate-y-2",
                    movie.type === "book" && "aspect-[3/4]"
                  )}>
                    {movie.imageUrl ? (
                      <img 
                        src={movie.imageUrl} 
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ background: movie.color }}>
                        <DynamicIcon name={movie.emoji} className="w-16 h-16 text-white/40" strokeWidth={1} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>

                  <div className="flex flex-col gap-3 px-2">
                    <h3 className="font-serif text-2xl font-light text-foreground leading-tight group-hover:text-primary transition-colors duration-500 line-clamp-2">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-primary/60 group-hover:text-primary transition-colors duration-500">
                      <MousePointerClick className="w-3 h-3" />
                      <span>Para más información, haz click</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-32 text-center">
              <p className="font-serif text-3xl md:text-5xl font-light text-muted-foreground/30 italic tracking-tighter">
                y muchos más...
              </p>
              <div className="mt-8 flex justify-center">
                <div className="w-12 h-px bg-primary/20" />
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
