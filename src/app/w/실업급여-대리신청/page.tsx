// Q1. 질병·장애로 고용센터에 직접 못 가는데 실업급여를 신청해야 하는 상황
// Q2. 대리인을 통해 실업급여 수급자격 신청을 완료할 수 있어야 함
// Q3. 정당한 사유(질병·장애·해외), 위임장 필수, 신청자·대리인 신분증, 통장 사본, 이직확인서, 대리 신청은 최초 1회만, 이후 실업인정은 본인
// Q4. Steps(대리 신청 절차) + DocTable(서류) + GreenBox(위임장 작성법) + FAQ

"use client";

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const STEPS_DATA = [
  {
    title: "위임장 작성",
    desc: "신청자가 직접 위임장을 작성해요. 신청자 이름·주민등록번호·주소, 대리인 이름·주민등록번호·관계를 적고, 양쪽 모두 서명 또는 도장을 찍어야 해요.",
    tip: "위임장 상단에 날짜를 반드시 기재하세요 — 고용센터에서 시기를 확인해요",
  },
  {
    title: "서류 준비",
    desc: "신청자 신분증, 위임장, 대리인 신분증, 신청자 명의 통장 사본을 준비하세요. 질병 사유라면 진단서나 입원증명서를 추가로 챙기면 유리해요.",
  },
  {
    title: "관할 고용센터 방문",
    desc: "대리인이 거주지 관할 고용센터를 방문해서 '대리 신청입니다'라고 말하세요. 담당자가 위임장과 서류를 확인한 뒤 신청을 접수해요.",
    tip: "가기 전에 고용센터(1350)에 전화로 미리 확인하면 헛수고를 줄일 수 있어요",
  },
  {
    title: "신청 완료 및 접수증 수령",
    desc: "신청이 완료되면 수급자격 신청 접수증을 받아요. 이 접수증은 나중에 필요하니 잘 보관하세요.",
  },
];

const DOCS = [
  { name: "신청자 신분증 (주민등록증·운전면허증·여권)", required: true, where: "본인 소지" },
  { name: "위임장 (양쪽 서명·도장)", required: true, where: "직접 작성" },
  { name: "대리인 신분증", required: true, where: "대리인 소지" },
  { name: "신청자 명의 통장 사본", required: true, where: "은행 발급" },
  { name: "이직확인서 사본", required: false, where: "회사 발급 (고용센터 제출 완료 시 생략 가능)" },
  { name: "진단서·입원증명서 (질병 사유 시)", required: false, where: "의료기관 발급" },
];

