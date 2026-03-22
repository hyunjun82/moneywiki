"use client";

// Q1. 부모님한테 현금이나 부동산을 받으려는데 세금이 얼마나 나오는지, 비과세 한도가 얼마인지 궁금한 상황
// Q2. 내 증여 상황에 맞는 공제 한도를 확인하고, 증여세를 계산해서 3개월 내에 홈택스에서 자진 신고한다
// Q3. 공제 한도(자녀 5천만/배우자 6억/혼인 1억 추가), 세율(10~50%), 10년 합산, 신고 기한(3개월), 부담부증여
// Q4. GreenBox(공제 한도) + TaxRateTable(세율) + 계산 예시 BorderBox + Steps(신고 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, Disclaimer,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "증여일이 속한 달 말일부터 3개월이 기한이에요",
    desc: "1월 15일에 증여받았다면 4월 30일까지 신고해야 해요. 기한 내 자진 신고하면 산출세액의 3%를 빼줘요. 7,760만원 세금이면 약 240만원을 아낄 수 있어요.",
    tip: "기한 넘기면 무신고 가산세 20% + 납부지연 가산세",
  },
  {
    title: "홈택스에서 온라인으로 신고해요",
    desc: "홈택스(hometax.go.kr)에 로그인 → 신고/납부 → 증여세를 선택해요. 증여자 정보, 증여재산 내역, 공제 항목을 입력하면 세액이 자동 계산돼요. 세무서 방문 신고도 가능해요.",
    tip: "부동산 증여는 시가인정액 평가가 필요해서 세무사 도움 추천",
    link: { label: "홈택스 바로가기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "납부 방법을 선택해요",
    desc: "일시납부가 원칙이지만, 세액이 1천만원 넘으면 2개월 분납이 가능해요. 2천만원 넘으면 5년까지 연부연납(분할 납부)도 가능해요. 연부연납 시 이자(가산금)가 붙어요.",
    tip: "1천만원 이하는 일시납부만 가능",
  },
];

