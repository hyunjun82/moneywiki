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
      { label: "고용보험법 — 수급자격의 제한 (정당한 이직 사유)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "근로기준법 제43조 — 임금 지급 의무", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 인터넷 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부 — 체불 임금 진정 안내", url: "https://www.moel.go.kr" },
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
        회사에서 몇 달째 월급을 안 줘요. 더 이상 못 다니겠는데, 내가 먼저 그만두면 실업급여를 못 받는다고 하잖아요.<br /><br />
        걱정 안 해도 돼요. 임금체불은 <strong>정당한 퇴사 사유</strong>예요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서
        회사가 임금을 제때 지급하지 않아 퇴직한 경우를 비자발적 퇴사와 동일하게 보고 있죠.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}> 근로기준법 제43조</a>에서도
        임금을 매월 1회 이상, 정해진 날짜에 지급하도록 규정하고 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 왜 정당한 사유인지 + 자격확인 */}
      <H2>2개월 기준이 왜 중요한가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제43조</a>는
        임금을 매월 1회 이상, 정해진 날짜에 지급하도록 규정하고 있죠. 회사가 이 의무를 지키지 않으면 법 위반이에요.
        근로자가 일은 했는데 대가를 못 받는 상황이니까요.
      </p>
      <p style={body}>
        고용보험법 시행규칙에서도 이 점을 명확히 하고 있죠. 임금의 <strong>30% 이상을 지급하지 않았거나</strong>,{" "}
        <strong>2개월 이상 연속으로 체불</strong>한 경우에 정당한 이직 사유로 인정해요.
        회사가 월급을 안 주는데 계속 다니라는 건 법적으로도 말이 안 되는 거예요.
      </p>
      <p style={body}>
        그래서 자발적 퇴사라고 해도 임금체불이 원인이면 비자발적 퇴사처럼 실업급여를 받을 수 있죠.
        핵심은 "내가 먼저 나왔느냐"가 아니라 "왜 나왔느냐"예요. 회사 잘못으로 나온 거니까 보호받을 수 있죠.
      </p>

      <GreenBox title="임금체불 = 정당한 퇴사 사유">
        임금의 30% 이상 미지급 → 정당한 사유 인정<br />
        2개월 이상 연속 체불 → 정당한 사유 인정<br />
        최저임금 미만 지급 → 정당한 사유 인정
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="임금체불 사유로 실업급여를 신청할 수 있어요."
        partialMatchText="일부 조건이 부족해요. 해당 항목을 다시 확인해보세요."
      />

      <Divider />

      {/* 섹션 2 — 수급액 계산 + 증빙자료 */}
      <H2>증빙 서류는 뭘 준비해야 하나요?</H2>
      <p style={body}>
        임금체불로 퇴직해도 실업급여 금액 계산법은 동일해요. 퇴직 전 <strong>평균임금의 60%</strong>를 기준으로 1일 수급액이 정해지고, 나이와 가입기간에 따라 지급 기간이 달라지죠.
        2026년 기준 1일 상한액은 68,100원이고, 하한액은 66,048원이에요.
      </p>
      <p style={body}>
        월급이 300만원이었다면 1일 수급액은 약 6만원이고, 가입기간 3년 이상이면 최소 180일 이상 받을 수 있죠.
        나이가 50세 이상이면 수급기간이 더 길어져요. 아래 계산기에서 본인 조건을 넣어보세요.
      </p>
      <p style={body}>
        여기서 중요한 게 하나 있어요. 체불된 임금이 아니라 <strong>원래 받기로 한 임금</strong>을 기준으로 계산돼요.
        회사가 월급을 안 줬다고 해서 수급액이 줄어드는 건 아니에요. 근로계약서에 명시된 금액이 기준이 되죠.
      </p>

      <SectionBadge>월급과 가입기간으로 계산해보세요</SectionBadge>
      <Calculator
        title="임금체불 퇴직 실업급여 예상 수령액"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 고용센터 심사에 따라 달라질 수 있어요."
      />

      <BorderBox title="실업급여 금액 요약 (2026년 기준)">
        퇴직 전 평균임금의 60%<br />
        1일 상한: 68,100원 / 1일 하한: 66,048원<br />
        월 최대: 약 204만 원<br />
        수급 기간: 120일~270일 (나이·가입기간에 따라 다름)
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 신청 절차 + 체크리스트 */}
      <H2>증빙 서류 기반 신청 절차</H2>
      <p style={body}>
        퇴직 후 가장 먼저 할 일은 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서
        워크넷 구직등록을 하는 거예요. 그다음 관할 고용센터에 방문하거나 온라인으로 수급자격 인정 신청서를 제출하죠.
        이때 퇴사 사유란에 "임금체불"을 명시하고, 앞에서 준비한 증빙자료를 함께 내야 해요.
      </p>
      <p style={body}>
        고용센터 담당자가 이직확인서와 증빙자료를 검토해서 수급자격을 판단해요.
        이직확인서에 회사가 퇴직 사유를 어떻게 기재했는지도 확인하죠.
        "자진퇴사"로 적혀 있어도 체불 증빙이 충분하면 정당한 사유로 인정받을 수 있죠.
      </p>
      <p style={body}>
        수급자격이 인정되면 <strong>7일 대기기간</strong>을 거쳐 8일째부터 실업급여가 지급돼요.
        임금체불이 이유라고 해서 대기기간이 면제되지는 않아요. 이 점은 다른 정당한 사유와 동일하죠.
        지급 기간은 나이와 근속 기간에 따라 120일~270일이에요.
      </p>

      <SectionBadge>퇴직 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 밀린 월급 별도 청구 */}
      <H2>2개월 기준 미달이면 수급이 안 되는 경우</H2>
      <p style={body}>
        실업급여를 받는 것과 밀린 임금을 돌려받는 건 완전히 별개 절차예요.
        실업급여는 고용센터에서 처리하고, 체불 임금은 <strong>노동청(고용노동부)</strong>에 진정을 넣어서 받아야 하죠.
        둘 다 동시에 진행할 수 있으니까 따로 챙기세요.
      </p>
      <p style={body}>
        체불 진정은 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 민원마당</a>에서 온라인으로 접수할 수 있고, 관할 노동청에 직접 방문해도 돼요.
        근로계약서, 급여명세서, 계좌 내역, 신분증을 준비해서 제출하면 노동청에서 회사에 시정 지시를 내리죠.
      </p>
      <p style={body}>
        퇴직금이 밀렸으면 체불 임금과 함께 청구하세요. 회사가 아예 폐업해서 받을 곳이 없으면 <strong>체당금 제도</strong>를 이용할 수 있죠.
        정부가 대신 지급해주는 건데, 최대 1,000만 원까지 받을 수 있어요. 노동청에서 안내해줘요.
      </p>

      <Divider />

      {/* 섹션 5 — 이직확인서와 주의사항 */}
      <H2>증빙 서류와 이직확인서를 먼저 챙기세요</H2>
      <p style={body}>
        이직확인서는 회사가 고용센터에 제출하는 서류예요. 여기에 퇴직 사유가 적히는데, "임금체불" 또는 "근로조건 변경"으로 기재돼 있으면 심사가 수월하죠.
        문제는 일부 회사에서 "자진퇴사"로만 적어버리는 경우예요.
      </p>
      <p style={body}>
        이직확인서 사유가 잘못 기재됐으면 회사에 정정을 요청하세요. 회사가 거부하면 고용센터에 직접 증빙자료를 제출해서 실제 사유를 소명할 수 있죠.
        고용센터는 이직확인서 내용보다 <strong>실제 상황</strong>을 기준으로 판단하니까, 증빙만 충분하면 크게 걱정할 필요 없어요.
      </p>
      <p style={body}>
        심사에서 불인정 결정이 나오더라도 포기하지 마세요. <strong>60일 이내에 이의신청</strong>을 할 수 있고, 추가 증거를 첨부해서 재심사를 받을 수 있죠.
        퇴직 전에 <strong>고용센터(1350)</strong>에 사전 상담을 받아두면 어떤 서류를 준비해야 하는지 미리 파악할 수 있어서 훨씬 유리해요.
      </p>

      <GreenBox title="애매하면 퇴직 전에 상담부터">
        고용센터(1350)에 전화해서<br />
        "임금체불로 퇴직하려는데 실업급여 받을 수 있는지" 먼저 물어보세요.<br />
        사전 상담은 무료이고, 심사 결과에 영향을 주지 않아요.
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
