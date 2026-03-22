"use client";

// Q1. 내 집을 식당으로 바꿔서 장사하고 싶은데 뭐부터 해야 하는지 모르는 상황
// Q2. 용도변경 허가 신청 → 공사 → 사용승인 → 영업신고 순서대로 진행하기
// Q3. 건축법 시설군(8군→7군=허가), 신청 서류, 공사 기준(소방·환기), 100㎡ 사용승인, 영업신고 절차
// Q4. Steps(전체 절차 4단계) + GreenBox(허가 vs 신고 구분표) + BorderBox(준비 서류) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, Checklist,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "주택→음식점 용도변경에 얼마나 걸리나요?", a: "허가 2~4주, 공사 2주~2개월, 사용승인 1~2주, 영업신고 즉시예요. 전체적으로 1~3개월 정도 잡으세요." },
  { q: "허가 없이 간판 달고 장사하면 어떻게 되나요?", a: "불법 건축물로 이행강제금이 부과되고, 원상복구 명령을 받을 수 있어요. 영업정지 처분도 나올 수 있고요." },
  { q: "전용주거지역에서도 가능한가요?", a: "전용주거지역은 음식점 영업이 제한될 수 있어요. 구청 도시계획과에서 용도지역 제한을 먼저 확인하세요." },
  { q: "바닥면적 100㎡ 미만이면 사용승인이 필요 없나요?", a: "네. 100㎡ 미만이면 사용승인 절차를 생략할 수 있어요. 다만 허가 자체는 필요해요." },
  { q: "건축사 도움이 꼭 필요한가요?", a: "법적 의무는 아니지만 강력히 권해요. 평면도 작성, 서류 준비, 관청 대응까지 건축사가 하면 훨씬 빠르고 정확해요." },
  { q: "공사비는 대략 얼마나 드나요?", a: "규모에 따라 다르지만, 소방·환기·화장실 공사비로 보통 1천만원~5천만원 정도 들어요. 인테리어 별도예요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "건축법 (용도변경)", url: "https://www.law.go.kr/법령/건축법" },
      { label: "찾기쉬운 생활법령정보 - 용도변경", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1150" },
      { label: "정부24 (용도변경 허가 신청)", url: "https://www.gov.kr" },
    ],
  },
];

const RELATED = [
  { slug: "건축물-용도변경-시설군-확인", title: "건축물 용도변경 시설군", description: "시설군 분류와 허가·신고 기준이에요." },
  { slug: "서울-상가-경매-임차보증금-회수", title: "상가 경매 보증금 회수", description: "상가 임차인 우선변제권을 다뤄요." },
  { slug: "불법건축물-이행강제금-부과-기준", title: "불법건축물 이행강제금", description: "무허가 용도변경 시 제재 기준이에요." },
];

const STEPS_DATA = [
  { title: "구청에 용도변경 허가 신청", desc: "건축·대수선·용도변경 허가 신청서와 변경 후 평면도를 구청 건축과에 제출하세요. 정부24에서 온라인 신청도 가능해요. 처리 기간은 약 2~4주예요.", tip: "건축사 도움 받으면 서류 작성이 훨씬 수월해요" },
  { title: "음식점 기준에 맞게 공사", desc: "허가가 나면 주방 설비, 환기 시설, 소방시설, 화장실을 음식점 기준에 맞게 설치하세요. 공사 기간은 건물 상태에 따라 2주~2개월이에요." },
  { title: "사용승인 신청 (100㎡ 이상)", desc: "바닥면적 합계가 100㎡ 이상이면 공사 완료 후 사용승인을 신청해야 해요. 구청 담당자가 현장 검사 후 승인해요. 약 1~2주 소요돼요.", tip: "100㎡ 미만이면 이 단계 생략 가능" },
  { title: "음식점 영업신고", desc: "구청 위생과 또는 정부24에서 영업신고를 하세요. 건강진단결과서, 위생교육 이수증, 시설 평면도가 필요해요. 보통 즉시 처리돼요." },
];

const CHECKLIST = [
  "건축물대장에서 현재 용도 확인 (구청 또는 정부24)",
  "용도지역 확인 (전용주거지역이면 음식점 제한 가능)",
  "등기부등본으로 건물 소유 관계 확인",
  "주방·화장실·환기시설 공사 범위 파악",
  "건축사 또는 인테리어 업체 견적 받기",
  "위생교육 이수 (한국외식산업협회 등)",
  "건강진단결과서 발급 (보건소)",
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 용도변경 · 음식점 창업</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        집을 식당으로 바꾸려면?<br />
        용도변경 허가부터 영업신고까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        좋은 위치에 내 집이 있으니 임대료 걱정 없이 음식점을 하고 싶죠?
        건축법상 주택(8군)에서 음식점(7군)으로 바꾸는 건 상위 시설군 변경이라 용도변경 허가가 필요해요.
        그냥 간판 달고 시작하면 불법 건축물이 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>왜 허가가 필요한가요?</H2>
      <p style={body}>
        건축법 시행령 별표 1에서 건축물을 시설군으로 분류하고 있어요.
        주택은 8군(주거업무 시설군), 음식점은 7군(근린생활 시설군)이에요.
        하위→상위 시설군 변경은 허가 대상이죠.
      </p>

      <GreenBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>변경 방향</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>시설군</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>필요 절차</th>
            </tr>
          </thead>
          <tbody>
            {[
              { dir: "주택 → 음식점", group: "8군 → 7군 (상위)", proc: "용도변경 허가" },
              { dir: "음식점 → 주택", group: "7군 → 8군 (하위)", proc: "용도변경 신고" },
              { dir: "같은 시설군 내", group: "같은 군", proc: "건축물대장 기재사항 변경" },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 700 }}>{row.dir}</td>
                <td style={{ padding: "5px 8px" }}>{row.group}</td>
                <td style={{ padding: "5px 8px" }}>{row.proc}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: "#666", marginTop: 8, marginBottom: 0 }}>
          ★ 건축법 시행령 별표 1 기준 / 상위 시설군 = 더 엄격한 기준 적용
        </p>
      </GreenBox>

      <H2>허가부터 영업까지 4단계</H2>
      <p style={body}>
        순서를 알고 나면 생각보다 어렵지 않아요. 하나씩 진행하면 돼요.
      </p>

      <Steps steps={STEPS_DATA} />

      <H2>시작 전 체크리스트</H2>
      <p style={body}>
        허가 신청하기 전에 아래 사항을 미리 점검하세요.
        빠뜨리면 보완 요청이 오거나 허가가 지연돼요.
      </p>

      <Checklist items={CHECKLIST} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 건축법·식품위생법 기준으로 작성됐어요. 용도지역별 제한과 지자체 조례는 구청 건축과에 직접 확인하세요." />
    </ArticleLayout>
  );
}
