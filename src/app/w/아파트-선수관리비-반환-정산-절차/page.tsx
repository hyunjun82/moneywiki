"use client";

// Q1. 아파트를 팔거나 이사 가면서 선수관리비(관리비예치금)를 돌려받을 수 있는지 확인하려는 상황
// Q2. 잔금일 전에 관리사무소에서 영수증을 받아 매수인에게 정산금을 청구한다
// Q3. 공동주택관리법 제24조(반환 의무), 정산 시기(잔금일), 장기수선충당금과의 차이, 미납 관리비 충당
// Q4. GreenBox(핵심 정리) + Steps(정산 절차) + Checklist(잔금 전 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "관리사무소에서 선수관리비 영수증을 받으세요",
    desc: "잔금일 1~2주 전에 관리사무소를 방문해서 선수관리비 영수증 발급을 요청해요. 영수증에는 예치 날짜, 금액, 남은 반환액이 적혀 있어요.",
    tip: "미리 전화해서 준비해 달라고 하면 당일 수령 가능",
  },
  {
    title: "밀린 관리비가 있는지 확인하세요",
    desc: "미납 관리비가 있으면 선수관리비에서 먼저 충당돼요. 예를 들어 선수관리비 40만원인데 밀린 관리비가 10만원이면, 반환액은 30만원이에요.",
    tip: "장기수선충당금도 별도 정산해야 해요",
  },
  {
    title: "잔금일에 매수인에게 정산금을 청구하세요",
    desc: "영수증을 매수인(새 주인)에게 보여주고 남은 선수관리비를 받아요. 잔금에 포함시키거나 별도로 정산해요. 공인중개사가 도와주는 경우가 많아요.",
  },
  {
    title: "매수인은 관리사무소에 새로 예치하세요",
    desc: "매수인(새 주인)은 관리사무소에 본인 명의로 선수관리비를 새로 예치해요. 다음에 집을 팔 때 같은 방식으로 돌려받을 수 있어요.",
  },
];

const CHECKLIST_ITEMS = [
  "관리사무소에서 선수관리비 영수증 발급 완료",
  "영수증의 남은 반환액이 정확한지 확인",
  "밀린 관리비가 있는지 확인 (있으면 차감 후 반환)",
  "장기수선충당금 별도 정산 여부 확인",
  "전기·가스·수도 공과금 마지막 검침 완료",
];

const FAQS = [
  {
    q: "세입자(전세·월세)도 선수관리비를 돌려받을 수 있나요?",
    a: "아니에요. 선수관리비는 소유자(집주인)만 예치하고 반환받아요. 세입자는 매달 관리비를 내지만 선수관리비와는 별개예요.",
  },
  {
    q: "선수관리비랑 장기수선충당금은 다른 건가요?",
    a: "완전히 달라요. 선수관리비는 입주 시 한 번 내는 보증금이고, 장기수선충당금은 매달 관리비에 포함돼서 아파트 대규모 수리용으로 적립하는 돈이에요. 둘 다 매매 시 정산해야 해요.",
  },
  {
    q: "관리사무소가 영수증을 안 줘요. 어떻게 하나요?",
    a: "먼저 입주자대표회의에 민원을 넣어보세요. 안 되면 구청 주민분쟁조정위원회에 신청할 수 있고, 최종적으로 법원 소송도 가능해요. 잔금 전에 꼭 해결하세요.",
  },
  {
    q: "선수관리비는 보통 얼마인가요?",
    a: "아파트마다 다르지만 보통 30만원~50만원 정도예요. 대단지 아파트는 더 높을 수 있어요. 관리규약에 정해져 있어요.",
  },
  {
    q: "관리비를 많이 밀리면 선수관리비로 다 충당되나요?",
    a: "네, 미납 관리비가 선수관리비보다 많으면 선수관리비 전액이 충당되고 반환액은 0원이에요. 부족한 금액은 매수인에게 넘어갈 수 있어요.",
  },
];

