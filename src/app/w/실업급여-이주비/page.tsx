"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 실업급여 받다가 먼 곳에 취업했는데, 이사비용이 부담돼서 이주비라는 제도를 처음 들어보고 찾아보는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 이주비가 뭔지 이해하고, 본인이 받을 수 있는 대상인지 판단한 뒤 상세 신청 절차 글로 이동하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 이주비 정의, 취업촉진수당 중 하나라는 위치, 광역구직활동비와의 차이, 기본 수급 조건, 금액 범위.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(정의·핵심 요약) + BorderBox(광역구직활동비 비교) + EligibilityChecker(조건 확인) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const ELIG_ITEMS = [
  { id: "e1", label: "구직급여(실업급여)를 현재 받고 있어요" },
  { id: "e2", label: "거주지에서 취업한 회사까지 출퇴근이 어려운 거리예요" },
  { id: "e3", label: "취업 때문에 실제로 이사했어요 (또는 이사할 예정이에요)" },
  { id: "e4", label: "이사 후 고용센터에 청구서를 제출할 수 있어요" },
];

const FAQS = [
  { q: "이주비랑 광역구직활동비, 뭐가 다른가요?", a: "광역구직활동비는 면접 갈 때 교통비·숙박비를 지원하는 거예요. 이주비는 취업 후 실제로 이사할 때 이사비용을 지원하는 거죠. 시점이 다르고 목적도 달라요." },
  { q: "이사업체를 안 쓰고 직접 이사해도 받을 수 있나요?", a: "네, 직접 이사해도 이주비를 받을 수 있어요. 차량 렌트비나 유류비 영수증을 제출하면 돼요." },
  { q: "월세 보증금이나 중개수수료도 지원되나요?", a: "안 돼요. 이주비는 순수하게 짐을 옮기는 이사비용(운송비)만 해당돼요. 보증금, 월세, 중개수수료는 지원 대상이 아니에요." },
  { q: "가족이 함께 이사하면 더 많이 받나요?", a: "네. 본인만 이사하면 기본 금액이고, 가족과 함께 이사하면 가족 수에 따라 가산금이 붙어요." },
  { q: "조기재취업수당이랑 같이 받을 수 있나요?", a: "네, 이주비와 조기재취업수당은 별개 제도예요. 조건만 충족하면 둘 다 신청할 수 있어요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "고용보험법 제67조(이주비)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 취업촉진수당 안내", url: "https://www.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systId=SI00000412" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-이주비-신청-조건-및-금액", title: "이주비 신청 조건과 금액 상세", description: "이주비 신청 절차, 필요 서류, 금액 기준을 자세히 정리했어요." },
  { slug: "광역-구직활동비-신청-조건-및-금액", title: "광역 구직활동비 신청 조건", description: "먼 곳 면접 교통비·숙박비를 받을 수 있어요." },
  { slug: "조기재취업-수당-신청-조건-및-금액", title: "조기재취업 수당 신청 조건", description: "빨리 취업하면 남은 실업급여 50%를 한꺼번에 받아요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 취업촉진수당</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 이주비란?<br />
        취업 후 이사비용 지원받는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        겨우 취업했는데 회사가 다른 지역이에요. 이사비용 200만원, 실업급여 받던 통장에서 꺼내야 하나 고민되죠.
        이럴 때 이주비라는 제도가 있어요. 취업 때문에 이사하면 이사비용을 고용보험에서 지원해줘요.
        얼마나 받는지, 누가 받을 수 있는지 조건부터 짚어볼게요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>이주비가 정확히 뭔가요?</H2>
      <p style={body}>
        이주비는 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제67조</a>에 근거한 취업촉진수당이에요.
        실업급여 수급자가 멀리 있는 회사에 취업해서 이사해야 할 때, 이사비용 부담을 줄여주는 제도죠.
      </p>

      <GreenBox title="이주비 핵심 요약">
        <strong>대상</strong>: 구직급여 수급자 중 원거리 취업으로 이사하는 사람<br />
        <strong>지원 범위</strong>: 이삿짐 운송비(실비 지급, 상한액 있음)<br />
        <strong>지원 안 됨</strong>: 월세 보증금, 중개수수료, 인테리어비<br />
        <strong>가족 가산</strong>: 가족과 함께 이사하면 가족 수에 따라 추가 지급
      </GreenBox>

      <p style={body}>
        취업촉진수당에는 <a href="/w/조기재취업-수당-신청-조건-및-금액" style={{ color: "#1D9E75", textDecoration: "underline" }}>조기재취업수당</a>, 직업능력개발수당, <a href="/w/광역-구직활동비-신청-조건-및-금액" style={{ color: "#1D9E75", textDecoration: "underline" }}>광역구직활동비</a>, 이주비 이렇게 4가지가 있어요.
        이 중 이주비는 취업 확정 후 이사할 때 쓰는 거예요. 면접 갈 때 쓰는 건 광역구직활동비고요.
      </p>

      <Divider />

      <H2>광역구직활동비랑 헷갈리시죠?</H2>
      <p style={body}>
        이름이 비슷해서 자주 혼동해요. 둘 다 먼 거리 관련이긴 한데, 시점과 목적이 완전히 달라요.
      </p>

      <BorderBox>
        <strong>광역구직활동비</strong> = 면접 보러 갈 때 교통비·숙박비<br />
        <strong>이주비</strong> = 취업 확정 후 이사할 때 이사비용<br /><br />
        면접 다닐 때 광역구직활동비를 받고, 취업해서 이사할 때 이주비를 받는 구조예요. 둘 다 받을 수 있어요.
      </BorderBox>

      <p style={body}>
        그래서 먼 곳에 면접 보고 취업까지 했다면, 광역구직활동비와 이주비를 둘 다 챙길 수 있어요.
        조건이 다르니 각각 따로 신청해야 해요.
      </p>

      <Divider />

      <H2>받을 수 있는 조건부터 확인해봐요</H2>
      <p style={body}>
        이주비를 받으려면 단순히 먼 곳에 취업했다고 되는 게 아니에요.
        실제로 이사해야 하고, 구직급여를 받고 있는 상태여야 해요.
      </p>

      <SectionBadge>수급 자격 체크</SectionBadge>
      <EligibilityChecker
        items={ELIG_ITEMS}
        allMatchText="모든 조건을 충족하면 이주비를 받을 수 있어요!"
        partialMatchText="충족하지 못한 조건이 있으면 고용센터(☎ 1350)에 문의해보세요."
      />

      <p style={body}>
        자영업자 실업급여 수급자도 동일하게 이주비를 받을 수 있어요. 고용보험에 가입한 <a href="/w/자영업자-실업급여-수급-조건-및-신청-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>자영업자</a>라면 폐업 후 구직급여를 받는 동안 이주비 신청이 가능하죠.
        구체적인 신청 절차와 금액은 <a href="/w/실업급여-이주비-신청-조건-및-금액" style={{ color: "#1D9E75", textDecoration: "underline" }}>이주비 신청 조건과 금액</a> 글에서 자세히 다루고 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 구체적인 금액과 조건은 관할 고용센터(☎ 1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
