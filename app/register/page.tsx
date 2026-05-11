"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { ArrowLeft, Mail, Lock, User, ArrowRight } from "lucide-react"
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
                Crea tu cuenta
              </h2>
              <p className="text-[var(--muted-foreground)] text-sm">
                Únete a Lumina y descubre historias increíbles.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="flex flex-col gap-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] ml-1">
                  Nombre completo
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)] group-focus-within:text-[var(--teal)] transition-colors" />
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[var(--beige)]/50 border border-[var(--border)] focus:border-[var(--teal)] focus:ring-2 focus:ring-[var(--teal)]/20 outline-none transition-all placeholder:text-[var(--muted-foreground)]/50"
                  />
                </div>
              </div>

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
                    Empezar ahora
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
              <p className="text-[var(--muted-foreground)] text-sm">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-[var(--teal)] font-bold hover:underline cursor-pointer">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
