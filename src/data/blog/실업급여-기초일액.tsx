"use client";

import { useState } from "react";
import {
  C, Btn, Info, Divider, Sec, P, B, A, H3,
  TableTitle, TableNote, TH, THL,
  BridgeCard, ExtBtn, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext,
} from "@/components/wiki/BlogShared";

// ── 체커 로직: 월급여별 기초일액 예상 ──
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; amount?: string };

function getResult(sel: Record<string, string>): Res | null {
  const { salary } = sel;
  if (!salary) return null;

  if (salary === "under250") return { pass: true, headline: "하한액 66,048원이 적용될 가능성이 높아요", detail: "월 250만원 미만이면 평균임금의 60%가 하한액(66,048원)보다 낮아서 하한액이 보장돼요. 최저임금의 80% × 8시간으로 계산한 금액이에요.", badges: ["하한액 보장", "66,048원/일"], amount: "66,048원" };
  if (salary === "250to400") return { pass: true, headline: "직접 계산이 필요해요 (66,048~68,100원 범위)", detail: "월 250~400만원 구간은 평균임금 60%가 하한액과 상한액 사이에 해당해요. 퇴직 전 3개월 임금총액을 총일수로 나눠 계산해야 정확한 금액을 알 수 있어요.", badges: ["직접 계산 필요", "개인별 상이"] };
  if (salary === "400to600") return { pass: true, headline: "상한액 68,100원이 적용돼요", detail: "월 400만원 이상이면 평균임금의 60%가 상한액(68,100원)을 초과해요. 실제 급여가 높아도 1일 최대 68,100원까지만 받을 수 있어요.", badges: ["상한액 적용", "68,100원/일"], amount: "68,100원" };
  if (salary === "over600") return { pass: true, headline: "상한액 68,100원으로 고정돼요", detail: "월 600만원 이상이라도 1일 최대 68,100원까지만 받을 수 있어요. 소정급여일수가 180일이면 총 12,258,000원이 상한이에요.", badges: ["상한액 고정", "68,100원/일"], amount: "68,100원" };

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
        { t: "상한액 하한액은 얼마인가요?", sub: "2026년 기준 금액표" },
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

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" title="평균임금 60% 산정은 어떻게 하나요?" sub="퇴직일 이전 3개월 역산" />

      <P>평균임금 산정 기간은 퇴직일 이전 3개월이에요. 달마다 일수가 달라서 3개월 총일수는 89~92일 사이가 되는 경우가 많아요. 2월이 포함되면 더 짧아지고, 총일수가 달라지면 평균임금도 달라져요.</P>

      <P>임금 합산 시 상여금 처리가 중요해요. 분기별 상여금이 있다면 퇴직 전 3개월에 해당하는 비율만 계산해요. 예를 들어 연간 상여금이 360만원이라면 3개월 치인 90만원만 합산해요.</P>

      <P><B>평균임금이 최저임금 미만으로 나오면 최저임금을 기준으로 산정해요.</B> 이 경우에도 60%를 적용한 금액이 하한액(66,048원)보다 낮으면 하한액이 보장돼요. 결국 실업급여는 아무리 낮아도 1일 66,048원 이상은 받을 수 있어요.</P>

      <Info type="tip">{'<strong>증빙 준비:</strong> 고용센터에서 자동 계산해주지만, 퇴직 전 <strong>3개월치 급여명세서</strong>를 보관해두면 이의 신청 시 유리해요.'}</Info>

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

      <BridgeCard
        question="2026년 상한액이 6년 만에 바뀐 거 아셨나요?"
        body={<>2026년 실업급여 상한액이 <strong style={{ color: C.navy }}>68,100원</strong>으로 인상됐어요. 월 최대 수령액이 얼마인지, 인상 배경까지 정리했어요.</>}
        btnText="2026년 상한액 변경 내용 보기 →"
        href="/w/실업급여-상한액"
      />

      <ExtBtn badge="고용24 공식" text="실업급여 모의계산기" cta="계산하기 →" href="https://www.work24.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do" />

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
