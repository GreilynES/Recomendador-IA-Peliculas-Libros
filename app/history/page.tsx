"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Navbar } from "@/components/navbar"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function HistoryPage() {
  const [historyItems, setHistoryItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuthAndFetchHistory = async () => {
      try {
        // Check if user is logged in
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          router.push("/login")
          return
        }

        setUser(user)

        // Get the numeric usuario_id from usuarios table
        const { data: usuarioRecord, error: userError } = await supabase
          .from("usuarios")
          .select("id")
          .eq("auth_id", user.id)
          .limit(1)
          .maybeSingle()

        if (userError || !usuarioRecord) {
          console.error("Error fetching usuario:", userError)
          setHistoryItems([])
          setIsLoading(false)
          return
        }

        const usuarioId = usuarioRecord.id

        // Fetch history from Supabase
        try {
          const { data, error } = await supabase
            .from("historial")
            .select("id, tipo_recomendacion, consulta, resultado")
            .eq("usuario_id", usuarioId)
            .order("id", { ascending: false })

          if (error) {
            console.error("Error fetching history:", error)
            setHistoryItems([])
          } else {
            setHistoryItems(data || [])
          }
        } catch (err) {
          // Table doesn't exist yet, just show empty state
          setHistoryItems([])
        }
      } catch (error) {
        console.error("Error:", error)
        setHistoryItems([])
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthAndFetchHistory()
  }, [router, supabase])

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 pt-24 sm:pt-28">
        <div className="w-full max-w-4xl">
          <Link
            href="/"
            className="mb-6 sm:mb-8 flex items-center gap-2 text-xs font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group cursor-pointer uppercase tracking-wider mr-auto"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>

          <div className="bg-[var(--card)] rounded-3xl p-5 sm:p-6 shadow-2xl border border-[var(--border)] relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--teal)]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[var(--terracotta)]/5 rounded-full blur-3xl" />

            <div className="relative">
              <div className="mb-8 text-center">
                <h1 className="font-serif text-3xl sm:text-4xl font-light text-[var(--foreground)] mb-2">
                  Mi Historial
                </h1>
                <p className="text-[var(--muted-foreground)] text-sm sm:text-base">
                  Películas y libros que has explorado
                </p>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="w-8 h-8 border-2 border-[var(--primary)]/20 border-t-[var(--primary)] rounded-full animate-spin" />
                </div>
              ) : historyItems.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-[var(--muted-foreground)] text-sm mb-4">
                    Aún no tienes historial. ¡Comienza a explorar películas y libros!
                  </p>
                  <Link
                    href="/"
                    className="inline-block px-6 py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:scale-[1.02] transition-transform"
                  >
                    Ir a explorar
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {historyItems.map((item: any) => {
                    let resultados: any[] = []
                    try {
                      const parsed = typeof item.resultado === "string" 
                        ? JSON.parse(item.resultado) 
                        : item.resultado
                      resultados = Array.isArray(parsed) ? parsed : [parsed]
                    } catch (e) {
                      resultados = []
                    }

                    return (
                      <div key={item.id} className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] px-3 py-1 bg-[var(--primary)]/10 rounded-full">
                            {item.tipo_recomendacion}
                          </span>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            Recomendaciones basadas en: {item.consulta.substring(0, 60)}...
                          </p>
                        </div>

                        {resultados.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {resultados.map((rec: any, idx: number) => (
                              <article
                                key={idx}
                                className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--background)] hover:shadow-lg hover:border-[var(--primary)]/50 transition-all"
                              >
                                <h3 className="font-semibold text-[var(--foreground)] mb-2 line-clamp-2">
                                  {rec.title || rec.nombre || "Sin título"}
                                </h3>
                                <p className="text-xs text-[var(--muted-foreground)] line-clamp-3">
                                  {rec.description || rec.descripcion || rec.sinopsis || "No hay descripción"}
                                </p>
                                {(rec.year || rec.año) && (
                                  <p className="text-xs text-[var(--muted-foreground)] mt-3 pt-3 border-t border-[var(--border)]">
                                    {rec.year || rec.año}
                                  </p>
                                )}
                              </article>
                            ))}
                          </div>
                        ) : (
                          <div className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--border)] text-center">
                            <p className="text-sm text-[var(--muted-foreground)]">
                              No se encontraron resultados para este historial
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
