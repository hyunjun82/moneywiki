"use client";

// Q1. 직장을 그만두고 지역가입자가 됐는데 건강보험료가 얼마나 나올지 걱정되는 상황이에요.
// Q2. 소득 구간별 대략적인 보험료를 확인하고, 정확한 금액은 공단 모의계산기로 조회하는 행동.
// Q3. 2026년 보험료율 7.19%, 점수당 211.5원, 소득+재산+자동차 합산 구조, 재산 공제 1억원, 자동차 기준, 장기요양보험료 13.12%.
// Q4. 표(소득별 보험료) + GreenBox(산정 구조) + BorderBox(재산·자동차 기준) + Checklist(경감 방법) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "재산이 1억원 이하면 재산 점수가 0점인가요?", a: "네, 2024년부터 재산 공제액이 1억원으로 올랐어요. 과세표준 1억원 이하면 재산 보험료가 안 붙어요." },
  { q: "전세보증금도 재산에 포함되나요?", a: "30%만 반영돼요. 전세 3억원이면 9,000만원만 재산으로 잡혀요. 1억원 공제하면 재산 점수 0점이에요." },
  { q: "자동차가 있으면 무조건 보험료가 올라가나요?", a: "아니요. 4천만원 미만이면서 1,600cc 이하 차량은 반영 안 돼요. 9년 이상 된 차도 제외예요." },
  { q: "소득이 줄었는데 보험료가 그대로예요", a: "조정 신청을 할 수 있어요. 건강보험공단에 소득 변동 증빙을 제출하면 보험료가 재산정돼요." },
  { q: "피부양자로 올리면 보험료를 안 내도 되나요?", a: "소득·재산 요건을 충족하면 직장가입자의 피부양자로 등록할 수 있어요. 피부양자는 보험료 부담이 없어요." },
  { q: "국민연금 소득도 건보료에 반영되나요?", a: "국민연금 소득의 50%만 반영돼요. 개인연금(연금저축·IRP)은 아예 제외돼요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "국민건강보험법", url: "https://www.law.go.kr/법령/국민건강보험법" },
    { label: "국민건강보험공단 모의계산기", url: "https://www.nhis.or.kr/nhis/minwon/retrieveLocalCalcView.do" },
    { label: "보건복지부 2026년 보험료율 안내", url: "https://www.mohw.go.kr/board.es?mid=a10503010100&bid=0027&act=view&list_no=1487279" },
  ] },
];

const RELATED = [
  { slug: "국민연금-조기수령-감액률-신청조건-손익분기점", title: "국민연금 조기수령 조건", description: "조기수령하면 건보료에 반영되는 연금소득이 줄어요." },
  { slug: "종합소득세-신고-기한-대상", title: "종합소득세 신고 기한·대상", description: "종소세 신고 소득이 건보료 산정 기준이 돼요." },
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 수령 방법 비교", description: "일시금으로 받으면 그 해 건보료가 크게 올라갈 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>건강보험 · 지역가입자 · 보험료</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        지역가입자 건강보험료, 내 소득이면 얼마?<br />
        2026년 소득별 보험료표
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        직장을 그만두면 건강보험료가 갑자기 많이 나올까 걱정되죠.
        결론부터 말하면, 소득 구간만 알면 대략적인 금액을 바로 알 수 있어요.
        아래 표에서 내 소득 구간을 찾아보세요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>소득별 예상 보험료표 (2026년 기준)</H2>
      <p style={body}>
        소득만 있고 재산·자동차가 없을 때 기준이에요.
        2026년 보험료율 7.19%, 장기요양보험료 13.12%가 포함된 금액이에요.
      </p>

      <SectionBadge>2026년 지역가입자 소득별 월 보험료</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>연 소득</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>월 환산</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>예상 월 보험료</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["500만원", "약 42만원", "약 22,000원"],
              ["1,000만원", "약 83만원", "약 68,000원"],
              ["1,200만원", "100만원", "약 81,000원"],
              ["2,400만원", "200만원", "약 163,000원"],
              ["3,600만원", "300만원", "약 244,000원"],
              ["4,800만원", "400만원", "약 326,000원"],
              ["6,000만원", "500만원", "약 407,000원"],
            ].map(([income, monthly, premium], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px" }}>{income}</td>
                <td style={{ padding: "9px 12px" }}>{monthly}</td>
                <td style={{ padding: "9px 12px", fontWeight: 600, color: "#1D9E75" }}>{premium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        2026년 지역가입자 월평균 건강보험료는 90,242원이에요.
        재산이나 자동차가 있으면 위 금액보다 더 올라가요.
      </p>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>보험료 산정 구조, 어떻게 계산되나요?</H2>

      <GreenBox>
        지역가입자 보험료 = <strong>소득보험료 + 재산보험료</strong><br /><br />
        · 소득보험료: 소득월액 x 7.19% (보험료율)<br />
        · 재산보험료: 재산부과점수 x <strong>211.5원</strong> (점수당 금액)<br />
        · 장기요양보험료: 건강보험료 x <strong>13.12%</strong> 추가<br />
        · 자동차: 기준 초과 차량만 재산점수에 포함
      </GreenBox>

      <Divider />

      <H2>재산과 자동차는 언제 반영되나요?</H2>

      <BorderBox>
        <strong>재산 반영 기준</strong><br />
        · 주택·토지·건물 과세표준에서 <strong>1억원 공제</strong> 후 등급별 점수 환산<br />
        · 전세보증금: <strong>30%만</strong> 재산으로 반영<br />
        · 재산 과표 1억원 이하 → 재산 점수 <strong>0점</strong> (부담 없음)<br /><br />
        <strong>자동차 반영 기준</strong><br />
        · 출고가 <strong>4천만원 이상</strong> 또는 배기량 <strong>1,600cc 초과</strong>만 반영<br />
        · 차령 <strong>9년 이상</strong>이면 제외<br />
        · 장애인용·생업용 차량(택시·화물차) 제외
      </BorderBox>

      <Divider />

      <H2>보험료를 줄이는 방법이 있나요?</H2>

      <Checklist items={[
        "소득이 줄었으면 건강보험공단에 조정 신청 (소득 변동 증빙 필요)",
        "직장가입자 가족의 피부양자로 등록 가능 여부 확인",
        "자동차 매각 후 보험료 재산정 신청",
        "국민연금 소득은 50%만 반영되니 연금 수령 시기 고려",
        "정확한 금액은 건강보험공단 모의계산기로 조회",
      ]} />

      <p style={body}>
        <a href="https://www.nhis.or.kr/nhis/minwon/retrieveLocalCalcView.do" style={{ color: "#1D9E75", textDecoration: "underline" }}>건강보험공단 모의계산기</a>에서
        공인인증서 없이도 정확한 보험료를 조회할 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 국민건강보험법·보건복지부 자료를 바탕으로 작성했어요. 보험료율·점수당 금액은 매년 변경될 수 있으니 공단 공식 사이트에서 확인하세요." />
    </ArticleLayout>
  );
}
