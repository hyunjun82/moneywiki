"use client";
// Q1. 연금저축을 증권사/은행에서 생명보험사로 옮겨서 종신연금을 받고 싶은 상태
// Q2. 이전 절차를 파악하고 새 생명보험사에서 이전 신청을 완료한다
// Q3. 이전 가능 여부(해지 아님, 세제혜택 유지), 4단계 절차, 수수료(7년 이내), 이전 제한 사유
// Q4. Steps(절차) + GreenBox(핵심 요약) + BorderBox(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const TRANSFER_STEPS = [
  { title: "이전할 생명보험사에서 계좌 개설", desc: "이전하려는 생명보험사 홈페이지나 모바일앱에서 연금저축 계좌를 새로 개설해요.", tip: "비대면으로 개설 가능한 곳이 많아요" },
  { title: "새 금융사에서 이전 신청", desc: "개설한 계좌에서 '연금계좌 이전 신청'을 해요. 기존 금융사 정보와 계좌번호를 입력하면 돼요.", tip: "기존 금융사 방문은 생략 가능" },
  { title: "기존 금융사에서 이전 의사 확인", desc: "기존 금융사에서 유선으로 이전 의사를 확인해요. 본인 확인 절차이니 전화를 꼭 받으세요.", tip: "전화를 못 받으면 이전이 지연돼요" },
  { title: "이전 완료 및 상품 가입", desc: "5~10영업일 후 이전이 완료돼요. 이전된 금액으로 생명보험사의 연금 상품에 가입할 수 있어요.", tip: "종신연금 전환은 생명보험사만 가능" },
];

const CHECKLIST = [
  "현재 연금저축 잔액과 납입 이력을 확인했다",
  "이전할 생명보험사의 연금 상품 수익률을 비교했다",
  "가입 후 7년 이내인 경우 이전 수수료를 확인했다",
  "연금지급 중인 종신형 계약이 아닌지 확인했다",
  "압류 등 이전 제한 사유가 없는지 확인했다",
];

const FAQS = [
  { q: "이전하면 기존 세액공제는 어떻게 되나요?", a: "이전은 해지가 아니라 계약 유지로 간주돼요. 기존에 받은 세액공제 혜택이 그대로 유지돼요. 추가 세금도 없어요." },
  { q: "이전 수수료가 있나요?", a: "연금저축보험은 가입 후 7년 이내에 이전하면 해약공제(수수료)가 발생할 수 있어요. 연금저축펀드·연금저축신탁은 수수료가 없어요." },
  { q: "이전하는 데 얼마나 걸리나요?", a: "보통 5~10영업일 정도 걸려요. 기존 금융사의 이전 의사 확인이 지연되면 더 걸릴 수 있어요." },
  { q: "증권사에서 보험사로만 이전되나요?", a: "아니에요. 은행, 증권사, 보험사 간 자유롭게 이전할 수 있어요. 연금저축은 연금저축끼리, 개인연금은 개인연금끼리만 이전 가능해요." },
  { q: "왜 생명보험사로 옮기나요?", a: "종신연금(죽을 때까지 매달 받는 연금)은 생명보험사만 취급해요. 증권사나 은행에서는 확정기간 연금만 가능하고요. 장수 리스크를 줄이려면 생명보험사로 이전이 필요해요." },
  { q: "IRP도 같이 이전할 수 있나요?", a: "IRP는 별도로 이전해야 해요. 연금저축과 IRP는 계좌 유형이 달라서 각각 이전 절차를 밟아야 해요." },
];

const SOURCES = [
  { name: "금융감독원", href: "https://www.fss.or.kr" },
  { name: "국세청", href: "https://www.nts.go.kr" },
  { name: "소득세법", href: "https://www.law.go.kr/법령/소득세법" },
];

const RELATED = [
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축 세액공제 한도", description: "연금저축+IRP 조합으로 최대 148만원 환급받는 법." },
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 수령 방법 비교", description: "일시금 vs 연금, 세금 차이와 유리한 선택법." },
  { slug: "연말정산-공제항목", title: "연말정산 공제항목 종류", description: "소득공제와 세액공제 항목별 한도와 조건." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 연금저축</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연금저축, 생명보험사로 옮길 수 있을까?<br />
        이전 절차와 수수료, 종신연금 전환 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        증권사나 은행에 있는 연금저축을 생명보험사로 옮기려는 분이 많아요. 종신연금(사망할 때까지 매달 받는 연금)을 받으려면 생명보험사로 이전해야 하거든요.
      </p>
      <p style={body}>
        이전은 해지가 아니에요. <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>상 계약 유지로 보기 때문에 기존 세액공제 혜택이 그대로 유지돼요. 비대면으로 신청 가능하고, 기존 금융사 방문도 필요 없어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>연금저축 이전, 핵심 3줄 요약</H2>
      <p style={body}>
        이전을 고민 중이라면 이 세 가지만 기억하면 돼요.
      </p>
      <GreenBox>
        은행·증권사·보험사 간 자유롭게 이전 가능{"\n"}
        이전 = 해지 아님 → 세제혜택 그대로 유지{"\n"}
        종신연금은 생명보험사만 취급 → 장수 리스크 대비 필수
      </GreenBox>

      <CategoryButton label="금융 정보" count={10} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>이전 절차 4단계</H2>
      <p style={body}>
        새 금융사에서 계좌 개설 후 이전 신청만 하면 돼요. 기존 금융사를 직접 방문할 필요 없어요.
      </p>
      <SectionBadge>연금저축 생명보험사 이전 순서</SectionBadge>
      <Steps steps={TRANSFER_STEPS} />

      <Divider />

      <H2>이전 전에 꼭 점검하세요</H2>
      <p style={body}>
        이전 수수료나 제한 사유를 미리 확인하지 않으면 낭패를 볼 수 있어요.
      </p>
      <Checklist items={CHECKLIST} />

      <BorderBox>
        <strong>이전이 안 되는 경우</strong><br />
        연금 지급 중인 종신형 보험 계약{"\n"}
        압류·가압류가 설정된 계좌{"\n"}
        개인연금 ↔ 연금저축 간 교차 이전 (세제 유형이 다름)
      </BorderBox>

      <Divider />

      <H2>연금저축 이전, 이런 경우엔요?</H2>
      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법과 금융감독원 안내를 바탕으로 작성했어요. 금융사별 수수료·상품 조건이 다를 수 있으니 이전 전 해당 금융사에 문의해보세요." />
    </ArticleLayout>
  );
}
