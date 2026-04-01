"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 퇴사했거나 퇴사 예정인 사람이 자기가 실업급여 대상인지 확인하려는 상황
// Q2. 수급자격 3가지 조건을 확인하고 고용24에서 수급자격 인정신청을 한다
// Q3. 180일 가입기간, 비자발적 이직 사유, 구직의사, 65세 이전 가입 제한, 고용형태별 차이
// Q4. EligibilityChecker(자격 확인) + GreenBox(3대 조건) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIGIBILITY_ITEMS = [
  { id: "insurance", label: "이직일 이전 18개월간 고용보험 가입기간 180일 이상이다" },
  { id: "involuntary", label: "비자발적으로 퇴사했다 (권고사직, 계약만료, 해고, 폐업 등)" },
  { id: "will", label: "일할 의사와 능력이 있고, 적극적으로 구직활동을 할 수 있다" },
  { id: "age", label: "65세 이전에 고용보험에 가입했다" },
];

const STEPS = [
  {
    title: "퇴사 후 워크넷에 구직등록하세요",
    desc: "퇴사하면 가장 먼저 워크넷(work.go.kr)에 구직등록을 해요. 이게 실업급여 신청의 첫 단계예요. 이력서를 올리고 구직등록 완료 화면을 캡처해 두면 좋아요.",
    tip: "퇴사 다음 날부터 바로 등록 가능",
  },
  {
    title: "수급자격 인정신청을 하세요",
    desc: "고용24(ei.go.kr) 또는 관할 고용센터에서 수급자격 인정신청을 해요. 이직확인서, 신분증, 통장사본이 필요해요. 이직확인서는 회사에서 고용센터로 보내야 하니까 퇴사 전에 회사에 요청하세요.",
    tip: "이직확인서를 회사가 안 보내면 고용센터에서 직권 조사 가능",
    link: { label: "고용24 바로가기", href: "https://www.ei.go.kr" },
  },
  {
    title: "수급자격 인정 통보를 받으세요",
    desc: "고용센터에서 7~14일간 심사 후 수급자격 인정 여부를 알려줘요. 통과하면 7일 대기기간을 거친 뒤 실업인정을 받고 급여를 수령해요.",
    tip: "대기기간 7일 동안에는 급여가 안 나와요",
  },
];

const FAQS = [
  {
    q: "자진퇴사하면 실업급여를 못 받나요?",
    a: "원칙적으로 자발적 퇴사는 안 돼요. 그런데 임금체불, 직장 내 괴롭힘, 통근거리 3시간 초과 같은 정당한 사유가 있으면 예외적으로 인정돼요.",
  },
  {
    q: "알바도 실업급여 받을 수 있나요?",
    a: "네, 고용보험 가입한 알바라면 자격 있어요. 주 15시간 이상 근무하면 보통 고용보험에 자동 가입돼요. 여러 알바를 합쳐서 180일 넘으면 돼요.",
  },
  {
    q: "계약직 만료도 비자발적 퇴사인가요?",
    a: "네, 계약기간이 끝나서 퇴사한 건 비자발적 이직으로 인정돼요. 다만 회사에서 연장 제안했는데 본인이 거부한 경우는 자발적 퇴사로 봐요.",
  },
  {
    q: "프리랜서도 실업급여 대상인가요?",
    a: "퀵서비스, 학습지 교사, 보험설계사, 택배기사 같은 특수고용직은 고용보험 임의가입이 가능해요. 본인이 직접 가입하고 보험료를 냈다면 받을 수 있어요.",
  },
  {
    q: "65세 넘어도 실업급여 받을 수 있나요?",
    a: "65세 이전에 고용보험에 가입한 사람이라면 퇴직 시 나이가 70세여도 받을 수 있어요. 65세 이후 신규 가입자만 제외돼요.",
  },
  {
    q: "자영업자도 실업급여 받나요?",
    a: "자영업자 고용보험 임의가입 제도가 있어요. 본인이 직접 가입하고 보험료를 내면 폐업 후 실업급여를 받을 수 있어요. 자동 가입은 아니에요.",
  },
];

