"use client";
// Q1. 5세대 실손보험 출시 소식을 듣고 기존 4세대와 보험료 차이가 궁금한 상황
// Q2. 4세대 vs 5세대 보험료·보장 차이를 비교해서 갈아탈지 유지할지 판단한다
// Q3. 세대별 보험료 수준, 자기부담률, 비급여 보장 범위, 갈아타기 손익분기점
// Q4. CompareTable(4세대 vs 5세대) + GreenBox(판단 기준) + EligibilityChecker(갈아타기 체크) + FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const COMPARE_ROWS = [
  { label: "보험료 수준", gen4: "월 3~8만원대", gen5: "월 1.5~4만원대 (30~50% 저렴)" },
  { label: "급여 자기부담", gen4: "입원 20%, 외래 20%", gen5: "입원 20%, 외래 건보 본인부담률 연동" },
  { label: "비급여 자기부담", gen4: "30%", gen5: "중증 30%, 비중증 50%" },
  { label: "연간 보장한도", gen4: "5,000만원", gen5: "1,000만원" },
  { label: "입원 보장한도", gen4: "한도 없음", gen5: "회당 300만원" },
  { label: "비급여 구분", gen4: "비급여 통합", gen5: "중증/비중증 분리" },
  { label: "임신·출산 보장", gen4: "미보장", gen5: "급여 의료비 보장" },
  { label: "할인·할증", gen4: "비급여 이용량 기반", gen5: "비급여 이용량 기반 (강화)" },
];

const ELIGIBILITY = [
  { id: "low", label: "연간 병원비가 100만원 이하인 편이다" },
  { id: "noncov", label: "도수치료·비급여 주사 등 비중증 비급여를 거의 안 쓴다" },
  { id: "premium", label: "현재 4세대 보험료 부담이 크다 (월 5만원 이상)" },
  { id: "young", label: "나이가 40세 미만이라 갱신 보험료 인상 부담이 크다" },
];

const FAQS = [
  {
    q: "5세대 실손보험은 언제부터 가입할 수 있나요?",
    a: "2026년 상반기 출시가 예정되어 있어요. 금융위원회에서 세부 약관을 확정하면 각 보험사에서 판매를 시작해요. 기존 4세대 가입자도 전환 신청이 가능할 예정이에요.",
  },
  {
    q: "4세대에서 5세대로 갈아타면 보험료가 진짜 절반 되나요?",
    a: "30~50% 저렴해지는 건 맞지만, 비급여 보장이 줄어드는 걸 감안해야 해요. 비중증 비급여 자기부담이 30%에서 50%로 늘어나서, 도수치료나 비급여 주사를 자주 받는 분은 실질 부담이 더 클 수 있어요.",
  },
  {
    q: "연간 보장한도가 1,000만원이면 큰 병 걸리면 어떡하나요?",
    a: "중증질환(암, 뇌혈관, 심장)의 급여 부분은 건강보험이 대부분 커버해요. 5세대 실손은 보충 역할이라 1,000만원으로도 대부분의 경우 충분해요. 다만 장기 입원이 필요한 희귀질환은 별도 보험을 검토하는 게 좋아요.",
  },
  {
    q: "기존 1~3세대 실손 가입자도 5세대로 전환 가능한가요?",
    a: "가능해요. 다만 기존 세대 실손은 보장 범위가 넓은 대신 보험료가 비싸요. 전환하면 보험료는 내려가지만 보장이 축소되니까, 본인 의료비 패턴을 먼저 따져보세요.",
  },
  {
    q: "5세대 실손에서 비중증 비급여란 뭔가요?",
    a: "도수치료, 체외충격파, 비급여 주사(프롤로, 인대강화) 같은 항목이에요. 생명에 직결되지 않는 비급여 치료를 말하고, 자기부담률이 50%로 높아져요. 중증 비급여(항암제, 로봇수술 등)는 30%로 유지돼요.",
  },
  {
    q: "보험료가 저렴하면 나중에 갱신할 때 많이 오르지 않나요?",
    a: "4세대보다 손해율이 낮게 설계됐기 때문에 갱신 시 인상폭도 상대적으로 작을 것으로 예상돼요. 비급여 남용을 줄이는 구조라 보험사 입장에서도 손해율 관리가 유리하거든요.",
  },
];

