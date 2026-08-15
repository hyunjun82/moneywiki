"use client";
// Q1. 가족이 노인을 직접 돌보는데 정부 지원금을 받을 수 있는지 궁금한 상황. 요양보호사 자격증 없이도 가능한지 확인하려는 목적.
// Q2. 가족요양비 자격 조건(섬·벽지·특수 사유)을 확인하고, 국민건강보험공단에 신청하는 행동.
// Q3. 월 233,400원 고정, 1~5등급 대상(인지지원등급 제외), 섬·벽지 거주 또는 특수 사유, 요양보호사 자격증 불필요, 공단 지사 신청.
// Q4. EligibilityChecker(자격 확인) + GreenBox(핵심 지급 정보) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "grade", label: "장기요양등급 1~5등급을 받았어요 (인지지원등급 아님)" },
  { id: "region", label: "섬·벽지 지역에 거주하거나, 특수 사유(신체·정신적 사유)가 있어요" },
  { id: "noCare", label: "주변에 이용할 수 있는 장기요양기관이 없거나 이용이 어려워요" },
  { id: "family", label: "가족이 직접 돌봄을 제공하고 있어요" },
];

const APPLY_STEPS = [
  { title: "장기요양등급 확인", desc: "국민건강보험공단에서 1~5등급을 받았는지 확인해요. 등급이 없다면 먼저 등급 신청을 해야 해요." },
  { title: "서류 준비", desc: "가족요양비 지급 신청서, 거주지 증명(섬·벽지) 또는 특수 사유 증명 서류를 준비해요." },
  { title: "공단 지사 신청", desc: "가까운 국민건강보험공단 지사에 방문하거나 우편으로 서류를 제출해요. 전화 상담(1577-1000)도 가능해요." },
  { title: "심사 후 지급", desc: "심사 후 승인되면 매월 정해진 날짜에 계좌로 233,400원이 입금돼요." },
];

const FAQS = [
  { q: "요양보호사 자격증이 필요한가요?", a: "아니요, 필요 없어요. 가족요양비는 자격증 없이도 받을 수 있어요. '가족요양보호사' 제도(자격증 필수, 시급 지급)와 다른 별도 제도예요." },
  { q: "가족요양비는 언제까지 받을 수 있나요?", a: "장기요양등급 인정 기간 동안 계속 받을 수 있어요. 등급이 갱신되면 재신청이 필요해요." },
  { q: "등급에 따라 금액이 다른가요?", a: "아니요, 1등급이든 5등급이든 동일하게 월 233,400원이에요." },
  { q: "도시에 살아도 받을 수 있나요?", a: "원칙적으로 섬·벽지 거주자가 대상이에요. 다만 신체·정신적 특수 사유가 있으면 도시 거주자도 가능할 수 있으니 공단에 상담해봐요." },
  { q: "일반 장기요양급여와 동시에 받을 수 있나요?", a: "안 돼요. 가족요양비를 받으면 방문요양 같은 일반 급여는 이용할 수 없어요. 둘 중 하나를 선택해야 해요." },
  { q: "가족요양비에 세금이 붙나요?", a: "비과세예요. 가족요양비는 장기요양급여의 일종이라 소득세가 부과되지 않아요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국민건강보험공단 장기요양보험", url: "https://www.longtermcare.or.kr" },
      { label: "보건복지부 장기요양급여 안내", url: "https://www.mohw.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "의료비-공제-대상-범위", title: "의료비 공제 대상 범위", description: "장기요양 관련 비용도 의료비 공제 대상이 될 수 있어요." },
  { slug: "고령자-정의-법적-기준", title: "고령자 정의 법적 기준", description: "법에서 고령자를 몇 세로 보는지 확인해봐요." },
  { slug: "연말정산-의료비-공제-한도", title: "연말정산 의료비 공제", description: "의료비 공제 한도와 대상을 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 장기요양 · 가족 돌봄</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        가족요양비 지원 자격<br />
        월 233,400원 신청 조건과 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부모님을 집에서 돌보는데 비용이 만만치 않죠.
        장기요양기관을 이용하기 어려운 환경이라면, 가족이 직접 돌볼 때 매월 233,400원을 현금으로 받을 수 있어요.
        자격 조건과 신청 방법을 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>가족요양비 자격 조건은?</H2>
      <p style={body}>
        <a href="https://www.longtermcare.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민건강보험공단</a>에서
        장기요양등급(1~5등급)을 받은 사람 중, 요양기관 이용이 어려운 경우에 해당돼요.
      </p>

      <GreenBox>
        · 대상: 장기요양 <strong>1~5등급</strong> (인지지원등급 제외)<br />
        · 조건: 섬·벽지 거주 또는 신체·정신적 <strong>특수 사유</strong><br />
        · 금액: 등급 무관 동일 월 <strong>233,400원</strong> (현금 지급)<br />
        · 자격증: <strong>불필요</strong> (가족요양보호사 제도와 별개)
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>내가 받을 수 있는지 확인해보세요</H2>
      <p style={body}>
        아래 조건을 모두 충족하면 가족요양비를 신청할 수 있어요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="가족요양비 신청 조건을 충족해요. 국민건강보험공단 지사에 신청하면 돼요."
        partialMatchText="일부 조건이 충족되지 않아요. 공단(1577-1000)에 상담해보시는 게 좋아요."
      />

      <Divider />

      <H2>신청 절차는 이래요</H2>
      <p style={body}>
        국민건강보험공단 지사에 방문하거나 우편으로 신청해요.
        승인되면 매월 계좌로 입금돼요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <BorderBox>
        <strong>가족요양비 vs 가족요양보호사, 뭐가 다른가요?</strong><br /><br />
        · <strong>가족요양비</strong>: 자격증 불필요, 월 233,400원 고정, 섬·벽지/특수 사유 대상<br />
        · <strong>가족요양보호사</strong>: 요양보호사 자격증 필수, 시급 기반 지급, 일반 지역도 가능<br /><br />
        두 제도를 동시에 받을 수는 없어요. 상황에 맞는 쪽을 선택하면 돼요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 국민건강보험공단·보건복지부 자료를 바탕으로 작성됐어요. 지급 금액과 자격 조건은 고시 변경 시 달라질 수 있으니 공단(1577-1000)에 확인해봐요." />
    </ArticleLayout>
  );
}
