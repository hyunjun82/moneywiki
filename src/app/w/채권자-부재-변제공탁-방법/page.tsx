"use client";

// Q1. 빚을 갚으려는데 채권자가 이사 가고 없거나 연락이 안 돼서 변제기는 다가오는데 막막한 상황
// Q2. 변제공탁 사유를 확인하고, 관할 법원 공탁서에 절차대로 공탁해서 채무 소멸
// Q3. 수령 거부/수령 불가/채권자 불명 3가지 사유, 관할 법원(채권자 주소지), 원금+이자 정확히, 공탁필증 보관
// Q4. GreenBox(공탁 사유) + Steps(공탁 절차) + Checklist(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const DEPOSIT_STEPS = [
  {
    title: "관할 법원 공탁서 확인",
    description: "원칙적으로 채무 이행지(채권자의 주소지)를 관할하는 법원 공탁서예요. 금전채무라면 채권자 주소지 관할 법원이에요.",
  },
  {
    title: "공탁 서류 준비",
    description: "공탁서, 공탁금 납부서, 신분증, 채권 관계 증명 서류(차용증, 계약서 등)를 준비해요. 양식은 법원 전자공탁 홈페이지(iros.go.kr)에서 다운받을 수 있어요.",
  },
  {
    title: "공탁금 납부",
    description: "법원 공탁서에서 원금+이자+지연손해금을 합산한 금액을 현금이나 계좌이체로 납부해요. 수수료도 함께 내야 해요.",
  },
  {
    title: "공탁필증 수령 및 보관",
    description: "공탁이 완료되면 공탁필증이 발급돼요. 채무 소멸의 증거이니 반드시 잘 보관하세요.",
  },
  {
    title: "채권자에게 통지 (권장)",
    description: "법적 필수는 아니지만 채권자 연락처를 아는 경우 '공탁했으니 법원에서 찾아가세요'라고 알려주는 게 좋아요.",
  },
];

const CAUTION_LIST = [
  "원금뿐 아니라 이자·지연손해금까지 정확히 계산해서 공탁 (부족하면 무효)",
  "변제기 전에 공탁해야 이자 부담이 줄어듦",
  "공탁 사유를 구체적으로 기재 (채권자 수령 거부, 소재 불명 등)",
  "채권자 찾으려고 노력한 증거 남기기 (전화 기록, 내용증명, 문자 등)",
  "공탁필증은 분쟁 대비용으로 영구 보관",
  "채권자가 공탁금 수령 전까지 공탁 취소 가능",
];

