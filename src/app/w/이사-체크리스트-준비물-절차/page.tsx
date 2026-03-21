// Q1. 이사를 앞두고 뭘 챙겨야 할지 막막하고, 빠뜨리면 돈 손해 볼까봐 불안한 상황
// Q2. 이사 전·당일·후 체크리스트를 보고 하나씩 완료할 수 있어야 함 (전입신고·확정일자·주소변경까지)
// Q3. 2주 전 이사업체 예약, 당일 전입신고·확정일자 필수, 14일 내 자동차·은행 주소변경, 과태료 기준
// Q4. Checklist(체크리스트) + Steps(당일 절차) + DocTable(준비 서류) + FAQ

"use client";

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const CHECKLIST_BEFORE = [
  "이사업체 예약 (성수기엔 한 달 전)",
  "이사 견적 최소 3곳 비교",
  "전기·가스·수도·인터넷 정산 신청",
  "등기부등본 재확인 (잔금 직전)",
  "특약사항 이행 확인 (도배·장판·수리)",
  "대형 폐기물 스티커 발급 후 배출",
  "안 쓰는 물건 처분 (짐 양 = 이사 비용)",
  "귀중품·중요 서류 따로 챙기기",
];

const STEPS_DAY = [
  {
    title: "아침에 등기부등본 최종 확인",
    desc: "인터넷등기소에서 등기부등본을 한 번 더 떼어보세요. 하룻밤 사이에 근저당이 추가됐을 수 있죠. 이상 없으면 잔금을 이체하고 열쇠를 받으세요.",
    tip: "등기부등본 발급 비용은 온라인 700원, 창구 1,000원이에요",
    link: { label: "인터넷등기소", href: "https://www.iros.go.kr" },
  },
  {
    title: "잔금 지급 + 열쇠 수령",
    desc: "매도인(또는 임대인) 계좌로 잔금을 이체하고, 이체 확인증을 보관하세요. 열쇠를 받으면서 시설물 상태를 사진으로 남겨두세요.",
    tip: "잔금 이체 시 매도인 본인 명의 계좌인지 꼭 확인해봐야 해요",
  },
  {
    title: "전입신고 바로 하기",
    desc: "정부24에서 온라인으로 5분이면 끝나요. 주민센터 방문 시 신분증과 임대차계약서 원본을 가져가세요. 14일 넘기면 과태료 최대 5만원이에요.",
    tip: "전입신고 다음 날 0시에 대항력이 생겨요",
    link: { label: "정부24 전입신고", href: "https://www.gov.kr" },
  },
  {
    title: "확정일자 받기 (600원)",
    desc: "전입신고할 때 확정일자도 같이 받으세요. 임대차계약서 원본을 제출하면 돼요. 확정일자가 있어야 경매 시 보증금을 먼저 받을 수 있는 우선변제권이 생겨요.",
    tip: "전월세신고를 하면 확정일자가 자동 부여돼요",
  },
  {
    title: "구 집 관리비 정산 + 열쇠 반납",
    desc: "관리사무소에서 관리비를 정산하세요. 장기수선충당금은 세입자가 낸 거라 돌려받을 수 있죠. 열쇠를 반납하고 퇴거 확인서를 받아두면 좋아요.",
    tip: "장기수선충당금 정산은 관리사무소에 요청하면 돼요",
  },
];

const DOCS = [
  { name: "신분증 (주민등록증·운전면허증)", required: true, where: "본인 지참" },
  { name: "임대차계약서 원본", required: true, where: "계약 시 수령" },
  { name: "도장 (세대주)", required: true, where: "본인 지참" },
  { name: "전입신고서", required: false, where: "주민센터 비치 또는 정부24 온라인" },
  { name: "가족관계증명서 (세대 합가 시)", required: false, where: "정부24 또는 주민센터 발급" },
];

