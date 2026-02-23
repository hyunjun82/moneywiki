"use client";

import { useState } from "react";
import {
  C, Btn, Info, InlineLink, SpokeLink, Divider, Sec, P, B, A,
  TableTitle, TableNote, TH, THL,
  BridgeCard, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext,
} from "@/components/wiki/BlogShared";

// ── 체커 로직: 반복수급 횟수별 감액률 ──
type ResLink = { icon: string; title: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; rate?: string; daily?: string; links: ResLink[] };

function getResult(sel: Record<string, string>): Res | null {
  const { count } = sel;
  if (!count) return null;

  if (count === "first_or_second") return { pass: true, headline: "감액 없이 전액 수급해요", detail: "직전 5년 내 1~2회 수급은 반복수급 감액 대상이 아니에요. 산정된 기초일액 그대로 소정급여일수 동안 받을 수 있어요.", badges: ["감액 없음", "전액 수급"], rate: "0%", daily: "68,100원", links: [
    { icon: "📋", title: "기초일액 상한·하한 기준 확인", href: "/w/실업급여-기초일액" },
    { icon: "📊", title: "소정급여일수 — 나이별 수급 기간표", href: "/w/실업급여-소정급여일수" },
  ] };
  if (count === "third") return { pass: true, headline: "기초일액의 10%가 삭감돼요", detail: "3회째 수급부터 반복수급 감액이 시작돼요. 산정된 기초일액에서 10%를 삭감한 금액으로 소정급여일수 동안 지급받아요. 하한액도 같은 비율로 낮아질 수 있어요.", badges: ["10% 삭감", "3회째 수급"], rate: "10%", daily: "61,290원", links: [
    { icon: "📋", title: "기초일액 상한·하한 기준 확인", href: "/w/실업급여-기초일액" },
    { icon: "📝", title: "구직활동 인정 기준 — 차수별 횟수", href: "/w/실업급여-구직활동" },
  ] };
  if (count === "fourth") return { pass: false, headline: "기초일액의 25%가 삭감돼요", detail: "4회째 수급은 25% 감액이 적용돼요. 기초일액이 68,100원이라면 25% 삭감 후 51,075원으로 줄어요. 재취업활동계획서 제출 의무도 강화돼요.", badges: ["25% 삭감", "4회째 수급"], rate: "25%", daily: "51,075원", links: [
    { icon: "📝", title: "구직활동 인정 기준 강화 확인", href: "/w/실업급여-구직활동" },
    { icon: "⚠️", title: "부정수급 처벌 기준 — 최대 5배 추징", href: "/w/실업급여-부정수급" },
  ] };
  if (count === "fifth_plus") return { pass: false, headline: "기초일액의 50%가 삭감돼요", detail: "5회 이상 수급은 50% 감액이 적용돼요. 기초일액이 68,100원이라면 50% 삭감 후 34,050원만 받아요. 하한액도 50% 낮아진 금액이 적용될 수 있어요.", badges: ["50% 삭감", "5회 이상"], rate: "50%", daily: "34,050원", links: [
    { icon: "📝", title: "구직활동 인정 기준 강화 확인", href: "/w/실업급여-구직활동" },
    { icon: "⚠️", title: "부정수급 처벌 기준 — 최대 5배 추징", href: "/w/실업급여-부정수급" },
    { icon: "📋", title: "기초일액 상한·하한 기준 확인", href: "/w/실업급여-기초일액" },
  ] };

  return null;
}

