"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-md bg-[var(--brand)] grid place-items-center text-white font-bold">AI</div>
          <div className="leading-tight">
            <div className="font-semibold">SECOP AI</div>
            <div className="text-xs text-slate-500">Control Inteligente</div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/#como-funciona" className="hover:text-[var(--brand)]">Cómo funciona</Link>
          <Link href="/#beneficios" className="hover:text-[var(--brand)]">Beneficios</Link>
          <Link href="/#soporte" className="hover:text-[var(--brand)]">Soporte</Link>
          <Link href="/login" className="px-3 py-1.5 rounded-md bg-[var(--brand)] text-white">Ingresar</Link>
        </div>
      </div>
    </nav>
  );
}
