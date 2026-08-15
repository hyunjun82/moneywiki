// Q1. 부동산 계약했는데 상대방이 제3자에게 팔아버릴까 봐 불안한 상황 (소유권 확보 전)
// Q2. 처분금지가처분 신청을 직접 하거나 법무사에 의뢰해서 부동산 처분을 막을 수 있어야 함
// Q3. 피보전권리 필요, 담보금 부동산 가액 5%, 인지대 1만원, 관할 법원 제출, 7일 내 담보 납부
// Q4. GreenBox(핵심 요약) + Steps(신청 절차) + DocTable(필요 서류) + FAQ

"use client";
export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const STEPS_APPLY = [
  {
    title: "신청서 작성 + 소명자료 준비",
    desc: "당사자 정보, 목적 부동산 표시(소재지·지번·면적), 신청 취지, 신청 이유를 작성해요. 매매계약서, 등기부등본, 대금 지급 증빙 등 소명자료를 함께 준비하세요.",
    tip: "대법원 전자소송 사이트에서 양식을 내려받을 수 있죠",
    link: { label: "대법원 전자소송", href: "https://ecfs.scourt.go.kr" },
  },
  {
    title: "관할 법원에 제출 + 비용 납부",
    desc: "부동산 소재지 관할 지방법원에 제출해요. 본안 소송이 진행 중이면 그 법원에 내면 돼요. 인지대 1만원, 송달료(당사자 1명당 3회분), 등록면허세(채권금액의 0.2%), 수입증지 3,000원을 납부하세요.",
    tip: "전자소송으로 제출하면 인지대 10% 감면돼요",
  },
  {
    title: "법원 심리 (1~2주)",
    desc: "법원이 신청서와 소명자료를 검토해요. 피보전권리(소유권이전청구권 등)가 있는지, 보전의 필요성이 있는지를 판단해요. 심문 없이 서면으로 결정하는 경우가 많아요.",
    tip: "법원이 보정명령을 내리면 기한 내에 보정해야 해요",
  },
  {
    title: "담보제공명령 (7일 내 납부)",
    desc: "법원이 담보제공명령을 내리면 보통 7일 안에 납부해야 해요. 기한 넘기면 신청이 각하돼요. 현금공탁 또는 보증보험증권으로 납부할 수 있죠.",
    tip: "현금이 부족하면 보증보험으로 대체 가능해요. 보험료만 내면 돼요",
  },
  {
    title: "가처분 결정 + 등기 촉탁",
    desc: "담보를 내면 법원이 가처분 결정을 내리고, 등기소에 촉탁해서 등기부에 '처분금지가처분' 기재가 돼요. 이 순간부터 상대방의 처분행위가 제한돼요.",
    tip: "가처분 결정 후 본안 소송을 일정 기간 내에 제기해야 해요",
  },
];

const DOCS = [
  { name: "가처분신청서", required: true, where: "대법원 전자소송 사이트 양식" },
  { name: "부동산 등기부등본", required: true, where: "인터넷등기소 발급 (700원)" },
  { name: "매매계약서 또는 권리 증빙", required: true, where: "본인 보유" },
  { name: "대금 지급 증빙 (이체내역 등)", required: true, where: "은행 발급" },
  { name: "인감증명서 (신청인)", required: true, where: "주민센터 또는 정부24" },
  { name: "보증보험증권 (현금공탁 대체 시)", required: false, where: "보험사 또는 서울보증보험" },
];

