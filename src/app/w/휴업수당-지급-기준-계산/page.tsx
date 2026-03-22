"use client";

// Q1. 회사가 갑자기 쉬라고 해서 월급이 안 나오는데, 이게 합법인지 모르겠는 상황
// Q2. 사용자 귀책사유 해당 여부 확인하고 평균임금 70% 휴업수당을 청구하기
// Q3. 근로기준법 제46조, 평균임금 70% 계산 공식, 사용자 귀책사유 범위, 통상임금 한도, 미지급 시 3년 징역/3천만원 벌금
// Q4. GreenBox(지급 기준 요약표) + Calculator(휴업수당 계산) + Steps(청구 절차) + FAQ

import { useState } from "react";
import {
  H2, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "코로나 같은 전염병 때문에 가게 문 닫으면 받을 수 있나요?", a: "원칙적으로 천재지변·전염병은 불가항력이라 휴업수당 대상이 아니에요. 다만 회사가 대체 업무 배치 등 대처할 수 있었다면 귀책사유로 볼 수 있어요." },
  { q: "휴업수당 70%는 세전인가요 세후인가요?", a: "세전이에요. 여기서 소득세와 4대보험료가 원천징수돼요. 실수령액은 70%보다 조금 적어요." },
  { q: "일부만 휴업한 경우에도 받나요?", a: "네. 조업 단축 등 일부 휴업도 해당돼요. 실제 근무하지 못한 시간에 대해 평균임금의 70%를 지급해야 해요." },
  { q: "수습 기간 중이어도 휴업수당 받을 수 있나요?", a: "가능해요. 수습·시용 기간이라도 근로계약이 체결된 근로자라면 동일하게 적용돼요." },
  { q: "퇴사 후에도 청구할 수 있나요?", a: "네. 임금체불과 같아서 퇴사 후 3년 이내에 청구할 수 있어요. 소멸시효가 3년이에요." },
  { q: "노동위원회 승인 받으면 70% 미만도 가능한가요?", a: "사업 계속이 불가능한 부득이한 사유가 있으면 노동위원회 승인 하에 70% 미만 지급이 가능해요. 극히 예외적이에요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "근로기준법 제46조 (휴업수당)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 임금체불 신고", url: "https://www.moel.go.kr" },
      { label: "찾기쉬운 생활법령정보 - 휴업수당", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1694" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직급여-지급-지연이자-받기", title: "퇴직금 지연이자", description: "퇴직금 14일 미지급 시 연 20% 이자 청구법이에요." },
  { slug: "연차촉진-제도-절차", title: "연차촉진 제도 절차", description: "연차 미사용수당 청구 조건을 다뤄요." },
  { slug: "파견근로자-기간-제한", title: "파견근로자 기간 제한", description: "파견직 2년 초과 시 직접고용 의무를 다뤄요." },
];

const STEPS_DATA = [
  { title: "사용자 귀책사유 여부 확인", desc: "경영 악화, 원자재 부족, 주문 감소 등 회사 사정이 원인이면 귀책사유예요. 근로자 잘못이나 천재지변이면 해당 안 돼요." },
  { title: "회사에 휴업수당 지급 요청", desc: "서면 또는 이메일로 '근로기준법 제46조에 따른 휴업수당 지급을 요청합니다'라고 통보하세요. 휴업 기간과 금액을 명시하세요." },
  { title: "미지급 시 고용노동부 신고", desc: "고용노동부(1350) 민원마당에서 임금체불로 신고하세요. 근로계약서, 급여명세서, 휴업 통보 문서를 첨부하세요." },
  { title: "근로감독관 조사 및 시정 명령", desc: "미지급이 확인되면 시정 명령이 나와요. 불응 시 3년 이하 징역 또는 3천만원 이하 벌금이에요." },
];

