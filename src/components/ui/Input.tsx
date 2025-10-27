'use client';
import { InputHTMLAttributes } from "react";
import { cn } from "./../../lib/cn";

export default function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-slate-300 px-3 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30 focus:border-[var(--brand)]",
        className
      )}
      {...props}
    />
  );
}
