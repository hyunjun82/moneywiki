"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  DocTable, Steps, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// Q1. 검색자 상황: 월급명세서에서 소득세가 빠져나가는 게 원천징수라는 걸 알았지만, 왜 떼는지·얼마나 떼는지·어떻게 신고하는지 모르는 상황. 사업자도 있음
// Q2. 읽고 나서 할 행동: 내 원천징수 내역을 이해하거나, 사업자라면 홈택스에서 원천징수 신고를 완료
// Q3. 알아야 할 정보: 원천징수 뜻, 소득 종류별 세율(근로·사업·기타), 신고 기한(다음달 10일), 연말정산과 관계, 가산세
// Q4. 전달 형태: DocTable(소득별 세율) + Steps(홈택스 신고) + GreenBox(핵심 요약)

// ─── 데이터 ──────────────────────────────────────────

const TAX_RATES = [
  { name: "근로소득 (정규직·계약직)", required: true, where: "간이세액표 적용 — 급여·부양가족 수에 따라 다름. 다음 달 10일까지 신고" },
  { name: "일용근로소득", required: true, where: "일당 15만원 초과분의 2.97% — 일당 187,000원 미만이면 세금 0원" },
  { name: "사업소득 (강연료·원고료·자문료)", required: true, where: "3.3% (소득세 3% + 지방소득세 0.3%) — 100만원 받으면 96.7만원 수령" },
  { name: "기타소득 (복권·강연·자문 등)", required: true, where: "강연·원고·자문: 8.8% / 그 외: 4.4% — 필요경비 차감 후 계산 가능" },
  { name: "퇴직소득", required: true, where: "근속연수 공제 후 누진세 적용 — 회사가 자동 원천징수" },
  { name: "이자·배당소득", required: false, where: "14% (지방소득세 포함 15.4%) — 금융기관이 원천징수" },
];

const REPORT_STEPS = [
  {
    title: "홈택스 접속 후 신고/납부 메뉴 선택",
    desc: "국세청 홈택스(www.hometax.go.kr)에 접속해서 로그인해요. '신고/납부 → 원천세'를 클릭하세요. 공동인증서·금융인증서·간편인증 중 하나로 로그인하면 돼요.",
    tip: "신고 기한: 지급월 다음 달 10일 (1월 급여 지급 시 → 2월 10일까지)",
  },
  {
    title: "원천징수이행상황신고서 작성",
    desc: "소득 종류별로 지급액과 원천징수 세액을 입력해요. 근로소득·사업소득·기타소득을 구분해서 작성해야 해요. 직원이 많으면 엑셀 파일로 만들어 일괄 업로드할 수 있어요.",
    tip: "반기별 신고: 원천징수세액이 반기 평균 20만원 미만이면 1월·7월 두 번만 신고 가능",
  },
  {
    title: "세금 납부",
    desc: "신고 후 가상계좌 번호나 계좌이체로 납부해요. 신고와 납부를 동시에 처리하면 돼요. 홈택스에서 신고 완료 후 납부 화면으로 바로 이동돼요.",
    tip: "납부 기한도 신고 기한과 동일 — 다음 달 10일",
  },
];

