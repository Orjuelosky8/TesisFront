import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const Dot = (props: IconProps) => (
  <svg viewBox="0 0 12 12" aria-hidden="true" {...props}>
    <circle cx="6" cy="6" r="6" fill="currentColor" />
  </svg>
);

const Check = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M9.55 17.05 4.5 12l1.4-1.4 3.65 3.65 8.55-8.55 1.4 1.4-9.95 10z" />
  </svg>
);

const Alert = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v2h2v-2zm0-6h-2v5h2v-5z" />
  </svg>
);

const Search = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20l-6-6zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

type PillColor = "red" | "blue" | "purple" | "orange" | "yellow" | "indigo" | "emerald";

type PillProps = {
  children: React.ReactNode;
  color?: PillColor;
};

function Pill({ children, color = "red" }: PillProps) {
  const variants: Record<PillColor, string> = {
    red: "bg-rose-100 text-rose-700",
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    orange: "bg-orange-100 text-orange-700",
    yellow: "bg-yellow-100 text-yellow-700",
    indigo: "bg-indigo-100 text-indigo-700",
    emerald: "bg-emerald-100 text-emerald-700",
  };

  return (
    <span className={`inline-flex items-center rounded px-2.5 py-1 text-xs font-medium ${variants[color]}`}>
      {children}
    </span>
  );
}

