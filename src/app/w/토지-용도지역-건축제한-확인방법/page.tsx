"use client";

// Q1. 귀농이나 전원주택을 위해 땅을 알아보는데, 용도지역(생산녹지·농림·그린벨트)에 따라 집을 못 지을 수도 있다는 걸 알고 확인하려는 상황.
// Q2. 토지이음 등에서 용도지역을 확인하고, 내가 짓고 싶은 건물이 가능한지 판단한 뒤 관할 시청에 문의하는 행동.
// Q3. 용도지역 4대 분류, 토지이음·브이월드 확인법, 생산녹지(건폐율 20%)·농림지역(건폐율 20%+농지전용)·그린벨트(원칙 금지·조건부 허가) 차이, 도시계획조례 확인 필요성.
// Q4. Steps(확인 절차) + BorderBox(용도지역별 비교표) + GreenBox(핵심 체크) + Checklist(구매 전 점검) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CHECK_STEPS = [
  { title: "토지이음에서 용도지역 확인", desc: "토지이음(eum.go.kr)에 접속해서 주소나 지번을 입력하면 용도지역·용도지구·용도구역이 한눈에 나와요. 무료이고 회원가입도 필요 없어요.", tip: "브이월드(vworld.kr)에서는 지도로 시각적으로 확인 가능" },
  { title: "건폐율·용적률 확인", desc: "같은 용도지역이라도 지자체 조례에 따라 건폐율·용적률이 달라요. 해당 시·군 도시계획조례를 확인하세요." },
  { title: "건축 가능 건물 종류 확인", desc: "용도지역마다 지을 수 있는 건물 종류가 정해져 있어요. 주택은 되는데 상업시설은 안 되는 곳도 있어요." },
  { title: "관할 시청 건축과 문의", desc: "토지 지번을 알려주고 '이 땅에 단독주택을 지을 수 있나요?' 물어보면 담당 공무원이 바로 확인해줘요." },
];

const PRE_PURCHASE = [
  "토지이음에서 용도지역·지구·구역 확인 완료",
  "해당 지자체 도시계획조례에서 건폐율·용적률 확인",
  "농지 전용 허가 필요 여부 확인 (농림지역)",
  "개발제한구역(그린벨트) 여부 확인",
  "문화재 보호구역·상수원 보호구역 등 추가 규제 확인",
  "관할 시청 건축과에 건축 가능 여부 전화 확인",
  "현장 방문하여 실제 상태 직접 확인",
];

const FAQS = [
  { q: "토지 용도지역은 어디서 확인하나요?", a: "토지이음(eum.go.kr)이 가장 편해요. 주소만 입력하면 용도지역·지구·구역 정보가 무료로 나와요. 브이월드(vworld.kr)에서는 지도로 시각적 확인도 가능해요." },
  { q: "개발제한구역에 아예 집을 못 짓나요?", a: "아니에요, 조건부로 가능해요. 구역 지정 전부터 거주했거나 농사짓는 사람이면 승인 가능하지만, 단순히 땅 사서 집 짓겠다는 건 승인 어려워요." },
  { q: "생산녹지지역에 음식점 지을 수 있나요?", a: "원칙적으로 안 돼요. 생산녹지는 농업 관련 시설, 단독주택, 근린생활시설 일부만 가능해요. 음식점은 불가한 경우가 많아요." },
  { q: "농림지역에서 전원주택 짓기 어렵나요?", a: "실제로 농사짓는 사람의 농가주택은 비교적 쉽게 허가돼요. 단순 전원주택 목적은 농지 전용 허가가 필요하고 어려울 수 있어요." },
  { q: "용도지역이 나중에 바뀔 수 있나요?", a: "네. 도시계획 변경으로 농림지역이 관리지역이나 도시지역으로 변경될 수 있어요. 시청에서 변경 계획을 확인할 수 있어요." },
  { q: "한 땅이 여러 용도지역에 걸쳐 있으면요?", a: "각 지역별 규정을 따로 적용해야 해요. 보통 더 엄격한 규정이 적용되니 전문가 상담이 필요해요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "국토의 계획 및 이용에 관한 법률(법제처)", url: "https://www.law.go.kr/법령/국토의계획및이용에관한법률" },
      { label: "토지이음(국토교통부)", url: "https://www.eum.go.kr" },
      { label: "브이월드(국토교통부)", url: "https://www.vworld.kr" },
      { label: "용도지역 건폐율·용적률(생활법령정보)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=298&ccfNo=3&cciNo=1&cnpClsNo=2" },
    ],
  },
];

