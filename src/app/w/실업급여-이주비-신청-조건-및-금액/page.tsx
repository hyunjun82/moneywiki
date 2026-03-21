"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 이주비가 있다는 건 알겠는데, 구체적으로 얼마 받는지·서류가 뭔지·언제까지 신청해야 하는지 실행 정보가 필요한 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 이사 완료 후 필요 서류를 준비해서 고용센터에 이주비 청구서를 제출하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 수급 조건 3가지, 금액 기준(본인/가족별), 신청 기한, 필요 서류 5가지, 고용센터 제출 방법.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → EligibilityChecker(조건) + GreenBox(금액) + Steps(절차) + DocTable(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, DocTable,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const ELIG_ITEMS = [
  { id: "e1", label: "구직급여(실업급여)를 받고 있는 상태에서 취업했어요" },
  { id: "e2", label: "거주지에서 취업한 회사까지 출퇴근이 곤란한 거리예요" },
  { id: "e3", label: "취업한 회사 근처로 실제 이사를 했어요 (주민등록 이전 완료)" },
];

const APPLY_STEPS = [
  { title: "취업 확정 후 이사 완료", desc: "취업한 회사 근처로 이사하고 주민등록 전입신고까지 마치세요. 이사하기 전에 신청하는 게 아니라, 이사 완료 후에 신청하는 거예요.", tip: "전입신고가 핵심 증빙이에요" },
  { title: "서류 준비", desc: "이주비 청구서, 근로계약서, 주민등록등본, 이사비 영수증, 가족관계증명서(가족 이사 시)를 준비하세요." },
  { title: "고용센터에 제출", desc: "관할 고용센터를 방문하거나 고용24에서 온라인 제출해요. 이사 후 빠른 시일 내에 신청하는 게 좋아요.", tip: "이사 후 14일 이내 제출을 권장해요" },
  { title: "심사 후 입금", desc: "고용센터에서 서류를 확인하고 심사가 끝나면 지정 계좌로 이주비가 입금돼요." },
];

const DOCS = [
  { name: "이주비 청구서", required: true, where: "고용센터 비치 또는 고용24 다운로드" },
  { name: "근로계약서 사본", required: true, where: "취업한 회사에서 발급" },
  { name: "주민등록등본", required: true, where: "정부24 또는 주민센터 발급 (이사 확인용)" },
  { name: "이사비 영수증", required: true, where: "이삿짐센터 영수증 또는 차량 렌트·유류비 영수증" },
  { name: "가족관계증명서", required: false, where: "가족과 함께 이사한 경우만 (대법원 전자가족관계등록시스템)" },
];

const FAQS = [
  { q: "정확한 금액이 얼마예요?", a: "이주비는 이사에 실제로 든 비용을 실비로 지급하되 상한액이 있어요. 본인만 이사하면 기본 금액, 가족과 함께 이사하면 가족 수에 따라 가산금이 붙어요. 정확한 상한액은 고용센터(☎ 1350)에서 확인하세요." },
  { q: "이사업체 안 쓰고 직접 이사하면요?", a: "직접 이사해도 받을 수 있어요. 차량 렌트비, 유류비 영수증, 톨비 영수증 등을 모아서 제출하면 돼요." },
  { q: "고용센터 소개로 취업해야만 하나요?", a: "이주비는 고용센터 소개 여부와 상관없이 받을 수 있어요. 본인이 직접 취업한 곳이라도 조건을 충족하면 지급 대상이에요. 광역구직활동비와 헷갈리기 쉬운 부분이에요." },
  { q: "취업 전에 먼저 이사해도 되나요?", a: "원칙적으로 취업 확정 후 이사해야 해요. 취업 전에 이사한 경우에는 인정받기 어려울 수 있으니 고용센터에 사전 확인하세요." },
  { q: "조기재취업수당이랑 동시에 받을 수 있나요?", a: "네, 이주비와 조기재취업수당은 별개 제도예요. 조건만 충족하면 둘 다 신청할 수 있어요." },
  { q: "자영업자도 이주비를 받을 수 있나요?", a: "고용보험에 가입한 자영업자가 폐업 후 구직급여를 받고 있다면, 동일하게 이주비를 신청할 수 있어요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "고용보험법 제67조(이주비)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행규칙 제113조", url: "https://www.law.go.kr/법령/고용보험법시행규칙" },
      { label: "고용24 취업촉진수당 안내", url: "https://www.work24.go.kr/cm/c/f/1100/selecSystInfo.do?systId=SI00000412" },
    ],
  },
];

