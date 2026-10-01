/**
 * 환율 스냅숏 — 빌드 직전(prebuild)에 price-data 브랜치의 fx.json·fx-history.json 을 받아
 * src/data/fx-snapshot/ 에 둔다. /fx 페이지가 이 값으로 HTML 을 굽는다(검색엔진이 숫자를 읽게).
 *
 * - 이 폴더는 .gitignore 다. main 에 시세를 커밋하지 않는다(CLAUDE.md 금시세·환율 규칙).
 * - 브라우저는 열리자마자 최신 fx.json 으로 갈아끼운다(fxData.useFx). 구운 값은 첫 화면과 검색용이다.
 * - 못 받으면 빌드를 멈춘다. 숫자 없는 /fx 가 배포되느니 어제 배포가 남는 편이 낫다.
 *
 * 사용법: node scripts/fx/fetch-snapshot.mjs
 */

import fs from "node:fs";
import path from "node:path";

const BASE = "https://raw.githubusercontent.com/hyunjun82/moneywiki/price-data";
const OUT = path.join(process.cwd(), "src/data/fx-snapshot");

const FILES = [
  { name: "fx.json", ok: (j) => Array.isArray(j?.rates) && j.rates.some((r) => r.code === "USD" && Number.isFinite(r.rate)) },
  { name: "fx-history.json", ok: (j) => Array.isArray(j?.series?.USD) && j.series.USD.length > 0 },
];

async function get(name) {
  let last;
  for (let i = 0; i < 4; i++) {
    try {
      const r = await fetch(`${BASE}/${name}?t=${Date.now()}`, { signal: AbortSignal.timeout(20000) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    } catch (e) {
      last = e;
      await new Promise((res) => setTimeout(res, 3000 * 2 ** i));
    }
  }
  throw last;
}

fs.mkdirSync(OUT, { recursive: true });
for (const f of FILES) {
  let j;
  try {
    j = await get(f.name);
  } catch (e) {
    console.error(`✗ 환율 스냅숏 ${f.name} 받기 실패: ${e.message}`);
    process.exit(1);
  }
  if (!f.ok(j)) {
    console.error(`✗ 환율 스냅숏 ${f.name} 모양이 이상함 — 굽지 않는다`);
    process.exit(1);
  }
  fs.writeFileSync(path.join(OUT, f.name), JSON.stringify(j));
}

const fx = JSON.parse(fs.readFileSync(path.join(OUT, "fx.json"), "utf8"));
const usd = fx.rates.find((r) => r.code === "USD");
console.log(
  `✓ 환율 스냅숏 ${fx.updatedAt} — USD ${usd.rate}, 통화 ${fx.rates.length}종, ` +
    `은행 공시 ${fx.banks?.currencies?.length ?? 0}종, 공항 ${fx.banks?.airport?.currencies?.length ?? 0}종, ` +
    `수출입은행 ${fx.official?.items?.length ? fx.official.quoteDate : "없음"}`
);
