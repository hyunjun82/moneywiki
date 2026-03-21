"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 은퇴했거나 곧 은퇴할 예정인데 생활비가 부족해서 국민연금을 조기에 받고 싶은데 감액이 얼마인지, 손해인지 계산해보고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 본인의 손익분기점 나이를 계산하고 조기수령 신청 여부를 결정해서 국민연금공단에 신청하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 감액률(1년당 6%), 신청 조건(가입기간 10년, 소득 298만원 이하), 출생연도별 조기수령 가능 나이, 손익분기점(약 77세), 취업 시 연금 정지 주의.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → 감액률 표 + 손익분기점 계산표 + 출생연도별 나이표 + BorderBox(신청 조건) + GreenBox(언제 유리한지) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "조기수령 중에 취업하면 어떻게 되나요?",
    a: "월평균 소득이 298만원(2024년 기준)을 초과하면 연금이 정지돼요. 소득이 줄거나 없어지면 다시 받을 수 있어요. 취업 전 국민연금공단(1355)에 먼저 확인해보세요.",
  },
  {
    q: "조기수령 취소하고 나중에 다시 받을 수 있나요?",
    a: "한 번 조기수령을 시작하면 취소가 안 돼요. 감액된 연금을 평생 받게 돼요. 결정 전에 손익분기점을 꼭 계산해보세요.",
  },
  {
    q: "국민연금 수령액이 얼마인지 어떻게 확인하나요?",
    a: "국민연금공단 홈페이지(nps.or.kr) 또는 내연금 앱에서 예상 수령액을 조회할 수 있어요. 로그인 후 '내 연금 조회' 메뉴에서 볼 수 있어요.",
  },
  {
    q: "배우자 명의로도 조기수령 신청 가능한가요?",
    a: "네, 각자 개인이 신청해요. 남편·아내 각각 국민연금 가입 이력이 있으면 각각 조기수령 조건을 충족해야 해요.",
  },
  {
    q: "조기수령과 퇴직연금을 동시에 받을 수 있나요?",
    a: "가능해요. 국민연금 조기수령과 퇴직연금(DB·DC·IRP) 수령은 별개예요. 55세에 퇴직연금 수령을 시작하고 국민연금 조기수령도 동시에 신청할 수 있어요.",
  },
  {
    q: "연금 수령 중 해외 거주하면 소득으로 보나요?",
    a: "해외 근로소득도 298만원 초과 시 소득으로 봐요. 다만 국내 등록 여부와 소득 신고 방식에 따라 다를 수 있어서 공단에 확인해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국민연금공단 조기노령연금 안내", url: "https://www.nps.or.kr/pnsinfo/ntpsklg/getOHAF0056M0.do" },
      { label: "국민연금법 제61조(법제처)", url: "https://www.law.go.kr/법령/국민연금법" },
      { label: "보건복지부 연금정책", url: "https://www.mohw.go.kr/menu.es?mid=a10714010200" },
    ],
  },
];

