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
  title: "기초생활수급자 교육급여 지원 금액 2026 | 초중고 교육활동비 대상",
  description: "기초생활수급자 교육급여는 초중고 자녀가 있으면 연간 교육활동비를 받을 수 있어요. 2026년 교육급여 선정 기준과 학교급별 지원 금액을 알기 쉽게 정리했어요.",
  category: "복지",
  keywords: [
    "기초생활수급자 교육급여 지원 금액 2026",
    "기초생활수급자 교육급여 초중고 교육활동비",
    "기초생활수급자 교육급여 선정 소득 기준",
    "기초생활수급자 교육급여 교육활동비 신청 대상",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "2026년 교육급여 선정 기준은 기준 중위소득 <strong>50%</strong> 이하예요.",
    "초등학생 <strong>48.7만원</strong>, 중학생 <strong>67.4만원</strong>, 고등학생 <strong>76.3만원</strong>을 연 1회 지원해요.",
    "교육급여는 학교 입학금·수업료·학용품비 등 <strong>교육활동비 전반</strong>을 지원해요.",
  ],
  sources: [
    { name: "교육부 교육급여 안내", url: "https://www.moe.go.kr/boardCnts/viewRenew.do?boardID=316&boardSeq=93867", date: "2026-02" },
  ],
  faq: [
    { q: "기초생활수급자 교육급여는 언제 지급되나요?", a: "학기 초에 일괄 지급돼요. 1학기는 3~4월, 2학기는 9월 전후에 지급돼요. 학기 도중 신청해도 신청월 이후 금액을 지급받아요. 학년도 중 수급자가 된 경우에도 신청 즉시 지급이 가능해요." },
    { q: "기초생활수급자 교육급여를 받으려면 어떻게 해야 하나요?", a: "주민센터나 복지로(bokjiro.go.kr)에서 교육급여를 신청하면 돼요. 초·중·고 재학 중인 자녀가 있고 교육급여 수급자로 선정되면 자동으로 교육활동비가 지원돼요. 학교에 별도로 신청하지 않아도 돼요." },
  ],
  ctaCard: {
    label: "교육급여 확인",
    mainText: "내 자녀 교육급여 수급 가능 여부",
    subText: "소득인정액 기준 즉시 판정",
    url: "/w/소득인정액-계산기",
    external: false,
  },
  relatedDocs: [
    { title: "기초생활수급자 주거급여", url: "/w/기초생활수급자-주거급여-2026" },
    { title: "차상위계층 확인서 발급", url: "/w/차상위계층-확인서-발급" },
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

    const income = q1;     // "under50" | "50to100" | "over100"
    const grade = q2;      // "elementary" | "middle" | "high" | "none"
    const isRecipient = q3; // "yes" | "no" | "applying"
    const childCount = q4;  // "1" | "2plus"

    if (grade === "none") {
      const gridItems = [
        { label: "자녀 학교", value: "해당 없음 (취학 전·졸업)", ok: false },
        { label: "교육급여", value: "초중고 재학 시 수급", ok: false },
        { label: "대안", value: "주거급여·생계급여 확인", ok: true },
        { label: "확인 사항", value: "차상위계층 혜택 조회", ok: true },
      ];
      const links: ResLink[] = [
        { icon: "📋", title: "기초생활수급자 주거급여", desc: "자녀 없어도 받는 복지 급여", href: "/w/기초생활수급자-주거급여-2026" },
        { icon: "🧮", title: "차상위계층 확인서", desc: "다양한 복지 혜택 조회", href: "/w/차상위계층-확인서-발급" },
      ];
      return (
        <ResultFail title="초중고 자녀가 없으면 교육급여 해당 없어요">
          <ResultGrid items={gridItems} />
          <P>교육급여는 초·중·고 재학 중 자녀가 있어야 받을 수 있어요. 다른 급여(주거급여·생계급여)는 자녀 유무와 관계없이 신청 가능해요.</P>
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultFail>
      );
    }

    if (income === "over100") {
      const gridItems = [
        { label: "소득 기준", value: "중위소득 100% 초과", ok: false },
        { label: "교육급여", value: "수급 불가", ok: false },
        { label: "학교 장학금", value: "교내 장학금 알아봐요", ok: true },
        { label: "대안", value: "취업후상환 학자금대출", ok: true },
      ];
      const links: ResLink[] = [
        { icon: "📋", title: "취업후상환 학자금대출", desc: "ICL 대출 상환 조건 확인", href: "/w/취업후상환-학자금대출-상환" },
        { icon: "🧮", title: "차상위계층 확인서", desc: "추가 복지 혜택 조회", href: "/w/차상위계층-확인서-발급" },
      ];
      return (
        <ResultFail title="교육급여 소득 기준 초과예요">
          <ResultGrid items={gridItems} />
          <P>소득인정액이 기준 중위소득 50%를 초과하면 교육급여를 받기 어려워요. 교내 장학금이나 학자금 지원 제도를 활용해봐요.</P>
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultFail>
      );
    }

    const amountMap: Record<string, string> = {
      "elementary": "48.7만원",
      "middle": "67.4만원",
      "high": "76.3만원",
    };
    const amount = amountMap[grade] || "확인 필요";

    const gridItems = [
      { label: "교육급여 수급", value: "가능", ok: true },
      { label: "연간 지원 금액", value: amount, ok: true },
      { label: "자녀 수 추가", value: childCount === "2plus" ? "자녀별 각각 지원" : "1인 기준", ok: true },
      { label: "수급 중 여부", value: isRecipient === "yes" ? "이미 수급 중" : "신청 필요", ok: isRecipient === "yes" },
    ];
    const links: ResLink[] = [
      { icon: "📋", title: "복지로 교육급여 신청", desc: "온라인 신청 바로가기", href: "https://www.bokjiro.go.kr" },
      { icon: "🧮", title: "소득인정액 계산기", desc: "정확한 수급 가능 여부 계산", href: "/w/소득인정액-계산기" },
    ];
    return (
      <ResultPass title={`교육급여 연 ${amount} 지원 대상이에요`}>
        <ResultGrid items={gridItems} />
        <P>소득인정액이 기준 이하이고 초중고 자녀가 있다면 연간 {amount}의 교육활동비를 받을 수 있어요. 주민센터나 복지로에서 신청하세요.</P>
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  const toc = [
    { t: "STEP 01 교육급여 수급 가능 여부 확인" },
    { t: "기초생활수급자 교육급여 선정 소득 기준은?", sub: "중위소득 50% · 소득인정액 · 주거급여와 차이" },
    { t: "기초생활수급자 교육급여 초중고 교육활동비는 얼마?", sub: "초등 48.7만원 · 중학 67.4만원 · 고교 76.3만원" },
    { t: "기초생활수급자 교육급여 교육활동비 신청 대상은?", sub: "신청 자격 · 학교급별 지원 항목 · 신청 창구" },
    { t: "기초생활수급자 교육급여 외 추가 지원은 있나요?", sub: "방과후 지원 · 교복비 · 급식 지원 연계" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      sidebar={
        <>
          <SidebarCTA
            items={[
              { icon: "🧮", label: "소득인정액 계산기", desc: "교육급여 수급 가능 여부 판정", href: "/w/소득인정액-계산기", hot: true },
              { icon: "📋", label: "기초생활수급자 주거급여", desc: "같이 받을 수 있는 주거급여", href: "/w/기초생활수급자-주거급여-2026" },
              { icon: "📊", label: "차상위계층 확인서", desc: "추가 복지 혜택 조회", href: "/w/차상위계층-확인서-발급" },
            ]}
          />
          <SidebarDocs
            items={[
              { icon: "📄", label: "기초생활수급자 주거급여", href: "/w/기초생활수급자-주거급여-2026" },
              { icon: "📋", label: "차상위계층 확인서 발급", href: "/w/차상위계층-확인서-발급" },
              { icon: "🏢", label: "한부모가족 지원금", href: "/w/한부모가족-지원금-신청-자격" },
              { icon: "🧾", label: "취업후상환 학자금대출", href: "/w/취업후상환-학자금대출-상환" },
              { icon: "💰", label: "장기요양보험 등급 판정", href: "/w/장기요양보험-등급-신청-방법" },
            ]}
          />
          <SidebarCalc
            items={[
              { icon: "🧮", label: "소득인정액 계산기", href: "/w/소득인정액-계산기" },
              { icon: "📊", label: "주거급여 계산기", href: "/w/주거급여-계산기" },
              { icon: "💼", label: "4대보험 계산기", href: "/w/4대보험-계산기" },
              { icon: "📈", label: "연봉 실수령액 계산기", href: "/w/연봉-실수령액-계산기" },
              { icon: "🏠", label: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
            ]}
          />
        </>
      }
      disclaimer="이 글은 일반적인 복지 정보를 제공하며, 실제 수급 여부는 주민센터 또는 복지로에서 확인해요."
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="s1" title="교육급여 수급 가능 여부 확인" sub="소득·자녀 학교급 입력하면 즉시 판정" />
      <CheckerShell title="우리 아이 교육급여를 받을 수 있나요?" result={getResult()}>
        <CheckerQ
          q="소득인정액이 기준 중위소득의 몇 %인가요?"
          opts={[
            { label: "50% 이하 (수급 기준 이하)", value: "under50" },
            { label: "50%~100%", value: "50to100" },
            { label: "100% 초과", value: "over100" },
          ]}
          sel={sel.q1}
          onSel={(v) => setSel({ ...sel, q1: v })}
        />
        <CheckerQ
          q="자녀의 현재 학교 급은 무엇인가요?"
          opts={[
            { label: "초등학생", value: "elementary" },
            { label: "중학생", value: "middle" },
            { label: "고등학생", value: "high" },
            { label: "해당 없음 (취학 전·졸업)", value: "none" },
          ]}
          sel={sel.q2}
          onSel={(v) => setSel({ ...sel, q2: v })}
        />
        <CheckerQ
          q="현재 기초생활수급자로 선정되어 있나요?"
          opts={[
            { label: "네, 이미 수급자예요", value: "yes" },
            { label: "아니요, 신청 예정이에요", value: "applying" },
            { label: "아니요, 처음 알게 됐어요", value: "no" },
          ]}
          sel={sel.q3}
          onSel={(v) => setSel({ ...sel, q3: v })}
        />
        <CheckerQ
          q="교육급여를 받을 자녀가 몇 명인가요?"
          opts={[
            { label: "1명", value: "1" },
            { label: "2명 이상", value: "2plus" },
          ]}
          sel={sel.q4}
          onSel={(v) => setSel({ ...sel, q4: v })}
        />
      </CheckerShell>

      <BridgeCard
        text="교육급여는 자녀 수와 학교급에 따라 금액이 달라져요. 실제 지원금을 계산해봐요."
        href="/w/소득인정액-계산기"
        label="소득인정액 계산하기"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="기초생활수급자 교육급여 선정 소득 기준은?" sub="중위소득 50% · 소득인정액 · 주거급여와 차이" />
      <P>교육급여 선정 기준은 기준 중위소득 <B>50% 이하</B>예요. 2026년 기준으로 1인 가구 월 소득인정액 약 119만원, 4인 가구 약 298만원 이하면 해당돼요. 주거급여(48%)보다 기준이 조금 더 넓어요.</P>
      <P>교육급여는 주거급여와 기준이 달라요. 교육급여 50%, 주거급여 48%, 의료급여 40%, 생계급여 32% 순으로 기준이 달라요. 교육급여는 가장 넓은 범위에서 지원하므로 다른 급여에서 탈락해도 교육급여는 받을 수 있어요.</P>
      <P>소득인정액 계산 방식은 주거급여와 동일해요. 근로소득, 사업소득, 이전소득 등에 재산 환산액을 더한 금액이에요. 소득인정액 계산기로 미리 시뮬레이션해볼 수 있어요.</P>
      <P>교육급여 수급자가 되면 자녀가 초·중·고에 다니는 동안 계속 받을 수 있어요. 소득이 기준을 초과하면 수급 자격이 중단되지만, 자격을 갖추면 다시 신청할 수 있어요.</P>

      <InlineLink
        icon="📋"
        title="기초생활수급자 주거급여 2026"
        desc="주거급여 선정 기준과 지원 금액 비교"
        href="/w/기초생활수급자-주거급여-2026"
      />

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="기초생활수급자 교육급여 초중고 교육활동비는 얼마?" sub="초등 48.7만원 · 중학 67.4만원 · 고교 76.3만원" />
      <P>2026년 교육급여로 지원하는 교육활동비는 학교급에 따라 달라요. 초등학생은 연간 <B>48.7만원</B>, 중학생은 <B>67.4만원</B>, 고등학생은 <B>76.3만원</B>이에요. 매년 조금씩 인상되고 있어요.</P>
      <P>교육활동비는 학용품, 교재, 체험학습비 등 다양한 교육 관련 비용에 사용할 수 있어요. 현금이나 교육급여 바우처(카드) 형태로 지급돼요. 수급자 본인 계좌나 지정 카드로 받아요.</P>
      <P>고등학생은 교육활동비 외에 입학금·수업료도 지원받아요. 저소득층 고등학생은 국가장학금 형태로 수업료를 지원받아서 실질적으로 무상 교육에 가까워요.</P>
      <P>자녀가 여러 명이면 각각 지원받아요. 초등학생 1명, 중학생 1명이 있다면 48.7만원 + 67.4만원 = 116.1만원을 받아요. 자녀 수에 비례해서 지원 금액이 늘어나요.</P>

      <TableTitle>2026년 기초생활수급자 교육급여 금액</TableTitle>
      <TH cols={["학교급", "연간 지원 금액", "비고"]} />
      <THL rows={[
        ["초등학생", "48.7만원", "교육활동비"],
        ["중학생", "67.4만원", "교육활동비"],
        ["고등학생", "76.3만원 + 수업료", "교육활동비 + 입학금·수업료"],
      ]} />
      <TableNote>금액은 교육부 고시 기준이며 매년 조정될 수 있어요.</TableNote>

      <SpokeLink
        num="01"
        title="기초생활수급자 주거급여 2026"
        desc="교육급여와 함께 받는 주거급여 확인"
        href="/w/기초생활수급자-주거급여-2026"
      />

      <RelatedMid
        cards={[
          { title: "소득인정액 계산기", desc: "수급 가능 여부 정확히 계산", href: "/w/소득인정액-계산기" },
          { title: "차상위계층 확인서", desc: "교육급여 탈락 시 대안 확인", href: "/w/차상위계층-확인서-발급" },
          { title: "한부모가족 지원금", desc: "한부모 추가 교육 지원 확인", href: "/w/한부모가족-지원금-신청-자격" },
        ]}
        hubHref="/w/복지"
        hubLabel="복지 허브 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="기초생활수급자 교육급여 교육활동비 신청 대상은?" sub="신청 자격 · 학교급별 지원 항목 · 신청 창구" />
      <P>교육급여를 받으려면 먼저 <B>기초생활수급자로 선정</B>되어야 해요. 수급자 선정은 주민센터 또는 복지로(bokjiro.go.kr)에서 신청하면 돼요. 선정 후 자녀가 초·중·고에 재학 중이면 자동으로 교육급여가 지급돼요.</P>
      <P>신규 입학 자녀가 있다면 입학 전 1~2월에 미리 신청하는 게 좋아요. 1학기 교육활동비를 제때 받으려면 3월 이전에 신청이 완료되어야 해요. 중간에 신청해도 신청 이후 분은 받을 수 있어요.</P>
      <P>외국 국적 학생도 일부 조건에서 교육급여를 받을 수 있어요. 국내 초·중·고에 재학 중이면 국적에 관계없이 신청할 수 있는 경우가 있어요. 자세한 사항은 학교나 주민센터에 문의하세요.</P>
      <P>학교 급식비는 별도 지원돼요. 교육급여 수급자 자녀는 학교 무상급식과 별도로 급식 지원을 받을 수 있어요. 방과후 돌봄 서비스도 우선 배정 혜택이 있어요.</P>

      <FormulaCard
        formula="교육급여 연간 수령액 = 학교급별 금액 × 자녀 수"
        note="예) 초등 1명 + 중학 1명 → 48.7만원 + 67.4만원 = 연 116.1만원"
      />

      <CaseBox
        cases={[
          {
            name: "초등학생 1명 이씨",
            detail: "1인 가구 · 소득인정액 65만원 (중위소득 27%)",
            result: "교육급여 연 48.7만원 + 주거급여 + 생계급여 동시 수급",
          },
          {
            name: "중고생 2명 김씨",
            detail: "4인 가구 · 중학생 1명·고등학생 1명",
            result: "교육급여 연 67.4만원 + 76.3만원 = 143.7만원 (수업료 별도)",
          },
          {
            name: "고등학생 1명 박씨",
            detail: "3인 가구 · 소득인정액 140만원 (중위소득 45%)",
            result: "교육급여 연 76.3만원 + 고교 수업료 전액 지원",
          },
        ]}
      />

      <Info type="warn">
        교육급여는 자동 지급되지 않아요. 수급자로 선정된 후에도 자녀 학적 변경(전학, 휴학 등)이 생기면 주민센터에 신고해야 해요.
      </Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="기초생활수급자 교육급여 외 추가 지원은 있나요?" sub="방과후 지원 · 교복비 · 급식 지원 연계" />
      <P>교육급여 외에도 다양한 추가 지원이 있어요. 교육부에서 운영하는 <B>교육비 지원 시스템</B>을 통해 방과후 학교 수강권, 인터넷 통신비, 학교급식비 등을 추가로 받을 수 있어요.</P>
      <P>교복비 지원은 중학교·고등학교 신입생에게 제공돼요. 지자체별로 지원 금액이 달라요. 서울시의 경우 30~40만원을 지원해요. 학교 입학 전에 주민센터나 학교에 문의해야 해요.</P>
      <P>방과후 학교 자유수강권은 연 최대 60만원을 지원해요. 수급자 자녀는 우선 배정받을 수 있어요. 학원비 대신 학교 방과후 프로그램을 무료로 이용할 수 있어요.</P>
      <P>중·고등학생이라면 한국장학재단의 국가장학금도 확인해봐요. 대학생이 되면 소득분위에 따라 장학금을 받을 수 있어요. 취업후상환 학자금대출도 소득이 낮으면 이자 혜택이 있어요.</P>

      <SpokeLink
        num="02"
        title="차상위계층 확인서 발급"
        desc="교육급여 탈락 시 추가 복지 혜택 확인"
        href="/w/차상위계층-확인서-발급"
      />

      <InlineLink
        icon="📋"
        title="취업후상환 학자금대출 상환"
        desc="대학생 자녀 학자금 대출 조건과 상환 방법"
        href="/w/취업후상환-학자금대출-상환"
      />

      <ExtBtn href="https://www.bokjiro.go.kr" label="복지로 공식" text="교육급여 신청 바로가기" />

      <Divider />

      {/* FAQ */}
      <FAQAccordion items={meta.faq} />
      <RelatedArticles
        items={[
          { title: "기초생활수급자 주거급여 2026", href: "/w/기초생활수급자-주거급여-2026" },
          { title: "차상위계층 확인서 발급", href: "/w/차상위계층-확인서-발급" },
          { title: "한부모가족 지원금 자격", href: "/w/한부모가족-지원금-신청-자격" },
          { title: "취업후상환 학자금대출 상환", href: "/w/취업후상환-학자금대출-상환" },
          { title: "장기요양보험 등급 판정", href: "/w/장기요양보험-등급-신청-방법" },
        ]}
      />
      <PrevNext
        prev={{ title: "기초생활수급자 주거급여 2026", href: "/w/기초생활수급자-주거급여-2026" }}
        next={{ title: "장기요양보험 등급 판정 기준", href: "/w/장기요양보험-등급-신청-방법" }}
      />
    </BlogLayout>
  );
}

export { meta };
