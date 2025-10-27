import { NextRequest } from "next/server";
import { env } from "@/config/env";

export const dynamic = "force-dynamic"; // sin cache

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // { prompt: string }
    const res = await fetch(`${env.FLASK_URL}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? "Proxy error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
