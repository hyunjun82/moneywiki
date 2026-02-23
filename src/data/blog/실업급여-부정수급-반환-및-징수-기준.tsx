"use client";

import { useState } from "react";
import {
  C, Btn, Info, Divider, Sec, P, B, A, H3,
  TableTitle, TableNote, TH, THL,
  BridgeCard, ExtBtn, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext,
  InlineLink, SpokeLink,
} from "@/components/wiki/BlogShared";

// ── 체커 로직 ──
type ResLink = { icon: string; title: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; links: ResLink[] };

function getResult(sel: Record<string, string>): Res | null {
  const { timing, type } = sel;
  if (!timing) return null;

  if (timing === "unsure") return {
    pass: false,
    headline: "고용센터에 먼저 상담받아 보세요",
    detail: "부정수급 해당 여부가 불확실하면 고용센터(1350)에 먼저 상담을 받는 게 좋아요. 자진신고 가능 여부도 함께 알아보면 추가 징수를 줄일 수 있어요.",
    badges: ["상담 권장"],
    links: [
      { icon: "🔗", title: "고용24 부정수급 안내", href: "https://www.work24.go.kr/cm/c/d/UECMCDA0101.do" },
    ],
  };

  if (!type) return null;

  if (timing === "before" && type === "solo") return {
    pass: true,
    headline: "자진신고하면 추가 징수가 면제돼요",
    detail: "조사가 시작되기 전에 자진신고하면 받은 급여 전액만 반환하면 돼요. 추가 징수(100~200%)는 면제돼요.",
    badges: ["전액 반환만", "추가징수 면제"],
    links: [
      { icon: "🔗", title: "고용24 자진신고", href: "https://www.work24.go.kr/cm/c/d/UECMCDA0101.do" },
      { icon: "📄", title: "부정수급 형사처벌 기준", href: "/w/실업급여-부정수급" },
    ],
  };

  if (timing === "before" && type === "employer") return {
    pass: false,
    headline: "사업주 공모는 자진신고 혜택이 제한돼요",
    detail: "사업주와 공모한 부정수급은 자진신고를 해도 추가 징수 면제가 적용되지 않을 수 있어요. 법률 상담을 먼저 받아보는 게 좋아요.",
    badges: ["혜택 제한", "법률 상담 권장"],
    links: [
      { icon: "📄", title: "부정수급 형사처벌 기준", href: "/w/실업급여-부정수급" },
    ],
  };

  if (timing === "after" && type === "solo") return {
    pass: false,
    headline: "전액 반환 + 최대 200% 추가 징수돼요",
    detail: "단독 부정수급은 횟수에 따라 100~200%까지 추가 징수돼요. 300만원 수급 시 최대 900만원을 내야 해요.",
    badges: ["전액 반환", "최대 200% 추가"],
    links: [
      { icon: "📄", title: "부정수급 적발 사례", href: "/w/실업급여-부정수급-적발-사례" },
      { icon: "📄", title: "심사청구 방법", href: "/w/실업급여-심사청구-및-재심사청구-방법" },
    ],
  };

  if (timing === "after" && type === "employer") return {
    pass: false,
    headline: "사업주 포함 최대 5배 추가 징수돼요",
    detail: "사업주와 공모한 경우 수급자와 사업주가 연대 책임을 져요. 횟수에 따라 최대 500%(5배)까지 추가 징수돼요.",
    badges: ["연대 책임", "최대 5배"],
    links: [
      { icon: "📄", title: "형사처벌 기준", href: "/w/실업급여-부정수급" },
    ],
  };

  return null;
}

