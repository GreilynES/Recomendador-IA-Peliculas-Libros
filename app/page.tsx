"use client"

import { useState, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { LandingPage } from "@/components/landing-page"
import { PreferencesForm, type Preferences } from "@/components/preferences-form"
import { LoadingScreen } from "@/components/loading-screen"
import { ResultsPage } from "@/components/results-page"
import { DetailPage } from "@/components/detail-page"

import { RECOMMENDATIONS, type Recommendation } from "@/lib/data"
import { supabase } from "@/lib/supabase"
import { getDetailedRecommendations } from "@/lib/recommendations"
import { AuthForm } from "@/components/ui/auth-form"


type Screen = "landing" | "preferences" | "loading" | "results" | "detail" | "login" | "register"

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing")
  const [preferences, setPreferences] = useState<Preferences | null>(null)
  const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [userName, setUserName] = useState<string>("")

  const handleStart = () => setScreen("register")

  const handleExample = () => {
    setPreferences({
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
    setScreen("loading") // Move this here to show loading immediately

    try {
      const { data: usuario, error: userError } = await supabase
        .from("usuarios")
        .insert([
          {
            nombre: userName || "Usuario Anónimo",
          },
        ])
        .select()
        .single()

      if (userError) {
        console.error("Error creando usuario:", userError)
      }

      const userId = usuario?.id

      const actores = prefs.movieActors
        ? prefs.movieActors.split(",").map((a) => a.trim()).filter(Boolean)
        : []

      const autores = prefs.bookAuthors
        ? prefs.bookAuthors.split(",").map((a) => a.trim()).filter(Boolean)
        : []

      if (userId) {
        const { error: prefsError } = await supabase
          .from("preferencias")
          .insert([
            {
              usuario_id: userId,
              generos: prefs.genres,
              actores,
              autores,
              // 'temas' removed to match existing schema
            },
          ])
        if (prefsError) console.error("Error guardando preferencias:", prefsError)
      }

      // Fetch real recommendations from our API route
      const apiResponse = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prefs),
      });

      if (!apiResponse.ok) {
        throw new Error("Error en la petición a la API");
      }

      const { recommendations: generatedRecommendations } = await apiResponse.json();
      setRecommendations(generatedRecommendations)


      if (userId) {
        const tipoRecomendacion =
          prefs.mediaType === "movies"
            ? "película"
            : prefs.mediaType === "books"
              ? "libro"
              : "ambos"

        const consultaTexto = `Géneros: ${prefs.genres.join(", ")} | Ánimo: ${prefs.mood} | Historia: ${prefs.storyType}`

        const { error: historialError } = await supabase
          .from("historial")
          .insert([
            {
              usuario_id: userId,
              tipo_recomendacion: tipoRecomendacion,
              consulta: consultaTexto,
              resultado: generatedRecommendations, // Guardamos el JSON completo de recomendaciones
            },
          ])

        if (historialError) {
          console.error("Error guardando historial:", historialError)
        }
      }


      setPreferences(prefs)
      setScreen("results") // Directly go to results after loading data
    } catch (error) {
      console.error("Error in recommendation flow:", error)
      alert("Hubo un error al generar las recomendaciones. Por favor verifica tus API keys.")
      setScreen("preferences")
    }
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


  const showNavbar = screen !== "loading" && screen !== "login" && screen !== "register"

  return (
    <>
      {showNavbar && (
        <Navbar
          variant={screen === "landing" ? "solid" : "solid"}
          onStartClick={handleStart}
          onLoginClick={() => setScreen("login")}
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
        <LoadingScreen />
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

      {screen === "register" && (
        <AuthForm
          initialMode="register"
          onSuccess={(name) => {
            setUserName(name)
            setScreen("preferences")
          }}
          onBack={() => setScreen("landing")}
        />
      )}

      {screen === "login" && (
        <AuthForm
          initialMode="login"
          onSuccess={(name) => {
            setUserName(name)
            setScreen("preferences")
          }}
          onBack={() => setScreen("landing")}
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