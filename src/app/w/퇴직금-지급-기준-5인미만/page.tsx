"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "퇴직금-지급-기준-5인미만";

const CHECK_ITEMS = [
  { id: "c1", label: "직원 4명 이하인 사업장에서 일해요" },
  { id: "c2", label: "1년 이상 근무했어요" },
  { id: "c3", label: "주 15시간 이상 근무했어요" },
  { id: "c4", label: "퇴직금이 있는지 사장님이 모른다고 해요" },
];

const CALC_SLIDERS = [
  {
    id: "salary",
    label: "월 평균급여",
    min: 200,
    max: 400,
    step: 10,
    defaultValue: 250,
    format: (v: number) => `${v}만원`,
  },
  {
    id: "years",
    label: "근속 기간",
    min: 1,
    max: 10,
    step: 1,
    defaultValue: 3,
    format: (v: number) => `${v}년`,
  },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금 (5인 미만도 동일)",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "근속 1년당",
    getValue: (v: Record<string, number>) => v.salary * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
];

const DOCS = [
  { name: "근로계약서 (근무 기간 확인)", required: true, where: "사장님 또는 직접 작성본" },
  { name: "급여명세서 또는 계좌 입금 내역", required: true, where: "본인 통장 또는 문자 기록" },
  { name: "근무 사실 증명 자료 (사진·메신저·출퇴근 기록)", required: false, where: "본인 보관" },
  { name: "IRP 계좌번호 (300만원 초과 시)", required: true, where: "은행·증권사 개설" },
];

const STEPS = [
  {
    title: "퇴직금 지급 의무 확인",
    desc: "5인 미만 사업장도 근로자퇴직급여보장법 적용 대상이에요. 1인 사업장이라도 1년 이상, 주 15시간 이상 근무한 근로자에게는 퇴직금을 줘야 해요. '직원이 적으니까 없다'는 말은 틀렸어요.",
    tip: "5인 미만이어도 퇴직금 지급 의무는 동일해요",
  },
  {
    title: "퇴직금 청구",
    desc: "사장님(사업주)에게 퇴직금 지급을 요청해요. 구두보다 문자나 카카오톡으로 남기는 게 좋아요. 거부하면 고용노동부에 진정을 낼 수 있어요.",
    tip: "청구 내용을 메시지로 남겨두면 증거가 돼요",
  },
  {
    title: "고용노동부 진정 신청",
    desc: "사업주가 거부하면 고용노동부 민원마당에서 온라인으로 진정을 낼 수 있어요. 근로감독관이 조사하고 지급 명령을 내려요. 불이행 시 형사 처벌 대상이에요.",
    tip: "고용노동부 민원마당(minwon.moel.go.kr) 24시간 신청 가능",
  },
  {
    title: "체당금 제도 활용 (사업주 지급 능력 없을 시)",
    desc: "사업주가 폐업하거나 지급 능력이 없으면 고용보험에서 체당금을 지급받을 수 있어요. 퇴직 전 1년분 임금과 퇴직금을 최대 3개월치까지 보전해줘요. 고용노동부에 체당금 신청을 해야 해요.",
    tip: "체당금은 법원 도산 판정 또는 행정 도산 확인 후 신청 가능",
  },
];

const CHECKLIST = [
  "5인 미만이어도 퇴직금 지급 의무 동일",
  "1년 이상 + 주 15시간 이상 = 퇴직금 발생",
  "청구 기록 — 문자·카카오톡으로 남기기",
  "거부 시 고용노동부 진정 신청",
  "사업주 폐업 시 체당금 제도 활용",
];