function FlagRow({
  tone,
  label,
  tag,
}: {
  tone: "danger" | "warn" | "ok" | "info" | "note";
  label: string;
  tag?: React.ReactNode;
}) {
  const map: Record<string, string> = {
    danger: "bg-rose-50 border-l-4 border-rose-500 text-rose-800",
    warn: "bg-amber-50 border-l-4 border-amber-500 text-amber-800",
    ok: "bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800",
    info: "bg-blue-50 border-l-4 border-blue-500 text-blue-800",
    note: "bg-indigo-50 border-l-4 border-indigo-500 text-indigo-800",
  };
  return (
    <div className={`flex items-center justify-between rounded-md px-4 py-3 ${map[tone]}`}>
      <p className="text-sm font-medium">{label}</p>
      {tag}
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-slate-50 text-slate-900 overflow-x-hidden">
  {/* HERO (full-bleed) */}
  <header className="relative w-full isolate overflow-hidden bg-gradient-to-br from-indigo-900 to-blue-600">
    {/* Decorativos que se salen del contenedor sin provocar scroll */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-24 top-1/3 h-64 w-64 translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl sm:h-80 sm:w-80"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-20 -top-16 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl sm:h-96 sm:w-96"
    />

    {/* Contenido centrado */}
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 py-12 md:grid-cols-2 md:py-20 lg:py-28">
        {/* Left */}
        <div className="space-y-6">
          <Badge>IA analizando en tiempo real</Badge>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Transparencia y Control Inteligente en{" "}
            <span className="text-blue-200">Contratación Pública</span>
          </h1>
          <p className="max-w-xl text-lg text-blue-100">
            Consulta una licitación, la IA detecta red flags y puedes hacer preguntas con respuestas verificables.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#busqueda"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-indigo-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
            >
              <Search className="h-4 w-4" />
              <span className="font-semibold">Buscar licitaciones</span>
            </a>
            <a
              href="#red-flags"
              className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-3 font-semibold text-white shadow-sm hover:bg-rose-500"
            >
              <Alert className="h-4 w-4" />
              Detectar red flags
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-lg border border-white/60 px-4 py-3 font-semibold text-white hover:bg-white/10"
            >
              Ver demo en vivo
            </a>
          </div>
          <p className="text-xs text-blue-200/80">
            Las alertas son indicativas, no determinan responsabilidad.
          </p>
        </div>

        {/* Right: Analysis Card */}
        <div className="rounded-xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Análisis de Irregularidades</h3>
            <div className="flex items-center gap-2">
              <Dot className="h-3 w-3 text-rose-600/80" />
              <Pill color="red">Sospechoso</Pill>
            </div>
          </div>

          <div className="space-y-3">
            <FlagRow
              tone="danger"
              label="Plazos sospechosos: Viernes → Lunes"
              tag={<Pill color="red">Crítico</Pill>}
            />
            <FlagRow
              tone="danger"
              label="Pliegos restrictivos detectados"
              tag={<Pill color="purple">IA detecta</Pill>}
            />
            <FlagRow
              tone="ok"
              label="Red de contactos: Normal"
              tag={<Pill color="emerald">OK</Pill>}
            />
          </div>

          <div className="mt-6 rounded-lg bg-gradient-to-r from-rose-600 to-rose-700 px-4 py-4 text-center text-white">
            <p className="text-base font-bold">⚠️ 2 Red Flags Activas</p>
            <p className="text-sm/6 opacity-90">Requiere investigación adicional</p>
          </div>

          <a
            href="#alerta"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500"
          >
            <Alert className="h-4 w-4" />
            Sistema de Alerta
          </a>
        </div>
      </div>
    </div>

    {/* Degradado inferior para transición suave al fondo gris */}
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-slate-50"
    />
  </header>

  {/* CÓMO FUNCIONA */}
  <section id="como-funciona" className="py-16 sm:py-20">
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Cómo Funciona</h2>
        <p className="mt-3 text-slate-600">
          Proceso inteligente de análisis de licitaciones públicas en tres pasos simples
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-700 text-white">
            <Search className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">1. Selecciona la licitación</h3>
          <p className="mt-2 text-sm text-slate-600">
            Ingresa el número de proceso o palabra clave y elige la licitación que quieres analizar.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-600 text-white">
            <Alert className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">2. IA detecta red flags</h3>
          <p className="mt-2 text-sm text-slate-600">
            Reglas de red flags + análisis semántico y de redes para estimar un score de riesgo explicable.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white">
            <Check className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">3. Preguntas y respuestas (RAG)</h3>
          <p className="mt-2 text-sm text-slate-600">
            Haz preguntas en lenguaje natural y obtén respuestas con enlaces a documentos fuente.
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* RED FLAGS / DETECCIÓN */}
  <section id="red-flags" className="bg-slate-50 py-16 sm:py-20">
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-3xl text-center">
        <Pill color="red">Sistema de Detección Inteligente</Pill>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Red Flags: Detección Automática de Irregularidades
        </h2>
        <p className="mt-3 text-slate-600">
          Nuestro sistema activa alertas instantáneas cuando detecta patrones sospechosos. Una sola red flag
          activada marca el proceso como sospechoso.
        </p>
      </header>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-xl font-bold">Red Flags Monitoreadas</h3>
          <div className="mt-5 space-y-3">
            <FlagRow tone="danger" label="Plazos sospechosos" tag={<Pill color="red">Viernes-Lunes</Pill>} />
            <FlagRow tone="warn" label="Precios vs Pliegos" tag={<Pill color="orange">Comparación IA</Pill>} />
            <FlagRow tone="note" label="Pliegos restrictivos" tag={<Pill color="purple">IA detecta</Pill>} />
            <FlagRow tone="info" label="Red de contactos" tag={<Pill color="blue">Conexiones</Pill>} />
            <FlagRow tone="warn" label="Exceso de prórrogas" tag={<Pill color="yellow">Cantidad</Pill>} />
            <FlagRow tone="note" label="Estudio sin justificación" tag={<Pill color="indigo">Técnica</Pill>} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-rose-600 to-rose-700 p-6 text-white shadow-sm ring-1 ring-rose-500/20">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
                <Alert className="h-10 w-10" />
              </div>
              <h3 className="mt-2 text-2xl font-bold">Sistema de Alerta Binario</h3>
              <p className="text-blue-50">Una red flag activada = Proceso sospechoso</p>
              <div className="mt-4 w-full rounded-lg bg-white/15 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Estado Normal</span>
                  <Dot className="h-3 w-3 text-emerald-400" />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm">Red Flag Detectada</span>
                  <Dot className="h-3 w-3 text-rose-200" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 text-center text-sm text-slate-600 shadow-sm ring-1 ring-slate-200">
            <strong>¿Cómo funciona la detección?</strong> Ingresa el proceso, la IA analiza y notifica si encuentra
            irregularidades.
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* RED DE CONTACTOS */}
  <section id="red-contactos" className="py-16 sm:py-20">
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Red de Contactos: ¿Quiénes están involucrados?
          </h2>
          <p className="mt-3 text-slate-600">
            Nuestra búsqueda semántica conecta información para construir una red de contactos y entender relaciones
            relevantes (representantes legales, socios, repetición de oferentes, vínculos, etc.).
          </p>

          <ul className="mt-6 space-y-4">
            <li className="flex gap-3">
              <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-700 text-white">
                <Search className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold">Búsqueda por persona, empresa o NIT</p>
                <p className="text-sm text-slate-600">Encuentra conexiones específicas.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-700 text-white">
                <Dot className="h-3 w-3" />
              </span>
              <div>
                <p className="font-semibold">Roles y vínculos</p>
                <p className="text-sm text-slate-600">Societarios, participación conjunta, historial.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-700 text-white">
                <Check className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold">Filtros avanzados</p>
                <p className="text-sm text-slate-600">Por entidad, sector y período.</p>
              </div>
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#explorar" className="rounded-lg bg-indigo-700 px-4 py-2.5 font-semibold text-white hover:bg-indigo-600">
              Explorar red
            </a>
            <a
              href="#busqueda"
              className="rounded-lg border border-indigo-700 px-4 py-2.5 font-semibold text-indigo-700 hover:bg-indigo-50"
            >
              Buscar persona/empresa
            </a>
          </div>
        </div>

        {/* Simple network placeholder (SVG) */}
        <div className="rounded-xl bg-slate-100 p-6 ring-1 ring-slate-200">
          <svg viewBox="0 0 600 360" className="h-72 w-full">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e40af" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.35" />
              </linearGradient>
            </defs>
            {/* Links */}
            <g stroke="url(#g)" strokeWidth="2">
              <line x1="300" y1="180" x2="200" y2="110" />
              <line x1="300" y1="180" x2="400" y2="110" />
              <line x1="300" y1="180" x2="180" y2="220" />
              <line x1="300" y1="180" x2="420" y2="220" />
              <line x1="200" y1="110" x2="160" y2="180" />
              <line x1="400" y1="110" x2="440" y2="180" />
            </g>
            {/* Nodes */}
            <g fill="#1e40af">
              <circle cx="300" cy="180" r="18" fill="#1e40af" />
              <circle cx="200" cy="110" r="12" fill="#3b82f6" />
              <circle cx="400" cy="110" r="12" fill="#3b82f6" />
              <circle cx="180" cy="220" r="10" fill="#64748b" />
              <circle cx="420" cy="220" r="10" fill="#64748b" />
              <circle cx="160" cy="180" r="8" fill="#94a3b8" />
              <circle cx="440" cy="180" r="8" fill="#94a3b8" />
            </g>
          </svg>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-600 sm:grid-cols-3">
            <div className="rounded-md bg-white px-3 py-2 ring-1 ring-slate-200">Conexiones: 8</div>
            <div className="rounded-md bg-white px-3 py-2 ring-1 ring-slate-200">Entidades: 12</div>
            <div className="col-span-2 rounded-md bg-white px-3 py-2 ring-1 ring-slate-200 sm:col-span-1">
              Actualizado: ahora
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* QUÉ ES */}
  <section id="que-es" className="bg-white py-16 sm:py-20">
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">¿Qué es SECOP AI?</h2>
          <p className="mt-3 text-slate-600">
            Plataforma que consume datos públicos de contratación (SECOP I/II y fuentes relacionadas) y los
            enriquece con IA (OCR/PLN, embeddings, análisis de redes y reglas de red flags) para facilitar el control
            ciudadano y la transparencia.
          </p>

          <ul className="mt-6 space-y-4">
            <li className="flex gap-3">
              <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-700 text-white">
                <Check className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold">Datos públicos enriquecidos</p>
                <p className="text-sm text-slate-600">Procesamiento inteligente de información oficial.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-700 text-white">
                <Check className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold">IA explicable y trazable</p>
                <p className="text-sm text-slate-600">Cada alerta incluye explicación y enlaces a fuentes.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-700 text-white">
                <Check className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold">Análisis de redes</p>
                <p className="text-sm text-slate-600">Mapeo de relaciones entre actores del ecosistema.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="rounded-xl bg-slate-100 p-6 text-center text-xs text-slate-500 ring-1 ring-slate-200">
          <img
            src="https://hospitaldeyumbo.gov.co/wp-content/uploads/2023/11/galeria1058.png"
            alt=""
            className="mx-auto aspect-video w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  </section>

  {/* BENEFICIOS */}
  <section id="beneficios" className="bg-slate-50 py-16 sm:py-20">
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Beneficios del Sistema</h2>
        <p className="mt-3 text-slate-600">
          Herramientas para periodistas, veedurías ciudadanas y entes de control.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Ahorro de tiempo", text: "Encuentra información en segundos, no en horas." },
          { title: "Mayor transparencia", text: "Acceso fácil a datos de contratación pública." },
          { title: "Control ciudadano", text: "Herramientas para seguimiento y control." },
          { title: "Análisis avanzado", text: "Insights y tendencias en contratación." },
          { title: "IA explicable", text: "Alertas con contexto y trazabilidad." },
          { title: "Red de actores", text: "Mapas de relación entre participantes." },
        ].map((b) => (
          <div key={b.title} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-700 text-white">
              <Dot className="h-3 w-3" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{b.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* CTA FINAL */}
  <section id="demo" className="bg-white py-12 sm:py-16">
    <div
      className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="flex items-center justify-between rounded-2xl p-8 text-white"
           style={{ background: "var(--brand, #4338ca)" }}>
        <div>
          <div className="text-lg font-semibold">¿Listo para empezar?</div>
          <div className="text-sm opacity-90">Crea tu cuenta y prueba el flujo con tus documentos.</div>
        </div>
        <Button className="bg-white text-indigo-900 hover:bg-slate-50">Crear cuenta</Button>
      </div>
    </div>
  </section>
</main>

  );
}