const FAQS = [
  {
    q: "3.3% 세금이 원천징수인가요?",
    a: "네. 프리랜서가 사업소득으로 받을 때 적용되는 세율이에요. 소득세 3% + 지방소득세 0.3%를 합친 게 3.3%예요. 100만원 받으면 96.7만원이 입금되는 거예요.",
  },
  {
    q: "원천징수를 안 하면 어떻게 되나요?",
    a: "사업자(원천징수 의무자)가 세금을 안 떼면 가산세가 붙어요. 무신고면 납부세액의 10%, 미납이면 3%가 추가돼요. 원천징수 의무가 있는 소득을 지급할 때는 반드시 떼야 해요.",
  },
  {
    q: "연말정산과 원천징수가 무슨 관계인가요?",
    a: "원천징수는 매달 미리 내는 거고, 연말정산은 1년치를 정산하는 과정이에요. 간이세액표로 매달 낸 세금이 실제 세금보다 많으면 환급, 적으면 추가 납부가 필요해요. 프리랜서는 연말정산 대신 다음 해 5월에 종합소득세 신고를 해요.",
  },
  {
    q: "원천징수 내역은 어디서 확인하나요?",
    a: "홈택스 → 조회/발급 → 근로소득·원천징수 내역에서 확인할 수 있어요. 회사가 제대로 원천징수했는지, 연말정산 환급이 예상되는지 미리 파악할 수 있어요.",
  },
  {
    q: "일용직 아르바이트도 원천징수 대상인가요?",
    a: "일당 15만원을 넘으면 초과분의 2.97%가 원천징수돼요. 일당 187,000원 미만이면 계산 결과가 1,000원 미만이 되어서 실제로는 세금이 없어요. 일당 15만원 이하라면 세금 걱정 안 해도 돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청 — 원천징수 개요", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2289&cntntsId=7701" },
      { label: "국세청 — 근로소득 원천징수", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6583&cntntsId=7862" },
      { label: "국세청 홈택스 — 원천세 신고/납부", url: "https://www.hometax.go.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "소득세법 제127조 — 원천징수 의무", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-환급-조회-기간", title: "연말정산 환급 조회 기간", description: "원천징수로 미리 낸 세금이 많으면 돌려받아요. 환급 조회 방법이에요." },
  { slug: "종합소득세-환급-신청", title: "종합소득세 환급 신청", description: "프리랜서·사업소득자는 5월에 종합소득세 신고로 환급받아요." },
  { slug: "퇴직금-세금", title: "퇴직소득세 계산법", description: "퇴직금에 원천징수되는 퇴직소득세 계산 구조예요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 원천징수 · 연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        원천징수 뜻, 세율, 신고 방법<br />
        3.3%부터 연말정산 관계까지
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        월급명세서에서 소득세가 자동으로 빠져나가는 게 바로 원천징수예요.
        내가 신청하지 않아도 회사가 대신 세금을 국가에 납부하는 제도죠.
        <a href="https://www.nts.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a>이 근거 법령인 소득세법 제127조로 이 의무를 규정하고 있어요.
        소득 종류별 세율(3.3%, 8.8% 등), 사업자의 신고 방법, 연말정산과의 관계를 정리했어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>소득 종류별 원천징수 세율</H2>
      <p style={body}>
        세율은 소득 종류마다 달라요. 근로소득은 간이세액표를 써서 급여와 부양가족 수에 따라 다르고,
        프리랜서 사업소득은 3.3%가 기본이에요. 강연료·원고료·자문료는 8.8%가 적용돼요.
      </p>

      <SectionBadge>소득 종류별 원천징수 세율</SectionBadge>
      <DocTable docs={TAX_RATES} />

      <GreenBox>
        근로소득: 간이세액표 기준 (다음 달 10일까지 신고)<br />
        사업소득 (프리랜서): 3.3% 원천징수<br />
        강연료·원고료·자문료: 8.8% 원천징수<br />
        연말정산으로 실제 세금과 최종 정산
      </GreenBox>

      <Divider />
      <ArticleAd position="mid" />

      <H2>사업자 원천징수 신고 방법 (홈택스)</H2>
      <p style={body}>
        직원 급여나 프리랜서 용역비를 지급했다면 다음 달 10일까지 원천징수 신고를 해야 해요.
        홈택스에서 온라인으로 처리하고, 직원 수가 적으면 10~15분이면 완료돼요.
        반기별 신고 대상이라면 1월·7월에만 하면 돼요.
      </p>
      <Steps steps={REPORT_STEPS} />

      <BorderBox>
        신고 기한을 넘기면 무신고 가산세(10%)와 납부지연 가산세(일 0.025%)가 동시에 붙어요.
        신고가 어려운 사정이 있다면 기한 전에 납부 연장을 신청하는 게 가산세를 줄이는 방법이에요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        원천징수에서 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />
      <H2>출처</H2>
      <References groups={REFERENCES} />

      <CategoryButton label="세금 관련 글 더 보기" href="/w/연말정산-환급-조회-기간" />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세율·공제 기준은 변경될 수 있으니 최신 기준은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
