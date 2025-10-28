export const normalize = (s: string) =>
  (s || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

export const inRange = (v: number | undefined, [min, max]: [number, number]) =>
  typeof v === "number" ? v >= min && v <= max : true;
