"use client";

// Q1. 실업급여를 못 받는 상황에서 다른 지원금이 없나 찾아보는 실업자(프리랜서·아르바이트·고용보험 미가입자)
// Q2. 구직촉진수당 자격 조건을 확인하고 고용센터 또는 온라인으로 신청하는 행동
// Q3. 1유형·2유형 차이, 소득·재산 기준(중위소득 60%), 청년 특례, 신청 절차, 지급일
// Q4. EligibilityChecker(자격확인) + Steps(신청절차) + GreenBox(핵심요약) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";
import { Steps } from "@/components/article-ui/Steps";
import { CompareTable } from "@/components/article-ui/CompareTable";

const ELIGIBILITY_ITEMS = [
  { id: "age", label: "15~69세 사이예요" },
  { id: "job", label: "현재 실업 상태예요" },
  { id: "income", label: "가구 중위소득 60% 이하 (또는 18~34세 청년)" },
  { id: "asset", label: "가구 재산 4억원 이하예요" },
  { id: "insurance", label: "고용보험 실업급여를 받고 있지 않아요" },
];

const APPLY_STEPS = [
  { title: "고용24 접속 또는 고용센터 방문", desc: "work24.go.kr에서 온라인 신청하거나 관할 고용센터에 방문해요.", tip: "전화 문의는 국번 없이 1350" },
  { title: "신청서 작성·서류 제출", desc: "신분증, 주민등록등본, 소득·재산 증빙서류를 제출해요." },
  { title: "취업활동계획 수립", desc: "담당 상담사와 1:1 면담 후 구직 활동 계획을 함께 세워요." },
  { title: "매월 구직활동 이행", desc: "계획에 따라 구직활동을 하고 이행보고서를 제출하면 매월 25일경 수당이 입금돼요." },
];

const COMPARE_ROWS = [
  { label: "대상", optionA: "저소득층·청년(중위소득 60% 이하)", optionB: "소득 기준 초과자" },
  { label: "구직촉진수당", optionA: "월 60만원 (최대 6개월)", optionB: "없음" },
  { label: "취업지원서비스", optionA: "1:1 상담 + 훈련비 최대 300만원", optionB: "1:1 상담 + 훈련비 최대 300만원" },
  { label: "부양가족 추가", optionA: "1인당 월 10만원 (최대 40만원)", optionB: "없음" },
  { label: "조기취업성공수당", optionA: "잔여 수당 50% 일시금", optionB: "취업성공수당 별도" },
];

const FAQS = [
  { q: "구직촉진수당과 실업급여를 동시에 받을 수 있나요?", a: "안 돼요. 실업급여 수급 자격이 있으면 실업급여부터 받아야 하고, 동시 수급은 불가능해요." },
  { q: "청년은 소득 관계없이 받을 수 있나요?", a: "네. 18~34세 청년은 소득·재산 기준 없이 1유형 특례 대상이에요. 청년 실업 대책으로 문턱을 낮춘 거예요." },
  { q: "구직촉진수당 지급일이 정확히 언제예요?", a: "매월 25일경이에요. 구직활동 이행 확인 후 다음 달에 입금되는 구조예요." },
  { q: "수급 중에 취업하면 어떻게 되나요?", a: "취업 시 잔여 수당의 50%를 조기취업성공수당으로 한꺼번에 받아요. 빨리 취업할수록 유리해요." },
  { q: "6개월 다 받고 나면 연장 가능한가요?", a: "기본 6개월이고 최대 1년까지 연장될 수 있어요. 취업활동계획 수립 시 담당자와 협의하세요." },
  { q: "가구원 소득이 아니라 본인 소득만 보나요?", a: "가구 전체 소득을 봐요. 배우자·부모님과 같이 사는 경우 가구원 소득이 합산돼요. 청년 특례는 예외고요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국민취업지원제도 안내(고용24)", url: "https://www.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systId=SI00000316" },
      { label: "고용보험법(법제처)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용노동부 국민취업지원제도", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여", title: "실업급여 수급 조건과 금액", description: "고용보험 가입자라면 실업급여 자격을 먼저 확인하세요." },
  { slug: "2026년-실업급여", title: "2026년 실업급여 달라진 점", description: "상한액 인상 등 2026년 변경사항을 정리했어요." },
  { slug: "2026년-달라지는-제도", title: "2026년 달라지는 제도", description: "고용·복지·세금 등 2026년 주요 제도 변경을 모았어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 취업지원 · 실업</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        구직촉진수당, 월 60만원 받을 수 있을까?<br />
        자격 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        고용보험에 안 들어서 <a href="/w/실업급여" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여</a>를
        못 받으시죠? 프리랜서, 자영업자, 아르바이트생이라면 구직촉진수당을 받을 수 있어요.
        국민취업지원제도 1유형에 해당하면 월 60만원씩 최대 6개월, 총 360만원이에요.
        부양가족이 있으면 1인당 월 10만원(최대 40만원)이 추가되고요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>1유형 자격, 내가 해당되나요?</H2>
      <p style={body}>
        구직촉진수당은 국민취업지원제도 1유형 참여자만 받아요.
        <a href="https://www.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systId=SI00000316" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인 자격 확인이 가능하고,
        아래 항목을 모두 충족하면 신청할 수 있어요.
        18~34세 청년은 소득·재산 기준 없이 특례 대상이에요.
      </p>

      <SectionBadge>자격 자가진단</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="1유형 자격 조건에 부합해요. 고용센터에서 최종 확인받으세요."
        partialMatchText="일부 조건이 부족해요. 청년 특례 또는 2유형 대상인지 고용센터에서 확인해보세요."
      />

      <Divider />

      <H2>1유형과 2유형, 뭐가 다른가요?</H2>
      <p style={body}>
        국민취업지원제도는 1유형과 2유형으로 나뉘어요.
        핵심 차이는 구직촉진수당 지급 여부예요.
        1유형은 수당 + 취업지원서비스, 2유형은 취업지원서비스만 받아요.
      </p>

      <SectionBadge>1유형 vs 2유형 비교</SectionBadge>
      <CompareTable titleA="1유형" titleB="2유형" rows={COMPARE_ROWS} />

      <Divider />

      <H2>신청은 어떻게 하나요?</H2>
      <p style={body}>
        온라인이나 고용센터 방문으로 신청해요.
        신청 후 담당 상담사와 취업활동계획을 세우고, 매월 이행하면 수당이 나와요.
      </p>

      <SectionBadge>신청 절차 4단계</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <Divider />

      <H2>수급 중 취업하면 보너스가 나와요</H2>
      <p style={body}>
        수당을 받는 중에 취업하면 조기취업성공수당을 받아요.
        남은 수당의 50%를 한꺼번에 지급하는 구조예요.
        예를 들어 3개월 받고 취업하면 남은 3개월분(180만원)의 50%인 90만원을 받게 돼요.
      </p>

      <GreenBox title="직업훈련비도 지원돼요">
        1유형 참여자는 최대 300만원까지 직업훈련비를 지원받아요.
        훈련 기간 중 훈련수당 월 최대 28.4만원도 별도로 나오고요.
        새로운 기술을 배워서 취업 경쟁력을 높이는 데 활용하세요.
      </GreenBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <RelatedArticles articles={RELATED} />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용노동부 및 고용24 공개 자료를 바탕으로 작성했어요. 개인별 자격 여부는 관할 고용센터(1350)에서 최종 확인하세요." />
    </ArticleLayout>
  );
}
