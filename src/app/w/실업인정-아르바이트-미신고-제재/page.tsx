"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 실업급여 받으면서 아르바이트를 했는데 신고를 안 해서 부정수급에 걸릴까 봐 불안한 상황
// Q2. 미신고 시 어떤 제재를 받는지 파악하고, 자진신고 여부를 결정한다
// Q3. 부정수급 제재(환수+추가징수 2~5배), 형사처벌(3년 징역/3천만원 벌금), 자동 적발 시스템, 자진신고 시 감경, 올바른 신고 방법
// Q4. PenaltyTable + Steps(자진신고 절차) + GreenBox(핵심 경고) + Checklist(신고 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "고용센터에 자진신고 의사를 밝히세요",
    desc: "관할 고용센터에 전화하거나 방문해서 아르바이트 소득이 있었다고 말하면 돼요. 적발 전에 자진신고하면 형사처벌을 면제받을 수 있어요.",
    tip: "전화 먼저 해서 필요한 서류를 확인하면 방문 시간이 줄어요",
  },
  {
    title: "아르바이트 증빙 자료를 준비하세요",
    desc: "급여명세서, 입금 내역, 근로계약서 등 일한 기간과 소득 금액을 증명할 자료가 필요해요. 없다면 통장 입금 내역이라도 출력해 가세요.",
  },
  {
    title: "환수금과 추가징수 납부 계획을 세우세요",
    desc: "자진신고해도 환수금과 추가징수는 내야 해요. 일시불이 어려우면 분할납부를 신청할 수 있고 최대 36개월까지 나눠 낼 수 있어요.",
    tip: "분할납부 계획서를 고용센터에 제출하면 됨",
  },
  {
    title: "이후 실업인정 때 정확하게 신고하세요",
    desc: "워크넷에서 실업인정 신청할 때 '취업 또는 소득' 항목에 체크하고 일한 날짜, 시간, 금액을 입력하면 돼요. 4시간 미만 근로는 일부만 감액되고 하루 종일 일했으면 그날 실업급여만 안 나와요.",
    link: { label: "워크넷 바로가기", href: "https://www.work.go.kr" },
  },
];

const CHECKLIST = [
  "실업인정일 전 14일간 소득 발생 여부 확인",
  "하루 4시간 미만 아르바이트도 신고 대상",
  "급여명세서 또는 입금 내역 보관",
  "자진신고 시 형사처벌 면제 가능",
  "분할납부 신청으로 환수금 부담 분산 가능",
];

const FAQS = [
  { q: "하루만 알바해도 신고해야 하나요?", a: "네, 반드시 해야 해요. 하루 4시간 미만 아르바이트도 소득으로 간주돼요. 시간과 금액에 상관없이 실업인정 때 신고하지 않으면 부정수급이에요." },
  { q: "몰랐는데도 부정수급으로 처리되나요?", a: "처리돼요. 고의가 아닌 과실이라도 부정수급이에요. 다만 고의가 아닌 경우 추가징수 배수가 2배로 낮아지고 형사처벌은 감경될 수 있어요." },
  { q: "국세청에서 자동으로 걸린다는 게 사실인가요?", a: "사실이에요. 고용노동부와 국세청 소득자료가 연동돼요. 사업장에서 4대보험이나 소득세 신고를 하면 1~2년 후라도 적발 통지서가 날아와요. 소멸시효가 5년이에요." },
  { q: "적발되면 실업급여를 앞으로도 못 받나요?", a: "5년간 실업급여를 받을 수 없어요. 그 기간에 다시 실직해도 실업급여와 조기재취업수당 같은 고용보험 혜택이 전부 차단돼요." },
  { q: "부정수급 환수금을 못 내면 어떻게 되나요?", a: "체납 처리돼요. 재산 압류나 급여 압류가 가능하고 신용정보에도 영향을 줄 수 있어요. 분할납부를 신청해서 납부 계획을 세우는 게 좋아요." },
  { q: "자진신고하면 추가징수가 면제되나요?", a: "면제되진 않아요. 환수금 + 추가징수는 자진신고해도 내야 해요. 다만 형사처벌은 면제받을 수 있고, 추가징수 배수가 낮아질 수 있어요." },
];

