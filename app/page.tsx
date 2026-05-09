"use client"

import { useState, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { LandingPage } from "@/components/landing-page"
import { PreferencesForm, type Preferences } from "@/components/preferences-form"
import { LoadingScreen } from "@/components/loading-screen"
import { ResultsPage } from "@/components/results-page"
import { DetailPage } from "@/components/detail-page"
import { RECOMMENDATIONS, type Recommendation } from "@/lib/data"
import { supabase } from "@/lib/lib/supabaseClient"


type Screen = "landing" | "preferences" | "loading" | "results" | "detail"

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing")
  const [preferences, setPreferences] = useState<Preferences | null>(null)
  const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  const handleStart = () => setScreen("preferences")

const handleExample = () => {
  setPreferences({
    name: "Usuario ejemplo",
    genres: ["Drama", "Ciencia Ficción", "Fantasía"],
    movieActors: "Cate Blanchett",
    bookAuthors: "García Márquez",
    storyType: "Reflexivo",
    mood: "Quiero pensar",
    mediaType: "both",
  })
  setScreen("loading")
}

  const handlePreferencesSubmit = async (prefs: Preferences) => {
    const { data: usuario, error: userError } = await supabase
      .from("usuarios")
      .insert([
        {
          nombre: prefs.name,
        },
      ])
      .select()
      .single()

    if (userError) {
      console.error("Error creando usuario:", userError)
      alert("No se pudo crear el usuario")
      return
    }

    const actores = prefs.movieActors
      ? prefs.movieActors.split(",").map((a) => a.trim()).filter(Boolean)
      : []

    const autores = prefs.bookAuthors
      ? prefs.bookAuthors.split(",").map((a) => a.trim()).filter(Boolean)
      : []

    const { error: prefsError } = await supabase
      .from("preferencias")
      .insert([
        {
          usuario_id: usuario.id,
          generos: prefs.genres,
          actores,
          autores,
        },
      ])

    if (prefsError) {
      console.error("Error guardando preferencias:", prefsError)
      alert("No se pudieron guardar las preferencias")
      return
    }


    let generatedRecommendations = [...RECOMMENDATIONS]

if (prefs.mediaType === "movies") {
  generatedRecommendations = RECOMMENDATIONS.filter(
    (r) => r.type === "movie"
  )
}

if (prefs.mediaType === "books") {
  generatedRecommendations = RECOMMENDATIONS.filter(
    (r) => r.type === "book"
  )
}

setRecommendations(generatedRecommendations)

const historialPayload = generatedRecommendations.map((r) => ({
  titulo: r.title,
  tipo: r.type,
}))

const tipoRecomendacion =
  prefs.mediaType === "movies"
    ? "peliculas"
    : prefs.mediaType === "books"
      ? "libros"
      : "ambos"

const consultaTexto = `
Nombre: ${prefs.name}
Géneros: ${prefs.genres.join(", ")}
Historia: ${prefs.storyType}
Estado: ${prefs.mood}
`

const { error: historialError } = await supabase
  .from("historial")
  .insert([
    {
      usuario_id: usuario.id,
      tipo_recomendacion: tipoRecomendacion,
      consulta: consultaTexto,
      resultado: historialPayload,
    },
  ])

if (historialError) {
  console.error("Error guardando historial:", historialError)
}


    setPreferences(prefs)
    setScreen("loading")
  }

  const handleLoadingComplete = useCallback(() => {
    setScreen("results")
  }, [])

  const handleViewDetail = (rec: Recommendation) => {
    setSelectedRec(rec)
    setScreen("detail")
  }

  const handleNewSearch = () => {
    setPreferences(null)
    setSelectedRec(null)
    setScreen("landing")
  }


  const showNavbar = screen !== "loading"

  return (
    <>
      {showNavbar && (
        <Navbar
          variant={screen === "landing" ? "solid" : "solid"}
          onStartClick={handleStart}
        />
      )}

      {screen === "landing" && (
        <LandingPage onStart={handleStart} onExample={handleExample} />
      )}

      {screen === "preferences" && (
        <PreferencesForm
          onSubmit={handlePreferencesSubmit}
          onBack={() => setScreen("landing")}
        />
      )}

      {screen === "loading" && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {screen === "results" && preferences && (
        <ResultsPage
          preferences={preferences}
          recommendations={recommendations}
          onViewDetail={handleViewDetail}
          onEditPreferences={() => setScreen("preferences")}
          onNewSearch={handleNewSearch}
        />
      )}

      {screen === "detail" && selectedRec && (
        <DetailPage
          recommendation={selectedRec}
          onBack={() => setScreen("results")}
          onNewSearch={handleNewSearch}
        />
      )}
    </>
  )
}