const SOURCES = [
  { name: "고용보험법", href: "https://www.law.go.kr/법령/고용보험법" },
  { name: "고용24", href: "https://www.ei.go.kr" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=1&cnpClsNo=1" },
];

const RELATED = [
  { slug: "실업급여-연장", title: "실업급여 연장급여 3종류", description: "기본 급여 끝나도 최대 60일 더 받는 방법." },
  { slug: "실업급여-재취업-조건", title: "조기재취업수당 조건", description: "빨리 취업하면 남은 급여의 50%를 한번에." },
  { slug: "실업급여-금액", title: "실업급여 금액 계산법", description: "평균임금의 60%, 상한·하한 기준 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 실업급여 · 수급자격</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 받을 수 있을까?<br />
        수급자격 조건과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴사했는데 실업급여 대상인지 아닌지 헷갈리죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a> 기준으로
        딱 <strong>세 가지</strong>만 충족하면 돼요. 고용보험 180일 이상 가입, 비자발적 퇴사, 구직 의사.
        정규직·계약직·알바 모두 고용보험에 가입했으면 자격이 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 실업급여 대상인지 체크해 보세요</H2>
      <p style={body}>
        아래 네 가지를 모두 충족하면 실업급여를 받을 수 있어요.
        하나라도 빠지면 수급자격이 안 돼요.
      </p>

      <SectionBadge>수급자격 체크</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY_ITEMS}
        allMatchText="실업급여 수급자격이 있을 가능성이 높아요. 고용24에서 바로 신청하세요."
        partialMatchText="일부 조건이 부족해요. 자진퇴사라도 정당한 사유가 있으면 인정될 수 있으니 고용센터에 상담받아 보세요."
      />

      <Divider />

      <H2>3가지 필수 조건을 하나씩 풀어볼게요</H2>
      <p style={body}>
        조건이 단순해 보이지만, 실제로는 예외가 많아서 헷갈리는 부분이 있어요.
      </p>

      <SectionBadge>필수 조건 상세</SectionBadge>
      <GreenBox title="실업급여 3대 조건">
        <p><strong>① 고용보험 가입기간 180일 이상</strong> — 퇴사일 기준 이전 18개월 동안 실제 근무하며 보수를 받은 날이 합산 180일 이상이어야 해요. 주말 빼고 세니까 보통 6개월 이상 근무하면 충족돼요.</p>
        <p><strong>② 비자발적 이직</strong> — 권고사직, 계약만료, 해고, 폐업이 기본이에요. 자진퇴사는 원칙적으로 안 되지만, 임금체불·괴롭힘·건강 악화 같은 정당한 사유가 있으면 예외 인정돼요.</p>
        <p><strong>③ 적극적 구직활동</strong> — 일할 의사와 능력이 있어야 해요. 실업급여 받으면서 4주마다 1회 이상 구직활동을 하고, 실업인정을 받아야 급여가 나와요.</p>
      </GreenBox>

      <p style={body}>
        여기에 하나 더 — <strong>65세 이전에 고용보험에 가입</strong>한 사람이어야 해요.
        65세 이후에 새로 취업해서 고용보험에 가입한 경우는 실업급여 대상이 아니에요.
        다만 65세 이전에 가입했다면 퇴직 시점이 70세여도 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>고용 형태별로 자격이 달라요</H2>
      <p style={body}>
        고용 형태보다 <strong>고용보험 가입 여부</strong>가 핵심이에요.
      </p>
      <BorderBox>
        <p><strong>정규직·계약직·파견직</strong> — 고용보험 자동 가입, 퇴사 시 자격 있음</p>
        <p><strong>알바</strong> — 주 15시간 이상이면 자동 가입. 여러 알바 합산 가능</p>
        <p><strong>일용직</strong> — 하루만 일해도 고용보험 가입되면 기간에 포함</p>
        <p><strong>특수고용직</strong> — 퀵서비스·택배·보험설계사 등은 임의가입 대상. 본인이 직접 가입해야 함</p>
        <p><strong>자영업자</strong> — 임의가입 후 보험료 납부해야 폐업 시 수급 가능</p>
        <p><strong>공무원·교직원</strong> — 별도 실업급여 제도 적용, 일반 고용보험 대상 아님</p>
      </BorderBox>

      <Divider />

      <H2>수급자격 인정신청은 이렇게 해요</H2>
      <p style={body}>
        자격이 되는 것 같다면 바로 신청하세요. 늦을수록 받을 수 있는 기간이 줄어요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS} />
      <p style={body}>
        수급자격이 인정되면 나이와 가입기간에 따라 <strong>120~270일</strong> 동안 급여를 받아요.
        기간이 끝나도 취업 못 하면 <a href="/w/실업급여-연장" style={{ color: "#1D9E75", textDecoration: "underline" }}>연장급여</a>를 신청할 수 있어요.
      </p>

      <Divider />

      <CategoryButton label="고용" count={8} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성했어요. 개인 상황에 따라 결과가 다를 수 있으니 관할 고용센터에서 최종 확인하세요." />
    </ArticleLayout>
  );
}
