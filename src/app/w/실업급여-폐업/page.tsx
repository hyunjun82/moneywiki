"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "사업장 폐업이 확인됐어요 (홈택스 조회)" },
  { id: "c2", label: "이직확인서를 발급받았거나 직권 처리를 요청했어요" },
  { id: "c3", label: "고용보험 가입기간 180일 이상이에요" },
  { id: "c4", label: "퇴직 후 12개월이 지나지 않았어요" },
];

function getDays(age: number, years: number): number {
  if (age >= 50) {
    if (years < 1) return 120;
    if (years < 3) return 180;
    if (years < 5) return 210;
    if (years < 10) return 240;
    return 270;
  }
  if (years < 1) return 120;
  if (years < 3) return 150;
  if (years < 5) return 180;
  if (years < 10) return 210;
  return 240;
}

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 700, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "years", label: "고용보험 가입기간", min: 1, max: 20, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
  { id: "age", label: "퇴직 시 나이", min: 20, max: 68, step: 1, defaultValue: 35, format: (v: number) => `${v}세` },
];

const CALC_RESULTS = [
  {
    label: "1일 구직급여액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.round((v.salary * 10000 * 0.6) / 30);
      return Math.max(66048, Math.min(68100, daily));
    },
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "수급기간",
    getValue: (v: Record<string, number>) => getDays(v.age, v.years),
    format: (v: number) => `${v}일 (약 ${Math.round(v / 30)}개월)`,
  },
  {
    label: "예상 총 수령액",
    getValue: (v: Record<string, number>) => {
      const daily = Math.max(66048, Math.min(68100, Math.round((v.salary * 10000 * 0.6) / 30)));
      return daily * getDays(v.age, v.years);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "사업자등록 폐업 확인서 (홈택스에서 조회 가능)",
  "4대보험 가입이력 확인서 (국민연금공단 또는 건강보험공단)",
  "급여 입금 내역이 확인되는 통장 사본",
  "근로계약서 또는 재직 증명서류",
  "폐업 통보 문자, 이메일 등 증빙자료",
];

const FAQS = [
  {
    q: "회사가 폐업했는데 이직확인서를 못 받으면 어떡하죠?",
    a: "고용센터에서 직권으로 처리해줘요. 폐업 사실이 확인되면 이직확인서 없이도 수급자격을 인정해주죠. 4대보험 가입이력으로 근무 기간과 급여를 확인할 수 있으니까요.",
  },
  {
    q: "폐업한 회사에서 밀린 월급은 어떻게 받나요?",
    a: "체당금 제도를 이용하면 돼요. 고용노동부(노동청)에 체불 진정을 넣고 체당금을 신청하면, 정부가 최대 1,000만원까지 대신 지급해줘요.",
  },
  {
    q: "폐업이면 실업급여를 더 많이 받을 수 있나요?",
    a: "금액이 더 늘어나지는 않아요. 수급기간과 금액은 고용보험 가입기간과 나이에 따라 정해지죠. 다만 폐업은 비자발적 퇴사라서 수급자격 자체는 문제없이 인정돼요.",
  },
  {
    q: "사장이 연락이 안 되는데 어떻게 하나요?",
    a: "사장과 연락이 안 돼도 괜찮아요. 고용센터에 폐업 사실을 알리면 국세청 자료와 4대보험 이력으로 직권 처리하죠. 폐업 관련 증빙(사진, 뉴스 기사 등)을 가져가면 더 빨라요.",
  },
  {
    q: "폐업 전에 자진퇴사했어도 실업급여를 받을 수 있나요?",
    a: "폐업 전에 미리 퇴사했다면 일반적인 자발적 퇴사로 분류돼요. 다만 폐업이 예고된 상황에서 나온 거라면 정당한 사유로 인정받을 가능성이 높아요. 고용센터에 구체적 상황을 설명하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 구직급여 수급자격 및 비자발적 이직 기준", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "임금채권보장법: 체당금 지급 기준", url: "https://www.law.go.kr/법령/임금채권보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 인터넷 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 체당금 및 체불 진정 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "폐업-실업급여",
    title: "폐업 후 실업급여 신청 절차",
    description: "폐업 상황별 실업급여 수급자격과 신청 절차를 정리했어요.",
  },
  {
    slug: "정리해고-실업급여",
    title: "정리해고 실업급여 수급 조건",
    description: "정리해고로 퇴직하면 비자발적 퇴사로 실업급여를 받을 수 있어요.",
  },
  {
    slug: "실업급여-고용보험-미가입",
    title: "고용보험 미가입 시 실업급여 받는 방법",
    description: "고용보험에 가입되지 않았어도 구제받을 수 있는 방법이 있어요.",
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
          currentSlug="실업급여-폐업"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 &middot; 고용보험 &middot; 폐업</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        자영업자 폐업 후 실업급여 받을까?<br />
        가입 기간과 수급 조건
      </h1>

      <p style={{ ...body, fontSize: 16, lineHeight: 2.1 }}>
        &ldquo;회사가 갑자기 문을 닫았어요. 사장은 연락도 안 되고요.&rdquo;
      </p>
      <p style={body}>
        회사 폐업은 가장 확실한 <strong>비자발적 퇴사</strong> 사유예요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따르면
        사업장이 폐업된 경우, 이직확인서가 없어도 고용센터에서 직권으로 수급자격을 인정해주죠.
        밀린 월급이 남아 있다면 체당금까지 별도로 청구할 수 있죠. <a href="/w/실업급여-임금체불" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금체불 사유의 실업급여</a>도 함께 살펴보세요.
      </p>
      <p style={body}>
        수급 조건부터 계산기, 서류, 체당금 신청까지 한꺼번에 정리했어요.
        회사가 없어졌다고 당황하지 마시고, 아래 순서대로 따라오세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 폐업은 비자발적 퇴사 */}
      <H2>가입 기간이 얼마나 돼야 수급 조건에 해당하나요?</H2>
      <p style={body}>
        폐업 퇴직은 본인 의지와 무관한 퇴직이에요. 사업주가 사업을 접기로 결정한 거고, 근로자는 선택의 여지 없이 직장을 잃은 거죠. 고용보험법에서 가장 확실한 비자발적 이직 사유로 분류하는 이유가 바로 이거예요.
      </p>
      <p style={body}>
        수급 조건은 간단해요. <strong>퇴직 전 18개월 이내에 고용보험 가입기간 180일 이상</strong>이면 돼요. 권고사직이나 정리해고처럼 &quot;왜 나왔는지&quot;를 따로 증명할 필요가 없죠. 폐업 자체가 명백한 비자발적 사유니까요. 재취업 의사만 갖추고 있으면 충분해요.
      </p>
      <p style={body}>
        주의할 게 하나 남았죠. 사장이 &ldquo;곧 닫을 것 같다&rdquo;고 말하는 것과 <strong>실제로 사업자등록이 폐업 처리</strong>된 건 다른 문제예요. 국세청 홈택스에서 사업자등록번호를 조회하면 폐업 여부가 바로 나오니까, 사장 말만 듣지 말고 직접 조회해 보세요.
      </p>

      <GreenBox>
        폐업은 근로자 의사와 무관한 퇴직이라<br />
        정당한 사유를 별도로 증명하지 않아도 돼요.<br />
        고용보험 가입기간 180일 이상 + 재취업 의사: 이 두 가지면 충분하죠.
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 폐업 퇴직이라면 실업급여 수급자격이 인정돼요. 고용센터에서 바로 신청하세요."
        partialMatchText="일부만 해당돼요. 이직확인서가 없다면 고용센터에서 직권 처리를 요청할 수 있어요. 1350에 먼저 전화해보세요."
      />

      <Divider />

      {/* 섹션 2: 수급액 계산 + 이직확인서 */}
      <H2>수급 조건을 충족하면 금액은 어떻게 계산되나요?</H2>
      <p style={body}>
        금액과 기간은 일반적인 비자발적 퇴사와 같은 방식으로 계산돼요. <strong>퇴직 전 3개월간의 평균임금, 고용보험 가입기간, 퇴직 시 나이</strong>: 이 세 가지가 핵심이죠. 폐업이라고 해서 금액이 더 늘어나진 않지만, 수급자격 자체는 이의 없이 바로 인정돼요.
      </p>

      <Calculator
        title="폐업 퇴직 실업급여 예상액 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 고용센터 심사에 따라 달라질 수 있어요."
      />

      <p style={body}>
        문제는 이직확인서예요. 회사가 사라졌으니 발급받을 데가 없죠. 이럴 때는 <strong>고용센터가 직권으로 처리</strong>해줘요. 고용센터에 방문하거나 전화(1350)로 &ldquo;회사가 폐업해서 이직확인서를 못 받겠다&rdquo;고 알리면, 담당자가 국세청 폐업 자료와 4대보험 가입이력을 조회해서 근무 사실을 확인하죠.
      </p>
      <p style={body}>
        직권 처리에 시간이 좀 걸릴 수 있으니, 본인이 폐업 증빙자료를 미리 준비해 가면 훨씬 빨라져요. 사업자등록 폐업 화면 캡처, 뉴스 기사, 현장 사진 같은 게 좋은 증거가 되죠. 자료가 많을수록 처리 속도가 올라가요.
      </p>

      <BorderBox>
        고용센터 방문 또는 전화(1350) 신고<br />
        &rarr; 폐업 증빙자료 제출<br />
        &rarr; 국세청 폐업 확인 + 4대보험 이력 조회<br />
        &rarr; 수급자격 직권 인정<br />
        &rarr; 실업급여 지급 결정
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 폐업 증명 + 체크리스트 */}
      <H2>가입 기간과 폐업 사실을 증명하는 서류</H2>
      <p style={body}>
        가장 확실한 서류는 <strong>사업자등록 폐업 확인서</strong>예요. 국세청 홈택스에서 사업자등록번호를 조회하면 폐업 여부가 바로 나오죠. 이 화면을 캡처하거나 출력해서 고용센터에 가져가세요. 직권 처리를 기다리는 것보다 본인이 직접 준비해 가면 처리 속도가 훨씬 빨라져요.
      </p>
      <p style={body}>
        홈택스 조회가 안 되는 경우에도 방법은 있죠. 폐업 관련 <strong>뉴스 기사 캡처</strong>, 회사 건물이 비어 있는 <strong>현장 사진</strong>, 사장이 보낸 <strong>폐업 통보 문자나 이메일</strong>: 이런 것들이 모두 증빙 자료로 인정되죠. 여러 가지를 함께 내면 더 강력해요.
      </p>
      <p style={body}>
        그중에서도 반드시 챙겨야 할 게 <strong>급여 입금 내역이 찍힌 통장 사본</strong>이에요. 근무 사실과 급여 수준을 동시에 증명하는 가장 강력한 자료거든요. 4대보험 가입이력 확인서(국민연금공단 또는 건강보험공단)도 함께 준비하면 고용센터 심사가 한결 수월해져요.
      </p>

      <SectionBadge>폐업 시 준비할 서류</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 밀린 월급과 체당금 */}
      <H2>수급 조건 확인 후 체당금도 함께 신청하세요</H2>
      <p style={body}>
        회사가 폐업하면 마지막 몇 달 치 월급이 밀려 있는 경우가 흔해요. 사업이 어려워져서 문을 닫은 거니까요. 이런 상황에서 쓸 수 있는 제도가 바로 <strong>체당금</strong>이에요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/임금채권보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금채권보장법</a>에 따라 회사가 못 준 밀린 임금을 <strong>정부가 대신 지급</strong>해주는 구조죠. 최종 3개월분 임금, 최종 3년분 퇴직금, 최종 3개월분 휴업수당이 대상이에요. 나이에 따라 한도가 다르지만, 1인당 <strong>최대 약 1,000만원</strong>까지 받을 수 있죠.
      </p>
      <p style={body}>
        신청은 <strong>고용노동부(관할 노동청)</strong>에서 해요. 체불 진정을 먼저 넣고, 사업주 재산이 부족해서 지급이 어렵다는 확인을 받은 뒤 체당금을 청구하는 순서죠. <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a> 민원마당에서 온라인 접수도 되고, 직접 방문해도 돼요. 급여명세서, 통장 입금 내역, 근로계약서를 함께 제출하세요.
      </p>

      <GreenBox>
        고용노동부 민원마당 (온라인) 또는 관할 노동청 (방문)<br />
        필요 서류: 체불 확인서, 급여명세서, 통장 내역, 근로계약서<br />
        지급 범위: 밀린 임금 + 퇴직금 + 휴업수당 (최대 약 1,000만원)
      </GreenBox>

      <Divider />

      {/* 섹션 5: 수급기간과 빠른 신청 */}
      <H2>퇴직 즉시 고용센터에 연락하세요</H2>
      <p style={body}>
        놓치기 쉬운 게 하나 있죠. <strong>퇴직 후 12개월 이내에 수급을 완료</strong>해야 한다는 거예요. 12개월이 지나면 남은 수급일수가 아무리 많아도 더 이상 받을 수 없죠. 폐업 후 정신없는 와중에 신청을 미루다가 기한을 놓치는 분들이 꽤 많아요.
      </p>
      <p style={body}>
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인으로 신청할 수 있죠. 워크넷 구직등록 &rarr; 수급자격 신청 교육 이수 &rarr; 고용센터 방문 상담: 이 순서로 진행하면 되죠. <a href="/w/실업급여-이직확인서-거부" style={{ color: "#1D9E75", textDecoration: "underline" }}>이직확인서가 없는 상황</a>이라면 고용센터에 먼저 전화(1350)해서 직권 처리 절차를 안내받으세요.
      </p>
      <p style={body}>
        실업급여와 체당금은 별개의 제도예요. 한쪽을 받는다고 다른 쪽이 줄어들지 않으니, <strong>두 가지를 동시에 진행</strong>하는 게 가장 효율적이죠. 고용센터에서 실업급여를 신청하고, 관할 노동청에서 체당금을 별도로 청구하세요. 밀린 월급이 있다면 이 타이밍을 절대 놓치지 마세요.
      </p>

      <BorderBox>
        실업급여는 퇴직 후 12개월 이내에 수급을 완료해야 해요.<br />
        폐업 정리에 정신이 팔려서 기한을 넘기는 경우가 많으니<br />
        퇴직 즉시 고용센터(1350)부터 연락하세요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        회사 폐업과 실업급여에 대해 실제로 많이 궁금해하시는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 임금채권보장법을 바탕으로 작성됐어요. 개별 사안의 처리 절차는 고용센터 판단에 따라 달라질 수 있으니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
