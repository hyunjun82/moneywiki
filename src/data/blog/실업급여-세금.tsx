"use client";

import { useState } from "react";
import {
  C, Btn, Info, Divider, Sec, P, B, A,
  TableTitle, TableNote, TH, THL,
  BridgeCard, ExtBtn, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext,
  InlineLink, SpokeLink,
} from "@/components/wiki/BlogShared";

// ── 체커 로직 ──
type ResLink = { icon: string; title: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; links: ResLink[] };

function getResult(sel: Record<string, string>): Res | null {
  const { insurance, work } = sel;
  if (!insurance) return null;

  if (insurance === "employed") return {
    pass: true,
    headline: "퇴직일 다음 날까지 직장건보가 유지돼요",
    detail: "퇴직 전까지는 직장가입자 자격이 유지돼요. 퇴직일 다음 날부터 지역가입자로 전환되거나 임의계속가입을 신청할 수 있어요.",
    badges: ["직장건보 유지", "퇴직 후 전환"],
    links: [
      { icon: "📄", title: "실업급여 수급자격", href: "/w/실업급여-수급자격" },
    ],
  };

  if (insurance === "local") {
    if (work === "spouse") return {
      pass: true,
      headline: "배우자 직장건보 피부양자로 등록 가능해요",
      detail: "배우자가 직장가입자라면 피부양자로 등록하면 보험료가 0원이에요. 소득·재산 요건을 충족해야 하고, 건강보험공단에 신청하면 돼요.",
      badges: ["피부양자 등록", "보험료 0원"],
      links: [
        { icon: "🔗", title: "건강보험공단 피부양자", href: "https://www.nhis.or.kr" },
      ],
    };

    return {
      pass: false,
      headline: "지역가입자로 전환돼 보험료가 부과돼요",
      detail: "퇴직 후 지역가입자로 전환되면 소득·재산 기준으로 보험료가 산정돼요. 2026년 지역가입자 월평균 보험료는 약 90,242원이에요.",
      badges: ["지역가입자", "월 약 9만원"],
      links: [
        { icon: "📄", title: "실업급여 비과세 소득", href: "/w/실업급여-비과세" },
      ],
    };
  }

  if (insurance === "voluntary") return {
    pass: true,
    headline: "직장건보 유지 제도를 이용할 수 있어요",
    detail: "직장가입자 기간 통산 1년 이상이면 퇴직 후에도 최대 36개월간 직장건보 보험료로 낼 수 있어요. 지역가입자 보험료보다 유리할 수 있어요.",
    badges: ["최대 36개월", "직장보험료 유지"],
    links: [
      { icon: "🔗", title: "건강보험공단", href: "https://www.nhis.or.kr" },
    ],
  };

  if (insurance === "unsure") return {
    pass: false,
    headline: "건강보험공단(1577-1000)에 상담받아 보세요",
    detail: "퇴직 후 건강보험 전환은 개인 상황에 따라 유리한 방법이 달라요. 피부양자, 지역가입자, 직장건보 유지 중 본인에게 맞는 방법을 상담받을 수 있어요.",
    badges: ["상담 권장"],
    links: [
      { icon: "🔗", title: "건강보험공단", href: "https://www.nhis.or.kr" },
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
      breadcrumb={["홈", "실업급여", "건강보험"]}
      tags={["2026년 기준", "실업급여", "건강보험"]}
      date="2026-02-23"
      title="실업급여 수급 중 건강보험 | 지역가입자 전환 보험료 부담"
      description={
        <>
          실업급여를 받으면 건강보험이 지역가입자로 전환된다는 사실, 알고 계셨나요? 퇴직일 다음 날부터 <strong style={{ color: C.t1 }}>지역가입자로 전환</strong>되고, 소득·재산 기준으로 보험료가 부과돼요.
        </>
      }
      sourceBar={{ badge: "출처", name: "건강보험공단 · 고용24", date: "2026.02 기준" }}
      stickyLabel="보험료율"
      stickyValue="7.19%"
      stickyBtn="건강보험공단 조회 →"
      stickyHref="https://www.nhis.or.kr"
    >
      <TOC items={[
        { t: "내 건강보험 전환 상황 체크", sub: "상황별 간편 확인" },
        { t: "실업급여 수급 중 건강보험은 어떻게 되나요?", sub: null },
        { t: "실업급여 수급 중 건강보험 지역가입자 전환은 언제 되나요?", sub: null },
        { t: "실업급여 수급 중 보험료 부담은 얼마인가요?", sub: "2026년 보험료율 기준" },
        { t: "실업급여 수급 중 임의계속가입은 무엇인가요?", sub: null },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "퇴직일 다음 날 <strong>지역가입자로 자동 전환</strong>, 소득·재산 기준 보험료 부과",
        "2026년 건강보험료율 <strong>7.19%</strong>, 지역가입자 월평균 약 90,242원",
        "직장건보 유지(임의계속가입): 통산 1년 이상 가입 시 <strong>최대 36개월</strong> 유지 가능",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="내 건강보험 전환 상황 체크" sub="30초 확인 — 상황을 선택하면 유리한 방법을 알 수 있어요" />

      <P>퇴직 후 건강보험은 개인 상황에 따라 유리한 방법이 달라져요. 내 상황에 맞게 확인해 보세요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x2714;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>건강보험 전환 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>상황별 유리한 방법 확인</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              현재 건강보험 상태는 어떤가요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="insurance" value="employed" label="아직 재직 중" sel={sel} pick={pick} />
              <Btn group="insurance" value="local" label="퇴직 후 지역가입자" sel={sel} pick={pick} />
              <Btn group="insurance" value="voluntary" label="직장건보 유지 고려" sel={sel} pick={pick} />
              <Btn group="insurance" value="unsure" label="잘 모르겠어요" sel={sel} pick={pick} />
            </div>
          </div>
          {sel.insurance === "local" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
                <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
                배우자가 직장가입자인가요?
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                <Btn group="work" value="spouse" label="네, 배우자 직장건보 있어요" sel={sel} pick={pick} />
                <Btn group="work" value="none" label="아니요" sel={sel} pick={pick} />
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
      <Sec n="SECTION 02" title="실업급여 수급 중 건강보험은 어떻게 되나요?" sub="직장건보가 끊기고 지역가입자로 전환돼요" />

      <P>직장을 다닐 때는 건강보험료를 회사와 반반씩 냈어요. 퇴직하면 직장가입자 자격이 상실되고 지역가입자로 전환돼요. 실업급여를 받는 건 고용보험 영역이고, 건강보험은 별개 체계이기 때문에 실업급여 수급 여부와 무관하게 보험료가 부과돼요.</P>

      <P>지역가입자가 되면 보험료 산정 기준이 완전히 달라져요. 직장가입자는 보수(월급) 기준으로 계산했지만, 지역가입자는 소득·재산·자동차를 종합한 부과점수로 산정해요. 재산이 많거나 금융 소득이 있으면 보험료가 예상보다 높게 나올 수 있어요.</P>

      <P>다만 방법이 아예 없는 건 아니에요. 배우자가 직장가입자라면 피부양자로 등록하면 보험료가 0원이에요. 아니면 퇴직 전 직장건보를 유지하는 제도를 활용할 수도 있어요.</P>

      <InlineLink icon="📄" title="실업급여 비과세 — 소득세는 면제" desc="건강보험료와 달리 소득세는 비과세예요. 세금 관련 기준을 정리했어요." href="/w/실업급여-비과세" />

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 수급 중 건강보험 지역가입자 전환은 언제 되나요?" sub="퇴직일 다음 날 자동 전환돼요" />

      <P>직장가입자 자격은 <B>퇴직일 다음 날</B> 상실돼요. 그날부터 자동으로 지역가입자로 전환돼요. 별도 신청이 필요 없고, 건강보험공단에서 직권으로 처리해요. 보통 퇴직 후 2~3주 내에 지역가입자 보험료 고지서가 날아와요.</P>

      <P>여기서 놓치기 쉬운 부분이 있어요. 퇴직 후 바로 실업급여를 신청하더라도 건강보험은 지역가입자로 전환돼요. 실업급여 수급자라고 건강보험료가 면제되거나 감면되는 제도는 따로 없어요.</P>

      <P>배우자의 직장건보에 피부양자로 등록하려면 소득 요건을 충족해야 해요. 연간 소득이 2천만원 이하이고, 사업소득이 없어야 피부양자 자격이 돼요. 실업급여는 비과세 소득이라 소득 기준에 포함되지 않아서 수급 중에도 피부양자 등록이 가능할 수 있어요.</P>

      <Info type="tip">{'<strong>피부양자 등록 시 보험료 0원.</strong> 배우자가 직장가입자이고 본인 소득이 연 2천만원 이하라면 피부양자 등록을 먼저 검토해 보세요. 건강보험공단(1577-1000)에서 자격 여부를 확인할 수 있어요.'}</Info>

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 수급 중 보험료 부담은 얼마인가요?" sub="2026년 보험료율 7.19% 기준" />

      <P>2026년 건강보험료율은 <B>7.19%</B>예요. 전년 대비 0.1%p 인상됐어요. 직장가입자는 이 요율을 사업주와 반반(각 3.595%) 부담하지만, 지역가입자는 전액 본인 부담이에요.</P>

      <P>2026년 지역가입자 월평균 보험료는 약 90,242원이에요. 다만 이건 평균값이고, 개인별로는 소득·재산·자동차에 따라 크게 달라져요. 재산이 거의 없고 소득도 없으면 월 3~4만원대로 나올 수도 있어요.</P>

      <TableTitle>직장가입자 vs 지역가입자 비교</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>구분</THL><TH>직장가입자</TH><TH>지역가입자</TH></tr>
          </thead>
          <tbody>
            {[
              ["산정 기준", "보수(월급)", "소득·재산·자동차"],
              ["부담 비율", "사업주 50% + 본인 50%", "전액 본인"],
              ["월평균 보험료", "약 160,699원 (본인분)", "약 90,242원"],
              ["납부 방식", "급여 원천징수", "고지서 직접 납부"],
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

      <P>건강보험료를 줄이는 방법은 크게 세 가지예요. 피부양자 등록(보험료 0원), 직장건보 유지 제도(퇴직 전 보험료 유지), 재산 처분(부과점수 감소)이에요. 상황에 맞는 방법을 선택하는 게 중요해요.</P>

      <Info type="warn">{'<strong>건강보험료 체납 시 급여 제한.</strong> 보험료를 6개월 이상 체납하면 건강보험 급여(병원비 지원)가 제한될 수 있어요. 납부가 어려우면 분할납부를 신청하세요.'}</Info>

      <div style={{ margin: "20px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 8 }}>{"📖 실업급여 세금·보험 더 알아보기"}</div>
        <SpokeLink num="01" title="실업급여 비과세 소득" desc="소득세는 0원, 건강보험료와는 별개" href="/w/실업급여-비과세" />
        <SpokeLink num="02" title="국민연금 납부유예" desc="실업급여 기간 연금 납부 유예 조건" href="/w/실업급여-국민연금-유예" />
      </div>

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" title="실업급여 수급 중 임의계속가입은 무엇인가요?" sub="퇴직 전 직장 보험료를 최대 36개월 유지하는 제도" />

      <P>직장가입자 기간이 통산 1년 이상이면, 퇴직 후에도 직장건보 보험료 수준을 유지할 수 있어요. 이 제도를 이용하면 지역가입자 보험료 대신 퇴직 전 직장 보험료(본인 부담분)를 내게 돼요. 다만 회사 부담분까지 전액 본인이 내야 하기 때문에 반드시 유리한 건 아니에요.</P>

      <P>신청은 최초 지역가입자 보험료 고지를 받은 날의 납부기한에서 <B>2개월 이내</B>에 해야 해요. 이 기간을 넘기면 신청이 안 돼요. 건강보험공단 지사 방문 또는 온라인(The건강보험 앱)으로 신청할 수 있어요.</P>

      <P>유지 기간은 <B>최대 36개월</B>이에요. 이 기간 안에 재취업하면 다시 직장가입자로 전환돼요. 36개월이 끝나면 자동으로 지역가입자로 전환돼요. 재산이 많은 분은 지역가입자 보험료가 더 높게 나올 수 있어서, 직장건보 유지가 유리한 경우가 많아요.</P>

      <Info type="tip">{'<strong>유리한지 비교하는 방법.</strong> 건강보험공단(1577-1000)에 전화하면 지역가입자 전환 시 예상 보험료와 직장건보 유지 보험료를 비교해 줘요. 미리 확인하고 결정하는 게 좋아요.'}</Info>

      <BridgeCard
        question="소득세는 어떻게 되는지 궁금하시죠?"
        body={<>건강보험료는 부과되지만 소득세는 면제예요. 실업급여는 <strong style={{ color: C.navy }}>소득세법상 비과세 소득</strong>이라 한 푼도 안 붙어요.</>}
        btnText="실업급여 비과세 기준 보기 →"
        href="/w/실업급여-비과세"
      />

      <ExtBtn badge="건강보험공단 공식" text="건강보험 자격·보험료 조회" cta="조회하기 →" href="https://www.nhis.or.kr" />

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 수급 중 건강보험료를 안 내면 어떻게 되나요?", a: '건강보험료를 <strong>6개월 이상 체납</strong>하면 건강보험 급여가 제한돼요. 병원비를 전액 본인 부담해야 할 수 있어요. 납부가 어려우면 분할납부를 신청하세요.' },
        { q: "실업급여 수급자 건강보험료 감면 제도가 있나요?", a: '실업급여 수급자라는 이유만으로 건강보험료가 감면되는 제도는 <strong>현재 없어요</strong>. 피부양자 등록이나 직장건보 유지 제도를 활용하는 게 실질적인 방법이에요.' },
      ]} />

      <RelatedArticles items={[
        { title: "실업급여 비과세 소득", desc: "실업급여 · 세금", href: "/w/실업급여-비과세" },
        { title: "실업급여 국민연금 유예", desc: "실업급여 · 국민연금", href: "/w/실업급여-국민연금-유예" },
        { title: "실업급여 수급자격", desc: "실업급여 · 수급자격", href: "/w/실업급여-수급자격" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 상한액 인상", href: "/w/실업급여-상한액" }}
        next={{ title: "실업급여 수급자격", href: "/w/실업급여-수급자격" }}
      />
    </BlogLayout>
  );
}
