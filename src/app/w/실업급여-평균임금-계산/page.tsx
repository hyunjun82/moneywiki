"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "최근 3개월 급여명세서를 보유하고 있어요" },
  { id: "c2", label: "상여금, 수당 포함 여부를 확인했어요" },
  { id: "c3", label: "통상임금과 평균임금 차이를 이해했어요" },
  { id: "c4", label: "고용24에서 예상 수급액을 조회해봤어요" },
];

const CALC_SLIDERS = [
  { id: "totalPay", label: "최근 3개월 총 급여", min: 300, max: 2100, step: 10, defaultValue: 900, format: (v: number) => `${v}만원` },
];

const CALC_RESULTS = [
  {
    label: "1일 평균임금",
    getValue: (v: Record<string, number>) => Math.round((v.totalPay * 10000) / 90),
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "1일 구직급여액 (60%)",
    getValue: (v: Record<string, number>) => {
      const daily = Math.round((v.totalPay * 10000) / 90 * 0.6);
      return Math.max(66048, Math.min(68100, daily));
    },
    format: (v: number) => `${v.toLocaleString()}원`,
    highlight: true,
  },
  {
    label: "월 환산 수급액 (30일)",
    getValue: (v: Record<string, number>) => {
      const daily = Math.max(66048, Math.min(68100, Math.round((v.totalPay * 10000) / 90 * 0.6)));
      return daily * 30;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const CHECKLIST = [
  "퇴직 전 3개월 급여명세서 확보 (회사에 요청 가능)",
  "기본급 + 고정수당 + 상여금 합산 금액 계산",
  "실비 항목(출장비, 경조사비) 제외 여부 확인",
  "고용24(ei.go.kr)에서 모의계산 결과 조회",
  "상한액(68,100원)과 하한액(66,048원) 적용 확인",
];

const FAQS = [
  {
    q: "상여금도 평균임금에 포함되나요?",
    a: "퇴직 전 3개월 안에 받은 상여금이라면 전액 포함돼요. 다만 지급 시기에 따라 3개월 구간에 걸리지 않을 수도 있으니 급여명세서를 꼭 확인하세요.",
  },
  {
    q: "식대, 교통비는 어떻게 처리되나요?",
    a: "매달 고정으로 지급받는 식대와 교통비는 임금으로 봐서 포함돼요. 반면 출장비처럼 실비로 정산받는 금액은 제외되죠.",
  },
  {
    q: "평균임금이 높아도 실업급여 상한액이 있다던데요?",
    a: "맞아요. 2026년 기준 1일 상한액은 68,100원이에요. 평균임금의 60%가 이보다 높아도 68,100원까지만 받을 수 있죠.",
  },
  {
    q: "평균임금이랑 통상임금이랑 뭐가 다른 건가요?",
    a: "평균임금은 실제로 받은 금액 전부를 반영해요. 통상임금은 정기적으로 고정 지급되는 금액만 포함하죠. 실업급여는 평균임금 기준이에요.",
  },
  {
    q: "퇴직 직전 3개월에 무급휴직이 있었으면 어떻게 되나요?",
    a: "무급휴직 기간은 산정 기간에서 제외돼요. 그래서 실제 급여를 받은 기간을 기준으로 다시 3개월을 잡게 되죠. 고용센터에서 개별적으로 판단하니까 1350에 미리 문의해보세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 평균임금의 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용보험법 제45조: 구직급여 일액 산정 기준", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 모의계산", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 평균임금 산정 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-계산기",
    title: "실업급여 계산기 2026년 최신판",
    description: "월급, 나이, 가입기간을 입력하면 예상 수급액이 바로 나와요.",
  },
  {
    slug: "실업급여-최대금액",
    title: "실업급여 최대금액 1일 상한액 기준",
    description: "평균임금이 아무리 높아도 상한액이 정해져 있어요. 2026년 기준 최대 금액을 정리했어요.",
  },
  {
    slug: "실업급여-최소금액",
    title: "실업급여 최소금액 하한액 기준",
    description: "평균임금이 낮아도 하한액 이하로는 내려가지 않아요. 최소 수급액을 확인하세요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR} highlightSlugs={실업급여_HIGHLIGHT}
          currentSlug="실업급여-평균임금-계산"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 &middot; 고용보험 &middot; 평균임금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 평균임금, 어떻게 계산해?<br />
        퇴직 전 3개월 산정 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;실업급여 얼마 나오는지 알고 싶은데, 뭘 먼저 봐야 하죠?&rdquo;<br />
        평균임금이에요. <strong>퇴직 전 3개월 동안 받은 임금 총액</strong>을 총 일수로 나눈 게 1일 평균임금이고,
        이 숫자가 실업급여 금액의 출발점이에요.<br /><br />
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조</a>에서
        정한 공식이죠. 기본급만 들어가는 게 아니라 수당, 상여금까지 전부 포함되니까 꼼꼼히 따져봐야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 평균임금 계산 공식 */}
      <H2>퇴직 전 3개월 산정 기준은 어떤 공식일까?</H2>
      <p style={body}>
        공식은 간단해요. <strong>1일 평균임금 = 퇴직 전 3개월 임금 총액 / 3개월 총 일수</strong>. 여기서 &ldquo;3개월&rdquo;이란 급여일 기준이 아니에요. <strong>퇴직일 직전 3개월</strong>을 뜻하죠. 9월 15일에 퇴직했다면 6월 16일~9월 15일이 산정 기간이에요.
      </p>
      <p style={body}>
        많은 분이 헷갈리는 게 &ldquo;총 일수&rdquo;예요. 근무일만 세는 게 아니라 <strong>달력 일수</strong>로 나눠요. 주말, 공휴일 전부 포함이죠. 6월이 30일, 7월이 31일, 8월이 31일이면 총 92일로 나누는 거예요. 근무일(약 65일)로 착각하면 결과가 완전히 달라지니까 주의하세요.
      </p>
      <p style={body}>
        이 계산법의 법적 근거는 <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제2조</a>예요. <a href="/w/실업급여-한달-얼마-받나요" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여 월 수령액</a>뿐 아니라 퇴직금 산정에도 동일한 공식을 쓰죠. 한 번 익혀두면 두 군데서 활용할 수 있고요.
      </p>

      <GreenBox>
        1일 평균임금 = 퇴직 전 3개월 임금 총액 / 3개월 총 달력 일수<br /><br />
        예) 3개월 총액 900만원, 92일 &rarr; 1일 약 97,826원
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 확인됐네요. 아래 계산기에서 예상 수급액을 바로 계산해보세요."
        partialMatchText="일부만 확인됐어요. 급여명세서를 먼저 챙기고, 고용24에서 모의계산도 해보세요."
      />

      <Divider />

      {/* 섹션 2: 계산기 + 포함/제외 항목 */}
      <H2>3개월 총 급여로 1일 산정 기준 수급액은 얼마일까?</H2>
      <p style={body}>
        아래 계산기에 퇴직 전 3개월간 받은 총 급여(세전)를 넣어보세요. 기본급 + 고정수당 + 상여금을 전부 합산한 금액이에요. 출장비, 경조사비 같은 실비 정산 항목은 빼야 하고요. 세전 기준이라는 점도 꼭 기억하세요.
      </p>

      <Calculator
        title="평균임금 기반 실업급여 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 3개월 총 일수 90일 기준 간이 계산. 2026년 기준 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 퇴직월에 따라 총 일수가 달라질 수 있어요."
      />

      <BorderBox>
        <strong>포함</strong>: 기본급, 직책수당, 직무수당, 연장/야간/휴일수당, 상여금, 연차수당, 고정 식대, 고정 교통비, 가족수당<br /><br />
        <strong>제외</strong>: 퇴직금, 출장비(실비), 경조사비, 학자금 지원, 복리후생적 금품
      </BorderBox>

      <p style={body}>
        항목 구분이 애매할 때 기준은 딱 하나예요. <strong>&ldquo;근로의 대가로 정기적·일률적으로 지급되는가?&rdquo;</strong> 이게 맞으면 포함, 아니면 제외죠. 매달 고정으로 들어오는 식대는 포함이고, 출장 가서 실비로 정산받은 교통비는 제외예요. <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>에서도 동일한 기준으로 안내하고 있죠.
      </p>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 상여금과 연차수당 처리 */}
      <H2>상여금과 연차수당의 산정 기준 반영 방식</H2>
      <p style={body}>
        상여금은 <strong>퇴직 전 3개월 안에 실제로 받은 금액</strong>만 들어가요. 연 400만원 상여금을 분기마다 100만원씩 받는 구조라면, 3개월 구간에 100만원이 지급됐으면 100만원만 포함되죠. 그 구간 밖에서 지급된 상여금은 빠져요.
      </p>
      <p style={body}>
        이게 왜 중요하냐면, <strong>퇴직 시점에 따라 평균임금이 크게 달라질 수 있기 때문</strong>이에요. 분기 상여금을 받은 직후에 퇴직하면 평균임금이 뛰고, 상여금 지급 직전에 퇴직하면 빠지는 거죠. 퇴직 시점을 조절할 여유가 있다면 상여금 지급일을 반드시 따져보세요.
      </p>
      <p style={body}>
        연차수당도 같은 원리예요. 퇴직할 때 미사용 연차를 수당으로 정산받는 경우가 많은데, 이 금액이 3개월 기간 안에 지급되면 포함돼요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>상 평균임금 산정 원칙이 그렇게 정해져 있죠. 퇴직 전에 연차를 다 쓸지, 수당으로 받을지 판단할 때 이 부분을 고려해야 해요.
      </p>

      <SectionBadge>정확한 계산을 위한 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 실제 계산 예시 */}
      <H2>퇴직 전 3개월 기준 실제 계산 예시</H2>
      <p style={body}>
        숫자로 직접 해볼게요. 9월 15일에 퇴직한 직장인이에요. 월 기본급 300만원, 고정 식대 10만원이고, 7월에 분기 상여금 100만원을 받았어요. 산정 기간은 6월 16일~9월 15일, 총 92일이에요.
      </p>
      <p style={body}>
        3개월 임금을 합산해보면: 6월 후반(310만원 중 반달치 155만원) + 7월(기본급+식대+상여금 = 410만원) + 8월(기본급+식대 = 310만원) + 9월 전반(반달치 155만원). <strong>총액 약 1,030만원</strong>이 나오죠.
      </p>
      <p style={body}>
        1일 평균임금은 1,030만원 / 92일 = <strong>약 111,957원</strong>이에요. 여기에 60%를 곱하면 약 67,174원이 1일 실업급여가 되죠. 2026년 <a href="/w/실업급여-최대금액" style={{ color: "#1D9E75", textDecoration: "underline" }}>상한액</a>(68,100원)보다 낮으니까 67,174원이 그대로 적용돼요. 반대로 월급이 더 높아서 60%가 상한액을 넘겼다면 68,100원에서 잘리고요.
      </p>

      <GreenBox>
        3개월 임금 총액: 약 1,030만원<br />
        총 일수: 92일<br />
        1일 평균임금: 약 111,957원<br />
        1일 실업급여(60%): 약 67,174원
      </GreenBox>

      <Divider />

      {/* 섹션 5: 상한액/하한액 */}
      <H2>상한액과 하한액의 산정 기준도 꼭 챙기세요</H2>
      <p style={body}>
        평균임금의 60%를 계산했다고 끝이 아니에요. 여기에 <strong>상한액</strong>과 <strong>하한액</strong>이라는 두 개의 제한선이 걸려요. 2026년 기준 1일 상한액은 <strong>68,100원</strong>이에요. 연봉이 8천만원이든 1억이든 이 금액을 넘을 수 없죠.
      </p>
      <p style={body}>
        <a href="/w/실업급여-최소금액" style={{ color: "#1D9E75", textDecoration: "underline" }}>하한액</a>은 1일 <strong>66,048원</strong>이에요. 최저임금 수준으로 일했더라도 이 아래로는 내려가지 않아요. 상한과 하한 사이 차이가 약 2,000원밖에 안 되니까, 결국 대부분의 수급자가 비슷한 범위에서 받게 되는 구조예요. 차이를 만드는 건 수급일수죠.
      </p>
      <p style={body}>
        정확한 금액을 알고 싶다면 퇴직 전 3개월 <strong>급여명세서</strong>부터 확보하세요. 각 항목별 금액이 적혀 있으니까 직접 합산이 가능하죠. 퇴직 후에도 회사에 요청하면 발급해줘야 하고, <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a> 모의계산으로 미리 확인해볼 수도 있고요.
      </p>

      <BorderBox>
        1일 상한액: <strong>68,100원</strong> (월 약 204만원)<br />
        1일 하한액: <strong>66,048원</strong> (월 약 198만원)<br /><br />
        평균임금의 60%가 상한액 초과 &rarr; 68,100원 적용<br />
        평균임금의 60%가 하한액 미만 &rarr; 66,048원 적용
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        평균임금 계산에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 근로기준법을 바탕으로 작성됐어요. 실제 평균임금 산정은 개인별 임금 구성에 따라 달라지니, 정확한 금액은 고용센터(1350) 또는 고용24에서 확인하세요." />
    </ArticleLayout>
  );
}
