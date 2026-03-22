"use client";

// Q1. 출산휴가를 쓰고 복귀한 근로자가 연차휴가가 줄어드는지, 출근율에 어떤 영향을 주는지 궁금한 상황
// Q2. 출산휴가 기간이 출근율 계산에서 출근으로 간주되는지 확인하고, 연차 일수를 정확히 계산한다
// Q3. 출산휴가=출근 간주(근로기준법 제60조), 육아휴직도 출근 간주, 연차 15일 발생 요건(80% 이상 출근), 1년 미만 월 1일
// Q4. GreenBox(결론 요약) + BorderBox(출근율 계산 예시) + Steps(연차 계산법) + FAQ
// MAP-INTRO: 출산휴가 다녀왔더니 연차가 줄었다는 이야기, 혹시 내 경우에도 그런 건 아닌지 걱정되죠
// MAP-TYPE: 절차
// MAP-H2: 출산휴가는 출근으로 치나 > 출근율 계산 방법 > 육아휴직도 마찬가지인가 > 실전 예시 > FAQ
// MAP-COMP: GreenBox > BorderBox > BorderBox > Steps > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CALC_STEPS = [
  {
    title: "총 소정근로일수를 구하세요",
    desc: "1년(입사일~입사 1주년) 동안의 소정근로일수를 계산해요. 주 5일 근무 기준으로 보통 260일 내외예요. 여기서 공휴일·회사 휴일은 빠지고요.",
    tip: "소정근로일수 = 달력 일수 - 휴일",
  },
  {
    title: "출근 일수를 계산하세요",
    desc: "실제 출근한 날 + 출근 간주일(출산휴가·육아휴직·연차사용·업무상 부상 등)을 더해요. 출산휴가 90일은 전부 출근으로 간주되니까 출근 일수에 포함해요.",
    tip: "무단결근·개인 사유 결근만 빠져요",
  },
  {
    title: "출근율 = 출근일수 / 소정근로일수",
    desc: "이렇게 계산한 출근율이 80% 이상이면 다음 해에 연차 15일이 발생해요. 출산휴가 90일이 출근으로 잡히니까, 출산휴가만으로 연차가 줄어드는 일은 없어요.",
    tip: "80% 미만이면 개근 월당 1일씩만 발생",
  },
];

const FAQS = [
  { q: "출산휴가 90일이 전부 출근으로 인정되나요?", a: "네, 전부 출근으로 간주돼요. 근로기준법 제60조 제6항에 명시돼 있어요. 90일이든 100일(미숙아)이든 120일(다태아)이든 전부 출근 처리돼요." },
  { q: "육아휴직도 출근으로 간주되나요?", a: "네, 2019년 법 개정으로 육아휴직 기간도 출근한 것으로 봐요. 출산휴가 + 육아휴직을 연이어 쓰더라도 출근율에는 영향이 없어요. 복귀 후 연차 15일이 그대로 발생하죠." },
  { q: "출산휴가 복귀 후 연차가 줄었다는데요?", a: "법적으로는 줄어들면 안 돼요. 만약 회사에서 출산휴가 기간을 결근 처리해서 연차를 깎았다면 근로기준법 위반이에요. 인사팀에 시정을 요청하고, 안 되면 고용노동부에 진정을 넣을 수 있어요." },
  { q: "연차 소진 후 출산휴가를 쓰면 연차가 먼저 차감되나요?", a: "아니요, 출산전후휴가와 연차휴가는 별개 제도예요. 회사가 출산휴가를 연차로 대체하는 것은 위법이에요. 출산휴가 90일은 법정 유급휴가이고, 연차는 별도로 사용할 수 있어요." },
  { q: "1년 미만 근무자도 출산휴가가 출근으로 치나요?", a: "네, 동일해요. 1년 미만 근무자의 경우 매월 개근하면 1일의 연차가 발생하는데, 출산휴가 기간 중에도 개근으로 간주돼서 월 1일씩 연차가 생겨요." },
  { q: "배우자 출산휴가도 출근 간주되나요?", a: "네, 배우자 출산휴가(20일)도 출근율 계산에서 출근으로 간주돼요. 남녀고용평등법에 따른 법정 휴가이기 때문에 출근율에 불이익이 없어요." },
];

const REFS = [
  { category: "법령", items: [
    { label: "근로기준법 제60조 (연차유급휴가)", url: "https://www.law.go.kr/법령/근로기준법" },
    { label: "근로기준법 제74조 (임산부 보호)", url: "https://www.law.go.kr/법령/근로기준법" },
  ]},
  { category: "참고", items: [
    { label: "고용노동부 - 연차유급휴가 안내", url: "https://www.moel.go.kr" },
  ]},
];