const RELATED = [
  { slug: "건폐율-용적률", title: "건폐율 용적률", description: "건폐율·용적률 개념과 용도지역별 기준이에요." },
  { slug: "농지-전용허가", title: "농지 전용 허가", description: "농지에 집 짓기 위한 전용 허가 절차예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 토지 · 건축</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이 땅에 집을 지을 수 있을까?
        <br />
        <span style={{ fontSize: 18, fontWeight: 500, color: "#555" }}>
          용도지역 확인부터 건축 제한까지
        </span>
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        귀농하려고 땅을 보는데 생산녹지, 농림지역, 그린벨트 같은 용어가 쏟아지죠.
        같은 200평이어도 용도지역에 따라 집을 지을 수 있는 곳과 없는 곳이 갈려요.
        온라인에서 무료로 확인하는 방법부터 정리할게요.
      </p>

      <Divider />

      <H2>용도지역 확인하는 4단계 절차</H2>
      <p style={body}>
        가장 확실한 건 <a href="https://www.eum.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>토지이음</a>에서 직접 확인하는 거예요.
        집에서 무료로 할 수 있어요.
      </p>
      <SectionBadge>확인 절차</SectionBadge>
      <Steps steps={CHECK_STEPS} />

      <Divider />

      <H2>용도지역별 건축 제한이 어떻게 다른가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/국토의계획및이용에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>국토의 계획 및 이용에 관한 법률</a>에 따라
        모든 토지는 용도지역으로 분류돼 있어요. 지역마다 건축 가능 범위가 전혀 달라요.
      </p>
      <SectionBadge>용도지역별 비교</SectionBadge>
      <BorderBox title="주요 용도지역 건축 제한 비교">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, lineHeight: 1.8, minWidth: 460 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #1D9E75" }}>
                <th style={{ padding: "8px 4px", textAlign: "left" }}>용도지역</th>
                <th style={{ padding: "8px 4px", textAlign: "left" }}>건폐율</th>
                <th style={{ padding: "8px 4px", textAlign: "left" }}>건축 가능</th>
                <th style={{ padding: "8px 4px", textAlign: "left" }}>주의사항</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px 4px", fontWeight: 600 }}>생산녹지</td>
                <td style={{ padding: "8px 4px" }}>20% 이하</td>
                <td style={{ padding: "8px 4px" }}>단독주택, 농업시설</td>
                <td style={{ padding: "8px 4px" }}>상업시설 원칙 불가</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px 4px", fontWeight: 600 }}>농림지역</td>
                <td style={{ padding: "8px 4px" }}>20% 이하</td>
                <td style={{ padding: "8px 4px" }}>농가주택, 농업시설</td>
                <td style={{ padding: "8px 4px" }}>농지전용 허가 필요</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px 4px", fontWeight: 600 }}>개발제한(그린벨트)</td>
                <td style={{ padding: "8px 4px" }}>조건부</td>
                <td style={{ padding: "8px 4px" }}>승인 시 일부 가능</td>
                <td style={{ padding: "8px 4px", color: "#c00" }}>원칙적 건축 금지</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px 4px", fontWeight: 600 }}>제1종 주거</td>
                <td style={{ padding: "8px 4px" }}>60% 이하</td>
                <td style={{ padding: "8px 4px" }}>단독주택, 근생시설</td>
                <td style={{ padding: "8px 4px" }}>4층 이하 제한</td>
              </tr>
              <tr>
                <td style={{ padding: "8px 4px", fontWeight: 600 }}>일반상업</td>
                <td style={{ padding: "8px 4px" }}>80% 이하</td>
                <td style={{ padding: "8px 4px" }}>대부분 가능</td>
                <td style={{ padding: "8px 4px" }}>건축 자유도 높음</td>
              </tr>
            </tbody>
          </table>
        </div>
      </BorderBox>
      <p style={body}>
        100평 땅에 건폐율 20%면 건물을 20평까지만 지을 수 있어요. 구체적인 비율은 해당 지자체 도시계획조례에서 정하니 꼭 확인하세요.
      </p>

      <Divider />

      <H2>그린벨트에서도 집을 지을 수 있나요?</H2>
      <p style={body}>
        개발제한구역(그린벨트)은 가장 엄격해요. 원칙적으로 건축이 금지되지만, 예외적으로 승인받을 수 있어요.
      </p>
      <GreenBox title="그린벨트 건축 승인 조건">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2.2 }}>
          <li>구역 지정 전부터 거주하던 사람의 주택 증·개축</li>
          <li>실제 농사짓는 사람의 농가주택·농업시설</li>
          <li>종교시설, 교육시설 등 공익 목적 건축</li>
          <li>구역 목적에 위배되지 않는 범위에서 개발행위 승인</li>
        </ul>
      </GreenBox>
      <p style={body}>
        단순히 땅을 사서 집 짓겠다는 건 승인 어려워요. 승인 기준이 까다롭기 때문에 그린벨트 내 토지 매수 전 반드시 관할 시청에 확인하세요.
      </p>

      <Divider />

      <H2>땅 사기 전 꼭 점검할 체크리스트</H2>
      <p style={body}>
        용도지역 정보만으로는 부족해요. 다른 법률 규제도 함께 확인해야 실수를 막을 수 있어요.
      </p>
      <SectionBadge>구매 전 필수 점검</SectionBadge>
      <Checklist items={PRE_PURCHASE} />

      <Divider />

      <ArticleAd />

      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />

      <RelatedArticles items={RELATED} />

      <Disclaimer text="이 글은 2026년 3월 기준 법령 정보를 바탕으로 작성했어요. 지자체 조례에 따라 세부 기준이 다르니 반드시 관할 시청에 확인하세요." />
    </ArticleLayout>
  );
}
