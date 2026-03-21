"use client";

// Q1. 근처에 아파트나 건물이 들어선다는 소식을 들은 주택 소유자 : 내 집 햇빛이 가려질까 걱정하는 상황
// Q2. 건축법 기준을 파악해서 이격거리 위반 여부를 스스로 판단하고, 위반이면 구청에 이의 제기
// Q3. 높이 10m 이하 1.5m/초과 건물높이 절반 이격 기준, 적용 제외 케이스, 처벌 규정, 이의 제기 절차
// Q4. GreenBox(높이별 이격거리 표) + BorderBox(적용 제외 케이스) + Steps(이의 제기 절차)

import {
  H2, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "일조권 높이 제한은 모든 지역에 적용되나요?",
    a: "아니에요. 전용주거지역과 일반주거지역에만 적용돼요. 상업지역이나 공업지역 건물은 이 규정을 안 지켜도 돼요.",
  },
  {
    q: "높이 20m짜리 건물은 경계선에서 얼마나 떨어져야 하나요?",
    a: "10m 이상 떨어져야 해요. 10m 초과 부분은 건물 높이의 절반 이상 이격이 원칙이에요. 20m의 절반은 10m예요.",
  },
  {
    q: "옆집이 일조권 기준을 어기고 건물을 지으면 어떻게 되나요?",
    a: "도시지역 위반은 3년 이하 징역 또는 5억원 이하 벌금이에요. 건축주뿐 아니라 공사업자도 처벌받을 수 있어요.",
  },
  {
    q: "지구단위계획구역은 왜 적용 제외인가요?",
    a: "지구단위계획 수립 단계에서 이미 일조 문제를 검토하고 배치를 결정했기 때문이에요. 별도 기준이 적용돼요.",
  },
  {
    q: "허가가 난 뒤에도 이의를 제기할 수 있나요?",
    a: "허가 후에는 취소하기 훨씬 어려워요. 공사 시작 전, 허가 단계에서 구청에 이의를 제기하는 게 핵심이에요.",
  },
  {
    q: "인접 대지가 공업지역이면 일조 보호 못 받나요?",
    a: "맞아요. 옆 대지가 주거지역이 아니면 이 규정이 적용 안 돼요. 주거지역끼리 인접한 경우에 보호받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "건축법 제61조 (일조 등의 확보를 위한 건축물의 높이 제한)", url: "https://www.law.go.kr/법령/건축법" },
      { label: "찾기쉬운생활법령정보 : 일조 확보", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=298&ccfNo=3&cciNo=1&cnpClsNo=3" },
    ],
  },
];

const RELATED = [
  { slug: "건축물-용도변경-절차", title: "건축물 용도변경 절차", description: "용도 바꿀 때 허가·신고 절차예요." },
  { slug: "건축-허가-신청-방법", title: "건축 허가 신청 방법", description: "건축 허가를 받는 전체 절차예요." },
  { slug: "주택-증축-대수선-건축법-허가", title: "주택 증축·대수선 건축법", description: "기존 주택을 늘리거나 고칠 때 규정이에요." },
];

