"use client";

// Q1. [에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 핵심 내용 확인
// Q4. Steps + GreenBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "이직확인서를 회사가 안 내줘요", a: "회사는 법적 의무가 있습니다. 퇴사일로부터 10일 이내에 제출해야 합니다. 고용센터에 미제출 신고하면 회사에 과태료(최대 300만원)가 부과되고, 고용센터에서 직접 확인 후 처리합니다." },
  { q: "서식 없이 신청할 수 있나요?", a: "온라인 신청 시 별도 서식 출력 없이 가능합니다. 고용보험 홈페이지에서 본인인증 후 온라인으로 신청하고, 필요 서류는 스캔 또는 촬영하여 첨부하면 됩니다." },
  { q: "수급자격 신청은 꼭 직접 가야 하나요?", a: "첫 신청은 방문이 원칙이지만, 온라인 신청 후 유선 상담으로 대체 가능합니다. 거동 불편 시 대리 신청(위임장 필요)도 가능합니다." },
  { q: "실업인정은 매번 방문해야 하나요?", a: "아니요, 온라인으로 가능합니다. 1차는 필수 방문(수급자격 교육 포함)이지만, 2차 이후부터는 온라인 또는 고용보험 앱으로 실업인정 신청이 가능합니다." },
  { q: "고용보험 서식은 어디서 다운받나요?", a: "고용보험 홈페이지(ei.go.kr)의 자료실 → 서식자료실에서 모든 서식을 다운로드할 수 있습니다." },
];

const SOURCES = [
  { name: "관련 법령 정보", href: "https://www.law.go.kr" },
];

const RELATED = [
  { slug: "고용보험-서식-모음", title: "고용보험 서식 모음 - 실업급여 신청에 필요한 양식 총정리", description: "현재 글." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>경제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        고용보험 서식 모음 - 실업급여 신청에 필요한 양식 총정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        고용보험 관련 서식을 한 곳에 모았습니다. 실업급여 신청서, 이직확인서, 수급자격인정 신청서 등 2026년 최신 양식을 다운로드하세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>실업급여 신청 필수 서식</H2>
      <p style={body}>실업급여 신청에 필요한 핵심 서식은 크게 5가지예요.</p>
      <GreenBox>
        고용보험 관련 서식을 한 곳에 모았습니다. 실업급여 신청서, 이직확인서, 수급자격인정 신청서 등 2026년 최신 양식을 다운로드하세요.
      </GreenBox>
      <p style={body}>### 이직확인서 (회사 제출)</p>

      <CategoryButton label="경제" count={10} href="/category/%EA%B2%BD%EC%A0%9C" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>특수 상황별 서식</H2>
      <p style={body}>취업촉진수당은 여러 종류가 있어요.</p>
      <BorderBox>
        <strong>특수 상황별 서식</strong><br />
        취업촉진수당은 여러 종류가 있어요.<br />
        조기재취업수당은 수급일수 절반 이상 남기고 재취업하면 받아요. 남은 급여의 절반을 받을 수 있어요.
      </BorderBox>
      <p style={body}>조기재취업수당은 수급일수 절반 이상 남기고 재취업하면 받아요. 남은 급여의 절반을 받을 수 있어요.</p>

      <Divider />
      <H2>서식 다운로드 방법</H2>
      <p style={body}>고용보험 홈페이지(www.ei.go.kr)에 접속해서 자료실 → 서식자료실로 들어가면 필요한 서식을 다 다운받을 수 있어요.</p>
      <p style={body}>이직확인서는 회사용이에요. 고용보험 EDI(edi.ei.go.kr)에서 제출해요.</p>
      <p style={body}>수급자격인정 신청서, 실업인정 신청서, 조기재취업수당 신청서, 이의신청서 등은 다 고용보험 홈페이지에서 다운받을 수 있어요.</p>

      <Divider />
      <H2>고용보험 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
