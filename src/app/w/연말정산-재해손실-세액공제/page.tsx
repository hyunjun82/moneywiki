"use client";

// Q1. 화재·태풍·홍수 등으로 재산 피해를 입었는데 연말정산에서 세금 혜택이 있는지 알고 싶은 상황
// Q2. 재해손실 세액공제 요건을 확인하고 필요 서류를 준비해서 연말정산 또는 종합소득세 신고 시 신청한다
// Q3. 공제 계산식(손실액-보전액)x세율, 대상 재해·자산, 보전액 차감, 서류 목록, 신청 절차
// Q4. GreenBox(계산식) + Steps(신청 절차) + Checklist(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "피해 즉시 사진·영상으로 증거를 남기세요",
    desc: "재해가 발생하면 복구하기 전에 피해 현장을 촬영해 두세요. 훼손된 주택, 가재도구, 차량 등의 상태를 날짜가 찍힌 사진이나 영상으로 기록하는 게 중요해요. 나중에 손실액 증빙할 때 핵심 자료가 돼요.",
  },
  {
    title: "관련 기관에서 피해 확인서를 발급받으세요",
    desc: "화재는 소방서에서 화재증명서, 자연재해는 지자체에서 재난확인서, 교통사고는 경찰서에서 사고확인서를 발급받아요. 이 서류가 없으면 재해손실 공제 자체를 신청할 수 없어요.",
    tip: "기상청 기상증명서도 보충 자료로 활용 가능",
  },
  {
    title: "손실액을 산정하고 보전받은 금액을 정리하세요",
    desc: "손해사정사나 세무사의 도움을 받아 손실액을 산정해요. 보험금, 재해지원금, 손해배상금 등 보전받은 금액은 차감해야 해요. (실제 손실 = 재해손실액 - 보전액)이 공제 대상이에요.",
  },
  {
    title: "연말정산 또는 종합소득세 신고 시 서류를 제출하세요",
    desc: "직장인은 연말정산 때 회사에 서류를 제출하면 돼요. 퇴사했거나 사업소득이 있으면 종합소득세 확정신고 시 직접 신청하고요. 재해사실 확인서, 손실액 산정 명세서, 보험금 수령 내역, 수리비 영수증을 함께 내세요.",
  },
];

const CHECKLIST_ITEMS = [
  "화재증명서 / 재난확인서 / 사고확인서 (관련 기관 발급)",
  "피해 현장 사진·영상 (복구 전 촬영)",
  "손실액 산정 명세서 (세무사 또는 손해사정사 작성)",
  "보험금 수령 내역서",
  "수리비 영수증 (자재비, 인건비 등)",
  "모든 증빙서류 5년 보관",
];

const FAQS = [
  {
    q: "재해손실 세액공제 계산은 어떻게 하나요?",
    a: "(재해손실액 - 보험금 등 보전액)이 실제 손실이에요. 이 금액에 세율을 적용해서 공제받아요. 예를 들어 주택 화재로 5,000만원 손실이 나고 보험금 3,000만원을 받았으면 실제 손실 2,000만원이 공제 대상이에요.",
  },
  {
    q: "어떤 재해가 대상이에요?",
    a: "태풍, 홍수, 지진, 폭설 같은 천재지변은 물론이고 화재, 붕괴, 폭발 같은 인재도 해당돼요. 정부가 재난을 선포한 지역이면 추가 지원도 받을 수 있어요.",
  },
  {
    q: "자동차 피해도 공제되나요?",
    a: "네, 자가용 승용차도 대상이에요. 다만 차량보험으로 보전받은 금액은 빠져요. 보험금 수령 후 실제 손실분만 공제 대상이에요.",
  },
  {
    q: "사업소득 필요경비로 이미 처리하면 어떻게 되나요?",
    a: "사업소득 필요경비와 재해손실 세액공제를 중복으로 받을 수 없어요. 사업용 자산이면 필요경비로 처리하는 게 유리한지, 세액공제로 받는 게 유리한지 비교해서 한쪽만 선택해야 해요.",
  },
  {
    q: "재해 발생 다음 해에 공제받을 수 있나요?",
    a: "원칙적으로 재해 발생 연도에 공제받아요. 다음 해로 이월은 안 되지만, 해당 연도 종합소득세 확정신고 기한 내에 신청하면 돼요.",
  },
  {
    q: "정부 재난지원금 받으면 세액공제 못 받나요?",
    a: "재난지원금은 보전액에 포함돼서 손실액에서 차감돼요. 재난지원금 100만원 받았으면 그만큼 공제 대상 손실이 줄어들어요. 세액공제 자체를 못 받는 건 아니에요.",
  },
];

