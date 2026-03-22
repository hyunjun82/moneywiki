"use client";

/*
Q1. 전월세 계약했는데 신고를 해야 하는지, 안 하면 어떻게 되는지 걱정되는 상황
Q2. 내 계약이 신고 대상인지 확인하고 온라인으로 신고를 완료
Q3. 보증금 6천만원 초과 또는 월세 30만원 초과, 30일 이내, 과태료 최대 100만원(지연 시 최대 30만원), 온라인 신고 방법
Q4. EligibilityChecker(대상 여부) + Steps(신고 절차) + BorderBox(과태료 기준) + FAQ
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer,
  ArticleLayout, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "주거용 주택 임대차 계약이에요" },
  { id: "c2", label: "보증금 6,000만원 초과이거나 월세 30만원 초과예요" },
  { id: "c3", label: "수도권, 광역시, 세종시, 제주시, 도(道)의 시 지역이에요" },
  { id: "c4", label: "신규 계약이거나 금액이 변경된 갱신 계약이에요" },
];

const REPORT_STEPS = [
  { title: "부동산거래관리시스템 접속", desc: "rtms.molit.go.kr에 접속해서 공동인증서나 간편인증으로 로그인하세요." },
  { title: "임대차 신고서 작성", desc: "계약일, 보증금, 월세, 임대인·임차인 정보를 입력해요. 계약서 사진도 첨부하세요." },
  { title: "공동 서명 또는 일방 신고", desc: "원칙은 임대인·임차인 공동신고지만, 한쪽만 해도 돼요." },
  { title: "확정일자 자동 부여", desc: "온라인 신고하면 확정일자가 자동으로 부여돼요. 별도 방문 필요 없죠." },
];

const FAQS = [
  { q: "전월세신고 안 하면 과태료가 얼마예요?", a: "2025년 6월부터 과태료가 부과돼요. 지연 신고는 최대 30만원, 고의 미신고·거짓 신고는 최대 100만원이죠." },
  { q: "임대인이 신고 안 하려고 하면 어떡하나요?", a: "임차인 혼자서도 신고할 수 있어요. 일방 신고가 가능하니까 본인이 직접 하면 되죠." },
  { q: "갱신 계약도 신고해야 하나요?", a: "금액이 변경된 갱신 계약은 신고 대상이에요. 보증금·월세 변동 없이 그대로 연장하면 안 해도 되고요." },
  { q: "확정일자를 따로 받아야 하나요?", a: "아니에요. 온라인으로 전월세신고를 하면 확정일자가 자동 부여돼요. 등기소나 주민센터 방문이 필요 없죠." },
  { q: "오피스텔도 신고 대상이에요?", a: "주거용으로 사용하는 오피스텔이면 신고 대상이에요. 상가 용도면 해당되지 않죠." },
  { q: "전자계약으로 했으면 자동 신고되나요?", a: "네, 부동산 전자계약 시스템으로 계약했다면 임대차 신고가 자동으로 처리돼요." },
];

const REFERENCES = [
  { category: "법령·공식 자료", items: [
    { label: "부동산 거래신고 등에 관한 법률", url: "https://www.law.go.kr/법령/부동산거래신고등에관한법률" },
    { label: "부동산거래관리시스템", url: "https://rtms.molit.go.kr" },
    { label: "정부24: 임대차계약 신고", url: "https://www.gov.kr/portal/service/serviceInfo/PTR000050545" },
  ]}
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차 · 전월세신고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전월세신고, 내 계약도 해야 할까?<br />
        대상 기준과 온라인 신고 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세나 월세 계약을 했는데 신고를 해야 하는지 헷갈리죠.
        보증금 <strong>6,000만원 초과</strong> 또는 월세 <strong>30만원 초과</strong>면 계약일로부터 <strong>30일 이내</strong>에 신고해야 해요.
        2025년 6월부터 계도기간이 끝나서 미신고 시 <strong>과태료</strong>가 부과되고 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내 계약, 신고 대상인가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/부동산거래신고등에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>부동산 거래신고법</a>에 따라 주거용 주택의 임대차 계약 중 보증금 6,000만원 초과이거나 월세 30만원 초과면 신고 대상이에요. 둘 중 하나만 해당돼도 신고해야 하죠.
      </p>
      <p style={body}>
        대상 지역은 수도권 전역, 광역시, 세종시, 제주시, 도(道)의 시 지역이에요. 군 지역은 아직 제외되고요. 신규 계약뿐 아니라 금액이 바뀐 갱신 계약도 신고 대상이에요.
      </p>

      <SectionBadge>내 계약이 대상인지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당되네요. 계약일로부터 30일 이내에 신고해야 해요. 아래 절차를 따라 바로 신고하세요."
        partialMatchText="일부만 해당돼요. 보증금·월세 기준이나 지역 요건을 다시 확인해보세요."
      />

      <Divider />

      <H2>온라인 신고, 10분이면 끝나요</H2>
      <p style={body}>
        <a href="https://rtms.molit.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>부동산거래관리시스템</a>에서 온라인으로 신고하는 게 가장 편해요. 주민센터 방문 신고도 가능하지만, 온라인이면 확정일자까지 자동으로 부여되니까 훨씬 이득이죠.
      </p>

      <SectionBadge>온라인 신고 4단계</SectionBadge>
      <Steps steps={REPORT_STEPS} />

      <GreenBox>
        온라인 신고 시 확정일자 자동 부여<br />
        전자계약 시 임대차 신고 자동 처리<br />
        모바일 신고도 가능 (rtms.molit.go.kr)
      </GreenBox>

      <ArticleAd position="mid" />
      <Divider />

      <H2>안 하면 과태료, 얼마나 나오나요?</H2>
      <p style={body}>
        2024년 6월 1일부터 과태료가 실제로 부과되고 있어요. 2025년 6월 과태료 기준이 완화됐는데, 단순 지연 신고는 최대 <strong>30만원</strong>이에요. 고의적 미신고나 거짓 신고는 최대 <strong>100만원</strong>까지 부과될 수 있죠.
      </p>

      <BorderBox>
        <strong>지연 신고</strong>: 최대 30만원 (기간에 따라 차등)<br />
        <strong>미신고</strong>: 최대 100만원<br />
        <strong>거짓 신고</strong>: 최대 100만원
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 부동산 거래신고법과 국토교통부 안내를 바탕으로 작성했어요. 지역·계약 유형에 따라 달라질 수 있으니 관할 주민센터에 확인하세요." />
    </ArticleLayout>
  );
}
