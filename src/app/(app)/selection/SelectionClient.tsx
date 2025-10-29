"use client";

import { useMemo, useState, useEffect } from "react";
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
  ArrowUp01,
  ArrowDown10,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { Tender } from "@/types/tender";
import { inRange, normalize } from "@/lib/format";

/* -------------------- helpers -------------------- */
type SortKey = "none" | "amount" | "startDate" | "endDate";
type SortDir = "asc" | "desc";

const tryParseDate = (v?: string) => {
  if (!v) return undefined;
  // intenta YYYY-MM-DD, DD/MM/YYYY, DD-MM-YYYY y fallback Date(...)
  const s = String(v).trim();
  const dm1 = s.match(/^(\d{4})[-/](\d{2})[-/](\d{2})$/);
  if (dm1) return new Date(Number(dm1[1]), Number(dm1[2]) - 1, Number(dm1[3]));
  const dm2 = s.match(/^(\d{2})[/-](\d{2})[/-](\d{4})$/);
  if (dm2) return new Date(Number(dm2[3]), Number(dm2[2]) - 1, Number(dm2[1]));
  const d = new Date(s);
  return isNaN(d.getTime()) ? undefined : d;
};

const cmpNum = (a?: number, b?: number) =>
  (a ?? Number.NEGATIVE_INFINITY) - (b ?? Number.NEGATIVE_INFINITY);

/* -------------------- props -------------------- */
type Props = { initialTenders: Tender[] };

