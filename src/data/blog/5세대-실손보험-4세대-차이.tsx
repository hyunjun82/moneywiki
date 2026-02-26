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
  title: "5세대 실손보험 4세대 보장 차이 | 비급여 도수치료 제외 항목",
  description:
    "5세대 실손보험이 4세대랑 뭐가 다른지 궁금하시죠? 비급여 보장이 70%에서 50%로 줄고, 도수치료·체외충격파는 아예 빠져요. 대신 중증 질환 자기부담 한도 500만원이 새로 생겨서 큰 병에는 오히려 유리해요.",
  category: "보험",
  keywords: [
    "5세대 4세대 실손보험 보장 차이",
    "실손보험 비급여 보장 축소 항목",
    "실손보험 도수치료 제외 보장범위",
    "5세대 실손보험 중증 보장 강화",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "비급여 보장이 70%에서 50%로 축소되고, 연간 한도가 5,000만원→1,000만원으로 줄어요",
    "도수치료·체외충격파·비급여 주사제는 보장 대상에서 완전히 제외돼요",
    "중증 질환(암·뇌·심장) 입원 시 연간 자기부담 한도 500만원이 새로 생겼어요",
  ],
  sources: [
    {
      name: "5세대 실손보험 주요 내용",
      url: "https://www.korea.kr/news/policyNewsView.do?newsId=148941194",
      date: "2025-12",
    },
    {
      name: "경향신문 5세대 실손 도수치료 제외",
      url: "https://www.khan.co.kr/article/202504020600091",
      date: "2025-04",
    },
    {
      name: "뱅크샐러드 5세대 실손보험 비교",
      url: "https://www.banksalad.com/articles/%EB%B3%B4%ED%97%98-%EC%8B%A4%EC%86%90%EB%B3%B4%ED%97%98-5%EC%84%B8%EB%8C%80%EC%8B%A4%EC%86%90",
      date: "2025-12",
    },
  ],
  faq: [
    {
      q: "5세대 실손보험이 4세대보다 좋은 점도 있나요?",
      a: "중증 질환 보장이 강화됐어요. 암·뇌혈관·심장질환으로 상급종합병원이나 종합병원에 입원하면 연간 자기부담 한도가 500만원으로 제한돼서 큰 병에는 오히려 유리해요.",
    },
    {
      q: "5세대 실손보험으로 전환하면 보험료가 얼마나 내려가나요?",
      a: "4세대 대비 30~50% 저렴해질 전망이에요. 비급여 보장이 줄어드는 대신 보험료 부담이 낮아지는 구조라서, 도수치료를 거의 안 받는 분이라면 전환이 유리해요.",
    },
  ],
  ctaCard: {
    label: "30초 비교",
    mainText: "4세대 vs 5세대, 나는 뭐가 유리할까?",
    subText: "4가지만 선택하면 바로 판단해 드려요",
    url: "#checker",
    external: false,
  },
  relatedDocs: [
    { title: "5세대 실손보험 보험료 비교", url: "/w/5세대-실손보험-보험료-비교" },
    { title: "5세대 실손보험 자기부담금", url: "/w/5세대-실손보험-자기부담금" },
    { title: "5세대 실손보험 갈아타기 시기", url: "/w/5세대-실손보험-갈아타기-시기" },
    { title: "5세대 실손보험 보장 내용", url: "/w/5세대-실손보험-보장-내용" },
    { title: "5세대 실손보험 가입 조건", url: "/w/5세대-실손보험-가입-조건" },
  ],
};

/* ───── checker ───── */
type Ans = Record<string, string>;
type ResLink = { icon: string; title: string; desc: string; href: string };

