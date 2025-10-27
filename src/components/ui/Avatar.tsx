import Image from "next/image";
export default function Avatar({ src, alt }: { src?: string; alt?: string }) {
  return (
    <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden">
      {src ? <Image src={src} alt={alt ?? ""} width={36} height={36} /> : null}
    </div>
  );
}
