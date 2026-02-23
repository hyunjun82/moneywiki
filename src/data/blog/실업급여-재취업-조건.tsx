"use client";

import { useState } from "react";
import {
  C, Btn, Info, Divider, Sec, P, B, A,
  TableTitle, TableNote, TH, THL,
  BridgeCard, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext,
  InlineLink, SpokeLink, FormulaCard, CaseBox,
} from "@/components/wiki/BlogShared";

// ── 체커 로직 ──
type ResLink = { icon: string; title: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; links: ResLink[] };

function getResult(sel: Record<string, string>): Res | null {
  const { remaining, tenure } = sel;
  if (!remaining) return null;
  if (remaining === "over-half" && !tenure) return null;

  if (remaining === "under-half") {
    return {
      pass: false,
      headline: "소정급여일수 절반 이상 남아야 해요",
      detail: "조기재취업수당은 소정급여일수의 1/2 이상 남은 상태에서 취업해야 받을 수 있어요. 이미 절반 이상 소진했다면 조기재취업수당은 어려워요.",
      badges: ["소정급여일수 부족", "신청 불가"],
      links: [
        { icon: "📅", title: "소정급여일수 기준표 — 내 기준 일수 확인", href: "/w/실업급여-소정급여일수" },
        { icon: "💰", title: "실업급여 기초일액 계산 방법", href: "/w/실업급여-기초일액" },
      ],
    };
  }

  if (remaining === "unknown") {
    return {
      pass: false,
      headline: "소정급여일수를 먼저 확인해야 해요",
      detail: "고용24에서 현재 남은 소정급여일수를 확인할 수 있어요. 나이와 피보험기간별로 120~270일 중 해당하는 일수를 받아요.",
      badges: ["소정급여일수 미확인"],
      links: [
        { icon: "📅", title: "소정급여일수 기준표 확인", href: "/w/실업급여-소정급여일수" },
      ],
    };
  }

  if (remaining === "over-half" && tenure === "yes") {
    return {
      pass: true,
      headline: "조기재취업수당 신청이 가능해요",
      detail: "취업일로부터 12개월 계속 근무를 완료했다면 바로 신청하면 돼요. 취업일 기준 12개월~14개월 이내에 관할 고용센터에 신청하세요.",
      badges: ["신청 가능", "조건 충족"],
      links: [
        { icon: "💰", title: "실업급여 기초일액 계산 방법", href: "/w/실업급여-기초일액" },
        { icon: "📅", title: "수급기간 계산 — 12개월 기한 확인", href: "/w/실업급여-수급기간-몇개월-받나요" },
      ],
    };
  }

  if (remaining === "over-half" && tenure === "not-yet") {
    return {
      pass: false,
      headline: "12개월 계속 근무를 채워야 해요",
      detail: "조기재취업수당은 취업일로부터 12개월 이상 계속 근무를 완료한 뒤에 신청할 수 있어요. 아직 12개월이 안 됐다면 계속 다니면 돼요.",
      badges: ["근무 유지 중", "12개월 대기"],
      links: [
        { icon: "📅", title: "소정급여일수 기준표", href: "/w/실업급여-소정급여일수" },
      ],
    };
  }

  if (remaining === "over-half" && tenure === "no") {
    return {
      pass: false,
      headline: "12개월 미만 근무라면 신청이 어려워요",
      detail: "조기재취업수당은 취업 후 12개월 이상 계속 근무해야 받을 수 있어요. 12개월 이전에 퇴직했다면 해당되지 않아요.",
      badges: ["근무 기간 부족", "신청 어려움"],
      links: [
        { icon: "📅", title: "소정급여일수 기준표", href: "/w/실업급여-소정급여일수" },
        { icon: "💰", title: "실업급여 기초일액 계산 방법", href: "/w/실업급여-기초일액" },
      ],
    };
  }

  return null;
}

