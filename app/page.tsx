"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { LandingPage } from "@/components/landing-page"
import { PreferencesForm, type Preferences } from "@/components/preferences-form"
import { LoadingScreen } from "@/components/loading-screen"
import { ResultsPage } from "@/components/results-page"
import { DetailPage } from "@/components/detail-page"

import { type Recommendation } from "@/lib/data"
import { createClient } from "@/lib/supabase"

type Screen = "landing" | "preferences" | "loading" | "results" | "detail"

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing")
  const [preferences, setPreferences] = useState<Preferences | null>(null)
  const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [user, setUser] = useState<any>(null)
  
  const router = useRouter()
  const supabase = createClient()

  const searchParams = useSearchParams()

  useEffect(() => {
    // 1. Obtener usuario inicial
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    // 2. Escuchar cambios en la autenticación (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      // Refrescar para asegurar que las cookies de SSR estén sincronizadas si es necesario
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  useEffect(() => {
    // Detectar si venimos de login/register con el parámetro de pantalla
    if (searchParams.get("screen") === "preferences") {
      setScreen("preferences")
      // Limpiar el parámetro de la URL sin recargar
      router.replace("/")
    }
  }, [searchParams, router])

  const handleStart = () => {
    setScreen("preferences")
  }

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
    setScreen("loading")

    try {
      let userId = null

      if (user) {
        // Buscar el ID en nuestra tabla "usuarios" usando el auth_id
        const { data: usuarioRecord, error: userError } = await supabase
          .from("usuarios")
          .select("id")
          .eq("auth_id", user.id)
          .limit(1)
          .maybeSingle()

        if (usuarioRecord) {
          userId = usuarioRecord.id
        } else {
          // Si por alguna razón no existe en la tabla usuarios, lo creamos
          const { data: newUser, error: createError } = await supabase
            .from("usuarios")
            .insert([{
              auth_id: user.id,
              nombre: user.user_metadata?.full_name || "Usuario",
              email: user.email
            }])
            .select()
            .single()
          
          if (newUser) userId = newUser.id
        }
      }

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
              resultado: generatedRecommendations,
            },
          ])

        if (historialError) {
          console.error("Error guardando historial:", historialError)
        }
      }

      setPreferences(prefs)
      setScreen("results")
    } catch (error) {
      console.error("Error in recommendation flow:", error)
      alert("Hubo un error al generar las recomendaciones.")
      setScreen("preferences")
    }
  }

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
          variant="solid"
          onStartClick={handleStart}
          onLoginClick={() => router.push("/login")}
        />
      )}

      {screen === "landing" && (
        <LandingPage onStart={handleStart} onExample={handleExample} />
      )}

      {screen === "preferences" && (
        <PreferencesForm
          onSubmit={handlePreferencesSubmit}
          onBack={() => setScreen("landing")}
          isLoggedIn={!!user}
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