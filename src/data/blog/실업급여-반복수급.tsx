// @ts-nocheck
"use client";

import { useState } from "react";
import {
  C, Btn, Info, InlineLink, SpokeLink, Divider, Sec, P, B, A,
  TableTitle, TableNote, TH, THL,
  BridgeCard, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext, RelatedMid,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultCTA,
  SidebarCTA, SidebarDocs, SidebarCalc,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "실업급여 반복수급 감액 기준 | 5년 이내 3회 이상 단계별 삭감",
  description: "실업급여 반복수급은 직전 5년 내 3회째 수급부터 10% 삭감이 시작되고, 5회 이상이면 50%까지 줄어요. 감액률과 재취업활동계획서 제출 의무를 정리했어요.",
  category: "실업급여",
  keywords: ["실업급여 반복수급 감액", "5년 이내 3회 기준", "10% 25% 50% 삭감률", "재취업활동계획서 제출"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "직전 5년 내 3회째 수급부터 기초일액의 10%가 삭감돼요.",
    "4회 25%, 5회 이상 50% 단계적으로 삭감률이 올라가요.",
    "반복수급자는 재취업활동계획서를 의무적으로 제출해야 해요.",
  ],
  sources: [{ name: "고용보험법 제60조", url: "https://www.law.go.kr/법령/고용보험법", date: "2026-02" }],
  faq: [
    { q: "실업급여 반복수급 감액은 소정급여일수 전체에 적용되나요?", a: "네, 소정급여일수 전체에 감액이 적용돼요. 3회째 수급이면 전체 기간 수령액의 10%를 삭감해요. 하한액도 감액 대상이 되어 실제 지급액이 낮아질 수 있어요." },
    { q: "실업급여 반복수급 5년 기산점은 언제인가요?", a: "이직일 기준으로 직전 5년 내 실업급여 수급 횟수를 계산해요. 이직일이 같은 해이더라도 과거 수급 횟수에 따라 감액 여부가 달라져요." },
  ],
  ctaCard: {
    label: "감액률 체크",
    mainText: "5회 이상 → 최대 50% 삭감",
    subText: "내 수급 횟수로 감액률 확인하기",
    url: "/w/실업급여-반복수급",
    external: false,
  },
  relatedDocs: [{ title: "실업급여 기초일액 계산", url: "/w/실업급여-기초일액" }],
};

type ResLink = { icon: string; title: string; desc: string; href: string };

