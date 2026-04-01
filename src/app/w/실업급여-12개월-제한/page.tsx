"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 퇴직 후 실업급여를 신청하려는데 12개월 제한이 뭔지, 실제 수급 기간은 얼마인지 혼란스러운 상황
// Q2. 12개월은 신청 기한이라는 걸 이해하고, 이직 후 즉시 고용24에서 신청한다
// Q3. 12개월 = 신청 기한, 실제 수급일 120~270일, 연장 사유(4년), 2026년 반복수급 제재
// Q4. GreenBox(결론) + BorderBox(수급일수표) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "이직확인서를 회사에 요청하세요",
    desc: "퇴직하면 회사가 고용보험 이직확인서를 제출해야 해요. 보통 퇴직 후 2주 내에 처리돼요. 안 해주면 고용노동부(1350)에 신고할 수 있어요.",
    tip: "회사가 안 해주면 고용노동부에 직권 요청 가능",
  },
  {
    title: "고용24에서 수급자격 신청을 하세요",
    desc: "고용24(ei.go.kr)에 로그인해서 '실업급여 인터넷 신청'을 선택하세요. 워크넷 구직등록도 같이 해야 해요. 온라인으로 5~10분이면 끝나요.",
    link: { label: "고용24 바로가기", href: "https://www.ei.go.kr" },
  },
  {
    title: "고용센터 교육을 이수하세요",
    desc: "수급자격 신청 후 고용센터에서 취업활동 교육(1일)을 받아야 해요. 온라인 교육도 가능해요. 교육 이수 후 7일 대기기간이 지나면 실업급여가 지급되기 시작해요.",
    tip: "2026년 반복수급자는 대기기간 최대 4주로 연장",
  },
  {
    title: "매 1~4주마다 실업인정을 받으세요",
    desc: "실업급여를 계속 받으려면 정해진 날짜에 고용센터에 출석해서 구직활동을 보고해야 해요. 온라인 실업인정도 가능하고, 구직활동 1건 이상을 증명하면 돼요.",
    tip: "실업인정일을 놓치면 해당 기간 급여를 못 받아요",
  },
];

const FAQS = [
  {
    q: "12개월 동안 실업급여를 받는 게 아니에요?",
    a: "아니에요. 12개월은 '신청 가능 기간'이에요. 퇴직 다음 날부터 12개월 안에 신청해야 한다는 뜻이지, 12개월간 받는 건 아니에요. 실제 수급일수는 120~270일이에요.",
  },
  {
    q: "12개월이 지나면 신청할 수 없나요?",
    a: "원칙적으로 못 해요. 예외도 거의 없어요. 그래서 퇴직하면 바로 신청하는 게 좋아요. 미루다가 12개월을 넘기면 실업급여를 받을 권리 자체가 사라져요.",
  },
  {
    q: "임신 중이라 취업이 안 되면 어떡하나요?",
    a: "임신·출산·육아, 질병 등으로 취업이 불가능한 경우 수급기간을 연장할 수 있어요. 12개월에 취업 불가 기간을 더해서 최대 4년까지 늘릴 수 있죠. 고용센터에 증빙자료(임신확인서, 의사소견서 등)를 제출하면 돼요.",
  },
  {
    q: "실업급여 받다가 재취업하면 어떻게 돼요?",
    a: "실업급여는 중단돼요. 대신 남은 수급일수의 절반을 조기재취업수당으로 한꺼번에 받을 수 있어요. 재취업 후 6개월 이상 근무하고 신청하면 돼요.",
  },
  {
    q: "재취업 후 또 퇴직하면 다시 받을 수 있나요?",
    a: "네, 새 직장에서 고용보험 180일 이상 가입하고 비자발적으로 퇴사하면 다시 신청할 수 있어요. 이전 수급 기록과 별개로 새로 계산돼요.",
  },
  {
    q: "2026년에 달라진 게 있나요?",
    a: "반복수급 제재가 강화됐어요. 5년 내 3회 이상 수급하면 대기기간이 최대 4주로 늘어나고, 급여가 최대 50%까지 감액될 수 있어요. 반복적으로 단기 취업 후 실업급여를 타는 패턴을 막기 위한 조치예요.",
  },
  {
    q: "내 수급일수가 며칠인지 어떻게 알 수 있나요?",
    a: "고용24(ei.go.kr)에서 모의계산을 할 수 있어요. 고용보험 가입 기간과 나이를 입력하면 수급일수와 예상 급여액이 나와요.",
  },
];

