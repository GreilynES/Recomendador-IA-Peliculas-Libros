"use client"

import Image from "next/image"

type LandingPageProps = {
  onStart: () => void
  onExample: () => void
}

export function LandingPage({ onStart, onExample }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="pt-32 pb-20 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 gap-16 items-center min-h-[calc(100vh-8rem)]">
          {/* Left */}
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--beige)] border border-[var(--border)] w-fit">
              <span className="w-2 h-2 rounded-full bg-[var(--teal)]" />
              <span className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-widest">
                Recomendaciones con IA
              </span>
            </div>

            <h1 className="font-serif text-6xl font-bold leading-tight text-[var(--foreground)] text-balance">
              Descubre tu próxima historia{" "}
              <span className="text-[var(--teal)] italic">favorita</span>
            </h1>

            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed max-w-md">
              Lumina analiza tus gustos, estado de ánimo y preferencias para recomendarte
              películas y libros que realmente disfrutarás. Personalizado, inteligente y
              siempre relevante.
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={onStart}
                className="group px-8 py-4 rounded-full bg-[var(--teal)] text-[var(--primary-foreground)] font-medium text-base hover:bg-[var(--teal-dark)] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                Comenzar
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button
                onClick={onExample}
                className="px-8 py-4 rounded-full border border-[var(--border)] text-[var(--foreground)] font-medium text-base hover:bg-[var(--beige)] transition-all duration-200 cursor-pointer"
              >
                Ver ejemplo
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 pt-4 border-t border-[var(--border)]">
              <div className="flex -space-x-2">
                {["#2F7C7A", "#C98663", "#7a7068", "#2F2F33"].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[var(--cream)] flex items-center justify-center text-xs text-white font-medium"
                    style={{ backgroundColor: color }}
                  >
                    {["A", "B", "C", "D"][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">
                <span className="font-semibold text-[var(--foreground)]">+2,400</span> lectores y
                cinéfilos ya lo usan
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/hero-collage.jpg"
                alt="Colección de libros y películas"
                fill
                className="object-cover"
                priority
              />
              {/* Floating card 1 */}
              <div className="absolute bottom-8 left-6 bg-[var(--warm-white)]/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl flex items-center gap-3 max-w-52">
                <div className="w-10 h-10 rounded-xl bg-[var(--teal)] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--foreground)]">Recomendación perfecta</p>
                  <p className="text-xs text-[var(--muted-foreground)]">98% de coincidencia</p>
                </div>
              </div>
              {/* Floating card 2 */}
              <div className="absolute top-8 right-6 bg-[var(--warm-white)]/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                <p className="text-xs font-semibold text-[var(--foreground)] mb-1">Tu próxima lectura</p>
                <p className="text-xs text-[var(--teal)] font-medium">El nombre del viento</p>
                <p className="text-xs text-[var(--muted-foreground)]">Fantasía · Patrick Rothfuss</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-24 bg-[var(--beige)]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-[var(--terracotta)] font-medium mb-4">El proceso</p>
            <h2 className="font-serif text-4xl font-bold text-[var(--foreground)] text-balance">
              Tres pasos hacia tu próxima historia
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Cuéntanos tus gustos",
                desc: "Selecciona géneros, actores, autores y el estado de ánimo con el que quieres comenzar.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "La IA los analiza",
                desc: "Nuestro motor inteligente cruza tus preferencias con miles de títulos y te genera un perfil único.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Recibe tu lista",
                desc: "Explora recomendaciones personalizadas de películas y libros, con el motivo exacto por el que te las sugerimos.",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="bg-[var(--warm-white)] rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--teal)]/10 flex items-center justify-center text-[var(--teal)]">
                    {item.icon}
                  </div>
                  <span className="font-serif text-4xl font-bold text-[var(--border)]">{item.step}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-3">{item.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 max-w-7xl mx-auto px-8">
        <div className="bg-[var(--teal)] rounded-3xl p-16 flex flex-col items-center text-center gap-6">
          <p className="text-xs uppercase tracking-widest text-[var(--primary-foreground)]/70 font-medium">Empieza hoy</p>
          <h2 className="font-serif text-4xl font-bold text-[var(--primary-foreground)] max-w-lg text-balance">
            Tu próxima historia favorita está a un clic de distancia
          </h2>
          <p className="text-[var(--primary-foreground)]/80 max-w-md leading-relaxed">
            Deja de perder tiempo buscando. Lumina lo hace por ti con inteligencia artificial.
          </p>
          <button
            onClick={onStart}
            className="mt-2 px-8 py-4 rounded-full bg-[var(--warm-white)] text-[var(--teal)] font-semibold hover:bg-[var(--cream)] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            Comenzar ahora — es gratis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-10 max-w-7xl mx-auto px-8 flex justify-between items-center">
        <span className="font-serif text-xl font-bold text-[var(--teal)]">Lumina</span>
        <p className="text-sm text-[var(--muted-foreground)]">© 2026 Lumina. Todos los derechos reservados.</p>
      </footer>
    </main>
  )
}