function getResult(sel: Record<string, string>): { pass: boolean; headline: string; detail: string; rate: string; links: ResLink[] } | null {
  const { count } = sel;
  if (!count) return null;

  if (count === "first_or_second") return {
    pass: true,
    headline: "감액 없이 전액 수급해요",
    detail: "직전 5년 내 1~2회 수급은 반복수급 감액 대상이 아니에요. 산정된 기초일액 그대로 소정급여일수 동안 받을 수 있어요.",
    rate: "감액률 0% — 기초일액 전액 지급",
    links: [
      { icon: "📋", title: "기초일액 상한·하한 기준", desc: "2026년 상한 68,100원, 하한 66,048원", href: "/w/실업급여-기초일액" },
      { icon: "📊", title: "소정급여일수 나이별 기간표", desc: "나이별·가입기간별 수급 기간", href: "/w/실업급여-소정급여일수" },
    ],
  };
  if (count === "third") return {
    pass: true,
    headline: "기초일액의 10%가 삭감돼요",
    detail: "3회째 수급부터 반복수급 감액이 시작돼요. 기초일액 68,100원 기준이면 61,290원이 실지급액이에요.",
    rate: "감액률 10% — 기초일액 61,290원",
    links: [
      { icon: "📋", title: "기초일액 상한·하한 기준", desc: "감액 전 기초일액 확인", href: "/w/실업급여-기초일액" },
      { icon: "📝", title: "구직활동 인정 기준", desc: "차수별 횟수와 증빙 방법", href: "/w/실업급여-구직활동" },
    ],
  };
  if (count === "fourth") return {
    pass: false,
    headline: "기초일액의 25%가 삭감돼요",
    detail: "4회째 수급은 25% 감액이에요. 기초일액 68,100원 기준 51,075원이 실지급액이에요. 재취업활동계획서 의무도 강화돼요.",
    rate: "감액률 25% — 기초일액 51,075원",
    links: [
      { icon: "📝", title: "구직활동 인정 기준 강화 확인", desc: "반복수급자 구직활동 기준", href: "/w/실업급여-구직활동" },
      { icon: "⚠️", title: "부정수급 처벌 기준", desc: "최대 5배 추징 기준", href: "/w/실업급여-부정수급" },
    ],
  };
  if (count === "fifth_plus") return {
    pass: false,
    headline: "기초일액의 50%가 삭감돼요",
    detail: "5회 이상 수급은 50% 감액이에요. 기초일액 68,100원 기준 34,050원만 받아요. 하한액 감액분도 같이 낮아져요.",
    rate: "감액률 50% — 기초일액 34,050원",
    links: [
      { icon: "📝", title: "구직활동 인정 기준 강화 확인", desc: "반복수급자 기준", href: "/w/실업급여-구직활동" },
      { icon: "⚠️", title: "부정수급 처벌 기준", desc: "최대 5배 추징", href: "/w/실업급여-부정수급" },
      { icon: "📋", title: "기초일액 상한·하한 기준", desc: "감액 적용 기초일액", href: "/w/실업급여-기초일액" },
    ],
  };

  return null;
}

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  const sidebar = (
    <>
      <SidebarCTA
        items={[
          { icon: "🔄", label: "수급 이력 조회", desc: "고용24 피보험 이력", href: "https://www.work24.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do", hot: true },
          { icon: "📋", label: "기초일액 확인", desc: "상한·하한 기준", href: "/w/실업급여-기초일액" },
          { icon: "📊", label: "소정급여일수", desc: "나이별 수급 기간", href: "/w/실업급여-소정급여일수" },
        ]}
      />
      <SidebarDocs
        items={[
          { title: "고용보험법 제60조", href: "https://www.law.go.kr/법령/고용보험법" },
          { title: "실업급여 기초일액 계산", href: "/w/실업급여-기초일액" },
          { title: "구직활동 인정 기준", href: "/w/실업급여-구직활동" },
          { title: "실업급여 수급자격 조건", href: "/w/실업급여-수급자격" },
          { title: "부정수급 처벌 기준", href: "/w/실업급여-부정수급" },
        ]}
      />
      <SidebarCalc
        items={[
          { title: "연봉별 수급액 계산", href: "/w/실업급여-연봉별-계산" },
          { title: "소정급여일수 조회", href: "/w/실업급여-소정급여일수" },
          { title: "기초일액 계산", href: "/w/실업급여-기초일액" },
          { title: "수급 기간 계산", href: "/w/실업급여-수급기간-몇개월-받나요" },
          { title: "피보험기간 180일 계산", href: "/w/실업급여-피보험기간-180일-계산" },
        ]}
      />
    </>
  );

  return (
    <BlogLayout
      sidebar={sidebar}
      disclaimer="이 글은 2026년 2월 고용보험법 기준으로 작성됐어요. 수급 횟수 산정 기준은 고용센터에서 개별 확인하세요."
      breadcrumb={["홈", "실업급여", "반복수급 감액"]}
      tags={["2026년 기준", "실업급여", "반복수급"]}
      date="2026-02-27"
      title={meta.title}
      description={<>{meta.description}</>}
      sourceBar={{ badge: "출처", name: "고용보험법 제60조 · 고용24", date: "2026.02 기준" }}
    >
      <TOC items={[
        { t: "내 반복수급 감액률 체크", sub: "직전 5년 내 수급 횟수별 삭감률" },
        { t: "실업급여 반복수급은 얼마나 감액되나요?", sub: "5년 이내 3회부터 감액 시작" },
        { t: "실업급여 반복수급 5년 기준은 어떻게 되나요?", sub: "이직일 기준 수급 횟수 계산" },
        { t: "실업급여 반복수급 단계별 삭감률은 얼마나요?", sub: "기초일액 68,100원 기준 비교 표" },
        { t: "실업급여 반복수급자 재취업활동계획서란?", sub: "3회 이상 수급자 의무 사항" },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "직전 5년 내 3회째 수급부터 기초일액의 <strong>10%</strong>가 삭감돼요.",
        "4회 <strong>25%</strong>, 5회 이상 <strong>50%</strong> 단계적으로 삭감률이 올라가요.",
        "반복수급자는 <strong>재취업활동계획서</strong>를 의무적으로 제출해야 해요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <CheckerShell icon="🔄" title="반복수급 감액률 체크" label="직전 5년 내 수급 횟수 기준">
        <Sec n="STEP 01" title="내 반복수급 감액률 체크" sub="직전 5년 내 수급 횟수를 선택하면 감액률을 알려드려요" />
        <P>이번 수급을 포함해 직전 5년 내 실업급여를 몇 번 받았는지에 따라 감액률이 달라져요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제60조</A> 기준이에요.</P>
        <CheckerQ n={1} label="이번 수급 포함 직전 5년 내 총 수급 횟수는?">
          <Btn group="count" value="first_or_second" label="1~2회" sel={sel} pick={pick} />
          <Btn group="count" value="third" label="3회 (세 번째)" sel={sel} pick={pick} />
          <Btn group="count" value="fourth" label="4회 (네 번째)" sel={sel} pick={pick} />
          <Btn group="count" value="fifth_plus" label="5회 이상" sel={sel} pick={pick} />
          <Btn group="count" value="unsure" label="잘 모르겠어요" sel={sel} pick={pick} />
        </CheckerQ>
        {result?.pass === true && (
          <ResultPass title={result.rate} desc={result.detail}>
            {result.links.map((l) => (
              <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
            ))}
          </ResultPass>
        )}
        {result?.pass === false && (
          <ResultFail title={result.rate} desc={result.detail}>
            {result.links.map((l) => (
              <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
            ))}
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        question="감액 외에 더 무서운 처벌이 있다는 사실 아세요?"
        body={<>미신고나 허위신고로 적발되면 감액이 아니라 <strong style={{ color: C.navy }}>5배 추징 + 형사처벌</strong>까지 이어질 수 있어요. 아래에서 감액 기준을 먼저 확인하세요.</>}
        btnText="반복수급 감액 기준 바로 보기 →"
        href="#section-02"
      />

      {/* ── SECTION 02. 감액 기준 ── */}
      <Divider />
      <Sec n="SECTION 02" title="실업급여 반복수급은 얼마나 감액되나요?" sub="5년 이내 3회부터 감액 시작" />

      <P>반복수급 감액은 직전 5년 내 수급 횟수를 기준으로 계산해요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제60조</A>에서 이직일 전 5년 이내에 3회 이상 실업급여를 받은 경우 감액한다고 정하고 있어요.</P>

      <P>감액은 기초일액에 바로 적용돼요. 3회째 수급이면 10%, 4회째면 25%, 5회 이상이면 50%를 삭감한 금액으로 소정급여일수 전체를 받아요. 기초일액이 68,100원인 사람이 5회째 수급을 하면 34,050원만 받게 돼요.</P>

      <P>감액이 적용되더라도 하한액보다 낮아지지는 않아요. 하한액(66,048원)에도 같은 비율을 적용한 금액이 최저선이 돼요. 5회 이상이면 하한액의 50%인 33,024원이 최저 지급 기준이에요.</P>

      <P>반복수급 감액은 수급자 잘못이 아니라 반복 이직을 억제하고 실제 재취업을 촉진하려는 목적의 제도예요. 이직 사유나 퇴직 이유는 감액 여부에 영향을 주지 않아요.</P>

      <InlineLink icon="📋" title="실업급여 기초일액 상한·하한 기준" desc="2026년 상한액 68,100원, 하한액 66,048원 기준과 감액 전 기초일액 확인 방법" href="/w/실업급여-기초일액" />

      {/* ── SECTION 03. 5년 기준 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 반복수급 5년 기준은 어떻게 되나요?" sub="이직일 기준 수급 횟수 계산 방법" />

      <P>&lsquo;5년 3회&rsquo;는 이직일 기준으로 직전 5년 이내에 실제로 실업급여를 받은 횟수를 계산해요. 이번 수급을 포함해서 3번째가 되면 감액 대상이에요. 이전 수급이 얼마나 오래됐는지보다 5년 내 횟수가 기준이에요.</P>

      <P>감액 기준이 되는 &lsquo;수급&rsquo;은 실제로 지급받은 경우를 뜻해요. 수급자격을 인정받았더라도 취업해서 실제로 받지 않았거나, 자발적 이직으로 수급 자격이 제한된 경우는 횟수에 포함되지 않을 수 있어요.</P>

      <P><B>같은 5년 내에서도 이직일마다 기준이 달라질 수 있어요.</B> 2021년, 2023년, 2025년에 각각 수급했다면 2025년 이직일 기준 직전 5년(2020~2025년)에 3회가 돼서 감액 대상이에요.</P>

      <P>감액 대상인지 확실하지 않다면 고용센터에서 피보험 이력을 조회하면 정확하게 확인할 수 있어요. 고용24에서도 본인 수급 이력을 조회할 수 있어요.</P>

      <Info type="warn">{'<strong>핵심 기준:</strong> 이직일 기준 직전 5년 내 <strong>실제로 수급한 횟수</strong>만 계산해요. 수급자격만 인정받고 안 받은 경우는 횟수에 미포함이에요.'}</Info>

      <RelatedMid
        hubHref="/w/실업급여"
        hubLabel="실업급여 전체 가이드"
        items={[
          { title: "기초일액 상한·하한 계산", href: "/w/실업급여-기초일액", desc: "감액 전 기초일액 확인" },
          { title: "소정급여일수 나이별 표", href: "/w/실업급여-소정급여일수", desc: "수급 기간 조회" },
          { title: "구직활동 인정 기준", href: "/w/실업급여-구직활동", desc: "차수별 횟수와 증빙" },
        ]}
      />

      {/* ── SECTION 04. 삭감 비교 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 반복수급 단계별 삭감률은 얼마나요?" sub="기초일액 68,100원 기준 실제 지급액 비교" />

      <P>삭감률은 5년 내 수급 횟수에 따라 단계적으로 올라가요. 기초일액 68,100원을 기준으로 실제 지급액을 비교하면 이렇게 돼요.</P>

      <TableTitle>반복수급 감액률별 지급액 비교</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 420 }}>
          <thead>
            <tr><THL>수급 횟수</THL><TH>감액률</TH><TH>실지급액/일</TH><TH>180일 총액</TH></tr>
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
                  <td key={ci} style={{ padding: "8px 8px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ri === 3 ? "#E53E3E" : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>※ 기초일액 상한 68,100원(2026년) 기준 / 5회 이상이면 총 수령액이 1~2회 대비 절반으로 감소</TableNote>

      <P>5회 이상이 되면 처음에 비해 절반만 받아요. 소정급여일수는 같지만 1일 지급액이 줄어서 총액 차이가 크게 나요.</P>

      <P><B>감액된 금액이라도 하한액 감액분보다는 높아요.</B> 기초일액이 하한액에 해당하는 사람도 감액 후 최저 지급선이 적용돼요. 이 기준 이하로는 내려가지 않아요.</P>

      <P>감액은 개인의 실수가 아니라 반복 이직이 많다는 통계적 판단이에요. 빠른 재취업을 통해 다음 수급 때 감액을 피하는 것이 현실적인 방법이에요.</P>

      <P>감액률이 높을수록 월 생활비가 줄어들기 때문에, 구직활동을 더 빠르게 진행하고 재취업 기회를 넓히는 것이 중요해요.</P>

      <SpokeLink num="01" title="실업급여 기초일액 — 평균임금 60% 계산법" desc="상한액·하한액 기준과 평균임금 산정 방법" href="/w/실업급여-기초일액" />
      <SpokeLink num="02" title="실업급여 연봉별 계산 — 월급 200~500만원 시뮬레이션" desc="연봉별 예상 수급액과 수급 기간 계산" href="/w/실업급여-연봉별-계산" />

      {/* ── SECTION 05. 재취업활동계획서 ── */}
      <Divider />
      <Sec n="SECTION 05" title="실업급여 반복수급자 재취업활동계획서란?" sub="3회 이상 수급자 의무 제출 서류" />

      <P>반복수급자에게는 재취업활동계획서 제출 의무가 추가로 부과돼요. 5년 내 3회 이상 수급한 경우 수급 초기에 고용센터에서 재취업 계획을 수립하고 제출해야 해요.</P>

      <P>재취업활동계획서에는 희망 직종, 취업 목표, 구직활동 방법 등을 기재해요. 단순 형식이 아니라 실제 취업 의지를 보여주는 계획이어야 해요. 고용센터 직업상담사와 면담을 통해 작성하는 경우도 있어요.</P>

      <P>계획서를 제출하지 않으면 실업인정이 거부될 수 있어요. 반복수급자는 일반 수급자보다 구직활동 기준이 엄격하게 적용될 수 있으니, 첫 실업인정일 이전에 미리 고용센터에 문의하는 게 좋아요.</P>

      <P>재취업활동계획서는 일회성이 아니라 지속적으로 이행 여부를 확인해요. 계획에 따라 구직활동을 하고, 결과를 실업인정 시 보고하는 구조예요.</P>

      <InlineLink icon="📝" title="구직활동 인정 기준 — 차수별 횟수와 증빙 방법" desc="반복수급자는 구직활동 기준이 강화돼요. 차수별 인정 횟수와 증빙 방법 정리" href="/w/실업급여-구직활동" />

      <a href="https://www.work24.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-black">
        <span className="ext-btn-badge">고용24 공식</span>
        <span className="ext-btn-text">피보험 수급 이력 조회</span>
        <span className="ext-btn-cta">바로가기 →</span>
      </a>

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "실업급여 수급자격 — 자발적·비자발적 퇴사 기준", desc: "실업급여 · 수급자격", href: "/w/실업급여-수급자격" },
        { title: "실업급여 기초일액 — 상한액 하한액 기준", desc: "실업급여 · 기초일액", href: "/w/실업급여-기초일액" },
        { title: "실업급여 구직활동 — 인정 기준 증빙 방법", desc: "실업급여 · 구직활동", href: "/w/실업급여-구직활동" },
        { title: "실업급여 소정급여일수 — 나이별 수급 기간", desc: "실업급여 · 소정급여일수", href: "/w/실업급여-소정급여일수" },
        { title: "실업급여 부정수급 — 형사처벌 기준과 자진신고", desc: "실업급여 · 부정수급", href: "/w/실업급여-부정수급" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 미지급 유족 청구", href: "/w/실업급여-미지급-상속" }}
        next={{ title: "실업급여 수급자격 인정", href: "/w/실업급여-수급자격-인정" }}
      />
    </BlogLayout>
  );
}
