"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 자동차보험 갱신하면서 자동차상해 특약과 자기신체사고 중 뭘 선택해야 할지 고민하는 운전자
// Q2: 두 특약의 보장 차이를 이해하고 자기 상황에 맞는 특약을 선택
// Q3: 과실 비율 영향, 보장 범위(위자료·휴업손해·장례비), 보험료 차이, 청구 방법
// Q4: CompareTable(두 특약 비교) + GreenBox(결론) + Steps(청구 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { CompareTable } from "@/components/article-ui/CompareTable";

const COMPARE_ROWS = [
  { label: "과실 100%일 때 보상", optionA: "보상 가능", optionB: "보상 불가" },
  { label: "보상 기준", optionA: "실제 손해액 (대인배상 기준)", optionB: "약관에 정한 정액" },
  { label: "위자료 보상", optionA: "포함", optionB: "미포함" },
  { label: "휴업손해 보상", optionA: "포함", optionB: "미포함" },
  { label: "장례비", optionA: "포함", optionB: "미포함" },
  { label: "보험료 차이", optionA: "연 3~5만원 더 비쌈", optionB: "기본" },
  { label: "추천 대상", optionA: "출퇴근 운전, 장거리 운전", optionB: "운전 빈도 낮은 경우" },
];

const STEPS = [
  { title: "사고 발생 시 보험사 접수", desc: "사고 직후 보험사 콜센터(또는 앱)에 접수해요. 자동차상해 특약은 별도로 청구한다고 말해야 해요.", tip: "접수할 때 '자동차상해 특약 청구합니다'라고 꼭 말해요" },
  { title: "진단서·치료비 영수증 확보", desc: "병원에서 진단서와 치료비 영수증을 받아요. 후유장해가 있으면 장해진단서도 필요해요." },
  { title: "휴업손해 증빙 준비", desc: "직장인이면 휴직확인서, 사업자면 소득금액증명원을 준비해요. 휴업손해 보상받으려면 소득 증빙이 필수예요." },
  { title: "보험금 청구서 제출", desc: "보험사 앱이나 팩스로 청구서와 증빙 서류를 제출해요. 접수 후 보통 7~14일 안에 보험금이 나와요." },
];

const FAQS = [
  { q: "자동차상해 특약은 과실 100%여도 보상되나요?", a: "네, 보상돼요. 본인 과실이 100%여도 가입금액 한도 내에서 치료비, 위자료, 휴업손해를 모두 받을 수 있어요. 자기신체사고는 과실 100%면 보상이 안 돼요." },
  { q: "보험료가 얼마나 더 비싸요?", a: "자기신체사고보다 연간 3만~5만원 정도 비싸요. 월로 따지면 2,500~4,200원 차이니까 보장 범위를 생각하면 가성비가 좋아요." },
  { q: "자기신체사고에서 자동차상해로 바꿀 수 있나요?", a: "갱신 시점에 변경할 수 있어요. 보험사에 연락해서 다음 갱신 때 자동차상해 특약으로 바꿔달라고 하면 돼요." },
  { q: "동승자도 보상받나요?", a: "네, 자동차상해 특약은 운전자뿐 아니라 탑승자 전원이 보상 대상이에요. 자기신체사고도 탑승자를 보장하지만 보상 범위가 좁아요." },
  { q: "렌터카 사고도 적용되나요?", a: "개인 자동차보험의 자동차상해 특약은 본인 차량에만 적용돼요. 렌터카는 렌터카 보험으로 별도 가입해야 해요." },
];

const REFERENCES = [
  { category: "참고", items: [
    { label: "금융감독원 자동차보험 안내", url: "https://www.fss.or.kr" },
    { label: "손해보험협회 자동차보험 종합포털", url: "https://carinfo.knia.or.kr" },
  ]},
];

const RELATED = [
  { slug: "5세대-실손보험-추천", title: "5세대 실손보험 추천", description: "2026년 달라진 실손보험 가입 조건이에요." },
  { slug: "종신보험-상속세-면제", title: "종신보험 상속세 면제", description: "보험금으로 상속세를 줄이는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 보험</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        자동차상해 특약 vs 자기신체사고, 뭐가 다를까?<br />
        과실 비율별 보상 차이와 청구 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        자동차보험 갱신할 때 자동차상해 특약과 자기신체사고 중 뭘 골라야 할지 헷갈리죠?
        둘 다 본인 몸을 보장하는 특약이지만, 과실 비율에 따른 보상이 완전히 달라요.
        특히 내 과실이 100%인 사고에서 보상받을 수 있느냐 없느냐가 가장 큰 차이예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>두 특약의 보장 범위, 이렇게 달라요</H2>
      <p style={body}>
        가장 큰 차이는 과실 100%일 때예요. 자동차상해 특약은 내 과실이 100%여도 치료비·위자료·휴업손해를 모두 보상해요.
        자기신체사고는 상대방 과실이 있을 때만 보상이 가능해요.
      </p>

      <SectionBadge>자동차상해 vs 자기신체사고</SectionBadge>
      <CompareTable titleA="자동차상해 특약" titleB="자기신체사고" rows={COMPARE_ROWS} />

      <GreenBox title="결론">
        출퇴근 운전을 하거나 장거리 운전이 잦다면 자동차상해 특약이 유리해요. 연 3~5만원 차이로 과실 100% 사고까지 보장받을 수 있어요.
        운전 빈도가 낮고 보험료를 아끼고 싶다면 자기신체사고도 괜찮아요.
      </GreenBox>

      <CategoryButton label="금융·보험 정보" count={5} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>자동차상해 특약 보험금 청구 절차</H2>
      <p style={body}>
        사고가 나면 보험사에 접수하면서 자동차상해 특약 청구를 별도로 요청해야 해요.
        자동으로 적용되는 게 아니라 직접 청구해야 받을 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 자동차보험 특약 내용을 바탕으로 작성됐어요. 보험사별로 약관이 다를 수 있으니 가입 전 약관을 꼭 확인해보세요." />
    </ArticleLayout>
  );
}
