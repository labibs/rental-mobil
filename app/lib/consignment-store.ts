import { promises as fs } from "fs";
import path from "path";
import type { Consignment } from "./consignment-types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "consignments.json");

export async function listConsignments(): Promise<Consignment[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Consignment[]) : [];
  } catch {
    return [];
  }
}

export async function saveConsignments(items: Consignment[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
}
