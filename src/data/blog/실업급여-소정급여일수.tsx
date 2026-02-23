"use client";

import { useState } from "react";
import {
  C, Btn, Info, Divider, Sec, P, B, A,
  TableTitle, TableNote, TH, THL,
  BridgeCard, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext,
  InlineLink, SpokeLink, FormulaCard, CaseBox,
} from "@/components/wiki/BlogShared";

// ── 체커 로직 ──
type ResLink = { icon: string; title: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; links: ResLink[] };

const resLinks: ResLink[] = [
  { icon: "📅", title: "수급기간 12개월 신청 기한 확인", href: "/w/실업급여-수급기간-몇개월-받나요" },
  { icon: "💰", title: "1일 지급액 기초일액 계산", href: "/w/실업급여-기초일액" },
];

const dayTable: Record<string, Record<string, number>> = {
  under50: { under1: 120, yr1to3: 150, yr3to5: 180, yr5to10: 210, over10: 240 },
  over50:  { under1: 120, yr1to3: 180, yr3to5: 210, yr5to10: 240, over10: 270 },
};

function getResult(sel: Record<string, string>): Res | null {
  const { age, period } = sel;
  if (!age || !period) return null;
  const days = dayTable[age]?.[period];
  if (!days) return null;
  const months = Math.round(days / 30);
  return {
    pass: true,
    headline: `소정급여일수 ${days}일이에요`,
    detail: `약 ${months}개월치 실업급여를 받을 수 있어요. 이직 후 12개월 안에 소진해야 해요.`,
    badges: [`${days}일`, age === "over50" ? "50세 이상 우대" : "50세 미만 일반"],
    links: resLinks,
  };
}

