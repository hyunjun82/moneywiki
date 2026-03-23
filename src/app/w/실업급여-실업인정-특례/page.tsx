"use client";

// Q1. 아파서 구직활동을 못 했는데, 실업급여가 끊길까 봐 걱정되는 상황이에요.
// Q2. 특례 사유를 확인하고 고용24에서 증빙서류를 첨부해 실업인정 특례를 신청하는 행동.
// Q3. 특례 사유(질병·경조사·천재지변), 증빙서류, 신청 방법, 급여 정상 지급 여부.
// Q4. GreenBox(특례 사유) + Steps(신청 절차) + DocTable(증빙서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { DocTable } from "@/components/article-ui/DocTable";

const EVIDENCE_DOCS = [
  { name: "진단서 또는 소견서", required: true, where: "병원에서 발급" },
  { name: "입원확인서", required: false, where: "입원한 경우 병원에서 발급" },
  { name: "부고장 또는 가족관계증명서", required: true, where: "경조사 사유 시" },
  { name: "이재민 확인서", required: true, where: "천재지변 시 읍면동 주민센터" },
  { name: "교육훈련 수강 증빙", required: false, where: "직업훈련 수강 시" },
];

const APPLY_STEPS = [
  { title: "고용24 접속", desc: "ei.go.kr 또는 work24.go.kr에 로그인해요." },
  { title: "실업인정 신청 메뉴 진입", desc: "정해진 실업인정일에 신청 메뉴를 열어요." },
  { title: "특례 사유 선택", desc: "질병·경조사·천재지변 등 해당 사유를 선택해요." },
  { title: "증빙서류 첨부", desc: "진단서·부고장 등 증빙을 스캔하거나 사진으로 첨부해요.", tip: "서류가 안 되면 고용센터 방문 제출도 가능" },
  { title: "신청 완료", desc: "제출하면 심사 후 특례 인정 여부가 통보돼요." },
];

const FAQS = [
  { q: "특례로 인정받으면 급여가 줄어드나요?", a: "아니에요. 특례로 실업인정된 기간도 정상 금액이 지급돼요. 소정급여일수도 정상 소진되니 불이익은 없어요." },
  { q: "감기 정도도 특례 사유가 되나요?", a: "7일 이상 취업이 곤란한 질병이어야 해요. 감기 수준이면 인정되기 어렵고, 진단서에 '취업 곤란' 소견이 있어야 해요." },
  { q: "경조사는 어디까지 인정되나요?", a: "본인·배우자의 직계존비속 사망, 결혼 등이 인정돼요. 먼 친척은 인정되지 않을 수 있어요. 고용센터에서 개별 판단해요." },
  { q: "특례 신청을 깜빡 잊었으면 어떡하나요?", a: "실업인정일에 신청하지 않으면 해당 기간 급여가 지급되지 않을 수 있어요. 가능한 빨리 고용센터에 연락해서 사후 처리를 문의하세요." },
  { q: "특례를 여러 번 쓸 수 있나요?", a: "횟수 제한은 없어요. 정당한 사유가 있을 때마다 증빙을 첨부해 신청할 수 있어요. 다만 너무 잦으면 심사가 엄격해질 수 있어요." },
  { q: "고용센터 방문 없이 온라인으로 다 되나요?", a: "대부분 고용24에서 처리할 수 있어요. 다만 원본 서류를 요구하는 경우엔 고용센터 방문이 필요할 수 있어요." },
];

const REFERENCES = [
  { category: "법령 및 안내", items: [
    { label: "고용보험법 제44조(법제처)", url: "https://www.law.go.kr/법령/고용보험법" },
    { label: "고용24", url: "https://www.ei.go.kr" },
  ]},
];

const RELATED = [
  { slug: "구직급여-연장-받기", title: "구직급여 연장 받는 방법", description: "소정급여일수 이후에도 연장 급여를 받을 수 있는 조건이에요." },
  { slug: "실업급여-1차-실업인정", title: "실업급여 1차 실업인정", description: "처음 실업인정 받을 때 절차와 준비물을 정리했어요." },
  { slug: "실업급여-비과세", title: "실업급여 비과세 여부", description: "실업급여에 세금이 붙는지 궁금하다면 확인해보세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        아파서 구직활동 못 했는데, 실업급여 끊기나요?<br />
        실업인정 특례 사유와 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        구직활동을 해야 하는데 몸이 아프거나 가족 경조사가 생겨서 활동을 못 한 적 있죠? 이런 경우 실업인정 특례를 받으면 구직활동 없이도 실업급여가 정상 지급돼요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제44조</a>에서 정한 정당한 사유만 입증하면 돼요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>어떤 사유가 특례로 인정되나요?</H2>
      <p style={body}>
        모든 사유가 되는 건 아니에요. 법에서 정한 정당한 사유에 해당해야 하고, 증빙서류로 입증해야 해요.
      </p>

      <GreenBox title="실업인정 특례 주요 사유">
        · 질병·부상: 7일 이상 취업이 곤란한 경우 (진단서 필요)<br />
        · 경조사: 본인·배우자 직계존비속 사망, 결혼 등<br />
        · 천재지변: 재해로 구직활동이 불가능한 경우<br />
        · 직업훈련: 고용센터 인정 직업훈련 수강 중
      </GreenBox>

      <Divider />

      <H2>증빙서류는 뭘 준비해야 하나요?</H2>
      <p style={body}>
        사유별로 필요한 서류가 달라요. 미리 준비해두면 실업인정일에 바로 신청할 수 있어요.
      </p>

      <DocTable docs={EVIDENCE_DOCS} />

      <Divider />

      <H2>고용24에서 이렇게 신청하세요</H2>
      <p style={body}>
        실업인정일에 고용24에서 온라인으로 처리할 수 있어요. 증빙서류를 첨부하면 돼요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <p style={body}>
        심사는 보통 2~3일 내에 완료돼요. 특례가 인정되면 해당 기간 실업급여가 정상 지급되니 안심하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 고용보험법을 기준으로 작성됐어요. 특례 인정 여부는 고용센터의 개별 심사에 따라 달라질 수 있으니 고용24에서 상세 안내를 확인하세요." />
    </ArticleLayout>
  );
}
