"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

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
      { label: "고용보험법 제10조: 적용 제외 근로자 (초단시간 예외)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제50조: 구직급여 수급 요건", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 안내", url: "https://www.ei.go.kr" },
      { label: "근로복지공단: 피보험자격 확인청구", url: "https://www.comwel.or.kr" },
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
          items={실업급여_SIDEBAR} highlightSlugs={실업급여_HIGHLIGHT}
          currentSlug="단시간-근로자-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 단시간근로자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        단시간 근로자 실업급여,<br />
        주 15시간 기준과 수급 자격
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;주 12시간밖에 안 일했는데 실업급여가 되나요?&rdquo;
      </p>
      <p style={body}>
        돼요. 주 15시간 미만이라도 <strong>3개월 이상 계속 일했으면</strong> 고용보험 가입 대상이에요. 핵심은 &ldquo;얼마나 짧게 일했느냐&rdquo;가 아니라 &ldquo;얼마나 오래 일했느냐&rdquo;예요. 편의점, 카페, 학원: 어디서 일했든 조건만 맞으면 실업급여를 받을 수 있죠.
      </p>
      <p style={body}>
        주 15시간 기준이 왜 중요한지, 피보험기간은 어떻게 세는지, 하한액 보장은 뭔지까지 한 번에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 단시간/초단시간 차이 */}
      <H2>주 15시간 기준으로 수급 자격이 달라지나요?</H2>
      <p style={body}>
        네, 달라져요. 주 15시간을 기준으로 고용보험 가입 방식이 나뉘거든요. 주 15시간 이상이면 고용보험에 바로 가입돼요. 풀타임이든 파트타임이든 상관없이요. 여기까지는 간단하죠.
      </p>
      <p style={body}>
        복잡해지는 건 <strong>주 15시간 미만</strong>(초단시간 근로자)부터예요. 원칙상 고용보험 적용 제외인데, <strong>3개월 이상 계속 일하면</strong> 의무가입 대상이 돼요. 고용보험법 제10조가 정한 예외 조항이에요. 같은 사업장에서 중단 없이 3개월을 넘겼으면 주 8시간이든 12시간이든 가입해야 하죠.
      </p>
      <p style={body}>
        현실에서는 사업주가 이 규정을 모르거나 알아도 무시하는 경우가 많아요. 특히 편의점, 카페 같은 소규모 사업장에서 그래요. 3개월 넘게 일했는데 고용보험이 안 되어 있다면 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 피보험자격 이력부터 조회해보세요. 가입이 안 되어 있으면 소급 가입 청구를 하면 돼요.
      </p>

      <GreenBox>
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

      {/* 섹션 2: 피보험기간 계산 */}
      <H2>수급 자격에 필요한 피보험기간은 어떻게 세나요?</H2>
      <p style={body}>
        풀타임 근로자는 한 달을 통째로 피보험기간으로 잡아요. 단시간 근로자는 다르죠. <strong>실제로 일한 날수</strong>만 세요. 주 3일 근무라면 한 달에 12~13일만 쌓여요. 그래서 같은 기간 일해도 풀타임보다 피보험기간이 짧게 나오는 거예요.
      </p>
      <p style={body}>
        실업급여 수급에 필요한 기준은 퇴직 전 <strong>24개월 이내 피보험기간 180일 이상</strong>이에요. 일반 근로자는 18개월인데, 단시간 근로자는 24개월로 기준 기간을 더 넉넉하게 잡아줘요. 주 3일 근무로 180일을 채우려면 약 1년 반 정도 걸리니까, 이 점을 미리 계산해두면 좋죠.
      </p>
      <p style={body}>
        여러 직장의 피보험기간은 합산돼요. A편의점에서 108일, B카페에서 72일: 합치면 180일이 되는 거예요. 단, 두 곳 모두 고용보험에 가입돼 있어야 해요. 한 곳이라도 미가입이면 그 기간은 합산에 포함되지 않으니까, 각 직장별로 가입 여부를 따로 살펴보세요. <a href="/w/실업급여-피보험기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>피보험기간 합산 방법</a>을 참고하면 좋죠.
      </p>

      <SectionBadge>내 피보험기간 계산해보세요</SectionBadge>
      <Calculator
        title="단시간 근로자 피보험기간·수급액 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 추정치예요. 실제 피보험기간은 고용24에서 정확하게 확인하세요. 2026년 하한액 66,048원 적용."
      />

      <p style={body}>
        위 계산기에서 근무일수를 바꿔보세요. 주 2일이면 180일 채우는 데 2년이 넘게 걸리는 게 바로 보일 거예요. 피보험기간을 빠르게 쌓으려면 주 3일 이상 근무하는 게 유리하죠.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 금액 계산 */}
      <H2>주 15시간 미만 수급 금액과 하한액 보장</H2>
      <p style={body}>
        계산 공식 자체는 풀타임과 같아요. 퇴직 전 3개월 평균임금의 60%죠. 단시간 근로자는 일하는 시간이 짧으니까 평균임금이 낮게 잡혀요. 주 3일, 하루 4시간 일해서 월 80만원을 받았다면 1일 평균임금이 26,667원이고, 60%를 적용하면 16,000원이에요.
      </p>
      <p style={body}>
        그런데 여기서 <strong>하한액</strong>이 작동해요. 2026년 기준 1일 <strong>66,048원</strong>이 최소 보장 금액이에요. 계산상 16,000원이 나와도 실제로는 66,048원을 받는 거예요. 월로 치면 약 198만원이죠. 단시간 근로자는 거의 대부분 이 하한액 적용을 받아요.
      </p>
      <p style={body}>
        재미있는 구조예요. 월급 80만원이던 사람이 실업급여로 월 198만원을 받는 셈이니까요. <a href="/w/실업급여-계산기" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여 계산기</a>에서 본인 조건으로 직접 뽑아보면 감이 올 거예요. 하한액이 최저임금의 80% x 8시간 기준으로 정해지기 때문에 이런 역전이 생기는 거예요. 단시간 근로자 입장에서는 실업급여를 놓치면 오히려 더 큰 손해가 되는 구조죠.
      </p>

      <BorderBox>
        1일 하한액: 66,048원 (대부분 이 금액을 받게 돼요)<br />
        1일 상한액: 68,100원 (월급 340만원 이상일 때)<br />
        월 수령액: 약 198~204만원 사이<br />
        수급기간: 120~270일 (피보험기간·나이에 따라)
      </BorderBox>

      <Divider />

      {/* 섹션 4: 사업주 미신고 시 소급 가입 */}
      <H2>고용보험 미가입 시 수급 자격 확보 방법</H2>
      <p style={body}>
        3개월 넘게 일했는데 고용보험이 안 되어 있다면, 사업주가 신고를 안 한 거예요. 이럴 때 쓰는 제도가 <strong>피보험자격 확인청구</strong>예요. 근로복지공단(1588-0075)에 전화해서 소급 가입을 신청하면 돼요. 사업주 동의가 필요하지 않아요.
      </p>
      <p style={body}>
        증빙자료로 근로계약서, 급여명세서, 통장 입금내역을 준비하세요. 근로계약서가 없어도 매달 같은 날짜에 같은 금액이 입금된 통장 기록이면 충분해요. 카카오톡 근무 관련 대화, 출퇴근 사진, 문자메시지도 근로관계를 뒷받침하는 자료가 되죠.
      </p>
      <p style={body}>
        소급 가입이 되면 보험료는 <strong>사업주가 전액 부담</strong>해요. 신고 의무를 어긴 건 사업주 책임이니까요. 사업주가 &ldquo;내가 왜 내야 하느냐&rdquo;고 버텨도 근로복지공단이 직권으로 처리해요. 보험료에 연체료까지 더해서 사업주에게 부과하죠. 근로자가 부담하는 비용은 없어요.
      </p>

      <SectionBadge>소급 가입 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 5: 비자발적 퇴사 기준 */}
      <H2>수급 자격이 인정되는 퇴직 사유를 챙기세요</H2>
      <p style={body}>
        고용보험 가입이 돼 있고 피보험기간 180일을 채웠어도, 퇴직 사유가 <strong>비자발적</strong>이어야 실업급여를 받을 수 있어요. 계약기간 만료, 해고, 권고사직, 근로조건 변경 거부: 이런 경우가 비자발적 퇴사에 해당하죠.
      </p>
      <p style={body}>
        단시간 근로자에게 가장 흔한 케이스는 <strong>계약기간 만료</strong>예요. 3개월 혹은 6개월 단위로 계약하다가 재계약이 안 됐으면 비자발적이에요. 반대로 사업주가 &ldquo;계속 일할래?&rdquo; 했는데 본인이 거절하면 자발적 퇴사로 봐요.
      </p>
      <p style={body}>
        자발적으로 그만둔 경우라도 <strong>정당한 사유</strong>가 있으면 비자발적으로 인정받을 수 있어요. <a href="/w/임금체불-실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금 3개월 이상 미지급</a>, 직장 내 괴롭힘, 출퇴근 왕복 3시간 초과가 대표적이죠. 이런 상황이라면 증빙자료(급여명세서, 녹음, 출퇴근 기록)를 미리 확보해두세요. 고용센터 심사에서 결정적인 역할을 하거든요.
      </p>

      <BorderBox>
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
