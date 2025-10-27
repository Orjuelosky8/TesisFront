import { Card, CardContent } from "./../ui/Card";
export default function StatCard({title, value, hint}:{title:string; value:string|number; hint?:string;}){
  return (
    <Card>
      <CardContent className="p-5">
        <div className="text-sm text-slate-600">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
        {hint && <div className="text-xs text-slate-500 mt-1">{hint}</div>}
      </CardContent>
    </Card>
  );
}
