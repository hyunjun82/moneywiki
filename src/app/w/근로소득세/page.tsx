"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 급여명세서에서 빠져나가는 세금이 얼마인지 궁금한 직장인
// Q2. 간이세액표 구조 이해 + 80/100/120% 선택 + 연말정산 준비
// Q3. 세율 8단계, 간이세액표 원리, 비과세소득, 80/100/120%, 근로소득공제, 연말정산
// Q4. GreenBox(세율표) + BorderBox(간이세액표 원리) + Steps(연말정산) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const YEAR_END_STEPS = [
  {
    title: "홈택스 간소화 자료 다운로드",
    desc: "1월 15일경 홈택스(hometax.go.kr)에서 간소화 서비스가 열려요. 신용카드, 의료비, 교육비, 보험료 자료를 한 번에 받을 수 있죠.",
    link: { label: "홈택스 바로가기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "회사에 공제 서류 제출",
    desc: "간소화 PDF와 추가 영수증(기부금, 안경 구입비 등)을 회사에 제출해요. 보통 1~2월에 마감이에요.",
  },
  {
    title: "결정세액 확인",
    desc: "회사가 공제를 반영한 결정세액을 산출해요. 1년간 낸 세금(기납부세액)보다 적으면 차액을 환급받고, 많으면 추가 납부해요.",
  },
  {
    title: "2~3월 급여에 반영",
    desc: "환급이면 급여가 평소보다 많이 들어오고, 추가 납부면 적게 들어와요. 이게 '13월의 월급'이에요.",
  },
];

const FAQS = [
  { q: "근로소득세 세율이 몇 %인가요?", a: "과세표준에 따라 6~45% 8단계 누진세율이에요. 과세표준 1,400만원 이하면 6%, 10억 초과하면 45%예요." },
  { q: "80%, 100%, 120%는 뭔가요?", a: "원천징수 비율 선택이에요. 80%는 매달 세금을 적게 떼고 연말에 더 낼 수 있고, 120%는 반대예요. 회사에 신청서 내면 바꿀 수 있어요." },
  { q: "비과세소득은 뭐가 있나요?", a: "식대 월 20만원, 자가운전보조금 월 20만원, 출산·보육수당 월 20만원(자녀 1명당), 생산직 야간근로수당 연 240만원 등이에요." },
  { q: "연말정산에서 돌려받으려면 어떻게 하나요?", a: "신용카드·체크카드·현금영수증, 의료비, 교육비, 기부금, 연금저축, IRP 납입을 많이 할수록 공제가 커져요." },
  { q: "일용근로자는 어떻게 다른가요?", a: "세율 6% 고정이에요. 간이세액표를 안 쓰고, 일급 15만원까지 공제 받으면 세금이 거의 안 나와요. 연말정산도 안 해요." },
  { q: "근로소득 외에 부업 소득이 있으면요?", a: "5월에 종합소득세 신고를 해야 해요. 근로소득과 합쳐서 신고하면 돼요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "소득세법", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청: 근로소득 간이세액표", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6583&cntntsId=7862" },
      { label: "홈택스: 연말정산 간소화", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-세율", title: "연말정산 세율", description: "연말정산 때 적용되는 세율과 공제 항목을 정리했어요." },
  { slug: "연봉-실수령액", title: "연봉 실수령액", description: "연봉에서 세금·4대보험 빼면 실수령액이 얼마인지 확인해보세요." },
  { slug: "원천징수-신고-방법", title: "원천징수 신고 방법", description: "회사가 매월 하는 원천징수 신고 절차를 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 근로소득세 · 연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        근로소득세, 내 월급에서 얼마나 빠지나요?<br />
        세율부터 연말정산까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        급여명세서에 소득세가 찍혀 있는데 어떻게 계산되는지 모르겠죠.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에 따라
        6~45% 누진세율로 매달 원천징수되고, 연말정산에서 정산돼요.
        공제를 잘 챙기면 돌려받고, 못 챙기면 추가로 내야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>세율 구간, 얼마 벌면 몇 %인가요?</H2>
      <p style={body}>
        과세표준(총급여에서 공제 뺀 금액)에 따라 세율이 달라져요. 8단계 누진구조예요.
      </p>

      <GreenBox>
        <strong>2026년 근로소득세 세율표</strong><br />
        1,400만원 이하: 6% | 1,400~5,000만원: 15%<br />
        5,000~8,800만원: 24% | 8,800만원~1.5억: 35%<br />
        1.5~3억: 38% | 3~5억: 40% | 5~10억: 42% | 10억 초과: 45%<br /><br />
        <strong>예시</strong>: 과세표준 5,000만원이면 5,000만 x 24% - 576만 = 624만원<br />
        지방소득세(10%) 포함하면 약 686만원이에요.
      </GreenBox>

      <H2>간이세액표, 매달 얼마 떼나요?</H2>
      <p style={body}>
        회사가 매달 월급에서 떼는 세금은 간이세액표를 기준으로 해요. 월급과 부양가족 수로 정해지죠.
      </p>

      <BorderBox>
        <strong>간이세액표 원리</strong><br />
        - 월급에서 비과세소득(식대 20만원 등)을 뺀 금액 기준<br />
        - 부양가족이 많을수록 세금이 줄어요<br /><br />
        <strong>80% / 100% / 120% 선택</strong><br />
        - 100%: 간이세액표 그대로 (기본)<br />
        - 80%: 매달 세금 적게, 연말에 추가 납부 가능성<br />
        - 120%: 매달 세금 많이, 연말에 환급 가능성<br /><br />
        공제 항목이 많으면 80%가 유리하고, 공제가 적으면 120%가 안전해요.
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6583&cntntsId=7862" style={{ color: "#1D9E75", textDecoration: "underline" }}> 간이세액표 조회하기</a>
      </BorderBox>

      <H2>연말정산은 이렇게 진행돼요</H2>
      <p style={body}>
        1년간 원천징수한 세금과 실제 내야 할 세금의 차이를 정산하는 거예요. 공제를 잘 챙기면 '13월의 월급'을 받을 수 있죠.
      </p>

      <Steps steps={YEAR_END_STEPS} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 소득세법 기준으로 작성됐어요. 세율과 공제 항목은 매년 변경될 수 있으니 국세청(126)이나 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
