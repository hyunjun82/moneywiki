"use client";

import { useState } from "react";
import {
  C, Btn, Info, Divider, Sec, P, B, A,
  TableTitle, TableNote, TH, THL,
  BridgeCard, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext,
  InlineLink, SpokeLink,
} from "@/components/wiki/BlogShared";

type ResLink = { icon: string; title: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[] };

function getResult(sel: Record<string, string>): Res | null {
  const { elapsed, days } = sel;
  if (!elapsed || !days) return null;

  if (elapsed === "over12") return {
    pass: false,
    headline: "아쉽게도 신청기간 12개월이 지났어요",
    detail: "퇴직일 다음날부터 12개월이 지나면 실업급여를 받을 수 없어요. 질병·출산·병역 등 연장 사유가 있다면 고용센터에 바로 문의해 보세요.",
    badges: ["기한 초과", "연장 사유 확인 필요"],
  };

  if (elapsed === "within3" && days === "short") return {
    pass: true,
    headline: "충분한 시간이 있어요. 빨리 신청할수록 유리해요",
    detail: "퇴직 후 3개월 이내면 소정급여일수(90~120일)를 12개월 안에 모두 받을 수 있어요. 지금 바로 워크넷 구직등록부터 시작하세요.",
    badges: ["기한 내", "여유 있음"],
  };

  if (elapsed === "within3" && days === "long") return {
    pass: true,
    headline: "지금 신청하면 전액 수령 가능해요",
    detail: "3개월 이내 신청이면 소정급여일수 150~240일도 12개월 안에 충분히 받을 수 있어요. 이직확인서 처리가 완료됐는지 먼저 확인해보세요.",
    badges: ["기한 내", "전액 수령 가능"],
  };

  if (elapsed === "3to6" && days === "short") return {
    pass: true,
    headline: "아직 시간이 있어요. 서두르세요",
    detail: "12개월 기준으로 6~9개월 남았어요. 소정급여일수 90~120일이면 충분히 받을 수 있지만, 지금 바로 신청하는 게 안전해요.",
    badges: ["기한 내", "서둘러야 함"],
  };

  if (elapsed === "3to6" && days === "long") return {
    pass: false,
    headline: "지금 신청하면 일부 수령이 가능해요",
    detail: "소정급여일수 150~240일이면 12개월 안에 다 받기 빠듯할 수 있어요. 지금 당장 신청하세요. 미루면 수급일수가 줄어요.",
    badges: ["기한 촉박", "즉시 신청 권장"],
  };

  if (elapsed === "6to12" && days === "short") return {
    pass: true,
    headline: "기한이 얼마 안 남았어요. 오늘 바로 신청하세요",
    detail: "12개월 기한까지 6개월 이하로 남았어요. 소정급여일수 90~120일이면 즉시 신청하는 게 중요해요.",
    badges: ["기한 임박", "즉시 신청"],
  };

  return {
    pass: false,
    headline: "소정급여일수를 다 받기 어려울 수 있어요",
    detail: "기한까지 6개월 미만인데 소정급여일수가 150~240일이면, 기한 안에 전액 수령이 불가능해요. 지금 신청해서 가능한 만큼이라도 받는 게 나아요.",
    badges: ["기한 촉박", "일부 수령 가능"],
  };
}

