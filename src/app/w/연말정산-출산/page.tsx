"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 올해 출산한 직장인이 연말정산에서 받을 수 있는 혜택이 뭔지, 총 얼마를 돌려받는지 궁금한 상황
// Q2. 출산 관련 공제 항목(출산수당 비과세, 산후조리비, 인적공제, 출산세액공제)을 빠짐없이 챙긴다
// Q3. 출산지원금 전액 비과세(2년 내 2회), 산후조리비 200만원, 인적공제 150만원, 출산세액공제 30~70만원
// Q4. GreenBox(혜택 요약) + BorderBox(총 환급 시뮬레이션) + Checklist(출산 공제 체크리스트) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "출산지원금 비과세 확인 (출생 후 2년 내 최대 2회, 전액 비과세)",
  "산후조리원 영수증 챙기기 (200만원 한도, 총급여 7,000만원 이하)",
  "신생아 기본공제 등록 (150만원 소득공제)",
  "출산·입양 세액공제 신청 (첫째 30만원, 둘째 50만원, 셋째 70만원)",
  "자녀 세액공제 확인 (기본공제 등록 자녀 수에 따라)",
  "출산 관련 의료비 영수증 (산전검사, 분만비, 입원비)",
];

const FAQS = [
  {
    q: "출산하면 연말정산에서 총 얼마나 돌려받아요?",
    a: "첫째 기준으로 출산지원금 비과세 + 인적공제 150만원 + 출산 세액공제 30만원 + 자녀 세액공제 15만원 + 의료비·산후조리비 공제까지 합치면 세율에 따라 100만원 넘게 돌려받을 수 있어요.",
  },
  {
    q: "출산지원금이 전액 비과세라고요?",
    a: "2024년부터 출생 후 2년 이내에 회사에서 받는 출산지원금은 전액 비과세예요. 최대 2회까지 적용되고 금액 제한이 없어요. 회사에서 1,000만원을 줬다면 세금이 0원이에요.",
  },
  {
    q: "산후조리비는 누구나 공제받을 수 있나요?",
    a: "총급여 7,000만원 이하인 경우에만 공제돼요. 200만원 한도로 의료비 세액공제 15%가 적용돼요. 200만원 × 15% = 30만원을 돌려받는 구조예요.",
  },
  {
    q: "12월에 출산해도 그 해 전체 공제를 받을 수 있나요?",
    a: "네. 12월 31일에 출산해도 그 해 전체에 대해 인적공제 150만원과 출산 세액공제를 받아요. 출생 연도 기준이라서 날짜는 상관없어요.",
  },
  {
    q: "쌍둥이를 출산하면 공제가 2배인가요?",
    a: "거의 그래요. 인적공제는 150만원 × 2 = 300만원이에요. 출산 세액공제는 출생 순서에 따라 달라요. 첫째·둘째 출산이면 30만+50만=80만원, 둘째·셋째면 50만+70만=120만원이에요.",
  },
  {
    q: "출산·입양 세액공제와 자녀 세액공제를 둘 다 받을 수 있나요?",
    a: "네. 출산 세액공제는 출산한 해에만 받는 일회성 공제고, 자녀 세액공제는 매년 받는 공제예요. 별도 항목이라 중복 적용돼요.",
  },
];

