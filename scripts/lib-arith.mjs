/**
 * 파생값 산식 검산 — exampleNote 에 적힌 "결과 = 식" 을 실제로 계산해 본다.
 *
 * 지금까지 게이트는 파생값에 산식이 "적혀 있는지"만 봤다. 66,048 을 66,480 으로 잘못 적어도
 * 산식만 그럴듯하면 통과했다. 여기서는 식을 실제로 계산해 결과와 맞는지 본다.
 *
 * 다루는 표기: 1,234 · 1만3500 · 11만3500원 · 8시간 · 30일 · 80% · 100분의 80 · × ÷ + − · 괄호
 * 못 읽는 조각은 건너뛴다(실패가 아니다). 읽었는데 값이 다르면 그것만 오류다.
 *
 * "표기 환산: 11만3500원 = 113,500원" 처럼 양쪽이 같은 값이면 통과.
 * "약 341만 원 = 113,500×90÷3" 처럼 '약' 이 붙으면 1% 오차를 허용한다.
 */

/** 한국식 숫자 표기를 수로 — "11만3500원" → 113500, "1,234" → 1234, "341만 원" → 3410000 */
export function koNumber(tok) {
  let t = String(tok).replace(/[원일시간회주개월년명건장]/g, "").replace(/\s+/g, "").trim();
  if (!t) return null;
  // 억/만 단위
  let total = 0, matched = false;
  const eok = t.match(/^(\d[\d,]*\.?\d*)억/);
  if (eok) { total += parseFloat(eok[1].replace(/,/g, "")) * 1e8; t = t.slice(eok[0].length); matched = true; }
  const man = t.match(/^(\d[\d,]*\.?\d*)만/);
  if (man) { total += parseFloat(man[1].replace(/,/g, "")) * 1e4; t = t.slice(man[0].length); matched = true; }
  if (t) {
    if (!/^\d[\d,]*\.?\d*$/.test(t)) return matched ? total : null;
    total += parseFloat(t.replace(/,/g, ""));
  }
  return total;
}

/** 식 하나를 계산 — 못 읽으면 null.
 *  한국어 라벨("최저임금 10,320 × 1일 소정근로시간 8시간")은 건너뛴다.
 *  숫자 두 개가 연산자 없이 붙어 있으면 뜻이 애매하므로 계산하지 않는다(null). */
export function evalExpr(expr) {
  let e = String(expr).replace(/퍼센트/g, "%").replace(/100분의\s*(\d+)/g, (_, n) => `(${n}/100)`);
  // 토큰: 숫자(한국식 단위 포함) · 연산자 · 괄호 · 퍼센트. 그 밖의 글자는 라벨로 보고 버린다.
  const re = /(\d[\d,]*\.?\d*(?:억)?(?:\d[\d,]*)?(?:만)?(?:\d[\d,]*)?(?:원|일|시간|회|주|개월|년)?)|([×xX＊*÷\/+\-−–—()%])|([가-힣a-zA-Z]+)|(\s+)/g;
  const toks = [];
  let m, consumed = 0;
  while ((m = re.exec(e)) !== null) {
    consumed += m[0].length;
    if (m[1]) toks.push({ t: "num", v: koNumber(m[1]) });
    else if (m[2]) {
      const c = m[2];
      if (c === "%") { const last = toks[toks.length - 1]; if (!last || last.t !== "num") return null; last.v = last.v / 100; }
      else toks.push({ t: "op", v: /[×xX＊*]/.test(c) ? "*" : c === "÷" ? "/" : /[−–—]/.test(c) ? "-" : c });
    }
    // m[3] 라벨, m[4] 공백 — 버린다
  }
  if (consumed !== e.length) return null;
  if (toks.some((t) => t.t === "num" && t.v === null)) return null;
  // 숫자가 연산자 없이 연달아 오면 애매하다 — 계산하지 않는다
  for (let i = 1; i < toks.length; i++) if (toks[i].t === "num" && toks[i - 1].t === "num") return null;
  const src = toks.map((t) => (t.t === "num" ? String(t.v) : t.v)).join("");
  if (!src || !/^[\d.()+\-*/]+$/.test(src)) return null;
  try {
    // eslint-disable-next-line no-new-func
    const v = Function(`"use strict"; return (${src});`)();
    return Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

/**
 * exampleNote 전체에서 "결과 = 식" 조각을 찾아 검산한다.
 * 반환: { checked, ok, bad: [{ lhs, rhs, expected, got }] }
 */
export function checkNote(note) {
  const out = { checked: 0, ok: 0, bad: [], skipped: 0 };
  if (!note) return out;
  // 조각은 중점(·)·세미콜론·줄바꿈으로만 나눈다. 쉼표로 나누면 천 단위 구분(66,048)이 깨진다.
  // 쉼표는 뒤에 공백이 올 때만 분리한다 — 천 단위 구분(66,048)은 쉼표 뒤에 공백이 없다.
  const pieces = String(note).split(/[·;\n]|,\s+/);
  for (const raw of pieces) {
    const piece = raw.trim();
    if (!piece.includes("=")) continue;
    const eq = piece.indexOf("=");
    const left = piece.slice(0, eq).trim();
    const right = piece.slice(eq + 1).trim();
    if (!left || !right) continue;

    const approx = /약/.test(piece);
    const hasOp = (t) => /[×÷+−–—*\/xX]/.test(t);

    let lhs = null, rhs = null;
    if (hasOp(right) || !hasOp(left)) {
      // "상한 68,100 = 113,500 × 100분의 60" — 왼쫌 끝의 수, 오른쪽은 식
      const li = left.search(/\d/);
      if (li >= 0) lhs = evalExpr(left.slice(li).replace(/^약\s*/, ""));
      rhs = evalExpr(right.replace(/^약\s*/, ""));
    } else {
      // "6시간 61,920×80%=49,536" — 왼쪽 마지막 덩어리가 식, 오른쪽이 수
      const chunks = left.split(/\s+/);
      const exprChunk = [...chunks].reverse().find(hasOp) || "";
      rhs = evalExpr(exprChunk);
      lhs = evalExpr(right.replace(/^약\s*/, ""));
    }
    if (lhs === null || rhs === null) { out.skipped++; continue; }
    out.checked++;
    const tol = approx ? Math.max(1, Math.abs(lhs) * 0.01) : 0.5;
    if (Math.abs(lhs - rhs) <= tol) out.ok++;
    else out.bad.push({ lhs, rhs, piece: piece.slice(0, 90) });
  }
  return out;
}