const RELATED = [
  { slug: "국민연금-수령액-계산기", title: "국민연금 예상 수령액 계산기", description: "가입기간과 소득으로 내 연금액을 계산해보세요." },
  { slug: "국민연금-2026년-개혁-보험료율-소득대체율-변경", title: "국민연금 2026년 개혁 내용", description: "보험료율과 소득대체율 변경으로 수령액이 어떻게 달라지나요." },
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 일시금 vs 연금 수령", description: "국민연금과 함께 받을 때 최적의 조합을 찾아보세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>국민연금 · 조기수령 · 노후</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국민연금 조기수령 감액률<br />
        신청조건·손익분기점 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        생활비가 부족해서 국민연금을 일찍 받고 싶으시죠? 조기수령은 최대 5년 먼저 받을 수 있지만,
        1년당 6%씩 영구 감액돼요. 77세를 넘어 오래 산다면 정상 수령이 유리해요.
        감액률·신청 조건·손익분기점을 계산해서 결정하세요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>감액률이 얼마인가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/국민연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금법 제61조</a>에서 조기노령연금 감액률을 규정하고 있어요.
        정상 수령 나이보다 1년 일찍 받을 때마다 6%씩 감액되고, 이 감액은 평생 유지돼요.
        5년 앞당기면 30% 깎인 금액을 죽을 때까지 받게 돼요.
      </p>

      <SectionBadge>조기수령 기간별 감액률</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>앞당기는 기간</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>감액률</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>기준 100만원 기준</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1년 앞당김", "6%", "월 94만원"],
              ["2년 앞당김", "12%", "월 88만원"],
              ["3년 앞당김", "18%", "월 82만원"],
              ["4년 앞당김", "24%", "월 76만원"],
              ["5년 앞당김 (최대)", "30%", "월 70만원"],
            ].map(([period, rate, amount], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px" }}>{period}</td>
                <td style={{ padding: "9px 12px", color: "#ef4444", fontWeight: 600 }}>{rate}</td>
                <td style={{ padding: "9px 12px" }}>{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>신청 조건, 3가지 모두 충족해야 해요</H2>
      <p style={body}>
        <a href="https://www.nps.or.kr/pnsinfo/ntpsklg/getOHAF0056M0.do" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금공단 조기노령연금</a> 기준에 따르면 아래 3가지를 모두 충족해야 신청할 수 있어요.
        조건을 못 채우면 신청 자체가 안 돼요.
      </p>

      <BorderBox>
        조기수령 신청 조건이에요.<br />
        · <strong>가입기간 10년 이상</strong>: 국민연금 납부 기간 총 10년 이상<br />
        · <strong>나이 조건</strong>: 출생연도별 정상수령 나이보다 1~5년 이른 나이 도달<br />
        · <strong>소득 조건</strong>: 무소득 또는 월평균 소득 298만원(2024년 기준) 이하<br />
        → 회사에 다니며 월급이 298만원 초과하면 신청 불가
      </BorderBox>

      <SectionBadge>출생연도별 정상수령 나이 vs 조기수령 가능 나이</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>출생연도</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>정상수령 나이</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>조기수령 가능 나이</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1953~1956년", "61세", "56세~"],
              ["1957~1960년", "62세", "57세~"],
              ["1961~1964년", "63세", "58세~"],
              ["1965~1968년", "64세", "59세~"],
              ["1969년 이후", "65세", "60세~"],
            ].map(([year, normal, early], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px" }}>{year}</td>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{normal}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75", fontWeight: 600 }}>{early}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>손익분기점은 언제인가요?</H2>
      <p style={body}>
        손익분기점은 조기수령 총액과 정상수령 총액이 같아지는 나이예요.
        그 이후로 오래 살수록 정상수령이 누적 총액에서 유리해요.
        아래 예시에서 60세에 조기수령을 시작하면 약 77세가 손익분기점이에요.
      </p>

      <SectionBadge>손익분기점 계산 예시 (월 100만원 기준, 5년 조기수령)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>나이</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>60세 조기수령 (월 70만원)</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>65세 정상수령 (월 100만원)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["70세", "8,400만원 (10년 × 70만원 × 12)", "6,000만원 (5년 × 100만원 × 12)"],
              ["75세", "12,600만원", "12,000만원"],
              ["77세", "14,280만원", "14,400만원 ← 역전 (손익분기점)"],
              ["80세", "16,800만원", "18,000만원"],
            ].map(([age, early, normal], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee", background: i === 2 ? "#fff9e6" : undefined }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{age}</td>
                <td style={{ padding: "9px 12px" }}>{early}</td>
                <td style={{ padding: "9px 12px" }}>{normal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        77세 이전에 사망하면 조기수령이 유리하고, 그 이후엔 정상수령이 유리해요.<br />
        건강하고 장수 가능성이 높다면 정상 수령을 기다리는 게 유리해요.
      </GreenBox>

      <SectionBadge>조기수령 신청 전 체크리스트</SectionBadge>
      <Checklist items={[
        "국민연금 가입기간 10년 이상인지 확인",
        "현재 소득이 월 298만원 이하인지 확인",
        "출생연도별 최소 조기수령 가능 나이 도달 여부 확인",
        "손익분기점(약 77세) 대비 본인 기대수명 고려",
        "취업 시 연금 정지 가능성 감안",
      ]} />

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 국민연금공단·국민연금법을 바탕으로 작성됐어요. 소득 기준(298만원)은 매년 변동되고, 손익분기점은 개인 수령액에 따라 달라지니 국민연금공단(1355)에서 개인별 시뮬레이션을 받아보세요." />
    </ArticleLayout>
  );
}
