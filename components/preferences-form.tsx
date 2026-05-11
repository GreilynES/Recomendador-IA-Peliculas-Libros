"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

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
}

const GENRES = [
  "Drama", "Comedia", "Thriller", "Ciencia Ficción", "Romance", "Terror",
  "Aventura", "Fantasía", "Misterio", "Histórico", "Documental", "Acción",
]

const STORY_TYPES = ["Épico", "Íntimo", "Rápido y tenso", "Reflexivo", "Oscuro", "Esperanzador"]

const MOODS = [
  { label: "Quiero reír", icon: "😄" },
  { label: "Quiero llorar", icon: "🌧" },
  { label: "Quiero pensar", icon: "🌀" },
  { label: "Quiero escapar", icon: "🌙" },
  { label: "Quiero inspirarme", icon: "✨" },
  { label: "Quiero emoción", icon: "⚡" },
]

const inputStyle = {
  background: "rgba(30,24,19,0.8)",
  border: "1px solid rgba(199,162,124,0.2)",
  color: "#F3E8D7",
  borderRadius: "0.75rem",
}

const cardStyle = {
  background: "rgba(23,18,14,0.8)",
  border: "1px solid rgba(199,162,124,0.1)",
  backdropFilter: "blur(10px)",
}

export function PreferencesForm({ onSubmit, onBack }: PreferencesFormProps) {
  const [prefs, setPrefs] = useState<Preferences>({
    genres: [],
    movieActors: "",
    bookAuthors: "",
    storyType: "",
    mood: "",
    mediaType: "both",
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

  return (
    <main className="min-h-screen bg-[#0D0A07] pt-24 pb-20 relative overflow-hidden">
      {/* Ambient lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[#C7A27C]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/2 left-0 w-[400px] h-[400px] bg-[#8B5E4A]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-8 relative z-10">
        <div className="mb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-[#BBA892] hover:text-[#F3E8D7] transition-colors mb-6 cursor-pointer font-medium"
          >
            ← Volver
          </button>

          <p className="text-[#C7A27C]/60 text-xs uppercase tracking-[0.2em] font-semibold mb-3">Cuéntanos más</p>

          <h1 className="font-serif text-5xl font-bold text-[#F3E8D7]">
            Tu perfil cinematográfico
          </h1>

          <p className="mt-4 text-[#BBA892] leading-relaxed max-w-2xl text-base">
            Cada respuesta nos ayuda a entender mejor tu vibe. Lumina crea un perfil que es{" "}
            <span className="text-[#C7A27C] font-semibold">únicamente tuyo</span>.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 flex flex-col gap-8">


            {/* Géneros */}
            <section className="rounded-2xl p-8" style={cardStyle}>
              <h2 className="font-serif text-xl font-bold text-[#F3E8D7] mb-1">Géneros favoritos</h2>
              <p className="text-sm text-[#BBA892] mb-5">Selecciona todos los que resuenen contigo.</p>
              <div className="flex flex-wrap gap-2.5">
                {GENRES.map((g) => (
                  <button
                    key={g}
                    onClick={() => toggleGenre(g)}
                    className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer"
                    style={{
                      background: prefs.genres.includes(g) ? "#C7A27C" : "rgba(30,24,19,0.8)",
                      color: prefs.genres.includes(g) ? "#0D0A07" : "#BBA892",
                      border: prefs.genres.includes(g)
                        ? "1px solid #C7A27C"
                        : "1px solid rgba(199,162,124,0.2)",
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </section>

            {/* Actores / Autores */}
            <section className="rounded-2xl p-8" style={cardStyle}>
              <div className="grid grid-cols-2 gap-7">
                <div>
                  <label className="block font-serif text-lg font-bold text-[#F3E8D7] mb-1">Actores favoritos</label>
                  <p className="text-xs text-[#BBA892] mb-4">Para recomendaciones de películas</p>
                  <input
                    type="text"
                    placeholder="Ej: Cate Blanchett, Timothée"
                    value={prefs.movieActors}
                    onChange={(e) => setPrefs((p) => ({ ...p, movieActors: e.target.value }))}
                    className="w-full px-5 py-3 text-sm placeholder:text-[#BBA892]/50 focus:outline-none focus:ring-1 focus:ring-[#C7A27C]/50 transition-all"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block font-serif text-lg font-bold text-[#F3E8D7] mb-1">Autores favoritos</label>
                  <p className="text-xs text-[#BBA892] mb-4">Para recomendaciones de libros</p>
                  <input
                    type="text"
                    placeholder="Ej: García Márquez, Donna"
                    value={prefs.bookAuthors}
                    onChange={(e) => setPrefs((p) => ({ ...p, bookAuthors: e.target.value }))}
                    className="w-full px-5 py-3 text-sm placeholder:text-[#BBA892]/50 focus:outline-none focus:ring-1 focus:ring-[#C7A27C]/50 transition-all"
                    style={inputStyle}
                  />
                </div>
              </div>
            </section>

            {/* Tipo de historia */}
            <section className="rounded-2xl p-8" style={cardStyle}>
              <h2 className="font-serif text-xl font-bold text-[#F3E8D7] mb-1">Tipo de historia</h2>
              <p className="text-sm text-[#BBA892] mb-5">La narrativa que quieres explorar.</p>
              <div className="grid grid-cols-3 gap-3">
                {STORY_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setPrefs((p) => ({ ...p, storyType: t }))}
                    className="px-4 py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 cursor-pointer"
                    style={{
                      background: prefs.storyType === t ? "#C7A27C" : "rgba(30,24,19,0.8)",
                      color: prefs.storyType === t ? "#0D0A07" : "#BBA892",
                      border: prefs.storyType === t
                        ? "1px solid #C7A27C"
                        : "1px solid rgba(199,162,124,0.15)",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </section>

            {/* Estado emocional */}
            <section className="rounded-2xl p-8" style={{ ...cardStyle, border: "1px solid rgba(199,162,124,0.25)" }}>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xl">🎬</span>
                <h2 className="font-serif text-2xl font-bold text-[#C7A27C]">Tu estado emocional</h2>
              </div>
              <p className="text-sm text-[#BBA892] mb-6 ml-9">Este es el corazón de Lumina. ¿Cómo te sientes ahora?</p>
              <div className="grid grid-cols-3 gap-3">
                {MOODS.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => setPrefs((p) => ({ ...p, mood: m.label }))}
                    className="px-4 py-4 rounded-xl text-sm font-semibold text-center transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    style={{
                      background: prefs.mood === m.label
                        ? "linear-gradient(135deg, #C7A27C, #8B5E4A)"
                        : "rgba(30,24,19,0.8)",
                      color: prefs.mood === m.label ? "#0D0A07" : "#BBA892",
                      border: prefs.mood === m.label
                        ? "1px solid #C7A27C"
                        : "1px solid rgba(199,162,124,0.15)",
                    }}
                  >
                    <span>{m.icon}</span>
                    {m.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Media type */}
            <section className="rounded-2xl p-8" style={cardStyle}>
              <h2 className="font-serif text-xl font-bold text-[#F3E8D7] mb-1">¿Qué quieres?</h2>
              <p className="text-sm text-[#BBA892] mb-5">Películas, libros o ambos.</p>
              <div className="flex gap-3">
                {(["both", "movies", "books"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setPrefs((p) => ({ ...p, mediaType: type }))}
                    className="flex-1 py-4 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer flex flex-col items-center gap-2"
                    style={{
                      background: prefs.mediaType === type ? "#C7A27C" : "rgba(30,24,19,0.8)",
                      color: prefs.mediaType === type ? "#0D0A07" : "#BBA892",
                      border: prefs.mediaType === type
                        ? "1px solid #C7A27C"
                        : "1px solid rgba(199,162,124,0.15)",
                    }}
                  >
                    <span className="text-xl">
                      {type === "both" ? "🎬📚" : type === "movies" ? "🎬" : "📚"}
                    </span>
                    <span>
                      {type === "both" ? "Películas y libros" : type === "movies" ? "Solo películas" : "Solo libros"}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar — sticky profile */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl p-6 sticky top-24" style={cardStyle}>
              <h3 className="font-serif text-lg font-semibold text-[#F3E8D7] mb-4">Tu perfil</h3>

              <div className="mb-5">
                <div className="flex justify-between text-xs text-[#BBA892] mb-2">
                  <span>Completado</span>
                  <span>{selectedCount}/5 campos</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(199,162,124,0.1)" }}>
                  <div
                    className="h-full rounded-full bg-[var(--teal)] transition-all duration-500"
                    style={{ width: `${(selectedCount / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 text-sm">


                {prefs.genres.length > 0 && (
                  <div>
                    <span className="text-[10px] text-[#BBA892]/60 uppercase tracking-wider">Géneros</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {prefs.genres.slice(0, 3).map((g) => (
                        <span key={g} className="px-2 py-0.5 rounded-full text-[#C7A27C] text-xs"
                          style={{ background: "rgba(199,162,124,0.1)" }}>
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {prefs.storyType && (
                  <div>
                    <span className="text-[10px] text-[#BBA892]/60 uppercase tracking-wider">Historia</span>
                    <p className="mt-0.5 font-medium text-[#F3E8D7]">{prefs.storyType}</p>
                  </div>
                )}
                {prefs.mood && (
                  <div>
                    <span className="text-[10px] text-[#BBA892]/60 uppercase tracking-wider">Estado de ánimo</span>
                    <p className="mt-0.5 font-medium text-[#F3E8D7]">{prefs.mood}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => isValid && onSubmit(prefs)}
                  disabled={!isValid}
                  className="w-full py-3.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer"
                  style={
                    isValid
                      ? { background: "#C7A27C", color: "#0D0A07", boxShadow: "0 6px 24px rgba(199,162,124,0.3)" }
                      : { background: "rgba(199,162,124,0.1)", color: "#BBA892/40", cursor: "not-allowed" }
                  }
                >
                  Generar recomendaciones
                </button>
                <button
                  onClick={() =>
                    setPrefs({
                      genres: [],
                      movieActors: "",
                      bookAuthors: "",
                      storyType: "",
                      mood: "",
                      mediaType: "both",
                    })
                  }
                  className="w-full py-3 rounded-full text-sm font-medium text-[var(--muted-foreground)] border border-[var(--border)] hover:bg-[var(--beige)] transition-colors cursor-pointer"
                >
                  Limpiar todo
                </button>
              </div>

              {!isValid && (
                <p className="mt-3 text-xs text-[var(--muted-foreground)] text-center leading-relaxed">
                  Selecciona al menos un género, tipo de historia y estado de ánimo.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}