"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 계약직(기간제) 근로자가 계약만료로 퇴사한 뒤 실업급여를 받고 싶은데, 비자발적 이직 증빙이 필요하다고 들은 상황
// Q2. 이직확인서 퇴사 사유가 '계약만료'로 돼 있는지 확인하고, 서류를 갖춰 실업급여를 신청한다
// Q3. 이직확인서 퇴사 사유 기재, 비자발적 이직 증빙 서류, 재계약 거부 시 처리, 대기기간 7일
// Q4. Steps(신청 절차) + GreenBox(핵심 결론) + Checklist(서류 목록) + EligibilityChecker + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY = [
  { id: "contract", label: "계약기간이 만료돼서 퇴사했어요" },
  { id: "doc", label: "이직확인서에 '계약만료' 또는 '비자발적 이직'으로 기재돼 있어요" },
  { id: "insurance", label: "고용보험 가입 기간이 이직일 전 24개월 중 180일 이상이에요" },
  { id: "willing", label: "재취업 의사가 있고 구직활동을 할 수 있어요" },
];

const STEPS = [
  {
    title: "이직확인서의 퇴사 사유를 확인하세요",
    desc: "퇴사 후 회사가 10일 이내에 이직확인서를 고용센터에 제출해야 해요. 고용24(ei.go.kr)에서 이직확인서 처리 현황을 조회할 수 있어요. 퇴사 사유가 '계약만료'로 돼 있는지 꼭 확인하세요.",
    tip: "퇴사 사유가 '자발적 퇴사'로 잘못 기재됐다면 고용센터에 이의제기할 수 있어요",
  },
  {
    title: "워크넷에서 구직등록을 하세요",
    desc: "고용24 또는 워크넷(work.go.kr)에서 구직등록을 해야 해요. 온라인으로 5분이면 완료돼요. 구직등록 없이는 수급자격 신청이 안 돼요.",
  },
  {
    title: "수급자격 인정 신청을 하세요",
    desc: "고용24에서 온라인으로 신청하거나 관할 고용센터에 방문해요. 신분증, 통장 사본, 근로계약서를 준비하세요. 이직확인서는 회사가 이미 제출했으면 별도로 낼 필요 없어요.",
    link: { label: "고용24 바로가기", href: "https://www.ei.go.kr" },
  },
  {
    title: "7일 대기 후 실업인정을 받으세요",
    desc: "수급자격 인정 후 7일 대기기간이 있어요. 이후 1~4주 간격으로 실업인정을 받으면 구직급여가 입금돼요. 구직활동 실적(입사지원, 면접 등)을 증빙해야 해요.",
  },
];

const DOC_CHECKLIST = [
  "이직확인서 / 회사가 고용센터에 제출 (고용24에서 확인)",
  "근로계약서 / 계약기간 증빙용",
  "신분증 / 주민등록증 또는 운전면허증",
  "통장 사본 / 구직급여 입금 계좌",
  "증명사진 1장 / 고용센터 방문 시 필요",
];

const FAQS = [
  {
    q: "계약직 퇴사는 자동으로 비자발적 이직인가요?",
    a: "계약기간 만료로 퇴사한 거라면 비자발적 이직이에요. 다만 회사가 재계약을 제안했는데 본인이 거부했다면 '자발적 퇴사'로 볼 수도 있어요. 이 경우 정당한 사유를 심사받아야 해요.",
  },
  {
    q: "이직확인서를 회사가 안 내줘요",
    a: "이직확인서 제출은 사업주의 법적 의무예요. 10일 이내에 제출해야 하고, 안 하면 과태료가 부과돼요. 고용센터에 '이직확인서 미제출 신고'를 하면 고용센터에서 직접 처리해줘요.",
  },
  {
    q: "퇴사 사유가 잘못 기재됐어요",
    a: "고용센터에 이의제기를 하면 사실 확인 조사를 해줘요. 근로계약서, 퇴직 관련 문자·이메일 등 증거가 있으면 정정될 수 있어요.",
  },
  {
    q: "계약직 1년 미만인데 실업급여 받을 수 있나요?",
    a: "고용보험 피보험기간이 180일 이상이면 받을 수 있어요. 1년 미만이라도 이전 직장 기간이 합산돼서 180일이 넘으면 수급자격이 생겨요.",
  },
  {
    q: "재계약을 거부했는데 실업급여 받을 수 있나요?",
    a: "근로조건이 이전보다 현저히 나빠졌다면(임금 삭감, 근무시간 변경 등) 정당한 거부 사유로 인정돼요. 단순히 다른 곳에 가고 싶어서 거부한 거면 자발적 퇴사로 볼 수 있어요.",
  },
  {
    q: "실업급여 금액은 어떻게 되나요?",
    a: "퇴사 전 3개월 평균임금의 60%를 받아요. 2026년 기준 하한액은 1일 66,048원이에요. 나이와 가입 기간에 따라 120~270일 동안 받을 수 있어요.",
  },
];

