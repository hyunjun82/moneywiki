"use client";

import { useState } from "react";
import {
  C, Btn, Info, Divider, Sec, P, B, A, H3,
  TableTitle, TableNote, TH, THL,
  BridgeCard, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext,
  InlineLink, SpokeLink,
} from "@/components/wiki/BlogShared";

// ── 체커 로직: 월급여별 기초일액 예상 ──
type ResLink = { icon: string; title: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; amount?: string; links: ResLink[] };

const checkerLinks: ResLink[] = [
  { icon: "\uD83D\uDCC5", title: "\uC18C\uC815\uAE09\uC5EC\uC77C\uC218 \uB098\uC774\uBCC4 \uAE30\uAC04 \uBCF4\uAE30", href: "/w/\uC2E4\uC5C5\uAE09\uC5EC-\uC18C\uC815\uAE09\uC5EC\uC77C\uC218" },
  { icon: "\uD83D\uDCB0", title: "\uC5F0\uBD09\uBCC4 \uC608\uC0C1 \uC218\uB839\uC561 \uACC4\uC0B0", href: "/w/\uC2E4\uC5C5\uAE09\uC5EC-\uC5F0\uBD09\uBCC4-\uACC4\uC0B0" },
];

function getResult(sel: Record<string, string>): Res | null {
  const { salary } = sel;
  if (!salary) return null;

  if (salary === "under250") return { pass: true, headline: "\uD558\uD55C\uC561 66,048\uC6D0\uC774 \uC801\uC6A9\uB420 \uAC00\uB2A5\uC131\uC774 \uB192\uC544\uC694", detail: "\uC6D4 250\uB9CC\uC6D0 \uBBF8\uB9CC\uC774\uBA74 \uD3C9\uADE0\uC784\uAE08\uC758 60%\uAC00 \uD558\uD55C\uC561(66,048\uC6D0)\uBCF4\uB2E4 \uB0AE\uC544\uC11C \uD558\uD55C\uC561\uC774 \uBCF4\uC7A5\uB3FC\uC694. \uCD5C\uC800\uC784\uAE08\uC758 80% \u00D7 8\uC2DC\uAC04\uC73C\uB85C \uACC4\uC0B0\uD55C \uAE08\uC561\uC774\uC5D0\uC694.", badges: ["\uD558\uD55C\uC561 \uBCF4\uC7A5", "66,048\uC6D0/\uC77C"], amount: "66,048\uC6D0", links: checkerLinks };
  if (salary === "250to400") return { pass: true, headline: "\uC9C1\uC811 \uACC4\uC0B0\uC774 \uD544\uC694\uD574\uC694 (66,048~68,100\uC6D0 \uBC94\uC704)", detail: "\uC6D4 250~400\uB9CC\uC6D0 \uAD6C\uAC04\uC740 \uD3C9\uADE0\uC784\uAE08 60%\uAC00 \uD558\uD55C\uC561\uACFC \uC0C1\uD55C\uC561 \uC0AC\uC774\uC5D0 \uD574\uB2F9\uD574\uC694. \uD1F4\uC9C1 \uC804 3\uAC1C\uC6D4 \uC784\uAE08\uCD1D\uC561\uC744 \uCD1D\uC77C\uC218\uB85C \uB098\uB220 \uACC4\uC0B0\uD574\uC57C \uC815\uD655\uD55C \uAE08\uC561\uC744 \uC54C \uC218 \uC788\uC5B4\uC694.", badges: ["\uC9C1\uC811 \uACC4\uC0B0 \uD544\uC694", "\uAC1C\uC778\uBCC4 \uC0C1\uC774"], links: checkerLinks };
  if (salary === "400to600") return { pass: true, headline: "\uC0C1\uD55C\uC561 68,100\uC6D0\uC774 \uC801\uC6A9\uB3FC\uC694", detail: "\uC6D4 400\uB9CC\uC6D0 \uC774\uC0C1\uC774\uBA74 \uD3C9\uADE0\uC784\uAE08\uC758 60%\uAC00 \uC0C1\uD55C\uC561(68,100\uC6D0)\uC744 \uCD08\uACFC\uD574\uC694. \uC2E4\uC81C \uAE09\uC5EC\uAC00 \uB192\uC544\uB3C4 1\uC77C \uCD5C\uB300 68,100\uC6D0\uAE4C\uC9C0\uB9CC \uBC1B\uC744 \uC218 \uC788\uC5B4\uC694.", badges: ["\uC0C1\uD55C\uC561 \uC801\uC6A9", "68,100\uC6D0/\uC77C"], amount: "68,100\uC6D0", links: checkerLinks };
  if (salary === "over600") return { pass: true, headline: "\uC0C1\uD55C\uC561 68,100\uC6D0\uC73C\uB85C \uACE0\uC815\uB3FC\uC694", detail: "\uC6D4 600\uB9CC\uC6D0 \uC774\uC0C1\uC774\uB77C\uB3C4 1\uC77C \uCD5C\uB300 68,100\uC6D0\uAE4C\uC9C0\uB9CC \uBC1B\uC744 \uC218 \uC788\uC5B4\uC694. \uC18C\uC815\uAE09\uC5EC\uC77C\uC218\uAC00 180\uC77C\uC774\uBA74 \uCD1D 12,258,000\uC6D0\uC774 \uC0C1\uD55C\uC774\uC5D0\uC694.", badges: ["\uC0C1\uD55C\uC561 \uACE0\uC815", "68,100\uC6D0/\uC77C"], amount: "68,100\uC6D0", links: checkerLinks };

  return null;
}

