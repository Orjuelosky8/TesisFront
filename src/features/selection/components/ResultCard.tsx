import { Card, CardContent } from "./../../../components/ui/Card";
import Badge from "./../../../components/ui/Badge";
import Button from "./../../../components/ui/Button";

export default function ResultCard(){
  return (
    <Card>
      <CardContent className="p-5 space-y-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div className="font-semibold">Compra de equipos de cómputo</div>
            <div className="text-xs text-slate-500">Alcaldía de Bogotá • SECOP II</div>
          </div>
          <Badge>Abierta</Badge>
        </div>
        <div className="text-sm text-slate-700">
          Objeto: Adquisición de equipos para modernización de sedes…
        </div>
        <div className="text-xs text-slate-500">Publicación: 2025-10-15 • Cierre: 2025-11-10</div>
        <div className="flex gap-2">
          <Button className="px-2 py-1">Ver detalle</Button>
          <a className="px-2 py-1 border rounded-md text-sm" href="/chat">Analizar con IA</a>
        </div>
      </CardContent>
    </Card>
  );
}
