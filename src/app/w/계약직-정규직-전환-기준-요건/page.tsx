"use client";
// Q1. 계약직으로 2년 가까이 됐는데 정규직 전환되는지, 갱신 거절당하면 어쩌나 불안한 상황
// Q2. 2년 초과 여부 확인 → 갱신기대권 판단 → 부당해고구제신청
// Q3. 기간제법 2년 자동전환, 갱신기대권 요건, 정규직 전환기대권 판례, 구제신청 절차
// Q4. GreenBox(2년 자동전환 핵심) + EligibilityChecker(갱신기대권 체크) + Steps(구제신청 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, EligibilityChecker,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "계약이 2회 이상 반복 갱신됐다" },
  { id: "c2", label: "총 근무기간이 2년에 가깝거나 넘었다" },
  { id: "c3", label: "같은 업무를 계속 수행하고 있다" },
  { id: "c4", label: "회사가 갱신을 당연시하는 분위기였다" },
  { id: "c5", label: "동료 중 갱신된 사례가 있다" },
];

const STEPS = [
  { title: "근로계약서·급여명세서 확보", desc: "계약 기간, 갱신 횟수, 근무 기간을 증명할 서류를 준비해요." },
  { title: "부당해고구제 신청서 작성", desc: "해고(갱신 거절)된 날부터 3개월 이내에 관할 노동위원회에 신청해요.", tip: "3개월 넘기면 각하돼요" },
  { title: "노동위원회 심판", desc: "조사관 면담 → 심문회의 → 판정. 보통 2~3개월 걸려요." },
  { title: "판정 결과 확인", desc: "인정되면 복직 또는 금전보상. 불인정이면 중앙노동위원회 재심 또는 행정소송이 가능해요." },
];

const FAQS = [
  { q: "2년 넘기면 자동으로 정규직인가요?", a: "네, 기간제법에 따라 사용기간이 2년을 초과하면 기간의 정함이 없는 근로계약(무기계약)을 체결한 것으로 간주돼요. 별도 절차 없이 자동 전환이에요." },
  { q: "회사가 1년 11개월에 그만두라고 하면요?", a: "갱신기대권이 인정되면 갱신 거절이 부당해고가 돼요. 2회 이상 갱신, 동일 업무 수행 등의 사정을 종합해서 판단해요." },
  { q: "무기계약이 정규직이랑 같은 건가요?", a: "고용 안정은 같지만 임금·복지는 다를 수 있어요. 회사 취업규칙에 무기계약직 처우가 별도로 있으면 정규직과 차이가 날 수 있어요." },
  { q: "파견직도 2년 넘으면 정규직인가요?", a: "파견근로자는 파견법이 적용돼요. 2년 초과 사용 시 사용사업주가 직접 고용한 것으로 보지만, 적용 예외가 있어 확인이 필요해요." },
  { q: "부당해고구제 신청 비용이 드나요?", a: "노동위원회 구제신청은 무료예요. 변호사나 노무사를 선임하면 별도 비용이 들지만, 혼자서도 신청할 수 있어요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "기간제 및 단시간근로자 보호 등에 관한 법률", url: "https://www.law.go.kr/법령/기간제및단시간근로자보호등에관한법률" },
    { label: "근로기준법", url: "https://www.law.go.kr/법령/근로기준법" },
  ]},
  { category: "기관", items: [
    { label: "중앙노동위원회 구제신청", url: "https://www.nlrc.go.kr" },
  ]},
];

const RELATED = [
  { slug: "기간제근로자-무기계약-전환-시기", title: "기간제 무기계약 전환 시기", description: "2년 초과 시점과 전환 방법이에요." },
  { slug: "소명기회-없는-해고-효력", title: "소명 기회 없는 해고 효력", description: "절차 없는 해고가 유효한지 기준이에요." },
  { slug: "단시간근로자-초과근무-강요", title: "단시간근로자 초과근무 강요", description: "파트타임 근로자 권리 보호 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약직 2년 넘으면 정규직?<br />
        자동 전환 기준과 갱신 거절 대응법
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        계약직으로 2년 가까이 일했는데 갱신이 안 될까 봐 불안하죠.
        기간제법에 따르면 2년을 초과하면 자동으로 무기계약직이 돼요. 갱신 거절을 당했다면 부당해고구제를 신청할 수 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>2년 초과하면 자동 전환돼요</H2>
      <p style={body}>
        기간제근로자를 2년 넘게 사용하면 법적으로 기간의 정함이 없는 근로계약으로 전환돼요. 회사가 동의하지 않아도 자동이에요.
      </p>
      <GreenBox>
        <strong>기간제법 제4조 핵심</strong><br /><br />
        사용기간 2년 초과 → 무기계약직 자동 전환<br />
        계약 갱신 횟수 무관 → 총 기간이 2년 넘으면 적용<br />
        예외: 박사학위 취득, 만 55세 이상 고령자, 전문직 등 일부<br /><br />
        ★ &quot;무기계약직&quot;은 고용 안정(해고 제한)이 정규직과 같아요
      </GreenBox>

      <H2>갱신 거절 당했다면 이걸 체크하세요</H2>
      <p style={body}>
        2년이 안 됐어도 갱신기대권이 인정되면 갱신 거절이 부당해고가 돼요. 아래 항목에 해당하는지 확인해보세요.
      </p>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="갱신기대권이 인정될 가능성이 높아요. 부당해고구제 신청을 검토하세요."
        partialMatchText="일부 해당. 개별 사정에 따라 다르니 노무사 상담을 받아보세요."
      />

      <H2>부당해고구제 이렇게 신청해요</H2>
      <p style={body}>
        갱신 거절이 부당해고에 해당한다면 노동위원회에 구제를 신청할 수 있어요. 해고일부터 3개월 이내에 해야 해요.
      </p>
      <Steps steps={STEPS} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기간제법·근로기준법 기준으로 작성됐어요. 개별 사안은 노무사나 노동위원회에 상담받으세요." />
    </ArticleLayout>
  );
}
