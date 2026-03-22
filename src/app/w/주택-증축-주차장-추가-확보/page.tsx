"use client";

// Q1. 주택 증축하려는데 주차장도 더 만들어야 하는지, 면제되는 경우는 없는지 궁금한 상황
// Q2. 내 건물이 면제 대상인지 확인하고, 추가 주차대수를 계산해서 허가 준비
// Q3. 세대당 1대(60㎡ 이하 0.7대), 원룸 0.6대(30㎡ 미만 0.5대), 5년 경과+1천㎡ 미만 면제, 지자체 조례 확인 필수
// Q4. GreenBox(주차대수 기준표) + BorderBox(면제 조건) + Steps(확인 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_STEPS = [
  {
    title: "건축물대장에서 현재 용도와 면적 확인",
    description: "정부24에서 건축물대장을 무료로 열람할 수 있어요. 현재 건물의 용도, 연면적, 세대수를 확인하세요.",
  },
  {
    title: "증축 후 면적과 세대수 계산",
    description: "증축 후 늘어나는 면적을 기준으로 추가 주차대수를 계산해요. 전용면적 60㎡ 초과 여부가 기준이 돼요.",
  },
  {
    title: "해당 지자체 주차장 조례 확인",
    description: "법정 주차대수는 지자체 조례로 정하기 때문에 서울과 부산이 다를 수 있어요. 구청이나 시청 건축과에 문의하세요.",
  },
  {
    title: "면제 조건 해당 여부 점검",
    description: "사용승인 후 5년 경과 + 연면적 1천㎡ 미만이면 일부 면제가 가능해요. 다만 다세대주택·다가구주택은 예외예요.",
  },
];

const FAQS = [
  {
    q: "주택 증축하면 무조건 주차장을 더 만들어야 하나요?",
    a: "원칙적으로 네. 면적이 늘면 주차 수요가 늘어난다고 보기 때문이에요. 다만 사용승인 후 5년 지난 1천㎡ 미만 건축물은 일부 면제될 수 있어요.",
  },
  {
    q: "세대당 주차대수 기준이 정확히 얼마인가요?",
    a: "전용면적 60㎡ 초과면 세대당 1대, 60㎡ 이하면 0.7대예요. 원룸형은 0.6대(30㎡ 미만 0.5대)로 더 낮아요.",
  },
  {
    q: "기계식 주차장으로 해도 되나요?",
    a: "지자체 조례에서 허용하면 가능해요. 기계식 주차장도 법정 주차대수에 포함될 수 있지만 설치 조건이 따로 있어요.",
  },
  {
    q: "주차장 기준을 못 맞추면 건축허가가 안 나나요?",
    a: "네, 부설주차장 기준 미충족이면 건축허가가 반려될 수 있어요. 증축 전에 반드시 주차장 확보 계획을 세워야 해요.",
  },
  {
    q: "지자체마다 기준이 다른 건 맞나요?",
    a: "맞아요. 주차장법은 큰 틀만 정하고, 세부 주차대수는 지자체 조례로 정해요. 같은 경기도 안에서도 시마다 다를 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "주차장법", url: "https://www.law.go.kr/법령/주차장법" },
      { label: "주차장법 시행령", url: "https://www.law.go.kr/법령/주차장법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "찾기쉬운 생활법령정보: 부설주차장", url: "https://easylaw.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "건축-증축-신고", title: "건축 증축 신고 방법", description: "증축 시 허가 vs 신고 판단이에요." },
  { slug: "건축허가-절차", title: "건축허가 절차", description: "건축허가 받는 전체 흐름이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 건축 · 주차장</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주택 증축하면 주차장도 더 만들어야 할까?<br />
        설치 기준과 면제 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        방 하나 늘리거나 층을 올리는 증축을 계획 중인데 주차장까지 추가로 만들어야 하는지 걱정되죠?
        원칙적으로 면적이 늘면 주차대수도 늘려야 해요.
        다만 일정 조건을 충족하면 면제받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>증축 시 주차대수 기준은 어떻게 되나요?</H2>
      <SectionBadge>설치 기준</SectionBadge>

      <p style={body}>
        <a href="https://www.law.go.kr/법령/주차장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주차장법</a>에 따라
        주택 증축 시 늘어난 면적에 맞춰 주차대수를 추가로 확보해야 해요.
        세대당 전용면적에 따라 기준이 달라요.
      </p>

      <GreenBox title="주택 유형별 세대당 주차대수">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>주택 유형</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>전용면적</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>세대당 주차대수</th>
            </tr>
          </thead>
          <tbody>
            {[
              { type: "일반 주택", area: "60㎡ 초과", count: "1대" },
              { type: "일반 주택", area: "60㎡ 이하", count: "0.7대" },
              { type: "원룸형 주택", area: "30㎡ 이상", count: "0.6대" },
              { type: "원룸형 주택", area: "30㎡ 미만", count: "0.5대" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{row.type}</td>
                <td style={{ padding: "5px 8px" }}>{row.area}</td>
                <td style={{ padding: "5px 8px" }}>{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        예를 들어 전용 55㎡ 아파트를 증축해서 75㎡로 넓히면 기준이 0.7대에서 1대로 올라가요.
        0.3대분의 주차공간을 추가로 확보해야 하는 거예요.
      </p>

      <Divider />

      <H2>추가 확보가 면제되는 경우도 있나요?</H2>

      <p style={body}>
        모든 증축에 주차장을 더 만들어야 하는 건 아니에요.
        <a href="https://www.law.go.kr/법령/주차장법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>주차장법 시행령</a>에서 일부 면제 조건을 두고 있어요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>면제 가능 조건</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}><strong>사용승인 후 5년 경과</strong> + <strong>연면적 1천㎡ 미만</strong> 건축물</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>단, 다세대주택·다가구주택·공연장·집회장·위락시설로 변경하는 경우는 제외</p>
        <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.9 }}>
          면제 여부는 지자체 조례에 따라 다를 수 있어요. 구청 건축과에 반드시 확인하세요.
        </p>
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>증축 전에 어떻게 확인하나요?</H2>
      <SectionBadge>확인 절차</SectionBadge>

      <p style={body}>
        주차장 기준을 못 맞추면 건축허가가 반려될 수 있어요.
        증축 계획 단계에서 미리 확인하는 게 중요해요.
      </p>

      <Steps steps={CHECK_STEPS} />

      <p style={{ ...body, marginTop: 14 }}>
        지자체별 기준이 다르기 때문에 가장 확실한 방법은 관할 구청·시청 건축과에 전화하는 거예요.
        2026년 6월에 주차장법 개정이 시행될 예정이라 기준이 바뀔 수도 있으니 최신 정보를 꼭 확인하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 주차장법 기준으로 작성됐어요. 지자체 조례에 따라 기준이 다를 수 있으니 관할 구청 건축과에서 확인하세요." />
    </ArticleLayout>
  );
}
