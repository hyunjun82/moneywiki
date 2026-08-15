"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 전세/월세 계약 만료가 다가오거나 이미 지났는데, 아무 말 없이 계속 살고 있어서 묵시적갱신이 뭔지, 내 상황이 어떤 건지 알고 싶은 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 묵시적갱신 상태인지 확인하고, 이사 가려면 3개월 전 통보하고, 계속 살려면 그대로 두는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 성립 조건(6개월~2개월 전 통보 없으면 자동), 효과(기존 조건 2년 연장), 세입자 해지(3개월 전 통보), 집주인 해지 불가, 계약갱신청구권과 차이.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(핵심 정리) + Steps(해지 통보 절차) + BorderBox(갱신청구권 비교표) + Checklist(상황별 행동) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "묵시적갱신 후 바로 이사 갈 수 있나요?",
    a: "안 돼요. 집주인에게 해지 통보하고 3개월이 지나야 계약이 종료돼요. 통보 없이 나가면 보증금 돌려받기 어려워질 수 있어요.",
  },
  {
    q: "묵시적갱신되면 보증금이 오르나요?",
    a: "아니요. 기존 계약 조건 그대로 유지돼요. 집주인이 올리려면 세입자 동의를 별도로 받아야 해요.",
  },
  {
    q: "묵시적갱신에 5% 상한이 적용되나요?",
    a: "적용 안 된다는 해석이 다수예요. 5% 인상 상한을 원한다면 계약갱신청구권을 쓰는 게 맞아요.",
  },
  {
    q: "집주인이 '나가라'고 하면 나가야 하나요?",
    a: "묵시적갱신 후에는 집주인이 일방적으로 못 내보내요. 세입자 의무 위반(월세 2개월 이상 연체 등) 없으면 나갈 필요 없어요.",
  },
  {
    q: "묵시적갱신은 몇 번까지 되나요?",
    a: "횟수 제한 없어요. 계약갱신청구권은 1회뿐이지만, 묵시적갱신은 아무 말 없으면 계속 반복돼요.",
  },
  {
    q: "묵시적갱신 중에 집이 팔리면 어떻게 되나요?",
    a: "대항력 있으면 새 집주인에게도 주장할 수 있어요. 묵시적갱신 기간 동안 보장받아요.",
  },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "주택임대차보호법 제6조(법제처)", url: "https://www.law.go.kr/법령/주택임대차보호법" },
      { label: "찾기쉬운 생활법령정보 — 임대차계약 갱신", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=629&ccfNo=4&cciNo=4&cnpClsNo=1" },
    ],
  },
];

