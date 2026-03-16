"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 1년 이상 일했어요" },
  { id: "c2", label: "주 평균 15시간 이상 근무했어요(4주 평균)" },
  { id: "c3", label: "근무 기록(스케줄표·급여명세서)이 남아 있어요" },
  { id: "c4", label: "퇴직일로부터 3년이 지나지 않았어요" },
];

const CHECKLIST = [
  "근로계약서 — 주 근무시간, 시급, 계약 기간 확인",
  "근무 스케줄표 — 주 15시간 이상 증빙의 핵심 자료",
  "급여명세서 또는 통장 입금 내역 — 평균임금 산정용",
  "4대보험 가입 이력 — 근로 기간 확인",
  "카카오톡·문자 기록 — 근무 사실 보조 증빙",
];

const FAQS = [
  { q: "주 15시간 미만이면 무조건 퇴직금을 못 받나요?", a: "네, 4주 평균 주 15시간 미만이면 퇴직금이 발생하지 않아요. 이 기준은 법으로 정해져 있어서 예외가 없죠." },
  { q: "방학 때만 일하면 1년 기준은 어떻게 되나요?", a: "같은 사업장에서 반복 근무하면 기간이 합산돼요. 여름 3개월 + 겨울 3개월 + 다음 여름 6개월 = 12개월이면 충족이죠." },
  { q: "4대보험에 가입 안 했는데 퇴직금을 받을 수 있나요?", a: "받을 수 있어요. 4대보험 가입 여부와 퇴직금 지급 의무는 별개 문제예요. 실제 근무 사실이 입증되면 되죠." },
  { q: "시급제 알바 퇴직금은 어떻게 계산하나요?", a: "퇴직 전 3개월간 받은 총 급여를 총 일수로 나눠서 일 평균임금을 구하고, 30일을 곱한 뒤 근속연수를 곱하면 돼요." },
  { q: "사장이 주 15시간 미만이었다고 거짓말하면?", a: "근무 스케줄표, 카톡 대화, CCTV 등 간접 증거로 실제 근무 시간을 입증할 수 있어요. 고용노동부에서 이런 자료를 인정하죠." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "근로자퇴직급여 보장법 — 퇴직금 지급 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    { label: "근로기준법 제18조 — 단시간 근로자", url: "https://www.law.go.kr/법령/근로기준법" },
  ]},
  { category: "공식 자료", items: [
    { label: "고용노동부 — 알바 노동권익 안내", url: "https://www.moel.go.kr" },
    { label: "고용노동부 민원마당 — 임금·퇴직금 신고", url: "https://minwon.moel.go.kr" },
  ]},
];

