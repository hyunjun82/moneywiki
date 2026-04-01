"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1: 실직 후 생계비 걱정하며 정부 지원 수당을 받을 수 있는지 찾는 사람
// Q2: 1유형 자격 확인 후 고용24에서 신청 완료
// Q3: 1유형/2유형 차이, 소득·재산·취업경험 조건, 월 50만원×6개월
// Q4: EligibilityChecker + 비교표(BorderBox) + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS_1TYPE = [
  { id: "c1", label: "만 15세~69세예요 (청년은 만 18~34세)" },
  { id: "c2", label: "현재 미취업 상태예요 (주 15시간 미만 단기알바는 가능)" },
  { id: "c3", label: "가구 소득이 기준 중위소득 60% 이하예요 (4인 가구 약 390만 원 이하)" },
  { id: "c4", label: "가구 재산이 6억 원 이하예요 (수도권 외 지역 5억 원)" },
  { id: "c5", label: "최근 2년 내 100일 또는 800시간 이상 취업 경험이 있어요 (청년 18~34세는 예외)" },
];

const STEPS = [
  {
    title: "고용24에서 참여신청",
    desc: "고용24(work24.go.kr)에 접속해서 회원가입 후 국민취업지원제도 참여신청을 해요. 신청서에 소득·재산·취업 경험 등 기본 정보를 입력해요. 공동인증서가 있으면 더 빠르게 처리돼요.",
    link: { label: "고용24에서 신청하기", href: "https://www.work24.go.kr" },
  },
  {
    title: "고용센터 상담 일정 안내 및 방문",
    desc: "신청 후 담당 고용센터 담당자가 배정되고 상담 일정이 안내돼요. 상담에서는 현재 취업 상황, 구직 의지, 필요한 지원 등을 확인해요. 상담 결과를 바탕으로 1유형 또는 2유형으로 분류돼요.",
    tip: "상담 전에 최근 2년 취업 경험 증빙 서류를 미리 준비해두세요",
  },
  {
    title: "자격 심사 결과 통보 (2~3주 소요)",
    desc: "상담 후 2~3주 안에 자격 심사 결과가 통보돼요. 1유형 승인 시 수당 지급 계좌를 등록해요. 2유형으로 분류돼도 취업 지원 서비스는 계속 받을 수 있어요.",
  },
  {
    title: "매월 구직촉진수당 수령 + 취업활동 참여",
    desc: "1유형 승인 후 매월 50만 원씩 최대 6개월(총 300만 원)을 받아요. 수당을 받으려면 상담, 직업훈련, 구직활동 등 취업활동계획에 따른 활동을 해야 해요. 활동을 안 하면 수당이 중단될 수 있어요.",
    tip: "매월 취업활동 보고는 고용24에서 온라인으로 제출 가능해요",
  },
];

