"use client"

import { useEffect, useState } from "react"
import { Sparkles, LoaderCircle } from "lucide-react"

const MESSAGES = [
  "Iniciando curaduría editorial...",
  "Analizando patrones de sensibilidad...",
  "Consultando archivos cinematográficos...",
  "Buscando resonancia literaria...",
  "Preparando tu galería personalizada...",
]

export function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 98) return p
        return p + 1
      })
    }, 80)
    return () => clearInterval(progressInterval)
  }, [])

  return (
    <main className="min-h-screen max-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden grain-subtle">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center text-center gap-8 sm:gap-12 md:gap-16 relative z-10 overflow-y-auto max-h-[calc(100vh-4rem)] py-8">
        
        {/* Animated Loader */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-2 border-primary/10 flex items-center justify-center relative">
            <LoaderCircle className="w-12 h-12 text-primary animate-spin-slow" />
            <div 
              className="absolute inset-0 rounded-full border-t-2 border-primary transition-all duration-300"
              style={{ transform: `rotate(${progress * 3.6}deg)` }}
            />
          </div>
          <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center editorial-shadow animate-bounce">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] animate-pulse">
              Curating Stories
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-foreground tracking-tight leading-tight">
              Creando tu <br /> 
              <span className="italic font-extralight text-primary">atmósfera</span>
            </h1>
          </div>
          
          <div className="h-6 overflow-hidden">
            <p key={messageIndex} className="text-muted-foreground text-sm italic font-medium animate-in slide-in-from-bottom-full duration-700">
              {MESSAGES[messageIndex]}
            </p>
          </div>
        </div>

        {/* Progress System */}
        <div className="w-full max-w-sm flex flex-col gap-3 sm:gap-4">
          <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            <span>Procesamiento IA</span>
            <span>{progress}%</span>
          </div>
        </div>

        <div className="flex gap-12 pt-8">
          {["Géneros", "Mood", "Narrativa"].map((item, i) => (
            <div key={i} className="flex flex-col gap-2 items-center opacity-40">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[9px] font-bold uppercase tracking-widest">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </main>
  )
}
