"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 마이너스 통장을 이미 쓰고 있거나 개설하려는데, 이자 부담과 신용 영향이 걱정되는 상황이에요.
// Q2. 사용률 80% 이하로 관리하고, 매달 상환 계획을 세워 이자 비용을 줄이는 행동.
// Q3. 이자 계산법(일할 계산), 사용률과 신용점수 관계, 한도 자동축소 규정, 신용대출과 차이.
// Q4. GreenBox(핵심 요약) + Calculator(이자 계산) + Checklist(관리 체크) + BorderBox(사용률 기준) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, Checklist,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CALC_SLIDERS = [
  { id: "amount", label: "사용 금액", min: 100, max: 5000, step: 100, defaultValue: 500, format: (v: number) => `${v}만원` },
  { id: "rate", label: "연 이자율", min: 3, max: 10, step: 0.1, defaultValue: 5.2, format: (v: number) => `${v}%` },
  { id: "days", label: "사용 일수", min: 1, max: 365, step: 1, defaultValue: 30, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "예상 이자",
    getValue: (inputs: Record<string, number>) =>
      Math.round((inputs.amount * 10000 * (inputs.rate / 100) / 365) * inputs.days),
    format: (v: number) => `${v.toLocaleString()}원`,
    highlight: true,
  },
  {
    label: "1일 이자",
    getValue: (inputs: Record<string, number>) =>
      Math.round((inputs.amount * 10000 * (inputs.rate / 100)) / 365),
    format: (v: number) => `${v.toLocaleString()}원`,
  },
];

const MANAGE_CHECKLIST = [
  "사용률을 한도의 80% 이하로 유지하고 있나요?",
  "매달 급여일에 자동이체로 일부 상환 중인가요?",
  "여윳돈이 생기면 바로 마이너스 통장에 넣고 있나요?",
  "3개월 이상 미사용 시 한도 축소 가능성을 알고 있나요?",
  "다른 대출과 합산 DSR을 확인했나요?",
];

const FAQS = [
  { q: "한도만 만들어두고 안 쓰면 이자가 나오나요?", a: "아니요, 안 써요. 실제로 출금한 금액에 대해서만 이자가 붙어요. 한도를 가지고만 있으면 비용이 전혀 없어요." },
  { q: "사용률이 높으면 신용점수가 떨어지나요?", a: "네, 한도 대비 사용률이 80% 이상이면 금융사가 자금 압박 상태로 판단해요. 신용점수 하락과 한도 축소로 이어질 수 있어요." },
  { q: "마이너스 통장 한도가 자동으로 줄어들 수 있나요?", a: "가능해요. 개설 후 3개월부터 약정금액의 50% 이상을 안 쓰면 매월 10%씩, 최대 50%까지 자동 축소될 수 있어요." },
  { q: "마이너스 통장과 신용대출, 어떤 게 유리해요?", a: "단기(3개월 이내)는 마이너스 통장이 유리해요. 장기(6개월 이상)는 신용대출 금리가 더 낮아서 총이자가 적어요." },
  { q: "급여 통장으로 마이너스 통장을 쓸 수 있나요?", a: "네, 급여가 입금되면 자동으로 마이너스 잔액이 줄어들어요. 관리가 편해서 급여 통장과 연결하는 걸 추천해요." },
  { q: "마이너스 통장 이자가 복리로 붙나요?", a: "네, 미상환 이자가 원금에 합산돼서 그 금액에 다시 이자가 붙어요. 장기간 상환 안 하면 이자 부담이 빠르게 커져요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 금융상품 비교(금리 확인)", url: "https://finlife.fss.or.kr" },
      { label: "KB의 생각 — 마이너스 통장 이해", url: "https://kbthink.com" },
    ],
  },
];

