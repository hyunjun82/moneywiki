"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 국민연금 보험료가 오른다는데 기준소득월액이 뭔지, 내 보험료가 얼마인지 확인하려는 상황
// Q2. 기준소득월액 개념을 이해하고, 내 보험료가 얼마인지 계산할 수 있게 된다
// Q3. 기준소득월액 = 보험료·급여 산정 기준, 상한액 637만원/하한액 40만원(~2026.6), 7월 변경 예정, 보험료율 9%
// Q4. GreenBox(핵심 요약) + BorderBox(상·하한액 표) + Calculator개념 설명 + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "기준소득월액은 누가 정하나요?",
    a: "국민연금공단이 매년 가입자의 소득 신고를 기반으로 산정해요. 직장가입자는 회사가 신고한 보수월액이 기준이 되고, 지역가입자는 본인이 신고한 소득이 기준이에요.",
  },
  {
    q: "월급이 637만원 넘으면 보험료는 어떻게 되나요?",
    a: "상한액인 637만원으로 고정돼요. 월급이 800만원이든 1,000만원이든 보험료는 637만원 × 9% = 573,300원이에요. 이 이상은 더 내지 않아요.",
  },
  {
    q: "월급이 40만원도 안 되면요?",
    a: "하한액인 40만원으로 계산돼요. 월급이 30만원이어도 보험료는 40만원 × 9% = 36,000원이에요. 회사와 반반씩 부담하면 본인 부담은 18,000원이에요.",
  },
  {
    q: "7월에 상한액이 오르면 보험료도 바로 오르나요?",
    a: "네, 7월 급여분부터 새 상한액이 적용돼요. 직장가입자는 회사 급여 시스템에서 자동으로 조정되니까 별도로 할 건 없어요. 지역가입자는 공단에서 변경 고지서를 보내요.",
  },
  {
    q: "기준소득월액이 높으면 나중에 연금도 많이 받나요?",
    a: "맞아요. 기준소득월액이 높을수록 가입 기간 평균소득월액이 올라가고, 이게 연금 산정에 반영돼요. 상한액 한도 내에서 많이 낼수록 나중에 받는 연금도 늘어나요.",
  },
  {
    q: "보험료율 9%가 올라갈 수 있나요?",
    a: "국민연금 개혁안에 따라 2026년부터 매년 0.5%p씩 올려서 2033년에 13%까지 인상하는 방안이 논의 중이에요. 아직 확정은 아니지만 장기적으로 보험료율 인상은 피하기 어려운 상황이에요.",
  },
];

const RELATED = [
  { slug: "국민연금-계산기", title: "국민연금 계산기", description: "내 예상 연금 수령액을 계산해 보세요." },
  { slug: "국민연금-2026년-개혁-보험료율-소득대체율-변경", title: "2026년 국민연금 개혁", description: "보험료율과 소득대체율이 어떻게 바뀌나요." },
  { slug: "4대보험료-계산기", title: "4대보험료 계산기", description: "국민연금 포함 4대보험료 한 번에 계산." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>국민연금 · 보험료 · 기준소득월액</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국민연금 기준소득월액이 뭔가요?<br />
        상한액·하한액과 보험료 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        급여명세서 보면 국민연금이 빠져나가는데, 이 금액이 어떻게 정해지는지 궁금하죠?
      </p>
      <p style={body}>
        기준소득월액은 <strong>국민연금 보험료와 나중에 받을 연금을 계산하는 기준</strong>이에요.
        2026년 1~6월은 상한액 <strong>637만원</strong>, 하한액 <strong>40만원</strong>이 적용되고 있어요.
        내 월급이 이 범위 안에 있으면 실제 소득 기준으로, 넘거나 모자라면 상한·하한으로 계산돼요.
      </p>

      <Divider />

      <H2>기준소득월액으로 보험료가 이렇게 결정돼요</H2>
      <p style={body}>
        <a href="https://www.nps.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금공단</a>이 매년 가입자의 소득을 확인해서 기준소득월액을 정하면,
        여기에 보험료율 <strong>9%</strong>를 곱해서 보험료가 나와요.
        직장가입자는 회사와 반반(4.5%씩) 부담하고, 지역가입자는 전액 본인이 내요.
      </p>

      <GreenBox>
        보험료 계산 공식{"\n"}
        국민연금 보험료 = 기준소득월액 × 9%{"\n"}
        직장가입자: 회사 4.5% + 본인 4.5%{"\n"}
        지역가입자: 본인 9% 전액 부담
      </GreenBox>

      <p style={body}>
        예를 들어 월급이 300만원이면 보험료는 300만 × 9% = 27만원이에요.
        직장가입자는 13.5만원만 내면 돼요.
        <a href="/w/국민연금-계산기" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금 계산기</a>에서 내 금액을 바로 확인할 수 있어요.
      </p>

      <CategoryButton label="국민연금 정보" count={6} href="/category/국민연금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>상한액과 하한액은 얼마이고 왜 바뀌나요?</H2>
      <p style={body}>
        기준소득월액에는 천장(상한액)과 바닥(하한액)이 있어요. 월급이 아무리 많아도 상한액까지만, 아무리 적어도 하한액 이상으로 계산돼요.
        매년 7월에 전년도 평균소득 변동률을 반영해서 조정해요.
      </p>

      <SectionBadge>2026년 기준소득월액 상·하한액</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>기간</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>상한액</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>하한액</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>최대 보험료(9%)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["2025.7~2026.6", "637만원", "40만원", "573,300원"],
              ["2026.7~ (예정)", "미확정 (3월 말 고시)", "미확정", "-"],
            ].map(([period, upper, lower, max], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{period}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{upper}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{lower}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        <strong>왜 매년 7월에 바뀌나요?</strong>{"\n"}
        보건복지부 장관이 매년 3월 말까지 전년도 평균소득 변동률을 반영해서 상·하한액을 고시하고, 7월부터 1년간 적용해요. 소득이 오르면 상한액도 오르고, 보험료 부담도 늘어나요.
      </BorderBox>

      <Divider />

      <H2>내 기준소득월액은 어디서 확인하나요?</H2>
      <p style={body}>
        국민연금공단 홈페이지나 모바일 앱 &quot;내 곁에 국민연금&quot;에서 확인할 수 있어요.
        공동인증서나 간편인증으로 로그인하면 현재 적용 중인 기준소득월액과 월 보험료가 바로 나와요.
        직장가입자는 회사가 신고한 보수월액이 반영되고, 변경이 필요하면 소득 변동 신고를 하면 돼요.
      </p>

      <GreenBox>
        확인 방법: 국민연금공단 홈페이지 → 개인 로그인 → &quot;가입 내역 조회&quot; → 기준소득월액 확인. 모바일 앱 &quot;내 곁에 국민연금&quot;에서도 동일하게 조회돼요.
      </GreenBox>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 2026년 3월 기준 국민연금공단 안내를 바탕으로 작성됐어요. 2026년 7월 이후 상·하한액은 보건복지부 고시 확인이 필요해요." />
    </ArticleLayout>
  );
}
