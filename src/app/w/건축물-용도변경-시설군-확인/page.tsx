"use client";

// Q1. 가게 업종을 바꾸거나 창고를 판매시설로 고치려는 사람이 용도변경 허가가 필요한지 신고인지 확인하는 상황
// Q2. 현재 시설군 확인 → 변경 방향(상위/하위/동일) 판단 → 허가·신고·건축물대장 변경 중 선택
// Q3. 시설군 1~9군 분류 / 상위→허가 / 하위→신고 / 동일→건축물대장 변경만 / 구청 건축과 신청 / 임대 건물 소유자 동의 필요
// Q4. GreenBox(시설군 9개 분류표) + BorderBox(허가vs신고vs변경 비교) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const APPLY_STEPS = [
  {
    title: "건축물대장 확인",
    description: "구청 민원24 또는 정부24에서 현재 건물 용도와 시설군을 확인해요. '건축물대장 열람' 메뉴에서 무료로 조회 가능해요.",
  },
  {
    title: "변경 방향 판단",
    description: "바꾸려는 용도의 시설군 번호를 확인해요. 번호가 커지면 상위(허가), 작아지면 하위(신고), 같으면 건축물대장 변경만 하면 돼요.",
  },
  {
    title: "관할 구청 건축과 방문 또는 온라인 신청",
    description: "허가·신고: 관할 구청이나 시청 건축과에 신청해요. 온라인은 세움터(cloud.eais.go.kr)에서 가능해요. 건축물대장 변경: 건축물대장 기재사항 변경신청서만 제출해요.",
  },
  {
    title: "심사 또는 접수 완료",
    description: "허가는 서류 검토·주차장·소방시설 심사까지 2~4주 소요돼요. 신고는 접수 즉시 처리되지만 위법 사항이 발견되면 시정명령을 받을 수 있어요.",
  },
];