const RELATED = [
  { slug: "대출계약-철회-기간-조건", title: "대출 계약 14일 이내 철회", description: "대출 후 마음이 바뀌었다면 위약금 없이 취소할 수 있어요." },
  { slug: "신용등급-조회-방법", title: "신용등급 조회 방법", description: "무료로 내 신용점수를 확인하는 3가지 방법이에요." },
  { slug: "대출-사기-주의사항", title: "대출 사기 유형과 예방법", description: "보이스피싱·불법대부업 피해를 막는 체크리스트예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 대출 · 신용관리</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        마이너스 통장, 이자 얼마나 나올까?<br />
        관리법부터 신용 영향까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        마이너스 통장은 쓴 만큼만 이자가 나오니까 부담 없다고 생각하기 쉽죠?
        사용률 관리를 못 하면 신용점수가 떨어지고 한도까지 줄어들 수 있어요.
        이자 계산법, 관리 핵심 포인트를 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      {/* ── 섹션 1: 이자 계산 ── */}
      <H2>이자가 얼마나 나오나요?</H2>
      <p style={body}>
        마이너스 통장 이자는 &lsquo;사용 금액 x 연이자율 / 365 x 사용일수&rsquo;로 매일 계산돼요.
        2026년 기준 시중은행 평균 금리는 연 5.0~5.5% 수준이에요.
        카카오뱅크·토스뱅크 같은 인터넷은행은 0.2~0.5%p 정도 낮은 편이고요.
      </p>

      <SectionBadge>이자 계산기</SectionBadge>
      <Calculator
        title="마이너스 통장 이자 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="실제 이자는 매일 마감잔액 기준으로 계산돼요. 복리 효과는 별도로 반영되지 않은 단순 계산이에요."
      />

      <p style={body}>
        500만원을 연 5.2%로 30일 쓰면 이자가 약 2만 1천원이에요.
        같은 금액을 1년 내내 쓰면 26만원 넘게 나오죠.
        빨리 갚을수록 이자가 확 줄어드니 여윳돈이 생기면 바로 넣으세요.
      </p>

      <RelatedArticles items={RELATED} />
      <Divider />

      {/* ── 섹션 2: 사용률과 신용 ── */}
      <H2>사용률이 높으면 왜 위험한가요?</H2>
      <p style={body}>
        한도 대비 사용 비율이 80%를 넘으면 금융회사가 &lsquo;이 사람 자금 사정이 나쁘구나&rsquo; 하고 판단해요.
        신용점수가 내려가고, 다른 대출 심사에서도 불이익을 받을 수 있어요.
      </p>

      <BorderBox>
        <b>사용률 80% 이상</b>: 신용점수 하락 위험. 추가 대출 거절 가능성↑<br />
        <b>사용률 50~80%</b>: 관리 가능 구간. 점진적 상환 권장<br />
        <b>사용률 50% 이하</b>: 안전 구간. 급한 돈 대비 용도로 적절
      </BorderBox>

      <p style={body}>
        한도가 1,000만원이면 500만원 이하로 유지하는 게 좋아요.
        월급 받으면 먼저 마이너스 통장부터 갚고, 남은 돈으로 생활하는 습관이 이자 절약의 핵심이에요.
      </p>

      <Divider />

      {/* ── 섹션 3: 한도 관리 ── */}
      <H2>한도가 자동으로 줄어들 수 있나요?</H2>
      <p style={body}>
        개설 후 3개월이 지나면 은행이 사용 패턴을 봐요.
        약정금액의 50% 이상을 안 쓰면 매월 10%씩, 최대 50%까지 한도를 자동 축소할 수 있어요.
        반대로 신용점수가 올랐다면 한도 증액 재심사를 받을 수 있고요.
      </p>

      <GreenBox title="관리 핵심 3줄 요약">
        사용률 80% 이하 유지 → 신용점수 보호<br />
        매달 급여일에 자동이체 상환 설정<br />
        여윳돈 생기면 마이너스 통장에 먼저 입금
      </GreenBox>

      <SectionBadge>관리 체크리스트</SectionBadge>
      <Checklist items={MANAGE_CHECKLIST} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 시중은행 마이너스 통장 상품 정보를 바탕으로 작성됐어요. 은행별 금리·조건이 다르니 가입 전 금융상품한눈에(finlife.fss.or.kr)에서 비교하세요." />
    </ArticleLayout>
  );
}