const SOURCES = [
  { name: "소득세법 제59조의4", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
  { name: "재난 및 안전관리 기본법", href: "https://www.law.go.kr/법령/재난및안전관리기본법" },
];

const RELATED = [
  { slug: "연말정산", title: "연말정산 기본 가이드", description: "연말정산 전체 흐름과 핵심 공제 항목." },
  { slug: "연말정산-세액공제-항목", title: "연말정산 세액공제 항목", description: "세액공제 전체 항목 한눈에 정리." },
  { slug: "긴급복지-생계지원금-신청-방법", title: "긴급복지 생계지원금 신청", description: "긴급 상황 시 생계지원금 받는 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 . 재해손실 . 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        화재·태풍 피해 입었다면?<br />
        재해손실 세액공제 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "집에 불이 나서 재산 피해가 컸는데, 세금에서 빼주는 제도가 있나요?"
      </p>
      <p style={body}>
        네, <strong>재해손실 세액공제</strong>라는 제도가 있어요. 천재지변이나 화재 등으로 자산 피해를 입으면 실제 손실액에 대해 세금을 깎아줘요.
        보험금 등 보전받은 금액은 빠지고, 나머지 실제 손실이 공제 대상이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>공제 금액은 어떻게 계산하나요?</H2>
      <p style={body}>
        계산 구조는 단순해요. 실제 손실액에서 보전받은 금액을 빼면 공제 대상이 돼요.
      </p>

      <SectionBadge>계산 공식</SectionBadge>
      <GreenBox title="재해손실 세액공제 계산">
        <strong>공제 대상 = 재해손실액 - 보험금·지원금 등 보전액</strong><br /><br />
        예시: 화재로 주택 5,000만원 손실 → 보험금 3,000만원 수령 → 실제 손실 2,000만원이 공제 대상
      </GreenBox>

      <p style={body}>
        공제 대상 자산은 본인 거주 주택, 가재도구(가전·가구), 차량, 농작물 등이에요. 사업용 자산도 해당되지만 사업소득 필요경비와 중복 적용은 안 돼요.
      </p>

      <Divider />

      <H2>신청 절차가 어떻게 되나요?</H2>
      <p style={body}>
        피해 발생 직후부터 서류를 챙겨야 해요. 복구한 다음에 증거 확보하려면 늦을 수 있어요.
      </p>

      <SectionBadge>신청 순서</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>어떤 재해가 대상이에요?</H2>
      <p style={body}>
        자연재해뿐 아니라 화재, 폭발 같은 인재도 포함돼요.
      </p>

      <SectionBadge>대상 재해 유형</SectionBadge>
      <BorderBox title="공제 대상 재해">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li><strong>천재지변</strong>: 태풍, 홍수, 해일, 지진, 폭설, 가뭄, 낙뢰</li>
          <li><strong>인재</strong>: 화재, 붕괴, 폭발</li>
          <li><strong>기타</strong>: 전염병으로 인한 재산 피해, 정부 재난 선포 지역</li>
        </ul>
      </BorderBox>

      <Divider />

      <H2>서류를 미리 챙겨두세요</H2>
      <p style={body}>
        증빙서류가 없으면 공제를 못 받아요. 피해 직후부터 하나씩 확보해 두는 게 중요해요.
      </p>

      <SectionBadge>필요 서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />

      <CategoryButton label="연말정산 글 더보기" href="/w" />
      <RelatedArticles items={RELATED} />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준 일반적인 안내예요. 재해손실 규모가 크면 세무사 상담을 받는 게 좋아요." />
    </ArticleLayout>
  );
}