const SOURCES = [
  { name: "고용보험법", href: "https://www.law.go.kr/법령/고용보험법" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=3&cnpClsNo=1" },
  { name: "고용24", href: "https://www.ei.go.kr" },
];

const RELATED = [
  { slug: "실업급여-수급자격", title: "실업급여 수급자격", description: "실업급여를 받을 수 있는 조건." },
  { slug: "실업급여-신청방법", title: "실업급여 신청방법", description: "온라인·오프라인 신청 절차." },
  { slug: "실업급여-금액", title: "실업급여 금액", description: "내가 받을 수 있는 금액 계산." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 실업급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 12개월, 받는 기간이 아니에요<br />
        신청 기한과 실제 수급일수 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;실업급여 12개월 동안 받을 수 있다&rdquo;고 알고 계시나요? 사실 이건 오해예요.
      </p>
      <p style={body}>
        <strong>12개월은 신청 가능 기간</strong>이에요. 퇴직 다음 날부터 12개월 안에 신청해야 받을 수 있다는 뜻이죠.
        실제로 받는 기간은 고용보험 가입 기간과 나이에 따라 <strong>120~270일</strong>이에요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서 정하고 있어요.
        12개월이 지나면 신청 자체가 불가능하니까 퇴직하면 바로 움직이세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>수급일수, 내 기간은 며칠일까요?</H2>
      <p style={body}>
        실업급여는 &ldquo;12개월&rdquo;이 아니라 &ldquo;120~270일&rdquo;이 기준이에요. 고용보험 가입 기간이 길수록, 나이가 많을수록 더 오래 받아요.
      </p>

      <SectionBadge>수급일수표 (2026년 기준)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>가입 기간</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>50세 미만</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>50세 이상·장애인</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1년 미만", "120일", "120일"],
              ["1년~3년 미만", "150일", "180일"],
              ["3년~5년 미만", "150일", "210일"],
              ["5년~10년 미만", "180일", "240일"],
              ["10년 이상", "180일", "270일"],
            ].map(([period, under50, over50], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{period}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{under50}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{over50}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        30세에 3년 다닌 회사에서 퇴사했다면 150일, 55세에 8년 다녔다면 240일을 받아요. 정확한 일수는 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 모의계산으로 알아볼 수 있어요.
      </p>

      <CategoryButton label="고용 정보" count={12} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>12개월 넘겨도 받을 수 있는 경우가 있어요</H2>
      <p style={body}>
        원칙은 12개월 이내 신청이지만, 취업이 불가능한 정당한 사유가 있으면 수급기간을 연장할 수 있어요. 최대 4년까지요.
      </p>

      <GreenBox title="수급기간 연장 사유">
        임신·출산·육아 / 질병·부상 / 의무복무 / 기타 취업할 수 없는 정당한 사유{"\n"}
        → 12개월 + 취업 불가 기간 = 최대 4년까지 연장{"\n"}
        → 고용센터에 증빙자료 제출 필수
      </GreenBox>

      <p style={body}>
        예를 들어 퇴직 후 질병으로 8개월을 쉬었다면, 12개월 + 8개월 = 20개월까지 수급기간이 연장돼요. 의사소견서를 고용센터에 제출하면 인정받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>신청은 이렇게 하세요</H2>
      <p style={body}>
        퇴직하면 최대한 빨리 신청하는 게 좋아요. 미루면 받는 기간만 줄어들어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 고용보험 정보를 제공하며 법률 자문이 아니에요. 정확한 수급 자격은 고용24 또는 고용센터(1350)에 문의하세요." />
    </ArticleLayout>
  );
}
