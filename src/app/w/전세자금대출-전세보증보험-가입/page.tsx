"use client";

// Q1: 전세자금대출 전세보증보험 가입 조건 신청 방법 info
// Q2: 주택가격 12억 원 이하, 권리침해 없는 주택만 가입 가능
// Q3: 주택가격 12억 원 이하, 권리침해 없는 주택만 가입 가능, 전세 계약 기간 1/2 경과 전에 신청해야 함, 2018년 이후 집주인 동의 불필요, 단 가입 사실 통보 필수
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "주택가격 12억 원 이하, 권리침해 없는 주택만 가입 ", desc: "주택가격 12억 원 이하, 권리침해 없는 주택만 가입 가능" },
  { title: "전세 계약 기간 1/2 경과 전에 신청해야 함", desc: "전세 계약 기간 1/2 경과 전에 신청해야 함" },
  { title: "2018년 이후 집주인 동의 불필요, 단 가입 사실 통", desc: "2018년 이후 집주인 동의 불필요, 단 가입 사실 통보 필수" },
];
const CHECKLIST = [
  "주택가격 12억 원 이하, 권리침해 없는 주택만 가입 가능",
  "전세 계약 기간 1/2 경과 전에 신청해야 함",
  "2018년 이후 집주인 동의 불필요, 단 가입 사실 통보 필수"
];

const FAQS = [
  { q: "전세보증보험 집주인 동의 필요한가요?", a: "2018년 2월 이후부터는 집주인 동의 필요 없어요. 세입자 권리 보호를 위해 폐지됐거든요. 다만 보증보험 가입한 사실은 집주인한테 통보해야 해요." },
  { q: "전세보증보험 언제까지 신청해야 하나요?", a: "전세 계약 기간의 절반이 지나기 전에 신청해야 해요. 2년 계약이면 1년 안에, 모바일 신청은 10영업일 전까지 해야 해요." },
  { q: "전세자금대출 받으면 보증보험 안 돼요?", a: "아니에요. 공사 전세자금보증 이용 중이라도 전세보증금반환보증과 동시 신청하면 가입 가능해요. 둘 다 받을 수 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "한국주택금융공사 전세보증금반환보증", url: "https://www.hf.go.kr/ko/sub02/sub02_05_01.do" },
      { label: "서울주거포털 전세보증금 반환보증", url: "https://housing.seoul.go.kr/site/main/content/sh01_060400" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전세자금대출 전세보증보험 가입 조건 신청 방법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 계약했는데 보증보험 꼭 들어야 하나요? 가입 조건과 신청 방법, 집주인 동의 필요 여부를 알아봐요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>주택가격 12억 원 이하, 권리침해 없는 주택만 가입 </H2>
      <p style={body}>주택가격 12억 원 이하, 권리침해 없는 주택만 가입 가능</p>
      <GreenBox title="핵심 정리">
        주택가격 12억 원 이하, 권리침해 없는 주택만 가입 가능<br />
        전세 계약 기간 1/2 경과 전에 신청해야 함<br />
        2018년 이후 집주인 동의 불필요, 단 가입 사실 통보 필수
      </GreenBox>

      <CategoryButton label="부동산 · 임대차 정보" count={5} href="/category/부동산" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>전세 계약 기간 1/2 경과 전에 신청해야 함</H2>
      <p style={body}>전세 계약 기간 1/2 경과 전에 신청해야 함</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>꼭 체크해야 할 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>놓치기 쉬운 항목을 정리했어요.</p>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
