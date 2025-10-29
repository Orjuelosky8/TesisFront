"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { searchLicitaciones, createLicitacion } from "./api";
import type { LicitacionIn } from "./../../types/backend";

export function useSearchLicitaciones(q: string, enabled = true) {
  return useQuery({
    queryKey: ["licitaciones", "search", q],
    queryFn: () => searchLicitaciones(q),
    enabled: enabled && q.trim().length > 0,
  });
}

export function useCreateLicitacion() {
  return useMutation({
    mutationFn: (payload: LicitacionIn) => createLicitacion(payload),
  });
}
