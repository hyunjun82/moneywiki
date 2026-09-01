/**
 * 죽은 /w/ 링크를 살아 있는 글로 잇는 해석표를 만든다.
 *
 * 왜 필요한가 —
 * 글의 relatedDocs 와 본문 마크다운 링크가 없는 주소를 가리키고 있다.
 * 슬러그를 한글로 바꾸거나(연말정산-sodeukgongje) 표기를 다듬으면서
 * (실업급여-수급조건 → 실업급여-수급-조건) 예전 주소가 그대로 남았다.
 *   relatedDocs 5,413개 중 2,239개 죽음 (고유 1,414)
 *   본문 링크   7,352개 중 2,602개 죽음 (고유 1,258)
 * 링크를 그냥 지우면 글끼리 이어지던 길이 사라지니, 갈 곳이 분명한 것은 살린다.
 *
 * 잇는 근거는 셋뿐이고 전부 "후보가 하나일 때만" 인정한다.
 *   ① 하이픈·공백만 다른 같은 이름
 *   ② 죽은 이름으로 시작하는 글이 딱 하나
 *   ③ 죽은 이름을 품고 있는 글이 딱 하나
 * 후보가 여럿이면 무엇을 고르든 근거가 없으므로 잇지 않는다(그 링크는 글자로 바뀐다).
 *
 * 실행: node scripts/build-link-fixes.mjs [--write]
 * 결과: src/data/link-fixes.json  { "<없는 슬러그>": "<이어줄 슬러그>" }
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "content/wiki";
const OUT = "src/data/link-fixes.json";

const live = new Set();
for (const f of fs.readdirSync(DIR)) if (f.endsWith(".md")) live.add(f.replace(/\.md$/, ""));
try { for (const e of fs.readdirSync("src/app/w", { withFileTypes: true })) if (e.isDirectory()) live.add(e.name); } catch {}

/**
 * 옛 슬러그에 남은 로마자 표기. 165개 주소가 749번 이 표기로 링크돼 있다.
 * 한글로 되돌린 뒤에도 "후보가 유일할 때만" 잇는 규칙은 그대로 적용한다 —
 * 옮긴 이름이 어느 글과도 맞지 않으면 링크하지 않는다.
 */
const ROMAN = {
  sodeukgongje: "소득공제", seaekgongje: "세액공제", seaegongje: "세액공제",
  seaegamyeon: "세액감면", chwieobjaseaegamyeon: "취업자세액감면",
  gongje: "공제", chugagongje: "추가공제", teukbyeolgongje: "특별공제",
  sinnyongkadeu: "신용카드", uiryobi: "의료비", buyanggajok: "부양가족",
  geunrosodeuk: "근로소득", chonggeubeo: "총급여", geubeo: "급여",
  bigwase: "비과세", jeontongsijang: "전통시장", daejonggotong: "대중교통",
  gyoyugbi: "교육비", gyoyukbi: "교육비", matbeori: "맞벌이", bubu: "부부",
  sodeuk: "소득", jangaein: "장애인", jungsogieob: "중소기업", janyeo: "자녀",
  woncheongjingsuyeongsujung: "원천징수영수증", woncheongjingsu: "원천징수",
  gibugeum: "기부금", beomwi: "범위", boheomryo: "보험료",
  geonggangboheomryo: "건강보험료", yeongeumjeochuk: "연금저축",
  gwasepyojun: "과세표준", irp: "IRP", sayongbun: "사용분",
  shilsonboheomgeum: "실손보험금", cheongnyeon: "청년",
  sanhujoriwonbi: "산후조리원비", suryeong: "수령", nanimshisulbi: "난임시술비",
  jutaegimchachaipgeum: "주택임차차입금", chulsan: "출산",
  jonghapsodeukse: "종합소득세", hwanggeubgeum: "환급금",
  daehaksaeng: "대학생", yeongsujeung: "영수증", gugminyeonggeum: "국민연금",
};
/** 슬러그 안의 로마자 조각을 한글로 되돌린다. 모르는 조각은 그대로 둔다. */
const deroman = (s) =>
  s.split("-").map((part) => ROMAN[part.toLowerCase()] ?? part).join("-");

const norm = (s) => s.toLowerCase().replace(/[-_\s·]/g, "");
const liveByNorm = new Map();
for (const s of live) {
  const n = norm(s);
  if (!liveByNorm.has(n)) liveByNorm.set(n, []);
  liveByNorm.get(n).push(s);
}
const liveList = [...live];

