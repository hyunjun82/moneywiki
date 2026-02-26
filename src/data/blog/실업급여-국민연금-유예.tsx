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

  if (status === "receiving" && applied === "not-yet") {
    return {
      pass: false,
      headline: "지금 바로 신청해야 해요",
      detail: "수급 중에는 국민연금공단 지사 방문, 전화 1355, 또는 내연금.kr에서 납부예외를 신청할 수 있어요. 신청을 늦추면 그만큼 납부예외 기간이 짧아져요.",
      badges: ["납부예외 미신청", "즉시 신청 필요"],
      links: [
        { icon: "💡", title: "실업크레딧 신청 방법 — 75% 국가 지원", href: "/w/실업급여-실업크레딧" },
        { icon: "📅", title: "실업급여 수급자격 조건 확인", href: "/w/실업급여-수급-조건" },
      ],
    };
  }
  if (status === "receiving" && applied === "done") {
    return {
      pass: true,
      headline: "실업크레딧도 함께 신청해 두면 좋아요",
      detail: "납부예외를 이미 신청했다면 실업크레딧도 추가 신청해 보세요. 보험료 75%를 국가가 내주고 납부예외와 달리 가입기간도 인정돼요.",
      badges: ["납부예외 완료", "실업크레딧 신청 권장"],
      links: [
        { icon: "💡", title: "실업크레딧 신청 방법 — 75% 국가 지원", href: "/w/실업급여-실업크레딧" },
      ],
    };
  }
  if (status === "about-to") {
    return {
      pass: true,
      headline: "수급 시작과 함께 신청하면 돼요",
      detail: "실업급여 수급자격 인정 후 국민연금공단에서 납부예외와 실업크레딧을 같이 신청할 수 있어요. 실업크레딧이 더 유리하니 두 가지를 함께 신청하는 게 좋아요.",
      badges: ["신청 예정", "준비 완료"],
      links: [
        { icon: "💡", title: "실업크레딧 신청 방법 — 75% 국가 지원", href: "/w/실업급여-실업크레딧" },
        { icon: "📅", title: "실업급여 수급자격 신청 방법", href: "/w/실업급여-수급-조건" },
      ],
    };
  }
  if (status === "ended") {
    return {
      pass: false,
      headline: "수급 종료 후 소급 신청이 가능해요",
      detail: "수급 기간 중 납부예외를 신청하지 못했다면 해당 기간에 한해 소급 신청이 가능한 경우가 있어요. 국민연금공단 1355로 문의해서 소급 신청 가능 여부를 확인해 보세요.",
      badges: ["수급 종료", "소급 신청 확인"],
      links: [
        { icon: "📋", title: "실업급여 소정급여일수 기준표", href: "/w/실업급여-소정급여일수" },
        { icon: "💡", title: "실업크레딧 신청 방법", href: "/w/실업급여-실업크레딧" },
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
      breadcrumb={["홈", "실업급여", "국민연금"]}
      tags={["2026년 기준", "실업급여", "국민연금 납부예외"]}
      date="2026-02-23"
      title="실업급여 국민연금 납부예외 신청 | 유예 기간 연금액 영향"
      description={
        <>
          실업급여 수급 중에는 국민연금 보험료를 납부예외 신청으로 중단할 수 있어요. <strong style={{ color: C.t1 }}>납부예외 기간은 가입기간에서 빠지지만</strong>, 실업크레딧을 쓰면 75%를 국가가 내주면서 가입기간도 인정돼요.
        </>
      }
      sourceBar={{ badge: "출처", name: "국민연금법 제91조 · 고용보험법 시행령", date: "2026.02 기준" }}
      stickyLabel="국가 지원"
      stickyValue="보험료 75%"
      stickyBtn="실업크레딧 신청 →"
      stickyHref="https://www.nps.or.kr"
    >
      <TOC items={[
        { t: "납부예외 신청 상태 확인", sub: "현재 상황별 안내" },
        { t: "실업급여 국민연금 납부예외 신청은 어떻게 하나요?", sub: "단계별 신청 방법" },
        { t: "납부예외 유예 기간 동안 연금액에 어떤 영향이 있나요?", sub: null },
        { t: "실업급여 국민연금 납부예외와 실업크레딧 차이가 뭐예요?", sub: "어떤 게 더 유리할까요?" },
        { t: "납부예외 신청 시 자주 헷갈리는 점", sub: null },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "수급 중 국민연금 납부예외를 신청하면 <strong>보험료를 내지 않아도 돼요</strong>. 단, 납부예외 기간은 가입기간에서 제외돼요.",
        "납부예외 기간이 길수록 나중에 받을 연금이 줄어요. <strong>실업크레딧 신청이 더 유리해요</strong>.",
        "실업크레딧은 보험료의 <strong>75%를 국가가 지원</strong>하고, 가입기간도 인정돼요. 최대 12개월 이용 가능해요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="납부예외 신청 상태 확인" sub="현재 상황을 선택해 주세요" />

      <P>실업급여 수급 중에 국민연금을 어떻게 처리해야 하는지 헷갈리는 경우가 많아요. 현재 상황에 맞는 안내를 바로 확인해 보세요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏦</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>납부예외 신청 상태 확인</h3>
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
              <Btn group="status" value="receiving" label="수급 중이에요" sel={sel} pick={pick} />
              <Btn group="status" value="about-to" label="곧 신청 예정이에요" sel={sel} pick={pick} />
              <Btn group="status" value="ended" label="이미 종료됐어요" sel={sel} pick={pick} />
            </div>
          </div>
          {sel.status === "receiving" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
                <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
                국민연금 납부예외를 이미 신청하셨나요?
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
      <Sec n="SECTION 02" title="실업급여 국민연금 납부예외 신청은 어떻게 하나요?" sub="단계별 신청 방법" />

      <P>납부예외 신청 방법은 어렵지 않아요. 국민연금공단 지사 방문, 전화, 인터넷 중 하나를 선택하면 돼요. 실업급여 수급자격 인정을 받은 직후 신청하는 게 가장 좋아요.</P>

      <Steps items={[
        {
          title: "실업급여 수급자격 인정 확인",
          desc: "고용센터에서 수급자격 인정을 받아야 해요. 이직확인서 처리 → 워크넷 구직등록 → 수급자격 교육 이수 → 수급자격 신청 순서로 진행해요.",
        },
        {
          title: "납부예외 신청 방법 선택",
          desc: "국민연금공단 지사 방문, 전화 1355, 내연금.kr, 국민연금 앱 중 하나를 선택하면 돼요. 온라인 신청이 가장 편해요.",
        },
        {
          title: "납부예외 사유 선택",
          desc: "사유 항목에서 '실직(구직급여 수급 중)'을 선택해요. 수급자격 인정 번호 또는 수급자격 확인서가 필요할 수 있어요.",
        },
        {
          title: "실업크레딧 동시 신청 (권장)",
          desc: "납부예외 신청과 함께 실업크레딧도 신청하면 좋아요. 실업크레딧은 보험료 75%를 국가가 내주고 가입기간도 인정돼요.",
        },
        {
          title: "처리 결과 확인",
          desc: "신청 후 내연금.kr에서 납부예외 처리 여부를 확인할 수 있어요. 처리 기간은 보통 3~5 영업일이에요.",
        },
      ]} />

      <Info type="tip">
        납부예외 신청을 잊었더라도 수급 기간 중이라면 소급 신청이 가능해요. 국민연금공단 1355로 문의하면 소급 신청 가능 기간을 정확히 안내받을 수 있어요.
      </Info>

      <InlineLink icon="💡" title="실업크레딧 신청 방법 — 보험료 75% 국가 지원" desc="납부예외와 달리 가입기간이 인정되는 실업크레딧 신청 방법이에요." href="/w/실업급여-실업크레딧" />

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" title="납부예외 유예 기간 동안 연금액에 어떤 영향이 있나요?" sub="가입기간에서 제외돼요" />

      <P>납부예외 기간의 가장 큰 단점은 <B>국민연금 가입기간에서 제외</B>된다는 거예요. 국민연금은 가입기간이 길수록 나중에 받는 연금이 많아지는데, 납부예외 기간은 그 계산에 포함되지 않아요.</P>

      <P>예를 들어 납부예외 없이 30년 가입하면 30년치 연금을 받지만, 납부예외 기간이 1년 있으면 29년치만 인정돼요. 매월 수령하는 연금 금액 차이로 이어지기 때문에, 납부예외 기간이 길수록 손해예요.</P>

      <TableTitle>납부예외 vs 실업크레딧 비교</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>구분</THL><TH>납부예외</TH><TH>실업크레딧</TH></tr>
          </thead>
          <tbody>
            {[
              ["보험료 부담", "0원 (전액 면제)", "25%만 본인 부담"],
              ["가입기간 인정", "❌ 제외", "✅ 인정"],
              ["나중 연금 영향", "감소함", "영향 없음"],
              ["최대 기간", "수급기간 전체", "생애 12개월"],
              ["신청처", "국민연금공단", "국민연금공단"],
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
      <TableNote>※ 실업크레딧은 수급 기간 중 신청 시에만 적용돼요. 납부예외와 함께 신청할 수 있어요.</TableNote>

      <P>단기 실직(3~6개월)이라면 연금에 미치는 영향이 크지 않을 수 있어요. 그래도 실업크레딧을 신청하면 25%만 부담하면서 가입기간도 인정받을 수 있어요. 실업급여 수급 중이라면 납부예외보다 실업크레딧을 선택하는 게 유리해요.</P>
      <InlineLink icon="📊" title="실업급여 소정급여일수 — 나이별 수급기간" desc="수급기간이 길수록 납부예외 기간도 늘어나요. 나이·피보험기간별 기준을 먼저 확인하세요." href="/w/실업급여-소정급여일수" />

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 국민연금 납부예외와 실업크레딧 차이가 뭐예요?" sub="어떤 게 더 유리할까요?" />

      <P>납부예외와 실업크레딧은 둘 다 실업 중 국민연금 보험료 부담을 줄여주는 제도예요. 납부예외는 <B>보험료를 아예 안 내는 대신 가입기간도 빠지고</B>, 실업크레딧은 <B>일부만 내는 대신 가입기간을 유지</B>할 수 있어요.</P>

      <P>실업크레딧의 본인 부담은 인정 소득(실직 전 3개월 평균 보수의 50%, 최대 70만원)에 보험료율 9%를 적용한 금액의 25%예요. 월 평균 보수가 200만원이라면 인정 소득 100만원 기준 본인 부담은 약 22,500원이에요. 이 정도 부담으로 가입기간을 유지할 수 있다면 실업크레딧이 훨씬 유리해요.</P>

      <P>생애 최대 12개월이라는 한도가 있어서, 이전에 실업크레딧을 사용한 적이 있다면 남은 기간만큼만 신청할 수 있어요. 이미 12개월을 다 사용했다면 납부예외나 임의계속가입을 검토해야 해요.</P>

      <Info type="tip">
        실업크레딧은 수급자격 인정일로부터 최대 14일 이내에 신청해야 해요. 기한이 있으니 실업급여 신청 직후 바로 국민연금공단에서 함께 신청하세요.
      </Info>

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" title="납부예외 신청 시 자주 헷갈리는 점" sub="실수 방지 가이드" />

      <P>납부예외 신청에서 가장 많이 헷갈리는 건 신청 시기예요. 납부예외는 실업급여 수급자격 인정 이후에 신청해야 해요. 퇴직 직후 바로 신청하면 수급자격 미인정 상태라 처리가 안 될 수 있어요.</P>

      <P>또한 납부예외를 신청해도 당월 납부 기한이 지났다면 그 달 보험료는 납부해야 할 수 있어요. 신청은 다음 달분부터 적용되는 경우가 많아요. 국민연금공단 1355로 문의하면 정확한 적용 시점을 확인할 수 있어요.</P>

      <P>납부예외 신청 후에도 고지서가 날아올 수 있어요. 처리 기간이 있어서 신청 당월에는 고지서가 발행되는 경우가 있어요. 이런 경우 납부를 보류하고 처리 완료 후 재확인하거나, 국민연금공단에 직접 문의하세요.</P>

      <Info type="warn">
        납부예외를 신청하면 그 기간 동안 보험료를 안 내도 되지만, 가입기간에서도 제외돼서 나중에 받는 연금이 줄어요. 가능하면 실업크레딧을 함께 신청하는 게 좋아요.
      </Info>

      <div style={{ margin: "20px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 8 }}>📖 실업급여 더 알아보기</div>
        <SpokeLink num="01" title="실업크레딧 신청 방법 — 국민연금 75% 지원" desc="국가가 75% 내주는 실업크레딧 조건과 신청 방법" href="/w/실업급여-실업크레딧" />
        <SpokeLink num="02" title="실업급여 수급자격 — 피보험기간 180일" desc="수급 조건과 비자발적 퇴사 인정 범위" href="/w/실업급여-수급-조건" />
        <SpokeLink num="03" title="실업급여 소정급여일수 기준표" desc="나이·피보험기간별 120~270일 기준표" href="/w/실업급여-소정급여일수" />
      </div>

      <a href="https://www.nps.or.kr" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-blue">
        <span className="ext-btn-badge">국민연금공단</span>
        <span className="ext-btn-text">납부예외 · 실업크레딧 신청</span>
        <span className="ext-btn-cta">신청하기 →</span>
      </a>

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 수급 중 국민연금 납부예외를 신청 안 하면 어떻게 되나요?", a: "신청하지 않으면 지역가입자로 전환돼서 보험료 고지서가 날아와요. 납부하지 않으면 체납이 되고 나중에 한꺼번에 납부해야 해요. 납부예외나 실업크레딧 신청으로 부담을 줄이는 게 좋아요." },
        { q: "납부예외 기간이 국민연금 가입기간에 포함되나요?", a: "아니에요. 납부예외 기간은 가입기간에서 제외돼요. 가입기간이 줄면 나중에 받는 연금액이 감소해요. 실업크레딧을 신청하면 25%만 부담하면서 가입기간을 유지할 수 있어요." },
      ]} />

      <RelatedArticles items={[
        { title: "실업크레딧 신청 방법 — 국민연금 75% 지원", desc: "실업급여 · 국민연금", href: "/w/실업급여-실업크레딧" },
        { title: "실업급여 소정급여일수 기준표", desc: "실업급여 · 소정급여일수", href: "/w/실업급여-소정급여일수" },
        { title: "실업급여 수급자격 — 피보험기간 180일", desc: "실업급여 · 수급자격", href: "/w/실업급여-수급-조건" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 수급기간 몇개월 받나", href: "/w/실업급여-수급기간-몇개월-받나요" }}
        next={{ title: "실업급여 수급자격 조건", href: "/w/실업급여-수급-조건" }}
      />
    </BlogLayout>
  );
}
