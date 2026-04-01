"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 밤 10시 넘어서 일하는데 야간근로 수당을 제대로 받고 있는지 확인하고 싶은 상황
// Q2. 야간근로 수당 계산 공식을 이해하고 내 급여명세서에서 맞게 받고 있는지 확인한다
// Q3. 야간근로 시간(22~06시), 가산율(50%), 계산 공식(통상임금×1.5), 연장·휴일 중복 시 가산(100~200%), 5인 이상만 적용, 미지급 시 노동청 신고
// Q4. Calculator(슬라이더) + GreenBox(공식 요약) + 비교표(중복 가산) + Steps(청구 절차) + FAQ

import { useState } from "react";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "급여명세서에서 야간근로 수당 항목을 확인하세요",
    desc: "급여명세서에 '야간근로수당' 또는 '야간수당'이 별도 항목으로 기재돼 있는지 확인해요. 기본급에 포함돼 있다면 금액이 맞는지 직접 계산해 봐야 해요.",
  },
  {
    title: "출퇴근 기록으로 야간근로 시간을 확인하세요",
    desc: "카드 출입 기록, 근태 시스템, 카톡 퇴근 보고 등으로 22시~06시 사이 근무 시간을 확인해요. 이 기록이 나중에 신고 시 핵심 증거가 돼요.",
  },
  {
    title: "회사에 먼저 정정을 요청하세요",
    desc: "급여 담당자에게 계산 근거를 문의하고 부족한 금액의 정정을 요청해요. 이메일이나 문자로 요청하면 기록이 남아서 좋아요.",
  },
  {
    title: "해결 안 되면 노동청에 임금체불 신고하세요",
    desc: "고용노동부 민원마당에서 온라인으로 신고할 수 있어요. 근로계약서, 급여명세서, 출퇴근 기록을 첨부하면 2주 내에 조사가 시작돼요.",
    link: { label: "고용노동부 민원마당", href: "https://minwon.moel.go.kr" },
  },
];

const FAQS = [
  { q: "아르바이트도 야간근로 수당을 받을 수 있나요?", a: "정규직이든 아르바이트든 22시~06시에 일하면 50% 가산이 의무예요. 다만 상시근로자 5인 미만 사업장은 적용 제외라 가산수당 의무가 없어요." },
  { q: "월급에 야간수당이 포함돼 있다고 하면요?", a: "포괄임금제라도 실제 야간근로 시간에 비해 수당이 적다면 차액을 청구할 수 있어요. 근로계약서에 야간수당이 얼마로 포함됐는지 확인해 보세요." },
  { q: "야간 + 연장근로가 겹치면 얼마 받나요?", a: "연장근로 50% + 야간근로 50% = 100% 가산이에요. 시급 10,000원이면 시간당 20,000원을 받아요. 중복 적용되기 때문에 밤늦게 잔업하면 금액이 꽤 커져요." },
  { q: "휴일에 야간근로하면 가산이 더 높나요?", a: "휴일근로(50~100%) + 야간근로(50%)가 중복돼서 최대 200~250%까지 올라가요. 일요일 밤 10시부터 새벽 2시까지 일하면 시급의 2배를 받아요." },
  { q: "야간근로 수당 미지급 시 처벌이 있나요?", a: "3년 이하 징역 또는 3천만원 이하 벌금이에요. 형사처벌과 별개로 미지급 수당에 지연이자 연 20%도 추가로 받을 수 있어요." },
  { q: "퇴직 후에도 야간수당을 청구할 수 있나요?", a: "임금채권 소멸시효 3년 이내라면 가능해요. 매달 급여일로부터 3년이니까, 퇴직 후에도 기간 내 미지급분을 한꺼번에 청구할 수 있어요." },
];

const SOURCES = [
  { name: "근로기준법 제56조", href: "https://www.law.go.kr/법령/근로기준법" },
  { name: "고용노동부", href: "https://www.moel.go.kr" },
];

const RELATED = [
  { slug: "연장근로-수당-계산-방법", title: "연장근로 수당 계산", description: "연장근로 50% 가산 계산법." },
  { slug: "휴일근로-수당-계산-방법", title: "휴일근로 수당 계산", description: "휴일근로 가산 기준 정리." },
  { slug: "통상임금-계산-방법", title: "통상임금 계산 방법", description: "시간당 통상임금 산정 기준." },
];