const FAQS = [
  { q: "가족이 아닌 사람도 대리인이 될 수 있나요?", a: "네. 친구, 동료, 변호사 등 누구든 가능해요. 중요한 건 위임장에 관계를 명시하고 양쪽 서명을 받는 거예요." },
  { q: "위임장 양식이 정해져 있나요?", a: "특별한 양식은 없어요. A4 용지에 신청자·대리인 정보, 위임 내용, 날짜, 양쪽 서명만 있으면 돼요." },
  { q: "온라인으로 대리 신청할 수 있나요?", a: "신청자가 공인인증서·간편인증으로 직접 본인인증을 할 수 있으면 온라인 신청이 가능해요. 본인인증이 불가능하면 고용센터 방문이 필요하죠." },
  { q: "대리 신청 후 실업인정도 대리로 할 수 있나요?", a: "아니에요. 대리 신청은 최초 1회만 가능하고, 이후 실업인정(4주마다)은 신청자 본인이 직접 해야 해요. 온라인 실업인정을 활용하면 방문 없이도 가능하죠." },
  { q: "위임장 없이 가면 안 되나요?", a: "절대 안 돼요. 위임장은 필수 서류예요. 다른 서류가 다 있어도 위임장이 없으면 신청을 받아주지 않아요." },
  { q: "해외에 있어서 못 가는 경우에도 대리 신청이 가능한가요?", a: "네. 해외 체류도 정당한 사유로 인정돼요. 위임장을 미리 작성해서 대리인에게 전달하면 되죠." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "고용보험법: 수급자격 신청", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24: 실업급여 인터넷 신청", url: "https://www.ei.go.kr" },
      { label: "고용노동부 고객상담센터 1350", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급자격", title: "실업급여 수급자격 조건", description: "실업급여를 받으려면 어떤 조건이 필요한지 정리했어요." },
  { slug: "실업급여-신청방법", title: "실업급여 신청 방법", description: "온라인 교육부터 고용센터 방문까지 신청 절차를 정리했어요." },
  { slug: "상병급여-신청-조건-및-수급-방법", title: "상병급여 신청 조건", description: "실업급여 수급 중 질병으로 구직활동이 어려우면 상병급여를 받을 수 있어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR} highlightSlugs={실업급여_HIGHLIGHT}
          currentSlug="실업급여-대리신청"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 대리신청</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 대리신청, 가족이 대신 할 수 있나?<br />
        위임장 작성법과 필요 서류
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직했는데 몸이 아파서 고용센터에 직접 못 가는 상황이죠.
      </p>
      <p style={body}>
        괜찮아요. 질병, 장애, 해외 체류 같은 정당한 사유가 있으면 가족이나 지인이 대신 신청할 수 있어요.{" "}
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서
        대리인 신청을 허용하고 있거든요. 위임장만 제대로 작성하면 돼요.
      </p>
      <p style={body}>
        다만 대리 신청은 최초 1회만 가능하고, 이후 실업인정(4주마다)은 본인이 직접 해야 해요. 온라인 실업인정을 활용하면 매번 방문하지 않아도 되죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>대리 신청 절차는 어떻게 되나요?</H2>
      <p style={body}>
        위임장 작성 → 서류 준비 → 고용센터 방문 → 접수 완료 순서예요. 가기 전에 고용센터에 전화해서 필요 서류를 한 번 더 확인하는 게 안전해요.
      </p>
      <SectionBadge>대리 신청 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>위임장은 어떻게 작성하나요?</H2>
      <p style={body}>
        특별한 양식이 없어도 돼요. A4 용지에 필요한 내용만 적으면 충분하죠.
      </p>
      <GreenBox title="위임장 필수 기재 사항">
        제목: &ldquo;위임장&rdquo; | 날짜: 작성일 | 신청자(위임인): 이름, 주민등록번호, 주소 | 대리인(수임인): 이름, 주민등록번호, 관계 | 위임 내용: &ldquo;실업급여 수급자격 신청 및 관련 서류 제출&rdquo; | 양쪽 서명 또는 도장
      </GreenBox>
      <p style={body}>
        위임장 맨 아래에 &ldquo;위 사항을 대리인에게 위임하며, 대리인이 대신 신청해주기를 동의합니다&rdquo;라는 문구를 추가하면 더 확실해요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>어떤 서류를 준비해야 하나요?</H2>
      <p style={body}>
        신청자 것과 대리인 것을 모두 챙겨야 해요. 하나라도 빠지면 접수가 안 되니 체크하고 가세요.
      </p>
      <SectionBadge>서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>대리 신청 후에는 어떻게 진행되나요?</H2>
      <p style={body}>
        수급자격 심사 결과는 보통 7~14일 이내에 나와요.{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 조회하거나 우편으로 통보받을 수 있죠.
      </p>
      <p style={body}>
        수급자격이 인정되면 수급 교육(1회)을 받아야 하는데, 이건 본인이 직접 가야 해요. 질병 등으로 못 가면 사전에 고용센터에 신청해서 온라인 교육으로 대체할 수 있죠.
      </p>
      <BorderBox title="실업인정은 본인이 해야 해요">
        4주마다 실업인정을 받아야 실업급여가 입금돼요. 이 절차는 대리가 안 되고 본인이 직접 해야 하죠. 고용24에서 인터넷 실업인정을 활용하면 고용센터 방문 없이도 가능해요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 고용보험 제도 안내를 목적으로 작성됐어요. 개별 상황은 관할 고용센터(1350)에 문의하세요." />
      <RelatedArticles items={RELATED} />
    </ArticleLayout>
  );
}
