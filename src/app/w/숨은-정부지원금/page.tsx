"use client";

/*
 * Q1: 정부지원금이 있다는 건 알지만 어떤 게 있는지 몰라서 못 받고 있는 상황
 * Q2: 17가지 지원금 중 본인에게 해당되는 것을 찾아서 신청한다
 * Q2-1: 각 지원금 개별 글 → 해당 정부 신청 페이지
 * Q3: 지원금 종류, 대상자, 금액, 신청처
 * Q4: 리스트형 카드 (정부공감 스타일) + FAQ
 */

import Link from "next/link";
import { useState } from "react";
import { H2, FAQ, References, Disclaimer } from "@/components/article-ui";

const BENEFITS = [
  { num: "01", slug: "기본형-공익직불제", title: "기본형 공익직불제", who: "농업인", amount: "ha당 최대 205만원", grad: "linear-gradient(135deg, #2E7D32, #43A047)" },
  { num: "02", slug: "장애수당", title: "장애수당", who: "장애인", amount: "월 최대 6만원", grad: "linear-gradient(135deg, #1565C0, #1E88E5)" },
  { num: "03", slug: "장애인연금", title: "장애인연금", who: "중증장애인", amount: "월 최대 42만원", grad: "linear-gradient(135deg, #6A1B9A, #8E24AA)" },
  { num: "04", slug: "저소득-지역가입자-보험료-지원", title: "저소득 지역가입자 보험료 지원", who: "지역가입자", amount: "보험료 50%", grad: "linear-gradient(135deg, #00695C, #00897B)" },
  { num: "05", slug: "독거노인-장애인-응급안전안심서비스", title: "독거노인·장애인 응급안전안심서비스", who: "독거노인", amount: "무료 설치", grad: "linear-gradient(135deg, #E65100, #EF6C00)" },
  { num: "06", slug: "여성청소년-생리용품-지원", title: "여성청소년 생리용품 지원", who: "여성청소년", amount: "월 13,000원", grad: "linear-gradient(135deg, #AD1457, #D81B60)" },
  { num: "07", slug: "청소년복지시설-퇴소청소년-자립지원수당", title: "퇴소청소년 자립지원수당", who: "퇴소청소년", amount: "월 50만원", grad: "linear-gradient(135deg, #4527A0, #5E35B1)" },
  { num: "08", slug: "장애아동수당", title: "장애아동수당", who: "장애아동", amount: "월 최대 22만원", grad: "linear-gradient(135deg, #0277BD, #0288D1)" },
  { num: "09", slug: "위기청소년-특별지원", title: "위기청소년 특별지원", who: "위기청소년", amount: "연 최대 200만원", grad: "linear-gradient(135deg, #558B2F, #689F38)" },
  { num: "10", slug: "고용촉진장려금", title: "고용촉진장려금", who: "사업주", amount: "1인당 720만원", grad: "linear-gradient(135deg, #1B5E20, #2E7D32)" },
  { num: "11", slug: "임신-사전건강관리-지원사업", title: "임신 사전건강관리 지원", who: "예비부모", amount: "무료 검진", grad: "linear-gradient(135deg, #880E4F, #AD1457)" },
  { num: "12", slug: "농업인-건강연금보험료-지원", title: "농업인 건강·연금보험료 지원", who: "농업인", amount: "50% 지원", grad: "linear-gradient(135deg, #33691E, #558B2F)" },
  { num: "13", slug: "영농도우미-지원", title: "영농도우미 지원", who: "농가", amount: "일당 5만원", grad: "linear-gradient(135deg, #827717, #9E9D24)" },
  { num: "14", slug: "저소득-청소년한부모-아동양육-자립지원", title: "청소년한부모 아동양육·자립지원", who: "청소년한부모", amount: "월 35만원", grad: "linear-gradient(135deg, #BF360C, #D84315)" },
  { num: "15", slug: "저소득-청소년부모-아동양육비-지원", title: "청소년부모 아동양육비 지원", who: "청소년부모", amount: "월 20만원", grad: "linear-gradient(135deg, #4E342E, #6D4C41)" },
  { num: "16", slug: "다문화가족-자녀-교육활동비", title: "다문화가족 자녀 교육활동비", who: "다문화가족", amount: "교육비 지원", grad: "linear-gradient(135deg, #006064, #00838F)" },
  { num: "17", slug: "예술인-국민연금-보험료-지원", title: "예술인 국민연금 보험료 지원", who: "예술인", amount: "보험료 50%", grad: "linear-gradient(135deg, #4A148C, #6A1B9A)" },
];

