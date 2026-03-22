"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 근로복지공단 퇴직연금(푸른씨앗)에 가입돼 있는데, 적립금이 얼마인지 어디서 확인하는지 모르는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 푸른씨앗 홈페이지에 접속해서 적립금·수익률·납입 내역을 직접 조회하는 것.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 홈페이지 주소(pension.comwel.or.kr), 로그인 방법(간편인증·공인인증서), 조회 메뉴 위치, 확인 가능한 항목.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → Steps(조회 절차) + GreenBox(핵심 정보) + BorderBox(확인 항목 표) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "푸른씨앗이 뭔가요?",
    a: "근로복지공단이 운영하는 중소기업퇴직연금기금제도의 이름이에요. 30인 이하 중소기업 근로자가 대상이에요.",
  },
  {
    q: "모바일에서도 조회할 수 있나요?",
    a: "네, 모바일 웹(pension.comwel.or.kr)에서 조회 가능하고, 구글 플레이스토어에서 '푸른씨앗' 앱도 다운받을 수 있어요.",
  },
  {
    q: "적립금이 0원으로 나오면 어떻게 하나요?",
    a: "회사가 아직 부담금을 납입하지 않은 거예요. 인사팀에 납입 일정을 확인하세요.",
  },
  {
    q: "사업주도 조회할 수 있나요?",
    a: "네. 사업주용 로그인 후 사업장 전체 적립 현황과 개별 근로자 정보를 확인할 수 있어요.",
  },
  {
    q: "다른 퇴직연금 계좌도 한 번에 조회할 수 있나요?",
    a: "금융감독원 통합연금포털(100lifeplan.fss.or.kr)에서 모든 금융회사 퇴직연금을 한 번에 조회할 수 있어요.",
  },
  {
    q: "수수료가 빠지나요?",
    a: "네, 운용 수수료가 공제돼요. 수수료 내역도 조회 화면에서 확인할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "근로복지공단 퇴직연금 푸른씨앗", url: "https://pension.comwel.or.kr" },
      { label: "금융감독원 통합연금포털", url: "https://100lifeplan.fss.or.kr" },
      { label: "고용노동부 퇴직연금제도 안내", url: "https://www.moel.go.kr/policy/policyinfo/retire/list.do" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 수령 방법 비교", description: "퇴직연금을 일시금으로 받을지, 연금으로 받을지 비교해보세요." },
  { slug: "국민연금-조기수령-감액률-신청조건-손익분기점", title: "국민연금 조기수령 조건", description: "국민연금 조기수령 시 감액률과 손익분기점을 확인하세요." },
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드 세액공제 한도", description: "퇴직연금 외에 개인연금 세액공제도 활용해보세요." },
];

const QUERY_STEPS = [
  { title: "푸른씨앗 홈페이지 접속", desc: "pension.comwel.or.kr에 접속해요.", tip: "모바일에서도 같은 주소로 접속하면 돼요." },
  { title: "근로자용 로그인", desc: "공동인증서, 간편인증(카카오·네이버·PASS), 또는 휴대폰 인증으로 로그인해요.", tip: "처음이면 회원가입을 먼저 해야 해요. 간편인증으로 가능해요." },
  { title: "내 퇴직연금 메뉴 클릭", desc: "로그인 후 '조회하기' → '부담금·적립금 운용 현황' 메뉴로 이동해요." },
  { title: "적립금·수익률 확인", desc: "적립금 총액, 납입 내역, 운용 수익률, 수수료 내역이 한 화면에 나와요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · 조회</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        근로복지공단 퇴직연금 조회<br />
        푸른씨앗 적립금 확인하는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        근로복지공단 퇴직연금에 가입했는데 적립금이 얼마나 쌓였는지 궁금하죠.
        홈페이지에서 로그인하면 적립금, 수익률, 납입 내역을 한 번에 확인할 수 있어요.
        조회 방법을 단계별로 알려드릴게요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>조회 절차, 4단계면 끝나요</H2>
      <p style={body}>
        <a href="https://pension.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단 퇴직연금 홈페이지</a>에서
        간편하게 조회할 수 있어요. PC와 모바일 모두 가능해요.
      </p>

      <Steps steps={QUERY_STEPS} />

      <Divider />

      <H2>조회 화면에서 뭘 확인할 수 있나요?</H2>
      <p style={body}>
        로그인하면 내 퇴직연금과 관련된 핵심 정보를 한 화면에서 볼 수 있어요.
      </p>

      <SectionBadge>확인 가능 항목</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>내용</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["적립금 총액", "현재까지 쌓인 퇴직연금 총 금액"],
              ["납입 내역", "회사가 언제 얼마를 납입했는지 상세 이력"],
              ["운용 수익률", "투자 운용 성과 (연간·누적)"],
              ["수수료 내역", "공제된 운용 수수료 내역"],
              ["예상 퇴직급여", "현재 적립금 기반 퇴직 시 예상 수령액"],
            ].map(([a, b], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600 }}>{a}</td>
                <td style={{ padding: "10px 12px" }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>다른 퇴직연금도 한 번에 조회하려면?</H2>
      <p style={body}>
        푸른씨앗 외에 다른 금융회사 퇴직연금이 있다면, <a href="https://100lifeplan.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원 통합연금포털</a>에서
        모든 퇴직연금을 한 번에 조회할 수 있어요.
      </p>

      <GreenBox title="통합 조회 방법">
        · 금융감독원 통합연금포털: 100lifeplan.fss.or.kr<br />
        · 공동인증서로 로그인 → 퇴직연금 조회<br />
        · 모든 금융회사(은행·보험·증권) 퇴직연금을 한 화면에서 확인
      </GreenBox>

      <Divider />

      <H2>조회가 안 될 때 확인할 것들</H2>
      <p style={body}>
        조회가 안 되는 경우가 간혹 있어요. 대부분 간단하게 해결돼요.
      </p>

      <BorderBox title="문제 해결 가이드">
        · <strong>회원가입 안 돼 있는 경우</strong> → 먼저 가입하세요 (간편인증 가능)<br />
        · <strong>인증서 오류</strong> → 인증서를 재등록하거나, 다른 인증 수단(간편인증) 사용<br />
        · <strong>적립금 0원</strong> → 회사가 아직 부담금을 납입하지 않은 거예요. 인사팀에 문의하세요<br />
        · <strong>그래도 안 되면</strong> → 근로복지공단 퇴직연금 전화 상담: ☎ 1661-0075
      </BorderBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성했어요. 근로복지공단 홈페이지 화면이나 메뉴 구성은 변경될 수 있으니 직접 접속해서 확인하세요." />
    </ArticleLayout>
  );
}
