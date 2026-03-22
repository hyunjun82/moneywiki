"use client";

// Q1. 회사에서 퇴직연금 교육 받으라는데 왜 받아야 하는지, 안 받으면 어떻게 되는지 궁금한 상황이에요.
// Q2. 퇴직연금 교육이 법적 의무라는 걸 이해하고, 교육 방법을 확인하는 행동.
// Q3. 연 1회 교육 의무(사업주), DB형/DC형 교육 내용 차이, 과태료 1천만원 이하, 온라인 교육 가능.
// Q4. GreenBox(핵심 의무) + 표(DB vs DC 교육 내용) + BorderBox(과태료) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "퇴직연금 교육 꼭 받아야 하나요?",
    a: "직원 입장에서는 의무는 아니에요. 하지만 사업주가 교육을 실시해야 하는 법적 의무가 있어서 교육 기회를 제공받게 돼요.",
  },
  {
    q: "온라인으로 받을 수 있나요?",
    a: "네. 퇴직연금 사업자(은행, 보험사, 증권사)가 온라인 교육 콘텐츠를 무료로 제공해요. 동영상 시청으로 이수할 수 있어요.",
  },
  {
    q: "교육 시간은 얼마나 되나요?",
    a: "법에서 정한 최소 시간은 없어요. 보통 30분~1시간 정도의 교육 영상을 시청하는 방식이에요.",
  },
  {
    q: "1인 사업장도 교육해야 하나요?",
    a: "퇴직연금에 가입한 사업장이라면 직원 수와 관계없이 교육 의무가 있어요.",
  },
  {
    q: "교육 안 하면 누구한테 과태료가 나오나요?",
    a: "사업주(회사)에게 과태료가 부과돼요. 근로자 개인에게는 불이익이 없어요.",
  },
  {
    q: "DB형이랑 DC형이랑 교육 내용이 다른가요?",
    a: "네. DB형은 제도 안내 위주, DC형은 투자·운용 방법 위주예요. DC형은 직원이 직접 운용하니까 투자 교육이 더 중요해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "근로자퇴직급여보장법 제32조", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "고용노동부 퇴직연금제도", url: "https://www.moel.go.kr/policy/policyinfo/retire/list.do" },
      { label: "금융감독원 통합연금포털", url: "https://100lifeplan.fss.or.kr/retire/retireInfo.do" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직연금", title: "퇴직연금 제도 안내", description: "DB, DC, IRP 세 가지 유형과 수령 방법을 정리해요." },
  { slug: "퇴직연금-종류", title: "퇴직연금 종류 비교", description: "DB형, DC형, IRP의 차이점을 비교해요." },
  { slug: "퇴직연금-의무화", title: "퇴직연금 의무화", description: "퇴직연금 가입이 의무인 사업장 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · 교육 · 사업주 의무</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 교육, 왜 받아야 하나요?<br />
        사업주 의무와 과태료 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사에서 퇴직연금 교육 받으라고 하는데 왜 받아야 하는지 모르시겠죠?
        퇴직연금 가입자교육은 사업주의 법적 의무예요. 안 하면 과태료가 나와요.
        어떤 내용을 배우는지, 어떻게 받는지 정리해드릴게요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>사업주가 연 1회 교육해야 하는 의무</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제32조</a>에 따르면
        퇴직연금을 운영하는 사업주는 가입자(직원)에게 매년 1회 이상 교육을 실시해야 해요.
        교육은 직접 할 수도 있고, 퇴직연금 사업자(금융기관)에 위탁할 수도 있어요.
      </p>

      <GreenBox>
        핵심 정리예요.<br />
        · <strong>교육 주체</strong>: 사업주 (금융기관 위탁 가능)<br />
        · <strong>교육 횟수</strong>: 연 1회 이상<br />
        · <strong>교육 방법</strong>: 대면, 서면, 온라인 모두 가능<br />
        · <strong>미실시 과태료</strong>: 1천만원 이하
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>DB형, DC형 교육 내용이 달라요</H2>
      <p style={body}>
        DB형은 회사가 운용하니까 제도 안내 위주예요. DC형은 직원이 직접 운용하니까 투자 방법 교육이 핵심이에요.
      </p>

      <SectionBadge>유형별 교육 내용</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>DB형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>DC형</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["교육 초점", "제도 안내·급여 산정 방식", "투자 상품·운용 방법"],
              ["주요 내용", "퇴직급여 계산법, 수급 요건", "ETF·펀드 종류, 위험자산 비율"],
              ["부담금 안내", "회사 부담", "회사 부담 + 직원 운용 책임"],
              ["수령 방법", "일시금·연금 선택", "일시금·연금 선택"],
            ].map(([item, db, dc], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px" }}>{db}</td>
                <td style={{ padding: "9px 12px" }}>{dc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>과태료는 얼마나 나오나요?</H2>
      <p style={body}>
        교육을 실시하지 않으면 사업주에게 과태료가 부과돼요.
        근로자 개인에게는 불이익이 없지만, 회사 입장에서는 꽤 큰 금액이에요.
      </p>

      <BorderBox>
        과태료 기준이에요.<br /><br />
        · <strong>1차 위반</strong>: 10만원 (직원 1인당)<br />
        · <strong>2차 위반</strong>: 20만원 (직원 1인당)<br />
        · <strong>3차 이상 위반</strong>: 30만원 (직원 1인당)<br /><br />
        직원 100명인 회사가 3차 위반하면 최대 3천만원이에요.<br />
        법정 상한은 <strong>1천만원 이하</strong>예요.
      </BorderBox>

      <SectionBadge>사업주 교육 이행 체크</SectionBadge>
      <Checklist items={[
        "올해 퇴직연금 가입자교육 실시 여부 확인",
        "교육 자료 배포 및 교육 이수 기록 보관",
        "금융기관 위탁 교육 계약 체결 여부",
        "신규 입사자 대상 교육 포함 여부",
      ]} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 과태료 기준은 시행령 개정에 따라 변동될 수 있어요." />
    </ArticleLayout>
  );
}
