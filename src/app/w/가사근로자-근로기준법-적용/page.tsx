"use client";
// Q1. 가정에서 청소·돌봄 일을 하는데 근로기준법 보호를 받을 수 있는지 궁금한 상황
// Q2. 정부인증 가사서비스업체를 통해 계약해서 근로기준법 보호를 받는다
// Q3. 가사근로자 vs 가사사용인 차이, 적용되는 법 조항과 예외, 인증업체 확인 방법
// Q4. GreenBox로 핵심 구분 + CompareTable 통근형/입주형 비교 + Steps 보호받는 절차

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "정부인증 가사서비스업체인지 확인해요",
    desc: "고용노동부 홈페이지에서 인증 업체 목록을 조회할 수 있어요. 개인이 직접 고용한 경우는 가사사용인으로 분류돼서 근로기준법 보호를 못 받아요.",
    tip: "고용노동부 moel.go.kr에서 '가사서비스 인증업체' 검색",
  },
  {
    title: "근로계약서를 서면으로 작성해요",
    desc: "인증업체 소속이면 근로기준법 제17조에 따라 임금, 근무시간, 휴일을 명시한 근로계약서를 써야 해요. 표준계약서를 사용하면 빠짐없이 작성할 수 있어요.",
    tip: "표준계약서는 고용노동부에서 무료로 받을 수 있어요",
  },
  {
    title: "4대보험 가입을 확인해요",
    desc: "인증업체는 가사근로자를 국민연금, 건강보험, 고용보험, 산재보험에 가입시켜야 해요. 급여명세서에서 공제 내역을 꼭 확인하세요.",
    tip: "4대사회보험 정보연계센터에서 가입 여부 직접 조회 가능",
  },
  {
    title: "부당대우 시 노동청에 신고해요",
    desc: "임금체불이나 부당해고를 당하면 관할 고용노동청에 신고할 수 있어요. 산재사고는 근로복지공단에 바로 신청하면 돼요.",
    tip: "고용노동부 민원마당 minwon.moel.go.kr에서 온라인 신고 가능",
  },
];

const CHECKLIST = [
  "정부인증 가사서비스업체 소속인지 확인",
  "근로계약서를 서면으로 작성하고 1부 수령",
  "4대보험 가입 여부 확인 (급여명세서 공제 내역)",
  "주 15시간 이상 근무 시 주휴수당 지급 여부",
  "1년 이상 근무 시 퇴직금 지급 조건 해당 여부",
  "입주형이면 근로시간·휴게시간 계약서에 별도 명시",
];

const FAQS = [
  { q: "개인이 직접 고용한 가사도우미도 보호받나요?", a: "아니요. 개인이 직접 고용하면 가사사용인으로 분류돼서 근로기준법이 적용 안 돼요. 반드시 정부인증 가사서비스업체를 통해 계약해야 보호받아요." },
  { q: "가사근로자도 주휴수당을 받을 수 있나요?", a: "주 15시간 이상 일하면 주휴수당을 받아요. 최저임금법이 적용되니까 일반 근로자와 동일하게 보장돼요." },
  { q: "입주형 가사근로자는 왜 근로시간 제한이 없나요?", a: "입주형은 생활공간과 근무공간이 같아서 근로시간 측정이 어렵기 때문이에요. 그래서 계약서에 근로시간과 휴게시간을 구체적으로 정하는 게 중요해요." },
  { q: "산재보험도 적용되나요?", a: "네. 인증업체 소속 가사근로자는 업무 중 다치면 산재보험으로 치료비와 휴업급여를 받을 수 있어요." },
  { q: "가사근로자법은 언제부터 시행됐나요?", a: "2022년 6월 16일부터 시행됐어요. 이 법 덕분에 인증업체 소속 가사근로자가 근로기준법 보호를 받게 됐어요." },
  { q: "연차휴가는 어떻게 되나요?", a: "근로기준법 제60조가 직접 적용되지는 않지만, 법에서 그에 준하는 수준의 연차 유급휴가를 보장하도록 하고 있어요. 계약서에서 확인하세요." },
];

