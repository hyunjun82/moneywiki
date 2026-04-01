// Q1. 실업급여 수급자격이 거부됐는데 억울해서 이의신청 방법을 찾는 상황
// Q2. 심사청구·재심사청구를 기한 내에 제기해서 수급자격을 다시 받을 수 있어야 함
// Q3. 심사청구(거부 후 90일 이내, 심사관 결정 30일), 재심사청구(결정 후 90일 이내, 위원회 재결 50일), 행정소송(재결 후 90일)
// Q4. Steps(절차) + GreenBox(기한 정리) + Checklist(증거 준비) + FAQ

"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR, 실업급여_HIGHLIGHT } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const STEPS_DATA = [
  {
    title: "거부 처분 이유 확인",
    desc: "고용센터에서 보낸 불인정 통보문에 거부 이유가 적혀 있어요. 대부분 자발적 퇴사로 판단됐거나, 이직확인서 내용과 진술이 달라서 거부되죠.",
  },
  {
    title: "심사청구서 제출 (90일 이내)",
    desc: "거부 처분을 안 날부터 90일 이내에 관할 고용센터에 심사청구서를 제출하세요. 이름, 주소, 거부 처분 내용, 이의 제기 이유를 적고 증거자료를 첨부해요.",
    tip: "고용24에서 온라인으로도 제출할 수 있어요",
  },
  {
    title: "심사관 결정 (30일 이내)",
    desc: "고용보험심사관이 처분이 법에 맞는지 다시 살펴보고 30일 이내에 결정을 내려요. 결과는 우편 또는 고용24에서 확인할 수 있죠.",
  },
  {
    title: "재심사청구 (심사관 결정 후 90일 이내)",
    desc: "심사관 결정에 불복하면 고용보험심사위원회에 재심사청구를 할 수 있어요. 원처분 고용센터, 지방고용노동관서, 또는 심사위원회 중 아무 데나 제출하면 돼요.",
    tip: "재심사청구서는 심사청구서보다 법적 근거를 더 구체적으로 써야 해요",
  },
  {
    title: "위원회 재결 (50일 이내)",
    desc: "고용보험심사위원회가 50일 이내에 최종 결정(재결)을 내려요. 여기서도 불복하면 재결 후 90일 이내에 행정법원에 소송을 제기할 수 있어요.",
  },
];

const CHECKLIST = [
  "불인정 통보문에서 거부 이유 정확히 확인",
  "거부 처분을 안 날짜를 달력에 표시 (90일 기한 관리)",
  "반박 증거 수집: 문자, 이메일, 녹음, 급여명세서, 통장 내역",
  "심사청구서에 법적 근거와 이의 이유를 구체적으로 작성",
  "심사관 결정 후 재심사청구 기한(90일)도 별도 관리",
];

