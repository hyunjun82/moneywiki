"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     대출이나 카드 신청 전에 내 신용점수가 몇 점인지 모르는 직장인·사회초년생
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     NICE 지키미 또는 토스 앱에서 신용점수를 무료로 조회하고 점수 수준을 파악한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     무료 조회처, 조회해도 점수 안 떨어짐, NICE·KCB 두 기관 존재, 카드 발급 기준 점수
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     조회처 목록표 → 주의사항 GreenBox → 평가 기준 BorderBox → FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const SCORE_TABLE = [
  { range: "900점 이상", grade: "최우량", desc: "대출 최저금리, 카드 한도 최대" },
  { range: "800~899점", grade: "우량", desc: "대부분 금융거래 원활" },
  { range: "700~799점", grade: "양호", desc: "일반 카드·대출 가능" },
  { range: "600~699점", grade: "보통", desc: "카드 발급 제한, 대출 금리 상승" },
  { range: "500점 이하", grade: "주의", desc: "정상 금융회사 이용 어려움" },
];

const CHECKLIST = [
  "NICE 지키미(credit.co.kr),NICE 신용점수 무료 조회, 연 3회",
  "올크레딧(allcredit.co.kr),KCB 신용점수 무료 조회, 연 3회",
  "토스 앱,KCB 연동, 무제한 무료, 실시간 변동 알림",
  "카카오뱅크·네이버페이·카카오페이,앱 내 신용점수 메뉴",
  "본인 조회는 아무리 해도 점수에 영향 없어요",
  "금융회사가 대출 심사로 조회하면 '채무조회'로 일부 영향",
];

const FAQS = [
  {
    q: "신용점수 조회하면 점수가 떨어지나요?",
    a: "본인 조회는 전혀 영향 없어요. 2011년 10월부터 본인 신용조회는 평가에 반영되지 않아요. 오히려 자주 확인해서 관리하는 게 좋아요. 점수에 영향 주는 건 금융회사의 대출 심사 조회예요.",
  },
  {
    q: "NICE 점수와 KCB 점수가 다를 수 있나요?",
    a: "네, 다를 수 있어요. 두 신용평가회사가 각자 다른 기준으로 평가해요. 보통 비슷하지만 차이가 날 수 있어요. 대출·카드 신청 시 어느 회사 점수를 쓰는지 금융회사마다 달라요.",
  },
  {
    q: "신용카드 발급 기준 점수는 얼마예요?",
    a: "2026년 3월까지 기준으로 NICE 720점 이상, KCB 621점 이상이에요. 카드사마다 내부 기준이 달라서 이 점수라도 거절될 수 있어요. 정확한 기준은 각 카드사에 문의해야 해요.",
  },
  {
    q: "점수를 빨리 올리는 방법이 있나요?",
    a: "연체 없이 꾸준히 납부하는 게 제일 효과적이에요. 통신비·보험료 자동이체 등록, 체크카드 꾸준히 사용, 기존 대출 일부 상환도 도움이 돼요. 단기간에 크게 올리는 마법 같은 방법은 없어요.",
  },
  {
    q: "신용카드를 여러 개 만들면 점수가 내려가나요?",
    a: "단기간에 여러 곳에 동시 신청하면 채무조회가 여러 번 기록돼서 소폭 내려갈 수 있어요. 필요한 카드 하나씩 신청하는 게 좋아요. 카드를 오래 유지하고 잘 쓰면 오히려 점수에 도움이 돼요.",
  },
  {
    q: "연체 기록은 얼마나 유지되나요?",
    a: "단기 연체(3개월 미만)는 상환 후 일정 기간이 지나면 반영이 줄어요. 장기 연체(3개월 이상)는 해소 후에도 최대 5년간 기록이 남아요. 연체는 절대 피하는 게 최선이에요.",
  },
];

