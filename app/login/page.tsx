"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { ArrowLeft, Mail, Lock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Redirigir al home con un parámetro para mostrar las preferencias
      router.push("/?screen=preferences")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión. Verifica tus credenciales.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--background)]">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--teal)] transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>

        <div className="bg-[var(--card)] rounded-3xl p-8 shadow-2xl border border-[var(--border)] relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--teal)]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[var(--terracotta)]/5 rounded-full blur-3xl" />

          <div className="relative">
            <div className="mb-8 text-center">
              <h2 className="font-serif text-3xl font-bold text-[var(--foreground)] mb-2">
                Bienvenido de nuevo
              </h2>
              <p className="text-[var(--muted-foreground)] text-sm">
                Ingresa tus credenciales para continuar.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] ml-1">
                  Correo electrónico
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)] group-focus-within:text-[var(--teal)] transition-colors" />
                  <input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[var(--beige)]/50 border border-[var(--border)] focus:border-[var(--teal)] focus:ring-2 focus:ring-[var(--teal)]/20 outline-none transition-all placeholder:text-[var(--muted-foreground)]/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] ml-1">
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
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[var(--beige)]/50 border border-[var(--border)] focus:border-[var(--teal)] focus:ring-2 focus:ring-[var(--teal)]/20 outline-none transition-all placeholder:text-[var(--muted-foreground)]/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 bg-[var(--teal)] text-white py-4 rounded-2xl font-semibold shadow-lg shadow-[var(--teal)]/20 hover:bg-[var(--teal-dark)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Entrar a mi cuenta
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
              <p className="text-[var(--muted-foreground)] text-sm">
                ¿Aún no tienes cuenta?{" "}
                <Link href="/register" className="text-[var(--teal)] font-bold hover:underline cursor-pointer">
                  Regístrate gratis
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
