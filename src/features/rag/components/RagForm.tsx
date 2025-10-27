"use client";
import { useState } from "react";

export default function RagForm({ onSubmit }: { onSubmit: (q: string) => void }) {
  const [q, setQ] = useState("");
  return (
    <div className="flex gap-2">
      <input
        className="flex-1 border rounded p-2"
        placeholder="Escribe tu pregunta…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit(q)}
      />
      <button className="px-3 py-2 rounded bg-black text-white" onClick={() => onSubmit(q)}>
        Enviar
      </button>
    </div>
  );
}
