"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1: 강연료·원고료 등 기타소득을 받았는데 연말정산에서 어떻게 처리하는지 모르는 직장인
// Q2: 기타소득 분리과세 vs 종합과세 중 유리한 쪽을 선택해서 세금 부담 줄이기
// Q3: 필요경비 60% 자동 인정, 소득금액 300만원(수입 750만원) 기준, 분리과세 선택 시 종소세 불필요, 부양가족 요건 영향
// Q4: GreenBox(결론 먼저) + BorderBox(세율 구조) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "기타소득 총 수입금액 확인 (강연료 + 원고료 + 자문료 + 상금 합산)",
  "필요경비 60% 차감 후 소득금액 계산 (수입 × 40%)",
  "소득금액 300만원 이하 → 분리과세 선택 가능 (종소세 신고 불필요)",
  "소득금액 300만원 초과 → 종합과세 의무 (5월 종합소득세 신고 필수)",
  "부양가족으로 등록된 경우 → 기타소득금액 100만원 초과 시 부양가족 탈락",
  "원천징수 영수증 보관 (원천징수세율 20% + 지방세 2% = 22%)",
];

const FAQS = [
  { q: "기타소득 세율이 얼마예요?", a: "소득금액(수입의 40%)에 20%가 원천징수돼요. 지방세 포함하면 22%예요. 예를 들어 강연료 100만원을 받으면 소득금액 40만원 × 22% = 8.8만원이 원천징수돼요." },
  { q: "기타소득 300만원 이하면 신고 안 해도 되나요?", a: "소득금액 300만원(수입 750만원) 이하면 분리과세를 선택할 수 있어요. 분리과세를 선택하면 이미 원천징수로 세금이 끝난 거라 5월 종소세 신고를 안 해도 돼요." },
  { q: "부양가족 소득 요건에 기타소득도 포함되나요?", a: "네, 포함돼요. 기타소득금액이 연 100만원(수입 250만원)을 넘으면 부양가족 소득 요건에서 탈락해요. 부양가족 등록이 중요하면 기타소득을 관리해야 해요." },
  { q: "강연료 말고 어떤 게 기타소득이에요?", a: "원고료, 자문료, 인세, 상금, 사례금, 복권 당첨금 등이 기타소득이에요. 근로소득이나 사업소득과는 성격이 달라서 일시적·비정기적으로 받는 소득을 말해요." },
  { q: "분리과세가 유리한 건가요, 종합과세가 유리한 건가요?", a: "다른 소득이 많으면 분리과세가 유리하고, 다른 소득이 적으면 종합과세로 신고해서 환급받는 게 유리할 수 있어요. 총급여 4,000만원 이하라면 종합과세 신고 시 환급 가능성이 높아요." },
  { q: "기타소득 필요경비 60%는 어떻게 적용되나요?", a: "자동으로 적용돼요. 별도 증빙이 필요 없어요. 수입 100만원이면 필요경비 60만원을 빼고 소득금액 40만원으로 잡혀요. 실제 경비가 60%를 넘으면 실제 경비로 신고할 수도 있어요." },
];

const REFERENCES = [
  { category: "법령·안내", items: [
    { label: "소득세법 제21조 (기타소득)", url: "https://www.law.go.kr/법령/소득세법" },
    { label: "국세청 기타소득 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6442&cntntsId=7694" },
  ]},
  { category: "신고", items: [
    { label: "홈택스 종합소득세 신고", url: "https://www.hometax.go.kr" },
  ]},
];

const RELATED = [
  { slug: "종합소득세-신고-대상", title: "종합소득세 신고 대상", description: "종소세 신고 의무가 있는 사람 기준이에요." },
  { slug: "연말정산-표준공제", title: "연말정산 표준공제", description: "공제 항목별 증빙이 없을 때 적용되는 표준공제예요." },
  { slug: "원천징수-대상-의무자", title: "원천징수 대상과 의무자", description: "원천징수 세율과 신고 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        기타소득 받았을 때 연말정산은?<br />
        분리과세 조건과 세금 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        강연료나 원고료를 받았는데 세금 신고를 어떻게 해야 할지 모르겠다고요?
        기타소득은 필요경비 60%가 자동으로 인정돼서 수입의 40%만 소득금액으로 잡혀요.
        소득금액이 300만원(수입 750만원) 이하면 분리과세를 선택해서 종소세 신고 없이 끝낼 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>기타소득 세금 구조, 이렇게 돼요</H2>
      <p style={body}>
        기타소득은 원천징수로 세금을 먼저 떼고 지급돼요. 지급자가 소득금액의 22%(소득세 20% + 지방세 2%)를 원천징수해요.
      </p>

      <BorderBox>
        <strong>기타소득 세금 계산 흐름</strong><br /><br />
        수입금액 100만원<br />
        → 필요경비 60% 자동 차감: -60만원<br />
        → 소득금액: 40만원<br />
        → 원천징수 22%: 8.8만원<br />
        → 실수령: 91.2만원
      </BorderBox>

      <GreenBox title="분리과세 vs 종합과세 기준">
        소득금액 300만원 이하 (수입 750만원 이하) → 분리과세 선택 가능, 종소세 신고 불필요<br />
        소득금액 300만원 초과 (수입 750만원 초과) → 종합과세 의무, 5월에 종합소득세 신고 필수
      </GreenBox>

      <CategoryButton label="세금·연말정산 정보" count={12} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>기타소득 처리할 때 꼭 체크해야 할 것</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        분리과세를 선택할지, 종합과세로 신고할지는 본인의 다른 소득 수준에 따라 달라요. 부양가족 등록 여부도 영향을 받으니까 함께 체크하세요.
      </p>

      <SectionBadge>기타소득 연말정산 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성됐어요. 세법 개정에 따라 세율과 기준이 변경될 수 있으니 국세청 홈택스에서 최신 정보를 확인해보세요." />
    </ArticleLayout>
  );
}
