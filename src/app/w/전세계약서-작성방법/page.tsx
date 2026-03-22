"use client";

// Q1. 전세 계약을 앞두고 계약서를 어떻게 써야 보증금을 지킬 수 있는지 궁금한 상황
// Q2. 계약서 필수 항목과 특약을 빠짐없이 작성하고, 확정일자+전입신고까지 마친다
// Q3. 필수 기재사항, 특약 예시, 계약 전 확인 서류, 확정일자·전입신고 절차
// Q4. Steps로 작성 절차 + Checklist로 필수 항목 + BorderBox로 특약 예시

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "등기부등본·건축물대장 먼저 확인",
    desc: "대법원 인터넷등기소에서 등기부등본을 발급받아요. 소유자가 맞는지, 근저당 설정액이 얼마인지, 압류·가압류가 있는지 확인해요. 근저당+보증금이 시세의 70%를 넘으면 위험해요.",
    tip: "건축물대장은 정부24에서 발급. 위반건축물이면 전세보증보험 가입 안 될 수 있어요.",
    link: { label: "인터넷등기소", href: "https://www.iros.go.kr" },
  },
  {
    title: "계약서 필수 기재사항 꼼꼼히 작성",
    desc: "당사자 정보(이름·주민번호·연락처), 부동산 표시(주소·면적·구조), 보증금(계약금·중도금·잔금), 계약 기간(시작일·종료일), 월세 유무를 빠짐없이 적어요.",
    tip: "등기부등본 소유자와 계약 상대방이 같은지 반드시 대조",
  },
  {
    title: "특약사항을 구체적으로 기재",
    desc: "수리비 부담 주체, 원상복구 범위, 계약 해지 조건과 위약금, 보증금 반환 시기(퇴거 후 7일 이내 등)를 명확하게 적어요. 입주 전 시설물 상태 사진도 첨부하면 좋아요.",
  },
  {
    title: "잔금 당일 등기부등본 재확인 후 잔금 치르기",
    desc: "잔금 치르기 직전에 등기부등본을 한 번 더 떼보세요. 계약 후 근저당이 추가됐을 수 있어요. 확인 후 잔금을 치르고 열쇠를 받아요.",
  },
  {
    title: "당일 전입신고 + 확정일자 받기",
    desc: "이사 당일에 전입신고하고 확정일자를 받아야 대항력과 우선변제권이 생겨요. 전월세신고를 하면 확정일자가 자동 부여돼요. 정부24에서 온라인 신고도 가능하고요.",
    link: { label: "정부24 전입신고", href: "https://www.gov.kr" },
  },
];

const CHECKLIST_DOCS = [
  "등기부등본: 소유자·근저당·압류 확인 (인터넷등기소)",
  "건축물대장: 위반건축물 여부 (정부24)",
  "집주인 신분증: 등기부 소유자와 일치 여부 대조",
  "대리인 계약 시: 위임장 + 인감증명서 요구",
  "국토부 표준임대차계약서 양식 사용",
];

const FAQS = [
  { q: "공인중개사 없이 직거래로 계약해도 되나요?", a: "법적으로 가능해요. 다만 문제 생겼을 때 중개사 책임을 물을 수 없으니, 등기부·건축물대장을 직접 꼼꼼히 확인하고 표준계약서를 써야 해요." },
  { q: "확정일자를 안 받으면 어떻게 되나요?", a: "경매 때 보증금을 우선 변제받을 순위가 없어요. 전입신고만 하면 대항력은 생기지만, 확정일자가 있어야 우선변제권까지 확보돼요." },
  { q: "전세보증보험은 꼭 가입해야 하나요?", a: "의무는 아니지만 강력 추천해요. HUG나 SGI에서 가입하면 집주인이 보증금을 안 돌려줘도 보험사가 대신 줘요." },
  { q: "특약에 뭘 반드시 넣어야 하나요?", a: "수리비 부담 주체(대수선은 집주인, 소모품은 세입자), 보증금 반환 시기, 계약 해지 조건과 위약금은 필수예요. 묵시적 갱신 후 해지 조건도 넣으면 좋아요." },
  { q: "계약서를 잃어버리면 어떻게 하나요?", a: "중개사무소에 사본을 요청하거나, 주민센터에서 확정일자부 열람으로 계약 내용을 확인할 수 있어요." },
  { q: "전월세신고를 하면 확정일자가 자동으로 나온다고요?", a: "네. 2021년 6월 이후 체결한 임대차 계약을 전월세 신고하면 확정일자가 자동 부여돼요. 별도로 주민센터 방문할 필요가 없어요." },
];

const SOURCES = [
  { name: "주택임대차보호법", href: "https://www.law.go.kr/법령/주택임대차보호법" },
  { name: "국토교통부 표준임대차계약서", href: "https://www.molit.go.kr" },
  { name: "대법원 인터넷등기소", href: "https://www.iros.go.kr" },
];

const RELATED = [
  { slug: "전세계약-주의사항", title: "전세계약 주의사항", description: "전세 사기 예방을 위한 체크 포인트." },
  { slug: "확정일자", title: "확정일자란?", description: "대항력과 우선변제권의 차이." },
  { slug: "전세보증보험", title: "전세보증보험 가입", description: "HUG·SGI 가입 조건과 비용." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 전세 · 계약서</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전세계약서, 이것만 빠져도 보증금 날려요<br />
        필수 항목과 특약 작성법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부동산에서 계약서 주면 그냥 사인하는 분이 많죠. 나중에 분쟁 나면 계약서가 유일한 무기예요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법</a>이 세입자를 보호하지만, 계약서가 부실하면 보호받기 어려워요.
        필수 기재사항, 반드시 넣어야 할 특약, 계약 후 해야 할 절차까지 순서대로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>계약서 작성 절차, 이 순서대로 하면 안전해요</H2>
      <p style={body}>
        서류 확인부터 확정일자까지 5단계예요. 하나라도 건너뛰면 위험해요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton label="부동산 정보" count={11} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>계약 전 반드시 확인할 서류</H2>
      <p style={body}>
        계약서 쓰기 전에 이 서류부터 챙기세요. 빠진 거 하나가 수억 원을 지키는 열쇠예요.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_DOCS} />

      <Divider />

      <H2>특약, 이렇게 써야 분쟁을 막아요</H2>
      <p style={body}>
        표준 계약 조건으로 안 되는 부분을 특약으로 채워야 해요.
      </p>

      <BorderBox>
        <strong>필수 특약 예시</strong><br />
        수리비: "보일러·누수 등 대수선은 임대인 부담, 형광등·배수구 등 소모품은 임차인 부담"{"\n\n"}
        보증금 반환: "계약 종료 후 7일 이내 보증금 전액 반환. 미반환 시 연 이자 5% 가산"{"\n\n"}
        해지 조건: "중도 해지 시 2개월 전 통보. 위약금은 보증금의 10%"{"\n\n"}
        원상복구: "입주 시 시설물 상태를 사진으로 기록하고 계약서에 첨부"
      </BorderBox>

      <p style={body}>
        <a href="/w/전세계약-특약사항" style={{ color: "#1D9E75", textDecoration: "underline" }}>전세계약 특약사항</a>에서 더 많은 예시를 볼 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>계약 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>전세 계약할 때 많이 헷갈리는 것만 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법을 바탕으로 작성했어요. 보증금 보호 요건은 법 개정에 따라 달라질 수 있으니 법제처(law.go.kr)에서 확인하세요." />
    </ArticleLayout>
  );
}
