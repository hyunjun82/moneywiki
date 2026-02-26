"use client";
import React, { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
  FormulaCard, CaseBox,
} from "@/components/wiki/BlogShared";

/* ───── meta ───── */
export const meta = {
  title: "5세대 실손보험 보험료 연령별 비교 | 4세대 갱신료 인상 추이",
  description:
    "5세대 실손보험 보험료가 4세대보다 30~50% 저렴한 거 아시나요? 30대 기준 월 3만원에서 1.5만원으로 내려가요. 다만 비급여 자기부담이 50%로 올라서 병원 자주 가면 오히려 손해일 수 있어요.",
  category: "보험",
  keywords: [
    "5세대 실손보험 보험료 금액",
    "실손보험 연령별 보험료 비교",
    "4세대 5세대 보험료 손익분기",
    "5세대 실손보험 갱신 보험료 전망",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "5세대 보험료는 4세대 대비 30~50% 저렴해요 (30대 기준 월 1.5~2만원)",
    "비급여 자기부담이 50%로 올라서 연간 병원비 100만원이 손익 분기점이에요",
    "4세대 갱신 보험료는 매년 20%+ 인상 추세, 5세대는 인상폭이 작을 전망이에요",
  ],
  sources: [
    {
      name: "보험저널 실손보험 보험료 인상 추이",
      url: "https://www.insjournal.co.kr/news/articleView.html?idxno=29488",
      date: "2026-01",
    },
    {
      name: "뱅크샐러드 5세대 실손보험 비교",
      url: "https://www.banksalad.com/articles/%EB%B3%B4%ED%97%98-%EC%8B%A4%EC%86%90%EB%B3%B4%ED%97%98-5%EC%84%B8%EB%8C%80%EC%8B%A4%EC%86%90",
      date: "2025-12",
    },
    {
      name: "대한민국 정책브리핑 5세대 실손",
      url: "https://www.korea.kr/news/policyNewsView.do?newsId=148941194",
      date: "2025-12",
    },
  ],
  faq: [
    {
      q: "5세대 실손보험 보험료가 왜 이렇게 저렴한가요?",
      a: "비급여 보장을 70%에서 50%로 줄이고, 도수치료·체외충격파 같은 비중증 항목을 제외해서 보험사가 지급할 보험금이 줄었기 때문이에요. 보장을 줄인 만큼 보험료도 낮아진 구조예요.",
    },
    {
      q: "5세대로 갈아타면 보험료가 계속 저렴하게 유지되나요?",
      a: "갱신 시마다 오를 수 있어요. 하지만 4세대보다 손해율이 낮아서 인상폭은 상대적으로 작을 것으로 보여요. 4세대가 매년 20% 넘게 오르는 반면, 5세대는 한 자릿수 인상이 예상돼요.",
    },
  ],
  ctaCard: {
    label: "30초 계산",
    mainText: "나는 전환하면 얼마나 아낄까?",
    subText: "나이·보험료만 선택하면 바로 계산",
    url: "#checker",
    external: false,
  },
  relatedDocs: [
    { title: "5세대 실손보험 4세대 차이", url: "/w/5세대-실손보험-4세대-차이" },
    { title: "5세대 실손보험 자기부담금", url: "/w/5세대-실손보험-자기부담금" },
    { title: "5세대 실손보험 갈아타기 시기", url: "/w/5세대-실손보험-갈아타기-시기" },
    { title: "5세대 실손보험 갱신", url: "/w/5세대-실손보험-갱신" },
    { title: "5세대 실손보험 가입 조건", url: "/w/5세대-실손보험-가입-조건" },
  ],
};

/* ───── checker ───── */
type Ans = Record<string, string>;
type ResLink = { icon: string; title: string; desc: string; href: string };