export default function Page() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 16px 40px" }}>
      <h1 style={{ fontSize: "clamp(22px, 4.5vw, 28px)", fontWeight: 800, lineHeight: 1.35, marginBottom: "8px", color: "#111" }}>
        숨은 정부지원금 17가지
      </h1>
      <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#374151", marginBottom: "24px" }}>
        신청 안 하면 한 푼도 안 줘요. 아래 목록에서 내 상황에 해당하는 게 있는지 눌러보세요.
      </p>

      {/* 17개 리스트   정부공감 스타일 */}
      <div style={{
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 2px 16px rgba(29,158,117,0.12)",
        marginBottom: "32px",
      }}>
        {/* 헤더 */}
        <div style={{
          background: "linear-gradient(135deg, #1D9E75, #0D8B66)",
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{ color: "#fff", fontSize: "17px", fontWeight: 700 }}>
            숨은 정부지원금 찾기
          </span>
          <span style={{
            background: "rgba(255,255,255,0.25)",
            color: "#fff",
            fontSize: "12px",
            fontWeight: 700,
            padding: "4px 12px",
            borderRadius: "99px",
          }}>
            17개
          </span>
        </div>

        {/* 리스트 아이템 */}
        {BENEFITS.map((b, i) => (
          <Link
            key={b.slug}
            href={`/w/${b.slug}`}
            style={{ textDecoration: "none", display: "block" }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              padding: "14px 20px",
              background: hoveredIdx === i ? "#F0FDF4" : (i % 2 === 0 ? "#fff" : "#FAFBFC"),
              borderBottom: i < BENEFITS.length - 1 ? "1px solid #F0F0F0" : "none",
              transition: "background 0.15s",
              gap: "14px",
            }}>
              {/* 번호 뱃지 */}
              <span style={{
                background: b.grad,
                color: "#fff",
                fontSize: "11px",
                fontWeight: 700,
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                {b.num}
              </span>

              {/* 제목 + 대상 */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "14.5px", fontWeight: 600, color: "#111", margin: 0, lineHeight: 1.4 }}>
                  {b.title}
                </p>
              </div>

              {/* 금액 태그 */}
              <span style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#1D9E75",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}>
                {b.amount}
              </span>

              {/* 화살표 */}
              <span style={{ color: "#9CA3AF", fontSize: "14px", flexShrink: 0 }}>&#10095;</span>
            </div>
          </Link>
        ))}
      </div>

      {/* 간단한 안내 */}
      <H2>왜 모르고 지나칠까요?</H2>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        복지로, 정부24, 고용24, 국민연금공단에 각각 흩어져 있어서 한곳에서 모아보기 어려워요. 신청 안 하면 자동으로 지급되지 않고, 소급 적용도 안 되죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "12px" }}>
        "나는 기준 초과 아닐까?" 하고 지레 포기하는 분이 많은데, 소득 산정 시 근로소득 공제가 적용돼 실제로는 기준을 충족하는 경우가 꽤 있죠. 주민센터에서 무료로 모의 산정을 받아볼 수 있죠.
      </p>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "24px" }}>
        한 가정에서도 구성원마다 받을 수 있는 지원금이 달라요. 농업인 부모 + 장애 자녀 + 다문화 가정이라면 세 가지 이상 동시에 신청 가능하죠.
      </p>

      <H2>자주 묻는 질문</H2>
      <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#374151", marginBottom: "16px" }}>정부지원금 신청에 대해 자주 묻는 질문이에요.</p>
      <FAQ
        items={[
          { q: "여러 지원금을 동시에 받을 수 있나요?", a: "대부분 가능해요. 농업인은 공익직불제와 건강·연금보험료 지원을 동시에 신청할 수 있죠. 단, 장애수당과 장애인연금처럼 동일 성격의 지원금은 중복이 제한돼요." },
          { q: "신청은 어디서 하나요?", a: "복지 관련(장애수당, 아동양육비 등)은 주민센터 또는 복지로, 고용 관련(고용촉진장려금)은 고용24, 연금 관련은 국민연금공단에서 처리해요." },
          { q: "소득 기준을 넘으면 무조건 탈락인가요?", a: "아니에요. 기본형 공익직불제나 임신 사전건강관리 지원처럼 소득 제한 없는 것도 있죠. 각 글에서 자격 조건을 직접 확인해봐요." },
          { q: "대리 신청도 되나요?", a: "주민센터 방문 시 위임장과 대리인 신분증이 있으면 대리 신청이 가능한 경우가 많아요. 온라인 신청은 본인 인증이 필요해요." },
        ]}
      />

      <References groups={[{ category: "출처", items: [
        { label: "복지로   복지서비스 모의계산 및 신청", url: "https://www.bokjiro.go.kr" },
        { label: "정부24   정부 서비스 통합 신청", url: "https://www.gov.kr" },
        { label: "고용24   고용 관련 지원금 신청", url: "https://www.work24.go.kr" },
        { label: "국민연금공단   보험료 지원", url: "https://www.nps.or.kr" },
      ]}]} />
      <Disclaimer text="이 글은 일반적인 정보 제공 목적이며, 법적 조언이 아니에요." />
    </div>
  );
}
