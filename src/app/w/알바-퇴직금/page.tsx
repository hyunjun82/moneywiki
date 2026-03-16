"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 1년 이상 근무했어요" },
  { id: "c2", label: "주 평균 15시간 이상 일했어요" },
  { id: "c3", label: "근로계약서나 급여 입금 기록이 남아 있어요" },
  { id: "c4", label: "퇴직 후 아직 3년이 지나지 않았어요" },
];

const CHECKLIST = [
  "근로계약서 — 주 근무시간, 시급, 계약 기간 확인",
  "급여명세서 또는 통장 입금 내역 — 평균임금 산정용",
  "근무 스케줄표 — 주 15시간 이상 증빙",
  "4대보험 가입 이력 — 근로 기간 입증",
  "사업장 정보(사업자등록번호) — 신고 시 필요",
];

const FAQS = [
  {
    q: "편의점 알바 1년 했는데 퇴직금 받을 수 있나요?",
    a: "주 15시간 이상 근무했다면 받을 수 있어요. 편의점, 카페, 식당 — 업종은 상관없죠. 1년 이상 근속이 핵심이에요.",
  },
  {
    q: "4대보험 미가입 알바도 퇴직금을 받나요?",
    a: "받을 수 있어요. 4대보험 가입 여부와 퇴직금 지급 의무는 별개 문제죠. 실제로 근로했다는 증빙이 있으면 돼요.",
  },
  {
    q: "단기 알바 3개월만 했는데 퇴직금이 나오나요?",
    a: "3개월만 일하고 끝났다면 안 돼요. 하지만 같은 곳에서 계속 일하며 총 기간이 1년을 넘으면 퇴직금이 발생하죠.",
  },
  {
    q: "사장이 퇴직금 없다고 우기면 어떻게 하나요?",
    a: "고용노동부(1350)에 전화 상담 → 내용증명 발송 → 진정 접수 순서로 대응하세요. 대부분 내용증명 단계에서 해결돼요.",
  },
  {
    q: "알바 퇴직금 계산은 정규직과 같나요?",
    a: "완전히 같아요. 퇴직 전 3개월 평균임금 x 근속연수로 계산하죠. 시급제 알바는 3개월간 받은 총 급여를 총 일수로 나누면 일 평균임금이 나와요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 — 퇴직금 지급 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 — 근로자 정의 및 퇴직급여", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당 — 임금·퇴직금 미지급 신고", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "알바-퇴직금-지급기준",
    title: "알바 퇴직금 지급 기준 주 15시간 조건",
    description: "주 15시간 기준 계산법과 1년 조건을 상세히 정리했어요.",
  },
  {
    slug: "퇴직금-조건",
    title: "퇴직금 받을 수 있는 조건",
    description: "근로 기간, 근로시간 등 퇴직금 발생 조건을 한눈에 볼 수 있어요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고 방법",
    description: "퇴직금을 안 주면 어디에 어떻게 신고하는지 안내해요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="알바-퇴직금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 알바 · 고용유형</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        알바 퇴직금, 단기 알바도<br />
        받을 수 있나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;알바한테 무슨 퇴직금?&rdquo;이라는 말, 아직도 흔하죠?
        틀렸어요. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>은 알바와 정규직을 구분하지 않아요.
        1년 넘게 주 15시간 이상 일했다면 퇴직금은 법적 권리죠.
        사장이 &ldquo;알바는 해당 안 된다&rdquo;고 해도 법이 보장하니 걱정 마세요.
        조건, 계산법, <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>미지급 시 신고 방법</a>까지 순서대로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>알바도 퇴직금을 받을 수 있나요?</H2>
      <p style={body}>
        받을 수 있어요. 근로자퇴직급여 보장법은 근로계약을 맺고 일하는 모든 사람에게 적용돼요. 알바, 파트타임, 계약직 — 이름이 뭐든 근로자라면 동일하죠. 1년 이상 계속 근무하고, 주 평균 15시간 이상 일했다면 퇴직금 지급 의무가 생겨요.
      </p>
      <p style={body}>
        사업주가 &ldquo;알바는 퇴직금 대상이 아니다&rdquo;라고 주장해도 법적 근거가 전혀 없어요. 2012년부터 사업장 규모와 관계없이 모든 사업장에 퇴직금 지급 의무가 확대됐기 때문이죠. 1인 사업장이라도 예외가 아니에요.
      </p>
      <p style={body}>
        핵심은 &ldquo;계속 근로 1년&rdquo;과 &ldquo;주 15시간&rdquo;, 이 두 가지예요. 이걸 충족하면 업종, 사업장 규모, 고용 형태에 관계없이 퇴직금을 받을 수 있죠. 4대보험에 가입하지 않았더라도 실제 근로 사실이 확인되면 퇴직금 청구가 가능해요.
      </p>

      <GreenBox title="알바 퇴직금 핵심 조건">
        1. <strong>1년 이상</strong> 같은 사업장에서 계속 근무<br />
        2. 주 평균 <strong>15시간 이상</strong> 근로<br />
        3. 업종·규모·고용형태 <strong>무관</strong>
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당돼요. 퇴직금을 받을 수 있는 조건을 갖췄어요."
        partialMatchText="일부만 해당돼요. 고용노동부(1350)에 상담부터 받아보세요."
      />

      <Divider />

      <H2>주 15시간 기준이 왜 중요한가요?</H2>
      <p style={body}>
        주 평균 15시간은 <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 발생 여부를 가르는 기준선</a>이에요. 이 기준 미만으로 일하면 &ldquo;초단시간 근로자&rdquo;로 분류돼서 퇴직금, 주휴수당, 연차 등이 적용되지 않죠. 주 14시간 59분이면 안 되고, 15시간이면 되는 거예요.
      </p>
      <p style={body}>
        &ldquo;주 15시간&rdquo;은 4주(한 달) 평균으로 계산해요. 이번 주에 20시간 일하고 다음 주에 10시간 일해도, 4주 평균이 15시간이면 조건 충족이죠. 시험 기간에 시간을 줄였다가 방학에 늘리는 패턴이어도 전체 평균으로 판단하기 때문에 불리하지 않아요.
      </p>
      <p style={body}>
        근무 스케줄표, 출퇴근 기록, 급여명세서가 15시간 이상을 증명하는 자료가 되죠. 사장이 &ldquo;주 14시간이었다&rdquo;고 주장하더라도 실제 근무 기록이 15시간 이상이면 그게 우선해요. 증빙 자료를 평소에 모아두는 게 중요하죠.
      </p>

      <BorderBox title="근무 시간 기록이 없다면">
        출퇴근 기록이 없어도 카카오톡 대화, 매장 CCTV, 동료 증언 등으로 근무 시간을 증명할 수 있어요.<br />
        고용노동부에서도 이런 간접 증거를 인정하는 경우가 많죠.
      </BorderBox>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>단기 알바는 퇴직금이 없나요?</H2>
      <p style={body}>
        3개월, 6개월 같은 단기 알바로 끝났다면 퇴직금이 발생하지 않아요. 법에서 정한 &ldquo;1년 이상 계속 근로&rdquo; 조건을 충족하지 못했기 때문이죠. 다만 같은 사업장에서 반복적으로 일했다면 기간이 합산될 수 있어요.
      </p>
      <p style={body}>
        예를 들어 같은 카페에서 여름 방학 3개월 + 겨울 방학 3개월 + 이듬해 여름 6개월을 일했다면 총 12개월로 퇴직금 조건을 충족하죠. 중간에 학기 중 공백이 있더라도 &ldquo;같은 사업장, 같은 업무&rdquo;로 복귀했다면 계속 근로로 인정받을 가능성이 높아요.
      </p>
      <p style={body}>
        퇴직금을 피하려고 사장이 11개월 30일에 해고하는 경우도 있어요. 이건 명백한 탈법이고, 고용노동부에 진정하면 부당해고로 판단될 수 있죠. 이런 상황이라면 증거를 확보한 뒤 바로 신고하세요.
      </p>

      <Divider />

      <H2>사장이 퇴직금 없다고 하면 어떻게 하나요?</H2>
      <p style={body}>
        먼저 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>(1350)에 전화 상담을 받으세요. 본인 상황이 퇴직금 대상인지 확인해주죠. 대상이 맞다면 사장에게 내용증명을 보내는 게 다음 단계예요. &ldquo;퇴직금 미지급 시 고용노동부에 신고하겠다&rdquo;는 내용이면 충분해요.
      </p>
      <p style={body}>
        내용증명 이후에도 지급하지 않으면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 민원마당에서 온라인으로 진정을 접수</a>하세요. 근로감독관이 사업장을 조사하고, 시정 명령을 내리죠. 사업주가 이를 이행하지 않으면 형사 처벌까지 갈 수 있어요.
      </p>
      <p style={body}>
        소멸시효가 퇴직일로부터 <strong>3년</strong>이라는 점도 잊지 마세요. &ldquo;나중에 해야지&rdquo; 미루다가 시효가 끝나면 법적으로 청구할 수 없어요. 퇴직 후 최대한 빨리 대응하는 게 유리하죠.
      </p>

      <Divider />

      <H2>알바 퇴직금 청구 방법은?</H2>
      <p style={body}>
        퇴직금 청구는 크게 세 단계예요. 회사에 직접 요청 → 내용증명 발송 → 고용노동부 신고. 대부분 첫 번째나 두 번째 단계에서 해결되죠. 내용증명은 &ldquo;법적 조치를 하겠다&rdquo;는 의사 표현이라 효과가 큰 편이에요.
      </p>
      <p style={body}>
        고용노동부 신고는 온라인(민원마당)이나 관할 고용노동지청 방문으로 할 수 있어요. 접수 후 약 2~4주 내에 근로감독관이 사업주를 조사하고, 퇴직금 지급 시정 명령을 내리죠. 사업주가 명령을 이행하지 않으면 검찰 송치까지 갈 수 있어요.
      </p>
      <p style={body}>
        청구할 때 필요한 서류를 미리 챙겨두면 절차가 훨씬 빨라져요. 근로계약서, 급여명세서, 근무 기록이 핵심이죠. 없다면 카카오톡 대화, 통장 입금 내역, 동료 증언 등 간접 증거라도 모아두세요.
      </p>

      <SectionBadge>청구 전 준비 서류</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        알바 퇴직금에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
