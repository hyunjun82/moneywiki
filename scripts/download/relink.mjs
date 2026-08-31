/**
 * 다운로드 색인의 내부 링크를 다시 짠다.
 *
 * 손보는 것은 세 가지다.
 *  ① 자기 다운로드 버튼과 똑같은 주소를 가리키는 related — 정보가 0인데 게이트(광고)만
 *     건너뛰고 밖으로 내보낸다. 지운다.
 *  ② 우리가 이미 색인한 제품을 밖으로 보내는 related — 안쪽 페이지로 돌린다.
 *  ③ 그렇게 비는 자리를 같은 주제(trail 마지막 칸)의 이웃으로 채운다.
 *     링크를 적게 받은 항목부터 붙여, 아무도 안 가리키던 페이지가 먼저 이어지게 한다.
 *
 * 주제에 짝이 없는 항목은 같은 대분류(trail 첫 칸)에서 구제한다.
 * --write 없이 돌리면 파일을 건드리지 않고 결과만 보여 준다.
 */
import fs from "node:fs";

const CATS = ["software", "driver", "game", "font", "app"];
const DIR = "src/data/download/items";
const TAG = { software: "SW", driver: "DRV", game: "GAME", font: "FONT", app: "APP" };

const byCat = {};
for (const c of CATS) byCat[c] = JSON.parse(fs.readFileSync(`${DIR}/${c}.json`, "utf8"));
const all = CATS.flatMap((c) => byCat[c]);

const href = (it) => `/download/${it.category}/${encodeURIComponent(it.slug)}`;
const host = (u) => { try { return new URL(u).host.replace(/^www\./, ""); } catch { return null; } };
const sub = (it) => canon(it.trail[it.trail.length - 1]);
/**
 * 같은 주제가 다른 이름으로 쪼개져 있다 — "텍스트 편집"과 "텍스트 에디터"에
 * 한 개씩 들어 있는 식이다. 그러면 이웃이 없는 항목이 생긴다.
 *
 * 화면에 보이는 빵부스러기(trail)는 그대로 두고, 링크를 묶을 때만 한 주제로 본다.
 */
const TOPIC_ALIAS = {
  "텍스트 편집": "텍스트 에디터",
  "문서·PDF": "문서", "문서·오피스": "문서", "오피스": "문서",
  "사진 편집": "이미지 편집", "그림": "이미지 편집",
  "이미지 처리": "이미지", "그래픽 유틸리티": "이미지",
  "개인정보 보호": "보안",
  "시스템 관리": "유틸리티", "파일 관리": "유틸리티", "자동화": "유틸리티",
  "생산성": "유틸리티", "접근성": "유틸리티", "바탕화면 꾸미기": "유틸리티",
  "지도": "유틸리티", "아이폰 연결": "유틸리티", "드라이버 관리": "유틸리티",
  "시스템 정리": "PC 최적화",
  "압축": "압축 프로그램",
  "영상 변환": "동영상 변환", "동영상 다운로드": "다운로드 관리",
  "음악 플레이어": "음악",
  "미디어": "미디어 플레이어", "코덱": "미디어 플레이어",
  "음성 편집": "오디오",
  "클라우드 저장소": "클라우드",
  "발표·화면 도구": "화면 캡처",
  "게임 유틸리티": "게임 플랫폼",
  "설계·CAD": "3D 제작",
  "교육": "학습",
  "번역": "AI",
};
const canon = (t) => TOPIC_ALIAS[t] || t;

const top = (it) => it.trail[0];
const key = (h) => decodeURIComponent(h || "");
const isItemLink = (h) => /^\/download\/[^/]+\/.+/.test(h || "");
const innerOf = (it) => it.related.filter((r) => isItemLink(r.href)).length;

/** 배포처 호스트 → 항목. 한 호스트를 여러 항목이 쓰면 이름으로 다시 가린다. */
const sameHost = new Map();
for (const it of all) for (const b of it.builds) {
  const h = host(b.url); if (!h) continue;
  if (!sameHost.has(h)) sameHost.set(h, new Set());
  sameHost.get(h).add(it);
}
const norm = (s) => (s || "").toLowerCase().replace(/[\s·()]/g, "");
function resolveExternal(name, url, self) {
  const cands = [...(sameHost.get(host(url)) || [])].filter((o) => o !== self);
  if (cands.length === 1) return cands[0];
  const n = norm(name);
  if (!n) return null;
  const hit = cands.filter((o) => n.includes(norm(o.titleTop)) || norm(o.titleTop).includes(n));
  return hit.length === 1 ? hit[0] : null;
}

const group = (fn) => { const m = new Map(); for (const it of all) { const k = fn(it); if (!m.has(k)) m.set(k, []); m.get(k).push(it); } return m; };
const subGroups = group(sub);
const topGroups = group(top);

