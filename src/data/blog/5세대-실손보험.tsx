"use client";
import React, { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
  ChipsGrid,
} from "@/components/wiki/BlogShared";

/* ───── meta ───── */
export const meta = {
  title: "5세대 실손보험 보장 내용 비교 | 4세대 보험료 갱신 체계",
  description:
    "2026년 4월 출시 예정인 5세대 실손보험은 4세대보다 보험료가 최대 50% 저렴하지만, 도수치료·체외충격파 같은 비급여 자기부담은 30%에서 50%로 오르는 구조예요. 갈아타기 전에 내 의료 이용 패턴부터 파악하는 게 중요해요.",
  category: "보험",
  keywords: [
    "5세대 실손보험 4세대 차이",
    "5세대 실손보험 보험료 인하",
    "5세대 실손보험 비급여 자기부담",
    "5세대 실손보험 갈아타기 기준",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "2026년 4월 출시 예정, 특약1만 선택 시 4세대 대비 보험료 최대 50% 저렴해요",
    "비급여 도수치료·영양주사 자기부담 30%→50%로 오르고, 연간 한도 1,000만원으로 줄어요",
    "1·2세대 가입자는 보험사 계약 재매입 후 무심사로 5세대 전환이 가능해요",
  ],
  sources: [
    {
      name: "5세대 실손보험 주요 내용 (KB생각)",
      url: "https://kbthink.com/insurance/trend/5th-generation.html",
      date: "2026-02",
    },
    {
      name: "5세대 실손보험 뱅크샐러드 분석",
      url: "https://www.banksalad.com/articles/%EB%B3%B4%ED%97%98-%EC%8B%A4%EC%86%90%EB%B3%B4%ED%97%98-5%EC%84%B8%EB%8C%80%EC%8B%A4%EC%86%90",
      date: "2026-02",
    },
  ],
  faq: [
    {
      q: "5세대 실손보험 출시일이 언제예요?",
      a: "2026년 4월 중 출시 예정이에요. 기본 계약(특약1 — 중증 비급여 보장)이 먼저 나오고, 도수치료·영양주사를 포함한 특약2는 비급여 관리 효과를 확인한 뒤 2026년 상반기 중 출시 일정이 확정될 예정이에요.",
    },
    {
      q: "5세대 실손보험으로 갈아타면 무조건 유리한가요?",
      a: "도수치료·체외충격파를 자주 받는 분이라면 오히려 손해가 될 수 있어요. 비급여 자기부담이 30%에서 50%로 오르기 때문이에요. 반면 도수치료를 거의 받지 않고 보험료 부담이 큰 분에게는 전환이 유리해요.",
    },
  ],
  ctaCard: {
    label: "30초 비교",
    mainText: "나는 갈아타야 할까?",
    subText: "4가지만 선택하면 바로 판단해 드려요",
    url: "#checker",
    external: false,
  },
  relatedDocs: [
    { title: "4세대 5세대 차이 상세 비교", url: "/w/5세대-실손보험-4세대-차이" },
    { title: "도수치료 보장 변화", url: "/w/5세대-실손보험-도수치료-제외" },
  ],
};

/* ───── checker ───── */
type Ans = Record<string, string>;
type ResLink = { icon: string; title: string; desc: string; href: string };

