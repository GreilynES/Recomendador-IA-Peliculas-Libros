"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { ArrowLeft, Mail, Lock, User, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // 1. Registro en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      })

      if (authError) throw authError

      if (authData.user) {
        // 2. Guardar en la tabla "usuarios"
        const { error: dbError } = await supabase
          .from("usuarios")
          .insert([
            {
              auth_id: authData.user.id,
              nombre: name,
              email: email,
            },
          ])

        if (dbError) throw dbError

        // Redirigir directamente a preferencias
        router.push("/?screen=preferences")
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error durante el registro")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 pt-24 sm:pt-28">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500 my-6">
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
            <div className="mb-6 sm:mb-8 text-center">
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[var(--foreground)] mb-2">
                Registrarse
              </h2>
              <p className="text-[var(--muted-foreground)] text-sm sm:text-base">
                Crea tu cuenta
              </p>
            </div>

            {error && (
              <div className="mb-5 sm:mb-6 p-3 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs sm:text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="flex flex-col gap-2.5 sm:gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--muted-foreground)] ml-1">
                  Nombre
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)] group-focus-within:text-[var(--teal)] transition-colors" />
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 sm:py-3 rounded-xl bg-[var(--beige)]/50 border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all placeholder:text-[var(--muted-foreground)]/50 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--muted-foreground)] ml-1">
                  Correo
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)] group-focus-within:text-[var(--teal)] transition-colors" />
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 sm:py-3 rounded-xl bg-[var(--beige)]/50 border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all placeholder:text-[var(--muted-foreground)]/50 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--muted-foreground)] ml-1">
                  Contraseña
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)] group-focus-within:text-[var(--teal)] transition-colors" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 sm:py-3 rounded-xl bg-[var(--beige)]/50 border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all placeholder:text-[var(--muted-foreground)]/50 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-1 bg-[var(--primary)] text-white py-2.5 rounded-xl font-semibold shadow-lg shadow-[var(--primary)]/40 hover:shadow-xl hover:shadow-[var(--primary)]/50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-sm"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Empezar ahora
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-[var(--border)] text-center">
              <p className="text-[var(--muted-foreground)] text-xs">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-[var(--primary)] font-semibold hover:underline cursor-pointer">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
