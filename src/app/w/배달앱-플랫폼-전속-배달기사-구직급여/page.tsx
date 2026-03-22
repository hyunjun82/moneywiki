"use client";

// Q1. 배달앱(배민·쿠팡이츠 등) 전속 배달기사가 일을 그만둔 후 구직급여를 받을 수 있는지 궁금한 상황
// Q2. 내가 고용보험 가입 대상인지 확인하고, 구직급여 신청 절차를 밟는다
// Q3. 전속·비전속 구분, 고용보험 적용 기준, 구직급여 수급 요건, 신청 방법, 금액 계산
// Q4. EligibilityChecker(자격 확인) + Steps(신청 절차) + GreenBox(핵심 기준) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY = [
  { id: "e1", label: "특정 배달 플랫폼 1곳과 전속 계약을 맺었다" },
  { id: "e2", label: "고용보험에 가입되어 있었다 (가입 이력 확인 가능)" },
  { id: "e3", label: "이직일 이전 18개월 중 피보험기간 180일 이상이다" },
  { id: "e4", label: "본인 의사가 아닌 비자발적 사유로 일을 그만뒀다" },
  { id: "e5", label: "재취업 의사가 있고 적극적으로 구직 활동을 할 수 있다" },
];

const STEPS_DATA = [
  { title: "고용보험 가입 이력 확인", desc: "고용보험 홈페이지(ei.go.kr)에서 피보험자격 이력을 조회해요. 전속 기사라면 플랫폼 회사가 가입해뒀을 수 있어요." },
  { title: "이직확인서 발급 요청", desc: "플랫폼 회사에 이직확인서 발급을 요청해요. 회사가 14일 내에 발급하지 않으면 고용센터에 신고할 수 있어요." },
  { title: "워크넷 구직 등록", desc: "워크넷(work.go.kr)에서 구직 신청을 해요. 이력서를 등록하고 구직 활동을 시작해야 해요." },
  { title: "고용센터 실업신고", desc: "관할 고용센터를 방문해서 수급자격 인정 신청(실업신고)을 해요. 신분증과 이직확인서를 가져가세요." },
  { title: "구직급여 수급", desc: "실업인정일마다 고용센터에서 구직활동 확인을 받으면 구직급여가 지급돼요." },
];

const FAQS = [
  { q: "비전속 배달기사도 구직급여를 받을 수 있나요?", a: "비전속 기사는 고용보험 임의가입이에요. 가입하지 않았다면 구직급여 수급이 어렵지만, 2022년부터 특수형태근로종사자도 고용보험 적용이 확대돼서 가입 여부를 꼭 확인해보세요." },
  { q: "전속과 비전속 구분 기준이 뭔가요?", a: "하나의 플랫폼에서만 배달하는 계약이면 전속이에요. 여러 플랫폼을 동시에 쓸 수 있으면 비전속이에요. 계약서를 확인해보세요." },
  { q: "자발적으로 그만뒀는데 구직급여 안 되나요?", a: "원칙적으로 자발적 퇴사는 안 돼요. 하지만 임금 체불, 근로조건 저하, 건강 악화 등 정당한 사유가 있으면 비자발적으로 인정될 수 있어요." },
  { q: "구직급여 금액은 얼마나 되나요?", a: "이직 전 평균임금의 60%예요. 상한액은 1일 6만 6,000원(2026년 기준)이고 하한액은 최저임금의 80%예요." },
  { q: "고용보험료는 누가 내나요?", a: "근로자와 사업주가 반반씩 내요. 전속 배달기사의 경우 플랫폼 회사가 사업주 부담분을, 기사가 근로자 부담분을 내요." },
  { q: "플랫폼에서 이직확인서를 안 줘요", a: "고용보험법에 따라 14일 이내 발급 의무가 있어요. 안 주면 관할 고용센터(1350)에 신고하면 고용센터에서 직접 확인해요." },
];

const SOURCES = [
  { name: "고용보험법 제40조", href: "https://www.law.go.kr/법령/고용보험법" },
  { name: "고용노동부 특수형태근로종사자 고용보험 안내", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "실업급여-조건", title: "실업급여 수급 조건", description: "구직급여 받을 수 있는 자격 요건 정리." },
  { slug: "실업급여-금액", title: "실업급여 금액 계산", description: "구직급여 일일 수급액과 수급 기간." },
  { slug: "고용보험-가입기간-합산", title: "고용보험 가입기간 합산", description: "여러 직장 가입 기간을 합산하는 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 실업급여 · 플랫폼 노동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        배달기사도 구직급여 받을 수 있을까?<br />
        전속 기사 고용보험과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        배달앱에서 일하다 그만뒀는데, 실업급여를 받을 수 있는 건지 헷갈리죠.
      </p>
      <p style={body}>
        전속 배달기사라면 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라 고용보험이 적용돼요. 피보험기간 180일 이상이고 비자발적 이직이면 구직급여를 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>구직급여 받을 수 있는지 확인해보세요</H2>
      <p style={body}>
        아래 조건을 모두 충족해야 구직급여 수급이 가능해요.
      </p>

      <SectionBadge>구직급여 수급 자격</SectionBadge>
      <EligibilityChecker items={ELIGIBILITY} allMatchText="구직급여 수급 자격이 될 가능성이 높아요" partialMatchText="일부 조건이 부족해요. 고용센터에서 확인해보세요" />

      <CategoryButton label="고용 정보" count={10} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>전속 기사와 비전속 기사, 뭐가 다를까?</H2>
      <p style={body}>
        고용보험 적용 여부가 달라져요.
      </p>

      <GreenBox title="전속 vs 비전속">
        전속 기사: 1개 플랫폼 전속 계약 → 고용보험 의무 가입 → 구직급여 가능{"\n"}
        비전속 기사: 여러 플랫폼 자유 활동 → 고용보험 임의가입 → 가입했다면 가능{"\n"}
        2022년부터 특수형태근로종사자 고용보험 확대 적용 중
      </GreenBox>

      <p style={body}>
        비전속이라도 고용보험에 가입한 이력이 있으면 구직급여를 받을 수 있어요. <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험 홈페이지</a>에서 가입 이력을 먼저 조회해보세요.
      </p>

      <Divider />

      <H2>구직급여 신청 절차</H2>
      <p style={body}>
        자격이 되면 아래 순서대로 진행하세요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>배달기사 구직급여에서 자주 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 고용노동부 안내를 바탕으로 작성했어요. 개별 계약 형태에 따라 적용이 달라질 수 있으니, 관할 고용센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
