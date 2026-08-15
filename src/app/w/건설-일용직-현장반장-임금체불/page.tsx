"use client";
// Q1. 건설현장에서 일했는데 현장반장이 일당 안 주고 잠적한 상황
// Q2. 원청 건설사에 직접 임금을 청구하고 노동청 진정을 넣어 체불임금을 받아낸다
// Q3. 건설산업기본법 제44조의2(도급인 연대책임), 노동청 진정 절차, 필요 증거, 임금채권 우선변제
// Q4. Steps(임금 청구 절차) + DocTable(증거자료) + GreenBox(법 근거) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "일한 증거부터 모으세요",
    desc: "현장반장과 주고받은 문자, 카톡, 통화 녹음이 가장 강력한 증거예요. 작업일지, 현장 사진, 동료 근로자의 연락처도 챙기세요. 근로계약서가 없어도 실제 일한 사실만 입증하면 돼요.",
    tip: "일당, 근무일수가 적힌 문자가 있으면 핵심 증거",
  },
  {
    title: "관할 고용노동부 지청에 진정서를 내세요",
    desc: "고용노동부 홈페이지나 관할 지청에 방문해서 '임금체불 진정서'를 접수해요. 현장 주소, 공사명, 원청 건설사명, 근무 기간, 체불 금액을 기재하면 돼요. 현장반장이 잠적했다면 원청 건설사를 상대로 진정 가능해요.",
    tip: "온라인 민원: minwon.moel.go.kr",
    link: { label: "고용노동부 민원", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "노동청 조사에 협조하세요",
    desc: "근로감독관이 원청 건설사와 하도급 업체를 조사해요. 출석 요구에 응하고 증거자료를 제출하면 돼요. 체불 사실이 확인되면 사업주에게 시정 지시가 내려가요.",
    tip: "조사 기간은 보통 1~3개월",
  },
  {
    title: "체불임금 확인서를 받아 강제집행하세요",
    desc: "사업주가 시정 지시를 안 따르면 노동청에서 '체불임금 확인서'를 발급해줘요. 이걸로 원청 건설사의 재산(공사대금 등)을 압류할 수 있어요. 소액사건은 소액재판으로 빠르게 처리돼요.",
    tip: "체불임금 확인서 = 소송 없이 강제집행 가능",
  },
];

const DOCS = [
  { name: "현장반장과 문자·카톡 내역", required: true, where: "휴대폰 캡처" },
  { name: "작업일지 또는 출퇴근 기록", required: false, where: "현장 비치 또는 본인 기록" },
  { name: "동료 근로자 진술서", required: false, where: "동료 연락처 확보" },
  { name: "현장 사진·영상", required: false, where: "작업 중 촬영분" },
  { name: "통장 입금 내역", required: false, where: "은행 앱 캡처" },
  { name: "임금체불 진정서", required: true, where: "노동부 양식 또는 자유 양식" },
];

const CHECKLIST = [
  "현장반장 실명과 연락처 기록 / 잠적 전 확보 필수",
  "원청 건설사명과 주소 확인 / 현장 입구 간판이나 공사 안내문",
  "일한 날짜와 일당 기록 / 문자, 메모, 달력 표시",
  "동료 근로자 연락처 2명 이상 확보 / 증인으로 필요",
  "진정서 접수 후 접수번호 보관 / 진행 상황 조회에 필요",
];

const FAQS = [
  {
    q: "현장반장이 도망갔는데 원청한테 진짜 돈 받을 수 있어요?",
    a: "네, 가능해요. 건설산업기본법 제44조의2에 따라 도급인(원청)은 하도급 근로자 임금에 대해 연대책임을 져요. 현장반장이 없어도 원청에 직접 청구할 수 있어요.",
  },
  {
    q: "근로계약서가 없는데 괜찮아요?",
    a: "괜찮아요. 일용직은 구두 계약이 많은데, 실제 일한 사실만 증명하면 돼요. 문자, 동료 증언, 현장 사진 등이 모두 증거가 돼요. 계약서가 없다고 포기하지 마세요.",
  },
  {
    q: "노동청 진정 넣으면 바로 돈 받을 수 있나요?",
    a: "바로는 아니에요. 조사에 1~3개월 정도 걸리고, 시정 지시 후 사업주가 안 따르면 체불임금 확인서를 받아서 강제집행해야 해요. 빠르면 2~3개월, 늦으면 6개월 정도 걸려요.",
  },
  {
    q: "임금을 3년 넘게 못 받았으면 청구 못 하나요?",
    a: "임금채권 소멸시효가 3년이에요. 체불일로부터 3년이 지나면 법적 청구가 어려워요. 3년이 되기 전에 반드시 진정이나 소송을 제기하세요.",
  },
  {
    q: "원청 건설사가 파산하면 어떡하나요?",
    a: "건설근로자는 임금채권 우선변제권이 있어요. 최종 3개월분 임금과 퇴직금은 다른 채권(은행 대출 등)보다 먼저 받을 수 있어요.",
  },
];

