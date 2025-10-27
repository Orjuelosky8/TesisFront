import Sidebar from "@/components/layout/Sidebar";
import FiltersBar from "@/features/selection/components/FiltersBar";
import ResultCard from "@/features/selection/components/ResultCard";

export default function SelectionPage(){
  return (
    <div className="grid md:grid-cols-[16rem,1fr] gap-6">
      <Sidebar />
      <div className="space-y-4">
        <FiltersBar />
        <div className="grid gap-4">
          {Array.from({length:6}).map((_,i)=>(<ResultCard key={i}/>))}
        </div>
      </div>
    </div>
  );
}
