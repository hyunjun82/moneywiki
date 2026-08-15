"use client";
// Q1: 실업급여 신청하려는데 온라인 교육을 어디서 어떻게 듣는지 모르는 상황
// Q2: 고용24에서 온라인 교육 수강 완료 → 14일 이내 고용센터 방문해서 수급자격 신청
// Q3: 교육 필수 여부, 수강 방법(고용24), 14일 기한, 고용센터 방문 시 지참물, 이수 후 다음 단계
// Q4: Steps(수강~방문 절차) + GreenBox(14일 기한) + Checklist(방문 준비물) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "고용24에 로그인",
    desc: "고용24(ei.go.kr)에 접속해서 공동인증서 또는 간편인증으로 로그인해요. PC, 스마트폰, 태블릿 다 가능해요.",
    link: { label: "고용24 온라인 교육", href: "https://www.ei.go.kr" },
  },
  {
    title: "수급자격 신청자 온라인 교육 수강",
    desc: "동영상 강의를 시청해요. 약 1~2시간 소요되고 일시정지 후 나중에 이어서 들을 수 있어요. 7일 내에 완료해야 이수로 인정돼요.",
  },
  {
    title: "퀴즈 풀고 이수증 발급",
    desc: "강의 후 간단한 퀴즈를 풀어야 해요. 기준 점수에 미달하면 재응시하면 돼요. 이수증은 고용24에서 언제든 다시 출력할 수 있어요.",
  },
  {
    title: "14일 이내 관할 고용센터 방문",
    desc: "교육 수료 후 14일 이내에 주소지 관할 고용센터를 방문해서 수급자격을 신청해요. 14일이 지나면 교육 효력이 사라져요.",
  },
  {
    title: "수급자격 심사 접수",
    desc: "상담사 면담 후 심사가 접수돼요. 보통 14일 이내에 결과가 나와요. 결과가 나오면 첫 실업인정일이 지정돼요.",
  },
];

const VISIT_DOCS = [
  "신분증 (주민등록증, 운전면허증 등)",
  "이직확인서 사본 (사업주가 신고 완료했으면 생략 가능)",
  "통장 사본 (구직급여 입금용, 본인 명의)",
  "워크넷 구직등록 확인증 (방문 전 미리 등록)",
];

const CHECKLIST = [
  "고용24에서 온라인 교육 이수 완료",
  "교육 수료 후 14일 이내인지 확인",
  "워크넷 구직등록 완료 (방문 전 필수)",
  "신분증 + 통장 사본 준비",
  "관할 고용센터 사전 예약 (대기시간 줄이기)",
];

const FAQS = [
  {
    q: "온라인 교육을 안 들으면 어떻게 되나요?",
    a: "수급자격 신청 자체가 안 돼요. 고용센터에 방문해도 교육 미이수면 신청을 받아주지 않아요. 반드시 교육을 먼저 완료해야 해요.",
  },
  {
    q: "14일 기한을 넘기면 어떻게 되나요?",
    a: "교육 효력이 사라져요. 다시 교육을 수강하고 14일 이내에 방문해야 해요. 그만큼 첫 지급일이 늦어지니까 서두르는 게 좋아요.",
  },
  {
    q: "이전에 실업급여를 받았는데 교육을 또 들어야 하나요?",
    a: "이전 이수 이력이 남아 있으면 생략할 수 있는 경우도 있어요. 고용24에 로그인해서 이수 이력을 확인해보세요.",
  },
  {
    q: "교육을 한 번에 다 못 들면요?",
    a: "일시정지하고 나중에 이어서 들을 수 있어요. 단, 교육 시작일로부터 7일 이내에 완료해야 이수로 인정돼요.",
  },
  {
    q: "고용센터 사전 예약은 어떻게 하나요?",
    a: "고용24 홈페이지에서 예약하거나 1350(고용노동부 콜센터)에 전화해서 잡을 수 있어요. 요즘은 센터가 붐벼서 예약하고 가는 게 좋아요.",
  },
  {
    q: "워크넷 구직등록은 방문 전에 꼭 해야 하나요?",
    a: "네, 필수예요. 워크넷(work.go.kr)에 접속해서 이력서 등록하고 구직등록까지 마쳐야 해요. 고용센터에서 구직등록 확인증을 요구해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 시행규칙", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
    ],
  },
  {
    category: "공식 서비스",
    items: [
      { label: "고용24 (온라인 교육 수강)", url: "https://www.ei.go.kr" },
      { label: "워크넷 (구직등록)", url: "https://www.work.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급자격-인정", title: "실업급여 수급자격 신청 절차", description: "고용센터 방문 후 심사 과정을 정리했어요." },
  { slug: "실업급여-실업신고", title: "실업급여 워크넷 구직등록", description: "워크넷에서 구직등록하는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 실업급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 온라인 교육, 어디서 어떻게 듣나요?<br />
        수강부터 고용센터 방문까지 14일 기한
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여를 신청하려면 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서
        수급자격 신청자 온라인 교육을 먼저 들어야 해요. 교육 없이 고용센터에 가면 신청을 받아주지 않아요.
        교육 후 14일 이내에 고용센터를 방문해야 하니까 시간 관리가 중요해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>교육부터 수급자격 신청까지 5단계</H2>
      <p style={body}>
        고용24에서 1~2시간 교육을 듣고, 퀴즈를 풀고, 14일 안에 고용센터를 방문하면 돼요.
        퇴직 후 1~2주 안에 교육을 수강하고 바로 방문하는 게 가장 빨라요.
      </p>

      <Steps steps={STEPS} />

      <GreenBox>
        <strong>14일 기한이 중요한 이유</strong><br />
        교육 수료 후 14일이 지나면 교육 효력이 사라져요. 다시 처음부터 들어야 하죠.<br />
        신청이 늦어질수록 대기기간(7일)과 첫 실업인정일이 뒤로 밀려서 첫 지급일이 늦어져요.<br />
        수급기간(퇴직 후 12개월)도 계속 줄어들고요.
      </GreenBox>

      <CategoryButton label="고용·실업급여 정보" count={5} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>고용센터 방문 시 준비물</H2>
      <p style={body}>
        빠뜨리면 다시 와야 하니까 미리 챙기세요. 워크넷 구직등록은 방문 전에 반드시 완료해야 해요.
      </p>

      <BorderBox>
        <strong>방문 시 지참 서류</strong><br /><br />
        {VISIT_DOCS.map((doc, i) => (
          <span key={i}>{doc}<br /></span>
        ))}
      </BorderBox>

      <p style={body}>
        사전 예약을 추천해요. 고용24에서 온라인 예약하거나 1350에 전화하면 돼요.
        당일 방문하면 대기 시간이 길 수 있어요.
      </p>

      <Divider />

      <H2>방문 전 체크리스트</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        교육 수료 후 14일 이내인지, 워크넷 구직등록을 했는지, 서류는 다 챙겼는지 한 번 확인하세요.
      </p>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법 시행규칙과 고용24 서비스를 바탕으로 작성됐어요. 교육 방식과 방문 절차는 변경될 수 있으니 고용24에서 최신 정보를 확인해봐요." />
    </ArticleLayout>
  );
}
