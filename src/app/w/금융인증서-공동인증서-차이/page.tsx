"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 은행 앱이나 홈택스에서 인증서 선택하라고 나오는데 금융인증서와 공동인증서 중 뭘 써야 할지 모르는 상황
// Q2. 두 인증서 차이를 이해하고 내 상황에 맞는 인증서를 선택해서 발급하는 방법 파악
// Q3. 저장 방식 차이(로컬 vs 클라우드), 유효기간(1년 vs 3년 자동갱신), 사용처 차이(공공기관 가능 vs 은행만), 발급 방법
// Q4. 비교표로 차이 한 눈에 파악
// MAP-INTRO: 은행 앱 켤 때마다 인증서 선택하라고 나오는데 뭘 써야 할지 모르겠죠
// MAP-TYPE: 비교표
// MAP-H2: 두 인증서 비교표 > 금융인증서 발급 > 공동인증서 발급 > 상황별 선택 기준 > FAQ
// MAP-COMP: table > Steps > GreenBox > Checklist > FAQ

"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const COMPARISON = [
  { category: "저장 방식", financial: "금융결제원 클라우드 서버", common: "PC·휴대폰·USB에 직접 저장" },
  { category: "유효기간", financial: "3년 (자동 갱신)", common: "1년 (직접 갱신 필요)" },
  { category: "사용처", financial: "은행권만 가능", common: "은행 + 공공기관·정부 사이트" },
  { category: "기기 이동", financial: "로그인만 하면 어디서든 사용", common: "인증서 복사·내보내기 필요" },
  { category: "보안", financial: "분실·도용 위험 낮음", common: "저장 기기 분실 시 도용 위험" },
  { category: "발급처", financial: "은행 앱·홈페이지", common: "은행 영업점·인터넷뱅킹·앱" },
];

const FINANCIAL_STEPS = [
  {
    title: "은행 앱 또는 홈페이지 인증센터 접속",
    desc: "KB스타뱅킹, 신한 쏠, 우리WON뱅킹 등 본인 거래 은행 앱이나 홈페이지 인증센터에서 '금융인증서 발급/재발급'을 선택해요. 공동인증서 없이 본인 명의 휴대폰만으로 발급 가능해요.",
    tip: "5분이면 발급 완료돼요",
  },
  {
    title: "본인 확인 후 비밀번호 설정",
    desc: "휴대폰 본인인증으로 신원을 확인해요. 발급 완료 후 6자리 비밀번호를 설정해요. 나중에 인증할 때마다 이 번호를 쓰니까 잊어버리지 마세요. 지문이나 얼굴인식도 함께 등록해두면 더 편해요.",
    tip: "금융인증서는 클라우드에 저장되므로 별도 복사 불필요",
  },
];

const COMMON_STEPS = [
  {
    title: "은행 인터넷뱅킹·앱에서 발급",
    desc: "인터넷뱅킹 또는 모바일 앱에서 '공동인증서(구 공인인증서) 발급'을 선택해요. 본인 명의 계좌와 신분증이 필요해요. 처음 발급 시 영업점 방문이 필요한 경우도 있어요.",
    tip: "신분증 지참 영업점 방문이 가장 확실해요",
  },
  {
    title: "사용할 기기에 복사",
    desc: "발급 후 PC에서 쓰려면 PC로 복사하고, 휴대폰에서 쓰려면 휴대폰으로 복사해야 해요. '인증서 내보내기' 기능으로 다른 기기로 이동할 수 있어요. 이 복사 과정이 금융인증서보다 번거롭고 도용 위험이 있어요.",
    tip: "1년마다 갱신 알림을 받으면 바로 처리하세요",
  },
];

const CHECKLIST = [
  "은행 거래만 한다면 금융인증서로 충분해요 (3년 자동갱신)",
  "홈택스·정부24·법원 등 공공기관은 공동인증서 필수",
  "둘 다 만들어두면 가장 편해요 (은행용 + 공공기관용)",
  "공동인증서 유효기간(1년) 만료 전 갱신 알림 체크",
  "금융인증서 6자리 비밀번호는 반드시 기억해두세요",
  "공동인증서 저장 기기 분실 시 즉시 폐기·재발급",
];

