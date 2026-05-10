"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Info } from "lucide-react"

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
}

const GENRES = [
  "Drama", "Comedia", "Thriller", "Ciencia Ficción", "Romance", "Terror",
  "Aventura", "Fantasía", "Misterio", "Histórico", "Documental", "Acción",
]

const STORY_TYPES = ["Épico", "Íntimo", "Rápido y tenso", "Reflexivo", "Oscuro", "Esperanzador"]

const MOODS = ["Quiero reír", "Quiero llorar", "Quiero pensar", "Quiero escapar", "Quiero inspirarme", "Quiero emoción"]

export function PreferencesForm({ onSubmit, onBack, isLoggedIn }: PreferencesFormProps) {
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
    <main className="min-h-screen bg-[var(--background)] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-8">
        <div className="mb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-6 cursor-pointer"
          >
            ← Volver
          </button>

          <p className="text-xs uppercase tracking-widest text-[var(--terracotta)] font-medium mb-3">
            Paso 1 de 1
          </p>

          <h1 className="font-serif text-4xl font-bold text-[var(--foreground)] text-balance">
            Cuéntanos tus preferencias
          </h1>

          <p className="mt-3 text-[var(--muted-foreground)] leading-relaxed max-w-xl">
            Mientras más nos cuentes, más precisas serán tus recomendaciones.
          </p>

          {!isLoggedIn && (
            <div className="mt-8 p-4 bg-[var(--teal)]/5 border border-[var(--teal)]/20 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="w-10 h-10 rounded-full bg-[var(--teal)]/10 flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-[var(--teal)]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[var(--foreground)] font-medium">
                  ¿Quieres guardar tus recomendaciones?
                </p>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                  Registrate o inicia sesión para tener un historial personalizado de tus preferencias.
                </p>
              </div>
              <div className="flex gap-2">
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-xs font-bold text-[var(--teal)] hover:bg-[var(--teal)]/10 rounded-full transition-colors cursor-pointer"
                >
                  Iniciar sesión
                </Link>
                <Link 
                  href="/register" 
                  className="px-4 py-2 text-xs font-bold bg-[var(--teal)] text-white rounded-full hover:bg-[var(--teal-dark)] transition-all shadow-sm cursor-pointer"
                >
                  Registrarse
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 flex flex-col gap-8">


            <section className="bg-[var(--card)] rounded-2xl p-8 shadow-sm border border-[var(--border)]">
              <h2 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-2">
                Géneros favoritos
              </h2>

              <p className="text-sm text-[var(--muted-foreground)] mb-5">
                Selecciona todos los que te interesen.
              </p>

              <div className="flex flex-wrap gap-2">
                {GENRES.map((g) => (
                  <button
                    key={g}
                    onClick={() => toggleGenre(g)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer",
                      prefs.genres.includes(g)
                        ? "bg-[var(--teal)] text-[var(--primary-foreground)] border-[var(--teal)] shadow-sm"
                        : "bg-transparent text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--beige)] hover:border-[var(--teal)]/30"
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-[var(--card)] rounded-2xl p-8 shadow-sm border border-[var(--border)]">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block font-serif text-base font-semibold text-[var(--foreground)] mb-1">
                    Actores favoritos
                  </label>

                  <p className="text-xs text-[var(--muted-foreground)] mb-3">
                    Para recomendaciones de películas
                  </p>

                  <input
                    type="text"
                    placeholder="Ej: Cate Blanchett, Timothée Chalamet"
                    value={prefs.movieActors}
                    onChange={(e) =>
                      setPrefs((p) => ({ ...p, movieActors: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block font-serif text-base font-semibold text-[var(--foreground)] mb-1">
                    Autores favoritos
                  </label>

                  <p className="text-xs text-[var(--muted-foreground)] mb-3">
                    Para recomendaciones de libros
                  </p>

                  <input
                    type="text"
                    placeholder="Ej: García Márquez, Donna Tartt"
                    value={prefs.bookAuthors}
                    onChange={(e) =>
                      setPrefs((p) => ({ ...p, bookAuthors: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--teal)] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </section>

            <section className="bg-[var(--card)] rounded-2xl p-8 shadow-sm border border-[var(--border)]">
              <h2 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-2">
                Tipo de historia
              </h2>

              <p className="text-sm text-[var(--muted-foreground)] mb-5">
                ¿Qué tipo de narrativa prefieres ahora?
              </p>

              <div className="grid grid-cols-3 gap-3">
                {STORY_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setPrefs((p) => ({ ...p, storyType: t }))}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-medium border text-center transition-all duration-150 cursor-pointer",
                      prefs.storyType === t
                        ? "bg-[var(--terracotta)] text-white border-[var(--terracotta)] shadow-sm"
                        : "bg-transparent text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--beige)] hover:border-[var(--terracotta)]/30"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-[var(--card)] rounded-2xl p-8 shadow-sm border border-[var(--border)]">
              <h2 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-2">
                Estado de ánimo
              </h2>

              <p className="text-sm text-[var(--muted-foreground)] mb-5">
                ¿Cómo te sientes hoy?
              </p>

              <div className="grid grid-cols-3 gap-3">
                {MOODS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setPrefs((p) => ({ ...p, mood: m }))}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-medium border text-center transition-all duration-150 cursor-pointer",
                      prefs.mood === m
                        ? "bg-[var(--teal)] text-white border-[var(--teal)] shadow-sm"
                        : "bg-transparent text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--beige)]"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-[var(--card)] rounded-2xl p-8 shadow-sm border border-[var(--border)]">
              <h2 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-2">
                ¿Qué quieres?
              </h2>

              <p className="text-sm text-[var(--muted-foreground)] mb-5">
                Elige el tipo de recomendaciones que deseas recibir.
              </p>

              <div className="flex gap-3">
                {(["both", "movies", "books"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setPrefs((p) => ({ ...p, mediaType: type }))}
                    className={cn(
                      "flex-1 py-4 rounded-xl text-sm font-medium border transition-all duration-150 cursor-pointer flex flex-col items-center gap-2",
                      prefs.mediaType === type
                        ? "bg-[var(--teal)] text-white border-[var(--teal)] shadow-sm"
                        : "bg-transparent text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--beige)]"
                    )}
                  >
                    <span className="text-xl">
                      {type === "both" ? "🎬📚" : type === "movies" ? "🎬" : "📚"}
                    </span>
                    <span>
                      {type === "both"
                        ? "Películas y libros"
                        : type === "movies"
                          ? "Solo películas"
                          : "Solo libros"}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-[var(--card)] rounded-2xl p-6 shadow-sm border border-[var(--border)] sticky top-24">
              <h3 className="font-serif text-lg font-semibold text-[var(--foreground)] mb-4">
                Tu perfil
              </h3>

              <div className="mb-5">
                <div className="flex justify-between text-xs text-[var(--muted-foreground)] mb-2">
                  <span>Completado</span>
                  <span>{selectedCount}/5 campos</span>
                </div>

                <div className="h-2 rounded-full bg-[var(--beige)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--teal)] transition-all duration-500"
                    style={{ width: `${(selectedCount / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 text-sm">


                {prefs.genres.length > 0 && (
                  <div>
                    <span className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">
                      Géneros
                    </span>

                    <div className="flex flex-wrap gap-1 mt-1">
                      {prefs.genres.slice(0, 3).map((g) => (
                        <span
                          key={g}
                          className="px-2 py-0.5 rounded-full bg-[var(--teal)]/10 text-[var(--teal)] text-xs"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {prefs.storyType && (
                  <div>
                    <span className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">
                      Historia
                    </span>
                    <p className="mt-0.5 font-medium text-[var(--foreground)]">
                      {prefs.storyType}
                    </p>
                  </div>
                )}

                {prefs.mood && (
                  <div>
                    <span className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">
                      Estado de ánimo
                    </span>
                    <p className="mt-0.5 font-medium text-[var(--foreground)]">
                      {prefs.mood}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => isValid && onSubmit(prefs)}
                  disabled={!isValid}
                  className={cn(
                    "w-full py-3.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer",
                    isValid
                      ? "bg-[var(--teal)] text-white hover:bg-[var(--teal-dark)] shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      : "bg-[var(--muted)] text-[var(--muted-foreground)] cursor-not-allowed opacity-60"
                  )}
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