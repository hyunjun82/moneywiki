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
  title: "차상위계층 확인서 조건 2026 | 복지로 지원 혜택 종류",
  description: "차상위계층 확인서가 있으면 의료비 감면, 통신비 지원, 에너지 바우처 등 다양한 혜택을 받을 수 있어요. 2026년 선정 기준과 받을 수 있는 혜택 종류를 정리했어요.",
  category: "복지",
  keywords: [
    "차상위계층 확인서 조건 2026",
    "차상위계층 확인서 복지 혜택 감면 종류",
    "차상위계층 확인서 소득인정액 기준 중위소득",
    "차상위계층 확인서 온라인 복지로 조회",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "차상위계층은 기준 중위소득 <strong>50% 이하</strong>이면서 기초수급자가 아닌 저소득 가구예요.",
    "의료급여 혜택은 없지만 <strong>건강보험료 감면, 통신비 지원, 에너지 바우처</strong> 등 다양한 혜택이 있어요.",
    "차상위계층 확인서는 주민센터나 복지로에서 <strong>무료</strong>로 발급받을 수 있어요.",
  ],
  sources: [
    { name: "복지로 차상위계층 안내", url: "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003673", date: "2026-02" },
  ],
  faq: [
    { q: "차상위계층 확인서와 기초생활수급자는 어떻게 다른가요?", a: "기초생활수급자는 소득인정액이 기준 중위소득 32~50% 이하이고 각종 급여(생계·주거·의료·교육)를 받아요. 차상위계층은 기초수급자가 아니지만 중위소득 50% 이하의 가구로, 급여 대신 각종 지원 혜택을 받아요. 의료급여는 받지 못하지만 건강보험료 감면이 가능해요." },
    { q: "차상위계층 확인서 유효기간은 얼마나 되나요?", a: "차상위계층 확인서는 발급일로부터 1년간 유효해요. 매년 소득 조사를 통해 자격을 갱신해요. 혜택을 계속 받으려면 매년 갱신 신청을 해야 해요." },
  ],
  ctaCard: {
    label: "소득인정액 계산",
    mainText: "내가 차상위계층인지 즉시 확인",
    subText: "소득·재산 입력하면 바로 판정",
    url: "/w/소득인정액-계산기",
    external: false,
  },
  relatedDocs: [
    { title: "기초생활수급자 주거급여", url: "/w/기초생활수급자-주거급여-2026" },
    { title: "기초생활수급자 교육급여", url: "/w/기초생활수급자-교육급여-신청" },
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

    const income = q1;      // "under32" | "32to50" | "over50"
    const isRecipient = q2; // "yes" | "no"
    const asset = q3;       // "low" | "medium" | "high"
    const hasDoc = q4;      // "yes" | "no" | "want"

    if (isRecipient === "yes") {
      const gridItems = [
        { label: "현재 상태", value: "기초생활수급자", ok: true },
        { label: "차상위계층", value: "수급자 = 차상위 포함", ok: true },
        { label: "혜택", value: "수급자 혜택이 더 많음", ok: true },
        { label: "추가 확인", value: "교육급여·주거급여 확인", ok: true },
      ];
      const links: ResLink[] = [
        { icon: "📋", title: "기초생활수급자 주거급여", desc: "주거급여 수급 금액 확인", href: "/w/기초생활수급자-주거급여-2026" },
        { icon: "📋", title: "기초생활수급자 교육급여", desc: "자녀 교육급여 수급 확인", href: "/w/기초생활수급자-교육급여-신청" },
      ];
      return (
        <ResultPass title="기초수급자 — 차상위계층보다 더 많은 혜택">
          <ResultGrid items={gridItems} />
          <P>기초생활수급자는 차상위계층을 포함한 더 넓은 혜택을 받아요. 주거급여, 교육급여 등 각종 급여를 이미 받고 계신다면 차상위 확인서는 별도 필요 없어요.</P>
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultPass>
      );
    }

    if (income === "over50") {
      const gridItems = [
        { label: "소득 기준", value: "중위소득 50% 초과", ok: false },
        { label: "차상위계층", value: "해당 없음", ok: false },
        { label: "대안", value: "긴급복지지원 알아보기", ok: true },
        { label: "확인 사항", value: "소득인정액 정확히 계산", ok: true },
      ];
      const links: ResLink[] = [
        { icon: "🧮", title: "소득인정액 계산기", desc: "정확한 소득인정액 계산", href: "/w/소득인정액-계산기" },
        { icon: "📋", title: "한부모가족 지원금", desc: "한부모 가정 별도 지원 확인", href: "/w/한부모가족-지원금-신청-자격" },
      ];
      return (
        <ResultFail title="차상위계층 기준 초과예요">
          <ResultGrid items={gridItems} />
          <P>소득인정액이 기준 중위소득 50%를 초과하면 차상위계층이 아니에요. 소득인정액 계산기로 정확한 금액을 먼저 계산해봐요.</P>
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultFail>
      );
    }

    const gridItems = [
      { label: "소득 기준", value: income === "under32" ? "중위소득 32% 이하" : "중위소득 32~50%", ok: true },
      { label: "차상위계층", value: "해당 가능", ok: true },
      { label: "확인서 보유", value: hasDoc === "yes" ? "이미 보유" : "신청 필요", ok: hasDoc === "yes" },
      { label: "주요 혜택", value: "건강보험 감면·통신비·에너지", ok: true },
    ];
    const links: ResLink[] = [
      { icon: "📋", title: "복지로 차상위 신청", desc: "온라인으로 신청 및 확인서 발급", href: "https://www.bokjiro.go.kr" },
      { icon: "🧮", title: "소득인정액 계산기", desc: "차상위 자격 정확히 확인", href: "/w/소득인정액-계산기" },
    ];
    return (
      <ResultPass title="차상위계층 해당 가능성이 높아요">
        <ResultGrid items={gridItems} />
        <P>소득인정액이 기준 이하라면 주민센터나 복지로에서 차상위계층 확인서를 신청할 수 있어요. 확인서 발급 후 다양한 감면 혜택을 받을 수 있어요.</P>
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  const toc = [
    { t: "STEP 01 차상위계층 해당 여부 확인" },
    { t: "차상위계층 확인서 조건은 무엇인가요?", sub: "중위소득 50% · 소득인정액 · 기초수급자와 차이" },
    { t: "차상위계층 확인서 복지 혜택 감면 종류는?", sub: "건강보험 감면 · 통신비 · 에너지 바우처 · 문화누리" },
    { t: "차상위계층 확인서 소득인정액 기준 중위소득은?", sub: "2026년 기준 금액 · 가구원별 · 재산 환산" },
    { t: "차상위계층 확인서 온라인 복지로 조회 방법은?", sub: "복지로 신청 · 주민센터 방문 · 소요 기간" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      sidebar={
        <>
          <SidebarCTA
            items={[
              { icon: "🧮", label: "소득인정액 계산기", desc: "차상위 자격 즉시 판정", href: "/w/소득인정액-계산기", hot: true },
              { icon: "📋", label: "기초생활수급자 주거급여", desc: "주거급여 수급 기준 확인", href: "/w/기초생활수급자-주거급여-2026" },
              { icon: "📊", label: "기초생활수급자 교육급여", desc: "자녀 교육 지원 확인", href: "/w/기초생활수급자-교육급여-신청" },
            ]}
          />
          <SidebarDocs
            items={[
              { icon: "📄", label: "기초생활수급자 주거급여", href: "/w/기초생활수급자-주거급여-2026" },
              { icon: "📋", label: "기초생활수급자 교육급여", href: "/w/기초생활수급자-교육급여-신청" },
              { icon: "🏢", label: "한부모가족 지원금", href: "/w/한부모가족-지원금-신청-자격" },
              { icon: "🧾", label: "장기요양보험 등급 판정", href: "/w/장기요양보험-등급-신청-방법" },
              { icon: "💰", label: "장애인 복지카드 혜택", href: "/w/장애인-복지카드-발급-신청" },
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
      disclaimer="이 글은 일반적인 복지 정보를 제공하며, 실제 자격 여부는 주민센터 또는 복지로에서 확인해요."
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="s1" title="차상위계층 해당 여부 확인" sub="소득·재산 입력하면 즉시 판정" />
      <CheckerShell title="나는 차상위계층인가요?" result={getResult()}>
        <CheckerQ
          q="소득인정액이 기준 중위소득의 몇 %인가요?"
          opts={[
            { label: "32% 이하 (기초수급 기준 이하)", value: "under32" },
            { label: "32%~50%", value: "32to50" },
            { label: "50% 초과", value: "over50" },
          ]}
          sel={sel.q1}
          onSel={(v) => setSel({ ...sel, q1: v })}
        />
        <CheckerQ
          q="현재 기초생활수급자로 선정되어 있나요?"
          opts={[
            { label: "네, 수급자예요", value: "yes" },
            { label: "아니요", value: "no" },
          ]}
          sel={sel.q2}
          onSel={(v) => setSel({ ...sel, q2: v })}
        />
        <CheckerQ
          q="재산(부동산·금융) 규모는 어느 정도인가요?"
          opts={[
            { label: "거의 없어요 (1억 미만)", value: "low" },
            { label: "중간 정도 (1~3억)", value: "medium" },
            { label: "있는 편 (3억 이상)", value: "high" },
          ]}
          sel={sel.q3}
          onSel={(v) => setSel({ ...sel, q3: v })}
        />
        <CheckerQ
          q="차상위계층 확인서를 가지고 있나요?"
          opts={[
            { label: "네, 이미 발급받았어요", value: "yes" },
            { label: "아니요, 발급받고 싶어요", value: "want" },
            { label: "아니요, 필요 없을 것 같아요", value: "no" },
          ]}
          sel={sel.q4}
          onSel={(v) => setSel({ ...sel, q4: v })}
        />
      </CheckerShell>

      <BridgeCard
        text="차상위계층 자격이 확인됐다면, 어떤 혜택을 받을 수 있는지 알아봐요."
        href="/w/소득인정액-계산기"
        label="소득인정액 계산하기"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="차상위계층 확인서 조건은 무엇인가요?" sub="중위소득 50% · 소득인정액 · 기초수급자와 차이" />
      <P>차상위계층은 소득인정액이 <B>기준 중위소득 50% 이하</B>이면서 기초생활수급자가 아닌 가구예요. 기초수급자 바로 위 계층이에요. 수급자보다 소득이 조금 더 많아 급여는 못 받지만 각종 지원을 받을 수 있어요.</P>
      <P>기초수급자와의 차이는 급여 종류예요. 기초수급자는 생계·주거·의료·교육급여를 받지만, 차상위계층은 급여 대신 감면·지원 형태의 혜택을 받아요. 의료급여는 차상위계층에게 없지만 건강보험료를 많이 감면받아요.</P>
      <P>차상위계층은 여러 유형이 있어요. ①차상위 의료급여 ②차상위 자활 ③차상위 장애수당 ④차상위 본인부담 경감 ⑤차상위 교육급여 확인서가 있어요. 각 유형마다 신청 기관이 다를 수 있어요.</P>
      <P>차상위계층 확인서는 유효기간이 1년이에요. 매년 소득·재산 변동을 신고하고 갱신해야 해요. 자격이 계속 유지되는지 매년 확인해야 혜택이 끊기지 않아요.</P>

      <InlineLink
        icon="📋"
        title="기초생활수급자 주거급여 2026"
        desc="차상위에서 수급자로 전환 시 혜택 비교"
        href="/w/기초생활수급자-주거급여-2026"
      />

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="차상위계층 확인서 복지 혜택 감면 종류는?" sub="건강보험 감면 · 통신비 · 에너지 바우처 · 문화누리" />
      <P>차상위계층 확인서가 있으면 <B>건강보험료를 크게 감면</B>받아요. 건강보험료 경감 대상이 되면 보험료의 30~50%를 줄일 수 있어요. 직장가입자보다 지역가입자가 더 많은 혜택을 받는 경우가 많아요.</P>
      <P>통신비 지원도 받아요. 알뜰통신사(MVNO) 요금제를 이용하면 정부 지원으로 월 1만~2만원의 통신비를 지원받아요. KT·SKT·LG 등 주요 통신사에서도 저소득층 특별 요금제를 운영해요.</P>
      <P>에너지 바우처도 받을 수 있어요. 동절기·하절기 전기·도시가스·지역난방비를 지원해요. 연간 수십만원의 에너지 비용을 절약할 수 있어요. 사회보장정보원에서 신청해요.</P>
      <P>문화누리카드를 받으면 공연·영화·여행·체육 등 문화 활동 비용을 연간 12만원 지원받아요. 전통시장에서도 사용 가능해요. 주민센터나 복지로에서 신청하면 돼요.</P>

      <TableTitle>차상위계층 주요 혜택 종류</TableTitle>
      <TH cols={["혜택 항목", "지원 내용", "신청 기관"]} />
      <THL rows={[
        ["건강보험료 감면", "30~50% 경감", "국민건강보험공단"],
        ["통신비 지원", "월 1~2만원", "통신사 또는 주민센터"],
        ["에너지 바우처", "연 최대 수십만원", "사회보장정보원"],
        ["문화누리카드", "연 12만원", "주민센터·복지로"],
        ["교육급여 확인서", "교육활동비 지원", "주민센터"],
      ]} />
      <TableNote>혜택은 지자체별로 다를 수 있으므로 주민센터에서 추가 확인을 권장해요.</TableNote>

      <SpokeLink
        num="01"
        title="기초생활수급자 교육급여"
        desc="자녀 교육 지원 조건과 금액 확인"
        href="/w/기초생활수급자-교육급여-신청"
      />

      <RelatedMid
        cards={[
          { title: "기초생활수급자 주거급여", desc: "수급자 주거 지원 기준 비교", href: "/w/기초생활수급자-주거급여-2026" },
          { title: "한부모가족 지원금", desc: "한부모 가정 추가 혜택 확인", href: "/w/한부모가족-지원금-신청-자격" },
          { title: "장기요양보험 등급 판정", desc: "어르신 요양 서비스 확인", href: "/w/장기요양보험-등급-신청-방법" },
        ]}
        hubHref="/w/복지"
        hubLabel="복지 허브 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="차상위계층 확인서 소득인정액 기준 중위소득은?" sub="2026년 기준 금액 · 가구원별 · 재산 환산" />
      <P>2026년 기준 중위소득 50% 기준은 1인 가구 월 약 119만원, 2인 가구 약 197만원, 3인 가구 약 252만원, 4인 가구 약 306만원이에요. 이 금액 이하면 차상위계층에 해당할 수 있어요.</P>
      <P>소득인정액은 실제 소득만이 아니에요. 재산도 소득으로 환산돼요. 부동산, 금융재산, 자동차 등을 월 소득으로 변환해서 합산해요. 재산이 많으면 실제 소득이 낮아도 탈락할 수 있어요.</P>
      <P>금융재산 500만원까지는 기본 공제돼요. 부동산은 지역별 기본재산액을 제외한 금액을 환산해요. 생업용 자동차는 일부 제외돼요. 소득인정액 계산기로 미리 확인해볼 수 있어요.</P>
      <P>자격 기준은 가구원 수에 따라 달라져요. 1인 가구와 4인 가구의 기준 금액이 다르므로, 정확한 가구원 수를 기준으로 계산해야 해요.</P>

      <FormulaCard
        formula="소득인정액 = 소득평가액 + 재산의 소득환산액"
        note="예) 월 소득 80만원 + 재산 환산 30만원 = 소득인정액 110만원 (1인 가구 119만원 이하 → 해당)"
      />

      <CaseBox
        cases={[
          {
            name: "1인 가구 이씨",
            detail: "월 소득 70만원 · 금융재산 300만원",
            result: "소득인정액 약 80만원 (119만원 이하) → 차상위계층 해당",
          },
          {
            name: "4인 가구 김씨",
            detail: "월 소득 280만원 · 부동산 없음",
            result: "소득인정액 약 250만원 (306만원 이하) → 차상위계층 해당",
          },
          {
            name: "3인 가구 박씨",
            detail: "월 소득 200만원 · 재산 환산 70만원",
            result: "소득인정액 270만원 (252만원 초과) → 탈락 가능성",
          },
        ]}
      />

      <Info type="warn">
        자동차가 있으면 소득인정액이 올라가요. 배기량 2,000cc 이상 차량은 월 소득으로 환산되어 차상위계층 탈락 원인이 될 수 있어요.
      </Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="차상위계층 확인서 온라인 복지로 조회 방법은?" sub="복지로 신청 · 주민센터 방문 · 소요 기간" />
      <P>차상위계층 확인서 발급은 복지로(bokjiro.go.kr) 홈페이지나 앱에서 온라인 신청이 가능해요. 로그인 후 '서비스 신청 → 차상위계층 확인서'를 선택하면 돼요. 주민센터(행정복지센터) 방문 신청도 가능해요.</P>
      <P>신청 후 소득·재산 조사가 이루어져요. 금융기관 정보 조회와 자진 신고 내용을 바탕으로 결정해요. 결과는 신청일로부터 보통 30일 이내에 통보돼요.</P>
      <P>이미 발급받은 확인서는 복지로 앱에서 온라인으로 조회·출력할 수 있어요. 정부24(gov.kr)에서도 전자문서로 발급받아 관련 기관에 제출할 수 있어요. 발급 수수료는 없어요.</P>
      <P>자격 유지를 위해 소득·재산 변동이 생기면 즉시 신고해야 해요. 소득이 갑자기 늘어났는데 신고하지 않으면 지원 중단 및 과거 혜택 환수가 이루어질 수 있어요. 성실한 신고가 중요해요.</P>

      <SpokeLink
        num="02"
        title="한부모가족 지원금 자격"
        desc="한부모 가정의 차상위 추가 혜택 확인"
        href="/w/한부모가족-지원금-신청-자격"
      />

      <InlineLink
        icon="🧮"
        title="소득인정액 계산기"
        desc="차상위 자격 여부를 정확하게 계산"
        href="/w/소득인정액-계산기"
      />

      <ExtBtn href="https://www.bokjiro.go.kr" label="복지로 공식" text="차상위계층 확인서 신청 바로가기" />

      <Divider />

      {/* FAQ */}
      <FAQAccordion items={meta.faq} />
      <RelatedArticles
        items={[
          { title: "기초생활수급자 주거급여 2026", href: "/w/기초생활수급자-주거급여-2026" },
          { title: "기초생활수급자 교육급여", href: "/w/기초생활수급자-교육급여-신청" },
          { title: "한부모가족 지원금 자격", href: "/w/한부모가족-지원금-신청-자격" },
          { title: "장기요양보험 등급 판정", href: "/w/장기요양보험-등급-신청-방법" },
          { title: "장애인 복지카드 혜택", href: "/w/장애인-복지카드-발급-신청" },
        ]}
      />
      <PrevNext
        prev={{ title: "장기요양보험 등급 판정 기준", href: "/w/장기요양보험-등급-신청-방법" }}
        next={{ title: "한부모가족 지원금 자격", href: "/w/한부모가족-지원금-신청-자격" }}
      />
    </BlogLayout>
  );
}

export { meta };
