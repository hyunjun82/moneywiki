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

const calcLinks: ResLink[] = [
  { icon: "🧮", title: "실업급여 계산기 — 정확한 금액 계산", href: "/w/실업급여-계산기" },
  { icon: "📋", title: "실업급여 소정급여일수 — 받는 기간 확인", href: "/w/실업급여-소정급여일수" },
];

function getResult(sel: Record<string, string>): Res | null {
  const { salary, period } = sel;
  if (!salary || !period) return null;

  if (salary === "low" && period === "short") return {
    pass: true,
    headline: "1일 약 66,048원(하한액), 총 약 594~792만원 예상",
    detail: "연봉 3,960만원 이하는 2026년 하한액 66,048원이 적용돼요. 소정급여일수 90~120일 기준으로 총 594~792만원 정도예요. 가입기간을 더 늘리면 받는 기간이 늘어나요.",
    badges: ["하한액 66,048원 적용", "90~120일"],
    links: calcLinks,
  };
  if (salary === "low" && period === "long") return {
    pass: true,
    headline: "1일 약 66,048원(하한액), 총 약 990~1,189만원 예상",
    detail: "가입기간 3년 이상이면 소정급여일수 150~180일까지 늘어나요. 하한액이 적용되더라도 받는 기간이 길어서 총액이 커져요.",
    badges: ["하한액 66,048원 적용", "150~180일"],
    links: calcLinks,
  };
  if (salary === "mid" && period === "short") return {
    pass: true,
    headline: "1일 66,048~68,100원, 총 약 594~817만원 예상",
    detail: "연봉 3,960~4,560만원 구간은 평균임금 60%가 하한·상한 사이에 들어와요. 계산값이 그대로 적용되는 드문 구간이에요.",
    badges: ["평균임금 60% 적용", "90~120일"],
    links: calcLinks,
  };
  if (salary === "mid" && period === "long") return {
    pass: true,
    headline: "1일 66,048~68,100원, 총 약 990~1,226만원 예상",
    detail: "3년 이상 가입이면 소정급여일수 150~180일 기준이에요. 연봉 중간 구간이라 실제 임금이 그대로 반영돼요.",
    badges: ["평균임금 60% 적용", "150~180일"],
    links: calcLinks,
  };
  if (salary === "high" && period === "short") return {
    pass: true,
    headline: "1일 68,100원(상한액), 총 약 613~1,022만원 예상",
    detail: "연봉 4,560만원 이상은 상한액 68,100원이 적용돼요. 연봉이 아무리 높아도 하루 지급액은 같아요.",
    badges: ["상한액 68,100원 적용", "90~150일"],
    links: calcLinks,
  };
  if (salary === "high" && period === "long") return {
    pass: true,
    headline: "1일 68,100원(상한액), 총 약 1,022~1,839만원 예상",
    detail: "가입기간 3년 이상이면 소정급여일수 150~270일까지 늘어나요. 상한액이 적용되지만 받는 기간이 길어서 총액이 가장 커요.",
    badges: ["상한액 68,100원 적용", "150~270일"],
    links: calcLinks,
  };

  return null;
}

