"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 보증 서줬는데 채권자가 주채무자한테 안 가고 나한테 먼저 돈 달라고 해서, 거부할 수 있는 권리가 있는지 궁금한 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 단순보증인인지 확인하고, 최고·검색의 항변권을 내용증명으로 행사하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 단순보증 vs 연대보증 차이, 민법 437조·438조, 항변권 행사 요건(변제자력+집행 용이 입증), 채권자 해태 시 면제.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(핵심 결론) + BorderBox(단순 vs 연대 비교) + Steps(대응 절차) + Checklist(행사 전 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "연대보증인도 최고의 항변권을 쓸 수 있나요?",
    a: "아니요. 연대보증인은 최고·검색의 항변권이 없어요. 채권자가 바로 청구하면 즉시 갚아야 해요.",
  },
  {
    q: "보증계약서에 '연대보증'이라고 안 써있으면요?",
    a: "연대보증이라는 문구가 없다면 단순보증으로 추정돼요. 계약서를 꼼꼼히 확인하세요.",
  },
  {
    q: "항변권 행사했는데 채권자가 무시하면요?",
    a: "민법 438조에 따라, 채권자가 게을리해서 주채무자로부터 못 받은 만큼 보증인 의무가 면제돼요.",
  },
  {
    q: "주채무자 재산을 어떻게 증명하나요?",
    a: "부동산 등기부등본, 예금통장 사본, 급여명세서 등으로 증명할 수 있어요. 정확한 재산 목록이 있으면 유리해요.",
  },
  {
    q: "주채무자가 재산이 전혀 없으면요?",
    a: "주채무자에게 변제자력이 없으면 항변권을 행사할 수 없어요. 보증인이 갚아야 해요.",
  },
  {
    q: "보증인이 갚은 돈은 돌려받을 수 있나요?",
    a: "네. 보증인이 채무를 이행하면 주채무자에게 구상권을 행사할 수 있어요. 다만 주채무자에게 재산이 없으면 실질적으로 돌려받기 어렵긴 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "민법 제437조·제438조(법제처)", url: "https://www.law.go.kr/법령/민법" },
      { label: "찾기쉬운 생활법령정보 — 보증인의 항변권", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1209&ccfNo=4&cciNo=1&cnpClsNo=2" },
      { label: "대한법률구조공단", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연대보증-단순보증-차이", title: "연대보증과 단순보증 차이", description: "보증 유형별 책임 범위가 어떻게 다른지 확인하세요." },
  { slug: "보증인-권리-보호", title: "보증인 권리 보호", description: "보증 서기 전 알아야 할 권리를 정리했어요." },
  { slug: "보험금-분쟁조정-신청-방법", title: "금융 분쟁조정 신청", description: "금융 관련 분쟁 해결 방법도 확인해보세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 보증 · 채무</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        보증인인데 나한테 먼저 돈 달라고?<br />
        최고·검색의 항변권 사용법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        보증 서줬더니 채권자가 주채무자한테 가보지도 않고 나한테 먼저 돈 달라고 하네요.
        단순보증인이라면 &quot;주채무자한테 먼저 가세요&quot;라고 당당히 거부할 수 있어요.
        <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제437조</a>가 이 권리를 보장하고 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>최고·검색의 항변권이 뭔가요?</H2>
      <p style={body}>
        쉽게 말해 &quot;나한테 오기 전에 주채무자한테 먼저 돈 달라고 하고(최고), 그 사람 재산부터 집행해보세요(검색)&quot;라고 요구하는 권리예요.
      </p>

      <GreenBox title="핵심 3줄">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          <li><strong>단순보증인</strong>만 사용 가능 (연대보증인은 불가)</li>
          <li>주채무자에게 변제 능력이 있고 집행이 쉽다는 걸 보증인이 입증해야 함</li>
          <li>채권자가 게을리하면 그만큼 보증인 책임 면제 (민법 438조)</li>
        </ul>
      </GreenBox>

      <Divider />

      <H2>단순보증과 연대보증, 어떻게 다른가요?</H2>
      <p style={body}>
        이 한 단어 차이로 보증인의 책임이 완전히 달라져요.
      </p>

      <SectionBadge>비교</SectionBadge>
      <BorderBox title="단순보증 vs 연대보증">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "#f0faf6" }}>
                <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
                <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>단순보증</th>
                <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>연대보증</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["최고·검색 항변권", "있음", "없음"],
                ["책임 순서", "주채무자 먼저 → 보증인", "즉시 보증인에게 청구 가능"],
                ["채권자 선택", "주채무자 먼저 청구해야", "아무에게나 청구 가능"],
                ["실무상 빈도", "드묾", "대부분 연대보증"],
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

      <H2>항변권 행사는 어떻게 하나요?</H2>
      <p style={body}>
        채권자에게 내용증명으로 항변권을 행사한다는 의사를 전달하세요. 주채무자의 재산 자료를 함께 첨부하면 효과적이에요.
      </p>

      <Steps steps={[
        { title: "보증 종류 확인", desc: "계약서에서 '연대보증'인지 '단순보증'인지 확인하세요. 연대보증 문구 없으면 단순보증으로 추정돼요." },
        { title: "주채무자 재산 조사", desc: "부동산 등기부등본, 예금, 급여채권 등을 확인해서 변제 능력을 파악하세요." },
        { title: "내용증명 발송", desc: "'민법 437조에 따른 최고·검색의 항변권을 행사합니다. 주채무자에게 먼저 청구하세요'라는 내용과 재산 목록을 첨부하세요." },
        { title: "채권자 대응 확인", desc: "채권자가 주채무자에게 청구하는지 지켜보세요. 게을리하면 보증인 면제 주장 가능해요.", tip: "채권자가 무시하면 법률구조공단(klac.or.kr) 상담을 받으세요." },
      ]} />

      <Divider />

      <H2>항변권 행사 전 꼭 체크하세요</H2>

      <Checklist items={[
        "보증계약서에 '연대보증' 문구 있는지 확인",
        "주채무자에게 갚을 능력(재산)이 있는지 확인",
        "주채무자 재산에 대한 집행이 쉬운지 확인",
        "내용증명으로 항변 의사 전달 준비",
        "주채무자 재산 증빙자료(등기부등본 등) 확보",
      ]} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 민법을 바탕으로 작성됐어요. 구체적인 사안은 변호사 또는 법률구조공단 상담을 권장해요." />
    </ArticleLayout>
  );
}
