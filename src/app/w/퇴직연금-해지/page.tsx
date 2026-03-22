"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 급하게 돈이 필요해서 퇴직연금(IRP)을 해지하려는데, 세금이 얼마나 나오는지 알고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 해지 시 세금(16.5%)을 이해하고, 법정 사유 해당 여부를 확인해서 세금을 줄이거나, 해지 대신 대출을 고려하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 기타소득세 16.5%, 법정 사유(주택구입·요양·파산 등)면 퇴직소득세만, DC형은 해지 불가(중도인출만), 55세 이후 연금 수령 시 3.3~5.5%.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(세금 비교) + Steps(해지 절차) + 표(법정 사유 목록) + BorderBox(대안 비교) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "IRP 해지하면 세금 얼마나 나오나요?", a: "세액공제 받은 납입금과 운용수익에 기타소득세 16.5%가 붙어요. 3,000만원이면 세금만 약 495만원이에요." },
  { q: "해지 수수료가 따로 있나요?", a: "별도 해지 수수료는 없어요. 다만 일부 상품은 가입 초기 해지 시 환매 수수료가 붙을 수 있어서 약관을 확인해보세요." },
  { q: "DC형 퇴직연금도 해지할 수 있나요?", a: "재직 중에는 해지가 안 돼요. 퇴직해야 받을 수 있어요. 법정 사유가 있으면 중도인출은 가능해요." },
  { q: "법정 사유 없이도 IRP를 해지할 수 있나요?", a: "네, IRP는 가능해요. 다만 기타소득세 16.5%가 붙어서 크게 손해예요." },
  { q: "해지 대신 대출이 나을 수 있나요?", a: "그럴 수 있어요. 대출 이자율(연 3~5%)보다 해지 세금(16.5%)이 훨씬 높아요. 대출 가능 여부부터 확인해보세요." },
  { q: "일부만 인출할 수 있나요?", a: "법정 사유가 있으면 필요한 금액만 인출 가능해요. 사유 없이 일부 인출은 안 되고 전액 해지만 돼요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "근로자퇴직급여보장법 (법제처)", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법 (법제처)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "금감원 통합연금포털", url: "https://100lifeplan.fss.or.kr/retire/retireInfo.do" },
    ],
  },
];

const CANCEL_STEPS = [
  { title: "금융회사 앱/홈페이지 로그인", desc: "IRP 가입한 은행·증권사·보험사에 접속해요." },
  { title: "IRP 해지 메뉴 선택", desc: "퇴직연금 또는 IRP 메뉴에서 '해지'를 선택해요." },
  { title: "법정 사유 확인·증빙 첨부", desc: "법정 사유가 있으면 증빙서류를 첨부해요. 없으면 일반 해지로 진행돼요.", tip: "법정 사유면 세금이 확 줄어요" },
  { title: "해지 완료·입금", desc: "신청 후 2~5영업일 내에 본인 계좌로 입금돼요. 세금은 원천징수돼요." },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · 해지 · 세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 해지하면 세금 얼마?<br />
        기타소득세 16.5%와 절세 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        급하게 돈이 필요해서 퇴직연금을 해지하려고요?
        해지하면 기타소득세 16.5%를 내야 해요. 정상 수령(3~5%)보다 3~5배 비싸요.
        법정 사유가 있으면 세금을 크게 줄일 수 있으니까 먼저 확인해보세요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>해지하면 세금이 얼마나 나오나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에서
        퇴직연금 중도인출을 기타소득으로 분류해요. 기타소득세율은 16.5%(지방소득세 포함)예요.
      </p>

      <GreenBox title="세금 비교 (3,000만원 기준)">
        · <strong>중도 해지</strong>: 기타소득세 16.5% = 약 495만원 → 실수령 2,505만원<br />
        · <strong>정상 퇴직 수령</strong>: 퇴직소득세 3~5% = 약 120만원 → 실수령 2,880만원<br />
        · <strong>55세 이후 연금</strong>: 연금소득세 3.3~5.5% = 약 150만원 → 실수령 2,850만원<br />
        → 중도 해지 시 <strong>약 375만원 손해</strong>
      </GreenBox>

      <Divider />

      <H2>법정 사유가 있으면 세금이 줄어요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제17조</a>에서
        정한 사유에 해당하면 퇴직소득세(3~5%)만 내면 돼요. 16.5%가 아니라 3~5%만요.
      </p>

      <SectionBadge>법정 사유 목록</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>사유</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>필요 서류</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["무주택자 주택구입", "매매계약서 + 주민등록등본"],
              ["6개월 이상 요양", "진단서 + 의료비 영수증"],
              ["파산 선고", "파산선고 결정문"],
              ["개인회생", "개인회생 결정문"],
              ["천재지변", "피해 확인서"],
              ["해외이주", "해외이주 신고서"],
            ].map(([reason, docs], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{reason}</td>
                <td style={{ padding: "9px 12px", color: "#666" }}>{docs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>해지 절차는 어떻게 되나요?</H2>
      <p style={body}>
        온라인으로 간단하게 신청할 수 있어요. 오프라인은 신분증과 본인 계좌를 가지고 영업점을 방문하면 돼요.
      </p>

      <SectionBadge>IRP 해지 절차</SectionBadge>
      <Steps steps={CANCEL_STEPS} />

      <ArticleAd position="mid" />
      <Divider />

      <H2>DC형은 해지가 안 된다고요?</H2>
      <p style={body}>
        맞아요. DC형 퇴직연금은 재직 중에 해지 자체가 불가능해요. 퇴직해야만 적립금을 받을 수 있어요.
        다만 법정 사유가 있으면 <strong>중도인출</strong>은 가능해요. 사유에 필요한 금액까지만 인출할 수 있고, 전액은 안 돼요.
        DB형은 중도인출도 안 돼요. <a href="/w/퇴직금-중간정산-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 중간정산</a>은 별도 절차가 필요해요.
      </p>

      <Divider />

      <H2>해지 전에 이것부터 확인해보세요</H2>
      <p style={body}>
        해지하기 전에 다른 방법이 없는지 먼저 따져보세요.
      </p>

      <BorderBox>
        <strong>해지 전 체크리스트</strong><br />
        · 법정 사유에 해당하나요? → 해당하면 세금이 확 줄어요<br />
        · 55세까지 몇 년 남았나요? → 몇 년만 기다리면 연금소득세 3.3~5.5%만 내요<br />
        · 대출로 해결할 수 있나요? → 대출 이자(연 3~5%)가 해지 세금(16.5%)보다 싸요<br />
        · 전액이 아니라 일부만 필요한가요? → 법정 사유 중도인출로 필요한 만큼만 빼세요
      </BorderBox>

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법과 근로자퇴직급여보장법을 바탕으로 작성했어요. 개인 상황에 따라 세금이 달라질 수 있으니 세무사나 금융회사에 상담받으세요." />
    </div>
  );
}
