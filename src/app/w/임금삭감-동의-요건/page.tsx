"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 회사에서 갑자기 월급을 깎겠다고 통보하거나 동의서를 내밀었는데, 거부해도 되는지 모르는 상황이에요.
// Q2. 부당 감봉인지 판단하고, 거부 의사를 서면으로 표시하거나 노동청에 신고하는 행동.
// Q3. 개별 서면 동의 필수, 취업규칙 불이익 변경 절차, 거부 방법(내용증명), 노동청 임금체불 신고, 차액+지연이자(연20%).
// Q4. GreenBox(핵심 요약) + Steps(거부→신고 절차) + Checklist(동의 시 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, Checklist,
  ArticleLayout,
} from "@/components/article-ui";

const REJECT_STEPS = [
  { title: "서면으로 거부 의사 표시", desc: "\"임금 삭감에 동의하지 않습니다\"라는 내용증명 우편을 회사에 보내세요. 이메일도 가능하지만 수신 확인이 되어야 해요.", tip: "서면 증거가 있어야 나중에 법적 대응이 가능해요." },
  { title: "급여명세서·근로계약서 보관", desc: "삭감 전후 급여명세서를 매달 보관하세요. 차액이 임금 체불 증거가 돼요." },
  { title: "고용노동부 민원마당 신고", desc: "관할 지방고용노동청에 '임금 체불 진정'을 제기해요. 온라인(minwon.moel.go.kr)으로도 가능해요.", tip: "삭감 전후 급여명세서, 근로계약서, 거부 의사 서면을 첨부하세요." },
  { title: "근로감독관 조사", desc: "근로감독관이 회사에 출석 요구서를 발송하고, 부당 감봉이 확인되면 시정 명령을 내려요." },
  { title: "차액 + 지연이자 수령", desc: "회사는 14일 이내에 차액을 지급해야 해요. 지연이자는 연 20%가 자동 발생해요." },
];

const AGREE_CHECKS = [
  "삭감 기간이 구체적 날짜로 명시되어 있는지 (\"경영 호전 시\" 같은 막연한 표현 X)",
  "기간 종료 후 자동 원상복구 조항이 있는지",
  "삭감 금액과 사유가 동의서에 명확히 적혀 있는지",
  "동의서가 2부 작성되고 본인 사본을 보관할 수 있는지",
  "복귀 조건이 객관적 지표(\"분기 영업이익 ○○억 달성 시\")로 정해져 있는지",
];

const FAQS = [
  { q: "경영 악화를 이유로 임금을 깎을 수 있나요?", a: "경영 악화 여부와 관계없이 근로자 개별 서면 동의 없이는 불가능해요. 동의 없이 삭감하면 근로기준법 위반이에요." },
  { q: "취업규칙 변경으로 월급이 줄었는데 동의 안 했어요", a: "취업규칙 불이익 변경은 근로자 과반수 동의가 필수예요. 동의 없으면 변경 자체가 무효이고, 원래 임금을 청구할 수 있어요." },
  { q: "동의서에 서명했는데 취소할 수 있나요?", a: "\"서명 안 하면 해고\" 같은 강압 상황에서 서명했다면 취소 가능해요. 노동청에 진정하면 강압적 동의로 인정받을 수 있어요." },
  { q: "임금 삭감을 거부하면 해고당할 수 있나요?", a: "거부를 이유로 해고하면 부당해고예요. 노동위원회에 구제신청할 수 있고, 3년 이하 징역 또는 3천만원 이하 벌금 대상이에요." },
  { q: "차액은 얼마나 받을 수 있나요?", a: "삭감된 기간 동안의 차액 전액 + 지연이자(연 20%)를 받을 수 있어요. 매달 50만원씩 6개월이면 300만원 + 지연이자예요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "근로기준법 제4조·제17조·제94조", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 민원마당", url: "https://minwon.moel.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 임금 · 노동법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임금삭감, 동의 안 하면 되나요?<br />
        거부 방법과 노동청 신고 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사에서 갑자기 "다음 달부터 월급 10% 깎겠습니다" 통보 받으셨죠?
        동의서를 내밀며 서명하라고 하는데, 안 하면 어떻게 되는지 걱정되실 거예요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>상 개별 서면 동의 없이 임금을 깎는 건 불법이에요.
      </p>

      <Divider />

      <H2>동의 없이 깎으면 불법인가요?</H2>
      <p style={body}>
        네, 불법이에요. 임금은 근로 조건 중에서 가장 핵심이라서 변경 기준이 엄격해요.
        회사가 아무리 경영 상황이 어렵다고 해도 근로자 동의 없이 일방적으로 깎을 수 없어요.
      </p>

      <GreenBox>
        임금삭감 법적 요건 핵심이에요.<br />
        · 근로자 개별 서면 동의 필수 — 구두 동의는 효력 없음<br />
        · 동의서에 삭감 금액·기간·사유 명시 필수<br />
        · "서명 안 하면 해고" 등 강압적 동의는 무효<br />
        · 취업규칙 불이익 변경도 근로자 과반수 동의 필요<br />
        · 동의 없는 삭감 = 임금 체불 → 노동청 신고 대상
      </GreenBox>

      <Divider />

      <H2>거부하고 신고하는 절차가 어떻게 되나요?</H2>
      <p style={body}>
        동의 없이 월급이 줄었다면 임금 체불과 동일하게 처리돼요.
        아래 절차로 원래 금액을 돌려받을 수 있어요.
      </p>

      <SectionBadge>거부 → 신고 5단계</SectionBadge>
      <Steps steps={REJECT_STEPS} />

      <p style={body}>
        회사가 시정 명령을 불이행하면 검찰에 송치돼요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제109조</a>에 따라 3년 이하 징역 또는 3천만원 이하 벌금이에요.
        <a href="/w/임금체불-진정-신고-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금체불 진정 신고 방법</a>도 참고하세요.
      </p>

      <Divider />

      <H2>어쩔 수 없이 동의할 때 꼭 챙겨야 할 것</H2>
      <p style={body}>
        불가피하게 동의해야 하는 상황이라면 최소한의 보호 장치를 동의서에 넣어야 해요.
      </p>

      <SectionBadge>동의 시 체크리스트</SectionBadge>
      <Checklist items={AGREE_CHECKS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법·고용노동부 자료를 바탕으로 작성했어요. 구체적인 사안은 노무사 상담이나 고용노동부(1350) 문의를 권장해요." />
    </ArticleLayout>
  );
}
