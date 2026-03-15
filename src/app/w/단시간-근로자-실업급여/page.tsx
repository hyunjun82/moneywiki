"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "주 15시간 미만(초단시간)으로 일하고 있어요" },
  { id: "c2", label: "같은 사업장에서 3개월 이상 계속 근무했어요" },
  { id: "c3", label: "퇴직 전 24개월 내 피보험기간 180일 이상이에요" },
  { id: "c4", label: "비자발적 퇴사(계약만료, 해고 등)예요" },
];

const CALC_SLIDERS = [
  { id: "days", label: "주당 근무일수", min: 2, max: 5, step: 1, defaultValue: 3, format: (v: number) => `주 ${v}일` },
  { id: "months", label: "총 근무기간", min: 4, max: 36, step: 1, defaultValue: 18, format: (v: number) => `${v}개월` },
  { id: "salary", label: "월 급여", min: 30, max: 300, step: 10, defaultValue: 120, format: (v: number) => `${v}만원` },
];

const CALC_RESULTS = [
  {
    label: "피보험기간 (추정)",
    getValue: (v: Record<string, number>) => Math.round(v.days * 4.3 * v.months),
    format: (v: number) => `약 ${v}일 ${v >= 180 ? "(180일 충족)" : "(180일 미달)"}`,
  },
  {
    label: "1일 수급액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.round((v.salary * 10000 * 0.6) / 30);
      return Math.max(66048, Math.min(68100, daily));
    },
    format: (v: number) => `${v.toLocaleString()}원 (하한액 적용 가능)`,
  },
  {
    label: "월 수급액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.max(66048, Math.min(68100, Math.round((v.salary * 10000 * 0.6) / 30)));
      return daily * 30;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "고용24(ei.go.kr)에서 고용보험 가입 여부 확인",
  "미가입 시 근로복지공단(1588-0075)에 피보험자격 확인청구",
  "근로계약서, 급여명세서, 통장 입금내역 등 증빙자료 확보",
  "퇴직 사유가 비자발적인지 이직확인서 확인",
  "여러 직장이면 피보험기간 합산 여부 체크",
];