const RELATED = [
  { slug: "알바-퇴직금", title: "알바 퇴직금 받을 수 있는 조건", description: "알바도 1년 이상 근무했다면 퇴직금을 받을 수 있어요." },
  { slug: "퇴직금-몇개월부터", title: "퇴직금 몇 개월부터 받을 수 있나요", description: "1년 기준 계산 방법과 예외 상황을 정리했어요." },
  { slug: "1년미만-퇴직금-지급규정", title: "1년 미만 퇴직금 지급 규정", description: "1년 미만 알바의 퇴직금 지급 규정을 확인해보세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="알바-퇴직금-지급기준" />}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 알바 · 지급기준</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>알바 퇴직금 지급 기준,<br />주 15시간과 1년 조건</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        알바 퇴직금, 기준이 뭔지 헷갈리죠? 핵심은 딱 두 가지예요. 주 평균 <strong>15시간 이상</strong> 일할 것, 같은 곳에서 <strong>1년 이상</strong> 일할 것.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>이 정한 이 두 조건만 충족하면 업종이나 사업장 규모와 관계없이 퇴직금을 받을 수 있죠.
        주 15시간 계산법, 방학 기간 공백 처리, 기준 미달 시 대처법까지 하나씩 짚어볼게요.
      </p>
      <Divider /><ArticleAd position="intro" />

      <H2>알바 퇴직금 지급 기준이 뭔가요?</H2>
      <p style={body}>기준은 명확해요. <strong>1년 이상</strong> 같은 사업장에서 <strong>주 평균 15시간 이상</strong> 근무하면 퇴직금 지급 의무가 발생하죠. 이 두 조건은 근로자퇴직급여 보장법에 명시돼 있고, 정규직이든 알바든 동일하게 적용돼요.</p>
      <p style={body}>사업장 규모도 상관없어요. 편의점, 카페, 식당 — 종업원 1명인 가게에서 일해도 조건을 충족하면 퇴직금을 받을 수 있죠. 2012년부터 모든 사업장에 퇴직금 지급 의무가 확대됐기 때문이에요.</p>
      <p style={body}>&ldquo;계속 근로 1년&rdquo;이란 고용관계가 끊김 없이 이어진 기간을 뜻해요. 같은 매장에서 중간에 계약을 갱신했거나, 잠시 쉬었다가 복귀한 경우에도 실질적으로 이어졌다면 합산할 수 있죠.</p>
      <GreenBox title="알바 퇴직금 지급 기준 요약">1. 같은 사업장에서 <strong>1년 이상</strong> 계속 근무<br />2. 주 평균 <strong>15시간 이상</strong> 근로 (4주 평균)<br />3. 업종·규모·고용형태 <strong>무관</strong></GreenBox>
      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="4가지 다 해당돼요. 퇴직금 지급 기준을 충족한 상황이에요." partialMatchText="일부만 해당돼요. 나머지 조건도 확인하고 고용노동부(1350)에 상담해보세요." />
      <Divider />

      <H2>주 15시간 기준을 어떻게 계산하나요?</H2>
      <p style={body}>4주 동안의 총 근로시간을 4로 나누면 돼요. 예를 들어 1주차 18시간, 2주차 12시간, 3주차 16시간, 4주차 14시간이면 평균이 15시간이라 기준을 딱 충족하죠.</p>
      <p style={body}>매주 시간이 일정하지 않아도 괜찮아요. 시험 기간에 줄이고 방학에 늘리는 패턴이라면 전체 기간의 평균으로 계산해요. 한두 주 15시간 미만이었다고 바로 제외되는 게 아니죠.</p>
      <p style={body}>근무 스케줄표가 가장 확실한 증빙이에요. 스케줄표가 없다면 급여명세서에서 역산할 수 있죠. 시급 x 근무 시간 = 총 급여이니까, 총 급여를 시급으로 나누면 총 근무 시간이 나오는 거예요.</p>
      <BorderBox title="스케줄표를 사장이 안 준다면">카카오톡 대화, 매장 CCTV, 동료 증언으로도 근무 시간을 증명할 수 있어요.<br />고용노동부에서 이런 간접 증거를 인정하는 경우가 많으니, 평소에 기록을 남겨두세요.</BorderBox>
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>방학 기간이 있어도 1년이 인정되나요?</H2>
      <p style={body}>같은 사업장에서 반복 근무했다면 인정받을 수 있어요. 학기 중에 쉬었다가 방학 때마다 같은 매장으로 돌아갔다면, 고용노동부에서는 &ldquo;계속 근로&rdquo;로 볼 가능성이 높죠.</p>
      <p style={body}>다만 공백 기간이 너무 길면 별도 근로관계로 판단될 수 있어요. 1~2주 공백은 문제없지만, 3~4개월 이상 비어 있으면 위험해지죠. &ldquo;복귀 약속&rdquo;이 있었다는 증거(문자, 카톡 등)가 있으면 유리해요.</p>
      <p style={body}>방학 알바를 여러 번 했는데 사장이 &ldquo;매번 새 계약이라 퇴직금 해당 안 된다&rdquo;고 주장하는 경우가 있죠. 형식적으로 계약서를 새로 쓰더라도 같은 업무, 같은 장소, 같은 조건이면 하나의 근로관계로 봐요.</p>
      <Divider />

      <H2>기준 미달 시 퇴직금이 아예 없나요?</H2>
      <p style={body}>주 15시간 미만이거나 1년을 채우지 못했다면 법적으로 퇴직금이 발생하지 않아요. 다만 사업주와의 약정이나 취업규칙에 &ldquo;퇴직금 지급&rdquo;이 명시돼 있다면 별도로 청구할 수 있는 여지가 있죠.</p>
      <p style={body}>기준 미달이 사업주의 편법 때문이라면 대응할 수 있어요. 예를 들어 1년이 되기 직전에 해고하거나, 주 15시간 미만으로 계약서만 작성하고 실제로는 더 일하게 한 경우죠. 이런 상황이라면 실제 근무 기록을 가지고 고용노동부에 상담을 받아보세요.</p>
      <p style={body}>기준 충족 여부가 애매하다면 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>(1350) 전화 상담이 가장 빠른 해결책이에요. 무료이고 상담 결과가 불이익을 주지 않으니 부담 없이 문의하세요.</p>

      <SectionBadge>준비 서류</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>알바 퇴직금 지급 기준에 대해 자주 나오는 질문이에요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
