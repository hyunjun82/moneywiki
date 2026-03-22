"use client";

// Q1: 임금피크제로 월급이 깎인다는 통보를 받았는데 합법인지 궁금한 근로자
// Q2: 임금피크제의 정당성을 판단하고, 부당하면 노동청 신고 또는 임금 청구
// Q3: 동의 필수 여부, 취업규칙 변경 절차, 합리적 기준 유무, 부당 시 대응(체불 임금 청구)
// Q4: GreenBox(정당성 판단 기준) + Steps(대응 절차) + Checklist(정당성 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "임금피크제 적용 근거 확인", desc: "취업규칙이나 단체협약에 임금피크제 조항이 있는지 확인해요. 근거 없이 일방적으로 적용하면 무효예요.", tip: "인사팀에 취업규칙 열람을 요청할 수 있어요 (근로기준법 제14조)" },
  { title: "동의 절차 확인", desc: "임금피크제 도입 시 근로자 과반수 동의 또는 노동조합 합의가 필요해요. 동의 절차 없이 적용했다면 불이익변경에 해당해요." },
  { title: "감봉 비율의 합리성 판단", desc: "업무량이나 직무 변경 없이 급여만 50% 이상 깎이면 합리성을 인정받기 어려워요. 대법원 판례에서 감봉 폭이 과도하면 정당성을 부정한 사례가 있어요." },
  { title: "부당하다면 노동청 신고", desc: "동의 없는 감봉은 임금 체불에 해당해요. 관할 고용노동청에 진정을 넣으면 근로감독관이 조사해요.", tip: "고용노동부 고객상담센터 1350 또는 민원마당에서 온라인 신고 가능해요" },
];

const CHECKLIST_ITEMS = [
  "취업규칙 또는 단체협약에 임금피크제 근거 조항이 있는가",
  "근로자 과반수 동의 또는 노조 합의를 거쳤는가",
  "감봉 비율이 합리적인가 (업무량·직무 변경 고려)",
  "임금피크제 적용 대상 선정 기준이 공정한가",
  "대체 수단(직무전환, 재교육 등)이 마련되어 있는가",
  "적용 시기·기간이 명확히 고지되었는가",
];

const FAQS = [
  { q: "임금피크제 동의 안 했는데 월급이 줄었어요. 위법인가요?", a: "네, 위법이에요. 근로자 동의 없이 임금피크제를 적용한 감봉은 무효예요. 감소된 임금 차액을 체불 임금으로 청구할 수 있어요." },
  { q: "동의했는데 너무 많이 깎였어요. 취소할 수 있나요?", a: "동의 당시 합리적 기준이 없었거나 과도하게 깎였다면 정당성을 다툴 수 있어요. 대법원에서 동의를 받았어도 현저히 불합리하면 효력을 부정한 판례가 있어요." },
  { q: "회사가 경영 악화를 이유로 도입하는데 거부할 수 있나요?", a: "경영 악화만으로 임금피크제를 강제할 수 없어요. 취업규칙 불이익변경은 근로자 과반수 동의가 필요하고, 동의 없으면 기존 조건이 유지돼요." },
  { q: "임금피크제 적용되면 퇴직금은 어떻게 되나요?", a: "퇴직금은 퇴직 전 3개월 평균임금으로 계산해요. 임금피크제로 급여가 줄어든 상태에서 퇴직하면 퇴직금도 줄어요. 감봉 전 퇴직을 고려하는 분도 있어요." },
  { q: "노동청 신고하면 불이익 받나요?", a: "근로기준법 제104조에서 신고한 근로자에 대한 불이익 처분을 금지하고 있어요. 신고 때문에 해고하거나 전보하면 부당노동행위로 추가 처벌돼요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "근로기준법 (취업규칙 불이익변경)", url: "https://www.law.go.kr/법령/근로기준법" },
  ]},
  { category: "상담·신고", items: [
    { label: "고용노동부 민원마당", url: "https://minwon.moel.go.kr" },
    { label: "고용노동부 고객상담센터 1350", url: "https://www.moel.go.kr" },
  ]},
];

const RELATED = [
  { slug: "해고-예고-미실시-효력", title: "해고예고 미실시 효력", description: "예고 없는 해고가 유효한지 판단 기준이에요." },
  { slug: "체불임금-청구-소송-방법", title: "체불임금 청구 소송 방법", description: "밀린 임금을 받는 구체적인 절차예요." },
  { slug: "해고-사유-서면-통보-유효성", title: "해고 사유 서면통보 유효성", description: "해고 통보 방식에 따른 효력 차이예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임금피크제로 월급이 깎였는데, 합법일까?<br />
        정당성 판단 기준과 부당 감봉 대응법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        어느 날 갑자기 임금피크제 적용 통보를 받았다면 당황스럽죠?
        임금피크제가 합법이 되려면 근로자 동의와 합리적 기준이 필요해요.
        동의 없이 일방적으로 급여를 깎았다면 임금 체불에 해당하고, 차액을 청구할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>임금피크제가 정당하려면 이 조건을 갖춰야 해요</H2>
      <p style={body}>
        대법원 판례에서 임금피크제의 정당성을 판단하는 기준은 크게 세 가지예요.
        하나라도 빠지면 무효가 될 수 있어요.
      </p>

      <GreenBox title="정당성 3대 요건">
        근로자 과반수 동의 또는 노조 합의 (취업규칙 불이익변경 절차)<br />
        감봉 비율이 합리적 (업무량·직무 변경 비례)<br />
        대체 수단 마련 (직무전환, 재교육 등)
      </GreenBox>

      <SectionBadge>정당성 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <CategoryButton label="근로·노동 정보" count={6} href="/category/근로" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>부당하다면 이렇게 대응하세요</H2>
      <p style={body}>
        동의 없는 감봉이나 과도한 감봉을 받았다면, 아래 절차대로 대응할 수 있어요.
        핵심은 취업규칙과 동의 절차를 먼저 확인하는 거예요.
      </p>

      <Steps steps={STEPS} />

      <BorderBox>
        <strong>임금 체불 청구 시효</strong><br />
        임금 청구권의 소멸시효는 3년이에요. 감봉이 시작된 날부터 3년 안에 청구해야 돼요.
        시효가 지나면 받을 수 없으니 빨리 움직이는 게 좋아요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 근로기준법과 대법원 판례를 바탕으로 작성됐어요. 구체적인 사안은 노무사나 법률 상담을 통해 판단해보세요." />
    </ArticleLayout>
  );
}