function getResult(a: Ans): React.ReactNode | null {
  if (!a.age || !a.currentPremium || !a.hospitalFreq || !a.concern) return null;

  const ageLabel = a.age === "20s" ? "20대" : a.age === "30s" ? "30대" : a.age === "40s" ? "40대" : "50대";
  const savingMap: Record<string, string> = { "20s": "약 1만원", "30s": "약 1~1.5만원", "40s": "약 1.5~2만원", "50s": "약 2만원" };

  if (a.hospitalFreq === "frequent") {
    const links: ResLink[] = [
      { icon: "🔢", title: "자기부담금 계산 상세", desc: "내 치료비 기준 부담 금액 비교", href: "/w/5세대-실손보험-자기부담금" },
      { icon: "📊", title: "4세대 5세대 보장 차이", desc: "보장 범위 상세 비교표", href: "/w/5세대-실손보험-4세대-차이" },
    ];
    return (
      <ResultFail title={`${ageLabel} 기준, 전환 시 손해가 날 수 있어요`} desc={`월 보험료는 ${savingMap[a.age]} 절약되지만, 비급여 자기부담이 50%로 올라서 병원을 자주 가면 절약분보다 부담 증가분이 더 클 수 있어요.`}>
        <ResultGrid items={[
          { icon: "💸", name: "보험료 절감", pass: true, desc: `월 ${savingMap[a.age]} 절약` },
          { icon: "🏥", name: "비급여 부담", pass: false, desc: "30%→50% 상승" },
          { icon: "📈", name: "손익 분기", pass: false, desc: "연 치료비 100만원 이상 시 손해" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultFail>
    );
  }

  if (a.currentPremium === "high") {
    const links: ResLink[] = [
      { icon: "🔄", title: "갈아타기 시기 판단", desc: "전환 최적 타이밍 확인", href: "/w/5세대-실손보험-갈아타기-시기" },
      { icon: "📋", title: "가입 조건 확인", desc: "나이·건강 심사 기준", href: "/w/5세대-실손보험-가입-조건" },
    ];
    return (
      <ResultPass title={`${ageLabel} 기준, 전환이 유리해요`} desc={`월 보험료 ${savingMap[a.age]} 절약 + 연간으로 환산하면 상당한 금액이에요. 병원을 자주 안 가면 보험료 절감 효과가 커요.`}>
        <ResultGrid items={[
          { icon: "💸", name: "보험료 절감", pass: true, desc: `월 ${savingMap[a.age]} 절약` },
          { icon: "🏥", name: "비급여 부담", pass: false, desc: "30%→50% 상승" },
          { icon: "🫀", name: "중증 보장", pass: true, desc: "한도 500만원 신설" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  const links: ResLink[] = [
    { icon: "📊", title: "4세대 5세대 보장 차이", desc: "보장 범위 상세 비교표", href: "/w/5세대-실손보험-4세대-차이" },
    { icon: "🔄", title: "갈아타기 비용·절차", desc: "계약 재매입 방법 확인", href: "/w/5세대-실손보험-갈아타기-비용" },
  ];
  return (
    <ResultPass title={`${ageLabel} 기준, 전환을 검토해 볼 만해요`} desc={`월 보험료 ${savingMap[a.age]} 절약이 예상돼요. 비급여 부담은 늘지만 보험료 절감 효과가 더 클 가능성이 높아요.`}>
      <ResultGrid items={[
        { icon: "💸", name: "보험료", pass: true, desc: `월 ${savingMap[a.age]} 절약 전망` },
        { icon: "🏥", name: "비급여", pass: false, desc: "자기부담 50% 상승" },
        { icon: "🫀", name: "중증", pass: true, desc: "한도 500만원 신설" },
      ]} />
      {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
    </ResultPass>
  );
}

/* ───── component ───── */
export default function Article94() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "보험", "실손보험", "보험료 비교"]}
      tags={["2026년 최신", "보험", "실손보험"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>5세대 실손보험 보험료는 4세대 대비 <B>30~50%</B> 저렴해요. 30대 기준 월 3만원에서 <B>1.5~2만원</B>으로 내려가요. 다만 비급여 자기부담이 50%로 올라서 병원 이용 패턴에 따라 유불리가 달라져요.</>}
      sourceBar={{ badge: "보험저널", name: "보험저널·뱅크샐러드", date: "2026.01" }}
      stickyLabel="보험료 절감"
      stickyValue="30~50% 저렴"
      stickyBtn="내 절감액 확인"
      disclaimer="이 글은 보험저널·정책브리핑 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "🛡️", title: "5세대 실손보험 허브", sub: "보장·보험료·갈아타기 전체 정리", href: "/w/5세대-실손보험", hot: true },
          { icon: "💰", title: "내 숨은 환급금 찾기", sub: "평균 13만원 환급", href: "/w/환급금-찾기" },
          { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
        ]} />
        <SidebarDocs items={[
          { title: "5세대 실손보험 4세대 차이", cat: "보험·실손", href: "/w/5세대-실손보험-4세대-차이" },
          { title: "5세대 실손보험 자기부담금", cat: "보험·실손", href: "/w/5세대-실손보험-자기부담금" },
          { title: "5세대 실손보험 갱신", cat: "보험·실손", href: "/w/5세대-실손보험-갱신" },
          { title: "5세대 실손보험 갈아타기 비용", cat: "보험·실손", href: "/w/5세대-실손보험-갈아타기-비용" },
          { title: "5세대 실손보험 가입 조건", cat: "보험·실손", href: "/w/5세대-실손보험-가입-조건" },
        ]} />
        <SidebarCalc items={[
          { title: "실업급여 계산기", href: "/w/실업급여-계산기" },
          { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
          { title: "연말정산 계산기", href: "/w/연말정산-계산기" },
          { title: "양도소득세 계산기", href: "/w/양도소득세-계산기" },
          { title: "대출이자 계산기", href: "/w/대출이자-계산기" },
        ]} />
      </>}
    >
      <TOC items={[
        { t: "전환하면 얼마나 아낄 수 있을까?", sub: "연령별 절감 · 병원 이용 빈도 · 보험료 부담" },
        { t: "보험료 금액이 실제로 얼마나 줄어드나요?", sub: "30~50% 절감 구조 · 보장 축소 원리 · 월 보험료 비교" },
        { t: "연령별 보험료 차이는 얼마나 나나요?", sub: "20대 월 1만원 · 50대 월 4만원 · 연령별 비교표" },
        { t: "4세대 5세대 보험료 손익분기점은 얼마인가요?", sub: "연간 치료비 75~100만원 · 시나리오별 계산" },
        { t: "갱신 보험료는 앞으로 얼마나 오르나요?", sub: "4세대 20%+ 인상 · 5세대 한 자릿수 전망" },
        { t: "자주 묻는 질문", sub: "보험료 저렴 이유 · 갱신 유지 여부" },
      ]} />

      <Summary3 items={meta.summary} />

      {/* ───── STEP 01: 체커 ───── */}
      <Sec n="STEP 01" id="checker" title="전환하면 얼마나 아낄 수 있을까?" sub="연령별 절감 · 병원 이용 빈도 · 보험료 부담">
        <CheckerShell title="나는 전환하면 얼마나 아낄까?" sub="30초 계산" desc="나이와 병원 이용 패턴만 선택하면 바로 계산돼요.">
          <CheckerQ n="1" label="현재 나이대가 어떻게 되세요?" group="age"
            opts={[["20s","20대"],["30s","30대"],["40s","40대"],["50s","50대 이상"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="2" label="현재 보험료 부담이 어떤가요?" group="currentPremium"
            opts={[["high","많이 부담돼요"],["moderate","적당해요"],["low","잘 모르겠어요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="3" label="병원을 얼마나 자주 가세요?" group="hospitalFreq"
            opts={[["frequent","월 1회 이상"],["sometimes","분기 1~2회"],["rarely","거의 안 가요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="4" label="가장 중요하게 생각하는 건?" group="concern"
            opts={[["premium","보험료 절감"],["coverage","보장 범위"],["severe","중증 대비"]]}
            sel={ans} pick={pick} />
          {result}
        </CheckerShell>
      </Sec>

      <BridgeCard
        q="보험료가 저렴해진 이유가 궁금하시죠?"
        a="비급여 보장을 줄이고 도수치료를 제외한 대신, 보험사 지급 보험금이 줄어서 보험료가 내려간 구조예요."
        label="구조 이해"
        href="/w/5세대-실손보험-4세대-차이"
      />

      <Divider />

      {/* ───── SECTION 02: 보험료 실제 금액 ───── */}
      <Sec n="SECTION 02" id="premium-amount" title="보험료 금액이 실제로 얼마나 줄어드나요?" sub="30~50% 절감 구조 · 보장 축소 원리 · 월 보험료 비교">
        <P>5세대 실손보험 보험료는 4세대보다 <B>30~50%</B> 저렴해요. <A href="https://www.banksalad.com/articles/%EB%B3%B4%ED%97%98-%EC%8B%A4%EC%86%90%EB%B3%B4%ED%97%98-5%EC%84%B8%EB%8C%80%EC%8B%A4%EC%86%90">뱅크샐러드</A>에 따르면, 30대 남성 기준 4세대는 월 약 3만원인데 5세대는 1.5~2만원 수준이에요. 연간으로 환산하면 12~18만원을 아낄 수 있는 금액이에요.</P>
        <P>보험료가 저렴해진 이유는 단순해요. 비급여 보장을 70%에서 50%로 줄이고, 도수치료·체외충격파 같은 고비용 항목을 제외해서 보험사가 내야 할 보험금 자체가 줄었기 때문이에요. 보장이 줄어든 만큼 보험료도 내려간 거죠.</P>
        <P>다만 보험료가 저렴하다고 무조건 유리한 건 아니에요. 비급여 치료를 많이 받으면 자기부담금이 늘어서, 절약한 보험료보다 더 많은 치료비를 쓸 수 있어요. 내 병원 이용 패턴을 먼저 파악하는 게 중요해요.</P>

        <FormulaCard
          formula="월 절감액 = 4세대 보험료 − 5세대 보험료"
          notes={[
            "30대 기준: 약 30,000 − 약 17,500 = 월 12,500원 절약",
            "연간 절감: 약 15만원",
            "비급여 자기부담 20% 증가분 상쇄 여부가 핵심",
          ]}
        />

        <InlineLink icon="📊" title="4세대 5세대 보장 차이 상세" desc="비급여 보장률·한도 비교표" href="/w/5세대-실손보험-4세대-차이" />
      </Sec>

      <Divider />

      {/* ───── SECTION 03: 연령별 비교 ───── */}
      <Sec n="SECTION 03" id="age-comparison" title="연령별 보험료 차이는 얼마나 나나요?" sub="20대 월 1만원 · 50대 월 4만원 · 연령별 비교표">
        <P>나이가 많을수록 보험료 차이가 더 커져요. 20대는 원래 보험료 자체가 낮아서 절감 효과가 크지 않지만, 50대는 4세대 월 6만원에서 5세대 4만원으로 월 <B>2만원</B>을 아낄 수 있어요. 연간 24만원이에요.</P>
        <P>이건 나이가 많을수록 4세대 보험료 인상폭이 가파르기 때문이에요. <A href="https://www.insjournal.co.kr/news/articleView.html?idxno=29488">보험저널</A>에 따르면 2026년 4세대 보험료는 전 연령대에서 평균 20% 이상 인상됐어요. 특히 50대 이상은 갱신 때마다 30% 넘게 오르는 경우도 있어요.</P>
        <P>반면 5세대는 출시 초기부터 낮은 보험료로 시작하고, 손해율도 낮아서 인상폭이 상대적으로 작을 것으로 예상돼요. 장기적으로 보면 나이 많은 가입자일수록 5세대 전환의 보험료 절감 효과가 커요.</P>

        <TableTitle>연령별 월 보험료 비교 (예상치)</TableTitle>
        <table><thead><tr><THL>연령대</THL><TH>4세대 월 보험료</TH><TH>5세대 월 보험료</TH><TH>월 절감액</TH></tr></thead><tbody>
          {[
            ["20대", "약 2만원", "약 1만원", "약 1만원"],
            ["30대", "약 3만원", "약 1.5~2만원", "약 1~1.5만원"],
            ["40대", "약 4.5만원", "약 2.5~3만원", "약 1.5~2만원"],
            ["50대", "약 6만원", "약 4~5만원", "약 1~2만원"],
          ].map((r, i) => <tr key={i}><THL>{r[0]}</THL><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>)}
        </tbody></table>
        <TableNote>*뱅크샐러드·보험저널 추정 (확정 보험료는 출시 후 변동 가능)</TableNote>

        <CaseBox
          badge="예시 1"
          label="30대 직장인 A씨, 도수치료 안 받음"
          conditions={["현재 4세대: 월 30,000원", "5세대 전환 시: 월 17,500원"]}
          steps={[
            { label: "월 절감액", value: "12,500원" },
            { label: "연간 절감", value: "약 150,000원" },
            { label: "비급여 치료비 연간 0원", value: "추가 부담 없음" },
          ]}
          total="연간 약 15만원 순이익"
          result="전환 유리"
          pass={true}
        />

        <InlineLink icon="💰" title="자기부담금 상세 계산" desc="내 치료비 기준 부담 금액 비교" href="/w/5세대-실손보험-자기부담금" />
      </Sec>

      <RelatedMid
        title="다른 실손보험 정보도 살펴보세요"
        items={[
          { icon: "⚖️", title: "4세대 5세대 보장 차이", desc: "비급여 보장률·한도 비교", href: "/w/5세대-실손보험-4세대-차이" },
          { icon: "🔄", title: "갈아타기 시기 판단", desc: "전환 최적 타이밍", href: "/w/5세대-실손보험-갈아타기-시기" },
          { icon: "📋", title: "가입 조건 나이 기준", desc: "5세대 가입 심사 기준", href: "/w/5세대-실손보험-가입-조건" },
        ]}
        hubHref="/category/보험"
        hubLabel="실손보험 전체 보기"
      />

      <Divider />

      {/* ───── SECTION 04: 손익분기 ───── */}
      <Sec n="SECTION 04" id="breakeven" title="4세대 5세대 보험료 손익분기점은 얼마인가요?" sub="연간 치료비 75~100만원 · 시나리오별 계산">
        <P>핵심은 '연간 비급여 치료비가 얼마냐'예요. 비급여 자기부담이 30%에서 50%로 올랐기 때문에, 치료비가 많을수록 5세대가 불리해져요. 보험료 절감분과 부담 증가분이 같아지는 지점이 손익 분기점이에요.</P>
        <P>30대 기준으로 계산해 볼게요. 연간 보험료 절감분이 약 15만원이에요. 비급여 자기부담이 20%p 올랐으니, 비급여 치료비가 연간 75만원일 때 추가 부담이 15만원(75만×20%)으로 절감분과 같아져요. 즉 <B>연간 비급여 치료비 약 75~100만원</B>이 분기점이에요.</P>
        <P>치료비가 이보다 적으면 5세대가 이득이고, 많으면 4세대가 유리해요. 도수치료를 정기적으로 받는 분이라면 연간 300~400만원인데, 5세대에서는 이 금액 전액이 자기 부담이니까 전환이 크게 불리해요.</P>

        <CaseBox
          badge="예시 2"
          label="40대 B씨, 연간 비급여 치료비 200만원"
          conditions={["현재 4세대: 본인 부담 60만원 (30%)", "5세대 전환 시: 본인 부담 100만원 (50%)"]}
          steps={[
            { label: "4세대 본인 부담", value: "200만 × 30% = 60만원" },
            { label: "5세대 본인 부담", value: "200만 × 50% = 100만원" },
            { label: "부담 증가분", value: "40만원" },
            { label: "보험료 절감분 (연)", value: "약 18~24만원" },
          ]}
          total="연간 약 16~22만원 순손실"
          result="4세대 유지가 유리"
          pass={false}
        />

        <BridgeCard
          q="내 치료비 기준으로 정확히 얼마나 차이 나는지 궁금하시죠?"
          a="자기부담금 상세 페이지에서 항목별 부담 금액을 계산해 볼 수 있어요."
          label="상세 계산"
          href="/w/5세대-실손보험-자기부담금"
        />
      </Sec>

      <Divider />

      {/* ───── SECTION 05: 갱신 보험료 전망 ───── */}
      <Sec n="SECTION 05" id="renewal-outlook" title="갱신 보험료는 앞으로 얼마나 오르나요?" sub="4세대 20%+ 인상 · 5세대 한 자릿수 전망">
        <P>4세대 갱신 보험료는 매년 큰 폭으로 오르고 있어요. <A href="https://www.insjournal.co.kr/news/articleView.html?idxno=29488">보험저널</A>에 따르면 2026년 4세대 보험료는 전년 대비 <B>평균 20% 이상</B> 인상됐어요. 도수치료·체외충격파 청구가 많아서 보험사 손해율이 높기 때문이에요.</P>
        <P>5세대는 이 문제를 구조적으로 해결했어요. 고비용 비중증 항목을 제외하고, 비급여 보장률을 낮춰서 출발부터 손해율이 낮아요. 그래서 갱신 시 인상폭도 4세대보다 상대적으로 작을 것으로 보험업계는 예상해요.</P>
        <P>다만 5세대가 아직 출시 전이라 실제 갱신 인상률은 확정되지 않았어요. 출시 후 1~2년의 실적 데이터가 쌓여야 정확한 갱신 추이를 알 수 있어요. 하지만 구조적으로 4세대보다 안정적인 보험료를 유지할 가능성이 높다는 게 업계 중론이에요.</P>

        <Info type="warn">{"5세대 전환 후에는 다시 4세대로 <strong>돌아갈 수 없어요</strong>. 장기적인 보험료 추이와 내 건강 상태를 종합적으로 고려해서 결정하세요."}</Info>

        <H3>장기 보험료 추이 전망</H3>
        <P>4세대는 매년 15~30% 인상이 계속될 전망이에요. 가입자가 줄고 남은 가입자의 손해율이 올라가는 악순환 구조예요. 5세대는 한 자릿수 인상(5~10%)이 예상되지만, 첫 갱신은 출시 1년 후인 2027년 4월 이후에 확인할 수 있어요.</P>

        <CaseBox
          badge="예시 3"
          label="50대 C씨, 4세대 유지 vs 5세대 전환 3년 누적"
          conditions={["현재 4세대: 월 60,000원 (매년 20% 인상 가정)", "5세대 전환 시: 월 40,000원 (매년 7% 인상 가정)"]}
          steps={[
            { label: "4세대 3년 누적 보험료", value: "약 259만원" },
            { label: "5세대 3년 누적 보험료", value: "약 154만원" },
            { label: "3년 누적 절감액", value: "약 105만원" },
          ]}
          total="3년 기준 약 105만원 절약"
          result="장기적으로 전환 유리"
          pass={true}
        />

        <SpokeLink num="01" title="갱신 시 주의사항 상세" desc="갱신 시기·보험료 변동 기준" href="/w/5세대-실손보험-갱신" />
        <SpokeLink num="02" title="갈아타기 비용·절차" desc="계약 재매입 후 전환 방법" href="/w/5세대-실손보험-갈아타기-비용" />

        <ExtBtn badge="금융위원회" text="실손보험 보험료 정책 확인" cta="확인하기 →" href="https://www.fsc.go.kr" />
      </Sec>

      <Divider />

      {/* ───── FAQ ───── */}
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" sub="보험료 저렴 이유 · 갱신 유지 여부">
        <FAQAccordion items={meta.faq} />
      </Sec>

      <RelatedArticles items={[
        { title: "5세대 실손보험 4세대 차이", desc: "보장 범위 상세 비교표", href: "/w/5세대-실손보험-4세대-차이" },
        { title: "5세대 실손보험 자기부담금", desc: "내 치료비 기준 부담 금액", href: "/w/5세대-실손보험-자기부담금" },
        { title: "5세대 실손보험 갈아타기 시기", desc: "전환 최적 타이밍 판단", href: "/w/5세대-실손보험-갈아타기-시기" },
        { title: "5세대 실손보험 갱신", desc: "갱신 시기·보험료 변동", href: "/w/5세대-실손보험-갱신" },
        { title: "5세대 실손보험 가입 조건", desc: "나이·건강 심사 기준", href: "/w/5세대-실손보험-가입-조건" },
      ]} />
      <PrevNext
        prev={{ title: "5세대 실손보험 4세대 보장 차이", href: "/w/5세대-실손보험-4세대-차이" }}
        next={{ title: "5세대 실손보험 청구 방법", href: "/w/5세대-실손보험-청구-방법" }}
      />
    </BlogLayout>
  );
}
