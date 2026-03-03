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
  title: "프리랜서 3.3% 원천징수 환급 계산 | 종합소득세 필요경비 단순경비율",
  description: "프리랜서 3.3% 원천징수로 낸 세금 중 일부를 돌려받을 수 있어요. 종합소득세 신고 시 단순경비율로 필요경비를 공제하면 대부분 환급이 발생해요. 실제 환급액 계산 방법을 알려드려요.",
  category: "세금",
  keywords: [
    "프리랜서 3.3% 원천징수 환급 계산",
    "프리랜서 종합소득세 신고 기간",
    "프리랜서 단순경비율 필요경비 공제",
    "프리랜서 3.3% 환급 받는 조건",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "프리랜서가 낸 3.3% 원천징수세는 종합소득세 신고 후 <strong>실제 세금과의 차액을 환급</strong>받아요.",
    "단순경비율(업종별 60~80%) 적용 시 과세표준이 낮아져 <strong>대부분 환급</strong>이 발생해요.",
    "종합소득세 신고 기한은 매년 5월이고, <strong>홈택스에서 직접 신고</strong>할 수 있어요.",
  ],
  sources: [
    { name: "국세청 종합소득세 신고 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2227&cntntsId=7654", date: "2026-02" },
  ],
  faq: [
    { q: "프리랜서 3.3% 원천징수 환급은 언제 받나요?", a: "매년 5월 종합소득세 신고 후 환급 결정이 나요. 신고 후 약 30일 이내에 환급금이 입금돼요. 신고를 안 하면 환급이 자동으로 되지 않으니 반드시 신고해야 해요." },
    { q: "프리랜서 3.3% 세금을 내지 않아도 종합소득세 신고를 해야 하나요?", a: "네, 원천징수 여부와 상관없이 연 소득이 있으면 종합소득세 신고를 해야 해요. 단, 연 소득이 2,000만원 이하면서 근로소득만 있는 경우는 예외예요. 프리랜서 사업소득은 무조건 신고 대상이에요." },
  ],
  ctaCard: {
    label: "환급 계산",
    mainText: "3.3% 원천징수 환급액 계산",
    subText: "연소득 입력하면 예상 환급액 확인",
    url: "/w/종합소득세-계산기",
    external: false,
  },
  relatedDocs: [
    { title: "종합소득세 신고 기간", url: "/w/종합소득세-신고기간" },
    { title: "단순경비율 업종별 조회", url: "/w/단순경비율-업종별" },
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

    const income = q1;       // "under1200" | "1200to2400" | "over2400"
    const deduction = q2;    // "standard" | "actual"
    const other = q3;        // "none" | "has_wage" | "has_other"
    const filed = q4;        // "yes" | "no"

    if (!filed || filed === "no") {
      const gridItems = [
        { label: "신고 여부", value: "미신고", ok: false },
        { label: "환급 가능 여부", value: "신고 후 가능", ok: false },
        { label: "신고 기한", value: "매년 5월 31일", ok: false },
        { label: "예상 환급", value: "신고 후 결정", ok: false },
      ];
      const links: ResLink[] = [
        { icon: "📋", title: "종합소득세 신고 기간", desc: "5월 신고 기한 및 방법 확인", href: "/w/종합소득세-신고기간" },
        { icon: "🧮", title: "종합소득세 계산기", desc: "예상 납부·환급액 미리 계산", href: "/w/종합소득세-계산기" },
      ];
      return (
        <ResultFail title="종합소득세 신고를 먼저 해야 해요">
          <ResultGrid items={gridItems} />
          <P>환급을 받으려면 매년 5월에 종합소득세 신고를 해야 해요. 신고하지 않으면 3.3% 원천징수한 세금이 자동으로 돌아오지 않아요.</P>
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultFail>
      );
    }

    // 소득 낮은 경우 — 대부분 환급
    if (income === "under1200") {
      const gridItems = [
        { label: "예상 환급 여부", value: "환급 가능성 높음", ok: true },
        { label: "단순경비율 적용", value: "60~80% 공제", ok: true },
        { label: "기납부세액", value: "3.3% 원천징수액", ok: true },
        { label: "신고 방법", value: "홈택스 간편 신고", ok: true },
      ];
      const links: ResLink[] = [
        { icon: "🧮", title: "종합소득세 계산기", desc: "실제 환급액 계산해 보기", href: "/w/종합소득세-계산기" },
        { icon: "📋", title: "홈택스 신고 방법", desc: "단계별 신고 가이드", href: "/w/종합소득세-신고기간" },
      ];
      return (
        <ResultPass title="환급 가능성이 높아요">
          <ResultGrid items={gridItems} />
          <P>연 소득 1,200만원 이하 프리랜서라면 단순경비율 적용 후 과세표준이 매우 낮아져요. 3.3% 원천징수로 낸 세금 대부분을 돌려받을 수 있어요.</P>
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultPass>
      );
    }

    // 소득 높은 경우 — 납부 가능성
    const gridItems = [
      { label: "예상 환급 여부", value: "납부 가능성 있음", ok: false },
      { label: "단순경비율 적용", value: "60~80% 공제 후 과세", ok: true },
      { label: "기납부세액", value: "3.3% 원천징수액", ok: true },
      { label: "신고 방법", value: "홈택스 일반 신고", ok: true },
    ];
    const links: ResLink[] = [
      { icon: "🧮", title: "종합소득세 계산기", desc: "정확한 납부·환급액 계산", href: "/w/종합소득세-계산기" },
      { icon: "📋", title: "단순경비율 업종별 조회", desc: "내 업종 경비율 확인", href: "/w/단순경비율-업종별" },
    ];
    return (
      <ResultPass title="신고 후 정확한 금액이 결정돼요">
        <ResultGrid items={gridItems} />
        <P>소득이 높을수록 세율이 올라가 3.3%보다 더 낼 수도 있어요. 단순경비율 외에 실제 경비를 공제하는 기준경비율 방식도 검토해보세요.</P>
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  const toc = [
    { t: "STEP 01 환급 가능 여부 확인" },
    { t: "프리랜서 3.3% 원천징수 환급 원리는 무엇인가요?", sub: "원천징수 개념 · 환급 발생 원리 · 신고 의무" },
    { t: "프리랜서 3.3% 종합소득세 신고 기간은 언제인가요?", sub: "5월 신고 기한 · 성실신고 확인자 · 납부 방법" },
    { t: "프리랜서 3.3% 단순경비율로 공제를 받으려면?", sub: "업종별 경비율 · 기준경비율 · 실제 공제 계산" },
    { t: "프리랜서 3.3% 환급 조건과 납부가 되는 경우는?", sub: "환급 vs 납부 판단 · 소득 구간별 세율 · 절세 팁" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      sidebar={
        <>
          <SidebarCTA
            items={[
              { icon: "🧮", label: "종합소득세 계산기", desc: "환급액 미리 계산", href: "/w/종합소득세-계산기", hot: true },
              { icon: "📋", label: "종합소득세 신고 기간", desc: "5월 마감일 확인", href: "/w/종합소득세-신고기간" },
              { icon: "📊", label: "단순경비율 업종별", desc: "내 업종 경비율 조회", href: "/w/단순경비율-업종별" },
            ]}
          />
          <SidebarDocs
            items={[
              { icon: "📄", label: "종합소득세 신고 방법", href: "/w/종합소득세-신고기간" },
              { icon: "📋", label: "단순경비율 업종별 조회", href: "/w/단순경비율-업종별" },
              { icon: "💰", label: "종합소득세 가산세", href: "/w/종합소득세-신고-안하면-가산세" },
              { icon: "🏢", label: "사업자등록 여부 판단", href: "/w/사업자등록-방법" },
              { icon: "📊", label: "간이과세자 기준 매출", href: "/w/부가가치세-간이과세자-기준-2026" },
            ]}
          />
          <SidebarCalc
            items={[
              { icon: "🧮", label: "종합소득세 계산기", href: "/w/종합소득세-계산기" },
              { icon: "📊", label: "부가가치세 계산기", href: "/w/부가가치세-계산기" },
              { icon: "💼", label: "4대보험 계산기", href: "/w/4대보험-계산기" },
              { icon: "📈", label: "연봉 실수령액 계산기", href: "/w/연봉-실수령액-계산기" },
              { icon: "🏠", label: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
            ]}
          />
        </>
      }
      disclaimer="이 글은 일반적인 세무 정보를 제공하며, 개인 상황에 따라 다를 수 있어요. 정확한 납부·환급액은 홈택스 신고 후 결정돼요."
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="s1" title="환급 가능 여부 확인" sub="소득·신고 여부 입력하면 즉시 판정" />
      <CheckerShell title="나는 환급을 받을 수 있나요?" result={getResult()}>
        <CheckerQ
          q="지난해 프리랜서 소득은 얼마인가요?"
          opts={[
            { label: "1,200만원 미만", value: "under1200" },
            { label: "1,200만~2,400만원", value: "1200to2400" },
            { label: "2,400만원 이상", value: "over2400" },
          ]}
          sel={sel.q1}
          onSel={(v) => setSel({ ...sel, q1: v })}
        />
        <CheckerQ
          q="경비 공제 방식은 어떻게 할 예정인가요?"
          opts={[
            { label: "단순경비율 (별도 영수증 없이)", value: "standard" },
            { label: "기준경비율 또는 실비 (영수증 보관)", value: "actual" },
          ]}
          sel={sel.q2}
          onSel={(v) => setSel({ ...sel, q2: v })}
        />
        <CheckerQ
          q="프리랜서 소득 외 다른 소득이 있나요?"
          opts={[
            { label: "없어요", value: "none" },
            { label: "근로소득 있어요 (직장+부업)", value: "has_wage" },
            { label: "다른 사업소득 있어요", value: "has_other" },
          ]}
          sel={sel.q3}
          onSel={(v) => setSel({ ...sel, q3: v })}
        />
        <CheckerQ
          q="지난해 종합소득세 신고를 했나요?"
          opts={[
            { label: "네, 5월에 신고했어요", value: "yes" },
            { label: "아니요, 안 했어요", value: "no" },
          ]}
          sel={sel.q4}
          onSel={(v) => setSel({ ...sel, q4: v })}
        />
      </CheckerShell>

      <BridgeCard
        text="3.3% 원천징수는 임시로 낸 세금이에요. 실제 세금은 5월 종합소득세 신고 후 확정돼요."
        href="/w/종합소득세-계산기"
        label="환급액 계산하기"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="프리랜서 3.3% 원천징수 환급 원리는 무엇인가요?" sub="원천징수 개념 · 환급 발생 원리 · 신고 의무" />
      <P>프리랜서가 거래처에서 돈을 받을 때 3.3%를 미리 뗀 금액을 받아요. 이 3.3%는 소득세 3%와 지방소득세 0.3%를 합친 금액이에요. 거래처가 대신 국세청에 납부하는 방식이에요.</P>
      <P>3.3%는 예납 성격이에요. 실제 내야 할 세금은 5월 종합소득세 신고 후 확정돼요. 실제 세금이 3.3%보다 적으면 차액을 돌려받고, 많으면 추가로 내야 해요. 대부분 프리랜서는 필요경비 공제 후 세금이 낮아져 환급을 받아요.</P>
      <P>종합소득세 신고는 의무예요. 3.3%를 이미 냈더라도 5월에 신고를 해야 해요. 신고를 안 하면 환급이 자동으로 안 되고, 오히려 가산세가 부과될 수 있어요.</P>
      <P>환급받을 계좌는 홈택스 신고 시 입력해요. 신고 후 국세청에서 심사를 거쳐 약 30일 이내에 입금돼요. 지방소득세 환급은 별도로 위택스에서 처리되는 경우도 있어요.</P>

      <InlineLink
        icon="📋"
        title="종합소득세 신고 기간"
        desc="5월 신고 기한과 홈택스 신고 방법 안내"
        href="/w/종합소득세-신고기간"
      />

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="프리랜서 3.3% 종합소득세 신고 기간은 언제인가요?" sub="5월 신고 기한 · 성실신고 확인자 · 납부 방법" />
      <P>종합소득세 신고 기간은 <B>매년 5월 1일부터 5월 31일까지</B>예요. 이 기간에 전년도 소득을 신고하고 납부 또는 환급을 받아요. 5월 31일이 공휴일이면 다음 영업일까지 연장돼요.</P>
      <P>홈택스(www.hometax.go.kr)에서 직접 신고할 수 있어요. '종합소득세 신고 → 모두채움·단순경비율 신고'를 선택하면 국세청이 미리 채운 데이터를 확인하고 수정만 하면 돼요. 대부분 프리랜서는 30분 이내로 끝낼 수 있어요.</P>
      <P>소득이 많거나 사업장이 여러 곳이면 세무사를 통해 신고하는 게 안전해요. 수임료는 보통 10만~30만원 사이예요. 환급액이 크면 세무사 비용을 내더라도 이득이 될 수 있어요.</P>
      <P>납부해야 하는 경우 신용카드, 계좌이체, 가상계좌 등으로 낼 수 있어요. 납부액이 크면 분납 신청도 가능해요. 기한을 넘기면 하루 0.022%씩 납부불성실 가산세가 붙으니 기한을 꼭 지켜요.</P>

      <SpokeLink
        num="01"
        title="종합소득세 신고 가산세"
        desc="무신고·납부불성실 가산세 계산 방법"
        href="/w/종합소득세-신고-안하면-가산세"
      />

      <RelatedMid
        cards={[
          { title: "종합소득세 계산기", desc: "예상 환급액 바로 계산", href: "/w/종합소득세-계산기" },
          { title: "간이과세자 기준 매출", desc: "사업 규모별 과세 유형 확인", href: "/w/부가가치세-간이과세자-기준-2026" },
          { title: "4대보험 계산기", desc: "프리랜서 보험료 계산", href: "/w/4대보험-계산기" },
        ]}
        hubHref="/w/세금"
        hubLabel="세금 허브 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="프리랜서 3.3% 단순경비율로 공제를 받으려면?" sub="업종별 경비율 · 기준경비율 · 실제 공제 계산" />
      <P>단순경비율은 국세청이 업종별로 정해놓은 경비 비율이에요. 실제 영수증 없이도 이 비율만큼 경비를 인정해 줘요. 예를 들어 IT 개발 프리랜서라면 경비율이 60~64% 수준이에요.</P>
      <P>단순경비율 적용 대상은 직전 연도 수입이 <B>업종별 기준금액 미만</B>인 경우예요. 업종에 따라 2,400만원~7,500만원이 기준이에요. 이 기준을 넘으면 기준경비율 방식을 써야 해요.</P>
      <P>기준경비율은 단순경비율보다 낮아요. 대신 실제 인건비, 임차료, 매입비용 등의 영수증을 별도로 공제할 수 있어요. 매입이 많은 업종이라면 기준경비율이 더 유리할 수 있어요.</P>
      <P>경비율이 높을수록 과세표준이 낮아지고 환급액이 커져요. 단, 단순경비율보다 실제 경비가 더 크다면 실제 장부를 작성하는 복식부기 방식이 유리해요. 이 경우는 세무사 도움이 필요해요.</P>

      <FormulaCard
        formula="환급액 = 원천징수 납부액 - 실제 납부세액"
        note="실제 납부세액 = (총수입 - 필요경비) × 소득세율 - 각종 공제액"
      />

      <CaseBox
        cases={[
          {
            name: "연 소득 800만원 이씨",
            detail: "IT 개발 · 단순경비율 64% 적용",
            result: "원천징수 26.4만원 납부 → 실제세금 약 0원 → 26.4만원 전액 환급",
          },
          {
            name: "연 소득 2,000만원 김씨",
            detail: "디자인 · 단순경비율 70% 적용",
            result: "원천징수 66만원 납부 → 실제세금 약 18만원 → 약 48만원 환급",
          },
          {
            name: "연 소득 5,000만원 박씨",
            detail: "컨설팅 · 기준경비율 20% 적용",
            result: "원천징수 165만원 납부 → 실제세금 약 280만원 → 약 115만원 추가 납부",
          },
        ]}
      />

      <Info type="warn">
        소득이 높아질수록 3.3%보다 실제 세율이 높아질 수 있어요. 연 소득 4,600만원 이상이면 세율이 24%라서 환급 대신 납부가 발생할 수 있어요.
      </Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="프리랜서 3.3% 환급 조건과 납부가 되는 경우는?" sub="환급 vs 납부 판단 · 소득 구간별 세율 · 절세 팁" />
      <P>환급이 발생하는 주된 이유는 단순경비율로 과세표준이 낮아지기 때문이에요. 연 소득 2,000만원 이하 프리랜서는 단순경비율 적용 후 세율이 6%~15%로 낮아져 3.3%보다 실제 세금이 적어요.</P>
      <P>반면 소득이 높으면 추가 납부가 발생할 수 있어요. 과세표준이 4,600만원을 넘으면 세율이 24%예요. 경비 공제를 최대한 해도 3.3%보다 실제 세금이 많아지는 구간이에요.</P>
      <P>인적공제, 연금보험료 공제, 교육비 공제 등 소득공제 항목을 잘 챙기면 세금을 줄일 수 있어요. 노란우산공제(소상공인 공제부금)에 가입하면 연간 최대 500만원까지 추가 공제를 받을 수 있어요.</P>
      <P>세금 신고를 처음 해보는 프리랜서라면 홈택스 '모두채움' 서비스를 활용해요. 국세청이 이미 수집한 소득 정보를 바탕으로 채워주는 서비스라 실수가 줄어요. 잘 모르겠으면 전화 상담(국세청 126)도 무료로 받을 수 있어요.</P>

      <SpokeLink
        num="02"
        title="소상공인 노란우산공제 가입"
        desc="프리랜서도 가입 가능한 절세 공제 상품"
        href="/w/소상공인-노란우산공제-가입"
      />

      <InlineLink
        icon="🧮"
        title="종합소득세 계산기"
        desc="소득 구간별 세금과 환급액 미리 계산"
        href="/w/종합소득세-계산기"
      />

      <ExtBtn href="https://www.hometax.go.kr" label="홈택스 공식" text="종합소득세 신고 바로가기" />

      <Divider />

      {/* FAQ */}
      <FAQAccordion items={meta.faq} />
      <RelatedArticles
        items={[
          { title: "종합소득세 신고 기간", href: "/w/종합소득세-신고기간" },
          { title: "종합소득세 무신고 가산세", href: "/w/종합소득세-신고-안하면-가산세" },
          { title: "간이과세자 기준 매출 2026", href: "/w/부가가치세-간이과세자-기준-2026" },
          { title: "노란우산공제 가입 방법", href: "/w/소상공인-노란우산공제-가입" },
          { title: "단순경비율 업종별 조회", href: "/w/단순경비율-업종별" },
        ]}
      />
      <PrevNext
        prev={{ title: "간이과세자 기준 매출 2026", href: "/w/부가가치세-간이과세자-기준-2026" }}
        next={{ title: "재산세 납부 기간 2026", href: "/w/재산세-납부-기간-2026" }}
      />
    </BlogLayout>
  );
}

export { meta };