const SOURCES = [
  { name: "건설산업기본법", href: "https://www.law.go.kr/법령/건설산업기본법" },
  { name: "근로기준법", href: "https://www.law.go.kr/법령/근로기준법" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "중소기업-취업자-소득세-감면-이직", title: "중소기업 취업자 소득세 감면", description: "이직 시 감면 혜택 유지 방법." },
  { slug: "기간제근로자-무기계약-전환-시기", title: "기간제근로자 무기계약 전환", description: "2년 초과 근무 시 전환 조건." },
  { slug: "긴급복지-생계지원금-신청-방법", title: "긴급복지 생계지원금 신청", description: "생계 위기 시 긴급 지원." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 임금체불 · 건설 일용직</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        현장반장이 일당 안 주고 잠적했다면?<br />
        원청 청구부터 강제집행까지 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "건설현장에서 한 달 일했는데 반장이 연락이 안 돼요. 일당 못 받는 건가요?"
      </p>
      <p style={body}>
        아니에요, 방법이 있어요. <a href="https://www.law.go.kr/법령/건설산업기본법" style={{ color: "#1D9E75", textDecoration: "underline" }}>건설산업기본법 제44조의2</a>에 따라
        원청 건설사(도급인)가 하도급 근로자 임금에 대해 <strong>연대책임</strong>을 져요.
        현장반장을 못 찾아도 원청에 직접 임금을 청구할 수 있어요.
        근로계약서가 없어도 일한 증거만 있으면 충분해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>원청 건설사에 직접 청구하는 법적 근거</H2>
      <p style={body}>
        건설현장은 원청→하청→재하청 구조로 돼 있어요. 현장반장은 보통 재하청 업체이거나 개인 시공자예요.
        이런 구조에서 일용직이 가장 약자인데, 법이 보호해주고 있어요.
      </p>

      <GreenBox>
        건설산업기본법 제44조의2 (건설근로자의 고용개선){"\n"}
        도급인은 하수급인이 근로자에게 임금을 지급하지 못한 경우{"\n"}
        해당 근로자의 임금에 대해 연대하여 책임을 져요.{"\n\n"}
        쉽게 말하면: 반장이 안 주면 원청 건설사한테 받으면 돼요.
      </GreenBox>

      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>은 정규직·계약직·일용직 구분 없이 모든 근로자에게 적용돼요.
        하루만 일해도 일당을 받을 권리가 있고, 못 받으면 노동청에 진정할 수 있어요.
      </p>

      <CategoryButton label="근로/노동 정보" count={8} href="/category/근로-노동" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>임금 받아내는 절차, 4단계로 정리</H2>
      <p style={body}>
        현장반장이 잠적해도 순서대로 따라가면 돈을 받아낼 수 있어요.
        가장 중요한 건 첫 번째 단계, 증거 확보예요.
      </p>

      <SectionBadge>임금 청구 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>어떤 증거를 모아야 하나요?</H2>
      <p style={body}>
        "계약서도 없고 영수증도 없는데 어떡하죠?" 걱정하지 마세요.
        일용직은 구두 계약이 대부분이라 노동청도 이걸 알고 있어요.
        아래 자료 중 2~3가지만 있으면 충분해요.
      </p>

      <SectionBadge>증거 자료</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>지금 바로 체크해야 할 것들</H2>
      <p style={body}>
        시간이 지나면 증거가 사라지고, 3년 소멸시효가 다가와요.
        오늘 당장 할 수 있는 것부터 챙기세요.
      </p>

      <Checklist items={CHECKLIST} />

      <BorderBox title="무료 상담">
        고용노동부 상담: 국번 없이 1350{"\n"}
        대한법률구조공단: 국번 없이 132{"\n"}
        무료로 임금체불 관련 법률 상담을 받을 수 있어요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 건설산업기본법과 근로기준법으로 작성됐어요. 구체적인 법률 문제는 노동청 또는 법률구조공단에 상담하세요." />
    </ArticleLayout>
  );
}
