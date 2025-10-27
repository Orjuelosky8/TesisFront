import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

export default function LandingPage() {
  return (
    <section className="space-y-16">
      {/* Hero */}
      <div className="grid lg:grid-cols-2 gap-8 items-center pt-6">
        <div className="space-y-4">
          <Badge>SECOP AI • Control Inteligente</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Encuentra y analiza licitaciones con IA en minutos
          </h1>
          <p className="text-slate-600">
            Búsqueda semántica, lectura de pliegos y extracción de requisitos con RAG.
            Integra tu flujo y acelera decisiones.
          </p>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-[var(--brand)] text-white hover:opacity-90"
            >
              Comenzar
            </Link>
            <a href="#como-funciona" className="px-3 py-2 rounded-md border">Ver cómo funciona</a>
          </div>
        </div>
        {/* Ilustración / mock */}
        <div className="rounded-xl border bg-white h-[260px] md:h-[360px] lg:h-[420px] shadow-sm" />
      </div>

      {/* Cómo funciona */}
      <div id="como-funciona" className="space-y-8">
        <h2 className="text-2xl font-bold">Cómo funciona</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Carga/Conecta", d: "Conecta SECOP II o carga pliegos PDF/ZIP." },
            { t: "Indexación RAG", d: "Chunking + embeddings + metadata inteligente." },
            { t: "Consulta", d: "Pregunta en lenguaje natural y obtén respuestas citadas." },
          ].map((x) => (
            <div key={x.t} className="rounded-xl border bg-white p-5">
              <div className="font-semibold">{x.t}</div>
              <div className="text-sm text-slate-600">{x.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Beneficios */}
      <div id="beneficios" className="space-y-8">
        <h2 className="text-2xl font-bold">Beneficios</h2>
        <ul className="grid md:grid-cols-3 gap-6">
          {["Ahorro de tiempo", "Menos errores", "Hallazgos accionables"].map((b) => (
            <li key={b} className="rounded-xl border bg-white p-5">{b}</li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-[var(--brand)] text-white p-8 flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">¿Listo para empezar?</div>
          <div className="text-sm opacity-90">Crea tu cuenta y prueba el flujo con tus documentos.</div>
        </div>
        <Button className="bg-white text-[var(--brand)]">Crear cuenta</Button>
      </div>
    </section>
  );
}
