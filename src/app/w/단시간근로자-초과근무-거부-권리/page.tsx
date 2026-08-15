"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 파트타임으로 일하는데 사장님이 초과근무를 시키려 해서 거부할 수 있는지, 거부하면 불이익 받는지 궁금한 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 법적 근거를 알고 초과근무를 거부하거나, 동의 시 가산수당을 받고, 강요 시 고용노동부에 신고하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 기간제법 제6조(동의 필수, 주12시간 한도), 가산수당 50%, 위반 시 벌금 1천만원, 거부 시 불이익 금지, 신고 절차.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(결론 요약) + BorderBox(법 조문 정리) + Steps(신고 절차) + Checklist(거부 전 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "단시간근로자도 연장근로수당 받을 수 있나요?",
    a: "네. 소정근로시간 초과분에 대해 통상임금의 50%를 가산해서 받아요. 시급 10,000원이면 초과근무 시간에는 15,000원이에요.",
  },
  {
    q: "계약서에 초과근무 가능하다고 써있으면요?",
    a: "계약서에 명시했더라도 주 12시간 한도를 넘기면 불법이에요. 한도 내라도 매번 동의를 구해야 해요.",
  },
  {
    q: "거부했다가 스케줄에서 빼버리면요?",
    a: "그것도 불이익 처우예요. 기간제법에서 초과근무 거부를 이유로 한 불이익을 금지하고 있어요. 증거 남겨두고 노동청에 신고하세요.",
  },
  {
    q: "주 15시간 미만 단시간근로자도 해당되나요?",
    a: "네. 기간제법 제6조는 소정근로시간과 관계없이 모든 단시간근로자에게 적용돼요.",
  },
  {
    q: "초과근무 동의는 구두로 해도 되나요?",
    a: "법적으로는 구두 동의도 유효하지만, 나중에 분쟁 생기면 증명이 어려워요. 서면이나 문자로 남기는 게 안전해요.",
  },
  {
    q: "사장님이 '안 하면 잘라'라고 협박하면요?",
    a: "초과근무 거부를 이유로 한 해고는 부당해고예요. 녹음이나 문자 증거를 남기고, 고용노동부 신고하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "기간제 및 단시간근로자 보호 등에 관한 법률 제6조", url: "https://www.law.go.kr/법령/기간제및단시간근로자보호등에관한법률" },
      { label: "근로기준법(법제처)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 민원마당", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연장근로수당", title: "연장근로수당 계산법", description: "초과근무 했을 때 수당 얼마 받는지 계산해보세요." },
  { slug: "부당해고-구제-절차-복직-조건", title: "부당해고 구제 절차", description: "초과근무 거부로 해고당했다면 구제 신청하세요." },
  { slug: "근로기준법", title: "근로기준법 핵심 정리", description: "단시간근로자도 보호받는 근로기준법 전체를 확인하세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 단시간근로 · 초과근무</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        단시간근로자 초과근무, 거부할 수 있나요?<br />
        법적 근거와 대응 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        시간제로 일하는데 사장님이 갑자기 &quot;2시간만 더 해줘&quot;라고 하면 난처하죠.
        거절하면 다음 스케줄에서 빠질까 걱정되고요. 결론부터 말하면,
        단시간근로자는 초과근무를 거부할 수 있고 이걸 이유로 불이익을 주면 법 위반이에요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>초과근무 거부, 법적으로 가능한가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/기간제및단시간근로자보호등에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>기간제 및 단시간근로자 보호법 제6조</a>가 핵심이에요.
        사용자가 단시간근로자에게 소정근로시간을 초과해서 일하게 하려면 반드시 해당 근로자의 동의를 받아야 해요.
        동의 없이 시키면 근로자는 이를 거부할 수 있어요.
      </p>

      <GreenBox title="핵심 3줄 요약">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li>단시간근로자 초과근무 → 반드시 본인 동의 필요</li>
          <li>동의해도 주 12시간 한도 → 넘기면 위법</li>
          <li>거부 이유로 불이익 주면 → 1천만원 이하 벌금</li>
        </ul>
      </GreenBox>

      <Divider />

      <H2>초과근무 한도와 가산수당은?</H2>
      <p style={body}>
        동의했더라도 1주간 12시간을 초과할 수 없어요. 하루 4시간, 주 5일 근무자라면 주 20시간이 소정근로시간이고, 여기에 12시간까지만 추가 가능해요.
        초과근무에 대해서는 통상임금의 50%를 가산해서 받아요.
      </p>

      <SectionBadge>초과근로 가산수당 계산</SectionBadge>
      <BorderBox title="가산수당 계산 예시">
        <p style={{ margin: 0, lineHeight: 1.9, fontSize: 14 }}>
          시급 10,000원 × 초과근무 3시간 = 기본 30,000원<br />
          가산수당(50%) = 15,000원<br />
          <strong>총 지급액 = 45,000원</strong>
        </p>
      </BorderBox>

      <Divider />

      <H2>강요당할 때 어떻게 대응하나요?</H2>
      <p style={body}>
        계속 초과근무를 강요하거나 거부했더니 스케줄에서 빼거나 해고를 암시한다면, 증거를 모아서 <a href="https://minwon.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>에 신고하세요.
      </p>

      <SectionBadge>신고 절차</SectionBadge>
      <Steps steps={[
        { title: "근로계약서 확인", desc: "소정근로시간이 명확히 기재돼 있는지 확인하세요.", tip: "계약서 사본은 반드시 보관해두세요." },
        { title: "증거 확보", desc: "초과근무 강요 문자, 카톡, 녹음 등을 저장하세요.", tip: "근무시간 기록(출퇴근 사진 등)도 유용해요." },
        { title: "사업장 관할 노동청 신고", desc: "고용노동부 민원마당(minwon.moel.go.kr) 또는 전화 1350으로 신고해요.", tip: "온라인 신고는 10분이면 끝나요." },
        { title: "근로감독관 조사", desc: "신고 후 근로감독관이 사실관계를 조사해요." },
        { title: "시정명령·과태료 부과", desc: "위반 확인되면 사업주에게 시정명령 및 1천만원 이하 벌금이 부과돼요." },
      ]} />

      <Divider />

      <H2>거부 전에 체크해야 할 것들</H2>
      <p style={body}>
        무작정 거부하기 전에 아래 사항을 먼저 점검하세요. 정당한 거부인지 확인하고, 증거를 갖춰두면 훨씬 안전해요.
      </p>

      <Checklist items={[
        "근로계약서에 소정근로시간이 명시돼 있는지 확인",
        "초과근무 요청이 주 12시간 한도를 넘는지 확인",
        "동의 여부를 서면(문자·카톡)으로 남길 준비",
        "거부 시 불이익 발언 증거(녹음·캡처) 확보",
        "관할 노동청 연락처(1350) 저장",
      ]} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 법령을 바탕으로 작성됐어요. 구체적인 사안은 고용노동부(1350) 또는 노무사 상담을 권장해요." />
    </ArticleLayout>
  );
}
