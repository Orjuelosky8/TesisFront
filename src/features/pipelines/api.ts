import { apiFetch } from "./../../lib/api";
import type { BatchRequest } from "./../../types/backend";

export async function getFlows() {
  return apiFetch<string[]>(`/api/pipelines/flows`);
}

export async function runPipelineOne(licitacionId: number, flow = "all") {
  const url = `/api/pipelines/run/${licitacionId}?flow=${encodeURIComponent(flow)}`;
  return apiFetch<Record<string, any>>(url, { method: "POST" });
}

export async function runPipelineBatch(payload: BatchRequest) {
  return apiFetch<Record<string, any>[]>(`/api/pipelines/batch`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
