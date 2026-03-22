"use client";

// Q1. 퇴사한 지 14일이 넘었는데 퇴직금을 아직 못 받아서 답답하고 억울한 상황
// Q2. 지연이자(연 20%)를 계산해서 회사에 청구하거나 고용노동부에 신고하기
// Q3. 14일 지급 기한(퇴직급여보장법 제9조), 연 20% 이율, 계산 공식, 소멸시효 3년, 신고 절차
// Q4. GreenBox(지연이자 핵심 요약표) + Calculator(지연이자 계산) + Steps(청구 절차) + FAQ

import { useState } from "react";
import {
  H2, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "14일 계산은 자연일 기준인가요?", a: "자연일 기준이에요. 공휴일, 주말 모두 포함해서 퇴사일 다음 날부터 14일째까지 세요. 영업일이 아니에요." },
  { q: "퇴직금은 받았는데 지연이자만 청구할 수 있나요?", a: "가능해요. 이미 퇴직금을 받았어도 14일 초과 기간에 대한 지연이자 청구권은 별도로 존재해요." },
  { q: "지연이자도 세금을 내야 하나요?", a: "네. 지연이자는 기타소득으로 분류돼서 22%(소득세 20% + 지방소득세 2%) 원천징수돼요. 실수령액은 지연이자의 약 78%예요." },
  { q: "소멸시효 3년이 지나면 완전히 못 받나요?", a: "원칙적으로 그래요. 퇴사일로부터 3년 이내에 청구해야 해요. 3년이 지나면 회사가 소멸시효를 주장할 수 있어요." },
  { q: "회사가 자금 사정이 어렵다고 하면 어떡하나요?", a: "사정과 관계없이 지급 의무가 있어요. 당사자 합의로 기한을 연장할 수는 있지만, 합의 없이 지연하면 이자가 붙어요." },
  { q: "5인 미만 사업장도 지연이자가 적용되나요?", a: "네. 근로자퇴직급여보장법은 사업장 규모와 관계없이 적용돼요. 1인 이상 사업장이면 모두 해당해요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "근로자퇴직급여보장법 제9조", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제37조 (미지급 임금 지연이자)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 임금체불 신고", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "휴업수당-지급-기준-계산", title: "휴업수당 지급 기준", description: "회사 귀책사유 휴업 시 평균임금 70% 수당이에요." },
  { slug: "연차촉진-제도-절차", title: "연차촉진 제도 절차", description: "연차 미사용수당 청구 조건을 다뤄요." },
  { slug: "비밀유지-의무-위반", title: "비밀유지 의무 위반 처벌", description: "퇴직 후 영업비밀 관련 주의사항이에요." },
];

const STEPS_DATA = [
  { title: "퇴사일로부터 14일 경과 확인", desc: "퇴사일 다음 날부터 세서 14일이 지났는지 확인하세요. 자연일 기준이에요. 14일째까지는 법적 지급 기한 내예요." },
  { title: "회사에 서면으로 지급 요청", desc: "내용증명이나 이메일로 퇴직금과 지연이자 지급을 요청하세요. '근로자퇴직급여보장법 제9조에 따른 지연이자 포함 청구'라고 명시하세요." },
  { title: "미지급 시 고용노동부 신고", desc: "고용노동부(1350) 또는 고용24(ei.go.kr)에서 임금체불 진정을 접수하세요. 근로계약서, 급여명세서, 퇴사 확인 서류를 첨부하면 빨라요." },
  { title: "근로감독관 조사 및 시정 명령", desc: "신고 접수 후 감독관이 회사를 조사해요. 미지급이 확인되면 시정 명령이 나오고, 불응 시 3년 이하 징역 또는 3천만원 이하 벌금이에요." },
];

