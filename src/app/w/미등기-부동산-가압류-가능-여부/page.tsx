"use client";
// Q1. 채무자가 미등기 건물을 보유하고 있어서, 가압류가 가능한지 방법을 찾고 있는 채권자
// Q2. 미등기 부동산 가압류 신청서를 작성해서 법원에 제출한다
// Q3. 민사집행법 제293조 근거, 신청 서류(소유증명·건물 특정 서류), 무허가 건물 불가, 집행관 현장 집행 방식, 회수율 한계
// Q4. GreenBox(결론) + Steps(신청 절차) + Checklist(서류 목록) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "법원에 가압류 신청서를 제출해요",
    desc: "관할 법원(부동산 소재지)에 가압류 신청서를 작성해서 제출해요. 신청서에 '미등기 부동산'임을 반드시 기재하고, 건물 소재지 주소·지번·구조·면적을 구체적으로 적어요. 온라인으로 전자소송포털(ecfs.scourt.go.kr)에서도 접수할 수 있어요.",
  },
  {
    title: "건물이 채무자 소유라는 증명 서류를 첨부해요",
    desc: "미등기 건물은 등기부등본이 없으니 건축물대장, 재산세 과세증명, 건축허가서 등으로 채무자 소유임을 입증해야 해요. 건축허가·신고 없는 무허가 건물은 가압류가 안 되니까 먼저 확인하세요.",
  },
  {
    title: "법원이 가압류 결정을 내려요",
    desc: "법원이 서류 심사 후 가압류 결정을 내려요. 등기된 부동산은 등기부에 기입하지만, 미등기 부동산은 등기할 곳이 없어서 다음 단계로 넘어가요.",
  },
  {
    title: "집행관이 현장에 가서 가압류 표시를 붙여요",
    desc: "법원 집행관이 건물에 직접 방문해서 외벽이나 출입문에 가압류 표시를 부착하고, 집행조서를 작성해요. 이 조서가 가압류의 증거 서류가 돼요. 집행비용(교통비·인건비) 10~30만원을 미리 예납해야 해요.",
  },
];

const CHECKLIST = [
  "건축물대장에 건물이 등재되어 있는지 확인 / 미등재면 건축허가서 확보",
  "무허가 건물 여부 확인 / 무허가면 가압류 신청 불가",
  "건물 소재지·구조·면적 특정 가능한 서류 준비 / 사진 첨부 권장",
  "채무자 소유 입증 서류 / 재산세 과세증명 또는 건축허가서",
  "집행비용 예납금 10~30만원 준비",
];

const FAQS = [
  {
    q: "미등기 건물이면 무조건 가압류 가능한가요?",
    a: "아니에요. 건축허가나 건축신고를 한 건물만 가능해요. 무허가 건물(허가·신고 없이 지은 건물)은 민사집행법상 가압류 대상이 아니에요. 건축물대장에 올라가 있는지 먼저 확인하세요.",
  },
  {
    q: "가압류 표시를 채무자가 떼어버리면 어떻게 되나요?",
    a: "가압류 표시를 훼손하면 공용물건손상죄(형법 제141조)로 처벌받을 수 있어요. 다만 현실적으로 미등기 건물은 감시가 어려워서, 정기적으로 현장 확인하는 게 좋아요.",
  },
  {
    q: "미등기 건물 가압류 비용은 얼마예요?",
    a: "인지대는 등기된 부동산과 동일한 기준이에요. 추가로 집행관 현장 출장 비용 10~30만원이 들어요. 등록면허세는 등기를 안 하니까 안 내도 돼요.",
  },
  {
    q: "등기된 부동산과 효력 차이가 크나요?",
    a: "네, 많이 달라요. 등기된 부동산 가압류는 등기부에 기록돼서 제3자도 알 수 있지만, 미등기 건물은 현장 표시뿐이라 제3자가 모를 수 있어요. 회수율도 낮은 편이에요.",
  },
  {
    q: "컨테이너나 비닐하우스도 가압류 가능한가요?",
    a: "건축물대장에 등재돼 있고 건축허가·신고를 거친 것이면 가능해요. 단순히 놓아둔 컨테이너는 동산에 해당해서 부동산 가압류가 아닌 동산 가압류로 진행해야 해요.",
  },
  {
    q: "가압류 후 경매까지 갈 수 있나요?",
    a: "가압류 자체로는 경매가 안 돼요. 본안소송에서 승소 판결을 받은 뒤 강제집행을 신청해야 경매가 진행돼요. 미등기 건물이라 경매 낙찰가가 낮을 수 있으니 신중하게 판단하세요.",
  },
];

