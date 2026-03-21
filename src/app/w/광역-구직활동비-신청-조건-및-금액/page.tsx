"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 실업급여 받으면서 먼 곳 면접을 앞두고 있는데, 교통비·숙박비가 부담돼서 지원받을 수 있는지 찾아보는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 면접 전 고용센터에 광역구직활동비를 신청하고, 면접 후 14일 이내에 청구서를 제출하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 25km 이상 거리 조건, 고용센터 소개 필수 여부, 교통비·숙박비 상한액, 신청 기한 14일, 필요 서류 4가지.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → EligibilityChecker(조건 확인) + Steps(신청 절차) + DocTable(서류 목록) + GreenBox(금액 요약) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, DocTable,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const ELIG_ITEMS = [
  { id: "e1", label: "구직급여(실업급여)를 현재 받고 있어요" },
  { id: "e2", label: "거주지에서 면접 장소까지 직선거리 25km 이상이에요" },
  { id: "e3", label: "고용센터 소개·알선으로 가는 면접이에요" },
  { id: "e4", label: "면접 후 14일 이내에 청구서를 제출할 수 있어요" },
];

const APPLY_STEPS = [
  { title: "면접 전 고용센터에 알리기", desc: "고용센터에서 소개받은 면접이어야 해요. 직접 지원한 면접도 사전에 고용센터 소장 승인을 받으면 인정돼요.", tip: "면접 가기 전에 꼭 고용센터에 먼저 연락하세요" },
  { title: "면접 보고 영수증 챙기기", desc: "교통비 영수증(기차표·버스표·주유 영수증)과 숙박 영수증을 반드시 보관하세요. 영수증이 없으면 지급이 안 돼요." },
  { title: "면접확인서 받기", desc: "면접 본 회사에서 면접확인서를 발급받아요. 현장에서 바로 요청하는 게 제일 편해요." },
  { title: "14일 이내 고용센터 제출", desc: "면접 종료일로부터 14일 이내에 광역구직활동비 청구서와 서류를 관할 고용센터에 제출하면 심사 후 입금돼요.", tip: "기한을 넘기면 지급이 불가능해요" },
];

const DOCS = [
  { name: "광역구직활동비 청구서", required: true, where: "고용센터 비치 또는 고용24 다운로드" },
  { name: "면접확인서", required: true, where: "면접 본 회사에서 발급" },
  { name: "교통비 영수증", required: true, where: "기차표·버스표·주유영수증 등" },
  { name: "숙박비 영수증", required: false, where: "1박 이상 숙박한 경우만" },
];

