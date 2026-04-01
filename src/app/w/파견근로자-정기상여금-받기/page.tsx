"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 파견직으로 일하는데 정규직 동료들은 상여금을 받는데 자신은 못 받고 있어서 억울한 상황
// Q2. 차별 여부를 확인하고, 차별이면 노동위원회에 시정신청해서 상여금을 받아내기
// Q3. 차별 금지 법적 근거, 상여금 기준 계산법, 시정신청 6개월 기한, 증거 수집 방법, 성과급 비례 계산
// Q4. GreenBox(차별 판단 기준 표) + BorderBox(증거 수집 체크리스트) + Steps(구제 신청 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "파견근로자도 명절 상여금을 받을 수 있나요?",
    a: "정규직과 동일한 업무를 하면 명절 상여금도 똑같이 받을 수 있어요. 파견이라는 이유로 거부하면 법 위반이에요.",
  },
  {
    q: "계약서에 상여금 없다고 써 있으면 어떻게 되나요?",
    a: "계약서보다 법이 우선이에요. 차별적 계약 조항은 무효예요. 동일 업무 수행 중이면 계약서 내용과 관계없이 청구할 수 있어요.",
  },
  {
    q: "시정신청 기한이 6개월이라면 지나면 못 받나요?",
    a: "차별 행위가 있은 날(상여금 지급일)부터 6개월 이내예요. 기한이 지나면 노동위원회 신청은 안 되고, 민사소송으로만 청구할 수 있어요.",
  },
  {
    q: "정규직 동료가 증언해주면 도움이 되나요?",
    a: "네, 매우 유리해요. 같은 업무를 한다는 동료 증언이 있으면 차별 입증이 훨씬 쉬워요. 증인 진술서나 법정 증언 모두 가능해요.",
  },
  {
    q: "파견 계약 끝나면 청구를 못 하나요?",
    a: "파견 기간이 끝나도 청구 권리는 유지돼요. 다만 시간이 지날수록 증거 확보가 어려우니 재직 중에 해결하는 게 유리해요.",
  },
  {
    q: "성과급도 동일하게 받아야 하나요?",
    a: "동일 업무라면 원칙적으로 같아야 해요. 다만 근무 기간에 비례한 계산은 허용돼요. 1년 정규직이 300만원이면 6개월 파견은 150만원이 기준이에요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "파견근로자보호 등에 관한 법률", url: "https://www.law.go.kr/법령/파견근로자보호등에관한법률" },
      { label: "기간제 및 단시간근로자 보호 등에 관한 법률", url: "https://www.law.go.kr/법령/기간제및단시간근로자보호등에관한법률" },
      { label: "고용노동부 민원신청", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "파견근로자-퇴직금-청구-대상", title: "파견근로자 퇴직금 청구", description: "파견직 퇴직금 받는 조건이에요." },
  { slug: "기간제근로자-보호법", title: "기간제근로자 보호법", description: "계약직 차별 시정 방법이에요." },
  { slug: "파견근로자-육아휴직", title: "파견근로자 육아휴직", description: "파견직도 육아휴직을 쓸 수 있어요." },
];

const STEPS = [
  { title: "서면으로 시정 요구", desc: "내용증명이나 이메일로 '동일 업무 수행 중인데 상여금을 못 받고 있다'고 명시해서 회사에 먼저 요구하세요." },
  { title: "증거 자료 확보", desc: "정규직 급여명세서(공개된 것), 취업규칙, 상여금 지급 공지문, 동료 증언을 확보하세요. 상여금 지급일로부터 6개월 내 신청해야 해요." },
  { title: "노동위원회 차별시정 신청", desc: "관할 지방노동위원회에 차별시정 신청서를 제출하세요. 신청일로부터 60일 이내에 조사·판정이 나와요." },
  { title: "시정 명령 이행", desc: "인용 판정 시 회사는 차별분을 소급 지급하고 앞으로 동일하게 처우해야 해요. 불이행 시 이행강제금이 부과돼요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로/노동 · 파견근로자 · 차별 시정</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        파견근로자 정기상여금 받기<br />
        차별 확인부터 노동위원회 신청까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        정규직은 상여금을 받는데 파견이라는 이유로 못 받고 있다면 차별이에요.
        파견근로자보호법과 기간제법은 동일한 업무를 하면 동일한 처우를 받아야 한다고 규정해요.
        상여금 지급일부터 6개월 이내에 노동위원회에 신청하면 소급 지급받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>차별 여부 판단 기준</H2>
      <p style={body}>
        차별인지 아닌지를 따지려면 '비교 대상 정규직'과 업무 내용, 책임, 난이도를 비교해야 해요.
        아래 기준으로 내 상황이 차별에 해당하는지 확인해보세요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>항목</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>차별 O</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>차별 X (허용)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "상여금 지급 여부", yes: "정규직만 지급, 파견은 미지급", no: "근무 기간 비례 지급" },
              { item: "지급 조건", yes: "정규직만이라는 조건", no: "재직 1년 이상 등 객관적 조건" },
              { item: "지급 금액", yes: "동일 업무인데 현저히 낮은 금액", no: "성과·능력 차이에 따른 차이" },
              { item: "명절 상여금", yes: "동일 업무 파견에게 미지급", no: "근무 기간 비례 지급" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.item}</td>
                <td style={{ padding: "5px 8px", fontSize: 12, color: "#d32f2f" }}>{row.yes}</td>
                <td style={{ padding: "5px 8px", fontSize: 12, color: "#1D9E75" }}>{row.no}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 파견근로자보호법 + 기간제법 기준 / 업무 내용·책임·난이도 동일성이 핵심
        </p>
      </GreenBox>

      <H2>구제 신청 절차</H2>
      <p style={body}>
        차별 확인 후 바로 노동위원회로 갈 수도 있어요.
        회사에 먼저 요구하면 협의 해결 가능성이 있고, 노동위원회 신청 시 성의 표시가 될 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <H2>증거 수집 체크리스트</H2>
      <p style={body}>
        차별시정 신청에서 가장 중요한 건 증거예요.
        아래 항목을 미리 확보해두면 신청 후 훨씬 빨리 해결돼요.
      </p>

      <BorderBox>
        <strong>반드시 확보해야 할 증거</strong><br />
        ✓ 상여금을 받지 못했다는 사실 : 급여명세서 (상여금 0원 기록)<br />
        ✓ 정규직이 상여금을 받았다는 사실 : 공개된 급여명세서 또는 공지문<br />
        ✓ 동일 업무를 수행한다는 증거 : 업무 지시서, 동료 증언, 업무 결과물<br />
        ✓ 취업규칙 또는 단체협약 : 상여금 지급 기준이 명시된 문서<br />
        <br />
        <strong>있으면 더 유리한 증거</strong><br />
        ✓ 동료의 증인 진술서 (동일 업무 확인)<br />
        ✓ 상여금 지급 공지 이메일 또는 게시물<br />
        ✓ 파견 계약서 (업무 범위 확인용)<br />
        <br />
        ★ 차별 행위일(상여금 지급일)로부터 6개월 이내에 신청 필수
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 파견근로자보호법 기준으로 작성됐어요. 차별시정 절차와 기한은 사안에 따라 다를 수 있어요. 구체적인 상황은 고용노동부 상담 또는 노무사에게 문의하세요." />
    </ArticleLayout>
  );
}
