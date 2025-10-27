export default function MessageItem({ role, content }:{role:"user"|"assistant"; content:string;}){
  return (
    <div className={"flex " + (role === "user" ? "justify-end" : "justify-start")}>
      <div className={"max-w-[75%] rounded-lg px-3 py-2 text-sm " + (role === "user" ? "bg-[var(--brand)] text-white" : "bg-white border")}>
        {content}
      </div>
    </div>
  );
}
