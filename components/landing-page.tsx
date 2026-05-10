"use client"

import Image from "next/image"

type LandingPageProps = {
  onStart: () => void
  onExample: () => void
}

const MOODS = [
  { label: "Comforting", icon: "☕" },
  { label: "Dark & Mysterious", icon: "🕯" },
  { label: "Make me cry", icon: "🌧" },
  { label: "Feel good", icon: "✨" },
  { label: "Slow burn", icon: "🌙" },
  { label: "Adventurero", icon: "⛰️" },
  { label: "Romantic", icon: "🌹" },
  { label: "Mind bending", icon: "🌀" },
]

const grain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='512' height='512' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`

export function LandingPage({ onStart, onExample }: LandingPageProps) {
  return (
    <main className="min-h-screen overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        <Image
          src="/ImgLanding.png"
          alt="Composición cinematográfica"
          fill
          className="object-cover object-center"
          priority
        />

        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.25) 35%, rgba(8,5,2,0.78) 65%, rgba(8,5,2,0.92) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 18%)" }} />
        <div className="absolute inset-0 bg-[#4A2E1A]/8" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: grain, backgroundSize: "256px 256px" }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-20 py-40">
          <div className="flex justify-end">
            <div className="flex flex-col gap-8 max-w-xl text-right pr-8">

              <h1 className="font-serif text-5xl lg:text-7xl font-light leading-[1.05] text-[#F3E8D7] tracking-tight"
                style={{ textShadow: "0 2px 40px rgba(0,0,0,0.5)" }}>
                Historias que{" "}
                <span className="text-[#C7A27C] italic font-extralight">se quedan</span>{" "}
                contigo.
              </h1>

              <p className="text-[#BBA892] text-12px leading-relaxed"
                style={{ textShadow: "0 1px 20px rgba(0,0,0,0.6)" }}>
                Recomendaciones personalizadas basadas en tu ánimo, gusto y curiosidad. Lumina entiende cómo te sientes, no solo lo que has visto.
              </p>

              <div className="flex items-center gap-4 pt-1 justify-end">
                <button onClick={onExample}
                  className="flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-[#BBA892] transition-all hover:text-[#F3E8D7] cursor-pointer"
                  style={{ border: "1px solid rgba(199,162,124,0.35)", backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.2)" }}>
                  <span className="w-5 h-5 rounded-full border border-[#C7A27C]/50 flex items-center justify-center text-[10px]">▶</span>
                  Cómo funciona
                </button>
                <button onClick={onStart}
                  className="group flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-[#0D0A07] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  style={{ background: "#C7A27C"}}>
                  Comenzar ahora
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 64L1440 64L1440 24C1200 64 960 4 720 24C480 44 240 4 0 24L0 64Z" fill="#F5F0E8"/>
          </svg>
        </div>
      </section>

      {/* MOOD SELECTOR — CREAM */}
      <section className="relative bg-[#F5F0E8] py-28" id="como-funciona">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{ backgroundImage: grain, backgroundSize: "256px 256px" }} />

        <div className="max-w-7xl mx-auto px-20 relative z-10">
          <div className="mb-10">
            <p className="text-[#8B5E4A] text-[10px] uppercase tracking-[0.3em] font-semibold mb-3">Discover by mood</p>
            <h2 className="font-serif text-5xl font-light text-[#1C1410] tracking-tight">¿Qué estás buscando?</h2>
            <p className="text-[#6F5A4E] mt-3 max-w-xl">Elegí cómo te sentís hoy y Lumina hace el resto.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {MOODS.map((mood) => (
              <button key={mood.label}
                className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-[#4A3728] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                style={{ background: "#EDE5D8", border: "1px solid rgba(139,94,74,0.2)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "#8B5E4A"
                  ;(e.currentTarget as HTMLElement).style.color = "#F5F0E8"
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "#EDE5D8"
                  ;(e.currentTarget as HTMLElement).style.color = "#4A3728"
                }}>
                <span>{mood.icon}</span>{mood.label}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 0L1440 0L1440 40C1200 0 960 64 720 40C480 16 240 64 0 40L0 0Z" fill="#13100C"/>
          </svg>
        </div>
      </section>

      {/* HOW IT WORKS — DARK */}
      <section className="relative bg-[#13100C] py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C7A27C]/4 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-20 relative z-10">
          <div className="grid grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative"
                style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}>
                <Image src="/ImgLanding.png" alt="Biblioteca" fill className="object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#C7A27C]/20 to-[#0D0A07]/60" />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-2xl p-5"
                style={{ background: "rgba(23,18,14,0.95)", border: "1px solid rgba(199,162,124,0.2)", backdropFilter: "blur(20px)" }}>
                <p className="text-[#C7A27C] font-serif text-3xl font-light italic">3</p>
                <p className="text-[#BBA892] text-xs mt-1">pasos simples</p>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-[#C7A27C]/60 text-[10px] uppercase tracking-[0.3em] font-semibold mb-3">How it works</p>
                <h2 className="font-serif text-5xl font-light text-[#F3E8D7] leading-tight tracking-tight">Tu próxima historia en 3 pasos</h2>
              </div>
              {[
                { icon: "😊", label: "Cuéntanos tu ánimo", desc: "Elegí cómo te sentís hoy o describí qué tipo de historia necesitás." },
                { icon: "✨", label: "Encontramos el match", desc: "Nuestra IA analiza patrones emocionales y selecciona títulos que resuenan con vos." },
                { icon: "📖", label: "Descubrí y disfrutá", desc: "Guardá, valorá y explorá las historias que se quedan con vos." },
              ].map((step, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: "rgba(199,162,124,0.1)", border: "1px solid rgba(199,162,124,0.2)" }}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-normal italic text-[#F3E8D7] mb-1">{step.label}</h3>
                    <p className="text-[#BBA892] text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
              <button onClick={onStart}
                className="w-fit px-8 py-4 rounded-full font-semibold text-sm text-[#0D0A07] transition-all hover:-translate-y-0.5 cursor-pointer mt-2"
                style={{ background: "#C7A27C" }}>
                Comenzar ahora
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 64L1440 64L1440 24C1200 64 960 4 720 24C480 44 240 4 0 24L0 64Z" fill="#F5F0E8"/>
          </svg>
        </div>
      </section>

      {/* TICKER */}
      <section className="bg-[#F5F0E8] overflow-hidden" style={{ borderTop: "1px solid rgba(139,94,74,0.12)", borderBottom: "1px solid rgba(139,94,74,0.12)" }}>
        <div className="flex whitespace-nowrap" style={{ animation: "ticker 24s linear infinite" }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-8 py-4 flex-shrink-0">
              {["The Night Circus", "✦", "Dune", "✦", "Before Sunrise", "✦", "A Little Life", "✦", "Past Lives", "✦", "Call Me By Your Name", "✦"].map((item, j) => (
                <span key={j} className={`text-sm font-medium ${item === "✦" ? "text-[#C7A27C]" : "text-[#6F5A4E]"}`}>{item}</span>
              ))}
            </div>
          ))}
        </div>
        <style>{`@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-25%) } }`}</style>
      </section>

      {/* VIBE PREVIEW — CREAM */}
      <section className="relative bg-[#F5F0E8] py-28">
        <div className="max-w-7xl mx-auto px-20">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-6">
              <p className="text-[#8B5E4A] text-[10px] uppercase tracking-[0.3em] font-semibold">Tu vibe actual</p>
              <h2 className="font-serif text-5xl font-light italic text-[#1C1410] leading-tight tracking-tight">Reflexivo · Íntimo · Nostálgico</h2>
              <div className="flex flex-wrap gap-2">
                {["Emotivo", "Hermosa escritura", "Personajes profundos", "Character driven"].map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-xs text-[#4A3728] font-medium"
                    style={{ background: "#EDE5D8", border: "1px solid rgba(139,94,74,0.2)" }}>{tag}</span>
                ))}
              </div>
              <p className="text-[#6F5A4E] leading-relaxed max-w-sm">
                Lumina analiza tu perfil emocional y encuentra libros y películas que resuenan exactamente con cómo te sentís hoy.
              </p>
              <button onClick={onStart}
                className="w-fit px-8 py-4 rounded-full font-semibold text-sm text-[#F5F0E8] transition-all hover:-translate-y-0.5 cursor-pointer"
                style={{ background: "#1C1410", boxShadow: "0 8px 30px rgba(0,0,0,0.2)" }}>
                Comenzar mi viaje →
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { title: "A Little Life", sub: "Hanya Yanagihara", rating: "4.6", type: "Libro", bg: "#1E1813" },
                { title: "Call Me By Your Name", sub: "André Aciman", rating: "4.4", type: "Libro", bg: "#17120E" },
                { title: "Past Lives", sub: "2023 · Romance", rating: "4.3", type: "Película", bg: "#241C15" },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl overflow-hidden flex flex-col"
                  style={{ background: item.bg, minHeight: 220, border: "1px solid rgba(199,162,124,0.08)", boxShadow: "0 12px 40px rgba(0,0,0,0.25)" }}>
                  <div className="flex-1 bg-gradient-to-br from-[#C7A27C]/8 to-transparent" />
                  <div className="p-4">
                    <span className="text-[#C7A27C] text-[10px] uppercase tracking-wider font-semibold">{item.type}</span>
                    <p className="font-serif text-sm font-normal text-[#F3E8D7] mt-1 leading-snug">{item.title}</p>
                    <p className="text-[#BBA892] text-[11px] mt-0.5">{item.sub}</p>
                    <p className="text-[#C7A27C] text-xs mt-2">★ {item.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 0L1440 0L1440 40C1200 0 960 64 720 40C480 16 240 64 0 40L0 0Z" fill="#0D0A07"/>
          </svg>
        </div>
      </section>

      {/* WHY LUMINA — DARK */}
      <section className="relative bg-[#0D0A07] py-28 overflow-hidden">
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-[#C7A27C]/4 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-20 relative z-10">
          <div className="text-center mb-16">
            <p className="text-[#C7A27C]/60 text-[10px] uppercase tracking-[0.3em] font-semibold mb-3">Por qué vas a amarlo</p>
            <h2 className="font-serif text-5xl font-light text-[#F3E8D7] tracking-tight">No es solo una app de recomendaciones</h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: "⭐", title: "Hecho para vos", desc: "Recomendaciones basadas en tu gusto único y estado de ánimo." },
              { icon: "💛", title: "Más que ratings", desc: "Encontramos historias que conectan emocionalmente con quién sos." },
              { icon: "👥", title: "Comunidad", desc: "Unite a miles de personas que aman las historias como vos." },
              { icon: "✨", title: "Siempre nuevo", desc: "Picks frescos, gemas escondidas y clásicos atemporales." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ background: "rgba(23,18,14,0.7)", border: "1px solid rgba(199,162,124,0.08)" }}>
                <span className="text-2xl">{item.icon}</span>
                <h3 className="font-serif text-lg font-normal italic text-[#F3E8D7]">{item.title}</h3>
                <p className="text-[#BBA892] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 64L1440 64L1440 24C1200 64 960 4 720 24C480 44 240 4 0 24L0 64Z" fill="#F5F0E8"/>
          </svg>
        </div>
      </section>

      {/* FINAL CTA — CREAM */}
      <section className="relative bg-[#F5F0E8] py-32">
        <div className="max-w-5xl mx-auto px-20 text-center">
          <p className="text-[#8B5E4A] text-[10px] uppercase tracking-[0.3em] font-semibold mb-5">Tu próxima obsesión</p>
          <h2 className="font-serif text-6xl font-light text-[#1C1410] max-w-3xl mx-auto leading-tight tracking-tight">
            ¿Listo para encontrar tu próxima historia{" "}
            <span className="text-[#8B5E4A] italic font-extralight">inolvidable?</span>
          </h2>
          <p className="text-[#6F5A4E] mt-6 max-w-xl mx-auto leading-relaxed">
            Lumina no es una recomendadora genérica. Es tu curadora cinematográfica personal que entiende tu alma.
          </p>
          <button onClick={onStart}
            className="mt-10 px-10 py-4 rounded-full font-semibold text-base text-[#F5F0E8] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            style={{ background: "#1C1410", boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}>
            Comenzar mi viaje →
          </button>
        </div>
      </section>

      {/* FOOTER — DARK */}
      <footer className="bg-[#0D0A07] py-14" style={{ borderTop: "1px solid rgba(199,162,124,0.08)" }}>
        <div className="max-w-7xl mx-auto px-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-light italic text-[#C7A27C] tracking-wide">Lumina</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A27C]/60" />
          </div>
          <p className="text-sm text-[#BBA892]/40">
            © 2026 Lumina. Recomendaciones cinematográficas premium impulsadas por IA.
          </p>
        </div>
      </footer>
    </main>
  )
}