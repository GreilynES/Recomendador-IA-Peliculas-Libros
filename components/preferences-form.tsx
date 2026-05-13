"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { 
  Clock, 
  Info, 
  ArrowLeft, 
  Trash2, 
  Sparkles, 
  Laugh, 
  CloudRain, 
  Brain, 
  Moon, 
  Zap, 
  Clapperboard, 
  Book 
} from "lucide-react"
import { AuthModal } from "./auth-modal"

export type Preferences = {
  genres: string[]
  movieActors: string
  bookAuthors: string
  storyType: string
  mood: string
  mediaType: "movies" | "books" | "both"
}

type PreferencesFormProps = {
  onSubmit: (prefs: Preferences) => void
  onBack: () => void
  isLoggedIn: boolean
  history: HistoryItem[]
  isHistoryLoading: boolean
}

export type HistoryItem = {
  id: number
  tipo_recomendacion: string
  consulta: string
  resultado: unknown
}

type HistoryResult = {
  id?: string
  title?: string
  type?: "movie" | "book"
  meta?: string
}

const GENRES = [
  "Drama", "Comedia", "Thriller", "Ciencia Ficción", "Romance", "Terror",
  "Aventura", "Fantasía", "Misterio", "Histórico", "Documental", "Acción",
]

const STORY_TYPES = ["Épico", "Íntimo", "Dinámico", "Reflexivo", "Oscuro", "Esperanzador"]

const MOODS = [
  { label: "Quiero reír", icon: Laugh },
  { label: "Quiero llorar", icon: CloudRain },
  { label: "Quiero pensar", icon: Brain },
  { label: "Quiero escapar", icon: Moon },
  { label: "Quiero inspirarme", icon: Sparkles },
  { label: "Quiero emoción", icon: Zap },
]