const RELATED = [
  { slug: "광역-구직활동비-신청-조건-및-금액", title: "광역 구직활동비 신청 조건과 금액", description: "먼 곳 면접 교통비·숙박비를 지원받을 수 있어요." },
  { slug: "조기재취업-수당-신청-조건-및-금액", title: "조기재취업 수당 신청 조건", description: "빨리 취업하면 남은 실업급여 50%를 한꺼번에 받아요." },
  { slug: "실업급여-신청-방법", title: "실업급여 신청 방법", description: "구직급여 신청 절차를 처음부터 끝까지 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 취업촉진수당</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 이주비, 신청 조건과 금액<br />
        서류 준비부터 제출까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        취업했는데 회사가 다른 도시예요. 이사비용만 수백만원인데, 고용보험에서 이사비를 돌려준다는 거 알고 계시죠?
        이주비 제도를 쓰면 이삿짐 운송비를 실비로 지원받을 수 있어요.
        조건이 까다롭지 않으니, 서류만 제대로 챙기면 돼요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>먼저 내가 받을 수 있는지 확인해봐요</H2>
      <p style={body}>
        이주비는 <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제67조</a>에 따른 취업촉진수당이에요.
        3가지 조건을 모두 충족하면 받을 수 있어요. 광역구직활동비와 달리 고용센터 소개 여부는 상관없어요.
      </p>

      <SectionBadge>수급 자격 체크</SectionBadge>
      <EligibilityChecker
        items={ELIG_ITEMS}
        allMatchText="3가지 모두 충족하면 이주비를 받을 수 있어요!"
        partialMatchText="충족하지 못한 조건이 있으면 고용센터(☎ 1350)에 확인해보세요."
      />

      <p style={body}>
        핵심은 &ldquo;취업 때문에 이사했느냐&rdquo;예요. 단순히 먼 곳에 취업만 하고 출퇴근하면 이주비 대상이 아니에요. 실제로 이사하고 전입신고까지 마쳐야 하죠.
        그런데 금액이 얼마나 되는지가 궁금하시죠.
      </p>

      <Divider />

      <H2>이주비 금액, 가족 수에 따라 달라져요</H2>
      <p style={body}>
        이주비는 실제 이사에 든 비용을 실비로 지급해요. 상한액이 있고, 가족과 함께 이사하면 가산금이 붙어요.
      </p>

      <GreenBox title="이주비 금액 기준 (2026년 3월)">
        <strong>본인만 이사</strong>: 기본 금액 (이삿짐 운송 실비, 상한액 있음)<br />
        <strong>2인 가구</strong>: 기본 금액 + 가족 가산금<br />
        <strong>3인 이상</strong>: 기본 금액 + 가족 수별 가산금<br /><br />
        ※ 정확한 상한액은 &ldquo;이주비 고시&rdquo;와 &ldquo;공무원 여비규정&rdquo;에 따라 결정돼요<br />
        ※ 관할 고용센터(☎ 1350)에서 본인 해당 금액을 확인하세요
      </GreenBox>

      <p style={body}>
        이사업체 영수증이 제일 깔끔해요. 직접 이사한 경우에는 차량 렌트비·유류비·톨비 영수증을 모아서 제출하면 돼요.
        영수증이 없으면 지급이 어렵기 때문에, 이사할 때부터 영수증을 꼭 보관하세요.
      </p>

      <Divider />

      <H2>신청 절차, 이 순서대로 하세요</H2>
      <p style={body}>
        이주비는 이사 완료 후에 신청하는 거예요. 이사하기 전에 미리 신청하는 게 아니에요.
        순서를 정리하면 이렇게 돼요.
      </p>

      <SectionBadge>이주비 신청 4단계</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <Divider />

      <H2>서류는 이렇게 준비하세요</H2>
      <p style={body}>
        서류가 좀 많아 보이지만, 대부분 이사하면서 자연스럽게 모이는 것들이에요.
        가족과 함께 이사한 경우에만 가족관계증명서가 추가되고, 나머지는 전부 기본 서류예요.
      </p>

      <SectionBadge>제출 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        근로계약서는 취업 증빙용이에요. 주민등록등본은 이사 사실을 확인하는 용도고요.
        서류가 다 준비되면 관할 <a href="https://www.work24.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용센터</a>에 방문하거나 고용24에서 온라인 제출하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법 및 시행규칙을 바탕으로 작성됐어요. 이주비 상한액은 고시에 따라 변동될 수 있으니 관할 고용센터(☎ 1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
