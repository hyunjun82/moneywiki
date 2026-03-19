"use client";

// Q1. 경기도에 사는 24세 청년이 기본소득 받을 수 있는지 자격 확인하는 상황
// Q2. 나이·거주 조건 확인 → 잡아바 플랫폼에서 분기별 신청 → 지역화폐 수령
// Q3. 만24세 / 최근3년 계속 or 합산10년 거주 / 분기당 25만원(연100만원) / 지역화폐 지급 / 온라인만 가능
// Q4. GreenBox(수급 자격 조건) + GreenBox(지급 방식 + 사용처) + BorderBox(신청 주의사항) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "경기도 청년 기본소득은 누가 받을 수 있나요?",
    a: "신청일 기준 만 24세이고, 최근 3년 이상 경기도에 계속 거주했거나 합산 10년 이상 거주한 사람이면 받을 수 있어요. 소득 기준이나 취업 여부는 상관없어요.",
  },
  {
    q: "한 분기만 신청해도 되나요?",
    a: "네, 원하는 분기에만 신청할 수 있어요. 다만 각 분기별로 신청해야 해서, 신청한 분기만 25만원씩 받아요. 1년 4분기를 모두 신청하면 최대 100만원을 받을 수 있어요.",
  },
  {
    q: "지역화폐는 어디서 쓸 수 있나요?",
    a: "경기도 내 가맹 음식점, 편의점, 마트, 약국, 카페 등에서 현금처럼 쓸 수 있어요. 온라인 쇼핑이나 대형 프랜차이즈, 통신요금 납부는 안 되는 경우가 있으니 확인이 필요해요.",
  },
  {
    q: "방문 신청도 가능한가요?",
    a: "방문 신청이나 우편 신청은 안 돼요. 반드시 잡아바 플랫폼(jobaba.net)에서 온라인으로 신청해야 해요. 신청 마감 시간 전에 여유 있게 제출하는 게 좋아요.",
  },
  {
    q: "기초생활수급자도 받을 수 있나요?",
    a: "기초생활수급자 등 다른 정부 지원금을 받고 있는 경우 중복 수급 제한이 있을 수 있어요. 신청 전 경기도일자리재단이나 잡아바 플랫폼에서 확인해보세요.",
  },
];

const REFERENCES = [
  {
    category: "공식 사이트",
    items: [
      { label: "경기도 청년기본소득 공식 안내", url: "https://www.gg.go.kr" },
      { label: "잡아바 청년기본소득 신청 플랫폼", url: "https://apply.jobaba.net" },
    ],
  },
];

const RELATED = [
  { slug: "서울시-청년-대중교통비-지원", title: "서울시 청년 대중교통비 지원", description: "서울 청년이면 대중교통비도 돌려받을 수 있어요." },
  { slug: "청년-수당-자격-요건", title: "청년 수당 자격 및 신청", description: "다른 청년 지원금 자격도 함께 확인해요." },
  { slug: "청년내일저축계좌", title: "청년내일저축계좌 신청 조건", description: "저소득 청년 목돈 마련 지원 제도예요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 경기도 · 청년 지원</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경기도 청년 기본소득<br />
        만 24세 연 최대 100만원 지역화폐
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        경기도에 사는 만 24세 청년이면 분기당 25만원씩, 연 최대 100만원을 지역화폐로 받을 수 있어요.
        소득이나 취업 여부 상관없이 나이와 거주 조건만 충족하면 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>수급 자격 조건</H2>
      <p style={body}>
        나이와 거주기간 두 가지만 맞으면 돼요.
        소득 기준은 없어요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>조건</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>내용</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "나이", value: "신청일 기준 만 24세" },
              { label: "거주 요건 (택 1)", value: "① 최근 3년 이상 경기도 계속 거주\n② 합산 10년 이상 경기도 거주" },
              { label: "소득 기준", value: "없음 (직장인·취준생·아르바이트 무관)" },
              { label: "신청 방법", value: "잡아바 플랫폼 온라인 신청만 가능" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.label}</td>
                <td style={{ padding: "5px 8px", whiteSpace: "pre-line", fontSize: 12 }}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 생일 전에 신청하면 아직 만 24세가 안 된 경우 주의 / 신청일 기준으로 판단
        </p>
      </GreenBox>

      <H2>지급 방식과 사용처</H2>
      <p style={body}>
        현금이 아니라 지역화폐로 줘요. 사용 기간이 정해져 있으니 받은 분기 안에 써야 해요.
      </p>

      <GreenBox>
        <strong>지급 구조</strong><br />
        분기당 25만원 × 4분기 = 연 최대 100만원<br />
        지급 형태: 지역화폐 카드 or 모바일 앱<br />
        사용 기간: 해당 분기 내 (예: 1분기 → 3월 말까지)<br />
        <br />
        <strong>사용 가능 가맹점</strong><br />
        음식점, 편의점, 마트, 약국, 카페 등 경기도 내 가맹점<br />
        지역별 차이: 수원페이, 성남사랑상품권 등 시·군별 지역화폐<br />
        <br />
        <strong>사용 불가 항목</strong><br />
        온라인 쇼핑, 대형 프랜차이즈 일부, 통신요금·공과금<br />
        <br />
        ★ 지역화폐 앱에서 가맹점 미리 확인 가능
      </GreenBox>

      <H2>신청 방법과 주의사항</H2>
      <p style={body}>
        온라인으로만 신청할 수 있어요. 분기 신청 기간을 놓치면 그 분기는 받을 수 없어요.
      </p>

      <BorderBox>
        <strong>신청 절차</strong><br />
        ① 잡아바 플랫폼 접속 (apply.jobaba.net)<br />
        ② 분기별 신청 공고 확인 → 신청 기간 내 접수<br />
        ③ 신청 후 2~4주 자격심사<br />
        ④ 승인 시 지역화폐 발급 (카드 우편 or 앱)<br />
        <br />
        <strong>주의사항</strong><br />
        방문·우편 신청 불가 → 온라인 전용<br />
        각 분기마다 별도 신청 필요 (자동 갱신 없음)<br />
        신청 기간 마감 후 신청 불가 → 공고 확인 필수<br />
        타 정부 지원금과 중복 여부 사전 확인<br />
        <br />
        ★ 신청 기간은 경기도 공식 채널·잡아바에서 분기별 공지
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. 지급 금액과 신청 기간은 경기도 정책에 따라 변경될 수 있으니 신청 전 잡아바 플랫폼에서 최신 공고를 확인하세요." />
    </ArticleLayout>
  );
}
