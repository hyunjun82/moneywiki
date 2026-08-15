"use client";
// Q1. 2026년 최저임금이 얼마인지, 내 월급이 최저임금 위반인지 확인하려는 사람. 알바생이나 신입 직장인이 많아요.
// Q2. 본인 시급·월급이 최저임금 이상인지 확인하고, 위반 시 신고하는 행동.
// Q3. 시급 10,320원, 월급 215만 6,880원, 209시간 산출 근거, 수습 감액, 4대보험 공제 후 실수령액, 위반 시 처벌과 신고처.
// Q4. GreenBox(핵심 금액) + 표(연도별 비교) + BorderBox(실수령액 계산) + Steps(신고 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "2026년 최저임금 시급은 얼마예요?",
    a: "시급 10,320원이에요. 2025년 10,030원에서 290원(2.9%) 올랐고, 2026년 1월 1일부터 12월 31일까지 적용돼요.",
  },
  {
    q: "주휴수당 포함하면 실제 시급이 더 높은 건가요?",
    a: "주 15시간 이상 일하면 주휴수당이 붙어요. 시급 10,320원 기준 일 8시간이면 주휴수당 포함 실질 시급은 약 12,384원이에요.",
  },
  {
    q: "수습 기간에도 최저임금 다 받나요?",
    a: "1년 이상 근로계약 시 수습 3개월간 10% 감액(시급 9,288원) 가능해요. 다만 청소·경비·배달 같은 단순노무직은 감액 불가예요.",
  },
  {
    q: "외국인 근로자도 최저임금 적용되나요?",
    a: "네, 국적 관계없이 동일하게 적용돼요. 정규직·계약직·아르바이트 구분도 없어요.",
  },
  {
    q: "최저임금 위반 신고는 어디에 하나요?",
    a: "고용노동부 고객상담센터 1350으로 전화하거나, 고용노동부 민원마당(minwon.moel.go.kr)에서 온라인 신고하면 돼요.",
  },
  {
    q: "최저임금 위반하면 어떤 처벌을 받나요?",
    a: "3년 이하 징역 또는 2천만원 이하 벌금이에요. 친고죄가 아니라서 신고 없이도 단속·처벌 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "최저임금위원회 2026년 최저임금 결정", url: "https://www.minimumwage.go.kr" },
      { label: "고용노동부 2026년 최저임금 고시", url: "https://www.moel.go.kr/news/enews/report/enewsView.do?news_seq=18144" },
    ],
  },
];

