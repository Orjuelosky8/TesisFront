export type Status = "Abierta" | "En evaluación" | "Próximo cierre" | string;

export type Risk = "Alto" | "Medio" | "Bajo" | null;

export type Tender = {
  id: string;
  title: string;
  entity?: string;
  status?: Status;
  risk?: Risk;
  modality?: string;
  location?: string;
  econActivity?: string;
  startDate?: string;
  endDate?: string;
  amountCOP?: number;
  amountLabel?: string;
  tags?: string[];
  /** texto normalizado para búsqueda rápida */
  search: string;
};
