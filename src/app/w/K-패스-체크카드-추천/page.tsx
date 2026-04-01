"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 신용카드 전월실적 30만원 채우기 부담스럽고 연회비도 아까운데, K-패스 환급은 받고 싶은 상황. 체크카드로 가려는데 은행마다 뭐가 다른지 모름.
// Q2. 내 주거래 은행(또는 인터넷은행) 체크카드 골라서 앱에서 5분 만에 발급 신청
// Q2-1. 은행 앱 또는 카드사 공식 신청 페이지 클릭
// Q3. 전 은행 연회비 0원·실적 없음·환급률 동일 / 차이는 앱 편의성·ATM 수수료·환급 알림 방식뿐 / 연말정산 공제율 30%(신용 15%)로 체크가 2배 / 인터넷은행(카카오·토스·케이뱅크) 앱 5분 발급
// Q4. 은행별 비교표 + 바로 신청 딥링크 + 체크 vs 신용 비교 텍스트 + BorderBox 주의사항

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Sidebar,
} from "@/components/article-ui";
import { K패스_SIDEBAR, K패스_HIGHLIGHT } from "@/data/K-패스-guide";

const BANKS = [
  { bank: "카카오뱅크", feature: "카카오톡 환급 알림 + 앱 5분 발급", url: "https://www.kakaobank.com/products/k-pass" },
  { bank: "토스뱅크", feature: "토스앱 환급 대시보드 실시간 확인", url: "https://www.tossbank.com/card/k-pass" },
  { bank: "케이뱅크", feature: "예금 0.1% 이자 우대 + 앱 발급", url: "https://m.kbanknow.com/k/cqtKtFT" },
  { bank: "신한카드", feature: "신한SOL 환급+잔액 통합 관리", url: "https://www.shinhancard.com/pconts/html/card/apply/check/1225544_2206.html" },
  { bank: "NH농협", feature: "전국 농협ATM 수수료 면제", url: "https://card.nonghyup.com/servlet/IpCc2021R.act?CD_WRS_SQNO=90010470" },
  { bank: "KB국민", feature: "KB스타뱅킹 자동 적립 연동", url: "https://card.kbcard.com/CRD/DVIEW/HCAMCXPRICAC0076?mainCC=a&cooperationcode=09322" },
  { bank: "하나카드", feature: "하나1Q 앱 환급 알림 + 캐시백", url: "https://www.hanacard.co.kr/OPI41000000D.web?_frame=no&CD_PD_SEQ=17033" },
  { bank: "우리카드", feature: "우리은행 계좌 연결 필수", url: "https://m.wooricard.com/dcmw/yh1/crd/crd01/M1CRD101S02.do?recomNo=839035" },
];

const FAQS = [
  { q: "체크카드는 어느 은행이든 만들 수 있나요?", a: "해당 은행 계좌가 있어야 해요. 계좌가 없으면 새로 만들어야 하는데, 카카오·토스·케이뱅크 같은 인터넷은행은 앱에서 계좌 개설부터 카드 발급까지 10분이면 끝나요. 시중은행은 영업점 방문이 필요할 수 있으니, 이미 계좌가 있는 은행 카드를 고르는 게 가장 빨라요." },
  { q: "연말정산에서 체크카드가 정말 더 유리한 거 맞나요?", a: "맞아요. 체크카드 소득공제율은 30%, 신용카드는 15%예요. 같은 금액을 써도 체크카드가 공제액이 2배예요. 여기에 K-패스 환급까지 더해지니까, 체크카드는 교통비 환급 + 연말정산 공제를 이중으로 챙기는 셈이에요. 연말정산 환급 극대화가 목표라면 체크카드가 무조건 유리해요." },
  { q: "환급금은 언제, 어떻게 들어오나요?", a: "월 15회 이상 이용한 다음 달 7영업일 이내에 정산이 끝나요. 체크카드는 연결된 은행 계좌로 캐시백 형태로 돌아오는 경우가 대부분이에요. 카카오뱅크는 카카오톡으로, 토스뱅크는 토스앱으로 환급 알림이 와서 놓칠 일이 없어요." },
  { q: "버스·지하철 말고 택시도 15회에 포함되나요?", a: "안 돼요. 택시는 K-패스 이용 횟수에 포함되지 않아요. 버스, 지하철, GTX만 합산 가능해요. 시외버스(고속·공항)와 KTX·SRT 같은 별도 발권 교통수단도 제외돼요. 도시 내 대중교통(시내버스 + 지하철)만 카운트된다고 보면 돼요." },
  { q: "체크카드인데 전월실적 조건은 정말 없나요?", a: "맞아요, 전혀 없어요. 체크카드는 전월실적 0원이에요. 한 달에 1원도 안 쓰고 교통카드로만 15회 이상 타도 환급이 나와요. 신용카드와 가장 큰 차이가 바로 이 점이에요. 관리할 게 아무것도 없어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "K-패스 공식 사이트", url: "https://www.korea-pass.kr" },
    { label: "국토교통부 K-패스 안내", url: "https://www.molit.go.kr" },
  ]},
];

