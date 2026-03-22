"use client";

// Q1. 이사를 앞두고 전입신고와 확정일자가 왜 필요한지, 둘의 차이가 뭔지 모르는 세입자
// Q2. 이사 당일 전입신고 + 확정일자를 모두 완료해서 보증금을 안전하게 보호한다
// Q3. 대항력 요건(전입신고+입주), 우선변제권 요건(+확정일자), 효력 발생 시점(다음날 0시), 미비 시 위험
// Q4. GreenBox(핵심 차이) + 비교표(대항력 vs 우선변제권) + Steps(확정일자 받는 절차) + BorderBox(경매 시나리오) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, Disclaimer,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "임대차 계약서 원본을 준비해요",
    desc: "확정일자는 계약서 원본에만 찍어줘요. 사본은 안 돼요. 계약서가 여러 부라면 다 가져가서 각각 도장을 받는 게 안전해요.",
    tip: "분실 대비로 계약서 사본도 따로 보관하세요",
  },
  {
    title: "주민센터에서 전입신고와 동시에 받아요",
    desc: "이사한 날 주민센터에 가서 전입신고를 하면서 '확정일자도 받을게요'라고 하면 돼요. 신분증과 계약서 원본을 제출하면 계약서에 날짜 확인 도장을 찍어줘요. 무료예요.",
    tip: "이사 당일이 가장 좋아요. 늦어질수록 우선변제권 발생이 밀려요",
  },
  {
    title: "온라인으로도 가능해요",
    desc: "대법원 인터넷등기소(iros.go.kr)에서 온라인으로 확정일자를 받을 수 있어요. 계약서를 스캔해서 업로드하면 돼요. 다만 전입신고는 정부24에서 별도로 해야 해요.",
    tip: "온라인 확정일자: 대법원 인터넷등기소(iros.go.kr)",
  },
  {
    title: "도장 찍힌 계약서를 잘 보관하세요",
    desc: "확정일자가 찍힌 계약서 원본은 계약 기간 내내 보관해야 해요. 나중에 경매 배당에서 우선변제권을 주장하려면 이 원본이 증거가 돼요.",
  },
];

