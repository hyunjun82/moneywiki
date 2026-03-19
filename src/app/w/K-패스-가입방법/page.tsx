"use client";

// Q1. K-패스 카드를 발급받았는데 환급이 안 들어오거나, 처음부터 어디서 뭘 해야 하는지 모르는 상황
// Q2. k-pass.or.kr 회원 가입 완료 → 발급 카드 등록 → 월 15회 이상 이용 → 다음 달 환급 확인
// Q2-1. k-pass.or.kr 회원가입 페이지
// Q3. 카드 발급만으로 환급 안 됨(회원 가입 별도 필수) / 가입 당월 1일~말일 15회 이용 시 다음 달 환급 / 알뜰교통카드 자동 전환 안 됨 / 가입 전 사용분 소급 불가
// Q4. GreenBox 핵심 요약 + Steps 4단계 + BorderBox 실수 방지 + 카드사별 가입 경로 표 + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Steps, Sidebar,
} from "@/components/article-ui";
import { K패스_SIDEBAR } from "@/data/K-패스-guide";

const FAQS = [
  { q: "카드 발급만 했는데 환급이 안 왔어요. 왜 그런가요?", a: "K-패스 회원 가입을 별도로 해야 해요. 카드는 교통카드로 쓸 수 있지만, 환급은 k-pass.or.kr 또는 카드사 앱에서 K-패스 회원으로 등록해야 시작돼요. 가입 안 하면 아무리 오래 써도 환급이 0원이에요. 가입 후 해당 월 15회 이상 이용분부터 다음 달에 정산돼요." },
  { q: "가입은 어디서 하나요? PC? 앱?", a: "둘 다 가능해요. k-pass.or.kr 공식 사이트에서 PC로 해도 되고, 카드사 앱에서 해도 돼요. 카카오뱅크·토스뱅크는 해당 앱 안에서 K-패스 회원 등록까지 한 번에 끝나요. 시중은행 카드라면 k-pass.or.kr 웹사이트가 가장 확실해요." },
  { q: "기존 알뜰교통카드 이용자도 새로 가입해야 하나요?", a: "맞아요. 알뜰교통카드는 2024년 4월에 서비스가 종료됐어요. K-패스로 자동 전환되지 않아요. K-패스 카드를 새로 발급받고 k-pass.or.kr에서 다시 회원 가입을 해야 환급이 시작돼요. 기존 알뜰카드는 교통카드 기능만 남아요." },
  { q: "가입한 달에도 환급받을 수 있나요?", a: "가입한 달에 15회 이상 이용하면 환급 대상이에요. 다만 가입일 이후 이용분만 집계돼요. 가입 전에 이미 탄 교통비는 소급 적용이 안 돼요. 그래서 월 초에 가입할수록 유리하고, 월말에 가입하면 그 달은 15회 채우기 어려울 수 있어요." },
  { q: "카드를 나중에 다른 카드로 바꿀 수 있나요?", a: "k-pass.or.kr에서 언제든 변경 등록할 수 있어요. 변경 이후 이용분부터 새 카드에 환급이 적용돼요. 1인 1카드 등록이라 두 카드를 동시에 환급받을 수는 없어요. 변경 전 카드의 미지급 환급금은 기존 카드로 정산돼요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "K-패스 회원 가입", url: "https://www.korea-pass.kr" },
    { label: "국토교통부 K-패스 안내", url: "https://www.molit.go.kr" },
  ]},
];

const RELATED = [
  { slug: "K-패스-카드-비교", title: "K-패스 카드 전체 비교", description: "어떤 카드를 발급받아야 할지 비교해요." },
  { slug: "K-패스-체크카드-추천", title: "K-패스 체크카드 추천", description: "실적·연회비 없는 체크카드 추천이에요." },
  { slug: "K-패스-환급-계산", title: "K-패스 환급액 계산", description: "내 교통비로 얼마 돌아오는지 시뮬레이션해요." },
];

