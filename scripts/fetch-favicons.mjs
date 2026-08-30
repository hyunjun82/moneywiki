// 배포처 파비콘을 한 번 받아 public/favicons 에 저장한다.
// 런타임에 외부 서비스를 부르지 않기 위해서다 — 남의 서버가 죽으면 우리 화면이 깨진다.
//   node scripts/fetch-favicons.mjs           전체
//   node scripts/fetch-favicons.mjs --limit 10  시험
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "favicons");
const ITEMS_DIR = path.join(ROOT, "src", "data", "download", "items");

const limitArg = process.argv.indexOf("--limit");
const LIMIT = limitArg > -1 ? Number(process.argv[limitArg + 1]) : Infinity;

function allDomains() {
  const set = new Map(); // domain -> 등장 횟수
  for (const f of fs.readdirSync(ITEMS_DIR).filter((x) => x.endsWith(".json"))) {
    const items = JSON.parse(fs.readFileSync(path.join(ITEMS_DIR, f), "utf8"));
    for (const it of items) {
      for (const b of it.builds ?? []) {
        try {
          const h = new URL(b.url).hostname.replace(/^www\./, "");
          set.set(h, (set.get(h) ?? 0) + 1);
        } catch {}
      }
    }
  }
  return [...set.entries()].sort((a, b) => b[1] - a[1]).map(([d]) => d);
}

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";

async function tryFetch(url, ms = 8000) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), ms);
  try {
    const r = await fetch(url, { signal: ac.signal, headers: { "user-agent": UA }, redirect: "follow" });
    if (!r.ok) return null;
    const ct = (r.headers.get("content-type") || "").toLowerCase();
    if (!/image|icon|octet-stream/.test(ct)) return null;
    const buf = Buffer.from(await r.arrayBuffer());
    // 1KB 미만이면 대개 빈 이미지나 오류 페이지다
    if (buf.length < 100) return null;
    const ext = /png/.test(ct) ? "png" : /svg/.test(ct) ? "svg" : /jpe?g/.test(ct) ? "jpg" : "ico";
    return { buf, ext };
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

/** HTML 안의 <link rel="icon"> 을 읽어 실제 주소를 찾는다. /favicon.ico 가 없는 곳이 많다. */
async function fromHtml(domain) {
  for (const scheme of ["https", "http"]) {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), 8000);
    try {
      const r = await fetch(`${scheme}://${domain}/`, {
        signal: ac.signal,
        headers: { "user-agent": UA },
        redirect: "follow",
      });
      if (!r.ok) continue;
      const html = (await r.text()).slice(0, 200000);
      const m = [...html.matchAll(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi)];
      for (const tag of m) {
        const href = /href=["']([^"']+)["']/i.exec(tag[0])?.[1];
        if (!href) continue;
        const abs = new URL(href, r.url).toString();
        const got = await tryFetch(abs);
        if (got) return got;
      }
    } catch {
    } finally {
      clearTimeout(t);
    }
  }
  return null;
}

async function grab(domain) {
  return (
    (await tryFetch(`https://${domain}/favicon.ico`)) ||
    (await tryFetch(`https://www.${domain}/favicon.ico`)) ||
    (await fromHtml(domain))
  );
}

const domains = allDomains().slice(0, LIMIT);
fs.mkdirSync(OUT, { recursive: true });

let ok = 0;
const failed = [];
for (const d of domains) {
  const exists = ["png", "ico", "svg", "jpg"].some((e) => fs.existsSync(path.join(OUT, `${d}.${e}`)));
  if (exists) {
    ok++;
    continue;
  }
  const got = await grab(d);
  if (got) {
    fs.writeFileSync(path.join(OUT, `${d}.${got.ext}`), got.buf);
    ok++;
    console.log(`  ✓ ${d}.${got.ext}  ${(got.buf.length / 1024).toFixed(1)}KB`);
  } else {
    failed.push(d);
    console.log(`  ✗ ${d}`);
  }
}

console.log(`\n성공 ${ok} / ${domains.length}`);
if (failed.length) console.log("실패:", failed.join(", "));
