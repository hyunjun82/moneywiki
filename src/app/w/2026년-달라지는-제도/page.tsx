"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 2026년에 뭐가 달라지는지 한눈에 보고 싶은 직장인·자영업자·부모. 연초에 검색량 급증.
// Q2. 내 월급·보험료·세금이 얼마나 달라지는지 파악하고, 해당되는 제도를 미리 준비하는 행동.
// Q3. 최저임금 10,320원, 국민연금 9.5%, 건보료 7.19%, 법인세 1%p, 실업급여 상한 68,100원, 육아·출산 지원 확대, 신용카드 공제 자녀 연동, 부동산 세제 변경.
// Q4. GreenBox(핵심 변경 요약) + 표(항목별 비교) + Checklist(내게 해당되는 항목 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "2026년 최저시급이 얼마예요?", a: "시간당 10,320원이에요. 주 40시간 기준 월급은 215만 6,880원(월 209시간)이고, 2025년 대비 2.9% 올랐어요." },
  { q: "국민연금 보험료율은 얼마나 올랐나요?", a: "9%에서 9.5%로 0.5%p 올랐어요. 근로자 부담은 4.5%에서 4.75%로 늘어나요. 월급 300만원이면 월 7,500원 추가 부담이에요." },
  { q: "법인세가 전 구간 1%p 올랐다는 게 무슨 뜻이에요?", a: "과세표준 구간별로 세율이 1%p씩 올라요. 2억 이하 10%, 2억~200억 20%, 200억~3,000억 22%, 3,000억 초과 25%예요." },
  { q: "실업급여 상한액이 얼마로 바뀌었나요?", a: "구직급여 1일 상한액이 66,048원에서 68,100원으로 올랐어요. 6년 만의 인상이에요." },
  { q: "신용카드 공제 한도가 자녀 수에 따라 늘어나나요?", a: "네, 자녀 1명당 50만원씩, 최대 100만원까지 추가돼요. 총급여 7,000만원 이하 + 자녀 2명이면 공제 한도가 400만원까지예요." },
  { q: "건강보험료율은 얼마나 올랐나요?", a: "7.09%에서 7.19%로 0.1%p 올랐어요. 직장가입자 본인 부담 월평균 약 2,235원 늘어나요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "기획재정부 2026 달라지는 세금제도", url: "https://www.moef.go.kr" },
      { label: "고용노동부 최저임금·고용보험 안내", url: "https://www.moel.go.kr" },
      { label: "보건복지부 건강보험료율 결정", url: "https://www.mohw.go.kr" },
      { label: "국민연금공단", url: "https://www.nps.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-계산기", title: "연말정산 계산기", description: "2026년 변경된 공제 한도로 환급액을 바로 계산해봐요." },
  { slug: "4대보험료-계산기", title: "4대보험료 계산기", description: "인상된 국민연금·건보료 기준으로 내 부담액을 확인해봐요." },
  { slug: "실업급여-계산기", title: "실업급여 계산기", description: "상한액 68,100원 기준으로 내 수급액을 계산해봐요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>정책 · 세금 · 복지</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 달라지는 제도<br />
        최저임금부터 세금·복지까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        새해가 되면 최저임금, 보험료, 세금이 바뀌죠.
        2026년에는 최저임금 10,320원, 국민연금 9.5%, 법인세 전 구간 1%p 인상이 핵심이에요.
        내 월급과 세금에 영향을 주는 변경사항을 항목별로 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>2026년 핵심 변경사항 한눈에 보기</H2>
      <p style={body}>
        직장인, 자영업자, 기업 모두 영향받는 제도들이에요. 숫자 위주로 먼저 정리하고, 아래에서 항목별로 풀어볼게요.
      </p>

      <GreenBox>
        · 최저임금: 시급 10,030원 → <strong>10,320원</strong> (2.9% 인상)<br />
        · 국민연금: 보험료율 9% → <strong>9.5%</strong> (매년 0.5%p씩 인상 시작)<br />
        · 건강보험: 보험료율 7.09% → <strong>7.19%</strong><br />
        · 법인세: 전 구간 <strong>1%p 인상</strong><br />
        · 실업급여: 1일 상한 66,048원 → <strong>68,100원</strong><br />
        · 신용카드 공제: 자녀 1명당 50만원 추가 (최대 100만원)
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>최저임금·실업급여·육아 지원은?</H2>
      <p style={body}>
        월급과 직접 연결되는 항목들이에요. 최저임금이 오르면 실업급여 하한액도 따라 올라요.
      </p>

      <SectionBadge>고용·복지 주요 변경</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>2025년</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>2026년</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["최저시급", "10,030원", "10,320원"],
              ["최저임금 월급 (209시간)", "209만 6,270원", "215만 6,880원"],
              ["실업급여 1일 상한", "66,048원", "68,100원"],
              ["출산전후휴가급여 상한", "월 210만원", "월 220만원"],
              ["구직촉진수당 (Ⅰ유형)", "월 50만원", "월 60만원"],
              ["육아휴직 대체인력 지원 (30인 미만)", "월 120만원", "월 140만원"],
            ].map(([item, before, after], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 500 }}>{item}</td>
                <td style={{ padding: "9px 12px", color: "#888" }}>{before}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75", fontWeight: 600 }}>{after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        육아기 10시 출근제도 신설됐어요. 만 12세 이하 자녀가 있으면 주 15~35시간 단축 근무가 가능하고, 임금 감소 없이 사업주에게 월 30만원이 지원돼요.
        보육수당 비과세도 근로자 1인당에서 자녀 1인당으로 바뀌어서, 자녀 2명이면 월 40만원까지 비과세예요.
      </p>

      <Divider />

      <H2>4대보험료는 얼마나 오르나요?</H2>
      <p style={body}>
        국민연금이 가장 크게 올랐어요. 연금개혁으로 2033년까지 매년 0.5%p씩 올라 최종 13%가 될 예정이에요.
        근로자와 사업주가 반반 부담하니까, 월급 300만원 기준 본인 부담은 월 7,500원 늘어나요.
      </p>

      <BorderBox>
        <strong>월급 300만원 기준 4대보험 본인 부담 변화</strong><br /><br />
        · 국민연금: 13만 5,000원 → <strong>14만 2,500원</strong> (+7,500원)<br />
        · 건강보험: 직장 평균 15만 8,464원 → <strong>16만 699원</strong> (+2,235원)<br />
        · 소득대체율: 41.5% → <strong>43%</strong> (더 많이 내는 대신 더 많이 받아요)<br />
        · 군 복무 크레딧: 6개월 → <strong>전체 복무 기간(최대 12개월)</strong> 인정
      </BorderBox>

      <Divider />

      <H2>세금은 뭐가 바뀌었나요?</H2>
      <p style={body}>
        법인세 전 구간 1%p 인상이 가장 큰 변화예요. 개인 입장에서는 신용카드 소득공제 한도가 자녀 수에 연동되는 게 체감이 클 거예요.
      </p>

      <SectionBadge>세금 제도 변경 요약</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>변경 내용</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["법인세", "전 구간 1%p 인상 (2억 이하 10%, 200억 이하 20%)"],
              ["신용카드 공제", "자녀 1명당 50만원 추가 (최대 100만원)"],
              ["월세 세액공제", "세대주와 주소 다른 배우자도 가능, 부부합산 연 1,000만원"],
              ["교육비 세액공제", "9세 미만 예능·체육 학원비 추가"],
              ["고향사랑 기부금", "10만~20만원 구간 공제율 15% → 40%"],
              ["비과세 종합저축", "65세 이상 누구나 → 기초연금 수급자만"],
            ].map(([item, detail], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 500, whiteSpace: "nowrap" }}>{item}</td>
                <td style={{ padding: "9px 12px" }}>{detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        부동산 쪽도 변화가 있어요. 인구감소지역 주택 취득 특례 한도가 수도권 2억 → 4억, 비수도권 3억 → 9억으로 올랐고,
        기준시가 12억 초과 고가주택 2주택자는 전세보증금 합계 12억 초과 시 간주임대료 과세가 시작돼요.
      </p>

      <Divider />

      <H2>나에게 해당되는 변경사항 체크</H2>
      <p style={body}>
        모든 항목이 다 해당되진 않아요. 내 상황에 맞는 것만 체크해보세요.
      </p>

      <SectionBadge>해당 여부 점검</SectionBadge>
      <Checklist items={[
        "최저임금 근로자라면 시급 10,320원 반영 여부 확인",
        "4대보험 가입자라면 국민연금·건보료 인상분 급여명세서 확인",
        "자녀가 있다면 신용카드 공제 추가 한도 반영 여부 확인",
        "법인 대표라면 법인세율 1%p 인상 반영 여부 확인",
        "육아휴직·단축근무 계획이 있다면 확대된 급여·지원금 확인",
        "65세 이상이라면 비과세 종합저축 가입 자격 변경 확인",
      ]} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 기획재정부·고용노동부·보건복지부 발표 자료를 바탕으로 작성됐어요. 세부 내용은 시행령 개정 등으로 달라질 수 있으니 각 부처 공식 사이트에서 최신 정보를 확인해봐요." />
    </ArticleLayout>
  );
}
