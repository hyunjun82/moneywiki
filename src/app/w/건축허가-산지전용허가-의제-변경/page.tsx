"use client";
// Q1. 산지에 건축허가 받고 공사 중인데 규모를 변경해야 하는 상황, 의제받은 산지전용허가가 어떻게 되는지 궁금
// Q2. 건축허가 변경 시 산지전용허가 변경도 함께 신청해서 적법하게 공사를 진행한다
// Q3. 의제허가 개념, 변경 시 자동 미적용, 변경허가 절차, 미신청 시 원상복구·이행강제금 제재
// Q4. GreenBox(핵심 결론) + Steps(변경 절차) + Checklist(주의사항) + BorderBox(제재) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "변경 필요 여부를 먼저 확인하세요",
    desc: "건물 규모, 위치, 층수가 바뀌면 산지전용 면적도 달라져요. 이 경우 산지전용허가 변경이 필요해요. 규모를 줄이는 경우에도 변경허가가 필요하니까 '줄이면 괜찮겠지'라고 생각하면 안 돼요.",
    tip: "담당 공무원에게 변경허가 필요 여부 먼저 문의",
  },
  {
    title: "건축허가 변경신청서와 함께 접수하세요",
    desc: "시청이나 군청 건축과에 건축허가 변경신청서를 제출하면서, 산지전용 변경에 필요한 서류도 함께 내면 돼요. 의제 제도가 변경 시에도 적용되기 때문에 한 번에 처리 가능해요.",
    tip: "변경 설계도서, 산지전용 면적 도면, 토지이용계획 확인서 첨부",
  },
  {
    title: "처리 기간은 2~4주 정도예요",
    desc: "담당 공무원이 건축허가 변경과 산지전용허가 변경을 모두 검토해요. 서류가 부족하면 보완 요청이 와서 더 걸릴 수 있어요. 공사 일정을 고려해서 여유 있게 신청하세요.",
    tip: "경미한 변경이면 신고만으로 가능한 경우도 있어요",
  },
  {
    title: "변경허가 받은 후 공사를 재개하세요",
    desc: "변경허가가 나오기 전에 변경된 내용으로 공사하면 무허가 공사가 돼요. 허가 나올 때까지 해당 부분 공사를 멈추고, 허가 후에 진행하는 게 안전해요.",
    tip: "변경 안 된 부분은 계속 공사 가능 (담당자 확인 필수)",
  },
];

const CHECKLIST = [
  "건물 규모·위치·층수 변경 여부 / 변경 시 산지전용허가도 변경 필요",
  "산지전용 면적 변경 여부 / 면적이 바뀌면 무조건 변경허가",
  "담당 공무원 사전 상담 / 변경허가 vs 경미한 변경 신고 확인",
  "변경 설계도서 준비 / 건축사 사무소에서 작성",
  "복구비 예치 변경 여부 / 면적 변경 시 복구비도 재산정",
];

const FAQS = [
  {
    q: "의제허가가 뭔지 쉽게 설명해주세요",
    a: "건축허가 하나만 받으면 산지전용허가까지 함께 받은 것으로 인정해주는 제도예요. 원래 두 개를 따로 받아야 하는데, 편의상 한 번에 처리해주는 거예요.",
  },
  {
    q: "건축허가를 변경하면 산지전용허가도 자동으로 바뀌나요?",
    a: "아니요. 자동으로 안 바뀌어요. 건축허가 변경 시 산지전용허가 변경도 별도로 신청해야 해요. 함께 접수하면 의제 처리로 한 번에 돼요.",
  },
  {
    q: "규모를 줄이는 건 괜찮은 거 아닌가요?",
    a: "줄이든 늘리든 산지전용 면적이 바뀌면 변경허가를 받아야 해요. 면적이 줄어도 산지관리법상 변경에 해당하거든요.",
  },
  {
    q: "변경허가 없이 공사하면 어떻게 되나요?",
    a: "원상복구 명령, 이행강제금, 형사처벌(5년 이하 징역 또는 5,000만원 이하 벌금)까지 받을 수 있어요. 이미 공사한 부분도 철거해야 할 수 있어요.",
  },
  {
    q: "의제허가의 유효기간은 얼마인가요?",
    a: "건축허가와 동일해요. 보통 2년이고, 기간 내에 착공하지 않으면 허가가 실효돼요. 연장이 필요하면 만료 전에 신청해야 해요.",
  },
],

