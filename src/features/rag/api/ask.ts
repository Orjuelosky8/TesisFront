export async function askRag(prompt: string) {
  const res = await fetch("/api/rag/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}