export default function Article() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "반복수급 감액"]}
      tags={["2026년 기준", "실업급여", "반복수급"]}
      date="2026-02-20"
      title="실업급여 반복수급 5년 3회 감액 | 50% 단계별 삭감"
      description={
        <>
          5년간 3회 이상 받으면 최대 50%까지 감액된다는 사실, 알고 계셨나요? 3회 <strong style={{ color: C.t1 }}>10%</strong>, 4회 <strong style={{ color: C.t1 }}>25%</strong>, 5회 이상 <strong style={{ color: C.t1 }}>50%</strong> 삭감이에요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제60조 · 고용24", date: "2026.02 기준" }}
      stickyLabel="최대 감액"
      stickyValue="50% 삭감"
      stickyBtn="수급 이력 조회 →"
      stickyHref="https://www.work24.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do"
    >
      <TOC items={[
        { t: "내 반복수급 감액률 체크", sub: "5년 내 수급 횟수별 삭감률" },
        { t: "실업급여 반복수급은 얼마나 감액되나요?", sub: null },
        { t: "5년 3회 감액 기준은 무엇인가요?", sub: null },
        { t: "10% 25% 50% 삭감은 어떻게 되나요?", sub: "반복수급 감액률별 지급액 비교 (기초일액 68,100원 기준)" },
        { t: "재취업활동계획서는 언제 제출하나요?", sub: null },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "5년간 3회째 수급부터 감액이 시작되고, 횟수가 늘수록 삭감률이 올라가요.",
        "3회 <strong>10%</strong>, 4회 <strong>25%</strong>, 5회 이상 <strong>50%</strong> 삭감이 적용돼요.",
        "반복수급자는 <strong>재취업활동계획서</strong>를 의무적으로 제출해야 해요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="내 반복수급 감액률 체크" sub="직전 5년 내 수급 횟수를 선택하면 감액률을 알려드려요" />

      <P>이번 수급을 포함해 직전 5년 내 실업급여를 몇 번 받았는지에 따라 감액률이 달라져요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제60조</A> 기준이에요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x2714;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>반복수급 감액률 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>이번 수급 포함 5년 내 횟수 기준</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              이번 수급 포함 직전 5년 내 총 수급 횟수는?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="count" value="first_or_second" label="1~2회" sel={sel} pick={pick} />
              <Btn group="count" value="third" label="3회 (세 번째)" sel={sel} pick={pick} />
              <Btn group="count" value="fourth" label="4회 (네 번째)" sel={sel} pick={pick} />
              <Btn group="count" value="fifth_plus" label="5회 이상" sel={sel} pick={pick} />
            </div>
          </div>

          {result && (
            <div style={{ marginTop: 16, padding: 16, borderRadius: 8, background: result.pass ? C.navyLight : "#FFF5F5", border: result.pass ? "1px solid rgba(30,58,95,.1)" : "1px solid #FED7D7" }}>
              {result.rate && (
                <div style={{ fontSize: 22, fontWeight: 900, color: result.pass ? C.navy : "#E53E3E", marginBottom: 4 }}>
                  감액률 {result.rate} {result.daily && <span style={{ fontSize: 13, color: C.t3, fontWeight: 400 }}>→ 1일 {result.daily}</span>}
                </div>
              )}
              <div style={{ fontSize: 15, fontWeight: 800, color: result.pass ? C.navy : "#E53E3E", marginBottom: 4 }}>
                {result.pass ? "\u2705" : "\u26D4"} {result.headline}
              </div>
              <div style={{ fontSize: 13, color: C.t3, lineHeight: 1.55 }}>{result.detail}</div>
              <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" }}>
                {result.badges.map((b, i) => (
                  <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, background: result.pass ? C.navy : "#E53E3E", color: "#fff" }}>{b}</span>
                ))}
              </div>
              {result.links.length > 0 && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: result.pass ? "1px solid rgba(30,58,95,.08)" : "1px solid #FED7D7" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.t1, marginBottom: 6 }}>{"📖 관련 가이드"}</div>
                  {result.links.map((lnk, li) => (
                    <a key={li} href={lnk.href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", fontSize: 13, color: C.navy, fontWeight: 600, borderBottom: "1px solid rgba(30,58,95,.06)", textDecoration: "none" }}>
                      <span>{lnk.icon} {lnk.title}</span>
                      <span style={{ fontSize: 11, color: C.t4 }}>{"\u2192"}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 02. 감액 기준 ── */}
      <Divider />
      <Sec n="SECTION 02" title="실업급여 반복수급은 얼마나 감액되나요?" sub="5년 내 3회부터 감액 시작" />

      <P>반복수급 감액은 직전 5년 내 수급 횟수를 기준으로 계산해요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제60조</A>에서 이직일 전 5년 이내에 3회 이상 실업급여를 받은 경우 감액한다고 정하고 있어요.</P>

      <P>감액은 기초일액에 바로 적용돼요. 3회째 수급이면 10%, 4회째면 25%, 5회 이상이면 50%를 삭감한 금액으로 소정급여일수 전체를 받아요. 예를 들어 기초일액이 68,100원인 사람이 5회째 수급을 하면 34,050원만 받게 돼요.</P>

      <P>감액이 적용되더라도 하한액보다 낮아지면 하한액의 감액분이 적용돼요. 하한액(66,048원)에 50%를 적용하면 33,024원이에요. 이 이하로 내려가지는 않아요.</P>

      <P>반복수급 감액은 수급자 잘못이 아니라 반복 이직이 잦다는 이유로 적용되는 제도예요. 구직급여를 통해 실제로 재취업을 촉진하는 게 목적이에요.</P>

      <InlineLink icon="📋" title="실업급여 기초일액 상한·하한 기준" desc="2026년 상한액 68,100원, 하한액 66,048원. 감액 전 기초일액이 얼마인지 먼저 확인하세요." href="/w/실업급여-기초일액" />

      {/* ── SECTION 03. 5년 3회 기준 ── */}
      <Divider />
      <Sec n="SECTION 03" title="5년 3회 감액 기준은 무엇인가요?" sub="이직일 기준 직전 5년 내 수급 횟수" />

      <P>&lsquo;5년 3회&rsquo;는 이직일 기준으로 직전 5년 이내에 실업급여를 받은 횟수를 계산해요. 이번 수급을 포함해서 3번째가 되면 감액 대상이에요. 이전 수급이 얼마나 오래전인지보다 5년 내 횟수가 기준이에요.</P>

      <P>감액 기준이 되는 &lsquo;수급&rsquo;은 실업급여를 실제로 받은 경우를 뜻해요. 수급자격을 인정받았더라도 자진 취업해서 실제로 받지 않았거나, 자발적 이직으로 수급 자격이 제한된 경우는 횟수에 포함되지 않을 수 있어요.</P>

      <P><B>같은 5년 내에서도 이직일마다 기준이 달라질 수 있어요.</B> 예를 들어 2021년, 2023년, 2025년에 각각 수급했다면 2025년 이직일 기준으로 직전 5년(2020~2025년)을 보면 3회가 돼서 감액 대상이에요.</P>

      <P>감액 대상인지 확실하지 않다면 고용센터에서 피보험 이력을 조회하면 정확하게 확인할 수 있어요.</P>

      <Info type="tip">{'<strong>핵심 기준:</strong> 이직일 기준 직전 5년 내 <strong>실제로 수급한 횟수</strong>만 계산해요. 수급자격만 인정받고 안 받은 경우는 미포함이에요.'}</Info>

      <InlineLink icon="📊" title="실업급여 수급자격 — 비자발적 퇴사 기준" desc="자발적 퇴사도 예외 인정되는 경우가 있어요. 180일 합산 조건도 함께 정리했어요." href="/w/실업급여-수급자격" />

      {/* ── SECTION 04. 삭감 비교 ── */}
      <Divider />
      <Sec n="SECTION 04" title="10% 25% 50% 삭감은 어떻게 되나요?" sub="기초일액 68,100원 기준 실제 지급액 비교" />

      <P>삭감률은 5년 내 수급 횟수에 따라 단계적으로 올라가요. 기초일액 68,100원을 기준으로 실제 지급액을 비교하면 이렇게 돼요.</P>

      <TableTitle>반복수급 감액률별 지급액 비교 (기초일액 68,100원 기준)</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 420 }}>
          <thead>
            <tr><THL>수급 횟수</THL><TH>감액률</TH><TH>실제 지급액/일</TH><TH>180일 기준 총액</TH></tr>
          </thead>
          <tbody>
            {[
              ["1~2회", "없음", "68,100원", "12,258,000원"],
              ["3회", "10%", "61,290원", "11,032,200원"],
              ["4회", "25%", "51,075원", "9,193,500원"],
              ["5회 이상", "50%", "34,050원", "6,129,000원"],
            ].map((row, ri) => (
              <tr key={ri} style={{ background: ri === 3 ? "#FFF5F5" : "transparent" }}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 8px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : ri === 3 ? "#E53E3E" : C.t2, fontWeight: ci === 0 || ri === 3 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>※ 5회 이상이면 1~2회 대비 총 수령액이 절반으로 감소</TableNote>

      <P>5회 이상이 되면 처음에 비해 절반만 받아요. 소정급여일수는 같지만 1일 지급액이 줄어서 총액 차이가 크게 나요. 이 때문에 반복수급 전에 재취업을 위해 충분히 노력하는 게 중요해요.</P>

      <P><B>감액된 금액이라도 하한액의 감액분(하한액 &times; 감액률 적용)보다는 높아요.</B> 기초일액이 하한액에 해당하는 사람도 감액 후 최저 지급선이 적용돼요.</P>

      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: C.t1, marginBottom: 10 }}>{"📖 실업급여 감액 더 알아보기"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <SpokeLink num="01" title="실업급여 기초일액 — 평균임금 60% 계산법" desc="상한액·하한액 기준과 평균임금 산정 방법" href="/w/실업급여-기초일액" />
          <SpokeLink num="02" title="실업급여 연봉별 계산 — 월급 200~500만원 시뮬레이션" desc="연봉별 예상 수급액과 수급 기간 계산" href="/w/실업급여-연봉별-계산" />
          <SpokeLink num="03" title="실업급여 부정수급 — 형사처벌과 5배 추징 기준" desc="허위 신고 시 처벌 기준과 자진신고 감경" href="/w/실업급여-부정수급" />
        </div>
      </div>

      {/* ── SECTION 05. 재취업활동계획서 ── */}
      <Divider />
      <Sec n="SECTION 05" title="재취업활동계획서는 언제 제출하나요?" sub="반복수급자 의무 — 구직활동 기준 강화" />

      <P>반복수급자에게는 재취업활동계획서 제출 의무가 추가로 부과돼요. 5년 내 3회 이상 수급한 경우 수급 초기에 고용센터에서 재취업 계획을 수립하고 제출해야 해요.</P>

      <P>재취업활동계획서에는 희망 직종, 취업 목표, 구직활동 방법 등을 기재해요. 단순 형식이 아니라 실제 취업 의지를 보여주는 계획이어야 해요. 고용센터 직업상담사와 면담을 통해 작성하는 경우도 있어요.</P>

      <P>계획서를 제출하지 않으면 실업인정이 거부될 수 있어요. 반복수급자는 일반 수급자보다 구직활동 기준이 엄격하게 적용될 수 있으니, 첫 실업인정일 이전에 미리 고용센터에 문의하는 게 좋아요.</P>

      <InlineLink icon="📝" title="구직활동 인정 기준 — 차수별 횟수와 증빙 방법" desc="반복수급자는 구직활동 기준이 강화돼요. 차수별 인정 횟수와 증빙 방법을 정리했어요." href="/w/실업급여-구직활동" />

      <BridgeCard
        question="감액보다 더 무서운 처벌이 있다는 거 아셨나요?"
        body={<>감액 외에 부정수급 적발 시 형사처벌까지 이어질 수 있어요. <strong style={{ color: C.navy }}>5년 이하 징역</strong>까지 가능한 처벌 기준을 정리했어요.</>}
        btnText="부정수급 형사처벌 기준 보기 →"
        href="/w/실업급여-부정수급"
      />

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 반복수급 감액은 전체 금액에서 삭감되나요?", a: '네, 소정급여일수 <strong>전체에 감액이 적용</strong>돼요. 3회째 수급이면 전체 기간 수령액의 10%를 깎아요. 하한액도 감액 대상이 되어 실제 지급액이 낮아질 수 있어요.' },
        { q: "실업급여 반복수급 5년 기산점은 언제인가요?", a: '<strong>이직일 기준</strong>으로 직전 5년 내 실업급여 수급 횟수를 계산해요. 이직일이 같은 해이더라도 과거 수급 횟수에 따라 감액 여부가 달라져요.' },
      ]} />

      <RelatedArticles items={[
        { title: "실업급여 수급자격 — 자발적·비자발적 퇴사 기준", desc: "실업급여 · 수급자격", href: "/w/실업급여-수급자격" },
        { title: "실업급여 부정수급 — 형사처벌 기준과 자진신고 감경", desc: "실업급여 · 부정수급", href: "/w/실업급여-부정수급" },
        { title: "실업급여 구직활동 — 인정 기준 증빙 방법", desc: "실업급여 · 구직활동", href: "/w/실업급여-구직활동" },
        { title: "실업급여 기초일액 — 상한액 하한액 기준", desc: "실업급여 · 기초일액", href: "/w/실업급여-기초일액" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 미지급 유족 청구", href: "/w/실업급여-미지급-상속" }}
        next={{ title: "실업급여 수급자격 인정", href: "/w/실업급여-수급자격-인정" }}
      />
    </BlogLayout>
  );
}
