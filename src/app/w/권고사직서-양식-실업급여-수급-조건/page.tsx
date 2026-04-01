"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 회사에서 "그만두지 않겠냐"고 권유받은 근로자가 "양식에 뭘 써야 실업급여를 못 잃지?" 걱정하는 상황
// Q2. 권고사직 합의서에 필수 문구 확인 후 서명, 이직확인서 점검까지 마치기
// Q3. 합의서 필수 기재사항 4가지, 실업급여 조건, 이직확인서 확인, 서명 전 체크리스트
// Q4. Checklist(서명 전 점검) + GreenBox(합의서 필수 항목) + Steps(실업급여 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Checklist, Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const SIGN_CHECKLIST = [
  "합의서에 '회사의 권고에 의한 퇴직'이라는 문구가 있나요?",
  "퇴직일이 정확한 날짜로 명시돼 있나요?",
  "퇴직금 금액과 지급일이 적혀 있나요?",
  "미지급 급여(월급, 연차, 상여금) 정산 내용이 있나요?",
  "경력증명서를 퇴직 전에 발급받았나요?",
  "'추가 분쟁 제기 불가' 조항의 범위가 너무 넓지 않나요?",
];

const STEPS = [
  {
    title: "이직확인서 확인",
    desc: "퇴직 후 10일 이내에 회사가 고용센터에 이직확인서를 제출해요. 고용24(ei.go.kr)에서 '권고사직'으로 기재됐는지 반드시 확인하세요.",
    tip: "'자발적 퇴사'로 잘못 나오면 고용센터에 정정 요청하세요",
    link: { label: "고용24 바로가기", href: "https://www.ei.go.kr" },
  },
  {
    title: "고용센터 구직 신청",
    desc: "거주지 관할 고용센터에 방문하거나 온라인으로 구직 신청을 해요. 신분증, 통장 사본을 준비하세요.",
  },
  {
    title: "수급자격 인정 + 교육 이수",
    desc: "고용센터에서 수급자격을 인정받고, 수급자 설명회(온라인 교육)를 이수해요. 약 1주일 걸려요.",
  },
  {
    title: "실업급여 수급 시작",
    desc: "인정 후 7일 대기기간이 지나면 구직급여가 입금돼요. 4주마다 실업인정(구직활동 보고)을 해야 계속 받을 수 있어요.",
  },
];

const FAQS = [
  { q: "권고사직하면 실업급여 못 받는 거 아닌가요?", a: "아니에요. 권고사직은 회사의 권유니까 비자발적 퇴사예요. 고용보험 180일 이상 가입했으면 실업급여 대상이에요." },
  { q: "합의서에 '자발적 퇴사'라고만 쓰여 있으면요?", a: "실업급여를 못 받을 수 있어요. 반드시 '회사의 경영상 이유' 또는 '회사 권고에 의한 퇴직'이라는 문구가 들어가야 해요." },
  { q: "이직확인서를 회사가 안 내주면요?", a: "퇴직 후 10일이 지났는데 안 냈으면 고용센터에 신고하세요. 고용센터에서 회사에 독촉해줘요." },
  { q: "합의서 서명을 당일에 해야 하나요?", a: "아니에요. 바로 서명할 의무가 없어요. 검토할 시간을 달라고 하세요. 노무사 상담 후 서명해도 되죠." },
  { q: "위로금(합의금)을 받으면 실업급여에 영향이 있나요?", a: "위로금은 실업급여와 별개예요. 퇴직금과 별도로 위로금을 받았다고 실업급여가 줄거나 안 나오지 않아요." },
  { q: "2026년 실업급여 하한액은 얼마인가요?", a: "최저시급 10,320원 기준 일 66,048원이에요. 나이와 가입기간에 따라 120~270일간 받을 수 있어요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "고용보험법", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24: 실업급여 안내", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "권고사직-실업급여-신청-방법", title: "권고사직 실업급여 신청 방법", description: "권고사직 후 실업급여 신청 절차를 상세히 정리했어요." },
  { slug: "이직확인서-발급", title: "이직확인서 발급", description: "이직확인서가 뭔지, 안 나올 때 대처법을 정리했어요." },
  { slug: "실업급여-수급자격", title: "실업급여 수급자격", description: "실업급여를 받을 수 있는 조건을 전체적으로 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 실업급여 · 권고사직</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        권고사직 합의서, 서명 전에 꼭 확인하세요<br />
        양식 필수 항목과 실업급여 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사에서 "그만두지 않겠어?"라고 말하면 당황스럽죠. 이게 권고사직이에요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서는
        회사의 권유로 퇴직한 경우를 비자발적 퇴사로 봐서 실업급여를 받을 수 있어요.
        하지만 합의서를 잘못 쓰면 자발적 퇴사로 처리돼서 실업급여가 날아갈 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>서명 전 반드시 점검하세요</H2>
      <p style={body}>
        합의서에 서명하기 전에 이 항목들을 하나씩 확인하세요. 빠진 게 있으면 회사에 추가를 요청하면 돼요.
      </p>

      <Checklist items={SIGN_CHECKLIST} />

      <H2>합의서에 꼭 들어가야 할 4가지</H2>
      <p style={body}>
        이 4가지가 빠지면 나중에 "자발적 퇴사"로 분류될 수 있어요. 실업급여와 직결되는 문제예요.
      </p>

      <GreenBox>
        <strong>1. 회사 권고 사실</strong>: "회사의 경영상 어려움에 따른 인원 감축으로 퇴직을 권고함"<br />
        <strong>2. 근로자 동의</strong>: "위 권고에 동의하여 퇴직함"<br />
        <strong>3. 퇴직일</strong>: "2026년 O월 O일을 퇴직일로 함" (정확한 날짜)<br />
        <strong>4. 퇴직금·미지급 급여</strong>: 금액과 지급일 명시 (분쟁 예방)
      </GreenBox>

      <H2>실업급여 받는 절차</H2>
      <p style={body}>
        합의서 서명 후 바로 할 일이에요. 이직확인서 확인이 가장 중요해요.
      </p>

      <Steps steps={STEPS} />

      <BorderBox>
        <strong>핵심 주의사항</strong> — 이직확인서에 '권고사직' 또는 '경영상 이유'로 기재됐는지 반드시 확인하세요.
        '자발적 퇴사'로 잘못 나오면 실업급여를 못 받아요. 잘못됐으면 고용센터(1350)에 정정 요청하면 돼요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 고용보험법 기준으로 작성됐어요. 구체적인 사안은 노무사 상담이나 고용센터(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
