"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "직장 내 괴롭힘을 경험했어요" },
  { id: "c2", label: "회사에 신고했으나 적절한 조치가 없었어요" },
  { id: "c3", label: "고용보험 가입기간 180일 이상이에요" },
  { id: "c4", label: "퇴직 전 괴롭힘 증거를 확보했어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "퇴직 전 월 평균임금", min: 150, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "age", label: "퇴직 시 나이", min: 25, max: 68, step: 1, defaultValue: 35, format: (v: number) => `${v}세` },
  { id: "years", label: "고용보험 가입기간", min: 1, max: 20, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
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
  "괴롭힘 발생 일시, 장소, 내용, 가해자를 상세히 기록한 메모 확보",
  "카카오톡, 이메일, 문자 등 괴롭힘 관련 대화 내용 캡처 및 백업",
  "회사에 신고한 내역(신고서, 이메일, 녹취 등) 보관",
  "의료기록(진단서, 심리상담 기록)이 있으면 함께 준비",
  "고용센터 방문 전 고용24(ei.go.kr)에서 피보험자격 이력 조회",
];

const FAQS = [
  {
    q: "직장 내 괴롭힘을 신고 안 하고 바로 퇴사해도 실업급여를 받을 수 있나요?",
    a: "받기 어려워요. 고용보험법에서 정당한 이직 사유로 인정받으려면 회사에 먼저 문제를 알렸는데 해결이 안 됐다는 걸 보여줘야 하죠. 신고 없이 바로 나오면 자발적 퇴사로 처리될 수 있어요. 퇴사 전에 반드시 회사에 서면으로 신고하세요.",
  },
  {
    q: "상사가 업무 관련으로 심하게 질책하는 것도 괴롭힘에 해당하나요?",
    a: "업무상 적정 범위를 넘어선 질책이라면 해당돼요. 근로기준법 제76조의2에서 &ldquo;직위 또는 관계 등의 우위를 이용하여 업무상 적정범위를 넘어 다른 근로자에게 신체적·정신적 고통을 주는 행위&rdquo;를 직장 내 괴롭힘으로 정의하고 있죠. 모욕적 언행이 반복되면 해당해요.",
  },
  {
    q: "증거가 거의 없는데 실업급여를 받을 수 있을까요?",
    a: "증거가 부족하면 어려울 수 있어요. 하지만 동료 진술서, 본인이 작성한 시간순 기록, 병원 진단서(우울증, 불안장애 등)도 증거로 인정될 수 있죠. 고용센터에서 사업주 조사도 하니까, 완벽한 증거가 아니더라도 일단 제출해보세요.",
  },
  {
    q: "괴롭힘으로 퇴사할 때 사직서에 뭐라고 써야 하나요?",
    a: "사직서에 퇴직 사유를 &ldquo;직장 내 괴롭힘으로 인한 근로 지속 곤란&rdquo;으로 명확하게 적어야 해요. 그냥 &ldquo;일신상의 사유&rdquo;라고 쓰면 자발적 퇴사로 보일 수 있죠. 사직서 사본도 반드시 보관하세요.",
  },
  {
    q: "괴롭힘으로 우울증 진단을 받았어요. 산업재해로도 신청할 수 있나요?",
    a: "가능해요. 직장 내 괴롭힘으로 인한 정신질환은 산업재해로 인정받을 수 있죠. 근로복지공단에 업무상 질병 산재 신청을 하면 돼요. 실업급여와 산재보상은 별개 제도이니 동시에 진행하는 것도 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제76조의2 — 직장 내 괴롭힘의 금지", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제76조의3 — 직장 내 괴롭힘 발생 시 조치", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용보험법 제58조 — 이직 사유에 따른 수급자격의 제한", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24 — 실업급여 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부 직장 내 괴롭힘 신고센터 (1350)", url: "https://1350.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "자발적-퇴사-실업급여",
    title: "자발적 퇴사 실업급여 정당한 사유 목록",
    description: "자발적으로 퇴사해도 정당한 이직 사유가 있으면 실업급여를 받을 수 있어요.",
  },
  {
    slug: "실업급여-정당한-퇴사-사유",
    title: "실업급여 인정 퇴사 사유 목록과 기준",
    description: "임금체불, 괴롭힘, 건강 악화 등 실업급여가 인정되는 정당한 퇴사 사유를 모아놨어요.",
  },
  {
    slug: "부당해고-구제신청-실업급여",
    title: "부당해고 구제신청과 실업급여 동시 진행",
    description: "부당해고 구제신청 중에도 실업급여를 받을 수 있어요. 두 절차를 동시에 진행하는 방법이에요.",
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
          currentSlug="직장내-괴롭힘-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 직장내 괴롭힘</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        직장 괴롭힘으로 퇴사했다면?<br />
        증거 수집과 신청 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        매일 출근이 지옥이에요. 상사의 모욕, 동료의 따돌림.<br />
        더 못 버티겠는데, 나가면 실업급여라도 받을 수 있을까?<br /><br />
        <strong>직장 내 괴롭힘은 정당한 이직 사유</strong>예요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제76조의2</a>에서 괴롭힘을 금지하고 있고,
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}> 고용보험법 제58조</a>에서 이런 사유로 퇴직하면 비자발적 퇴사로 인정해주죠.<br />
        다만 &ldquo;괴롭힘이 있었다&rdquo;는 걸 증명해야 해요. 증거 없이 나오면 자발적 퇴사로 처리될 수 있거든요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 괴롭힘과 실업급여 */}
      <H2>괴롭힘 퇴사도 신청 절차에 들어갈 수 있나요?</H2>
      <p style={body}>
        형식상 사직서를 쓴 건 맞아요. 하지만 실업급여에서 &ldquo;자발적&rdquo;이냐 &ldquo;비자발적&rdquo;이냐를 따지는 기준은 사직서가 아니라 <strong>퇴직의 실질적 원인</strong>이에요. 괴롭힘을 견디다 못해 그만둔 거라면, 스스로 선택한 퇴직이 아니라 사실상 내몰린 거죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제76조의2</a>는 &ldquo;직위 또는 관계 등의 우위를 이용하여 업무상 적정 범위를 넘어 신체적·정신적 고통을 주거나 근무환경을 악화시키는 행위&rdquo;를 직장 내 괴롭힘으로 정의하고 있어요. 2019년 7월부터 시행된 이 조항 덕분에 괴롭힘 퇴직이 정당한 이직 사유로 인정받는 사례가 크게 늘었죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행규칙 별표2</a>에서도 사업장에서의 불합리한 차별대우나 위법 행위 강요를 정당한 이직 사유로 인정하고 있어요. 직장 내 괴롭힘은 이 범위에 포함되죠. 핵심은 괴롭힘 사실을 입증하는 거예요. 고용센터에서 사업주 조사까지 하지만, 근로자 쪽에서 증거를 많이 확보할수록 유리해요.
      </p>

      <GreenBox title="괴롭힘 퇴사 실업급여 핵심">
        직장 내 괴롭힘 = 정당한 이직 사유 → 실업급여 가능<br />
        조건: 괴롭힘 증거 확보 + 회사에 신고 + 고용보험 180일<br />
        퇴사 전에 증거를 모으고 회사에 서면 신고해야 해요
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 직장 내 괴롭힘 사유로 실업급여를 받을 가능성이 높아요. 증거를 정리해서 고용센터에 신청하세요."
        partialMatchText="일부만 해당돼요. 증거 확보와 회사 신고가 부족하다면 퇴사 전에 먼저 준비하세요."
      />

      <p style={{ ...body, marginTop: 14 }}>
        회사에 신고를 안 하고 바로 퇴사하면 실업급여를 받기 어려워요. 고용센터 입장에서는 &ldquo;회사에 문제를 알렸는데 해결이 안 돼서 나온 것&rdquo;과 &ldquo;아무 말 없이 그냥 나온 것&rdquo;을 다르게 봐요. 이메일이든 내부 신고 시스템이든, 서면으로 신고한 기록을 꼭 남기세요.
      </p>

      <Divider />

      {/* 섹션 2 — 금액 계산 */}
      <H2>어떤 증거가 신청 절차에서 인정되나요?</H2>
      <p style={body}>
        금액 계산은 다른 비자발적 퇴사와 동일해요. 퇴직 전 3개월 평균임금의 60%가 1일 수급액이고, 상한 68,100원, 하한 66,048원이 적용되죠. 괴롭힘 퇴사라고 해서 금액이 줄거나 불이익이 생기지 않아요.
      </p>
      <p style={body}>
        수급기간도 일반적인 실업급여와 같아요. 나이와 고용보험 가입기간에 따라 120일~270일이에요. 3년 일하고 30대에 퇴사하면 약 150일, 990만원 정도를 받게 되죠. 괴롭힘을 견디면서 오래 일한 만큼 가입기간이 길어져서 더 많이 받을 수 있어요.
      </p>

      <SectionBadge>내 조건으로 예상 금액을 계산해보세요</SectionBadge>
      <Calculator
        title="실업급여 예상 수령액 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 2026년 기준 1일 상한액 68,100원, 하한액 66,048원 적용. 실제 금액은 고용센터 심사에 따라 달라질 수 있죠."
      />

      <p style={body}>
        실업급여 외에 괴롭힘 가해자와 회사를 상대로 손해배상 청구도 가능해요. 민사소송을 통해 치료비, 위자료를 받을 수 있죠. 실업급여와 손해배상은 별개이니 둘 다 진행할 수 있어요.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 증거 수집 + 체크리스트 */}
      <H2>증거 수집 방법과 유효한 자료 목록</H2>
      <p style={body}>
        증거가 실업급여 수급의 승패를 가르는 거예요. 가장 강력한 증거는 괴롭힘을 보여주는 문서 기록이에요. 카카오톡 대화, 이메일, 사내 메신저, 문자 메시지에서 모욕적 언행이나 부당한 지시 내용이 담긴 부분을 전부 캡처하세요.
      </p>
      <p style={body}>
        녹음도 유효한 증거예요. 대화 당사자가 녹음하는 건 불법이 아니에요(대법원 판례). 괴롭힘이 반복되는 상황이라면 녹음기를 켜두세요. 날짜와 시간이 자동으로 기록되는 녹음 앱을 쓰는 게 좋아요.
      </p>
      <p style={body}>
        괴롭힘으로 병원 치료를 받았다면 진단서도 중요한 증거가 돼요. 우울증, 불안장애, 적응장애 등의 진단서와 상담 기록이 있으면 괴롭힘과 건강 악화의 인과관계를 보여줄 수 있죠. 동료가 목격한 게 있다면 진술서를 부탁하는 것도 방법이에요.
      </p>

      <SectionBadge>퇴사 전 준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <p style={body}>
        증거를 모을 때 주의할 점이 하나 있어요. 회사 컴퓨터에만 저장하면 퇴사 후 접근이 안 되죠. 개인 이메일이나 클라우드에 백업해두세요. 사내 시스템 접근이 차단되기 전에 미리 해야 해요.
      </p>

      <Divider />

      {/* 섹션 4 — 신청 절차 */}
      <H2>신청 절차와 고용센터 심사 과정</H2>
      <p style={body}>
        퇴사 후 절차는 일반 실업급여와 비슷하지만, 괴롭힘 증거를 추가로 제출해야 해요. 먼저 <a href="https://www.worknet.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>워크넷</a>에 구직등록을 하고, <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 수급자격 신청자 온라인 교육을 수료하세요.
      </p>
      <p style={body}>
        관할 고용센터에 방문할 때 일반 서류(신분증, 통장 사본) 외에 괴롭힘 증거 자료를 함께 가져가야 해요. 회사에 신고한 서면 기록, 카톡/이메일 캡처, 진단서, 동료 진술서 등을 정리해서 제출하세요. 고용센터 담당자에게 괴롭힘 상황을 구체적으로 설명하는 게 중요하죠.
      </p>
      <p style={body}>
        고용센터가 사업주에게 확인 조사를 해요. 회사가 괴롭힘 사실을 부인할 수도 있으니까 근로자 쪽 증거가 탄탄할수록 좋아요. 보통 일반 비자발적 퇴사보다 심사에 1~2주 더 걸릴 수 있죠. 인정되면 그 이후 절차는 동일하고, 1~4주마다 실업인정을 받으면 돼요.
      </p>

      <BorderBox title="사직서 작성 시 반드시 기억할 것">
        퇴직 사유란에 &ldquo;직장 내 괴롭힘으로 인한 근로 지속 곤란&rdquo;으로 기재<br />
        &ldquo;일신상의 사유&rdquo;, &ldquo;개인 사정&rdquo; 같은 모호한 표현 절대 금지<br />
        사직서 사본을 반드시 보관 (사진 촬영이라도 해두기)<br />
        제출 전 고용센터(1350)에 사전 상담을 받아보는 게 안전해요
      </BorderBox>

      <Divider />

      {/* 섹션 5 — 주의사항과 이의신청 */}
      <H2>증거 수집 후 거부당하면 이의신청하세요</H2>
      <p style={body}>
        고용센터에서 괴롭힘 사실을 인정하지 않아서 실업급여가 거부되는 경우가 있어요. 이럴 때 바로 포기하는 분들이 많은데, 이의신청 절차가 있으니 꼭 활용하세요. 심사청구를 90일 이내에 고용보험심사관에게 제출하면 돼요.
      </p>
      <p style={body}>
        심사청구에서도 거부되면 30일 이내에 고용보험심사위원회에 재심사청구를 할 수 있죠. 행정소송까지 가능해요. 괴롭힘 사건은 사실관계가 복잡해서 첫 심사에서 부정적이더라도 추가 증거를 제출하면 뒤집히는 경우가 있어요.
      </p>
      <p style={body}>
        실업급여와 별개로 고용노동부(1350)에 직장 내 괴롭힘 진정을 넣을 수도 있어요. <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제76조의3</a>에 따라 회사가 조치를 안 하면 500만원 이하 과태료가 부과되죠. 진정이 받아들여지면 이 결과가 실업급여 심사에도 유리하게 작용해요. 노동청 진정, 실업급여 신청, 손해배상 청구를 동시에 진행하는 것도 가능하죠.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        직장 내 괴롭힘과 실업급여에 대해 실제로 많이 물어보시는 것만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 근로기준법을 바탕으로 작성됐어요. 법령은 개정될 수 있으니 중요한 결정 전에 고용24(ei.go.kr)나 고용센터(1350)에서 직접 확인하세요." />
    </ArticleLayout>
  );
}
