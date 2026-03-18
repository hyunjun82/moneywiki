"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 계산 로직 ──────────────────────────────────────────

function getRefund(days: number, daily: number): number {
  return days * daily;
}

function getAdditionalCharge(refund: number): number {
  return refund * 2;
}

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "부정수급 통보서를 수령했어요" },
  { id: "c2", label: "환수 금액(원금 + 추가징수액)을 확인했어요" },
  { id: "c3", label: "이의신청 기한(통보일로부터 90일)을 확인했어요" },
  { id: "c4", label: "분할납부 가능 여부를 고용센터에 문의했어요" },
];

const CALC_SLIDERS = [
  { id: "days", label: "부정수급 일수", min: 1, max: 90, step: 1, defaultValue: 30, format: (v: number) => `${v}일` },
  { id: "daily", label: "1일 수급액", min: 66048, max: 68100, step: 100, defaultValue: 66048, format: (v: number) => `${v.toLocaleString()}원` },
];

const CALC_RESULTS = [
  {
    label: "부정수급 환수금 (원금)",
    getValue: (v: Record<string, number>) => getRefund(v.days, v.daily),
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "추가징수액 (2배)",
    getValue: (v: Record<string, number>) => getAdditionalCharge(getRefund(v.days, v.daily)),
    format: (v: number) => `${v.toLocaleString()}원`,
  },
  {
    label: "총 환수 예상액 (원금 + 2배)",
    getValue: (v: Record<string, number>) => {
      const refund = getRefund(v.days, v.daily);
      return refund + getAdditionalCharge(refund);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
];

const CHECKLIST = [
  "부정수급 통보서 수령 즉시 환수 금액과 납부 기한 확인",
  "이의신청 기한(통보일로부터 90일) 내 이의제기 가능 여부 검토",
  "분할납부 신청서를 고용센터에 제출 (경제적 곤란 시)",
  "부정수급 사실관계 증빙자료(근로계약서, 소득증명 등) 확보",
  "향후 실업급여 재신청 시 수급 제한 기간 확인",
];

const FAQS = [
  {
    q: "부정수급으로 적발되면 받은 돈만 돌려주면 되나요?",
    a: "받은 돈만 돌려주는 게 아니에요. 고용보험법 제62조에 따라 부정수급액 전액 반환에 더해 최대 5배까지 추가징수가 가능하죠. 실무에서는 보통 원금의 2배를 추가징수하니까 총 3배를 내게 돼요.",
  },
  {
    q: "부정수급 환수금을 한 번에 못 내면 어떻게 하나요?",
    a: "고용센터에 분할납부를 신청할 수 있어요. 경제적 곤란 사정을 소명하면 최대 24개월까지 나눠 낼 수 있죠. 다만 분할납부 중에도 납부 기한을 어기면 강제징수 절차로 넘어갈 수 있으니 주의하세요.",
  },
  {
    q: "알바하면서 실업급여 받은 게 부정수급인가요?",
    a: "신고 여부가 핵심이에요. 취업 사실(알바 포함)을 고용센터에 신고하고 실업인정을 받았다면 문제없죠. 신고 없이 소득활동을 하면서 실업급여를 받으면 부정수급으로 적발돼요.",
  },
  {
    q: "부정수급으로 처벌받으면 형사처벌도 받나요?",
    a: "금액이 크거나 고의성이 뚜렷하면 고용보험법 제116조에 따라 3년 이하 징역 또는 3천만 원 이하 벌금이 부과될 수 있어요. 소액이고 단순 과실이라면 행정 환수로 끝나는 경우가 많죠.",
  },
  {
    q: "부정수급 환수 통보에 이의가 있으면 어떻게 하나요?",
    a: "통보일로부터 90일 이내에 고용보험심사위원회에 심사청구를 할 수 있어요. 심사 결과에 불복하면 재심사청구나 행정소송도 가능하죠. 기한을 넘기면 이의를 제기할 수 없으니 빨리 움직이세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 제62조: 부정수급에 따른 반환명령 및 추가징수", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 제116조: 부정수급 벌칙 규정", url: "https://www.law.go.kr/법령/고용보험법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용24: 실업급여 부정수급 안내", url: "https://www.ei.go.kr" },
      { label: "고용노동부: 부정수급 신고·제보 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "실업급여-부정수급",
    title: "실업급여 부정수급 적발 기준과 처벌",
    description: "어떤 행위가 부정수급에 해당하는지 구체적으로 정리했어요.",
  },
  {
    slug: "실업급여-받으면서-알바",
    title: "실업급여 받으면서 알바 60시간 기준",
    description: "알바하면서 실업급여 유지하는 조건과 신고 방법이에요.",
  },
  {
    slug: "실업급여-이의신청",
    title: "실업급여 이의신청 방법과 절차",
    description: "수급자격 불인정이나 환수 결정에 이의를 제기하는 절차예요.",
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
          currentSlug="실업급여-환수"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 부정수급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 환수 통보받았다면?<br />
        반환 금액과 이의신청까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;환수 통보서가 왔는데, 금액이 생각보다 너무 커요.&rdquo;
      </p>
      <p style={body}>
        부정수급이 적발되면 받은 돈 전부를 돌려줘야 해요.
        거기서 끝이 아니죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제62조</a>에 따르면
        부정수급액의 <strong>최대 5배</strong>까지 추가징수가 가능하고, 실무에서는 보통 원금의 <strong>2배</strong>를 추가로 부과해요.
        30일치 부정수급이면 환수금만 약 <strong>594만 원</strong>(66,048원 x 30일 x 3배)에 달하죠.
      </p>
      <p style={body}>
        통보를 받았다면 납부 기한과 이의신청 기한부터 확인해야 해요.
        환수 구조, 계산법, 분할납부와 이의신청까지 순서대로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 부정수급 환수 구조 */}
      <H2>반환 금액은 어떻게 정해지나요?</H2>
      <SectionBadge>환수 구조 이해</SectionBadge>

      <p style={body}>
        고용센터가 부정수급을 확인하면 <strong>반환명령</strong>과 <strong>추가징수 처분</strong>을 동시에 내려요.
        반환명령은 부정하게 받은 실업급여 원금 전부를 돌려내라는 거고, 추가징수는 그 위에 붙는 일종의 벌금이죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제62조</a>가
        추가징수 상한을 부정수급액의 5배로 정해놨어요.
      </p>
      <p style={body}>
        실무에서 배율은 위반 정도에 따라 갈려요.
        단순 신고 누락이면 원금의 2배가 보통이고, 고의적이거나 반복적인 부정수급이면 3~5배까지 올라가죠.
        가장 흔한 케이스는 취업 사실을 신고하지 않고 <a href="/w/실업급여-부정수급" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여를 계속 받은 건</a>데, 이때 2배 추가징수가 일반적이에요.
      </p>
      <p style={body}>
        절차는 이렇게 흘러가요.
        고용센터가 부정수급 사실을 조사한 뒤 통보서를 보내죠.
        통보서에는 환수 원금, 추가징수액, 납부 기한이 적혀 있죠.
        기한 내에 납부하지 않으면 국세징수법에 따라 강제징수로 넘어가고, 급여 압류나 재산 압류까지 갈 수 있으니까 통보를 받으면 바로 대응해야 해요.
      </p>

      <GreenBox title="환수 구조 요약">
        원금 반환: 부정수급한 실업급여 전액<br />
        추가징수: 원금의 2~5배 (위반 정도에 따라 차등)<br />
        일반적 총 부담: 원금 x 3배 (원금 + 추가징수 2배)
      </GreenBox>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="환수 대응 준비가 됐어요. 이의신청이나 분할납부 절차를 진행하세요."
        partialMatchText="아직 확인하지 못한 항목이 있어요. 빠뜨리지 말고 하나씩 따져봐요."
      />

      <Divider />

      {/* 섹션 2: 환수금 계산 */}
      <H2>반환 금액과 추가징수, 구체적으로 얼마인가요?</H2>

      <p style={body}>
        계산 자체는 단순해요.
        부정수급 일수에 1일 수급액을 곱하면 원금이 나오고, 거기에 추가징수 배율을 적용하면 총 부담액이 되죠.
        2026년 기준 1일 수급액은 하한액 <strong>66,048원</strong>에서 상한액 <strong>68,100원</strong> 사이예요.
      </p>
      <p style={body}>
        30일간 부정수급했고 1일 수급액이 66,048원이라면 원금은 약 198만 원이에요.
        여기에 2배 추가징수가 붙으면 약 396만 원이 더해지니까 총 약 594만 원을 내야 하죠.
        수급액이 높았거나 기간이 길수록 금액이 눈덩이처럼 불어나요.
      </p>
      <p style={body}>
        여기서 끝이 아니에요.
        부정수급 시점 이후 남은 수급기간에 대해서도 <strong>급여 지급이 정지</strong>돼요.
        30일 부정수급이 적발되면 환수금만 내는 게 아니라 나머지 수급일수까지 전부 날아가죠.
        돈을 돌려내고, 앞으로 받을 돈도 사라지니까 손해가 이중으로 발생하는 구조예요.
      </p>

      <Calculator
        title="부정수급 환수금 예상 계산"
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="추가징수 배율은 위반 정도에 따라 2~5배까지 차등 적용돼요. 위 계산은 2배 기준이에요."
      />

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 대표적 부정수급 유형 */}
      <H2>환수 대상이 되는 부정수급 유형</H2>
      <SectionBadge>적발 유형 정리</SectionBadge>

      <p style={body}>
        환수 대상이 되는 유형 중 가장 많은 건 <strong>취업 사실 미신고</strong>예요.
        알바든 프리랜서든 소득활동을 하면서 고용센터에 알리지 않고 실업급여를 계속 받으면 부정수급이 되죠.
        건강보험 자격 변동이나 국세청 소득자료로 자동 적발되는 경우가 대부분이에요.
      </p>
      <p style={body}>
        두 번째는 <strong>구직활동 허위 보고</strong>예요.
        실업인정일에 구직활동 내역을 제출해야 하는데, 하지 않은 면접이나 교육을 했다고 거짓으로 올리면 적발 대상이 되죠.
        고용센터가 해당 기업에 확인 전화를 하거나 출결 기록을 대조하면 바로 드러나요.
      </p>
      <p style={body}>
        세 번째는 <strong>이직 사유 허위 기재</strong>예요.
        자발적 퇴사인데 권고사직으로 이직확인서를 꾸며서 수급 자격을 얻은 경우죠.
        이때는 사업주도 공동 책임을 지게 되고, 사업주에게 최대 300만 원의 과태료가 부과돼요.
      </p>

      <BorderBox title="환수 대상 부정수급 대표 유형">
        취업 사실 미신고: 알바·프리랜서 등 소득활동 중 급여 수급<br />
        구직활동 허위 보고: 하지 않은 면접·교육을 실적으로 제출<br />
        이직 사유 허위 기재: 자발적 퇴사를 권고사직으로 조작
      </BorderBox>

      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 분할납부와 이의신청 */}
      <H2>분할납부와 이의신청 절차 안내</H2>

      <p style={body}>
        환수금을 한꺼번에 내기 어려운 상황이라면{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a> 또는 관할 고용센터에 <strong>분할납부</strong>를 신청할 수 있죠.
        경제적 곤란 사정을 소명하면 최대 24개월까지 나눠서 낼 수 있죠.
        천재지변이나 중대 질병 같은 특수 사정이 있으면 납부 유예까지 가능해요.
      </p>
      <p style={body}>
        분할납부가 승인됐더라도 매회 납부 기한을 반드시 지켜야 해요.
        한 번이라도 기한을 넘기면 분할납부 약정이 해지되고, 남은 금액 전체를 즉시 내야 하죠.
        국세징수법에 따라 강제징수가 시작되면 급여 압류, 예금 압류, 부동산 압류까지 진행될 수 있으니 주의하세요.
      </p>
      <p style={body}>
        환수 결정 자체가 부당하다고 느낀다면 <strong>고용보험심사위원회</strong>에 <a href="/w/실업급여-이의신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>심사청구</a>를 할 수 있죠.
        통보일로부터 90일 이내에 청구해야 하고, 심사 결과에 불복하면 재심사청구나 행정소송으로 다툴 수 있죠.
        부정수급이 아니라 단순 착오였다는 소명이 받아들여지면 추가징수가 감면되거나 취소되는 경우도 있고요.
      </p>

      <GreenBox title="납부가 어렵거나 이의가 있을 때">
        분할납부: 고용센터 신청, 최대 24개월 분납<br />
        납부 유예: 천재지변·중대 질병 등 특수 사정 시 가능<br />
        이의신청: 통보일로부터 90일 이내 심사청구
      </GreenBox>

      <Divider />

      {/* 섹션 5: 부정수급 이후 영향 */}
      <H2>이의신청 후에도 이력은 남으니 주의하세요</H2>

      <p style={body}>
        환수 처분을 받으면 당장의 금전 부담에서 끝나지 않아요.
        고용보험법 제61조에 따라 부정수급일 이후의 잔여 수급기간에 대해 <strong>급여 지급이 정지</strong>되죠.
        남은 수급일이 60일이었다면 그 60일치를 아예 못 받게 돼요.
      </p>
      <p style={body}>
        나중에 실업급여를 다시 신청할 때도 불이익이 따라와요.
        부정수급 이력 자체가 수급자격을 완전히 차단하진 않지만, 고용센터 심사에서 훨씬 꼼꼼한 검증을 받게 되죠.
        구직활동 내역에 대한 확인 강도가 확실히 올라가요.
      </p>
      <p style={body}>
        금액이 크거나 반복 부정수급이면 형사처벌까지 갈 수 있죠.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제116조</a>에 따라
        <strong>3년 이하 징역 또는 3천만 원 이하 벌금</strong>이 가능하죠.
        고용노동부는 매년 부정수급 집중 점검 기간을 운영하고 있고, 적발 건수가 해마다 늘어나는 추세예요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 환수와 부정수급에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 부정수급 여부와 추가징수 배율은 고용센터 조사 결과에 따라 개별적으로 결정되니, 통보를 받았다면 고용센터(1350)에 먼저 상담하세요." />
    </ArticleLayout>
  );
}