const FAQS = [
  {
    q: "직원이 2명인 작은 가게에서 일했는데 퇴직금을 받을 수 있나요?",
    a: "맞아요. 5인 미만이어도 1년 이상, 주 15시간 이상 근무했다면 퇴직금을 받을 수 있어요. 사업장 규모와 무관하게 적용돼요.",
  },
  {
    q: "5인 미만 사업장은 부당해고 보호가 안 된다는데, 퇴직금도 없나요?",
    a: "부당해고 구제(근로기준법 제23조)는 5인 미만에 적용 안 되지만, 퇴직금은 별개예요. 근로자퇴직급여보장법은 사업장 규모 관계없이 모두 적용해요.",
  },
  {
    q: "사장님이 퇴직금이 없다고 하면 어떻게 하나요?",
    a: "고용노동부에 진정을 내세요. 근로 사실만 증명되면 사업주가 퇴직금을 지급해야 해요. 통장 입금 기록, 메신저 기록, 근무 사진 등이 증거가 돼요.",
  },
  {
    q: "근로계약서가 없어도 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 계약서가 없더라도 실제 근무를 입증하면 돼요. 급여 입금 내역, 메신저 업무 지시 기록, 동료 증인도 증거가 돼요.",
  },
  {
    q: "사업주가 폐업했는데 퇴직금을 못 받았어요",
    a: "체당금 제도를 이용하세요. 고용노동부에 신청하면 퇴직 전 1년분 임금과 퇴직금 중 일부를 국가에서 대신 지급해줘요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      {
        label: "근로자퇴직급여보장법 제8조 — 퇴직금 지급 (사업장 규모 무관)",
        url: "https://www.law.go.kr/법령/근로자퇴직급여보장법",
      },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당 — 퇴직금 진정 신청", url: "https://minwon.moel.go.kr" },
      { label: "고용노동부 — 체당금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-기준", title: "퇴직금 지급 기준", description: "1년·주15시간 기준과 계산 방법." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 못 받았을 때", description: "고용노동부 진정 절차 안내." },
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "규모별 예외 없는 퇴직금 요건." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar items={퇴직금_SIDEBAR} currentSlug={currentSlug} />}
    >
      {/* 타이틀 */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ ...body.badge, marginBottom: 8 }}>퇴직금 · 5인미만 · 지급의무</p>
        <h1 style={body.h1}>
          직원 4명 이하 사업장, 퇴직금을 줘야 하나요?
          <br />
          <span style={body.h1sub}>5인 미만도 퇴직금 의무 — 청구 방법까지</span>
        </h1>
      </div>

      {/* 인트로 */}
      <p style={body.prose}>
        "직원이 몇 명 안 되는 작은 가게니까 퇴직금이 없다"는 말, 들어본 적 있죠? 틀린 말이에요.{" "}
        <a
          href="https://www.law.go.kr/법령/근로자퇴직급여보장법"
          style={body.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          근로자퇴직급여보장법
        </a>
        은 사업장 규모를 따지지 않아요. 직원 1명짜리 가게도, 가족 중심으로 운영하는 소규모 사업장도 모두 적용돼요.
      </p>
      <p style={body.prose}>
        많은 사업주가 모르거나, 알아도 거부하는 경우가 있어요. 1년 이상 주 15시간 이상 일했다면 퇴직금을 받을 권리가 생겨요.
        사장님이 안 준다고 하면 고용노동부에 진정을 내는 방법이 있고, 사업주가 폐업했어도 체당금 제도로 일부 받을 수 있어요.
        아래에서 청구 방법까지 순서대로 알려드릴게요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      {/* 섹션 1: 5인 미만도 퇴직금 의무 */}
      <H2>5인 미만 사업장도 퇴직금을 줘야 하나요?</H2>

      <p style={body.prose}>
        줘야 해요.{" "}
        <a href="/w/퇴직금-조건" style={body.link}>
          퇴직금 지급 기준
        </a>
        은 근로자퇴직급여보장법 제8조에 있어요. 법 어디에도 "5인 이상이어야 한다"는 조건이 없어요.
        1년 이상 계속 근무하고 주 평균 15시간 이상 일한 근로자라면, 사업장 규모에 상관없이 퇴직금을 받을 수 있어요.
      </p>

      <GreenBox>
        근로자퇴직급여보장법 제8조 핵심
        <br />
        · 적용 대상: 사업장 규모 무관 (1인 사업장 포함)
        <br />
        · 지급 조건: 1년 이상 계속 근무 + 주 평균 15시간 이상
        <br />
        · 지급 기한: 퇴직 후 14일 이내 (지연 시 연 20% 이자)
      </GreenBox>

      <p style={body.prose}>
        5인 미만 사업장에 적용되지 않는 규정은 따로 있어요. 부당해고 구제(근로기준법 제23조), 연장근로 가산임금(일부 조항) 등은
        5인 이상부터 적용돼요. 퇴직금은 그 예외 목록에 없어요. 사업주가 "우리는 5인 미만이라 퇴직금이 없다"고 하면,
        법을 잘못 알고 있는 거예요.
      </p>

      <p style={body.prose}>
        단기 아르바이트나 초단시간 근로자는 예외예요. 주 15시간 미만으로 일하거나 1년을 못 채우고 나가면 퇴직금이 발생하지 않아요.
        내 상황이 기준에 해당하는지 아래에서 먼저 확인해보세요.
      </p>

      <EligibilityChecker title="퇴직금 발생 요건 해당 여부 확인" items={CHECK_ITEMS} />

      <Divider />

      {/* 섹션 2: 계산기 */}
      <H2>내 퇴직금 예상액 계산해보세요</H2>

      <p style={body.prose}>
        퇴직금 계산 공식은 "30일분 평균임금 × 근속연수"예요. 5인 미만이어도 공식은 똑같아요.
        월 평균급여와 근속 기간을 입력하면 대략적인 금액이 나와요.
        정확한 평균임금은 퇴직 전 3개월치 급여를 합산한 뒤 90일로 나눠요.
      </p>

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 실제 퇴직금은 퇴직 전 3개월 평균임금 기준. 상여금·연장수당 포함 여부에 따라 달라질 수 있어요."
      />

      <p style={body.prose}>
        계산기 결과가 예상보다 낮게 나왔다면 상여금이나 연장수당이 빠진 경우일 수 있어요.
        평균임금에는 정기 상여금도 포함돼요. 사업주가 계산한 금액과 차이가 크면 고용노동부에 문의하거나,
        임금 명세서를 기준으로 직접 계산해볼 수 있어요.
      </p>

      <CategoryButton href="/w/퇴직금" label="퇴직금 가이드 전체 보기" />

      <RelatedArticles articles={RELATED} />

      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 서류 */}
      <H2>퇴직금 청구에 필요한 서류</H2>

      <p style={body.prose}>
        5인 미만 사업장은 규모가 작아서 근로계약서도 없는 경우가 많아요. 계약서가 없어도 괜찮아요.
        실제로 근무했다는 사실을 입증할 수 있으면 퇴직금을 청구할 수 있어요.
        통장 급여 입금 내역이 가장 강력한 증거예요.
      </p>

      <DocTable docs={DOCS} />

      <p style={body.prose}>
        IRP 계좌는 퇴직금이 300만원을 초과할 때 필요해요. 300만원 이하는 일반 통장으로도 받을 수 있어요.
        IRP 계좌가 없으면 은행이나 증권사에서 미리 만들어두는 게 좋아요.
        계좌 개설에 수수료는 없고 보통 당일 개설이 가능해요.
      </p>

      <p style={body.prose}>
        메신저 기록도 증거가 돼요. 카카오톡으로 업무 지시를 받았거나, 출퇴근 시간이 찍힌 사진이 있으면
        근무 사실을 뒷받침할 수 있어요. 분쟁이 생겼을 때를 대비해 지금 보관하고 있는 자료를 미리 정리해두세요.
      </p>

      <Divider />

      {/* 섹션 4: 청구 절차 */}
      <H2>5인 미만 퇴직금 청구 절차 4단계</H2>

      <p style={body.prose}>
        사업주가 퇴직금을 주지 않을 때 쓸 수 있는 방법이 있어요. 혼자 해결하려다 포기하는 분이 많은데,
        고용노동부 진정은 무료고 절차도 어렵지 않아요. 아래 순서대로 따라가면 돼요.
      </p>

      <Steps steps={STEPS} />

      <p style={body.prose}>
        진정을 내면 근로감독관이 사업주에게 연락해서 사실관계를 확인해요.
        사업주가 지급을 거부하면 형사 처벌(3년 이하 징역 또는 3천만원 이하 벌금)까지 갈 수 있어요.
        대부분은 진정 단계에서 해결돼요.
      </p>

      <Divider />

      {/* 섹션 5: 체크리스트 */}
      <H2>체크리스트</H2>

      <p style={body.prose}>
        퇴직 전후로 챙겨야 할 것들을 정리했어요. 순서대로 확인하면 퇴직금을 빠짐없이 받을 수 있어요.
        특히 청구 기록을 남기는 게 중요해요. 나중에 분쟁이 생겼을 때 증거가 돼요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox>
        폐업한 사업주라면 체당금으로 일부 회수 가능해요.
        <br />
        고용노동부에 체당금 신청 → 퇴직 전 1년분 임금 + 퇴직금 최대 3개월치 지급.
        <br />
        신청 창구:{" "}
        <a
          href="https://www.moel.go.kr"
          style={{ color: "#1D9E75" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          고용노동부 공식 사이트
        </a>
      </GreenBox>

      <p style={body.prose}>
        체당금은 국가가 사업주 대신 임금과 퇴직금을 지급하는 제도예요. 전부 받을 수는 없지만,
        법원 도산 판정이나 고용노동부 도산 확인이 있으면 신청할 수 있어요.
        사업주 연락이 두절되거나 폐업 사실이 확인됐을 때 고용노동부에 먼저 문의해보세요.
      </p>

      <Divider />

      {/* 섹션 6: FAQ */}
      <H2>자주 묻는 것들</H2>

      <FAQ items={FAQS} />

      <References items={REFERENCES} />

      <Disclaimer />
    </ArticleLayout>
  );
}