export default function Article() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "부정수급 반환·징수"]}
      tags={["2026년 기준", "실업급여", "부정수급"]}
      date="2026-02-23"
      title="실업급여 부정수급 반환 징수 기준 | 추가징수 5배 감면 제도"
      description={
        <>
          구직활동 실적을 좀 부풀렸는데, 적발되면 얼마를 내야 하는 걸까요. 부정수급 적발 시 받은 급여 전액 반환은 기본이고 <strong style={{ color: C.t1 }}>최대 5배까지 추가 징수</strong>가 붙을 수 있어요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제62조 · 고용24", date: "2026.02 기준" }}
      stickyLabel="자진신고"
      stickyValue="고용24"
      stickyBtn="부정수급 자진신고 →"
      stickyHref="https://www.work24.go.kr/cm/c/d/UECMCDA0101.do"
    >
      <TOC items={[
        { t: "내 부정수급 반환·징수 기준 체크", sub: "상황 × 유형별 간편 확인" },
        { t: "실업급여 부정수급 반환 기준은 얼마인가요?", sub: null },
        { t: "실업급여 부정수급 징수 기준은 무엇인가요?", sub: "횟수별 추가 징수 배율" },
        { t: "실업급여 부정수급 추가징수 5배는 어떻게 되나요?", sub: "사업주 공모 시 배율" },
        { t: "실업급여 부정수급 감면 제도는 뭐예요?", sub: null },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "부정수급 적발 시 받은 급여 전액 반환 + 횟수별 <strong>최대 200%</strong> 추가 징수",
        "사업주 공모 부정수급은 <strong>최대 5배</strong> 추가 징수 (연대 책임)",
        "자진신고하면 추가 징수 전액 면제, 통보일 <strong>30일 내</strong> 납부",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="내 부정수급 반환·징수 기준은?" sub="30초 확인 — 상황과 유형을 선택하면 바로 알 수 있어요" />

      <P>부정수급 유형에 따라 반환 금액과 추가 징수 배율이 달라져요. 내 상황에 맞는 기준을 확인해 보세요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x2714;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>부정수급 반환·징수 기준 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>상황 × 유형별 확인</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              현재 상황은 어떤가요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="timing" value="before" label="아직 적발 전 (자진신고 고려)" sel={sel} pick={pick} />
              <Btn group="timing" value="after" label="이미 적발·조사 통보" sel={sel} pick={pick} />
              <Btn group="timing" value="unsure" label="잘 모르겠어요" sel={sel} pick={pick} />
            </div>
          </div>
          {sel.timing && sel.timing !== "unsure" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
                <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
                부정수급 유형은 어떤가요?
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                <Btn group="type" value="solo" label="혼자 부정수급 (취업 미신고 등)" sel={sel} pick={pick} />
                <Btn group="type" value="employer" label="사업주와 공모 (허위 이직확인서 등)" sel={sel} pick={pick} />
              </div>
            </div>
          )}

          {result && (
            <div style={{ marginTop: 16, padding: 16, borderRadius: 8, background: result.pass ? C.navyLight : "#F5F5F5", border: result.pass ? "1px solid rgba(30,58,95,.1)" : `1px solid ${C.line}` }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: result.pass ? C.navy : C.t1, marginBottom: 4 }}>
                {result.pass ? "\u2705" : "\u26D4"} {result.headline}
              </div>
              <div style={{ fontSize: 13, color: C.t3, lineHeight: 1.55 }}>{result.detail}</div>
              <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" }}>
                {result.badges.map((b, i) => (
                  <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, background: result.pass ? C.navy : C.t4, color: "#fff" }}>{b}</span>
                ))}
              </div>
              {result.links.length > 0 && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: result.pass ? "1px solid rgba(30,58,95,.08)" : "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.t1, marginBottom: 6 }}>{"📖 관련 가이드"}</div>
                  {result.links.map((lnk, li) => (
                    <a key={li} href={lnk.href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", fontSize: 13, color: C.navy, fontWeight: 600, borderBottom: "1px solid rgba(30,58,95,.06)", textDecoration: "none" }}>
                      <span>{lnk.icon}{" "}{lnk.title}</span>
                      <span style={{ fontSize: 11, color: C.t4 }}>{"\u2192"}</span>
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
      <Sec n="SECTION 02" title="실업급여 부정수급 반환 기준은 얼마인가요?" sub="부정수급 금액 전부를 돌려내는 게 기본이에요" />

      <P>부정수급이 적발되면 가장 먼저 받은 급여 전액을 반환해야 해요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제62조</A>에서 거짓이나 부정한 방법으로 지급받은 실업급여는 전부 또는 일부의 반환을 명할 수 있다고 정하고 있어요. 실무에서는 부정수급으로 받은 금액 전체가 반환 대상이에요.</P>

      <P>반환 대상은 부정한 방법으로 받은 급여 전체예요. 예를 들어 취업 사실을 숨기고 3개월간 실업급여를 받았다면, 그 3개월치 급여 전액이 반환 대상이에요. 부정행위 이전에 정상적으로 받은 금액은 돌려줄 필요가 없어요.</P>

      <P>반환 명령을 통보받으면 <B>30일 이내에 납부</B>해야 해요. 기한 내에 내지 않으면 체납 처분이 진행될 수 있어요. 다만 한 번에 내기 어려운 경우 고용센터에 분할납부를 신청할 수 있어요.</P>

      <Info type="tip">{'<strong>부정행위 이전 수급분은 반환 대상이 아니에요.</strong> 6개월 수급 중 4개월째부터 부정수급을 했다면, 1~3개월 정상 수급분은 돌려줄 필요 없어요. 4~6개월분만 반환 대상이에요.'}</Info>

      <InlineLink icon="📄" title="부정수급 형사처벌 기준" desc="반환·징수 외에 3년 이하 징역 또는 3천만원 벌금까지 부과될 수 있어요." href="/w/실업급여-부정수급" />

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 부정수급 징수 기준은 무엇인가요?" sub="횟수에 따라 추가 징수 배율이 올라가요" />

      <P>전액 반환은 기본이고, 여기에 추가 징수가 더해져요. 추가 징수 배율은 부정수급 횟수에 따라 달라지는데, <A href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=5&cciNo=2&cnpClsNo=2">찾기쉬운 생활법령정보</A>에서 정리한 기준은 이래요.</P>

      <TableTitle>실업급여 부정수급 횟수별 추가 징수 배율</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>부정수급 횟수</THL><TH>추가 징수 배율</TH><TH>300만원 시 총 부담</TH></tr>
          </thead>
          <tbody>
            {[
              ["3회 미만", "100% (1배)", "600만원"],
              ["3~5회 미만", "150% (1.5배)", "750만원"],
              ["5회 이상", "200% (2배)", "900만원"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 8px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>※ 반환(원금) + 추가 징수(배율)가 합산돼요</TableNote>

      <P>부정수급 유형에 따라 적발 방식도 달라요. 취업 사실 미신고는 4대보험 가입 데이터와 자동 대조되기 때문에 비교적 빨리 적발돼요. 허위 구직활동은 워크넷과 고용24가 실시간 연동되면서 허위 입사지원이 걸리는 경우가 많아요.</P>

      <P>징수 금액은 고용센터에서 결정하고, 경위서 작성과 조사 출석 절차가 따라요. 금액에 이의가 있으면 고용보험 심사청구를 할 수 있어요.</P>

      <Info type="warn">{'<strong>추가 징수는 "벌금"이 아니에요.</strong> 행정적 환수 절차이기 때문에 형사처벌과 별개로 부과돼요. 형사처벌까지 받으면 벌금 + 추가 징수가 동시에 나올 수 있어요.'}</Info>

      <div style={{ margin: "20px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 8 }}>{"📖 부정수급 관련 더 알아보기"}</div>
        <SpokeLink num="01" title="부정수급 형사처벌 기준" desc="3년 이하 징역 또는 3천만원 벌금" href="/w/실업급여-부정수급" />
        <SpokeLink num="02" title="부정수급 적발 사례" desc="유형별 실제 적발 과정" href="/w/실업급여-부정수급-적발-사례" />
        <SpokeLink num="03" title="알바 미신고 환수 기준" desc="취업 사실 미신고 시 처리 과정" href="/w/실업급여-알바-미신고" />
      </div>

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 부정수급 추가징수 5배는 어떻게 되나요?" sub="사업주 공모 시 처벌이 훨씬 무거워요" />

      <P>사업주가 부정수급에 공모한 경우 처벌이 훨씬 무거워져요. 사업주가 이직 사유를 허위로 기재하거나 급여명세서를 조작해서 부정수급을 도운 경우가 대표적이에요. 이런 경우 수급자와 사업주가 연대해서 받은 급여 전액을 반환해야 해요.</P>

      <P>사업주 공모 부정수급의 추가 징수 배율은 횟수에 따라 300%에서 <B>최대 500%(5배)</B>까지 올라가요. 받은 급여가 300만원이라면 추가 징수 최대 1,500만원, 반환까지 합치면 총 1,800만원이에요.</P>

      <TableTitle>실업급여 부정수급 사업주 공모 추가 징수 배율 (최대 5배)</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>부정수급 횟수</THL><TH>추가 징수 배율</TH><TH>300만원 시 총 부담</TH></tr>
          </thead>
          <tbody>
            {[
              ["3회 미만", "300% (3배)", "1,200만원"],
              ["3~5회 미만", "400% (4배)", "1,500만원"],
              ["5회 이상", "500% (5배)", "1,800만원"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 8px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>사업주에게는 형사처벌도 따를 수 있어요. 고용보험법 위반으로 처벌 대상이 되기 때문에, 허위 이직확인서 발급 등에 연루된 사업주는 법적 리스크가 상당해요. 수급자 입장에서도 사업주와 연대 책임이라 사업주가 안 내면 본인에게 청구될 수 있어요.</P>

      <P>놓치기 쉬운 부분인데, 사업주 공모 부정수급은 자진신고 혜택도 제한돼요. 단독 부정수급과 달리 공모 건은 자진신고를 해도 추가 징수 면제가 안 될 수 있어요.</P>

      <InlineLink icon="📄" title="심사청구 방법" desc="징수 금액에 이의가 있을 때 활용할 수 있는 절차예요." href="/w/실업급여-심사청구-및-재심사청구-방법" />

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" title="실업급여 부정수급 감면 제도는 뭐예요?" sub="자진신고하면 추가 징수를 면제받을 수 있어요" />

      <P>적발되기 전에 스스로 신고하면 추가 징수를 면제받을 수 있어요. 이게 자진신고의 핵심 혜택이에요. 받은 급여 전액만 반환하면 되고, 횟수에 따른 추가 징수(100~200%)는 부과되지 않아요. 또한 경미한 사안이면 형사처벌까지 감경받을 수 있어요.</P>

      <P>자진신고는 <A href="https://www.work24.go.kr/cm/c/d/UECMCDA0101.do">고용24</A> 온라인 또는 고용센터 방문으로 할 수 있어요. 신고 시 부정수급 경위, 기간, 금액 등을 기재해야 하고, 접수 후 담당자가 금액을 확정해서 반환 절차를 안내해 줘요.</P>

      <P><B>이미 조사가 시작됐거나 적발 통보를 받은 후에는 자진신고 혜택을 받을 수 없어요.</B> 부정수급이 의심된다면 조사 통보를 받기 전에 먼저 신고하는 게 유리해요. 고용센터(1350)에 전화해서 상담을 먼저 받아볼 수도 있어요.</P>

      <Info type="tip">{'<strong>"단순 실수인데도 부정수급이 되나요?"</strong> 의도 여부와 관계없이 사실관계가 부정수급에 해당하면 반환 대상이에요. 다만 자진신고하면 추가 징수를 면제받을 수 있고, 사안이 경미하면 형사처벌도 감경돼요.'}</Info>

      <BridgeCard
        question="실제로 어떤 경우에 적발되는 건가요?"
        body={<>4대보험 자동 대조부터 워크넷 허위지원 탐지까지, 적발 유형별로 정리했어요. <strong style={{ color: C.navy }}>취업 미신고가 전체 적발의 절반 이상</strong>이에요.</>}
        btnText="적발 사례와 유형 보기 →"
        href="/w/실업급여-부정수급-적발-사례"
      />

      <ExtBtn badge="고용24 공식" text="부정수급 자진신고" cta="신고하기 →" href="https://www.work24.go.kr/cm/c/d/UECMCDA0101.do" />

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 부정수급 반환금을 한 번에 못 내면 어떻게 되나요?", a: '고용센터에 분할납부를 신청할 수 있어요. 납부 능력을 심사해서 허용되는 경우도 있지만, <strong>체납이 계속되면 재산 압류</strong> 등 강제 징수 절차가 진행될 수 있어요.' },
        { q: "실업급여 부정수급 자진신고는 언제까지 가능한가요?", a: '적발되기 전, 정확히는 <strong>조사가 시작되기 전까지</strong> 가능해요. 이미 조사 통보를 받은 후에는 자진신고 혜택이 적용되지 않아요.' },
      ]} />

      <RelatedArticles items={[
        { title: "실업급여 부정수급 형사처벌 기준", desc: "실업급여 · 부정수급", href: "/w/실업급여-부정수급" },
        { title: "실업급여 부정수급 적발 사례", desc: "실업급여 · 적발 사례", href: "/w/실업급여-부정수급-적발-사례" },
        { title: "실업급여 알바 미신고 환수", desc: "실업급여 · 부정수급", href: "/w/실업급여-알바-미신고" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 반복수급 감액", href: "/w/실업급여-반복수급" }}
        next={{ title: "실업급여 부정수급 형사처벌", href: "/w/실업급여-부정수급" }}
      />
    </BlogLayout>
  );
}
