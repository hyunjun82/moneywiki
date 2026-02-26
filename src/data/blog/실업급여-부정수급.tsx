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
  const { type, status } = sel;
  if (!type || !status) return null;

  if (type === "solo" && status === "before") return {
    pass: true,
    headline: "자진신고하면 추가징수 면제 + 처벌 감경 가능해요",
    detail: "조사 전 자진신고하면 추가 징수가 면제되고, 형사처벌도 양형에 참작될 수 있어요. 빨리 신고할수록 유리해요.",
    badges: ["추가징수 면제", "양형 참작"],
    links: [
      { icon: "🔗", title: "고용24 자진신고", href: "https://www.work24.go.kr/cm/c/d/UECMCDA0101.do" },
      { icon: "📄", title: "반환 징수 기준", href: "/w/실업급여-부정수급-반환-및-징수-기준" },
    ],
  };

  if (type === "solo" && status === "investigation") return {
    pass: false,
    headline: "3년 이하 징역 또는 3천만원 이하 벌금이에요",
    detail: "조사가 시작됐으면 자진신고 혜택이 제한돼요. 경위서를 성실하게 작성하고 반환 의사를 밝히면 양형에 도움이 될 수 있어요.",
    badges: ["3년 이하 징역", "3천만원 벌금"],
    links: [
      { icon: "📄", title: "심사청구 방법", href: "/w/실업급여-심사청구-및-재심사청구-방법" },
    ],
  };

  if (type === "solo" && status === "prosecuted") return {
    pass: false,
    headline: "초범·금액에 따라 벌금형 가능성이 있어요",
    detail: "초범이고 금액이 크지 않으면 벌금형이나 선고유예로 끝나는 경우가 많아요. 변호사 선임 후 양형 자료를 준비하는 게 중요해요.",
    badges: ["벌금형 가능", "양형 자료 준비"],
    links: [
      { icon: "📄", title: "반환 징수 기준", href: "/w/실업급여-부정수급-반환-및-징수-기준" },
    ],
  };

  if (type === "employer" && status === "before") return {
    pass: false,
    headline: "사업주 공모는 자진신고 혜택이 제한돼요",
    detail: "사업주와 공모한 경우 5년 이하 징역 또는 5천만원 벌금까지 올라가요. 법률 상담을 먼저 받아보는 게 좋아요.",
    badges: ["5년 이하 징역", "법률 상담 권장"],
    links: [
      { icon: "📄", title: "반환 징수 기준", href: "/w/실업급여-부정수급-반환-및-징수-기준" },
    ],
  };

  if (type === "employer" && (status === "investigation" || status === "prosecuted")) return {
    pass: false,
    headline: "5년 이하 징역 또는 5천만원 이하 벌금이에요",
    detail: "사업주 공모 부정수급으로 기소된 경우 형량이 무거워요. 변호사 선임 후 대응하는 게 중요해요.",
    badges: ["5년 이하 징역", "변호사 선임 권장"],
    links: [
      { icon: "📄", title: "부정수급 적발 사례", href: "/w/실업급여-부정수급-적발-사례" },
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
      breadcrumb={["홈", "실업급여", "부정수급 형사처벌"]}
      tags={["2026년 기준", "실업급여", "부정수급"]}
      date="2026-02-23"
      title="실업급여 부정수급 형사처벌 기준 | 자진신고 처벌 감경 방법"
      description={
        <>
          구직활동 실적을 조금 부풀렸는데, 형사처벌까지 받을 수 있는 걸까요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제116조</A>에 따르면 단독 부정수급은 <strong style={{ color: C.t1 }}>3년 이하 징역 또는 3천만원 이하 벌금</strong>이에요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제116조 · 제62조", date: "2026.02 기준" }}
      stickyLabel="자진신고"
      stickyValue="감경 가능"
      stickyBtn="고용24 자진신고 →"
      stickyHref="https://www.work24.go.kr/cm/c/d/UECMCDA0101.do"
    >
      <TOC items={[
        { t: "내 부정수급 처벌 수위 체크", sub: "유형 × 상황별 간편 확인" },
        { t: "실업급여 부정수급 형사처벌은 어느 정도인가요?", sub: null },
        { t: "실업급여 부정수급 형사처벌 기준은 무엇인가요?", sub: "고발 여부 판단 3요소" },
        { t: "실업급여 부정수급 자진신고하면 어떻게 되나요?", sub: null },
        { t: "실업급여 부정수급 처벌 감경 방법은 뭐예요?", sub: null },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "단독 부정수급 형사처벌: <strong>3년 이하 징역 또는 3천만원 이하 벌금</strong>",
        "사업주 공모 부정수급: <strong>5년 이하 징역 또는 5천만원 이하 벌금</strong> (2019년 강화)",
        "자진신고 시 추가징수 면제 + 형사처벌 양형 참작 가능",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="내 부정수급 처벌 수위는?" sub="30초 확인 — 유형과 상황을 선택하면 바로 알 수 있어요" />

      <P>부정수급 유형과 상황에 따라 처벌 수위가 달라져요. 내 상황에 맞는 기준을 확인해 보세요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x2714;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>부정수급 처벌 수위 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>유형 × 상황별 확인</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              부정수급 유형은 어떤가요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="type" value="solo" label="혼자 부정수급" sel={sel} pick={pick} />
              <Btn group="type" value="employer" label="사업주와 공모" sel={sel} pick={pick} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
              현재 상황은 어떤가요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="status" value="before" label="아직 적발 전" sel={sel} pick={pick} />
              <Btn group="status" value="investigation" label="조사 통보 받음" sel={sel} pick={pick} />
              <Btn group="status" value="prosecuted" label="고발·기소됨" sel={sel} pick={pick} />
            </div>
          </div>

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
      <Sec n="SECTION 02" title="실업급여 부정수급 형사처벌은 어느 정도인가요?" sub="혼자 하면 3년, 사업주와 함께하면 5년이 상한이에요" />

      <P><A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제116조</A>에 따르면, 거짓이나 부정한 방법으로 실업급여를 받은 사람은 3년 이하의 징역 또는 3천만원 이하의 벌금에 처해요. 이건 형법상 사기죄와는 별개로, 고용보험법에서 정한 특별 형사처벌 규정이에요.</P>

      <P>사업주가 부정수급에 공모한 경우에는 처벌이 더 무거워져요. 2019년 개정으로 사업주 공모형 부정수급은 <B>5년 이하 징역 또는 5천만원 이하 벌금</B>으로 형량 상한이 올라갔어요. 허위 이직확인서를 발급한 사업주도 같은 처벌을 받을 수 있어요.</P>

      <P>형사처벌과 별도로 행정 처분(반환 + 추가 징수)도 동시에 진행돼요. 형사 벌금과 행정 추가 징수는 별개이기 때문에, 벌금 + 추가 징수가 동시에 나올 수 있어요.</P>

      <InlineLink icon="💰" title="반환 징수 기준 — 최대 5배 추가 징수" desc="형사처벌 외에 돈으로 내야 하는 금액, 횟수별 징수 배율을 정리했어요." href="/w/실업급여-부정수급-반환-및-징수-기준" />

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 부정수급 형사처벌 기준은 무엇인가요?" sub="고발 여부를 결정하는 3가지 요소" />

      <P>모든 부정수급이 형사처벌로 이어지는 건 아니에요. 고용센터가 사건을 검찰에 고발해야 수사가 시작되는 구조이고, 고발 여부를 결정하는 핵심 요소가 세 가지 있어요.</P>

      <TableTitle>고발 여부를 결정하는 3가지 요소</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>판단 요소</THL><TH>고발 가능성 높음</TH><TH>고발 가능성 낮음</TH></tr>
          </thead>
          <tbody>
            {[
              ["고의성", "의도적 허위 서류 제출", "신고 기준 착오·실수"],
              ["부정수급 금액", "수백만~수천만원 이상", "소액 단발성"],
              ["횟수", "반복적·장기간", "1~2회 단발"],
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

      <P>취업 사실을 알면서 의도적으로 미신고한 경우, 실제로 지원하지 않은 채용공고를 허위로 제출한 경우, 사업주와 공모해서 이직 사유를 조작한 경우 등이 고의성이 있는 부정수급으로 판단돼요.</P>

      <P>반면에 임시 소득이 생긴 사실을 몰랐거나 신고 기준을 잘못 이해한 경우는 고의성이 낮은 것으로 볼 수 있어요. 이 경우에도 반환 의무는 있지만, 형사고발까지 이어질 가능성은 낮아요.</P>

      <Info type="warn">{'<strong>고용센터가 먼저 사실 조사를 해요.</strong> 조사 결과에 따라 반환 명령, 추가 징수, 형사고발 중 하나 또는 여러 개가 동시에 진행될 수 있어요. 형사처벌을 안 받아도 반환과 추가 징수 의무는 사라지지 않아요.'}</Info>

      <InlineLink icon="📄" title="부정수급 적발 사례" desc="취업 미신고부터 허위 구직활동까지, 유형별 적발 사례와 처리 과정을 정리했어요." href="/w/실업급여-부정수급-적발-사례" />

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 부정수급 자진신고하면 어떻게 되나요?" sub="추가징수 면제 + 양형 참작 두 가지 혜택이에요" />

      <P>적발되기 전에 자진신고하면 두 가지 큰 혜택이 있어요. 첫째, 행정적으로 추가 징수(100~200%)가 면제돼요. 받은 급여 전액만 반환하면 되니까 금전적 부담이 확 줄어요.</P>

      <P>둘째, 형사처벌에서도 자진신고 사실이 양형에 참작돼요. 고발 자체가 안 되거나, 고발되더라도 형량이 감경될 수 있어요. 경미한 사안이면 형사처벌 없이 행정 처분(반환)만으로 마무리되는 경우도 있어요.</P>

      <P>자진신고는 <A href="https://www.work24.go.kr/cm/c/d/UECMCDA0101.do">고용24</A> 온라인 또는 고용센터 방문으로 할 수 있어요. 신고 시 부정수급 경위, 기간, 금액 등을 기재하면 되고, 접수 후 담당자가 금액을 확정해서 반환 절차를 안내해 줘요.</P>

      <P><B>조사가 시작된 후에는 자진신고 혜택을 받을 수 없어요.</B> 부정수급이 의심되는 상황이라면 조사 통보를 받기 전에 빨리 신고하는 게 유리해요. 고용센터 상담전화(1350)로 먼저 문의할 수도 있어요.</P>

      <Info type="tip">{'<strong>자진신고 ≠ 형사처벌 면제.</strong> 자진신고로 추가 징수는 면제되지만, 형사처벌 면제가 자동으로 보장되는 건 아니에요. 다만 양형에서 유리하게 작용할 수 있어요.'}</Info>

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" title="실업급여 부정수급 처벌 감경 방법은 뭐예요?" sub="양형에 영향을 미치는 요소들이에요" />

      <P>형사처벌이 진행되더라도 감경받을 수 있는 방법이 있어요. 실제 재판에서 양형에 영향을 미치는 요소들이에요. 벌금형으로 끝나느냐, 징역형(실형/집행유예)이 되느냐는 이런 요소들이 종합적으로 작용해요.</P>

      <P>초범 여부는 양형에 큰 영향을 줘요. 초범이고 금액이 크지 않으면 벌금형이나 선고유예로 끝나는 경우가 많아요. 반복범이면 실형 가능성이 올라가요. 벌금형이라도 전과에 해당돼요. 다만 선고유예를 받으면 일정 기간 후 면소돼요.</P>

      <P>내 상황에 맞는 대응은 이래요. 아직 적발 전이라면 자진신고가 가장 유리해요. 조사 통보를 받았다면 경위서 성실 작성과 즉시 반환 의사를 표시하는 게 좋아요. 고발·기소됐다면 변호사 선임 후 양형 자료(초범·반성·반환 등)를 준비해야 해요.</P>

      <BridgeCard
        question="실제로 어떤 처벌을 받은 사례가 있나요?"
        body={<>취업 미신고부터 허위 구직활동까지, 유형별 적발 사례와 실제 처벌 결과를 정리했어요. <strong style={{ color: C.navy }}>취업 미신고가 가장 흔한 적발 유형</strong>이에요.</>}
        btnText="적발 사례와 처벌 결과 보기 →"
        href="/w/실업급여-부정수급-적발-사례"
      />

      <div style={{ margin: "20px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 8 }}>{"📖 실업급여 부정수급 더 알아보기"}</div>
        <SpokeLink num="01" title="실업급여 부정수급 반환 징수 기준" desc="횟수별 추가 징수 배율과 반환 금액 계산" href="/w/실업급여-부정수급-반환-및-징수-기준" />
        <SpokeLink num="02" title="실업급여 알바 미신고 부정수급 처벌" desc="알바 미신고 시 환수 기준과 자진신고 방법" href="/w/실업급여-알바-미신고" />
      </div>

      <ExtBtn badge="고용24 공식" text="부정수급 자진신고" cta="신고하기 →" href="https://www.work24.go.kr/cm/c/d/UECMCDA0101.do" />

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 부정수급 고발은 누가 하나요?", a: '고용센터(고용노동부)가 수사기관에 고발해요. 모든 부정수급이 형사처벌로 이어지는 건 아니고, <strong>규모·횟수·고의성</strong>을 고려해서 고발 여부를 결정해요.' },
        { q: "실업급여 부정수급 전과기록이 남나요?", a: '형사처벌을 받으면 전과기록이 남아요. 벌금형이라도 전과에 해당돼요. 다만 <strong>자진신고로 형사처벌을 피하면</strong> 전과기록은 남지 않아요.' },
      ]} />

      <RelatedArticles items={[
        { title: "실업급여 부정수급 반환 징수 기준", desc: "실업급여 · 부정수급", href: "/w/실업급여-부정수급-반환-및-징수-기준" },
        { title: "실업급여 부정수급 적발 사례", desc: "실업급여 · 적발 사례", href: "/w/실업급여-부정수급-적발-사례" },
        { title: "실업급여 알바 미신고 환수", desc: "실업급여 · 부정수급", href: "/w/실업급여-알바-미신고" },
      ]} />

      <PrevNext
        prev={{ title: "부정수급 반환·징수 기준", href: "/w/실업급여-부정수급-반환-및-징수-기준" }}
        next={{ title: "실업급여 비과세 소득", href: "/w/실업급여-비과세" }}
      />
    </BlogLayout>
  );
}
