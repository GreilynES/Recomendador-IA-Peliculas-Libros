"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import { X, Mail, Lock, User, ArrowRight, LoaderCircle } from "lucide-react"
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

  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" }
  })

  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" }
  })

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-md animate-in fade-in duration-500">
      <div className="w-full max-w-sm bg-card rounded-[2.5rem] p-8 md:p-10 border border-border editorial-shadow relative overflow-hidden animate-in zoom-in-95 duration-700">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-all z-10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

        <div className="relative">
          <div className="mb-8">
            <p className="text-primary text-[9px] font-bold uppercase tracking-[0.4em] mb-3">
              Lumina Access
            </p>
            <h2 className="font-serif text-3xl font-light text-foreground tracking-tight leading-tight mb-2">
              {mode === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}
            </h2>
            <p className="text-muted-foreground text-xs italic">
              {mode === "login" ? "Ingresa para continuar tu viaje." : "Únete a la galería editorial de historias curadas."}
            </p>
          </div>

          {error && (
            <div className="mb-8 p-5 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold tracking-tight">
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
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                  Nombre completo
                </label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                  <input
                    {...registerForm.register("name")}
                    type="text"
                    placeholder="Tu nombre"
                    className={cn(
                      "w-full pl-14 pr-6 py-3 rounded-2xl bg-background border border-border focus:border-primary/50 focus:editorial-shadow outline-none transition-all placeholder:text-muted-foreground/30 text-sm",
                      registerForm.formState.errors.name && "border-destructive/50"
                    )}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                <input
                  {...(mode === "login" ? loginForm.register("email") : registerForm.register("email"))}
                  type="email"
                  placeholder="ejemplo@correo.com"
                  className={cn(
                    "w-full pl-14 pr-6 py-3 rounded-2xl bg-background border border-border focus:border-primary/50 focus:editorial-shadow outline-none transition-all placeholder:text-muted-foreground/30 text-sm",
                    (mode === "login" ? loginForm.formState.errors.email : registerForm.formState.errors.email) && "border-destructive/50"
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                <input
                  {...(mode === "login" ? loginForm.register("password") : registerForm.register("password"))}
                  type="password"
                  placeholder="••••••••"
                  className={cn(
                    "w-full pl-14 pr-6 py-3 rounded-2xl bg-background border border-border focus:border-primary/50 focus:editorial-shadow outline-none transition-all placeholder:text-muted-foreground/30 text-sm",
                    (mode === "login" ? loginForm.formState.errors.password : registerForm.formState.errors.password) && "border-destructive/50"
                  )}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-primary text-white py-4 rounded-full font-bold text-[10px] uppercase tracking-widest hover:editorial-shadow active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <LoaderCircle className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {mode === "login" ? "Entrar a mi cuenta" : "Empezar ahora"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
              {mode === "login" ? "¿Aún no tienes cuenta?" : "¿Ya tienes una cuenta?"}{" "}
              <button
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="text-primary ml-2 hover:underline cursor-pointer"
              >
                {mode === "login" ? "Regístrate" : "Inicia sesión"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