export function PreferencesForm({
  onSubmit,
  onBack,
  isLoggedIn,
  history,
  isHistoryLoading,
}: PreferencesFormProps) {
  const [prefs, setPrefs] = useState<Preferences>({
    genres: [],
    movieActors: "",
    bookAuthors: "",
    storyType: "",
    mood: "",
    mediaType: "both",
  })
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: "login" | "register" }>({
    isOpen: false,
    mode: "login",
  })

  const toggleGenre = (g: string) => {
    setPrefs((p) => ({
      ...p,
      genres: p.genres.includes(g)
        ? p.genres.filter((x) => x !== g)
        : [...p.genres, g],
    }))
  }

  const isValid =
    prefs.genres.length > 0 &&
    prefs.storyType &&
    prefs.mood

  const selectedCount = [
    prefs.genres.length > 0,
    !!prefs.movieActors,
    !!prefs.bookAuthors,
    !!prefs.storyType,
    !!prefs.mood,
  ].filter(Boolean).length

  const getHistoryResults = (resultado: unknown) => {
    if (!Array.isArray(resultado)) return []
    return resultado.filter((item): item is HistoryResult => {
      return typeof item === "object" && item !== null && "title" in item
    })
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-40 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="mb-20">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all mb-10 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </button>

          <div className="flex flex-col gap-6 max-w-3xl">
            <h1 className="font-serif text-6xl md:text-8xl font-light text-foreground tracking-tight leading-[1.1]">
              Tu Sensibilidad <br />
              <span className="italic font-extralight text-primary">Cinematográfica</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl italic">
              Cuéntanos sobre tu atmósfera ideal. Lumina creará un perfil único para curar historias que resuenen con tu momento actual.
            </p>
          </div>

          {!isLoggedIn && (
            <div className="mt-12 p-8 bg-card border border-border rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 editorial-shadow animate-in fade-in slide-in-from-top-6 duration-1000">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-lg font-bold text-foreground tracking-tight">
                  ¿Deseas guardar tus descubrimientos?
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  Únete a Lumina para mantener un historial de tus recomendaciones y preferencias curadas.
                </p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setAuthModal({ isOpen: true, mode: "login" })}
                  className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Log in
                </button>
                <button 
                  onClick={() => setAuthModal({ isOpen: true, mode: "register" })}
                  className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest bg-primary text-white rounded-full hover:editorial-shadow transition-all cursor-pointer"
                >
                  Join
                </button>
              </div>
            </div>
          )}
        </div>

        <AuthModal 
          isOpen={authModal.isOpen} 
          onClose={() => setAuthModal({ ...authModal, isOpen: false })} 
          initialMode={authModal.mode}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 flex flex-col gap-12">

            {/* Géneros */}
            <section className="bg-card rounded-[2.5rem] p-10 md:p-14 border border-border editorial-shadow">
              <div className="flex flex-col gap-2 mb-10">
                <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">01. Acto Primero</p>
                <h2 className="font-serif text-3xl font-light text-foreground">Géneros Favoritos</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {GENRES.map((g) => (
                  <button
                    key={g}
                    onClick={() => toggleGenre(g)}
                    className={cn(
                      "px-6 py-3 rounded-full text-xs font-bold tracking-wider transition-all duration-500 cursor-pointer border",
                      prefs.genres.includes(g) 
                        ? "bg-primary text-white border-primary editorial-shadow scale-[1.05]" 
                        : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </section>

            {/* Actores / Autores */}
            <section className="bg-card rounded-[2.5rem] p-10 md:p-14 border border-border editorial-shadow">
              <div className="flex flex-col gap-2 mb-10">
                <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">02. Acto Segundo</p>
                <h2 className="font-serif text-3xl font-light text-foreground">Referencias Visuales</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">Actores de Interés</label>
                  <input
                    type="text"
                    placeholder="Ej: Cate Blanchett, Tilda Swinton"
                    value={prefs.movieActors}
                    onChange={(e) => setPrefs((p) => ({ ...p, movieActors: e.target.value }))}
                    className="w-full px-8 py-5 text-sm bg-background border border-border rounded-2xl focus:outline-none focus:border-primary/50 focus:editorial-shadow transition-all duration-500 placeholder:italic placeholder:opacity-40"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">Autores de Interés</label>
                  <input
                    type="text"
                    placeholder="Ej: Joan Didion, Murakami"
                    value={prefs.bookAuthors}
                    onChange={(e) => setPrefs((p) => ({ ...p, bookAuthors: e.target.value }))}
                    className="w-full px-8 py-5 text-sm bg-background border border-border rounded-2xl focus:outline-none focus:border-primary/50 focus:editorial-shadow transition-all duration-500 placeholder:italic placeholder:opacity-40"
                  />
                </div>
              </div>
            </section>

            {/* Tipo de historia */}
            <section className="bg-card rounded-[2.5rem] p-10 md:p-14 border border-border editorial-shadow">
              <div className="flex flex-col gap-2 mb-10">
                <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">03. Acto Tercero</p>
                <h2 className="font-serif text-3xl font-light text-foreground">Narrativa Ideal</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {STORY_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setPrefs((p) => ({ ...p, storyType: t }))}
                    className={cn(
                      "px-4 py-5 rounded-2xl text-xs font-bold tracking-widest transition-all duration-500 cursor-pointer border",
                      prefs.storyType === t 
                        ? "bg-primary text-white border-primary editorial-shadow" 
                        : "bg-background text-muted-foreground border-border hover:border-primary/30"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </section>

            {/* Estado emocional */}
            <section className="bg-primary/5 rounded-[3rem] p-10 md:p-14 border border-primary/20 editorial-shadow relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="flex flex-col gap-2 mb-10 relative z-10">
                <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">El Corazón de Lumina</p>
                <h2 className="font-serif text-4xl font-light text-foreground">Atmósfera Actual</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
                {MOODS.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => setPrefs((p) => ({ ...p, mood: m.label }))}
                    className={cn(
                      "group flex flex-col items-center justify-center gap-4 px-6 py-8 rounded-[2rem] text-xs font-bold tracking-widest transition-all duration-700 cursor-pointer border",
                      prefs.mood === m.label 
                        ? "bg-white text-primary border-primary/30 editorial-shadow scale-[1.03]" 
                        : "bg-white/40 text-muted-foreground border-transparent hover:bg-white hover:border-primary/20"
                    )}
                  >
                    <span className={cn("transition-transform duration-500", prefs.mood === m.label ? "scale-110 text-primary" : "group-hover:scale-110 text-muted-foreground/60")}>
                      <m.icon className="w-10 h-10" strokeWidth={1.5} />
                    </span>
                    <span className="text-center">{m.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Media type */}
            <section className="bg-card rounded-[2.5rem] p-10 md:p-14 border border-border editorial-shadow">
              <div className="flex flex-col gap-2 mb-10">
                <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">04. Formato</p>
                <h2 className="font-serif text-3xl font-light text-foreground">¿Qué historias buscas?</h2>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                {(["both", "movies", "books"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setPrefs((p) => ({ ...p, mediaType: type }))}
                    className={cn(
                      "flex-1 py-10 rounded-[2rem] flex flex-col items-center gap-4 transition-all duration-700 cursor-pointer border",
                      prefs.mediaType === type 
                        ? "bg-primary text-white border-primary editorial-shadow" 
                        : "bg-background text-muted-foreground border-border hover:border-primary/20"
                    )}
                  >
                    <span className="flex gap-2">
                      {type === "both" ? (
                        <>
                          <Clapperboard className="w-8 h-8" strokeWidth={1.5} />
                          <Book className="w-8 h-8" strokeWidth={1.5} />
                        </>
                      ) : type === "movies" ? (
                        <Clapperboard className="w-8 h-8" strokeWidth={1.5} />
                      ) : (
                        <Book className="w-8 h-8" strokeWidth={1.5} />
                      )}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                      {type === "both" ? "Ambos" : type === "movies" ? "Películas" : "Libros"}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 flex flex-col gap-8">
              <div className="bg-card rounded-[2.5rem] p-10 border border-border editorial-shadow">
                <div className="flex flex-col gap-6">
                  <h3 className="font-serif text-2xl font-light">Resumen del Perfil</h3>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <span>Progresión</span>
                      <span>{selectedCount}/5</span>
                    </div>
                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-1000 ease-out"
                        style={{ width: `${(selectedCount / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-8 pt-4">
                    <div className="flex flex-col gap-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground italic">Atmósfera</p>
                      <p className={cn("text-lg transition-all duration-500", prefs.mood ? "text-foreground font-medium" : "text-muted-foreground/30 italic font-light")}>
                        {prefs.mood || "No definida"}
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground italic">Narrativa</p>
                      <p className={cn("text-lg transition-all duration-500", prefs.storyType ? "text-foreground font-medium" : "text-muted-foreground/30 italic font-light")}>
                        {prefs.storyType || "No definida"}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground italic">Géneros Seleccionados</p>
                      <div className="flex flex-wrap gap-2">
                        {prefs.genres.length > 0 ? (
                          prefs.genres.slice(0, 3).map(g => (
                            <span key={g} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                              {g}
                            </span>
                          ))
                        ) : (
                          <span className="text-lg text-muted-foreground/30 italic font-light">Ninguno</span>
                        )}
                        {prefs.genres.length > 3 && <span className="text-[10px] text-muted-foreground font-bold mt-1">+{prefs.genres.length - 3}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 pt-10">
                    <button
                      onClick={() => isValid && onSubmit(prefs)}
                      disabled={!isValid}
                      className={cn(
                        "w-full py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 cursor-pointer",
                        isValid 
                          ? "bg-primary text-white editorial-shadow hover:scale-[1.02]" 
                          : "bg-secondary text-muted-foreground/40 cursor-not-allowed"
                      )}
                    >
                      Generar Descubrimientos
                    </button>
                    
                    <button
                      onClick={() => setPrefs({
                        genres: [], movieActors: "", bookAuthors: "", storyType: "", mood: "", mediaType: "both"
                      })}
                      className="group flex items-center justify-center gap-2 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Reiniciar Perfil
                    </button>
                  </div>
                </div>
              </div>

              {!isValid && (
                <div className="px-8 text-center">
                  <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                    * Define al menos un género, narrativa y atmósfera para que la IA pueda curar tus resultados.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