const SOURCES = [
  { name: "고용보험법", href: "https://www.law.go.kr/법령/고용보험법" },
  { name: "고용24", href: "https://www.ei.go.kr" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "계약직-실업급여", title: "계약직 계약만료 실업급여 조건", description: "계약만료 시 실업급여 수급 요건." },
  { slug: "실업급여-수급자격-인정", title: "실업급여 수급자격 인정 절차", description: "수급자격 심사와 실업인정 과정." },
  { slug: "실업급여-금액", title: "실업급여 금액과 기간", description: "받을 수 있는 금액 계산과 수급 기간." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 계약직 퇴사 · 비자발적 이직</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약직 퇴사, 실업급여 받을 수 있을까?<br />
        비자발적 이직 증빙과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "계약기간 끝나서 나왔는데, 실업급여 신청하려니까 서류가 필요하대요."
      </p>
      <p style={body}>
        계약만료로 퇴사하면 <strong>비자발적 이직</strong>이에요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라 실업급여를 받을 수 있죠.
        핵심은 이직확인서의 퇴사 사유가 '계약만료'로 정확히 기재돼야 한다는 거예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 실업급여 대상인지 확인해보세요</H2>
      <p style={body}>
        계약직이라고 무조건 받는 건 아니에요. 아래 조건을 확인해보세요.
      </p>

      <SectionBadge>수급자격 체크</SectionBadge>
      <EligibilityChecker items={ELIGIBILITY} />

      <GreenBox title="계약직 퇴사 = 비자발적 이직">
        {"계약기간 만료로 퇴사 → 비자발적 이직 인정\n회사가 재계약 제안 + 본인 거부 → 심사 필요\n근로조건 하락으로 거부 → 정당사유 인정 가능\n\n이직확인서 퇴사 사유가 핵심이에요.\n'계약만료'로 기재돼야 바로 인정돼요."}
      </GreenBox>

      <CategoryButton label="실업급여 정보" count={15} href="/category/실업급여" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신청은 이렇게 하세요</H2>
      <p style={body}>
        이직확인서 확인부터 실업인정까지, 순서대로 진행하면 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>준비해야 할 서류</H2>
      <p style={body}>
        기본 서류만 챙기면 돼요. 이직확인서는 회사가 제출하는 거라 본인이 따로 낼 필요 없어요.
      </p>

      <SectionBadge>서류 체크리스트</SectionBadge>
      <Checklist items={DOC_CHECKLIST} />

      <Divider />

      <H2>이직확인서 사유가 잘못됐다면?</H2>
      <p style={body}>
        퇴사 사유가 '자발적 퇴사'로 잘못 기재되는 경우가 있어요.
        이러면 실업급여가 거부될 수 있으니 반드시 확인하고, 잘못됐으면 바로 조치해야 해요.
      </p>

      <BorderBox>
        <strong>이직확인서 사유 정정 방법</strong>{"\n"}
        · 고용24에서 이직확인서 처리 현황 조회{"\n"}
        · 퇴사 사유가 잘못됐다면 고용센터에 이의제기{"\n"}
        · 근로계약서, 퇴직 관련 문자·이메일 등 증거 첨부{"\n"}
        · 고용센터에서 사실 확인 조사 후 정정 가능{"\n"}
        {"\n"}
        회사가 이직확인서 자체를 안 내면?{"\n"}
        → 고용센터에 미제출 신고 → 과태료 부과 + 직권 처리
      </BorderBox>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 고용보험법 기준으로 작성했어요. 수급 요건, 금액, 기간은 법 개정에 따라 바뀔 수 있으니 최신 내용은 고용24 또는 고용센터에서 확인해 주세요." />
    </ArticleLayout>
  );
}
