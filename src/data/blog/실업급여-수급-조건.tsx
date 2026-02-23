"use client";

import { useState } from "react";
import {
  C, Btn, Info, Divider, Sec, P, B, A,
  TableTitle, TableNote, TH, THL,
  BridgeCard, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext,
  InlineLink, SpokeLink,
} from "@/components/wiki/BlogShared";

// ── 체커 로직 ──
type ResLink = { icon: string; title: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; links: ResLink[] };

function getResult(sel: Record<string, string>): Res | null {
  const { period, reason } = sel;
  if (!period) return null;

  if (period === "under180") {
    return {
      pass: false,
      headline: "피보험기간 180일을 채워야 해요",
      detail: "이직일 이전 18개월 중 고용보험 가입 기간이 180일 이상이어야 해요. 여러 직장을 다녔다면 기간을 합산할 수 있어요. 고용24에서 피보험기간을 확인할 수 있어요.",
      badges: ["피보험기간 부족", "수급 불가"],
      links: [
        { icon: "📅", title: "소정급여일수 기준 — 나이·피보험기간표", href: "/w/실업급여-소정급여일수" },
        { icon: "📋", title: "실업급여 수급 기간 계산 방법", href: "/w/실업급여-수급기간-몇개월-받나요" },
      ],
    };
  }

  if (period === "unknown") {
    return {
      pass: false,
      headline: "고용24에서 피보험기간을 확인해 보세요",
      detail: "고용24(work24.go.kr)에서 고용보험 가입 이력과 피보험기간을 바로 확인할 수 있어요. 여러 직장을 거쳤다면 합산 기간이 예상보다 길 수 있어요.",
      badges: ["피보험기간 미확인", "고용24 확인 필요"],
      links: [
        { icon: "📅", title: "고용24 피보험기간 조회 방법", href: "/w/실업급여-수급-조건" },
        { icon: "📋", title: "소정급여일수 기준표", href: "/w/실업급여-소정급여일수" },
      ],
    };
  }

  if (period === "over180" && !reason) return null;

  if (period === "over180" && reason === "nonvol") {
    return {
      pass: true,
      headline: "수급 조건을 충족해요",
      detail: "피보험기간 180일 이상 + 비자발적 이직이면 핵심 요건을 충족해요. 이제 수급자격 신청 절차를 밟으면 돼요. 빨리 신청할수록 실수령액이 많아요.",
      badges: ["수급 가능", "조건 충족"],
      links: [
        { icon: "📋", title: "소정급여일수 기준표 — 얼마나 받나요?", href: "/w/실업급여-소정급여일수" },
        { icon: "💰", title: "실업급여 기초일액 계산 방법", href: "/w/실업급여-기초일액" },
      ],
    };
  }

  if (period === "over180" && reason === "vol-reason") {
    return {
      pass: false,
      headline: "개별 심사 후 수급 가능 여부가 결정돼요",
      detail: "정당한 이유가 있는 자진퇴사는 심사 후 수급 가능해요. 임금체불, 최저임금 미달, 성희롱, 사업장 이전 등이 인정 사유예요. 고용센터에서 관련 증빙을 가지고 상담하세요.",
      badges: ["자진퇴사", "개별 심사 필요"],
      links: [
        { icon: "📋", title: "자진퇴사 수급 인정 사례 정리", href: "/w/실업급여-수급-조건" },
        { icon: "💰", title: "실업급여 기초일액 계산 방법", href: "/w/실업급여-기초일액" },
      ],
    };
  }

  if (period === "over180" && reason === "vol-normal") {
    return {
      pass: false,
      headline: "일반 자진퇴사는 수급이 어려워요",
      detail: "개인 사정이나 일반적인 이유로 자진퇴사하면 수급이 어려워요. 단, 퇴사 전후 사정에 따라 예외 케이스가 있으니 고용센터에 직접 상담해 보는 게 좋아요.",
      badges: ["자진퇴사", "수급 어려움"],
      links: [
        { icon: "📋", title: "자진퇴사 예외 인정 사유 확인", href: "/w/실업급여-수급-조건" },
        { icon: "📅", title: "수급자격 신청 절차 전체 정리", href: "/w/실업급여-수급자격-인정" },
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
      breadcrumb={["홈", "실업급여", "수급조건"]}
      tags={["2026년 기준", "실업급여", "수급자격"]}
      date="2026-02-23"
      title="실업급여 수급조건 피보험기간 180일 | 비자발적 퇴사 자격요건"
      description={
        <>
          실업급여를 받으려면 이직 전 18개월 중 고용보험 가입 180일 이상, 비자발적 퇴사 두 가지 조건이 필요해요. <strong style={{ color: C.t1 }}>자진퇴사도 정당한 이유가 있으면 인정돼요</strong>.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제40조 · 제58조", date: "2026.02 기준" }}
      stickyLabel="핵심 조건"
      stickyValue="피보험기간 180일"
      stickyBtn="수급자격 확인 →"
      stickyHref="https://www.work24.go.kr"
    >
      <TOC items={[
        { t: "수급자격 조건 체크", sub: "피보험기간 · 퇴직 사유 선택" },
        { t: "실업급여 수급조건 피보험기간 180일은 어떻게 계산하나요?", sub: null },
        { t: "실업급여 비자발적 퇴사 기준이 어떻게 되나요?", sub: "인정/불인정 사례 정리" },
        { t: "실업급여 자진퇴사도 수급 가능한 경우가 있나요?", sub: "정당한 사유 인정 범위" },
        { t: "실업급여 수급자격 신청 절차는 어떻게 되나요?", sub: null },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "이직 전 <strong>18개월 중 고용보험 가입 180일 이상</strong>이어야 해요. 여러 직장 기간을 합산할 수 있어요.",
        "<strong>비자발적 이직</strong>(해고, 권고사직, 계약만료 등)이 원칙이에요. 하지만 정당한 사유가 있는 자진퇴사도 인정돼요.",
        "수급자격 인정 신청일이 늦을수록 손해예요. <strong>빨리 신청할수록 더 많이 받을 수 있어요</strong>.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="수급자격 조건 체크" sub="피보험기간과 퇴직 사유를 선택해 주세요" />

      <P>실업급여를 신청하기 전에 기본 조건을 먼저 확인해 보세요. 두 가지만 선택하면 내 상황에 맞는 안내를 바로 볼 수 있어요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✅</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>실업급여 수급자격 조건 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>30초 확인</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              고용보험 가입 기간이 얼마나 됐나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="period" value="under180" label="180일 미만이에요" sel={sel} pick={pick} />
              <Btn group="period" value="over180" label="180일 이상이에요" sel={sel} pick={pick} />
              <Btn group="period" value="unknown" label="잘 모르겠어요" sel={sel} pick={pick} />
            </div>
          </div>
          {sel.period === "over180" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
                <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
                퇴직 사유가 어떻게 되나요?
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                <Btn group="reason" value="nonvol" label="권고사직·해고·계약만료" sel={sel} pick={pick} />
                <Btn group="reason" value="vol-reason" label="자진퇴사 (정당한 이유 있음)" sel={sel} pick={pick} />
                <Btn group="reason" value="vol-normal" label="일반 자진퇴사" sel={sel} pick={pick} />
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
      <Sec n="SECTION 02" title="실업급여 수급조건 피보험기간 180일은 어떻게 계산하나요?" sub="18개월 기간 내 합산 기준" />

      <P>피보험기간 180일은 이직일(퇴직일 다음 날) 기준으로 <B>이전 18개월 안에 고용보험에 가입된 기간</B>을 말해요. 주의할 점은 180일이 달력상 6개월이 아니라는 거예요. 주 5일 근무 기준으로 실제 근무일수를 세기 때문에 일반적으로 약 8~9개월 정도 일해야 180일이 돼요.</P>

      <P>여러 직장을 거쳤다면 18개월 안에 해당하는 기간을 합산해요. 퇴직 후 다른 회사에 취직했다가 다시 퇴직한 경우, 두 회사의 피보험기간을 더할 수 있어요. 다만 이전 직장에서 이미 실업급여를 받았다면 그 이전 기간은 합산에서 제외돼요.</P>

      <P>고용24(work24.go.kr)에 로그인하면 내 고용보험 가입 이력과 피보험기간을 직접 확인할 수 있어요. 피보험기간이 얼마나 남았는지, 어느 직장에서 얼마나 가입됐는지 모두 확인 가능해요.</P>

      <Info type="tip">
        단시간 근로자(주 15시간 미만)는 피보험기간 산정 방식이 달라요. 실제 근무 시간에 비례해서 계산되기 때문에 일반 근로자보다 180일을 채우는 데 더 오래 걸릴 수 있어요.
      </Info>

      <InlineLink icon="📅" title="실업급여 소정급여일수 기준표 — 나이·피보험기간별" desc="180일 이상 채운 후 나이와 피보험기간에 따라 몇 일 받는지 확인해요." href="/w/실업급여-소정급여일수" />

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 비자발적 퇴사 기준이 어떻게 되나요?" sub="인정/불인정 사례 정리" />

      <P>비자발적 이직이란 본인 의지와 상관없이 회사 사정이나 외부 요인으로 퇴직하게 되는 경우를 말해요. <B>권고사직, 해고, 계약만료, 정리해고, 사업장 폐업</B>이 대표적이에요. 이 경우 수급자격 판정에서 불리하게 작용하는 요소가 없어요.</P>

      <TableTitle>비자발적 퇴사 유형별 수급 여부</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>퇴사 유형</THL><TH>예시</TH><TH>수급 여부</TH></tr>
          </thead>
          <tbody>
            {[
              ["권고사직", "회사의 권유로 퇴직, 명예퇴직", "O 가능"],
              ["해고", "징계 해고 제외 일반 해고", "O 가능"],
              ["계약만료", "기간제 계약 종료 후 재계약 거부", "O 가능"],
              ["정리해고", "구조조정, 사업 축소", "O 가능"],
              ["폐업/도산", "사업장 폐업, 부도", "O 가능"],
              ["일반 자진퇴사", "개인 사유, 더 좋은 직장 이직", "X 불가"],
              ["징계 해고", "중대한 귀책 사유로 해고", "X 불가"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 8px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 2 ? (cell.startsWith("O") ? "#16a34a" : "#dc2626") : ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 || ci === 2 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>※ 고용보험법 제58조 기준이에요. 징계 해고는 귀책 사유 정도에 따라 다를 수 있어요.</TableNote>

      <P>계약만료의 경우 회사가 재계약을 제안했는데 근로자가 거절하면 자진퇴사로 보는 경우도 있어요. 반대로 회사가 재계약을 거부하면 비자발적 이직으로 인정돼요. 두 경우를 혼동하기 쉬우니 퇴직 전에 확인하는 게 좋아요.</P>

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 자진퇴사도 수급 가능한 경우가 있나요?" sub="정당한 사유 인정 범위" />

      <P>자진퇴사라고 무조건 안 되는 건 아니에요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제58조</A>에서 열거한 정당한 사유에 해당하면 심사 후 수급이 가능해요. 핵심은 그 퇴사가 어쩔 수 없는 상황이었음을 증명하는 거예요.</P>

      <TableTitle>자진퇴사 수급 인정 주요 사유</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>인정 사유</THL><TH>세부 기준</TH></tr>
          </thead>
          <tbody>
            {[
              ["임금 체불", "퇴직 전 2개월 이상 임금 미지급 또는 30% 이상 삭감"],
              ["최저임금 미달", "최저임금 이하로 지급된 경우"],
              ["근로조건 변경", "채용 조건과 실제 근무 조건이 현저히 다른 경우"],
              ["직장내 괴롭힘/성희롱", "사업주 또는 동료에게 피해를 입은 경우"],
              ["사업장 이전", "출퇴근 왕복 3시간 이상으로 불가능한 경우"],
              ["부양가족 간호", "직계가족 질병·부상 등으로 180일 이상 간호 필요"],
              ["임신·출산·육아", "근로기준법상 보장된 권리 사용이 어려운 경우"],
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

      <P>인정 사유를 주장할 때는 관련 증빙이 필요해요. 임금 체불이라면 통장 내역이나 임금명세서, 사업장 이전이라면 거리 계산 자료가 필요해요. 고용센터에 사전 상담을 받으면 어떤 증빙이 필요한지 안내해 줘요.</P>

      <BridgeCard
        question="자진퇴사였는데 수급 가능한지 헷갈리나요?"
        body={<>고용센터에서 사전 상담을 받으면 내 퇴사 사유가 정당한 사유에 해당하는지 미리 확인할 수 있어요. <strong style={{ color: C.navy }}>상담은 무료이고 예약 없이 방문해도 돼요.</strong></>}
        btnText="실업급여 수급자격 인정 신청 절차 →"
        href="/w/실업급여-수급자격-인정"
      />

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" title="실업급여 수급자격 신청 절차는 어떻게 되나요?" sub="신청 전 준비물 체크" />

      <P>수급자격을 신청하려면 몇 가지 사전 절차가 필요해요. 이직확인서 처리 → 워크넷 구직등록 → 수급자격 교육 이수 → 수급자격 인정 신청 순서로 진행해요. 이 중 하나라도 빠지면 신청이 반려될 수 있어요.</P>

      <P>이직확인서는 회사가 퇴직 후 10일 이내에 고용보험에 신고해야 해요. 회사가 신고를 안 하면 고용센터에 처리를 요청할 수 있어요. 워크넷 구직등록은 work.go.kr에서 이력서를 등록하면 돼요.</P>

      <P>수급자격 교육은 고용24에서 온라인으로 이수할 수 있어요. 약 1시간 분량이고 100% 수강해야 해요. 교육 이수 후 고용센터를 방문하거나 고용24 온라인으로 수급자격 인정 신청을 하면 돼요.</P>

      <Info type="warn">
        퇴직 후 12개월 이내에 수급자격 인정 신청을 해야 해요. 이 기한이 지나면 소정급여일수가 남아있어도 받을 수 없어요. 빨리 신청할수록 실수령액이 많아요.
      </Info>

      <InlineLink icon="📋" title="실업급여 이직확인서 처리 확인 방법" desc="회사가 신고했는지 고용24에서 처리 여부를 확인하는 방법이에요." href="/w/실업급여-수급자격-인정" />

      <div style={{ margin: "20px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 8 }}>📖 실업급여 더 알아보기</div>
        <SpokeLink num="01" title="실업급여 소정급여일수 기준표" desc="피보험기간·나이별 120~270일 기준" href="/w/실업급여-소정급여일수" />
        <SpokeLink num="02" title="실업급여 기초일액 계산 방법" desc="1일 지급액 계산 공식과 상·하한액" href="/w/실업급여-기초일액" />
        <SpokeLink num="03" title="실업급여 수급기간 몇개월 받나" desc="이직 후 12개월 기한 계산 방법" href="/w/실업급여-수급기간-몇개월-받나요" />
      </div>

      <a href="https://www.work24.go.kr" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-blue">
        <span className="ext-btn-badge">고용24 공식</span>
        <span className="ext-btn-text">피보험기간 조회 · 수급자격 신청</span>
        <span className="ext-btn-cta">바로가기 →</span>
      </a>

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 수급조건 피보험기간 180일은 어떻게 계산하나요?", a: "이직일(퇴직 다음 날) 기준으로 이전 18개월 안에 고용보험 가입된 실제 일수예요. 주 5일 근무 기준 약 8~9개월 일해야 채워져요. 여러 직장 기간을 합산할 수 있어요." },
        { q: "자진퇴사하면 실업급여를 못 받나요?", a: "원칙적으로는 어렵지만, 임금 체불·최저임금 미달·직장내 괴롭힘·사업장 이전 등 정당한 사유가 있으면 심사 후 수급이 가능해요. 고용센터에서 사전 상담을 받아보세요." },
      ]} />

      <RelatedArticles items={[
        { title: "실업급여 소정급여일수 기준표", desc: "실업급여 · 소정급여일수", href: "/w/실업급여-소정급여일수" },
        { title: "실업급여 수급기간 몇개월 받나", desc: "실업급여 · 수급기간", href: "/w/실업급여-수급기간-몇개월-받나요" },
        { title: "실업급여 기초일액 계산 방법", desc: "실업급여 · 기초일액", href: "/w/실업급여-기초일액" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 국민연금 납부예외 신청", href: "/w/실업급여-국민연금-유예" }}
        next={{ title: "실업크레딧 신청 방법", href: "/w/실업급여-실업크레딧" }}
      />
    </BlogLayout>
  );
}
