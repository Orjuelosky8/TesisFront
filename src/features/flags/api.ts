import { apiFetch } from "./../../lib/api";
import type { FlagSetIn } from "./../../types/backend";

export async function setFlag(licitacionId: number, body: FlagSetIn) {
  return apiFetch<{ flags_licitaciones_id: number; ok: true }>(
    `/api/flags/${licitacionId}`,
    { method: "POST", body: JSON.stringify(body) }
  );
}