const RELATED = [
  { slug: "주휴수당", title: "주휴수당 계산 방법", description: "주 15시간 이상 일하면 받는 주휴수당, 계산법과 미지급 대응법이에요." },
  { slug: "4대보험", title: "4대보험 요율과 계산", description: "월급에서 빠지는 4대보험료, 2026년 요율과 계산법이에요." },
  { slug: "2026년-달라지는-제도", title: "2026년 달라지는 제도", description: "최저임금 외에 연금·보험·세금 등 바뀌는 것들 모아봤어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>노동 · 임금 · 2026년</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 최저임금 시급 10,320원<br />
        월급·실수령액·위반 신고까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        알바비가 최저임금보다 적은 건 아닌지, 월급으로 환산하면 얼마인지 궁금하셨죠?
        2026년 최저임금은 시급 10,320원이에요. 주 40시간 풀타임 기준 월급 약 215만원이고,
        4대보험 떼면 손에 쥐는 돈은 약 194만원이에요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>2026년 최저임금 핵심 금액</H2>
      <p style={body}>
        <a href="https://www.minimumwage.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>최저임금위원회</a>가
        결정하고 <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>가
        고시해요. 2026년 1월 1일부터 12월 31일까지 1인 이상 모든 사업장에 적용돼요.
      </p>

      <GreenBox>
        · 시급: <strong>10,320원</strong> (2025년 10,030원 대비 +290원, +2.9%)<br />
        · 일급(8시간): <strong>82,560원</strong><br />
        · 월급(209시간): <strong>2,156,880원</strong><br />
        · 연봉 환산: <strong>25,882,560원</strong>
      </GreenBox>

      <SectionBadge>최근 5년 최저임금 변화</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>연도</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>시급</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>월급(209h)</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>인상률</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["2022", "9,160원", "1,914,440원", "5.1%"],
              ["2023", "9,620원", "2,010,580원", "5.0%"],
              ["2024", "9,860원", "2,060,740원", "2.5%"],
              ["2025", "10,030원", "2,096,270원", "1.7%"],
              ["2026", "10,320원", "2,156,880원", "2.9%"],
            ].map(([year, hourly, monthly, rate], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee", background: year === "2026" ? "#f0faf6" : "transparent" }}>
                <td style={{ padding: "9px 12px", fontWeight: year === "2026" ? 700 : 400 }}>{year}</td>
                <td style={{ padding: "9px 12px", textAlign: "right" }}>{hourly}</td>
                <td style={{ padding: "9px 12px", textAlign: "right" }}>{monthly}</td>
                <td style={{ padding: "9px 12px", textAlign: "right" }}>{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>월급 계산법과 209시간의 의미</H2>
      <p style={body}>
        월급은 시급에 월 소정근로시간을 곱해서 구해요.
        주 40시간 풀타임이면 월 209시간을 적용하는데, 이 209시간에는 <a href="/w/주휴수당" style={{ color: "#1D9E75", textDecoration: "underline" }}>주휴수당</a> 8시간이 포함돼 있어요.
        주 15시간 이상 근무하면 자동으로 주휴수당이 발생해요.
      </p>

      <BorderBox>
        <strong>근무 형태별 월급 (2026년 기준)</strong><br /><br />
        · 주 40시간 (209시간): <strong>2,156,880원</strong><br />
        · 주 35시간 (182.9시간): 약 1,887,528원<br />
        · 주 30시간 (156.8시간): 약 1,618,176원<br />
        · 주 20시간 (104.5시간): 약 1,078,440원<br />
        · 주 15시간 (78.4시간): 약 809,088원
      </BorderBox>

      <p style={body}>
        주 15시간 미만이면 주휴수당이 없어서 단순히 시급 x 근무시간으로 계산해요.
        이 경우 월급이 확 줄어드니 근로계약서에 주당 근무시간을 꼭 확인해야 해요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>4대보험 공제 후 실수령액</H2>
      <p style={body}>
        월급 통장에 찍히는 금액은 <a href="/w/4대보험" style={{ color: "#1D9E75", textDecoration: "underline" }}>4대보험</a>을 뺀 실수령액이에요.
        월급 약 215만원 기준으로 공제 내역을 볼게요.
      </p>

      <BorderBox>
        <strong>월급 2,156,880원 기준 공제 내역</strong><br /><br />
        · 국민연금 (4.5%): 약 97,060원<br />
        · 건강보험 (3.545%): 약 76,460원<br />
        · 장기요양보험 (건보의 12.95%): 약 9,900원<br />
        · 고용보험 (0.9%): 약 19,410원<br />
        · <strong>총 공제: 약 202,830원</strong><br /><br />
        → 실수령액: 약 <strong>1,954,050원</strong>
      </BorderBox>

      <p style={body}>
        부양가족이 있으면 소득세 공제로 실수령액이 더 늘어날 수 있어요.
        정확한 금액은 급여명세서로 확인하는 게 가장 정확해요.
      </p>

      <Divider />

      <H2>수습 기간 감액과 적용 제외</H2>
      <p style={body}>
        1년 이상 근로계약을 맺은 경우, 수습 3개월간 최저임금의 90%를 적용할 수 있어요.
        시급 10,320원의 90%면 <strong>9,288원</strong>, 월급으로 약 194만원이에요.
      </p>

      <GreenBox>
        수습 감액이 안 되는 경우가 있어요.<br />
        · 단순노무직 (청소, 경비, 주방보조, 배달 등)<br />
        · 1년 미만 단기 근로계약<br />
        · 이 두 가지에 해당하면 처음부터 정상 최저임금을 받아야 해요.
      </GreenBox>

      <p style={body}>
        적용 제외 대상도 있어요. 동거하는 친족만 사용하는 사업, 가사사용인(가정부 등),
        선원법 적용 선원은 최저임금법 대신 별도 법률을 적용받아요.
        이 경우가 아니면 1인 이상 모든 사업장에 적용돼요.
      </p>

      <Divider />

      <H2>최저임금 위반 시 처벌과 신고 방법</H2>
      <p style={body}>
        최저임금보다 적게 주면 <strong>3년 이하 징역 또는 2천만원 이하 벌금</strong>이에요.
        친고죄가 아니라서 신고 없이도 고용노동부가 직접 단속하고 처벌할 수 있어요.
      </p>

      <SectionBadge>최저임금 위반 신고 절차</SectionBadge>
      <Steps steps={[
        { title: "증거 확보", desc: "급여명세서·근로계약서·출퇴근 기록 등 증거 확보" },
        { title: "노동부 신고", desc: "고용노동부 고객상담센터 1350 전화 또는 민원마당(minwon.moel.go.kr) 온라인 신고" },
        { title: "사실 조사", desc: "관할 고용노동청에서 사실 조사 진행" },
        { title: "시정·처벌", desc: "위반 확인 시 시정명령 → 미이행 시 형사처벌" },
      ]} />

      <p style={body}>
        미지급 임금은 퇴직 후 3년 내에 청구할 수 있어요.
        증거가 핵심이니 급여명세서, 근로계약서, 근무 기록을 꼭 보관해두세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 최저임금위원회·고용노동부 자료를 바탕으로 작성했어요. 4대보험 요율은 매년 변동되니 정확한 실수령액은 급여명세서로 확인해봐요." />
    </ArticleLayout>
  );
}
