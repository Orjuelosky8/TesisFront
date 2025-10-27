"use client";
import { useState } from "react";
import Button from "./../../../components/ui/Button";
import Input from "./../../../components/ui/Input";
import MessageItem from "./MessageItem";
import SourceList from "./SourceList";
import { askRag } from "./../../rag/api/ask";

type Msg = { role: "user" | "assistant"; content: string; sources?: any[] };

export default function ChatPanel(){
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [q, setQ] = useState("");

  const send = async () => {
    const text = q.trim();
    if (!text) return;
    setQ("");
    setMsgs((m)=>[...m, { role:"user", content:text }]);
    try{
      const res = await askRag(text);
      // Ajusta los nombres de campos a tu respuesta Flask (p.ej. answer, sources)
      setMsgs((m)=>[...m, { role:"assistant", content: res.answer ?? JSON.stringify(res), sources: res.sources }]);
    }catch(e:any){
      setMsgs((m)=>[...m, { role:"assistant", content: "Ocurrió un error consultando el RAG." }]);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] rounded-xl border bg-white overflow-hidden">
      <div className="flex-1 overflow-auto p-4 space-y-3 bg-slate-50">
        {msgs.map((m,i)=>(<div key={i} className="space-y-2">
          <MessageItem role={m.role} content={m.content} />
          {m.role === "assistant" && <SourceList sources={m.sources} />}
        </div>))}
        {!msgs.length && (
          <div className="h-full grid place-items-center text-slate-500 text-sm">
            Haz una pregunta sobre tus pliegos o licitaciones…
          </div>
        )}
      </div>
      <div className="border-t p-3 flex gap-2">
        <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Ej: ¿Qué requisitos de experiencia piden?" onKeyDown={(e)=> e.key==="Enter" && send()} />
        <Button onClick={send}>Enviar</Button>
      </div>
    </div>
  );
}