export default function Article() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "조기재취업수당"]}
      tags={["2026년 기준", "실업급여", "조기재취업수당"]}
      date="2026-02-23"
      title="실업급여 조기재취업수당 신청 조건 | 남은 급여 50% 계산 방법"
      description={
        <>
          빨리 취업하면 남은 실업급여의 50%를 일시금으로 받을 수 있어요. <strong style={{ color: C.t1 }}>소정급여일수 절반 이상 남았을 때 취업</strong>하면 조기재취업수당 신청이 가능해요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제64조 · 조기재취업수당 지급기준", date: "2026.02 기준" }}
      stickyLabel="지급 기준"
      stickyValue="남은 급여 50%"
      stickyBtn="수당 계산하기 →"
      stickyHref="https://www.work24.go.kr"
    >
      <TOC items={[
        { t: "조기재취업수당 신청 가능 여부 체크", sub: "남은 일수 · 근무 기간 확인" },
        { t: "실업급여 조기재취업수당 신청 조건이 어떻게 되나요?", sub: null },
        { t: "실업급여 남은 급여 50% 계산 방법은 어떻게 하나요?", sub: "3가지 계산 예시" },
        { t: "실업급여 조기재취업수당 신청 방법과 절차는 어떻게 되나요?", sub: null },
        { t: "조기재취업수당 신청 시 주의사항이 있나요?", sub: null },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "소정급여일수의 <strong>1/2 이상 남은 상태</strong>에서 취업하면 조기재취업수당을 신청할 수 있어요.",
        "지급액은 <strong>남은 소정급여일수 × 1일 지급액 × 50%</strong>예요. 취업 후 12개월 근무 완료 시 지급돼요.",
        "신청 기한은 <strong>취업일로부터 12개월 이후 ~ 14개월 이내</strong>예요. 이 기간을 놓치면 받을 수 없어요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="조기재취업수당 신청 가능 여부 체크" sub="남은 일수와 근무 기간을 선택해 주세요" />

      <P>조기재취업수당을 받으려면 두 가지 조건이 필요해요. 소정급여일수가 절반 이상 남아야 하고, 취업 후 12개월을 계속 근무해야 해요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💼</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>조기재취업수당 신청 가능 여부 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>30초 확인</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              취업 시점에 소정급여일수가 얼마나 남아있었나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="remaining" value="over-half" label="절반 이상 남아있었어요" sel={sel} pick={pick} />
              <Btn group="remaining" value="under-half" label="절반 미만이었어요" sel={sel} pick={pick} />
              <Btn group="remaining" value="unknown" label="잘 모르겠어요" sel={sel} pick={pick} />
            </div>
          </div>
          {sel.remaining === "over-half" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
                <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
                취업 후 12개월 계속 근무를 완료했나요?
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                <Btn group="tenure" value="yes" label="12개월 완료했어요" sel={sel} pick={pick} />
                <Btn group="tenure" value="not-yet" label="아직 12개월이 안 됐어요" sel={sel} pick={pick} />
                <Btn group="tenure" value="no" label="중간에 퇴직했어요" sel={sel} pick={pick} />
              </div>
            </div>
          )}

          {result && (
            <div style={{ marginTop: 16, padding: 16, borderRadius: 8, background: result.pass ? C.navyLight : "#F5F5F5", border: result.pass ? "1px solid rgba(30,58,95,.1)" : `1px solid ${C.line}` }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: result.pass ? C.navy : C.t1, marginBottom: 4 }}>
                {result.pass ? "✅" : "⛔"} {result.headline}
              </div>
              <div style={{ fontSize: 13, color: C.t3, lineHeight: 1.55 }}>{result.detail}</div>
              <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" }}>
                {result.badges.map((b, i) => (
                  <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, background: result.pass ? C.navy : C.t4, color: "#fff" }}>{b}</span>
                ))}
              </div>
              {result.links.length > 0 && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: result.pass ? "1px solid rgba(30,58,95,.08)" : "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.t1, marginBottom: 6 }}>📖 관련 가이드</div>
                  {result.links.map((lnk, li) => (
                    <a key={li} href={lnk.href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", fontSize: 13, color: C.navy, fontWeight: 600, borderBottom: "1px solid rgba(30,58,95,.06)", textDecoration: "none" }}>
                      <span>{lnk.icon} {lnk.title}</span>
                      <span style={{ fontSize: 11, color: C.t4 }}>→</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 02 ── */}
      <Divider />
      <Sec n="SECTION 02" title="실업급여 조기재취업수당 신청 조건이 어떻게 되나요?" sub="4가지 조건 모두 충족해야 해요" />

      <P>조기재취업수당을 받으려면 <B>4가지 조건을 모두 충족</B>해야 해요. 하나라도 빠지면 받을 수 없어요. 주요 조건은 취업 시점의 남은 일수와 취업 후 근무 기간이에요.</P>

      <TableTitle>조기재취업수당 신청 조건</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>조건</THL><TH>기준</TH></tr>
          </thead>
          <tbody>
            {[
              ["소정급여일수 잔여 기준", "취업일 기준 소정급여일수의 1/2 이상 남아있을 것"],
              ["취업 계속 근무", "취업일로부터 12개월 이상 계속 근무 (사업자 등록 포함)"],
              ["수급기간 이내 취업", "이직일로부터 12개월 이내에 취업할 것"],
              ["1회 한정", "이전 수급에서 조기재취업수당을 받지 않았을 것"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 8px", textAlign: "left", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>※ 1회 한정 규정은 생애 동안이 아니라 직전 수급 기준이에요. 재실직 후 새로 수급 중이라면 다시 신청 가능해요.</TableNote>

      <P>취업에는 근로자로 취업하는 것 외에 사업 개시(사업자 등록)도 포함돼요. 자영업을 시작한 경우에도 12개월 이상 유지하면 조기재취업수당을 신청할 수 있어요.</P>

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 남은 급여 50% 계산 방법은 어떻게 하나요?" sub="3가지 계산 예시" />

      <P>조기재취업수당은 간단한 공식으로 계산해요. 얼마나 빨리 취업했느냐에 따라 금액이 크게 달라요. 소정급여일수가 많이 남은 상태에서 취업할수록 더 많이 받아요.</P>

      <FormulaCard
        formula="조기재취업수당 = 남은 소정급여일수 × 1일 지급액 × 50%"
        notes={[
          "2026년 1일 지급액 상한: 68,100원 / 하한: 63,104원",
          "소정급여일수 절반 이상 남아있어야 신청 가능",
          "취업 후 12개월 근무 완료 후 신청",
        ]}
      />

      <div style={{ marginBottom: 8 }}></div>

      <P>3가지 사례로 실제 계산 금액을 확인해 보세요.</P>

      <CaseBox
        badge="예시 1"
        label="이 씨(35세), 소정급여일수 180일 중 100일 남음"
        conditions={["피보험기간: 4년 2개월", "1일 지급액: 55,000원", "취업 시점 잔여: 100일 (절반 이상)✅"]}
        steps={[
          { label: "남은 소정급여일수", value: "100일" },
          { label: "1일 지급액", value: "55,000원" },
          { label: "조기재취업수당", value: "100일 × 55,000원 × 50% = 2,750,000원" },
        ]}
        total="수당: 약 275만원 (취업 후 12개월 근무 완료 시)"
        result="신청 가능 (소정급여일수 절반 이상 남음)"
        pass={true}
      />

      <CaseBox
        badge="예시 2"
        label="김 씨(52세), 소정급여일수 270일 중 200일 남음"
        conditions={["피보험기간: 15년", "1일 지급액: 68,100원 (상한액 적용)", "취업 시점 잔여: 200일 (절반 이상)✅"]}
        steps={[
          { label: "남은 소정급여일수", value: "200일" },
          { label: "1일 지급액 (상한 적용)", value: "68,100원" },
          { label: "조기재취업수당", value: "200일 × 68,100원 × 50% = 6,810,000원" },
        ]}
        total="수당: 약 681만원 (취업 후 12개월 근무 완료 시)"
        result="신청 가능 (상한액 적용, 고액 수당)"
        pass={true}
      />

      <CaseBox
        badge="예시 3"
        label="박 씨(28세), 소정급여일수 150일 중 60일 남음"
        conditions={["피보험기간: 1년 5개월", "1일 지급액: 63,104원 (하한액 적용)", "취업 시점 잔여: 60일 (절반 미만❌)"]}
        steps={[
          { label: "소정급여일수 절반", value: "150일 × 50% = 75일" },
          { label: "잔여 일수", value: "60일 (75일 미만이라 조건 미충족)" },
          { label: "조기재취업수당", value: "신청 불가" },
        ]}
        total="조기재취업수당 신청 불가"
        result="조건 미충족 (절반 미만 남음)"
        pass={false}
      />

      <InlineLink icon="📅" title="실업급여 소정급여일수 기준표 — 내 기준 일수 확인" desc="나이·피보험기간별 120~270일 기준표를 확인할 수 있어요." href="/w/실업급여-소정급여일수" />

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 조기재취업수당 신청 방법과 절차는 어떻게 되나요?" sub="취업 후 12개월 뒤 신청" />

      <P>조기재취업수당은 취업 후 12개월 계속 근무를 완료한 뒤에 신청해요. 취업 즉시 신청하는 게 아니에요. 신청 기한은 <B>취업일로부터 12개월 이후 ~ 14개월 이내</B>예요. 이 기간을 놓치면 신청할 수 없어요.</P>

      <P>신청 방법은 관할 고용센터 방문 또는 고용24 온라인 신청이에요. 필요한 서류는 재직증명서(12개월 이상 재직 확인), 근로계약서, 신분증이에요. 사업자 등록으로 취업한 경우에는 사업자등록증과 실제 사업 영위 확인 서류가 필요해요.</P>

      <P>수당은 신청 후 검토를 거쳐 지급되는 데 보통 1~2주 정도 걸려요. 재직 기간을 위·변조하면 부정수급이 되니 주의해야 해요.</P>

      <Info type="warn">
        취업 신고를 고용센터에 미리 해두지 않으면 나중에 조기재취업수당 신청 시 문제가 될 수 있어요. 취업한 날에 고용센터에 취업 사실을 신고해두는 게 좋아요.
      </Info>

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" title="조기재취업수당 신청 시 주의사항이 있나요?" sub="알아두면 좋은 점" />

      <P>가장 중요한 건 <B>취업일 신고를 빠뜨리지 않는 거예요</B>. 취업한 날 고용센터에 취업 사실을 신고해야 해요. 신고를 안 하면 실업급여를 계속 받게 되는데, 이건 부정수급이 돼요. 취업하는 즉시 신고하는 습관을 들이세요.</P>

      <P>12개월 계속 근무 조건에서 '계속'이라는 말에 주의해야 해요. 중간에 퇴직하거나 계약이 종료됐다가 다시 재입사한 경우에는 계속 근무로 인정되지 않을 수 있어요. 동일 사업장에서 12개월을 연속으로 채워야 해요.</P>

      <P>단기 알바(주 15시간 미만)를 하다가 정규 취업으로 전환된 경우에는 정규 취업일 기준으로 판단해요. 단기 알바 기간이 12개월에 합산되지 않아요. 취업일 기준이 헷갈리면 고용센터에 먼저 문의하세요.</P>

      <div style={{ margin: "20px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 8 }}>📖 실업급여 더 알아보기</div>
        <SpokeLink num="01" title="실업급여 소정급여일수 기준표" desc="나이·피보험기간별 120~270일 기준" href="/w/실업급여-소정급여일수" />
        <SpokeLink num="02" title="실업급여 기초일액 계산 방법" desc="1일 지급액 계산 공식과 상·하한액" href="/w/실업급여-기초일액" />
        <SpokeLink num="03" title="실업급여 수급기간 몇개월 받나" desc="이직 후 12개월 기한 계산 방법" href="/w/실업급여-수급기간-몇개월-받나요" />
      </div>

      <a href="https://www.work24.go.kr" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-blue">
        <span className="ext-btn-badge">고용24 공식</span>
        <span className="ext-btn-text">조기재취업수당 신청</span>
        <span className="ext-btn-cta">신청하기 →</span>
      </a>

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 조기재취업수당 신청 조건이 어떻게 되나요?", a: "소정급여일수의 1/2 이상 남은 상태에서 취업하고, 취업 후 12개월 이상 계속 근무를 완료해야 해요. 수급기간(12개월) 이내 취업이어야 하고, 이전 수급에서 받지 않은 경우에 해당해요." },
        { q: "실업급여 남은 급여 50% 계산 방법이 어떻게 되나요?", a: "남은 소정급여일수 × 1일 지급액 × 50%예요. 취업일 기준으로 남은 일수가 많을수록 수당이 커요. 예를 들어 100일 남았고 1일 지급액이 55,000원이라면 100 × 55,000 × 0.5 = 2,750,000원이에요." },
      ]} />

      <RelatedArticles items={[
        { title: "실업급여 소정급여일수 기준표", desc: "실업급여 · 소정급여일수", href: "/w/실업급여-소정급여일수" },
        { title: "실업급여 기초일액 계산 방법", desc: "실업급여 · 기초일액", href: "/w/실업급여-기초일액" },
        { title: "실업급여 알바 가능 여부 — 월 60시간 기준", desc: "실업급여 · 알바 규정", href: "/w/실업급여-받으면서-알바" },
      ]} />

      <PrevNext
        prev={{ title: "알바 미신고 부정수급 처벌", href: "/w/실업급여-알바-미신고" }}
        next={undefined}
      />
    </BlogLayout>
  );
}
