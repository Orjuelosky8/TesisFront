import { apiFetch } from "./../../lib/api";
import type { LicitacionIn, LicitacionSearchItem } from "./../../types/backend";

// GET /licitaciones/search?q=&limit=
export async function searchLicitaciones(q: string, limit = 50) {
  const url = `/api/licitaciones/search?q=${encodeURIComponent(q)}&limit=${limit}`;
  return apiFetch<LicitacionSearchItem[]>(url);
}

// POST /licitaciones
export async function createLicitacion(payload: LicitacionIn) {
  return apiFetch<{ id: number }>(`/api/licitaciones`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
