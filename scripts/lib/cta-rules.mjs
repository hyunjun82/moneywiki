/**
 * 버튼 주소 규칙 — 버튼 이름이 약속한 일을 그 주소가 실제로 하는가.
 *
 * 2026-09-14: 실업급여 28편 버튼 81개 중 66개가 고용24 첫 화면·제도안내 화면·노동포털 진정서
 * 세 곳에 몰렸다. "상병급여 신청하기"가 체불 진정서로, "모의계산하기"가 본문이 빈 안내 화면으로 갔다.
 * 원인은 둘이었다.
 *   · 설계 프롬프트가 받던 등록부는 '근거로 쓴 출처' 목록(쓴 글 수 순)인데, 규칙이 그 목록을 버튼에 쓰라고 했다.
 *     많이 쓰인 빈 안내 화면이 맨 위에 올라가 다음 글에서 또 골렸다.
 *   · 버튼 점검(stageCtaCheck·verify-rendered)은 도착 화면에 '신청' 같은 말이 하나라도 있으면 통과시켰다.
 *     진정서 화면에도 "신청하기"가 있다. 이름과 화면이 같은 일인지는 아무도 보지 않았다.
 *
 * 그래서 고용24·노동포털 버튼은 확인된 행동 화면(scripts/cta-registry.json)만 쓰고,
 * 버튼 이름에 그 화면의 말이 들어가야 한다. 기관 첫 화면·제도안내·POST 전용 주소는 어느 경우든 금지.
 * check-draft(글 쓰기 전)·verify-rendered(화면)·stageCtaCheck(설계 직후)가 같은 규칙을 쓴다.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REG = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "cta-registry.json");
let cache = null;

export function ctaRegistry() {
  if (!cache) cache = JSON.parse(fs.readFileSync(REG, "utf8"));
  return cache;
}

const norm = (u) => String(u || "").trim().replace(/\/+$/, "");

/** 규칙 위반 설명 목록. 비어 있으면 통과. 내부 링크·그 밖의 도메인은 막힌 주소만 본다. */
export function ctaProblems({ label, url }) {
  const reg = ctaRegistry();
  const u = String(url || "").trim();
  let host = "";
  try { host = new URL(u).hostname.replace(/^www\./, ""); } catch { return []; }
  for (const b of reg.blocked) {
    if (new RegExp(b.pattern).test(u)) return [`주소가 ${b.why}: ${u}`];
  }
  if (!reg.managedDomains.some((d) => host === d || host.endsWith("." + d))) return [];
  const screen = reg.screens.find((s) => norm(s.url) === norm(u));
  if (!screen) return [`${host} 버튼은 행동 화면 등록부(scripts/cta-registry.json)의 주소만 씀 — 등록부에 없음: ${u}`];
  // 띄어쓰기는 보지 않는다 — "사전교육"과 "사전 교육"은 같은 말이다
  const squash = (x) => String(x || "").replace(/\s+/g, "");
  if (!new RegExp(squash(screen.keywords)).test(squash(label))) {
    return [`이름이 도착 화면("${screen.label}")과 다른 일을 약속함 — 이름에 /${screen.keywords}/ 가 있어야 함`];
  }
  return [];
}
