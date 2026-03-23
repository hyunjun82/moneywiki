"use client";

// Q1. 퇴사 직후 실업급여를 받고 싶은데 어디서 어떻게 신청하는지 모르는 상태
// Q2. 고용24 온라인 + 고용센터 방문으로 실업급여 신청을 완료한다
// Q3. 신청 기한(12개월), 3단계 절차(구직등록→온라인교육→고용센터 방문), 필요 서류, 2026년 하한액 66,048원
// Q4. Steps(절차) + DocTable(서류) + EligibilityChecker(자격 확인) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";

const STEPS = [
  { title: "워크넷 구직등록", desc: "고용24(work24.go.kr)에 접속해서 구직신청부터 해요. 이력서 등록하고 희망 직종을 입력하면 돼요.", tip: "구직등록 없이는 실업급여 신청 자체가 안 돼요" },
  { title: "온라인 교육 이수", desc: "고용24에서 수급자격 신청 온라인 교육을 들어요. 약 1시간 정도 걸려요. 실업급여 제도와 구직활동 의무를 안내받아요.", tip: "교육 이수 완료 후 고용센터 방문 가능" },
  { title: "고용센터 방문 신청", desc: "거주지 관할 고용센터에 직접 방문해서 수급자격 인정 신청을 해요. 이 단계는 반드시 오프라인이어야 해요.", tip: "신분증, 통장사본 꼭 챙기세요" },
  { title: "수급자격 인정 통보", desc: "고용센터 심사 후 인정 여부가 통보돼요. 인정되면 1~4주 대기기간 이후 첫 실업급여가 지급돼요.", tip: "대기기간 중에도 구직활동은 해야 해요" },
];

const DOCS = [
  { name: "신분증", required: true, where: "주민센터 또는 본인 소지" },
  { name: "이직확인서", required: true, where: "전 직장에서 발급 (고용24에서 확인 가능)" },
  { name: "통장사본", required: true, where: "본인 명의 계좌" },
  { name: "퇴직증명서", required: false, where: "전 직장에서 발급" },
  { name: "근로계약서", required: false, where: "본인 소지 또는 전 직장 요청" },
];

const ELIGIBILITY = [
  { id: "insurance", label: "고용보험 가입기간 180일 이상이에요" },
  { id: "involuntary", label: "비자발적 퇴사예요 (권고사직, 계약만료, 정당한 사유 등)" },
  { id: "willwork", label: "재취업 의사와 능력이 있어요" },
  { id: "register", label: "워크넷에 구직등록을 했어요" },
  { id: "deadline", label: "퇴직일로부터 12개월이 지나지 않았어요" },
];

const FAQS = [
  { q: "실업급여 신청 기한이 언제까지예요?", a: "퇴사 다음 날부터 12개월 이내에 신청해야 해요. 12개월이 지나면 수급권이 사라져요. 하루라도 빨리 신청하는 게 유리해요." },
  { q: "온라인으로만 신청할 수 있나요?", a: "아니에요. 온라인으로 교육 이수까지는 가능하지만, 수급자격 인정 신청은 반드시 고용센터에 직접 방문해야 해요." },
  { q: "이직확인서를 회사에서 안 내줘요", a: "고용24에서 이직확인서 미발급 신고를 할 수 있어요. 신고하면 고용센터에서 회사에 발급을 요청해요. 안 내주면 과태료가 부과돼요." },
  { q: "자발적 퇴사인데 받을 수 있나요?", a: "일반적인 자발적 퇴사는 안 돼요. 하지만 임금체불, 직장 내 괴롭힘, 통근 거리 3시간 이상 등 정당한 사유가 있으면 자발적 퇴사도 수급자격이 인정돼요." },
  { q: "2026년 실업급여 금액은 얼마예요?", a: "2026년 기준 1일 하한액 66,048원, 상한액 68,100원이에요. 퇴직 전 3개월 평균임금의 60%를 지급하되 이 범위 안에서 결정돼요." },
  { q: "대기기간이 뭔가요?", a: "수급자격 인정일로부터 7일은 대기기간이에요. 이 기간에는 급여가 지급되지 않아요. 8일째부터 실업급여를 받아요." },
];