const FAQS = [
  {
    q: "주 10시간만 일했는데 실업급여를 받을 수 있나요?",
    a: "3개월 이상 계속 일했으면 받을 수 있죠. 고용보험 의무가입 대상이에요. 사업주가 신고 안 했으면 소급 가입 청구를 하면 돼요.",
  },
  {
    q: "주 15시간 미만이면 고용보험 안 되는 거 아닌가요?",
    a: "아니에요. 3개월 이상 계속 근무하면 15시간 미만이어도 고용보험 의무가입 대상이에요. 고용보험법에 명시되어 있죠.",
  },
  {
    q: "두 군데서 일하면 시간이 합산되나요?",
    a: "동시에 일하는 경우 합산돼요. A편의점 주 10시간, B카페 주 8시간이면 합쳐서 주 18시간이에요. 각각 고용보험 가입 대상이 되고 피보험기간도 각각 쌓이죠.",
  },
  {
    q: "사업주가 고용보험 안 넣어줬는데 어떡해요?",
    a: "근로복지공단(1588-0075)에 피보험자격 확인청구를 하면 돼요. 근로계약서, 통장 입금내역 등 증빙만 있으면 소급 가입이 가능해요. 보험료는 사업주가 부담하죠.",
  },
  {
    q: "단시간 근로자는 실업급여 금액이 적나요?",
    a: "하한액이 보장돼요. 2026년 기준 1일 66,048원, 월 약 198만원이에요. 월급 150만원 이하면 거의 하한액을 받게 되는데, 월급보다 실업급여가 더 많을 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제10조 — 적용 제외 근로자 (초단시간 예외)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제50조 — 구직급여 수급 요건", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 안내", url: "https://www.ei.go.kr" },
      { label: "근로복지공단 — 피보험자격 확인청구", url: "https://www.comwel.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-모의계산",
    title: "실업급여 모의계산 월급별 예상 금액",
    description: "월급, 나이, 가입기간을 넣으면 바로 예상 수령액이 나와요. 2026년 상한·하한액 적용 계산기를 제공하죠.",
  },
  {
    slug: "실업급여-피보험기간",
    title: "실업급여 피보험기간 180일 기준과 합산",
    description: "피보험기간 계산법과 여러 직장 합산 방법을 정리했어요. 180일 채우는 게 핵심이에요.",
  },
  {
    slug: "일용직-실업급여",
    title: "일용직 실업급여 가입 조건과 수급",
    description: "일용직도 고용보험 가입 대상이에요. 월 근로일수 10일 이상이면 피보험기간으로 인정돼요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR}
          currentSlug="단시간-근로자-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 단시간근로자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        단시간 근로자도 실업급여 받을까?<br />
        주 15시간 기준과 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "편의점에서 주 12시간씩 일했는데, 실업급여 못 받는다고 들었어요."<br />
        아니에요. 받을 수 있죠.<br /><br />
        주 15시간 미만 초단시간 근로자라도 <strong>3개월 이상 계속 일했으면</strong> 고용보험 가입 대상이에요.<br />
        핵심은 "얼마나 짧게 일했나"가 아니라 "얼마나 오래 일했나"예요.
      </p>

      <Divider />

      {/* 섹션 1 — 단시간/초단시간 차이 */}
      <H2>단시간 근로자랑 초단시간 근로자, 뭐가 다른가요?</H2>
      <p style={body}>
        고용보험법 제10조에서 정한 구분이에요. <strong>단시간 근로자</strong>는 풀타임보다 짧게 일하는 사람 전체를 말하고, 그중에서 <strong>주 15시간 미만</strong>으로 일하는 사람을 <strong>초단시간 근로자</strong>라고 불러요. 편의점 주말 알바, 카페 주 2~3일 근무가 여기에 해당하죠.
      </p>
      <p style={body}>
        초단시간 근로자는 원래 고용보험 가입에서 제외되는데, 중요한 예외가 있어요. <strong>3개월 이상 계속 근무</strong>하면 고용보험 의무가입 대상이 되는 거예요. 이 3개월 기준이 핵심이에요. 같은 사업장에서 중단 없이 3개월 넘게 일했으면, 주 8시간이든 10시간이든 상관없이 고용보험에 들어가야 하죠.
      </p>
      <p style={body}>
        문제는 사업주가 이 규정을 모르거나 알면서도 신고를 안 하는 경우가 많다는 거예요. 편의점이나 카페 같은 작은 사업장에서 특히 그래요. 3개월 넘게 일했는데 고용보험 가입이 안 되어 있다면, 고용24(ei.go.kr)에서 피보험자격 이력을 조회해보세요.
      </p>

      <GreenBox title="이것만 기억해요">
        주 15시간 이상 → 바로 고용보험 가입<br />
        주 15시간 미만 → <strong>3개월 이상 계속 근무</strong>하면 가입<br />
        사업주가 안 넣어줬으면 소급 가입 청구 가능
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 실업급여 수급 자격을 갖췄어요. 고용센터에서 바로 신청하세요."
        partialMatchText="일부만 해당돼요. 나머지 조건도 확인하고 고용센터(1350)에 상담해보세요."
      />

      <Divider />

      {/* 섹션 2 — 피보험기간 계산 */}
      <H2>피보험기간은 어떻게 계산하나요?</H2>
      <p style={body}>
        단시간 근로자는 피보험기간 계산이 풀타임과 달라요. <strong>실제 근무일수</strong>만 세요. 풀타임은 한 달을 통째로 잡지만, 단시간 근로자는 실제로 일한 날만 피보험기간으로 인정돼요. 주 3일 근무라면 한 달에 12~13일만 쌓이는 거죠.
      </p>
      <p style={body}>
        실업급여를 받으려면 퇴직 전 <strong>24개월 내 피보험기간 180일 이상</strong>이 필요해요. 일반 근로자는 18개월인데, 단시간 근로자는 24개월로 기간이 늘어나요. 근무일수가 적으니까 기간을 더 길게 봐주는 거예요. 주 3일 근무로 180일을 채우려면 약 1년 반 정도 일해야 하죠.
      </p>
      <p style={body}>
        여러 직장의 피보험기간은 합산돼요. A편의점에서 108일, B카페에서 156일이면 합쳐서 264일이에요. 다만 두 직장 모두 고용보험 가입이 되어 있어야 하죠. 한 곳만 가입되어 있으면 그 직장 피보험기간만 인정돼요.
      </p>

      <SectionBadge>내 피보험기간 계산해보세요</SectionBadge>
      <Calculator
        title="단시간 근로자 피보험기간·수급액 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 추정치예요. 실제 피보험기간은 고용24에서 정확하게 확인하세요. 2026년 하한액 66,048원 적용."
      />

      <p style={body}>
        계산기에서 근무일수와 기간을 바꿔보세요. 주 2일이면 180일 채우는 데 2년 넘게 걸리는 게 보일 거예요. 가능하면 주 3일 이상 일하는 게 피보험기간 채우기에 유리하죠.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* 섹션 3 — 금액 계산 */}
      <H2>실업급여 금액은 얼마나 나올까요?</H2>
      <p style={body}>
        계산 방식은 풀타임과 똑같아요. 퇴직 전 3개월 평균임금의 60%예요. 다만 일하는 시간이 짧으니까 평균임금 자체가 낮을 수밖에 없죠. 주 3일, 하루 4시간 일해서 한 달 80만원 받았다면 하루 평균임금은 26,667원이고, 60%는 16,000원이에요.
      </p>
      <p style={body}>
        근데 걱정 안 해도 돼요. <strong>하한액</strong>이 보장되니까요. 2026년 기준 1일 <strong>66,048원</strong>은 최소한 나와요. 계산상 16,000원이어도 실제로는 66,048원을 받는 거예요. 월로 치면 약 198만원이에요. 단시간 근로자는 대부분 하한액으로 받게 되죠.
      </p>
      <p style={body}>
        흥미로운 점이 있어요. 월급 80만원 받던 사람이 실업급여로 월 198만원을 받게 되는 거예요. 월급보다 실업급여가 더 많은 상황이 생기죠. 이게 가능한 이유는 하한액이 최저임금의 80% × 8시간 기준으로 정해지기 때문이에요. 단시간 근로자에게는 오히려 유리한 구조예요.
      </p>

      <BorderBox title="단시간 근로자 금액 요약 (2026년 기준)">
        1일 하한액: 66,048원 (대부분 이 금액을 받게 돼요)<br />
        1일 상한액: 68,100원 (월급 340만원 이상일 때)<br />
        월 수령액: 약 198~204만원 사이<br />
        수급기간: 120~270일 (피보험기간·나이에 따라)
      </BorderBox>

      <Divider />

      {/* 섹션 4 — 사업주 미신고 시 소급 가입 */}
      <H2>고용보험 가입이 안 되어 있다면? 소급 가입 방법</H2>
      <p style={body}>
        3개월 넘게 일했는데 고용보험 가입이 안 되어 있을 수 있어요. 사업주가 신고를 안 한 거예요. 이럴 때는 <strong>피보험자격 확인청구</strong>를 하면 돼요. 근로복지공단(1588-0075)에 전화해서 "고용보험 가입 안 되어 있는데 소급 가입하고 싶다"고 하면 됩니다.
      </p>
      <p style={body}>
        필요한 증빙자료는 근로계약서, 급여명세서, 통장 입금내역이에요. 근로계약서가 없어도 괜찮아요. 매달 같은 날짜에 같은 금액이 입금된 통장 내역만 있어도 근로관계를 인정해주죠. 문자메시지, 카톡 대화내용, 출퇴근 사진도 증빙이 될 수 있어요.
      </p>
      <p style={body}>
        소급 가입 시 보험료는 <strong>사업주가 전액 부담</strong>해요. 신고를 안 한 게 사업주 잘못이니까요. 사업주가 거부해도 근로복지공단이 직권으로 처리하니까 사업주 동의 없이도 가능하죠. 보험료뿐 아니라 연체료까지 사업주가 내야 해요.
      </p>

      <SectionBadge>소급 가입 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 5 — 비자발적 퇴사 기준 */}
      <H2>어떤 퇴직 사유가 인정되나요?</H2>
      <p style={body}>
        다른 실업급여와 마찬가지로 <strong>비자발적 퇴사</strong>여야 해요. 계약기간 만료, 해고, 권고사직, 근로조건 변경 거부가 해당돼요. "그냥 그만두고 싶어서" 그만두면 자발적 퇴사라서 실업급여를 못 받죠.
      </p>
      <p style={body}>
        단시간 근로자에게 가장 많은 경우는 <strong>계약기간 만료</strong>예요. 3개월 계약으로 일하다가 재계약이 안 됐으면 비자발적 퇴사로 인정돼요. 반대로 사업주가 "다음 계약 할래?" 했는데 본인이 거절했으면 자발적이에요.
      </p>
      <p style={body}>
        자발적 퇴사여도 <strong>정당한 사유</strong>가 있으면 인정받을 수 있어요. 임금체불(3개월 이상 미지급), 직장 내 괴롭힘, 출퇴근 거리 왕복 3시간 초과 같은 경우예요. 증빙자료를 확보해두면 고용센터 심사에서 유리해요.
      </p>

      <BorderBox title="사업주가 3개월 전에 그만두라고 압박한다면?">
        고용보험료를 안 내려고 3개월 채우기 전에 퇴직을 강요하는 건 불법이에요.<br />
        이건 부당해고에 해당하고, 노동청에 신고할 수 있어요.<br />
        이미 3개월 가까이 일했다면 피보험자격 확인청구로 소급 가입이 가능하죠.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        단시간 근로자 실업급여 관련해서 실제로 많이 물어보시는 것만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 2026년 하반기 소득 기준 전환이 예정되어 있으니, 최신 기준은 고용24(ei.go.kr)나 고용센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