const SOURCES = [
  { name: "공동주택관리법 제24조", href: "https://www.law.go.kr/법령/공동주택관리법" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=666&ccfNo=3&cciNo=3&cnpClsNo=2" },
];

const RELATED = [
  { slug: "아파트-관리비-체납", title: "아파트 관리비 체납 시 불이익", description: "체납하면 단수·단전부터 소송까지 갈 수 있어요." },
  { slug: "전세-계약-종료", title: "전세 계약 종료 보증금 정산", description: "전세 만기 시 보증금 돌려받는 절차 안내." },
  { slug: "취득세-계산-세율-납부", title: "취득세 세율과 납부 방법", description: "아파트 살 때 내는 취득세 계산법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 아파트 · 관리비 정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        아파트 팔 때 선수관리비 돌려받나요?<br />
        반환 조건과 정산 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아파트를 팔거나 이사 가면서 "선수관리비"라는 걸 정산해야 한다는데, 뭔지 모르겠죠.
      </p>
      <p style={body}>
        선수관리비는 입주할 때 관리사무소에 미리 낸 관리비 보증금이에요. 보통 30~50만원이고,
        <a href="https://www.law.go.kr/법령/공동주택관리법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공동주택관리법 제24조</a>에서
        소유권을 잃은 경우 반환 의무를 규정하고 있어요. 정산 안 하면 그냥 날리는 돈이니까 꼭 챙기세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>선수관리비가 뭐고, 누가 받을 수 있나요?</H2>
      <p style={body}>
        선수관리비(관리비예치금)는 입주 시 관리사무소에 맡기는 보증금이에요.
        관리비 미납이나 공실에 대비하는 용도예요.
      </p>

      <SectionBadge>핵심 정리</SectionBadge>
      <GreenBox title="선수관리비 반환 요약">
        <p><strong>반환 대상</strong> — 소유자(집주인)만 가능. 세입자는 대상 아님</p>
        <p><strong>반환 시기</strong> — 소유권 이전(매매·증여·상속) 시 잔금일에 정산</p>
        <p><strong>반환 의무</strong> — 공동주택관리법 제24조에 따라 관리주체가 반드시 반환</p>
        <p><strong>미납 관리비</strong> — 있으면 선수관리비에서 먼저 충당 후 잔액 반환</p>
      </GreenBox>

      <Divider />

      <H2>정산 절차를 알려드릴게요</H2>
      <p style={body}>
        잔금일 전에 미리 움직여야 해요.
        영수증 없이 잔금을 치르면 나중에 분쟁이 생길 수 있어요.
      </p>

      <SectionBadge>정산 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>장기수선충당금이랑 헷갈리지 마세요</H2>
      <p style={body}>
        매매 정산할 때 선수관리비와 장기수선충당금을 같이 처리하는 경우가 많아서 혼동하기 쉬워요.
      </p>
      <BorderBox>
        <p><strong>선수관리비</strong> — 입주 시 한 번 내는 보증금 (30~50만원) → 매매 시 매수인에게 청구</p>
        <p><strong>장기수선충당금</strong> — 매달 관리비에 포함 적립 → 매매 시 매도인이 낸 기간 만큼 매수인에게 청구</p>
        <p>영수증에 둘이 별도로 나오니까 각각 확인하세요.</p>
      </BorderBox>

      <Divider />

      <H2>잔금 전에 이것만 체크하세요</H2>
      <p style={body}>
        아래 항목을 정산하고 잔금을 치르면 나중에 분쟁을 피할 수 있어요.
      </p>

      <SectionBadge>잔금 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <CategoryButton label="부동산" count={12} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 공동주택관리법을 바탕으로 작성했어요. 아파트마다 관리규약이 다를 수 있으니 관리사무소에서 확인하세요." />
    </ArticleLayout>
  );
}