function CalcComponent() {
  const [salary, setSalary] = useState(3000000);
  const [offDays, setOffDays] = useState(10);
  const dailyAvg = Math.round(salary / 30);
  const rate70 = Math.round(dailyAvg * 0.7);
  const total = rate70 * offDays;
  const fmt = (n: number) => n.toLocaleString("ko-KR") + "원";

  return (
    <div style={{ background: "#f8faf9", border: "1px solid #e0e0e0", borderRadius: 12, padding: "20px 18px", margin: "18px 0" }}>
      <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>휴업수당 계산기</p>
      <label style={{ fontSize: 13, color: "#555" }}>월 평균임금 (세전)</label>
      <input type="range" min={1000000} max={10000000} step={100000} value={salary}
        onChange={e => setSalary(+e.target.value)}
        style={{ width: "100%", accentColor: "#1D9E75" }} />
      <p style={{ fontSize: 14, textAlign: "right", marginBottom: 12 }}>{fmt(salary)}</p>

      <label style={{ fontSize: 13, color: "#555" }}>휴업일수</label>
      <input type="range" min={1} max={90} step={1} value={offDays}
        onChange={e => setOffDays(+e.target.value)}
        style={{ width: "100%", accentColor: "#1D9E75" }} />
      <p style={{ fontSize: 14, textAlign: "right", marginBottom: 16 }}>{offDays}일</p>

      <div style={{ background: "#fff", borderRadius: 8, padding: 14, border: "1px solid #e8e8e8" }}>
        <p style={{ fontSize: 13, color: "#555", marginBottom: 4 }}>일평균임금: {fmt(dailyAvg)}</p>
        <p style={{ fontSize: 13, color: "#555", marginBottom: 8 }}>일 휴업수당 (70%): {fmt(rate70)}</p>
        <p style={{ fontSize: 22, fontWeight: 700, color: "#1D9E75", marginBottom: 4 }}>총 휴업수당: {fmt(total)}</p>
        <p style={{ fontSize: 11, color: "#999", marginTop: 6 }}>계산식: {fmt(salary)} / 30일 x 70% x {offDays}일</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동 · 휴업수당 · 임금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        회사가 쉬라고 했는데 월급은?<br />
        휴업수당 70% 계산과 청구법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사 사정으로 갑자기 일을 못 하게 됐는데 월급이 안 나온다면 억울하죠?
        근로기준법 제46조에 따라 사용자 귀책사유로 휴업하면 평균임금의 70% 이상을 지급해야 해요.
        안 주면 3년 이하 징역 또는 3천만원 이하 벌금이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>휴업수당 지급 기준</H2>
      <p style={body}>
        언제 받을 수 있고, 언제 못 받는지 핵심만 정리했어요.
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
              { item: "지급 조건", rule: "사용자 귀책사유로 인한 휴업" },
              { item: "지급액", rule: "평균임금의 70% 이상 (통상임금 한도)" },
              { item: "귀책사유 예시", rule: "경영 악화, 원자재 부족, 주문 감소, 설비 고장" },
              { item: "비해당 예시", rule: "근로자 귀책, 천재지변, 정부 영업중단 명령" },
              { item: "미지급 처벌", rule: "3년 이하 징역 또는 3천만원 이하 벌금" },
              { item: "청구 시효", rule: "3년 이내" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.item}</td>
                <td style={{ padding: "5px 8px" }}>{row.rule}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 근로기준법 제46조 기준 / 평균임금 70%가 통상임금 초과 시 통상임금으로 지급
        </p>
      </GreenBox>

      <H2>내 휴업수당 얼마인지 계산해 보세요</H2>
      <p style={body}>
        월급과 휴업일수를 넣으면 바로 나와요.
      </p>

      <CalcComponent />

      <H2>휴업수당 청구 절차</H2>
      <p style={body}>
        회사가 자발적으로 안 주면 직접 청구해야 해요. 고용노동부 신고가 가장 확실해요.
      </p>

      <Steps steps={STEPS_DATA} />

      <H2>통상임금이 더 낮으면 어떻게 되나요?</H2>
      <p style={body}>
        평균임금의 70%가 통상임금보다 높으면 통상임금을 휴업수당으로 지급할 수 있어요.
        반대로 통상임금이 더 높다면 평균임금 70%를 기준으로 해요.
      </p>

      <BorderBox>
        <strong>평균임금 vs 통상임금 비교</strong><br /><br />
        ▶ <strong>평균임금</strong>: 퇴직 전 3개월간 받은 임금 총액 / 총일수 (실제 받은 금액 기준)<br />
        ▶ <strong>통상임금</strong>: 근로계약서상 정기적·일률적으로 받는 금액 (기본급+고정수당)<br />
        ▶ <strong>휴업수당</strong>: 평균임금 x 70%와 통상임금 중 <strong>낮은 금액</strong>으로 결정<br /><br />
        ★ 성과급이나 특별상여금이 큰 경우 평균임금이 통상임금보다 높을 수 있어요
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 근로기준법 기준으로 작성됐어요. 휴업수당 계산은 참고용이며, 정확한 금액은 고용노동부(1350)에 확인하세요." />
    </ArticleLayout>
  );
}