const RELATED = [
  { slug: "K-패스-카드-비교", title: "K-패스 카드 전체 비교", description: "신용·체크·선불 전 카드 필터 비교 표예요." },
  { slug: "K-패스-신용카드-추천", title: "K-패스 신용카드 추천", description: "추가 할인까지 원하면 신용카드 비교예요." },
  { slug: "K-패스-가입방법", title: "K-패스 가입방법", description: "카드 발급 후 k-pass.or.kr 가입 절차예요." },
];

const GREEN = "#1D9E75";

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="K-패스 가이드" items={K패스_SIDEBAR} highlightSlugs={K패스_HIGHLIGHT} currentSlug="K-패스-체크카드-추천" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        교통 · K-패스 · 체크카드
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        K-패스 체크카드 추천<br />
        연회비 0원, 실적 없이 환급받는 법
      </h1>

      {/* ── [기] 도입 — Q1 공감 ──────────────────────────── */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        K-패스 환급 받고 싶은데, 신용카드 전월실적 30만원 채우기가 부담스럽죠.
        매달 30만원 이상 카드로 긁어야 한다는 조건이 붙으면 오히려 불필요한 소비를 하게 되니까요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        그래서 체크카드가 나와요. 연회비 0원, 전월실적 조건 없음, 환급률은 신용카드와 완전히 동일해요.
        일반 20%, 청년 30%, 저소득 53% — 카드 종류에 상관없이 같은 금액이 돌아와요.
        &quot;그러면 왜 신용카드를 쓰는 사람이 있는 거지?&quot; 싶을 수 있는데, 신용카드는 편의점·카페·쇼핑 추가 할인이 붙어서 월 소비가 많은 분한테만 유리해요.
      </p>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        체크카드를 고를 때 비교할 건 딱 하나 — 내가 계좌를 갖고 있는 은행이에요.
        아래에서 은행별로 바로 신청 링크까지 정리해뒀어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ── [승] 핵심 답변 — 은행별 비교 + 신청 ──────────── */}
      <H2>은행별 체크카드 비교 + 바로 신청</H2>
      <p style={body}>
        K-패스 체크카드는 전 은행 공통으로 연회비 0원, 전월실적 없음이에요.
        은행마다 다른 건 앱 편의성, ATM 수수료 정책, 환급 알림 방식 정도예요.
        이미 계좌가 있는 은행 카드를 고르면 추가 개설 없이 가장 빠르게 발급받을 수 있어요.
      </p>

      <div style={{ overflowX: "auto", border: "1px solid #e5e7eb", borderRadius: 10, marginBottom: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 420 }}>
          <thead>
            <tr style={{ background: "#f8f9fa", borderBottom: "2px solid #e5e7eb" }}>
              <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 700 }}>은행</th>
              <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 700 }}>차별점</th>
              <th style={{ textAlign: "center", padding: "10px 8px", fontWeight: 700 }}>신청</th>
            </tr>
          </thead>
          <tbody>
            {BANKS.map((b, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f0f0f0", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600, fontSize: 12 }}>{b.bank}</td>
                <td style={{ padding: "9px 8px", fontSize: 11, color: "#555" }}>{b.feature}</td>
                <td style={{ textAlign: "center", padding: "9px 8px" }}>
                  <a href={b.url} style={{ display: "inline-block", padding: "5px 12px", borderRadius: 6, background: GREEN, color: "#fff", fontWeight: 700, fontSize: 11, textDecoration: "none" }}>
                    신청 &rarr;
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 11, color: "#888", marginTop: 4, marginBottom: 20 }}>
        * 인터넷은행(카카오·토스·케이뱅크)은 앱에서 계좌 개설 + 카드 발급 동시에 가능해요. 영업점 방문 불필요.
      </p>

      <p style={body}>
        계좌가 아예 없는 분이라면 카카오뱅크나 토스뱅크가 가장 빨라요.
        앱 설치 → 본인 인증 → 계좌 개설 → K-패스 체크카드 신청까지 5분이면 끝나요.
        특히 토스뱅크는 환급 현황을 앱 대시보드에서 실시간으로 보여주고,
        카카오뱅크는 카카오톡으로 환급 알림이 와서 따로 챙길 필요가 없어요.
      </p>
      <p style={body}>
        시중은행(신한·농협·KB·하나·우리) 계좌를 이미 갖고 있다면 굳이 인터넷은행으로 옮길 필요 없어요.
        주거래 은행 카드로 발급하면 급여 이체·공과금·적금 관리와 교통비 환급을 한 앱에서 볼 수 있어서 더 편하죠.
        NH농협은 전국 농협ATM 수수료 면제가 추가로 붙어서, 현금 인출이 잦은 분한테 유리해요.
      </p>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* ── [전] 체크카드 vs 신용카드 깊은 비교 ──────────── */}
      <H2>체크카드가 신용카드보다 나은 3가지</H2>
      <p style={body}>
        K-패스 환급률은 동일한데, 체크카드만의 구조적인 장점이 3가지 있어요.
        특히 연말정산 공제율 차이는 직장인한테 꽤 큰 금액이에요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "6px 8px" }}>항목</th>
              <th style={{ textAlign: "center", padding: "6px 8px", color: GREEN }}>체크카드</th>
              <th style={{ textAlign: "center", padding: "6px 8px", color: "#999" }}>신용카드</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "연말정산 공제율", check: "30%", credit: "15%" },
              { item: "연회비", check: "0원", credit: "5천~1만원" },
              { item: "전월실적 조건", check: "없음", credit: "30만원" },
              { item: "추가 할인(쇼핑·카페)", check: "없음", credit: "카드사별 다름" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "6px 8px", fontWeight: 600 }}>{r.item}</td>
                <td style={{ textAlign: "center", padding: "6px 8px", color: GREEN, fontWeight: 700 }}>{r.check}</td>
                <td style={{ textAlign: "center", padding: "6px 8px", color: "#999" }}>{r.credit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        연말정산 공제율 차이를 구체적으로 계산해보면 이래요.
        연간 카드 사용액 1,500만원(월 125만원)이고 총급여 5천만원인 직장인 기준으로,
        체크카드 공제율 30%면 공제 대상 금액이 약 200만원, 신용카드 15%면 약 100만원이에요.
        세율 15% 구간이면 체크카드가 연말정산에서 약 15만원 더 돌려받게 돼요.
      </p>
      <p style={body}>
        물론 신용카드는 편의점·카페·온라인쇼핑 추가 할인이 붙어요.
        월 소비가 30만원 이상이고 추가 할인을 적극적으로 쓸 분이라면 <a href="/w/K-패스-신용카드-추천" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>신용카드</a>가 더 나을 수 있어요.
        반대로 &quot;교통비 환급만 깔끔하게 받고 싶다&quot;면 체크카드가 정답이에요.
      </p>

      <Divider />

      {/* ── [전] 발급 후 주의사항 ────────────────────────── */}
      <H2>카드 받은 뒤 반드시 해야 할 2가지</H2>
      <p style={body}>
        체크카드를 발급받았다고 자동으로 환급이 시작되는 게 아니에요.
        아래 2단계를 빠뜨리면 그냥 일반 교통카드로 쓰는 것과 다를 게 없어요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>1. K-패스 회원 가입 (카드 발급과 별도)</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          <a href="https://www.korea-pass.kr" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>k-pass.or.kr</a> 또는 카드사 앱에서 K-패스 회원 등록을 해야 해요.
          카카오뱅크·토스뱅크는 해당 앱 안에서 바로 등록 가능하고, 시중은행은 k-pass.or.kr 웹사이트에서 가입해야 해요.
          이 단계를 빠뜨리고 몇 달째 교통카드만 찍는 분이 생각보다 많아요. 카드 받자마자 바로 가입하는 게 중요해요.
          상세 절차는 <a href="/w/K-패스-가입방법" style={{ color: GREEN, textDecoration: "none", fontWeight: 600 }}>가입방법 안내</a>에 정리해뒀어요.
        </p>
      </BorderBox>

      <BorderBox>
        <strong style={{ color: GREEN }}>2. 월 15회 이상 대중교통 이용</strong>
        <p style={{ ...body, marginTop: 8, marginBottom: 0 }}>
          14회 이하면 환급 0원이에요. 출퇴근 주 4일 × 왕복 = 주 8회, 월 32회 정도 되니까 대부분의 직장인은 충분해요.
          주말 외출이나 약속 때 타는 버스·지하철도 합산되고요.
          단, 택시·시외버스·KTX·SRT는 카운트에서 빠지니까 주의해야 해요.
          15회 채웠는지 궁금하면 k-pass.or.kr 마이페이지에서 이용 내역을 조회할 수 있어요.
        </p>
      </BorderBox>

      <Divider />

      {/* ── [결] FAQ ────────────────────────────────────── */}
      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성됐어요. 카드 발급 조건은 은행 정책에 따라 변경될 수 있으니 신청 전 해당 은행에서 최신 조건을 봐야 해요." />
    </ArticleLayout>
  );
}
