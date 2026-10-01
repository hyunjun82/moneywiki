/**
 * 빌드 때 구울 환율 — 서버 전용(fs). 클라이언트 컴포넌트에서 import 하지 않는다.
 *
 * 파일은 prebuild 의 scripts/fx/fetch-snapshot.mjs 가 받아 둔다(.gitignore).
 * 로컬 dev 에서 없으면 그 스크립트를 한 번 돌린다.
 */

import fs from "node:fs";
import path from "node:path";
import type { FxData, FxRate, HistoryPoint } from "./fxCore";

const DIR = path.join(process.cwd(), "src/data/fx-snapshot");

let fxCache: FxData | null = null;
let histCache: Record<string, HistoryPoint[]> | null = null;

function read<T>(name: string): T {
  const p = path.join(DIR, name);
  if (!fs.existsSync(p)) {
    throw new Error(`환율 스냅숏 없음: ${p} — node scripts/fx/fetch-snapshot.mjs 를 먼저 돌리세요`);
  }
  return JSON.parse(fs.readFileSync(p, "utf8")) as T;
}

// 빌드에서는 한 번만 읽는다. dev 에서는 스냅숏을 다시 받으면 바로 보이게 매번 읽는다.
const CACHE = process.env.NODE_ENV === "production";

export function loadFx(): FxData {
  if (!CACHE) return read<FxData>("fx.json");
  return (fxCache ??= read<FxData>("fx.json"));
}

export function loadHistory(code: string): HistoryPoint[] {
  if (!CACHE) histCache = null;
  histCache ??= read<{ series: Record<string, HistoryPoint[]> }>("fx-history.json").series ?? {};
  return histCache[code] ?? [];
}

/**
 * 클라이언트 컴포넌트로 넘길 값은 줄인다 — 넘긴 props 는 페이지마다 HTML 에 한 번 더 실린다.
 * keepCodes 의 은행 우대 조건(note)만 남기고, 차트용 history 는 뺀다(통화 페이지는 따로 넘긴다).
 */
export function trimFx(data: FxData, keepCodes: string[] = []): FxData {
  const strip = (r: FxRate): FxRate => ({ ...r, history: undefined });
  const banks = data.banks
    ? {
        ...data.banks,
        byCurrency: Object.fromEntries(
          Object.entries(data.banks.byCurrency ?? {}).map(([c, rows]) => [
            c,
            keepCodes.includes(c) ? rows : rows.map((b) => ({ ...b, note: null })),
          ])
        ),
      }
    : data.banks;
  return { ...data, rates: (data.rates ?? []).map(strip), banks };
}