const SOURCES = [
  { name: "민사집행법", href: "https://www.law.go.kr/법령/민사집행법" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=294&ccfNo=3&cciNo=1&cnpClsNo=1" },
  { name: "전자소송포털", href: "https://ecfs.scourt.go.kr" },
];

const RELATED = [
  { slug: "가압류-신청-절차-진행", title: "가압류 신청 절차와 진행", description: "일반 부동산 가압류 신청 방법과 비용." },
  { slug: "동산-가압류-방법", title: "동산 가압류 방법", description: "예금·차량·물건 가압류하는 절차." },
  { slug: "살고있는-집-가압류-경매-시기", title: "가압류 후 경매까지 걸리는 시간", description: "가압류에서 강제경매까지의 절차와 기간." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>법률 · 가압류 · 민사집행</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        미등기 부동산도 가압류 되나요?<br />
        신청 서류부터 집행 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        채무자 명의 건물이 등기가 안 돼 있어서 가압류할 수 있는지 고민이시죠.
      </p>
      <p style={body}>
        결론부터 말하면, <strong>건축허가·신고를 거친 미등기 건물은 가압류 가능</strong>해요.
        다만 등기부에 기록이 안 되기 때문에 <strong>집행관이 현장에서 직접 표시</strong>를 붙이는 방식이에요.
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법 제293조</a>가 근거 조문이에요.
        무허가 건물은 대상이 아니니까 먼저 건축물대장을 확인하세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>미등기 건물 가압류, 결론부터 정리하면</H2>
      <p style={body}>
        등기 여부와 관계없이 채무자 재산이면 가압류 대상이에요. 단, 무허가 건물은 제외돼요.
        등기된 부동산처럼 등기부에 (가압류) 표시를 하는 게 아니라, 법원 집행관이 현장에 가서 물리적으로 표시를 부착하는 방식이에요.
      </p>

      <GreenBox>
        미등기 부동산 가압류 핵심 3가지{"\n"}
        · 건축허가·신고를 거친 건물이면 가능 (무허가 불가){"\n"}
        · 등기부 기입이 아닌 집행관 현장 표시 방식{"\n"}
        · 제3자 대항력이 약하고 회수율이 낮은 편
      </GreenBox>

      <CategoryButton label="법률 정보" count={8} href="/category/법률" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>미등기 건물 가압류 신청은 이렇게 해요</H2>
      <p style={body}>
        일반 부동산 가압류와 비슷하지만, 건물 특정 서류와 소유 증명이 추가로 필요해요.
        <a href="https://ecfs.scourt.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>전자소송포털</a>에서 온라인 접수도 가능해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>신청 전에 이것만 챙기세요</H2>
      <p style={body}>
        미등기 건물 가압류에서 가장 많이 반려되는 이유가 서류 부족이에요.
        건물 소유 증명과 건물 특정(주소·면적·구조) 서류를 꼼꼼히 준비하세요.
      </p>

      <SectionBadge>신청 서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>미등기 가압류의 한계, 알고 판단하세요</H2>
      <p style={body}>
        등기부에 안 나타나니까 <strong>제3자가 가압류 사실을 모를 수 있어요</strong>.
        건물을 매수하려는 사람이 등기부를 떼 봐도 가압류가 보이지 않죠.
        채무자가 건물을 철거하거나 이동하면 가압류 대상 자체가 사라져요.
      </p>

      <BorderBox>
        <strong>미등기 vs 등기 부동산 가압류 비교</strong>{"\n"}
        · 등기 부동산: 등기부 기입 → 제3자 확인 가능 → 효력 강함{"\n"}
        · 미등기 부동산: 현장 표시 → 제3자 확인 어려움 → 효력 약함{"\n"}
        · 미등기 건물 경매 시 낙찰가가 낮고 매수자도 적어요
      </BorderBox>

      <p style={body}>
        가능하면 미등기 건물만 가압류하지 말고, 채무자의 예금·급여·등기된 부동산도 함께 가압류하는 게 회수 가능성을 높여요.
        <a href="/w/가압류-신청-절차-진행" style={{ color: "#1D9E75", textDecoration: "underline" }}>일반 가압류 절차</a>도 참고하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        미등기 건물 가압류에서 실제로 많이 헷갈리는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 민사집행법 기준으로 작성했어요. 개별 사안에 따라 법원 판단이 달라질 수 있으니 법률 전문가 상담을 권장해요." />
    </ArticleLayout>
  );
}
