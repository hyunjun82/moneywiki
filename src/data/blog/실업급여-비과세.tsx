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
  const { income } = sel;
  if (!income) return null;

  if (income === "only_ui") return {
    pass: true,
    headline: "종합소득세 신고 의무 없어요",
    detail: "실업급여만 받은 해에는 모든 소득이 비과세라 종합소득세 신고 의무가 없어요. 연말정산도 해당 없어요.",
    badges: ["신고 불필요", "비과세 전액"],
    links: [
      { icon: "📄", title: "건강보험은 별개예요", href: "/w/실업급여-세금" },
    ],
  };

  if (income === "work_and_ui") return {
    pass: true,
    headline: "근로소득 부분만 연말정산하면 돼요",
    detail: "퇴직 전 근로소득이 있으면 중도 퇴직자 연말정산을 해야 해요. 실업급여는 비과세라 합산하지 않아요. 근로소득만 기준으로 환급 또는 추가 납부가 결정돼요.",
    badges: ["근로소득 연말정산", "실업급여 제외"],
    links: [
      { icon: "📄", title: "연말정산 가이드", href: "/w/실업급여-연말정산" },
    ],
  };

  if (income === "freelance_ui") return {
    pass: false,
    headline: "사업소득은 종합소득세 신고 대상이에요",
    detail: "프리랜서·사업소득은 실업급여와 별개로 5월에 종합소득세 신고를 해야 해요. 실업급여는 비과세라 합산하지 않지만, 사업소득은 별도 신고 대상이에요.",
    badges: ["사업소득 신고 필요", "실업급여 제외"],
    links: [
      { icon: "📄", title: "수급 중 소득 신고", href: "/w/실업급여-알바-미신고" },
    ],
  };

  if (income === "rehired_ui") return {
    pass: true,
    headline: "재취업 근로소득은 연말정산 대상이에요",
    detail: "재취업 후 받은 근로소득은 새 직장에서 연말정산해요. 실업급여 수령액은 신고하지 않아도 돼요.",
    badges: ["재취업 연말정산", "실업급여 별도"],
    links: [
      { icon: "📄", title: "기초일액 계산 기준", href: "/w/실업급여-기초일액" },
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
      breadcrumb={["홈", "실업급여", "비과세 소득"]}
      tags={["2026년 기준", "실업급여", "세금"]}
      date="2026-02-23"
      title="실업급여 비과세 소득 | 연말정산 소득세 신고 제외"
      description={
        <>
          실업급여는 <A href="https://www.law.go.kr/법령/소득세법">소득세법 제12조</A>에서 비과세 소득으로 분류하고 있어요. 세금이 전혀 붙지 않고, 연말정산이나 종합소득세 신고에도 포함되지 않아요. 받은 금액 그대로 <strong style={{ color: C.t1 }}>세금 없이 수령</strong>하는 구조예요.
        </>
      }
      sourceBar={{ badge: "출처", name: "소득세법 제12조 · 국세청", date: "2026.02 기준" }}
      stickyLabel="비과세 근거"
      stickyValue="소득세법 12조"
      stickyBtn="국세청 비과세 안내 →"
      stickyHref="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7714"
    >
      <TOC items={[
        { t: "세금 신고 필요 여부 체크", sub: "소득 유형별 간편 확인" },
        { t: "실업급여 비과세는 무슨 뜻인가요?", sub: null },
        { t: "실업급여 소득세 면제는 어떻게 되나요?", sub: null },
        { t: "실업급여 연말정산 제외는 왜 되나요?", sub: null },
        { t: "실업급여 종합소득세 신고는 어떻게 되나요?", sub: "소득 유형별 정리" },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "실업급여는 소득세법 제12조에 따른 <strong>비과세 소득, 세금 0원</strong>",
        "연말정산 소득 합산 대상 아님, <strong>근로소득만 따로 정산</strong>",
        "실업급여만 받은 해에는 <strong>종합소득세 신고 의무 없음</strong>",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="세금 신고 필요 여부 체크" sub="30초 확인 — 실업급여는 비과세지만 다른 소득이 있으면 달라져요" />

      <P>실업급여는 비과세지만, 다른 소득이 있으면 신고가 필요할 수 있어요. 올해 소득 상황에 맞게 확인해 보세요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x2714;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>세금 신고 필요 여부 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>소득 유형별 확인</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              올해 실업급여 외에 다른 소득이 있나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="income" value="only_ui" label="실업급여만 받았어요" sel={sel} pick={pick} />
              <Btn group="income" value="work_and_ui" label="퇴직 전 근로소득 + 실업급여" sel={sel} pick={pick} />
              <Btn group="income" value="freelance_ui" label="프리랜서 소득 + 실업급여" sel={sel} pick={pick} />
              <Btn group="income" value="rehired_ui" label="재취업 근로소득 + 실업급여" sel={sel} pick={pick} />
              <Btn group="income" value="unsure" label="잘 모르겠어요" sel={sel} pick={pick} />
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
      <Sec n="SECTION 02" title="실업급여 비과세는 무슨 뜻인가요?" sub="세금이 한 푼도 안 붙는다는 뜻이에요" />

      <P>비과세란 소득세를 부과하지 않는다는 뜻이에요. <A href="https://www.law.go.kr/법령/소득세법">소득세법 제12조</A>에서 실업급여(구직급여)는 비과세 소득으로 명시돼 있어요. 받은 금액 그대로 세금 없이 수령할 수 있어요.</P>

      <P>일반 근로소득은 소득세와 지방소득세가 원천징수되지만, 실업급여는 원천징수 자체가 없어요. 고용24에서 지급할 때 세금을 떼지 않고 전액 입금해요. 이 점이 급여명세서에 익숙한 분들한테는 생소할 수 있어요.</P>

      <P>비과세 소득은 과세 소득 합산 대상에서도 제외돼요. 종합소득세 신고 시 실업급여는 소득 금액에 넣지 않아요. 실업급여가 비과세인 건 고용보험 제도의 사회 안전망 취지 때문이에요. 실직자의 생계 보전을 위한 급여에서 다시 세금을 가져가는 건 제도 취지에 맞지 않아서 법적으로 면제하고 있어요.</P>

      <InlineLink icon="📄" title="건강보험 지역가입자 전환" desc="소득세는 면제인데 건강보험료는 별개예요. 지역가입자 전환 시점과 감면을 정리했어요." href="/w/실업급여-세금" />

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 소득세 면제는 어떻게 되나요?" sub="따로 신청할 필요 없이 자동 적용돼요" />

      <P>소득세 면제는 실업급여를 받는 시점부터 자동으로 적용돼요. 따로 신청하거나 서류를 내지 않아도 돼요. 고용센터에서 지급할 때부터 이미 비과세로 처리하기 때문에, 수급자가 할 일은 없어요.</P>

      <P>실업급여 외에 소득이 없다면 그 해에는 납부할 소득세가 0원이에요. 전년도에 원천징수된 세금이 있었다면 연말정산이나 종합소득세 신고를 통해 환급받을 수 있어요. 중도 퇴직한 해라면 퇴직월까지의 근로소득에 대해 연말정산을 하면 과납 세금을 돌려받을 수 있어요.</P>

      <P><B>실업급여 수령 기간 중 아르바이트나 프리랜서 소득이 생기면 세금 신고 의무가 따로 생겨요.</B> 해당 소득에 대한 세금은 별도로 계산돼요. 실업급여 자체는 여전히 비과세이지만, 다른 소득은 과세 대상이에요.</P>

      <Info type="warn">{'<strong>실업급여 수급 중 취업·알바는 고용센터에 신고해야 해요.</strong> 소득세와 별개로 취업 사실을 신고하지 않으면 <a href="/w/실업급여-부정수급" style="color:#1E3A5F;font-weight:600">부정수급</a>으로 처리될 수 있어요. 세금 문제보다 부정수급 문제가 훨씬 부담이 커요.'}</Info>

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 연말정산 제외는 왜 되나요?" sub="근로소득이 아니라 비과세 소득이기 때문이에요" />

      <P>연말정산은 근로소득자가 한 해 동안 납부한 소득세를 정산하는 절차예요. 실업급여는 근로소득이 아니고 비과세 소득이라 연말정산 소득 합산 대상이 아니에요. 재취업 후 연말정산을 할 때도 실업급여 수령액을 신고하지 않아도 돼요.</P>

      <P>실무에서 간혹 실업급여를 소득에 포함해야 하는지 헷갈려하는 경우가 있는데, 법적으로 포함 의무가 없어요. 재취업한 회사 인사팀에서도 실업급여 자료를 요구하지 않아요.</P>

      <P>퇴직 전 근로소득이 있다면 중도 퇴직자 연말정산을 해야 해요. 퇴직월까지의 근로소득에 대해서만 정산하면 되고, 이후 실업급여 기간은 포함하지 않아요.</P>

      <Info type="tip">{'<strong>실업급여를 소득에 잘못 포함했다면?</strong> 경정청구를 통해 돌려받을 수 있어요. <strong>5년 이내</strong>에 홈택스에서 경정청구를 하면 과납 세금을 환급받을 수 있어요.'}</Info>

      <InlineLink icon="💰" title="실업급여 연봉별 예상 수령액 계산" desc="퇴직 전 연봉 기준으로 실업급여 예상 수령액이 얼마인지 바로 계산할 수 있어요." href="/w/실업급여-연봉별-계산" />

      <div style={{ margin: "20px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 8 }}>{"📖 실업급여 세금·보험 더 알아보기"}</div>
        <SpokeLink num="01" title="건강보험 지역가입자 전환" desc="소득세 면제와 건강보험료는 별개" href="/w/실업급여-세금" />
        <SpokeLink num="02" title="국민연금 납부유예" desc="실업급여 기간 연금 납부 유예 조건" href="/w/실업급여-국민연금-유예" />
      </div>

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" title="실업급여 종합소득세 신고는 어떻게 되나요?" sub="다른 소득이 있으면 해당 소득만 신고해요" />

      <P>실업급여만 받은 해에는 종합소득세 신고 의무가 없어요. 비과세 소득만 있는 경우 신고 대상 소득이 0원이기 때문이에요. 5월 신고 기간이 와도 아무것도 하지 않아도 돼요.</P>

      <P>다른 소득이 있는 경우는 달라요. 같은 해에 사업소득, 기타 소득, 금융 소득(2천만원 초과) 등이 있다면 그 소득에 대해서는 종합소득세 신고를 해야 해요. 실업급여는 합산에서 빼고 나머지 소득만 신고하면 돼요.</P>

      <TableTitle>소득 유형별 세금·신고 정리</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>소득 유형</THL><TH>소득세</TH><TH>연말정산/종소세</TH><TH>고용센터 신고</TH></tr>
          </thead>
          <tbody>
            {[
              ["실업급여", "비과세", "불필요", "—"],
              ["아르바이트", "과세", "필요", "필수"],
              ["프리랜서·사업", "과세", "5월 종소세", "필수"],
              ["금융이자 (2천만↑)", "과세", "종소세", "—"],
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

      <P>여기서 중요한 건, 실업급여 기간 중 생긴 다른 소득은 고용센터에도 신고해야 한다는 거예요. 세금 문제와 별개로 취업 사실을 신고하지 않으면 부정수급으로 처리될 수 있어요. 세금보다 부정수급 반환·추가징수 부담이 훨씬 커요.</P>

      <BridgeCard
        question="건강보험료는 어떻게 되는지 궁금하시죠?"
        body={<>소득세는 면제지만 건강보험료는 별개예요. 실업급여를 받는 동안 <strong style={{ color: C.navy }}>지역가입자로 전환되는 시점</strong>과 보험료 감면 방법을 정리했어요.</>}
        btnText="건강보험 지역가입자 전환 보기 →"
        href="/w/실업급여-세금"
      />

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 비과세이면 건강보험료도 안 내나요?", a: '건강보험료는 별개예요. 실업급여를 받는 동안 <strong>지역가입자로 전환</strong>되면 재산 기준으로 보험료가 부과돼요. 소득세 면제와 건강보험료는 다른 문제예요.' },
        { q: "실업급여 받은 해에 다른 소득도 있으면 종합소득세 신고해야 하나요?", a: '실업급여 자체는 비과세라 신고 대상이 아니에요. 하지만 같은 해에 <strong>근로소득이나 사업소득</strong>이 있으면 해당 소득에 대한 신고는 해야 해요.' },
      ]} />

      <RelatedArticles items={[
        { title: "실업급여 수급 중 건강보험", desc: "실업급여 · 건강보험", href: "/w/실업급여-세금" },
        { title: "실업급여 국민연금 납부유예", desc: "실업급여 · 국민연금", href: "/w/실업급여-국민연금-유예" },
        { title: "실업급여 연말정산", desc: "실업급여 · 세금", href: "/w/실업급여-연말정산" },
      ]} />

      <PrevNext
        prev={{ title: "부정수급 형사처벌 기준", href: "/w/실업급여-부정수급" }}
        next={{ title: "실업급여 상한액 인상", href: "/w/실업급여-상한액" }}
      />
    </BlogLayout>
  );
}
