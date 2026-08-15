"use client";
// Q1. 부당해고를 당했는데 변호사·노무사 비용이 부담돼서 포기하려는 상황이에요.
// Q2. 무료 법률지원 기관(고용노동부·법률구조공단·근로복지공단)에 연락해서 상담을 시작하는 행동.
// Q3. 기관별 지원 범위(상담~소송), 소득 기준(420만원 이하), 신청 방법, 구제신청 무료, 백페이 계산.
// Q4. GreenBox(핵심) + Steps(이용 절차) + DocTable(준비서류) + BorderBox(기관 비교) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const SUPPORT_STEPS = [
  { title: "고용노동부 1350에 전화", desc: "평일 9시~18시, 부당해고 상담을 요청하면 즉시 법률 상담을 받을 수 있어요. 소득 제한 없이 누구나 무료예요.", tip: "복잡한 경우 지방고용노동청 방문 상담도 예약해줘요." },
  { title: "대한법률구조공단에 신청 (소송 필요 시)", desc: "132번 전화 또는 klac.or.kr에서 신청해요. 월 소득 420만원 이하면 변호사 비용 전액 무료예요.", tip: "승소 시 받은 금액의 10%만 성공보수로 내요. 패소하면 비용 없어요." },
  { title: "근로복지공단 무료 노무사 상담", desc: "kcomwel.or.kr에서 온라인 예약하면 3일 내 노무사가 전화 상담해요. 구제신청서 작성법도 안내해줘요." },
  { title: "노동위원회 구제신청 (해고일 3개월 내)", desc: "신청 비용 0원이에요. 본인이 직접 신청해도 되고, 무료 대리인을 붙일 수도 있어요." },
];

