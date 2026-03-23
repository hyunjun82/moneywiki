"use client";

// Q1. 감염병으로 가게 휴업 중인데 배달기사 산재보험을 계속 내야 하는지 고민
// Q2. 휴업 중에도 유지 의무 확인 → 감면 신청 → 보험료 절감
// Q3. 산재보험 의무가입, 휴업 시 유지 의무, 보험료 감면 방법, 해지 시 불이익
// Q4. GreenBox(결론: 유지 의무) + Steps(감면 신청 절차) + BorderBox(해지 시 불이익) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "휴업 사실 신고", desc: "근로복지공단에 휴업 사실을 신고해요. 사업장 관할 지사에 방문하거나 온라인으로 가능해요." },
  { title: "보험료 감면 신청", desc: "휴업 기간 동안 보험료 감면을 신청해요. 실제 근로자 수와 보수 기준으로 조정돼요.", tip: "배달기사가 전원 퇴사했으면 가입 대상 '0명'으로 신고" },
  { title: "감면 결과 확인", desc: "감면 적용 후 고지서 금액이 줄었는지 확인해요. 이미 납부한 금액은 정산 시 반환돼요." },
];

const FAQS = [
  { q: "배달기사를 안 쓰는데 보험료를 왜 내야 하나요?", a: "고용 관계가 유지되면 산재보험료 납부 의무가 있어요. 다만 실제 근로가 없으면 보수 기준이 낮아져서 보험료도 줄어요. 전원 퇴사했으면 가입자 수 '0'으로 변경 신고하면 돼요." },
  { q: "산재보험을 임의로 해지하면 어떻게 되나요?", a: "사업주가 임의 해지할 수 없어요. 만약 미가입 상태에서 사고가 나면 사업주가 보험급여 전액을 부담해야 해요. 추가로 과태료도 부과돼요." },
  { q: "특수형태근로종사자(배달기사)도 산재보험 의무인가요?", a: "네, 2022년부터 배달기사 등 특수형태근로종사자도 산재보험 당연적용 대상이에요. 사업주가 보험료의 일부를 부담해요." },
  { q: "보험료를 못 내면 어떻게 되나요?", a: "미납하면 가산금이 붙어요. 체납이 계속되면 재산 압류까지 갈 수 있으니 감면 신청으로 부담을 줄이는 게 좋아요." },
  { q: "감염병 아닌 다른 이유로 휴업해도 같은가요?", a: "네, 휴업 사유와 관계없이 고용 관계가 유지되는 한 산재보험은 유지해야 해요. 경영 악화, 계절적 휴업도 동일해요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "산업재해보상보험법", url: "https://www.law.go.kr/법령/산업재해보상보험법" },
  ]},
  { category: "기관", items: [
    { label: "근로복지공단", url: "https://www.kcomwel.or.kr" },
  ]},
];

const RELATED = [
  { slug: "계약직-정규직-전환-기준-요건", title: "계약직 정규직 전환 기준", description: "기간제 근로자 2년 초과 시 전환 요건이에요." },
  { slug: "고객-폭언-사업주-조치-요구", title: "고객 폭언 사업주 조치 요구", description: "직장에서 폭언 당했을 때 대응 방법이에요." },
  { slug: "근로자의날-당연유급-제외대상", title: "근로자의 날 유급 기준", description: "근로자의 날 유급 여부와 제외 대상이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        감염병 휴업 중 배달기사 산재보험, 유지해야 할까?<br />
        보험료 감면 신청 방법까지
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        코로나 같은 감염병으로 가게 문을 닫았는데 배달기사 산재보험료가 계속 나와서 부담되죠.
        결론부터 말하면 고용 관계가 유지되는 한 산재보험은 해지할 수 없어요. 대신 보험료 감면을 받을 수 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>휴업해도 산재보험은 유지해야 해요</H2>
      <p style={body}>
        산재보험은 사업주가 임의로 해지할 수 없는 의무보험이에요. 휴업 기간에도 근로자(배달기사 포함)와 고용 관계가 있으면 유지 의무가 있어요.
      </p>
      <GreenBox>
        <strong>핵심 정리</strong><br /><br />
        ✓ 휴업 중이라도 고용 관계 유지 → 산재보험 유지 의무<br />
        ✓ 배달기사 전원 퇴사 → 가입자 '0명' 변경 신고 가능<br />
        ✓ 임의 해지 후 사고 발생 → 사업주 전액 부담 + 과태료<br />
        ✓ 보험료 감면 신청으로 부담을 줄일 수 있어요
      </GreenBox>

      <H2>보험료 감면은 이렇게 신청해요</H2>
      <p style={body}>
        휴업 신고를 하면 실제 근로자 수와 보수 기준으로 보험료가 조정돼요. 전원 퇴사했으면 가입자 수 변경만으로도 보험료가 줄어요.
      </p>
      <Steps steps={STEPS} />

      <H2>해지하면 이런 불이익이 있어요</H2>
      <p style={body}>
        보험료가 아까워서 해지하면 오히려 더 큰 비용이 발생할 수 있어요.
      </p>
      <BorderBox>
        <strong>미가입 상태 사고 시</strong> — 보험급여 전액 사업주 부담 (수천만 원~수억 원 가능)<br />
        <strong>산재보험 미가입 과태료</strong> — 보험료의 최대 5배<br />
        <strong>보험료 체납</strong> — 가산금(월 1.2%) + 재산 압류 가능<br /><br />
        ★ 보험료 감면 신청이 해지보다 훨씬 안전하고 합리적이에요
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 산업재해보상보험법 기준으로 작성됐어요. 구체적인 보험료 감면 조건은 근로복지공단(1588-0075)에 문의하세요." />
    </ArticleLayout>
  );
}
