"use client";
// Q1. 부업을 시작했는데 세금 처리를 어떻게 해야 하는지 모르는 직장인
// Q2. 부업 소득 유형을 구분하고, 내 상황에 맞는 세금 처리 방법을 결정한다
// Q3. 소득 3가지 유형(근로/사업/기타), 기타소득 300만원 이하 분리과세, 사업소득 3.3% → 5월 종소세, 합산과세 시 세율 상승
// Q4. DocTable(유형별 비교표) + GreenBox(핵심 판단 기준) + BorderBox(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const INCOME_TABLE = {
  headers: ["부업 유형", "소득 분류", "원천징수", "종소세 신고"],
  rows: [
    ["투잡 (직장 2곳)", "근로소득", "갑근세 원천징수", "필요 (합산신고)"],
    ["배달·대리운전·프리랜서", "사업소득", "3.3% 원천징수", "5월 종소세 필수"],
    ["강연료·원고료·자문료", "기타소득", "8.8% 원천징수", "300만원 이하 분리과세 선택 가능"],
    ["유튜브·블로그 광고수입", "사업소득", "원천징수 없음", "5월 종소세 필수"],
    ["주식 양도·배당소득", "금융소득", "15.4% 원천징수", "2,000만원 초과 시 합산"],
  ],
};

const FAQS = [
  { q: "기타소득 300만원 이하면 신고 안 해도 되나요?", a: "분리과세를 선택하면 이미 뗀 세금(8.8%)으로 끝나요. 종합소득세 신고를 하지 않아도 돼요. 단, 합산신고를 하면 세금이 더 줄어들 수도 있어요." },
  { q: "3.3% 떼는 부업은 뭔가요?", a: "사업소득이에요. 소득세 3%와 주민세 0.3%를 합친 3.3%를 원천징수해요. 배달, 대리운전, 프리랜서 디자인·개발 등이 해당되고, 5월에 종소세 신고를 해야 해요." },
  { q: "부업하면 세금이 많이 늘어나나요?", a: "소득이 합산되면서 과세표준이 올라가고, 세율 구간이 높아질 수 있어요. 하지만 경비를 인정받거나 공제를 활용하면 실제 추가 세금은 생각보다 적을 수 있어요." },
  { q: "회사에 부업이 들킬 수 있나요?", a: "종소세 신고 시 주민세 납부 방법을 '직접 납부'로 선택하면 회사에 통보가 가지 않아요. '회사 납부'를 선택하면 추가 소득이 노출될 수 있어요." },
  { q: "유튜브 수입은 어떻게 처리해요?", a: "사업소득이에요. 원천징수가 안 되니까 5월에 직접 종합소득세 신고를 해야 해요. 장비 구입비, 촬영 비용 등 경비를 인정받을 수 있어요." },
  { q: "분리과세와 합산신고 중 뭐가 유리해요?", a: "기타소득 300만원 이하일 때 세율 15% 이하 구간이면 합산신고가 유리할 수 있어요. 반대로 세율이 높으면 분리과세가 유리해요. 홈택스에서 모의계산으로 비교해보세요." },
];

const SOURCES = [
  { name: "국세청 종합소득세 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7664&mi=2224" },
  { name: "소득세법 제14조", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-공제항목", title: "연말정산 공제항목 종류", description: "소득공제와 세액공제 항목별 한도 비교." },
  { slug: "연말정산-과세표준", title: "연말정산 과세표준 세율", description: "과세표준 구간별 세율과 계산 방법." },
  { slug: "원천징수-신고-방법", title: "원천징수 신고 방법", description: "원천징수 개념과 신고 절차." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 부업</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        부업 소득, 세금 어떻게 처리해요?<br />
        유형별 신고 방법과 분리과세 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "부업 수입이 생겼는데 세금을 어떻게 해야 하죠?" 부업 소득은 종류에 따라 세금 처리가 완전히 달라요. 강연료 같은 기타소득은 300만원 이하면 분리과세로 끝낼 수 있는데, 배달 같은 사업소득은 무조건 5월에 종소세 신고를 해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>부업 소득은 3가지로 나뉘어요</H2>
      <p style={body}>
        세금 처리가 완전히 다르기 때문에 내 부업이 어떤 유형인지 먼저 파악해야 해요.
      </p>

      <GreenBox>
        근로소득: 직장 2곳 이상 (투잡) → 합산신고{"\n"}
        사업소득: 배달, 프리랜서, 유튜브 등 → 5월 종소세 필수{"\n"}
        기타소득: 강연료, 원고료 등 → 300만원 이하 분리과세 선택 가능
      </GreenBox>

      <CategoryButton label="연말정산" count={20} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>부업 유형별 세금 처리 비교</H2>
      <p style={body}>
        내 부업이 어디에 해당하는지 찾아보세요. <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제14조</a>에 따라 소득 유형이 결정돼요.
      </p>
      <SectionBadge>부업 유형별 세금 처리 방법</SectionBadge>
      <DocTable headers={INCOME_TABLE.headers} rows={INCOME_TABLE.rows} />

      <Divider />

      <H2>기타소득 300만원 이하, 분리과세가 뭔가요?</H2>
      <p style={body}>
        강연료, 원고료, 자문료 같은 기타소득은 필요경비(60%)를 빼고 남은 소득금액이 연 300만원 이하면 분리과세를 선택할 수 있어요.
      </p>

      <BorderBox>
        <strong>분리과세 예시</strong><br />
        강연료 총수입 700만원 → 필요경비 60% 차감 → 소득금액 280만원{"\n"}
        300만원 이하이므로 분리과세 선택 가능{"\n"}
        이미 뗀 세금(8.8%)으로 끝 → 종소세 신고 불필요{"\n"}{"\n"}
        <strong>주의</strong>: 소득금액이 300만원을 넘으면 전액 합산과세 (분리과세 선택 불가)
      </BorderBox>

      <p style={body}>
        분리과세가 항상 유리한 건 아니에요. <a href="/w/연말정산-과세표준" style={{ color: "#1D9E75", textDecoration: "underline" }}>과세표준</a> 세율이 8.8%보다 낮은 구간이면 합산신고가 세금을 줄여줄 수도 있어요.
      </p>

      <Divider />

      <H2>회사에 안 들키게 하려면?</H2>
      <p style={body}>
        종합소득세 신고 시 주민세 납부 방법을 선택하는 란이 있어요. 여기서 "직접 납부(보통징수)"를 선택하면 추가 주민세가 회사가 아니라 본인에게 직접 고지돼요.
      </p>

      <GreenBox>
        종소세 신고서 → 주민세 납부 방법 → "직접 납부(보통징수)" 선택{"\n"}
        "회사 납부(특별징수)" 선택하면 추가 소득이 회사에 노출될 수 있어요
      </GreenBox>

      <Divider />

      <H2>부업 세금, 자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 소득세법을 기준으로 작성했어요. 소득 유형 판단과 세율은 개별 상황에 따라 달라질 수 있으니 국세청(126) 또는 세무 전문가에게 상담해보세요." />
    </ArticleLayout>
  );
}
