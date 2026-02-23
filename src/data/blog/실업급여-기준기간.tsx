"use client";

import { useState } from "react";
import {
  C, Btn, Info, Divider, Sec, P, B, A, H3,
  TableTitle, TableNote, TH, THL,
  BridgeCard, ExtBtn, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext,
} from "@/components/wiki/BlogShared";

// ── 체커 로직 ──
type Res = { pass: boolean; headline: string; detail: string; badges: string[] };

function getResult(sel: Record<string, string>): Res | null {
  const { period, extend } = sel;
  if (!period) return null;

  if (period === "over9m") {
    if (extend === "yes") return { pass: true, headline: "기준기간 연장 적용 시 더 유리해요", detail: "질병·출산·육아 기간만큼 기준기간이 연장돼요. 최대 3년까지 늘어나니 더 오래된 근무 이력도 포함될 수 있어요.", badges: ["180일 충족 가능", "기준기간 연장"] };
    return { pass: true, headline: "피보험기간 180일 충족 가능성 높아요", detail: "이직일 이전 18개월 안에 9개월 이상 근무했다면 180일을 충족할 가능성이 높아요. 정확한 날수는 고용24에서 피보험단위기간을 조회해 확인하세요.", badges: ["180일 충족 가능", "수급자격 기대"] };
  }

  if (period === "6to9m") {
    if (extend === "yes") return { pass: true, headline: "기준기간 연장하면 합산 범위가 넓어져요", detail: "연장된 기준기간 안에 이전 직장 근무일도 포함될 수 있어요. 고용센터에서 정확한 피보험단위기간을 확인해보세요.", badges: ["합산 가능", "기준기간 연장"] };
    return { pass: false, headline: "단독으로는 180일이 부족할 수 있어요", detail: "6~9개월 근무라면 180일이 될 수도, 안 될 수도 있어요. 이전 직장 근무 이력이 기준기간 내에 있다면 합산할 수 있어요.", badges: ["합산 검토 필요"] };
  }

  if (period === "under6m") {
    if (extend === "yes") return { pass: false, headline: "연장해도 합산이 필요해요", detail: "기준기간이 최대 3년까지 연장되면 이전 직장 이력이 포함될 수 있어요. 고용센터에서 연장 사유와 합산 이력을 함께 확인하세요.", badges: ["합산 필요", "기준기간 연장"] };
    return { pass: false, headline: "단독으로는 180일 충족이 어려워요", detail: "최근 직장 근무가 6개월 미만이면 이전 직장 합산이 필요해요. 이전 직장이 기준기간(18개월) 안에 있어야 합산 가능해요.", badges: ["합산 필요"] };
  }

  if (period === "multi") {
    if (extend === "yes") return { pass: true, headline: "연장 기준기간 + 합산으로 충족 가능성 높아요", detail: "기준기간이 최대 3년까지 연장되면 더 오래된 직장 이력도 포함돼요. 고용센터에 연장 사유와 합산 이력을 함께 제출하세요.", badges: ["합산 가능", "기준기간 연장"] };
    return { pass: true, headline: "여러 직장 합산은 가능해요 — 조건 확인 필요", detail: "기준기간(이직일 이전 18개월) 안에 있는 모든 직장의 피보험단위기간을 합산할 수 있어요. 고용24에서 가입이력 조회 후 계산해보세요.", badges: ["합산 가능", "기준기간 내 근무"] };
  }

  return null;
}

