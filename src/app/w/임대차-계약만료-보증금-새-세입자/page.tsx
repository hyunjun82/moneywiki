"use client";

// Q1. 전세 계약 만료됐는데 집주인이 "새 세입자 들어오면 보증금 줄게"라고 하는 상황
// Q2. 새 세입자 입금 조건부 반환의 위험성을 파악하고, 보증금을 안전하게 돌려받는 조치를 취한다
// Q3. 이사 시 대항력 상실, 임차권등기명령, 내용증명 발송, 보증금반환소송, 전세보증보험
// Q4. GreenBox(핵심 경고) + Steps(대응 절차) + BorderBox(대항력 설명) + Checklist(확인 사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "이사 가기 전에 임차권등기명령을 신청하세요",
    desc: "이사를 나가면 전입신고가 말소되면서 대항력이 사라져요. 임차권등기명령을 받아두면 이사 나가도 대항력과 우선변제권이 유지돼요. 관할 법원에 신청하면 1~2주면 처리돼요.",
    tip: "비용: 인지대 2,000원 + 송달료 약 5,000원",
  },
  {
    title: "내용증명으로 보증금 반환을 청구하세요",
    desc: "계약 만료일 전에 내용증명 우편으로 보증금 반환을 정식 청구하세요. 반환 기한을 명시하고, 기한 내 미반환 시 법적 조치를 취하겠다는 내용을 담으면 돼요.",
  },
  {
    title: "보증금 반환이 안 되면 지급명령 또는 소송을 제기하세요",
    desc: "기한 내 반환이 안 되면 법원에 지급명령을 신청하거나 보증금반환청구소송을 제기할 수 있어요. 지급명령은 소송보다 빠르고 비용이 적어요.",
    tip: "지급명령 비용: 소장 인지대의 1/10",
  },
  {
    title: "전세보증보험에 가입돼 있다면 보증기관에 청구하세요",
    desc: "HUG(주택도시보증공사) 전세보증보험에 가입돼 있으면 보증기관에서 먼저 보증금을 지급해줘요. 계약 만료 후 1개월 이내에 청구해야 해요.",
    link: { label: "HUG 바로가기", href: "https://www.khug.or.kr" },
  },
];

const CHECKLIST = [
  "임차권등기명령 신청 / 이사 전 필수",
  "내용증명 발송 / 반환 기한 명시",
  "전세보증보험 가입 여부 확인 / HUG, SGI 등",
  "확정일자 받았는지 확인 / 우선변제권 요건",
  "등기부등본 확인 / 근저당, 가압류 등 권리 관계",
];

const FAQS = [
  {
    q: "새 세입자 들어오면 보증금 준다는 말, 믿어도 되나요?",
    a: "절대 안 돼요. 새 세입자가 안 들어오면 보증금을 무기한 못 받아요. 이사를 나가면 대항력이 사라지기 때문에 경매가 진행돼도 보호받기 어려워요. 임차권등기명령 없이 이사 나가면 안 돼요.",
  },
  {
    q: "임차권등기명령이 뭔가요?",
    a: "이사를 나가도 대항력과 우선변제권이 유지되도록 등기부에 기록하는 거예요. 관할 법원에 신청하면 되고, 비용은 1만원 이내예요. 이사 전에 반드시 해둬야 해요.",
  },
  {
    q: "이사를 나가면 왜 위험한가요?",
    a: "전입신고를 말소하면 대항력이 사라져요. 대항력 없이는 집이 경매에 넘어갔을 때 보증금을 돌려받기 어려워요. 그래서 임차권등기명령으로 대항력을 유지해야 해요.",
  },
  {
    q: "전세보증보험에 가입돼 있으면 걱정 없나요?",
    a: "보증보험이 있으면 보증기관에서 대신 지급해줘요. 다만 보험 가입 시 조건(보증금 한도, 주택 가격 등)을 확인해야 하고, 만료 후 1개월 내에 청구해야 해요.",
  },
  {
    q: "보증금 소송은 얼마나 걸리나요?",
    a: "지급명령은 2~4주면 결론이 나요. 상대방이 이의를 제기하면 소송으로 넘어가서 3~6개월 정도 걸릴 수 있어요. 강제집행까지 가면 더 오래 걸려요.",
  },
];

const SOURCES = [
  { name: "주택임대차보호법", href: "https://www.law.go.kr/법령/주택임대차보호법" },
  { name: "대법원 임차권등기명령", href: "https://www.scourt.go.kr" },
  { name: "HUG 주택도시보증공사", href: "https://www.khug.or.kr" },
];

const RELATED = [
  { slug: "대항력", title: "대항력이란?", description: "전입신고로 보증금을 지키는 핵심 권리." },
  { slug: "전세-보증금-반환-청구-절차", title: "보증금 반환 청구 절차", description: "내용증명부터 소송까지." },
  { slug: "소액임차인", title: "소액임차인 최우선변제", description: "보증금 일부를 먼저 받을 수 있는 제도." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 전세 보증금 · 계약만료</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        새 세입자 들어오면 보증금 준다는데?<br />
        절대 이사 먼저 가면 안 되는 이유
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "계약 끝났는데 집주인이 새 세입자 구할 때까지 기다려달래요."
      </p>
      <p style={body}>
        이 말을 듣고 먼저 이사를 나가면 <strong>대항력이 사라져요</strong>.
        대항력 없이는 집이 경매에 넘어가도 보증금을 돌려받기 어렵죠.
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법</a>이 보호해주는 건 전입신고가 살아있을 때뿐이에요.
        이사 전에 <strong>임차권등기명령</strong>을 꼭 받아두세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>왜 이사 먼저 가면 안 되나요?</H2>
      <p style={body}>
        전세 보증금을 지키는 힘(대항력)은 '전입신고 + 점유(거주)'에서 나와요.
        이사를 나가면 점유가 풀리고 전입신고도 말소되니까 대항력이 사라져요.
      </p>

      <GreenBox title="이사 먼저 가면 생기는 문제">
        {"전입 말소 → 대항력 상실 → 보증금 보호 불가\n\n만약 집주인이 파산하거나 경매가 진행되면?\n→ 대항력 없는 임차인은 배당에서 밀려요\n→ 보증금 전액 손실 가능\n\n해결: 이사 전에 임차권등기명령을 받아두세요\n→ 이사 나가도 대항력 유지됨"}
      </GreenBox>

      <CategoryButton label="부동산 정보" count={18} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>보증금 안전하게 돌려받는 순서</H2>
      <p style={body}>
        임차권등기명령을 먼저 받고, 내용증명을 보내고, 안 주면 법적 조치를 취하는 순서예요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>이사 전 반드시 확인하세요</H2>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 주택임대차보호법 기준으로 작성했어요. 임차권등기명령, 보증보험 등은 상황에 따라 다를 수 있으니 법률 상담을 권해요." />
    </ArticleLayout>
  );
}