const SOURCES = [
  { name: "고용보험법 제62조·제116조", href: "https://www.law.go.kr/법령/고용보험법" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
  { name: "워크넷", href: "https://www.work.go.kr" },
];

const RELATED = [
  { slug: "실업급여-수급조건", title: "실업급여 수급조건", description: "자격 요건과 신청 기준 확인." },
  { slug: "실업급여-신청-방법", title: "실업급여 신청 방법", description: "온라인 신청 절차와 준비 서류." },
  { slug: "실업급여-연봉별-계산", title: "실업급여 연봉별 계산", description: "내 연봉 기준 예상 금액 확인." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 부정수급 · 아르바이트 신고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업인정 아르바이트 미신고, 걸리면?<br />
        부정수급 제재와 자진신고 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "알바 며칠 했는데 신고 안 했어요. 나중에 걸리면 어떻게 되죠?"
      </p>
      <p style={body}>
        미신고가 확인되면 받은 실업급여 <strong>전액 환수</strong>에 최대 <strong>5배 추가징수</strong>까지 부과돼요.
        형사처벌은 3년 이하 징역 또는 3천만원 이하 벌금이에요.
        국세청 소득자료와 자동 연동되기 때문에 "안 걸리겠지"는 통하지 않아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>미신고 시 어떤 제재를 받나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따라 부정수급이 확인되면 환수 + 추가징수가 동시에 부과돼요.
        단순 실수와 고의 은폐는 제재 수준이 다르죠.
      </p>

      <SectionBadge>부정수급 제재 기준</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>추가징수</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>조건</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["과실", "2배", "신고 방법을 몰랐거나 단순 실수"],
              ["고의", "3배", "알면서 신고하지 않은 경우"],
              ["중대한 고의", "5배", "서류 위조, 반복 은폐"],
            ].map(([구분, 배수, 조건], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{구분}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#dc2626" }}>받은 금액의 {배수}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280" }}>{조건}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        300만원 수급 + 고의 은폐 시 계산 예시{"\n"}
        환수금 300만원 + 추가징수 1,500만원(5배) = 총 1,800만원 납부{"\n"}
        + 형사처벌: 3년 이하 징역 또는 3천만원 이하 벌금
      </GreenBox>

      <CategoryButton label="실업급여 정보" count={8} href="/category/실업급여" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>어떻게 적발되나요?</H2>
      <p style={body}>
        고용노동부는 <strong>국세청 소득자료와 자동 연동</strong>돼요.
        아르바이트 사업장에서 4대보험 가입 신고나 소득세 원천징수를 하면 기록이 남아요.
        적발 시점이 1~2년 뒤일 수 있지만 소멸시효가 5년이라 시간이 지나도 안전하지 않아요.
      </p>

      <BorderBox>
        <strong>추가 불이익</strong>{"\n"}
        · 5년간 실업급여 재수급 불가{"\n"}
        · 1,000만원 이상 부정수급 시 명단 공개{"\n"}
        · 환수금 미납 시 재산·급여 압류 가능{"\n"}
        · 취업성공수당, 조기재취업수당 등 고용보험 혜택 차단
      </BorderBox>

      <Divider />

      <H2>자진신고하면 어떻게 되나요?</H2>
      <p style={body}>
        적발 전에 스스로 신고하면 <strong>형사처벌은 면제</strong>받을 수 있어요.
        환수금과 추가징수는 여전히 내야 하지만 배수가 낮아질 수 있어요.
        지금이라도 바로 자진신고하는 게 피해를 줄이는 유일한 방법이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>앞으로 제대로 신고하려면 뭘 챙겨야 하나요?</H2>
      <p style={body}>
        실업급여 받으면서 아르바이트해도 신고만 정확히 하면 문제없어요.
        아래 항목을 실업인정일마다 체크하세요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />
      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 고용보험법을 바탕으로 작성했어요. 개별 사례에 따라 제재 수준이 다를 수 있으니 관할 고용센터에 확인하세요." />
    </ArticleLayout>
  );
}
