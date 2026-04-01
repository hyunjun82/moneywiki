"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 퇴직 후 실업급여를 받고 싶은데 어디서 어떻게 신청하는지 모르는 상황이에요.
// Q2. 워크넷 구직등록부터 고용센터 방문까지 전체 절차를 따라해서 실업급여를 수령하는 행동.
// Q3. 5단계 절차(구직등록→온라인교육→고용센터→실업인정→입금), 준비물(신분증), 대기기간 7일, 신청기한 12개월.
// Q4. Steps(5단계 절차) + GreenBox(핵심 요약) + Checklist(실수 방지) + FAQ

import {
  H2, SectionBadge, GreenBox, Steps, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "실업급여 신청하면 바로 입금되나요?", a: "아니에요. 수급자격 인정 후 대기기간 7일이 지나고, 첫 실업인정일 이후에 입금돼요. 보통 신청 후 2~3주 걸려요." },
  { q: "실업급여 신청 서류가 뭐 필요해요?", a: "신분증(주민등록증·운전면허증)만 있으면 돼요. 이직확인서는 회사가 제출하니까 본인이 가져갈 필요 없어요." },
  { q: "퇴직 후 얼마 안에 신청해야 해요?", a: "퇴직일로부터 12개월 이내에 신청해야 해요. 늦게 신청하면 남은 기간만큼만 받으니 바로 신청하세요." },
  { q: "온라인으로만 신청할 수 있나요?", a: "구직등록과 온라인 교육은 온라인으로 하지만, 수급자격 인정 신청은 고용센터에 직접 방문해야 해요." },
  { q: "실업인정은 몇 주마다 해요?", a: "1~4주마다 해요. 처음에는 고용센터 방문이 필요하고, 이후에는 고용24에서 온라인으로 할 수 있어요." },
  { q: "이직확인서를 회사가 안 내면 어떻게 하나요?", a: "고용24에서 제출 여부를 확인하고, 안 됐으면 회사에 독촉하세요. 그래도 안 내면 고용센터에 신고하면 돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "고용보험법", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 실업급여 신청", url: "https://www.work24.go.kr" },
      { label: "워크넷 구직등록", url: "https://www.work.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-대기기간", title: "실업급여 대기기간 7일", description: "신청 후 7일간 급여가 안 나오는 이유와 계산법이에요." },
  { slug: "실업급여-계산기", title: "실업급여 계산기", description: "내가 받을 수 있는 실업급여 금액을 계산해보세요." },
  { slug: "실업급여-모의계산", title: "실업급여 모의계산", description: "수급 기간과 금액을 미리 시뮬레이션해볼 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 실업급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 신청방법<br />
        5단계 절차와 준비물
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직하고 실업급여 받으려는데 어디서부터 시작해야 할지 막막하죠.
        결론부터 말하면 5단계만 순서대로 따라하면 돼요.
        구직등록부터 입금까지 빠짐없이 알려드릴게요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>실업급여 신청, 이 순서대로 해요</H2>
      <p style={body}>
        <a href="https://www.work24.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>와
        관할 고용센터를 오가면서 진행해요. 온라인으로 할 수 있는 건 미리 해두면 시간을 아낄 수 있어요.
      </p>

      <SectionBadge>실업급여 신청 5단계</SectionBadge>
      <Steps steps={[
        { title: "고용24에서 구직등록", desc: "고용24(work24.go.kr)에 접속해서 구직등록을 해요. 이력서를 작성하면 완료돼요. 10~15분이면 끝나요.", tip: "구직등록 안 하고 고용센터 가면 다시 오라고 해요" },
        { title: "수급자격 신청자 온라인 교육 수강", desc: "고용24에서 '실업급여' → '수급자격 신청자 온라인 교육'을 들어요. 30분~1시간 정도 걸려요.", tip: "수료 후 14일 이내에 고용센터 방문해야 해요" },
        { title: "고용센터 방문 → 수급자격 인정 신청", desc: "거주지 관할 고용센터에 신분증 들고 방문해요. 상담사와 면담 후 당일~2~3일 내에 결과가 나와요." },
        { title: "구직활동 + 실업인정", desc: "1~4주마다 구직활동을 보고해요. 입사지원, 면접, 직업훈련 등이 인정돼요. 고용24에서 온라인으로도 가능해요." },
        { title: "실업급여 입금", desc: "실업인정 받으면 2~3일 내에 본인 계좌로 입금돼요. 2026년 기준 1일 최대 68,100원이에요." },
      ]} />

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>신청 전에 꼭 확인하세요</H2>
      <p style={body}>
        이직확인서는 회사가 퇴직 후 10일 이내에 고용센터에 제출해야 해요.
        <a href="https://www.work24.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 제출 여부를 확인할 수 있어요.
        안 됐으면 회사에 독촉하거나 고용센터에 신고하세요.
      </p>

      <GreenBox>
        핵심 준비물과 기한이에요.<br />
        · 준비물: 신분증(주민등록증 또는 운전면허증)<br />
        · 신청기한: 퇴직일로부터 12개월 이내<br />
        · 대기기간: 수급자격 인정 후 7일간 급여 미지급<br />
        · 수급기간: 나이·가입기간에 따라 120~270일
      </GreenBox>

      <Divider />

      <H2>이런 실수하면 신청이 늦어져요</H2>
      <p style={body}>
        매년 같은 실수로 신청이 밀리는 사람이 많아요.
        아래 체크리스트로 미리 점검하세요.
      </p>

      <SectionBadge>실수 방지 체크리스트</SectionBadge>
      <Checklist items={[
        "고용센터 방문 전에 고용24에서 구직등록 완료했나요?",
        "온라인 교육 수료 후 14일 이내인가요?",
        "이직확인서 제출 여부를 고용24에서 확인했나요?",
        "실업인정일을 캘린더에 표시했나요?",
        "구직활동 증빙(입사지원 캡처, 면접 확인서)을 보관하고 있나요?",
      ]} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 고용24 안내를 바탕으로 작성됐어요. 제도 변경 시 내용이 달라질 수 있으니 고용24 공식 사이트에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
