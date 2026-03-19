"use client";

// Q1. 신용카드 없이 K-패스 혜택 받고 싶거나 연회비·실적 조건 없는 카드 찾는 사람
// Q2. 연회비 0원·실적 없는 체크카드 중 내 주거래 은행·앱 편의에 맞는 카드 1개 골라 신청
// Q3. 모든 체크카드 연회비 0원·실적 없음·환급률 동일, 차이는 앱 편의·ATM 수수료·추가 적립
// Q4. GreenBox(체크카드 공통 조건 표) + BorderBox(은행별 특징 4종) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Sidebar,
} from "@/components/article-ui";
import { K패스_SIDEBAR } from "@/data/K-패스-guide";

const FAQS = [
  {
    q: "K-패스 체크카드는 어느 은행이든 발급받을 수 있나요?",
    a: "해당 은행 계좌가 있어야 해요. 카카오뱅크·토스뱅크·케이뱅크는 앱에서 계좌 개설부터 카드 발급까지 10분 내로 가능해요. 신한·농협·KB는 기존 계좌 있으면 바로 신청 가능해요.",
  },
  {
    q: "체크카드는 연말정산에서 신용카드보다 공제율이 높지 않나요?",
    a: "맞아요. 체크카드 소득공제율은 30%, 신용카드는 15%예요. K-패스로 환급도 받고 연말정산 체크카드 공제도 동시에 챙길 수 있어요. 신용카드 실적 채우기 어려운 분에게는 체크카드가 이중으로 유리해요.",
  },
  {
    q: "환급금이 언제 들어오나요?",
    a: "월 15회 이상 대중교통을 이용한 다음 달 10일 전후로 환급돼요. 체크카드는 대부분 청구 할인 또는 계좌 입금 방식이에요. 카드사 앱에서 환급 예정액을 미리 확인할 수 있어요.",
  },
  {
    q: "15회는 교통수단 종류 상관없나요?",
    a: "버스·지하철·광역급행버스(GTX)·전철 모두 포함돼요. 단, 택시는 해당 안 돼요. 수도권 외 지방 대중교통도 K-패스 단말기가 설치된 곳이면 적용돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "K-패스 공식 사이트", url: "https://www.korea-pass.kr" },
      { label: "국토교통부: K-패스 제도 안내", url: "https://www.molit.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "K-패스-카드-비교", title: "K-패스 카드 전체 비교", description: "신용·체크·선불 전 카드 필터·정렬 비교 표예요." },
  { slug: "K-패스-신용카드-추천", title: "K-패스 신용카드 추천", description: "추가 할인까지 원하면 신용카드 비교예요." },
  { slug: "K-패스-가입방법", title: "K-패스 가입방법", description: "카드 발급 후 회원 등록 절차 안내예요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="K-패스 가이드" items={K패스_SIDEBAR} currentSlug="K-패스-체크카드-추천" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        교통 · K-패스 · 체크카드
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        K-패스 체크카드 추천<br />
        실적·연회비 없는 카드 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        K-패스 체크카드는 전월실적 조건도, 연회비도 없어요.
        카드를 발급받고 k-pass.or.kr에 가입만 하면 월 15회 이상 탈 때마다 교통비가 환급돼요.
        카카오뱅크·토스뱅크·케이뱅크처럼 앱 발급이 편한 곳도 많아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>K-패스 체크카드 공통 조건</H2>
      <p style={body}>
        어떤 은행 체크카드를 써도 아래 조건은 동일해요.
        다른 건 앱 편의성과 ATM 수수료, 작은 추가 혜택 차이예요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>항목</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>내용</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "연회비", val: "없음 (전 은행 공통)" },
              { item: "전월실적 조건", val: "없음 (전 은행 공통)" },
              { item: "K-패스 환급률", val: "일반 20% / 청년 30% / 저소득 53%" },
              { item: "월 환급 조건", val: "월 15회 이상 대중교통 이용" },
              { item: "연말정산 공제율", val: "30% (신용카드 15%보다 높음)" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{r.item}</td>
                <td style={{ padding: "5px 8px", color: i < 2 ? GREEN : "#333", fontWeight: i < 2 ? 700 : 400 }}>{r.val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <H2>은행별 체크카드 특징</H2>
      <p style={body}>
        환급률은 같지만 어떤 앱을 쓰느냐, 어떤 은행 계좌가 있느냐에 따라 편의가 달라져요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN, fontSize: 14 }}>카카오뱅크 K-패스 체크 — 카카오 계정 있으면 가장 빠름</strong><br />
        계좌 개설 + 카드 발급 전부 카카오뱅크 앱에서 5분 내 완료<br />
        카카오페이 연동으로 온·오프라인 간편 결제 가능<br />
        K-패스 환급액 알림이 카카오톡으로 자동 발송<br />
        <a href="https://www.kakaobank.com/products/checkCard" style={{ color: GREEN, fontWeight: 700, fontSize: 12 }}>카카오뱅크 신청 →</a>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN, fontSize: 14 }}>토스뱅크 K-패스 체크 — 토스 앱 환급 현황 실시간 확인</strong><br />
        토스앱에서 K-패스 이용 현황·환급 예정액 실시간 대시보드 제공<br />
        계좌 개설부터 발급까지 앱에서 비대면 완료<br />
        해외 결제 불가 (대신 해외 수수료 걱정 없음)<br />
        <a href="https://www.tossbank.com/cards" style={{ color: GREEN, fontWeight: 700, fontSize: 12 }}>토스뱅크 신청 →</a>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN, fontSize: 14 }}>신한카드 K-패스 체크 — 기존 신한 계좌 연동</strong><br />
        신한은행 계좌 있으면 신한SOL에서 바로 발급 신청 가능<br />
        신한SOL 앱에서 환급 현황 + 잔액 통합 관리<br />
        편의점 일부 할인 혜택 소폭 제공<br />
        <a href="https://www.shinhancard.com/pconts/html/card/apply/transportation/1229619_2216.html" style={{ color: GREEN, fontWeight: 700, fontSize: 12 }}>신한카드 신청 →</a>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN, fontSize: 14 }}>NH농협 K-패스 체크 — 농협ATM 전국 거래자</strong><br />
        농협ATM 수수료 면제 혜택 — 전국 농협 ATM이 많아 편리함<br />
        농협몰 이용자에게 소폭 할인 추가<br />
        농촌·지방 거주자에게 적합<br />
        <a href="https://card.nonghyup.com/ccard/cardApply.do" style={{ color: GREEN, fontWeight: 700, fontSize: 12 }}>농협카드 신청 →</a>
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. 카드 발급 조건은 은행 정책에 따라 변경될 수 있으니 신청 전 해당 카드사 공식 사이트에서 확인하세요." />
    </ArticleLayout>
  );
}
