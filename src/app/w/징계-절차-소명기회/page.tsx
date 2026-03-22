"use client";

// Q1. 회사에서 갑자기 징계 통보를 받았는데 소명 기회도 없이 징계당할 위기에 처한 상황이에요.
// Q2. 소명기회 미부여 시 징계 무효 여부를 판단하고, 노동위원회 구제신청으로 대응하는 행동.
// Q3. 소명기회 필수(판례), 최소 3일 이상, 구체적 사유 통보 의무, 무효 사유 4가지, 구제신청 3개월 이내.
// Q4. GreenBox(핵심 결론) + Steps(대응 절차) + BorderBox(무효 사유) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "소명기회 없이 해고당했는데 무효인가요?", a: "네, 무효 가능성이 높아요. 대법원은 소명기회 미부여 징계를 절차상 하자로 보고 무효 판결을 내려요. 노동위원회에 3개월 이내 구제신청하세요." },
  { q: "소명 기회를 하루만 줬는데 정당한가요?", a: "판례상 최소 3일 이상이 기준이에요. 하루만 주면 실질적 소명 기회를 안 준 것으로 봐요." },
  { q: "징계위원회에서 소명했는데도 징계받으면?", a: "징계 사유가 정당한지, 징계 수준이 과도하지 않은지 검토해야 해요. 부당하면 노동위원회에 구제신청하세요." },
  { q: "같은 잘못으로 두 번 징계받을 수 있나요?", a: "안 돼요. 이중징계는 무효예요. 한 번 징계한 사항을 다시 징계 사유로 삼을 수 없어요." },
  { q: "노동위원회 구제신청 비용이 있나요?", a: "무료예요. 신청서만 작성해서 내면 돼요. 변호사 없이도 가능하고, 법률구조공단(132)에서 무료 상담도 받을 수 있어요." },
  { q: "징계 소명서는 어떻게 쓰나요?", a: "징계 사유 하나하나에 대해 구체적으로 반박해요. 날짜, 상황, 증거를 적고, 동료 진술서나 이메일 등 증빙을 첨부하세요." },
];

const REFERENCES = [
  {
    category: "법령·판례",
    items: [
      { label: "근로기준법 제23조", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 부당징계 구제", url: "https://www.moel.go.kr" },
      { label: "법률구조공단 무료 상담", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-신청방법", title: "실업급여 신청방법", description: "해고 후 실업급여 받는 절차를 알려드려요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동 · 징계</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        징계 절차와 소명기회<br />
        부당징계 무효 사유와 대응 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사에서 갑자기 징계 통보가 왔는데 소명할 기회도 안 줬나요?
        징계 전에는 반드시 소명기회를 줘야 해요.
        안 주면 징계 자체가 무효가 될 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>소명기회 없는 징계는 무효예요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제23조</a>는
        정당한 이유 없는 해고를 금지해요. 대법원 판례는 징계 전 소명기회 부여를 정당한 절차의 필수 요건으로 봐요.
        소명기회 없이 징계하면 사유가 실제로 있더라도 절차상 하자로 무효가 될 수 있어요.
      </p>

      <GreenBox>
        소명기회의 3가지 필수 요소예요.<br />
        · 징계 사유를 구체적으로 통보 (날짜·시간·행위 명시)<br />
        · 충분한 준비 시간 부여 (판례상 최소 3일 이상)<br />
        · 소명 방법 안내 (서면 제출, 출석 진술, 대리인 동석 여부)
      </GreenBox>

      <p style={body}>
        "할 말 있으면 해봐" 수준으로는 안 돼요.
        징계위원회 당일 아침에 통보하거나, 사유를 애매하게 적어서 뭘 반박해야 할지 모르게 하면
        실질적 소명기회를 안 준 것으로 봐요.
      </p>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>징계가 무효가 되는 4가지 경우</H2>
      <p style={body}>
        소명기회 미부여 외에도 징계가 무효가 되는 사유가 여러 가지예요.
      </p>

      <SectionBadge>징계 무효 사유</SectionBadge>
      <BorderBox>
        <strong>소명기회 미부여</strong> — 가장 대표적인 무효 사유예요. 형식적 기회만 준 경우도 포함돼요.<br /><br />
        <strong>징계 사유 없거나 과도</strong> — 잘못한 게 없는데 징계하거나, 5분 지각에 감봉 3개월은 과도해서 무효예요.<br /><br />
        <strong>이중징계</strong> — 같은 잘못으로 두 번 징계하면 안 돼요. 이미 견책받은 사안으로 감봉하면 무효예요.<br /><br />
        <strong>징계권 남용</strong> — 노조 활동 탄압, 퇴직 압박 목적의 징계는 권리 남용으로 무효예요.
      </BorderBox>

      <Divider />

      <H2>부당징계 받으면 이렇게 대응해요</H2>
      <p style={body}>
        소명기회 없이 징계받거나 부당한 징계를 받았다면 즉시 대응해야 해요.
        <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a> 관할 노동위원회에 구제신청하는 게 가장 빠른 방법이에요.
      </p>

      <SectionBadge>대응 절차</SectionBadge>
      <Steps steps={[
        { title: "증거 확보", desc: "징계통보서, 이메일, 문자, 녹음 등 소명기회 미부여 증거를 모아요. 날짜와 시간이 중요해요." },
        { title: "노동위원회 구제신청 (3개월 이내)", desc: "징계일로부터 3개월 이내에 관할 지방노동위원회에 부당징계 구제신청서를 제출해요. 무료예요.", tip: "3개월 넘기면 신청 자체가 안 돼요" },
        { title: "심판 결정 (60일 이내)", desc: "노동위원회가 60일 이내에 결정을 내려요. 구제명령이 나오면 회사는 징계를 취소해야 해요." },
        { title: "불복 시 법원 소송", desc: "노동위원회 결정에 불복하면 법원에 징계 무효 확인 소송을 제기할 수 있어요." },
      ]} />

      <p style={body}>
        변호사 비용이 부담되면 <a href="https://www.klac.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>법률구조공단</a>(전화 132)에서 무료 법률 상담과 소송 지원을 받을 수 있어요.
        월 평균 소득 400만원 이하면 무료예요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 대법원 판례를 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 법률 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
