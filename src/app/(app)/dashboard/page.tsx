import Sidebar from "@/components/layout/Sidebar";
import StatCard from "@/components/composite/StatCard";
import { Card, CardContent } from "@/components/ui/Card";

export default function DashboardPage(){
  return (
    <div className="grid md:grid-cols-[16rem,1fr] gap-6">
      <Sidebar />
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Nuevas licitaciones" value="27" hint="Últimos 7 días" />
          <StatCard title="Documentos analizados" value="143" />
          <StatCard title="Alertas" value="3" hint="Revisar cumplimiento" />
          <StatCard title="Consultas RAG" value="512" />
        </div>

        <Card>
          <CardContent className="p-5">
            <div className="font-semibold mb-2">Actividad reciente</div>
            <ul className="space-y-2 text-sm">
              <li>Se analizó: “Adquisición equipos biomédicos”</li>
              <li>Se marcó alerta: “Requisito NTC ISO 9001”</li>
              <li>Se cargó pliego nuevo (PDF)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
