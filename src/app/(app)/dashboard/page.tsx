"use client";

import Sidebar from "@/components/layout/Sidebar";
import {
  Search,
  MessageSquare,
  PlayCircle,
  Users,
  AlertTriangle,
  ShieldCheck,
  Building2,
  Clock4,
  ChevronRight,
  Sparkles,
  Eye,
} from "lucide-react";

import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="grid md:grid-cols-[16rem,1fr] gap-6">
      {/* Lateral */}
      <Sidebar />

      {/* Main */}
      <main className="space-y-8 px-4 pb-10 sm:px-6">
        {/* Topbar inline (opcional) */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-8 place-items-center rounded-lg bg-indigo-600 text-white">
              <Search className="size-4" />
            </div>
            <p className="text-xl font-bold">SECOP AI</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="relative grid size-9 place-items-center rounded-lg border border-slate-200 bg-white transition hover:shadow-sm"
              title="Notificaciones"
            >
              <AlertTriangle className="size-4 text-slate-500" />
              <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
                3
              </span>
            </button>

            <div className="flex items-center gap-3">
              {/* <Image
                src="https://placehold.co/32x32"
                width={32}
                height={32}
                alt="Avatar"
                className="rounded-full"
              /> */}
              <span className="hidden text-sm font-medium text-slate-700 sm:block">
                María González
              </span>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-700 to-blue-500 p-6 sm:p-8 text-white">
          {/* decor */}
          <div className="pointer-events-none absolute -left-10 -top-10 size-32 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 -bottom-16 size-48 rounded-full bg-blue-300/20 blur-3xl" />

          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/20 backdrop-blur">
              <Sparkles className="size-3.5" />
              IA analizando en tiempo real
            </div>

            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Hola, María <span className="inline-block">👋</span>
            </h1>
            <p className="text-blue-100">
              Continúa donde ibas o inicia un nuevo análisis. La IA te ayuda a
              detectar <em>red flags</em> y conversar con los documentos.
            </p>

            <div className="flex flex-wrap gap-3">
              <button className="group inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm ring-1 ring-white/40 transition hover:translate-y-[-1px] hover:shadow-md active:translate-y-0">
                <Search className="size-4" />
                Buscar licitaciones
              </button>
              <button className="group inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/15 hover:translate-y-[-1px] active:translate-y-0">
                <MessageSquare className="size-4" />
                Abrir Chat
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Escribe 'vías Antioquia 2023' o pega el N° de proceso…"
                className="w-full rounded-xl border-0 bg-white/95 px-10 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-white/70"
              />
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 text-xs">
              <Pill>📄 Licitaciones analizadas: 47</Pill>
              <Pill>🚨 Alertas detectadas: 12</Pill>
              <Pill>🎯 Precisión estimada: 94%</Pill>
            </div>
          </div>
        </section>

        {/* Acciones rápidas */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Acciones rápidas</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction
              icon={<Search className="size-5 text-indigo-600" />}
              badgeClass="bg-indigo-50"
              title="Búsqueda Semántica"
              desc="Encuentra procesos por contexto y significado"
            />
            <QuickAction
              icon={<AlertTriangle className="size-5 text-rose-600" />}
              badgeClass="bg-rose-50"
              title="Panel de Red Flags"
              desc="Alertas recientes por tipo de riesgo"
            />
            <QuickAction
              icon={<Users className="size-5 text-emerald-600" />}
              badgeClass="bg-emerald-50"
              title="Red de Contactos"
              desc="Grafo resumido de actores clave"
            />
            <QuickAction
              icon={<PlayCircle className="size-5 text-purple-600" />}
              badgeClass="bg-purple-50"
              title="Ver Demo"
              desc="Aprende cómo funciona la plataforma"
            />
          </div>
        </section>

        {/* Cuerpo principal */}
        <section className="grid gap-6 xl:grid-cols-3">
        {/* Columna izquierda (ocupa 2 columnas en xl+) */}
        <div className="space-y-6 xl:col-span-2">
            {/* Historial */}
            <Card>
            <CardHeader
                title="Historial de análisis"
                right={
                <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-1">
                    <button className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm">
                    <CardsDot />
                    Cards
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-white">
                    <TableIcon />
                    Tabla
                    </button>
                </div>
                }
            />

            {/* De lista vertical -> grilla responsive 1 / 2 / 2 */}
            <div className="p-5">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <AnalysisCard
                    code="SECOP-23-001847"
                    status={{ label: "Activo", tone: "success" }}
                    risk={{ label: "Riesgo Medio", dot: "warning" }}
                    iconTint="bg-blue-100 text-blue-600"
                    entity="Ministerio de Transporte"
                    title="Construcción y mejoramiento de vías secundarias departamento de Antioquia"
                    published="15 Mar 2024"
                    close="28 Mar 2024"
                    amount="$2.8B COP"
                    chips={["Plazos cortos", "Único oferente"]}
                />
                <AnalysisCard
                    code="SECOP-23-001823"
                    status={{ label: "En evaluación", tone: "info" }}
                    risk={{ label: "Riesgo Bajo", dot: "success" }}
                    iconTint="bg-emerald-100 text-emerald-600"
                    entity="Ministerio de Educación"
                    title="Suministro de material educativo para instituciones rurales"
                    published="12 Mar 2024"
                    close="30 Mar 2024"
                    amount="$850M COP"
                    chips={["Sin alertas"]}
                />
                </div>
            </div>
            </Card>

            {/* Insights y Tendencias */}
            <Card>
            <CardHeader title="Insights y Tendencias" />
            <div className="grid gap-6 p-5 sm:grid-cols-2">
                {/* Top sectores */}
                <div>
                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                    Top sectores con más actividad
                </h4>
                <div className="space-y-3">
                    <Progress label="Educación" value={60} barClass="bg-blue-500" />
                    <Progress label="Infraestructura" value={80} barClass="bg-indigo-600" />
                    <Progress label="Salud" value={40} barClass="bg-emerald-500" />
                </div>
                </div>

                {/* Entidades con más red flags */}
                <div>
                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                    Entidades con más red flags
                </h4>
                <div className="space-y-2">
                    <FlagRow name="MinTransporte" tone="danger" count={8} />
                    <FlagRow name="MinVivienda" tone="warning" count={5} />
                    <FlagRow name="MinEducación" tone="warning" count={3} />
                </div>
                </div>

                <div className="sm:col-span-2 border-t pt-3 text-xs text-slate-500">
                <span className="align-middle">ℹ️</span> Indicadores informativos; requieren verificación humana.
                </div>
            </div>
            </Card>
        </div>

        {/* Columna derecha (sidebar interna) */}
        <div className="space-y-6">
            {/* Alertas recientes */}
            <Card>
            <CardHeader title="Alertas recientes" />

            {/* De lista vertical -> grilla responsive 1 / 2 */}
            <div className="p-5">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <AlertBlock
                    color="rose"
                    title="Plazos atípicos"
                    meta="SECOP-23-001847 • MinTransporte"
                    since="2 días"
                />
                <AlertBlock
                    color="amber"
                    title="Único oferente"
                    meta="SECOP-23-001831 • MinVivienda"
                    since="3 días"
                />
                </div>

                <div className="border-t pt-4 mt-4">
                <p className="mb-2 text-sm font-medium text-slate-900">
                    Top 5 tipos de red flags (30 días)
                </p>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                    <MiniMeter label="Plazos cortos" value={75} barClass="bg-rose-400" />
                    <MiniMeter label="Único oferente" value={60} barClass="bg-amber-400" />
                </div>
                </div>
            </div>
            </Card>

            {/* Búsquedas guardadas */}
            <Card>
            <CardHeader title="Búsquedas guardadas" right={<LinkMini text="Gestionar" />} />
            <div className="space-y-4 p-5">
                <div className="flex flex-wrap gap-2 text-xs">
                <Chip className="bg-indigo-50 text-indigo-700">Entidad: MinTransporte</Chip>
                <Chip className="bg-indigo-50 text-indigo-700">Área: Infraestructura</Chip>
                <Chip className="bg-rose-50 text-rose-700">Riesgo: Alto</Chip>
                </div>

                <button className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:translate-y-[-1px] hover:shadow-md active:translate-y-0">
                Aplicar filtros guardados
                <ChevronRight className="size-4 opacity-80 transition group-hover:translate-x-0.5" />
                </button>
            </div>
            </Card>
        </div>
        </section>

        {/* Cómo funciona */}
        <section className="rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50 p-6 sm:p-8">
        <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-900">¿Cómo funciona SECOP AI?</h3>
            <p className="mt-1 text-sm text-slate-600">Detecta patrones en segundos y profundiza cuando lo necesites</p>
        </div>

        {/* Grilla más flexible: 1 / 2 / 3 */}
        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <HowStep index={1} title="Selecciona la licitación">
            Busca por palabras clave o número de proceso
            </HowStep>
            <HowStep index={2} title="IA detecta red flags">
            Algoritmos identifican señales de riesgo automáticamente
            </HowStep>
            <HowStep index={3} title="Pregunta y recibe respuestas">
            Chat inteligente con enlaces a fuentes oficiales
            </HowStep>
        </div>

        <div className="mt-6 text-center">
            <button className="text-sm font-medium text-indigo-600 hover:underline">
            Ver metodología completa
            </button>
        </div>
        </section>

      </main>
    </div>
  );
}

