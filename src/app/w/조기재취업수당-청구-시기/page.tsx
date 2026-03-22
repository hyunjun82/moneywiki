"use client";

// Q1. 조기재취업수당을 받을 수 있다는 건 아는데, 정확히 언제 청구해야 하는지, 금액 계산이 어떻게 되는지 모르는 상황이에요.
// Q2. 청구 시기를 정확히 파악하고, 금액을 미리 계산해서 기한 내에 고용24에서 청구하는 행동.
// Q3. 청구 시기(12개월 후), 금액 계산 공식(구직급여일액 x 잔여일수 x 1/2), 지급 제외 기준(574만원), 필요 서류.
// Q4. GreenBox(청구 시기 핵심) + Steps(청구 절차) + BorderBox(계산 예시) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "12개월 경과 확인", desc: "재취업한 날부터 정확히 12개월이 지났는지 달력으로 확인하세요. 하루라도 모자라면 접수가 안 돼요.", tip: "입사일 기준이에요, 첫 급여일이 아니에요" },
  { title: "서류 준비", desc: "조기재취업수당 청구서, 재직증명서(또는 고용보험 가입 확인서), 신분증, 본인 명의 통장 사본을 준비하세요." },
  { title: "고용24 온라인 청구", desc: "고용24(ei.go.kr) 로그인 → 구직급여 메뉴 → 조기재취업수당 청구 → 재취업 정보 입력 → 서류 첨부 → 제출 완료예요." },
  { title: "심사 및 입금", desc: "제출 후 1~2주 안에 심사가 끝나요. 승인되면 지정 계좌로 입금돼요. 서류 보완이 필요하면 연락이 와요." },
];

const DOCS = [
  { name: "조기재취업수당 청구서", required: true, where: "고용24 다운로드 또는 고용센터 비치" },
  { name: "재직증명서 또는 고용보험 가입 확인서", required: true, where: "현 직장 인사팀 또는 고용24 조회" },
  { name: "신분증 사본", required: true, where: "주민등록증, 운전면허증" },
  { name: "통장 사본", required: true, where: "본인 명의 입금 계좌" },
  { name: "고용계약서", required: false, where: "재직증명서 대체용 (선택)" },
];

const FAQS = [
  { q: "12개월 전에 퇴사하면 어떻게 되나요?", a: "12개월을 채우지 못하면 조기재취업수당 청구가 불가능해요. 다만 새로 실업급여를 신청할 수 있는지 별도로 확인해보세요." },
  { q: "65세 이상이면 기간이 다른가요?", a: "네, 65세 이상은 6개월 고용이 확인되면 바로 청구할 수 있어요. 12개월을 기다릴 필요 없어요." },
  { q: "온라인 말고 직접 방문해도 되나요?", a: "네, 거주지 관할 고용센터에 서류를 들고 가서 직접 접수할 수 있어요. 다만 온라인이 훨씬 빠르고 편해요." },
  { q: "잔여일수 50%라는 게 정확히 뭔가요?", a: "소정급여일수에서 이미 받은 일수를 뺀 나머지예요. 120일 중 50일 받았으면 70일이 잔여일수고, 그 절반인 35일치를 수당으로 받아요." },
  { q: "청구 기한이 따로 있나요?", a: "명시적 기한은 없지만, 12개월 경과 후 1~2년 안에 청구하는 게 안전해요. 오래 지나면 자료 확인이 어려워질 수 있어요." },
  { q: "수당을 받으면 실업급여를 다시 못 받나요?", a: "조기재취업수당은 남은 실업급여의 절반이에요. 이후 새 직장에서 다시 퇴사하면 별도로 실업급여를 신청할 수 있어요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "고용보험법 (법제처)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 조기재취업수당", url: "https://www.ei.go.kr" },
      { label: "정부24 조기재취업수당", url: "https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A05007&CappBizCD=14900000076&tp_seq=" },
    ],
  },
];

const RELATED = [
  { slug: "조기재취업수당-조건-금액", title: "조기재취업수당 자격 조건과 금액", description: "자격 조건 6가지와 금액 계산 공식을 확인하세요." },
  { slug: "실업급여-계산기", title: "실업급여 계산기", description: "구직급여일액과 소정급여일수를 미리 계산해보세요." },
  { slug: "실업급여-수급-조건", title: "실업급여 수급 조건", description: "실업급여를 받으려면 어떤 조건을 갖춰야 하는지 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 조기재취업</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        조기재취업수당, 언제 청구할까?<br />
        청구 시기와 지급 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        조기재취업수당을 받을 수 있다는 건 아는데, 정확히 언제 신청해야 하는지 헷갈리시죠?
        재취업한 날부터 딱 12개월이 지나야 청구할 수 있어요. 하루라도 이르면 반려되고, 너무 늦으면 자료 확인이 어려워져요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>청구 시기: 재취업 후 정확히 12개월</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따르면,
        조기재취업수당은 재취업한 날로부터 12개월 이상 계속 고용된 후에 청구할 수 있어요.
        이 기간은 &quot;계속 근무했는지&quot;를 확인하는 절차예요.
      </p>

      <GreenBox title="청구 시기 핵심 정리">
        2026년 1월 15일에 입사했다면 → 2027년 1월 15일부터 청구 가능<br /><br />
        · 1월 14일에 청구하면 <strong>반려</strong><br />
        · 65세 이상은 예외 → <strong>6개월 후</strong> 청구 가능<br />
        · 명시적 청구 기한은 없지만 <strong>1~2년 안에</strong> 하는 게 안전
      </GreenBox>

      <Divider />

      <H2>금액은 이렇게 계산돼요</H2>
      <p style={body}>
        공식은 간단해요. 구직급여일액에 남은 일수의 절반을 곱하면 돼요.
        2026년 구직급여일액 상한액은 66,000원이에요.
      </p>

      <SectionBadge>계산 예시 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>사례 1</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>사례 2</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["소정급여일수", "180일", "120일"],
              ["수급 일수", "50일", "30일"],
              ["잔여일수", "130일", "90일"],
              ["1/2 조건 (충족?)", "90일 이상 → O", "60일 이상 → O"],
              ["구직급여일액", "66,000원", "66,000원"],
              ["수당 금액", "66,000 x 65 = 429만원", "66,000 x 45 = 297만원"],
            ].map(([item, a, b], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px" }}>{a}</td>
                <td style={{ padding: "9px 12px" }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        빨리 취업할수록 잔여일수가 많아서 금액이 커져요.
        정확한 구직급여일액은 <a href="/w/실업급여-계산기" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여 계산기</a>에서 확인해보세요.
      </p>

      <Divider />

      <H2>청구 절차, 이 순서대로 하면 돼요</H2>
      <p style={body}>
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인 청구하는 게 가장 편해요.
        관할 고용센터에 직접 방문해도 되지만, 대기 시간이 길 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>필요한 서류 체크해두세요</H2>
      <p style={body}>
        서류가 미비하면 보완 요청이 오고 지급이 늦어져요. 미리 준비해두면 한 번에 끝낼 수 있어요.
      </p>

      <DocTable docs={DOCS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 고용24 자료를 바탕으로 작성됐어요. 개인별 구직급여일액과 소정급여일수가 다르니, 정확한 금액은 고용24에서 확인하세요." />
    </ArticleLayout>
  );
}
