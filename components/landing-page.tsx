"use client"

import Image from "next/image"
import Link from "next/link"
import { 
  Moon, 
  Flame, 
  CloudRain, 
  Sparkles, 
  Coffee, 
  Mountain, 
  Heart, 
  Clapperboard 
} from "lucide-react"

type LandingPageProps = {
  onStart: () => void
  onExample: () => void
}

const MOODS = [
  { label: "Reflexivo", icon: Moon },
  { label: "Misterioso", icon: Flame },
  { label: "Melancólico", icon: CloudRain },
  { label: "Inspirador", icon: Sparkles },
  { label: "Íntimo", icon: Coffee },
  { label: "Aventurero", icon: Mountain },
  { label: "Romántico", icon: Heart },
  { label: "Cinematográfico", icon: Clapperboard },
]

export function LandingPage({ onStart, onExample }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-background grain-subtle">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-32 overflow-hidden">
        
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0 bg-background">
          <Image
            src="/ImgLanding.png"
            alt="Cinematic Background"
            fill
            className="object-cover object-left opacity-90"
            priority
          />
          {/* PRONOUNCED ORGANIC WAVE DIVIDER */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[1px]">
            <svg 
              className="relative block w-[calc(100%+1.3px)] h-[80px]" 
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
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full relative z-10 flex justify-end pb-48">
          
          <div className="flex flex-col gap-8 max-w-2xl text-right items-end">
            <div className="flex flex-col gap-2">
              <h1 className="font-serif text-6xl md:text-8xl font-light leading-[0.95] text-foreground tracking-tight animate-in fade-in slide-in-from-right-5 duration-1000">
                Historias <br />
                que <span className="italic font-extralight text-primary">resuenan</span>
              </h1>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg animate-in fade-in slide-in-from-right-7 duration-1000 delay-200 font-light italic">
              Un espacio minimalista para descubrir películas y libros curados por IA basándonos en tu sensibilidad, no solo en algoritmos genéricos.
            </p>

            <div className="flex flex-wrap items-center justify-end gap-4 pt-2 animate-in fade-in slide-in-from-right-10 duration-1000 delay-500">
              <button 
                onClick={onStart}
                className="group relative px-10 py-5 rounded-full font-bold text-[10px] uppercase tracking-widest text-white transition-all duration-500 hover:scale-[1.05] hover:editorial-shadow cursor-pointer overflow-hidden border border-primary"
                style={{ background: "var(--primary)" }}
              >
                <span className="relative z-10">Iniciar descubrimiento</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
              
              <Link 
                href="#actos"
                className="flex items-center gap-3 px-10 py-5 rounded-full border border-border bg-card/30 backdrop-blur-sm text-[10px] font-bold uppercase tracking-[0.2em] text-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 cursor-pointer group hover:scale-[1.05] hover:editorial-shadow"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Demostración
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MOOD EXPLORER */}
      <section className="py-32 bg-background relative scroll-mt-24" id="descubrir">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 text-center mb-16">
          <p className="text-primary text-[10px] uppercase tracking-[0.4em] font-bold mb-4">The Mood Explorer</p>
          <h2 className="font-serif text-5xl font-light text-foreground tracking-tight">¿Qué atmósfera buscas hoy?</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto italic">Selecciona una emoción para comenzar tu descubrimiento curado.</p>
        </div>

        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {MOODS.map((mood, idx) => (
            <button 
              key={mood.label}
              className="group flex flex-col items-center justify-center p-8 rounded-[2rem] bg-card border border-border transition-all duration-500 hover:scale-[1.05] hover:editorial-shadow hover:border-primary/30 cursor-pointer"
            >
              <span className="text-primary mb-4 group-hover:scale-110 transition-transform duration-500">
                <mood.icon className="w-10 h-10" strokeWidth={1.5} />
              </span>
              <span className="text-sm font-semibold tracking-wide text-foreground">{mood.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS — EDITORIAL LAYOUT */}
      <section className="py-40 scroll-mt-24" id="actos">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            <div className="relative group">
              <div className="aspect-square bg-secondary rounded-[3rem] overflow-hidden editorial-shadow relative z-10 transition-transform duration-700 group-hover:-translate-y-2">
                <Image src="/ImgLanding.png" alt="Library View" fill className="object-cover opacity-80" />
                <div className="absolute inset-0 bg-primary/5" />
              </div>
              <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] -z-10 rotate-3 group-hover:rotate-6 transition-transform duration-700" />
            </div>

            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <p className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold italic">The Experience</p>
                <h2 className="font-serif text-6xl font-light text-foreground leading-tight tracking-tight">
                  Descubrimiento en <br /> tres actos
                </h2>
              </div>

              <div className="flex flex-col gap-10">
                {[
                  { num: "01", label: "Define tu atmósfera", desc: "No buscamos por etiquetas, sino por sensaciones. Cuéntanos qué tipo de viaje emocional quieres emprender." },
                  { num: "02", label: "Curación algorítmica", desc: "Nuestra IA analiza patrones narrativos y estéticos para encontrar obras que realmente conecten con tu sensibilidad." },
                  { num: "03", label: "Inmersión literaria", desc: "Explora reseñas editoriales y detalles visuales de cada recomendación antes de decidir tu próxima historia." },
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <span className="font-serif text-3xl font-light italic text-primary/30 group-hover:text-primary transition-colors duration-500">{step.num}</span>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold text-foreground tracking-wide">{step.label}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={onStart}
                className="w-fit mt-4 px-10 py-5 rounded-full font-bold text-sm text-white bg-foreground hover:bg-primary transition-all duration-500 hover:editorial-shadow cursor-pointer"
              >
                Iniciar descubrimiento
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER — EDITORIAL BRANDS */}
      <section className="py-10 bg-secondary/30 border-y border-border overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-20 px-10 flex-shrink-0">
              {["Mubi Inspired", "✦", "Editorial Minimalism", "✦", "Cinematic Discovery", "✦", "Aesthetic Curation", "✦", "Modern Storytelling", "✦"].map((item, j) => (
                <span key={j} className={`text-[10px] font-bold uppercase tracking-[0.3em] ${item === "✦" ? "text-primary/40" : "text-muted-foreground/60"}`}>{item}</span>
              ))}
            </div>
          ))}
        </div>
        <style>{`
          @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
          .animate-ticker { animation: ticker 40s linear infinite; }
        `}</style>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-10">
          <div className="flex flex-col gap-6">
            <h2 className="font-serif text-6xl md:text-8xl font-light text-foreground tracking-tight leading-tight">
              Encuentra tu próxima <br />
              <span className="italic font-extralight text-primary">obsesión</span> literaria.
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto italic">
              Lumina es el puente entre tu curiosidad y las historias que definirán tu próxima temporada.
            </p>
          </div>

          <button 
            onClick={onStart}
            className="px-12 py-6 rounded-full font-bold text-sm text-white bg-foreground hover:bg-primary transition-all duration-500 hover:editorial-shadow cursor-pointer"
          >
            Iniciar descubrimiento curado
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-2">
            <span className="font-serif text-3xl font-light italic text-foreground">Lumina</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
          </div>
          
          <nav className="flex gap-10 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-primary transition-colors">Journal</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
          </nav>

          <p className="text-[10px] font-medium text-muted-foreground/50 tracking-widest uppercase">
            © 2026 Lumina Studio. Curated Experience.
          </p>
        </div>
      </footer>
    </main>
  )
}
