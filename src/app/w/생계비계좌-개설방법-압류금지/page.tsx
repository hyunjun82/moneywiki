"use client";

// Q1. 통장이 압류당해서 월급이 들어와도 못 쓰고, 생계비계좌로 해결할 수 있는지 찾는 상황
// Q2. 가까운 은행에 가서 생계비계좌 개설 → 급여 입금 계좌 변경
// Q3. 250만원 한도/1인 1계좌/2026년 2월 1일 시행/신분증만 필요/회생파산 중에도 가능/기존 압류는 소급 불가
// Q4. GreenBox(개설 가능 금융기관 표) + BorderBox(압류금지 한도 상세) + Steps(개설 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "생계비계좌 250만원 넘게 입금하면 어떻게 되나요?",
    a: "월 누적 입금 한도가 250만원이에요. 250만원을 초과하는 금액은 입금이 제한되거나 압류 대상이 될 수 있어요.",
  },
  {
    q: "회생이나 파산 중에도 생계비계좌 만들 수 있나요?",
    a: "네, 가능해요. 가입 조건이 따로 없어서 회생·파산 절차 중이어도 생계비계좌를 개설할 수 있어요.",
  },
  {
    q: "기존에 압류된 계좌도 풀리나요?",
    a: "2026년 2월 1일 이전에 이미 압류된 계좌는 기존 압류가 유지돼요. 새 제도는 2월 1일 이후 신규 접수 압류부터 적용돼요. 기존 압류 계좌는 그대로 두고 생계비계좌를 새로 열어서 급여 입금 계좌를 변경하세요.",
  },
  {
    q: "생계비계좌가 있으면 다른 계좌 돈도 보호되나요?",
    a: "생계비계좌 예금과 현금을 합산해서 250만원을 넘지 않으면 일반 계좌 예금도 해당 금액까지 보호받아요. 하지만 합산 250만원을 초과하는 금액은 압류 대상이에요.",
  },
  {
    q: "온라인으로 개설할 수 있나요?",
    a: "온라인 개설 가능 여부는 각 금융기관마다 달라요. 처음에는 거래 은행에 방문해서 개설하는 게 확실해요. 이후 앱에서 급여 입금 계좌 변경까지 처리할 수 있어요.",
  },
  {
    q: "생계비계좌로 체크카드 연결할 수 있나요?",
    a: "네, 일반 통장처럼 체크카드를 연결할 수 있어요. 공과금 자동이체도 정상적으로 걸 수 있어요. 월 250만원 한도 안에서 자유롭게 사용해요.",
  },
];

