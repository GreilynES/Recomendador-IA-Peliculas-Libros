"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import { X, Mail, Lock, User, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

type AuthMode = "login" | "register"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: AuthMode
}

const loginSchema = z.object({
  email: z.string().email("Correo electrónico inválido").max(100, "El correo es demasiado largo"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(50, "La contraseña es demasiado larga"),
})

const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(50, "El nombre es demasiado largo"),
  email: z.string().email("Correo electrónico inválido").max(100, "El correo es demasiado largo"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(50, "La contraseña es demasiado larga"),
})

type LoginValues = z.infer<typeof loginSchema>
type RegisterValues = z.infer<typeof registerSchema>

export function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const supabase = createClient()

  // Formulario de Login
  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" }
  })

  // Formulario de Registro
  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" }
  })

  // Sincronizar el modo cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode)
      setError(null)
      loginForm.reset()
      registerForm.reset()
    }
  }, [isOpen, initialMode, loginForm, registerForm])

  if (!isOpen) return null

  const onLoginSubmit = async (values: LoginValues) => {
    setIsLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      })
      if (error) throw error
      onClose()
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  const onRegisterSubmit = async (values: RegisterValues) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: { data: { full_name: values.name } }
      })
      if (authError) throw authError
      
      if (authData.user) {
        // Verificar si ya existe en la tabla usuarios para evitar duplicados
        const { data: existingUser } = await supabase
          .from("usuarios")
          .select("id")
          .eq("auth_id", authData.user.id)
          .maybeSingle()

        if (!existingUser) {
          await supabase.from("usuarios").insert([
            { auth_id: authData.user.id, nombre: values.name, email: values.email }
          ])
        }
      }
      onClose()
    } catch (err: any) {
      setError(err.message || "Error al registrarse")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-[var(--card)] rounded-3xl p-8 shadow-2xl border border-[var(--border)] relative overflow-hidden animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[var(--beige)] text-[var(--muted-foreground)] transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--teal)]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[var(--terracotta)]/5 rounded-full blur-3xl" />

        <div className="relative">
          <div className="mb-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-[var(--foreground)] mb-2">
              {mode === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}
            </h2>
            <p className="text-[var(--muted-foreground)] text-sm">
              {mode === "login" ? "Ingresa tus credenciales para continuar." : "Únete a Lumina y descubre historias increíbles."}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs">
              {error}
            </div>
          )}

          <form 
            onSubmit={
              mode === "login" 
                ? loginForm.handleSubmit(onLoginSubmit) 
                : registerForm.handleSubmit(onRegisterSubmit)
            } 
            className="flex flex-col gap-4"
          >
            {mode === "register" && (
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] ml-1">
                  Nombre completo
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)] group-focus-within:text-[var(--teal)] transition-colors" />
                  <input
                    {...registerForm.register("name")}
                    type="text"
                    placeholder="Tu nombre"
                    maxLength={50}
                    className={cn(
                      "w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[var(--beige)]/50 border border-[var(--border)] focus:border-[var(--teal)] outline-none transition-all placeholder:text-[var(--muted-foreground)]/50 text-sm",
                      registerForm.formState.errors.name && "border-red-500 focus:border-red-500"
                    )}
                  />
                </div>
                {registerForm.formState.errors.name && (
                  <p className="text-[10px] text-red-500 ml-1">{registerForm.formState.errors.name.message}</p>
                )}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] ml-1">
                Correo electrónico
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)] group-focus-within:text-[var(--teal)] transition-colors" />
                <input
                  {...(mode === "login" ? loginForm.register("email") : registerForm.register("email"))}
                  type="email"
                  placeholder="ejemplo@correo.com"
                  maxLength={100}
                  className={cn(
                    "w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[var(--beige)]/50 border border-[var(--border)] focus:border-[var(--teal)] outline-none transition-all placeholder:text-[var(--muted-foreground)]/50 text-sm",
                    (mode === "login" ? loginForm.formState.errors.email : registerForm.formState.errors.email) && "border-red-500 focus:border-red-500"
                  )}
                />
              </div>
              {(mode === "login" ? loginForm.formState.errors.email : registerForm.formState.errors.email) && (
                <p className="text-[10px] text-red-500 ml-1">
                  {(mode === "login" ? loginForm.formState.errors.email?.message : registerForm.formState.errors.email?.message)}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] ml-1">
                Contraseña
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)] group-focus-within:text-[var(--teal)] transition-colors" />
                <input
                  {...(mode === "login" ? loginForm.register("password") : registerForm.register("password"))}
                  type="password"
                  placeholder="••••••••"
                  maxLength={50}
                  className={cn(
                    "w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[var(--beige)]/50 border border-[var(--border)] focus:border-[var(--teal)] outline-none transition-all placeholder:text-[var(--muted-foreground)]/50 text-sm",
                    (mode === "login" ? loginForm.formState.errors.password : registerForm.formState.errors.password) && "border-red-500 focus:border-red-500"
                  )}
                />
              </div>
              {(mode === "login" ? loginForm.formState.errors.password : registerForm.formState.errors.password) && (
                <p className="text-[10px] text-red-500 ml-1">
                  {(mode === "login" ? loginForm.formState.errors.password?.message : registerForm.formState.errors.password?.message)}
                </p>
              )}
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
                  {mode === "login" ? "Entrar a mi cuenta" : "Empezar ahora"}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
            <p className="text-[var(--muted-foreground)] text-sm">
              {mode === "login" ? "¿Aún no tienes cuenta?" : "¿Ya tienes una cuenta?"}{" "}
              <button
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="text-[var(--teal)] font-bold hover:underline cursor-pointer"
              >
                {mode === "login" ? "Regístrate gratis" : "Inicia sesión"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
