"use client";

// Q1. A→B→C 순차매매에서 중간등기 생략하고 바로 C 명의로 등기할 수 있는지 궁금한 상황
// Q2. 전원 합의 여부에 따라 직접 청구 가능/불가능을 판단하고, 불가능 시 대위등기 절차를 밟아야 함
// Q3. A·B·C 전원 합의 필요, 합의서 작성, 합의 없으면 대위행사, 세금 절약 효과는 사라짐
// Q4. GreenBox(가능 요건) + Steps(대위등기 절차) + BorderBox(비교: 직접등기 vs 대위등기) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const SUBROGATION_STEPS = [
  {
    title: "A-B 매매계약서 확보",
    description: "B가 A에게 가지는 등기청구권을 증명할 서류예요. C가 대위행사하려면 이 계약서가 있어야 해요.",
  },
  {
    title: "B-C 매매계약서 확보",
    description: "C가 B를 대위할 수 있는 권리를 증명하는 서류예요. B에서 C로의 매매 관계를 입증해요.",
  },
  {
    title: "등기소에 대위등기 신청",
    description: "A→B 이전등기를 C가 B를 대신해서 신청해요. 등기신청서, 인감증명서, 매매계약서를 함께 제출해요.",
  },
  {
    title: "B 명의 등기 완료 후 B→C 이전등기",
    description: "대위등기로 B 명의가 되면, 그다음에 B에서 C로 이전등기를 해요. 등기 2회가 필요해요.",
  },
];

const FAQS = [
  {
    q: "중간생략등기를 하려면 누구의 동의가 필요한가요?",
    a: "A(최초 양도인), B(중간취득자), C(최종 양수인) 세 사람 모두 합의해야 해요. 한 명이라도 동의 안 하면 불가능해요.",
  },
  {
    q: "중간생략등기를 하면 세금을 아낄 수 있나요?",
    a: "예전에는 취득세를 한 번만 내서 절약이 됐지만, 지금은 세법이 바뀌어서 실제 거래 단계별로 취득세를 모두 내야 해요. 세금 절약 효과는 거의 없어요.",
  },
  {
    q: "B가 합의를 거부하면 어떻게 하나요?",
    a: "중간생략등기는 불가능해요. B의 등기청구권을 대위행사해서 일단 B 명의로 등기한 후, B→C로 다시 이전해야 해요.",
  },
  {
    q: "합의서는 어떤 형식으로 작성하나요?",
    a: "A, B, C 세 사람이 모여서 '중간등기를 생략하고 A에서 C로 직접 등기한다'는 내용을 적어요. 각자 서명·날인하고 인감증명서를 첨부하면 돼요.",
  },
  {
    q: "대위등기 비용은 누가 내나요?",
    a: "일반적으로 C(최종 양수인)가 부담해요. 등기를 2회 해야 하니 중간생략등기보다 비용이 더 들어요.",
  },
];

const REFERENCES = [
  {
    category: "법령·판례",
    items: [
      { label: "대법원 판례: 중간생략등기 합의 요건", url: "https://www.law.go.kr" },
      { label: "민법 제186조 (부동산물권변동)", url: "https://www.law.go.kr/법령/민법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "찾기쉬운 생활법령정보: 등기 절차", url: "https://www.easylaw.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "소유권이전등기", title: "소유권이전등기 절차", description: "일반적인 이전등기 방법이에요." },
  { slug: "부동산-매매-절차-계약-등기-순서", title: "부동산 매매 절차와 순서", description: "계약부터 등기까지 전체 흐름이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 등기 · 중간생략</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        중간생략등기, 직접 청구할 수 있을까?<br />
        합의 요건과 대위등기 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        A에서 B로, B에서 C로 부동산이 넘어갔는데 B 명의 등기를 건너뛰고 A에서 C로 바로 등기할 수 있을까요?
        가능하지만 조건이 까다로워요.
        A, B, C 세 사람 전원이 합의해야만 직접 청구가 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>직접 청구하려면 어떤 조건이 필요한가요?</H2>
      <SectionBadge>합의 요건</SectionBadge>

      <p style={body}>
        대법원 판례에 따르면 중간생략등기를 하려면 <strong>관계 당사자 전원의 의사합치</strong>가 있어야 해요.
        A(최초 양도인)와 B(중간취득자) 사이, 그리고 A와 C(최종 양수인) 사이 모두에 합의가 필요해요.
      </p>

      <GreenBox title="중간생략등기 가능 요건">
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>전원 합의</strong>: A, B, C 세 사람 모두가 중간등기 생략에 동의</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>합의서 작성</strong>: A-B 계약서, B-C 계약서 모두에 중간생략 합의 명시</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>별도 합의서</strong>: A, B, C 세 사람이 함께 서명한 합의서 작성 권장</p>
        <p style={{ margin: 0, lineHeight: 1.9, fontSize: 13 }}><strong>합의 없으면</strong>: 직접 청구 불가 → 대위등기만 가능</p>
      </GreenBox>

      <p style={body}>
        예를 들어 A와 B는 합의했지만 A와 C 사이에 별도 합의가 없었다면 C는 A에게 직접 등기를 청구할 수 없어요.
        세 사람이 전부 합의해야 한다는 게 핵심이에요.
      </p>

      <Divider />

      <H2>합의가 없으면 어떻게 해야 하나요?</H2>

      <p style={body}>
        중간생략등기 합의가 안 됐다면 C가 B의 등기청구권을 대위행사해야 해요.
        A→B 등기를 먼저 하고, 그다음에 B→C 등기를 하는 두 단계 절차예요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>직접 등기 vs 대위등기 비교</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}><strong>직접 등기 (합의 시)</strong>: 등기 1회 → 비용 적음 → 시간 짧음</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}><strong>대위등기 (합의 불가)</strong>: 등기 2회 → 비용 많음 → 시간 김</p>
        <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.9 }}>
          어느 쪽이든 취득세는 실제 거래 단계별로 모두 납부해야 해요.
        </p>
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>대위등기는 어떤 절차로 진행하나요?</H2>
      <SectionBadge>대위등기 절차</SectionBadge>

      <p style={body}>
        합의가 안 됐을 때 C가 밟아야 하는 절차예요.
        <a href="https://www.easylaw.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>찾기쉬운 생활법령정보</a>에서 상세한 서류 목록도 확인할 수 있어요.
      </p>

      <Steps steps={SUBROGATION_STEPS} />

      <p style={{ ...body, marginTop: 14 }}>
        등기를 두 번 해야 해서 번거롭지만, 합의가 안 되면 이 방법밖에 없어요.
        등기 절차가 복잡하니 <a href="/w/소유권이전등기" style={{ color: "#1D9E75", textDecoration: "underline" }}>법무사</a>에게 의뢰하는 게 안전해요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 민법 및 대법원 판례 기준으로 작성됐어요. 구체적인 등기 절차는 관할 등기소나 법무사와 상담하세요." />
    </ArticleLayout>
  );
}
