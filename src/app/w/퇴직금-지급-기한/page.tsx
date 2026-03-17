"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직한 지 14일이 넘었는데 퇴직금이 안 들어왔어요" },
  { id: "c2", label: "회사에 지급 요청했는데 계속 미루고 있어요" },
  { id: "c3", label: "지급 기한 연장에 서면으로 동의한 적이 없어요" },
  { id: "c4", label: "퇴직 후 아직 3년이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 100, max: 5000, step: 100, defaultValue: 500, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "days", label: "14일 초과 지연 일수", min: 1, max: 365, step: 1, defaultValue: 60, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.2 * v.days / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "총 청구 금액 (원금 + 이자)",
    getValue: (v: Record<string, number>) => {
      const interest = Math.round(v.amount * 10000 * 0.2 * v.days / 365);
      return v.amount * 10000 + interest;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서 또는 재직증명서", required: true, where: "회사 인사팀" },
  { name: "퇴직일 증빙 (사직서·해고통지서)", required: true, where: "본인 보관 또는 인사팀" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "지급 요청 문자·메일 기록", required: false, where: "직접 캡처 보관" },
];

const STEPS = [
  {
    title: "14일 기한 확인",
    desc: "퇴직일 다음 날부터 14일째 되는 날이 지급 마감이에요. 3월 1일 퇴직이면 3월 15일이 기한이죠. 이 날까지 입금이 없으면 지연이자 계산이 시작돼요.",
    tip: "공휴일이나 주말이 기한이어도 그날 안에 지급해야 해요",
  },
  {
    title: "문자·메일로 지급 요청",
    desc: "구두 요청보다 문자·메일로 '퇴직금 지급 기한이 지났다'고 통보하세요. 증거가 남아 나중에 유리해요. '○월 ○일 기준으로 14일이 경과했다'고 날짜를 명시하세요.",
    tip: "이 단계에서 해결되는 경우도 많아요",
  },
  {
    title: "내용증명 발송",
    desc: "문자 요청 후에도 응답 없으면 내용증명을 보내요. '퇴직금 미지급으로 연 20% 지연이자와 함께 고용노동부에 신고할 예정'이라는 내용이면 충분해요. 소멸시효 중단 효과도 있어요.",
    tip: "우체국 또는 카카오 전자내용증명으로 간편 발송",
  },
  {
    title: "고용노동부 진정 접수",
    desc: "그래도 안 주면 고용노동부 민원마당에서 온라인으로 임금체불 진정을 접수해요. 근로감독관이 조사해 시정 명령을 내리고, 이행하지 않으면 형사 처벌까지 가요.",
    tip: "minwon.moel.go.kr → 민원신청 → 임금체불 진정",
  },
];

const CHECKLIST = [
  "퇴직일 정확히 확인: 14일 기한 계산 기준",
  "IRP 계좌 개설 확인: 300만원 초과 시 IRP로만 받아요",
  "지급 요청 증거 보관: 문자·메일·카카오톡",
  "지연이자 계산: 14일 초과 시점부터 연 20%",
  "소멸시효 3년: 퇴직일 기준 3년 내 청구 필수",
];

const FAQS = [
  {
    q: "퇴직금 지급 기한이 정확히 언제인가요?",
    a: "퇴사일 다음 날부터 14일째 되는 날까지예요. 근로기준법 제36조에 명시된 기한이에요.",
  },
  {
    q: "지급 기한 연장이 가능한가요?",
    a: "당사자 간 서면 합의가 있으면 연장 가능해요. 하지만 회사가 일방적으로 연장하는 건 불법이에요. 반드시 서면 동의가 있어야 해요.",
  },
  {
    q: "지연이자는 자동으로 붙나요?",
    a: "법적으로 자동 발생하지만, 진정·소송 과정에서 명시적으로 청구해야 실제로 받을 수 있어요. 신고 시 지연이자도 함께 요청하세요.",
  },
  {
    q: "14일이 지났는데 회사가 '자금이 없다'고 하면?",
    a: "그건 회사 사정이에요. 법적 의무는 변하지 않아요. 내용증명 발송 후 노동청에 신고하면 돼요.",
  },
  {
    q: "회사가 폐업하면 받을 수 없나요?",
    a: "체당금 제도로 정부에서 대신 지급받을 수 있어요. 고용노동부에 체당금 신청을 하면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조: 퇴직 후 14일 이내 금품 청산 의무", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조: 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 임금체불 진정 접수", url: "https://minwon.moel.go.kr" },
      { label: "고용노동부: 퇴직금 지급 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 연 20%, 받는 방법", description: "지연이자 계산법과 청구 방법을 정리했어요." },
  { slug: "퇴직금-지급-기한-초과", title: "퇴직금 지급 기한 초과 대응", description: "노동청 진정 접수부터 처리 과정까지 안내해요." },
  { slug: "퇴직금-지급-기한-연장", title: "퇴직금 지급 기한 연장", description: "연장 조건과 동의서 주의사항." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-지급-기한" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지급기한 · 지연이자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 지급 기한 14일, 넘기면 어떻게 되나요?<br />
        지연이자 계산부터 신고까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 퇴직 후 14일 이내에 줘야 해요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a>가
        명시한 기한이고, 이걸 어기면 바로 위법이에요.
        14일이 지나면 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>가 붙고,
        형사 처벌까지 가능해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지금 14일 기한을 넘긴 상황인가요?</H2>
      <p style={body}>
        14일 기한은 퇴직일 다음 날부터 시작해요. 3월 1일 퇴직이면 3월 15일까지가 기한이죠.
        이 날까지 IRP 또는 일반 계좌로 입금이 안 됐다면 법적 위반이에요.
      </p>
      <p style={body}>
        당사자 합의로 기한을 연장할 수는 있어요. 하지만 서면 동의가 있어야 하고,
        회사가 일방적으로 "다음 달에 준다"고 하는 건 합의가 아니에요.
        구두로 동의했더라도 서면이 없으면 효력이 없어요.
      </p>

      <GreenBox title="14일 기한 계산 예시">
        3월 1일 퇴직 → 3월 2일 기산 → 3월 15일까지 지급 필수<br />
        14일 초과 시 연 20% 지연이자 자동 발생<br />
        소멸시효: 퇴직일로부터 3년
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지연이자 청구 및 신고가 가능해요. 아래 계산기로 이자를 먼저 확인하세요."
        partialMatchText="상황이 다를 수 있어요. 고용노동부(1350)에 먼저 상담해보세요."
      />

      <Divider />

      <H2>지연이자, 얼마나 받을 수 있을까?</H2>
      <p style={body}>
        14일 초과 시 연 20% 이자가 붙어요. 퇴직금 500만원을 60일 지연하면 이자만 약 16만원이에요.
        기간이 길어질수록 금액도 커지니 빨리 청구하는 게 유리해요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 연 20% 기준. 퇴직 후 14일 초과 시점부터 계산해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>신고에 필요한 서류</H2>
      <p style={body}>
        서류가 많지 않아도 진정 접수는 가능해요. 핵심은 근무 사실과 미지급 사실 두 가지예요.
        지급 요청 기록(문자·메일)도 꼭 보관해두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>14일 초과 시 대응 절차 4단계</H2>
      <p style={body}>
        단계를 순서대로 밟으면 대부분 2~3단계에서 해결돼요.
        증거도 쌓이고 협상력도 올라가요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>신고 전 준비 체크리스트</H2>
      <p style={body}>
        빠르게 처리하려면 아래 항목을 미리 챙겨두세요.
        소멸시효 3년을 놓치지 않도록 빨리 행동하는 게 중요해요.
      </p>

      <SectionBadge>대응 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="소멸시효 3년, 반드시 챙기세요">
        퇴직금과 지연이자 청구권 모두 퇴직일로부터 3년이 지나면 소멸해요.<br />
        미루다 놓치지 말고, 내용증명 발송만으로도 시효를 끊을 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 지급 기한에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