const FAQS = [
  {
    q: "변제공탁하면 채무가 완전히 없어지나요?",
    a: "네, 공탁이 유효하게 완료되면 그 순간부터 채무가 소멸해요. 이자도 안 붙고 강제집행도 못 해요.",
  },
  {
    q: "채권자가 누군지 모를 때도 공탁할 수 있나요?",
    a: "네. 선량한 관리자 주의로 찾아봤는데도 모르겠다면 공탁 사유에 해당해요.",
  },
  {
    q: "공탁금을 찾아가지 않으면 어떻게 되나요?",
    a: "법원에 계속 보관돼요. 소멸시효가 없어서 10년이든 20년이든 채권자가 나타나면 찾아갈 수 있어요.",
  },
  {
    q: "공탁 비용은 누가 부담하나요?",
    a: "공탁 수수료는 채무자가 내요. 다만 채권자 잘못(수령 거부 등)으로 공탁하게 됐다면 나중에 손해배상을 청구할 수 있어요.",
  },
  {
    q: "공탁을 나중에 취소할 수 있나요?",
    a: "채권자가 공탁금을 찾아가기 전까지는 취소 가능해요. 채권자를 나중에 찾았거나 직접 갚고 싶다면 취소하고 돈을 돌려받을 수 있어요.",
  },
  {
    q: "전자공탁도 가능한가요?",
    a: "네, 법원 전자공탁 시스템(iros.go.kr)에서 온라인으로 신청할 수 있어요. 직접 방문하지 않아도 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "민법 제487조 (변제공탁)", url: "https://www.law.go.kr/법령/민법" },
      { label: "공탁법", url: "https://www.law.go.kr/법령/공탁법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "찾기쉬운 생활법령정보: 변제공탁", url: "https://www.easylaw.go.kr" },
      { label: "법원 전자공탁 시스템", url: "https://www.iros.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "금전채무-변제-방법", title: "금전채무 변제 방법", description: "일반적인 채무 상환 절차예요." },
  { slug: "채무-소멸-시효", title: "채무 소멸시효 기간", description: "채무가 자연 소멸하는 기간이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 채무 · 공탁</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        채권자가 없는데 어떻게 갚지?<br />
        변제공탁 사유와 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        빌린 돈을 갚으려고 채권자를 찾아갔는데 이사 가고 없고 전화도 안 받죠?
        변제기는 다가오는데 이자만 쌓이니 답답하실 거예요.
        이럴 때 법원에 돈을 맡겨서 채무를 소멸시키는 <strong>변제공탁</strong> 제도가 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>변제공탁이 가능한 사유는 뭔가요?</H2>
      <SectionBadge>공탁 사유</SectionBadge>

      <p style={body}>
        아무 이유 없이 공탁할 수는 없어요.
        <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제487조</a>에서
        정한 세 가지 사유 중 하나에 해당해야 해요.
      </p>

      <GreenBox title="변제공탁 법정 사유 3가지">
        <p style={{ margin: "0 0 6px", lineHeight: 1.9, fontSize: 13 }}><strong>1. 채권자가 수령을 거부할 때</strong></p>
        <p style={{ margin: "0 0 10px", lineHeight: 1.9, fontSize: 13, paddingLeft: 12 }}>갚으려고 했는데 "안 받아"라고 거절하는 경우. 거절 이유는 상관없어요.</p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9, fontSize: 13 }}><strong>2. 채권자가 수령할 수 없을 때</strong></p>
        <p style={{ margin: "0 0 10px", lineHeight: 1.9, fontSize: 13, paddingLeft: 12 }}>채권자가 사망 후 상속인 불명, 의식불명, 실종 상태인 경우예요.</p>
        <p style={{ margin: "0 0 6px", lineHeight: 1.9, fontSize: 13 }}><strong>3. 채무자 과실 없이 채권자가 누구인지 모를 때</strong></p>
        <p style={{ margin: 0, lineHeight: 1.9, fontSize: 13, paddingLeft: 12 }}>선량한 관리자 주의를 다해 찾았는데도 알 수 없는 경우예요.</p>
      </GreenBox>

      <p style={body}>
        예를 들어 1,000만 원을 빌렸는데 갚으려고 찾아갔더니 이사 가고 없고, 전화도 안 받고, 가족 연락처도 모르는 상황이라면 세 번째 사유에 해당해요.
      </p>

      <Divider />

      <H2>공탁 절차는 어떻게 되나요?</H2>
      <SectionBadge>공탁 절차</SectionBadge>

      <p style={body}>
        법원 공탁서에 돈을 맡기고 공탁필증을 받으면 돼요.
        <a href="https://www.iros.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>전자공탁</a>으로 온라인 신청도 가능해요.
      </p>

      <Steps steps={DEPOSIT_STEPS} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>공탁할 때 꼭 주의할 점은?</H2>
      <SectionBadge>주의사항</SectionBadge>

      <p style={body}>
        금액이 부족하거나 사유가 불분명하면 공탁이 무효 처리될 수 있어요.
        아래 사항을 반드시 챙기세요.
      </p>

      <Checklist items={CAUTION_LIST} />

      <p style={{ ...body, marginTop: 14 }}>
        공탁이 유효하게 완료되면 그 순간부터 채무가 소멸해요.
        더 이상 이자가 안 붙고, 채권자가 강제집행도 못 해요.
        채권자는 나중에 법원에서 공탁금을 찾아가면 되고, 채무자가 따로 해줄 건 없어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 민법 기준으로 작성됐어요. 공탁 절차와 서류는 관할 법원마다 다를 수 있으니 법원 공탁서나 법무사와 상담하세요." />
    </ArticleLayout>
  );
}
