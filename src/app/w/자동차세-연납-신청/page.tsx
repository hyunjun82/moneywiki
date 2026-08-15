"use client";
// Q1. 자동차세를 미리 내면 할인받을 수 있다는데, 얼마나 절약되고 어떻게 신청하는지 궁금해요.
// Q2. 위택스에서 1월에 연납 신청해서 4.58% 할인받는 행동.
// Q3. 할인율(1월 4.58%), 신청기간(1/16~31), 위택스 신청 방법, 자동 고지, 매도·폐차 시 환급.
// Q4. GreenBox(할인율 핵심) + Steps(신청 절차) + 표(월별 할인율) + BorderBox(환급 계산) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";
import { Steps } from "@/components/article-ui/Steps";

const STEPS = [
  { title: "위택스 접속", desc: "wetax.go.kr에 접속해서 공동인증서나 간편인증으로 로그인해요.", tip: "서울 거주자는 이택스(etax.seoul.go.kr)를 이용하세요" },
  { title: "연납 신청 메뉴 선택", desc: "부가서비스 → 자동차세 연납신청을 선택해요." },
  { title: "차량 정보 확인", desc: "차량번호와 소유자 정보를 확인하고 신청 버튼을 눌러요." },
  { title: "납부", desc: "바로 납부하거나 1월 31일까지 납부하면 돼요. 카드 납부 시 수수료 없어요." },
];

const FAQS = [
  { q: "1월 연납 신청 기간을 놓치면 어떻게 하나요?", a: "3월(16~31일)에 신청하면 3.75% 할인받을 수 있어요. 6월, 9월에도 신청 가능하지만 할인율이 점점 낮아져요." },
  { q: "작년에 연납했으면 올해도 자동 신청되나요?", a: "네. 한 번 연납하면 매년 1월에 자동으로 연납 고지서가 집으로 와요. 납부만 하면 돼요." },
  { q: "연납 후 차를 팔면 환급받을 수 있나요?", a: "네. 이전등록·말소등록 시 남은 기간만큼 일할 계산해서 자동 환급돼요." },
  { q: "카드 무이자 할부 되나요?", a: "네. 카드사별로 2~6개월 무이자 할부가 가능해요. 위택스 납부 화면에서 할부를 선택하면 돼요." },
  { q: "연납을 안 하고 싶으면 어떻게 하나요?", a: "1월 고지서를 납부 안 하면 돼요. 자동으로 6월·12월 정기분으로 전환되고 별도 해지 신청은 필요 없어요." },
  { q: "전기차도 자동차세 연납이 되나요?", a: "네. 전기차도 동일하게 연납 할인을 받을 수 있어요. 전기차 자동차세는 연 13만원(비영업)이에요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "지방세법 제128조 (자동차세 연납)", url: "https://www.law.go.kr/법령/지방세법" },
    { label: "위택스 자동차세 연납 신청", url: "https://www.wetax.go.kr" },
    { label: "이택스 (서울시)", url: "https://etax.seoul.go.kr" },
  ]},
];

const RELATED = [
  { slug: "자동차-취득세-계산", title: "자동차 취득세 계산", description: "차량 구입 시 취득세 계산법이에요." },
  { slug: "자동차-검사-유효기간", title: "자동차 검사 유효기간", description: "자동차 검사 주기와 과태료 기준이에요." },
  { slug: "위택스-사용법", title: "위택스 사용법", description: "위택스에서 지방세 조회·납부하는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 자동차세 · 연납</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        자동차세 연납, 1월에 신청하면 얼마 아낄까?<br />
        할인율과 위택스 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        자동차세를 1년치 미리 내면 할인받을 수 있다는 거 알고 계셨죠?
        1월에 연납 신청하면 약 4.58% 할인이에요.
        30만원짜리 자동차세면 약 1만 4천원을 아낄 수 있어요. 신청 방법 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>1월 연납이 가장 유리해요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/지방세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>지방세법 제128조</a>에 따라
        자동차세를 미리 납부하면 선납 이자를 공제해줘요.
        빨리 낼수록 할인율이 높아요.
      </p>

      <GreenBox>
        2026년 연납 핵심이에요.<br />
        · 1월 연납: 약 <strong>4.58%</strong> 할인 (가장 유리)<br />
        · 신청 기간: <strong>1월 16일 ~ 31일</strong><br />
        · 신청처: <a href="https://www.wetax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>위택스</a> (서울은 이택스)<br />
        · 한 번 연납하면 <strong>매년 자동 고지</strong>
      </GreenBox>

      <SectionBadge>월별 할인율 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>신청월</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>공제 기간</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>할인율</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>30만원 기준 절약</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1월", "2~12월 (11개월)", "약 4.58%", "약 13,740원"],
              ["3월", "4~12월 (9개월)", "약 3.75%", "약 11,250원"],
              ["6월", "7~12월 (6개월)", "약 2.50%", "약 7,500원"],
              ["9월", "10~12월 (3개월)", "약 1.25%", "약 3,750원"],
            ].map(([month, period, rate, saving], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee", background: i === 0 ? "#f0faf6" : "transparent" }}>
                <td style={{ padding: "9px 12px", fontWeight: i === 0 ? 700 : 400, color: i === 0 ? "#1D9E75" : "#111" }}>{month}</td>
                <td style={{ padding: "9px 12px" }}>{period}</td>
                <td style={{ padding: "9px 12px" }}>{rate}</td>
                <td style={{ padding: "9px 12px" }}>{saving}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>위택스에서 3분이면 신청 끝나요</H2>
      <p style={body}>
        온라인으로 간편하게 신청할 수 있어요. 신청 가능 시간은 평일·주말 07:00~22:00이에요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS} />

      <p style={body}>
        인터넷이 어려우면 관할 시·군·구청 세무과에 전화해서 신청할 수 있어요.
        전화 신청하면 고지서가 집으로 와요.
      </p>

      <Divider />

      <H2>차를 팔거나 폐차하면 환급받아요</H2>
      <p style={body}>
        연납 후 차를 팔거나 폐차하면 남은 기간만큼 자동 환급돼요.
      </p>

      <BorderBox>
        <strong>환급 계산 예시</strong><br /><br />
        1월에 30만원 연납 → 7월에 차량 매도<br />
        · 잔여 기간: 7~12월 (약 184일)<br />
        · 환급액: 300,000 × (184÷365) = 약 <strong>151,000원</strong><br /><br />
        별도 신청 없이 자동 환급돼요. 등록된 계좌로 1~2개월 내 입금돼요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 지방세법과 위택스 자료를 바탕으로 작성됐어요. 할인율과 신청 기간은 정책에 따라 변동될 수 있으니 위택스에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
