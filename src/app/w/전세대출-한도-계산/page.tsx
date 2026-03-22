"use client";

// Q1. 전세 계약을 앞두고 보증금이 부족한데, 내가 전세대출을 얼마나 받을 수 있는지 모르는 상황
// Q2. 내 조건(소득, 나이, 지역)에 맞는 전세대출 상품을 확인하고 한도를 계산한다
// Q3. 계산 공식(MIN(보증금×80%, 최대한도)), 상품별 한도(청년버팀목 2억, 신혼부부 3억), 소득·나이 조건, 전세가율 영향
// Q4. GreenBox(계산 공식) + 비교표(상품별 한도) + EligibilityChecker(자격 확인) + Steps(신청 절차) + FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, Disclaimer,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "전세 계약서를 먼저 작성해요",
    desc: "은행에 대출 신청하려면 확정일자를 받은 전세계약서가 필요해요. 계약서에 보증금, 계약기간, 주소가 정확히 기재돼야 하고, 전입신고 전이라도 계약서만으로 신청 자체는 가능해요.",
    tip: "대출 실행 전에는 전입신고 + 확정일자 필수",
  },
  {
    title: "은행 앱이나 창구에서 신청해요",
    desc: "주택도시기금 대출은 우리은행, 국민은행, 농협 등에서 취급해요. 은행 앱에서 온라인 신청이 가능하고, 신분증·소득증빙·전세계약서·재직증명서를 업로드하면 돼요. 심사는 보통 2~3일 걸려요.",
    tip: "중소기업 재직자는 중소기업확인서도 함께 제출하면 금리 우대",
  },
  {
    title: "HUG 전세보증보험에 가입해요",
    desc: "청년버팀목·신혼부부 전세대출은 HUG 보증보험 가입이 필수예요. 보험료는 보증금의 약 0.128%로, 보증금 2억이면 연 25만원 수준이에요. 보증보험에 가입하면 집주인이 보증금을 못 돌려줘도 HUG에서 대신 반환해줘요.",
    tip: "전세보증보험은 전세사기 방지의 핵심 안전장치예요",
  },
  {
    title: "대출이 실행돼요",
    desc: "심사 승인 후 전입신고·확정일자 서류를 은행에 제출하면 대출금이 집주인 계좌로 직접 입금돼요. 보증금 잔금일에 맞춰 실행하는 게 일반적이에요.",
  },
];

