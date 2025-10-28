"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import {
  Search,
  Plus,
  Link2,
  Filter,
  LayoutGrid,
  List as ListIcon,
  ChevronDown,
  MessageSquare,
  CalendarDays,
  CircleDollarSign,
} from "lucide-react";
import { Tender } from "@/types/tender";
import { inRange, normalize } from "@/lib/format";

type Props = { initialTenders: Tender[] };

const PAGE_SIZE = 10;

export default function SelectionClient({ initialTenders }: Props) {
  // ---------------- state base ----------------
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set<string>()
  );
  const [layout, setLayout] = useState<"list" | "grid">("list");

  // search
  const [query, setQuery] = useState("");
  const [processId, setProcessId] = useState("");

  // filtros
  const [statusSet, setStatusSet] = useState<Set<string>>(new Set());
  const [modalitySet, setModalitySet] = useState<Set<string>>(new Set());
  const [locationSet, setLocationSet] = useState<Set<string>>(new Set());
  const [econSet, setEconSet] = useState<Set<string>>(new Set());
  const [entitySet, setEntitySet] = useState<Set<string>>(new Set());
  const [entitySearch, setEntitySearch] = useState("");

  // cuantía
  const [amountRange, setAmountRange] = useState<[number, number]>(() => {
    const amounts = initialTenders.map((t) => t.amountCOP || 0).filter(Boolean);
    const min = amounts.length ? Math.min(...amounts) : 0;
    const max = amounts.length ? Math.max(...amounts) : 0;
    return [min, max];
  });
  const [amountCurrent, setAmountCurrent] = useState<[number, number]>([
    amountRange[0],
    amountRange[1],
  ]);

  // paginación
  const [page, setPage] = useState(1);

  const resultsCount = initialTenders.length;

  const toggle = (id: string) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  const clearSelection = () => setSelectedIds(new Set());

  // ---------------- opciones de filtros ----------------
  const options = useMemo(() => {
    const uniq = <K extends keyof Tender>(k: K) =>
      Array.from(new Set(initialTenders.map((t) => (t[k] || "") as string)))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b, "es"));
    const status = uniq("status");
    const modality = uniq("modality");
    const location = uniq("location");
    const econ = uniq("econActivity");
    const entities = uniq("entity");
    return { status, modality, location, econ, entities };
  }, [initialTenders]);

  // ---------------- filtro total ----------------
  const filtered = useMemo(() => {
    const q = normalize(query);
    const pid = normalize(processId);
    const entitySearchNorm = normalize(entitySearch);

    return initialTenders.filter((t) => {
      // búsqueda por objeto / keywords
      const byText = q ? normalize(t.search).includes(q) : true;
      // búsqueda por número de proceso exacto o parcial
      const byId = pid ? normalize(t.id).includes(pid) : true;

      // cuantía
      const byAmount = inRange(t.amountCOP, amountCurrent);

      // estado / modalidad / ubicación / actividad económica
      const byStatus =
        statusSet.size ? statusSet.has(String(t.status || "")) : true;
      const byModality =
        modalitySet.size ? modalitySet.has(String(t.modality || "")) : true;
      const byLocation =
        locationSet.size ? locationSet.has(String(t.location || "")) : true;
      const byEcon =
        econSet.size ? econSet.has(String(t.econActivity || "")) : true;

      // entidad con mini-buscador + checkboxes
      const byEntitySelected =
        entitySet.size ? entitySet.has(String(t.entity || "")) : true;
      const byEntitySearch = entitySearchNorm
        ? normalize(t.entity || "").includes(entitySearchNorm)
        : true;

      return (
        byText &&
        byId &&
        byAmount &&
        byStatus &&
        byModality &&
        byLocation &&
        byEcon &&
        byEntitySelected &&
        byEntitySearch
      );
    });
  }, [
    initialTenders,
    query,
    processId,
    amountCurrent,
    statusSet,
    modalitySet,
    locationSet,
    econSet,
    entitySet,
    entitySearch,
  ]);

  // reset de página al cambiar filtros
  // (no hace falta useEffect: basta con recalcular page al leer paginated)
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const gridCols =
    "grid gap-4 sm:gap-5 " + (layout === "grid" ? "md:grid-cols-2" : "");

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#EFF6FF_0%,#EEF2FF_50%,#FAF5FF_100%)]">
      <Sidebar />
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
        {/* HERO + SEARCH */}
        <section className="rounded-2xl border border-blue-100 bg-white/90 shadow-md backdrop-blur-sm">
          <div className="space-y-6 p-5 sm:p-6 lg:p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Selecciona licitaciones para analizar
              </h1>
              <p className="mt-1 text-sm text-slate-600 sm:text-base">
                Busca, filtra y selecciona licitaciones públicas para detectar red flags con IA
              </p>
            </div>

            {/* search row */}
            <div className="grid gap-3 md:grid-cols-[1fr,22rem]">
              {/* objeto / palabras clave */}
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 text-slate-400 sm:block" />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  className="w-full rounded-xl border-2 border-blue-200/70 bg-blue-50 px-4 py-3 pl-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-300 sm:pl-10"
                  placeholder="Buscar por objeto, palabras clave…"
                />
              </div>

              {/* N° proceso + acciones (decorativas por ahora) */}
              <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[10rem,auto] md:grid-cols-[12rem,8.5rem,1fr]">
                <input
                  value={processId}
                  onChange={(e) => {
                    setProcessId(e.target.value);
                    setPage(1);
                  }}
                  className="w-full rounded-xl border-2 border-blue-200/70 bg-blue-50 px-3 py-3 text-sm placeholder:text-slate-400 outline-none focus:border-blue-300"
                  placeholder="N° proceso"
                />
                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                  <Plus className="size-4" />
                  Agregar
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50">
                  <Link2 className="size-4" />
                  Importar enlace
                </button>
              </div>
            </div>

            {/* filtros */}
            <div className="flex flex-wrap items-center gap-2">
              <Popover label="Cuantía" icon={<Filter className="size-3.5 text-blue-500" />}>
                <div className="space-y-3">
                  <div className="text-sm text-slate-600">
                    Rango: <strong>{amountCurrent[0].toLocaleString("es-CO")}</strong> –{" "}
                    <strong>{amountCurrent[1].toLocaleString("es-CO")}</strong>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      className="rounded-md border px-2 py-1 text-sm"
                      value={amountCurrent[0]}
                      min={amountRange[0]}
                      max={amountCurrent[1]}
                      onChange={(e) =>
                        setAmountCurrent([Number(e.target.value), amountCurrent[1]])
                      }
                    />
                    <input
                      type="number"
                      className="rounded-md border px-2 py-1 text-sm"
                      value={amountCurrent[1]}
                      min={amountCurrent[0]}
                      max={amountRange[1]}
                      onChange={(e) =>
                        setAmountCurrent([amountCurrent[0], Number(e.target.value)])
                      }
                    />
                  </div>
                  <button
                    onClick={() => {
                      setAmountCurrent(amountRange);
                      setPage(1);
                    }}
                    className="text-xs text-blue-600"
                  >
                    Restablecer
                  </button>
                </div>
              </Popover>

              <MultiFilter label="Modalidad" options={options.modality} set={modalitySet} onChange={setModalitySet} />
              <MultiFilter label="Estado" options={options.status} set={statusSet} onChange={setStatusSet} />
              <MultiFilter label="Ubicación" options={options.location} set={locationSet} onChange={setLocationSet} />
              <MultiFilter label="Actividad" options={options.econ} set={econSet} onChange={setEconSet} />

              <Popover label="Entidad">
                <div className="space-y-3">
                  <input
                    value={entitySearch}
                    onChange={(e) => {
                      setEntitySearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Buscar entidad…"
                    className="w-full rounded-md border px-2 py-1 text-sm"
                  />
                  <div className="max-h-64 space-y-1 overflow-auto pr-1">
                    {options.entities
                      .filter((e) => normalize(e).includes(normalize(entitySearch)))
                      .map((opt) => (
                        <label key={opt} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={entitySet.has(opt)}
                            onChange={() => {
                              const n = new Set(entitySet);
                              n.has(opt) ? n.delete(opt) : n.add(opt);
                              setEntitySet(n);
                              setPage(1);
                            }}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                  </div>
                  {!!entitySet.size && (
                    <button
                      className="text-xs text-blue-600"
                      onClick={() => {
                        setEntitySet(new Set());
                        setEntitySearch("");
                        setPage(1);
                      }}
                    >
                      Limpiar entidades
                    </button>
                  )}
                </div>
              </Popover>

              {/* botón limpiar filtros */}
              <button
                onClick={() => {
                  setQuery("");
                  setProcessId("");
                  setStatusSet(new Set());
                  setModalitySet(new Set());
                  setLocationSet(new Set());
                  setEconSet(new Set());
                  setEntitySet(new Set());
                  setEntitySearch("");
                  setAmountCurrent(amountRange);
                  setPage(1);
                }}
                className="ml-1 text-sm font-medium text-blue-600 hover:underline"
              >
                Limpiar filtros
              </button>
            </div>

            {/* meta + order + layout */}
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div className="text-sm text-slate-700">
                <span className="font-medium">{filtered.length}</span> de {resultsCount} resultados
              </div>

              <div className="flex items-center gap-3">
                <div className="ml-2 grid grid-cols-2 overflow-hidden rounded-xl border-2 border-blue-200">
                  <button
                    onClick={() => setLayout("list")}
                    className={`grid h-10 w-12 place-items-center ${
                      layout === "list" ? "bg-blue-600 text-white" : "bg-white"
                    }`}
                    aria-label="Vista lista"
                  >
                    <ListIcon className="size-5" />
                  </button>
                  <button
                    onClick={() => setLayout("grid")}
                    className={`grid h-10 w-12 place-items-center ${
                      layout === "grid" ? "bg-blue-600 text-white" : "bg-white"
                    }`}
                    aria-label="Vista grid"
                  >
                    <LayoutGrid className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LISTA / GRID */}
        <section className="mt-6">
          <div className={gridCols}>
            {paginated.map((t) => (
              <TenderCard
                key={t.id}
                data={t}
                checked={selectedIds.has(t.id)}
                onToggle={() => toggle(t.id)}
              />
            ))}
          </div>

          {/* paginación */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <div className="text-sm text-slate-600">
              Mostrando{" "}
              <strong>
                {filtered.length ? pageStart + 1 : 0}–{Math.min(pageStart + PAGE_SIZE, filtered.length)}
              </strong>{" "}
              de <strong>{filtered.length}</strong>
            </div>
            <Pagination
              page={safePage}
              total={totalPages}
              onChange={(p) => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </section>
      </div>

      {/* Bottom bar selección */}
      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="text-sm text-slate-700">
            Seleccionadas: <span className="font-semibold">{selectedIds.size}</span> de{" "}
            <span className="font-semibold">{filtered.length}</span>
            <button onClick={clearSelection} className="ml-3 text-sm font-medium text-slate-500 hover:text-slate-700">
              Limpiar selección
            </button>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700">
            <MessageSquare className="size-4" />
            Continuar al Chat
          </button>
        </div>
      </footer>
    </div>
  );
}

/* -------------------- UI auxiliares -------------------- */

function Popover({
  children,
  label,
  icon,
}: {
  children: React.ReactNode;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-2 text-sm text-slate-900">
        {icon}
        {label}
        <ChevronDown className="size-4 opacity-70 transition group-open:rotate-180" />
      </summary>
      <div className="absolute left-0 z-10 mt-2 min-w-64 rounded-xl border border-blue-200 bg-white p-3 shadow-lg">
        {children}
      </div>
    </details>
  );
}

function MultiFilter({
  label,
  options,
  set,
  onChange,
}: {
  label: string;
  options: string[];
  set: Set<string>;
  onChange: (s: Set<string>) => void;
}) {
  return (
    <Popover label={label} icon={<Filter className="size-3.5 text-blue-500" />}>
      <div className="max-h-64 space-y-1 overflow-auto pr-1">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={set.has(opt)}
              onChange={() => {
                const n = new Set(set);
                n.has(opt) ? n.delete(opt) : n.add(opt);
                onChange(n);
              }}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      {!!set.size && (
        <button className="mt-2 text-xs text-blue-600" onClick={() => onChange(new Set())}>
          Limpiar {label.toLowerCase()}
        </button>
      )}
    </Popover>
  );
}

function Pagination({
  page,
  total,
  onChange,
}: {
  page: number;
  total: number;
  onChange: (p: number) => void;
}) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-blue-200 bg-white p-1">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`h-9 min-w-9 rounded-lg px-3 text-sm ${
            p === page ? "bg-blue-600 font-semibold text-white" : "hover:bg-blue-50"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

function TenderCard({
  data,
  checked,
  onToggle,
}: {
  data: Tender;
  checked: boolean;
  onToggle: () => void;
}) {
  const statusChip = {
    Abierta:
      "bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full px-3 py-1 text-xs font-semibold",
    "En evaluación":
      "bg-blue-100 text-indigo-800 border border-blue-200 rounded-full px-3 py-1 text-xs font-semibold",
    "Próximo cierre":
      "bg-amber-100 text-amber-800 border border-amber-200 rounded-full px-3 py-1 text-xs font-semibold",
  }[String(data.status)] || "bg-slate-100 text-slate-700 border border-slate-200 rounded-full px-3 py-1 text-xs";

  const riskChip =
    data.risk === "Alto"
      ? "bg-rose-100 text-rose-800 border border-rose-200 rounded-full px-3 py-1 text-xs font-semibold"
      : data.risk === "Medio"
      ? "bg-yellow-100 text-yellow-800 border border-yellow-200 rounded-full px-3 py-1 text-xs font-semibold"
      : data.risk === "Bajo"
      ? "bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full px-3 py-1 text-xs font-semibold"
      : "";

  return (
    <article className="rounded-xl border border-blue-100 bg-white shadow-md transition hover:border-blue-200">
      <div className="p-4 sm:p-5">
        {/* fila 1 */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={checked}
              onChange={onToggle}
              className="size-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex items-center gap-3">
              <span className="rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-slate-700">
                {data.id}
              </span>
              <span className={statusChip}>{data.status || "—"}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">{data.risk && <span className={riskChip}>Riesgo {data.risk}</span>}</div>
        </div>

        {/* entidad */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-900">{data.entity}</span>
        </div>

        {/* título */}
        <h3 className="mt-3 text-base font-semibold text-slate-900 sm:text-lg">
          {data.title}
        </h3>

        {/* meta */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <CalendarDays className="size-4" />
            <span className="text-slate-600">
              {data.startDate || "—"} {data.endDate ? `- ${data.endDate}` : ""}
            </span>
          </div>
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <CircleDollarSign className="size-4" />
            <span>{data.amountLabel || "—"}</span>
          </div>

          {/* etiquetas si existieran */}
          {!!data.tags?.length && (
            <div className="ml-0 flex flex-wrap items-center gap-2 sm:ml-auto">
              {data.tags!.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-[12px] font-medium text-amber-700"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
