import { apiFetch } from "./../../lib/api";
import type { RunRedContactosRequest } from "./../../types/backend";

export async function runRedContactos(payload: RunRedContactosRequest) {
  return apiFetch<Record<string, any>[]>(`/api/pipes/red-contactos/run`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