SOURCES = [
  { name: "산지관리법", href: "https://www.law.go.kr/법령/산지관리법" },
  { name: "건축법", href: "https://www.law.go.kr/법령/건축법" },
  { name: "생활법령정보", href: "https://www.easylaw.go.kr" },
];

const RELATED = [
  { slug: "건축법-위반-건축물-제재-처벌", title: "건축법 위반 제재 처벌", description: "이행강제금, 형사처벌 기준." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 납부", description: "부동산 취득세 세율 정리." },
  { slug: "부동산-거래신고-공인중개사-신고방법", title: "부동산 거래신고 방법", description: "공인중개사 거래 신고 절차." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 건축허가 · 산지전용</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        건축허가 변경하면 산지전용허가도 바뀌나요?<br />
        의제허가 변경 절차와 주의사항
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "산지에 집 짓는 중인데 규모를 바꿔야 해요. 산지전용허가는 어떻게 되나요?"
      </p>
      <p style={body}>
        건축허가를 변경해도 의제받은 산지전용허가는 <strong>자동으로 따라가지 않아요</strong>.
        산지전용 면적이 바뀌면 변경허가를 별도로 받아야 해요.
        다행히 건축허가 변경 시 함께 신청하면 의제 처리로 한 번에 돼요.
        변경허가 없이 공사하면 원상복구 명령이나 형사처벌까지 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>의제허가, 정확히 뭔가요?</H2>
      <p style={body}>
        산지에 건물을 지으려면 원래 <a href="https://www.law.go.kr/법령/건축법" style={{ color: "#1D9E75", textDecoration: "underline" }}>건축법</a>에 따른 건축허가도 받고,
        <a href="https://www.law.go.kr/법령/산지관리법" style={{ color: "#1D9E75", textDecoration: "underline" }}> 산지관리법</a>에 따른 산지전용허가도 따로 받아야 해요.
        의제허가는 건축허가 하나만 받으면 산지전용허가까지 함께 받은 것으로 인정해주는 제도예요.
      </p>

      <GreenBox>
        의제허가 핵심 정리{"\n"}
        - 건축허가 1개 = 건축허가 + 산지전용허가 동시 처리{"\n"}
        - 편의상 한 번에 처리되지만, 두 허가는 독립적으로 존재{"\n"}
        - 변경 시에는 자동 적용 안 됨 → 별도 변경 신청 필요
      </GreenBox>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>규모 변경 시 변경허가 받는 절차</H2>
      <p style={body}>
        건물 규모를 바꿔야 한다면 아래 순서로 진행하면 돼요.
        건축허가 변경과 산지전용허가 변경을 한 번에 처리할 수 있어요.
      </p>

      <SectionBadge>변경 절차 4단계</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>변경허가 없이 공사하면 어떤 제재를 받나요?</H2>
      <p style={body}>
        "조금만 바꾸는 건데 허가까지 다시 받아야 하나?" 이렇게 넘기면 큰 문제가 돼요.
      </p>

      <BorderBox title="위반 시 제재">
        원상복구 명령: 지어놓은 건물 철거 + 산지 복구{"\n"}
        이행강제금: 복구 안 하면 매년 반복 부과{"\n"}
        형사처벌: 5년 이하 징역 또는 5,000만원 이하 벌금{"\n"}
        건축물대장 위반 표시: 대출·매매 시 불이익{"\n\n"}
        <a href="/w/건축법-위반-건축물-제재-처벌" style={{ color: "#1D9E75", textDecoration: "underline" }}>건축법 위반 제재 상세 보기</a>
      </BorderBox>

      <p style={body}>
        특히 원상복구 비용은 공사비보다 더 들 수 있어요. 이미 지은 걸 허물고 산을 원래대로 되돌려야 하니까요.
        변경허가를 받는 게 시간도 비용도 훨씬 적게 들어요.
      </p>

      <Divider />

      <H2>공사 전에 반드시 확인하세요</H2>
      <p style={body}>
        처음 허가를 받을 때도, 변경할 때도 아래 사항을 체크하면 문제를 예방할 수 있어요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 산지관리법과 건축법으로 작성됐어요. 구체적인 변경허가 요건은 관할 지자체 담당자와 확인하세요." />
    </ArticleLayout>
  );
}
