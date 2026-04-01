"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

/*
Q1. 법인 운영 중 8월에 중간예납 고지서를 받았는데, 얼마를 어떻게 내야 하는지 모르는 상황이에요.
Q2. 중간예납 세액을 계산하고 기한 내에 홈택스로 신고·납부할 수 있어야 해요.
Q3. 신고 기한(결산월별), 계산 공식(직전 사업연도 세액 기준), 면제 기준(50만원 미만), 분납 조건(1천만원 초과), 가산세.
Q4. GreenBox(기한 요약) + BorderBox(계산 공식) + Steps(신고 절차) + FAQ.
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// ─── 데이터 ───

const FILING_STEPS = [
  { title: "홈택스 로그인", desc: "법인 공동인증서로 홈택스(hometax.go.kr)에 접속해요." },
  { title: "신고서 작성", desc: "'법인세 중간예납 신고' 메뉴에서 직전 사업연도 세액 기준 자동 계산을 확인해요." },
  { title: "세액 확인 및 제출", desc: "산출된 중간예납 세액이 맞는지 확인하고 전자신고를 제출해요." },
  { title: "납부", desc: "홈택스 전자납부 또는 은행 이체로 기한 내에 납부하세요. 1천만원 초과 시 분납 신청도 가능해요." },
];

const CHECKLIST_ITEMS = [
  "직전 사업연도 산출세액 확인 (50만원 미만이면 면제)",
  "결산월에 맞는 중간예납 기한 확인 (12월 결산 → 8월 31일)",
  "홈택스 법인 공동인증서 유효한지 체크",
  "1천만원 초과 시 분납 여부 검토",
  "신설법인이면 중간결산 방식으로 별도 계산 필요",
];

const FAQS = [
  { q: "중간예납 50만원 미만이면 정말 안 내도 되나요?", a: "네, 직전 사업연도 산출세액 기준으로 계산한 금액이 50만원 미만이면 납부 의무가 없어요. 2023년부터 면제 기준이 30만원에서 50만원으로 올랐죠." },
  { q: "기한을 넘기면 가산세가 얼마나 붙나요?", a: "무신고 가산세는 적용되지 않지만, 납부지연 가산세가 붙어요. 미납세액의 일정 비율이 매일 쌓이니 기한을 지키는 게 중요해요." },
  { q: "1천만원 넘으면 분납이 가능하다고 했는데, 어떻게 하나요?", a: "중간예납 세액이 1천만원을 초과하면 초과분에 대해 1개월 이내 분납이 가능해요. 홈택스 신고 시 분납 신청란에 체크하면 돼요." },
  { q: "직전 사업연도가 없는 신설법인은 어떻게 하나요?", a: "직전 사업연도 세액이 없으니 중간결산 방식을 써야 해요. 1월~6월 실적을 결산해서 세액을 산출한 뒤 신고하면 돼요." },
  { q: "3월 결산법인은 중간예납 기한이 언제예요?", a: "3월 결산법인은 중간예납 기간이 4월 1일~9월 30일이고, 신고납부 기한은 11월 30일이에요. 결산월에 따라 기한이 달라지니 꼭 확인하세요." },
  { q: "중간예납과 확정 신고의 관계는 뭔가요?", a: "중간에 미리 내는 선납이에요. 사업연도 끝나고 확정 신고할 때 실제 세액에서 중간예납 금액을 빼고 정산하죠. 더 냈으면 환급, 덜 냈으면 추가 납부해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "국세청: 법인세 중간예납 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6567&cntntsId=7993" },
    { label: "국세청: 세무일정", url: "https://www.nts.go.kr/nts/ad/taxSchdul/selectList.do?mi=135747" },
    { label: "홈택스: 법인세 전자신고", url: "https://www.hometax.go.kr" },
  ]},
];

// ─── 페이지 ───

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 법인세 · 중간예납</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        결산법인 법인세 중간예납, 언제까지 얼마나 내야 하나?<br />
        기한과 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        8월쯤 법인세 중간예납 고지서가 날아오면 당황스럽죠.
      </p>
      <p style={body}>
        12월 결산법인이면 <strong>8월 31일까지</strong> 신고·납부해야 해요.
        직전 사업연도에 낸 법인세의 절반 정도를 미리 내는 건데,
        50만원 미만이면 아예 안 내도 돼요.
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6567&cntntsId=7993" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a> 기준으로
        기한부터 계산법, 면제 조건까지 정리했어요.
      </p>

      <Divider />

      {/* 섹션 1: 기한 */}
      <H2>중간예납 기한은 언제까지인가요?</H2>
      <p style={body}>
        사업연도 개시일부터 6개월이 지난 날로부터 2개월 이내에 신고·납부해야 해요.
        12월 결산법인이면 중간예납 기간이 1월 1일~6월 30일이고, 신고 기한은 8월 31일이죠.
        8월 31일이 주말이나 공휴일이면 다음 평일까지 연장돼요.
      </p>

      <GreenBox title="결산월별 신고 기한">
        12월 결산 → 중간예납 기간 1.1~6.30, 신고기한 8월 31일<br />
        3월 결산 → 중간예납 기간 4.1~9.30, 신고기한 11월 30일<br />
        6월 결산 → 중간예납 기간 7.1~12.31, 신고기한 다음해 2월 말일
      </GreenBox>

      <Divider />

      {/* 섹션 2: 계산법 */}
      <H2>중간예납 세액은 어떻게 계산하나요?</H2>
      <p style={body}>
        직전 사업연도 산출세액을 기준으로 계산해요. 쉽게 말하면 작년에 낸 법인세의 절반 정도예요.
      </p>

      <SectionBadge>계산 공식</SectionBadge>
      <BorderBox>
        <p style={body}>
          (직전 사업연도 산출세액 + 가산세액 - 공제감면세액 - 원천납부세액 - 수시부과세액) x (6 / 직전 사업연도 월수)
        </p>
        <p style={{ ...body, marginTop: 8 }}>
          홈택스에 접속하면 이 공식이 자동으로 계산돼요. 직접 산출할 필요 없이 확인만 하면 되죠.
        </p>
      </BorderBox>
      <p style={body}>
        직전 사업연도에 법인세가 없었다면 중간결산 방식으로 1~6월 실적을 직접 결산해서 세액을 산출해야 해요.
        <a href="/w/법인세-신고-기한-세율" style={{ color: "#1D9E75", textDecoration: "underline" }}>법인세 신고 기한</a> 글에서 연간 일정도 함께 확인하세요.
      </p>

      <Divider />

      {/* 섹션 3: 면제·분납 */}
      <H2>면제되거나 나눠서 낼 수 있는 경우는?</H2>
      <p style={body}>
        직전 사업연도 산출세액 기준으로 계산한 금액이 <strong>50만원 미만</strong>이면 중간예납 의무가 면제돼요.
        사업연도가 6개월 이하인 법인도 대상에서 제외되죠.
      </p>
      <p style={body}>
        중간예납 세액이 <strong>1,000만원을 초과</strong>하면 분납이 가능해요.
        초과분에 대해 납부기한 후 1개월 이내에 나눠서 낼 수 있죠.
        홈택스 신고 시 분납 신청란에 체크하면 돼요.
      </p>

      <GreenBox title="면제·분납 기준">
        50만원 미만 → 중간예납 의무 면제<br />
        1,000만원 초과 → 초과분 1개월 이내 분납 가능<br />
        사업연도 6개월 이하 → 중간예납 대상 아님
      </GreenBox>

      <Divider />

      {/* 섹션 4: 신고 절차 */}
      <H2>홈택스로 어떻게 신고하나요?</H2>
      <p style={body}>
        홈택스에서 전자신고하면 10분이면 끝나요. 세무사에게 맡길 수도 있지만, 직접 해도 어렵지 않죠.
      </p>
      <Steps steps={FILING_STEPS} />

      <Divider />

      {/* 섹션 5: 체크리스트 */}
      <H2>중간예납 전에 꼭 확인할 것들</H2>
      <p style={body}>
        기한 놓치면 납부지연 가산세가 붙으니, 아래 항목을 미리 점검하세요.
      </p>
      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 국세청 자료를 바탕으로 작성됐어요. 세법 개정이나 개별 법인 사정에 따라 달라질 수 있으니, 세무사와 상담하거나 국세상담센터(126)에 문의하세요." />
    </div>
  );
}