const RELATED = [
  { title: "2026년 출산휴가 급여", slug: "2026년-출산휴가급여", description: "" },
  { title: "출산휴가 미리 앞당겨 사용", slug: "출산휴가-미리-앞당겨-사용", description: "" },
  { title: "단시간근로자 연차휴가", slug: "단시간근로자-유급휴일-연차휴가", description: "" },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>출산·육아</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        출산휴가 쓰면 연차가 줄어들까?{"\n"}
        <span style={{ fontSize: 19, fontWeight: 500, color: "#374151" }}>출근율 계산법과 연차 산정 기준</span>
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        출산휴가 다녀왔더니 연차가 줄었다는 이야기, 혹시 내 경우에도 그런 건 아닌지 걱정되죠.
        결론부터 말하면, 출산휴가 기간은 출근한 것으로 간주돼요.
        연차 산정을 위한 출근율 계산에서 출산휴가 90일은 전부 출근 처리되니까, 출산휴가 때문에 연차가 줄어드는 일은 없어요.
      </p>
      <Divider />

      <H2>출산휴가는 출근으로 간주되나요?</H2>
      <p style={body}>
        네, 법적으로 출근한 것과 같아요.
        근로기준법 제60조 제6항에서 출산전후휴가 기간은 출근한 것으로 본다고 명시하고 있어요.
        일반 출산(90일), 미숙아(100일), 다태아(120일) 모두 마찬가지예요.
      </p>
      <GreenBox title="핵심 결론">
        출산전후휴가 기간 = 출근 간주 (근로기준법 제60조 제6항).
        육아휴직 기간 = 출근 간주 (2019년 법 개정).
        출근율 80% 이상 → 다음 해 연차 15일 그대로 발생.
        회사가 출산휴가를 결근 처리하면 법 위반이에요.
      </GreenBox>
      <p style={body}>
        만약 출산휴가 복귀 후 연차가 줄어 있다면, 회사가 잘못 계산한 거예요.
        인사팀에 시정을 요청하고, 안 되면 고용노동부(1350)에 상담하세요.
      </p>
      <Divider />

      <ArticleAd position="mid" />

      <H2>출근율은 어떻게 계산하나요?</H2>
      <p style={body}>
        연차 발생 요건은 1년간 출근율 80% 이상이에요.
        여기서 출근율은 (출근 일수 / 소정근로일수) x 100으로 계산하죠.
        출산휴가·<a href="/w/출산휴가-미리-앞당겨-사용" style={{ color: "#1D9E75", textDecoration: "underline" }}>유산휴가</a>·육아휴직·업무상 부상 치료 기간은 모두 출근 일수에 포함돼요.
      </p>
      <SectionBadge>출근율 계산 예시</SectionBadge>
      <BorderBox title="예시: 주5일 근무, 출산휴가 90일 사용">
        <p style={{ ...body, marginBottom: 6 }}>소정근로일수: 260일</p>
        <p style={{ ...body, marginBottom: 6 }}>실제 출근: 170일</p>
        <p style={{ ...body, marginBottom: 6 }}>출산휴가(출근 간주): 65일 (토·일 제외한 근무일 기준)</p>
        <p style={{ ...body, marginBottom: 6 }}>출근율: (170 + 65) / 260 = 90.4% → 연차 15일 발생</p>
      </BorderBox>
      <p style={body}>
        출산휴가 90일(달력 기준) 중 실제 소정근로일수에 해당하는 날만 출근 간주 대상이에요.
        토·일이 쉬는 날이면 약 65일 정도가 출근 처리되는 거죠.
      </p>
      <Divider />

      <H2>육아휴직도 마찬가지인가요?</H2>
      <p style={body}>
        네, 육아휴직 기간도 출근한 것으로 간주돼요.
        2019년 법 개정 전에는 육아휴직이 출근율 계산에서 빠져서 연차가 줄어드는 문제가 있었는데, 지금은 해결됐어요.
        출산휴가 + 육아휴직을 연이어 1년 넘게 쓰더라도 복귀 후 연차 15일이 그대로 발생해요.
      </p>
      <BorderBox title="출근 간주되는 기간 정리">
        <p style={{ ...body, marginBottom: 6 }}>출산전후휴가 (90/100/120일)</p>
        <p style={{ ...body, marginBottom: 6 }}>유산·사산 휴가</p>
        <p style={{ ...body, marginBottom: 6 }}>육아휴직</p>
        <p style={{ ...body, marginBottom: 6 }}>배우자 출산휴가 (20일)</p>
        <p style={{ ...body, marginBottom: 6 }}>업무상 부상·질병 치료 기간</p>
      </BorderBox>
      <Divider />

      <H2>연차 계산, 이렇게 하세요</H2>
      <p style={body}>
        출산휴가 복귀 후 내 연차가 맞게 계산됐는지 직접 확인해 보세요.
        아래 3단계로 간단하게 확인할 수 있어요.
      </p>
      <SectionBadge>계산 순서</SectionBadge>
      <Steps steps={CALC_STEPS} />
      <p style={body}>
        3년 이상 근속자는 2년마다 연차 1일씩 추가(최대 25일)되는 것도 잊지 마세요.
        출산휴가 기간이 근속연수 계산에서 빠지지 않으니까, 추가 연차에도 영향이 없어요.
      </p>
      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성했어요. 개별 사안은 고용노동부(1350) 또는 노무사에게 확인하세요." />

      <CategoryButton label="출산·육아" href="/categories/maternity" />
      <RelatedArticles items={RELATED} />
    </div>
  );
}