const FAQS = [
  { q: "전세대출 한도는 어떻게 계산하나요?", a: "보증금의 80%와 상품별 최대 한도 중 적은 금액이에요. 보증금 3억이면 80%인 2.4억이 되고, 청년버팀목 최대한도 2억이니까 2억까지 받을 수 있어요. 신혼부부 상품이면 수도권 3억 한도라서 2.4억까지 가능하고요." },
  { q: "DSR 40%가 전세대출에도 적용되나요?", a: "2026년 현재 전세대출은 DSR 산정에서 제외돼요. 다만 정부가 규제 강화를 검토 중이어서 향후 바뀔 수 있어요. 기존 주담대나 신용대출이 있으면 은행 자체 심사에서 한도가 줄어들 수 있어요." },
  { q: "만 25세 미만이면 한도가 다른가요?", a: "청년버팀목 기준으로 만 25세 미만 단독세대주는 최대 한도가 1.5억으로 줄어요. 25세 이상이면 2억까지 가능해요." },
  { q: "전세가율이 높으면 왜 한도가 줄어드나요?", a: "집값 대비 전세보증금 비율이 90% 이상이면 갭이 너무 적어서 위험하다고 판단해요. 보증기관(HUG·SGI)에서 보증 자체를 거절하거나 LTV를 70~60%로 낮출 수 있어서 한도가 줄어들어요." },
  { q: "보증금을 은행 대출 없이 채울 수 있나요?", a: "부모님께 빌리거나 퇴직금으로 충당하는 분도 있지만, 자금 출처가 불분명하면 증여세 이슈가 생길 수 있어요. 5천만원 넘는 금액은 차용증을 작성하고 이자를 지급한 기록을 남기는 게 안전해요." },
  { q: "전세대출 받으면 중도상환 수수료가 있나요?", a: "주택도시기금 대출(청년버팀목·신혼부부)은 중도상환 수수료가 없어요. 은행 자체 전세대출은 1~2% 수수료가 붙을 수 있으니 상품별로 확인하세요." },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>전세대출 · 한도 · 계산법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전세대출 한도, 나는 얼마까지?<br />
        계산법부터 상품별 조건까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "보증금이 2억인데, 대출은 얼마까지 받을 수 있는 거예요?"
      </p>
      <p style={body}>
        전세대출 한도는 딱 하나의 공식으로 결정돼요. <strong>보증금의 80%</strong>와 <strong>상품별 최대 한도</strong> 중 적은 금액이에요. 여기에 소득·나이·지역 조건이 추가로 붙고요. 아래에서 내 상황에 맞는 한도를 바로 확인해보세요.
      </p>

      <Divider />

      <H2>전세대출 한도, 이 공식 하나면 돼요</H2>
      <p style={body}>
        복잡하게 생각할 필요 없어요. 공식은 딱 이거예요.
      </p>

      <GreenBox>
        전세대출 한도 = MIN(보증금 x 80%, 상품 최대한도){"\n\n"}
        보증금 2억 + 청년버팀목 → MIN(1.6억, 2억) = 1.6억{"\n"}
        보증금 3억 + 청년버팀목 → MIN(2.4억, 2억) = 2억{"\n"}
        보증금 3.5억 + 신혼부부(수도권) → MIN(2.8억, 3억) = 2.8억
      </GreenBox>

      <p style={body}>
        보증금이 작으면 80%가 한도를 결정하고, 보증금이 크면 상품 최대한도가 한도를 결정해요. 어느 쪽이든 적은 금액이 내 한도예요.
      </p>

      <Divider />

      <H2>상품별 한도와 조건이 달라요</H2>
      <p style={body}>
        <a href="https://nhuf.molit.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택도시기금</a> 전세대출은 크게 세 가지예요. 내 조건에 맞는 상품을 찾으세요.
      </p>

      <SectionBadge>2026년 전세대출 상품 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>상품</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>최대한도</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>소득 조건</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>나이</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["청년버팀목", "2억 (25세 미만 1.5억)", "5천만원 이하", "만 19~34세"],
              ["신혼부부 (수도권)", "3억", "부부합산 7천만원 이하", "혼인 7년 이내"],
              ["신혼부부 (지방)", "2억", "부부합산 7천만원 이하", "혼인 7년 이내"],
              ["일반 버팀목", "수도권 1.2억 / 기타 8천", "5천만원 이하", "제한 없음"],
            ].map(([product, limit, income, age], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{product}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{limit}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{income}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        순자산 3.61억원 이하, 무주택 세대구성원이어야 하는 건 모든 상품 공통이에요. <a href="/w/중소기업-청년-전세대출-소득기준" style={{ color: "#1D9E75", textDecoration: "underline" }}>중소기업 재직 청년</a>이면 금리 0.4%p 우대도 받을 수 있어요.
      </p>

      <Divider />

      <H2>전세가율이 높으면 한도가 줄어요</H2>
      <p style={body}>
        집값 대비 전세보증금 비율을 전세가율이라고 해요. 이 비율이 80~90%를 넘으면 보증기관에서 위험하다고 판단해서 보증을 거절하거나 LTV를 낮출 수 있어요.
      </p>

      <BorderBox>
        전세가율에 따른 LTV 변화{"\n"}
        · 전세가율 70% 이하: LTV 80% 정상 적용{"\n"}
        · 전세가율 80% 초과: 보증기관 심사 강화, LTV 70%로 하향 가능{"\n"}
        · 전세가율 90% 이상: 보증 거절 가능성 높음 → 깡통전세 주의
      </BorderBox>

      <p style={body}>
        전세가율이 90% 넘는 매물은 <a href="/w/전세보증보험" style={{ color: "#1D9E75", textDecoration: "underline" }}>전세보증보험</a> 가입 자체가 안 될 수 있어요. 보증보험 없이는 전세대출도 불가능하니까, 계약 전에 반드시 집값 대비 전세 비율을 확인하세요.
      </p>

      <Divider />

      <H2>신청은 이 순서로 해요</H2>
      <p style={body}>
        전세대출은 전세 계약 → 은행 신청 → 보증보험 가입 → 전입신고 → 대출 실행 순서예요. 잔금일에 맞춰서 진행하면 돼요.
      </p>
      <Steps steps={STEPS} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.8 }}>
        출처: <a href="https://nhuf.molit.go.kr" style={{ color: "#9ca3af" }}>주택도시기금</a> · <a href="https://www.hf.go.kr" style={{ color: "#9ca3af" }}>한국주택금융공사</a> · <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#9ca3af" }}>주택임대차보호법</a>
      </p>
      <Disclaimer text="이 글은 2026년 3월 기준 주택도시기금 대출 조건을 참고했어요. 은행별로 세부 조건이 다를 수 있으니 신청 전 해당 은행에 확인하세요." />
    </div>
  );
}
