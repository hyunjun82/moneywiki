"use client";

// Q1. "전월세상한제 폐지됐다던데" 뉴스 보고 내 전세 계약에 영향 있는지 걱정하는 상황
// Q2. 현재 폐지 여부를 확인하고, 폐지 시 달라지는 점을 이해해서 대비할 수 있어야 함
// Q3. 2026년 3월 현재 폐지 안 됨, 5% 상한 유지, 폐지되면 임대료 제한 없음, 기존 계약 보호 여부
// Q4. GreenBox(현황 요약) + BorderBox(폐지 시 비교) + Steps(대비 방법) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const PREPARE_STEPS = [
  {
    title: "계약갱신청구권 남아있는지 확인",
    description: "아직 1회 사용 안 했으면 만료 6개월~1개월 전에 행사하세요. 지금은 5% 상한이 적용되니까 유리해요.",
  },
  {
    title: "묵시적갱신 가능 여부 점검",
    description: "갱신청구권을 이미 썼어도 묵시적갱신이 가능해요. 양쪽 모두 아무 말 안 하면 종전 조건 그대로 2년 연장돼요.",
  },
  {
    title: "전세보증금 반환보증 가입",
    description: "보증금을 지키려면 HUG·HF·SGI 반환보증에 가입해 두세요. 집주인이 보증금을 못 돌려줘도 보호받을 수 있어요.",
  },
  {
    title: "법 개정 뉴스 모니터링",
    description: "국토교통부 홈페이지나 국회 의안정보시스템에서 임대차3법 관련 법안을 살펴보세요. 개정되면 시행일 이후 갱신분부터 적용될 가능성이 높아요.",
  },
];

const FAQS = [
  {
    q: "전월세상한제가 2026년에 폐지됐나요?",
    a: "아니요. 2026년 3월 현재 폐지되지 않았어요. 주택임대차보호법 제7조에 따라 갱신 시 5% 상한이 여전히 적용돼요.",
  },
  {
    q: "폐지되면 기존 계약은 어떻게 되나요?",
    a: "법 개정 시 보통 시행일 이후 갱신분부터 적용돼요. 이미 5% 상한으로 갱신한 계약은 유지될 가능성이 높아요. 구체적인 건 개정안 내용을 봐야 해요.",
  },
  {
    q: "전월세상한제가 없으면 보증금을 얼마든지 올릴 수 있나요?",
    a: "네, 폐지되면 갱신할 때도 시세대로 인상할 수 있어요. 5%라는 제한이 사라지니까 집주인 재량이 커지죠.",
  },
  {
    q: "임대차3법 전체가 폐지되나요?",
    a: "전월세상한제, 계약갱신청구권, 전월세신고제 셋을 묶어서 임대차3법이라고 불러요. 전체 폐지 논의가 있지만 아직 법 개정은 안 됐어요.",
  },
  {
    q: "묵시적갱신도 폐지 대상인가요?",
    a: "묵시적갱신은 임대차3법 이전부터 있던 제도예요. 주택임대차보호법 제6조에 근거한 건데 폐지 논의 대상이 아니에요.",
  },
  {
    q: "지금 전세 갱신하면 5% 상한 적용되나요?",
    a: "네, 2026년 3월 현재 적용돼요. 법이 바뀌기 전까지는 갱신 시 5% 이내만 인상 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "주택임대차보호법 제7조 (차임 증감 청구)", url: "https://www.law.go.kr/법령/주택임대차보호법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국토교통부: 임대차 정책", url: "https://www.molit.go.kr" },
      { label: "국회 의안정보시스템", url: "https://likms.assembly.go.kr/bill/main.do" },
    ],
  },
];

const RELATED = [
  { slug: "전월세상한제", title: "전월세상한제 5% 상한 적용 기준", description: "갱신 시 보증금 인상 한도예요." },
  { slug: "전월세상한제-위반", title: "전월세상한제 위반 시 대응", description: "5% 초과 인상 시 거부 방법이에요." },
  { slug: "전세-재계약-묵시적갱신", title: "전세 묵시적갱신 조건", description: "통보 없으면 2년 자동 연장돼요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 전월세 · 임대차법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전월세상한제, 정말 폐지됐을까?<br />
        현황과 대비 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        뉴스에서 "전월세상한제 폐지"라는 말을 보셨죠?
        내 전세 계약에 영향이 있는 건 아닌지, 보증금이 갑자기 올라가는 건 아닌지 불안하실 거예요.
        결론부터 말하면, <strong>2026년 3월 현재 전월세상한제는 폐지되지 않았어요.</strong>
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>폐지됐나요? 지금 현황은?</H2>
      <SectionBadge>2026년 3월 기준</SectionBadge>

      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제7조</a>는
        그대로 유효해요. 계약을 갱신할 때 임대료(보증금 또는 월세)를 5% 이내로만 올릴 수 있다는 규정이 살아있어요.
      </p>

      <GreenBox title="2026년 3월 현황">
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>폐지 여부</strong>: 폐지 안 됨 (현행 유지)</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>5% 상한</strong>: 여전히 적용</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>법적 근거</strong>: 주택임대차보호법 제7조</p>
        <p style={{ margin: 0, lineHeight: 1.9, fontSize: 13 }}><strong>폐지 논의</strong>: 국회에서 논의 중이지만 법 개정 미확정</p>
      </GreenBox>

      <p style={body}>
        정치권에서 폐지 논의가 계속되고 있지만 아직 국회를 통과한 개정안은 없어요.
        지금 전세를 갱신하면 5% 상한이 그대로 적용돼요.
      </p>

      <Divider />

      <H2>폐지되면 어떻게 달라지나요?</H2>

      <p style={body}>
        만약 전월세상한제가 폐지된다면 세입자와 집주인 모두에게 큰 변화가 생겨요.
        가장 큰 차이는 갱신할 때 인상 제한이 사라진다는 점이에요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>세입자 입장 변화</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}><strong>현행</strong>: 갱신 시 5%까지만 인상 → 시세보다 싸게 갱신 가능</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}><strong>폐지 시</strong>: 인상 제한 없음 → 집주인이 시세대로 올릴 수 있음</p>
        <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.9 }}>
          거부하면 나가야 할 수도 있어서 세입자의 협상력이 약해져요.
        </p>
      </BorderBox>

      <p style={body}>
        찬성 측은 집주인이 전세를 안 내놓아서 매물이 줄었다고 주장해요.
        반대 측은 기존 세입자 보호에 효과가 있다고 봐요.
        어느 쪽이든 지금은 법이 바뀌지 않았으니 현행 기준으로 계약하면 돼요.
      </p>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>지금 할 수 있는 대비 방법은?</H2>
      <SectionBadge>실전 대비</SectionBadge>

      <p style={body}>
        폐지 여부와 관계없이 지금 할 수 있는 대비를 해두세요.
        현행법이 유효한 동안 갱신 권리를 최대한 활용하는 게 핵심이에요.
      </p>

      <Steps steps={PREPARE_STEPS} />

      <p style={{ ...body, marginTop: 14 }}>
        법이 개정되면 보통 시행일 이후 갱신분부터 적용돼요.
        이미 갱신한 계약은 영향을 안 받을 가능성이 높으니 가능하면 빨리 갱신해 두는 것도 방법이에요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 주택임대차보호법 기준으로 작성됐어요. 법 개정 시 내용이 달라질 수 있으니 국토교통부 홈페이지에서 최신 정보를 살펴봐요." />
    </ArticleLayout>
  );
}
