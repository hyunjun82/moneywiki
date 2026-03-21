"use client";

// Q1. 통장이 압류돼서 월급이 들어와도 못 쓰고 있거나 2026년 2월 생계비계좌 제도 시행으로 신청하려는 상황
// Q2. 생계비계좌 개설 가능한 은행과 신청 방법 파악 후 즉시 개설, 급여 입금계좌 변경
// Q3. 2026년 2월 1일 시행, 1인 1계좌, 월 250만원 한도, 은행별 신청처, 기존 압류와 새 개설 구분
// Q4. 은행별 신청처 표 + 개설 후 할 일 Steps로 안내
// MAP-INTRO: 통장이 압류돼서 월급이 들어와도 못 쓰고 있나요
// MAP-TYPE: 절차
// MAP-H2: 주요 규칙 > 은행별 신청처 > 개설 후 할 일 > 주의사항 > FAQ
// MAP-COMP: GreenBox > table > Steps > BorderBox > FAQ

"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const MAJOR_BANKS = [
  { name: "KB국민은행", web: "www.kbstar.com", app: "KB스타뱅킹" },
  { name: "신한은행", web: "www.shinhan.com", app: "SOL뱅크" },
  { name: "우리은행", web: "www.wooribank.com", app: "우리WON뱅킹" },
  { name: "하나은행", web: "www.hanabank.com", app: "하나원큐" },
  { name: "NH농협은행", web: "www.nonghyup.com", app: "NH스마트뱅킹" },
];

const INTERNET_BANKS = [
  { name: "카카오뱅크", web: "www.kakaobank.com", app: "카카오뱅크 앱" },
  { name: "토스뱅크", web: "www.tossbank.com", app: "토스 앱" },
  { name: "케이뱅크", web: "www.kbanknow.com", app: "케이뱅크 앱" },
];

const STEPS = [
  {
    title: "생계비계좌 개설 (2월 1일 이후)",
    desc: "시중은행·인터넷은행·저축은행·상호금융·우체국 중 한 곳에서 개설해요. 신분증만 있으면 돼요. 인터넷은행은 100% 비대면, 시중은행은 영업점 또는 앱 모두 가능해요. 1인 1계좌만 가능하니 은행을 신중하게 선택하세요.",
    tip: "인터넷은행은 앱에서 신분증 촬영 + 본인인증으로 바로 개설 가능해요",
  },
  {
    title: "급여 입금계좌 변경",
    desc: "회사 인사팀이나 급여 담당자에게 계좌변경 신청서를 내세요. 다음 달 급여부터 생계비계좌로 받을 수 있어요. 새 계좌번호와 은행명을 전달하면 돼요.",
    tip: "계좌 변경 신청은 급여일 2주 전에는 해야 다음 달 급여에 반영돼요",
  },
  {
    title: "자동이체 계좌 변경",
    desc: "공과금, 통신비, 관리비 등 자동이체 계좌를 생계비계좌로 바꾸세요. 기존 압류 계좌에서 자동이체가 막혀 연체되는 일을 막을 수 있어요. 각 기관 홈페이지 또는 앱에서 이체 계좌를 변경하면 돼요.",
    tip: "통신비·전기요금·관리비 이체 계좌를 한 번에 변경하세요",
  },
  {
    title: "체크카드 연결 (선택)",
    desc: "생계비계좌에 체크카드를 연결하면 일상 결제도 편하게 할 수 있어요. 계좌 개설 시 같이 신청하면 보통 2~3일 내로 발급돼요. 체크카드 사용 내역은 연말정산 카드 공제에도 반영돼요.",
    tip: "체크카드는 계좌 개설 시 함께 신청하는 게 편해요",
  },
];

const FAQS = [
  {
    q: "생계비계좌 언제부터 만들 수 있나요?",
    a: "2026년 2월 1일부터예요. 법무부 발표에 따르면 민사집행법 시행령 개정으로 이날부터 시행돼요. 2월 1일 이전에는 은행에서도 만들어주지 않아요.",
  },
  {
    q: "여러 은행에서 중복으로 만들 수 있나요?",
    a: "안 돼요. 1인 1계좌만 가능해요. 중복 개설은 허용되지 않아서 어느 은행에서 만들지 신중하게 선택해야 해요.",
  },
  {
    q: "월 250만원을 넘게 입금하면 어떻게 되나요?",
    a: "250만원까지만 압류 보호를 받아요. 초과분은 일반 계좌 취급이에요. 급여가 250만원 이상이면 초과분은 따로 관리해야 해요.",
  },
  {
    q: "기존에 압류된 계좌도 해제되나요?",
    a: "아니에요. 2월 1일 이전 기존 압류는 그대로 유지돼요. 생계비계좌 제도는 2월 1일 이후 신규 입금분부터 적용돼요. 기존 압류 계좌 해제는 별도 법적 절차가 필요해요.",
  },
  {
    q: "카카오뱅크·토스뱅크에서도 만들 수 있나요?",
    a: "네, 인터넷전문은행에서도 개설 가능해요. 카카오뱅크, 토스뱅크, 케이뱅크 모두 해당돼요. 앱에서 신분증 촬영 후 본인인증만 하면 바로 개설돼요.",
  },
  {
    q: "생계비계좌도 이자가 붙나요?",
    a: "네, 일반 입출금 계좌처럼 기본 이자가 붙어요. 저축은행은 시중은행보다 예금 금리가 높은 편이에요. 이자를 조금이라도 더 받고 싶으면 저축은행을 고려해보세요.",
  },
];

