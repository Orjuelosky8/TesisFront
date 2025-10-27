"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "./../../lib/cn";

const items = [
  { href: "/dashboard", label: "Resumen" },
  { href: "/selection", label: "Licitaciones" },
  { href: "/chat", label: "Chat RAG" },
];

export default function Sidebar(){
  const path = usePathname();
  return (
    <aside className="w-full md:w-64 shrink-0 border rounded-xl bg-white p-4 h-max">
      <div className="font-semibold mb-2">Panel</div>
      <nav className="space-y-1">
        {items.map(i=>(
          <Link
            key={i.href}
            href={i.href}
            className={cn(
              "block px-3 py-2 rounded-md text-sm hover:bg-slate-100",
              path === i.href && "bg-slate-100 font-medium"
            )}
          >
            {i.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
