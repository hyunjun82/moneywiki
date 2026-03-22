"use client";

// Q1. 전세/월세 계약 후 확정일자를 받아야 하는데, 주민센터 안 가고 인터넷으로 받을 수 있는지 알고 싶은 세입자.
// Q2. 전월세신고로 확정일자를 무료 자동 부여받거나, 정부24에서 온라인 신청하는 행동.
// Q3. 전월세신고 시 확정일자 자동 부여, 정부24·인터넷등기소에서 온라인 신청 가능, 주민센터 방문 시 600원, 효력 발생 시점(전입신고 다음날 0시), 확정일자 vs 전입신고 차이.
// Q4. Steps(발급 절차) + GreenBox(핵심 요약) + BorderBox(발급 채널 비교) + Checklist(이사 당일 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const ONLINE_STEPS = [
  { title: "부동산거래관리시스템 접속", desc: "rtms.molit.go.kr에 접속해서 공동인증서(또는 네이버·카카오 인증)로 로그인해요." },
  { title: "전월세 신고서 작성", desc: "임대인·임차인 정보, 주택 정보, 보증금/월세, 계약 기간을 입력하고 임대차계약서 스캔본을 첨부해요." },
  { title: "제출 및 처리 대기", desc: "내용 확인 후 제출하면 3~5일 내 처리돼요. 처리 완료되면 확정일자가 자동 부여돼요." },
  { title: "신고필증에서 확정일자 확인", desc: "신고필증을 발급받으면 확정일자 날짜가 적혀 있어요. 이게 보증금 보호의 기준일이 돼요." },
];

const MOVING_DAY = [
  "잔금 치르기 전 등기부등본 한 번 더 확인",
  "이사 당일 바로 전입신고 (정부24 또는 주민센터)",
  "전월세신고 대상이면 온라인 신고 → 확정일자 자동 부여",
  "전월세신고 대상 아니면 주민센터에서 확정일자 받기 (600원)",
  "확정일자 받은 후 신고필증 또는 계약서 원본 보관",
];