const FAQS = [
  { q: "직접 지원한 면접도 교통비를 받을 수 있나요?", a: "원칙적으로는 고용센터 소개 면접이어야 해요. 다만 면접 전에 고용센터 소장에게 승인을 받으면 직접 지원한 면접도 인정받을 수 있어요." },
  { q: "자가용으로 가면 어떻게 계산되나요?", a: "자가용 이용 시에는 같은 구간의 시외버스 또는 고속버스 요금을 기준으로 지급해요. 주유 영수증이 있으면 함께 제출하세요." },
  { q: "숙박비 상한액이 얼마예요?", a: "지역에 따라 달라요. 서울은 1박 최대 10만원, 광역시는 8만원, 그 외 지역은 7만원이에요. 공무원 여비규정을 준용해요." },
  { q: "하루에 면접 2곳 보면 2번 받을 수 있나요?", a: "같은 날 같은 지역에서 여러 면접을 봐도 교통비는 1회만 지급돼요. 숙박비도 실제 숙박한 일수만큼만 받아요." },
  { q: "자영업자 실업급여 수급자도 받을 수 있나요?", a: "네, 고용보험에 가입한 자영업자가 폐업 후 구직급여를 받고 있다면 동일하게 광역구직활동비를 신청할 수 있어요." },
  { q: "14일을 넘기면 절대 못 받나요?", a: "네, 면접 종료일로부터 14일이 지나면 청구 자체가 불가능해요. 면접 보고 바로 서류를 챙기는 게 중요해요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "고용보험법 제66조(광역 구직활동비)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행규칙 제111조", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
      { label: "고용24 취업촉진수당 안내", url: "https://www.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systId=SI00000412" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-이주비-신청-조건-및-금액", title: "실업급여 이주비 신청 조건과 금액", description: "취업 후 이사할 때 이사비용을 지원받을 수 있어요." },
  { slug: "조기재취업-수당-신청-조건-및-금액", title: "조기재취업 수당 신청 조건", description: "빨리 취업하면 남은 실업급여 50%를 한꺼번에 받아요." },
  { slug: "실업급여-신청-방법", title: "실업급여 신청 방법", description: "구직급여 신청 절차를 처음부터 끝까지 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 취업촉진수당</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        광역 구직활동비, 먼 곳 면접 교통비<br />
        신청 조건부터 금액까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        면접이 부산인데 본인은 서울이에요. 왕복 KTX만 10만원이 넘죠. 실업급여 받으면서 교통비까지 부담하기엔 빠듯해요.
        이럴 때 쓸 수 있는 제도가 광역 구직활동비예요. 거주지에서 25km 이상 떨어진 곳에 면접 보러 가면 교통비와 숙박비를 실비로 돌려받아요.
        다만 아무 면접이나 되는 건 아니고, 몇 가지 조건을 갖춰야 해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>내가 받을 수 있는 조건인지 먼저 체크해보세요</H2>
      <p style={body}>
        광역 구직활동비는 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제66조</a>에 근거한 취업촉진수당이에요.
        구직급여를 받고 있는 사람이 먼 거리 면접에 드는 비용을 지원받는 제도죠.
        아래 4가지를 모두 충족해야 신청할 수 있어요.
      </p>

      <SectionBadge>수급 자격 체크</SectionBadge>
      <EligibilityChecker
        items={ELIG_ITEMS}
        allMatchText="4가지 모두 충족하면 광역 구직활동비를 받을 수 있어요!"
        partialMatchText="체크되지 않은 조건이 있으면 지급이 어려워요. 고용센터에 먼저 확인해보세요."
      />

      <p style={body}>
        핵심은 두 가지예요. 거리 25km 이상, 그리고 고용센터 소개 면접이냐는 거예요.
        직접 지원한 면접이라도 사전에 고용센터 승인을 받으면 인정되니까, 면접 잡히면 바로 고용센터에 연락부터 하세요.
      </p>

      <Divider />

      <H2>교통비·숙박비, 얼마나 받을 수 있나요?</H2>
      <p style={body}>
        받을 수 있는 건 알겠는데, 금액이 얼마냐가 중요하죠.
        광역 구직활동비는 실제 사용한 교통비와 숙박비를 실비로 지급해요. 물론 상한액이 정해져 있어요.
      </p>

      <GreenBox title="금액 기준 (2026년 3월)">
        <strong>교통비</strong>: 철도·버스는 실비, 자가용은 시외버스 요금 기준으로 지급<br />
        <strong>숙박비</strong>: 서울 1박 최대 10만원 / 광역시 8만원 / 기타 지역 7만원<br />
        <strong>항공</strong>: 경제석 요금 범위 내 실비 지급<br />
        ※ 공무원 여비규정(별표 5)을 준용해요
      </GreenBox>

      <p style={body}>
        예를 들어 서울에서 부산까지 KTX로 면접 보러 갔다면, 왕복 KTX 요금 + 숙박비(1박 시)를 합산해서 받아요.
        영수증을 꼭 챙겨야 해요. 영수증 없이는 한 푼도 못 받아요.
      </p>

      <Divider />

      <H2>신청은 이 순서로 진행돼요</H2>
      <p style={body}>
        면접 전에 해야 할 것, 면접 후에 해야 할 것이 구분돼요.
        특히 신청 기한이 14일밖에 안 되니까 미리 순서를 알아두는 게 좋아요.
      </p>

      <SectionBadge>신청 4단계</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <Divider />

      <H2>필요한 서류, 미리 준비해두세요</H2>
      <p style={body}>
        면접 당일에 바로 서류를 챙겨야 14일 이내에 여유 있게 제출할 수 있어요.
        면접확인서는 현장에서 바로 요청하는 게 가장 편하죠.
      </p>

      <SectionBadge>제출 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        숙박 영수증은 당일 왕복이 불가능해서 1박 이상 한 경우에만 필요해요. 당일 면접이면 교통비 영수증만 준비하면 돼요.
        서류가 준비됐다면 관할 <a href="https://www.work24.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용센터</a>에 방문하거나 온라인으로 제출하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법 및 고용보험법 시행규칙을 바탕으로 작성됐어요. 구체적인 금액과 조건은 관할 고용센터(☎ 1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
