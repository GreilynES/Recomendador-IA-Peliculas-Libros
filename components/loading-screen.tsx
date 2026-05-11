"use client"

import { useEffect, useState } from "react"

const MESSAGES = [
  "Analizando tus géneros favoritos...",
  "Buscando coincidencias entre miles de títulos...",
  "Evaluando tu estado de ánimo...",
  "Aplicando el motor de recomendaciones...",
  "Casi listo, preparando tu lista personalizada...",
]

export function LoadingScreen() {
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
        if (p >= 95) return p; // Wait at 95% until parent switches
        return p + 2
      })
    }, 100)
    return () => clearInterval(progressInterval)
  }, [])


  return (
    <main className="min-h-screen bg-[#0D0A07] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#C7A27C]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#8B5E4A]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-lg w-full mx-auto px-8 flex flex-col items-center text-center gap-12 relative z-10">

        {/* Animated rings */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full animate-ping"
            style={{ border: "1px solid rgba(199,162,124,0.15)", animationDuration: "2s" }} />
          <div className="absolute inset-3 rounded-full animate-ping"
            style={{ border: "1px solid rgba(199,162,124,0.2)", animationDuration: "2.5s" }} />
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #C7A27C, #8B5E4A)", boxShadow: "0 0 60px rgba(199,162,124,0.3)" }}>
            <svg className="w-10 h-10 text-[#0D0A07]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          {/* Orbiting dot */}
          <div
            className="absolute w-2.5 h-2.5 rounded-full"
            style={{
              top: "50%", left: "50%",
              background: "#C7A27C",
              boxShadow: "0 0 8px rgba(199,162,124,0.6)",
              transform: `translate(-50%, -50%) rotate(${progress * 3.6}deg) translateX(64px)`,
              transition: "transform 0.06s linear",
            }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="font-serif text-5xl font-bold text-[#F3E8D7]">
            Estamos analizando<br />tus gustos
          </h1>
          <p
            key={messageIndex}
            className="text-[#BBA892] text-lg font-medium animate-pulse"
            style={{ animationDuration: "2s" }}
          >
            {MESSAGES[messageIndex]}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="flex justify-between text-xs text-[#BBA892] mb-3 font-semibold">
            <span>Procesando</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(199,162,124,0.1)" }}>
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg, #C7A27C, #8B5E4A)" }}
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
              className="rounded-2xl p-5 flex flex-col items-center gap-3"
              style={{ background: "rgba(23,18,14,0.8)", border: "1px solid rgba(199,162,124,0.1)" }}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-semibold text-[#BBA892] uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}