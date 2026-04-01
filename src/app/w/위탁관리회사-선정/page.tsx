"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 아파트 관리회사 계약이 만료돼서 새 회사를 선정하려는데 절차를 모르는 상황이에요.
// Q2. 전자입찰 방식으로 관리회사를 선정하는 절차를 밟고, 입주자 동의를 받는 행동.
// Q3. 전자입찰 원칙, 입주자 과반수 동의, 감사 참관권, 경쟁입찰 vs 수의계약, K-apt 공고.
// Q4. Steps(선정 절차) + GreenBox(핵심 원칙) + Checklist(확인 사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout,
} from "@/components/article-ui";

const SELECT_STEPS = [
  { title: "선정 방법 결정", desc: "경쟁입찰(최저가 or 적격심사) 또는 수의계약 중 어떤 방식으로 할지 결정해요. 경쟁입찰이 원칙이에요.", tip: "수의계약은 예외적인 경우에만 허용돼요." },
  { title: "입주자 과반수 동의", desc: "입찰 종류, 방법, 낙찰 방법, 참가자격 제한 등 핵심 사항에 대해 전체 입주자 과반수 동의를 받아요." },
  { title: "K-apt 입찰 공고", desc: "입찰서 제출 마감일 전일부터 10일 전에 공동주택관리정보시스템(K-apt)에 공고해요. 공고 내용을 아파트 게시판에도 게시하면 좋아요." },
  { title: "전자입찰 진행", desc: "K-apt, 조달청 누리장터, 또는 민간 전자입찰시스템에서 입찰을 진행해요. 감사가 참관을 원하면 허용해야 해요." },
  { title: "낙찰자 선정 및 계약", desc: "입찰 결과에 따라 낙찰자를 선정하고 관리위탁 계약을 체결해요. 계약기간은 장기수선계획 조정 주기(보통 3년)를 고려해요." },
];

const FAQS = [
  { q: "입대위에서 마음대로 관리회사를 정할 수 있나요?", a: "아니에요. 전자입찰이 원칙이고, 경쟁입찰이면 전체 입주자 과반수 동의가 필요해요. 절차 위반 시 입주민이 계약 무효 소송을 제기할 수 있어요." },
  { q: "수의계약이 가능한 경우는 언제인가요?", a: "전자입찰을 적용하기 곤란한 특별한 사유가 있을 때예요. 입찰 참가자가 없거나, 긴급한 사유 등이 해당돼요." },
  { q: "최저가 낙찰제와 적격심사제 중 어떤 게 나은가요?", a: "최저가는 관리비를 줄일 수 있지만 서비스 품질이 떨어질 수 있어요. 적격심사제는 가격+실적+기술력을 종합 평가하는데 비용이 좀 더 들어요." },
  { q: "감사가 입찰 과정을 볼 수 있나요?", a: "네, 입주자대표회의 감사는 입찰 참관권이 있어요. 참관을 요청하면 입대위는 허용해야 해요." },
  { q: "절차를 어기면 어떻게 되나요?", a: "입주민이 입대위를 상대로 민사소송을 제기할 수 있어요. 계약 무효 주장이나 손해배상 청구가 가능해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "주택관리업자 및 사업자 선정지침", url: "https://www.law.go.kr/행정규칙/주택관리업자및사업자선정지침" },
    { label: "K-apt 공동주택관리정보시스템", url: "https://www.k-apt.go.kr" },
    { label: "찾기쉬운 생활법령정보(아파트 관리)", url: "https://www.easylaw.go.kr" },
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 아파트 관리</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        아파트 위탁관리회사, 어떻게 뽑나요?<br />
        선정 절차와 입주자 동의
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        관리회사 계약이 만료돼서 새 회사를 뽑아야 하는데, 입대위에서 회의만으로 정하면 되는 건지 헷갈리시죠?
        전자입찰이 원칙이고, 핵심 사항은 입주자 과반수 동의가 필요해요.
      </p>

      <Divider />

      <H2>선정 원칙, 뭘 지켜야 하나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/행정규칙/주택관리업자및사업자선정지침" style={{ color: "#1D9E75" }}>주택관리업자 및 사업자 선정지침</a>에 따라 절차를 밟아야 해요.
      </p>

      <GreenBox title="3대 핵심 원칙">
        <strong>전자입찰이 원칙</strong> (K-apt, 조달청 등 이용)<br />
        <strong>경쟁입찰 시 입주자 과반수 동의</strong> 필요<br />
        <strong>감사 참관권 보장</strong> (거부하면 절차 위반)
      </GreenBox>

      <Divider />

      <H2>선정 절차, 순서대로 따라하세요</H2>
      <p style={body}>
        입대위가 주관하되 정해진 절차를 밟아야 해요. 절차 위반 시 소송 대상이 돼요.
      </p>

      <Steps steps={SELECT_STEPS} />

      <Divider />

      <H2>놓치면 안 되는 체크리스트</H2>
      <p style={body}>
        선정 과정에서 빠뜨리기 쉬운 항목이에요.
      </p>

      <Checklist items={[
        "입주자 과반수 동의를 서면으로 받았나요?",
        "입찰 공고를 K-apt에 10일 전에 게시했나요?",
        "감사에게 참관 기회를 안내했나요?",
        "계약기간을 장기수선계획 주기에 맞췄나요?",
        "입찰 결과를 입주민에게 공개했나요?",
      ]} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택관리업자 및 사업자 선정지침을 바탕으로 작성됐어요. 아파트 규모와 관리규약에 따라 세부 절차가 다를 수 있어요." />
    </ArticleLayout>
  );
}
