"use client";

// Q1. 2026년에 국민연금이 뭐가 달라졌는지, 내 보험료가 얼마나 오르는지 궁금한 상황이에요.
// Q2. 변경된 보험료율과 소득대체율을 확인하고 내 월 부담액을 파악하는 행동.
// Q3. 보험료율 9% → 9.5%, 소득대체율 41.5% → 43%, 2033년까지 13% 인상 로드맵.
// Q4. GreenBox(핵심 변경) + BorderBox(로드맵) + Steps(확인 방법) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const STEPS = [
  { title: "국민연금공단 접속", desc: "nps.or.kr에 로그인해요.", tip: "공동인증서 또는 간편인증 가능" },
  { title: "내 연금 알아보기 클릭", desc: "예상 수령액 조회 메뉴에서 변경된 보험료 기준으로 예상액을 확인해요." },
  { title: "급여명세서 확인", desc: "이번 달 급여명세서에서 국민연금 공제액이 올랐는지 비교해보세요." },
];

const FAQS = [
  { q: "2026년 국민연금 보험료가 얼마나 올랐나요?", a: "보험료율이 9%에서 9.5%로 0.5%p 올랐어요. 월급 300만원이면 본인 부담이 13만 5천원에서 14만 2,500원으로 7,500원 늘었어요." },
  { q: "소득대체율이 올라서 더 받게 된 건 맞나요?", a: "맞아요. 41.5%에서 43%로 올라서 40년 가입 기준 평균소득의 43%를 연금으로 받게 돼요. 더 내는 대신 더 받는 구조예요." },
  { q: "자영업자도 보험료가 오르나요?", a: "네. 자영업자는 전액 본인 부담이라 9.5% 전부 본인이 내요. 월 소득 300만원이면 28만 5천원이에요." },
  { q: "2033년까지 13%면 얼마나 더 내나요?", a: "월급 300만원 기준으로 본인 부담이 현재 14만 2,500원에서 19만 5천원까지 늘어요. 매년 0.5%p씩 단계적으로 올라가요." },
  { q: "보험료가 올라도 연금 고갈 걱정은 없나요?", a: "연금개혁으로 기금 소진 시점이 늦춰지긴 했지만 완전히 해소된 건 아니에요. 추가 개혁이 필요하다는 게 전문가들 의견이에요." },
  { q: "직장인은 회사가 절반 내주죠?", a: "맞아요. 직장가입자는 9.5%를 사용자와 반반 부담해서 본인은 4.75%만 내요. 급여명세서에서 확인할 수 있어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "국민연금공단", url: "https://www.nps.or.kr" },
    { label: "보건복지부", url: "https://www.mohw.go.kr" },
    { label: "국민연금법(법제처)", url: "https://www.law.go.kr/법령/국민연금법" },
  ]},
];

const RELATED = [
  { slug: "국민연금-조기수령-감액률", title: "국민연금 조기수령 감액률", description: "일찍 받으면 얼마나 깎이는지, 손익분기점은 언제인지 알아보세요." },
  { slug: "노령연금-소득-감액", title: "노령연금 소득에 따른 감액", description: "소득이 있으면 연금이 줄어드는 구조를 정리했어요." },
  { slug: "연말정산-세액계산-방법", title: "연말정산 세액계산 방법", description: "국민연금 공제도 연말정산에 반영돼요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 연금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 국민연금, 뭐가 달라졌나요?<br />
        보험료율 인상과 소득대체율 변경
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        급여명세서를 보니 국민연금 공제액이 올랐죠? 2026년부터 보험료율이 9%에서 9.5%로 인상됐어요.
        더 내는 만큼 소득대체율도 43%로 올라서 나중에 더 받게 돼요.
        2033년까지 매년 0.5%p씩 올라 최종 13%가 될 예정이에요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>보험료율 9.5%, 내 월급에서 얼마 더 나가나요?</H2>
      <p style={body}>
        2026년 1월부터 국민연금 보험료율이 9%에서 9.5%로 올랐어요. 직장가입자는 사용자와 반반이라 본인 부담은 4.75%예요.
      </p>

      <SectionBadge>월급별 보험료 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>월급</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>2025년(9%)</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>2026년(9.5%)</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>인상액</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["250만원", "112,500원", "118,750원", "+6,250원"],
              ["300만원", "135,000원", "142,500원", "+7,500원"],
              ["400만원", "180,000원", "190,000원", "+10,000원"],
              ["500만원", "225,000원", "237,500원", "+12,500원"],
            ].map(([salary, old_, new_, diff], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{salary}</td>
                <td style={{ padding: "9px 12px" }}>{old_}</td>
                <td style={{ padding: "9px 12px" }}>{new_}</td>
                <td style={{ padding: "9px 12px", color: "#dc2626" }}>{diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        월급 300만원이면 한 달에 7,500원 더 내는 거예요. 1년이면 9만원이에요. 부담이 크진 않지만, 2033년까지 계속 올라간다는 점을 알아둬야 해요.
      </p>

      <Divider />

      <H2>소득대체율 43%, 더 받게 되는 건 맞나요?</H2>
      <p style={body}>
        소득대체율이 41.5%에서 43%로 올랐어요. 이게 뭐냐면, 40년 가입 기준으로 은퇴 후 평균소득의 43%를 연금으로 받는다는 뜻이에요.
        기존 41.5%보다 1.5%p 높아진 거예요.
      </p>

      <GreenBox title="2026년 핵심 변경">
        보험료율: 9% → 9.5% (본인 부담 4.75%)<br />
        소득대체율: 41.5% → 43%<br />
        결론: 더 내고, 더 받는 구조로 바뀌었어요
      </GreenBox>

      <Divider />

      <H2>2033년까지 어떻게 올라가나요?</H2>
      <p style={body}>
        보험료율은 매년 0.5%p씩 올라서 2033년에 최종 13%가 돼요. 직장가입자 본인 부담은 6.5%까지 오르는 거예요.
      </p>

      <BorderBox>
        <strong>연도별 보험료율 인상 로드맵</strong><br /><br />
        · 2026년: 9.5% → 2027년: 10% → 2028년: 10.5%<br />
        · 2029년: 11% → 2030년: 11.5% → 2031년: 12%<br />
        · 2032년: 12.5% → <strong>2033년: 13% (최종)</strong>
      </BorderBox>

      <p style={body}>
        내 예상 수령액이 궁금하다면 국민연금공단에서 바로 조회해볼 수 있어요.
      </p>

      <Divider />

      <H2>내 예상 수령액 확인하는 방법</H2>
      <Steps steps={STEPS} />

      <p style={body}>
        온라인이 어렵다면 국민연금 콜센터(1355)에 전화해서 예상 수령액을 물어볼 수도 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 1월 기준 국민연금법 개정 내용을 바탕으로 작성됐어요. 보험료율과 소득대체율은 법 개정에 따라 변동될 수 있으니 국민연금공단에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
