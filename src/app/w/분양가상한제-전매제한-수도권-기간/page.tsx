"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 분양 아파트 당첨 후 사정이 생겨 팔아야 하는데, 전매제한 기간이 언제까지인지 모르는 상황이에요.
// Q2. 본인 분양 아파트의 전매 가능 시점을 정확히 파악하고, 위반 없이 매도 계획을 세우는 행동.
// Q3. 지역별 전매제한 기간(3년/1년/6개월), 기산일(입주자 선정일), 소유권이전등기 전 전매불가, 위반 시 계약 취소.
// Q4. GreenBox(핵심 기간 요약) + 표(지역별 기간 비교) + Steps(전매 가능 확인 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "분양가상한제 아파트는 무조건 3년 못 파나요?", a: "아니에요. 수도권이라도 위치에 따라 달라요. 공공택지·규제지역은 3년, 과밀억제권역은 1년, 그 외 수도권은 6개월이에요." },
  { q: "전매제한 기간은 언제부터 세나요?", a: "입주자로 선정된 날(당첨일)부터 계산해요. 입주일이나 잔금일이 아니라 최초 당첨일이 기준이에요." },
  { q: "소유권이전등기 전에 팔 수 있나요?", a: "안 돼요. 소유권이전등기를 완료하기 전까지는 전매제한 기간과 관계없이 전매 자체가 불가능해요." },
  { q: "전매제한 위반하면 어떻게 되나요?", a: "분양계약이 취소되고 분양권을 잃어요. 위약금을 제하고 돌려받게 되니 손해가 커요. 형사처벌까지 받을 수 있어요." },
  { q: "소유권이전등기를 받으면 바로 팔 수 있나요?", a: "등기를 받았더라도 전매제한 기간이 남아있으면 못 팔아요. 등기 완료 + 제한 기간 종료, 두 조건 모두 충족해야 해요." },
  { q: "비수도권 전매제한 기간은 어떻게 되나요?", a: "비수도권 공공택지는 1년, 그 외는 6개월이에요. 수도권보다 짧아요." },
];

const REFERENCES = [
  {
    category: "법령·정부 자료",
    items: [
      { label: "주택법 시행령 제73조", url: "https://www.law.go.kr/법령/주택법시행령" },
      { label: "국토교통부 분양가상한제 정책", url: "https://www.molit.go.kr" },
      { label: "찾기쉬운 생활법령정보 전매제한", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1773&ccfNo=3&cciNo=2&cnpClsNo=2" },
    ],
  },
];

const RELATED = [
  { slug: "청약저축-청약예금-전환-방법-조건", title: "청약저축 → 청약예금 전환", description: "청약통장 전환 조건과 방법을 알려드려요." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산·세율·납부", description: "분양 아파트 취득 시 내야 하는 세금이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 분양 · 전매</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        분양가상한제 전매제한 기간<br />
        수도권 지역별 기간과 확인 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        분양 아파트에 당첨됐는데 사정이 생겨 팔아야 할 수도 있잖아요.
        분양가상한제 적용주택은 일정 기간 동안 다른 사람에게 팔 수 없어요.
        수도권은 최대 3년, 최소 6개월인데 내 아파트가 어디에 해당하는지 정확히 알아야 손해를 안 봐요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>수도권 전매제한 기간, 지역별로 달라요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택법 시행령 제73조</a>에서
        분양가상한제 적용주택의 전매제한 기간을 정하고 있어요. 2023년부터 최장 10년이던 기간이 최대 3년으로 대폭 줄었어요.
      </p>

      <SectionBadge>수도권 전매제한 기간 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>지역 구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>전매제한</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>해당 지역 예시</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["공공택지·규제지역", "3년", "서울 강남·서초·송파·용산, 공공택지 분양"],
              ["과밀억제권역", "1년", "서울 전역, 인천·경기 일부"],
              ["그 외 수도권", "6개월", "위 두 가지에 해당하지 않는 수도권"],
            ].map(([area, period, example], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{area}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75", fontWeight: 700 }}>{period}</td>
                <td style={{ padding: "9px 12px", color: "#666" }}>{example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        예를 들어 2025년 3월에 서울 송파구 공공분양에 당첨됐다면 2028년 3월까지 못 팔아요.
        같은 날 경기 용인시 민간분양에 당첨됐다면 6개월 후인 2025년 9월부터 전매가 가능해요.
      </p>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>전매제한 기간, 이렇게 확인해요</H2>
      <p style={body}>
        내 분양 아파트가 몇 년 제한인지 확인하려면 입주자 모집공고를 봐야 해요.
        모집공고에 전매제한 기간이 명시돼 있어요.
      </p>

      <SectionBadge>전매 가능 시점 확인 절차</SectionBadge>
      <Steps steps={[
        { title: "입주자 모집공고 확인", desc: "분양 당시 모집공고에서 '전매제한 기간' 항목을 찾아요. 분양사 홈페이지나 청약홈에서 볼 수 있어요." },
        { title: "당첨일(입주자 선정일) 확인", desc: "전매제한은 당첨일부터 시작해요. 계약일이 아니에요. 당첨 통보서에 적힌 날짜를 확인하세요." },
        { title: "제한 기간 계산", desc: "당첨일 + 전매제한 기간 = 전매 가능 시점이에요. 달력에 표시해두세요." },
        { title: "소유권이전등기 완료 여부 확인", desc: "등기 전에는 기간이 지나도 전매가 안 돼요. 등기 완료 후 + 제한 기간 종료, 두 조건을 모두 확인하세요." },
      ]} />

      <Divider />

      <H2>전매제한 위반하면 벌어지는 일</H2>
      <p style={body}>
        전매제한 기간 안에 분양권을 넘기면 분양계약 자체가 취소돼요.
        납부한 중도금·계약금에서 위약금을 떼고 돌려받게 되니 손해가 커요.
      </p>

      <GreenBox>
        위반 시 불이익 3가지예요.<br />
        · 분양계약 취소 → 분양권 상실<br />
        · 위약금 공제 후 환불 → 시세 차익 포기<br />
        · 불법 전매 적발 시 형사처벌 가능
      </GreenBox>

      <p style={body}>
        소유권이전등기를 제한 기간 내에 완료한 경우에는, 등기 완료 시점에 전매제한이 끝난 것으로 봐요.
        이건 예외적인 경우이고, 보통은 입주 후 등기까지 시간이 걸리니 기간을 넉넉히 계산하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택법 시행령을 바탕으로 작성됐어요. 전매제한 기간은 정책 변경 시 달라질 수 있으니 입주자 모집공고와 국토교통부 공식 사이트에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
