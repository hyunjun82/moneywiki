"use client";

// Q1. 대중교통을 많이 타는데 연말정산에서 얼마나 공제받는지, 80% 공제율이 맞는지 확인하고 싶은 상황이에요.
// Q2. 본인 대중교통 사용액의 공제율(80%)과 한도를 확인하고, 교통카드 사용을 늘려 절세하는 행동.
// Q3. 공제율 80%(2024~2025년), 대상 교통수단(버스·지하철·기차), 택시 제외, 공제 한도(전통시장+대중교통 합산 300만원), 간소화서비스 자동 조회.
// Q4. GreenBox(공제율 핵심) + BorderBox(계산 예시) + Checklist(절세 전략) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Checklist,
  ArticleLayout,
} from "@/components/article-ui";

const TAX_TIPS = [
  "출퇴근 교통비는 무조건 교통카드로 — 연 120만원이면 96만원 공제",
  "택시 대신 버스·지하철 이용 시 공제율 80% vs 15% 차이",
  "가족 교통카드도 본인 명의 카드로 결제하면 합산 가능",
  "전통시장(40%) + 대중교통(80%) + 도서공연(30%)으로 추가 한도 300만원 채우기",
  "간소화서비스에서 교통카드 사용 내역 빠진 게 없는지 확인",
];

const FAQS = [
  { q: "대중교통 공제율이 40%인가요, 80%인가요?", a: "2024~2025년 사용분은 80%예요. 원래 40%였는데 한시적으로 2배 인상됐어요. 2025년 귀속(2026년 연말정산)까지 적용돼요." },
  { q: "택시도 대중교통에 포함되나요?", a: "아니요, 택시는 대중교통이 아니에요. 일반 신용카드 사용액으로 분류되어 15% 공제율이 적용돼요." },
  { q: "교통카드 충전액도 공제되나요?", a: "충전 자체가 아니라 실제 대중교통에 사용한 금액만 공제돼요. 간소화서비스에서 교통카드사가 제출한 사용 내역 기준이에요." },
  { q: "KTX·SRT도 대중교통인가요?", a: "네, KTX·SRT·무궁화호·새마을호 모두 대중교통에 포함돼요. 80% 공제율 적용받아요." },
  { q: "공제 한도가 따로 있나요?", a: "대중교통 단독 한도는 없어요. 전통시장+대중교통 합산 200만원(총급여 7천만원 이하는 문화비 포함 300만원) 추가 한도가 있어요." },
  { q: "자동 조회 안 되는 교통카드가 있나요?", a: "일부 지방 교통카드는 간소화서비스에 누락될 수 있어요. 빠진 게 있으면 카드사에 자료 제출을 요청하세요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" },
      { label: "조세특례제한법 제126조의2", url: "https://www.law.go.kr/법령/조세특례제한법" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 소득공제 · 교통비</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        대중교통 공제율 80%, 얼마나 돌려받을까?<br />
        연말정산 교통비 소득공제 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        버스·지하철 타면서 교통카드 쓰고 있죠?
        2025년 사용분까지 대중교통 소득공제율이 80%예요.
        일반 신용카드(15%)보다 5배 넘게 높아서 출퇴근 교통비만 잘 챙겨도 절세 효과가 커요.
      </p>

      <Divider />

      <H2>공제율 80%, 정확히 어떻게 되는 건가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/조세특례제한법" style={{ color: "#1D9E75", textDecoration: "underline" }}>조세특례제한법 제126조의2</a>에 따라
        신용카드 소득공제 중 대중교통 이용 금액에 대해 한시적으로 공제율이 80%로 올랐어요.
      </p>

      <GreenBox>
        대중교통 소득공제 핵심이에요.<br />
        · 공제율: <strong>80%</strong> (2024~2025년 사용분, 원래 40%에서 한시 인상)<br />
        · 대상: 버스·지하철·전철·KTX·SRT·무궁화호·새마을호<br />
        · 제외: 택시(15%), 비행기(15%), 자가용<br />
        · 한도: 전통시장+대중교통 합산 200만원 추가 한도 (총급여 7천만원 이하 300만원)
      </GreenBox>

      <Divider />

      <H2>실제로 얼마나 돌려받나요?</H2>
      <p style={body}>
        매일 출퇴근 교통비를 기준으로 계산해볼게요.
      </p>

      <BorderBox>
        대중교통 소득공제 계산 예시예요.<br /><br />
        <strong>조건</strong>: 총급여 5,000만원, 연간 대중교통비 120만원<br />
        <strong>공제 대상 금액</strong>: 120만원 x 80% = 96만원<br />
        <strong>세율 15% 적용 시 환급액</strong>: 96만원 x 15% = 약 14.4만원<br /><br />
        같은 120만원을 일반 신용카드로 썼다면?<br />
        120만원 x 15% = 18만원 공제 → 환급 약 2.7만원<br />
        대중교통 카드로 쓰면 <strong>5배 이상 차이</strong>나요.
      </BorderBox>

      <Divider />

      <H2>절세 효과 키우는 방법이 있나요?</H2>
      <p style={body}>
        대중교통 공제율이 높으니까 전략적으로 활용하면 연말정산 환급액을 늘릴 수 있어요.
      </p>

      <SectionBadge>교통비 절세 체크리스트</SectionBadge>
      <Checklist items={TAX_TIPS} />

      <p style={body}>
        1월 15일부터 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스 간소화서비스</a>에서
        대중교통 이용 내역이 자동 조회돼요. 교통카드사가 국세청에 자료를 제출하니까 따로 영수증 챙길 필요 없어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준(2025년 귀속) 국세청·조세특례제한법 자료를 바탕으로 작성했어요. 대중교통 공제율 80%는 한시 적용이므로 이후 변경 가능성이 있어요." />
    </ArticleLayout>
  );
}