const FAQS = [
  { q: "전입신고만 하면 보증금이 안전한가요?", a: "아니에요. 전입신고만 하면 대항력만 생겨요. 집주인이 바뀌어도 살 수 있는 권리는 있지만, 집이 경매로 넘어가면 은행이 먼저 가져가고 남는 돈에서만 보증금을 받게 돼요. 확정일자까지 받아야 은행보다 먼저 받을 수 있어요." },
  { q: "확정일자는 언제 받는 게 가장 좋아요?", a: "이사하는 날 전입신고와 동시에 받는 게 최고예요. 전입신고 다음 날 0시에 대항력과 우선변제권이 동시에 생기거든요. 확정일자를 늦게 받으면 그만큼 우선변제권 발생이 밀려요." },
  { q: "계약서 쓰자마자 확정일자 받아도 되나요?", a: "네. 계약서 작성 직후 바로 받을 수 있어요. 다만 전입신고와 입주가 아직 안 된 상태라면 우선변제권은 세 가지 요건(입주+전입신고+확정일자)이 모두 갖춰진 다음 날부터 생겨요." },
  { q: "전세보증보험이 있으면 확정일자 안 받아도 되나요?", a: "전세보증보험과 확정일자는 별개예요. 보증보험은 집주인이 보증금을 못 돌려줄 때 보험사가 대신 주는 거고, 확정일자는 경매에서 우선순위를 확보하는 거예요. 둘 다 하는 게 가장 안전해요." },
  { q: "다음 날 0시가 정확히 무슨 뜻이에요?", a: "1월 15일에 전입신고를 했다면 1월 16일 0시 0분 0초부터 대항력이 생긴다는 뜻이에요. 1월 15일 오후 3시에 근저당이 잡히면 근저당이 먼저예요. 1월 16일 이후에 잡힌 근저당보다는 내가 우선이에요." },
  { q: "소액임차인이면 확정일자 없어도 보호받나요?", a: "소액임차인 최우선변제권은 확정일자 없이도 인정돼요. 서울 기준 보증금 1억 6,500만원 이하면 5,500만원까지 최우선변제를 받을 수 있어요. 다만 이건 소액에 해당하는 경우만이고, 금액이 큰 전세는 반드시 확정일자가 필요해요." },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>임대차 · 전입신고 · 보증금 보호</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전입신고와 확정일자, 뭐가 다르나요?<br />
        대항력·우선변제권 차이와 효력
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "전입신고만 하면 되는 줄 알았는데, 확정일자도 받아야 한다고요?"
      </p>
      <p style={body}>
        전입신고와 확정일자는 완전히 다른 절차예요. 전입신고는 <strong>대항력</strong>(계약 유지 권리)을, 확정일자는 <strong>우선변제권</strong>(경매 시 보증금 우선 회수)을 만들어줘요. 둘 중 하나만 하면 보증금이 위험해질 수 있어서, 이사 당일 둘 다 해야 해요.
      </p>

      <Divider />

      <H2>핵심 차이부터 정리할게요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법</a>에서 세입자를 보호하는 두 가지 무기가 대항력과 우선변제권이에요.
      </p>

      <SectionBadge>대항력 vs 우선변제권</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>대항력</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>우선변제권</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["필요 요건", "입주 + 전입신고", "입주 + 전입신고 + 확정일자"],
              ["효력 발생", "다음 날 0시", "다음 날 0시"],
              ["보호 내용", "집주인 바뀌어도 계약 유지", "경매 시 보증금 우선 회수"],
              ["없으면?", "새 집주인이 퇴거 요구 가능", "은행이 먼저 가져가고 남은 돈만"],
              ["비용", "무료", "무료"],
            ].map(([label, daehang, woosun], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{daehang}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 600 }}>{woosun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        전입신고만 하면 → 살 수 있지만 경매에서 보증금 못 받을 수 있음{"\n"}
        전입신고 + 확정일자 → 살 수도 있고, 경매에서 보증금도 우선 받음
      </GreenBox>

      <Divider />

      <H2>확정일자 없으면 경매에서 이렇게 돼요</H2>
      <p style={body}>
        구체적인 예시로 확인해보세요. 같은 집인데 확정일자 유무에 따라 결과가 완전히 달라져요.
      </p>

      <BorderBox>
        집값 5억, 경매 낙찰가 5억{"\n"}
        은행 근저당: 4억 / 내 보증금: 2억{"\n\n"}
        확정일자 O (근저당보다 먼저): 내가 2억 먼저 받고, 은행 3억{"\n"}
        확정일자 O (근저당보다 늦음): 은행 4억 먼저, 나는 1억만{"\n"}
        확정일자 X: 은행 4억 먼저, 남은 1억을 다른 채권자와 나눔 → 전액 못 받을 수 있음
      </BorderBox>

      <p style={body}>
        확정일자를 받은 날짜가 은행 근저당 설정일보다 빠르면 내가 먼저 받아요. 그래서 <strong>이사 당일</strong>에 확정일자를 받는 게 가장 안전한 거예요. 계약 후 시간이 지날수록 중간에 근저당이 설정될 위험이 커져요.
      </p>

      <Divider />

      <H2>확정일자 받는 방법, 간단해요</H2>
      <p style={body}>
        주민센터에서 전입신고하면서 동시에 받으면 돼요. 온라인으로도 가능해요.
      </p>
      <Steps steps={STEPS} />

      <Divider />

      <H2>대항력 발생 시점, 이것만 기억하세요</H2>
      <p style={body}>
        "다음 날 0시"라는 게 왜 중요할까요? 같은 날 오후에 근저당이 설정되면 근저당이 먼저예요.
      </p>

      <BorderBox>
        1월 15일 오전: 이사 + 전입신고 + 확정일자{"\n"}
        1월 15일 오후 3시: 집주인이 은행 근저당 설정{"\n"}
        → 근저당이 먼저 (같은 날은 근저당이 우선){"\n\n"}
        1월 16일 0시: 내 대항력 + 우선변제권 발생{"\n"}
        → 1월 16일 이후 설정된 근저당보다는 내가 우선
      </BorderBox>

      <p style={body}>
        그래서 계약 전에 <a href="/w/전세보증보험" style={{ color: "#1D9E75", textDecoration: "underline" }}>전세보증보험</a>에 가입하고, 이사 전에 등기부등본을 한 번 더 떼서 근저당이 새로 잡히지 않았는지 확인하는 게 중요해요.
      </p>

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.8 }}>
        출처: <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#9ca3af" }}>주택임대차보호법</a> · <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=629&ccfNo=2&cciNo=3&cnpClsNo=1" style={{ color: "#9ca3af" }}>찾기쉬운 생활법령정보</a> · <a href="https://www.khug.or.kr/jeonse/web/s03/s030301.jsp" style={{ color: "#9ca3af" }}>주택도시보증공사</a>
      </p>
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법을 참고했어요. 상가 임대차는 상가건물임대차보호법이 별도로 적용돼요." />
    </div>
  );
}
