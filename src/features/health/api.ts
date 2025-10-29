import { apiFetch } from "./../../lib/api";
export async function health() { return apiFetch<{ status: "ok" }>(`/api/health`); }
