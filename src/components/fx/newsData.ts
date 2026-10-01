/**
 * 환율 일일 기사 — 서버 전용(fs). scripts/fx/generate-news.mjs 가 src/data/fx-news/YYYY-MM-DD.json 을 쓴다.
 */

import fs from "node:fs";
import path from "node:path";

export interface FxNewsDoc {
  v?: number;
  date: string;
  title: string;
  description: string;
  publishedAt?: string | null;
  updatedAt?: string | null;
  basis?: { kind: "official" | "mid"; label: string; when: string };
  headline?: string;
  cards?: { code: string; name: string; slug: string; quote: string; rate: number; change: number | null; changePct: number | null }[];
  series?: Record<string, { d: string; r: number }[]>;
  lead: string;
  sections: { heading: string; paragraphs: string[]; table?: { head: string[]; rows: string[][]; note?: string } }[];
  faq?: { q: string; a: string }[];
  paragraphs?: string[];
  sources?: string[];
  analysis?: { model: string; at: string; parts: string[] } | null;
}

const DIR = path.join(process.cwd(), "src/data/fx-news");

export function listFxNewsDates(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .map((f) => f.replace(".json", ""))
    .sort()
    .reverse();
}

export function loadFxNews(date: string): FxNewsDoc | null {
  const p = path.join(DIR, `${date}.json`);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8")) as FxNewsDoc;
}