export default function Article() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "연봉별 수령액"]}
      tags={["2026년 기준", "실업급여", "1일 구직급여"]}
      date="2026-02-24"
      title="2026 실업급여 연봉별 수령액 | 1일 구직급여 계산 방법"
      description={
        <>
          연봉이 높을수록 더 받지만, 상한이 있어요. 2026년 기준 상한액 68,100원·하한액 66,048원으로{" "}
          <strong style={{ color: C.t1 }}>차이가 단 2,052원</strong>이에요. 연봉별 예상 수령액을 정리했어요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제45조 · 고용24", date: "2026.02 기준" }}
      stickyLabel="30초 계산"
      stickyValue="예상 수령액"
      stickyBtn="실업급여 계산기 →"
      stickyHref="/w/실업급여-계산기"
    >
      <TOC items={[
        { t: "연봉별 예상 수령액 간편 체크", sub: "연봉 구간 × 가입기간 선택" },
        { t: "실업급여 연봉별 수령액은 어떻게 계산하나요?", sub: null },
        { t: "실업급여 월급 200만원이면 얼마 나오나요?", sub: "3인 케이스 실제 계산" },
        { t: "실업급여 상한액 하한액은 수령액에 어떻게 적용되나요?", sub: null },
        { t: "실업급여 예상 금액 조회는 어디서 하나요?", sub: null },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "계산 공식은 <strong>퇴직 전 3개월 평균임금 × 60%</strong>예요. 상여금·수당 모두 포함돼요.",
        "2026년 상한액 <strong>68,100원 / 하한액 66,048원</strong>으로 차이가 겨우 2,052원이에요.",
        "근속 기간이 길수록 소정급여일수가 늘어나서 <strong>총 수령액 차이가 2~3배</strong>까지 벌어져요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" id="checker" title="연봉별 예상 수령액 간편 체크" sub="연봉 구간과 가입기간을 선택하면 예상 금액이 바로 나와요" />

      <P>연봉과 가입기간을 선택하면 예상 수령액 범위를 바로 알 수 있어요. 정확한 금액은 개인별 급여 내역에 따라 달라질 수 있어요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x1F4B0;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>연봉별 실업급여 예상 수령액 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>2026년 기준 · 근사치</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              퇴직 전 연봉이 어느 구간인가요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="salary" value="low" label="3,960만원 이하" sel={sel} pick={pick} />
              <Btn group="salary" value="mid" label="3,960~4,560만원" sel={sel} pick={pick} />
              <Btn group="salary" value="high" label="4,560만원 이상" sel={sel} pick={pick} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
              고용보험 가입기간이 얼마나 되나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="period" value="short" label="1~3년" sel={sel} pick={pick} />
              <Btn group="period" value="long" label="3년 이상" sel={sel} pick={pick} />
            </div>
          </div>

          {result && (
            <div style={{ marginTop: 16, padding: 16, borderRadius: 8, background: C.navyLight, border: "1px solid rgba(30,58,95,.1)" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.navy, marginBottom: 4 }}>
                &#x2705; {result.headline}
              </div>
              <div style={{ fontSize: 13, color: C.t3, lineHeight: 1.55 }}>{result.detail}</div>
              <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" }}>
                {result.badges.map((b, i) => (
                  <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, background: C.navy, color: "#fff" }}>{b}</span>
                ))}
              </div>
              {result.links.length > 0 && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(30,58,95,.08)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.t1, marginBottom: 6 }}>&#x1F4D6; 관련 가이드</div>
                  {result.links.map((lnk, li) => (
                    <a key={li} href={lnk.href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", fontSize: 13, color: C.navy, fontWeight: 600, borderBottom: "1px solid rgba(30,58,95,.06)", textDecoration: "none" }}>
                      <span>{lnk.icon}{" "}{lnk.title}</span>
                      <span style={{ fontSize: 11, color: C.t4 }}>&#x2192;</span>
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
      <Sec n="SECTION 02" id="formula" title="실업급여 연봉별 수령액은 어떻게 계산하나요?" sub="퇴직 전 3개월 평균임금 × 60%가 공식이에요" />

      <P><A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제45조</A>에서 정한 1일 구직급여 공식은 하나예요. <B>퇴직 전 3개월 평균임금의 60%</B>예요. 평균임금은 기본급만이 아니라 퇴직 직전 3개월에 받은 급여 전체(상여금·수당 포함)가 기준이에요. 연봉이 올라갈수록 1일 금액도 올라가지만, 상한액과 하한액 범위 안에서 조정돼요.</P>

      <P>2026년 기준으로 상한액은 <B>68,100원</B>, 하한액은 <B>66,048원</B>이에요. 차이가 겨우 2,052원이에요. 2026년 최저임금이 시간당 10,320원으로 오르면서 하한액도 같이 올라 상한과의 격차가 매우 좁아졌어요.</P>

      <P>계산에는 세 가지 변수가 필요해요. 첫째 <B>퇴직 전 3개월 평균임금</B>(1일 구직급여 결정), 둘째 <B>고용보험 가입기간</B>(소정급여일수 결정), 셋째 <B>이직 당시 나이</B>(만 50세 이상이면 급여일수 추가)예요. 총 수령액 = 1일 구직급여 × 소정급여일수로 계산해요.</P>

      <TableTitle>소정급여일수 — 가입기간 × 나이 기준</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>가입기간</THL><TH>만 50세 미만</TH><TH>만 50세 이상·장애인</TH></tr>
          </thead>
          <tbody>
            {[
              ["1년 이상 ~ 3년 미만", "90일", "90일"],
              ["3년 이상 ~ 5년 미만", "120일", "150일"],
              ["5년 이상 ~ 10년 미만", "150일", "180일"],
              ["10년 이상", "180일", "210일"],
              ["50세 이상 + 10년 이상", "—", "270일"],
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
      <TableNote>※ 소정급여일수는 이직 당시 나이와 피보험 단위기간 기준. 정확한 일수는 고용24에서 조회</TableNote>

      <Info type="tip">{'<strong>빠른 계산법:</strong> 연봉 ÷ 365일 = 1일 평균임금, 여기에 × 60% 하면 1일 구직급여예요. 단, 결과가 하한(66,048원) 이하면 하한 적용, 상한(68,100원) 초과면 상한 적용이에요.'}</Info>

      <InlineLink icon="🧮" title="실업급여 계산기 — 예상 수령액 바로 계산" desc="연봉·근속 입력하면 1일 구직급여와 총 수령액까지 자동 계산" href="/w/실업급여-계산기" />

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" id="cases" title="실업급여 월급 200만원이면 얼마 나오나요?" sub="3인 케이스로 실제 계산 흐름을 보여드릴게요" />

      <P>월급 200만원(연봉 2,400만원)이라면 1일 평균임금은 약 65,753원이에요. 60%를 적용하면 39,452원인데 하한액 66,048원보다 낮아서 66,048원이 적용돼요. 저연봉은 하한액이 보호막 역할을 해요.</P>

      <P>반면 월급 300만원(연봉 3,600만원)은 1일 60% 계산값이 약 59,178원으로 역시 하한액 적용 구간이에요. 연봉 약 3,960만원 이상부터 상한·하한 사이 구간에 진입하고, 4,560만원 이상부터 상한액 68,100원이 적용돼요. 세 케이스를 직접 계산해볼게요.</P>

      <div style={{ background: C.navyLight, borderRadius: 10, padding: "16px 18px", marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: C.navy, marginBottom: 10 }}>케이스 1 — 박 대리, 연봉 3,600만원, 가입 3년</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            ["1일 평균임금", "3,600만원 ÷ 365일 ≈ 98,630원"],
            ["60% 적용값", "98,630원 × 60% ≈ 59,178원 → 하한액 66,048원 적용"],
            ["소정급여일수", "만 35세, 피보험기간 3년 → 120일"],
            ["총 예상 수령액", "66,048원 × 120일 = 약 793만원"],
          ].map(([label, value], i) => (
            <div key={i} style={{ display: "flex", gap: 10, fontSize: 13 }}>
              <span style={{ minWidth: 90, color: C.t4, fontWeight: 600 }}>{label}</span>
              <span style={{ color: C.t2 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: C.navyLight, borderRadius: 10, padding: "16px 18px", marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: C.navy, marginBottom: 10 }}>케이스 2 — 김 과장, 연봉 4,800만원, 가입 7년</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            ["1일 평균임금", "4,800만원 ÷ 365일 ≈ 131,507원"],
            ["60% 적용값", "131,507원 × 60% ≈ 78,904원 → 상한액 68,100원 적용"],
            ["소정급여일수", "만 42세, 피보험기간 7년 → 180일"],
            ["총 예상 수령액", "68,100원 × 180일 = 약 1,226만원"],
          ].map(([label, value], i) => (
            <div key={i} style={{ display: "flex", gap: 10, fontSize: 13 }}>
              <span style={{ minWidth: 90, color: C.t4, fontWeight: 600 }}>{label}</span>
              <span style={{ color: C.t2 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: C.navyLight, borderRadius: 10, padding: "16px 18px", marginBottom: 4 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: C.navy, marginBottom: 10 }}>케이스 3 — 이 씨, 연봉 2,400만원, 가입 1년 3개월</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            ["1일 평균임금", "2,400만원 ÷ 365일 ≈ 65,753원"],
            ["60% 적용값", "65,753원 × 60% ≈ 39,452원 → 하한액 66,048원 적용"],
            ["소정급여일수", "만 28세, 피보험기간 1년 3개월 → 90일"],
            ["총 예상 수령액", "66,048원 × 90일 = 약 594만원"],
          ].map(([label, value], i) => (
            <div key={i} style={{ display: "flex", gap: 10, fontSize: 13 }}>
              <span style={{ minWidth: 90, color: C.t4, fontWeight: 600 }}>{label}</span>
              <span style={{ color: C.t2 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <BridgeCard
        question="소정급여일수가 정확히 몇 일인지 더 알고 싶으세요?"
        body={<>나이·근속 기준으로 최대 270일까지 달라져요. <strong style={{ color: C.navy }}>구체적인 일수 계산표</strong>를 따로 정리했어요.</>}
        btnText="실업급여 소정급여일수 계산표 보기 →"
        href="/w/실업급여-소정급여일수"
      />

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" id="limit" title="실업급여 상한액 하한액은 수령액에 어떻게 적용되나요?" sub="2026년 기준 상한 68,100원 · 하한 66,048원이에요" />

      <P>2026년 기준 <B>상한액은 1일 68,100원</B>이에요. 이 이상 연봉이어도 하루 지급액은 68,100원에서 고정돼요. 연봉 5,000만원과 1억원이 받는 금액이 같아요. <B>하한액은 1일 66,048원</B>으로, 2026년 최저임금(시간당 10,320원) × 8시간 × 80%로 산정돼요.</P>

      <P>두 금액의 차이가 2,052원밖에 안 돼요. 최저임금이 꾸준히 올라 하한액도 같이 올랐기 때문이에요. 실제로 연봉 3,960만원 이하는 모두 하한액 66,048원, 4,560만원 이상은 모두 상한액 68,100원을 받아요. 평균임금 60%가 그대로 반영되는 구간은 연봉 3,960~4,560만원으로 매우 좁아요.</P>

      <P>쉽게 말하면 상한이 천장, 하한이 바닥이에요. 연봉이 올라도 천장에서 막히고, 내려가도 바닥이 받쳐줘요. 실업급여에 소득 재분배 성격이 담긴 이유예요. 총 수령액을 결정하는 건 1일 금액보다 <B>소정급여일수(받는 기간)</B>예요.</P>

      <Info type="warn">{'<strong>주의:</strong> 상한액·하한액은 매년 최저임금에 연동해 바뀌어요. 이 글의 수치는 2026년 기준이에요. 정확한 수령액은 <a href="https://www.work24.go.kr" style="color:#1E3A5F">고용24</a>에서 조회하거나 고용센터에 문의하세요.'}</Info>

      <SpokeLink num="01" title="2026 실업급여 상한액 하한액 최신 기준" desc="연도별 변동 수치와 2026년 기준 확인" href="/w/실업급여-상한액" />

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" id="calc-tool" title="실업급여 예상 금액 조회는 어디서 하나요?" sub="고용24 공식 조회 또는 계산기로 빠르게 계산할 수 있어요" />

      <P>가장 정확한 방법은 <A href="https://www.work24.go.kr">고용24(work24.go.kr)</A>에서 직접 조회하는 거예요. 로그인 후 '구직급여 계산' 메뉴에서 본인 피보험 내역이 자동으로 불러와져요. 이직확인서가 처리된 뒤에야 조회가 가능해요.</P>

      <P>퇴직 전에 미리 예상 금액을 알고 싶다면 실업급여 계산기를 활용할 수 있어요. 연봉과 근속기간만 입력하면 1일 구직급여와 총 수령액을 바로 알 수 있어요. 이직확인서 처리 전이어도 바로 시뮬레이션이 돼요.</P>

      <P>개인별 급여 명세가 복잡하거나 일용직·단기 계약직처럼 특이 사항이 있으면 고용센터(1350) 전화 또는 방문이 가장 정확해요. 수당이 많거나 급여 구조가 복잡한 경우 담당자 확인을 권해요.</P>

      <P>정확한 금액은 이직확인서가 고용센터에 접수된 후에야 확정돼요. 회사는 퇴직 후 10일 이내에 이직확인서를 제출해야 해요. 회사가 늦게 제출하면 조회가 그만큼 늦어지니 필요하면 회사에 요청할 수 있어요.</P>

      <a href="https://www.work24.go.kr/cm/main.do" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-black">
        <span className="ext-btn-badge">고용24 공식</span>
        <span className="ext-btn-text">구직급여 예상액 계산</span>
        <span className="ext-btn-cta">바로가기 →</span>
      </a>

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 연봉 5천만원과 6천만원이 같은 금액인가요?", a: '맞아요. 상한액이 적용되기 때문에 연봉 4,560만원 이상은 모두 <strong>1일 68,100원</strong>으로 같아요. 아무리 연봉이 높아도 상한액을 넘을 수 없어요.' },
        { q: "실업급여 연봉별 계산에서 상여금이나 수당도 포함되나요?", a: '네, 포함돼요. 퇴직 전 3개월 동안 받은 <strong>급여 전체(기본급+상여금+수당)</strong>가 평균임금 계산 기준이에요. 기본급만 따지는 게 아니에요.' },
      ]} />

      <RelatedArticles items={[
        { title: "실업급여 계산기 — 예상 수령액 바로 계산", desc: "실업급여 · 계산기", href: "/w/실업급여-계산기" },
        { title: "2026 실업급여 상한액 하한액 기준", desc: "실업급여 · 상한액", href: "/w/실업급여-상한액" },
        { title: "실업급여 소정급여일수 — 나이·근속별 계산", desc: "실업급여 · 소정급여일수", href: "/w/실업급여-소정급여일수" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 수급 조건 전체", href: "/w/실업급여-수급-조건" }}
        next={{ title: "실업급여 상한액 하한액", href: "/w/실업급여-상한액" }}
      />
    </BlogLayout>
  );
}