const REFERENCES = [
  {
    category: "무료 조회 사이트",
    items: [
      { label: "NICE 지키미,NICE 신용점수 무료 조회", url: "https://www.credit.co.kr" },
      { label: "올크레딧,KCB 신용점수 무료 조회", url: "https://www.allcredit.co.kr" },
    ],
  },
  {
    category: "참고 자료",
    items: [
      { label: "금융감독원: 신용관리 안내", url: "https://www.fss.or.kr" },
      { label: "서민금융진흥원: 신용점수 관리 가이드", url: "https://www.kinfa.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "신용카드-발급-조건", title: "신용카드 발급 조건", description: "카드사별 발급 기준과 소득 요건이에요." },
  { slug: "신용카드-발급-거부-사유", title: "신용카드 발급 거부 사유", description: "점수가 충분한데 거절된 이유와 대처법이에요." },
  { slug: "대출-사기-주의사항", title: "대출 사기 주의사항", description: "저신용자를 노리는 불법 대출 사기 유형이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>신용점수 · 무료 조회 · 금융</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        신용등급 조회 방법 무료<br />
        NICE·KCB 점수 확인하는 곳
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        대출이나 카드 신청 전에 내 신용점수가 궁금하죠?
        NICE 지키미와 올크레딧에서 무료로 조회할 수 있어요.
        본인이 직접 조회하는 건 아무리 많이 해도 점수에 전혀 영향을 주지 않아요.
        토스·카카오뱅크 같은 앱에서도 무료로 실시간 확인이 가능해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>무료 신용점수 조회 4곳</H2>
      <p style={body}>
        국내 신용평가회사는 NICE와 KCB(올크레딧) 두 곳이에요.
        각 회사 사이트에서 연 3회까지 무료로 조회할 수 있고, 토스 앱은 무제한 무료예요.
        금융회사마다 NICE를 쓰는 곳도, KCB를 쓰는 곳도 있어서 둘 다 알아두는 게 좋아요.
      </p>

      <GreenBox>
        NICE 지키미(credit.co.kr): NICE 신용점수, 연 3회 무료<br />
        올크레딧(allcredit.co.kr): KCB 신용점수, 연 3회 무료<br />
        토스 앱: KCB 연동, 무제한 무료 + 변동 알림<br />
        카카오뱅크·네이버페이: 앱 내 신용점수 메뉴
      </GreenBox>

      <p style={body}>
        조회 방법은 간단해요. 사이트 접속 → 본인 인증(휴대전화·공동인증서) → 점수 확인이에요.
        회원가입 없이 조회할 수 있지만, 가입하면 점수 변동 이력과 영향 요인을 볼 수 있어요.
        토스 앱이라면 앱 열고 '신용' 메뉴 누르면 바로 보여요.
      </p>

      <Divider />

      <H2>신용점수 구간별 기준</H2>
      <p style={body}>
        신용점수는 0~1,000점이에요. 점수가 높을수록 대출 한도가 늘고 금리가 낮아져요.
        700점 이상이면 일반 금융거래는 대부분 가능해요.
        2026년 3월까지 기준으로 NICE 720점, KCB 621점 이상이면 신용카드 발급이 돼요.
      </p>

      <SectionBadge>점수 구간 기준</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf8" }}>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>점수 구간</th>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>등급</th>
              <th style={{ padding: "10px 12px", border: "1px solid #d1fae5", textAlign: "left" }}>금융거래</th>
            </tr>
          </thead>
          <tbody>
            {SCORE_TABLE.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb" }}>{row.range}</td>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb", fontWeight: 600, color: "#1D9E75" }}>{row.grade}</td>
                <td style={{ padding: "9px 12px", border: "1px solid #e5e7eb", color: "#4b5563" }}>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        신용평가는 상환 이력, 부채 수준, 신용거래 형태, 신용거래 기간, 비금융 정보(통신비·보험료) 5가지 기준으로 해요.
        연체가 한 번이라도 생기면 점수가 크게 떨어지기 때문에 자동이체로 관리하는 게 가장 확실해요.
      </BorderBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>조회 방법 요약</H2>
      <p style={body}>
        앱 하나만 써도 충분해요. 토스나 카카오뱅크 앱에서 실시간으로 볼 수 있고, 변동이 생기면 알림도 와요.
        대출이나 카드 신청 전에 미리 확인해두면 거절 없이 진행할 수 있어요.
        금융회사가 심사 목적으로 조회하는 '채무조회'는 짧은 기간에 여러 곳에 동시 신청할 때만 소폭 영향이 생겨요.
      </p>

      <SectionBadge>조회 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. 신용카드 발급 기준 점수는 변경될 수 있으니 각 카드사에서 최신 기준을 확인하세요." />
    </ArticleLayout>
  );
}