export default function Article() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "기준기간"]}
      tags={["2026년 기준", "실업급여", "기준기간"]}
      date="2026-02-20"
      title="실업급여 기준기간 이직일 18개월 | 피보험 180일 합산"
      description={
        <>
          18개월은 범위, 180일은 실제 근무일수. 두 개념이 다른 거예요. 여러 회사 경력 합산부터 기준기간 연장까지 <strong style={{ color: C.t1 }}>고용보험법 기준</strong>으로 정리했어요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제40조 · 고용24", date: "2026.02 기준" }}
      stickyLabel="피보험기간 조회"
      stickyValue="고용24"
      stickyBtn="가입이력 조회하기 →"
      stickyHref="https://www.work24.go.kr"
    >
      <TOC items={[
        { t: "피보험기간 180일 충족 여부 체크", sub: "근무 기간 × 연장 사유 간편 확인" },
        { t: "실업급여 기준기간은 무엇인가요?", sub: null },
        { t: "이직일 이전 18개월은 어떻게 계산하나요?", sub: null },
        { t: "피보험기간 180일은 어떻게 채우나요?", sub: null },
        { t: "피보험 180일 합산은 어떻게 하나요?", sub: "합산 절차 4단계" },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "기준기간은 이직일 이전 <strong>18개월</strong>로, 이 안에서 피보험기간 180일을 채워야 해요.",
        "질병·출산·육아로 쉰 기간이 있으면 기준기간이 <strong>최대 3년까지 연장</strong>돼요.",
        "여러 직장을 다녔어도 기준기간 내 근무일만 합산 대상이에요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="피보험기간 180일 충족 여부 체크" sub="근무 기간과 연장 사유를 선택하면 바로 알 수 있어요" />

      <P>기준기간 안에서 피보험기간 180일을 채워야 실업급여를 받을 수 있어요. 내 상황에 맞는지 간편하게 확인해 보세요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x2714;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>피보험기간 180일 충족 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>이직일 기준 18개월 역산</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              최근 직장 근무 기간이 얼마나 됐나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="period" value="over9m" label="9개월 이상" sel={sel} pick={pick} />
              <Btn group="period" value="6to9m" label="6~9개월" sel={sel} pick={pick} />
              <Btn group="period" value="under6m" label="6개월 미만" sel={sel} pick={pick} />
              <Btn group="period" value="multi" label="여러 직장 합산" sel={sel} pick={pick} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
              기준기간 연장 사유가 있나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="extend" value="none" label="없어요" sel={sel} pick={pick} />
              <Btn group="extend" value="yes" label="질병·출산·육아로 쉰 기간 있음" sel={sel} pick={pick} />
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
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 02 ── */}
      <Divider />
      <Sec n="SECTION 02" title="실업급여 기준기간은 무엇인가요?" sub="이직일 이전 18개월이 하나의 창이에요" />

      <P><A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제40조</A>에서 정하는 기준기간은 <B>이직일 이전 18개월</B>이에요. 이 18개월이라는 기간 안에서 피보험단위기간 180일 이상이 있어야 실업급여를 받을 수 있어요. 18개월은 범위(창), 180일은 그 안에서 실제로 일한 날수(내용)예요.</P>

      <P>왜 18개월로 정했을까요? 최근 고용 상태를 보기 위해서예요. 10년 전에 일한 경력이 지금 실직 상태와 관계없잖아요. 비교적 최근 18개월 안에 180일 이상 꾸준히 일했다는 걸 확인하는 방식이에요.</P>

      <P>기준기간은 특별한 사유가 있으면 연장돼요. 질병·부상, 임신·출산·육아, 병역, 재해 등 일을 할 수 없었던 기간이 있으면 그만큼 기준기간이 늘어나요. <B>최대 3년</B>까지 연장될 수 있어요. 예를 들어 육아휴직을 1년 사용했다면 기준기간이 18개월 + 12개월 = 30개월로 넓어지는 거예요.</P>

      <Info type="tip">{'<strong>연장 사유:</strong> 질병·부상, 임신·출산·육아, 병역, 재해 등 일을 할 수 없었던 기간. 증빙(진단서, 출생증명서 등)을 고용센터에 제출해야 해요.'}</Info>

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" title="이직일 이전 18개월은 어떻게 계산하나요?" sub="퇴직일로부터 역산해요" />

      <P>기준기간은 퇴직(이직)한 날로부터 역산해서 18개월이에요. 2026년 2월 28일에 퇴직했다면 기준기간은 2024년 8월 28일~2026년 2월 28일이에요. 이 기간 밖에서 일한 날은 피보험기간 계산에 포함되지 않아요.</P>

      <P>주의할 점이 있어요. <B>과거에 실업급여를 받은 적이 있으면 그 이전 이력은 초기화</B>돼요. 2022년에 실업급여를 받고, 이후 재취업해서 2026년에 다시 퇴직했다면 2022년 이전 이력은 완전히 사용할 수 없어요. 2022년 이후 재취업해서 쌓은 피보험기간만 계산 대상이에요.</P>

      <P>퇴직 시점도 중요해요. 언제 퇴직하느냐에 따라 기준기간 안에 포함되는 근무일이 달라지기 때문이에요. 퇴직 전에 미리 <A href="https://www.work24.go.kr">고용24</A>에서 피보험단위기간을 조회해서 180일 충족 여부를 확인하는 게 좋아요.</P>

      <Info type="warn">{'<strong>초기화 주의:</strong> 과거에 실업급여를 받은 시점 이전 경력은 전부 소멸해요. 재취업 후 새로 쌓은 기간만 유효해요.'}</Info>

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" title="피보험기간 180일은 어떻게 채우나요?" sub="주5일제 기준 약 9개월 근무" />

      <P>피보험기간 180일은 실제 근무일 기준이에요. 주5일제로 일했다면 한 달에 약 20~22일이 쌓여요. 주5일제 직장을 9개월 정도 다니면 180일이 채워지는 셈이에요. 다만 무급휴직, 무급휴가, 결근일은 제외돼요. 유급 휴일과 주휴일은 포함이에요.</P>

      <P>여기서 중요한 게 있어요. <B>피보험단위기간과 피보험기간은 다른 개념</B>이에요. 피보험기간은 고용보험 가입 기간 전체를 말하고, 피보험단위기간은 그중 실제 근무일수를 계산한 것이에요. 실업급여 수급자격은 피보험단위기간 180일 기준이에요.</P>

      <P>일용직은 계산 방식이 달라요. 일용직은 실제 근무한 날을 하루씩 쌓는 방식이에요. 고용보험에 가입된 날만 피보험단위기간으로 인정돼요.</P>

      <BridgeCard
        question="피보험기간 180일 외에 다른 수급자격 조건도 있나요?"
        body={<>180일 조건 외에 비자발적 퇴직, 적극적 구직활동 의사 등 추가 조건이 있어요. <strong style={{ color: C.navy }}>자발적 퇴사라면 원칙적으로 실업급여를 받을 수 없어요.</strong></>}
        btnText="실업급여 수급자격 전체 조건 확인 →"
        href="/w/실업급여-수급자격"
      />

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" title="피보험 180일 합산은 어떻게 하나요?" sub="기준기간 내 모든 직장 근무일을 더할 수 있어요" />

      <P>여러 직장을 다닌 경우, 기준기간(18개월) 안에 있는 모든 직장의 피보험단위기간을 더할 수 있어요. 예를 들어 이직일 이전 18개월 안에 A회사 120일 + B회사 80일이 있다면 합산 200일로 180일 충족이에요.</P>

      <P>핵심 조건은 두 가지예요. 첫 번째, <B>기준기간 안에 있어야 해요</B>. 18개월(연장 시 최대 3년) 밖의 근무일은 계산에 안 들어가요. 두 번째, <B>직전 실업급여 수급 이후 이력이어야 해요</B>. 과거 실업급여를 받은 시점 이전 경력은 초기화돼서 합산할 수 없어요.</P>

      <TableTitle>합산 절차 4단계</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>단계</THL><TH>내용</TH><TH>확인 방법</TH></tr>
          </thead>
          <tbody>
            {[
              ["1단계", "이직일 기준 18개월 역산", "직접 계산 또는 고용24 조회"],
              ["2단계", "기준기간 내 전 직장 피보험기간 조회", "고용24 → 고용보험 가입이력"],
              ["3단계", "직전 실업급여 수급 여부 확인", "수급 이전 이력 제외"],
              ["4단계", "기준기간 내 피보험단위기간 합산", "합산 180일 이상이면 충족"],
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
      <TableNote>※ 정확한 피보험단위기간은 고용24 &quot;고용보험 가입이력&quot;에서 조회 가능</TableNote>

      <BridgeCard
        question="기준기간 충족 후 실업급여는 하루 얼마 받나요?"
        body={<>180일을 채웠다면 다음 궁금증은 지급액이에요. 평균임금의 60%로 계산되는 <strong style={{ color: C.navy }}>1일 기초일액</strong>과 상·하한액 기준을 정리했어요.</>}
        btnText="기초일액 계산 기준 보기 →"
        href="/w/실업급여-기초일액"
      />

      <ExtBtn badge="고용24 공식" text="고용보험 가입이력 조회" cta="조회하기 →" href="https://www.work24.go.kr" />

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 기준기간 안에 다른 회사 근무일도 합산되나요?", a: '기준기간(이직일 이전 18개월) 안에 있는 근무일이라면 <strong>다른 회사 경력도 합산</strong>돼요. 단, 과거에 실업급여를 받은 적이 있으면 그 이전 이력은 초기화돼요.' },
        { q: "피보험기간 180일이 18개월과 다른 이유가 뭔가요?", a: '18개월은 기준기간(범위)이고 180일은 그 안에서 <strong>실제로 일한 날수</strong>예요. 주5일제 기준으로 약 9개월 근무하면 180일이 채워져요.' },
      ]} />

      <RelatedArticles items={[
        { title: "실업급여 수급자격 — 비자발적 퇴직 조건", desc: "실업급여 · 수급자격", href: "/w/실업급여-수급자격" },
        { title: "실업급여 기초일액 — 평균임금 60% 계산", desc: "실업급여 · 기초일액", href: "/w/실업급여-기초일액" },
        { title: "실업급여 계산기 — 예상 수령액 계산", desc: "실업급여 · 계산기", href: "/w/실업급여-계산기" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 구직활동 인정", href: "/w/실업급여-구직활동" }}
        next={{ title: "실업급여 기초일액 계산", href: "/w/실업급여-기초일액" }}
      />
    </BlogLayout>
  );
}