function getResult(a: Ans): React.ReactNode | null {
  if (!a.generation || !a.doseTherapy || !a.severity || !a.premium) return null;

  if (a.doseTherapy === "frequent") {
    const links: ResLink[] = [
      { icon: "📊", title: "도수치료 보장 변화 상세", desc: "5세대 전환 시 실제 부담 금액 비교", href: "/w/5세대-실손보험-도수치료-제외" },
      { icon: "🔢", title: "자기부담금 계산", desc: "내 치료비 기준 실수령 차이 확인", href: "/w/5세대-실손보험-자기부담금" },
    ];
    return (
      <ResultFail
        title="현재 실손보험 유지를 권장해요"
        desc="도수치료·체외충격파를 자주 받는다면 5세대 전환 후 비급여 자기부담이 30%→50%로 늘어나 실제 보장이 줄어들어요."
      >
        <ResultGrid
          items={[
            { icon: "⚠️", name: "자기부담 변화", pass: false, desc: "30% → 50%" },
            { icon: "📉", name: "연간 한도", pass: false, desc: "5,000만 → 1,000만원" },
            { icon: "💡", name: "갱신 할증", pass: false, desc: "사용액 100만+ → +100%" },
            { icon: "📋", name: "추천 행동", pass: true, desc: "출시 후 비용 비교 후 결정" },
          ]}
        />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultFail>
    );
  }

  if (a.generation === "1or2") {
    const links: ResLink[] = [
      { icon: "🔄", title: "갈아타기 시기 가이드", desc: "1·2세대 계약 재매입 절차 확인", href: "/w/5세대-실손보험-갈아타기-시기" },
      { icon: "💰", title: "보험료 인하 계산", desc: "내 세대 기준 예상 인하 금액", href: "/w/5세대-실손보험-보험료-비교" },
    ];
    return (
      <ResultPass
        title="5세대 전환을 적극 고려해 보세요"
        desc="1·2세대 실손보험은 갱신 시 보험료 인상이 크게 누적돼 있어요. 계약 재매입 제도로 무심사 전환하면 보험료를 크게 낮출 수 있어요."
      >
        <ResultGrid
          items={[
            { icon: "💰", name: "예상 보험료", pass: true, desc: "4세대 대비 30~50% 인하" },
            { icon: "🔄", name: "전환 방식", pass: true, desc: "계약 재매입 + 무심사" },
            { icon: "📋", name: "중증 보장", pass: true, desc: "특약1 — 암·뇌혈관 30%" },
            { icon: "📅", name: "전환 시기", pass: true, desc: "2026년 4월 출시 후" },
          ]}
        />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  if (a.generation === "4") {
    const links: ResLink[] = [
      { icon: "📊", title: "4세대 5세대 차이 상세 비교", desc: "항목별 보장 차이 확인", href: "/w/5세대-실손보험-4세대-차이" },
      { icon: "💰", title: "보험료 인하 계산", desc: "특약 조합별 금액 비교", href: "/w/5세대-실손보험-보험료-비교" },
    ];
    return (
      <ResultPass
        title="5세대 전환을 고려해 볼 수 있어요"
        desc="4세대 가입자도 5세대로 전환 가능해요. 출시 후 보험료가 약 30% 저렴해지는 게 장점이에요. 단, 도수치료가 잦다면 신중하게 비교해 보세요."
      >
        <ResultGrid
          items={[
            { icon: "💰", name: "예상 보험료", pass: true, desc: "현재 대비 약 30% 절감" },
            { icon: "📋", name: "비급여 보장", pass: true, desc: "특약1+2 선택 가능" },
            { icon: "⚠️", name: "주의사항", pass: false, desc: "도수치료 잦으면 비교 필수" },
            { icon: "📅", name: "전환 시기", pass: true, desc: "2026년 4월 출시 예정" },
          ]}
        />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  const links: ResLink[] = [
    { icon: "📋", title: "가입 조건 나이 확인", desc: "5세대 신규 가입 기준 정리", href: "/w/5세대-실손보험-가입-조건" },
    { icon: "📊", title: "보장 내용 상세 확인", desc: "특약1·2 구성 및 한도", href: "/w/5세대-실손보험-보장-내용" },
  ];
  return (
    <ResultPass
      title="5세대 신규 가입을 추천해요"
      desc="실손보험이 없다면 5세대 출시 후 가입하는 게 유리해요. 4세대보다 저렴하고 임신·출산 급여까지 보장받을 수 있어요."
    >
      <ResultGrid
        items={[
          { icon: "💰", name: "보험료", pass: true, desc: "4세대 대비 30~50% 저렴" },
          { icon: "🤱", name: "임신·출산", pass: true, desc: "급여 의료비 신규 보장" },
          { icon: "📋", name: "가입 조건", pass: true, desc: "건강 고지 후 심사" },
          { icon: "📅", name: "출시 예정", pass: true, desc: "2026년 4월" },
        ]}
      />
      {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
    </ResultPass>
  );
}

/* ───── component ───── */
export default function Article92() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "보험", "실손보험", "5세대 실손보험"]}
      tags={["2026년 출시 예정", "실손보험", "보험료 비교"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={
        <>
          2023년 기준 실손보험 가입자의 <B>65%</B>는 보험금을 한 번도 받지 못했어요.
          5세대 개편으로 보험료는 낮아지지만, 비급여 자기부담이 <B>50%</B>로 오르는 항목도 생겨요.
          2026년 4월 출시 전, 지금 갈아타야 할지 먼저 파악해 두면 도움이 돼요.
        </>
      }
      sourceBar={{
        badge: "최신 기준",
        name: "KB생각 · 뱅크샐러드 · 금융감독원",
        date: "2026.02 기준",
      }}
      stickyLabel="출시 예정"
      stickyValue="2026년 4월"
      stickyBtn="비교하기 ↑"
      disclaimer="이 글은 금융감독원과 각 금융기관 발표 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 정확한 보험 내용은 가입 전 보험사에 직접 문의하세요."
      sidebar={
        <>
          <SidebarCTA
            items={[
              { icon: "🛡️", title: "세대별 보장 차이 비교", sub: "4·5세대 항목별 비교", href: "/w/5세대-실손보험-4세대-차이", hot: true },
              { icon: "💰", title: "보험료 인하 계산", sub: "특약별 금액 차이", href: "/w/5세대-실손보험-보험료-비교" },
              { icon: "🏥", title: "도수치료 보장 변화", sub: "비급여 50% 영향", href: "/w/5세대-실손보험-도수치료-제외" },
            ]}
          />
          <SidebarDocs
            items={[
              { title: "비급여 자기부담금 계산", cat: "보험·자기부담", href: "/w/5세대-실손보험-자기부담금" },
              { title: "갱신 할증 기준", cat: "보험·갱신", href: "/w/5세대-실손보험-갱신" },
              { title: "갈아타기 시기 가이드", cat: "보험·전환", href: "/w/5세대-실손보험-갈아타기-시기" },
            ]}
          />
          <SidebarCalc
            items={[
              { title: "실업급여 계산기", href: "/calculators/실업급여-계산기" },
              { title: "퇴직금 계산기", href: "/calculators/퇴직금-계산기" },
              { title: "연말정산 계산기", href: "/calculators/연말정산-계산기" },
              { title: "양도소득세 계산기", href: "/calculators/양도소득세-계산기" },
              { title: "대출이자 계산기", href: "/calculators/대출이자-계산기" },
            ]}
          />
        </>
      }
    >
      {/* ── TOC ── */}
      <TOC
        items={[
          { t: "나에게 맞는 실손보험 세대 체크", sub: null },
          {
            t: "4세대와 5세대, 무엇이 달라지나요?",
            sub: "개편 배경 — 불균형 해소 · 세대별 핵심 구조 비교 · 임신·출산 급여 신규 추가",
          },
          {
            t: "보험료가 얼마나 저렴해지나요?",
            sub: "특약 선택에 따른 인하 폭 · 갱신 할증 체계 변화",
          },
          {
            t: "비급여 치료를 받으면 얼마나 내나요?",
            sub: "중증 비급여 특약1 보장 범위 · 일반 비급여 특약2 — 도수치료·영양주사",
          },
          {
            t: "어떤 경우에 갈아타는 게 유리한가요?",
            sub: "1·2세대 계약 재매입 전환 · 현재 세대 유지가 유리한 경우",
          },
          { t: "자주 묻는 질문", sub: null },
        ]}
      />

      {/* ── Summary3 ── */}
      <Summary3
        items={[
          "2026년 4월 출시 예정, 특약1만 선택 시 4세대 대비 보험료 최대 50% 저렴해요",
          "비급여 도수치료·영양주사 자기부담 30%→50%로 오르고, 연간 한도 1,000만원으로 줄어요",
          "1·2세대 가입자는 계약 재매입 후 무심사로 5세대 전환이 가능해요",
        ]}
      />

      {/* ── PAS 브릿지 ── */}
      <BridgeCard
        q="지금 갈아타는 게 유리한지 헷갈리시죠?"
        a="도수치료를 자주 받는다면 오히려 손해가 될 수 있어요. 4가지만 선택하면 내 상황에 맞는 판단을 바로 알려드려요."
        label="나에게 맞는 세대 바로 확인"
        href="#checker"
      />

      {/* ══════ STEP 01 — 체커 ══════ */}
      <Divider />
      <Sec
        n="STEP 01"
        id="checker"
        title="나에게 맞는 실손보험 세대 체크"
        sub="4가지만 선택하면 바로 알 수 있어요"
      >
        <P>
          5세대 실손보험이 출시되면 무조건 갈아타는 게 좋을까요? 꼭 그렇지는 않아요.
          도수치료·체외충격파를 자주 받는 분은 오히려 5세대로 바꾸면 실손 수령액이 줄어들 수 있어요.
          내 의료 이용 패턴과 현재 가입 세대부터 파악하는 게 먼저예요.
        </P>
        <P>
          반대로 병원을 거의 안 가거나 중증질환 보장이 우선인 분이라면, 5세대로 전환하면
          같은 보장을 훨씬 낮은 보험료로 유지할 수 있어요. 보험료 부담이 있다면 특히 유리해요.
        </P>

        <CheckerShell title="나에게 맞는 실손보험 세대는?" sub="30초 판정">
          <CheckerQ
            n="1"
            label="현재 가입한 실손보험 세대는?"
            group="generation"
            opts={[
              ["1or2", "1·2세대 (2009~2017년)"],
              ["3", "3세대 (2017~2021년)"],
              ["4", "4세대 (2021년 이후)"],
              ["new", "미가입"],
            ]}
            sel={ans}
            pick={pick}
          />
          <CheckerQ
            n="2"
            label="도수치료·체외충격파 이용 빈도는?"
            group="doseTherapy"
            opts={[
              ["frequent", "월 1회 이상 꾸준히"],
              ["sometimes", "가끔 (연 1~3회)"],
              ["rarely", "거의 없음"],
            ]}
            sel={ans}
            pick={pick}
          />
          <CheckerQ
            n="3"
            label="중증질환(암·뇌혈관·심장) 이력이나 가족력이 있나요?"
            group="severity"
            opts={[
              ["yes", "있어요"],
              ["no", "없어요"],
            ]}
            sel={ans}
            pick={pick}
          />
          <CheckerQ
            n="4"
            label="현재 실손보험료가 부담되나요?"
            group="premium"
            opts={[
              ["high", "많이 부담돼요"],
              ["normal", "크게 부담 없어요"],
            ]}
            sel={ans}
            pick={pick}
          />
          {result}
        </CheckerShell>
      </Sec>

      {/* ══════ SECTION 02 — 4세대 차이 ══════ */}
      <Divider />
      <Sec
        n="SECTION 02"
        id="4세대-5세대-차이"
        title="4세대와 5세대, 무엇이 달라지나요?"
        sub="핵심은 비급여 보장 방식이에요"
      >
        <P>
          2023년 기준으로 실손보험이 전체 진료비 133조원 중 14.1조원을 부담했어요.
          그런데 가입자의 <B>65%는 보험금을 한 번도 받지 못했고</B>, 상위 9%가 전체 보험금의 80%를
          차지했어요. 이 불균형을 해소하기 위해 5세대 개편이 추진됐어요.
        </P>
        <P>
          가장 큰 변화는 <B>비급여 보장을 중증과 일반으로 나누는 것</B>이에요.
          4세대까지는 도수치료·영양주사 같은 비급여도 30% 본인부담으로 보장했는데,
          5세대에서는 암·뇌혈관 같은 중증 비급여(특약1)와 도수치료 같은 일반 비급여(특약2)를 분리해서
          일반 치료의 자기부담률을 50%로 올렸어요.
        </P>
        <P>
          급여 외래 방식도 달라져요. 4세대까지는 급여 외래 자기부담이 20%로 고정이었는데,
          5세대에서는 건강보험 본인부담률과 연동돼요. 상급종합병원에서 가벼운 감기를 진료받으면
          본인부담이 최대 <B>60%</B>까지 오를 수 있어요.
        </P>
        <P>
          반면에 좋아진 점도 있어요. 지금까지 실손보험에서 전혀 보장되지 않았던
          <B>임신·출산 급여 의료비</B>가 5세대에서 처음으로 보장에 포함돼요.
          출산을 계획하고 있는 분들에게는 의미 있는 변화예요.
        </P>

        <H3>세대별 핵심 구조 비교</H3>
        <TableTitle>4세대 vs 5세대 핵심 항목 비교</TableTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                <THL>항목</THL>
                <TH>4세대</TH>
                <TH>5세대</TH>
              </tr>
            </thead>
            <tbody>
              {[
                ["급여 입원", "20% 본인부담", "20% 유지"],
                ["급여 외래", "20% 고정", "건강보험 본인부담률 연동"],
                ["비급여 중증 (특약1)", "30% 본인부담", "30% 유지 + 초과분 지원"],
                ["비급여 일반 (특약2)", "30% 본인부담", "50%로 상향"],
                ["연간 보장 한도", "5,000만원", "1,000만원"],
                ["임신·출산", "미보장", "급여 의료비 보장"],
                ["보험료", "현재 기준", "30~50% 인하"],
              ].map(([item, v4, v5], i) => (
                <tr key={i}>
                  <td style={{ padding: "9px 8px", textAlign: "left", borderBottom: "1px solid #E5E7EB", fontWeight: 600, color: "#111827", fontSize: 13 }}>{item}</td>
                  <td style={{ padding: "9px 8px", textAlign: "center", borderBottom: "1px solid #E5E7EB", color: "#374151", fontSize: 13 }}>{v4}</td>
                  <td style={{ padding: "9px 8px", textAlign: "center", borderBottom: "1px solid #E5E7EB", color: "#374151", fontSize: 13, fontWeight: [2, 3, 4, 6].includes(i) ? 600 : 400 }}>{v5}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableNote>출처: KB생각 · 뱅크샐러드 분석 (2026.02 기준)</TableNote>

        <H3>임신·출산 급여 신규 추가</H3>
        <P>
          4세대까지는 임신·출산 관련 의료비가 실손보험 보장에서 완전히 제외됐어요.
          출산 시 발생하는 급여 의료비가 상당한데도 보상받지 못했던 거예요.
          5세대에서는 이 부분이 처음으로 보장 범위에 들어와요.
        </P>
        <P>
          자연분만보다는 제왕절개·고위험 임신 등 의료 처치가 필요한 상황에서의
          급여 의료비가 주된 보장 항목이에요. 정확한 보장 범위는 출시 후 표준약관에서
          확인할 수 있어요.
        </P>

        <InlineLink
          icon="📊"
          title="4세대 5세대 차이 항목별 상세 비교"
          desc="자기부담률·보장 한도·갱신 방식 차이를 한눈에 정리했어요"
          href="/w/5세대-실손보험-4세대-차이"
        />
      </Sec>

      {/* ══════ SECTION 03 — 보험료 인하 ══════ */}
      <Divider />
      <Sec
        n="SECTION 03"
        id="보험료-인하"
        title="보험료가 얼마나 저렴해지나요?"
        sub="특약 선택에 따라 30~50% 달라져요"
      >
        <P>
          5세대 실손보험의 보험료는 4세대보다 확실히 낮아져요.
          <B>특약1(중증 비급여)만 선택</B>하면 4세대 대비 약 50% 수준으로 낮아지고,
          특약1과 특약2(일반 치료)를 모두 선택해도 약 30% 저렴해요.
        </P>
        <P>
          보험료가 낮아지는 이유는 도수치료·영양주사 같은 일반 비급여 보장이 축소되기 때문이에요.
          보험사 입장에서 지출이 줄어드는 만큼 보험료도 낮출 수 있는 구조예요.
          특약2까지 선택하면 그만큼 보험료 절감 폭이 줄어들어요.
        </P>

        <H3>특약 선택에 따른 인하 폭</H3>
        <TableTitle>특약 조합별 보험료 비교</TableTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                <THL>구분</THL>
                <TH>특약 구성</TH>
                <TH>4세대 대비</TH>
                <TH>보장 범위</TH>
              </tr>
            </thead>
            <tbody>
              {[
                ["중증 집중형", "특약1만 선택", "약 50% 인하", "암·뇌혈관·심장 비급여"],
                ["일반형", "특약1 + 특약2", "약 30% 인하", "중증 + 도수치료·영양주사"],
              ].map(([name, cov, disc, range], i) => (
                <tr key={i}>
                  <td style={{ padding: "9px 8px", textAlign: "left", borderBottom: "1px solid #E5E7EB", fontWeight: 600, color: "#111827", fontSize: 13 }}>{name}</td>
                  <td style={{ padding: "9px 8px", textAlign: "center", borderBottom: "1px solid #E5E7EB", color: "#374151", fontSize: 13 }}>{cov}</td>
                  <td style={{ padding: "9px 8px", textAlign: "center", borderBottom: "1px solid #E5E7EB", color: "#374151", fontSize: 13, fontWeight: 600 }}>{disc}</td>
                  <td style={{ padding: "9px 8px", textAlign: "center", borderBottom: "1px solid #E5E7EB", color: "#374151", fontSize: 13 }}>{range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableNote>출처: KB생각 · 뱅크샐러드 분석 (2026.02 기준). 정확한 보험료는 출시 후 각 보험사에서 안내해요.</TableNote>

        <H3>갱신 할증 체계 변화</H3>
        <P>
          5세대에서는 비급여 사용량에 따라 갱신 시 보험료가 달라지는 구조예요.
          비급여를 거의 사용하지 않으면 <B>5% 할인</B>을 받을 수 있어요.
          반면 연간 100만원 이상 비급여를 사용하면 갱신 시 보험료가 최대 <B>4배</B>까지 오를 수 있어요.
        </P>
        <P>
          구체적으로 연간 비급여 100만원 이상이면 +100%(2배), 150만원 이상이면 +200%(3배),
          300만원 이상이면 +300%(4배)로 할증돼요. 도수치료를 자주 받는 분이 5세대로 갈아타면
          갱신 주기마다 보험료 부담이 커질 수 있어요.
        </P>
        <P>
          중요한 건 지금 당장 갈아탄다고 보험료가 바로 반값이 되는 게 아니에요.
          현재 보험 갱신 주기가 남아 있으면 갱신 시점에 전환하는 게 일반적이에요.
          출시 후 내 현재 보험료와 5세대 예상 보험료를 직접 비교해보는 게 좋아요.
        </P>

        <InlineLink
          icon="🔢"
          title="보험료 인하 계산 상세"
          desc="나이대·성별 기준 예상 절감 금액 확인"
          href="/w/5세대-실손보험-보험료-비교"
        />
      </Sec>

      {/* RelatedMid — SECTION 03-04 사이 */}
      <RelatedMid
        title="5세대 실손보험 세부 주제 확인"
        items={[
          { icon: "📊", title: "4세대 5세대 차이 비교", desc: "항목별 보장 차이 한눈에", href: "/w/5세대-실손보험-4세대-차이" },
          { icon: "💰", title: "보험료 인하 계산", desc: "특약별 금액 차이 확인", href: "/w/5세대-실손보험-보험료-비교" },
          { icon: "🏥", title: "도수치료 보장 변화", desc: "특약2 변경사항 상세", href: "/w/5세대-실손보험-도수치료-제외" },
        ]}
        hubHref="/category/보험"
        hubLabel="실손보험 전체 보기"
      />

      {/* ══════ SECTION 04 — 비급여 자기부담 ══════ */}
      <Divider />
      <Sec
        n="SECTION 04"
        id="비급여-자기부담"
        title="비급여 치료를 받으면 얼마나 내나요?"
        sub="특약1과 특약2 기준이 달라요"
      >
        <P>
          5세대에서 비급여는 <B>특약1(중증)</B>과 <B>특약2(일반)</B>로 나뉘어요.
          특약1은 암·뇌혈관질환·심장질환·희귀난치성 질환 관련 비급여를 담당하고,
          특약2는 도수치료·체외충격파·영양주사 같은 일반 치료를 담당해요.
          어떤 비급여를 받느냐에 따라 자기부담률이 전혀 달라지는 구조예요.
        </P>
        <P>
          특약1에 해당하는 중증질환 비급여는 자기부담이 30%로 4세대와 같아요.
          여기에 더해 상급종합병원 입원 시 연간 <B>500만원을 초과하는 본인부담금</B>을
          추가로 지원받을 수 있어요. 중증질환 이력이 있는 분들에게 오히려 유리한 구조예요.
        </P>

        <H3>중증 비급여 특약1 보장 범위</H3>
        <P>
          특약1 해당 질환은 암·뇌혈관질환·심장질환·희귀난치성 질환이에요.
          이 질환으로 인한 비급여 치료는 30% 본인부담이 유지되고,
          입원 중 본인부담금이 연간 500만원을 넘으면 초과분도 지원돼요.
        </P>
        <P>
          특약1은 보험료 할증 대상도 아니에요. 암으로 입원해서 비급여를 많이 받아도
          다음 갱신 때 보험료가 오르지 않아요. 중증질환 이력이나 가족력이 있는 분들에게
          특약1 중심의 5세대 가입은 충분히 고려해볼 만해요.
        </P>

        <H3>일반 비급여 특약2 — 도수치료·영양주사</H3>
        <P>
          특약2에 해당하는 도수치료·체외충격파·영양주사 등은 자기부담이 30%에서 <B>50%로 올라요</B>.
          연간 보장 한도도 5,000만원에서 <B>1,000만원으로 축소</B>돼요.
          100만원짜리 도수치료를 받으면 4세대에서는 30만원, 5세대에서는 50만원을 내야 해요.
        </P>
        <P>
          도수치료를 한 달에 한 번 꾸준히 받는 분이라면 연간 추가 부담이 상당히 늘어날 수 있어요.
          갱신 할증까지 더해지면 5세대 전환 후 보험료 절감 효과가 빠르게 사라져요.
          갈아타기 전에 반드시 연간 비급여 의료비 지출을 먼저 계산해보세요.
        </P>

        <Info type="warn">{"도수치료·체외충격파를 자주 받는다면 <strong>5세대 전환 전에 반드시 연간 비용을 계산</strong>해 보세요. 비급여 자기부담 증가 + 갱신 할증까지 더해지면 총 부담이 크게 늘어날 수 있어요."}</Info>

        <BridgeCard
          q="비급여 50%가 실제로 얼마나 차이 나는지 궁금하시죠?"
          a="도수치료·영양주사 이용 빈도에 따라 연간 수십만 원 차이가 나요. 자세한 계산 방법을 정리했어요."
          label="비급여 자기부담 계산 보기"
          href="/w/5세대-실손보험-자기부담금"
        />
      </Sec>

      {/* ══════ SECTION 05 — 갈아타기 기준 ══════ */}
      <Divider />
      <Sec
        n="SECTION 05"
        id="갈아타기-기준"
        title="어떤 경우에 갈아타는 게 유리한가요?"
        sub="의료 이용 패턴이 핵심이에요"
      >
        <P>
          5세대로 갈아타는 게 유리한 분과 그렇지 않은 분이 명확하게 나뉘어요.
          핵심은 <B>도수치료·체외충격파를 얼마나 자주 받느냐</B>예요.
          보험료 절감 효과와 비급여 보장 축소 중 어느 쪽이 더 큰지를 따져봐야 해요.
        </P>
        <P>
          병원을 거의 안 가거나 특별한 비급여 치료를 받지 않는 분이라면,
          5세대로 전환해 보험료를 30~50% 낮추는 게 합리적이에요.
          암·뇌혈관 같은 중증질환 보장이 중요한 분도 특약1 중심으로 5세대를 선택하면
          더 낮은 보험료로 중증 비급여까지 커버할 수 있어요.
        </P>

        <H3>1·2세대 계약 재매입 전환</H3>
        <P>
          1·2세대 가입자는 '계약 재매입 제도'를 통해 5세대로 무심사 전환할 수 있어요.
          보험사가 기존 계약을 적정 보상금으로 해지한 뒤, 5세대에 새로 가입하는 방식이에요.
          이 제도의 보상금 기준은 5세대 출시 전에 발표될 예정이에요.
        </P>
        <P>
          1·2세대 실손보험은 보장이 좋은 대신 갱신 보험료가 크게 쌓여 있어요.
          특히 나이가 든 가입자는 매년 갱신으로 보험료가 급격히 오르는 구조라
          5세대 전환으로 인한 보험료 절감 효과가 커요.
        </P>

        <H3>현재 세대 유지가 유리한 경우</H3>
        <P>
          도수치료나 체외충격파를 월 1회 이상 꾸준히 받는 분은 현재 실손보험을 유지하는 게 나아요.
          5세대로 바꾸면 비급여 자기부담이 30%에서 50%로 올라가고,
          갱신 할증까지 더해지면 보험료 절감 효과가 금방 상쇄돼요.
        </P>
        <P>
          3세대 가입자는 4세대보다 보장이 조금 더 넓어서, 5세대 전환 시 득실 계산이 복잡해요.
          출시 후 실제 상품을 직접 비교해보고 결정하는 게 가장 안전해요.
        </P>

        <Info type="tip">{"5세대 출시 전에 가입을 고민하고 있다면 <strong>지금 4세대에 가입하는 것도 방법</strong>이에요. 4세대는 현행 최선의 선택이고, 나중에 5세대 전환 여부를 다시 판단할 수 있어요."}</Info>

        <InlineLink
          icon="🔄"
          title="갈아타기 시기 상세 가이드"
          desc="1·2·3·4세대별 전환 기준과 계약 재매입 절차 확인"
          href="/w/5세대-실손보험-갈아타기-시기"
        />
        <SpokeLink num="01" title="갈아타기 비용 · 계약 재매입" desc="세대별 보상금 손익 계산" href="/w/5세대-실손보험-갈아타기-비용" />
        <SpokeLink num="02" title="가입 조건 나이 기준" desc="5세대 신규·전환 가입 심사" href="/w/5세대-실손보험-가입-조건" />
      </Sec>

      {/* ══════ FAQ ══════ */}
      <Divider />
      <FAQAccordion items={meta.faq.map((f) => ({ q: f.q, a: f.a }))} />

      {/* ext-btn */}
      <a
        href="https://www.fss.or.kr/fss/main/main.do"
        target="_blank"
        rel="noopener noreferrer"
        className="ext-btn ext-btn-black"
      >
        <span className="ext-btn-badge">금융감독원 공식</span>
        <span className="ext-btn-text">실손보험 관련 정책 및 민원</span>
        <span className="ext-btn-cta">바로가기 →</span>
      </a>

      {/* RelatedArticles */}
      <RelatedArticles
        items={[
          { title: "4세대 5세대 차이 항목별 비교", desc: "실손보험·비교", href: "/w/5세대-실손보험-4세대-차이" },
          { title: "비급여 자기부담금 계산", desc: "실손보험·자기부담금", href: "/w/5세대-실손보험-자기부담금" },
          { title: "보험료 인하 계산 상세", desc: "실손보험·보험료", href: "/w/5세대-실손보험-보험료-비교" },
          { title: "도수치료 보장 변화", desc: "실손보험·도수치료", href: "/w/5세대-실손보험-도수치료-제외" },
          { title: "갈아타기 시기 가이드", desc: "실손보험·갈아타기", href: "/w/5세대-실손보험-갈아타기-시기" },
        ]}
      />

      {/* PrevNext */}
      <PrevNext
        prev={{ title: "고용보험료 계산 2026", href: "/w/고용보험료" }}
        next={{ title: "4세대 5세대 차이 비교", href: "/w/5세대-실손보험-4세대-차이" }}
      />
    </BlogLayout>
  );
}