/* ---------- UI helpers (mismos estilos de la imagen) ---------- */

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg bg-white/20 px-3 py-1 text-xs ring-1 ring-white/25">
      {children}
    </span>
  );
}

function QuickAction({
  icon,
  badgeClass,
  title,
  desc,
}: {
  icon: React.ReactNode;
  badgeClass: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className={`grid size-12 place-items-center rounded-xl ${badgeClass}`}>
        {icon}
      </div>
      <div className="mt-4 space-y-1.5">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{desc}</p>
        <button className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 transition group-hover:gap-1.5">
          Abrir <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {children}
    </div>
  );
}
function CardHeader({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {right}
    </div>
  );
}

function CardsDot() {
  return (
    <span className="relative inline-block">
      <span className="mr-1 inline-block size-2 rounded-full bg-white" />
    </span>
  );
}
function TableIcon() {
  return (
    <span className="relative inline-block">
      <span className="mr-1 inline-block size-2 rounded-sm bg-slate-500" />
    </span>
  );
}

function Chip({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[12px] font-medium ${className}`}
    >
      {children}
    </span>
  );
}

function Progress({
  label,
  value,
  barClass,
}: {
  label: string;
  value: number;
  barClass: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-slate-700">{label}</span>
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="h-2 w-full rounded-full bg-slate-200">
          <div
            className={`h-2 rounded-full ${barClass}`}
            style={{ width: `${value}%` }}
          />
        </div>
        <span className="w-10 text-right text-sm font-semibold text-slate-900">
          {value}%
        </span>
      </div>
    </div>
  );
}

function FlagRow({
  name,
  tone,
  count,
}: {
  name: string;
  tone: "danger" | "warning";
  count: number;
}) {
  const toneClass =
    tone === "danger"
      ? "bg-rose-100 text-rose-800"
      : "bg-amber-100 text-amber-800";
  return (
    <div className="flex items-center justify-between rounded-lg">
      <span className="text-sm text-slate-700">{name}</span>
      <span className={`rounded-md px-2 py-1 text-xs font-medium ${toneClass}`}>
        {count} alertas
      </span>
    </div>
  );
}

function SideRow({
  code,
  entity,
  right,
}: {
  code: string;
  entity: string;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-3">
      <div className="flex items-center gap-3">
        <div className="grid size-8 place-items-center rounded-md bg-indigo-100 text-indigo-700">
          <Clock4 className="size-4" />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">{code}</div>
          <div className="text-xs text-slate-500">{entity}</div>
        </div>
      </div>
      {right}
    </div>
  );
}

function LinkMini({ text }: { text: string }) {
  return (
    <button className="text-sm font-medium text-indigo-600 hover:underline">
      {text}
    </button>
  );
}

function MiniMeter({
  label,
  value,
  barClass,
}: {
  label: string;
  value: number;
  barClass: string;
}) {
  return (
    <div className="mt-2 flex items-center justify-between gap-3">
      <span className="text-xs text-slate-600">{label}</span>
      <div className="h-1.5 w-40 rounded-full bg-slate-200">
        <div className={`h-1.5 rounded-full ${barClass}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function AlertBlock({
  color,
  title,
  meta,
  since,
}: {
  color: "rose" | "amber";
  title: string;
  meta: string;
  since: string;
}) {
  const leftBorder = color === "rose" ? "border-rose-400" : "border-amber-400";
  const titleColor = color === "rose" ? "text-rose-700" : "text-amber-700";
  return (
    <div className={`border-l-4 ${leftBorder} rounded-md bg-slate-50 px-4 py-3`}>
      <div className="flex items-start justify-between">
        <p className={`text-sm font-semibold ${titleColor}`}>{title}</p>
        <span className="text-xs text-slate-500">{since}</span>
      </div>
      <p className="mt-1 text-xs text-slate-600">{meta}</p>
      <button className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:underline">
        Ver razones
        <Eye className="size-3.5" />
      </button>
    </div>
  );
}

function HowStep({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mx-auto grid size-12 place-items-center rounded-xl bg-indigo-600 text-white">
        <span className="text-base font-bold">{index}</span>
      </div>
      <h4 className="mt-4 text-sm font-semibold text-slate-900">{title}</h4>
      <p className="mt-1 text-sm text-slate-600">{children}</p>
    </div>
  );
}

function AnalysisCard({
  code,
  status,
  risk,
  iconTint,
  entity,
  title,
  published,
  close,
  amount,
  chips,
}: {
  code: string;
  status: { label: string; tone: "success" | "info" };
  risk: { label: string; dot: "warning" | "success" };
  iconTint: string;
  entity: string;
  title: string;
  published: string;
  close: string;
  amount: string;
  chips: string[];
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300">
      {/* Header row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium">
            {code}
          </span>
          {status.tone === "success" ? (
            <span className="rounded-md bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">
              {status.label}
            </span>
          ) : (
            <span className="rounded-md bg-indigo-100 px-2 py-1 text-[11px] font-semibold text-indigo-800">
              {status.label}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span
            className={`inline-block size-2 rounded-full ${
              risk.dot === "warning" ? "bg-amber-400" : "bg-emerald-400"
            }`}
          />
          {risk.label}
        </div>
      </div>

      {/* Body */}
      <div className="mt-4 flex items-start gap-3">
        <div className={`grid size-8 place-items-center rounded-lg ${iconTint}`}>
          <Building2 className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">{entity}</p>
          <p className="truncate text-sm text-slate-600">{title}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-600">
        <span>Pub: {published}</span>
        <span>•</span>
        <span>Cierre: {close}</span>
        <span className="ml-auto font-medium">{amount}</span>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <span
              key={c}
              className={`rounded px-2 py-0.5 text-[11px] ${
                c === "Plazos cortos"
                  ? "bg-rose-50 text-rose-700"
                  : c === "Único oferente"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {c}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm">
          <ActionLink>Continuar</ActionLink>
          <ActionMuted>Vista previa</ActionMuted>
          <ActionMuted>Abrir en Chat</ActionMuted>
        </div>
      </div>
    </div>
  );
}

function ActionLink({ children }: { children: React.ReactNode }) {
  return (
    <button className="font-semibold text-indigo-600 hover:underline">
      {children}
    </button>
  );
}
function ActionMuted({ children }: { children: React.ReactNode }) {
  return <button className="text-slate-600 hover:underline">{children}</button>;
}
