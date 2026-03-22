"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 프리랜서·자영업자가 5월 종합소득세 신고를 앞두고, 본인이 단순경비율인지 기준경비율인지 판단하려는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 본인 적용 경비율을 판단하고, 기준경비율이면 증빙을 미리 챙기는 것.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 업종별 수입금액 기준(2,400만/3,600만/6,000만), 계산 공식 차이, 주요경비 증빙 필수, 홈택스 경비율 조회 방법.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(판단 기준) + BorderBox(계산 비교) + Steps(홈택스 조회) + Checklist(증빙 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  FAQ, References, Disclaimer, Steps, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "프리랜서인데 수입이 2,400만원 넘으면 어떻게 되나요?",
    a: "기준경비율이 적용돼요. 매입비·임차료·인건비 증빙을 꼭 챙겨야 해요. 증빙 없으면 비용 인정이 안 돼서 세금이 크게 늘어나요.",
  },
  {
    q: "단순경비율이랑 기준경비율 중 뭐가 유리해요?",
    a: "보통 단순경비율이 유리해요. 증빙 없이도 높은 비율로 비용 처리되니까요. 수입이 늘어서 기준경비율 대상이 되면 증빙 관리가 중요해요.",
  },
  {
    q: "올해 처음 사업 시작했는데 어떤 경비율이에요?",
    a: "직전연도 수입이 없으면 당해연도(올해) 수입으로 판단해요. 올해 수입이 기준 미만이면 단순경비율, 이상이면 기준경비율이에요.",
  },
  {
    q: "경비율을 어디서 조회하나요?",
    a: "홈택스(hometax.go.kr) → 조회/발급 → 기타 조회 → 기준·단순경비율 조회에서 업종코드로 확인할 수 있어요.",
  },
  {
    q: "장부를 작성하면 경비율을 안 써도 되나요?",
    a: "네, 장부(기장)를 하면 실제 비용으로 신고할 수 있어요. 경비율은 장부 없이 추계신고할 때만 사용하는 거예요.",
  },
  {
    q: "기준경비율 적용인데 증빙이 하나도 없으면?",
    a: "주요경비 공제가 0원이 돼서 세금이 크게 늘어나요. 수입 3,000만원 기준으로 증빙 유무에 따라 세금 차이가 수백만원 날 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청 기장의무 판단 기준", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2230&cntntsId=7669" },
      { label: "홈택스 기준·단순경비율 조회", url: "https://www.hometax.go.kr" },
      { label: "소득세법", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
];

const RELATED = [
  { slug: "원천징수-신고-방법", title: "원천징수 신고 방법", description: "프리랜서 3.3% 원천징수와 종합소득세 신고의 관계를 확인하세요." },
  { slug: "법인세-신고-기한-세율", title: "법인세 신고 기한·세율", description: "법인 사업자라면 법인세 신고 기준을 확인하세요." },
  { slug: "부가세-환급-신청", title: "부가세 환급 신청", description: "사업자라면 부가세 환급도 함께 챙기세요." },
];

const HOMETAX_STEPS = [
  { title: "홈택스 접속", desc: "hometax.go.kr에 접속해서 로그인해요." },
  { title: "경비율 조회 메뉴 이동", desc: "'조회/발급' → '기타 조회' → '기준·단순경비율 조회'를 클릭해요." },
  { title: "업종코드 입력", desc: "본인 업종코드를 입력해요.", tip: "업종코드를 모르면 사업자등록증에서 확인하거나 세무서에 문의하세요." },
  { title: "경비율 확인", desc: "단순경비율과 기준경비율이 함께 나와요. 직전연도 수입 기준으로 어떤 게 적용되는지 판단하세요." },
];

const EVIDENCE_ITEMS = [
  "매입비 증빙: 세금계산서, 계산서, 신용카드매출전표, 현금영수증",
  "임차료 증빙: 사무실 월세 세금계산서 또는 계좌이체 내역",
  "인건비 증빙: 원천징수영수증 또는 지급조서 신고",
  "업종코드 확인: 사업자등록증에서 업종코드 확인하기",
  "홈택스에서 내 업종 경비율 조회하기",
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 종합소득세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        기준경비율 vs 단순경비율<br />
        적용 기준과 계산 방법 차이
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        5월 종합소득세 신고할 때 "기준경비율이 뭐예요?"라는 질문을 많이 하죠.
        프리랜서나 자영업자가 장부 없이 세금을 계산할 때 쓰는 방식이에요.
        단순경비율인지 기준경비율인지에 따라 세금이 수백만원 차이 나요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>어떤 경비율이 적용되나요? 수입금액 기준으로 판단해요</H2>
      <p style={body}>
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2230&cntntsId=7669" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a>에서
        업종별 수입금액 기준을 정해뒀어요. 직전연도 수입이 기준 이하면 단순경비율, 이상이면 기준경비율이 적용돼요.
      </p>

      <GreenBox title="업종별 적용 기준 (직전연도 수입)">
        · <strong>도소매업·부동산매매업</strong>: 6,000만원 미만 → 단순 / 이상 → 기준<br />
        · <strong>제조업·음식숙박업·건설업</strong>: 3,600만원 미만 → 단순 / 이상 → 기준<br />
        · <strong>서비스업·프리랜서·부동산임대</strong>: 2,400만원 미만 → 단순 / 이상 → 기준<br /><br />
        ※ IT 개발자, 디자이너, 유튜버, 작가는 대부분 서비스업 → 2,400만원 기준
      </GreenBox>

      <Divider />

      <H2>단순경비율은 간편하고, 기준경비율은 증빙이 핵심이에요</H2>
      <p style={body}>
        둘 다 장부 없이 세금을 계산하는 '추계신고' 방식이에요.
        단순경비율은 증빙 없이도 높은 비율로 비용을 인정해줘서 간편해요.
        기준경비율은 주요경비(매입비·임차료·인건비)를 증빙으로 인정받고, 나머지만 경비율로 처리해요.
      </p>

      <SectionBadge>계산 공식 비교</SectionBadge>
      <BorderBox title="단순경비율 (증빙 불필요)">
        소득금액 = 수입금액 - (수입금액 × 단순경비율)<br /><br />
        예) 수입 2,000만원, 단순경비율 70%<br />
        → 소득 = 2,000만 - 1,400만 = <strong>600만원</strong>
      </BorderBox>

      <BorderBox title="기준경비율 (증빙 필수)">
        소득금액 = 수입금액 - 주요경비(증빙) - (수입금액 × 기준경비율)<br /><br />
        예) 수입 3,000만원, 기준경비율 20%, 증빙 1,500만원<br />
        → 소득 = 3,000만 - 1,500만 - 600만 = <strong>900만원</strong><br /><br />
        ※ 증빙 0원이면?<br />
        → 소득 = 3,000만 - 0 - 600만 = <strong>2,400만원</strong> (세금 폭탄)
      </BorderBox>

      <p style={body}>
        증빙 유무에 따라 과세표준이 900만원 vs 2,400만원으로 크게 벌어져요.
        기준경비율 대상이면 증빙 관리가 정말 중요해요.
      </p>

      <Divider />

      <H2>기준경비율 대상이면 이 증빙을 꼭 챙기세요</H2>
      <p style={body}>
        주요경비는 매입비, 임차료, 인건비 세 가지예요. 이 세 가지의 정규증빙이 있어야 비용으로 인정받아요.
      </p>

      <Checklist items={EVIDENCE_ITEMS} />

      <p style={body}>
        증빙이 없으면 주요경비 공제가 0원이 돼서, 기준경비율만큼만 비용 처리돼요.
        세금 차이가 수백만원이 되는 게 바로 이 때문이에요.
      </p>

      <Divider />

      <H2>내 업종 경비율은 홈택스에서 조회해요</H2>
      <p style={body}>
        업종마다 경비율이 다르기 때문에, <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서
        직접 확인하는 게 정확해요.
      </p>

      <Steps steps={HOMETAX_STEPS} />

      <RelatedArticles items={RELATED} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성했어요. 경비율은 매년 국세청 고시로 변경될 수 있으니 신고 전 홈택스에서 최신 경비율을 확인하세요." />
    </ArticleLayout>
  );
}
