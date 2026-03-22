"use client";

// Q1. 알바하다 그만뒀는데 정규직 아니라 실업급여 못 받는 건 아닌지 걱정되는 상태
// Q2. 고용보험 가입 여부를 확인하고, 수급자격 조건을 판단해서 실업급여를 신청한다
// Q3. 고용보험 가입 기준(주15시간/월60시간), 피보험기간 180일, 비자발적 퇴사 요건, 미가입 시 소급 가입 방법
// Q4. EligibilityChecker(자격 확인) + Steps(확인→신청) + GreenBox(핵심 요약) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { EligibilityChecker } from "@/components/article-ui/EligibilityChecker";

const ELIGIBILITY = [
  { id: "hours", label: "주 15시간 이상(월 60시간 이상) 일했어요" },
  { id: "period", label: "고용보험 가입기간이 180일 이상이에요" },
  { id: "involuntary", label: "비자발적으로 그만뒀어요 (계약만료, 권고사직 등)" },
  { id: "willwork", label: "재취업 의사와 능력이 있어요" },
  { id: "registered", label: "워크넷에 구직등록을 했어요" },
];

const CHECK_STEPS = [
  { title: "고용보험 가입 여부 확인", desc: "고용24(ei.go.kr)에 로그인해서 '피보험자격 이력내역'을 조회해요. 알바했던 사업장 이름이 나오면 가입된 거예요.", tip: "급여명세서에 고용보험료 공제 항목이 있는지도 확인" },
  { title: "미가입 시 소급 가입 요청", desc: "가입 대상인데 안 해줬다면 고용센터에 신고하면 돼요. 근로계약서, 급여이체 내역이 증빙이 돼요.", tip: "사업주가 미가입하면 과태료가 부과돼요" },
  { title: "실업급여 신청", desc: "수급자격이 확인되면 고용24에서 온라인 교육을 이수하고, 관할 고용센터를 방문해서 신청해요.", tip: "퇴직일로부터 12개월 이내에 신청 필수" },
];

const FAQS = [
  { q: "주 15시간 미만 알바는 아예 안 되나요?", a: "원칙적으로 고용보험 적용 제외예요. 다만 3개월 이상 계속 근무했다면 적용 대상이 될 수 있어요. 고용센터에서 개별 판단해요." },
  { q: "고용보험 가입됐는지 어떻게 확인해요?", a: "고용24(ei.go.kr)에서 피보험자격 이력을 조회하면 돼요. 알바했던 사업장명과 가입 기간이 나와요." },
  { q: "사장님이 고용보험을 안 들어줬어요", a: "가입 대상이었는데 안 해줬다면 소급 가입이 가능해요. 고용센터에 신고하면 사업주에게 가입 요청이 가고, 불응하면 과태료가 부과돼요." },
  { q: "알바 여러 곳에서 한 기간은 합산되나요?", a: "네, 고용보험 가입 기간은 여러 직장에서 일한 기간을 합산할 수 있어요. 다만 피보험기간이 겹치는 부분은 한 번만 인정돼요." },
  { q: "알바하면서 실업급여를 받을 수 있나요?", a: "주 15시간 미만의 알바는 수입을 신고하면 실업급여와 병행할 수 있어요. 다만 소득만큼 급여가 감액될 수 있어요." },
  { q: "계약 만료로 그만두면 수급자격이 되나요?", a: "네, 계약 만료는 비자발적 퇴사로 인정돼요. 계약기간이 끝나서 더 이상 일을 못 하게 된 경우에 해당해요." },
];

const SOURCES = [
  { name: "고용보험법", href: "https://www.law.go.kr/법령/고용보험법" },
  { name: "고용24", href: "https://www.ei.go.kr" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "실업급여-신청", title: "실업급여 신청 방법", description: "고용24 온라인부터 고용센터 방문까지 4단계 절차." },
  { slug: "실업급여-수급자격", title: "실업급여 수급자격 조건", description: "180일 가입, 비자발적 퇴사 등 자격 요건 정리." },
  { slug: "실업급여-계산기", title: "실업급여 금액 계산기", description: "내 평균임금으로 받을 금액 바로 계산." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 실업급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        알바도 실업급여 받을 수 있을까?<br />
        고용보험 가입 요건과 수급자격 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        알바하다 그만뒀는데 실업급여는 정규직만 받는 거 아닌지 걱정되시죠. 결론부터 말하면, 고용보험에 가입돼 있었다면 알바도 정규직과 똑같이 받을 수 있어요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라 주 15시간 이상, 월 60시간 이상 일했으면 사업주가 고용보험에 의무 가입해야 해요. 편의점이든 카페든 근무시간 조건만 맞으면 고용보험 대상이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 실업급여 받을 수 있는지 체크해보세요</H2>
      <p style={body}>
        아래 조건을 모두 충족하면 알바도 실업급여 수급자격이 생겨요.
      </p>
      <EligibilityChecker
        items={ELIGIBILITY}
        allMatchText="모든 조건을 충족했어요. 알바도 실업급여 신청이 가능해요!"
        partialMatchText="충족하지 않는 조건이 있으면 수급이 어려울 수 있어요."
      />

      <CategoryButton label="고용 정보" count={15} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>고용보험 가입 기준은 뭔가요?</H2>
      <p style={body}>
        알바의 고용보험 가입 기준은 근무시간이에요. 주 15시간 이상 또는 월 60시간 이상 일하면 사업주가 반드시 고용보험에 가입시켜야 해요. 이건 법적 의무예요.
      </p>

      <GreenBox>
        고용보험 의무 가입 기준{"\n"}
        주 15시간 이상 / 월 60시간 이상 근무{"\n"}
        편의점, 카페, 마트 등 업종 무관{"\n"}
        주 15시간 미만이라도 3개월 이상 계속 근무하면 가입 대상
      </GreenBox>

      <p style={body}>
        4대보험에 가입돼 있으면 고용보험도 포함된 거예요. 본인이 가입됐는지 모르겠으면 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 피보험자격 이력을 조회하면 바로 나와요.
      </p>

      <Divider />

      <H2>가입 확인부터 신청까지 3단계</H2>
      <p style={body}>
        고용보험 가입 여부를 먼저 확인하고, 문제가 있으면 소급 가입 후 실업급여를 신청하는 순서예요.
      </p>
      <SectionBadge>알바 실업급여 신청 흐름</SectionBadge>
      <Steps steps={CHECK_STEPS} />

      <Divider />

      <H2>사업주가 고용보험 안 들어줬다면</H2>
      <p style={body}>
        가입 대상인데 사업주가 고용보험에 안 넣어줬을 수 있어요. 이 경우 소급 가입이 가능해요.
      </p>

      <BorderBox>
        <strong>소급 가입에 필요한 증빙 서류</strong><br />
        근로계약서, 급여이체 내역, 출퇴근 기록, 문자·카톡 대화 내역 등{"\n"}
        고용센터에 신고하면 사업주에게 가입을 요청하고, 불응 시 과태료 부과
      </BorderBox>

      <p style={body}>
        증빙만 있으면 과거 근무 기간도 인정받을 수 있어요. <a href="/w/실업급여-신청" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여 신청 방법</a> 글에서 이후 절차를 이어서 볼 수 있어요.
      </p>

      <Divider />

      <H2>알바 실업급여, 이런 경우엔요?</H2>
      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 고용24 안내를 바탕으로 작성했어요. 개별 상황에 따라 수급자격이 달라질 수 있으니 관할 고용센터(1350)에서 확인해보세요." />
    </ArticleLayout>
  );
}
