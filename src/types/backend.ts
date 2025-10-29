export type LicitacionIn = {
  entidad: string;
  objeto?: string | null;
  cuantia?: number | null;
  modalidad?: string | null;
  numero?: string | null;
  estado?: string | null;
  fecha_public?: string | null; // ISO yyyy-mm-dd
  ubicacion?: string | null;
  act_econ?: string | null;
  enlace?: string | null;
  portal_origen?: string | null;
  texto_indexado?: string | null;
};

export type LicitacionSearchItem = {
  id: number;
  entidad: string;
  estado: string | null;
  fecha_public: string | null;
  cuantia: number | null;
};

export type FlagSetIn = {
  flag_codigo: string;   // ej 'red1'
  valor: boolean;
  comentario?: string | null;
  fuente?: string | null; // 'manual' por defecto
};

export type BatchRequest = {
  flow?: string;         // default 'all'
  where?: string | null;
  limit?: number | null;
};

export type PersonasPayload = {
  personas: Array<Record<string, any>>;
  contratistas?: string[] | null;
};

export type RunRedContactosRequest = {
  licitacion_ids: number[];
  data: PersonasPayload;
};