function CalcWidget() {
  const [hourlyWage, setHourlyWage] = useState(12000);
  const [nightHours, setNightHours] = useState(4);
  const nightPay = Math.round(hourlyWage * 1.5 * nightHours);
  const bonusPart = Math.round(hourlyWage * 0.5 * nightHours);

  return (
    <div style={{ background: "#f0fdf4", borderRadius: 12, padding: 20, marginBottom: 20 }}>
      <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: "#111" }}>야간근로 수당 계산기</p>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4, color: "#374151" }}>
          <span>시간당 통상임금</span><span style={{ fontWeight: 600 }}>{hourlyWage.toLocaleString()}원</span>
        </div>
        <input type="range" min={10030} max={50000} step={100} value={hourlyWage}
          onChange={(e) => setHourlyWage(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#1D9E75" }} />
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4, color: "#374151" }}>
          <span>야간근로 시간</span><span style={{ fontWeight: 600 }}>{nightHours}시간</span>
        </div>
        <input type="range" min={1} max={8} step={1} value={nightHours}
          onChange={(e) => setNightHours(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#1D9E75" }} />
      </div>
      <div style={{ borderTop: "1px solid #d1fae5", paddingTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 14 }}>
          <span>기본 임금 ({nightHours}시간)</span><span>{(hourlyWage * nightHours).toLocaleString()}원</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 14, color: "#1D9E75" }}>
          <span>야간 가산분 (50%)</span><span>+ {bonusPart.toLocaleString()}원</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 14, fontWeight: 700, color: "#1D9E75" }}>
          <span>총 야간근로 수당</span><span>{nightPay.toLocaleString()}원</span>
        </div>
      </div>
      <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>5인 이상 사업장 기준. 연장·휴일 중복 시 가산율이 더 높아져요.</p>
    </div>
  );
}

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동 · 야간근로 · 수당 계산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        야간근로 수당, 시급 대비 얼마 더 받나요?<br />
        50% 가산 계산법과 청구 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "밤 10시 넘어서 일하는데 수당을 똑같이 받고 있어요. 맞는 건가요?"
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제56조</a>에 따라 22시~06시 근로에는 통상임금의 <strong>50%를 추가로</strong> 지급해야 해요.
        시급 10,000원이면 야간에는 <strong>15,000원</strong>을 받아야 하는 거죠.
        아래 계산기로 내 야간근로 수당을 바로 확인해 보세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내 야간근로 수당은 얼마인가요?</H2>
      <p style={body}>
        시간당 통상임금과 야간근로 시간을 입력하면 바로 계산돼요. 기본 임금에 50% 가산분이 추가된 금액이에요.
      </p>
      <CalcWidget />

      <GreenBox>
        야간근로 수당 공식{"\n"}
        시간당 통상임금 x 1.5 x 야간근로 시간 = 총 야간근로 수당{"\n"}
        월급제 직원은 기본급에 이미 1.0이 포함돼 있으니 0.5만 추가로 받아요.
      </GreenBox>

      <CategoryButton label="근로/노동 정보" count={12} href="/category/근로-노동" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>연장·휴일근로와 겹치면 얼마나 더 받나요?</H2>
      <p style={body}>
        야간근로가 연장근로나 휴일근로와 중복되면 가산율이 합산돼요.
        밤늦게 잔업하면 생각보다 금액이 크게 달라져요.
      </p>

      <SectionBadge>중복 가산율 정리</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>근로 유형</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>가산율</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>시급 1만원 기준</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["야간근로만", "50%", "15,000원"],
              ["연장 + 야간", "100%", "20,000원"],
              ["휴일(8h 이내) + 야간", "100%", "20,000원"],
              ["휴일(8h 초과) + 야간", "150%", "25,000원"],
              ["연장 + 휴일(8h 초과) + 야간", "200%", "30,000원"],
            ].map(([유형, 가산, 금액], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{유형}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{가산}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{금액}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BorderBox>
        <strong>5인 미만 사업장 주의</strong>{"\n"}
        상시근로자 5인 미만 사업장은 근로기준법 제56조 적용이 제외돼요. 야간·연장·휴일 가산수당 의무가 없어요. 다만 근로계약서에 수당 지급을 명시했다면 5인 미만이어도 지급해야 해요.
      </BorderBox>

      <Divider />

      <H2>수당을 못 받았다면 어떻게 청구하나요?</H2>
      <p style={body}>
        야간근로 수당 미지급은 <strong>임금체불</strong>이에요.
        사업주는 3년 이하 징역 또는 3천만원 이하 벌금 대상이에요.
        퇴직 후에도 3년 이내라면 청구할 수 있어요.
      </p>
      <Steps steps={STEPS} />

      <Divider />
      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 근로기준법을 바탕으로 작성했어요. 포괄임금제 등 개별 근로 조건에 따라 적용이 달라질 수 있으니 고용노동부에 확인하세요." />
    </ArticleLayout>
  );
}
