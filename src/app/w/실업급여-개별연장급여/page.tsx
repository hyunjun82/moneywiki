"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1: 구직급여 기간이 끝나가는데 아직 일자리를 못 찾아서 추가 지원을 받고 싶은 상황
// Q2: 개별연장급여 60일 추가 수급 신청 완료
// Q3: 연장급여 3종(훈련·개별·특별), 개별연장 조건(기본 급여 완료 후), 금액(70%), 신청 절차, 구직활동 의무
// Q4: GreenBox(3종 비교) + Steps(신청 절차) + BorderBox(금액 비교) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "기본 구직급여 종료일 확인",
    desc: "고용24에서 내 구직급여 잔여일수를 확인해요. 종료일이 다가오면 미리 고용센터에 연락하세요.",
    link: { label: "고용24에서 확인", href: "https://www.ei.go.kr" },
  },
  {
    title: "고용센터 방문 약속 잡기",
    desc: "기본 급여가 거의 끝나갈 때쯤 관할 고용센터에 전화해서 개별연장급여 상담 약속을 잡아요. 온라인만으로는 안 되고 방문이 필수예요.",
  },
  {
    title: "고용센터 방문 및 신청서 제출",
    desc: "신분증과 통장을 가지고 방문해서 개별연장급여 신청서를 작성해요. 재취업 의사 확인도 받아요.",
  },
  {
    title: "승인 후 급여 수령",
    desc: "1~2주 내에 승인 여부가 나와요. 승인되면 기본 급여의 70%가 최대 60일간 지급돼요. 4주마다 구직활동 보고는 계속해야 해요.",
  },
];

const CHECKLIST = [
  "기본 구직급여 수급자격이 인정된 상태인지 확인",
  "자영업자·예술인·특수고용직이 아닌지 확인 (연장급여 대상 아님)",
  "기본 구직급여 기간을 모두 소진했는지 확인",
  "4주마다 구직활동 보고 계속 진행 중인지 확인",
  "훈련연장급여(최대 2년) 대상인지도 함께 상담",
];

const FAQS = [
  {
    q: "개별연장급여는 기본 급여의 몇 %를 받나요?",
    a: "70%예요. 기본 급여일액이 6만원이었다면 개별연장은 4만 2천원이에요. 60일이면 총 252만원을 추가로 받는 거예요.",
  },
  {
    q: "훈련연장급여가 더 유리한 건가요?",
    a: "훈련연장은 기본 급여의 100%를 최대 2년까지 받을 수 있어요. 금액도 많고 기간도 길죠. 대신 고용센터에서 지시하는 직업훈련을 받아야 해요.",
  },
  {
    q: "특별연장급여는 아무 때나 신청할 수 있나요?",
    a: "아니에요. 대량해고나 경제 위기 같은 특수한 상황에서 정부가 발동해야만 신청할 수 있어요. 일반적인 상황에서는 개별연장을 신청하세요.",
  },
  {
    q: "개별연장급여 받는 동안 구직활동 안 하면요?",
    a: "그 달 급여가 안 나와요. 4주마다 최소 1회 구직활동을 증명해야 해요. 워크넷에서 입사지원만 해도 인정돼요.",
  },
  {
    q: "자영업자는 연장급여를 못 받나요?",
    a: "맞아요. 자영업자, 예술인, 노무제공자(특수고용직)는 연장급여 대상이 아니에요. 기본 구직급여만 받을 수 있어요.",
  },
  {
    q: "개별연장 60일 다 쓰면 그 다음은 없나요?",
    a: "훈련연장이나 특별연장 조건에 해당하지 않으면 더 이상 연장은 없어요. 60일 안에 구직활동을 적극적으로 해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 (연장급여)", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 서비스",
    items: [
      { label: "고용24 (실업급여 안내)", url: "https://www.ei.go.kr" },
      { label: "찾기쉬운 생활법령정보 - 구직급여 연장", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=4" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급자격", title: "실업급여 수급자격", description: "구직급여를 받기 위한 기본 자격 조건이에요." },
  { slug: "실업급여-계산기", title: "실업급여 계산기", description: "내 구직급여 금액과 기간을 계산할 수 있어요." },
  { slug: "실업급여-신청방법", title: "실업급여 신청 방법", description: "구직급여 신청 전체 절차를 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 실업급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 개별연장급여, 최대 60일 더 받는 방법<br />
        훈련연장·특별연장과 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        구직급여 기간이 끝나가는데 아직 일자리를 못 찾았다면?
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라
        개별연장급여로 최대 60일을 추가로 받을 수 있어요.
        금액은 기본 급여의 70%로 줄어들지만, 일자리를 찾는 동안 생활비를 버틸 수 있는 중요한 안전망이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>연장급여 3가지, 뭐가 다른가요?</H2>
      <p style={body}>
        실업급여가 끝나도 추가로 받을 수 있는 방법은 3가지예요. 조건과 금액이 전부 달라요.
        내 상황에 맞는 걸 골라야 해요.
      </p>

      <GreenBox>
        <strong>연장급여 3종 비교</strong><br /><br />
        훈련연장급여: 기본 급여 100% / 최대 2년 / 고용센터 지시 훈련 필수<br />
        개별연장급여: 기본 급여 70% / 최대 60일 / 가장 일반적<br />
        특별연장급여: 기본 급여 70% / 최대 60일 / 경제 위기 등 정부 발동 시만
      </GreenBox>

      <p style={body}>
        훈련연장이 가장 유리해요. 금액도 100%이고 기간도 길죠. 다만 고용센터에서 지시하는 직업훈련을 받아야 한다는 조건이 붙어요.
        자비로 학원 다니는 건 해당이 안 돼요. 개별연장은 별도 조건 없이 신청 가능해서 가장 많이 이용하는 방식이에요.
      </p>

      <CategoryButton label="고용·실업급여 정보" count={5} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>개별연장급여, 얼마를 받나요?</H2>
      <p style={body}>
        기본 구직급여의 70%를 받아요. 줄어들긴 하지만 60일이면 적지 않은 금액이에요.
      </p>

      <BorderBox>
        <strong>기본 급여 vs 개별연장 비교</strong><br /><br />
        기본 구직급여: 일 6만원 x 최대 270일 = 최대 1,620만원<br />
        개별연장급여: 일 4만 2천원(70%) x 최대 60일 = 최대 252만원<br /><br />
        개별연장 동안에도 4주마다 구직활동 보고는 계속해야 해요.
        워크넷에서 입사지원하면 자동으로 기록되니까 가장 간편해요.
      </BorderBox>

      <Divider />

      <H2>신청 절차 4단계</H2>
      <p style={body}>
        기본 구직급여가 끝나기 전에 미리 준비하는 게 좋아요.
        온라인만으로는 안 되고 고용센터 직접 방문이 필수예요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>신청 전 체크리스트</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        개별연장급여를 받을 수 있는 조건인지 먼저 확인하세요. 자영업자·예술인은 대상이 아니에요.
      </p>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 개별연장급여 심사 기준은 고용센터마다 다를 수 있으니 관할 센터에 직접 상담받으세요." />
    </ArticleLayout>
  );
}
