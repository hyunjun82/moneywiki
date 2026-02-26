"use client";

import { useState } from "react";
import {
  C, Btn, Info, Divider, Sec, P, B, A,
  TableTitle, TableNote, TH, THL,
  BridgeCard, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext,
  InlineLink, SpokeLink, Steps,
} from "@/components/wiki/BlogShared";

// ── 체커 로직 ──
type ResLink = { icon: string; title: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; links: ResLink[] };

function getResult(sel: Record<string, string>): Res | null {
  const { status, applied } = sel;
  if (!status) return null;
  if (status === "receiving" && !applied) return null;

  if (status === "not-yet") {
    return {
      pass: true,
      headline: "실업급여 신청 후 함께 신청하면 돼요",
      detail: "실업급여 수급자격 인정을 받은 뒤 국민연금공단에서 실업크레딧을 신청하면 돼요. 수급 기간이 시작된 이후부터 신청할 수 있어요.",
      badges: ["신청 예정", "준비 OK"],
      links: [
        { icon: "📅", title: "실업급여 수급자격 신청 절차", href: "/w/실업급여-수급-조건" },
        { icon: "🏦", title: "국민연금 납부예외 신청 방법", href: "/w/실업급여-국민연금-유예" },
      ],
    };
  }

  if (status === "receiving" && applied === "not-yet") {
    return {
      pass: false,
      headline: "지금 바로 신청하세요",
      detail: "실업급여 수급 중에 실업크레딧을 신청하면 보험료의 75%를 국가가 내줘요. 국민연금공단 지사 방문, 1355 전화, 내연금.kr 중 하나로 신청할 수 있어요.",
      badges: ["실업크레딧 미신청", "즉시 신청 가능"],
      links: [
        { icon: "🏦", title: "납부예외와 실업크레딧 차이", href: "/w/실업급여-국민연금-유예" },
        { icon: "💰", title: "실업급여 기초일액 계산 방법", href: "/w/실업급여-기초일액" },
      ],
    };
  }

  if (status === "receiving" && applied === "done") {
    return {
      pass: true,
      headline: "잘 신청됐어요. 매월 본인 부담분만 납부하면 돼요",
      detail: "인정 소득 기준 보험료의 25%를 매월 납부하면 국가가 75%를 채워줘요. 가입기간도 그대로 인정되니 연금에 영향이 없어요.",
      badges: ["실업크레딧 신청 완료", "정상 적용 중"],
      links: [
        { icon: "📅", title: "소정급여일수 기준표 — 얼마나 더 받나요?", href: "/w/실업급여-소정급여일수" },
      ],
    };
  }

  if (status === "ended") {
    return {
      pass: false,
      headline: "수급 종료 후에는 신청할 수 없어요",
      detail: "실업크레딧은 구직급여 수급 기간 중에만 신청할 수 있어요. 수급이 종료된 후에는 신청 불가예요. 납부예외 소급 신청은 국민연금공단에 문의해 보세요.",
      badges: ["수급 종료", "신청 불가"],
      links: [
        { icon: "🏦", title: "납부예외 소급 신청 방법", href: "/w/실업급여-국민연금-유예" },
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
      breadcrumb={["홈", "실업급여", "실업크레딧"]}
      tags={["2026년 기준", "실업급여", "실업크레딧"]}
      date="2026-02-23"
      title="실업급여 실업크레딧 신청 방법 | 국민연금 75% 지원 최대 12개월"
      description={
        <>
          실업크레딧은 구직급여 수급 중 국민연금 보험료의 75%를 국가가 내주는 제도예요. <strong style={{ color: C.t1 }}>본인은 25%만 부담</strong>하고, 납부예외와 달리 가입기간도 인정돼요. 최대 12개월이에요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제61조의2 · 국민연금법 시행령", date: "2026.02 기준" }}
      stickyLabel="국가 지원"
      stickyValue="보험료 75%"
      stickyBtn="실업크레딧 신청 →"
      stickyHref="https://www.nps.or.kr"
    >
      <TOC items={[
        { t: "실업크레딧 신청 준비 상태 확인", sub: "수급 상태별 안내" },
        { t: "실업급여 실업크레딧 신청 방법은 어떻게 되나요?", sub: "단계별 신청 절차" },
        { t: "실업급여 실업크레딧 국민연금 75% 지원은 어떻게 계산하나요?", sub: "인정 소득 · 본인 부담금" },
        { t: "실업급여 실업크레딧 최대 12개월 조건이 어떻게 되나요?", sub: "지원 자격 · 한도" },
        { t: "실업크레딧과 납부예외 어떤 게 더 나을까요?", sub: null },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "실업크레딧은 구직급여 수급 중 국민연금 보험료의 <strong>75%를 국가가 지원</strong>해요. 본인은 25%만 부담해요.",
        "납부예외와 달리 실업크레딧 기간은 <strong>가입기간으로 인정</strong>돼서 나중에 받을 연금이 줄지 않아요.",
        "생애 최대 <strong>12개월</strong>까지 이용할 수 있어요. 국민연금공단에서 수급 중에만 신청 가능해요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="실업크레딧 신청 준비 상태 확인" sub="수급 상태를 선택해 주세요" />

      <P>실업크레딧은 구직급여(실업급여) 수급 중에만 신청할 수 있어요. 현재 상황을 선택하면 다음 단계를 바로 안내해 드려요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏦</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>실업크레딧 신청 준비 상태</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>30초 확인</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              지금 실업급여 수급 상태가 어떻게 되나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="status" value="not-yet" label="아직 신청 전이에요" sel={sel} pick={pick} />
              <Btn group="status" value="receiving" label="수급 중이에요" sel={sel} pick={pick} />
              <Btn group="status" value="ended" label="이미 종료됐어요" sel={sel} pick={pick} />
            </div>
          </div>
          {sel.status === "receiving" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
                <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
                실업크레딧을 이미 신청하셨나요?
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                <Btn group="applied" value="not-yet" label="아직 안 했어요" sel={sel} pick={pick} />
                <Btn group="applied" value="done" label="이미 신청했어요" sel={sel} pick={pick} />
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
      <Sec n="SECTION 02" title="실업급여 실업크레딧 신청 방법은 어떻게 되나요?" sub="단계별 신청 절차" />

      <P>실업크레딧 신청은 실업급여 수급자격 인정 이후부터 가능해요. 국민연금공단 지사 방문이 가장 확실하지만, 전화나 온라인으로도 신청할 수 있어요.</P>

      <Steps items={[
        {
          title: "실업급여 수급자격 인정 받기",
          desc: "고용센터에서 실업급여 수급자격 인정을 먼저 받아야 해요. 이직확인서 처리 → 워크넷 구직등록 → 수급자격 교육 이수 → 수급자격 신청 순서예요.",
        },
        {
          title: "국민연금공단에 실업크레딧 신청",
          desc: "국민연금공단 지사 방문, 전화 1355, 내연금.kr(nps.or.kr), 국민연금 앱 중 하나로 신청해요. 신청 시 수급자격 인정 정보가 자동으로 확인돼요.",
        },
        {
          title: "인정 소득 확인 및 신청서 작성",
          desc: "실직 전 3개월 평균 월 보수의 50%가 인정 소득이 돼요. 상한은 70만원이에요. 신청서에 서명하면 처리돼요.",
        },
        {
          title: "매월 본인 부담분 납부",
          desc: "인정 소득 × 9% × 25%가 매월 본인 부담이에요. 고지서가 날아오면 납부하면 돼요. 납부하지 않으면 그 달 실업크레딧 혜택을 받을 수 없어요.",
        },
        {
          title: "가입기간 인정 확인",
          desc: "내연금.kr에서 가입기간이 정상적으로 인정됐는지 확인할 수 있어요. 실업크레딧 적용 기간은 국민연금 가입기간으로 기록돼요.",
        },
      ]} />

      <Info type="tip">
        실업급여를 신청한 고용센터 근처에 국민연금공단 지사가 있는 경우가 많아요. 실업급여 신청하는 날 함께 방문하면 한 번에 처리할 수 있어요.
      </Info>
      <InlineLink icon="📅" title="실업급여 수급자격 신청 절차" desc="수급자격 인정부터 첫 지급까지의 절차" href="/w/실업급여-수급자격-인정" />

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 실업크레딧 국민연금 75% 지원은 어떻게 계산하나요?" sub="인정 소득 · 본인 부담금" />

      <P>실업크레딧의 핵심은 <B>인정 소득</B>이에요. 인정 소득은 실직 전 3개월 평균 월 보수의 50%로 정해져요. 여기서 최대 상한은 70만원이에요. 평균 월 보수가 140만원 이하라면 실제 50%가 적용되고, 이상이라면 70만원이 상한이 돼요.</P>

      <TableTitle>실업크레딧 본인 부담금 계산 예시</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>평균 월 보수</THL><TH>인정 소득</TH><TH>월 보험료(9%)</TH><TH>본인 부담(25%)</TH></tr>
          </thead>
          <tbody>
            {[
              ["100만원", "50만원", "45,000원", "11,250원"],
              ["150만원", "70만원 (상한)", "63,000원", "15,750원"],
              ["200만원", "70만원 (상한)", "63,000원", "15,750원"],
              ["300만원", "70만원 (상한)", "63,000원", "15,750원"],
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
      <TableNote>※ 월 보수 140만원 초과 시 인정 소득 상한 70만원 적용. 본인 부담 최대 월 15,750원이에요.</TableNote>

      <P>최대 부담이 월 15,750원이에요. 이 금액으로 국민연금 가입기간을 유지할 수 있어요. 납부예외를 선택하면 한 달에 0원이지만 가입기간이 줄어드는 것과 비교하면, 실업크레딧이 훨씬 유리해요.</P>

      <InlineLink icon="🏦" title="국민연금 납부예외 — 납부예외 vs 실업크레딧 비교" desc="두 제도의 차이와 어떤 걸 선택해야 할지 정리했어요." href="/w/실업급여-국민연금-유예" />

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 실업크레딧 최대 12개월 조건이 어떻게 되나요?" sub="지원 자격 · 한도" />

      <P>실업크레딧은 생애 통산 최대 12개월까지 지원받을 수 있어요. 한 번 실직해서 6개월을 쓰고, 나중에 또 실직하면 남은 6개월을 쓸 수 있어요. 한 번에 12개월을 써야 하는 건 아니에요.</P>

      <P>지원 자격은 만 18세 이상 60세 미만의 구직급여 수급자예요. 실업급여 수급 기간 중에만 신청할 수 있고, 수급이 종료되면 신청할 수 없어요. 국민연금 가입 이력이 있어야 하고, 재산세 과세표준이 6억원 이하여야 해요.</P>

      <P>이미 실업크레딧을 12개월 전부 사용한 경우에는 납부예외나 임의계속가입을 고려해야 해요. 임의계속가입은 퇴직 전 직장 보험료 수준으로 납부를 유지할 수 있는 제도예요.</P>

      <Info type="warn">
        실업크레딧 지원 기간은 실업급여 수급기간 이내에서만 인정돼요. 수급 종료 후에는 자동으로 종료되니, 재취업 후에는 직장 가입으로 전환되는지 확인하세요.
      </Info>

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" title="실업크레딧과 납부예외 어떤 게 더 나을까요?" sub="상황별 선택 기준" />

      <P>대부분의 경우 실업크레딧이 유리해요. 월 최대 15,750원이라는 적은 부담으로 가입기간을 유지할 수 있어요. 나중에 받을 국민연금 금액을 지키는 셈이에요.</P>

      <P>납부예외가 유리한 경우는 생애 12개월 한도를 이미 모두 썼거나, 정말 납부가 어려운 극도의 생계 위기 상황이에요. 하지만 이런 경우에도 월 1만원대 부담이라면 실업크레딧을 먼저 고려해 보는 게 좋아요.</P>

      <P>두 제도를 동시에 신청하는 것도 가능해요. 납부예외를 신청하면서 실업크레딧도 같이 신청하면, 실업크레딧 적용 기간에는 국가가 75%를 부담하고 본인이 25%를 내는 방식으로 처리돼요.</P>

      <BridgeCard
        question="실업급여 수급 중 국민연금 처리를 어떻게 해야 할지 헷갈리나요?"
        body={<>납부예외와 실업크레딧의 차이, 가입기간 영향까지 정리했어요. <strong style={{ color: C.navy }}>수급 중에는 실업크레딧을 우선 고려하는 게 좋아요.</strong></>}
        btnText="납부예외 vs 실업크레딧 상세 비교 →"
        href="/w/실업급여-국민연금-유예"
      />

      <div style={{ margin: "20px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 8 }}>📖 실업급여 더 알아보기</div>
        <SpokeLink num="01" title="국민연금 납부예외 신청 방법" desc="납부예외 기간의 연금액 영향과 신청 절차" href="/w/실업급여-국민연금-유예" />
        <SpokeLink num="02" title="실업급여 수급자격 조건 — 피보험기간 180일" desc="비자발적 퇴사 기준과 자진퇴사 예외 사유" href="/w/실업급여-수급-조건" />
        <SpokeLink num="03" title="실업급여 소정급여일수 기준표" desc="나이·피보험기간별 120~270일 기준" href="/w/실업급여-소정급여일수" />
      </div>

      <a href="https://www.nps.or.kr" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-blue">
        <span className="ext-btn-badge">국민연금공단</span>
        <span className="ext-btn-text">실업크레딧 온라인 신청</span>
        <span className="ext-btn-cta">신청하기 →</span>
      </a>

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 실업크레딧 신청 방법이 어떻게 되나요?", a: "실업급여 수급자격 인정 후 국민연금공단 지사 방문, 전화 1355, 또는 내연금.kr(nps.or.kr)에서 신청할 수 있어요. 수급 기간 중에만 신청 가능해요." },
        { q: "실업크레딧 본인 부담금이 얼마나 되나요?", a: "실직 전 3개월 평균 월 보수의 50%(최대 70만원)가 인정 소득이에요. 인정 소득 × 9% × 25%가 본인 부담이에요. 최대 월 15,750원이에요." },
      ]} />

      <RelatedArticles items={[
        { title: "국민연금 납부예외 신청 방법", desc: "실업급여 · 국민연금", href: "/w/실업급여-국민연금-유예" },
        { title: "실업급여 수급자격 조건", desc: "실업급여 · 수급자격", href: "/w/실업급여-수급-조건" },
        { title: "실업급여 소정급여일수 기준표", desc: "실업급여 · 소정급여일수", href: "/w/실업급여-소정급여일수" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 수급자격 조건", href: "/w/실업급여-수급-조건" }}
        next={{ title: "실업급여 받으면서 알바 가능 여부", href: "/w/실업급여-받으면서-알바" }}
      />
    </BlogLayout>
  );
}