const SOURCES = [
  { name: "고용24", href: "https://www.work24.go.kr" },
  { name: "고용보험법", href: "https://www.law.go.kr/법령/고용보험법" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "실업급여-수급자격", title: "실업급여 수급자격 조건", description: "고용보험 180일, 비자발적 퇴사 등 자격 요건 정리." },
  { slug: "실업급여-계산기", title: "실업급여 금액 계산기", description: "내 평균임금으로 받을 금액을 바로 계산해보세요." },
  { slug: "알바-실업급여", title: "알바도 실업급여 받을 수 있을까?", description: "고용보험 가입 요건과 수급자격 기준." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 실업급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 신청, 어디서 어떻게?<br />
        고용24 온라인부터 고용센터 방문까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴사하고 나면 막막하죠. 실업급여를 받고 싶은데 어디서부터 시작해야 할지 모르겠고요. 핵심은 퇴직일로부터 12개월 이내에 고용24에서 온라인 교육을 듣고, 관할 고용센터를 방문하면 돼요.
      </p>
      <p style={body}>
        2026년 기준 1일 하한액은 66,048원이에요. <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라 퇴직 전 3개월 평균임금의 60%를 받되, 상한액 68,100원을 넘지 않아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 실업급여 받을 수 있는지 먼저 체크</H2>
      <p style={body}>
        아래 조건을 모두 충족해야 실업급여를 신청할 수 있어요. 하나라도 빠지면 수급자격이 안 돼요.
      </p>
      <EligibilityChecker
        items={ELIGIBILITY}
        allMatchText="모든 조건을 충족했어요. 실업급여 신청이 가능해요!"
        partialMatchText="충족하지 않는 조건이 있으면 수급이 어려울 수 있어요."
      />

      <CategoryButton label="고용 정보" count={15} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>실업급여 신청 절차 4단계</H2>
      <p style={body}>
        구직등록부터 급여 수령까지 4단계로 진행돼요. 온라인과 오프라인을 번갈아 해야 하니까 순서를 잘 기억해두세요.
      </p>
      <SectionBadge>2026년 기준 실업급여 신청 순서</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>신청할 때 필요한 서류</H2>
      <p style={body}>
        고용센터 방문 시 준비할 서류예요. 필수 서류가 빠지면 접수가 안 되니까 미리 챙겨두세요.
      </p>
      <DocTable docs={DOCS} />
      <p style={body}>
        이직확인서는 전 직장에서 고용24에 등록하는 게 원칙이에요. 회사가 안 내주면 고용24에서 미발급 신고를 하면 돼요.
      </p>

      <Divider />

      <H2>신청 후에는 뭘 해야 하나요?</H2>
      <p style={body}>
        수급자격이 인정되면 1~4주 간격으로 실업인정일에 고용센터를 방문하거나 온라인으로 구직활동을 보고해야 해요. 실업인정을 받아야 급여가 지급돼요.
      </p>

      <GreenBox>
        실업인정은 지정된 날짜에 해야 해요. 날짜를 놓치면 그 기간 급여를 못 받아요.{"\n"}
        구직활동 증빙: 입사지원, 면접, 직업훈련 등이 인정돼요.{"\n"}
        온라인 실업인정: 고용24에서 가능 (1~3차까지)
      </GreenBox>

      <p style={body}>
        <a href="/w/실업급여-수급자격" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여 수급자격</a> 글에서 구직활동 유형별 인정 기준을 더 자세히 볼 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 고용24 안내를 바탕으로 작성했어요. 제도 변경이 있을 수 있으니 최신 정보는 고용24(1350)에서 확인해보세요." />
    </ArticleLayout>
  );
}