const FAQS = [
  {
    q: "실업급여 자격이 안 되는데 국민취업지원제도 신청할 수 있나요?",
    a: "네, 받을 수 있어요. 국민취업지원제도는 고용보험 가입 이력이 없어도 신청 가능해요. 실업급여 자격이 안 되는 분들을 위한 '한국형 실업부조' 성격이에요.",
  },
  {
    q: "실업급여 받으면서 동시에 신청할 수 있나요?",
    a: "동시 수급은 안 돼요. 실업급여 수급 중에는 신청할 수 없어요. 실업급여가 끝난 후 신청하거나, 실업급여 자격 자체가 없다면 바로 신청하면 돼요.",
  },
  {
    q: "2유형은 수당이 없나요? 그럼 뭘 받나요?",
    a: "수당은 없지만 취업 지원 서비스는 받아요. 상담, 직업훈련 연계, 취업 알선 서비스를 지원해요. 1유형 조건이 안 되면 2유형으로라도 취업 지원은 받을 수 있어요.",
  },
  {
    q: "1유형에서 6개월 안에 취업하면 수당이 중단되나요?",
    a: "취업하면 수당 지급이 종료돼요. 단, 취업 후 12개월 이상 고용유지 시 취업성공수당(최대 150만 원)을 별도로 받을 수 있어요.",
  },
  {
    q: "2026년부터 달라진 게 있나요?",
    a: "2026년부터 상시 신청이 가능해졌어요. 예전에는 특정 기간에만 신청할 수 있었는데, 이제 언제든지 고용24에서 신청할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령·제도",
    items: [
      { label: "국민 취업지원 및 직업능력개발 활성화에 관한 법률", url: "https://www.law.go.kr/법령/국민취업지원및직업능력개발활성화에관한법률" },
      { label: "고용노동부 국민취업지원제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 국민취업지원제도 신청", url: "https://www.work24.go.kr" },
      { label: "고용보험 실업급여 자격 확인", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급조건", title: "실업급여 수급 조건 완전 정리", description: "고용보험 가입 기간·이직 사유별 실업급여 자격 조건이에요." },
  { slug: "실업급여-신청방법", title: "실업급여 신청 방법 단계별 안내", description: "고용24에서 실업급여 신청하는 방법을 순서대로 정리했어요." },
  { slug: "취업성공수당-신청방법", title: "취업성공수당 신청 방법", description: "취업 후 12개월 유지 시 최대 150만 원 받는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용·복지 · 구직지원 · 수당</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국민취업지원제도 구직촉진수당<br />
        월 50만 원씩 6개월, 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실직 후 생계가 막막한데 실업급여 자격은 안 되시죠? <a href="https://www.law.go.kr/법령/국민취업지원및직업능력개발활성화에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민 취업지원법</a>에 따라 운영되는 구직촉진수당은 고용보험 가입 이력이 없어도 신청 가능해요.
        1유형 자격이 되면 월 50만 원씩 최대 6개월, 총 300만 원을 받을 수 있어요. 2026년부터는 상시 신청도 가능해졌어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>1유형 vs 2유형, 수당이 있고 없고의 차이</H2>
      <p style={body}>
        1유형이어야 구직촉진수당(월 50만 원)을 받을 수 있어요. 2유형은 수당은 없고 취업 지원 서비스만 받아요.
        조건이 까다로운 편이라 자격 여부를 먼저 확인하는 게 중요해요.
      </p>

      <BorderBox>
        <strong>1유형 (요건심사형)</strong><br />
        · 월 50만 원 × 최대 6개월 = 총 300만 원<br />
        · 가구 소득 기준 중위소득 60% 이하 (4인 약 390만 원)<br />
        · 가구 재산 6억 원 이하 (수도권 외 5억 원)<br />
        · 최근 2년 내 취업 경험 100일 또는 800시간 (청년 18~34세 예외)<br />
        <br />
        <strong>2유형 (선발형)</strong><br />
        · 수당 없음, 취업 지원 서비스만 제공<br />
        · 중위소득 100% 이하 또는 청년·경력단절여성·중장년 특정계층
      </BorderBox>

      <SectionBadge>1유형 자격 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS_1TYPE}
        allMatchText="1유형 자격 요건에 해당할 가능성이 높아요. 아래 절차에 따라 고용24에서 신청해보세요. 정확한 자격은 고용센터 상담에서 확정돼요."
        partialMatchText="1유형 자격이 안 될 수 있어요. 2유형 취업 지원 서비스나 실업급여 자격 여부를 함께 확인해보세요. 고용노동부 고용상담센터(1350)에 문의하면 정확한 안내를 받을 수 있어요."
      />

      <Divider />

      <H2>신청 절차 4단계</H2>
      <p style={body}>
        고용24에서 온라인으로 신청하고 고용센터 상담을 거치면 돼요. 상담까지 보통 2~3주 걸려요.
        취업활동계획에 따른 활동을 매월 해야 수당이 계속 나와요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton label="고용·복지 정보" count={10} href="/category/복지" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <GreenBox>
        실업급여 자격 없는 분 → 국민취업지원제도 1유형 확인하세요<br />
        실업급여 끝난 후 → 국민취업지원제도 신청 가능해요<br />
        취업 후 12개월 유지 → 취업성공수당 최대 150만 원 별도 수령 가능
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        국민취업지원제도에 대해 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 국민취업지원제도를 바탕으로 작성됐어요. 지원 조건과 수당 금액은 변경될 수 있으니 최신 기준은 고용24 또는 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