const STEPS = [
  { title: "설계도면 열람 신청", desc: "관할 구청 건축과에 방문해서 해당 건축물의 설계도면 열람을 신청하세요." },
  { title: "이격거리 직접 계산", desc: "도면에서 건물 높이와 정북방향 대지경계선까지 거리를 확인해요. 높이의 절반 이상인지 계산하세요." },
  { title: "기준 위반 시 이의 제기", desc: "기준 미달이면 구청에 서면으로 이의를 제기하세요. 허가 전 단계여야 효력이 커요." },
  { title: "위반 확정 시 고발", desc: "허가가 났는데도 기준을 어겼다면 관할 구청에 건축법 위반 신고를 하면 돼요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 건축법 · 일조권</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        일조 확보 주택 높이 제한 기준<br />
        이격거리 계산부터 이의 제기까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        옆에 고층 건물이 들어서면 내 집 햇빛이 가려질 수 있어요.
        건축법 제61조는 주거지역에서 건물 높이에 따라 정북방향으로 반드시 일정 거리를 띄우도록 규정해요.
        기준을 알면 직접 계산해서 위반 여부를 판단할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>높이별 이격거리 기준</H2>
      <p style={body}>
        전용주거지역·일반주거지역에서 건물을 지을 때는 정북방향 인접 대지경계선으로부터 아래 거리 이상 떨어져야 해요.
        높이 기준이 10m를 기점으로 달라져요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>건물 높이</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>최소 이격거리</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>예시</th>
            </tr>
          </thead>
          <tbody>
            {[
              { height: "10m 이하 부분", dist: "1.5m 이상", ex: "9m 건물 → 1.5m 이상" },
              { height: "10m 초과 부분", dist: "건물 높이 × 1/2 이상", ex: "20m 건물 → 10m 이상" },
              { height: "30m 건물 예시", dist: "15m 이상", ex: "30m × 1/2 = 15m" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.height}</td>
                <td style={{ padding: "5px 8px" }}>{row.dist}</td>
                <td style={{ padding: "5px 8px", fontSize: 12, color: "#555" }}>{row.ex}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 건축법 제61조 기준 / 정북방향 인접 대지경계선 기준 / 전용·일반주거지역만 해당
        </p>
      </GreenBox>

      <H2>적용 제외 케이스</H2>
      <p style={body}>
        모든 건물에 이 기준이 적용되지는 않아요.
        아래 경우는 일조 확보 높이 제한을 안 지켜도 법 위반이 아니에요.
      </p>

      <BorderBox>
        <strong>① 인접 대지가 주거지역이 아닌 경우</strong><br />
        옆 땅이 상업지역·공업지역이면 규정 적용 안 돼요. 주거지역끼리 인접해야 보호받을 수 있어요.<br />
        <br />
        <strong>② 지구단위계획구역 내 건축</strong><br />
        지구단위계획에서 이미 배치·일조를 검토했기 때문에 별도 기준이 적용돼요.<br />
        <br />
        <strong>③ 토지개발사업지구 내 건축</strong><br />
        전체 사업 계획에서 건물 배치를 이미 설계한 곳이에요.<br />
        <br />
        <strong>④ 기타 소규모 예외</strong><br />
        너비 2m 이하 소규모 대지, 건물 모든 부분이 경계선에서 2m 이상 이미 떨어진 경우도 예외예요.
      </BorderBox>

      <H2>위반 시 처벌 규정</H2>
      <p style={body}>
        건축법 일조 기준을 무시하고 건물을 지으면 건축주와 시공사 모두 처벌받을 수 있어요.
        생각보다 처벌 수위가 높아요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>위반 지역</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>처벌 기준</th>
            </tr>
          </thead>
          <tbody>
            {[
              { region: "도시지역 내 위반", penalty: "3년 이하 징역 또는 5억원 이하 벌금" },
              { region: "도시지역 밖 위반", penalty: "2년 이하 징역 또는 1억원 이하 벌금" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{row.region}</td>
                <td style={{ padding: "5px 8px" }}>{row.penalty}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 건축주뿐 아니라 시공업체도 동일하게 처벌 대상
        </p>
      </GreenBox>

      <H2>이의 제기 절차</H2>
      <p style={body}>
        근처에 새 건물이 들어선다는 소식을 들었다면 지금 바로 움직여야 해요.
        허가가 난 뒤에는 취소하기 훨씬 어렵고, 공사가 시작되면 되돌리기 사실상 불가능해요.
      </p>

      <Steps steps={STEPS} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 건축법 기준으로 작성됐어요. 지구단위계획구역 지정 현황과 지방자치단체 조례에 따라 기준이 다를 수 있어요. 정확한 적용 여부는 관할 구청 건축과에 문의하세요." />
    </ArticleLayout>
  );
}