function DelayCalc() {
  const [amount, setAmount] = useState(3000000);
  const [days, setDays] = useState(30);
  const interest = Math.round(amount * 0.2 / 365 * days);
  const total = amount + interest;
  const fmt = (n: number) => n.toLocaleString("ko-KR") + "원";

  return (
    <div style={{ background: "#f8faf9", border: "1px solid #e0e0e0", borderRadius: 12, padding: "20px 18px", margin: "18px 0" }}>
      <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>퇴직금 지연이자 계산기</p>
      <label style={{ fontSize: 13, color: "#555" }}>미지급 퇴직금</label>
      <input type="range" min={500000} max={30000000} step={100000} value={amount}
        onChange={e => setAmount(+e.target.value)}
        style={{ width: "100%", accentColor: "#1D9E75" }} />
      <p style={{ fontSize: 14, textAlign: "right", marginBottom: 12 }}>{fmt(amount)}</p>

      <label style={{ fontSize: 13, color: "#555" }}>14일 초과 지연일수</label>
      <input type="range" min={1} max={365} step={1} value={days}
        onChange={e => setDays(+e.target.value)}
        style={{ width: "100%", accentColor: "#1D9E75" }} />
      <p style={{ fontSize: 14, textAlign: "right", marginBottom: 16 }}>{days}일</p>

      <div style={{ background: "#fff", borderRadius: 8, padding: 14, border: "1px solid #e8e8e8" }}>
        <p style={{ fontSize: 13, color: "#555", marginBottom: 6 }}>지연이자 (연 20%)</p>
        <p style={{ fontSize: 22, fontWeight: 700, color: "#1D9E75", marginBottom: 8 }}>{fmt(interest)}</p>
        <p style={{ fontSize: 13, color: "#555" }}>퇴직금 + 지연이자 합계: <strong>{fmt(total)}</strong></p>
        <p style={{ fontSize: 11, color: "#999", marginTop: 6 }}>계산식: {fmt(amount)} x 20% / 365일 x {days}일</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동 · 퇴직금 · 지연이자</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 14일 안에 안 줬다면?<br />
        연 20% 지연이자 계산과 청구법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴사한 지 한 달이 넘었는데 아직도 퇴직금이 안 들어왔나요?
        근로자퇴직급여보장법 제9조에 따라 퇴사일로부터 14일 이내에 지급해야 해요.
        14일이 지나면 그 다음 날부터 연 20% 지연이자가 자동으로 붙어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지연이자 핵심 정리</H2>
      <p style={body}>
        복잡하게 생각할 필요 없어요. 14일 넘기면 이자가 붙고, 3년 안에 청구하면 돼요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>항목</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>기준</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "지급 기한", rule: "퇴사일로부터 14일 (자연일)" },
              { item: "지연이자율", rule: "연 20%" },
              { item: "이자 시작일", rule: "14일 다음 날부터 실제 지급일까지" },
              { item: "소멸시효", rule: "퇴사일로부터 3년" },
              { item: "미지급 처벌", rule: "3년 이하 징역 또는 3천만원 이하 벌금" },
              { item: "적용 사업장", rule: "1인 이상 모든 사업장" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.item}</td>
                <td style={{ padding: "5px 8px" }}>{row.rule}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 근로자퇴직급여보장법 제9조 + 근로기준법 제37조 기준
        </p>
      </GreenBox>

      <H2>내 지연이자 얼마인지 계산해 보세요</H2>
      <p style={body}>
        미지급 퇴직금 금액과 14일 초과 지연일수를 넣으면 바로 계산돼요.
      </p>

      <DelayCalc />

      <H2>지연이자 청구 절차</H2>
      <p style={body}>
        계산이 끝났으면 바로 행동으로 옮기세요. 서면 요청부터 시작하면 돼요.
      </p>

      <Steps steps={STEPS_DATA} />

      <H2>기한 연장 합의가 있으면 어떻게 되나요?</H2>
      <p style={body}>
        퇴직 전에 회사와 근로자가 서면으로 지급 기한 연장을 합의하면 14일을 넘겨도 지연이자가 붙지 않아요.
        다만 퇴직 후에 합의한 건 효력이 없다는 판례가 있으니 주의하세요.
      </p>

      <BorderBox>
        <strong>기한 연장 합의가 유효하려면</strong><br /><br />
        ▶ 퇴직 <strong>전</strong>에 서면으로 합의해야 해요 (구두 합의는 분쟁 소지)<br />
        ▶ 연장 기간과 사유가 구체적으로 명시돼야 해요<br />
        ▶ 근로자의 자발적 동의가 있어야 해요 (강제는 무효)<br /><br />
        ★ 퇴직 후 &quot;조금만 기다려 달라&quot;는 합의는 법적 효력 없음
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 근로자퇴직급여보장법 기준으로 작성됐어요. 지연이자 계산은 참고용이며, 정확한 금액은 고용노동부(1350)에 확인하세요." />
    </ArticleLayout>
  );
}