/* ============================================================
   COMPONENT
============================================================ */
export default function SelectionClient({ initialTenders }: Props) {
  /* ---------------- base ---------------- */
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set<string>()
  );
  const [layout, setLayout] = useState<"list" | "grid">("grid");

  // search
  const [query, setQuery] = useState("");
  const [processId, setProcessId] = useState("");

  // ---------- APPLIED (los que afectan la lista) ----------
  const [apStatus, setApStatus] = useState<Set<string>>(new Set());
  const [apModality, setApModality] = useState<Set<string>>(new Set());
  const [apLocation, setApLocation] = useState<Set<string>>(new Set());
  const [apEcon, setApEcon] = useState<Set<string>>(new Set());
  const [apEntity, setApEntity] = useState<Set<string>>(new Set());
  const [apEntitySearch, setApEntitySearch] = useState("");
  const amounts = useMemo(
    () => initialTenders.map((t) => t.amountCOP || 0).filter(Boolean),
    [initialTenders]
  );
  const minAmount = amounts.length ? Math.min(...amounts) : 0;
  const maxAmount = amounts.length ? Math.max(...amounts) : 0;
  const [apAmount, setApAmount] = useState<[number, number]>([
    minAmount,
    maxAmount,
  ]);

  // sort aplicado
  const [sortKey, setSortKey] = useState<SortKey>("none");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // items por página
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  // ---------- DRAFT (lo que se edita en UI y se aplica al dar click) ----------
  const [drStatus, setDrStatus] = useState<Set<string>>(new Set());
  const [drModality, setDrModality] = useState<Set<string>>(new Set());
  const [drLocation, setDrLocation] = useState<Set<string>>(new Set());
  const [drEcon, setDrEcon] = useState<Set<string>>(new Set());
  const [drEntity, setDrEntity] = useState<Set<string>>(new Set());
  const [drEntitySearch, setDrEntitySearch] = useState("");
  const [drAmount, setDrAmount] = useState<[number, number]>([
    minAmount,
    maxAmount,
  ]);

  // sincroniza drafts cuando cambia lo aplicado (por limpiar/aplicar)
  useEffect(() => {
    setDrStatus(new Set(apStatus));
    setDrModality(new Set(apModality));
    setDrLocation(new Set(apLocation));
    setDrEcon(new Set(apEcon));
    setDrEntity(new Set(apEntity));
    setDrEntitySearch(apEntitySearch);
    setDrAmount(apAmount);
  }, [apStatus, apModality, apLocation, apEcon, apEntity, apEntitySearch, apAmount]);

  // aplicar / limpiar
  const applyFilters = () => {
    setApStatus(new Set(drStatus));
    setApModality(new Set(drModality));
    setApLocation(new Set(drLocation));
    setApEcon(new Set(drEcon));
    setApEntity(new Set(drEntity));
    setApEntitySearch(drEntitySearch);
    setApAmount([drAmount[0], drAmount[1]]);
    setPage(1);
  };
  const clearAll = () => {
    setApStatus(new Set());
    setApModality(new Set());
    setApLocation(new Set());
    setApEcon(new Set());
    setApEntity(new Set());
    setApEntitySearch("");
    setApAmount([minAmount, maxAmount]);
    setSortKey("none");
    setSortDir("desc");
    setPage(1);
  };

  const toggle = (id: string) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const clearSelection = () => setSelectedIds(new Set());

  /* ---------------- opciones de filtros ---------------- */
  const options = useMemo(() => {
    const uniq = <K extends keyof Tender>(k: K) =>
      Array.from(new Set(initialTenders.map((t) => (t[k] || "") as string)))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b, "es"));
    return {
      status: uniq("status"),
      modality: uniq("modality"),
      location: uniq("location"),
      econ: uniq("econActivity"),
      entities: uniq("entity"),
    };
  }, [initialTenders]);

  /* ---------------- filtrado + orden ---------------- */
  const filtered = useMemo(() => {
    const q = normalize(query);
    const pid = normalize(processId);
    const eSearch = normalize(apEntitySearch);

    let list = initialTenders.filter((t) => {
      const byText = q ? normalize(t.search).includes(q) : true;
      const byId = pid ? normalize(t.id).includes(pid) : true;
      const byAmount = inRange(t.amountCOP, apAmount);

      const byStatus = apStatus.size ? apStatus.has(String(t.status || "")) : true;
      const byModality = apModality.size ? apModality.has(String(t.modality || "")) : true;
      const byLocation = apLocation.size ? apLocation.has(String(t.location || "")) : true;
      const byEcon = apEcon.size ? apEcon.has(String(t.econActivity || "")) : true;

      const byEntitySel = apEntity.size ? apEntity.has(String(t.entity || "")) : true;
      const byEntitySearch = eSearch ? normalize(t.entity || "").includes(eSearch) : true;

      return (
        byText &&
        byId &&
        byAmount &&
        byStatus &&
        byModality &&
        byLocation &&
        byEcon &&
        byEntitySel &&
        byEntitySearch
      );
    });

    // Orden
    if (sortKey !== "none") {
      list = [...list].sort((a, b) => {
        if (sortKey === "amount") {
          const d = cmpNum(a.amountCOP, b.amountCOP);
          return sortDir === "asc" ? d : -d;
        }
        if (sortKey === "startDate") {
          const da = tryParseDate(a.startDate)?.getTime() ?? -Infinity;
          const db = tryParseDate(b.startDate)?.getTime() ?? -Infinity;
          return sortDir === "asc" ? da - db : db - da;
        }
        if (sortKey === "endDate") {
          const da = tryParseDate(a.endDate)?.getTime() ?? -Infinity;
          const db = tryParseDate(b.endDate)?.getTime() ?? -Infinity;
          return sortDir === "asc" ? da - db : db - da;
        }
        return 0;
      });
    }

    return list;
  }, [
    initialTenders,
    query,
    processId,
    apAmount,
    apStatus,
    apModality,
    apLocation,
    apEcon,
    apEntity,
    apEntitySearch,
    sortKey,
    sortDir,
  ]);

  // paginación
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const start = (pageSafe - 1) * pageSize;
  const pageSlice = filtered.slice(start, start + pageSize);

  // chips activos
  const activeCount =
    Number(apStatus.size > 0) +
    Number(apModality.size > 0) +
    Number(apLocation.size > 0) +
    Number(apEcon.size > 0) +
    Number(apEntity.size > 0 || !!apEntitySearch) +
    Number(apAmount[0] !== minAmount || apAmount[1] !== maxAmount);

  const gridCols =
    layout === "grid"
      ? "grid gap-4 sm:gap-5 md:grid-cols-2 2xl:grid-cols-3"
      : "grid gap-4 sm:gap-5 md:grid-cols-2"; // lista también 2 en md para aprovechar espacio

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#EFF6FF_0%,#EEF2FF_50%,#FAF5FF_100%)]">
      <Sidebar />
      <div className="mx-auto max-w-7xl px-4 pb-32 pt-6 sm:px-6 lg:px-8">
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

            {/* Buscadores */}
            <div className="grid gap-3 md:grid-cols-[1fr,22rem]">
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

            {/* Barra de filtros */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <FilterChip active={apAmount[0] !== minAmount || apAmount[1] !== maxAmount}>
                  <Popover label="Cuantía" icon={<Filter className="size-3.5 text-blue-500" />}>
                    {/* Rango */}
                    <div className="space-y-3">
                      <div className="text-sm text-slate-600">
                        Rango:{" "}
                        <strong>{drAmount[0].toLocaleString("es-CO")}</strong> –{" "}
                        <strong>{drAmount[1].toLocaleString("es-CO")}</strong>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          className="rounded-md border px-2 py-1 text-sm"
                          value={drAmount[0]}
                          min={minAmount}
                          max={drAmount[1]}
                          onChange={(e) => setDrAmount([Number(e.target.value), drAmount[1]])}
                        />
                        <input
                          type="number"
                          className="rounded-md border px-2 py-1 text-sm"
                          value={drAmount[1]}
                          min={drAmount[0]}
                          max={maxAmount}
                          onChange={(e) => setDrAmount([drAmount[0], Number(e.target.value)])}
                        />
                      </div>
                      {/* Orden por cuantía */}
                      <div className="flex gap-2">
                        <button
                          className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm ${
                            sortKey === "amount" && sortDir === "asc"
                              ? "border-blue-300 bg-blue-50 text-blue-700"
                              : "border-slate-200 hover:bg-slate-50"
                          }`}
                          onClick={() => {
                            setSortKey("amount");
                            setSortDir("asc");
                          }}
                        >
                          <ArrowUp01 className="size-4" />
                          Menor→Mayor
                        </button>
                        <button
                          className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm ${
                            sortKey === "amount" && sortDir === "desc"
                              ? "border-blue-300 bg-blue-50 text-blue-700"
                              : "border-slate-200 hover:bg-slate-50"
                          }`}
                          onClick={() => {
                            setSortKey("amount");
                            setSortDir("desc");
                          }}
                        >
                          <ArrowDown10 className="size-4" />
                          Mayor→Menor
                        </button>
                      </div>
                    </div>
                  </Popover>
                </FilterChip>

                <MultiFilter
                  label="Modalidad"
                  options={options.modality}
                  draft={drModality}
                  setDraft={setDrModality}
                  appliedCount={apModality.size}
                />
                <MultiFilter
                  label="Estado"
                  options={options.status}
                  draft={drStatus}
                  setDraft={setDrStatus}
                  appliedCount={apStatus.size}
                />
                <MultiFilter
                  label="Ubicación"
                  options={options.location}
                  draft={drLocation}
                  setDraft={setDrLocation}
                  appliedCount={apLocation.size}
                />
                <MultiFilter
                  label="Actividad"
                  options={options.econ}
                  draft={drEcon}
                  setDraft={setDrEcon}
                  appliedCount={apEcon.size}
                />

                <FilterChip active={apEntity.size > 0 || !!apEntitySearch}>
                  <Popover label="Entidad">
                    <div className="space-y-3">
                      <input
                        value={drEntitySearch}
                        onChange={(e) => setDrEntitySearch(e.target.value)}
                        placeholder="Buscar entidad…"
                        className="w-full rounded-md border px-2 py-1 text-sm"
                      />
                      <div className="max-h-64 space-y-1 overflow-auto pr-1">
                        {options.entities
                          .filter((e) =>
                            normalize(e).includes(normalize(drEntitySearch))
                          )
                          .map((opt) => (
                            <label key={opt} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={drEntity.has(opt)}
                                onChange={() => {
                                  const n = new Set(drEntity);
                                  n.has(opt) ? n.delete(opt) : n.add(opt);
                                  setDrEntity(n);
                                }}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                      </div>
                      {!!drEntity.size && (
                        <button className="text-xs text-blue-600" onClick={() => setDrEntity(new Set())}>
                          Limpiar entidades
                        </button>
                      )}
                    </div>
                  </Popover>
                </FilterChip>

                {/* Resumen de cuántos filtros */}
                <span
                  className={`ml-1 rounded-full border px-3 py-2 text-sm ${
                    activeCount
                      ? "border-blue-300 bg-blue-50 text-blue-700"
                      : "border-slate-200 text-slate-600"
                  }`}
                  title="Filtros aplicados"
                >
                  {activeCount} filtros
                </span>
              </div>

              {/* Acciones de filtros */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={applyFilters}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <Filter className="size-4" />
                  Aplicar filtros
                </button>
                <button
                  onClick={clearAll}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                >
                  Limpiar todo
                </button>

                {/* Orden global por fecha */}
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-sm text-slate-600">Ordenar:</span>
                  <div className="inline-flex overflow-hidden rounded-xl border border-blue-200 bg-white">
                    <select
                      value={sortKey}
                      onChange={(e) => setSortKey(e.target.value as SortKey)}
                      className="h-10 border-0 bg-transparent px-3 text-sm outline-none"
                      aria-label="Criterio"
                    >
                      <option value="none">Relevancia (por defecto)</option>
                      <option value="amount">Cuantía</option>
                      <option value="startDate">Fecha inicio</option>
                      <option value="endDate">Fecha cierre</option>
                    </select>
                    <button
                      onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                      className="grid h-10 w-10 place-items-center border-l border-blue-200"
                      aria-label="Dirección"
                    >
                      {sortDir === "asc" ? <SortAsc className="size-5" /> : <SortDesc className="size-5" />}
                    </button>
                  </div>

                  {/* Layout toggle */}
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
          </div>
        </section>

        {/* LISTA / GRID */}
        <section className="mt-6">
          <div className={gridCols}>
            {pageSlice.map((t) => (
              <TenderCard
                key={t.id}
                data={t}
                checked={selectedIds.has(t.id)}
                onToggle={() => toggle(t.id)}
              />
            ))}
          </div>

          {/* paginación + tamaño */}
          <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="text-sm text-slate-600">
              Mostrando{" "}
              <strong>
                {filtered.length ? start + 1 : 0}–{Math.min(start + pageSize, filtered.length)}
              </strong>{" "}
              de <strong>{filtered.length}</strong>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                Ver:
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(1);
                  }}
                  className="rounded-lg border border-blue-200 bg-white px-2 py-1 text-sm"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                elementos
              </label>

              <Pagination
                page={pageSafe}
                total={totalPages}
                onChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Bottom bar selección */}
      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
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

/* ============================================================
   UI auxiliares
============================================================ */

function FilterChip({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${
        active ? "border-blue-300 bg-blue-50 text-blue-700" : "border-blue-200 bg-white text-slate-900"
      }`}
    >
      {children}
    </span>
  );
}

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
      <summary className="flex cursor-pointer list-none items-center gap-2">
        <span className="flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-2 text-sm text-slate-900 hover:bg-blue-50">
          {icon}
          {label}
          <ChevronDown className="size-4 opacity-70 transition group-open:rotate-180" />
        </span>
      </summary>
      <div className="absolute left-0 z-20 mt-2 min-w-72 rounded-xl border border-blue-200 bg-white p-4 shadow-xl">
        {children}
      </div>
    </details>
  );
}

function MultiFilter({
  label,
  options,
  draft,
  setDraft,
  appliedCount,
}: {
  label: string;
  options: string[];
  draft: Set<string>;
  setDraft: (s: Set<string>) => void;
  appliedCount?: number;
}) {
  return (
    <FilterChip active={!!appliedCount}>
      <Popover label={`${label}${appliedCount ? ` (${appliedCount})` : ""}`} icon={<Filter className="size-3.5 text-blue-500" />}>
        <div className="max-h-64 space-y-1 overflow-auto pr-1">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={draft.has(opt)}
                onChange={() => {
                  const n = new Set(draft);
                  n.has(opt) ? n.delete(opt) : n.add(opt);
                  setDraft(n);
                }}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
        {!!draft.size && (
          <button className="mt-2 text-xs text-blue-600" onClick={() => setDraft(new Set())}>
            Limpiar {label.toLowerCase()}
          </button>
        )}
      </Popover>
    </FilterChip>
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

  // genera lista compacta [1, '…', 10,11,12, '…', total]
  const windowSize = 7;
  const pages: (number | string)[] = [];
  const add = (p: number | string) => pages.push(p);

  const start = Math.max(2, page - 2);
  const end = Math.min(total - 1, page + 2);

  add(1);
  if (start > 2) add("…");
  for (let p = start; p <= end; p++) add(p);
  if (end < total - 1) add("…");
  if (total > 1) add(total);

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-xl border border-blue-200 bg-white p-1">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        className="h-9 min-w-9 rounded-lg px-3 text-sm hover:bg-blue-50"
        disabled={page === 1}
      >
        Anterior
      </button>
      {pages.map((p, i) =>
        typeof p === "number" ? (
          <button
            key={`${p}-${i}`}
            onClick={() => onChange(p)}
            className={`h-9 min-w-9 rounded-lg px-3 text-sm ${
              p === page ? "bg-blue-600 font-semibold text-white" : "hover:bg-blue-50"
            }`}
          >
            {p}
          </button>
        ) : (
          <span key={`dots-${i}`} className="px-2 text-slate-500">
            {p}
          </span>
        )
      )}
      <button
        onClick={() => onChange(Math.min(total, page + 1))}
        className="h-9 min-w-9 rounded-lg px-3 text-sm hover:bg-blue-50"
        disabled={page === total}
      >
        Siguiente
      </button>
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
  const statusChip =
    {
      Abierta:
        "bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full px-3 py-1 text-xs font-semibold",
      "En evaluación":
        "bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-full px-3 py-1 text-xs font-semibold",
      "Próximo cierre":
        "bg-amber-100 text-amber-800 border border-amber-200 rounded-full px-3 py-1 text-xs font-semibold",
    }[String(data.status)] ||
    "bg-slate-100 text-slate-700 border border-slate-200 rounded-full px-3 py-1 text-xs";

  const riskChip =
    data.risk === "Alto"
      ? "bg-rose-100 text-rose-800 border border-rose-200 rounded-full px-3 py-1 text-xs font-semibold"
      : data.risk === "Medio"
      ? "bg-yellow-100 text-yellow-800 border border-yellow-200 rounded-full px-3 py-1 text-xs font-semibold"
      : data.risk === "Bajo"
      ? "bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full px-3 py-1 text-xs font-semibold"
      : "";

  const leftAccent =
    data.risk === "Alto"
      ? "before:bg-rose-400"
      : data.risk === "Medio"
      ? "before:bg-yellow-400"
      : data.status === "Próximo cierre"
      ? "before:bg-amber-400"
      : "before:bg-blue-400";

  return (
    <article
      className={`relative overflow-hidden rounded-xl border border-blue-100 bg-white shadow-md transition hover:border-blue-200 hover:shadow-lg before:absolute before:left-0 before:top-0 before:h-full before:w-1 ${leftAccent}`}
    >
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
          <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md border border-blue-100 bg-blue-50 px-2 text-[12px] font-semibold text-blue-700">
            {String(data.entity).slice(0, 2).toUpperCase()}
          </span>
          <span className="text-sm font-semibold text-slate-900">{data.entity}</span>
        </div>

        {/* título */}
        <h3 className="mt-3 line-clamp-2 text-base font-semibold text-slate-900 sm:text-lg">
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
