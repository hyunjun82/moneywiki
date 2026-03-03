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
  title: "한부모가족 지원금 자격 2026 | 양육비 아동 지원 금액",
  description: "한부모가족이라면 기준 중위소득 63% 이하일 때 아동 1인당 월 21만원 양육비를 받을 수 있어요. 청소년 한부모는 월 35만원으로 더 많이 지원돼요. 2026년 자격 기준과 지원 금액을 정리했어요.",
  category: "복지",
  keywords: [
    "한부모가족 지원금 자격 기준",
    "한부모가족 양육비 지원 금액 2026",
    "한부모가족 지원금 신청 서류 절차",
    "한부모가족 중위소득 소득인정액 계산",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "2026년 한부모가족 선정 기준은 기준 중위소득 <strong>63% 이하</strong>예요.",
    "아동 1인당 <strong>월 21만원</strong>(청소년 한부모는 월 35만원)을 지원받아요.",
    "주민센터 또는 복지로에서 <strong>연중 상시 신청</strong>이 가능해요.",
  ],
  sources: [
    { name: "여성가족부 한부모가족 지원", url: "https://www.mogef.go.kr/sp/family/sp_family_f001.do", date: "2026-02" },
  ],
  faq: [
    { q: "한부모가족 지원금 자격이 되는 소득 기준은 얼마인가요?", a: "2026년 기준 기준 중위소득 63% 이하예요. 4인 가구 기준 월 소득인정액 약 361만원 이하면 돼요. 소득인정액은 실제 소득에 재산 소득환산액을 더해서 계산해요." },
    { q: "한부모가족 지원금은 어디서 얼마나 받을 수 있나요?", a: "아동 1인당 월 21만원을 양육비로 지원받아요. 만 24세 이하 청소년 한부모는 월 35만원이에요. 아동 학용품비(연 8만8천원), 생활보조금 등 추가 지원도 있어요." },
  ],
  ctaCard: {
    label: "복지로 신청",
    mainText: "한부모가족 지원금 온라인 신청",
    subText: "복지로에서 즉시 신청 가능",
    url: "https://www.bokjiro.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "기초생활수급자 주거급여 2026", url: "/w/기초생활수급자-주거급여-2026" },
    { title: "차상위계층 확인서 조건 2026", url: "/w/차상위계층-확인서-발급" },
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

    if (q1 === "no") {
      const links: ResLink[] = [
        { icon: "📋", title: "차상위계층 지원", desc: "소득 50% 이하 복지 혜택", href: "/w/차상위계층-확인서-발급" },
        { icon: "🏠", title: "주거급여 신청", desc: "주거비 지원 확인", href: "/w/기초생활수급자-주거급여-2026" },
      ];
      return (
        <ResultFail title="한부모가족 지원금 대상이 아니에요">
          <ResultGrid items={[
            { label: "지원 대상", value: "모자·부자·조손 가족" },
            { label: "자녀 조건", value: "만 18세 미만" },
            { label: "대안", value: "긴급복지 지원 확인" },
            { label: "문의", value: "주민센터 복지 담당" },
          ]} />
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultFail>
      );
    }

    if (q2 === "over63") {
      const links: ResLink[] = [
        { icon: "💰", title: "소득인정액 계산", desc: "정확한 소득 기준 확인", href: "/w/기초생활수급자-소득인정액" },
        { icon: "🧒", title: "아동수당 확인", desc: "8세 미만 아동 월 10만원", href: "/w/아동수당" },
      ];
      return (
        <ResultFail title="소득 기준 초과로 일반 한부모가족 지원이 어려워요">
          <ResultGrid items={[
            { label: "현재 소득", value: "중위소득 63% 초과" },
            { label: "일반 지원", value: "해당 없음" },
            { label: "확인 방법", value: "소득인정액 재산 계산" },
            { label: "대안", value: "아이돌봄 서비스 확인" },
          ]} />
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultFail>
      );
    }

    const isYoung = q3 === "young";
    const monthlyAmt = isYoung ? "35만원" : "21만원";
    const links: ResLink[] = [
      { icon: "📝", title: "복지로 온라인 신청", desc: "한부모가족 지원 바로 신청", href: "https://www.bokjiro.go.kr" },
      { icon: "📋", title: "추가 지원 확인", desc: "주거·의료·교육 지원 목록", href: "/w/차상위계층-확인서-발급" },
    ];

    return (
      <ResultPass title={`한부모가족 지원금 대상이에요 — 월 ${monthlyAmt}`}>
        <ResultGrid items={[
          { label: "월 양육비", value: isYoung ? "35만원 (청소년 한부모)" : "21만원 (아동 1인)" },
          { label: "아동 학용품비", value: "연 8만8천원" },
          { label: "신청처", value: "주민센터 또는 복지로" },
          { label: "서류", value: "가족관계증명서, 소득·재산 확인서" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  const toc = [
    { id: "checker", label: "한부모가족 지원금 자격 빠른 확인" },
    { id: "s02", label: "자격 기준은?", sub: "선정 기준 · 소득인정액 판단" },
    { id: "s03", label: "양육비는 얼마?", sub: "아동 양육비 · 청소년 한부모 지원" },
    { id: "s04", label: "신청 서류는?", sub: "필수 서류 목록 · 신청 방법" },
    { id: "s05", label: "소득인정액 계산?", sub: "소득평가액 · 재산 환산 공식" },
    { id: "faq", label: "자주 묻는 질문" },
  ];

  const sidebar = (
    <>
      <SidebarCTA
        items={[
          { label: "복지로 신청", desc: "온라인 지원 신청", href: "https://www.bokjiro.go.kr", hot: true },
          { label: "주민센터 방문", desc: "오프라인 신청 안내", href: "https://www.gov.kr" },
          { label: "지원금 확인", desc: "내 자격 여부 조회", href: "https://www.bokjiro.go.kr" },
        ]}
      />
      <SidebarDocs
        items={[
          { title: "차상위계층 확인서 조건", href: "/w/차상위계층-확인서-발급" },
          { title: "기초생활수급자 주거급여", href: "/w/기초생활수급자-주거급여-2026" },
          { title: "기초생활수급자 교육급여", href: "/w/기초생활수급자-교육급여-신청" },
          { title: "아동수당 신청 방법", href: "/w/아동수당" },
          { title: "긴급복지 지원 대상", href: "/w/긴급복지지원" },
        ]}
      />
      <SidebarCalc
        items={[
          { title: "소득인정액 계산기", href: "/w/소득인정액-계산기" },
          { title: "중위소득 기준 계산", href: "/w/기준중위소득" },
          { title: "아동수당 지원 계산", href: "/w/아동수당-계산기" },
          { title: "주거급여 계산기", href: "/w/주거급여-계산기" },
          { title: "교육급여 지원금 계산", href: "/w/교육급여-계산기" },
        ]}
      />
    </>
  );

  const disclaimer = "이 글은 2026년 2월 기준 여성가족부 한부모가족 지원 정책을 참고해 작성했어요. 지원 금액 및 기준은 변경될 수 있으니 신청 전 주민센터 또는 복지로에서 최신 정보를 확인하세요.";

  return (
    <BlogLayout meta={meta} toc={<TOC items={toc} />} sidebar={sidebar} disclaimer={disclaimer}
      sourceBar={<>출처: <A href="https://www.mogef.go.kr/sp/family/sp_family_f001.do">여성가족부 한부모가족 지원</A> (2026-02)</>}
    >
      <Summary3 items={meta.summary} />

      <Sec id="checker" n="01" title="한부모가족 지원금 자격 빠른 확인" sub="가구 유형 · 소득 기준 · 자녀 나이">
        <CheckerShell title="한부모가족 지원금 대상인지 확인해 보세요" getResult={getResult} sel={sel}>
          <CheckerQ id="q1" q="가구 유형이 어떻게 되나요?" options={[
            { v: "yes", label: "한부모가족(모자·부자·조손)" },
            { v: "no", label: "해당 없음" },
          ]} sel={sel.q1} setSel={(v) => setSel((p) => ({ ...p, q1: v }))} />
          <CheckerQ id="q2" q="소득 수준은 기준 중위소득 몇 % 정도인가요?" options={[
            { v: "under63", label: "63% 이하 (해당될 것 같아요)" },
            { v: "over63", label: "63% 초과" },
            { v: "unknown", label: "잘 모르겠어요" },
          ]} sel={sel.q2} setSel={(v) => setSel((p) => ({ ...p, q2: v }))} />
          <CheckerQ id="q3" q="청소년 한부모(만 24세 이하) 해당 여부는?" options={[
            { v: "young", label: "해당 (만 24세 이하)" },
            { v: "no", label: "해당 없음" },
          ]} sel={sel.q3} setSel={(v) => setSel((p) => ({ ...p, q3: v }))} />
          <CheckerQ id="q4" q="자녀 나이는 어떻게 되나요?" options={[
            { v: "under18", label: "만 18세 미만" },
            { v: "student22", label: "만 18~22세 (취학 중)" },
            { v: "over22", label: "만 22세 이상" },
          ]} sel={sel.q4} setSel={(v) => setSel((p) => ({ ...p, q4: v }))} />
        </CheckerShell>
      </Sec>

      <BridgeCard
        title="한부모가족 지원금, 조건 맞으면 바로 신청 가능해요"
        desc="소득인정액이 중위소득 63% 이하라면 매월 양육비를 받을 수 있어요. 아래에서 자격 기준과 지원 금액을 자세히 확인해 보세요."
      />

      <Divider />

      <Sec id="s02" n="02" title="한부모가족 지원금 자격 기준은 어떻게 되나요?" sub="선정 기준 · 소득인정액 판단">
        <P>한부모가족 지원금을 받으려면 <B>기준 중위소득 63% 이하</B>여야 해요. 2026년 기준으로 4인 가구는 월 소득인정액 361만원 이하가 기준이에요. 1인 가구는 약 140만원 이하예요.</P>
        <P>가구 유형은 모자가족(어머니 + 자녀), 부자가족(아버지 + 자녀), 조손가족(조부모 + 손자녀) 세 가지예요. 이혼, 사별, 미혼 등 사유는 따지지 않아요. <B>만 18세 미만 자녀</B>가 있어야 해요.</P>
        <P>소득인정액은 단순히 월급만 보는 게 아니에요. 금융재산, 부동산, 자동차 등 재산도 소득으로 환산해요. 그래서 실제 소득이 낮아도 재산이 많으면 탈락할 수 있어요.</P>
        <P>청소년 한부모(만 24세 이하)는 기준이 더 완화돼요. <B>기준 중위소득 72% 이하</B>까지 지원받을 수 있어요. 지원 금액도 일반 한부모보다 더 많아요.</P>
        <TableTitle>2026년 한부모가족 소득 기준 (중위소득 63%)</TableTitle>
        <THL cols={["가구원 수", "월 소득인정액 기준", "연소득 기준"]} />
        <TH cols={["1인", "약 140만원 이하", "약 1,680만원"]} />
        <TH cols={["2인", "약 231만원 이하", "약 2,772만원"]} />
        <TH cols={["3인", "약 296만원 이하", "약 3,552만원"]} />
        <TH cols={["4인", "약 361만원 이하", "약 4,332만원"]} />
        <TableNote>※ 소득인정액 = 실제 소득 + 재산 소득환산액으로 계산 (복지로 계산기 활용 권장)</TableNote>
        <Info type="warn">만 22세 미만이더라도 고등학교나 대학교에 재학 중이면 지원 대상이 될 수 있어요. 취학 여부를 반드시 주민센터에 문의해 보세요.</Info>
      </Sec>

      <Divider />

      <Sec id="s03" n="03" title="한부모가족 지원금 양육비는 얼마나 받나요?" sub="아동 양육비 · 청소년 한부모 지원">
        <P>가장 기본이 되는 지원은 <B>아동 양육비</B>예요. 자녀 1인당 매월 21만원을 지급해요. 자녀가 2명이면 42만원이에요. 이 돈은 카드나 계좌로 받을 수 있어요.</P>
        <P>청소년 한부모(만 24세 이하 부모)는 <B>아동 양육비 월 35만원</B>을 받아요. 여기에 자립지원 촉진수당 월 10만원이 추가돼요. 학업 중인 경우 검정고시 학습비 등도 지원받을 수 있어요.</P>
        <P>양육비 외에도 다양한 지원이 있어요. 아동 학용품비는 연 8만8천원이에요. 생활보조금 월 5만원, 중학생 학용품비 연 8만8천원도 있어요. 주거 지원이나 의료비도 별도로 신청할 수 있어요.</P>
        <P>지원금은 복지로 계좌이체로 매월 지급돼요. 자녀 나이가 만 18세가 되는 달까지 받을 수 있어요. 학교 재학 중이면 만 22세 미만까지 연장돼요.</P>
        <TableTitle>2026년 한부모가족 주요 지원 금액</TableTitle>
        <THL cols={["지원 항목", "일반 한부모", "청소년 한부모"]} />
        <TH cols={["아동 양육비 (1인)", "월 21만원", "월 35만원"]} />
        <TH cols={["아동 학용품비", "연 8만8천원", "연 8만8천원"]} />
        <TH cols={["자립지원 촉진수당", "—", "월 10만원"]} />
        <TH cols={["생활보조금", "월 5만원", "월 5만원"]} />
        <TableNote>※ 복지급여와 중복 수령 가능 여부는 담당자에게 문의 필요</TableNote>
        <FormulaCard formula="연간 수령액 = (월 양육비 × 12) + 학용품비 + 생활보조금 × 12" note="예: 일반 한부모, 자녀 1명 → (21만 × 12) + 8.8만 + (5만 × 12) = 연 320.8만원" />
        <CaseBox cases={[
          { label: "모자가구 이씨 (자녀 1명, 청소년 한부모)", result: "아동 양육비 월 35만 + 자립지원 10만 + 생활보조금 5만 = 월 50만원" },
          { label: "부자가구 김씨 (자녀 2명, 일반 한부모)", result: "아동 양육비 21만 × 2 + 생활보조금 5만 = 월 47만원 + 학용품비 연 17.6만원" },
          { label: "조손가구 박씨 (손자녀 1명, 학교 재학 중)", result: "아동 양육비 월 21만 + 학용품비 8.8만/년 → 고등학생은 만 22세까지 유지" },
        ]} />
      </Sec>

      <RelatedMid
        hubHref="/w/복지급여"
        hubLabel="복지급여 허브 보기"
        items={[
          { title: "기초생활수급자 주거급여", href: "/w/기초생활수급자-주거급여-2026" },
          { title: "차상위계층 지원 혜택", href: "/w/차상위계층-확인서-발급" },
          { title: "긴급복지 지원 대상", href: "/w/긴급복지지원" },
        ]}
      />

      <Divider />

      <Sec id="s04" n="04" title="한부모가족 지원금 신청 서류와 절차는?" sub="필수 서류 목록 · 신청 방법">
        <P>한부모가족 지원금 신청은 <B>주민센터 방문</B> 또는 <B>복지로 온라인</B>으로 할 수 있어요. 연중 상시 신청이 가능해요. 지원이 시작되면 매월 지급돼요.</P>
        <P>신청 시 가족관계증명서가 가장 중요해요. 최근 3개월 이내 발급 서류여야 해요. 이혼의 경우 이혼 확인 서류(재판 이혼은 판결문)도 함께 제출해요. 미혼모·부는 출생증명서나 인지 서류가 필요해요.</P>
        <P>소득·재산 확인을 위해 건강보험료 납부 확인서나 근로소득 증명서를 준비해야 해요. 주택 임대차계약서, 금융거래 확인서도 필요할 수 있어요. 주민센터 담당자가 안내해주니 미리 전화로 확인하면 편해요.</P>
        <P>신청 후 처리 기간은 보통 <B>30일 이내</B>예요. 자격 확인과 소득·재산 조사가 완료되면 승인 통보가 와요. 승인 후 익월부터 지급이 시작돼요. 매년 자격 유지 확인을 해야 해요.</P>
        <InlineLink icon="🏛️" title="복지로 한부모가족 지원 신청" desc="온라인으로 간편하게 신청 가능해요" href="https://www.bokjiro.go.kr" />
        <TableTitle>한부모가족 지원금 신청 서류 목록</TableTitle>
        <THL cols={["서류 종류", "발급처", "비고"]} />
        <TH cols={["가족관계증명서", "정부24·주민센터", "3개월 이내 발급"]} />
        <TH cols={["주민등록등본", "정부24·주민센터", "현재 주소 기준"]} />
        <TH cols={["소득 확인 서류", "건강보험공단·직장", "최근 3개월 급여명세서"]} />
        <TH cols={["재산 확인 서류", "금융기관·등기소", "금융자산·부동산"]} />
        <TH cols={["이혼·사별 확인 서류", "법원·주민센터", "이혼 사유별 서류 다름"]} />
        <TableNote>※ 미혼 한부모는 출생증명서 또는 인지 관련 서류 추가 필요</TableNote>
      </Sec>

      <Divider />

      <Sec id="s05" n="05" title="한부모가족 지원금 중위소득 소득인정액 계산은?" sub="소득평가액 · 재산 환산 공식">
        <P>소득인정액이 얼마인지 직접 계산해볼 수 있어요. 실제 소득에 재산을 소득으로 환산한 금액을 더하면 돼요. 복잡해 보여도 공식은 단순해요.</P>
        <P>소득평가액은 근로소득, 사업소득, 재산소득, 공적이전소득을 합산해요. 여기서 근로·사업소득 30%를 공제하고 실비 변상적 급여도 제외해요. 4대 보험 본인 부담금 등은 공제돼요.</P>
        <P>재산 소득환산은 일반재산(주택, 토지 등)에서 기본재산액을 뺀 후 연 4%로 환산해요. 금융재산은 연 6.26%, 자동차는 월 100%로 환산해요. 그래서 비싼 차를 가지고 있으면 소득인정액이 크게 올라가요.</P>
        <P>복잡하다면 <B>복지로 모의 계산기</B>를 써보세요. 주소, 소득, 재산 정보만 입력하면 바로 계산돼요. 주민센터에서도 무료로 계산해줘요.</P>
        <FormulaCard formula="소득인정액 = 소득평가액 + 재산의 소득환산액" note="소득평가액 = 실제 소득 - 근로공제(30%) / 재산 환산 = (일반재산 - 기본재산액) × 연 4% / 12" />
        <Info type="tip">소득인정액 계산 시 자동차 가액을 빠뜨리는 경우가 많아요. 차가 있다면 차량 가액도 입력해서 정확히 계산해 보세요. 특히 연식이 짧은 차는 가액이 높게 잡혀요.</Info>
        <InlineLink icon="🧮" title="복지로 모의 계산기" desc="소득인정액 온라인 계산 서비스" href="https://www.bokjiro.go.kr" />
        <SpokeLink num="01" title="기준 중위소득 계산 방법" desc="중위소득 기준과 계산법 전체 정리" href="/w/기준중위소득" />
        <SpokeLink num="02" title="기초생활수급자 소득인정액" desc="소득인정액 계산법 상세 안내" href="/w/기초생활수급자-소득인정액" />

        <a href="https://www.bokjiro.go.kr" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-black">
          <span className="ext-btn-badge">복지로 공식</span>
          <span className="ext-btn-text">한부모가족 지원 신청</span>
          <span className="ext-btn-cta">바로가기 →</span>
        </a>
      </Sec>

      <Divider />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "차상위계층 확인서 조건 2026", href: "/w/차상위계층-확인서-발급" },
        { title: "기초생활수급자 주거급여 2026", href: "/w/기초생활수급자-주거급여-2026" },
        { title: "기초생활수급자 교육급여 지원 금액", href: "/w/기초생활수급자-교육급여-신청" },
        { title: "소상공인 노란우산공제 가입 조건", href: "/w/소상공인-노란우산공제-가입" },
        { title: "취업후상환 학자금대출 의무 상환", href: "/w/취업후상환-학자금대출-상환" },
      ]} />

      <PrevNext
        prev={{ title: "차상위계층 확인서 조건 2026", href: "/w/차상위계층-확인서-발급" }}
        next={{ title: "장애인 복지카드 혜택 종류", href: "/w/장애인-복지카드-발급-신청" }}
      />
    </BlogLayout>
  );
}