/** 죽은 링크를 모은다. relatedDocs(프론트매터)와 본문 양쪽. */
const dead = new Map();
const dec = (s) => { try { return decodeURIComponent(s); } catch { return s; } };
for (const f of fs.readdirSync(DIR)) {
  if (!f.endsWith(".md")) continue;
  const text = fs.readFileSync(path.join(DIR, f), "utf8");
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fm = m ? m[1] : "";
  const body = m ? text.slice(m[0].length) : text;
  for (const mm of fm.matchAll(/url:\s*["']?(\/w\/[^"'\s]+)["']?/g)) {
    const s = dec(mm[1]).slice(3);
    if (!live.has(s)) dead.set(s, (dead.get(s) || 0) + 1);
  }
  for (const mm of body.matchAll(/\]\((\/w\/[^)\s]+)\)/g)) {
    const s = dec(mm[1]).slice(3);
    if (!live.has(s)) dead.set(s, (dead.get(s) || 0) + 1);
  }
}

const fixes = {};
const stat = { same: 0, prefix: 0, contains: 0, giveUp: 0 };
const giveUpTop = [];

for (const [slug, count] of dead) {
  // 로마자 표기를 한글로 되돌린 이름도 함께 시도한다. 먼저 찾는 쪽을 쓴다.
  const tries = [...new Set([slug, deroman(slug)])];
  let hit = null;
  let why = "맞는 글 없음";

  for (const cand of tries) {
    const n = norm(cand);
    if (n.length < 4) { why = "이름이 너무 짧음"; continue; }

    // ① 하이픈·공백만 다른 같은 이름
    const same = liveByNorm.get(n);
    if (same?.length === 1) { hit = [same[0], "same"]; break; }
    if (same?.length > 1) { why = "같은 이름 여럿"; continue; }

    // 이름의 절반도 안 겹치면 "같은 주제"라고 보기 어렵다.
    // 예: /w/신용대출(4자) → /w/개인사업자-신용대출-갈아타기 는 다른 글이다.
    const closeEnough = (target) => n.length / norm(target).length >= 0.5;

    // ② 죽은 이름으로 시작하는 글이 딱 하나
    const starts = liveList.filter((s) => norm(s).startsWith(n));
    if (starts.length === 1) {
      if (closeEnough(starts[0])) { hit = [starts[0], "prefix"]; break; }
      why = "앞부분은 맞지만 범위가 너무 넓음";
      continue;
    }
    if (starts.length > 1) { why = `앞부분 일치 ${starts.length}개`; continue; }

    // ③ 죽은 이름을 품고 있는 글이 딱 하나
    const has = liveList.filter((s) => norm(s).includes(n));
    if (has.length === 1) {
      if (closeEnough(has[0])) { hit = [has[0], "contains"]; break; }
      why = "이름은 품지만 범위가 너무 넓음";
      continue;
    }
    if (has.length > 1) why = `품는 글 ${has.length}개`;
  }

  if (hit) { fixes[slug] = hit[0]; stat[hit[1]]++; }
  else { stat.giveUp++; giveUpTop.push([slug, count, why]); }
}

const linked = stat.same + stat.prefix + stat.contains;
console.log("살아 있는 슬러그:", live.size, "| 죽은 링크(고유):", dead.size);
console.log("  ① 하이픈·공백만 다름 :", stat.same);
console.log("  ② 앞부분이 유일하게 일치:", stat.prefix);
console.log("  ③ 이름을 유일하게 품음 :", stat.contains);
console.log("  잇지 않음(글자로 바꿈) :", stat.giveUp);
console.log(`\n살린 링크 ${linked} / ${dead.size} (${((linked / dead.size) * 100).toFixed(1)}%)`);

// 안전 점검
let bad = 0;
for (const [from, to] of Object.entries(fixes)) {
  if (!live.has(to)) { bad++; console.error("대상이 없음:", from, "→", to); }
  if (from === to) { bad++; console.error("자기 자신:", from); }
}
console.log("잘못된 항목:", bad);
if (bad) process.exit(1);

if (process.argv.includes("--write")) {
  const sorted = {};
  for (const k of Object.keys(fixes).sort()) sorted[k] = fixes[k];
  fs.writeFileSync(OUT, JSON.stringify(sorted, null, 2) + "\n", "utf8");
  console.log("\n기록:", OUT);
} else {
  console.log("\n--- 살린 예시 ---");
  Object.entries(fixes).slice(0, 15).forEach(([a, b]) => console.log(`   /w/${a}  →  /w/${b}`));
  console.log("\n--- 못 살린 상위 ---");
  giveUpTop.sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([s, n, why]) => console.log(`   ${String(n).padStart(3)}회  /w/${s}  (${why})`));
}
