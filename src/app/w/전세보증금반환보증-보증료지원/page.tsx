"use client";

// Q1. 전세보증금반환보증에 가입했는데 보증료가 부담스럽고, 지원받을 수 있는지 궁금한 상황이에요.
// Q2. 보증료 지원 대상인지 확인하고, 정부24나 지자체에서 신청하는 행동.
// Q3. 지원 대상(청년 100%, 일반 90%), 소득·보증금 기준, 최대 40만원, 신청 방법·서류.
// Q4. EligibilityChecker(대상 확인) + GreenBox(지원금액) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, EligibilityChecker, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "age", label: "만 19세~39세 이하 (청년) 또는 만 40세 이상 (일반)" },
  { id: "income", label: "연소득 5천만원 이하" },
  { id: "deposit", label: "전세보증금 3억원 이하" },
  { id: "house", label: "무주택 임차인" },
  { id: "guarantee", label: "전세보증금반환보증에 가입 완료" },
];

const STEPS = [
  { title: "전세보증금반환보증 가입", desc: "HUG, SGI, HF 중 하나에서 보증보험에 먼저 가입하고 보증료를 납부해요.", tip: "보증료 납부 영수증 보관 필수" },
  { title: "지원 신청", desc: "정부24 또는 거주지 지자체 홈페이지에서 보증료 지원을 신청해요. 주민센터 방문 신청도 가능해요." },
  { title: "서류 제출", desc: "보증증서 사본, 보증료 납부 영수증, 임대차계약서 사본, 주민등록등본을 제출해요." },
  { title: "심사 후 환급", desc: "심사 통과하면 보증료를 납부했던 계좌로 환급돼요. 보통 1~2주 걸려요." },
];

const FAQS = [
  {
    q: "청년은 보증료 전액 지원받나요?",
    a: "네. 만 19~39세 청년은 납부한 보증료의 100%를 돌려받아요. 최대 한도는 40만원이에요.",
  },
  {
    q: "일반 가구는 얼마나 지원받나요?",
    a: "일반 가구는 납부한 보증료의 90%를 돌려받아요. 역시 최대 40만원 한도예요.",
  },
  {
    q: "보증료는 대략 얼마 정도 되나요?",
    a: "전세금과 보증 기간에 따라 달라요. 보통 전세금의 0.128%~0.154% 수준이에요. 전세금 2억이면 약 25~30만원 정도예요.",
  },
  {
    q: "같은 보증으로 두 번 신청할 수 있나요?",
    a: "안 돼요. 같은 보증증서 번호로는 1회만 지원받을 수 있어요. 계약 갱신해서 새로 가입하면 다시 신청 가능해요.",
  },
  {
    q: "서울 거주자만 되나요?",
    a: "아니에요. 국토교통부 사업이라 전국 어디서나 신청할 수 있어요. 다만 지자체별 추가 지원 여부는 달라요.",
  },
  {
    q: "신혼부부도 100% 지원받나요?",
    a: "네. 신혼부부(혼인 7년 이내)도 청년과 동일하게 100% 지원받아요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국토교통부 보증료 지원 안내", url: "https://www.molit.go.kr" },
      { label: "주택도시보증공사(HUG) 보증료 지원", url: "https://www.khug.or.kr/jeonse/web/s05/s050601.jsp" },
      { label: "정부24 보증료 지원 신청", url: "https://www.gov.kr" },
    ],
  },
];

const RELATED = [
  { slug: "전세보증금반환보증-가입", title: "전세보증금반환보증 가입 방법", description: "HUG, SGI, HF 보증보험 가입 절차와 필요 서류예요." },
  { slug: "전세사기-예방", title: "전세사기 예방 체크리스트", description: "계약 전에 확인해야 할 10가지 체크포인트예요." },
  { slug: "청년-주거지원", title: "청년 주거지원 제도 모음", description: "월세 지원, 전세대출, 보증료 지원 등 청년 주거 혜택을 정리해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 전세 · 보증</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전세보증금반환보증 보증료, 돌려받을 수 있어요<br />
        청년 100% 지원 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세보증금반환보증 가입하면서 보증료 낸 거 아까우셨죠?
        국토교통부에서 보증료 일부를 돌려줘요. 청년이라면 100%, 일반 가구도 90%까지 환급받을 수 있어요.
        최대 40만원까지 지원돼요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>누가 보증료 지원을 받을 수 있나요?</H2>
      <p style={body}>
        무주택 임차인이면서 소득·보증금 기준을 충족하면 신청할 수 있어요.
        아래 항목을 체크해서 본인이 대상인지 확인해보세요.
      </p>

      <SectionBadge>지원 대상 확인</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="보증료 지원 대상이에요! 아래 신청 절차를 따라 진행하면 돼요."
        partialMatchText="일부 조건을 충족하지 못해요. 해당 지자체에 추가 확인이 필요해요."
      />

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>얼마나 돌려받나요?</H2>
      <p style={body}>
        대상별로 지원 비율이 달라요. 실제 납부한 보증료 기준이고, 최대 한도는 40만원이에요.
      </p>

      <GreenBox>
        보증료 지원 금액이에요.<br />
        · <strong>청년 (만 19~39세)</strong>: 납부 보증료의 100%, 최대 40만원<br />
        · <strong>신혼부부 (혼인 7년 이내)</strong>: 납부 보증료의 100%, 최대 40만원<br />
        · <strong>일반 가구</strong>: 납부 보증료의 90%, 최대 40만원
      </GreenBox>

      <Divider />

      <H2>신청은 이렇게 하면 돼요</H2>
      <p style={body}>
        보증보험에 먼저 가입하고 보증료를 납부한 뒤에 지원금을 신청하는 구조예요.
        <a href="https://www.gov.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>정부24</a>에서 온라인 신청이 가장 편해요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 국토교통부·HUG 자료를 바탕으로 작성됐어요. 지자체별 추가 지원 여부와 세부 기준은 거주지 구청에 확인해봐요." />
    </ArticleLayout>
  );
}
