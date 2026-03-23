"use client";

// Q1. 임신 초기라 입덧이 심하고 피곤한데, 근무시간을 줄일 수 있는지 궁금한 상황
// Q2. 회사 인사팀에 근로시간 단축 신청서를 제출해서 하루 2시간 단축근무를 한다
// Q3. 대상 기간(12주 이내·32주 이후), 임금 보장 여부, 신청 방법, 거부 시 대응, 연차 처리
// Q4. GreenBox로 제도 요약 + Steps로 신청 절차 + BorderBox로 임금·연차 안내

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "병원에서 임신 확인서(진단서) 받기",
    desc: "산부인과에서 임신 진단서나 소견서를 발급받아요. 임신 주수가 기재돼 있어야 해요.",
    tip: "고위험 임산부는 주수 관계없이 전 기간 단축 가능 → 진단서에 '유산·조산 위험' 명시 필요",
  },
  {
    title: "회사 인사팀에 '근로시간 단축 신청서' 제출",
    desc: "신청서에 단축 기간, 단축 방법(조기 퇴근, 늦은 출근 등)을 적어요. 진단서를 함께 첨부하고요.",
  },
  {
    title: "회사와 구체적인 단축 방법 협의",
    desc: "하루 2시간을 어떻게 줄일지 정해요. 출근 시간을 늦추거나 퇴근을 앞당기거나 점심시간을 늘리는 방법 중 선택해요.",
    tip: "사업주는 신청을 거부할 수 없어요. 거부 시 500만원 이하 과태료",
  },
  {
    title: "단축근무 시작",
    desc: "합의된 일정대로 단축근무를 시작해요. 임신 기간 내에서 자유롭게 기간을 정할 수 있고, 필요하면 중간에 종료하거나 연장할 수 있어요.",
  },
];

const FAQS = [
  { q: "단축된 2시간만큼 임금이 깎이나요?", a: "근로기준법 개정으로 단축된 시간의 임금을 삭감할 수 없어요. 8시간분 임금을 그대로 받으면서 6시간만 일하는 거예요." },
  { q: "2시간보다 더 줄일 수 있나요?", a: "법으로 보장되는 건 하루 2시간이에요. 그 이상은 회사와 개별 협의해야 하고, 회사가 거부할 수 있어요." },
  { q: "회사에서 안 된다고 하면 어떻게 하나요?", a: "사업주가 거부하면 고용노동부(1350)에 신고하세요. 500만원 이하 과태료가 부과돼요. 근로기준법 제74조에서 사업주 의무로 정해져 있어요." },
  { q: "임신 13주~31주 사이에는 못 쓰나요?", a: "2025년 2월 개정으로 32주 이후로 앞당겨졌어요. 12주 이내 또는 32주 이후에 쓸 수 있고, 고위험 임산부는 전 기간 가능해요." },
  { q: "단축근무 기간에 연차가 줄어드나요?", a: "아니요. 임신기 근로시간 단축 기간은 연차 산정 시 출근한 것으로 봐요. 연차 일수에 불이익이 없어요." },
  { q: "야근이나 휴일 근무도 거부할 수 있나요?", a: "네. 임산부는 야간근로(22시~06시)와 휴일근로를 거부할 권리가 있어요. 사업주가 강요하면 근로기준법 위반이에요." },
];

const SOURCES = [
  { name: "근로기준법 제74조", href: "https://www.law.go.kr/법령/근로기준법" },
  { name: "남녀고용평등법", href: "https://www.law.go.kr/법령/남녀고용평등과일ㆍ가정양립지원에관한법률" },
  { name: "고용노동부 임신기 근로시간 단축 안내", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "출산전후휴가", title: "출산전후휴가 제도", description: "출산 전후 90일(다태 120일) 유급휴가 안내." },
  { slug: "육아기-근로시간-단축", title: "육아기 근로시간 단축", description: "만 8세 이하 자녀가 있으면 단축근무 가능." },
  { slug: "임신-보호", title: "임신 중 근로자 보호", description: "야간근로 금지, 위험 업무 전환 등." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 임신 · 단축근무</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임신했는데 8시간 근무가 힘들다면?<br />
        근로시간 단축 신청 방법과 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        입덧이 심하고 피곤한데 하루 8시간이 버겁죠. 법이 보장하는 권리가 있어요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제74조</a>에 따라 임신 12주 이내 또는 32주 이후 근로자는 하루 2시간 단축근무를 신청할 수 있어요.
        2025년 개정으로 사용 가능 시기가 36주에서 32주로 앞당겨졌고, 임금 삭감도 금지됐어요.
        회사는 거부할 수 없고, 거부하면 과태료를 내야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>누가, 언제 쓸 수 있나요?</H2>
      <p style={body}>
        기본적으로 임신 초기와 말기에 쓸 수 있어요. 고위험 임산부는 전 기간 가능하고요.
      </p>

      <GreenBox>
        대상: 임신한 여성 근로자 (정규직·계약직·파트타임 무관){"\n"}
        사용 시기: 임신 12주 이내 또는 32주 이후{"\n"}
        고위험 임산부: 유산·조산 위험 진단 시 임신 전 기간{"\n"}
        단축 시간: 하루 2시간 (8시간 → 6시간){"\n"}
        임금: 삭감 불가 (8시간분 전액 지급){"\n"}
        사업주 의무: 거부 불가 (위반 시 과태료 500만원)
      </GreenBox>

      <p style={body}>
        2025년 2월 개정 전에는 36주 이후부터 가능했는데, 이제 32주로 4주 앞당겨져서 8개월차부터 쓸 수 있어요.
      </p>

      <CategoryButton label="근로 정보" count={10} href="/category/근로" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신청은 이렇게 해요</H2>
      <p style={body}>
        진단서 하나면 시작할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>임금과 연차, 불이익은 없나요?</H2>
      <p style={body}>
        가장 많이 걱정하는 부분이에요.
      </p>

      <BorderBox>
        <strong>임금</strong>: 단축된 시간 임금을 삭감할 수 없어요. 법 개정으로 명시됨.{"\n\n"}
        <strong>연차</strong>: 단축 기간은 출근한 것으로 간주해서 연차 일수에 불이익 없어요.{"\n\n"}
        <strong>야간·휴일근로</strong>: 임산부는 야간(22~06시)과 휴일 근로를 거부할 수 있어요.{"\n\n"}
        <strong>인사 불이익</strong>: 단축근무를 이유로 불리한 처우를 하면 남녀고용평등법 위반이에요.
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>임신 중 단축근무에 대해 많이 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법 제74조를 바탕으로 작성했어요. 제도 내용은 법 개정에 따라 변경될 수 있으니 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
