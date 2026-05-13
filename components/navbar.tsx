"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase"
import { LogOut } from "lucide-react"

type NavbarProps = {
  variant?: "transparent" | "solid"
  onStartClick?: () => void 
  onLoginClick?: () => void
}

export function Navbar({ variant = "solid", onStartClick, onLoginClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error("Error checking auth:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription?.unsubscribe()
  }, [supabase])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuario"

  const isActive = (path: string) => {
    if (path === "/#descubrir") return pathname === "/"
    return pathname === path
  }

  const linkStyles = (path: string) => cn(
    "text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 relative py-2",
    isActive(path) 
      ? "text-primary" 
      : "text-muted-foreground hover:text-foreground"
  )

  const activeLine = (path: string) => isActive(path) && (
    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-500" />
  )

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: variant === "transparent"
          ? "transparent"
          : "rgba(246, 243, 239, 0.8)",
        backdropFilter: variant === "solid" ? "blur(12px)" : undefined,
        borderBottom: variant === "solid" ? "1px solid var(--border)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif text-3xl font-light italic text-foreground group-hover:text-primary transition-colors tracking-tight">
            Lumina
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-all duration-500" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/#descubrir" className={linkStyles("/#descubrir")}>
            Descubrir
            {activeLine("/#descubrir")}
          </Link>
          <Link href="/movies" className={linkStyles("/movies")}>
            Películas
            {activeLine("/movies")}
          </Link>
          <Link href="/books" className={linkStyles("/books")}>
            Libros
            {activeLine("/books")}
          </Link>
          {!isLoading && user && (
            <Link href="/history" className={linkStyles("/history")}>
              Historial
              {activeLine("/history")}
            </Link>
          )}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-6">
          {!isLoading && user ? (
            <>
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {userName}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-7 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-white transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                style={{
                  background: "var(--primary)"
                }}
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onLoginClick}
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Log in
              </button>
              <button
                onClick={onStartClick}
                className="px-7 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-white transition-all hover:scale-[1.02] hover:editorial-shadow active:scale-[0.98] cursor-pointer"
                style={{
                  background: "var(--primary)"
                }}
              >
                Comenzar
              </button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border px-8 py-10 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-500">
          <Link 
            href="/#descubrir" 
            className={cn("text-xl font-serif", isActive("/#descubrir") && "text-primary")} 
            onClick={() => setMenuOpen(false)}
          >
            Descubrir
          </Link>
          <Link 
            href="/movies" 
            className={cn("text-xl font-serif", isActive("/movies") && "text-primary")} 
            onClick={() => setMenuOpen(false)}
          >
            Películas
          </Link>
          <Link 
            href="/books" 
            className={cn("text-xl font-serif", isActive("/books") && "text-primary")} 
            onClick={() => setMenuOpen(false)}
          >
            Libros
          </Link>
          {!isLoading && user && (
            <Link 
              href="/history" 
              className={cn("text-xl font-serif", isActive("/history") && "text-primary")} 
              onClick={() => setMenuOpen(false)}
            >
              Historial
            </Link>
          )}
          <div className="pt-4 flex flex-col gap-4">
            {!isLoading && user ? (
              <>
                <div className="px-5 py-4 text-muted-foreground text-sm font-semibold">
                  {userName}
                </div>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false) }}
                  className="w-full px-5 py-4 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { onLoginClick?.(); setMenuOpen(false) }}
                  className="w-full px-5 py-4 rounded-full text-muted-foreground text-sm font-semibold border border-border"
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => { onStartClick?.(); setMenuOpen(false) }}
                  className="w-full px-5 py-4 rounded-full bg-primary text-white text-sm font-bold"
                >
                  Comenzar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
