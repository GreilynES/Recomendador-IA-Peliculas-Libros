"use client"

import { useEffect, useState } from "react"

const MESSAGES = [
  "Analizando tus géneros favoritos...",
  "Buscando coincidencias entre miles de títulos...",
  "Evaluando tu estado de ánimo...",
  "Aplicando el motor de recomendaciones...",
  "Casi listo, preparando tu lista personalizada...",
]

type LoadingScreenProps = {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length)
    }, 1100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval)
          setTimeout(onComplete, 400)
          return 100
        }
        return p + 2
      })
    }, 60)
    return () => clearInterval(progressInterval)
  }, [onComplete])

  return (
    <main className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center">
      <div className="max-w-lg w-full mx-auto px-8 flex flex-col items-center text-center gap-10">

        {/* Animated rings */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[var(--teal)]/20 animate-ping" style={{ animationDuration: "2s" }} />
          <div className="absolute inset-3 rounded-full border-2 border-[var(--teal)]/30 animate-ping" style={{ animationDuration: "2.5s" }} />
          {/* Main circle */}
          <div className="relative w-20 h-20 rounded-full bg-[var(--teal)] flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          {/* Orbiting dot */}
          <div
            className="absolute w-3 h-3 rounded-full bg-[var(--terracotta)] shadow-md"
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${progress * 3.6}deg) translateX(56px)`,
              transition: "transform 0.06s linear",
            }}
          />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="font-serif text-3xl font-bold text-[var(--foreground)]">
            Estamos analizando tus gustos
          </h1>
          <p
            key={messageIndex}
            className="text-[var(--muted-foreground)] text-base transition-all duration-500 opacity-100 animate-pulse"
            style={{ animationDuration: "2s" }}
          >
            {MESSAGES[messageIndex]}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="flex justify-between text-xs text-[var(--muted-foreground)] mb-2">
            <span>Procesando</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--beige)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--teal)] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 w-full">
          {[
            { label: "Géneros", icon: "🎭" },
            { label: "Estado de ánimo", icon: "✨" },
            { label: "Tipo de historia", icon: "📖" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-[var(--card)] rounded-2xl p-4 flex flex-col items-center gap-2 border border-[var(--border)] shadow-sm"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs text-[var(--muted-foreground)]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
