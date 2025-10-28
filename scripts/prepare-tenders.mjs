// scripts/prepare-tenders.mjs
import fs from "node:fs";
import path from "node:path";
import * as XLSX from "xlsx/xlsx.mjs";  // build ESM
XLSX.set_fs(fs);                        // necesario en ESM

const ROOT = process.cwd();
const SRC = path.resolve(ROOT, "data", "raw", "Base de Datos SecopAI-tesis.xlsx");
const OUT_DIR = path.resolve(ROOT, "public", "data");
const OUT = path.resolve(OUT_DIR, "tenders.min.json");

// --- check acceso al archivo (ahora SRC YA existe) ---
try {
  fs.accessSync(SRC, fs.constants.R_OK);
  console.error(`ENCONTRADO el Excel en: ${SRC}`);
} catch (e) {
  console.error(`No se puede leer el Excel en: ${SRC}\n${e.message}`);
  process.exit(1);
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// --- lee Excel ---
const wb = XLSX.readFile(SRC, { cellDates: true });
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

// --- helpers (tus mismas funciones) ---
const normalize = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

const capitalize = (str) =>
  String(str || "")
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (m) => m.toUpperCase());

const pick = (obj, candidates) => {
  const keys = Object.keys(obj);
  for (const c of candidates) {
    const hit = keys.find(
      (k) => normalize(k) === normalize(c) || normalize(k).includes(normalize(c))
    );
    if (hit) return obj[hit];
  }
  return "";
};

const moneyToNumber = (v) => {
  if (typeof v === "number") return v;
  const n = String(v).replace(/\./g, "").replace(/,/g, "").replace(/[^\d]/g, "");
  return n ? Number(n) : 0;
};

const fmtCOP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const econMap = (txt) => {
  const t = normalize(txt);
  if (/(vial|infraestructura|obra|construccion|mantenimiento)/.test(t)) return "Obras civiles / Vías";
  if (/(salud|hospital|clinica|medic)/.test(t)) return "Salud";
  if (/(educa|colegio|universidad|escuela)/.test(t)) return "Educación";
  if (/(tecnolog|software|sistema|plataforma|tic)/.test(t)) return "Tecnología";
  if (/(aliment|catering|restaurante|mercado)/.test(t)) return "Alimentos";
  if (/(limpieza|aseo|residuos)/.test(t)) return "Aseo / Residuos";
  if (/(seguridad|vigilancia|camaras|cctv)/.test(t)) return "Seguridad";
  return txt || "General";
};

// --- transforma ---
const OUT_DATA = rows
  .map((r) => {
    const id =
      pick(r, ["n° proceso", "numero proceso", "número de proceso", "proceso", "codigo", "código"]) ||
      pick(r, ["id"]);
    const title = pick(r, ["objeto", "objeto del contrato", "descripcion", "descripción"]) || "";
    const entity = pick(r, ["entidad", "entidad estatal", "comprador"]) || "";
    const estado = pick(r, ["estado", "status"]) || "";
    const modalidad = pick(r, ["modalidad", "tipo de proceso", "tipo proceso"]) || "";
    const ubicacion = pick(r, ["ubicacion", "ubicación", "ciudad", "municipio", "departamento"]) || "";
    const actividad = pick(r, ["actividad economica", "actividad económica", "sector", "area", "área"]);
    const fechaInicio = pick(r, ["fecha publicacion", "fecha publicación", "apertura", "inicio"]) || "";
    const fechaFin = pick(r, ["fecha cierre", "cierre", "plazo final", "fin"]) || "";
    const montoRaw = pick(r, ["cuantia", "cuantía", "valor", "presupuesto", "valor estimado"]);
    const monto = moneyToNumber(montoRaw);
    const riesgo = pick(r, ["riesgo", "risk"]) || "";

    const econ = econMap(actividad || title);

    const search = [id, title, entity, modalidad, ubicacion, econ, estado]
      .map((x) => normalize(x))
      .join(" ");

    return {
      id: String(id || "").trim(),
      title: capitalize(title),
      entity: capitalize(entity),
      status: capitalize(estado),
      modality: capitalize(modalidad),
      location: capitalize(ubicacion),
      econActivity: econ,
      startDate: String(fechaInicio || "").trim(),
      endDate: String(fechaFin || "").trim(),
      amountCOP: monto,
      amountLabel: monto ? fmtCOP.format(monto) + " COP" : "",
      risk: riesgo ? String(riesgo).trim() : null,
      search,
      tags: [],
    };
  })
  .filter((r) => r.id && r.title);

// --- escribe salida ---
fs.writeFileSync(OUT, JSON.stringify(OUT_DATA), "utf8");
console.log(`✅ Generado ${OUT} con ${OUT_DATA.length} registros`);