export default function Article73() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "신청기간"]}
      tags={["2026년 기준", "실업급여", "수급기간 12개월"]}
      date="2026-02-24"
      title="실업급여 신청기간 퇴직 후 12개월 | 실업급여 신청 기한 지나면"
      description={
        <>
          실업급여 신청기간은 퇴직일 다음날부터 <strong style={{ color: C.t1 }}>딱 12개월</strong>이에요. 이 기한을 넘기면 소정급여일수가 남아도 한 푼도 받을 수 없어요. 언제까지 신청해야 하는지 정리했어요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제48조 · 고용24", date: "2026.02 기준" }}
      stickyLabel="기한 계산"
      stickyValue="퇴직일 + 12개월"
      stickyBtn="수급기간 확인 →"
      stickyHref="https://www.work24.go.kr/cm/c/d/CMCDD108L.do"
    >
      <TOC items={[
        { t: "실업급여 신청기간은 퇴직 후 언제까지인가요?", sub: "퇴직 경과 기간 × 소정급여일수 선택" },
        { t: "실업급여 12개월 기한은 어떻게 계산하나요?", sub: "퇴직일 기준, 달력 그대로 12개월" },
        { t: "실업급여 신청기간 넘기면 어떻게 되나요?", sub: null },
        { t: "실업급여 신청기간과 수급기간 차이가 뭐예요?", sub: null },
      ]} />

      <Summary3 items={[
        "신청기간은 퇴직일 다음날부터 <strong>12개월</strong>이에요. 수령까지 이 안에 완료해야 해요.",
        "12개월이 지나면 소정급여일수가 남아도 <strong>소멸</strong>돼요. 기한 초과는 예외 없어요.",
        "질병·출산 등 정당한 사유가 있으면 <strong>최대 4년</strong>까지 연장 신청이 가능해요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" id="s1" title="실업급여 신청기간은 퇴직 후 언제까지인가요?" sub="퇴직 경과 기간과 소정급여일수를 선택하면 바로 알 수 있어요" />

      <P>실업급여 신청기간은 법으로 딱 정해져 있어요. <B>퇴직일 다음날부터 12개월</B> 이내에 실업급여를 전부 수령해야 해요. 신청만 하면 되는 게 아니라, 수령까지 완료해야 한다는 점이 핵심이에요.</P>
      <P>많은 분들이 "언젠가 신청해야지"라고 미루다가 기한을 놓치는 경우가 있어요. 소정급여일수가 90~240일인데 12개월 안에 다 받으려면 생각보다 여유가 없어요. 퇴직 후 6개월이 지났다면 지금 바로 계산해보는 게 중요해요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x1F4C5;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>실업급여 신청기간 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>고용보험법 제48조 기준</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              퇴직 후 얼마나 지났나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const }}>
              <Btn group="elapsed" value="within3" label="3개월 이내" sel={sel} pick={pick} />
              <Btn group="elapsed" value="3to6" label="3~6개월" sel={sel} pick={pick} />
              <Btn group="elapsed" value="6to12" label="6~12개월" sel={sel} pick={pick} />
              <Btn group="elapsed" value="over12" label="12개월 이상" sel={sel} pick={pick} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
              나의 소정급여일수는?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const }}>
              <Btn group="days" value="short" label="90~120일" sel={sel} pick={pick} />
              <Btn group="days" value="long" label="150~240일" sel={sel} pick={pick} />
            </div>
          </div>

          {result && (
            <div style={{ marginTop: 16, padding: 16, borderRadius: 8, background: result.pass ? C.navyLight : "#F5F5F5", border: result.pass ? "1px solid rgba(30,58,95,.1)" : `1px solid ${C.line}` }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: result.pass ? C.navy : C.t1, marginBottom: 4 }}>
                {result.pass ? "✅" : "⚠️"} {result.headline}
              </div>
              <div style={{ fontSize: 13, color: C.t3, lineHeight: 1.55 }}>{result.detail}</div>
              <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" as const }}>
                {result.badges.map((b, i) => (
                  <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, background: result.pass ? C.navy : C.t4, color: "#fff" }}>{b}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 02 ── */}
      <Divider />
      <Sec n="SECTION 02" id="s2" title="실업급여 12개월 기한은 어떻게 계산하나요?" sub="퇴직일이 기준, 달력 그대로 12개월 더하면 돼요" />

      <P>계산 방법은 간단해요. 퇴직일 다음날을 1일로 세서 12개월이 되는 날까지예요. 예를 들어 2025년 4월 1일에 퇴직했다면, 수급기간은 4월 2일부터 2026년 4월 1일까지예요.</P>
      <P>주말이나 공휴일도 별도로 빼지 않아요. 달력 그대로 12개월을 적용해요. 그러니 퇴직일을 정확하게 파악하는 게 먼저예요. 퇴직일은 고용보험 이직확인서에 명시되어 있어요.</P>

      <TableTitle>퇴직일별 수급기간 예시</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>퇴직일</THL><THL>수급 시작일</THL><THL>수급기간 마감일</THL></tr>
          </thead>
          <tbody>
            {[
              ["2025년 1월 31일", "2025년 2월 1일", "2026년 1월 31일"],
              ["2025년 4월 30일", "2025년 5월 1일", "2026년 4월 30일"],
              ["2025년 12월 31일", "2026년 1월 1일", "2026년 12월 31일"],
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
      <TableNote>※ 수급기간은 고용보험법 제48조에서 정하고 있어요.</TableNote>

      <P>소정급여일수 240일인 경우 12개월(약 365일) 안에 240일을 다 받아야 해요. 실업인정일 간격(28일)을 고려하면 약 8~9번의 실업인정을 받아야 해서, 늦게 신청하면 남은 일수가 소멸될 수 있어요.</P>
      <P>퇴직일 바로 다음 날 신청하기 어렵더라도, <B>가능한 빠른 시일 내에 워크넷 구직등록부터 시작</B>하는 게 좋아요. 온라인으로 모두 처리 가능해요.</P>

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" id="s3" title="실업급여 신청기간 넘기면 어떻게 되나요?" sub="소정급여일수가 남아도 12개월 지나면 소멸이에요" />

      <P>12개월 기한을 하루라도 넘기면 소정급여일수가 아무리 많이 남아 있어도 받을 수 없어요. 예를 들어 소정급여일수가 210일인데 12개월 이내에 150일만 받았다면, 남은 60일은 소멸돼요.</P>
      <P>다만, 정당한 사유가 있으면 수급기간을 연장할 수 있어요. 연장 사유는 고용보험법 제48조 2항에서 정하고 있어요.</P>

      <Info type="tip">{'<strong>수급기간 연장 가능 사유:</strong> ① 질병·부상으로 취업 불가 ② 임신·출산·만 6세 이하 육아 ③ 병역 복무 ④ 배우자 동반 해외 이주 ⑤ 천재지변 — 최대 4년까지 연장돼요.'}</Info>

      <P>연장 신청은 연장 사유가 끝난 날로부터 30일 이내에 거주지 관할 고용센터에 신청해야 해요. 미루다가 30일을 넘기면 연장도 불가능하니 주의하세요.</P>
      <P>연장 신청 시 사유를 증명하는 서류(진단서, 출생증명서, 복무확인서 등)를 함께 제출해야 해요. 고용24에서 온라인 신청도 가능해요.</P>

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" id="s4" title="실업급여 신청기간과 수급기간 차이가 뭐예요?" sub="헷갈리는 두 개념, 한 번에 정리해드려요" />

      <P>"신청기간"과 "수급기간"은 실업급여 관련 안내에 자주 등장하는데, 같은 의미로 쓰이고 있어요. 엄밀히 말하면 <B>수급기간</B>이 정식 용어이고, 그 안에 신청과 수령을 모두 완료해야 한다는 뜻이에요.</P>
      <P>소정급여일수는 수급기간 안에서 실제로 급여가 지급되는 날수예요. 수급기간(12개월) 내에 소정급여일수(90~240일)를 소진하지 못하면 남은 일수는 없어져요.</P>

      <TableTitle>실업급여 핵심 기간 비교</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>구분</THL><THL>의미</THL><THL>기간</THL></tr>
          </thead>
          <tbody>
            {[
              ["수급기간", "신청·수령 가능한 유효기간", "퇴직 후 12개월"],
              ["소정급여일수", "실제 급여 지급 일수", "90~240일 (가입기간·나이 기준)"],
              ["대기기간", "수급 시작 전 무급 기간", "7일 (일반 근로자)"],
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
      <TableNote>※ 소정급여일수는 고용보험 가입기간과 이직 당시 나이에 따라 달라져요.</TableNote>

      <P>수급기간 12개월이 소정급여일수보다 항상 길기 때문에, 퇴직 직후 바로 신청하면 소정급여일수를 모두 받을 수 있어요. 문제는 미루다가 기한이 줄어드는 경우예요.</P>
      <P>소정급여일수 240일이라면 퇴직 후 늦어도 2~3개월 안에는 신청을 시작해야 해요. 그래야 12개월 안에 모든 급여를 받을 수 있어요.</P>

      <SpokeLink num="01" title="실업급여 소정급여일수 — 나이·근속별 계산" desc="가입기간과 나이로 내 소정급여일수 확인" href="/w/실업급여-소정급여일수" />

      <a href="https://www.work24.go.kr/cm/c/d/CMCDD108L.do" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-black">
        <span className="ext-btn-badge">고용24 공식</span>
        <span className="ext-btn-text">실업급여 수급기간 연장 신청</span>
        <span className="ext-btn-cta">바로가기 →</span>
      </a>

      <Divider />
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 신청기간 12개월은 언제부터 계산하나요?", a: "퇴직일 다음날부터 시작해요. 예를 들어 2025년 3월 31일 퇴직이면, 4월 1일부터 12개월, 즉 2026년 3월 31일까지가 수급기간이에요." },
        { q: "실업급여 신청기간이 지나면 정말 한 푼도 못 받나요?", a: "맞아요. 12개월 기한을 하루라도 넘기면 소정급여일수가 남아있어도 수급이 불가능해요. 질병·출산·병역 같은 사유가 있다면 연장 신청을 할 수 있어요." },
      ]} />

      <BridgeCard
        question="대기기간 7일도 수급기간에 포함되나요?"
        body={<>대기기간과 수급기간의 관계가 헷갈린다면 <strong style={{ color: C.navy }}>실업급여 대기기간 가이드</strong>에서 정확한 계산 방법을 확인해보세요.</>}
        btnText="대기기간 계산 방법 →"
        href="/w/실업급여-대기기간"
      />

      <RelatedArticles items={[
        { title: "실업급여 신청방법 — 고용24 워크넷 절차", desc: "실업급여 · 신청방법", href: "/w/실업급여-신청방법" },
        { title: "실업급여 소정급여일수 — 나이·근속별 계산", desc: "실업급여 · 소정급여일수", href: "/w/실업급여-소정급여일수" },
        { title: "실업급여 대기기간 7일 — 첫 입금일 계산", desc: "실업급여 · 대기기간", href: "/w/실업급여-대기기간" },
        { title: "실업급여 수급기간 — 몇 개월 받나요?", desc: "실업급여 · 수급기간", href: "/w/실업급여-수급기간-몇개월-받나요" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 구비서류", href: "/w/실업급여-구비서류" }}
        next={{ title: "실업급여 워크넷 구직등록", href: "/w/실업급여-실업신고" }}
      />
    </BlogLayout>
  );
}
