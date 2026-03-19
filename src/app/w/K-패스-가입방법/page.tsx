"use client";

// Q1. K-패스 카드를 발급받았는데 어디서 뭘 해야 환급이 시작되는지 모르는 상황
// Q2. k-pass.or.kr 회원 가입 → 발급 카드 등록 → 다음 달 환급 확인
// Q3. 카드 발급만으로는 환급 안 됨 / k-pass.or.kr 또는 앱 가입 필수 / 가입 당월 15회부터 환급 시작
// Q4. Steps(전 과정 4단계) + BorderBox(자주 하는 실수) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Steps,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "카드 발급만 했는데 환급이 안 왔어요. 왜 그런가요?",
    a: "K-패스 회원 가입을 별도로 해야 해요. 카드는 교통카드로는 쓸 수 있지만, 환급은 k-pass.or.kr 또는 각 카드사 앱에서 K-패스 회원으로 등록해야 시작돼요. 가입 안 하면 아무리 오래 써도 환급이 0원이에요.",
  },
  {
    q: "가입은 어디서 하나요?",
    a: "k-pass.or.kr 공식 사이트 또는 카드사 앱에서 할 수 있어요. 카카오뱅크·토스뱅크는 해당 앱 안에서 K-패스 회원 등록까지 한 번에 가능해요. PC보다 스마트폰 앱이 더 빠른 경우가 많아요.",
  },
  {
    q: "기존 알뜰교통카드 이용자도 새로 가입해야 하나요?",
    a: "맞아요. 알뜰교통카드는 2024년 4월 서비스 종료됐어요. K-패스로 자동 전환되지 않아요. K-패스 카드를 새로 발급받고 k-pass.or.kr에서 다시 회원 가입을 해야 환급이 시작돼요.",
  },
  {
    q: "가입한 달에도 환급 받나요?",
    a: "가입한 달에 15회 이상 이용하면 환급 대상이에요. 단, 이미 이용한 교통비 중 가입 전 사용분은 소급 적용이 안 돼요. 가입일 이후 이용분부터 집계돼요. 월 초에 가입할수록 유리해요.",
  },
  {
    q: "카드 변경 등록도 가능한가요?",
    a: "k-pass.or.kr에서 언제든지 다른 카드로 변경 등록할 수 있어요. 단, 변경 이후 이용분부터 새 카드에 환급이 적용되고, 1인 1카드 등록이라 두 카드를 동시에 환급 받을 수는 없어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "K-패스 회원 가입 (k-pass.or.kr)", url: "https://k-pass.or.kr" },
      { label: "K-패스 공식 사이트 (korea-pass.kr)", url: "https://www.korea-pass.kr" },
      { label: "국토교통부: K-패스 안내", url: "https://www.molit.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "K-패스-카드-비교", title: "K-패스 카드 전체 비교", description: "어떤 카드를 발급받아야 할지 비교해요." },
  { slug: "K-패스-체크카드-추천", title: "K-패스 체크카드 추천", description: "실적·연회비 없는 체크카드 추천이에요." },
  { slug: "K-패스-환급-계산", title: "K-패스 환급액 계산", description: "내 교통비로 얼마 돌아오는지 확인해요." },
];

const STEPS = [
  {
    title: "K-패스 카드 발급",
    desc: "원하는 은행·카드사에서 K-패스 신용·체크·선불 카드를 발급해요. 카카오뱅크·토스뱅크는 앱에서 바로, 시중은행은 영업점 또는 인터넷뱅킹으로 신청 가능해요.",
  },
  {
    title: "k-pass.or.kr 회원 가입",
    desc: "카드 수령 후 k-pass.or.kr에 접속해 회원 가입해요. 본인인증(공동인증서·간편인증) 후 발급받은 카드 번호를 등록해요. 카카오뱅크·토스뱅크는 해당 앱에서 가입 가능해요.",
  },
  {
    title: "월 15회 이상 이용",
    desc: "버스·지하철 등 대중교통을 월 15회 이상 이용해요. 15회 미만이면 환급 없어요. 교통비 총액의 15~60회 이용분에 환급률이 적용돼요.",
  },
  {
    title: "다음 달 환급 확인",
    desc: "이용 다음 달 10일 전후로 환급금이 들어와요. 신용카드는 청구 할인, 체크카드는 계좌 입금 또는 캐시백으로 지급돼요. 카드사 앱에서 예정 금액을 미리 확인할 수 있어요.",
  },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        교통 · K-패스 · 가입 안내
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        K-패스 가입방법<br />
        카드 발급 후 회원 등록까지 전 과정
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        K-패스는 카드만 만들면 끝이 아니에요.
        k-pass.or.kr에서 회원 가입을 따로 해야 환급이 시작돼요.
        가입 안 한 채로 몇 달을 쓰다가 뒤늦게 아는 경우가 많아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>K-패스 환급 시작까지 전 과정</H2>
      <p style={body}>
        카드 발급부터 첫 환급까지 4단계예요.
        2단계 회원 등록을 빠뜨리면 아무리 타도 환급이 없어요.
      </p>

      <Steps steps={STEPS} />

      <H2>자주 하는 실수 3가지</H2>
      <p style={body}>
        가입 이후에도 이 3가지를 놓치면 환급을 못 받아요.
      </p>

      <BorderBox>
        <strong>실수 1: 카드 발급만 하고 회원 가입 생략</strong><br />
        가장 흔한 경우예요. 카드는 교통카드 기능만 하고 환급이 안 돼요.<br />
        → k-pass.or.kr 또는 카드사 앱에서 회원 가입 필수<br />
        <br />
        <strong>실수 2: 월 15회 미만 이용</strong><br />
        14회 이하면 환급 대상이 아니에요. 주 3~4회 이상 대중교통 이용해야 해요.<br />
        → 주 4회 × 4주 = 16회. 주말 이동도 활용하면 쉽게 채울 수 있어요.<br />
        <br />
        <strong>실수 3: 알뜰교통카드 그대로 사용</strong><br />
        알뜰교통카드는 2024년 4월 종료됐어요. 그대로 쓰면 환급 0원이에요.<br />
        → K-패스 카드 새로 발급 + 가입 필요
      </BorderBox>

      <H2>가입 경로별 안내</H2>
      <p style={body}>
        어떤 카드를 썼느냐에 따라 가입 경로가 조금 달라요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>카드사</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>가입 방법</th>
            </tr>
          </thead>
          <tbody>
            {[
              { issuer: "카카오뱅크", method: "카카오뱅크 앱 → K-패스 메뉴에서 바로 등록" },
              { issuer: "토스뱅크", method: "토스앱 → 카드 → K-패스 등록" },
              { issuer: "신한·농협·KB·하나·우리", method: "k-pass.or.kr 접속 → 회원가입 → 카드 등록" },
              { issuer: "티머니·이즐 (선불)", method: "해당 앱 또는 k-pass.or.kr에서 선불카드 등록" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{r.issuer}</td>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{r.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. 가입 절차는 카드사 앱 업데이트에 따라 달라질 수 있으니 k-pass.or.kr 공지를 확인하세요." />
    </ArticleLayout>
  );
}