const FAQS = [
  { q: "심사청구와 재심사청구의 차이가 뭔가요?", a: "심사청구는 고용센터 처분에 이의를 제기해서 고용보험심사관이 다시 보는 1단계예요. 재심사청구는 심사관 결정에 불복해서 고용보험심사위원회가 다시 보는 2단계죠." },
  { q: "90일 기한을 넘기면 어떻게 되나요?", a: "신청이 각하돼요. 기한은 처분(또는 결정)이 있음을 안 날부터 시작하니, 통보를 받은 날짜를 정확히 기록해두세요." },
  { q: "심사청구 없이 바로 재심사청구를 할 수 있나요?", a: "원칙적으로 심사청구를 먼저 거쳐야 해요. 다만 심사청구에 대한 결정이 60일 내에 나오지 않으면 곧바로 재심사청구를 할 수 있죠." },
  { q: "변호사 도움이 필요한가요?", a: "법적 의무는 아니지만, 재심사청구나 행정소송 단계에서는 법률 전문가 도움이 유리해요. 대한법률구조공단에서 무료 상담을 받을 수 있죠." },
  { q: "온라인으로도 심사청구를 할 수 있나요?", a: "네. 고용보험심사위원회(eiac.ei.go.kr) 홈페이지나 고용24에서 온라인으로 제출할 수 있어요." },
  { q: "행정소송까지 가는 경우가 많나요?", a: "많지는 않아요. 대부분 심사청구나 재심사청구 단계에서 해결되죠. 행정소송은 금액이 크고 법적 쟁점이 분명할 때 진행하는 경우가 많아요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "고용보험심사위원회: 심사·재심사 청구", url: "https://eiac.ei.go.kr" },
      { label: "찾기쉬운 생활법령: 실업급여 심사청구", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=5&cciNo=3&cnpClsNo=1" },
      { label: "찾기쉬운 생활법령: 실업급여 재심사청구", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=5&cciNo=3&cnpClsNo=2" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급자격", title: "실업급여 수급자격 조건", description: "비자발적 퇴사, 180일 요건 등 수급자격 조건을 정리했어요." },
  { slug: "실업급여-이의신청", title: "실업급여 이의신청", description: "수급자격 거부 시 이의신청 방법을 정리했어요." },
  { slug: "실업급여-신청방법", title: "실업급여 신청 방법", description: "온라인 교육부터 고용센터 방문까지 신청 절차를 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR} highlightSlugs={실업급여_HIGHLIGHT}
          currentSlug="실업급여-심사청구-및-재심사청구-방법"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 이의신청</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 심사청구·재심사청구, 거부당하면 어떻게?<br />
        90일 기한과 불복 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여 수급자격이 거부됐는데 억울하죠.
      </p>
      <p style={body}>
        거부 후에도 다시 심사받을 기회가 있어요. 심사청구(1단계)와 재심사청구(2단계), 두 번의 불복 절차가 있거든요. 각 단계마다 <strong>90일</strong> 기한이 있으니 놓치지 않는 게 핵심이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>심사청구와 재심사청구, 뭐가 다른가요?</H2>
      <p style={body}>
        불복 절차는 2단계예요. 첫째가 심사청구, 둘째가 재심사청구.
      </p>
      <p style={body}>
        심사청구는 고용센터 처분에 이의를 제기해서 고용보험심사관이 다시 보는 거예요. 30일 이내에 결정이 나오죠. 재심사청구는 심사관 결정에 불복해서{" "}
        <a href="https://eiac.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험심사위원회</a>가
        다시 보는 2단계예요. 50일 이내에 최종 재결이 나와요.
      </p>
      <GreenBox title="전체 불복 절차와 기한">
        거부 처분 → 90일 이내 심사청구 → 심사관 결정(30일) → 90일 이내 재심사청구 → 위원회 재결(50일) → 90일 이내 행정소송(법원)
      </GreenBox>

      <Divider />

      <H2>심사청구는 어떻게 하나요?</H2>
      <p style={body}>
        거부 처분을 안 날부터 <strong>90일 이내</strong>에 제기해야 해요. 기한을 넘기면 각하되니까 달력에 표시해두세요.
      </p>
      <SectionBadge>절차</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>증거는 어떻게 준비하나요?</H2>
      <p style={body}>
        거부 이유에 대한 반박 자료가 핵심이에요. 자발적 퇴사로 판단됐다면 비자발적이었음을 증명하는 자료를 모아야 하죠.
      </p>
      <SectionBadge>증거 준비</SectionBadge>
      <Checklist items={CHECKLIST} />
      <p style={body}>
        임금 체불이 퇴사 사유라면 급여명세서·통장 내역, 직장 내 괴롭힘이라면 문자·이메일·녹음, 근로조건 변경이라면 변경 전후 근로계약서를 첨부하세요. 증거가 많을수록 심사관이 공정하게 판단할 수 있어요.
      </p>

      <Divider />

      <H2>재심사청구도 안 되면 어떻게 하나요?</H2>
      <p style={body}>
        위원회의 재결이 최종 결정이에요. 여기서도 불복하려면 재결 후 <strong>90일 이내에 행정법원에 소송</strong>을 제기해야 해요.
      </p>
      <BorderBox title="법률 상담을 받으세요">
        행정소송은 변호사 도움이 거의 필수예요. 대한법률구조공단(klac.or.kr)에서 소득 기준에 따라 무료 법률 상담과 소송 비용 지원을 받을 수 있어요. 고용노동부(1350) 고객상담센터에서도 안내를 받을 수 있죠.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 고용보험 불복 절차 안내를 목적으로 작성됐어요. 법적 판단은 전문가 상담을 받으세요." />
      <RelatedArticles items={RELATED} />
    </ArticleLayout>
  );
}
