"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "unpaid", label: "임금체불 사실 확인 (2개월 이상 또는 30% 이상 미지급)" },
  { id: "evidence", label: "체불 증빙자료 보유 (통장 내역, 급여명세서, 대화 캡처)" },
  { id: "quit", label: "퇴직 의사를 회사에 표시했거나 이미 퇴직한 상태" },
  { id: "insured", label: "퇴직 전 18개월 내 고용보험 가입기간 180일 이상" },
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
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "고용보험 가입기간", min: 1, max: 20, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
  { id: "age", label: "퇴직 시 나이", min: 25, max: 68, step: 1, defaultValue: 35, format: (v: number) => `${v}세` },
];

const CALC_RESULTS = [
  {
    label: "1일 수급액",
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
  "급여명세서 또는 근로계약서 사본 확보",
  "계좌 입금 내역으로 미지급 사실 증명",
  "체불 관련 문자, 이메일, 카톡 대화 캡처",
  "이직확인서에 '임금체불' 사유가 기재됐는지 확인",
  "퇴직 후 12개월 이내에 실업급여 신청",
];

const FAQS = [
  {
    q: "월급이 1개월만 밀려도 실업급여 받을 수 있나요?",
    a: "1개월 체불만으로는 인정받기 쉽지 않아요. 2개월 이상 연속 체불이거나, 임금의 30% 이상을 안 줬을 때 정당한 사유로 인정되죠. 다만 고용센터에서 상황을 종합적으로 판단하니까, 1350에 먼저 상담해보세요.",
  },
  {
    q: "이직확인서에 '자진퇴사'로 적혀 있으면 어떡하죠?",
    a: "증빙자료로 체불 사실을 증명하면 돼요. 통장 내역, 급여명세서 등을 고용센터에 제출하면 정당한 사유로 인정받을 수 있죠. 회사에 이직확인서 정정을 요청할 수도 있고요.",
  },
  {
    q: "밀린 월급은 실업급여와 별도로 받을 수 있나요?",
    a: "네, 완전히 별개예요. 밀린 임금은 노동청(고용노동부)에 체불 진정을 넣어서 따로 받아야 하죠. 퇴직금이 밀렸으면 같이 청구하세요.",
  },
  {
    q: "회사가 폐업해서 월급을 못 받았으면요?",
    a: "체당금 제도를 이용할 수 있죠. 정부가 대신 지급해주는 제도인데, 최대 1,000만 원까지 돼요. 노동청에서 안내받으세요.",
  },
  {
    q: "권고사직으로 처리됐는데 원인이 임금체불이면요?",
    a: "문제 없어요. 임금체불이 퇴직 원인이면 이직확인서 사유와 관계없이 정당한 사유로 인정돼요. 체불 증빙자료를 고용센터에 제출하면 되죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법: 수급자격의 제한 (정당한 이직 사유)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "근로기준법 제43조: 임금 지급 의무", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 인터넷 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 체불 임금 진정 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "임금체불-실업급여",
    title: "임금체불 실업급여 수급 요건 정리",
    description: "체불 기간과 금액 기준별로 실업급여 수급이 가능한 경우를 정리했어요.",
  },
  {
    slug: "임금삭감-퇴직-실업급여",
    title: "임금삭감으로 퇴직하면 실업급여",
    description: "급여가 깎여서 퇴사한 경우 비자발적 퇴직으로 인정돼요.",
  },
  {
    slug: "실업급여-정당한-퇴사-사유",
    title: "실업급여 정당한 퇴사 사유 모음",
    description: "어떤 사유가 정당한 이직으로 인정되는지 한눈에 정리했어요.",
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
          currentSlug="실업급여-임금체불"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 임금체불 · 비자발적 퇴사</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임금체불로 퇴직, 실업급여 될까?<br />
        2개월 기준과 증빙 서류
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;월급이 몇 달째 안 들어오는데, 내가 먼저 나오면 실업급여 못 받는 거 아니에요?&quot;<br /><br />
        아니에요. 임금체불은 법이 인정하는 <strong>정당한 퇴사 사유</strong>예요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이
        회사 잘못으로 임금을 못 받고 퇴직한 경우를 비자발적 퇴사와 동일하게 보고 있죠.{" "}
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제43조</a>도
        임금을 매월 1회 이상, 정해진 날짜에 지급하라고 못 박아뒀어요.
        회사가 이 의무를 어기면, 내가 먼저 나왔어도 보호받을 수 있는 거예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 왜 정당한 사유인지 + 자격확인 */}
      <H2>2개월 기준이 왜 중요한가요?</H2>
      <p style={body}>
        월급을 한 달 밀렸다고 바로 실업급여가 나오진 않아요.
        고용보험법 시행규칙에서 정한 기준이 있죠. <strong>2개월 이상 연속 체불</strong>이거나,
        임금의 <strong>30% 이상을 안 줬을 때</strong> 정당한 이직 사유로 인정돼요.
        이 기준을 넘기면 내가 먼저 사표를 냈어도 비자발적 퇴사로 처리되는 거예요.
      </p>
      <p style={body}>
        왜 2개월이냐고요?{" "}
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제43조</a>가
        임금을 매월 1회 이상, 정해진 날짜에 지급하라고 규정하고 있죠.
        한 달 정도는 회사 사정으로 밀릴 수 있다고 봐요.
        그런데 두 달 넘게 안 주면? 그건 회사가 의무를 명백히 위반한 거예요.
      </p>
      <p style={body}>
        핵심은 &quot;내가 먼저 나왔느냐&quot;가 아니라 &quot;왜 나왔느냐&quot;예요.
        월급을 안 주는 회사에서 더 이상 못 버티겠다는 건 충분한 사유가 되죠.
        고용센터도 체불 사실만 증명되면 비자발적 퇴사와 동일하게 처리해줘요.
      </p>

      <GreenBox title="이 세 가지 중 하나만 해당되면 정당한 사유예요">
        임금의 30% 이상 미지급: 월급 300만원인데 90만원 이상 못 받은 경우<br />
        2개월 이상 연속 체불: 두 달째 통장에 입금 안 된 경우<br />
        최저임금 미만 지급: 법정 최저 시급보다 적게 받은 경우
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="임금체불 사유로 실업급여를 신청할 수 있어요."
        partialMatchText="일부 조건이 부족해요. 해당 항목을 다시 확인해보세요."
      />

      <Divider />

      {/* 섹션 2: 수급액 계산 + 증빙자료 */}
      <H2>증빙 서류는 뭘 준비해야 하나요?</H2>
      <p style={body}>
        체불 사실을 입으로만 말해서는 안 돼요. 고용센터가 인정해줄 수 있도록 <strong>서류로 증명</strong>해야 하죠.
        가장 확실한 건 계좌 입금 내역이에요. 급여가 들어와야 할 날짜에 입금이 없으면, 그 자체가 체불 증거가 되니까요.
        급여명세서, 근로계약서, 체불 관련 문자나 카톡 대화 캡처도 같이 챙기면 심사가 수월해져요.
      </p>
      <p style={body}>
        금액 계산은 일반 실업급여와 똑같아요. 퇴직 전 <strong>평균임금의 60%</strong>가 1일 수급액이 되고,
        나이와 가입기간에 따라 지급 기간이 달라지죠.
        2026년 기준 1일 상한액 68,100원, 하한액 66,048원이에요.
      </p>
      <p style={body}>
        한 가지 꼭 알아둬야 할 게 있죠. 수급액은 <strong>원래 받기로 한 임금</strong>으로 계산해요.
        회사가 월급을 안 줬다고 수급액까지 깎이는 게 아니에요.
        근로계약서에 적힌 금액이 기준이 되니까, 체불 때문에 손해 보는 구조가 아니죠.
      </p>

      <SectionBadge>월급과 가입기간으로 계산해보세요</SectionBadge>
      <Calculator
        title="임금체불 퇴직 실업급여 예상 수령액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 고용센터 심사에 따라 달라질 수 있어요."
      />

      <BorderBox title="2026년 기준 수급액 요약">
        1일 수급액 = 퇴직 전 평균임금의 60%<br />
        1일 상한: 68,100원 / 1일 하한: 66,048원<br />
        월 최대 약 204만 원 수준<br />
        수급 기간: 120일~270일 (나이와 가입기간에 따라 달라요)
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 신청 절차 + 체크리스트 */}
      <H2>증빙 서류 기반 신청 절차</H2>
      <p style={body}>
        퇴직하면 바로 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에
        접속해서 워크넷 구직등록부터 해요.
        그다음 관할 고용센터에 방문하거나 온라인으로 수급자격 인정 신청서를 내면 되죠.
        이때 퇴사 사유란에 &quot;임금체불&quot;을 명시하고, 계좌 내역이나 급여명세서 같은 증빙자료를 함께 첨부해야 해요.
      </p>
      <p style={body}>
        고용센터 담당자가 이직확인서와 증빙자료를 대조해서 수급자격 여부를 판단하죠.
        이직확인서에 &quot;자진퇴사&quot;로 적혀 있더라도, 체불 증빙이 충분하면 정당한 사유로 인정받을 수 있죠.
        고용센터는 서류에 적힌 사유보다 <strong>실제 상황</strong>을 기준으로 판단하니까요.
      </p>
      <p style={body}>
        수급자격이 인정되면 <strong>7일 대기기간</strong>을 거쳐 8일째부터 실업급여가 통장에 들어와요.
        임금체불 사유라도 대기기간은 면제되지 않아요: 다른 퇴사 사유와 동일하죠.
        이후 1~4주마다 실업인정(구직활동 보고)을 하면 수급일수가 끝날 때까지 계속 받을 수 있죠.
      </p>

      <SectionBadge>퇴직 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 밀린 월급 별도 청구 */}
      <H2>2개월 기준 미달이면 수급이 안 되는 경우</H2>
      <p style={body}>
        체불 기간이 2개월이 안 되고, 미지급 금액도 30% 미만이면 정당한 사유로 인정받기 어려워요.
        1개월만 밀린 상태에서 퇴사하면 &quot;참을 수 있는 수준&quot;이라고 판단될 수 있죠.
        다만 고용센터에서 상황을 종합적으로 보니까, 기준에 살짝 못 미치더라도 1350에 먼저 상담해보는 게 좋아요.
      </p>
      <p style={body}>
        밀린 월급 자체는 실업급여와 <strong>별도로</strong> 받아야 해요.
        <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}> 고용노동부 민원마당</a>에서 온라인으로 체불 진정을 접수할 수 있고, 관할 노동청에 직접 방문해도 되죠.
        근로계약서, 급여명세서, 계좌 내역을 가져가면 노동청이 회사에 시정 지시를 내려요.
      </p>
      <p style={body}>
        퇴직금이 밀렸으면 체불 임금과 함께 청구하세요. 회사가 아예 <a href="/w/실업급여-폐업" style={{ color: "#1D9E75", textDecoration: "underline" }}>폐업</a>해서 받을 곳이 없으면 <strong>체당금 제도</strong>를 이용할 수 있죠.
        정부가 대신 지급해주는 건데, 최대 1,000만 원까지 받을 수 있죠.
        실업급여 신청과 체불 진정은 동시에 진행할 수 있으니까, 따로따로 챙겨야 해요.
      </p>

      <Divider />

      {/* 섹션 5: 이직확인서와 주의사항 */}
      <H2>증빙 서류와 이직확인서를 먼저 챙기세요</H2>
      <p style={body}>
        이직확인서는 회사가 고용센터에 제출하는 서류예요.
        여기에 퇴직 사유가 적히는데, &quot;임금체불&quot;이나 &quot;근로조건 변경&quot;으로 기재돼 있으면 심사가 훨씬 수월하죠.
        문제는 회사가 귀찮다고 &quot;자진퇴사&quot;로 적어버리는 경우예요. 이런 일이 생각보다 많아요.
      </p>
      <p style={body}>
        잘못 기재됐다면 회사에 정정을 요청하세요.
        회사가 거부하면 고용센터에 체불 증빙자료를 직접 제출하면 돼요.
        계좌 내역에 입금이 안 된 게 뻔히 보이는데, 이직확인서 한 장 때문에 실업급여를 못 받는 건 아니니까요.
        고용센터는 서류보다 실제 상황을 기준으로 판단해줘요.
      </p>
      <p style={body}>
        심사에서 불인정 결정이 나오더라도 포기할 필요 없어요.
        <strong>60일 이내에 <a href="/w/실업급여-이의신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>이의신청</a></strong>을 할 수 있고, 추가 증거를 붙여서 재심사를 받을 수 있죠.
        제일 좋은 방법은 퇴직 전에 <strong>고용센터(1350)</strong>에 사전 상담을 받아두는 거예요.
        어떤 서류를 어떻게 준비해야 하는지 미리 알아두면 심사 통과 확률이 확 올라가요.
      </p>

      <GreenBox title="애매하면 퇴직 전에 상담부터 받으세요">
        고용센터(1350)에 전화 한 통이면 돼요.<br />
        &quot;임금체불로 퇴직하려는데 실업급여 가능한지&quot; 물어보세요.<br />
        사전 상담은 무료이고, 나중에 심사 결과에 영향을 주지 않아요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        임금체불과 실업급여에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 근로기준법을 바탕으로 작성됐어요. 개별 사유의 인정 여부는 고용센터 심사에 따라 다르니, 사전 상담(1350)을 받아보세요." />
    </ArticleLayout>
  );
}