const FAQS = [
  { q: "부모님한테 현금 5천만원 받으면 세금 안 내도 되나요?", a: "성인 자녀가 직계존속(부모·조부모)에게 10년간 5천만원까지 받으면 증여세가 없어요. 5년 전에 3천만원 받은 적이 있다면 합산해서 총 5천만원까지만 공제돼요. 초과분에 대해서만 세금이 나와요." },
  { q: "결혼하면 추가 공제가 있나요?", a: "네. 혼인 전후 2년 이내에 직계존속에게 증여받으면 기본 5천만원에 1억원 추가 공제가 돼요. 총 1.5억원까지 비과세예요. 양가 합산하면 최대 3억원까지 세금 없이 받을 수 있어요." },
  { q: "10년 합산이 정확히 뭔가요?", a: "같은 사람에게 10년 이내에 여러 번 증여받으면 금액을 합산해서 공제를 적용해요. 아버지에게 5천만원 + 어머니에게 5천만원은 합산이에요(같은 직계존속). 하지만 시부모에게 따로 받는 건 기타친족으로 별도 계산이에요." },
  { q: "부동산 증여 시 시가는 어떻게 정하나요?", a: "증여일 전후 6개월 내 유사 매매사례가액이 시가예요. 매매사례가 없으면 감정평가액, 그것도 없으면 기준시가(공시가격)를 사용해요. 공시가로 하면 시가보다 낮아서 세금이 줄어들 수 있지만, 세무서에서 감정평가를 요구할 수 있어요." },
  { q: "부담부증여가 뭔가요?", a: "증여와 동시에 채무(대출)를 넘기는 거예요. 5억 아파트를 증여하면서 대출 2억을 같이 넘기면, 3억은 증여세, 2억은 증여자에게 양도소득세가 부과돼요. 양도차익이 적으면 일반 증여보다 유리할 수 있어요." },
  { q: "생활비나 학비도 증여세가 붙나요?", a: "피부양자의 생활비, 교육비, 치료비를 직접 지불하는 건 비과세예요. 단, 통상적 범위를 넘는 금액이면 과세될 수 있어요. 대학 등록금을 부모가 직접 납부하는 건 비과세지만, 현금으로 자녀 계좌에 넣으면 증여로 볼 수 있어요." },
  { q: "증여세 신고를 안 하면 어떻게 되나요?", a: "무신고 가산세 20%가 붙고, 하루 0.022%씩 납부지연 가산세도 추가돼요. 세무서에서 자금 출처 조사를 하다가 적발되면 가산세까지 더해져서 훨씬 많이 내게 돼요. 자진 신고하면 3% 공제도 받으니까 기한 안에 신고하는 게 유리해요." },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 증여세 · 공제 한도</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        증여세, 부모한테 얼마까지 세금 없이 받나요?<br />
        공제 한도부터 계산법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "부모님이 전세 자금 좀 보태주신다는데, 세금 내야 하나요?"
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/상속세및증여세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>상속세 및 증여세법</a>에 따라 무상으로 재산을 받으면 증여세를 내야 해요. 다만 관계에 따라 <strong>공제 한도</strong>가 있어서 그 안에서는 세금이 안 나와요. 성인 자녀는 10년간 <strong>5천만원</strong>, 배우자는 <strong>6억원</strong>까지 비과세예요.
      </p>

      <Divider />

      <H2>관계별 공제 한도부터 보세요</H2>
      <p style={body}>
        증여재산 공제는 <strong>10년 합산</strong>이에요. 같은 사람에게 10년 이내에 여러 번 받으면 다 합쳐서 공제를 적용해요.
      </p>

      <SectionBadge>증여재산 공제 한도 (10년 합산)</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>증여자</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>공제 한도</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["배우자", "6억원"],
              ["직계존속 (부모·조부모) → 성인 자녀", "5,000만원"],
              ["직계존속 → 미성년 자녀", "2,000만원"],
              ["직계비속 (자녀 → 부모)", "5,000만원"],
              ["기타 친족 (6촌 혈족·4촌 인척)", "1,000만원"],
              ["혼인 증여 추가 공제 (직계존속)", "+1억원 (총 1.5억원)"],
            ].map(([from, limit], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{from}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        결혼하면 양가에서 총 3억까지 비과세{"\n"}
        · 신랑 측 부모: 기본 5천만 + 혼인 1억 = 1.5억{"\n"}
        · 신부 측 부모: 기본 5천만 + 혼인 1억 = 1.5억{"\n"}
        · 합계: 3억원까지 세금 없이 가능
      </GreenBox>

      <Divider />

      <H2>세율은 10~50% 누진세예요</H2>
      <p style={body}>
        공제를 빼고 남은 금액(과세표준)에 세율을 적용해요. 금액이 클수록 세율이 높아지는 누진세 구조예요.
      </p>

      <SectionBadge>증여세 세율표</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>과세표준</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>세율</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>누진공제</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1억원 이하", "10%", "-"],
              ["1억 초과~5억", "20%", "1,000만원"],
              ["5억 초과~10억", "30%", "6,000만원"],
              ["10억 초과~30억", "40%", "1억 6,000만원"],
              ["30억 초과", "50%", "4억 6,000만원"],
            ].map(([bracket, rate, deduct], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{bracket}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{rate}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{deduct}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>실제 계산 예시를 볼게요</H2>
      <p style={body}>
        부모님이 성인 자녀에게 5억원을 증여하는 경우예요.
      </p>

      <BorderBox>
        5억원 증여 시 세금 계산{"\n"}
        · 증여가액: 5억원{"\n"}
        · 증여공제: -5,000만원 (직계존속){"\n"}
        · 과세표준: 4억 5,000만원{"\n"}
        · 산출세액: 4.5억 x 20% - 1,000만원 = 8,000만원{"\n"}
        · 자진신고 공제(3%): -240만원{"\n"}
        · 납부세액: 7,760만원
      </BorderBox>

      <p style={body}>
        혼인 공제를 적용하면 과세표준이 3.5억으로 줄어서 세금이 6,000만원 - 1,000만원 = 5,000만원, 자진신고 후 4,850만원이에요. 약 2,900만원을 아끼는 셈이에요. <a href="/w/증여세-계산-세율-공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>증여세 계산기</a>에서 더 정확한 금액을 확인해보세요.
      </p>

      <Divider />

      <H2>신고는 3개월 안에 해야 해요</H2>
      <Steps steps={STEPS} />

      <Divider />

      <H2>이것도 증여세가 붙을 수 있어요</H2>
      <p style={body}>
        현금 이체만 증여가 아니에요. 아래 경우도 증여로 추정될 수 있어요.
      </p>

      <BorderBox>
        증여 추정 사례{"\n"}
        · 부모님한테 돈 빌리고 이자 안 내는 경우 (이자 상당액 증여 추정){"\n"}
        · 자금 출처 불분명한 부동산 취득 (출처 소명 못 하면 증여 추정){"\n"}
        · 시가보다 현저히 낮은 가격으로 매수 (시가와 차액에 증여세){"\n"}
        · 부모님 카드로 생활비를 넘는 고가 물품 구매
      </BorderBox>

      <p style={body}>
        부모님한테 빌린 돈이라면 <strong>차용증</strong>을 작성하고 실제로 이자를 지급한 기록을 남겨야 해요. 무이자 대여는 이자 상당액이 증여로 볼 수 있어요. 다만 연간 1천만원 이하의 이자 상당액은 과세하지 않아요.
      </p>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.8 }}>
        출처: <a href="https://www.law.go.kr/법령/상속세및증여세법" style={{ color: "#9ca3af" }}>상속세 및 증여세법</a> · <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6533&cntntsId=7960" style={{ color: "#9ca3af" }}>국세청</a> · <a href="https://www.hometax.go.kr" style={{ color: "#9ca3af" }}>홈택스</a>
      </p>
      <Disclaimer text="이 글은 2026년 3월 기준 상속세 및 증여세법을 참고했어요. 부동산 증여 시 시가 평가나 부담부증여 절세 전략은 세무사 상담을 추천해요." />
    </div>
  );
}