const FAQS = [
  { q: "처분금지가처분 신청하면 무조건 되나요?", a: "아니에요. 피보전권리(소유권이전청구권 등)가 있어야 하고, 보전의 필요성을 소명해야 해요. 법원이 요건을 충족한다고 판단해야 결정이 나요." },
  { q: "담보금은 정확히 얼마예요?", a: "부동산 가액의 약 1/20(5%)이 기준이에요. 5억짜리 아파트면 약 2,500만원이에요. 다만 법원 재량으로 달라질 수 있죠." },
  { q: "담보금을 못 내면 어떻게 되나요?", a: "7일 내에 담보를 안 내면 신청이 각하돼요. 현금이 부족하면 보증보험을 이용하세요. 서울보증보험에서 지급보증위탁계약을 체결하면 보험료만 내고 보증서를 제출할 수 있죠." },
  { q: "가처분이 걸리면 부동산 매매가 완전히 불가능한가요?", a: "법적으로 매매 자체가 불가능한 건 아니에요. 하지만 가처분 이후 처분행위는 본안 소송에서 채권자가 이기면 무효가 될 수 있어서 사실상 거래가 막혀요." },
  { q: "가압류랑 처분금지가처분은 뭐가 다른가요?", a: "가압류는 돈을 받기 위해 재산을 잡아두는 거고, 처분금지가처분은 그 부동산 자체의 소유권을 확보하려는 거예요. 목적이 달라요." },
  { q: "가처분 전에 이미 설정된 근저당은 어떻게 되나요?", a: "가처분 이전에 이미 설정된 근저당권이나 전세권은 영향을 받지 않아요. 가처분은 결정 이후의 처분행위만 제한하는 거예요." },
  { q: "본안 소송은 언제까지 제기해야 하나요?", a: "가처분 결정 후 법원이 정한 기간(보통 2주~1개월) 안에 본안 소송을 제기해야 해요. 안 하면 상대방이 가처분 취소를 신청할 수 있죠." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "민사집행법 제300조", url: "https://www.law.go.kr/법령/민사집행법" },
      { label: "찾기쉬운 생활법령정보 - 부동산처분금지가처분", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=295&ccfNo=3&cciNo=1&cnpClsNo=1" },
      { label: "대법원 전자소송", url: "https://ecfs.scourt.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "가압류-처분금지가처분-경매-효력", title: "가압류·가처분 경매 효력", description: "경매에서 가압류와 가처분의 효력 차이를 정리했어요." },
  { slug: "가압류-신청-인지대-금액", title: "가압류 신청 방법", description: "가압류 신청 절차와 비용을 안내해요." },
  { slug: "부동산-경매-가압류-인수-여부", title: "경매 가압류 인수 여부", description: "낙찰받을 때 가압류 인수 기준이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>법률 · 가처분 · 부동산 보전</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        처분금지가처분, 신청 조건은?<br />
        담보금 기준과 절차 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부동산 대금을 다 줬는데 등기이전을 안 해줘요. 그 사이에 제3자한테 팔아버리면 어쩌죠?
        처분금지가처분을 신청하면 상대방이 부동산을 함부로 처분하는 걸 막을 수 있죠.
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법</a> 제300조에 근거한 제도인데, 쉽게 말하면 "이 부동산 손대지 마"라고 법원이 명령하는 거예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1: 개념 + 핵심 요약 ── */}
      <H2>처분금지가처분이 정확히 뭔가요?</H2>
      <p style={body}>
        소송 중에 상대방이 부동산을 팔거나 담보로 잡히면, 이겨도 소용없잖아요. 그래서 미리 손을 묶어두는 거예요.
        등기부등본에 "처분금지가처분"이 기재되면 사실상 거래가 막혀요.
        법적으로 매매 자체가 불가능한 건 아니지만, 가처분 이후 처분행위는 나중에 무효가 될 수 있어서 아무도 안 사요.
      </p>
      <p style={body}>
        <a href="/w/가압류-신청-인지대-금액" style={{ color: "#1D9E75", textDecoration: "underline" }}>가압류</a>랑 헷갈리기 쉬운데,
        가압류는 돈(금전채권)을 받기 위해 재산을 잡아두는 거고, 처분금지가처분은 부동산 자체의 소유권을 확보하려는 거예요.
      </p>

      <GreenBox title="가처분 핵심 요약">
        <strong>신청 조건</strong>: 피보전권리(소유권이전청구권 등) + 보전의 필요성<br />
        <strong>담보금</strong>: 부동산 가액의 약 5% (보증보험 대체 가능)<br />
        <strong>비용</strong>: 인지대 1만원 + 송달료 + 등록면허세(0.2%) + 수입증지 3천원<br />
        <strong>소요 기간</strong>: 신청 후 1~2주 내 결정
      </GreenBox>

      <Divider />

      {/* ── 섹션 2: 신청 절차 ── */}
      <H2>신청은 어떤 순서로 하나요?</H2>
      <p style={body}>
        관할 법원(부동산 소재지 지방법원)에 신청서를 제출하면 돼요.
        <a href="https://ecfs.scourt.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>대법원 전자소송</a>으로도 접수할 수 있죠. 전자소송으로 하면 인지대 10% 감면 혜택이 있죠.
        핵심은 담보제공명령이 나오면 7일 안에 담보를 내야 한다는 거예요. 넘기면 각하돼요.
      </p>

      <SectionBadge>처분금지가처분 5단계 절차</SectionBadge>
      <Steps steps={STEPS_APPLY} />

      <RelatedArticles items={RELATED} />

      <Divider />
      <ArticleAd position="mid" />

      {/* ── 섹션 3: 필요 서류 ── */}
      <H2>어떤 서류를 준비해야 하나요?</H2>
      <p style={body}>
        신청서와 함께 권리 관계를 소명할 수 있는 자료를 제출해야 해요.
        매매계약서, 대금 지급 증빙(계좌이체 내역), 등기부등본이 기본이에요.
        법무사에 의뢰하면 서류 준비부터 접수까지 대행해줘요.
      </p>

      <SectionBadge>신청 시 필요 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* ── 섹션 4: 담보금 상세 ── */}
      <H2>담보금은 얼마나 준비해야 하나요?</H2>
      <p style={body}>
        담보금은 부동산 가액의 약 1/20(5%)이 기준이에요. 예를 들어 5억짜리 아파트면 약 2,500만원이에요.
        <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=295&ccfNo=3&cciNo=1&cnpClsNo=1" style={{ color: "#1D9E75", textDecoration: "underline" }}>찾기쉬운 생활법령정보</a>에 따르면
        법원 재량으로 금액이 달라질 수 있죠.
      </p>
      <p style={body}>
        현금이 부담되면 보증보험을 이용하세요. 서울보증보험에서 지급보증위탁계약을 체결하면 보험료만 내고 보증서를 제출할 수 있죠.
        보험료는 담보금의 2~5% 수준이라서 현금 부담이 크게 줄어들어요.
      </p>

      <BorderBox title="비용 정리">
        인지대: 10,000원 (전자소송 시 9,000원)<br />
        송달료: 당사자 1명당 3회분<br />
        등록면허세: 채권금액의 0.2%<br />
        수입증지: 3,000원<br />
        담보금: 부동산 가액의 약 5% (보증보험 대체 시 보험료만)
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 법령과 공식 자료를 바탕으로 작성됐어요. 구체적인 사안은 법률 전문가의 상담을 받으세요." />
    </ArticleLayout>
  );
}