export default function Article() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "기초일액"]}
      tags={["2026년 기준", "실업급여", "기초일액"]}
      date="2026-02-20"
      title="실업급여 기초일액 평균임금 60% | 상한액 하한액 기준"
      description={
        <>
          퇴직 전 평균임금의 60%가 기초일액이에요. 2026년 상한액 <strong style={{ color: C.t1 }}>68,100원</strong>, 하한액 <strong style={{ color: C.t1 }}>66,048원</strong>. 둘의 차이가 겨우 2,052원이에요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제45조 · 고용24", date: "2026.02 기준" }}
      stickyLabel="1일 최대"
      stickyValue="68,100원"
      stickyBtn="모의계산기 바로가기 →"
      stickyHref="https://www.work24.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do"
    >
      <TOC items={[
        { t: "내 기초일액 예상 체크", sub: "월급여별 상한·하한 적용 확인" },
        { t: "기초일액은 어떻게 계산하나요?", sub: null },
        { t: "평균임금 60% 산정은 어떻게 하나요?", sub: null },
        { t: "상한액 하한액은 얼마인가요?", sub: "2026년 기초일액 상한액·하한액 기준" },
        { t: "기초일액 기준 수령액은 얼마인가요?", sub: null },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "실업급여 기초일액은 퇴직 전 3개월 <strong>평균임금의 60%</strong>로 계산해요.",
        "2026년 기준 상한액은 1일 <strong>68,100원</strong>, 하한액은 1일 <strong>66,048원</strong>이에요.",
        "총 수령액은 기초일액 × 소정급여일수(<strong>120~270일</strong>)로 결정돼요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="내 기초일액 예상 체크" sub="퇴직 전 월급여를 선택하면 적용 기준을 알려드려요" />

      <P>기초일액은 평균임금의 60%지만 상한액과 하한액이 있어요. 월 급여 수준별로 어떤 기준이 적용되는지 확인해 보세요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x2714;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>기초일액 예상 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>상한·하한 적용 여부 확인</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              퇴직 전 세전 월 급여는 얼마였나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="salary" value="under250" label="250만원 미만" sel={sel} pick={pick} />
              <Btn group="salary" value="250to400" label="250~400만원" sel={sel} pick={pick} />
              <Btn group="salary" value="400to600" label="400~600만원" sel={sel} pick={pick} />
              <Btn group="salary" value="over600" label="600만원 이상" sel={sel} pick={pick} />
            </div>
          </div>

          {result && (
            <div style={{ marginTop: 16, padding: 16, borderRadius: 8, background: C.navyLight, border: "1px solid rgba(30,58,95,.1)" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.navy, marginBottom: 4 }}>{result.headline}</div>
              {result.amount && (
                <div style={{ fontSize: 22, fontWeight: 900, color: C.navy, margin: "8px 0 4px" }}>
                  1일 {result.amount} <span style={{ fontSize: 12, color: C.t3, fontWeight: 400 }}>예상 기초일액</span>
                </div>
              )}
              <div style={{ fontSize: 13, color: C.t3, lineHeight: 1.55 }}>{result.detail}</div>
              <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" }}>
                {result.badges.map((b, i) => (
                  <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, background: C.navy, color: "#fff" }}>{b}</span>
                ))}
              </div>
              {result.links.length > 0 && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(30,58,95,.08)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.t1, marginBottom: 6 }}>{"\uD83D\uDCD6 \uAD00\uB828 \uAC00\uC774\uB4DC"}</div>
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
      <Sec n="SECTION 02" title="실업급여 기초일액은 어떻게 계산하나요?" sub="퇴직 전 3개월 평균임금 × 60%" />

      <P><A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제45조</A>에서 구직급여일액은 기초일액 × 60%로 정하고 있는데, 기초일액 자체가 평균임금이기 때문에 실질적으로는 <B>평균임금 × 60%</B>예요.</P>

      <P>평균임금은 퇴직 전 3개월 동안 받은 임금 총액을 그 기간의 총 일수(역일 기준)로 나눈 금액이에요. 예를 들어 퇴직 전 3개월 임금 합계가 900만원이고 총일수가 91일이라면, 평균임금은 약 98,901원이에요. 이에 60%를 곱하면 59,341원이 나오는데, 이 금액이 하한액(66,048원)보다 낮으니까 하한액이 적용돼요.</P>

      <div style={{ background: C.navyLight, border: "1px solid rgba(30,58,95,.08)", borderRadius: 8, padding: "14px 16px", margin: "12px 0", textAlign: "center" }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.navy, marginBottom: 6 }}>기초일액 = 퇴직 전 3개월 임금총액 &divide; 총일수 &times; 60%</div>
        <div style={{ fontSize: 12, color: C.t3 }}>퇴직금·미사용 연차수당·경조사비는 임금총액에서 제외</div>
      </div>

      <P>기초일액 계산에서 퇴직금, 퇴직 시 일시 지급되는 미사용 연차수당, 경조사비 같은 일시금은 평균임금에서 제외돼요. 일상적으로 지급받은 기본급, 직책수당, 교통비, 분기별 상여금의 해당 기간 분만 포함해요.</P>

      <InlineLink icon={"\uD83D\uDCC5"} title={"\uC2E4\uC5C5\uAE09\uC5EC \uAE30\uC900\uAE30\uAC04 18\uAC1C\uC6D4 \uD53C\uBCF4\uD5D8 180\uC77C"} desc={"\uAE30\uCD08\uC77C\uC561 \uACC4\uC0B0 \uC804\uC5D0 \uD53C\uBCF4\uD5D8\uAE30\uAC04 180\uC77C \uCDA9\uC871 \uC5EC\uBD80\uBD80\uD130 \uD655\uC778\uC774 \uD544\uC694\uD574\uC694."} href="/w/\uC2E4\uC5C5\uAE09\uC5EC-\uAE30\uC900\uAE30\uAC04" />

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" title="평균임금 60% 산정은 어떻게 하나요?" sub="퇴직일 이전 3개월 역산" />

      <P>평균임금 산정 기간은 퇴직일 이전 3개월이에요. 달마다 일수가 달라서 3개월 총일수는 89~92일 사이가 되는 경우가 많아요. 2월이 포함되면 더 짧아지고, 총일수가 달라지면 평균임금도 달라져요.</P>

      <P>임금 합산 시 상여금 처리가 중요해요. 분기별 상여금이 있다면 퇴직 전 3개월에 해당하는 비율만 계산해요. 예를 들어 연간 상여금이 360만원이라면 3개월 치인 90만원만 합산해요.</P>

      <P><B>평균임금이 최저임금 미만으로 나오면 최저임금을 기준으로 산정해요.</B> 이 경우에도 60%를 적용한 금액이 하한액(66,048원)보다 낮으면 하한액이 보장돼요. 결국 실업급여는 아무리 낮아도 1일 66,048원 이상은 받을 수 있어요.</P>

      <Info type="tip">{'<strong>증빙 준비:</strong> 고용센터에서 자동 계산해주지만, 퇴직 전 <strong>3개월치 급여명세서</strong>를 보관해두면 이의 신청 시 유리해요.'}</Info>

      <InlineLink icon={"\uD83D\uDCB0"} title={"\uC2E4\uC5C5\uAE09\uC5EC \uC5F0\uBD09\uBCC4 \uC608\uC0C1 \uC218\uB839\uC561 \uACC4\uC0B0"} desc={"\uB0B4 \uC5F0\uBD09 \uAE30\uC900\uC73C\uB85C \uC2E4\uC5C5\uAE09\uC5EC \uC608\uC0C1 \uC218\uB839\uC561\uC774 \uC5BC\uB9C8\uC778\uC9C0 \uBC14\uB85C \uACC4\uC0B0\uD560 \uC218 \uC788\uC5B4\uC694."} href="/w/\uC2E4\uC5C5\uAE09\uC5EC-\uC5F0\uBD09\uBCC4-\uACC4\uC0B0" />

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" title="상한액 하한액은 얼마인가요?" sub="2026년 기준 상한 68,100원 · 하한 66,048원" />

      <P>2026년 기준 실업급여 기초일액 상한액은 <B>68,100원</B>이에요. 2020년 이후 오랫동안 유지되다가 2026년에 인상됐어요. 하한액은 <B>66,048원</B>이에요. 최저임금의 80%에 하루 8시간을 곱한 금액이에요.</P>

      <P>상한액과 하한액의 차이가 <B>2,052원</B>밖에 안 돼요. 최저임금이 꾸준히 인상된 반면 상한액 인상이 더뎠던 결과예요. 사실상 많은 수급자가 하한액과 상한액 사이의 좁은 범위에서 실업급여를 받아요.</P>

      <TableTitle>2026년 기초일액 상한액·하한액 기준</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>구분</THL><TH>금액</TH><TH>적용 조건</TH></tr>
          </thead>
          <tbody>
            {[
              ["상한액", "68,100원/일", "평균임금 × 60% > 68,100원"],
              ["하한액", "66,048원/일", "평균임금 × 60% < 66,048원"],
              ["개인별 적용", "해당 금액", "두 금액 사이인 경우"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 8px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 || ri < 2 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>※ 하한액 = 최저임금 10,320원 × 80% × 8시간 = 66,048원</TableNote>

      <div style={{ margin: "20px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 8 }}>{"\uD83D\uDCD6 \uAE30\uCD08\uC77C\uC561 \uAD00\uB828 \uB354 \uC54C\uC544\uBCF4\uAE30"}</div>
        <SpokeLink num="01" title={"\uAE30\uC900\uAE30\uAC04 18\uAC1C\uC6D4 \uD53C\uBCF4\uD5D8 180\uC77C \uD569\uC0B0"} desc={"\uC774\uC9C1\uC77C \uAE30\uC900 18\uAC1C\uC6D4 \uC5ED\uC0B0 \uBC29\uBC95"} href="/w/\uC2E4\uC5C5\uAE09\uC5EC-\uAE30\uC900\uAE30\uAC04" />
        <SpokeLink num="02" title={"\uC5F0\uBD09\uBCC4 \uC608\uC0C1 \uC218\uB839\uC561 \uACC4\uC0B0"} desc={"\uB0B4 \uC5F0\uBD09 \uAE30\uC900 \uC2E4\uC5C5\uAE09\uC5EC \uACC4\uC0B0"} href="/w/\uC2E4\uC5C5\uAE09\uC5EC-\uC5F0\uBD09\uBCC4-\uACC4\uC0B0" />
        <SpokeLink num="03" title={"\uC18C\uC815\uAE09\uC5EC\uC77C\uC218 \uB098\uC774\uBCC4 \uAE30\uAC04"} desc={"\uB098\uC774\u00B7\uD53C\uBCF4\uD5D8\uAE30\uAC04\uBCC4 120~270\uC77C"} href="/w/\uC2E4\uC5C5\uAE09\uC5EC-\uC18C\uC815\uAE09\uC5EC\uC77C\uC218" />
      </div>

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" title="기초일액 기준 수령액은 얼마인가요?" sub="기초일액 × 소정급여일수 = 총 수령액" />

      <P>총 수령액은 기초일액에 소정급여일수를 곱해서 계산해요. 기초일액이 68,100원이고 소정급여일수가 180일이라면, 총 68,100원 × 180일 = <B>12,258,000원</B>이에요.</P>

      <P>소정급여일수는 나이와 고용보험 피보험기간에 따라 120~270일로 달라져요. 50세 이상이거나 장애인이면서 피보험기간이 10년 이상이면 최대 270일을 받을 수 있어요. 기초일액이 같아도 소정급여일수에 따라 총 수령액이 두 배 이상 차이날 수 있어요.</P>

      <P><B>실업급여는 실업인정 단위로 나눠 지급돼요.</B> 약 4주마다 실업인정일에 구직활동 실적을 제출하면 해당 기간분이 지급되는 방식이에요.</P>

      <BridgeCard
        question="내 소정급여일수가 몇 일인지 아직 모르세요?"
        body={<>기초일액이 같아도 소정급여일수에 따라 총 수령액이 크게 달라져요. 나이와 피보험기간에 따라 <strong style={{ color: C.navy }}>120~270일</strong> 범위에서 결정되는 기준을 정리했어요.</>}
        btnText="소정급여일수 기준 보기 →"
        href="/w/실업급여-소정급여일수"
      />

      <InlineLink icon={"\uD83D\uDCC8"} title={"2026\uB144 \uC2E4\uC5C5\uAE09\uC5EC \uC0C1\uD55C\uC561 \uBCC0\uACBD \uB0B4\uC6A9"} desc={"6\uB144 \uB9CC\uC5D0 \uC0C1\uD55C\uC561\uC774 68,100\uC6D0\uC73C\uB85C \uC778\uC0C1\uB410\uC5B4\uC694. \uC6D4 \uCD5C\uB300 \uC218\uB839\uC561\uACFC \uC778\uC0C1 \uBC30\uACBD\uC744 \uC815\uB9AC\uD588\uC5B4\uC694."} href="/w/\uC2E4\uC5C5\uAE09\uC5EC-\uC0C1\uD55C\uC561" />

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 기초일액 계산에서 퇴직금도 포함되나요?", a: '퇴직금은 평균임금 계산에 <strong>포함되지 않아요</strong>. 퇴직 전 3개월간 실제로 받은 기본급, 수당, 분기별 상여금의 해당 기간 분만 합산해요. 퇴직 시 일시 지급되는 미사용 연차수당도 제외해요.' },
        { q: "실업급여 기초일액 상한액과 하한액 차이가 얼마나 나나요?", a: '2026년 기준으로 상한액(68,100원)과 하한액(66,048원)의 차이는 <strong>2,052원</strong>이에요. 최저임금이 꾸준히 올라 두 금액이 가까워졌어요.' },
      ]} />

      <RelatedArticles items={[
        { title: "실업급여 상한액 — 2026년 인상 기준", desc: "실업급여 · 상한액", href: "/w/실업급여-상한액" },
        { title: "실업급여 소정급여일수 — 나이별 기간", desc: "실업급여 · 소정급여일수", href: "/w/실업급여-소정급여일수" },
        { title: "실업급여 계산기 — 예상 수령액 계산", desc: "실업급여 · 계산기", href: "/w/실업급여-계산기" },
        { title: "실업급여 기준기간 — 피보험 180일 합산", desc: "실업급여 · 기준기간", href: "/w/실업급여-기준기간" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 기준기간 18개월", href: "/w/실업급여-기준기간" }}
        next={{ title: "실업급여 미지급 유족 청구", href: "/w/실업급여-미지급-상속" }}
      />
    </BlogLayout>
  );
}
