"use client";

// Q1. 건물을 새로 짓거나 관리하면서 급수관 검사를 언제 받아야 하는지 모르는 상황. 준공검사 때 필요한지 궁금.
// Q2. 본인 건물의 급수관 검사 시기를 확인하고 시군구 수도과에 신청하는 행동.
// Q3. 준공검사용 검사 시기, 정기검사 주기(준공 5년 후 + 2년 주기), 검사 항목, 비용, 불합격 시 조치.
// Q4. GreenBox(핵심 시기) + BorderBox(비용·소요시간) + Checklist(검사 전 준비) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "급수관 검사 안 받으면 어떻게 되나요?",
    a: "준공검사를 받을 수 없어요. 급수관 검사 합격증이 있어야 건축물 사용승인이 나오거든요.",
  },
  {
    q: "급수관 검사 비용은 얼마예요?",
    a: "건물 규모에 따라 10만~50만원이에요. 단독주택은 10~20만원, 아파트·오피스텔은 30~50만원 정도예요.",
  },
  {
    q: "아파트는 관리사무소가 알아서 해주나요?",
    a: "네, 공동주택은 관리사무소에서 정기적으로 수질검사와 급수설비 점검을 해요. 보통 연 1~2회 실시해요.",
  },
  {
    q: "단독주택도 급수관 검사를 받아야 하나요?",
    a: "의무는 아니지만, 가족 건강을 위해 몇 년에 한 번씩 수질검사를 받는 게 좋아요. 시군구 보건소에 의뢰하면 돼요.",
  },
  {
    q: "검사 불합격하면 어떻게 되나요?",
    a: "문제점 보완 후 재검사를 받아야 해요. 재검사 비용은 초기 검사보다 적게 들지만, 준공 일정이 늦어질 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "수도법", url: "https://www.law.go.kr/법령/수도법" },
      { label: "수도법 시행규칙", url: "https://www.law.go.kr/법령/수도법시행규칙" },
    ],
  },
];

const RELATED = [
  { slug: "건축-준공검사", title: "건축 준공검사 절차", description: "건물 완공 후 사용승인 받는 전체 절차를 안내해요." },
  { slug: "건축물-사용승인", title: "건축물 사용승인 신청", description: "사용승인에 필요한 서류와 진행 순서예요." },
  { slug: "상수도-공급-신청", title: "상수도 공급 신청 방법", description: "새 건물에 수돗물 공급 신청하는 절차예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 건축 · 검사</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        급수관 검사, 언제 받아야 하나요?<br />
        준공검사·정기검사 시기와 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        건물을 짓거나 관리하면서 급수관 검사를 언제 받아야 하는지 헷갈리시죠?
        준공 전에 받는 검사와 사용 중 받는 정기검사가 있고, 시기가 다 달라요.
        <a href="https://www.law.go.kr/법령/수도법" style={{ color: "#1D9E75", textDecoration: "underline" }}>수도법</a>에서 정한 기준을 정리했어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>급수관 검사 시기, 핵심 정리</H2>

      <GreenBox>
        <strong>두 가지만 기억하면 돼요.</strong><br />
        · <strong>준공검사용</strong>: 급수관 공사 완료 후, 건축 준공검사 전에 받아야 해요<br />
        · <strong>정기검사</strong>: 준공 후 5년 경과 시점에서 6개월 이내 최초 검사 → 이후 2년마다
      </GreenBox>

      <p style={body}>
        준공검사 전에 급수관 검사 합격증이 없으면 건축물 사용승인 자체가 안 나와요.
        공사 일정 짤 때 급수관 검사 일정도 미리 넣어두는 게 중요해요.
      </p>

      <Divider />

      <H2>준공검사용 급수관 검사</H2>
      <p style={body}>
        새 건물을 짓거나 급수설비를 대대적으로 개조했다면 준공검사 전에 받아야 해요.
        배관 연결과 시운전이 끝난 시점, 보통 마감 공사 전에 신청해요.
      </p>
      <p style={body}>
        신청은 시군구 수도과나 상수도사업소에 하면 돼요.
        급수설비 준공도면, 시공 내역서, 수질검사 성적서를 제출하고,
        보통 신청 후 1~2주 안에 검사관이 현장 방문해요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>정기검사(일반검사) 주기</H2>
      <p style={body}>
        사용 중인 건물은 <a href="https://www.law.go.kr/법령/수도법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>수도법 시행규칙</a>에 따라
        준공 후 5년이 지난 날부터 6개월 이내에 최초 검사를 받아요.
        이후에는 2년마다 정기적으로 받으면 돼요.
      </p>
      <p style={body}>
        수돗물 색깔이 이상하거나 수압이 약해졌다면 정기검사 시기가 아니라도 점검받는 게 좋아요.
        아파트·오피스텔은 관리사무소에서 연 1~2회 수질검사를 하니까 게시판 공지를 확인하세요.
      </p>

      <Divider />

      <H2>검사 항목과 합격 기준</H2>
      <p style={body}>
        검사관이 현장에서 확인하는 항목은 크게 네 가지예요.
      </p>

      <BorderBox>
        <strong>① 수질</strong> — 대장균·유해물질 불검출, 색도·탁도·냄새 기준 이내<br />
        <strong>② 수압</strong> — 각 층 최소 기준 이상, 최상층도 정상 출수<br />
        <strong>③ 누수</strong> — 배관·연결부 누수 없음, 저수조 균열 없음<br />
        <strong>④ 위생</strong> — 저수조 내부 청결, 이물질·벌레 없음, 뚜껑 밀폐
      </BorderBox>

      <p style={body}>
        하나라도 기준 미달이면 불합격이에요.
        보수 후 재검사를 받아야 하고, 재검사도 시간이 걸리니 준공 일정에 여유를 두세요.
      </p>

      <SectionBadge>검사 전 준비 체크리스트</SectionBadge>
      <Checklist items={[
        "모든 배관 연결 완료 및 시운전 실시",
        "저수조 내부 청소 및 소독 완료",
        "수질검사 성적서 사전 확보",
        "급수설비 준공도면·시공 내역서 준비",
        "검사 일정 사전 예약 (신청 후 1~2주 소요)",
      ]} />

      <Divider />

      <H2>검사 비용과 소요 시간</H2>

      <BorderBox>
        <strong>비용 (건물 규모별)</strong><br />
        · 단독주택: 10~20만원<br />
        · 아파트·오피스텔: 30~50만원<br />
        · 수질검사 비용 별도 부과 가능<br /><br />
        <strong>소요 시간</strong><br />
        · 현장 검사: 단독주택 1~2시간 / 공동주택 반나절~하루<br />
        · 신청~합격증 발급: 1~2주
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 수도법과 수도법 시행규칙을 바탕으로 작성했어요. 지역별 검사 절차·비용이 다를 수 있으니, 관할 시군구 수도과에 직접 확인해봐요." />
    </ArticleLayout>
  );
}
