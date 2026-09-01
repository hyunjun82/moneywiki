"use client";
// Q1. 분양 당첨됐는데 사정이 생겨서 팔고 싶거나, 분양권을 사려는데 전매 제한이 언제 풀리는지 모르겠는 상황
// Q2. 내 분양권이 전매 가능한 시점인지 확인하고, 전매 절차와 세금까지 파악해서 실행한다
// Q3. 지역·유형별 전매 제한 기간, 예외 사유, 전매 절차 5단계, 양도소득세율(보유기간별), 프리미엄
// Q4. 비교표(규제/비규제) + Steps(절차) + GreenBox(세금 계산 예시) + BorderBox(예외 사유) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS_DATA = [
  {
    title: "전매 가능 시점을 먼저 확인하세요",
    desc: "입주자모집공고문에 전매 제한 기간이 적혀 있어요. 규제지역·분양가상한제 적용 여부에 따라 6개월~3년까지 달라지니까 반드시 공고문부터 확인하세요. 모르겠으면 시행사(건설사)에 전화해서 물어보는 게 가장 정확해요.",
    tip: "기준은 당첨자 발표일(계약일 아님)",
  },
  {
    title: "매수인을 찾고 매매계약서를 써요",
    desc: "부동산 중개업소를 통해 매수인을 찾고 분양권 매매계약서를 작성해요. 매매대금(프리미엄 포함), 잔금일, 중도금 대출 승계 여부를 명확히 적으세요. 계약금은 통상 10% 정도예요.",
  },
  {
    title: "시행사에서 명의변경을 해요",
    desc: "매도인과 매수인이 함께 시행사(건설사)를 방문해서 명의변경 신청서를 작성하세요. 명의변경 수수료는 보통 10~30만 원이에요. 명의변경 완료 확인 전에 잔금을 주면 안 돼요.",
    tip: "명의변경 확인 후 잔금 지급이 원칙",
  },
  {
    title: "잔금을 정산하세요",
    desc: "매수인이 매도인에게 잔금을 지급하고, 매도인은 지금까지 납부한 분양대금을 정산해요. 남은 중도금·잔금은 매수인이 승계하게 돼요. 중도금 대출이 있다면 승계 가능 여부를 미리 은행에 확인하세요.",
  },
  {
    title: "양도소득세를 신고하세요",
    desc: "매도인은 양도일이 속한 달의 말일부터 2개월 이내에 홈택스(hometax.go.kr)에서 신고해야 해요. 보유기간에 따라 세율이 크게 달라지니까 미리 계산하고 파는 게 중요해요.",
    link: { label: "홈택스 바로가기", href: "https://www.hometax.go.kr" },
  },
];

const CHECKLIST = [
  "입주자모집공고문에서 전매 제한 기간 확인",
  "규제지역 여부 / 분양가상한제 적용 여부 확인",
  "보유기간 계산 (1년/2년 기준으로 세율 차이 큼)",
  "중도금 대출 승계 가능 여부 은행에 확인",
  "명의변경 완료 후 잔금 지급 (순서 반드시 지키기)",
];

const FAQS = [
  {
    q: "규제지역에서는 절대 못 파나요?",
    a: "거의 못 팔아요. 소유권이전등기 전까지 전매 금지라서 입주할 때까지 기다려야 해요. 다만 해외 이주, 상속, 직장 이전, 이혼 같은 예외 사유가 있으면 한국부동산원에 전매 허가를 신청할 수 있어요.",
  },
  {
    q: "1년 안에 팔면 세금이 70%라고요?",
    a: "네, 분양권을 1년 미만 보유하고 팔면 양도차익의 70%가 세금이에요. 1~2년은 60%, 2년 이상이면 기본세율(6~45%)이 적용돼요. 세금 차이가 어마어마하니까 최소 2년은 들고 있는 게 유리해요.",
  },
  {
    q: "프리미엄(웃돈)이 마이너스일 수도 있나요?",
    a: "네, 마이너스 프리미엄(마피)이라고 해요. 입주 시점에 시세가 분양가보다 떨어지면 분양가보다 싸게 파는 거예요. 이 경우 양도소득세는 안 나오지만, 본인이 손해를 보는 거죠.",
  },
  {
    q: "분양권 살 때 취득세를 내나요?",
    a: "분양권 자체에는 취득세가 없어요. 나중에 입주해서 건물을 취득할 때 취득세를 내요. 단, 프리미엄 포함 총액이 취득가액이 되니까 취득세 계산 시 참고하세요.",
  },
  {
    q: "불법 전매하면 어떻게 되나요?",
    a: "3년 이하 징역 또는 3천만 원 이하 벌금이에요. 당첨 자체가 취소되고 향후 10년간 청약 신청도 제한돼요. 불법 전매는 매수인도 처벌 대상이에요.",
  },
  {
    q: "명의변경 수수료는 누가 내나요?",
    a: "보통 매수인이 내요. 시행사마다 다르지만 10~30만 원 수준이에요. 계약서에 누가 부담할지 명시해 두면 분쟁을 예방할 수 있어요.",
  },
];

const SOURCES = [
  { name: "주택법 제64조", href: "https://www.law.go.kr/법령/주택법" },
  { name: "국토교통부", href: "https://www.molit.go.kr" },
  { name: "국토부 실거래가 공개시스템", href: "https://rt.molit.go.kr" },
];