const STEPS = [
  {
    title: "K-패스 카드 발급",
    desc: "원하는 은행·카드사에서 K-패스 신용·체크·선불 카드를 발급해요. 인터넷은행(카카오·토스·케이뱅크)은 앱에서 5분이면 끝나고, 시중은행은 영업점 또는 인터넷뱅킹으로 신청 가능해요. 어떤 카드가 좋을지 모르겠으면 카드 비교 페이지에서 먼저 골라보세요.",
  },
  {
    title: "k-pass.or.kr 회원 가입 (필수!)",
    desc: "카드 수령 후 k-pass.or.kr에 접속해서 회원 가입해요. 본인 인증(공동인증서·간편인증) → 발급받은 카드 번호 등록 순서예요. 카카오뱅크·토스뱅크 이용자는 해당 앱에서 바로 등록 가능해요. 이 단계를 빠뜨리면 환급이 안 되니까 카드 받자마자 바로 해야 해요.",
  },
  {
    title: "월 15회 이상 대중교통 이용",
    desc: "버스·지하철·GTX를 월 15회 이상 이용해야 환급 대상이에요. 14회 이하면 그 달은 환급 0원이에요. 출퇴근 주 4일 × 왕복 = 주 8회, 월 32회 정도 되니까 직장인이면 충분해요. 택시·시외버스·KTX는 합산에서 빠지니까 주의하고요.",
  },
  {
    title: "다음 달 환급 확인",
    desc: "이용한 다음 달 7영업일 이내(보통 10일 전후)로 환급금이 정산돼요. 신용카드는 청구서에서 자동 차감, 체크카드는 계좌 입금 또는 캐시백, 선불카드는 잔액 충전 방식이에요. 카드사 앱이나 k-pass.or.kr 마이페이지에서 예정 금액을 미리 볼 수 있어요.",
  },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="K-패스 가이드" items={K패스_SIDEBAR} currentSlug="K-패스-가입방법" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        교통 · K-패스 · 가입 안내
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        K-패스 가입방법<br />
        카드 발급 후 환급까지 전 과정 4단계
      </h1>

      {/* ── [기] 도입 — Q1 공감 ──────────────────────────── */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;K-패스 카드 만들었는데 환급이 왜 안 들어오지?&quot; — 이런 분이 생각보다 정말 많아요.
        카드를 발급받아서 교통카드로 잘 쓰고 있는데, 한 달이 지나도 환급금이 0원인 거예요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이유는 간단해요. <strong>카드 발급과 K-패스 회원 가입은 별개</strong>예요.
        카드사에서 카드를 만드는 건 교통카드 기능만 활성화하는 거고,
        <a href="https://www.korea-pass.kr" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}> k-pass.or.kr</a>에서 회원 가입을 따로 해야 비로소 환급이 시작돼요.
        이 한 단계를 빠뜨려서 몇 달 치 환급을 놓치는 분이 수두룩하죠.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아래에서 카드 발급부터 첫 환급 확인까지 전 과정을 4단계로 정리했어요.
        순서대로 따라가면 빠뜨릴 일이 없어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── [승] 핵심 요약 ───────────────────────────────── */}
      <H2>핵심: 카드 발급 ≠ 환급 시작</H2>
      <p style={body}>
        가장 중요한 건 이 한 줄이에요. 카드를 만들었다고 자동으로 환급이 되지 않아요.
      </p>

      <GreenBox>
        <div style={{ fontSize: 14, lineHeight: 2 }}>
          <strong>1단계</strong> K-패스 카드 발급 (은행·카드사)<br />
          <strong>2단계</strong> <span style={{ color: GREEN, fontWeight: 700 }}>k-pass.or.kr 회원 가입 + 카드 등록 (필수!)</span><br />
          <strong>3단계</strong> 월 15회 이상 대중교통 이용<br />
          <strong>4단계</strong> 다음 달 환급 확인
        </div>
        <p style={{ fontSize: 13, color: "#555", marginTop: 12, marginBottom: 0, lineHeight: 1.7 }}>
          2단계를 빠뜨리면 아무리 타도 환급 0원이에요.
          카카오뱅크·토스뱅크는 해당 앱 안에서 1~2번이 한 번에 끝나요.
        </p>
      </GreenBox>

      <Divider />

      {/* ── [전] 단계별 상세 ─────────────────────────────── */}
      <H2>4단계 상세 절차</H2>
      <p style={body}>
        각 단계에서 뭘 하면 되는지, 어디서 하면 되는지 순서대로 정리했어요.
        특히 2단계(회원 가입)가 핵심이에요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        1~2단계까지 끝내는 데 빠르면 10분이면 돼요. 인터넷은행이면 카드 발급과 회원 가입이 동시에 되니까 더 빨라요.
        3단계는 평소 대중교통을 쓰는 분이라면 특별히 신경 쓸 게 없고, 4단계에서 환급금이 잘 들어왔는지만 확인하면 끝이에요.
      </p>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── [전] 자주 하는 실수 ──────────────────────────── */}
      <H2>가입 후에도 환급 못 받는 3가지 실수</H2>
      <p style={body}>
        가입까지 잘 했는데도 환급이 0원인 경우가 있어요. 대부분 아래 3가지 중 하나에 해당해요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>실수 1: 월 15회 미만 이용</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          14회 이하면 그 달은 환급 대상이 아니에요. 주 4일 × 왕복이면 주 8회, 월 32회니까 직장인이면 문제없지만,
          재택근무가 많거나 자가용과 병행하는 분은 놓치기 쉬워요.
          k-pass.or.kr 마이페이지에서 이용 횟수를 확인할 수 있으니까, 월말에 14회라면 한 번 더 타면 돼요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>실수 2: 알뜰교통카드를 그대로 사용</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          알뜰교통카드는 2024년 4월에 서비스가 종료됐어요. K-패스로 자동 전환되지 않아요.
          기존 알뜰카드로 교통을 이용하면 교통카드 기능은 작동하지만 환급은 0원이에요.
          K-패스 카드를 새로 발급받고 회원 가입을 다시 해야 해요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>실수 3: 가입 전 이용분이 소급된다고 오해</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          가입일 이후 이용분부터 환급 대상이에요. 가입 전에 이미 탄 교통비는 소급 적용이 안 돼요.
          예를 들어 3월 20일에 가입하면, 3월 1~19일에 탄 교통비는 환급에서 빠져요.
          그래서 월 초에 가입하는 게 유리하고, 월말이라면 다음 달 1일을 기다리는 것도 방법이에요.
        </p>
      </BorderBox>

      <Divider />

      {/* ── [전] 카드사별 가입 경로 ──────────────────────── */}
      <H2>카드사별 가입 경로</H2>
      <p style={body}>
        어떤 카드를 발급받았느냐에 따라 K-패스 회원 가입 경로가 조금 달라요.
        인터넷은행은 앱 안에서 바로 끝나고, 시중은행은 k-pass.or.kr 웹사이트를 이용해야 해요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "6px 8px" }}>카드사</th>
              <th style={{ textAlign: "left", padding: "6px 8px" }}>가입 방법</th>
            </tr>
          </thead>
          <tbody>
            {[
              { issuer: "카카오뱅크", method: "카카오뱅크 앱 → K-패스 메뉴에서 카드 발급 + 회원 등록 동시 완료" },
              { issuer: "토스뱅크", method: "토스앱 → 카드 → K-패스 등록. 환급 현황 실시간 확인 가능" },
              { issuer: "케이뱅크", method: "케이뱅크 앱에서 카드 발급 후 k-pass.or.kr에서 회원 가입" },
              { issuer: "신한·농협·KB·하나·우리", method: "k-pass.or.kr 접속 → 회원가입 → 본인인증 → 카드 번호 등록" },
              { issuer: "티머니·이즐 (선불)", method: "해당 앱 또는 k-pass.or.kr에서 선불카드 번호 등록" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "6px 8px", fontWeight: 600, whiteSpace: "nowrap" }}>{r.issuer}</td>
                <td style={{ padding: "6px 8px", fontSize: 12, lineHeight: 1.6 }}>{r.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <Divider />

      {/* ── [결] FAQ ────────────────────────────────────── */}
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성됐어요. 가입 절차는 카드사 앱 업데이트에 따라 달라질 수 있으니 k-pass.or.kr 공지를 봐야 해요." />
    </ArticleLayout>
  );
}