const CHECKLIST_AFTER = [
  "자동차 주소변경 (다른 시·도 이사 시 30일 이내, 미이행 과태료)",
  "운전면허증 뒷면 주소 기재 (경찰서·면허시험장·주민센터 무료)",
  "은행·카드사 주소변경 (앱에서 가능, 카드 갱신 시 옛 주소로 배송됨)",
  "보험사·국민연금·건강보험 주소변경",
  "학교 전학 신청 (해당 시)",
  "전월세신고 (보증금 6천만원 초과 또는 월세 30만원 초과 시 30일 이내)",
];

const FAQS = [
  { q: "이사 준비 언제부터 시작해야 하나요?", a: "최소 2주 전부터 시작하세요. 2~3월, 8~9월 성수기에는 한 달 전에 이사업체를 예약해야 원하는 날짜를 잡을 수 있죠." },
  { q: "전입신고 당일에 안 하면 어떻게 되나요?", a: "전입신고를 하루 늦추면 대항력 발생도 하루 늦어져요. 보증금을 보호받는 시점이 그만큼 밀리니까 이사 당일 바로 하는 게 좋아요." },
  { q: "확정일자랑 전입신고 차이가 뭐예요?", a: "전입신고는 거주 사실을 등록하는 거고, 확정일자는 임대차계약서에 날짜 도장을 받는 거예요. 둘 다 해야 보증금을 완전히 보호받을 수 있죠." },
  { q: "온라인 전입신고 가능한가요?", a: "네, 정부24에서 온라인으로 할 수 있죠. 공동인증서나 간편인증 로그인 후 5분이면 끝나요. 확정일자도 온라인 신청이 가능해요." },
  { q: "이사 후 주소변경 안 하면 과태료가 있나요?", a: "전입신고는 14일 넘기면 최대 5만원 과태료예요. 자동차 주소변경은 다른 시·도로 이사했을 때 30일 이내에 해야 하고, 안 하면 과태료가 부과돼요." },
  { q: "전월세신고는 꼭 해야 하나요?", a: "보증금 6천만원 초과 또는 월세 30만원 초과 계약이면 30일 이내에 해야 해요. 신고하면 확정일자가 자동 부여돼서 오히려 편리해요." },
  { q: "장기수선충당금 돌려받을 수 있나요?", a: "네, 세입자가 관리비에 포함해서 낸 거라 돌려받을 수 있죠. 퇴거할 때 관리사무소에 '장기수선충당금 정산해주세요'라고 말하면 돼요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "정부24 - 전입신고 서비스", url: "https://www.gov.kr" },
      { label: "주민등록법 - 법제처", url: "https://www.law.go.kr/법령/주민등록법" },
      { label: "인터넷등기소 - 등기부등본 발급", url: "https://www.iros.go.kr" },
      { label: "찾기쉬운 생활법령정보 - 이사 체크리스트", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=666&ccfNo=3&cciNo=1&cnpClsNo=1" },
    ],
  },
];