const FAQS = [
  {
    q: "금융인증서와 공동인증서 중 뭘 써야 하나요?",
    a: "은행 거래만 한다면 금융인증서가 편해요. 자동갱신되고 어디서든 쓸 수 있어요. 홈택스 연말정산, 정부24 민원, 법원 전자소송 등은 공동인증서가 필요해요. 제일 좋은 건 둘 다 만들어두는 거예요.",
  },
  {
    q: "공인인증서는 없어진 건가요?",
    a: "이름만 '공동인증서'로 바뀌었어요. 2020년 12월에 명칭이 변경됐고 기능은 동일해요. 기존에 쓰던 공인인증서 그대로 사용 가능하고, 만료되면 공동인증서로 새로 발급받으면 돼요.",
  },
  {
    q: "금융인증서 발급은 어떻게 하나요?",
    a: "은행 앱이나 홈페이지 인증센터에서 '금융인증서 발급'을 선택하고 본인확인 후 비밀번호를 설정하면 바로 발급돼요. 5분이면 끝나요. 신분증이나 공동인증서 없어도 본인 명의 휴대폰만 있으면 돼요.",
  },
  {
    q: "금융인증서는 다른 은행에서도 쓸 수 있나요?",
    a: "발급받은 은행에서만 쓸 수 있는 게 기본이에요. 다만 금융결제원 금융인증서를 이용하면 여러 은행에서 공용으로 쓸 수 있어요. 은행별로 정책이 다르니 사용하려는 은행에서 확인하세요.",
  },
  {
    q: "공동인증서 갱신은 어떻게 하나요?",
    a: "만료 30일 전부터 갱신 가능해요. 인터넷뱅킹이나 앱에서 인증서 관리 메뉴로 들어가서 갱신하면 돼요. 만료됐다면 처음 발급과 같은 방법으로 재발급받아야 해요.",
  },
  {
    q: "금융인증서를 분실하면 어떻게 되나요?",
    a: "클라우드에 저장돼 있어서 기기를 분실해도 인증서 자체는 안전해요. 다른 기기에서 로그인하면 바로 쓸 수 있어요. 비밀번호가 노출됐다고 의심되면 은행에서 즉시 재발급하세요.",
  },
];

const REFERENCES = [
  {
    category: "공식 기관",
    items: [
      { label: "금융결제원: 금융인증서 안내", url: "https://www.yessign.or.kr" },
      { label: "KB국민은행 인증센터", url: "https://obank.kbstar.com" },
    ],
  },
];

const RELATED = [
  { slug: "OTP발급-방법", title: "OTP 발급 방법", description: "인증서와 함께 필요한 OTP 발급 방법이에요." },
  { slug: "보안카드-대체수단-OTP", title: "보안카드 대체 수단", description: "보안카드 대신 OTP나 인증서로 전환하는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>
        금융 · 인증서 · 발급 방법
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        금융인증서 공동인증서 차이<br />
        어떤 걸 써야 하는지, 발급 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        은행 앱 켤 때마다 인증서 선택하라고 나오는데 뭘 써야 할지 모르겠죠.
        두 인증서는 저장 방식, 유효기간, 사용처가 달라요.
        은행 거래만 하면 금융인증서, 홈택스나 정부24까지 쓰려면 공동인증서도 필요해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>금융인증서 vs 공동인증서 비교</H2>
      <p style={body}>
        가장 큰 차이는 저장 방식과 사용처예요.
        금융인증서는 클라우드에 저장돼서 기기 걱정이 없고, 공동인증서는 직접 저장해서 공공기관까지 쓸 수 있어요.
        제일 좋은 건 둘 다 만들어두는 거예요.
      </p>

      <SectionBadge>두 인증서 비교표</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 600, color: "#1D9E75" }}>금융인증서</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>공동인증서</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600, color: "#374151" }}>{row.category}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 500 }}>{row.financial}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{row.common}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        금융인증서: 은행 전용, 클라우드 저장, 3년 자동갱신 — 편리하지만 공공기관 사용 불가<br />
        공동인증서: 은행+공공기관 모두 가능, 기기 저장, 1년마다 갱신 필요
      </BorderBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>금융인증서 발급 방법</H2>
      <p style={body}>
        은행 앱에서 5분이면 발급돼요. 신분증도 공동인증서도 필요 없어요.
        본인 명의 휴대폰만 있으면 되고, 발급 후 바로 사용 가능해요.
      </p>

      <Steps steps={FINANCIAL_STEPS} />

      <Divider />

      <H2>공동인증서 발급 방법</H2>
      <p style={body}>
        금융인증서보다 발급 절차가 조금 더 복잡해요.
        발급 후 기기에 복사하는 과정이 필요하고, 1년마다 갱신해야 해요.
        홈택스나 정부24 등 공공기관 이용이 필요한 분들은 필수로 만들어두세요.
      </p>

      <Steps steps={COMMON_STEPS} />

      <GreenBox>
        은행 거래만 → 금융인증서 1개로 충분<br />
        홈택스·정부24·법원 → 공동인증서 필수<br />
        둘 다 필요한 분 → 금융인증서(은행용) + 공동인증서(공공기관용) 각각 발급
      </GreenBox>

      <Divider />

      <H2>인증서 관리 체크리스트</H2>
      <p style={body}>
        인증서를 만든 후에도 관리가 필요해요.
        특히 공동인증서는 1년 유효기간을 놓치면 재발급이 번거로워요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        금융인증서와 공동인증서에 대해 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. 인증서 발급 방법은 은행별로 다를 수 있으니 이용 중인 은행 앱 또는 홈페이지에서 확인하세요." />
    </ArticleLayout>
  );
}
