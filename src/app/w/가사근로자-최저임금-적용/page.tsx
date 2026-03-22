"use client";

// Q1. 가사도우미 일하는데(또는 고용하는데) 최저임금이 적용되는지 궁금한 상황
// Q2. 가사서비스 제공기관 소속 여부 확인 → 최저임금 적용 기준 파악 → 미달 시 신고
// Q3. 가사근로자법, 제공기관 소속 vs 개인 고용 차이, 2026년 시급 10,320원, 4대보험, 미달 시 처벌
// Q4. GreenBox(적용 기준 핵심) + CompareTable(기관 소속 vs 개인 고용) + BorderBox(미달 시 처벌) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { CompareTable } from "@/components/article-ui/CompareTable";

const COMPARE_ROWS = [
  { label: "최저임금 적용", optionA: "적용 (시급 10,320원)", optionB: "적용 제외 가능" },
  { label: "4대보험", optionA: "가입 의무 (정부 80% 지원)", optionB: "의무 아님" },
  { label: "근로기준법", optionA: "적용", optionB: "적용 제외" },
  { label: "퇴직금", optionA: "1년 이상 근무 시 지급", optionB: "법적 의무 없음" },
  { label: "근로계약서", optionA: "서면 교부 의무", optionB: "법적 의무 없음" },
  { label: "산재보험", optionA: "가입 의무", optionB: "임의 가입" },
];

const FAQS = [
  { q: "가사서비스 제공기관이 뭔가요?", a: "고용노동부에 인증받은 기관이에요. 이 기관 소속으로 일하면 근로기준법, 최저임금법이 적용돼요. 개인 가정에서 직접 고용하면 적용이 안 될 수 있어요." },
  { q: "개인 가정에서 고용한 가사도우미도 최저임금을 줘야 하나요?", a: "법적으로는 적용 제외예요. 하지만 가사근로자법 시행 이후 제공기관 소속이면 최저임금이 보장되니, 제공기관을 통해 고용하는 게 양쪽 모두 안전해요." },
  { q: "4대보험료를 누가 내나요?", a: "제공기관 소속이면 보험료의 80%를 정부가 지원해요. 근로자와 기관이 나머지를 분담해요." },
  { q: "최저임금 못 받으면 어디에 신고하나요?", a: "고용노동부 1350으로 전화하거나 관할 고용노동지청에 신고해요. 최저임금 미달 지급은 3년 이하 징역 또는 2천만 원 이하 벌금이에요." },
  { q: "가사근로자도 연차휴가가 있나요?", a: "제공기관 소속이면 근로기준법에 따라 연차유급휴가가 보장돼요. 1년 미만은 월 1일, 1년 이상은 15일이에요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "가사근로자의 고용개선 등에 관한 법률", url: "https://www.law.go.kr/법령/가사근로자의고용개선등에관한법률" },
    { label: "최저임금법", url: "https://www.law.go.kr/법령/최저임금법" },
  ]},
  { category: "기관", items: [
    { label: "고용노동부 가사서비스 안내", url: "https://www.moel.go.kr" },
  ]},
];

const RELATED = [
  { slug: "근로자의날-당연유급-제외대상", title: "근로자의 날 유급 기준", description: "근로자의 날 유급·제외 대상 기준이에요." },
  { slug: "단시간근로자-초과근무-강요", title: "단시간근로자 초과근무 강요", description: "파트타임 근로자 권리 보호예요." },
  { slug: "계약직-정규직-전환-기준-요건", title: "계약직 정규직 전환 기준", description: "2년 초과 시 자동 전환 요건이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        가사근로자도 최저임금 받을 수 있을까?<br />
        제공기관 소속 vs 개인 고용 차이
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        가사도우미 일을 하는데 최저임금보다 적게 받고 있거나, 가사도우미를 고용하면서 얼마를 줘야 하는지 고민되죠.
        가사서비스 제공기관 소속이면 2026년 기준 시급 10,320원 이상을 받아야 해요. 개인 가정 직접 고용은 적용이 다를 수 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>최저임금 적용 기준이 달라요</H2>
      <p style={body}>
        같은 가사근로자여도 누구에게 고용됐느냐에 따라 최저임금 적용 여부가 갈려요.
      </p>
      <GreenBox>
        <strong>가사서비스 제공기관 소속</strong> → 최저임금 적용 ✓ (시급 10,320원)<br />
        <strong>개인 가정 직접 고용</strong> → 최저임금 적용 제외 가능<br /><br />
        ★ 가사근로자법(2022년 시행)에 따라 인증 제공기관 소속 가사근로자는 근로기준법 전면 적용
      </GreenBox>

      <H2>제공기관 소속 vs 개인 고용 비교</H2>
      <p style={body}>
        4대보험, 퇴직금, 산재보험까지 차이가 커요. 제공기관을 통하면 정부 지원도 받을 수 있어요.
      </p>
      <CompareTable titleA="제공기관 소속" titleB="개인 가정 직접 고용" rows={COMPARE_ROWS} />

      <H2>최저임금 못 받으면 신고하세요</H2>
      <p style={body}>
        제공기관 소속인데 최저임금보다 적게 받으면 법 위반이에요. 신고하면 사업주에게 처벌이 내려져요.
      </p>
      <BorderBox>
        <strong>최저임금 미달 지급 시</strong><br />
        3년 이하 징역 또는 2천만 원 이하 벌금<br /><br />
        <strong>신고 방법</strong><br />
        고용노동부 고객센터 1350 전화<br />
        관할 고용노동지청 방문 또는 온라인 신고(minwon.moel.go.kr)<br /><br />
        ★ 제공기관 미인증 업체에서 일하면 보호를 못 받을 수 있으니 인증 여부를 먼저 확인하세요
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 가사근로자법·최저임금법 기준으로 작성됐어요. 개별 근로 조건은 고용노동부 1350에 상담받으세요." />
    </ArticleLayout>
  );
}
