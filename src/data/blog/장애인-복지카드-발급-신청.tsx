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
  title: "장애인 복지카드 혜택 종류 | 교통 세금 감면 장애등급",
  description: "장애인 복지카드로 대중교통 할인부터 자동차세 감면까지 다양한 혜택을 받을 수 있어요. 중증장애인(1~2급)은 경증보다 더 큰 감면을 받아요. 2026년 장애등급별 혜택 종류를 정리했어요.",
  category: "복지",
  keywords: [
    "장애인 복지카드 혜택 종류",
    "장애인 복지카드 교통 감면 혜택",
    "장애인 복지카드 세금 감면 자동차",
    "장애인 복지카드 중증 경증 차이",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "장애인 복지카드는 장애인 등록 후 <strong>주민센터에서 무료 발급</strong>받을 수 있어요.",
    "대중교통 할인, 고속도로 50%, <strong>자동차세 감면</strong> 등 혜택이 다양해요.",
    "중증장애인은 자동차세 <strong>100% 면제</strong>, 경증은 50% 감면을 받아요.",
  ],
  sources: [
    { name: "보건복지부 장애인 복지 정책", url: "https://www.mohw.go.kr/menu.es?mid=a10705010000", date: "2026-02" },
  ],
  faq: [
    { q: "장애인 복지카드 혜택 중 교통 감면은 얼마나 되나요?", a: "도시철도(지하철)는 무료예요. KTX·새마을호는 중증 50% 할인, 경증 30% 할인이에요. 고속버스는 중증 50%, 경증 30% 할인이에요. 고속도로 통행료는 중증 50%, 경증 0%예요. 항공은 중증 항공 요금의 10~30% 할인이에요." },
    { q: "장애인 복지카드 자동차세 감면은 어떻게 신청하나요?", a: "장애인 본인 또는 생계를 같이하는 가족 명의의 차량 1대에 한해 자동차세 감면을 신청할 수 있어요. 주민센터 또는 자치단체 세무과에 장애인등록증과 자동차등록증을 지참하면 돼요. 중증은 100%, 경증은 50% 감면이에요." },
  ],
  ctaCard: {
    label: "혜택 확인",
    mainText: "장애인 복지카드 혜택 전체 보기",
    subText: "복지로에서 맞춤 혜택 조회",
    url: "https://www.bokjiro.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "차상위계층 확인서 조건 2026", url: "/w/차상위계층-확인서-발급" },
    { title: "한부모가족 지원금 자격 2026", url: "/w/한부모가족-지원금-신청-자격" },
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
        { icon: "📋", title: "장애인 등록 절차", desc: "장애 등록 신청 방법 안내", href: "https://www.mohw.go.kr" },
        { icon: "🏥", title: "장애인 진단 병원 찾기", desc: "등록 진단 가능 기관 조회", href: "https://www.bokjiro.go.kr" },
      ];
      return (
        <ResultFail title="장애인 등록이 필요해요">
          <ResultGrid items={[
            { label: "복지카드 발급 조건", value: "장애인 등록 완료 후 가능" },
            { label: "등록 신청처", value: "주민센터, 읍·면·동사무소" },
            { label: "필요 서류", value: "장애 진단서, 신분증" },
            { label: "처리 기간", value: "평균 1~3개월" },
          ]} />
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultFail>
      );
    }

    if (q2 === "severe") {
      const links: ResLink[] = [
        { icon: "🚇", title: "교통 감면 혜택", desc: "도시철도 무료 등 교통 혜택", href: "/w/장애인-교통-감면" },
        { icon: "🚗", title: "자동차세 100% 면제", desc: "중증 1대 자동차세 전액 감면", href: "/w/장애인-자동차세-감면" },
      ];
      return (
        <ResultPass title="중증장애인 복지카드 혜택 — 최대 수준 감면">
          <ResultGrid items={[
            { label: "도시철도(지하철)", value: "무료 이용" },
            { label: "KTX·새마을호", value: "50% 할인" },
            { label: "자동차세", value: "1대 100% 면제" },
            { label: "고속도로 통행료", value: "50% 할인" },
          ]} />
          {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
        </ResultPass>
      );
    }

    const links: ResLink[] = [
      { icon: "🚇", title: "경증 교통 감면 내역", desc: "KTX 30%, 고속버스 30% 할인", href: "/w/장애인-교통-감면" },
      { icon: "🚗", title: "자동차세 50% 감면", desc: "경증 장애인 차량세 감면 신청", href: "/w/장애인-자동차세-감면" },
    ];
    return (
      <ResultPass title="경증장애인 복지카드 혜택 — 50% 수준 감면">
        <ResultGrid items={[
          { label: "도시철도(지하철)", value: "무료 이용" },
          { label: "KTX·새마을호", value: "30% 할인" },
          { label: "자동차세", value: "1대 50% 감면" },
          { label: "고속도로 통행료", value: "해당 없음" },
        ]} />
        {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
      </ResultPass>
    );
  }

  const toc = [
    { id: "checker", label: "장애인 복지카드 혜택 빠른 확인" },
    { id: "s02", label: "혜택 종류는?", sub: "교통·세금·문화·통신 감면 항목" },
    { id: "s03", label: "교통 감면 혜택은?", sub: "지하철 무료 · KTX 할인 · 고속도로" },
    { id: "s04", label: "세금 감면은?", sub: "자동차세 · 취득세 · 자동차 개별소비세" },
    { id: "s05", label: "중증 경증 차이는?", sub: "1~2급(중증) vs 3~6급(경증) 비교" },
    { id: "faq", label: "자주 묻는 질문" },
  ];

  const sidebar = (
    <>
      <SidebarCTA
        items={[
          { label: "복지로 혜택 조회", desc: "장애인 맞춤 혜택 확인", href: "https://www.bokjiro.go.kr", hot: true },
          { label: "주민센터 카드 발급", desc: "방문 발급 안내", href: "https://www.gov.kr" },
          { label: "자동차세 감면 신청", desc: "세무과 감면 신청 안내", href: "https://www.gov.kr" },
        ]}
      />
      <SidebarDocs
        items={[
          { title: "차상위계층 확인서 조건", href: "/w/차상위계층-확인서-발급" },
          { title: "한부모가족 지원금 자격", href: "/w/한부모가족-지원금-신청-자격" },
          { title: "기초생활수급자 주거급여", href: "/w/기초생활수급자-주거급여-2026" },
          { title: "노인장기요양보험 등급 판정", href: "/w/장기요양보험-등급-신청-방법" },
          { title: "기초생활수급자 교육급여", href: "/w/기초생활수급자-교육급여-신청" },
        ]}
      />
      <SidebarCalc
        items={[
          { title: "자동차세 계산기", href: "/w/자동차세-계산기" },
          { title: "소득인정액 계산기", href: "/w/소득인정액-계산기" },
          { title: "중위소득 기준 계산", href: "/w/기준중위소득" },
          { title: "주거급여 계산기", href: "/w/주거급여-계산기" },
          { title: "교육급여 지원금 계산", href: "/w/교육급여-계산기" },
        ]}
      />
    </>
  );

  const disclaimer = "이 글은 2026년 2월 기준 보건복지부 장애인 복지 정책을 참고해 작성했어요. 혜택 내용 및 기준은 변경될 수 있으니 신청 전 주민센터 또는 복지로에서 최신 정보를 확인하세요.";

  return (
    <BlogLayout meta={meta} toc={<TOC items={toc} />} sidebar={sidebar} disclaimer={disclaimer}
      sourceBar={<>출처: <A href="https://www.mohw.go.kr/menu.es?mid=a10705010000">보건복지부 장애인 복지 정책</A> (2026-02)</>}
    >
      <Summary3 items={meta.summary} />

      <Sec id="checker" n="01" title="장애인 복지카드 혜택 빠른 확인" sub="등록 여부 · 장애등급 · 관심 혜택">
        <CheckerShell title="내 장애인 복지카드 혜택을 확인해 보세요" getResult={getResult} sel={sel}>
          <CheckerQ id="q1" q="장애인 등록이 되어 있나요?" options={[
            { v: "yes", label: "장애인 등록 완료" },
            { v: "no", label: "미등록 (등록 예정)" },
          ]} sel={sel.q1} setSel={(v) => setSel((p) => ({ ...p, q1: v }))} />
          <CheckerQ id="q2" q="장애 등급은 어떻게 되나요?" options={[
            { v: "severe", label: "중증(기존 1~2급 해당)" },
            { v: "mild", label: "경증(기존 3~6급 해당)" },
            { v: "unknown", label: "잘 모르겠어요" },
          ]} sel={sel.q2} setSel={(v) => setSel((p) => ({ ...p, q2: v }))} />
          <CheckerQ id="q3" q="가장 관심 있는 혜택은 무엇인가요?" options={[
            { v: "transport", label: "교통 할인 (대중교통, KTX)" },
            { v: "tax", label: "세금 감면 (자동차세, 취득세)" },
            { v: "culture", label: "문화·통신·의료 혜택" },
          ]} sel={sel.q3} setSel={(v) => setSel((p) => ({ ...p, q3: v }))} />
          <CheckerQ id="q4" q="자동차를 보유하고 있나요?" options={[
            { v: "yes", label: "보유 (자동차세 감면 필요)" },
            { v: "no", label: "미보유" },
          ]} sel={sel.q4} setSel={(v) => setSel((p) => ({ ...p, q4: v }))} />
        </CheckerShell>
      </Sec>

      <BridgeCard
        title="장애인 복지카드, 교통부터 세금까지 혜택이 다양해요"
        desc="등록만 하면 즉시 받을 수 있는 혜택이 많아요. 교통 할인, 자동차세 감면, 문화시설 할인 등 항목별로 정리했어요."
      />

      <Divider />

      <Sec id="s02" n="02" title="장애인 복지카드 혜택 종류는 어떻게 되나요?" sub="교통·세금·문화·통신 감면 항목">
        <P>장애인 복지카드를 발급받으면 <B>교통, 세금, 문화, 통신, 의료</B> 다섯 가지 분야에서 혜택을 받아요. 복지카드 하나로 거의 모든 공공 서비스에서 할인이 적용돼요.</P>
        <P>가장 많이 쓰는 혜택은 교통이에요. 지하철·도시철도는 전국 어디서나 무료예요. KTX와 새마을호는 중증 50%, 경증 30% 할인이에요. 고속버스도 마찬가지로 중증은 50% 할인이에요.</P>
        <P>세금 혜택도 상당해요. 자동차세는 중증이면 1대 전액 면제예요. 취득세도 면제 혜택이 있어요. 특히 본인 명의뿐 아니라 <B>동거 가족 명의 차량</B>도 대상이 될 수 있어요.</P>
        <P>문화시설은 국공립 박물관, 미술관, 공원이 무료예요. 통신 요금은 이동통신 기본료 면제나 50% 할인 혜택이 있어요. 의료비는 본인부담금이 경감되고, 재활 보조기구 지원도 받을 수 있어요.</P>
        <TableTitle>장애인 복지카드 혜택 분야별 주요 내용</TableTitle>
        <THL cols={["분야", "주요 혜택", "중증/경증"]} />
        <TH cols={["교통", "도시철도 무료, KTX 할인", "중증 50% / 경증 30%"]} />
        <TH cols={["세금", "자동차세·취득세 감면", "중증 100% / 경증 50%"]} />
        <TH cols={["문화", "국공립 시설 무료", "동일 적용"]} />
        <TH cols={["통신", "이동통신 요금 감면", "중증 우대"]} />
        <TableNote>※ 적용 혜택은 장애 유형·등급에 따라 다를 수 있어요</TableNote>
        <Info type="warn">복지카드 발급 전이라도 장애인 등록증으로 대부분 혜택을 받을 수 있어요. 복지카드는 발급 후 더 간편하게 혜택 적용이 가능해요.</Info>
      </Sec>

      <Divider />

      <Sec id="s03" n="03" title="장애인 복지카드 교통 감면 혜택은 얼마나 되나요?" sub="지하철 무료 · KTX 할인 · 고속도로">
        <P>대중교통 혜택 중 가장 큰 건 <B>도시철도(지하철) 무료</B>예요. 전국 모든 도시철도 노선에서 무료로 탈 수 있어요. 보호자 1명도 동반 시 중증장애인 기준으로 50% 할인이 돼요.</P>
        <P>KTX, 새마을호, 무궁화호는 중증 50%, 경증 30% 할인이에요. 단, 열차 할인은 최소 1일 전 예매 시에만 적용돼요. 당일 현장 발권은 할인율이 달라질 수 있어요.</P>
        <P>고속도로 통행료는 중증만 50% 할인이에요. 경증은 해당되지 않아요. 하이패스를 사용하면 자동으로 할인이 적용되고, 현금 납부 시에는 장애인등록증을 제시해야 해요.</P>
        <P>항공은 국내선 기준으로 중증 장애인이 동반자 포함해 할인 혜택을 받아요. 항공사마다 할인율이 달라서 예매 시 직접 확인이 필요해요. 보통 운임의 <B>10~30%</B> 수준이에요.</P>
        <TableTitle>장애인 복지카드 교통 할인 비교</TableTitle>
        <THL cols={["교통수단", "중증 할인율", "경증 할인율"]} />
        <TH cols={["도시철도(지하철)", "무료", "무료"]} />
        <TH cols={["KTX·새마을호", "50%", "30%"]} />
        <TH cols={["고속버스", "50%", "30%"]} />
        <TH cols={["고속도로 통행료", "50%", "해당 없음"]} />
        <TH cols={["국내선 항공", "10~30%", "일부 항공사"]} />
        <TableNote>※ 열차 예매는 1일 전 온라인 예약 시 할인 적용</TableNote>
        <InlineLink icon="🚇" title="코레일 장애인 할인 예매" desc="KTX·열차 장애인 할인 온라인 예매" href="https://www.letskorail.com" />
      </Sec>

      <RelatedMid
        hubHref="/w/복지급여"
        hubLabel="복지급여 허브 보기"
        items={[
          { title: "차상위계층 지원 혜택", href: "/w/차상위계층-확인서-발급" },
          { title: "노인장기요양보험 등급 판정", href: "/w/장기요양보험-등급-신청-방법" },
          { title: "기초생활수급자 주거급여", href: "/w/기초생활수급자-주거급여-2026" },
        ]}
      />

      <Divider />

      <Sec id="s04" n="04" title="장애인 복지카드 세금 감면 자동차 혜택은?" sub="자동차세 · 취득세 · 자동차 개별소비세">
        <P>장애인 본인 또는 동거 가족 명의 차량 <B>1대에 한해</B> 자동차세 감면 혜택을 받아요. 중증장애인은 100% 전액 면제, 경증은 50% 감면이에요.</P>
        <P>자동차를 새로 살 때 내는 취득세도 감면돼요. 중증장애인 본인 명의 차량은 취득세 전액 면제예요. 2,000cc 이하 비사업용 승용차, 승합차, 화물차가 대상이에요. 경증은 취득세 감면 혜택이 없어요.</P>
        <P>개별소비세(특소세)도 중증장애인은 500만원 한도로 면제돼요. 부가가치세도 동일하게 면제예요. 자동차 구입 시 이 혜택을 미리 받으려면 계약 전에 서류를 준비해야 해요.</P>
        <P>자동차세 감면 신청은 <B>주민센터 또는 자치단체 세무과</B>에 장애인등록증과 자동차등록증을 지참하면 돼요. 자동차세 납부 기간(6월, 12월) 전에 미리 신청하는 게 좋아요.</P>
        <FormulaCard formula="자동차세 감면액 = 연간 자동차세 × 감면율(중증 100%, 경증 50%)" note="예: 2,000cc 승용차 연 자동차세 약 52만원 → 중증 0원, 경증 약 26만원" />
        <CaseBox cases={[
          { label: "중증장애인 이씨 (2,000cc 승용차 보유)", result: "자동차세 연 52만원 → 100% 면제 = 0원 / 취득세도 전액 면제" },
          { label: "경증장애인 김씨 (1,600cc 승용차 보유)", result: "자동차세 연 29만원 → 50% 감면 = 약 14.5만원 납부 / 취득세 감면 없음" },
          { label: "장애 아동 박씨 가족 (부모 명의 차량)", result: "동거 가족 명의 차량도 1대 감면 가능 — 주민센터 확인 필수" },
        ]} />
        <Info type="tip">자동차세 감면 신청을 깜빡했다면 이미 낸 세금을 환급받을 수 있어요. 최근 5년 이내 납부분은 경정 청구로 돌려받을 수 있으니 세무과에 문의해 보세요.</Info>
        <InlineLink icon="🏛️" title="정부24 자동차세 감면 신청" desc="온라인 감면 신청 및 처리 현황" href="https://www.gov.kr" />
      </Sec>

      <Divider />

      <Sec id="s05" n="05" title="장애인 복지카드 중증 경증 혜택 차이는?" sub="1~2급(중증) vs 3~6급(경증) 비교">
        <P>2019년 7월부터 기존 1~6급 체계가 <B>중증·경증 2단계</B>로 바뀌었어요. 기존 1~2급은 중증, 3~6급은 경증에 해당해요. 일부 혜택은 세부 등급에 따라 차이가 있어요.</P>
        <P>중증과 경증의 가장 큰 차이는 교통과 세금이에요. 고속도로 통행료 50% 할인은 중증만 받아요. 자동차 취득세 면제도 중증만 해당해요. 항공 할인도 중증이 더 유리해요.</P>
        <P>반면 지하철 무료와 문화시설 무료는 중증·경증 모두 동일하게 받아요. 통신 요금 감면도 등급에 관계없이 받을 수 있어요. 국공립 공원, 박물관, 미술관 입장료도 무료예요.</P>
        <P>의료 혜택은 등급보다 <B>장애 유형</B>에 따라 달라져요. 시각장애인은 점자 자료 지원, 청각장애인은 수어통역 서비스 등 장애 특성에 맞는 혜택이 있어요. 복지로에서 장애 유형별 혜택을 확인할 수 있어요.</P>
        <TableTitle>중증 vs 경증 혜택 차이 비교</TableTitle>
        <THL cols={["혜택 항목", "중증(기존 1~2급)", "경증(기존 3~6급)"]} />
        <TH cols={["도시철도·지하철", "무료", "무료"]} />
        <TH cols={["고속도로 통행료", "50% 할인", "해당 없음"]} />
        <TH cols={["자동차세", "100% 면제", "50% 감면"]} />
        <TH cols={["취득세", "전액 면제", "해당 없음"]} />
        <TH cols={["국공립 문화시설", "무료", "무료"]} />
        <TableNote>※ 지역별, 시설별로 세부 적용 기준이 다를 수 있어요</TableNote>
        <SpokeLink num="01" title="차상위계층 지원 혜택 종류" desc="소득 50% 이하 가구 복지 혜택 정리" href="/w/차상위계층-확인서-발급" />
        <SpokeLink num="02" title="노인장기요양보험 등급 판정 기준" desc="요양 서비스 이용 등급별 혜택" href="/w/장기요양보험-등급-신청-방법" />

        <a href="https://www.bokjiro.go.kr" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-black">
          <span className="ext-btn-badge">복지로 공식</span>
          <span className="ext-btn-text">장애인 복지 혜택 전체 보기</span>
          <span className="ext-btn-cta">바로가기 →</span>
        </a>
      </Sec>

      <Divider />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "차상위계층 확인서 조건 2026", href: "/w/차상위계층-확인서-발급" },
        { title: "한부모가족 지원금 자격 2026", href: "/w/한부모가족-지원금-신청-자격" },
        { title: "노인장기요양보험 등급 판정 기준", href: "/w/장기요양보험-등급-신청-방법" },
        { title: "기초생활수급자 주거급여 2026", href: "/w/기초생활수급자-주거급여-2026" },
        { title: "기초생활수급자 교육급여 지원 금액", href: "/w/기초생활수급자-교육급여-신청" },
      ]} />

      <PrevNext
        prev={{ title: "한부모가족 지원금 자격 2026", href: "/w/한부모가족-지원금-신청-자격" }}
        next={{ title: "재산세 납부 기간 2026", href: "/w/재산세-납부-기간-2026" }}
      />
    </BlogLayout>
  );
}