const RELATED = [
  { slug: "전입신고-방법", title: "전입신고 방법", description: "온라인·오프라인 전입신고 절차를 안내해요." },
  { slug: "확정일자", title: "확정일자 받는 법", description: "보증금 보호를 위한 확정일자 제도를 정리했어요." },
  { slug: "전세계약-주의사항", title: "전세계약 주의사항", description: "전세 사기 예방 체크리스트예요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 이사 · 전입신고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이사 체크리스트,<br />
        준비물부터 전입신고까지 절차 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이사 준비하다 보면 뭔가 빠뜨린 것 같은 불안함이 있죠. 막상 이사하고 나서 "아, 이거 미리 할 걸" 후회하는 경우가 많아요.
        특히{" "}
        <a href="/w/전입신고-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>전입신고</a>와{" "}
        <a href="/w/확정일자" style={{ color: "#1D9E75", textDecoration: "underline" }}>확정일자</a>를 당일에 안 하면 보증금 보호가 하루 늦어져요.
        이사 전·당일·후로 나눠서 빠뜨리면 안 되는 것만 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── 섹션 1: 이사 전 체크리스트 ── */}
      <H2>이사 2주 전부터 뭘 준비해야 하나요?</H2>
      <p style={body}>
        이사 준비는 최소 2주 전부터 시작해야 해요. 2~3월, 8~9월 성수기에는 한 달 전에 움직여야 원하는 날짜에 이사할 수 있죠.
        이사업체 견적은 최소 3곳을 비교하세요. 가격 차이가 크게 나는 경우가 많거든요.
      </p>
      <p style={body}>
        공과금(전기·가스·수도·인터넷) 정산 신청도 미리 해야 해요. 안 하면 이사 후에도 요금이 계속 나와요.
        새 집 <a href="https://www.iros.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>등기부등본</a>은 잔금일 직전에 한 번 더 떼어보세요. 계약 후에 근저당이 추가됐을 수 있죠.
      </p>

      <SectionBadge>이사 전 필수 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_BEFORE} />

      <Divider />

      {/* ── 섹션 2: 이사 당일 절차 ── */}
      <H2>이사 당일, 이 순서대로 하세요</H2>
      <p style={body}>
        이사 당일은 정신없어요. 꼭 해야 할 것만 집중하세요. 가장 중요한 건 전입신고와 확정일자예요.
        <a href="https://www.law.go.kr/법령/주민등록법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주민등록법</a>에 따르면 이사 후 14일 이내에 전입신고를 해야 하고, 안 하면 과태료 최대 5만원이에요.
      </p>
      <p style={body}>
        전입신고를 하면 다음 날 0시에 대항력이 생겨요. 하루라도 빨리 해야 보증금을 안전하게 지킬 수 있죠.
        확정일자는 600원이면 받을 수 있으니 전입신고할 때 같이 처리하세요.
      </p>

      <SectionBadge>이사 당일 5단계 절차</SectionBadge>
      <Steps steps={STEPS_DAY} />

      <RelatedArticles items={RELATED} />

      <Divider />
      <ArticleAd position="mid" />

      {/* ── 섹션 3: 전입신고 준비 서류 ── */}
      <H2>전입신고할 때 뭘 가져가야 하나요?</H2>
      <p style={body}>
        주민센터에 방문할 때 필요한 서류예요. 온라인으로 할 거면 <a href="https://www.gov.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>정부24</a>에서
        공동인증서 또는 간편인증으로 로그인하면 서류 없이 5분이면 끝나요.
        세대 합가(다른 세대와 합치는 경우)가 아니라면 신분증과 계약서만 있으면 돼요.
      </p>

      <SectionBadge>전입신고 준비 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* ── 섹션 4: 이사 후 14일 내 ── */}
      <H2>이사 끝나고 14일 안에 할 일</H2>
      <p style={body}>
        이사 끝났다고 끝이 아니에요. 주소변경을 안 하면 중요한 우편물을 못 받거나, 카드 갱신 때 새 카드가 옛날 주소로 가버려요.
        자동차 주소변경은 다른 시·도로 이사했을 때 30일 이내에 해야 해요.
      </p>
      <p style={body}>
        전월세신고 대상이면 30일 이내에 <a href="https://rtms.molit.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>부동산거래관리시스템</a>에서 신고하세요.
        보증금 6천만원 초과 또는 월세 30만원 초과가 기준이에요. 신고하면 확정일자가 자동 부여되니 오히려 이득이에요.
      </p>

      <SectionBadge>이사 후 주소변경 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_AFTER} />

      <GreenBox title="한눈에 보기">
        <strong>2주 전</strong>: 이사업체 예약, 공과금 정산, 등기부등본 확인<br />
        <strong>1주 전</strong>: 짐 정리, 대형폐기물 배출, 주소변경 리스트<br />
        <strong>당일</strong>: 등기부등본 최종 확인 → 잔금 → 전입신고 → 확정일자<br />
        <strong>14일 내</strong>: 자동차·운전면허·은행·카드 주소변경, 전월세신고
      </GreenBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 법령과 공식 자료를 바탕으로 작성됐어요. 구체적인 상황은 관할 주민센터나 법률 전문가에게 확인해보세요." />
    </ArticleLayout>
  );
}
