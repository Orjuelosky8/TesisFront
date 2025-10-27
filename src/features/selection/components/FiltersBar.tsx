import Input from "./../../../components/ui/Input";
import Button from "./../../../components/ui/Button";

export default function FiltersBar(){
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <Input placeholder="Buscar por entidad / objeto" />
      <Input placeholder="Ciudad / Departamento" />
      <Input placeholder="Presupuesto mínimo" />
      <Input placeholder="Presupuesto máximo" />
      <Button>Filtrar</Button>
    </div>
  );
}