const OPEN_STEPS = [
  { title: "거래 은행 방문", desc: "시중은행, 저축은행, 농협, 우체국 중 편한 곳을 방문해요. 신분증만 챙기면 돼요. 온라인 개설이 가능한지는 각 은행 앱에서 미리 살펴봐요." },
  { title: "생계비계좌 개설 신청", desc: "창구에서 '생계비계좌 개설'을 요청하면 돼요. 1인 1계좌만 가능하고, 중복 개설은 안 돼요." },
  { title: "급여 입금 계좌 변경", desc: "회사 인사팀에 계좌변경 신청서를 제출해서 급여 입금 계좌를 생계비계좌로 바꿔요." },
  { title: "자동이체 계좌 변경", desc: "공과금, 통신비, 관리비 등 자동이체 계좌도 생계비계좌로 변경해두면 압류로 인한 연체 걱정이 없어요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "민사집행법 - 법제처", url: "https://www.law.go.kr/법령/민사집행법" },
      { label: "대한민국 정책브리핑 - 생계비계좌 시행", url: "https://www.korea.kr/news/policyNewsView.do?newsId=148958319" },
      { label: "법무부 공식 안내", url: "https://www.moj.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "압류방지통장-개설방법", title: "압류방지통장 개설방법", description: "기존 압류방지통장과 차이점이에요." },
  { slug: "개인회생-신청자격-조건", title: "개인회생 신청자격 조건", description: "채무 조정이 필요한 경우 살펴봐요." },
  { slug: "신용회복위원회-채무조정", title: "신용회복위원회 채무조정", description: "채무조정 신청 방법과 조건이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 압류금지 · 생계비계좌</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        생계비계좌 개설방법과 압류금지<br />
        월 250만원 한도, 2026년 2월 시행
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        통장이 압류당하면 월급이 들어와도 못 써요.
        2026년 2월부터 생계비계좌가 생겼어요.
        신분증 하나만 들고 은행에 가면 월 250만원까지 압류 없이 쓸 수 있는 계좌를 만들 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>생계비계좌란 뭔가요?</H2>
      <p style={body}>
        생계비계좌는 예금 중 월 250만원까지 압류 없이 자유롭게 쓸 수 있도록 보호해주는 계좌예요.
        <a href="https://www.law.go.kr/법령/민사집행법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>민사집행법</a> 시행령 개정으로
        2026년 2월 1일부터 시행됐어요.
      </p>
      <p style={body}>
        기존에는 급여가 입금된 통장도 채권자가 압류할 수 있었어요.
        생계비를 찾으려면 법원에 압류금지채권범위변경 신청을 반복해야 했죠.
        생계비계좌가 있으면 이런 절차 없이 자동으로 보호받아요.
      </p>
      <p style={body}>
        월간 누적 입금 한도도 250만원이에요.
        한 달 동안 250만원을 초과해서 입금할 수 없어요.
        반복 입출금으로 보호 금액이 과도해지는 걸 막기 위해서예요.
      </p>

      <BorderBox>
        <strong>생계비계좌 핵심 정보</strong><br />
        시행일: 2026년 2월 1일 (이후 접수 압류부터 적용)<br />
        압류금지 한도: 월 250만원 (기존 185만원 → 250만원 상향)<br />
        개설 조건: 없음 (회생·파산 중이어도 가능)<br />
        1인 1계좌만 가능 (중복 개설 금지)<br />
        <br />
        ★ 기존 압류된 계좌는 소급 적용 없음 → 새 계좌 개설 후 급여 입금 계좌 변경 필요
      </BorderBox>

      <H2>어디서 개설할 수 있나요?</H2>
      <p style={body}>
        거의 모든 금융기관에서 개설할 수 있어요.
        시중은행, 저축은행, 농협, 우체국까지 선택지가 넓어요.
      </p>

      <GreenBox>
        <strong style={{ display: "block", marginBottom: 8 }}>생계비계좌 개설 가능 금융기관</strong>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>유형</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>예시</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: "시중은행", example: "국민, 신한, 우리, 하나, SC제일" },
              { type: "지방은행", example: "부산, 대구, 광주, 경남, 전북" },
              { type: "인터넷전문은행", example: "카카오뱅크, 토스뱅크, 케이뱅크" },
              { type: "저축은행", example: "SBI저축은행, OK저축은행 등" },
              { type: "상호금융", example: "농협, 수협, 신협, 새마을금고" },
              { type: "우체국", example: "우체국 예금" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.type}</td>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{row.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 1인 1계좌만 가능 / 온라인 개설 가능 여부는 각 금융기관에 확인
        </p>
      </GreenBox>

      <H2>개설 절차 4단계</H2>
      <p style={body}>
        신분증 하나만 있으면 돼요. 거래 은행 창구에서 신청하면 빠르게 개설할 수 있어요.
      </p>

      <Steps steps={OPEN_STEPS} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <H2>함께 바뀐 압류금지 제도</H2>
      <p style={body}>
        생계비계좌 도입과 함께 급여채권 압류금지 한도와 보험금 보호 한도도 올랐어요.
      </p>
      <p style={body}>
        급여채권은 기본적으로 2분의 1까지 압류가 금지돼요.
        저소득 근로자를 위한 압류금지 최저금액도 월 185만원에서 250만원으로 상향됐어요.
        월급이 300만원이면 절반인 150만원보다 많은 250만원까지 보호받는 거예요.
      </p>
      <p style={body}>
        보장성 보험금 압류금지 한도도 높아졌어요.
        사망보험금은 1,000만원에서 1,500만원으로, 만기 및 해약환급금은 150만원에서 250만원으로 올랐어요.
        <a href="/w/개인회생-신청자격-조건" style={{ color: "#1D9E75" }}>개인회생</a>이나
        <a href="/w/신용회복위원회-채무조정" style={{ color: "#1D9E75" }}>채무조정</a> 중인 분들에게 중요한 변화예요.
      </p>

      <GreenBox>
        <strong>2026년 2월 개정 압류금지 한도 비교</strong><br />
        <br />
        <strong>급여채권 압류금지 최저금액</strong><br />
        기존: 월 185만원 → 변경: 월 250만원<br />
        <br />
        <strong>보장성 보험금</strong><br />
        사망보험금: 1,000만원 → 1,500만원<br />
        만기·해약환급금: 150만원 → 250만원<br />
        <br />
        ★ 2026년 2월 1일 이후 접수 압류명령부터 새 기준 적용
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 2월 민사집행법 시행령 기준으로 작성됐어요. 각 금융기관의 생계비계좌 개설 방식과 온라인 신청 여부는 변경될 수 있으니 거래 은행에 살펴봐요." />
    </ArticleLayout>
  );
}
