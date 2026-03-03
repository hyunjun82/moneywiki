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
  title: "기초생활수급자 주거급여 2026 | 임차가구 수선비 지원 금액",
  description: "기초생활수급자 주거급여는 임차가구와 자가가구로 나뉘어 지원해요. 2026년 선정 기준 중위소득 48% 이하이고, 임차가구는 실제 임차료를, 자가가구는 수선비를 받아요.",
  category: "복지",
  keywords: [
    "기초생활수급자 주거급여 신청 자격",
    "기초생활수급자 주거급여 임차가구 지원 금액",
    "기초생활수급자 주거급여 수선비 자가가구",
    "기초생활수급자 주거급여 소득인정액 계산",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "2026년 주거급여 선정 기준은 기준 중위소득 <strong>48%</strong> 이하예요.",
    "임차가구는 지역·가구원수별 <strong>기준임대료 이하</strong> 실제 임차료를 지원받아요.",
    "자가가구는 노후도에 따라 <strong>최대 1,241만원</strong>의 수선비를 받을 수 있어요.",
  ],
  sources: [
    { name: "복지로 주거급여 안내", url: "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000817", date: "2026-02" },
  ],
  faq: [
    { q: "기초생활수급자 주거급여와 생계급여를 함께 받을 수 있나요?", a: "네, 주거급여와 생계급여는 별개로 받을 수 있어요. 다만 선정 기준이 달라요. 생계급여는 기준 중위소득 32% 이하, 주거급여는 48% 이하예요. 두 급여 모두 해당하면 동시에 받을 수 있어요." },
    { q: "기초생활수급자 주거급여 수급 중에 이사를 하면 어떻게 되나요?", a: "이사 후 새 주소지 주민센터에 변경 신고를 해야 해요. 새 임차료와 지역에 따라 급여액이 조정될 수 있어요. 수급자 자격은 유지되지만, 급여액은 새로운 임차 정보를 기준으로 재산정돼요." },
  ],
  ctaCard: {
    label: "주거급여 확인",
    mainText: "내 주거급여 수급 가능 여부",
    subText: "소득인정액 기준 즉시 판정",
    url: "/w/주거급여-계산기",
    external: false,
  },
  relatedDocs: [
    { title: "기초생활수급자 생계급여", url: "/w/기초생활수급자-생계급여" },
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

    const members = q1;    // "1" | "2to4" | "5plus"
    const income = q2;     // "under48" | "48to100" | "over100" (중위소득 %)
    const tenureType = q3; // "rent" | "owned" | "free"
    const region = q4;     // "seoul" | "metro" | "other"

    if (income === "over100") {
      const gridItems = [
        { label: "소득 기준", value: "기준 중위소득 100% 초과", ok: false },
        { label: "주거급여", value: "수급 불가", ok: false },
        { label: "대안", value: "주거 안정 지원 사업 검토", ok: true },
        { label: "다음 단계", value: "복지로 모의계산 권장", ok: true },
      ];
      const links: ResLink[] = [
        { icon: "📋", title: "차상위계층 확인서", desc: "소득 기준 복지 혜택 추가 확인", href: "/w/차상위계층-확인서-발급" },
        { icon: "🧮", title: "소득인정액 계산기", desc: "정확한 소득인정액 계산", href: "/w/소득인정액-계산기" },
      ];
      return (
        <ResultFail title="주거급여 수급 기준을 초과해요">
          <ResultGrid items={gridItems} />
          <P>소득인정액이 기준 중위소득 48%를 넘으면 주거급여를 받을 수 없어요. 차상위계층 복지 혜택은 별도로 확인해봐요.</P>
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultFail>
      );
    }

    const isEligible = income === "under48" || income === "48to100";
    const rentSupport = region === "seoul" ? (members === "1" ? "33만원" : members === "2to4" ? "37만원" : "44만원") :
      region === "metro" ? (members === "1" ? "25.5만원" : "28.5만원") : (members === "1" ? "20.1만원" : "22.5만원");

    const gridItems = [
      { label: "수급 자격", value: income === "under48" ? "주거급여 대상" : "대상 아님 (48% 초과)", ok: income === "under48" },
      { label: "임차 지원", value: tenureType === "rent" ? `월 최대 ${rentSupport}` : "자가가구 수선비 지원", ok: true },
      { label: "가구원 수", value: members === "1" ? "1인" : members === "2to4" ? "2~4인" : "5인 이상", ok: true },
      { label: "신청 창구", value: "주민센터 또는 복지로", ok: true },
    ];
    const links: ResLink[] = [
      { icon: "📋", title: "복지로 주거급여 신청", desc: "온라인 신청 및 자격 조회", href: "https://www.bokjiro.go.kr" },
      { icon: "🧮", title: "소득인정액 계산기", desc: "정확한 소득인정액 계산", href: "/w/소득인정액-계산기" },
    ];
    return income === "under48" ? (
      <ResultPass title="주거급여 수급 가능해요">
        <ResultGrid items={gridItems} />
        <P>기준 중위소득 48% 이하라면 주거급여를 받을 수 있어요. 임차가구라면 월 최대 {rentSupport}까지 지원받아요. 주민센터나 복지로에서 신청하세요.</P>
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    ) : (
      <ResultFail title="48% 초과 — 주거급여 수급 불가">
        <ResultGrid items={gridItems} />
        <P>소득인정액이 48%를 초과하면 주거급여를 받기 어려워요. 소득인정액을 정확히 계산한 후 다시 확인해봐요.</P>
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultFail>
    );
  }

  const toc = [
    { t: "STEP 01 수급 자격 확인" },
    { t: "기초생활수급자 주거급여 신청 자격은?", sub: "중위소득 48% · 소득인정액 · 재산 기준" },
    { t: "기초생활수급자 주거급여 임차가구 지원 금액은?", sub: "지역·가구원 기준임대료 · 실제 임차료 · 2026년 금액" },
    { t: "기초생활수급자 주거급여 수선비 지원은 얼마인가요?", sub: "자가가구 수선비 · 노후도 등급 · 최대 1,241만원" },
    { t: "기초생활수급자 주거급여 소득인정액 계산 방법은?", sub: "소득평가액 · 재산 환산 · 금융재산 공제" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      sidebar={
        <>
          <SidebarCTA
            items={[
              { icon: "🧮", label: "소득인정액 계산기", desc: "주거급여 수급 가능 여부 판정", href: "/w/소득인정액-계산기", hot: true },
              { icon: "📋", label: "생계급여 조건", desc: "주거급여와 함께 확인", href: "/w/기초생활수급자-생계급여" },
              { icon: "📊", label: "차상위계층 확인서", desc: "추가 복지 혜택 조회", href: "/w/차상위계층-확인서-발급" },
            ]}
          />
          <SidebarDocs
            items={[
              { icon: "📄", label: "기초생활수급자 생계급여", href: "/w/기초생활수급자-생계급여" },
              { icon: "📋", label: "기초생활수급자 교육급여", href: "/w/기초생활수급자-교육급여-신청" },
              { icon: "🏢", label: "차상위계층 확인서 발급", href: "/w/차상위계층-확인서-발급" },
              { icon: "🧾", label: "한부모가족 지원금", href: "/w/한부모가족-지원금-신청-자격" },
              { icon: "💰", label: "취업후상환 학자금대출", href: "/w/취업후상환-학자금대출-상환" },
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
      <Sec n="STEP 01" id="s1" title="수급 자격 확인" sub="가구원·소득·임차 유형 입력하면 즉시 판정" />
      <CheckerShell title="내가 주거급여를 받을 수 있나요?" result={getResult()}>
        <CheckerQ
          q="가구원 수는 몇 명인가요?"
          opts={[
            { label: "1인 가구", value: "1" },
            { label: "2~4인 가구", value: "2to4" },
            { label: "5인 이상 가구", value: "5plus" },
          ]}
          sel={sel.q1}
          onSel={(v) => setSel({ ...sel, q1: v })}
        />
        <CheckerQ
          q="소득인정액이 기준 중위소득의 몇 %인가요?"
          opts={[
            { label: "48% 이하 (수급 기준 이하)", value: "under48" },
            { label: "48%~100%", value: "48to100" },
            { label: "100% 초과", value: "over100" },
          ]}
          sel={sel.q2}
          onSel={(v) => setSel({ ...sel, q2: v })}
        />
        <CheckerQ
          q="현재 주거 형태는 무엇인가요?"
          opts={[
            { label: "임차 (월세·전세)", value: "rent" },
            { label: "자가 (본인 소유)", value: "owned" },
            { label: "무상 거주 (친척 집 등)", value: "free" },
          ]}
          sel={sel.q3}
          onSel={(v) => setSel({ ...sel, q3: v })}
        />
        <CheckerQ
          q="거주 지역은 어디인가요?"
          opts={[
            { label: "서울", value: "seoul" },
            { label: "경기·인천·광역시", value: "metro" },
            { label: "기타 지역", value: "other" },
          ]}
          sel={sel.q4}
          onSel={(v) => setSel({ ...sel, q4: v })}
        />
      </CheckerShell>

      <BridgeCard
        text="주거급여 자격 여부를 확인했다면, 실제 지원 금액이 얼마인지 계산해봐요."
        href="/w/주거급여-계산기"
        label="주거급여 계산하기"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="기초생활수급자 주거급여 신청 자격은?" sub="중위소득 48% · 소득인정액 · 재산 기준" />
      <P>주거급여 선정 기준은 <B>기준 중위소득 48% 이하</B>예요. 2026년 기준으로 1인 가구는 월 소득인정액 약 114만원 이하, 4인 가구는 약 286만원 이하여야 해요.</P>
      <P>소득인정액은 실제 소득만이 아니에요. 재산도 소득으로 환산해요. 금융재산, 부동산, 자동차 등을 월 소득으로 변환해서 합산해요. 재산이 많으면 소득이 적어도 탈락할 수 있어요.</P>
      <P>주거급여는 생계·의료급여와 별도로 신청할 수 있어요. 주거급여만 받는 '주거급여 단독' 수급자도 있어요. 생계급여 기준(32%)을 넘더라도 48% 이하면 주거급여는 받을 수 있어요.</P>
      <P>외국인도 일부 조건에서 수급이 가능해요. 한국인과 혼인하거나 한국 국적 자녀가 있는 경우 등 특정 조건에서 신청할 수 있어요. 자세한 사항은 주민센터에 문의해야 해요.</P>

      <InlineLink
        icon="📋"
        title="기초생활수급자 생계급여"
        desc="생계급여와 주거급여 동시 수급 조건 확인"
        href="/w/기초생활수급자-생계급여"
      />

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="기초생활수급자 주거급여 임차가구 지원 금액은?" sub="지역·가구원 기준임대료 · 실제 임차료 · 2026년 금액" />
      <P>임차가구는 실제 내는 임차료와 <B>기준임대료</B> 중 낮은 금액을 지원받아요. 기준임대료는 지역과 가구원수에 따라 다르게 정해져요. 실제 월세가 기준임대료보다 낮으면 실제 금액만 받아요.</P>
      <P>2026년 서울 기준임대료는 1인 가구 약 33.7만원, 4인 가구 약 44.3만원이에요. 경기·인천은 1인 26.6만원, 광역시는 21.8만원, 기타 지역은 17.8만원 수준이에요. 지역이 낮을수록 기준임대료도 낮아요.</P>
      <P>전세 거주자는 실제 전세금을 월 환산하여 지원받아요. 전세금 × 1/12 × 일정 비율로 계산해요. 전세보증금이 높을수록 수급이 제한될 수 있어요.</P>
      <P>임차료 지원은 매월 수급자 통장에 입금돼요. 임대인이 아닌 수급자 본인에게 지급하므로, 임대인에게 직접 내야 해요. 실거주를 하지 않으면 지원이 중단될 수 있어요.</P>

      <TableTitle>2026년 지역별 기준임대료 (주거급여)</TableTitle>
      <TH cols={["지역", "1인 가구", "2인 가구", "3인 가구", "4인 가구"]} />
      <THL rows={[
        ["서울", "33.7만원", "37.8만원", "44.8만원", "51.8만원"],
        ["경기·인천", "26.6만원", "29.8만원", "35.8만원", "41.4만원"],
        ["광역시", "21.8만원", "24.3만원", "29.1만원", "33.7만원"],
        ["기타", "17.8만원", "19.8만원", "23.6만원", "27.4만원"],
      ]} />
      <TableNote>기준임대료는 매년 조정될 수 있어요. 복지로에서 최신 금액을 확인해요.</TableNote>

      <SpokeLink
        num="01"
        title="기초생활수급자 교육급여 지원"
        desc="주거급여와 함께 받을 수 있는 교육 지원"
        href="/w/기초생활수급자-교육급여-신청"
      />

      <RelatedMid
        cards={[
          { title: "기초생활수급자 생계급여", desc: "생계급여 수급 기준 확인", href: "/w/기초생활수급자-생계급여" },
          { title: "차상위계층 확인서 발급", desc: "추가 복지 혜택 조회", href: "/w/차상위계층-확인서-발급" },
          { title: "한부모가족 지원금", desc: "한부모 가정 복지 지원", href: "/w/한부모가족-지원금-신청-자격" },
        ]}
        hubHref="/w/복지"
        hubLabel="복지 허브 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="기초생활수급자 주거급여 수선비 지원은 얼마인가요?" sub="자가가구 수선비 · 노후도 등급 · 최대 1,241만원" />
      <P>본인 소유 주택에 거주하는 자가가구는 <B>주택 수선비</B>를 지원받아요. 수선비는 주택 노후도에 따라 경보수·중보수·대보수로 나뉘어요. 최대 1,241만원까지 받을 수 있어요.</P>
      <P>경보수는 457만원, 중보수는 849만원, 대보수는 1,241만원이에요. 경보수는 벽지·도배·장판 등 가벼운 수리, 대보수는 지붕·단열 등 대규모 수리에 해당해요. 수선 주기는 경보수 3년, 중보수 5년, 대보수 7년이에요.</P>
      <P>수선비는 한국토지주택공사(LH)나 한국수자원공사 등이 직접 공사를 진행해요. 현금이 지급되는 방식이 아니라, 지정 업체가 공사를 진행하고 그 비용을 정부가 지원하는 방식이에요.</P>
      <P>수선비 지원을 받으려면 주택 노후도 판정 조사를 받아야 해요. 주민센터에서 신청하면 조사원이 방문해 등급을 판정해요. 판정 결과에 따라 지원 금액이 결정돼요.</P>

      <FormulaCard
        formula="임차가구 급여 = min(실제 임차료, 기준임대료)"
        note="예) 서울 1인 가구 월세 25만원 → 기준임대료 33.7만원 이하 → 25만원 전액 지원"
      />

      <CaseBox
        cases={[
          {
            name: "서울 1인 가구 이씨",
            detail: "월세 30만원 · 서울 기준임대료 33.7만원",
            result: "실제 임차료 30만원 < 기준임대료 → 30만원 전액 지원",
          },
          {
            name: "경기 3인 가구 김씨",
            detail: "월세 40만원 · 경기 기준임대료 35.8만원",
            result: "기준임대료 35.8만원 < 실제 임차료 → 35.8만원 지원",
          },
          {
            name: "지방 자가가구 박씨",
            detail: "주택 노후도 대보수 등급",
            result: "수선비 최대 1,241만원 지원 (LH 직접 공사)",
          },
        ]}
      />

      <Info type="warn">
        주거급여 수급 중 이사하면 반드시 주민센터에 신고해야 해요. 신고 없이 이사하면 급여가 중단되거나 환수될 수 있어요.
      </Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="기초생활수급자 주거급여 소득인정액 계산 방법은?" sub="소득평가액 · 재산 환산 · 금융재산 공제" />
      <P>소득인정액 = 소득평가액 + 재산의 소득 환산액이에요. 소득평가액은 근로소득, 사업소득, 이전소득 등을 합친 금액이에요. 근로소득은 30%를 공제한 70%만 반영해요.</P>
      <P>재산의 소득 환산은 복잡해요. 부동산, 자동차, 금융재산 등을 지역별 기본재산액을 뺀 후 월 소득으로 변환해요. 서울 기준 기본재산액이 9,900만원이라 이 이하 재산은 소득 환산에서 제외돼요.</P>
      <P>금융재산은 기본 공제 500만원 이후 전액 환산돼요. 예금·적금·보험해약금 등이 포함돼요. 생활비로 쓸 여유가 없는 금융재산이 많으면 수급에서 제외될 수 있어요.</P>
      <P>자동차는 생업용이나 장애인용 차량을 제외하면 100% 소득으로 환산해요. 중고차도 시가로 평가해요. 자동차가 있으면 수급이 어렵지만, 생업용·장애인용은 예외가 인정돼요.</P>

      <SpokeLink
        num="02"
        title="차상위계층 확인서 발급"
        desc="주거급여 탈락해도 차상위 혜택 확인"
        href="/w/차상위계층-확인서-발급"
      />

      <InlineLink
        icon="🧮"
        title="소득인정액 계산기"
        desc="정확한 소득인정액을 계산해 수급 여부 확인"
        href="/w/소득인정액-계산기"
      />

      <ExtBtn href="https://www.bokjiro.go.kr" label="복지로 공식" text="주거급여 신청 바로가기" />

      <Divider />

      {/* FAQ */}
      <FAQAccordion items={meta.faq} />
      <RelatedArticles
        items={[
          { title: "기초생활수급자 생계급여", href: "/w/기초생활수급자-생계급여" },
          { title: "기초생활수급자 교육급여", href: "/w/기초생활수급자-교육급여-신청" },
          { title: "차상위계층 확인서 발급", href: "/w/차상위계층-확인서-발급" },
          { title: "한부모가족 지원금", href: "/w/한부모가족-지원금-신청-자격" },
          { title: "취업후상환 학자금대출 상환", href: "/w/취업후상환-학자금대출-상환" },
        ]}
      />
      <PrevNext
        prev={{ title: "취업후상환 학자금대출 상환", href: "/w/취업후상환-학자금대출-상환" }}
        next={{ title: "기초생활수급자 교육급여", href: "/w/기초생활수급자-교육급여-신청" }}
      />
    </BlogLayout>
  );
}

export { meta };