const SOURCES = [
  { name: "가사근로자의 고용개선 등에 관한 법률", href: "https://www.law.go.kr/법령/가사근로자의고용개선등에관한법률" },
  { name: "근로기준법", href: "https://www.law.go.kr/법령/근로기준법" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "근로계약서", title: "근로계약서 필수 기재사항", description: "임금·근로시간·휴일 등 빠뜨리면 과태료 나와요." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산법", description: "1년 이상 일했으면 퇴직금 받을 수 있어요." },
  { slug: "최저임금", title: "2026년 최저임금", description: "올해 최저시급과 월급 환산액 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동 · 가사근로자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        가사근로자도 근로기준법 적용될까?<br />
        보호 범위와 예외 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        가정에서 청소나 돌봄 일을 하고 있는데, 최저임금이나 퇴직금을 받을 수 있는지 궁금하시죠?
      </p>
      <p style={body}>
        핵심은 이거예요. 정부인증 가사서비스업체 소속이면 근로기준법 보호를 받고, 개인이 직접 고용한 가사도우미는 보호 대상이 아니에요. 2022년 6월 <a href="https://www.law.go.kr/법령/가사근로자의고용개선등에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>가사근로자법</a>이 시행되면서 달라진 부분이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>가사근로자 vs 가사사용인, 뭐가 다른가요?</H2>
      <p style={body}>
        법에서 이 둘을 완전히 다르게 취급해요. 이름은 비슷한데 보호 범위가 하늘과 땅 차이예요.
      </p>

      <GreenBox>
        가사근로자: 정부인증 업체 소속 → 근로기준법, 최저임금법, 퇴직급여법, 산재보험법 적용{"\n"}
        가사사용인: 개인이 직접 고용 → 근로기준법 적용 제외 (법 제11조){"\n"}
        구분 기준: 인증업체를 거치느냐, 개인과 직접 계약하느냐
      </GreenBox>

      <p style={body}>
        같은 일을 하더라도 고용 형태에 따라 법적 보호가 완전히 달라져요. 가정집에서 주 3일 청소하는 분이라도 인증업체 소속이면 <a href="/w/최저임금" style={{ color: "#1D9E75", textDecoration: "underline" }}>최저임금</a> 이상 받아야 하고, 개인 고용이면 최저임금법 자체가 적용 안 돼요.
      </p>

      <CategoryButton label="근로/노동" count={15} href="/category/근로-노동" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>통근형과 입주형, 적용되는 법이 달라요</H2>
      <p style={body}>
        같은 인증업체 소속이라도 통근형이냐 입주형이냐에 따라 근로기준법 적용 범위가 달라져요.
      </p>

      <SectionBadge>통근형 vs 입주형 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 18 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: "#E1F5EE" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75" }}>통근형</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75" }}>입주형</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["임금·퇴직금", "적용", "적용"],
              ["근로계약서", "적용", "적용"],
              ["근로시간 제한", "미적용", "미적용"],
              ["휴게시간", "적용", "미적용"],
              ["주휴일(제55조)", "미적용", "미적용"],
              ["연차휴가", "준하는 수준 보장", "준하는 수준 보장"],
              ["산재보험", "적용", "적용"],
            ].map(([label, a, b], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "9px 12px", color: "#374151" }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: a === "적용" ? "#1D9E75" : a === "미적용" ? "#ef4444" : "#374151" }}>{a}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: b === "적용" ? "#1D9E75" : b === "미적용" ? "#ef4444" : "#374151" }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        입주형은 생활공간과 근무공간이 같아서 근로시간 측정이 어려워요. 그래서 근로시간·연장근로 제한이 빠져 있는 거예요. 대신 계약서에 구체적인 근무시간과 휴식시간을 정해두는 게 필수예요.
      </p>

      <Divider />

      <H2>근로기준법 보호, 이렇게 받으면 돼요</H2>
      <p style={body}>
        인증업체를 통한 계약부터 부당대우 신고까지, 순서대로 정리했어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>계약 전 이것만 체크하세요</H2>
      <p style={body}>
        인증업체와 계약하기 전에 아래 항목을 점검하면 나중에 문제가 생기지 않아요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>가사근로자 보호, 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실제로 많이 나오는 질문만 뽑았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 가사근로자의 고용개선 등에 관한 법률과 근로기준법을 바탕으로 작성했어요. 법 개정에 따라 내용이 달라질 수 있으니 최신 정보는 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
