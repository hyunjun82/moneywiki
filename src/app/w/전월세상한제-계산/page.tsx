"use client";

// Q1. 계약 갱신하는데 집주인이 보증금·월세를 올리겠다고 해서, 법적으로 얼마까지 올릴 수 있는지 확인하려는 세입자
// Q2. 내 현재 보증금·월세에 5%를 적용해서 집주인이 요구하는 인상이 적법한지 판단한다
// Q3. 계산 공식(×1.05), 보증금·월세 각각 적용, 반전세 계산, 전환율 상한(기준금리+2%), 신규계약 미적용
// Q4. GreenBox(계산 공식) + 비교표(보증금별·월세별 인상표) + BorderBox(주의사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, Disclaimer,
} from "@/components/article-ui";

const FAQS = [
  { q: "매년 5%씩 올릴 수 있나요?", a: "아니에요. 계약 갱신할 때만 적용되니까 보통 2년에 한 번 5%예요. 매년 5%가 아니라 갱신 시점에 한 번이에요." },
  { q: "보증금과 월세 합쳐서 5%인가요?", a: "아니에요. 보증금 5%, 월세 5% 각각 따로 계산해요. 합쳐서 5%가 아니에요. 보증금 3억이면 1,500만원, 월세 80만원이면 4만원 각각 계산해요." },
  { q: "집주인이 5% 넘게 올렸으면 어떻게 하나요?", a: "5%를 초과하는 부분은 법적으로 무효예요. 초과 금액은 안 내도 되고, 이미 냈다면 반환 청구가 가능해요. 임대차분쟁조정위원회(1644-7500)에 조정을 신청하거나, 법원에 소송을 제기할 수 있어요." },
  { q: "처음 계약하는 건데도 5% 제한이 있나요?", a: "신규 계약은 해당 없어요. 전월세상한제는 기존 계약을 갱신할 때만 적용돼요. 새 세입자와 처음 계약하는 거라면 집주인이 원하는 금액을 정할 수 있어요." },
  { q: "전환율이 뭔가요?", a: "보증금을 월세로 바꾸거나 반대로 바꿀 때 적용하는 비율이에요. 2026년 기준 한국은행 기준금리가 2.5%라면 전환율 상한은 4.5%(기준금리+2%)예요. 법정 상한 10% 중 낮은 쪽이 적용돼요." },
  { q: "계약갱신청구권과 무슨 관계가 있나요?", a: "계약갱신청구권을 행사하면 자동으로 전월세상한제가 적용돼요. 갱신 거절 사유가 없으면 집주인은 5%까지만 올릴 수 있어요. 두 제도는 세트로 움직여요." },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>임대차 · 전월세상한제 · 계산법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전월세상한제, 5% 인상 한도는?<br />
        보증금·월세·반전세 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "갱신하는데 집주인이 보증금을 올리겠다고 해요. 얼마까지 올릴 수 있는 거예요?"
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제7조</a>에 따라 갱신 시 보증금·월세 인상은 <strong>각각 5%까지만</strong> 가능해요. 계산은 현재 금액에 1.05를 곱하면 끝이에요.
      </p>

      <Divider />

      <H2>보증금 5% 인상 한도 계산이에요</H2>
      <p style={body}>
        공식은 아주 간단해요. 현재 보증금에 1.05를 곱하면 최대 갱신 보증금이 나와요.
      </p>

      <GreenBox>
        최대 갱신 보증금 = 현재 보증금 x 1.05{"\n\n"}
        간편 계산: 보증금 / 20 = 5% 인상액{"\n"}
        3억 / 20 = 1,500만원 → 최대 3억 1,500만원
      </GreenBox>

      <SectionBadge>보증금별 5% 인상 한도</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>현재 보증금</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>5% 인상액</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>최대 갱신 보증금</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1억", "500만원", "1억 500만원"],
              ["2억", "1,000만원", "2억 1,000만원"],
              ["3억", "1,500만원", "3억 1,500만원"],
              ["4억", "2,000만원", "4억 2,000만원"],
              ["5억", "2,500만원", "5억 2,500만원"],
            ].map(([current, increase, max], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{current}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{increase}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>월세 인상 한도도 5%로 같아요</H2>
      <p style={body}>
        월세도 동일하게 현재 월세에 1.05를 곱하면 돼요. 보증금과 별개로 따로 5%예요.
      </p>

      <SectionBadge>월세별 5% 인상 한도</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>현재 월세</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>5% 인상액</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>최대 갱신 월세</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["50만원", "2.5만원", "52.5만원"],
              ["80만원", "4만원", "84만원"],
              ["100만원", "5만원", "105만원"],
              ["120만원", "6만원", "126만원"],
              ["150만원", "7.5만원", "157.5만원"],
            ].map(([current, increase, max], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{current}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{increase}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>반전세는 보증금·월세 따로 계산해요</H2>
      <p style={body}>
        보증금 1억에 월세 80만원인 반전세라면, 보증금 5%와 월세 5%를 각각 별도로 계산해요. "합쳐서 5%"가 아니에요.
      </p>

      <BorderBox>
        반전세 갱신 계산 예시{"\n"}
        · 보증금: 1억 → 최대 1억 500만원 (500만원 인상){"\n"}
        · 월세: 80만원 → 최대 84만원 (4만원 인상){"\n"}
        · 집주인이 "보증금 그대로, 월세만 10만원 올릴게요" → 불가 (12.5% 인상이라 안 돼요)
      </BorderBox>

      <Divider />

      <H2>보증금↔월세 전환할 때 전환율이 있어요</H2>
      <p style={body}>
        전세를 월세로 바꾸거나 보증금을 줄이고 월세를 올리는 경우, 전환율 상한이 적용돼요.
      </p>

      <GreenBox>
        2026년 법정 전환율 상한{"\n"}
        = MIN(10%, 한국은행 기준금리 + 2%){"\n"}
        = MIN(10%, 2.5% + 2%) = 4.5%{"\n\n"}
        전환 월세 = 줄이는 보증금 x 4.5% / 12{"\n"}
        보증금 1억 → 월세로 전환 시: 1억 x 4.5% / 12 = 37.5만원/월
      </GreenBox>

      <p style={body}>
        전환할 때도 5% 상한은 적용돼요. 환산보증금(보증금 + 월세 x 100) 기준으로 5%를 초과하면 안 돼요. 더 자세한 내용은 <a href="/w/전월세상한제" style={{ color: "#1D9E75", textDecoration: "underline" }}>전월세상한제</a> 글에서 확인하세요.
      </p>

      <Divider />

      <H2>이 점은 꼭 기억하세요</H2>
      <Checklist items={[
        "갱신할 때만 적용 / 신규 계약은 5% 상한 없음",
        "보증금·월세 각각 따로 5% / 합산이 아님",
        "직전 계약 금액 기준 / 시세 기준이 아님",
        "2년마다 한 번 5% / 매년 5%가 아님",
        "초과 인상 부분은 법적으로 무효 / 안 내도 됨",
      ]} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.8 }}>
        출처: <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#9ca3af" }}>주택임대차보호법 제7조</a> · <a href="https://www.renthome.go.kr" style={{ color: "#9ca3af" }}>임대등록시스템</a>
      </p>
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법을 참고했어요. 상가 임대차는 별도 법률이 적용되니 확인하세요." />
    </div>
  );
}