const RELATED = [
  { slug: "5세대-실손보험-가입-조건", title: "5세대 실손보험 가입 조건", description: "신규 가입과 전환 신청 방법." },
  { slug: "실손보험-청구-방법", title: "실손보험 청구 방법", description: "앱으로 간편 청구하는 절차." },
  { slug: "실손보험-보장-범위", title: "실손보험 보장 범위", description: "급여·비급여 보장 항목 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>보험 · 실손보험 · 보험료 비교</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        5세대 실손보험, 보험료가 절반이라는데?<br />
        4세대와 보장·보험료 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "실손보험 보험료가 매달 올라서 부담되는데, 5세대로 바꾸면 정말 싸지나요?"
      </p>
      <p style={body}>
        5세대 실손보험은 4세대보다 <strong>보험료가 30~50% 저렴</strong>해요.
        대신 비급여 자기부담률이 올라가고 연간 보장한도가 줄어들었어요.
        병원을 자주 가는 분에게는 오히려 불리할 수 있고, 건강한 분에게는 확실히 이득이에요.
        내 상황에 맞는 선택을 하려면 구체적인 차이를 알아야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>4세대 vs 5세대, 보험료와 보장 비교</H2>
      <p style={body}>
        <a href="https://www.fsc.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융위원회</a> 발표 기준으로 5세대 실손보험의 핵심 변화를 비교했어요.
        가장 큰 차이는 비급여를 중증과 비중증으로 나눈 것, 그리고 연간 보장한도를 대폭 줄인 거예요.
      </p>

      <SectionBadge>세대별 보장 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>4세대</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>5세대</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{row.label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{row.gen4}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 600 }}>{row.gen5}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        5세대의 가장 큰 장점은 보험료예요. 30대 기준 월 1.5~2만원대로 떨어질 수 있어요. 반면 연간 보장한도가 5,000만원에서 1,000만원으로 크게 줄었고, 병의원 입원도 회당 300만원 한도가 생겼어요.
      </p>

      <CategoryButton label="보험 정보" count={8} href="/category/보험" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>나한테는 5세대가 유리할까?</H2>
      <p style={body}>
        보험료만 보면 5세대가 확실히 유리하지만, 비급여 이용이 많은 분은 다를 수 있어요. 아래 항목에 3개 이상 해당하면 5세대 전환이 유리한 편이에요.
      </p>

      <SectionBadge>갈아타기 판단 체크</SectionBadge>
      <EligibilityChecker
        items={ELIGIBILITY}
        allMatchText="5세대 전환이 유리해요. 보험료 절감 효과가 크고 보장 축소의 영향이 작아요."
        partialMatchText="일부 항목은 해당되지만, 비급여 이용 패턴을 꼼꼼히 따져보세요."
      />

      <GreenBox>
        갈아타기 손익분기점{"\n"}
        연간 병원비 100만원 이하 → 5세대가 유리 (보험료 절감 효과가 큼){"\n"}
        연간 병원비 200만원 이상 → 4세대 유지 검토 (비급여 자기부담 증가분 확인){"\n"}
        도수치료 월 2회 이상 → 4세대 유지가 나을 가능성 높음
      </GreenBox>

      <Divider />
      <ArticleAd position="mid" />

      <H2>5세대 전환 전에 이것만 확인하세요</H2>
      <p style={body}>
        전환을 결정했다면 현재 보험의 보장 내역을 꼼꼼히 확인하고, 특약이 있는지도 체크해야 해요. 전환하면 기존 보험의 특약도 함께 사라지는 경우가 있어요.
      </p>

      <Checklist items={[
        "현재 4세대 월 보험료 확인 / 보험사 앱에서 조회",
        "최근 1년 병원비 총액 계산 / 비급여 비중 파악",
        "기존 보험 특약 목록 확인 / 전환 시 소멸 여부 체크",
        "5세대 출시 후 보험사별 보험료 비교 / 최소 3곳 견적",
        "전환 시 보장 공백 기간 확인 / 무보장 기간 없도록 주의",
      ]} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />

      <Disclaimer text="이 글은 2026년 3월 기준 금융위원회 발표 내용을 바탕으로 작성했어요. 5세대 실손보험의 세부 약관은 출시 시점에 변경될 수 있어요." />
    </ArticleLayout>
  );
}