const REFERENCES = [
  {
    category: "공식 기관",
    items: [
      { label: "법무부: 생계비계좌 제도 안내", url: "https://www.moj.go.kr" },
      { label: "대한민국 정책브리핑", url: "https://www.korea.kr" },
      { label: "금융위원회: 금융소비자 보호", url: "https://www.fsc.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "생계비계좌-개설방법-압류금지", title: "생계비계좌 압류금지 한도와 보호 범위", description: "250만원 한도 계산 방법과 기존 압류와의 차이예요." },
  { slug: "개인회생-신청자격-조건", title: "개인회생 신청자격 조건", description: "압류 외에 채무 해결을 위한 개인회생 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>
        복지 · 생계비계좌 · 압류금지
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        생계비계좌 신청·개설 은행 방법<br />
        2026년 2월 시행, 은행별 바로가기 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        통장이 압류돼서 월급이 들어와도 못 쓰고 있나요?
        2026년 2월 1일부터 생계비계좌를 만들면 월 250만원까지 압류 없이 쓸 수 있어요.
        <a href="/w/생계비계좌-개설방법-압류금지" style={{ color: "#1D9E75", textDecoration: "underline" }}>
          압류금지 한도와 보호 범위
        </a>를 먼저 확인하고, 개설 가능한 은행과 신청 방법을 바로 알려드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>생계비계좌 핵심 규칙 3가지</H2>
      <p style={body}>
        개설 전에 이 3가지를 반드시 알아두세요.
        1인 1계좌라서 어느 은행에서 만들지 신중하게 선택해야 해요.
        기존 압류 계좌는 그대로 유지되니 새 계좌로 급여 입금을 바꾸는 게 핵심이에요.
      </p>

      <GreenBox>
        ① 2026년 2월 1일부터 개설 가능 (그 전에는 불가)<br />
        ② 1인 1계좌 한정, 중복 개설 불가<br />
        ③ 월 250만원까지 입금분만 압류 금지 (초과분은 보호 안 됨)
      </GreenBox>

      <Divider />

      <H2>은행별 생계비계좌 신청처</H2>
      <p style={body}>
        시중은행, 인터넷은행, 저축은행, 상호금융, 우체국 어디서나 개설 가능해요.
        신분증만 있으면 되고, 인터넷은행은 앱에서 바로 비대면 개설해요.
        지역별로 접근 편한 은행을 선택하세요.
      </p>

      <SectionBadge>5대 시중은행</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>은행</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>홈페이지</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>모바일 앱</th>
            </tr>
          </thead>
          <tbody>
            {MAJOR_BANKS.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{row.name}</td>
                <td style={{ padding: "9px 12px", fontSize: 13, color: "#1D9E75" }}>{row.web}</td>
                <td style={{ padding: "9px 12px", fontSize: 13, color: "#6b7280" }}>{row.app}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionBadge>인터넷전문은행 (비대면 개설)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>은행</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>홈페이지</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>모바일 앱</th>
            </tr>
          </thead>
          <tbody>
            {INTERNET_BANKS.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{row.name}</td>
                <td style={{ padding: "9px 12px", fontSize: 13, color: "#1D9E75" }}>{row.web}</td>
                <td style={{ padding: "9px 12px", fontSize: 13, color: "#6b7280" }}>{row.app}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        지방은행·신협·새마을금고·우체국에서도 개설 가능해요.<br />
        농어촌 지역이나 시중은행이 멀다면 우체국이 접근성이 좋아요.<br />
        저축은행은 예금 금리가 시중은행보다 높아요.
      </BorderBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>생계비계좌 개설 후 할 일 4단계</H2>
      <p style={body}>
        계좌만 만들고 끝나는 게 아니에요.
        급여 입금계좌를 바꾸지 않으면 기존 압류 계좌로 계속 입금돼요.
        자동이체도 함께 변경해야 연체 없이 생활비를 쓸 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        생계비계좌 신청과 이용에 대해 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 법무부 발표와 민사집행법 시행령을 바탕으로 작성됐어요. 세부 규정은 시행 후 변경될 수 있으니 법무부(www.moj.go.kr) 또는 금융위원회에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