const SOURCES = [
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr" },
  { name: "소득세법 제59조의2", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-출산-입양-세액공제", title: "출산·입양 세액공제 금액과 조건", description: "첫째 30만원, 둘째 50만원, 셋째 70만원 상세 안내." },
  { slug: "연말정산-의료비-세액공제", title: "의료비 세액공제 조건과 계산법", description: "산전검사·분만비 포함 의료비 공제." },
  { slug: "연말정산-자녀-세액공제", title: "자녀 세액공제 금액과 조건", description: "자녀 수별 세액공제 금액 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 출산 · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        출산했는데, 연말정산에서 뭘 돌려받을 수 있나요?<br />
        출산 관련 공제 항목과 환급액 계산
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        올해 아이가 태어났다면 연말정산에서 챙길 게 생각보다 많아요.
      </p>
      <p style={body}>
        회사에서 받는 <strong>출산지원금은 전액 비과세</strong>(2년 내 2회)예요. 여기에 산후조리비 공제, 인적공제 150만원,
        <a href="/w/연말정산-출산-입양-세액공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>출산 세액공제</a>(첫째 30만원),
        <a href="/w/연말정산-의료비-세액공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>의료비 공제</a>까지 합치면 세율에 따라 <strong>100만원 넘게</strong> 돌려받을 수 있어요.
        하나씩 정리해 드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>출산 관련 공제 항목, 한눈에 볼게요</H2>
      <p style={body}>
        출산 시 받을 수 있는 연말정산 혜택은 크게 5가지예요. 비과세 항목과 공제 항목을 구분해서 정리했어요.
      </p>

      <SectionBadge>출산 관련 연말정산 혜택</SectionBadge>
      <GreenBox>
        1. 출산지원금 비과세 — 출생 후 2년 내 최대 2회, 전액 비과세{"\n"}
        2. 산후조리비 — 200만원 한도, 15% 세액공제 (= 최대 30만원){"\n"}
        3. 신생아 인적공제 — 150만원 소득공제{"\n"}
        4. 출산·입양 세액공제 — 첫째 30만원, 둘째 50만원, 셋째 70만원{"\n"}
        5. 출산 관련 의료비 — 산전검사+분만비 전액 15% 세액공제
      </GreenBox>

      <p style={body}>
        출산지원금 비과세가 2024년부터 크게 바뀌었어요. 예전에는 월 20만원 한도였는데, 지금은 <strong>금액 제한 없이 전액 비과세</strong>예요.
        회사에서 500만원을 줘도 세금이 0원이에요.
      </p>

      <CategoryButton label="연말정산 가이드" count={30} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>총 환급이 얼마나 되는지 계산해 봐요</H2>
      <p style={body}>
        각 항목별로 환급액을 합산하면 꽤 큰 금액이 나와요. 첫째 출산 기준으로 시뮬레이션해 볼게요.
      </p>

      <SectionBadge>첫째 출산 환급 시뮬레이션</SectionBadge>
      <BorderBox>
        <strong>총급여 5,000만원, 첫째 출산</strong>{"\n\n"}
        1. 출산지원금 비과세: 세금 절감 효과 (금액에 따라 다름){"\n"}
        2. 인적공제 150만원 × 세율 24% = <strong>36만원</strong> 절세{"\n"}
        3. 출산 세액공제 = <strong>30만원</strong>{"\n"}
        4. 자녀 세액공제 = <strong>15만원</strong>{"\n"}
        5. 산후조리비 200만원 × 15% = <strong>30만원</strong>{"\n"}
        6. 출산 의료비 300만원 (3% 문턱 초과분 150만원 × 15%) = <strong>22.5만원</strong>{"\n\n"}
        합계: 약 <strong>133.5만원</strong> 환급 효과
      </BorderBox>

      <BorderBox>
        <strong>총급여 4,000만원, 둘째 출산</strong>{"\n\n"}
        1. 인적공제 150만원 × 세율 15% = <strong>22.5만원</strong>{"\n"}
        2. 출산 세액공제 = <strong>50만원</strong>{"\n"}
        3. 자녀 세액공제(2명) = <strong>35만원</strong>{"\n"}
        4. 산후조리비 200만원 × 15% = <strong>30만원</strong>{"\n"}
        5. 출산 의료비 200만원 (3% 초과분 80만원 × 15%) = <strong>12만원</strong>{"\n\n"}
        합계: 약 <strong>149.5만원</strong> 환급 효과
      </BorderBox>

      <p style={body}>
        둘째부터는 출산 세액공제가 50만원으로 올라가서 환급이 더 커져요.
        셋째 이상은 70만원이에요. 산후조리비와 의료비까지 꼼꼼히 챙기면 차이가 크죠.
      </p>

      <Divider />

      <H2>출산지원금 비과세, 2024년부터 파격적으로 바뀌었어요</H2>
      <p style={body}>
        2024년 세법 개정으로 출산지원금 비과세 혜택이 크게 확대됐어요.
        기존에는 월 20만원(연 240만원) 한도였는데, 지금은 <strong>금액 제한 없이 전액 비과세</strong>예요.
      </p>

      <BorderBox>
        <strong>출산지원금 비과세 요건</strong>{"\n"}
        · 근로자 본인 또는 배우자가 출산{"\n"}
        · 출생일 이후 2년 이내 지급{"\n"}
        · 공통 지급규정에 따른 지급 (특정인만 X){"\n"}
        · 최대 2회까지 전액 비과세{"\n"}
        · 금액 제한 없음 (1,000만원이든 2,000만원이든)
      </BorderBox>

      <p style={body}>
        회사에 출산지원금 제도가 있다면 반드시 신청하세요. 세금이 0원이니까 실질적으로 돈을 더 받는 것과 같아요.
        이제 나머지 공제 항목도 빠뜨리지 말고 체크해 봐요.
      </p>

      <Divider />

      <H2>출산 공제 체크리스트, 하나도 빠뜨리지 마세요</H2>
      <p style={body}>
        출산 관련 공제는 항목이 여러 개라서 하나쯤 빠뜨리기 쉬워요. 아래 체크리스트로 전부 점검하세요.
      </p>

      <SectionBadge>출산 연말정산 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        출산 연말정산에서 자주 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준으로 작성했어요. 출산 관련 비과세·공제 요건은 세법 개정에 따라 달라질 수 있으니 최신 기준은 국세청에서 확인해 주세요." />
    </ArticleLayout>
  );
}