function getResult(a: Ans): React.ReactNode | null {
  if (!a.generation || !a.doseTherapy || !a.premiumBurden || !a.healthRisk) return null;

  if (a.doseTherapy === "frequent") {
    const links: ResLink[] = [
      { icon: "📊", title: "도수치료 제외 상세", desc: "빠지는 항목과 대안 확인", href: "/w/5세대-실손보험-도수치료-제외" },
      { icon: "💰", title: "보험료 비교", desc: "세대별 보험료 차이 금액", href: "/w/5세대-실손보험-보험료-비교" },
    ];
    return (
      <ResultFail title="4세대 유지가 유리할 수 있어요" desc="도수치료를 자주 받으시면 5세대 전환 시 본인 부담이 크게 늘어요. 4세대는 연 350만원까지 보장하지만, 5세대는 아예 제외돼요.">
        <ResultGrid items={[
          { icon: "🏥", name: "도수치료", pass: false, desc: "5세대 보장 제외" },
          { icon: "💉", name: "비급여 주사", pass: false, desc: "5세대 보장 제외" },
          { icon: "💸", name: "보험료", pass: true, desc: "5세대가 30~50% 저렴" },
          { icon: "🫀", name: "중증 보장", pass: true, desc: "한도 500만원 신설" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultFail>
    );
  }

  if (a.generation === "gen12") {
    const links: ResLink[] = [
      { icon: "🔄", title: "갈아타기 비용·절차", desc: "계약 재매입 후 전환 방법", href: "/w/5세대-실손보험-갈아타기-비용" },
      { icon: "📋", title: "가입 조건 확인", desc: "나이·건강 심사 기준", href: "/w/5세대-실손보험-가입-조건" },
    ];
    return (
      <ResultPass title="5세대 전환을 적극 검토해 보세요" desc="1·2세대는 보험료가 매우 높은데, 보험사 계약 재매입 프로그램을 통해 무심사로 5세대로 전환할 수 있어요.">
        <ResultGrid items={[
          { icon: "💸", name: "보험료 절감", pass: true, desc: "현재 대비 50%+ 절약 가능" },
          { icon: "🫀", name: "중증 보장", pass: true, desc: "한도 500만원 신설" },
          { icon: "🏥", name: "비급여 보장", pass: false, desc: "70%→50% 축소" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  if (a.premiumBurden === "high" && a.doseTherapy !== "frequent") {
    const links: ResLink[] = [
      { icon: "💰", title: "보험료 비교 상세", desc: "연령별 보험료 차이 확인", href: "/w/5세대-실손보험-보험료-비교" },
      { icon: "🔄", title: "갈아타기 시기 판단", desc: "전환 최적 타이밍 확인", href: "/w/5세대-실손보험-갈아타기-시기" },
    ];
    return (
      <ResultPass title="5세대 전환이 유리해요" desc="도수치료를 거의 안 받고 보험료 부담이 크다면, 5세대로 전환하면 보험료를 30~50% 아낄 수 있어요. 비급여 보장은 줄지만 중증 보장은 강화돼요.">
        <ResultGrid items={[
          { icon: "💸", name: "보험료", pass: true, desc: "30~50% 절약" },
          { icon: "🫀", name: "중증 보장", pass: true, desc: "한도 500만원 신설" },
          { icon: "🏥", name: "비급여 보장", pass: false, desc: "70%→50% 축소" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  const links: ResLink[] = [
    { icon: "📊", title: "자기부담금 계산", desc: "내 치료비 기준 부담 금액 확인", href: "/w/5세대-실손보험-자기부담금" },
    { icon: "📋", title: "보장 내용 상세", desc: "5세대 보장 항목 전체 확인", href: "/w/5세대-실손보험-보장-내용" },
  ];
  return (
    <ResultPass title="5세대 전환을 검토해 볼 만해요" desc="보험료 절감 효과가 있지만, 비급여 보장 축소도 감안해야 해요. 내 병원 이용 패턴에 따라 유불리가 달라져요.">
      <ResultGrid items={[
        { icon: "💸", name: "보험료", pass: true, desc: "30~50% 절약 전망" },
        { icon: "🏥", name: "비급여", pass: false, desc: "자기부담 50%로 상승" },
        { icon: "🫀", name: "중증", pass: true, desc: "한도 500만원 신설" },
      ]} />
      {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
    </ResultPass>
  );
}

/* ───── component ───── */
export default function Article93() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "보험", "실손보험", "4세대 5세대 차이"]}
      tags={["2026년 최신", "보험", "실손보험"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>5세대 실손보험은 비급여 보장을 줄이는 대신 <B>보험료를 30~50%</B> 낮추고, <B>중증 질환 자기부담 한도 500만원</B>을 새로 만들었어요. 도수치료는 완전 제외됐고요.</>}
      sourceBar={{ badge: "정책브리핑", name: "대한민국 정책브리핑", date: "2025.12" }}
      stickyLabel="핵심 차이"
      stickyValue="비급여 70%→50%"
      stickyBtn="내 유불리 확인"
      disclaimer="이 글은 금융위원회·정책브리핑 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "🛡️", title: "5세대 실손보험 허브", sub: "보장·보험료·갈아타기 전체 정리", href: "/w/5세대-실손보험", hot: true },
          { icon: "💰", title: "내 숨은 환급금 찾기", sub: "평균 13만원 환급", href: "/w/환급금-찾기" },
          { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
        ]} />
        <SidebarDocs items={[
          { title: "5세대 실손보험 보험료 비교", cat: "보험·실손", href: "/w/5세대-실손보험-보험료-비교" },
          { title: "5세대 실손보험 도수치료 제외", cat: "보험·실손", href: "/w/5세대-실손보험-도수치료-제외" },
          { title: "5세대 실손보험 자기부담금", cat: "보험·실손", href: "/w/5세대-실손보험-자기부담금" },
          { title: "5세대 실손보험 갈아타기 시기", cat: "보험·실손", href: "/w/5세대-실손보험-갈아타기-시기" },
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
        { t: "내 실손보험, 전환이 유리할까?", sub: "세대별 유불리 · 도수치료 빈도 · 보험료 부담" },
        { t: "보장 범위가 어떻게 달라지나요?", sub: "4세대 vs 5세대 비교표 · 급여·비급여 구분 · 보장 한도" },
        { t: "비급여 보장은 얼마나 줄어드나요?", sub: "비중증 자기부담 50% · 연간 한도 1,000만원 · 통원 공제금액" },
        { t: "도수치료가 완전히 빠진 건 맞나요?", sub: "제외 항목 3가지 · 관리급여 전환 전망 · 4세대 유지 기준" },
        { t: "중증 질환 보장은 오히려 좋아졌나요?", sub: "자기부담 한도 500만원 · 상급종합병원 입원 · 갈아타기 판단" },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={meta.summary} />

      {/* ───── STEP 01: 체커 ───── */}
      <Sec n="STEP 01" id="checker" title="내 실손보험, 전환이 유리할까?" sub="세대별 유불리 · 도수치료 빈도 · 보험료 부담">
        <CheckerShell title="4세대 vs 5세대, 나에게 뭐가 유리할까?" sub="30초 비교">
          <CheckerQ n="1" label="현재 가입하신 실손보험 세대는?" group="generation"
            opts={[["gen12","1·2세대"],["gen3","3세대"],["gen4","4세대"],["none","미가입·모르겠어요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="2" label="도수치료·체외충격파를 얼마나 받으세요?" group="doseTherapy"
            opts={[["frequent","월 1회 이상"],["sometimes","연 몇 회"],["rarely","거의 안 받아요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="3" label="현재 보험료 부담이 어떤가요?" group="premiumBurden"
            opts={[["high","부담돼요"],["ok","적당해요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="4" label="중증 질환(암·뇌·심장) 걱정이 되시나요?" group="healthRisk"
            opts={[["worried","걱정돼요"],["normal","보통이에요"]]}
            sel={ans} pick={pick} />
          {result}
        </CheckerShell>
      </Sec>

      <BridgeCard
        q="아직 5세대가 정확히 뭔지 감이 안 잡히시죠?"
        a="비급여 보장을 줄이는 대신 보험료를 확 낮추고, 중증 보장은 오히려 강화한 구조예요."
        label="핵심 요약"
        href="/w/5세대-실손보험"
      />

      <Divider />

      {/* ───── SECTION 02: 보장 범위 차이 ───── */}
      <Sec n="SECTION 02" id="coverage-diff" title="보장 범위가 어떻게 달라지나요?" sub="4세대 vs 5세대 비교표 · 급여·비급여 구분 · 보장 한도">
        <P>가장 큰 차이는 비급여 항목의 자기부담률이에요. 4세대는 비급여 치료비의 <B>70%</B>를 보장했는데, 5세대는 <B>50%</B>만 보장해요. 비급여 100만원이 나오면 4세대는 본인 30만원, 5세대는 50만원을 내야 하는 거죠.</P>
        <P><A href="https://www.korea.kr/news/policyNewsView.do?newsId=148941194">대한민국 정책브리핑</A>에 따르면, 5세대는 비급여를 '중증'과 '비중증'으로 구분해요. 암·뇌혈관·심장질환 같은 중증은 현행 보장 수준을 유지하고, 나머지 비중증만 축소하는 구조예요. 급여 항목은 4세대와 마찬가지로 본인부담금의 80%를 보장해요.</P>
        <P>보장 한도도 달라졌어요. 4세대는 연간 비급여 보장 한도가 <B>5,000만원</B>이었는데, 5세대는 <B>1,000만원</B>으로 대폭 줄었어요. 대부분의 사람에게는 1,000만원이면 충분하지만, 장기 입원이나 고가 치료를 받는 경우에는 차이가 날 수 있어요.</P>

        <TableTitle>4세대 vs 5세대 핵심 비교</TableTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead><tr><THL>구분</THL><TH>4세대</TH><TH>5세대</TH></tr></thead>
            <tbody>
              {[
                ["비급여 보장률 (비중증)", "70%", "50%"],
                ["비급여 보장률 (중증)", "70%", "70% (유지)"],
                ["비급여 연간 한도", "5,000만원", "1,000만원"],
                ["중증 자기부담 한도", "없음", "연간 500만원"],
                ["도수치료·체외충격파", "연 350만원 보장", "보장 제외"],
                ["보험료 수준", "높음", "30~50% 저렴"],
              ].map(([item, gen4, gen5], i) => (
                <tr key={i}>
                  <td style={{ padding: "9px 8px", textAlign: "left", borderBottom: "1px solid #E5E7EB", fontWeight: 600, color: "#111827", fontSize: 13 }}>{item}</td>
                  <td style={{ padding: "9px 8px", textAlign: "center", borderBottom: "1px solid #E5E7EB", color: "#374151", fontSize: 13 }}>{gen4}</td>
                  <td style={{ padding: "9px 8px", textAlign: "center", borderBottom: "1px solid #E5E7EB", color: "#374151", fontSize: 13 }}>{gen5}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableNote>*정책브리핑·뱅크샐러드 기준 (2025.12)</TableNote>

        <InlineLink icon="💰" title="보험료 차이 상세 비교" desc="연령별 보험료 금액 비교표" href="/w/5세대-실손보험-보험료-비교" />
      </Sec>

      <Divider />

      {/* ───── SECTION 03: 비급여 보장 축소 ───── */}
      <Sec n="SECTION 03" id="non-covered-reduction" title="비급여 보장은 얼마나 줄어드나요?" sub="비중증 자기부담 50% · 연간 한도 1,000만원 · 통원 공제금액">
        <P>비급여 보장 축소의 핵심은 '비중증' 항목이에요. 5세대에서 비중증 비급여란 도수치료·체외충격파를 제외한 일반적인 비급여 치료를 말해요. 예를 들어 MRI·초음파·특수 검사비 같은 것들이 여기에 해당해요.</P>
        <P><A href="https://www.banksalad.com/articles/%EB%B3%B4%ED%97%98-%EC%8B%A4%EC%86%90%EB%B3%B4%ED%97%98-5%EC%84%B8%EB%8C%80%EC%8B%A4%EC%86%90">뱅크샐러드</A>에 따르면, 비중증 비급여 치료비 100만원이 나왔을 때 4세대 가입자는 30만원만 내지만 5세대 가입자는 50만원을 부담해야 해요. 20만원 차이가 생기는 거죠. 병원을 자주 가는 분일수록 이 차이가 누적돼요.</P>
        <P>통원 공제금액도 달라졌어요. 4세대는 통원 시 공제금액이 1~2만원 수준이었는데, 5세대는 <B>최소 5만원</B>부터 적용돼요. 감기나 가벼운 진료로 3만원 나왔다면 보험금을 아예 못 받는 경우도 생겨요.</P>

        <H3>비중증 비급여 부담 비교 예시</H3>
        <P>비급여 치료비가 200만원 나온 경우를 비교해 볼게요. 4세대 가입자는 본인 부담이 60만원(30%)이지만, 5세대는 100만원(50%)이에요. 차이가 <B>40만원</B>이나 돼요. 반면 보험료 절감분이 연간 20~30만원이라면, 비급여 치료를 많이 받는 해에는 오히려 손해가 될 수 있어요.</P>

        <Info type="warn">{"연간 비급여 치료비가 <strong>100만원 이상</strong>인 분이라면, 5세대 전환 전에 자기부담금을 꼼꼼히 계산해 보세요. 보험료 절감분보다 부담 증가분이 클 수 있어요."}</Info>

        <InlineLink icon="🔢" title="자기부담금 계산 상세" desc="내 치료비 기준 실제 부담 금액" href="/w/5세대-실손보험-자기부담금" />
      </Sec>

      <RelatedMid
        title="다른 실손보험 정보도 살펴보세요"
        items={[
          { icon: "💰", title: "보험료 연령별 비교", desc: "세대별 보험료 차이 금액", href: "/w/5세대-실손보험-보험료-비교" },
          { icon: "📋", title: "가입 조건 나이 기준", desc: "5세대 가입 심사 기준", href: "/w/5세대-실손보험-가입-조건" },
          { icon: "🔄", title: "갈아타기 시기 판단", desc: "전환 최적 타이밍", href: "/w/5세대-실손보험-갈아타기-시기" },
        ]}
        hubHref="/category/보험"
        hubLabel="실손보험 전체 보기"
      />

      <Divider />

      {/* ───── SECTION 04: 도수치료 제외 ───── */}
      <Sec n="SECTION 04" id="doseotherapy-exclusion" title="도수치료가 완전히 빠진 건 맞나요?" sub="제외 항목 3가지 · 관리급여 전환 전망 · 4세대 유지 기준">
        <P>맞아요. <A href="https://www.khan.co.kr/article/202504020600091">경향신문</A>에 따르면, 5세대 실손보험에서 도수치료·체외충격파·비급여 주사제(프롤로주사, 영양주사 등)는 보장 대상에서 완전히 제외돼요. 4세대에서는 이 항목들을 연간 <B>350만원</B>까지 보장했는데, 5세대에서는 1원도 보장하지 않아요.</P>
        <P>다만 정부가 이 항목들을 '관리급여'로 지정할 가능성이 있어요. 관리급여가 되면 건강보험이 적용되지만, 본인 부담률이 95%로 매우 높아서 실질적인 혜택은 제한적이에요. 현재 특약2(도수치료·주사제 포함)는 비급여 관리 효과를 확인한 뒤 출시 일정을 확정할 예정이에요.</P>
        <P>도수치료를 정기적으로 받는 분이라면 이 변화가 가장 큰 영향을 미쳐요. 월 1회 도수치료를 받으면 연간 비용이 300~400만원인데, 5세대에서는 이 금액을 전부 본인이 부담해야 해요. 이런 분이라면 4세대를 유지하는 게 현실적으로 더 나은 선택이에요.</P>

        <H3>제외 항목 상세</H3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead><tr><THL>제외 항목</THL><TH>4세대 보장</TH><TH>5세대</TH></tr></thead>
            <tbody>
              {[
                ["도수치료", "연 350만원 한도", "보장 제외"],
                ["체외충격파", "연 350만원 한도", "보장 제외"],
                ["비급여 주사제 (프롤로·영양)", "연 350만원 한도", "보장 제외"],
              ].map(([item, g4, g5], i) => (
                <tr key={i}>
                  <td style={{ padding: "9px 8px", textAlign: "left", borderBottom: "1px solid #E5E7EB", fontWeight: 600, color: "#111827", fontSize: 13 }}>{item}</td>
                  <td style={{ padding: "9px 8px", textAlign: "center", borderBottom: "1px solid #E5E7EB", color: "#374151", fontSize: 13 }}>{g4}</td>
                  <td style={{ padding: "9px 8px", textAlign: "center", borderBottom: "1px solid #E5E7EB", color: "#374151", fontSize: 13 }}>{g5}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableNote>*특약2 출시 시 별도 보장 가능 (시기 미정)</TableNote>

        <BridgeCard
          q="도수치료 제외가 나한테 얼마나 영향이 있을까?"
          a="치료 빈도와 비용을 기준으로 4세대 유지 vs 5세대 전환 손익을 계산해 볼 수 있어요."
          label="상세 분석"
          href="/w/5세대-실손보험-도수치료-제외"
        />
      </Sec>

      <Divider />

      {/* ───── SECTION 05: 중증 보장 강화 ───── */}
      <Sec n="SECTION 05" id="severe-coverage" title="중증 질환 보장은 오히려 좋아졌나요?" sub="자기부담 한도 500만원 · 상급종합병원 입원 · 갈아타기 판단">
        <P>네, 이 부분이 5세대의 가장 큰 장점이에요. 암·뇌혈관질환·심장질환으로 상급종합병원이나 종합병원에 입원하면 연간 자기부담 한도가 <B>500만원</B>으로 제한돼요. 4세대에는 이런 한도가 없었기 때문에, 중증 질환에 한해서는 5세대가 확실히 유리해요.</P>
        <P>예를 들어 암 치료로 비급여 1,500만원이 나왔다면, 4세대는 본인 부담 450만원(30%)이지만 5세대는 연간 한도 500만원 안에서 처리돼요. 비급여가 2,000만원을 넘어도 본인 부담은 500만원에서 멈추는 거예요. 고가 치료일수록 5세대의 중증 보장이 빛을 발해요.</P>
        <P>다만 중증 보장 강화는 상급종합병원·종합병원 입원에만 적용돼요. 동네 의원이나 통원 치료에는 해당하지 않아요. 이 점은 꼭 기억해야 해요.</P>

        <H3>나에게 맞는 선택은?</H3>
        <P>결국 4세대와 5세대 중 어떤 게 유리한지는 내 병원 이용 패턴에 달려 있어요. 도수치료를 자주 받는다면 4세대 유지가 낫고, 보험료 부담이 크고 큰 병 대비가 중요하다면 5세대가 유리해요. 아래 기준으로 판단해 보세요.</P>

        <Info type="warn">{"5세대 전환 후에는 다시 4세대로 돌아갈 수 <strong>없어요</strong>. 전환 전에 반드시 도수치료 이용 빈도와 보험료 차이를 비교해 보세요."}</Info>

        <P><B>4세대 유지가 유리한 경우:</B></P>
        <Btn group="keep4" value="dose" label="도수치료를 월 1회 이상 받고 있다면" sel={ans} pick={pick} />
        <Btn group="keep4" value="highcost" label="비급여 치료비가 연 200만원 이상이라면" sel={ans} pick={pick} />
        <Btn group="keep4" value="lowburden" label="현재 보험료 부담이 크지 않다면" sel={ans} pick={pick} />

        <P><B>5세대 전환이 유리한 경우:</B></P>
        <Btn group="switch5" value="nodose" label="도수치료를 거의 안 받는다면" sel={ans} pick={pick} />
        <Btn group="switch5" value="saveprem" label="보험료 절감이 최우선이라면" sel={ans} pick={pick} />
        <Btn group="switch5" value="severe" label="중증 질환 대비가 더 중요하다면" sel={ans} pick={pick} />

        <SpokeLink num="01" title="갈아타기 비용·절차 상세" desc="계약 재매입 후 무심사 전환 방법" href="/w/5세대-실손보험-갈아타기-비용" />
        <SpokeLink num="02" title="보험료 연령별 비교표" desc="20~50대 세대별 보험료 차이" href="/w/5세대-실손보험-보험료-비교" />

        <ExtBtn badge="뱅크샐러드" text="5세대 실손보험 비교 분석" cta="비교하기 →" href="https://www.banksalad.com/articles/%EB%B3%B4%ED%97%98-%EC%8B%A4%EC%86%90%EB%B3%B4%ED%97%98-5%EC%84%B8%EB%8C%80%EC%8B%A4%EC%86%90" />
      </Sec>

      <Divider />

      {/* ───── FAQ ───── */}
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" sub="4세대 장점 · 보험료 절감 폭">
        <FAQAccordion items={meta.faq} />
      </Sec>

      <RelatedArticles items={[
        { title: "5세대 실손보험 보험료 비교", desc: "연령별 보험료 차이 금액", href: "/w/5세대-실손보험-보험료-비교" },
        { title: "5세대 실손보험 자기부담금", desc: "내 치료비 기준 부담 금액", href: "/w/5세대-실손보험-자기부담금" },
        { title: "5세대 실손보험 갈아타기 시기", desc: "전환 최적 타이밍 판단", href: "/w/5세대-실손보험-갈아타기-시기" },
        { title: "5세대 실손보험 도수치료 제외", desc: "빠지는 항목과 대안", href: "/w/5세대-실손보험-도수치료-제외" },
        { title: "5세대 실손보험 가입 조건", desc: "나이·건강 심사 기준", href: "/w/5세대-실손보험-가입-조건" },
      ]} />
      <PrevNext
        prev={{ title: "5세대 실손보험 보장 내용 비교", href: "/w/5세대-실손보험" }}
        next={{ title: "5세대 실손보험 보험료 비교", href: "/w/5세대-실손보험-보험료-비교" }}
      />
    </BlogLayout>
  );
}