export default function Article() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "소정급여일수"]}
      tags={["2026년 기준", "실업급여", "소정급여일수"]}
      date="2026-02-23"
      title="실업급여 소정급여일수 기준표 | 나이별 지급일수 계산 방법"
      description={
        <>
          실업급여 소정급여일수는 나이와 피보험기간에 따라 120일에서 270일까지 달라요. 연령별 피보험기간 <strong style={{ color: C.t1 }}>기준표와 지급일수 계산 방법</strong>을 정리했어요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제50조 · 고용보험 시행령", date: "2026.02 기준" }}
      stickyLabel="소정급여일수"
      stickyValue="120~270일"
      stickyBtn="내 일수 확인 →"
      stickyHref="https://www.work24.go.kr"
    >
      <TOC items={[
        { t: "내 소정급여일수 바로 확인", sub: "나이 × 피보험기간 간편 조회" },
        { t: "실업급여 소정급여일수는 어떻게 정해지나요?", sub: null },
        { t: "실업급여 소정급여일수 기준표는 어떻게 되나요?", sub: "2026년 현행 기준" },
        { t: "실업급여 연령별 지급일수 차이는 뭐예요?", sub: "50세 기준이 유리한 이유" },
        { t: "실업급여 가입기간별 소정급여일수는 어떻게 계산하나요?", sub: "3인 페르소나 예시" },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "소정급여일수는 <strong>나이와 피보험기간</strong>으로 결정돼요. 최소 120일, 최대 270일이에요.",
        "50세 이상 또는 장애인은 같은 피보험기간이라도 <strong>최대 60일</strong> 더 받아요.",
        "이직 후 <strong>12개월 안에</strong> 소정급여일수를 소진해야 해요. 남은 일수는 소멸해요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="내 소정급여일수 바로 확인" sub="나이와 피보험기간 두 가지만 선택하면 돼요" />

      <P>몇 일 받을 수 있는지, 나이와 피보험기간만 알면 바로 알 수 있어요. 피보험기간은 현재 직장만이 아니라 기준기간(18개월) 안의 전 직장 합산이에요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📅</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>소정급여일수 간편 확인</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>나이 × 피보험기간 기준표 적용</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              이직 당시 나이가 몇 살이었나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="age" value="under50" label="50세 미만" sel={sel} pick={pick} />
              <Btn group="age" value="over50" label="50세 이상 (또는 장애인)" sel={sel} pick={pick} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
              피보험기간(고용보험 가입기간 합산)이 얼마나 됐나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="period" value="under1" label="1년 미만" sel={sel} pick={pick} />
              <Btn group="period" value="yr1to3" label="1~3년" sel={sel} pick={pick} />
              <Btn group="period" value="yr3to5" label="3~5년" sel={sel} pick={pick} />
              <Btn group="period" value="yr5to10" label="5~10년" sel={sel} pick={pick} />
              <Btn group="period" value="over10" label="10년 이상" sel={sel} pick={pick} />
            </div>
          </div>

          {result && (
            <div style={{ marginTop: 16, padding: 16, borderRadius: 8, background: C.navyLight, border: "1px solid rgba(30,58,95,.1)" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.navy, marginBottom: 4 }}>
                ✅ {result.headline}
              </div>
              <div style={{ fontSize: 13, color: C.t3, lineHeight: 1.55 }}>{result.detail}</div>
              <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" }}>
                {result.badges.map((b, i) => (
                  <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, background: C.navy, color: "#fff" }}>{b}</span>
                ))}
              </div>
              {result.links.length > 0 && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(30,58,95,.08)" }}>
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
      <Sec n="SECTION 02" title="실업급여 소정급여일수는 어떻게 정해지나요?" sub="나이와 피보험기간 두 가지로 결정돼요" />

      <P><A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제50조</A>에 따라 소정급여일수는 <B>이직 당시 나이</B>와 <B>피보험기간</B>으로 결정돼요. 이 두 가지의 교차점이 받을 수 있는 일수예요. 최소 120일에서 최대 270일까지 다양해요.</P>

      <P>피보험기간은 지금 퇴직하는 직장 하나의 기간이 아니에요. 이직일 이전 18개월(기준기간) 안에 있는 모든 직장의 피보험단위기간을 합산한 값이에요. 여러 직장을 짧게 다녔어도 합산하면 상위 구간에 해당할 수 있어요.</P>

      <P>나이는 이직 당시 만 나이를 적용해요. 퇴직 직전일 기준으로 계산하기 때문에, 퇴직 전날에 막 50세 생일이 지났다면 50세 이상 기준이 적용돼요. 반대로 퇴직 후에 생일이 온다면 49세 기준이에요. 피보험기간이 긴 경우 이 차이가 30일 더 받는 결과로 이어져요.</P>

      <FormulaCard
        formula="소정급여일수 = 기준표[이직 당시 나이 × 피보험기간]"
        notes={[
          "최소 120일 (50세 미만, 1년 미만) / 최대 270일 (50세 이상, 10년 이상)",
          "50세 이상·장애인은 같은 피보험기간 대비 최대 60일 우대",
          "피보험기간: 기준기간(18개월) 내 전 직장 합산 가능",
        ]}
      />

      <InlineLink icon="📋" title="피보험기간 합산 방법 — 기준기간 18개월" desc="여러 직장 근무 이력을 어떻게 합산하는지 정리했어요." href="/w/실업급여-기준기간" />

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 소정급여일수 기준표는 어떻게 되나요?" sub="2026년 현행 기준" />

      <P>기준표는 나이 두 구간 × 피보험기간 다섯 구간으로 구성돼요. 50세 미만과 50세 이상(장애인 포함)으로 나뉘고, 피보험기간이 길수록 더 많은 일수를 받아요.</P>

      <TableTitle>실업급여 소정급여일수 기준표 (2026년)</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr>
              <THL>구분</THL>
              <TH>1년 미만</TH>
              <TH>1~3년</TH>
              <TH>3~5년</TH>
              <TH>5~10년</TH>
              <TH>10년 이상</TH>
            </tr>
          </thead>
          <tbody>
            {[
              ["50세 미만", "120일", "150일", "180일", "210일", "240일"],
              ["50세 이상 / 장애인", "120일", "180일", "210일", "240일", "270일"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "9px 8px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 700 : 400, background: ri === 1 && ci > 0 ? "rgba(30,58,95,.03)" : "transparent" }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>※ 나이는 이직 당시 만 나이 기준 / 피보험기간은 기준기간 내 전 직장 합산 가능</TableNote>

      <P>표를 보면 1년 미만 구간은 나이에 관계없이 동일하게 120일이에요. 1~3년 구간부터 차이가 생기는데 50세 이상이 30일 더 받아요. 10년 이상 구간에서 최대 차이인 30일(240일 vs 270일)이 유지돼요. 표에서 한 칸씩 올라갈수록 30일씩 늘어나는 패턴이에요.</P>

      <InlineLink icon="💰" title="소정급여일수 × 1일 기초일액 = 총 수령액" desc="일수가 정해지면 하루 얼마 받는지도 확인해야 해요." href="/w/실업급여-기초일액" />

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 연령별 지급일수 차이는 뭐예요?" sub="50세 이상이 유리한 이유가 있어요" />

      <P>50세 이상에게 더 많은 일수를 주는 건 고용보험법이 의도한 설계예요. 나이가 들수록 재취업이 어렵기 때문에 그 기간 동안 생활을 더 보장해주는 거예요. 장애인도 나이와 관계없이 동일한 우대 기준을 받아요.</P>

      <P>퇴직 시점을 어느 정도 조율할 수 있다면, 50세 생일이 지난 뒤에 퇴직하면 같은 피보험기간으로 30일을 더 받을 수 있어요. 피보험기간 1~3년이면 150일(50세 미만) vs 180일(50세 이상)로 한 달치 차이예요. 다만 이를 위해 억지로 퇴직을 미루는 것보다는 자연스러운 상황에서 확인하는 정도가 좋아요.</P>

      <Info type="tip">이직 당시(퇴직 직전일 기준) 만 50세 이상이면 우대 기준이 적용돼요. 장애인은 나이와 무관하게 동일한 우대 일수예요.</Info>

      <P>50세 기준의 또 다른 특징은 구간 점프예요. 50세 미만 1~3년은 150일인데, 50세 이상 1~3년은 180일로 30일 더 받아요. 하지만 이 30일 차이는 피보험기간이 늘어도 동일하게 유지돼요. 즉, 어느 구간에서든 50세 이상이 딱 30일 유리한 구조예요.</P>

      <BridgeCard
        question="소정급여일수 말고도 수급기간(신청 기한)이 따로 있나요?"
        body={<>소정급여일수는 받을 수 있는 일수, 수급기간은 신청 가능한 기한이에요. <strong style={{ color: C.navy }}>이직 후 12개월 안에</strong> 소진하지 않으면 남은 일수는 사라져요.</>}
        btnText="실업급여 수급기간 12개월 기한 확인 →"
        href="/w/실업급여-수급기간-몇개월-받나요"
      />

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" title="실업급여 가입기간별 소정급여일수는 어떻게 계산하나요?" sub="3인 페르소나 예시" />

      <P>기준표를 보는 것보다 실제 사람 사례로 보면 훨씬 이해하기 쉬워요. 세 가지 다른 상황을 비교해볼게요.</P>

      <CaseBox
        badge="예시 1"
        label="직장인 이 씨(38세), 피보험기간 4년"
        conditions={["이직 당시 나이: 38세 → 50세 미만", "피보험기간: 4년 → 3~5년 구간"]}
        steps={[
          { label: "기준표 적용", value: "50세 미만 × 3~5년 → 180일" },
          { label: "예상 수급 기간", value: "약 6개월" },
        ]}
        total="소정급여일수: 180일"
        result="일반 기준 적용"
        pass={true}
      />

      <CaseBox
        badge="예시 2"
        label="베테랑 김 씨(52세), 피보험기간 12년"
        conditions={["이직 당시 나이: 52세 → 50세 이상", "피보험기간: 12년 → 10년 이상 구간"]}
        steps={[
          { label: "기준표 적용", value: "50세 이상 × 10년 이상 → 270일" },
          { label: "예상 수급 기간", value: "약 9개월" },
          { label: "50세 미만 대비", value: "240일보다 30일 더 (우대 적용)" },
        ]}
        total="소정급여일수: 270일 (최대)"
        result="우대 기준 + 최대 일수"
        pass={true}
      />

      <CaseBox
        badge="예시 3"
        label="첫 직장 박 씨(27세), 피보험기간 10개월"
        conditions={["이직 당시 나이: 27세 → 50세 미만", "피보험기간: 10개월 → 1년 미만 구간"]}
        steps={[
          { label: "기준표 적용", value: "50세 미만 × 1년 미만 → 120일" },
          { label: "예상 수급 기간", value: "약 4개월" },
        ]}
        total="소정급여일수: 120일"
        result="최소 일수 적용 (나이 우대 해당 없음)"
        pass={true}
      />

      <Info type="warn">소정급여일수가 남아있어도 이직 후 12개월이 지나면 소멸해요. 270일 받을 자격이어도 12개월이 지나면 못 받아요.</Info>

      <div style={{ margin: "20px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 8 }}>📖 실업급여 더 알아보기</div>
        <SpokeLink num="01" title="실업급여 수급기간 — 이직 후 12개월 기한" desc="소정급여일수와 수급기간의 차이" href="/w/실업급여-수급기간-몇개월-받나요" />
        <SpokeLink num="02" title="실업급여 기초일액 — 1일 지급액 계산" desc="소정급여일수 × 기초일액 = 총 수령액" href="/w/실업급여-기초일액" />
        <SpokeLink num="03" title="실업급여 수급자격 — 비자발적 퇴직 조건" desc="피보험기간 180일 + 나머지 조건 정리" href="/w/실업급여-수급-조건" />
      </div>

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 소정급여일수 50세 기준은 어떻게 되나요?", a: "50세 이상(또는 장애인)은 같은 피보험기간이라도 50세 미만보다 30일 더 받아요. 단, 1년 미만 구간은 동일하게 120일이에요. 이직 당시 만 나이 기준으로 판단돼요." },
        { q: "실업급여 소정급여일수와 수급기간은 다른 건가요?", a: "소정급여일수는 받을 수 있는 최대 일수예요. 수급기간은 이직 후 12개월이라는 신청 가능 기한이에요. 두 조건 모두 충족해야 전부 받을 수 있어요. 남은 소정급여일수가 있어도 12개월이 지나면 사라져요." },
      ]} />

      <RelatedArticles items={[
        { title: "실업급여 수급기간 — 이직 후 12개월", desc: "실업급여 · 수급기간", href: "/w/실업급여-수급기간-몇개월-받나요" },
        { title: "실업급여 기준기간 — 이직일 18개월 합산", desc: "실업급여 · 기준기간", href: "/w/실업급여-기준기간" },
        { title: "실업급여 기초일액 — 평균임금 60% 계산", desc: "실업급여 · 기초일액", href: "/w/실업급여-기초일액" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 세금 — 수급 중 건강보험", href: "/w/실업급여-세금" }}
        next={{ title: "실업급여 수급기간 몇개월 받나", href: "/w/실업급여-수급기간-몇개월-받나요" }}
      />
    </BlogLayout>
  );
}
