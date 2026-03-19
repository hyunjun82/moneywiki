"use client";

// Q1. 신용카드 실적 채우기 부담스럽고 연회비도 아까운데, K-패스 교통비 환급은 받고 싶은 상황
// Q2. 내 주거래 은행의 체크카드 1개 골라서 바로 신청
// Q2-1. 은행 앱 또는 카드사 신청 페이지 클릭
// Q3. 전 은행 연회비 0원·실적 없음·환급률 동일 / 차이는 앱 편의·ATM 수수료뿐 / 연말정산 공제율 30%(신용 15%보다 높음) / 인터넷은행은 앱 5분 발급
// Q4. "비교해서 고른다" → 은행별 비교표 + 바로 신청 딥링크 (텍스트 짧게)

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd, Sidebar,
} from "@/components/article-ui";
import { K패스_SIDEBAR } from "@/data/K-패스-guide";

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
  { q: "체크카드는 어느 은행이든 만들 수 있나요?", a: "해당 은행 계좌가 필요해요. 카카오·토스·케이뱅크는 앱에서 계좌 개설부터 카드 발급까지 10분이면 끝나요." },
  { q: "연말정산에서 체크카드가 더 유리한 거 맞나요?", a: "맞아요. 체크카드 소득공제율은 30%, 신용카드는 15%예요. K-패스 환급 + 연말정산 공제 이중으로 챙길 수 있어요." },
  { q: "환급금은 언제 들어오나요?", a: "월 15회 이상 이용한 다음 달 10일 전후예요. 체크카드는 계좌 입금 또는 캐시백 형태로 돌아와요." },
  { q: "15회는 버스·지하철 합산인가요?", a: "맞아요. 버스·지하철·GTX 전부 합산이에요. 택시는 안 돼요." },
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
    <ArticleLayout sidebar={<Sidebar heading="K-패스 가이드" items={K패스_SIDEBAR} currentSlug="K-패스-체크카드-추천" />}>
      <p style={{ fontSize: 13, color: GREEN, fontWeight: 600, marginBottom: 10 }}>
        교통 · K-패스 · 체크카드
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        K-패스 체크카드 추천<br />
        내 은행 카드 골라서 바로 신청
      </h1>

      {/* [기] Q1 공감 */}
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        신용카드 실적 30만원 채우기 부담스럽죠?
        체크카드는 연회비 0원, 실적 조건 없음, 환급률도 신용카드와 동일해요.
        내 은행 카드 골라서 신청하면 끝이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* [승] 핵심 답변 — 바로 내 은행 찾아서 신청 */}
      <H2>내 은행 카드 바로 신청</H2>
      <p style={body}>
        체크카드는 연회비·실적·환급률 전부 동일해요. 비교할 게 없어요.
        이미 계좌 있는 은행 카드를 고르면 가장 편해요.
      </p>

      <div style={{ overflowX: "auto", border: "1px solid #e5e7eb", borderRadius: 10, marginBottom: 16 }}>
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
                    신청 →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 11, color: "#888", marginTop: 4 }}>
        * 인터넷은행(카카오·토스·케이뱅크)은 앱에서 계좌 개설 + 카드 발급 동시 가능
      </p>

      {/* [전] 체크카드만의 장점 */}
      <H2>체크카드가 신용카드보다 나은 점</H2>
      <p style={body}>
        K-패스 환급은 동일한데, 체크카드만의 장점이 2가지 더 있어요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <tbody>
            {[
              { item: "연말정산 공제율", check: "30%", credit: "15%", note: "체크카드가 2배" },
              { item: "연회비", check: "0원", credit: "5천~1만원", note: "무조건 체크 유리" },
              { item: "실적 조건", check: "없음", credit: "30만원", note: "관리 부담 0" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "6px 8px", fontWeight: 600 }}>{r.item}</td>
                <td style={{ padding: "6px 8px", color: GREEN, fontWeight: 700 }}>{r.check}</td>
                <td style={{ padding: "6px 8px", color: "#999" }}>{r.credit}</td>
                <td style={{ padding: "6px 8px", fontSize: 11, color: "#555" }}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      {/* [결] 신청 후 해야 할 것 */}
      <H2>카드 받은 뒤 꼭 해야 할 것</H2>
      <p style={body}>
        카드 발급만으로는 환급이 안 돼요. 이 2가지를 빠뜨리면 의미가 없어요.
      </p>

      <BorderBox>
        <strong style={{ color: GREEN }}>1. k-pass.or.kr 회원 가입</strong><br />
        <a href="https://www.korea-pass.kr" style={{ color: GREEN }}>k-pass.or.kr</a> 또는 카드사 앱에서 K-패스 회원 등록을 해야 환급이 시작돼요.
        카카오뱅크·토스뱅크는 해당 앱 안에서 바로 등록 가능하고요.
        <br /><br />
        <strong style={{ color: GREEN }}>2. 월 15회 이상 대중교통 이용</strong><br />
        14회 이하면 환급 0원이에요. 출퇴근 주 4회 × 4주 = 16회면 충족돼요.
        주말 이동까지 합산되니까 대부분 충분해요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준으로 작성됐어요. 카드 발급 조건은 은행 정책에 따라 변경될 수 있으니 신청 전 해당 은행에서 확인하세요." />
    </ArticleLayout>
  );
}
