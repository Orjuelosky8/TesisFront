import { Card, CardContent } from "./../../../components/ui/Card";

export default function SourceList({ sources }:{sources?: Array<{title:string; url?:string; page?:number}>}){
  if (!sources?.length) return null;
  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-slate-600">Fuentes</div>
      <div className="grid sm:grid-cols-2 gap-2">
        {sources.map((s,i)=>(
          <Card key={i}><CardContent className="p-3 text-sm">
            <div className="font-medium">{s.title}</div>
            {s.url && <a className="text-xs text-[var(--brand)]" href={s.url} target="_blank">Abrir</a>}
            {s.page && <div className="text-xs text-slate-500">Pág. {s.page}</div>}
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}
