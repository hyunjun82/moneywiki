"use client";

// Q1. 월세 보증금이 필요한데 퇴직연금에서 뺄 수 있는지 모르는 무주택 직장인.
// Q2. 본인이 중도인출 대상인지 확인하고, 필요 서류를 준비해서 금융기관 앱에서 인출 신청하는 행동.
// Q3. 월세보증금도 법정 사유라는 점, 무주택 요건, DC형·IRP만 가능(DB형 불가), 인출 한도(계약서 금액), 세금(퇴직소득세만·기타소득세 없음), 1회 한정.
// Q4. EligibilityChecker(자격 확인) + Steps(신청 절차) + DocTable(필요 서류) + GreenBox(세금 요약) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, DocTable, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const ELIG_ITEMS = [
  { id: "house", label: "본인과 배우자 모두 무주택" },
  { id: "type", label: "DC형 퇴직연금 또는 IRP 가입 중 (DB형은 불가)" },
  { id: "contract", label: "임대차계약서가 있음 (본인 명의)" },
  { id: "once", label: "현 직장에서 보증금 사유 인출 이력 없음 (1회 한정)" },
];

const DOCS = [
  { name: "주민등록등본", required: true, where: "정부24에서 온라인 발급 가능" },
  { name: "임대차계약서", required: true, where: "월세 또는 전세 계약서 (보증금 금액 기재)" },
  { name: "무주택확인서", required: true, where: "건축물대장 또는 등기사항전부증명서" },
  { name: "신분증 사본", required: false, where: "금융기관에 따라 요청" },
];

const APPLY_STEPS = [
  { title: "자격 확인", desc: "무주택 여부와 퇴직연금 유형(DC형·IRP)을 먼저 확인해요. DB형은 중도인출이 안 돼요." },
  { title: "임대차계약 체결", desc: "본인 명의로 월세 또는 전세 계약을 먼저 해요. 계약서가 있어야 신청 가능하고, 계약 전 신청은 안 돼요.", tip: "가족 명의 계약은 인출 불가" },
  { title: "금융기관 앱에서 신청", desc: "퇴직연금 가입 금융기관 앱 또는 홈페이지에서 중도인출 메뉴 → '전세금/보증금 마련' 사유 선택 → 서류 업로드 → 인출 금액 입력해요." },
  { title: "심사 후 지급", desc: "서류 심사 후 3~7영업일 내에 지급돼요. 인출 한도는 임대차계약서에 적힌 보증금 금액까지예요." },
];

const FAQS = [
  { q: "월세 보증금도 중도인출 되나요?", a: "네. 무주택자 월세 보증금 마련은 법정 사유예요. 전세뿐 아니라 월세 보증금도 인출 가능해요." },
  { q: "기타소득세 16.5%가 붙나요?", a: "안 붙어요. 법정 사유 인출이라 퇴직소득세만 내요. 법정 사유가 아닌 인출은 기타소득세 16.5%가 붙지만, 보증금 마련은 해당 안 돼요." },
  { q: "적립금 전액을 뺄 수 있나요?", a: "아니에요. 임대차계약서에 적힌 보증금 금액까지만 인출할 수 있어요. 적립금이 더 많아도 보증금 한도까지만 돼요." },
  { q: "유주택자는 절대 안 되나요?", a: "맞아요. 본인 또는 배우자 명의로 주택이 있으면 인출할 수 없어요." },
  { q: "DB형은 왜 안 되나요?", a: "DB형은 회사가 운용하는 방식이라 개인이 중도인출할 수 없어요. DC형이나 IRP만 개인 인출이 가능해요." },
  { q: "같은 직장에서 두 번 인출 가능해요?", a: "보증금 사유로는 1회만 가능해요. 주택구입 등 다른 법정 사유는 별도로 인출 가능해요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "근로자퇴직급여보장법(법제처)", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "고용노동부 퇴직연금제도", url: "https://www.moel.go.kr/policy/policyinfo/retire/list.do" },
      { label: "금감원 통합연금포털", url: "https://100lifeplan.fss.or.kr/retire/retireInfo.do" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직연금-중도인출", title: "퇴직연금 중도인출", description: "법정 사유 6가지와 인출 조건 안내예요." },
  { slug: "퇴직연금-중도인출-주택구입", title: "퇴직연금 중도인출 주택구입", description: "무주택자 주택 구입 시 인출 방법이에요." },
  { slug: "퇴직연금-중도인출-서류", title: "퇴직연금 중도인출 서류", description: "사유별 필요 서류 목록이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · 주거 · 중도인출</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        월세 보증금, 퇴직연금에서 빼도 되나?
        <br />
        <span style={{ fontSize: 18, fontWeight: 500, color: "#555" }}>
          인출 조건부터 세금·신청까지
        </span>
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        월세 보증금이 필요한데 퇴직연금에서 빼도 되는지 궁금하죠.
        무주택자 월세·전세 보증금 마련은 법정 사유예요. 기타소득세 없이 퇴직소득세만 내고 인출할 수 있어요.
      </p>

      <Divider />

      <H2>내가 인출 대상인지 체크해보세요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>에서
        정한 법정 사유예요. 아래 조건을 모두 충족해야 해요.
      </p>
      <SectionBadge>자격 확인</SectionBadge>
      <EligibilityChecker items={ELIG_ITEMS} />

      <Divider />

      <H2>세금은 얼마나 나오나요?</H2>
      <p style={body}>
        법정 사유 인출이라 세금 불이익이 없어요. 이게 가장 중요한 포인트예요.
      </p>
      <GreenBox title="세금 핵심 정리">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2.2 }}>
          <li><strong>퇴직소득세만</strong> 부과 (근속연수에 따라 세율 다름)</li>
          <li><strong>기타소득세 16.5% 안 붙어요</strong> (법정 사유가 아닌 인출은 16.5% 부과)</li>
          <li>세액공제 안 받고 넣은 금액은 <strong>비과세</strong>로 인출</li>
        </ul>
      </GreenBox>

      <Divider />

      <H2>신청 절차는 어떻게 되나요?</H2>
      <p style={body}>
        금융기관 앱에서 비대면으로 신청할 수 있어요. 계약서가 먼저 있어야 해요.
      </p>
      <SectionBadge>인출 신청 4단계</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <Divider />

      <H2>어떤 서류가 필요해요?</H2>
      <p style={body}>
        금융기관에 따라 조금 다를 수 있지만, 기본적으로 아래 서류가 필요해요.
      </p>
      <SectionBadge>필요 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <ArticleAd />

      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />

      <RelatedArticles items={RELATED} />

      <Disclaimer text="이 글은 2026년 3월 기준 법령 정보를 바탕으로 작성했어요. 금융기관별 세부 절차가 다를 수 있으니 가입 금융기관에 확인하세요." />
    </ArticleLayout>
  );
}
