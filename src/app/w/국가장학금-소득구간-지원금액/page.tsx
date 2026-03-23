"use client";

// Q1. 대학생이 국가장학금 소득구간별로 얼마 받을 수 있는지, 내 구간이 어떻게 되는지 알고 싶은 상황
// Q2. 소득구간별 지원금액을 확인하고 한국장학재단에서 신청까지 완료한다
// Q3. 0~9구간 지원금액(기초 전액~9구간 100만원), 신청 기간, 가구원 동의, 성적 기준
// Q4. 비교표(구간별 금액) + Steps(신청 절차) + GreenBox(핵심) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles,
} from "@/components/article-ui";

const STEPS_DATA = [
  {
    title: "한국장학재단 홈페이지에서 신청하세요",
    desc: "한국장학재단(kosaf.go.kr) 또는 모바일 앱에서 24시간 신청할 수 있어요. 공동인증서나 간편인증(카카오·PASS 등)으로 로그인한 후 '국가장학금 신청'을 클릭하세요. 1차 신청 기간은 보통 11월 말~12월 말이에요.",
    tip: "1차 신청이 유리 → 2차는 잔여 예산만 배분",
    link: { label: "한국장학재단", href: "https://www.kosaf.go.kr" },
  },
  {
    title: "가구원(부모님) 정보 제공 동의를 받으세요",
    desc: "신청 후 부모님이 '가구원 정보 제공 동의'를 해야 소득구간이 산정돼요. 장학재단 홈페이지나 앱에서 부모님이 직접 동의하면 돼요. 동의 안 하면 소득구간 산정이 안 돼서 장학금을 못 받아요.",
    tip: "부모님에게 꼭 안내 → 동의 없으면 탈락",
  },
  {
    title: "소득구간 산정 결과가 나와요",
    desc: "가구원 동의 후 약 2~3주면 소득구간이 나와요. 한국장학재단 홈페이지에서 '소득구간 확인' 메뉴를 보면 돼요. 건강보험료 기준으로 산정되기 때문에 본인이 직접 계산하기는 어려워요.",
    tip: "결과 이의 있으면 이의신청으로 재산정 가능",
  },
  {
    title: "성적 기준도 충족해야 해요",
    desc: "직전 학기 성적이 B학점(80점) 이상이어야 해요. 신입생은 첫 학기에 성적 기준 없이 받을 수 있어요. 기초·차상위는 C학점(70점) 이상으로 기준이 완화돼요.",
    tip: "신입생 첫 학기: 성적 기준 면제",
  },
];

const FAQS = [
  {
    q: "내 소득구간이 몇 구간인지 미리 알 수 있나요?",
    a: "정확한 구간은 장학재단이 산정하기 전까지 알기 어려워요. 다만 건강보험료 납부액을 기준으로 대략적인 추정은 가능해요. 장학재단 홈페이지에 모의 계산기가 있으니 참고하세요.",
  },
  {
    q: "1차를 놓쳤으면 2차에 신청해도 되나요?",
    a: "2차 신청도 가능하지만, 1차에서 예산이 많이 배분돼서 2차는 잔여 예산으로만 지급돼요. 같은 구간이어도 1차보다 적게 받을 수 있으니 1차에 신청하는 게 훨씬 유리해요.",
  },
  {
    q: "소득구간이 예상보다 높게 나왔어요. 이의신청 되나요?",
    a: "돼요. 소득구간 확인 후 이의신청 기간에 재산 변동이나 소득 감소 증빙자료를 제출하면 재산정받을 수 있어요. 실직, 사업 폐업, 재산 감소 같은 사유가 있으면 적극적으로 신청하세요.",
  },
  {
    q: "자취해서 부모님과 따로 사는데 독립가구로 인정되나요?",
    a: "국가장학금은 원칙적으로 부모의 소득·재산을 기준으로 산정해요. 미혼이면 부모님 가구를 기준으로 계산돼요. 결혼했거나 30세 이상이면서 독립적 생계를 유지하면 독립가구로 인정받을 수 있어요.",
  },
  {
    q: "등록금보다 장학금이 많으면 차액도 받나요?",
    a: "아니에요. 지원금액이 등록금을 초과하면 등록금까지만 받아요. 등록금이 300만원인데 장학금이 600만원이면 300만원만 지급돼요. 나머지는 지급 안 돼요.",
  },
  {
    q: "다자녀 가구는 지원금이 더 많나요?",
    a: "네. 다자녀 가구 셋째 이상 자녀는 8구간 이하에서 등록금 전액을 받아요. 첫째·둘째도 일반 학생보다 구간당 10만원씩 더 받아요. 9구간 셋째 이상은 연간 최대 200만원이에요.",
  },
];

