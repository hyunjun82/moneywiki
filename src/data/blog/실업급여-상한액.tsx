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
  const { salary, period } = sel;
  if (!salary) return null;

  if (salary === "under300") return {
    pass: true,
    headline: "하한액 66,048원이 적용될 가능성이 높아요",
    detail: "월 300만원 미만이면 평균임금의 60%가 하한액보다 낮을 수 있어요. 하한액이 보장 기준이 돼요.",
    badges: ["하한액 적용", "일 66,048원"],
    links: [
      { icon: "💰", title: "기초일액 계산", href: "/w/실업급여-기초일액" },
    ],
  };

  if (salary === "300to400") return {
    pass: true,
    headline: "상한액과 하한액 사이 구간이에요",
    detail: "월 300~400만원 구간은 평균임금의 60%가 하한액과 상한액 사이예요. 실제 3개월 임금총액으로 계산해야 정확해요.",
    badges: ["개인별 계산 필요"],
    links: [
      { icon: "💰", title: "기초일액 직접 계산", href: "/w/실업급여-기초일액" },
      { icon: "🔗", title: "고용24 모의계산기", href: "https://www.work24.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do" },
    ],
  };

  if (salary === "over400") {
    if (period === "over10") return {
      pass: true,
      headline: "상한액 68,100원 + 소정급여일수 최대 270일이에요",
      detail: "평균임금의 60%가 상한액을 초과해요. 1일 최대 68,100원, 소정급여일수 최대 270일이면 총 18,387,000원이에요.",
      badges: ["상한액 적용", "최대 270일"],
      links: [
        { icon: "📄", title: "소정급여일수 기준", href: "/w/실업급여-수급기간" },
      ],
    };

    return {
      pass: true,
      headline: "상한액 68,100원이 적용돼요",
      detail: "평균임금의 60%가 상한액을 초과해요. 1일 최대 68,100원이 지급되고, 소정급여일수에 따라 총액이 결정돼요.",
      badges: ["상한액 적용", "일 68,100원"],
      links: [
        { icon: "💰", title: "기초일액 계산", href: "/w/실업급여-기초일액" },
        { icon: "📄", title: "소정급여일수 기준", href: "/w/실업급여-수급기간" },
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
      breadcrumb={["홈", "실업급여", "상한액"]}
      tags={["2026년 기준", "실업급여", "상한액"]}
      date="2026-02-23"
      title="2026년 실업급여 상한액 인상 금액 | 일 68,100원 월 수령액 계산"
      description={
        <>
          2026년 1월 1일부터 실업급여 상한액이 <strong style={{ color: C.t1 }}>1일 68,100원</strong>으로 인상됐어요. 2019년 이후 66,000원으로 동결됐던 게 6년 만에 바뀐 거예요. 월 최대 수령액은 약 204만원이에요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 시행령 · 고용24", date: "2026.02 기준" }}
      stickyLabel="상한액 기준"
      stickyValue="일 68,100원"
      stickyBtn="고용24 모의계산 →"
      stickyHref="https://www.work24.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do"
    >
      <TOC items={[
        { t: "내 실업급여에 상한액이 적용되나요?", sub: "월 급여별 간편 확인" },
        { t: "2026년 실업급여 상한액은 얼마인가요?", sub: null },
        { t: "실업급여 상한액 인상 금액은 어떻게 되나요?", sub: "연도별 상한·하한 변화" },
        { t: "실업급여 일 68,100원은 어떻게 계산하나요?", sub: "급여별 3가지 사례" },
        { t: "실업급여 월 수령액은 어떻게 계산하나요?", sub: "소정급여일수별 총액표" },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "2026년 실업급여 상한액: <strong>1일 68,100원</strong> (2019년 이후 6년 만에 인상)",
        "월 최대 수령액: 68,100원 × 30일 = <strong>2,043,000원</strong>",
        "하한액(66,048원)과의 차이 <strong>2,052원</strong>으로 대부분 비슷한 금액 수령",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="내 실업급여에 상한액이 적용되나요?" sub="30초 확인 — 월 급여와 근무기간을 선택하면 바로 알 수 있어요" />

      <P>퇴직 전 월 급여 수준에 따라 상한액 적용 여부가 달라져요. 내 상황에 맞는지 확인해 보세요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x2714;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>상한액 적용 여부 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>월 급여 기준 계산</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              퇴직 전 세전 월 급여는 얼마였나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="salary" value="under300" label="300만원 미만" sel={sel} pick={pick} />
              <Btn group="salary" value="300to400" label="300~400만원" sel={sel} pick={pick} />
              <Btn group="salary" value="over400" label="400만원 이상" sel={sel} pick={pick} />
            </div>
          </div>
          {sel.salary === "over400" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
                <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
                총 피보험기간(근무기간)은 얼마나 되나요?
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                <Btn group="period" value="under5" label="5년 미만" sel={sel} pick={pick} />
                <Btn group="period" value="5to10" label="5~10년" sel={sel} pick={pick} />
                <Btn group="period" value="over10" label="10년 이상" sel={sel} pick={pick} />
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
      <Sec n="SECTION 02" title="2026년 실업급여 상한액은 얼마인가요?" sub="1일 68,100원, 비과세 실수령액이에요" />

      <P>2026년 실업급여 구직급여일액 상한액은 <B>1일 68,100원</B>이에요. <A href="https://www.law.go.kr/법령/고용보험법시행령">고용보험법 시행령</A>에서 정하고 있고, 2026년 1월 1일 이후 퇴사자부터 적용돼요.</P>

      <div style={{ background: C.navyLight, border: `1px solid rgba(30,58,95,.1)`, borderRadius: 10, padding: "16px 18px", margin: "14px 0" }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: C.navy, marginBottom: 6 }}>1일 지급액 산정 공식</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.t1 }}>1일 지급액 = 퇴직 전 3개월 평균임금 × 60%</div>
        <div style={{ fontSize: 12, color: C.t3, marginTop: 4, lineHeight: 1.5 }}>상한액: 일 68,100원 / 하한액: 일 66,048원<br/>평균임금 × 60%가 상한·하한 범위를 벗어나면 해당 한도가 적용</div>
      </div>

      <P>상한액은 실수령액이에요. 실업급여는 비과세 소득이라 원천징수가 없어요. 68,100원 전액이 그대로 입금돼요. 2025년까지는 66,000원이었는데, 최저임금 인상으로 하한액이 상한액에 근접하면서 역전 가능성이 커지자 조정된 거예요.</P>

      <InlineLink icon="💰" title="기초일액 상한·하한 기준" desc="평균임금 60%와 상·하한액 적용 기준을 정리했어요." href="/w/실업급여-기초일액" />

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 상한액 인상 금액은 어떻게 되나요?" sub="6년 만에 2,100원 올라 3.2% 인상" />

      <P>2025년까지 상한액은 66,000원이었어요. 2026년에 68,100원으로 올라 1일 기준 2,100원이 인상됐어요. 비율로는 약 3.2% 인상이에요.</P>

      <P>같은 기간 하한액도 올랐어요. 2026년 최저임금이 10,320원으로 인상되면서 하한액은 <B>66,048원</B>(10,320원 × 8시간 × 80%)이 됐어요. 상한액(68,100원)과 하한액(66,048원)의 차이는 2,052원밖에 안 돼요.</P>

      <TableTitle>연도별 상한액·하한액 변화</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>연도</THL><TH>상한액</TH><TH>하한액</TH><TH>차이</TH></tr>
          </thead>
          <tbody>
            {[
              ["2019~2025년", "66,000원", "61,568원 (2025)", "4,432원"],
              ["2026년", "68,100원", "66,048원", "2,052원"],
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

      <P>여기서 중요한 건, 상한액과 하한액의 격차가 거의 없어졌다는 거예요. 월급이 200만원이든 500만원이든 실업급여 지급액이 비슷한 구조가 된 거예요. 고소득자 입장에서는 상한액 인상 폭이 기대보다 작을 수 있어요.</P>

      <Info type="warn">{'<strong>2025년 12월 31일 이전 퇴사자는 이전 기준이 적용돼요.</strong> 상한액 68,100원은 2026년 1월 1일 이후 이직한 사람부터 적용돼요. 2025년에 퇴사하고 2026년에 수급을 시작해도 퇴사일 기준으로 적용돼요.'}</Info>

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 일 68,100원은 어떻게 계산하나요?" sub="급여 수준별 3가지 사례로 비교해 보세요" />

      <P>상한액이 적용되는지는 본인의 평균임금에서 시작해요. 퇴직 전 3개월간의 총 임금을 총 일수로 나눈 게 평균임금이고, 여기에 60%를 곱한 게 기초일액이에요. 이 기초일액이 68,100원을 넘으면 상한액이 적용돼요.</P>

      <H3>사무직 김 대리(32세), 월급 450만원</H3>
      <P>3개월 총 임금 1,350만원 ÷ 91일 = 평균임금 148,352원. 기초일액은 148,352원 × 60% = 89,011원인데, 상한액을 초과하니까 <B>68,100원이 적용</B>돼요. 소정급여일수 150일이면 총 수령액은 68,100원 × 150일 = 10,215,000원이에요.</P>

      <H3>판매직 박 씨(28세), 월급 250만원</H3>
      <P>3개월 총 임금 750만원 ÷ 91일 = 평균임금 82,418원. 기초일액은 82,418원 × 60% = 49,451원인데, 하한액보다 낮아서 <B>하한액 66,048원이 적용</B>돼요. 소정급여일수 120일이면 66,048원 × 120일 = 7,925,760원이에요.</P>

      <H3>경력 12년 이 과장(45세), 월급 500만원</H3>
      <P>기초일액은 98,901원이지만 상한액 68,100원이 적용돼요. 다만 피보험기간 10년 이상 + 45세이므로 소정급여일수가 <B>240일</B>로 길어져요. 총 수령액은 68,100원 × 240일 = 16,344,000원이에요. 같은 상한액이라도 소정급여일수가 길면 총액에서 큰 차이가 나요.</P>

      <TableTitle>급여별 상한액 적용 비교</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>월 급여</THL><TH>평균임금</TH><TH>기초일액 (60%)</TH><TH>적용 금액</TH></tr>
          </thead>
          <tbody>
            {[
              ["250만원", "82,418원", "49,451원", "하한액 66,048원"],
              ["350만원", "115,385원", "69,231원", "상한액 68,100원"],
              ["450만원", "148,352원", "89,011원", "상한액 68,100원"],
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

      <InlineLink icon="💰" title="기초일액 직접 계산" desc="퇴직 전 3개월 임금만 알면 30초에 기초일액이 나와요." href="/w/실업급여-기초일액" />

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" title="실업급여 월 수령액은 어떻게 계산하나요?" sub="실업인정 4주 단위로 입금돼요" />

      <P>월 수령액은 1일 지급액에 실업인정 주기를 곱하면 돼요. 실업인정은 4주(28일) 단위로 이뤄지기 때문에 실제 입금 주기도 28일이에요. 상한액 기준으로 계산하면 68,100원 × 28일 = 1,906,800원이에요.</P>

      <P>30일 기준으로 환산하면 68,100원 × 30일 = <B>2,043,000원</B>이에요. 소정급여일수별 총 수령액은 이래요.</P>

      <TableTitle>소정급여일수별 총 수령액 (상한액 68,100원 기준)</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>소정급여일수</THL><TH>총 수령액</TH><TH>주요 해당자</TH></tr>
          </thead>
          <tbody>
            {[
              ["120일", "8,172,000원", "피보험 1년 미만, 50세 미만"],
              ["150일", "10,215,000원", "피보험 1~3년"],
              ["180일", "12,258,000원", "피보험 3~5년"],
              ["210일", "14,301,000원", "피보험 5~10년"],
              ["240일", "16,344,000원", "피보험 10년↑, 50세 미만"],
              ["270일", "18,387,000원", "50세 이상, 피보험 10년↑"],
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

      <BridgeCard
        question="소정급여일수가 며칠인지 모르면 총액 계산이 안 돼요"
        body={<>상한액 68,100원을 받더라도 120일이냐 270일이냐에 따라 총 수령액이 <strong style={{ color: C.navy }}>817만원 vs 1,839만원</strong>으로 두 배 넘게 차이나요.</>}
        btnText="소정급여일수 기준표 보기 →"
        href="/w/실업급여-수급기간"
      />

      <div style={{ margin: "20px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 8 }}>{"📖 실업급여 상한액 더 알아보기"}</div>
        <SpokeLink num="01" title="실업급여 기초일액 — 평균임금 60% 계산법" desc="상한액·하한액 기준과 평균임금 산정 방법" href="/w/실업급여-기초일액" />
        <SpokeLink num="02" title="실업급여 소정급여일수 — 나이별 수급 기간" desc="나이·피보험기간별 120~270일 기준표" href="/w/실업급여-소정급여일수" />
      </div>

      <ExtBtn badge="고용24 공식" text="실업급여 모의계산기" cta="계산하기 →" href="https://www.work24.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do" />

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 상한액 68,100원은 세금 전 금액인가요?", a: '실업급여는 <strong>비과세 소득</strong>이에요. 68,100원이 세전이 아니라 실수령액이에요. 소득세 없이 전액 지급돼요.' },
        { q: "실업급여 상한액이 적용되면 손해인가요?", a: '상한액 적용은 "급여가 높았다"는 뜻이에요. 평균임금의 60%가 상한액을 넘으면 68,100원으로 고정되지만, <strong>이미 충분히 높은 금액</strong>이에요.' },
      ]} />

      <RelatedArticles items={[
        { title: "실업급여 기초일액 계산", desc: "실업급여 · 기초일액", href: "/w/실업급여-기초일액" },
        { title: "실업급여 하한액", desc: "실업급여 · 하한액", href: "/w/실업급여-하한액" },
        { title: "실업급여 수급기간", desc: "실업급여 · 수급기간", href: "/w/실업급여-수급기간" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 비과세 소득", href: "/w/실업급여-비과세" }}
        next={{ title: "건강보험 지역가입자 전환", href: "/w/실업급여-세금" }}
      />
    </BlogLayout>
  );
}
