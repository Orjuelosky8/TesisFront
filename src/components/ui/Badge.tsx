import { HTMLAttributes } from "react";
import { cn } from "./../../lib/cn";

export default function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-block text-xs px-2 py-1 rounded bg-slate-100 text-slate-700", className)} {...props} />;
}