const RELATED = [
  { slug: "양도소득세-계산", title: "양도소득세 계산 방법", description: "부동산 양도차익에 붙는 세금 계산법." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 납부", description: "집 살 때 취득세 세율과 기한 정리." },
  { slug: "청약저축-청약예금-전환-방법-조건", title: "청약저축 전환 방법", description: "청약통장 전환 조건과 절차 안내." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 분양권 · 전매</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        분양권, 언제부터 팔 수 있나요?<br />
        전매 제한 기간·절차·세금까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "당첨됐는데 사정이 생겼어요. 다른 사람한테 넘길 수 있나요?"
      </p>
      <p style={body}>
        분양권 전매는 당첨된 아파트 입주권을 다른 사람에게 파는 거예요.
        그런데 아무 때나 팔 수 없어요. <a href="https://www.law.go.kr/법령/주택법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택법 제64조</a>에서 정한 전매 제한 기간이 있고, 지역마다 완전히 달라요.
        모르고 팔면 <strong>3년 이하 징역</strong>이니까 반드시 확인하고 움직이세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 전매 제한 기간 비교 */}
      <H2>규제지역이냐 비규제지역이냐에 따라 완전히 달라요</H2>
      <p style={body}>
        2023년 대폭 완화된 이후로 비규제지역은 6개월~1년이면 전매 가능해요.
        그런데 규제지역(투기과열지구·조정대상지역)은 여전히 제한이 강해요.
      </p>

      <SectionBadge>전매 제한 기간 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>지역 유형</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>수도권</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>비수도권</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["규제지역 + 분양가상한제", "3년", "1년"],
              ["규제지역 (상한제 미적용)", "소유권이전등기 전까지", "소유권이전등기 전까지"],
              ["과밀억제권역", "1년", "-"],
              ["비규제 공공택지", "1년", "6개월"],
              ["비규제 민영주택", "6개월", "6개월"],
              ["비수도권 그 외", "-", "제한 없음"],
            ].map(([type, metro, non], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: i < 2 ? 600 : 400 }}>{type}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: i < 2 ? "#dc2626" : "#374151" }}>{metro}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: i < 2 ? "#dc2626" : "#374151" }}>{non}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        기준 시점은 <strong>당첨자 발표일</strong>이에요. 계약일이 아니라 당첨일부터 계산하니까 헷갈리면 시행사에 문의하세요.
        입주자모집공고문에 전매 제한 기간이 명시되어 있으니 공고문을 꼭 꺼내 보세요.
      </p>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 예외 사유 */}
      <H2>규제지역이라도 팔 수 있는 예외가 있어요</H2>
      <p style={body}>
        "돈이 급해서"는 안 돼요. 법에서 정한 특별한 사유만 인정해요.
        해당 사유가 있으면 한국부동산원에 전매 허가를 신청할 수 있어요.
      </p>

      <BorderBox>
        <strong>전매 허용 예외 사유 (주택법 제64조)</strong>{"\n\n"}
        · 해외 이주 (이민){"\n"}
        · 세대원 전원 2년 이상 해외 체류{"\n"}
        · 상속 (분양권자 사망){"\n"}
        · 직장 이전 (다른 시/도로 이전, 출퇴근 곤란){"\n"}
        · 혼인 합가 (결혼으로 세대 합침){"\n"}
        · 이혼 (분양권 분할 필요){"\n\n"}
        신청처: 한국부동산원 → 관련 서류 제출 → 심사 후 승인
      </BorderBox>

      <p style={body}>
        예외 사유에 해당하면 서류를 갖춰서 한국부동산원에 제출하세요.
        심사 기간은 보통 2~4주 정도 걸려요.
        예외로 전매가 가능하다면 이제 실제 절차를 알아야 하죠.
      </p>

      <Divider />

      {/* H2-3: 전매 절차 */}
      <H2>분양권 전매, 이 순서대로 진행해요</H2>
      <p style={body}>
        전매 가능 시점이 됐다면 아래 5단계를 밟으면 돼요.
        가장 중요한 건 <strong>명의변경 확인 후 잔금 지급</strong>이에요. 순서를 바꾸면 사고가 나요.
      </p>

      <Steps steps={STEPS_DATA} />

      <SectionBadge>전매 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* H2-4: 세금 */}
      <H2>프리미엄 1억 받아도 세금 내면 얼마 안 남을 수 있어요</H2>
      <p style={body}>
        분양권 전매 차익에는 양도소득세가 붙어요.
        보유기간이 짧을수록 세율이 높아서, 1년 미만이면 차익의 70%를 세금으로 내야 해요.
      </p>

      <SectionBadge>보유기간별 양도소득세율</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>보유기간</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>세율</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1년 미만", "70%", "차익 대부분이 세금"],
              ["1년~2년 미만", "60%", "여전히 높은 세율"],
              ["2년 이상", "6~45%", "기본세율(누진) 적용"],
            ].map(([period, rate, note], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{period}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: i === 0 ? "#dc2626" : "#1D9E75" }}>{rate}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        세금 계산 예시{"\n\n"}
        분양가 5억, 매도가 6억 (프리미엄 1억) / 필요경비 500만 원{"\n"}
        양도차익: 6억 - 5억 - 500만 = 9,500만 원{"\n\n"}
        · 1년 미만 보유: 9,500만 x 70% = 6,650만 + 지방세 665만 ≒ 총 7,315만 원{"\n"}
        · 2년 이상 보유: 기본세율 약 35% ≒ 총 2,750만 원{"\n\n"}
        차이만 4,500만 원 이상. 최소 2년은 들고 있는 게 유리해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        분양권 전매에서 실제로 헷갈리는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 주택법 기준으로 작성했어요. 전매 제한 기간과 세율은 정책 변경·지역 지정 해제에 따라 달라질 수 있으니 입주자모집공고문과 국토교통부 공지를 함께 확인해 주세요." />
    </ArticleLayout>
  );
}