const RELATED = [
  { slug: "묵시적갱신-월세-납부의무", title: "묵시적갱신 후 월세 의무", description: "묵시적갱신 중에도 월세를 내야 하는 이유를 설명해요." },
  { slug: "계약갱신청구권-기간", title: "계약갱신청구권 기간과 사용법", description: "5% 상한을 받으려면 갱신청구권이 맞는지 비교해보세요." },
  { slug: "전세-보증금-반환-청구-절차", title: "전세 보증금 반환 청구", description: "보증금 못 받을 때 법적 절차를 안내해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차 · 계약갱신</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        묵시적갱신, 아무 말 없으면 자동 연장?<br />
        조건·해지·갱신청구권 차이
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 2년 살았는데 계약 끝나가는 걸 깜빡했어요. 집주인도 아무 말 없고요.
        만료일이 지났는데 그냥 살고 있어요. 계약 끝난 거 아니냐고요?
        아니에요. 기존 조건 그대로 자동 연장된 거예요. 이게 묵시적갱신이에요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>묵시적갱신, 어떤 조건에서 성립하나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제6조</a>에 따라,
        임대인이 만료 6개월~2개월 전에 갱신 거절 통보를 안 하고, 임차인도 만료 2개월 전까지 이사 통보를 안 하면 자동으로 갱신돼요.
      </p>

      <GreenBox title="묵시적갱신 핵심 3줄">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li>양쪽 아무 말 없이 만료일 지나면 → 기존 조건으로 자동 2년 연장</li>
          <li>세입자는 3개월 전 통보로 언제든 해지 가능</li>
          <li>집주인은 세입자 의무 위반 없으면 일방 해지 불가</li>
        </ul>
      </GreenBox>

      <Divider />

      <H2>묵시적갱신되면 뭐가 달라지나요?</H2>
      <p style={body}>
        보증금, 월세, 특약사항 전부 기존과 동일하게 유지돼요.
        집주인이 &quot;갱신됐으니 보증금 올려야죠&quot;라고 하면요? 별도 합의 없이는 안 돼요.
        대항력·우선변제권도 그대로 유지되니 확정일자 다시 받을 필요 없어요.
      </p>

      <BorderBox title="묵시적갱신 vs 계약갱신청구권">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "#f0faf6" }}>
                <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
                <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>묵시적갱신</th>
                <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>계약갱신청구권</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["방식", "아무 말 안 하면 자동", "세입자가 적극 청구"],
                ["횟수", "제한 없음", "1회만"],
                ["5% 상한", "적용 안 될 수 있음", "적용됨"],
                ["세입자 해지", "3개월 전 통보", "합의 필요"],
                ["유리한 경우", "유연하게 이사할 때", "보증금 인상 막을 때"],
              ].map(([label, a, b], i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e5e5" }}>
                  <td style={{ padding: "8px 10px", fontWeight: 600, fontSize: 13 }}>{label}</td>
                  <td style={{ padding: "8px 10px", fontSize: 13 }}>{a}</td>
                  <td style={{ padding: "8px 10px", fontSize: 13 }}>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BorderBox>

      <Divider />

      <H2>이사 가고 싶으면 어떻게 통보하나요?</H2>
      <p style={body}>
        묵시적갱신 상태에서 이사 가고 싶으면 집주인에게 3개월 전에 해지를 통보하면 돼요.
        집주인 동의 필요 없어요. 통보만 하면 3개월 후 자동으로 계약이 종료돼요.
      </p>

      <SectionBadge>해지 통보 절차</SectionBadge>
      <Steps steps={[
        { title: "해지 의사 결정", desc: "이사 날짜를 정하고 역산해서 최소 3개월 전에 통보해야 해요." },
        { title: "내용증명 발송", desc: "'몇 월 며칠자로 계약을 해지합니다'라고 명확히 적어 보내세요.", tip: "우체국에서 내용증명 보내면 확실한 증거가 돼요." },
        { title: "3개월 경과 후 퇴거", desc: "통보일로부터 3개월 지나면 계약 종료. 보증금 돌려받고 이사하세요.", tip: "문자·카톡으로 보내도 유효하지만 내용증명이 가장 확실해요." },
      ]} />

      <Divider />

      <H2>내 상황에 맞는 행동은?</H2>
      <p style={body}>
        상황별로 해야 할 일이 달라요. 아래 체크리스트를 보고 본인에 해당하는 걸 확인하세요.
      </p>

      <Checklist items={[
        "계약 만료 다가온다 → 5% 상한 원하면 갱신청구권 행사 (6개월~2개월 전)",
        "유연하게 나가고 싶다 → 아무 말 안 하고 묵시적갱신 기다리기",
        "이미 묵시적갱신됐고 이사 간다 → 3개월 전 내용증명으로 해지 통보",
        "집주인이 나가라고 한다 → 만료 전 거절 통보 받았는지 확인 → 없으면 안 나가도 됨",
        "보증금 못 돌려받고 있다 → 임차권등기명령 신청 후 이사",
      ]} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법을 바탕으로 작성됐어요. 구체적인 사안은 법률 상담을 권장해요." />
    </ArticleLayout>
  );
}
