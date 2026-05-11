"use client"

import { useState } from "react"
import Link from "next/link"

type NavbarProps = {
  variant?: "transparent" | "solid"
  onStartClick?: () => void 
  onLoginClick?: () => void
}

export function Navbar({ variant = "solid", onStartClick, onLoginClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: variant === "transparent"
          ? "transparent"
          : "rgba(13,10,7,0.85)",
        backdropFilter: variant === "solid" ? "blur(20px)" : undefined,
        borderBottom: variant === "solid" ? "1px solid rgba(199,162,124,0.1)" : undefined,
      }}
    >
      <div className="max-w-7xl mx-auto px-20 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif text-2xl font-bold italic text-[#C7A27C] group-hover:text-[#F3E8D7] transition-colors">
            Lumina
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C7A27C]/60" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {["Cómo funciona", "Películas", "Libros"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-xs font-semibold tracking-widest uppercase text-[#BBA892] hover:text-[#F3E8D7] transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onLoginClick}
            className="text-sm font-medium text-[#BBA892] hover:text-[#F3E8D7] transition-colors cursor-pointer"
          >
            Iniciar sesión
          </button>
          <button
            onClick={onStartClick}
            className="px-5 py-2.5 rounded-full text-sm font-bold text-[#0D0A07] transition-all hover:-translate-y-0.5 cursor-pointer"
            style={{
              background: "#C7A27C"
            }}
          >
            Comenzar
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#BBA892]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--cream)] border-t border-[var(--border)] px-8 py-6 flex flex-col gap-4">
          <Link href="#como-funciona" className="text-sm text-[var(--foreground)]" onClick={() => setMenuOpen(false)}>
            Cómo funciona
          </Link>
          <Link href="#generos" className="text-sm text-[var(--foreground)]" onClick={() => setMenuOpen(false)}>
            Géneros
          </Link>
          <Link href="#favoritos" className="text-sm text-[var(--foreground)]" onClick={() => setMenuOpen(false)}>
            Favoritos
          </Link>
          <button
            onClick={() => { onLoginClick?.(); setMenuOpen(false) }}
            className="mt-2 w-full px-5 py-2.5 rounded-full text-[var(--muted-foreground)] text-sm font-medium border border-[var(--border)]"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => { onStartClick?.(); setMenuOpen(false) }}
            className="w-full px-5 py-2.5 rounded-full bg-[var(--teal)] text-[var(--primary-foreground)] text-sm font-medium"
          >
            Comenzar
          </button>
        </div>
      )}
    </header>
  )
}