const FAQS = [
  {
    q: "7군 안에서 슈퍼마켓을 음식점으로 바꾸면 허가 받아야 하나요?",
    a: "같은 7군 안에서 바뀌는 거라서 건축물대장 기재사항 변경신청만 하면 돼요. 허가나 신고 없이 가능해요. 다만 음식점 영업허가는 별도로 구청 위생과에 신청해야 해요.",
  },
  {
    q: "창고(2군)를 판매시설(5군)로 바꾸려면 어떻게 해야 하나요?",
    a: "2군에서 5군으로 올라가는 거라 허가가 필요해요. 주차장, 소방시설 등 부대시설 기준을 충족하는지 검토가 필요해서 2~4주 정도 걸려요. 구청 건축과에 용도변경 허가 신청서를 제출하세요.",
  },
  {
    q: "임대한 건물을 용도변경 하려면 건물주 동의가 필요한가요?",
    a: "네, 필요해요. 용도변경은 건물의 공적 기록을 바꾸는 거라서 소유자(건물주)의 동의가 있어야 해요. 임대차계약서에 용도변경 관련 조항이 있는지 먼저 살펴봐요.",
  },
  {
    q: "용도변경 없이 다른 용도로 쓰면 어떻게 되나요?",
    a: "불법 용도변경으로 시정명령을 받을 수 있어요. 시정하지 않으면 이행강제금(건축법 제80조)이 부과돼요. 최대 건물 시가의 10%까지 부과될 수 있으니 반드시 적법하게 변경 후 사용하세요.",
  },
  {
    q: "시설군은 어디서 확인하나요?",
    a: "건축법 시행령 별표 1의2를 보면 돼요. 법제처 홈페이지에서 '건축법 시행령'을 검색하면 각 용도별 시설군 번호를 확인할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "건축법 제19조 (용도변경)", url: "https://www.law.go.kr/법령/건축법" },
      { label: "건축법 시행령 별표 1의2 (시설군 분류)", url: "https://www.law.go.kr/법령/건축법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "찾기쉬운생활법령정보: 용도변경 절차", url: "https://www.easylaw.go.kr" },
      { label: "세움터: 용도변경 온라인 신청", url: "https://cloud.eais.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "용도변경-허가-신청",
    title: "용도변경 허가 신청 방법",
    description: "허가가 필요한 경우 구청 건축과 신청 절차예요.",
  },
  {
    slug: "건축물대장-변경",
    title: "건축물대장 기재사항 변경 방법",
    description: "동일 시설군 내 변경 시 필요한 절차예요.",
  },
  {
    slug: "건축신고-절차",
    title: "건축 신고 절차",
    description: "소규모 건축 및 대수선 신고 방법이에요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 건축물 · 용도변경</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        건축물 용도변경, 허가인가요 신고인가요?<br />
        시설군으로 판단하는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        창고를 가게로 바꾸거나 음식점을 사무실로 바꾸려는데 허가를 받아야 하는지 신고만 하면 되는지 헷갈리죠?
        답은 <strong>시설군</strong>을 보면 바로 나와요.
        바꾸려는 용도의 시설군 번호가 높아지면 허가, 낮아지면 신고, 같으면 건축물대장 변경만 하면 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>시설군이란 무엇인가요?</H2>
      <SectionBadge>시설군 개념</SectionBadge>

      <p style={body}>
        <a href="https://www.law.go.kr/법령/건축법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>건축법 시행령</a>은
        모든 건물 용도를 29가지로 정하고, 이를 비슷한 것끼리 묶어서 9개 시설군으로 분류해요.
        1군부터 9군까지 있는데, 숫자가 클수록 상위 시설군이에요.
      </p>
      <p style={body}>
        시설군이 중요한 이유는 딱 하나예요.
        어느 군에서 어느 군으로 바뀌는지에 따라 허가가 필요한지, 신고만 하면 되는지, 아니면 건축물대장 변경만으로 끝나는지 결정되거든요.
        내가 바꾸려는 용도가 몇 군인지 알면 절차가 바로 나와요.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>시설군</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>포함 용도 (주요 예시)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { 군: "1군 (자동차 관련)", 예시: "주차장, 세차장, 자동차 판매장" },
              { 군: "2군 (산업 관련)", 예시: "공장, 창고시설, 위험물 저장시설" },
              { 군: "3군 (전기·통신 관련)", 예시: "발전소, 방송국, 통신시설" },
              { 군: "4군 (문화·집회 관련)", 예시: "공연장, 전시관, 종교시설, 관람장" },
              { 군: "5군 (영업 관련)", 예시: "판매시설, 운수시설, 숙박시설, 위락시설" },
              { 군: "6군 (교육·복지 관련)", 예시: "학교, 아동복지시설, 노인복지시설" },
              { 군: "7군 (근린생활)", 예시: "슈퍼마켓, 음식점, 사무소, 서비스업소" },
              { 군: "8군 (주거)", 예시: "단독주택, 공동주택, 다중주택" },
              { 군: "9군 (그 외)", 예시: "의료시설, 교정시설, 묘지 관련 시설" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700, whiteSpace: "nowrap" }}>{row.군}</td>
                <td style={{ padding: "5px 8px", fontSize: 12 }}>{row.예시}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 정확한 분류는 건축법 시행령 별표 1의2 참조 / 세부 용도별 시설군 번호 확인 필수
        </p>
      </GreenBox>

      <Divider />

      <H2>허가, 신고, 건축물대장 변경 중 어떤 게 필요한가요?</H2>

      <p style={body}>
        시설군 변경 방향에 따라 절차가 세 가지로 나뉘어요.
        상위 시설군으로 올라갈수록 규모나 용도 특성이 달라지기 때문에 더 엄격한 심사를 거쳐요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>변경 방향별 필요 절차</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>
          <strong>높은 번호 군 → 낮은 번호 군</strong>: 신고만 하면 돼요 (예: 7군 음식점 → 2군 창고)
        </p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>
          <strong>낮은 번호 군 → 높은 번호 군</strong>: 허가 필요 (예: 2군 창고 → 5군 판매시설)
        </p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>
          <strong>같은 군 내에서 변경</strong>: 건축물대장 기재사항 변경신청만 (예: 7군 슈퍼마켓 → 7군 음식점)
        </p>
        <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.9 }}>
          ★ 허가 처리기간 2~4주 / 신고는 접수 후 즉시 / 건축물대장 변경은 1~3일
        </p>
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>용도변경 신청 절차는 어떻게 되나요?</H2>
      <SectionBadge>신청 절차</SectionBadge>

      <p style={body}>
        시설군 확인이 끝났다면 실제 신청 단계로 넘어가요.
        허가든 신고든 관할 구청 건축과가 창구예요.
        임대 건물이라면 건물주(소유자) 동의가 먼저예요.
        동의 없이 신청하면 반려돼요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <p style={{ ...body, marginTop: 14 }}>
        용도변경 허가가 나더라도 영업허가는 별도예요.
        음식점이라면 위생과, 의료기관이라면 보건소에서 별도 허가를 받아야 해요.
        두 가지를 헷갈려서 건축 허가만 받고 영업을 시작했다가 문제가 생기는 경우가 있으니 주의하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 건축법 시행령 기준으로 작성됐어요. 시설군 분류와 허가 기준은 법 개정으로 바뀔 수 있으니 관할 구청 건축과에 살펴봐요." />
    </ArticleLayout>
  );
}