const FAQS = [
  { q: "확정일자 인터넷으로만 받을 수 있나요?", a: "전월세신고를 온라인으로 하면 확정일자가 자동 부여돼요. 전월세신고 대상이 아니면 정부24에서 온라인 신청하거나 주민센터에 방문해야 해요." },
  { q: "비용이 얼마예요?", a: "전월세신고를 통한 확정일자는 무료예요. 주민센터 방문 시 600원, 정부24 온라인 신청도 수수료가 있어요." },
  { q: "확정일자 받은 날 바로 효력이 생기나요?", a: "아니에요. 전입신고 다음 날 0시부터 효력이 발생해요. 확정일자 + 전입신고 + 실제 거주, 세 가지가 모두 갖춰져야 우선변제권이 생겨요." },
  { q: "전월세신고 대상은 누구예요?", a: "보증금 6천만원 초과 또는 월세 30만원 초과하는 계약이면 신고 의무가 있어요. 서울에서 전세 살면 대부분 해당돼요." },
  { q: "확정일자 없으면 어떻게 되나요?", a: "대항력(계약 인정)은 있지만, 우선변제권(경매 시 보증금 받을 순위)이 없어요. 600원이니 꼭 받으세요." },
  { q: "전입신고만 하면 안 되나요?", a: "전입신고만 하면 대항력만 있고, 확정일자까지 받아야 우선변제권이 생겨요. 둘 다 해야 보증금을 제대로 보호받아요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "주택임대차보호법(법제처)", url: "https://www.law.go.kr/법령/주택임대차보호법" },
      { label: "부동산거래관리시스템", url: "https://rtms.molit.go.kr" },
      { label: "대법원 인터넷등기소", url: "https://www.iros.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "확정일자", title: "확정일자란?", description: "확정일자의 법적 의미와 효력을 설명해요." },
  { slug: "전입신고-방법", title: "전입신고 방법", description: "온라인·오프라인 전입신고 절차예요." },
  { slug: "대항력-발생-시점", title: "대항력 발생 시점", description: "전입신고 다음 날 0시 대항력 발생 원리예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차 · 보증금 보호</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        확정일자, 주민센터 안 가고 받을 수 있나?
        <br />
        <span style={{ fontSize: 18, fontWeight: 500, color: "#555" }}>
          인터넷 발급 방법과 효력 발생 시점
        </span>
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 계약하고 확정일자 받으려면 주민센터 가야 하냐고요? 꼭 그런 건 아니에요.
        전월세신고하면 확정일자가 자동으로 부여돼요. 무료이고 온라인으로 끝나요.
      </p>

      <Divider />

      <H2>확정일자 받는 3가지 방법</H2>
      <p style={body}>
        본인 상황에 따라 가장 편한 방법을 선택하세요.
      </p>
      <SectionBadge>발급 채널 비교</SectionBadge>
      <BorderBox title="확정일자 발급 채널">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.8 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #1D9E75" }}>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>방법</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>비용</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>소요 시간</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>조건</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px 6px", fontWeight: 600, color: "#1D9E75" }}>전월세신고 (온라인)</td>
              <td style={{ padding: "8px 6px" }}>무료</td>
              <td style={{ padding: "8px 6px" }}>3~5일</td>
              <td style={{ padding: "8px 6px" }}>보증금 6천만원↑ 또는 월세 30만원↑</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px 6px", fontWeight: 600 }}>정부24 온라인 신청</td>
              <td style={{ padding: "8px 6px" }}>수수료 있음</td>
              <td style={{ padding: "8px 6px" }}>즉시~수일</td>
              <td style={{ padding: "8px 6px" }}>본인 인증 필요</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 6px", fontWeight: 600 }}>주민센터 방문</td>
              <td style={{ padding: "8px 6px" }}>600원</td>
              <td style={{ padding: "8px 6px" }}>5분</td>
              <td style={{ padding: "8px 6px" }}>계약서 원본 + 신분증</td>
            </tr>
          </tbody>
        </table>
      </BorderBox>

      <Divider />

      <H2>전월세신고로 확정일자 받는 절차</H2>
      <p style={body}>
        보증금 6천만원 초과 또는 월세 30만원 초과 계약이면 전월세신고 의무 대상이에요.
        <a href="https://rtms.molit.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>부동산거래관리시스템</a>에서 신고하면
        확정일자가 자동으로 부여돼요.
      </p>
      <SectionBadge>온라인 신고 4단계</SectionBadge>
      <Steps steps={ONLINE_STEPS} />

      <Divider />

      <H2>확정일자 효력은 언제부터 생기나요?</H2>
      <p style={body}>
        받은 날 바로 효력이 생기는 게 아니에요. 이 부분을 모르면 낭패를 볼 수 있어요.
      </p>
      <GreenBox title="효력 발생 핵심">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2.4 }}>
          <li><strong>전입신고 + 확정일자 + 실제 거주</strong>, 세 가지가 모두 갖춰져야 우선변제권 발생</li>
          <li>효력은 <strong>전입신고 다음 날 0시</strong>부터</li>
          <li>이사 당일 집주인이 근저당 설정하면 근저당이 선순위, 내가 후순위</li>
          <li>그래서 <strong>잔금 전 등기부등본 확인</strong>이 필수</li>
        </ul>
      </GreenBox>

      <Divider />

      <H2>확정일자 vs 전입신고, 뭐가 다른가요?</H2>
      <p style={body}>
        둘 다 해야 해요. 하나만 하면 보호가 불완전해요.
      </p>
      <BorderBox title="확정일자와 전입신고 차이">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2.2 }}>
          <li><strong>전입신고</strong> → 대항력 부여 (&quot;저 여기 살아요&quot;를 공식 등록. 새 집주인에게도 계약 인정)</li>
          <li><strong>확정일자</strong> → 우선변제권 부여 (&quot;이 계약이 이 날짜에 존재했다&quot;를 증명. 경매 시 보증금 순위 결정)</li>
          <li><strong>둘 다 해야</strong> 보증금을 제대로 보호받을 수 있어요</li>
        </ul>
      </BorderBox>

      <Divider />

      <H2>이사 당일 꼭 해야 할 체크리스트</H2>
      <p style={body}>
        하루라도 늦으면 위험해요. 이사 당일에 모두 처리하세요.
      </p>
      <SectionBadge>이사 당일 필수</SectionBadge>
      <Checklist items={MOVING_DAY} />

      <Divider />

      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />

      <RelatedArticles items={RELATED} />

      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법을 바탕으로 작성했어요. 구체적 사안은 법률 전문가에게 상담하세요." />
    </ArticleLayout>
  );
}
