/**
 * verify-links.ts — 글 데이터의 행동 URL을 배포 전에 실제로 열어 검사한다.
 *
 * verify-rendered는 배포된 화면을 열어야 해서 새 글에는 못 쓴다. 그 구멍으로
 * "CTA를 열어보지 않고 복사해 쓰는" 일이 실제로 일어났다 (보험 11편 전부
 * 같은 링크 — 2026-08-16 발견). 이 검사기는 데이터 단계에서 같은 검사를 한다.
 *
 * 검사 항목 (URL은 중복 제거 후 각 1회만 연다):
 *   1. HTTP 400 미만으로 열리는가
 *   2. 안내·점검·오류 페이지가 아닌가
 *   3. 실제 행동 요소(버튼·입력·폼)가 있는가
 *
 * 캐시: scripts/.link-check-cache.json — 7일 이내 통과한 URL은 건너뛴다.
 * pre-push에서 매번 브라우저를 띄우지 않기 위함. 실패는 캐시하지 않는다.
 *
 * 사용: npx tsx scripts/verify-links.ts [--no-cache]
 */
import * as path from "path";
import * as fs from "fs";
import { pathToFileURL } from "url";
import { chromium } from "playwright";

const ROOT = path.resolve(__dirname, "..");
const ARTICLES_DIR = path.join(ROOT, "src", "data", "articles");
const CACHE_FILE = path.join(ROOT, "scripts", ".link-check-cache.json");
const CACHE_DAYS = 7;
const NO_CACHE = process.argv.includes("--no-cache");

/** 안내·점검 페이지 판별 — verify-rendered와 같은 기준 */
const BAD_TITLE = /점검|오류|error|not found|404|접근.*(제한|차단|불가)|서비스.*중단/i;
const BAD_BODY = /서비스\s*점검|시스템\s*점검|접속이\s*차단|사용이\s*불가능/;

interface Target {
  url: string;
  usedBy: string[]; // "slug (heroCta)" 형태
}

async function loadTargets(): Promise<Target[]> {
  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".ts") && f !== "types.ts");

  const map = new Map<string, string[]>();
  const add = (url: string | undefined, by: string) => {
    if (!url) return;
    if (!map.has(url)) map.set(url, []);
    map.get(url)!.push(by);
  };

  for (const file of files) {
    const mod = await import(pathToFileURL(path.join(ARTICLES_DIR, file)).href);
    const exportName = Object.keys(mod).find((k) => k !== "default");
    const cat = exportName ? (mod as any)[exportName] : null;
    if (!cat?.articles) continue;
    for (const a of cat.articles) {
      add(a.heroCta?.url, `${a.slug} (heroCta)`);
      (a.mainSections ?? []).forEach((s: any, i: number) =>
        add(s.cta?.url, `${a.slug} (q${i + 1})`)
      );
      (a.resolution?.steps ?? []).forEach((s: any, i: number) =>
        add(s.action?.url, `${a.slug} (step${i + 1})`)
      );
    }
  }
  return [...map.entries()].map(([url, usedBy]) => ({ url, usedBy }));
}

function loadCache(): Record<string, { ok: true; checkedAt: string; title: string }> {
  if (NO_CACHE) return {};
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
  } catch {
    return {};
  }
}

function fresh(checkedAt: string): boolean {
  return Date.now() - new Date(checkedAt).getTime() < CACHE_DAYS * 86400_000;
}

async function main() {
  const targets = await loadTargets();
  console.log(`[verify-links] 행동 URL ${targets.length}종 (중복 제거 후)`);

  const cache = loadCache();
  const toCheck = targets.filter((t) => !(cache[t.url]?.ok && fresh(cache[t.url].checkedAt)));
  const skipped = targets.length - toCheck.length;
  if (skipped > 0) console.log(`[verify-links] 캐시 통과 ${skipped}종 건너뜀 (${CACHE_DAYS}일 이내 확인됨)`);

  const problems: string[] = [];

  if (toCheck.length > 0) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    for (const t of toCheck) {
      try {
        const res = await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 45000 });
        await page.waitForTimeout(2000);
        const status = res?.status() ?? 0;
        const title = await page.title();
        const probe = await page.evaluate(() => {
          const body = document.body?.innerText ?? "";
          const actions = document.querySelectorAll(
            'a[href], button, input, select, form, [role="button"]'
          ).length;
          return { body: body.slice(0, 3000), actions };
        });

        if (status >= 400) {
          problems.push(`HTTP ${status} — ${t.url}\n      사용처: ${t.usedBy.join(", ")}`);
        } else if (BAD_TITLE.test(title) || BAD_BODY.test(probe.body)) {
          problems.push(
            `안내·점검 페이지 (제목: ${title}) — ${t.url}\n      사용처: ${t.usedBy.join(", ")}`
          );
        } else if (probe.actions < 3) {
          problems.push(
            `행동 요소가 없는 페이지 (버튼·링크 ${probe.actions}개) — ${t.url}\n      사용처: ${t.usedBy.join(", ")}`
          );
        } else {
          cache[t.url] = { ok: true, checkedAt: new Date().toISOString(), title };
          console.log(`  ✓ ${title.slice(0, 40)} — ${t.url.slice(0, 70)}`);
        }
      } catch (e: any) {
        problems.push(
          `열기 실패 (${e.message.split("\n")[0]}) — ${t.url}\n      사용처: ${t.usedBy.join(", ")}`
        );
      }
    }
    await browser.close();
  }

  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 1));

  if (problems.length) {
    console.log(`\n[verify-links] 실패 ${problems.length}건`);
    problems.forEach((p) => console.log("  ✗ " + p));
    process.exit(1);
  }
  console.log(`\n[verify-links] 통과 — ${targets.length}종 전부 살아 있는 행동 페이지입니다`);
}

main().catch((err) => {
  console.error("[verify-links] 실패", err);
  process.exit(1);
});
