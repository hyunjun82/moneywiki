// @ts-nocheck
"use client";
import { useState } from "react";
import {
  C,
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag,
  FormulaCard, CaseBox,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "노인장기요양보험 등급 판정 기준 | 1등급 2등급 본인부담금 계산",
  description: "장기요양보험 등급은 1~5등급과 인지지원등급으로 나뉘어요. 어르신의 기능상태를 평가해 등급을 결정하고, 등급별로 받을 수 있는 서비스와 본인부담금이 달라요.",
  category: "복지",
  keywords: [
    "노인장기요양보험 등급 판정 기준",
    "노인장기요양보험 등급 1등급 2등급 서비스",
    "노인장기요양보험 본인부담금 계산",
    "노인장기요양보험 등급 신청 자격 65세",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "장기요양보험 등급은 <strong>1~5등급과 인지지원등급</strong> 총 6단계로 나뉘어요.",
    "1등급은 최중증(95점 이상), 5등급은 치매 특별등급(45점 이상)이에요.",
    "본인부담금은 일반 수급자 <strong>15%(시설), 15%(재가)</strong>이고, 기초수급자는 무료예요.",
  ],
  sources: [
    { name: "국민건강보험공단 장기요양보험", url: "https://www.nhis.or.kr/nhis/together/wbhazb/retrieveExternalWbhazb001.do", date: "2026-02" },
  ],
  faq: [
    { q: "노인장기요양보험 등급을 받으면 어떤 서비스를 받나요?", a: "등급에 따라 재가급여(방문요양, 방문목욕, 방문간호 등)와 시설급여(요양원 입소)를 받을 수 있어요. 재가급여는 집에서 서비스를 받고, 시설급여는 요양원에 입소하는 방식이에요. 1~2등급은 시설 입소가 우선이에요." },
    { q: "노인장기요양보험 등급 판정은 얼마나 걸리나요?", a: "신청 후 방문조사 결과를 바탕으로 등급판정위원회에서 최종 등급을 결정해요. 신청일로부터 약 30일 이내에 결과를 통보해요. 등급 결과에 이의가 있으면 90일 이내에 이의신청을 할 수 있어요." },
  ],
  ctaCard: {
    label: "본인부담금 계산",
    mainText: "장기요양보험 등급별 본인부담금 계산",
    subText: "등급·소득 입력하면 즉시 확인",
    url: "/w/장기요양보험-계산기",
    external: false,
  },
  relatedDocs: [
    { title: "기초생활수급자 주거급여", url: "/w/기초생활수급자-주거급여-2026" },
    { title: "장애인 복지카드 혜택", url: "/w/장애인-복지카드-발급-신청" },
  ],
};