const DOCS_DATA = [
  { name: "해고 통지서 또는 해고 사유 기재 문서", required: true, where: "회사에서 수령 또는 이메일·문자 캡처" },
  { name: "근로계약서", required: true, where: "본인 보관" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 또는 홈택스 원천징수영수증" },
  { name: "소득 증빙 (법률구조공단 이용 시)", required: false, where: "원천징수영수증 또는 급여통장 내역" },
  { name: "증거 자료 (카톡, 이메일, 녹음)", required: false, where: "본인 보관" },
];

const FAQS = [
  { q: "부당해고 무료 상담은 누구나 받을 수 있나요?", a: "고용노동부 1350은 소득 제한 없이 누구나 무료예요. 법률구조공단은 월 420만원 이하, 재산 2.5억 이하 기준이 있어요." },
  { q: "노동위원회 구제신청에 비용이 드나요?", a: "완전 무료예요. 인지대, 송달료 같은 소송 비용도 안 들어요. 대리인 없이 본인이 직접 할 수 있어요." },
  { q: "부당해고로 인정되면 얼마를 받나요?", a: "해고 기간 동안의 임금 전액(백페이)을 받아요. 6개월간 해고됐고 월급 300만원이면 1,800만원이에요. 원직 복직도 돼요." },
  { q: "해고된 지 3개월이 넘었으면 구제신청이 안 되나요?", a: "노동위원회 구제신청은 3개월이 지나면 할 수 없어요. 대신 민사소송(해고무효확인소송)은 가능하고, 법률구조공단 무료 변호사 지원을 받을 수 있어요." },
  { q: "법률구조공단에서 소송 대리를 받으면 끝까지 해주나요?", a: "1심부터 항소·상고까지 계속 지원받을 수 있어요. 승소하면 받은 금액의 10%를 성공보수로 내고, 패소하면 비용이 전혀 없어요." },
  { q: "무료 노무사 상담만으로 충분한가요?", a: "단순 자문은 충분해요. 소송 대리가 필요하면 법률구조공단이나 노동조합을 통해 무료 대리인을 붙일 수 있어요." },
];

const REFERENCES = [
  {
    category: "공식 기관",
    items: [
      { label: "고용노동부 고객상담센터 1350", url: "https://www.moel.go.kr" },
      { label: "대한법률구조공단 (무료 변호사)", url: "https://www.klac.or.kr" },
      { label: "근로복지공단 (무료 노무사)", url: "https://www.kcomwel.or.kr" },
      { label: "중앙노동위원회 (구제신청)", url: "https://www.nlrc.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "부당해고-구제신청-방법", title: "부당해고 구제신청 방법", description: "노동위원회 구제신청서 작성부터 판정까지 안내해요." },
  { slug: "무급휴가-강요-대응-방법", title: "무급휴가 강요 대응 방법", description: "무급휴가 거부와 휴업수당 청구 절차예요." },
  { slug: "실업급여-수급조건", title: "실업급여 수급 조건", description: "해고 후 실업급여 받는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 부당해고 · 법률지원</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        부당해고, 돈 없어도 싸울 수 있어요<br />
        무료 노무사·변호사 지원 받는 법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        갑자기 해고 통보를 받았는데 변호사 비용이 수백만원이라 포기하려고요?
        정부에서 상담부터 소송까지 전부 무료로 지원해요.
        <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a> 1350에 전화 한 통이면 바로 시작할 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      {/* ── 섹션 1: 기관별 비교 ── */}
      <H2>무료 법률지원, 어디서 받나요?</H2>
      <p style={body}>
        세 곳에서 무료 지원을 받을 수 있어요. 상황에 따라 가장 적합한 곳을 선택하세요.
      </p>

      <GreenBox title="3개 기관 한눈에">
        <b>고용노동부 1350</b>: 누구나 무료 전화 상담. 가장 빠르고 간단해요.<br /><br />
        <b>대한법률구조공단 132</b>: 월 420만원 이하면 변호사 비용 전액 무료. 소송까지 가능해요.<br /><br />
        <b>근로복지공단</b>: 온라인 예약 → 3일 내 무료 노무사 전화 상담.
      </GreenBox>

      <BorderBox>
        <b>노동위원회 구제신청</b>은 신청 비용 자체가 0원이에요.
        인지대·송달료도 없고, 대리인 없이 본인이 직접 해도 돼요.
        해고일로부터 3개월 이내에 신청해야 하니 서두르세요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      {/* ── 섹션 2: 이용 절차 ── */}
      <H2>어떤 순서로 진행하면 되나요?</H2>
      <p style={body}>
        1350 전화 상담으로 시작해서, 상황에 따라 법률구조공단이나 구제신청으로 넘어가는 게 일반적이에요.
      </p>

      <SectionBadge>이용 절차</SectionBadge>
      <Steps steps={SUPPORT_STEPS} />

      <Divider />

      {/* ── 섹션 3: 준비 서류 ── */}
      <H2>어떤 서류를 준비하면 되나요?</H2>
      <p style={body}>
        상담 단계에서는 서류 없이도 가능하지만, 구제신청이나 소송으로 가면 아래 자료가 필요해요.
        해고 직후 바로 챙겨두는 게 좋아요.
      </p>

      <SectionBadge>필요 서류</SectionBadge>
      <DocTable docs={DOCS_DATA} />

      <Divider />

      {/* ── 섹션 4: 구제 결정 시 받는 금액 ── */}
      <H2>부당해고가 인정되면 얼마 받나요?</H2>
      <p style={body}>
        해고 기간 동안 받지 못한 급여 전액(백페이)을 받아요.
        해고 당하지 않았으면 받았을 돈을 전부 돌려받는 거예요.
        월급 300만원이고 6개월간 해고 상태였으면 1,800만원이에요.
      </p>

      <GreenBox title="구제 결과">
        원직 복직 + 해고 기간 임금 전액 지급 (백페이)<br />
        복직 대신 금전 보상 선택 가능 (보통 3~6개월분)<br />
        퇴직금·<a href="/w/실업급여-수급조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여</a>도 별도 청구 가능
      </GreenBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용노동부·법률구조공단 안내 자료를 바탕으로 작성됐어요. 소득 기준 등은 변경될 수 있으니 각 기관에 직접 확인하세요." />
    </ArticleLayout>
  );
}