const countInbound = () => {
  const m = new Map(all.map((it) => [it.slug, 0]));
  for (const it of all) for (const r of [...it.related, ...(it.picks || [])]) {
    const hit = key(r.href).match(/^\/download\/[^/]+\/(.+)$/);
    if (hit && m.has(hit[1])) m.set(hit[1], m.get(hit[1]) + 1);
  }
  return m;
};

const stat = { dropped: 0, converted: 0, added: 0, rescued: 0 };

// ①② 밖으로 새는 출구 정리
for (const it of all) {
  const mine = new Set(it.builds.map((b) => b.url));
  it.related = it.related.flatMap((r) => {
    const h = r.href || "";
    if (h.startsWith("/")) return [r];
    if (mine.has(h)) { stat.dropped++; return []; }
    const t = resolveExternal(r.name, h, it);
    if (t) { stat.converted++; return [{ tag: TAG[t.category], name: t.listTitle, href: href(t) }]; }
    return [r];
  });
}

// ③ 같은 주제의 이웃으로 채운다
let inbound = countInbound();
for (const it of all) {
  const want = Math.max(3, innerOf(it));
  const have = new Set(it.related.map((r) => key(r.href)));
  const pool = (subGroups.get(sub(it)) || [])
    .filter((o) => o !== it && !have.has(key(href(o))))
    .sort((a, b) => inbound.get(a.slug) - inbound.get(b.slug));
  for (const o of pool) {
    if (innerOf(it) >= want) break;
    it.related.push({ tag: TAG[o.category], name: o.listTitle, href: href(o) });
    inbound.set(o.slug, inbound.get(o.slug) + 1);
    stat.added++;
  }
}

// ④ 주제에 짝이 없던 항목 구제 — 나가는 쪽
for (const it of all) {
  if (innerOf(it) > 0) continue;
  const have = new Set(it.related.map((r) => key(r.href)));
  const pool = (topGroups.get(top(it)) || [])
    .filter((o) => o !== it && !have.has(key(href(o))))
    .sort((a, b) => inbound.get(a.slug) - inbound.get(b.slug));
  for (const o of pool.slice(0, 3)) {
    it.related.push({ tag: TAG[o.category], name: o.listTitle, href: href(o) });
    inbound.set(o.slug, inbound.get(o.slug) + 1);
    stat.rescued++;
  }
}

// ④ 구제 — 들어오는 쪽. 아무도 안 가리키는 항목은 같은 대분류의 이웃이 가리키게 한다.
inbound = countInbound();
for (const it of all) {
  if (inbound.get(it.slug) > 0) continue;
  const donors = (topGroups.get(top(it)) || [])
    .filter((o) => o !== it && !o.related.some((r) => key(r.href) === key(href(it))))
    .sort((a, b) => innerOf(a) - innerOf(b));
  for (const d of donors.slice(0, 2)) {
    d.related.push({ tag: TAG[it.category], name: it.listTitle, href: href(it) });
    inbound.set(it.slug, inbound.get(it.slug) + 1);
    stat.rescued++;
  }
}

console.log("① 중복 출구 제거 :", stat.dropped);
console.log("② 외부→내부 전환 :", stat.converted);
console.log("③ 이웃 링크 추가 :", stat.added);
console.log("④ 짝 없는 항목 구제:", stat.rescued);

// ── 점검 ──
const slugs = new Set(all.map((x) => x.slug));
const finalInb = countInbound();
const orphans = [...finalInb].filter(([, n]) => n === 0);
let broken = 0;
for (const it of all) for (const r of it.related) {
  const hit = key(r.href).match(/^\/download\/[^/]+\/(.+)$/);
  if (hit && !slugs.has(hit[1])) broken++;
}
console.log("\n고아 남음        :", orphans.length, "/", all.length);
console.log("related 빈 항목  :", all.filter((x) => x.related.length === 0).length);
console.log("깨진 내부 링크   :", broken);
console.log("외부 related 잔여:", all.flatMap((x) => x.related).filter((r) => !(r.href || "").startsWith("/")).length);
const cnt = all.map(innerOf).sort((a, b) => a - b);
console.log("항목당 내부 링크 : 최소", cnt[0], "· 중앙", cnt[Math.floor(cnt.length / 2)], "· 최대", cnt[cnt.length - 1]);
if (orphans.length) orphans.slice(0, 10).forEach(([s]) => console.log("   남은 고아:", s));

if (process.argv[2] === "--write") {
  for (const c of CATS) {
    fs.writeFileSync(`${DIR}/${c}.json`, JSON.stringify(byCat[c], null, 2).replace(/\r?\n/g, "\r\n") + "\r\n", "utf8");
  }
  console.log("\n기록 완료");
} else {
  console.log("\n(시뮬레이션 — 파일은 그대로)");
  for (const s of ["디스코드-다운로드", "알집-다운로드", "구글-어스-다운로드"]) {
    const it = all.find((x) => x.slug === s);
    if (!it) continue;
    console.log(`\n[${it.listTitle}] related:`);
    it.related.forEach((r) => console.log("   ", r.tag, "|", r.name, "→", decodeURIComponent(r.href)));
  }
}