export default function Page() {
  type ResLink = { icon: string; title: string; desc: string; href: string };

  const [sel, setSel] = useState<{ q1: string; q2: string; q3: string; q4: string }>({
    q1: "", q2: "", q3: "", q4: "",
  });

  function getResult(): React.ReactNode | null {
    const { q1, q2, q3, q4 } = sel;
    if (!q1 || !q2 || !q3 || !q4) return null;

    const age = q1;       // "under60" | "60to64" | "over65"
    const condition = q2; // "severe" | "moderate" | "mild" | "dementia"
    const income = q3;    // "recipient" | "low" | "general"
    const care = q4;      // "home" | "facility" | "undecided"

    if (age === "under60") {
      const gridItems = [
        { label: "연령 조건", value: "60세 미만", ok: false },
        { label: "장기요양보험", value: "원칙적 65세 이상", ok: false },
        { label: "예외 조건", value: "노인성 질병 진단 시 가능", ok: true },
        { label: "확인 사항", value: "건강보험공단 문의 필요", ok: true },
      ];
      const links: ResLink[] = [
        { icon: "📋", title: "장애인 복지카드 혜택", desc: "65세 미만 장애인 복지 확인", href: "/w/장애인-복지카드-발급-신청" },
        { icon: "🧮", title: "기초생활수급자 주거급여", desc: "저소득층 주거 지원 확인", href: "/w/기초생활수급자-주거급여-2026" },
      ];
      return (
        <ResultFail title="65세 미만은 특별 조건이 필요해요">
          <ResultGrid items={gridItems} />
          <P>장기요양보험은 원칙적으로 65세 이상이에요. 65세 미만은 치매·뇌혈관질환·파킨슨 등 노인성 질병이 있을 때만 신청할 수 있어요.</P>
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultFail>
      );
    }

    const expectedGrade = condition === "severe" ? "1~2등급" : condition === "moderate" ? "2~3등급" : condition === "dementia" ? "4~5등급 또는 인지지원등급" : "3~4등급";
    const burden = income === "recipient" ? "무료" : income === "low" ? "50% 감면" : "15% (시설) / 15% (재가)";

    const gridItems = [
      { label: "예상 등급", value: expectedGrade, ok: true },
      { label: "연령 조건", value: age === "over65" ? "충족 (65세 이상)" : "65세 이하 — 질병 확인 필요", ok: age === "over65" },
      { label: "본인부담금", value: burden, ok: income === "recipient" },
      { label: "케어 방식", value: care === "home" ? "재가급여 권장" : care === "facility" ? "시설급여 고려" : "등급 후 결정", ok: true },
    ];
    const links: ResLink[] = [
      { icon: "🧮", title: "장기요양보험 계산기", desc: "등급별 본인부담금 계산", href: "/w/장기요양보험-계산기" },
      { icon: "📋", title: "건강보험공단 등급 신청", desc: "장기요양 등급 판정 신청", href: "https://www.nhis.or.kr" },
    ];
    return (
      <ResultPass title={`예상 ${expectedGrade} — 서비스 이용 가능`}>
        <ResultGrid items={gridItems} />
        <P>국민건강보험공단에 등급 신청을 하면 방문조사와 등급판정위원회를 거쳐 약 30일 이내에 결과를 받아요. 본인부담금은 {burden}이에요.</P>
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  const toc = [
    { t: "STEP 01 등급 예상 확인" },
    { t: "노인장기요양보험 등급 판정 기준은 무엇인가요?", sub: "1~5등급·인지지원등급 · 기능상태 점수 · 판정 절차" },
    { t: "노인장기요양보험 등급 1등급 2등급 서비스는?", sub: "재가급여 · 시설급여 · 등급별 월 한도액" },
    { t: "노인장기요양보험 등급별 본인부담금 계산 방법은?", sub: "일반 15% · 기초수급자 무료 · 감경 대상" },
    { t: "노인장기요양보험 등급 신청 자격 65세 조건은?", sub: "65세 이상 · 노인성 질병 · 신청 서류" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      sidebar={
        <>
          <SidebarCTA
            items={[
              { icon: "🧮", label: "장기요양보험 계산기", desc: "등급별 본인부담금 계산", href: "/w/장기요양보험-계산기", hot: true },
              { icon: "📋", label: "기초생활수급자 주거급여", desc: "저소득층 주거 지원 확인", href: "/w/기초생활수급자-주거급여-2026" },
              { icon: "📊", label: "장애인 복지카드 혜택", desc: "장애인 복지 혜택 종류", href: "/w/장애인-복지카드-발급-신청" },
            ]}
          />
          <SidebarDocs
            items={[
              { icon: "📄", label: "기초생활수급자 주거급여", href: "/w/기초생활수급자-주거급여-2026" },
              { icon: "📋", label: "장애인 복지카드 혜택", href: "/w/장애인-복지카드-발급-신청" },
              { icon: "🏢", label: "차상위계층 확인서 발급", href: "/w/차상위계층-확인서-발급" },
              { icon: "🧾", label: "한부모가족 지원금", href: "/w/한부모가족-지원금-신청-자격" },
              { icon: "💰", label: "기초생활수급자 교육급여", href: "/w/기초생활수급자-교육급여-신청" },
            ]}
          />
          <SidebarCalc
            items={[
              { icon: "🧮", label: "장기요양보험 계산기", href: "/w/장기요양보험-계산기" },
              { icon: "📊", label: "소득인정액 계산기", href: "/w/소득인정액-계산기" },
              { icon: "💼", label: "4대보험 계산기", href: "/w/4대보험-계산기" },
              { icon: "📈", label: "연봉 실수령액 계산기", href: "/w/연봉-실수령액-계산기" },
              { icon: "🏠", label: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
            ]}
          />
        </>
      }
      disclaimer="이 글은 일반적인 정보를 제공하며, 실제 등급은 건강보험공단 방문조사 후 결정돼요."
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="s1" title="등급 예상 확인" sub="연령·기능상태·소득 입력하면 즉시 예상 등급 판정" />
      <CheckerShell title="어르신이 받을 수 있는 등급이 몇 등급인가요?" result={getResult()}>
        <CheckerQ
          q="현재 연령은 어떻게 되나요?"
          opts={[
            { label: "60세 미만", value: "under60" },
            { label: "60~64세", value: "60to64" },
            { label: "65세 이상", value: "over65" },
          ]}
          sel={sel.q1}
          onSel={(v) => setSel({ ...sel, q1: v })}
        />
        <CheckerQ
          q="현재 기능 상태는 어떻게 되나요?"
          opts={[
            { label: "혼자서는 거동이 매우 어려워요 (최중증)", value: "severe" },
            { label: "일부 도움이 필요해요 (중증)", value: "moderate" },
            { label: "약간의 도움이 필요해요 (경증)", value: "mild" },
            { label: "치매 증상이 있어요", value: "dementia" },
          ]}
          sel={sel.q2}
          onSel={(v) => setSel({ ...sel, q2: v })}
        />
        <CheckerQ
          q="소득 수준은 어떻게 되나요?"
          opts={[
            { label: "기초생활수급자", value: "recipient" },
            { label: "저소득층 (차상위계층)", value: "low" },
            { label: "일반 가구", value: "general" },
          ]}
          sel={sel.q3}
          onSel={(v) => setSel({ ...sel, q3: v })}
        />
        <CheckerQ
          q="어떤 형태의 요양 서비스를 원하나요?"
          opts={[
            { label: "집에서 받고 싶어요 (재가)", value: "home" },
            { label: "요양원 입소를 원해요 (시설)", value: "facility" },
            { label: "아직 미결정이에요", value: "undecided" },
          ]}
          sel={sel.q4}
          onSel={(v) => setSel({ ...sel, q4: v })}
        />
      </CheckerShell>

      <BridgeCard
        text="등급 예상을 확인했다면, 실제 본인부담금이 얼마인지 계산해봐요."
        href="/w/장기요양보험-계산기"
        label="본인부담금 계산하기"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="노인장기요양보험 등급 판정 기준은 무엇인가요?" sub="1~5등급·인지지원등급 · 기능상태 점수 · 판정 절차" />
      <P>장기요양 등급은 어르신의 <B>기능상태(ADL)</B>를 평가한 점수로 결정해요. 1등급부터 5등급, 인지지원등급까지 6단계예요. 점수가 높을수록(기능 저하가 심할수록) 높은 등급을 받아요.</P>
      <P>1등급은 95점 이상, 2등급은 75~95점, 3등급은 60~75점, 4등급은 51~60점, 5등급(치매)은 45~51점이에요. 인지지원등급은 치매 진단자로 45점 미만이어도 인정되는 특별 등급이에요.</P>
      <P>판정 절차는 ①신청 → ②방문조사 → ③의사 소견서 제출 → ④등급판정위원회 → ⑤결과 통보예요. 신청 후 약 30일이 걸려요. 방문조사원이 자택에 방문해 52개 항목을 평가해요.</P>
      <P>등급 판정에 불복하면 이의신청을 할 수 있어요. 결과 통보 후 90일 이내에 건강보험공단에 이의신청하면 재심사가 이루어져요. 필요하면 의사 소견서를 추가로 제출하면 도움이 돼요.</P>

      <TableTitle>장기요양보험 등급별 기준 점수</TableTitle>
      <TH cols={["등급", "기능상태 점수", "상태 설명"]} />
      <THL rows={[
        ["1등급", "95점 이상", "최중증 — 혼자 생활 불가"],
        ["2등급", "75~95점", "중증 — 대부분 도움 필요"],
        ["3등급", "60~75점", "중등증 — 상당부분 도움 필요"],
        ["4등급", "51~60점", "경증 — 일부 도움 필요"],
        ["5등급(치매)", "45~51점", "치매 진단자"],
        ["인지지원등급", "45점 미만", "치매 초기·경도"],
      ]} />
      <TableNote>점수는 방문조사원의 평가 결과에 따라 결정돼요.</TableNote>

      <InlineLink
        icon="📋"
        title="기초생활수급자 주거급여 2026"
        desc="요양급여와 함께 받을 수 있는 주거급여 확인"
        href="/w/기초생활수급자-주거급여-2026"
      />

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="노인장기요양보험 등급 1등급 2등급 서비스는?" sub="재가급여 · 시설급여 · 등급별 월 한도액" />
      <P>장기요양 서비스는 크게 <B>재가급여</B>(집에서 받는 서비스)와 <B>시설급여</B>(요양원 입소)로 나뉘어요. 1~2등급은 시설 입소를 원하면 입소 가능하고, 3~5등급은 원칙적으로 재가급여만 이용해요.</P>
      <P>재가급여에는 방문요양, 방문목욕, 방문간호, 주·야간보호, 단기보호 등이 있어요. 방문요양은 요양사가 집에 방문해 식사, 목욕, 청소 등을 도와줘요. 등급별로 월 이용 한도액이 정해져 있어요.</P>
      <P>1등급 재가급여 월 한도액은 약 200만원, 2등급은 약 180만원이에요. 한도 내에서 본인이 원하는 서비스를 선택해서 이용할 수 있어요. 한도를 초과하는 서비스는 전액 본인 부담이에요.</P>
      <P>시설급여(요양원)는 24시간 돌봄을 제공해요. 1~2등급자가 주로 이용하지만, 특별한 사유가 있으면 3~5등급자도 이용할 수 있어요. 시설 이용 시 본인부담금 외에 식사비·간식비·이미용비 등 비급여 항목이 별도로 발생해요.</P>

      <SpokeLink
        num="01"
        title="기초생활수급자 교육급여"
        desc="저소득 가구의 자녀 교육 지원 확인"
        href="/w/기초생활수급자-교육급여-신청"
      />

      <RelatedMid
        cards={[
          { title: "기초생활수급자 주거급여", desc: "요양 중 주거급여 동시 수급", href: "/w/기초생활수급자-주거급여-2026" },
          { title: "차상위계층 확인서 발급", desc: "본인부담금 감경 자격 확인", href: "/w/차상위계층-확인서-발급" },
          { title: "장애인 복지카드 혜택", desc: "장애 중복 혜택 확인", href: "/w/장애인-복지카드-발급-신청" },
        ]}
        hubHref="/w/복지"
        hubLabel="복지 허브 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="노인장기요양보험 등급별 본인부담금 계산 방법은?" sub="일반 15% · 기초수급자 무료 · 감경 대상" />
      <P>장기요양 서비스 이용 시 본인부담금이 있어요. 일반 수급자는 시설급여 이용 시 <B>비용의 20%</B>, 재가급여는 <B>15%</B>를 내야 해요. 단, 기초생활수급자는 전액 무료예요.</P>
      <P>차상위계층이면 감경 혜택을 받아요. 건강보험료 부과 기준에 따라 감경 대상이 되면 본인부담금의 50%를 감면받아요. 독거노인도 별도 감경 신청이 가능해요.</P>
      <P>비급여 항목은 별도예요. 식사비, 이미용비, 상급 침실 이용료 등은 급여 대상이 아니에요. 요양원 이용 시 비급여 비용이 월 30~50만원 정도 추가로 발생할 수 있어요.</P>
      <P>본인부담금 상한제가 있어요. 같은 달에 개인 부담금이 일정 금액을 초과하면 초과분을 돌려줘요. 저소득층은 상한액이 낮아서 더 많이 보호받아요.</P>

      <FormulaCard
        formula="본인부담금 = 서비스 이용금액 × 15%(재가) 또는 × 20%(시설)"
        note="예) 재가급여 월 100만원 이용 → 본인부담 15만원 (기초수급자는 0원)"
      />

      <CaseBox
        cases={[
          {
            name: "기초수급자 이씨 (2등급)",
            detail: "재가급여 월 130만원 이용",
            result: "본인부담 = 0원 (기초수급자 전액 면제)",
          },
          {
            name: "차상위계층 김씨 (3등급)",
            detail: "재가급여 월 80만원 이용 · 50% 감경",
            result: "본인부담 = 80만원 × 15% × 50% = 6만원",
          },
          {
            name: "일반 수급자 박씨 (1등급)",
            detail: "요양원 입소 · 월 비용 200만원",
            result: "본인부담 = 200만원 × 20% = 40만원 + 비급여",
          },
        ]}
      />

      <Info type="warn">
        요양원 입소 시 본인부담금(20%) 외에 식사비·이미용비 등 비급여 항목이 추가로 발생해요. 입소 전 총 비용을 꼭 확인해요.
      </Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="노인장기요양보험 등급 신청 자격 65세 조건은?" sub="65세 이상 · 노인성 질병 · 신청 서류" />
      <P>장기요양보험 신청 자격은 원칙적으로 <B>65세 이상</B>이에요. 단, 65세 미만이라도 노인성 질병(치매, 뇌혈관질환, 파킨슨병 등)으로 6개월 이상 일상생활이 어렵다면 신청할 수 있어요.</P>
      <P>신청 서류는 장기요양인정 신청서, 의사 소견서, 신분증이에요. 신청은 전국 건강보험공단 지사나 홈페이지에서 가능해요. 의사 소견서는 신청 후 60일 이내에 제출하면 돼요.</P>
      <P>방문조사는 신청 후 건강보험공단 직원이 직접 집으로 방문해요. 52개 항목을 조사해요. 조사 당일 어르신의 상태가 평소보다 좋아 보이면 등급이 낮게 나올 수 있으니, 평소 상태를 잘 설명하는 게 중요해요.</P>
      <P>등급 판정 결과 이후 매년 또는 2년마다 갱신 판정이 이루어져요. 상태가 변화하면 갱신 신청을 통해 등급을 조정할 수 있어요. 상태 악화로 등급 상향이 필요하다면 갱신 또는 등급 변경 신청을 할 수 있어요.</P>

      <SpokeLink
        num="02"
        title="장애인 복지카드 혜택 종류"
        desc="장애인도 받을 수 있는 복지 서비스 확인"
        href="/w/장애인-복지카드-발급-신청"
      />

      <InlineLink
        icon="🧮"
        title="장기요양보험 계산기"
        desc="등급·소득 기준 본인부담금 자동 계산"
        href="/w/장기요양보험-계산기"
      />

      <ExtBtn href="https://www.nhis.or.kr" label="건강보험공단 공식" text="장기요양 등급 신청 바로가기" />

      <Divider />

      {/* FAQ */}
      <FAQAccordion items={meta.faq} />
      <RelatedArticles
        items={[
          { title: "기초생활수급자 주거급여 2026", href: "/w/기초생활수급자-주거급여-2026" },
          { title: "기초생활수급자 교육급여", href: "/w/기초생활수급자-교육급여-신청" },
          { title: "차상위계층 확인서 발급", href: "/w/차상위계층-확인서-발급" },
          { title: "장애인 복지카드 혜택", href: "/w/장애인-복지카드-발급-신청" },
          { title: "한부모가족 지원금 자격", href: "/w/한부모가족-지원금-신청-자격" },
        ]}
      />
      <PrevNext
        prev={{ title: "기초생활수급자 교육급여", href: "/w/기초생활수급자-교육급여-신청" }}
        next={{ title: "차상위계층 확인서 발급", href: "/w/차상위계층-확인서-발급" }}
      />
    </BlogLayout>
  );
}

export { meta };
