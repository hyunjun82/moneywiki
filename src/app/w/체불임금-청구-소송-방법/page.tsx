"use client";

// Q1: 체불임금 청구·소송 방법·증거 확보하기 info
// Q2: 체불임금 청구권은 퇴직일로부터 3년이면 소멸하며, 노동청 진정이 가장 빠른 해결 방법
// Q3: 체불임금 청구권은 퇴직일로부터 3년이면 소멸하며, 노동청 진정이 가장 빠른 해결 방법, 민사소송은 소액사건(2,000만원 이하) 또는 지급명령으로 진행하며 승소율 85% 이상, 증거는 근로계약서, 임금명세서, 카카오톡 대화 등이 유효하며 국민연금 가입 이력으로도 입증 가능
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "체불임금 청구권은 퇴직일로부터 3년이면 소멸하며, 노동", desc: "체불임금 청구권은 퇴직일로부터 3년이면 소멸하며, 노동청 진정이 가장 빠른 해결 방법" },
  { title: "민사소송은 소액사건(2,000만원 이하) 또는 지급명령", desc: "민사소송은 소액사건(2,000만원 이하) 또는 지급명령으로 진행하며 승소율 85% 이상" },
  { title: "증거는 근로계약서, 임금명세서, 카카오톡 대화 등이 유", desc: "증거는 근로계약서, 임금명세서, 카카오톡 대화 등이 유효하며 국민연금 가입 이력으로도 입증 가능" },
];
const CHECKLIST = [
  "체불임금 청구권은 퇴직일로부터 3년이면 소멸하며, 노동청 진정이 가장 빠른 해결 방법",
  "민사소송은 소액사건(2,000만원 이하) 또는 지급명령으로 진행하며 승소율 85% 이상",
  "증거는 근로계약서, 임금명세서, 카카오톡 대화 등이 유효하며 국민연금 가입 이력으로도 입증 가능"
];

const FAQS = [
  { q: "체불임금 청구는 퇴직 후에만 가능한가요?", a: "아니요, 재직 중에도 가능해요. 3개월 이상 임금 체불이 있으면 재직 중에도 노동청에 진정할 수 있어요." },
  { q: "증거가 하나도 없는데 체불임금 받을 수 있나요?", a: "네, 가능해요. 국민연금 가입 이력, 통장 입금 기록, 문자 메시지만 있어도 근로 사실을 입증할 수 있어요." },
  { q: "체불임금 소송 비용은 얼마나 드나요?", a: "소액사건(2,000만원 이하)은 인지대 5,000원부터 시작해요. 승소하면 소송비용을 회사에 청구할 수 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "근로기준법", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부", url: "https://www.moel.go.kr" },
      { label: "대법원", url: "https://glaw.scourt.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        체불임금 청구<br />
        소송 방법·증거 확보하기
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        임금 못 받았을 때 노동청 진정부터 소송까지 단계별 방법 알려드려요. 3년 소멸시효 전에 증거 확보하고 청구하세요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>체불임금 청구권은 퇴직일로부터 3년이면 소멸하며, 노동</H2>
      <p style={body}>체불임금 청구권은 퇴직일로부터 3년이면 소멸하며, 노동청 진정이 가장 빠른 해결 방법</p>
      <GreenBox title="핵심 정리">
        체불임금 청구권은 퇴직일로부터 3년이면 소멸하며, 노동청 진정이 가장 빠른 해결 방법<br />
        민사소송은 소액사건(2,000만원 이하) 또는 지급명령으로 진행하며 승소율 85% 이상<br />
        증거는 근로계약서, 임금명세서, 카카오톡 대화 등이 유효하며 국민연금 가입 이력으로도 입증 가능
      </GreenBox>

      <CategoryButton label="근로 · 노동 정보" count={5} href="/category/근로/노동" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>민사소송은 소액사건(2,000만원 이하) 또는</H2>
      <p style={body}>민사소송은 소액사건(2,000만원 이하) 또는 지급명령으로 진행하며 승소율 85% 이상</p>
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
