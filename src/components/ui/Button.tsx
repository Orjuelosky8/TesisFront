'use client';
import { ButtonHTMLAttributes } from "react";
import { cn } from "./../../lib/cn";

export default function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium",
        "bg-[var(--brand)] hover:opacity-90 active:opacity-80 disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
}