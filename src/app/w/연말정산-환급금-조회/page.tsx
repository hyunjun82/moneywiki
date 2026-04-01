"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연말정산 끝나고 환급금 얼마인지 확인하고 싶은 직장인이에요.
// Q2. 홈택스에서 환급금 조회하고, 지급 시기를 파악하는 행동.
// Q3. 조회 경로(홈택스/손택스), 차감징수세액 읽는 법, 지급 시기, 안 보일 때 대처법.
// Q4. Steps(조회 절차) + GreenBox(핵심 요약) + BorderBox(차감징수세액 읽는 법) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const STEPS_DATA = [
  {
    title: "홈택스 접속 후 로그인",
    desc: "홈택스(hometax.go.kr)에 들어가서 공동인증서, 간편인증, 또는 금융인증서로 로그인해요. 모바일이면 손택스 앱도 동일하게 이용 가능해요.",
  },
  {
    title: "My홈택스 → 연말정산·지급명세서",
    desc: "상단 메뉴에서 'My홈택스'를 클릭하고, '연말정산/장려금' 메뉴로 들어가요. 손택스에서는 'MY 홈택스 → 연말정산 간소화·지급명세서'로 들어가면 돼요.",
  },
  {
    title: "지급명세서 조회 클릭",
    desc: "근로소득 지급명세서를 선택해요. 회사가 국세청에 제출한 뒤에야 조회되니까, 보통 3월 10일 이후에 확인 가능해요.",
    tip: "3월 10일 전에는 지급명세서가 안 뜰 수 있어요",
  },
  {
    title: "차감징수세액 확인",
    desc: "명세서 맨 아래 '차감징수세액'을 봐요. 마이너스(-)면 돌려받는 금액이고, 플러스(+)면 추가로 내야 하는 금액이에요.",
  },
];

const FAQS = [
  {
    q: "환급금은 언제 입금되나요?",
    a: "회사 일정에 따라 2월 또는 3월 급여에 포함돼요. 국세청이 직접 입금하는 게 아니라 회사 급여 계좌로 들어와요. 회사마다 정산 시기가 달라서 정확한 날짜는 인사팀에 문의하세요.",
  },
  {
    q: "손택스 앱에서도 조회되나요?",
    a: "네. 손택스 앱 설치 후 로그인하면 동일하게 조회 가능해요. MY홈택스 → 연말정산 메뉴에서 지급명세서를 확인하세요.",
  },
  {
    q: "지급명세서가 조회 안 되면 어떻게 하나요?",
    a: "회사가 국세청에 제출하기 전이면 안 보여요. 3월 10일 법정 제출 기한 이후에 다시 확인해 보세요. 그래도 안 나오면 회사 인사팀에 제출 여부를 물어보세요.",
  },
  {
    q: "추가납부면 어떻게 알 수 있나요?",
    a: "차감징수세액이 플러스(+)면 추가납부예요. 결정세액이 기납부세액보다 크면 세금을 더 내야 하는 거죠. 10만원 초과 시 3개월 분할납부도 가능해요.",
  },
  {
    q: "ARS로도 환급금 조회가 가능한가요?",
    a: "1544-9944로 전화하면 ARS 조회가 가능해요. PC나 모바일이 어려운 경우 활용하세요.",
  },
  {
    q: "퇴사자인데 환급금은 어디서 받나요?",
    a: "퇴사한 회사에서 연말정산을 진행했으면 그 회사에서 지급해요. 회사가 처리 안 했다면 5월 종합소득세 신고 때 직접 홈택스에서 신고하면 돌려받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "국세청 홈택스 — 연말정산 간소화", url: "https://www.hometax.go.kr" },
      { label: "소득세법 제137조 — 근로소득세액의 연말정산", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "국세청 — 연말정산 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-환급금-계산", title: "연말정산 환급금 계산", description: "내가 돌려받을 금액, 미리 계산해 봐요." },
  { slug: "연말정산-추가납부-분할", title: "연말정산 추가납부 분할", description: "추가납부 세금, 3개월 나눠서 내는 방법이에요." },
  { slug: "연말정산-공제항목", title: "연말정산 공제항목", description: "놓치기 쉬운 공제항목을 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 환급금 · 조회</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 환급금, 얼마 돌려받나?<br />
        홈택스 조회 방법과 지급 시기
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        연말정산 끝나고 "내 환급금 얼마지?" 궁금하죠.{" "}
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a> 지급명세서에서
        '차감징수세액'을 보면 바로 알 수 있어요. 마이너스(-)면 돌려받는 금액이고, 보통 2~3월 급여에 포함돼서 들어와요.
      </p>

      <Divider />

      <H2>환급금 조회하는 방법</H2>
      <p style={body}>
        PC든 모바일이든 3분이면 끝나요. 홈택스 또는 손택스 앱에서 지급명세서를 열면 바로 확인 가능해요.
      </p>

      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>차감징수세액, 이렇게 읽어요</H2>
      <p style={body}>
        지급명세서를 열면 숫자가 잔뜩 나와서 헷갈리죠. 핵심은 딱 하나, 맨 아래 '차감징수세액'이에요. 이 금액의 부호가 환급인지 추가납부인지를 결정해요.
      </p>

      <SectionBadge>차감징수세액 읽는 법</SectionBadge>
      <BorderBox>
        <strong>마이너스(-) 금액</strong> → 돌려받는 환급금이에요. 예를 들어 -52만원이면 52만원을 환급받아요.<br /><br />
        <strong>플러스(+) 금액</strong> → 추가로 내야 하는 세금이에요. 예를 들어 +30만원이면 30만원을 더 내야 해요.<br /><br />
        <strong>계산 원리</strong>: 결정세액(올해 내야 할 세금) - 기납부세액(이미 낸 세금) = 차감징수세액이에요.
      </BorderBox>

      <GreenBox title="환급 vs 추가납부 기준">
        매달 원천징수된 세금이 실제 결정세액보다 많으면 → 환급<br />
        매달 원천징수된 세금이 실제 결정세액보다 적으면 → 추가납부<br />
        원천징수 비율을 80%로 낮춰뒀거나, 성과급이 많았으면 추가납부 가능성이 커요.
      </GreenBox>

      <Divider />

      <H2>환급금은 언제, 어디로 들어오나요?</H2>
      <p style={body}>
        환급금은 국세청이 직접 입금하는 게 아니에요. 회사가 연말정산을 마무리한 뒤 급여에 포함해서 지급해요. 대부분 2월 또는 3월 급여일에 월급과 함께 입금돼요.
      </p>

      <GreenBox title="지급 시기 정리">
        2월 급여일: 연말정산을 빨리 마무리한 회사<br />
        3월 급여일: 대부분의 회사가 이 시기에 지급해요<br />
        지급명세서 조회: 3월 10일 이후부터 가능 (회사의 국세청 제출 기한)
      </GreenBox>

      <p style={body}>
        중소기업은 3월 급여에 반영하는 경우가 많고, 대기업은 2월에 처리하는 편이에요. 정확한 시기는 인사팀에 물어보는 게 가장 빨라요.{" "}
        <a href="/w/연말정산-추가납부-분할" style={{ color: "#1D9E75", textDecoration: "underline" }}>추가납부가 나왔다면</a> 3개월 분할납부도 가능하니까 참고하세요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2025년 귀속(2026년 연말정산) 소득세법 기준으로 작성됐어요. 환급금 지급 시기는 회사마다 다르니 정확한 일정은 인사팀에 문의하세요." />
    </ArticleLayout>
  );
}
