"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 실업급여 외에 다른 지원금도 있다고 들었는데, 뭐가 있고 내가 뭘 받을 수 있는지 한눈에 정리된 정보가 필요한 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 본인에게 해당하는 취업촉진수당을 파악하고, 각 제도별 상세 글로 이동해서 구체적 신청까지 하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 취업촉진수당 4가지 종류, 각각의 핵심 조건·금액·신청 시점, 국민취업지원제도와의 중복 여부.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(전체 구조) + BorderBox(각 수당 요약) + Steps(조기재취업수당 조건) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const JOGI_STEPS = [
  { title: "소정급여일수 1/2 이상 남기고 취업", desc: "180일이면 90일 이상 남겨야 해요. 절반 넘게 받았으면 대상이 아니에요." },
  { title: "12개월 이상 고용 가능한 직장에 취업", desc: "고용보험에 가입되는 정규직·계약직이어야 해요. 1~2개월짜리 단기 알바는 안 돼요." },
  { title: "12개월 이상 계속 근무 후 신청", desc: "취업하자마자 신청하는 게 아니라, 12개월 근무를 채운 뒤에 고용센터나 고용24에서 신청해요.", tip: "12개월 안에 그만두면 받을 수 없어요" },
];

const FAQS = [
  { q: "조기재취업수당은 구체적으로 얼마예요?", a: "남은 소정급여일수의 구직급여 × 50%예요. 예를 들어 100일 남기고 취업했고 1일 구직급여가 66,000원이면 100 × 66,000 × 50% = 330만원이에요." },
  { q: "이전 직장에 재입사해도 받을 수 있나요?", a: "안 돼요. 퇴직한 회사에 다시 입사하면 조기재취업수당 대상이 아니에요. 관련 회사도 마찬가지예요." },
  { q: "국민취업지원제도 구직촉진수당이랑 중복돼요?", a: "안 돼요. 실업급여(고용보험)를 받고 있으면 국민취업지원제도 구직촉진수당(월 50만원)은 못 받아요. 둘 중 하나만 가능해요." },
  { q: "직업능력개발수당은 자동으로 나오나요?", a: "네. 고용센터 지시로 직업훈련을 받으면 출석률 80% 이상일 때 자동 지급돼요. 월 최대 약 116,000원이에요." },
  { q: "실업급여 끝나면 국민취업지원제도를 신청할 수 있나요?", a: "네. 실업급여 수급이 끝났는데도 취업이 안 되면 국민취업지원제도를 신청할 수 있어요. 소득·재산·취업경험 조건을 충족해야 해요." },
  { q: "취업촉진수당 4가지를 전부 받을 수 있나요?", a: "조건만 맞으면 전부 받을 수 있어요. 조기재취업수당 + 이주비를 같이 받는 것도 가능하고, 직업능력개발수당은 훈련 기간에 자동 지급돼요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "고용보험법 제64~67조(취업촉진수당)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 취업촉진수당 안내", url: "https://www.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systId=SI00000412" },
      { label: "국민취업지원제도", url: "https://www.kua.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "조기재취업-수당-신청-조건-및-금액", title: "조기재취업 수당 신청 조건과 금액", description: "빨리 취업하면 남은 실업급여 50%를 한꺼번에 받아요." },
  { slug: "광역-구직활동비-신청-조건-및-금액", title: "광역 구직활동비 신청 조건", description: "먼 곳 면접 교통비·숙박비를 지원받을 수 있어요." },
  { slug: "실업급여-이주비-신청-조건-및-금액", title: "이주비 신청 조건과 금액", description: "취업 후 이사비용을 실비로 지원받아요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 취업촉진수당</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 받으면서 추가로 받는 돈?<br />
        취업지원금 4가지 종류와 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여만 받으면 끝인 줄 알았는데, 빨리 취업하면 보너스가 나온다고요? 멀리 면접 가면 교통비도 준다고요?
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서 정한 취업촉진수당은 4가지예요.
        실업급여와 별개로 받을 수 있으니, 해당되는 게 뭔지 지금 바로 확인해보세요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>취업촉진수당, 4가지가 뭔가요?</H2>
      <p style={body}>
        실업급여(구직급여)를 받으면서 추가로 받을 수 있는 지원금이 취업촉진수당이에요.
        크게 4가지가 있고, 각각 목적과 신청 시점이 달라요.
      </p>

      <GreenBox title="취업촉진수당 4가지">
        <strong>1. 조기재취업수당</strong> — 빨리 취업하면 남은 급여의 50%를 보너스로 지급<br />
        <strong>2. 직업능력개발수당</strong> — 직업훈련 받을 때 교통비·식비 월 약 116,000원<br />
        <strong>3. 광역구직활동비</strong> — 먼 곳 면접 시 교통비·숙박비 실비 지급<br />
        <strong>4. 이주비</strong> — 취업 후 이사할 때 이사비용 실비 지급
      </GreenBox>

      <p style={body}>
        이 4가지는 서로 별개 제도라서, 조건만 맞으면 여러 개를 동시에 받을 수 있어요.
        면접 다닐 때 광역구직활동비를 받고, 취업해서 이사하면 이주비를 받고, 12개월 근무하면 조기재취업수당까지 받는 식이죠.
      </p>

      <Divider />

      <H2>조기재취업수당, 가장 금액이 커요</H2>
      <p style={body}>
        4가지 중 금액이 제일 큰 게 조기재취업수당이에요. 남은 구직급여의 50%를 한꺼번에 받는 거라서 수백만원이 될 수 있어요.
        다만 조건이 좀 까다로워요.
      </p>

      <SectionBadge>조기재취업수당 받는 조건</SectionBadge>
      <Steps steps={JOGI_STEPS} />

      <p style={body}>
        예를 들어 소정급여일수 180일 중 80일만 받고 취업했다면, 남은 100일 × 1일 구직급여 × 50%를 한꺼번에 받아요.
        1일 66,000원이면 100 × 66,000 × 50% = <strong>330만원</strong>이죠.
        자세한 신청 방법은 <a href="/w/조기재취업-수당-신청-조건-및-금액" style={{ color: "#1D9E75", textDecoration: "underline" }}>조기재취업수당 신청 조건과 금액</a> 글에서 확인하세요.
      </p>

      <Divider />

      <H2>나머지 3가지는 어떤 상황에 쓰나요?</H2>
      <p style={body}>
        직업능력개발수당은 훈련 참여하면 자동으로 나오고, 광역구직활동비와 이주비는 각각 면접·이사 상황에서 신청하는 거예요.
      </p>

      <BorderBox>
        <strong>직업능력개발수당</strong><br />
        고용센터 지시로 직업훈련을 받으면 교통비·식비 명목으로 월 최대 약 116,000원이 자동 지급돼요. 출석률 80% 이상이어야 해요. 별도 신청 불필요.
      </BorderBox>

      <BorderBox>
        <strong>광역구직활동비</strong><br />
        거주지에서 25km 이상 떨어진 곳에 면접 보러 가면 교통비·숙박비를 실비로 받아요. 고용센터 소개 면접이거나 사전 승인이 필요하고, 면접 후 14일 이내 청구해야 해요.
        → <a href="/w/광역-구직활동비-신청-조건-및-금액" style={{ color: "#1D9E75", textDecoration: "underline" }}>상세 보기</a>
      </BorderBox>

      <BorderBox>
        <strong>이주비</strong><br />
        취업 후 출퇴근이 곤란한 거리에 이사하면 이사비용을 실비로 받아요. 가족과 함께 이사하면 가산금이 붙어요.
        → <a href="/w/실업급여-이주비-신청-조건-및-금액" style={{ color: "#1D9E75", textDecoration: "underline" }}>상세 보기</a>
      </BorderBox>

      <Divider />

      <H2>국민취업지원제도는 실업급여랑 다른 건가요?</H2>
      <p style={body}>
        헷갈리는 분이 많은데, 국민취업지원제도는 고용보험 실업급여와 완전히 다른 제도예요.
        <a href="https://www.kua.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민취업지원제도</a>의 구직촉진수당(월 50만원, 최대 6개월)은 고용보험 실업급여 자격이 없는 사람을 위한 거예요.
      </p>

      <GreenBox title="실업급여 vs 국민취업지원제도">
        <strong>실업급여</strong>: 고용보험 가입자가 비자발적 퇴직 시 → 퇴직 전 평균임금의 60% (1일 상한 68,100원)<br />
        <strong>구직촉진수당</strong>: 고용보험 미가입자·자발적 퇴사자 중 수급 불가자 → 월 50만원 고정<br /><br />
        <strong>중복 불가</strong>: 실업급여를 받으면 구직촉진수당은 못 받아요. 실업급여가 끝난 뒤에 신청할 수 있어요.
      </GreenBox>

      <p style={body}>
        금액만 봐도 실업급여가 훨씬 유리해요. 실업급여 자격이 되면 무조건 실업급여를 먼저 받는 게 맞아요.
        수급이 끝난 뒤에도 취업이 안 되면 그때 국민취업지원제도를 알아보세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 각 수당별 구체적인 조건과 금액은 관할 고용센터(☎ 1350) 또는 고용24에서 확인하세요." />
    </ArticleLayout>
  );
}