const RELATED = [
  { slug: "국가장학금-2차-신청", title: "국가장학금 2차 신청", description: "1차를 놓쳤다면 2차 신청 방법 확인." },
  { slug: "국가장학금-성적기준", title: "국가장학금 성적기준", description: "B학점 이상이 기본, 기초·차상위는 C학점." },
  { slug: "국가장학금-탈락-사유", title: "국가장학금 탈락 사유", description: "왜 떨어졌는지 확인하고 다음 학기 대비." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>교육 · 장학금 · 소득구간</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국가장학금, 내 소득구간이면 얼마 받나요?<br />
        구간별 지원금액과 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        등록금 고지서 보면 한숨부터 나오죠. 내 소득구간에서 국가장학금을 얼마나 받을 수 있는지 바로 확인해 보세요.
      </p>
      <p style={body}>
        <a href="https://www.kosaf.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국장학재단</a> 기준으로 기초·차상위는 <strong>등록금 전액</strong>, 1~3구간은 연간 <strong>최대 600만원</strong>을 받아요.
        2025년부터 소득구간이 8구간에서 9구간으로 확대돼서 더 많은 학생이 혜택을 받게 됐어요.
      </p>

      <Divider />

      <H2>소득구간별 지원금액이 얼마예요?</H2>
      <p style={body}>
        소득구간은 0구간(기초·차상위)부터 9구간까지 총 10단계예요. 소득이 낮을수록 더 많은 장학금을 받아요. 지원금액은 등록금을 초과할 수 없어요.
      </p>

      <SectionBadge>2026년 국가장학금 I유형 지원금액 (연간)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>소득구간</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>일반 학생</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>다자녀(첫째·둘째)</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>다자녀(셋째 이상)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["기초·차상위", "등록금 전액", "등록금 전액", "등록금 전액"],
              ["1~3구간", "600만원", "610만원", "등록금 전액"],
              ["4~6구간", "440만원", "505만원", "등록금 전액"],
              ["7~8구간", "360만원", "465만원", "등록금 전액"],
              ["9구간", "100만원", "135만원", "200만원"],
            ].map(([bracket, normal, multi12, multi3], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{bracket}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{normal}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{multi12}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{multi3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        8구간 이하 셋째 이상 자녀는 등록금 전액 지원이에요. 다자녀 가구라면 반드시 '다자녀 국가장학금'으로도 함께 신청하세요.
      </GreenBox>

      <CategoryButton label="교육·장학금 정보" count={5} href="/category/교육-장학금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신청은 어떻게 하나요?</H2>
      <p style={body}>
        <a href="https://www.kosaf.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국장학재단</a>에서 온라인 신청하면 돼요. 1차 신청(11~12월)에 예산이 집중 배분되니까 1차에 반드시 신청하세요.
        신청 후 부모님의 가구원 동의가 없으면 소득구간이 안 나와서 탈락하는 경우가 많아요.
      </p>

      <Steps steps={STEPS_DATA} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 2026년 1학기 기준 한국장학재단 안내를 바탕으로 작성됐어요. 지원금액과 신청 기간은 학기마다 달라질 수 있으니, 장학재단 홈페이지에서 최신 정보를 조회해 보세요." />
    </ArticleLayout>
  );
}
