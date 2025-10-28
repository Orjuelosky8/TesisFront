// src/app/selection/page.tsx
import { promises as fs } from "fs";
import path from "path";
import SelectionClient from "./SelectionClient";
import { Tender } from "@/types/tender";

export const dynamic = "force-static";

export default async function Page() {
  const file = path.join(process.cwd(), "public", "data", "tenders.min.json");
  const raw = await fs.readFile(file, "utf8");
  const data: Tender[] = JSON.parse(raw);

  return <SelectionClient initialTenders={data} />;
}
