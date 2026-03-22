"use client";

// Q1. 실업급여 받다가 빨리 취업했는데, 남은 실업급여를 돌려받을 수 있는지 궁금한 상황이에요.
// Q2. 조기재취업수당 자격 조건을 확인하고, 받을 금액을 계산한 뒤 고용센터나 고용24에서 신청하는 행동.
// Q3. 지급 조건 5가지(잔여일수 1/2 이상, 12개월 고용, 월 574만원 이하, 2년 내 미수급, 새 직장), 금액 계산 공식, 신청 시기·방법.
// Q4. EligibilityChecker(자격 확인) + GreenBox(금액 계산 공식) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIG_ITEMS = [
  { id: "e1", label: "실업급여 소정급여일수의 1/2 이상 남기고 취업했어요" },
  { id: "e2", label: "새 직장에서 12개월 이상 계속 고용됐어요 (또는 12개월 이상 사업 영위)" },
  { id: "e3", label: "월 급여가 574만원 미만이에요 (2026년 기준)" },
  { id: "e4", label: "최근 2년 내 조기재취업수당을 받은 적 없어요" },
  { id: "e5", label: "이전 직장(최후 이직 사업주)이 아닌 새로운 곳에 취업했어요" },
  { id: "e6", label: "실업신고 후 14일이 지난 뒤 취업했어요" },
];

const STEPS = [
  { title: "12개월 고용 유지", desc: "재취업한 날부터 12개월 이상 계속 근무해야 해요. 65세 이상이면 6개월이에요.", tip: "12개월 채우기 전에 신청하면 반려돼요" },
  { title: "서류 준비", desc: "조기재취업수당 청구서, 재직증명서(또는 고용보험 가입 확인서), 신분증, 통장 사본을 챙기세요." },
  { title: "고용24 온라인 신청", desc: "고용24(ei.go.kr) 접속 → 로그인 → 구직급여 → 조기재취업수당 청구 클릭 → 재취업 정보 입력 → 서류 첨부 → 제출하면 끝이에요.", tip: "관할 고용센터 방문 신청도 가능해요" },
  { title: "심사 후 지급", desc: "1~2주 심사 후 지정 계좌로 입금돼요. 서류 미비 시 보완 요청이 올 수 있어요." },
];

const FAQS = [
  { q: "창업해도 조기재취업수당 받을 수 있나요?", a: "네, 가능해요. 스스로 영리 목적의 사업을 12개월 이상 영위하면 동일한 조건으로 받을 수 있어요." },
  { q: "소정급여일수 180일인데 100일 받고 취업하면?", a: "남은 일수가 80일이고, 1/2인 90일보다 적어서 대상이 안 돼요. 반드시 90일 이상 남겨야 해요." },
  { q: "구직급여일액 상한액이 얼마예요?", a: "2026년 기준 66,000원이에요. 대부분의 수급자가 이 범위 안에 들어가요." },
  { q: "12개월 채우기 전에 다시 퇴사하면 어떻게 되나요?", a: "조기재취업수당은 받지 못해요. 다만 다시 실업급여를 신청할 수 있는지 별도로 확인해보세요." },
  { q: "프리랜서로 일하면 인정되나요?", a: "고용보험 가입이 확인되거나 사업자등록 후 12개월 이상 영위하면 가능해요. 단순 프리랜서는 인정이 어려울 수 있으니 고용센터에 문의하세요." },
  { q: "신청 기한이 따로 있나요?", a: "법정 기한은 없지만, 12개월 이후 1~2년 안에 신청하는 게 안전해요. 너무 오래 지나면 기록 확인이 어려워질 수 있어요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "고용보험법 제64조 (법제처)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 조기재취업수당 안내", url: "https://www.ei.go.kr" },
      { label: "정부24 조기재취업수당", url: "https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A05007&CappBizCD=14900000076&tp_seq=" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-계산기", title: "실업급여 계산기", description: "내 구직급여일액과 소정급여일수를 미리 계산해보세요." },
  { slug: "실업급여-신청-방법", title: "실업급여 신청 방법", description: "실업급여 신청 절차를 처음부터 끝까지 안내해요." },
  { slug: "실업급여-수급-조건", title: "실업급여 수급 조건", description: "실업급여를 받으려면 어떤 조건이 필요한지 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 조기재취업</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        조기재취업수당, 얼마나 받을까?<br />
        자격 조건과 금액 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        실업급여 다 받기 전에 취업했는데, 남은 금액은 그냥 사라지는 걸까요?
        아니에요. 빨리 취업하면 남은 실업급여의 절반을 조기재취업수당으로 돌려받을 수 있어요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 제64조</a>에서 보장하는 제도예요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>내가 받을 수 있는지 확인해보세요</H2>
      <p style={body}>
        아래 6가지를 모두 충족해야 조기재취업수당을 받을 수 있어요. 하나라도 빠지면 대상이 안 되니 꼼꼼히 체크해보세요.
      </p>

      <EligibilityChecker
        items={ELIG_ITEMS}
        allMatchText="모든 조건을 충족해요! 12개월 후 고용24에서 신청하세요."
        partialMatchText="일부 조건이 충족되지 않아요. 해당 항목을 확인해보세요."
      />

      <p style={body}>
        특히 &quot;소정급여일수 1/2 이상 남기고 취업&quot; 조건이 제일 중요해요. 소정급여일수가 180일이라면 최소 90일 이상 남겨야 하고, 120일이라면 60일 이상 남겨야 해요.
      </p>

      <Divider />

      <H2>수당 금액은 이렇게 계산해요</H2>
      <p style={body}>
        계산 공식은 단순해요. <strong>구직급여일액 x 남은 일수 x 1/2</strong>이에요.
      </p>

      <GreenBox title="조기재취업수당 계산 예시">
        소정급여일수 180일, 50일 수급 후 취업한 경우<br /><br />
        · 구직급여일액: 66,000원 (2026년 상한액)<br />
        · 남은 일수: 180일 - 50일 = 130일<br />
        · <strong>조기재취업수당: 66,000원 x 130일 x 1/2 = 약 429만원</strong>
      </GreenBox>

      <p style={body}>
        같은 조건에서 100일 수급 후 취업했다면 남은 일수가 80일이에요. 1/2인 90일보다 적어서 수당 대상이 안 돼요. 빨리 취업할수록 금액이 커지는 구조예요.
      </p>

      <BorderBox>
        2026년 구직급여일액 상한액은 66,000원이에요. 대부분의 수급자가 이 범위 안에 해당돼요.
        정확한 금액은 <a href="/w/실업급여-계산기" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여 계산기</a>에서 확인할 수 있어요.
      </BorderBox>

      <Divider />

      <H2>신청은 12개월 후, 이렇게 하면 돼요</H2>
      <p style={body}>
        재취업한 날부터 정확히 12개월이 지나야 신청할 수 있어요.
        1년간 계속 고용됐다는 걸 확인하는 절차라서, 11개월 29일에 신청하면 반려돼요.
      </p>

      <SectionBadge>신청 절차 4단계</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>못 받는 경우도 있어요</H2>
      <p style={body}>
        조건을 다 갖춘 것 같은데도 지급이 안 되는 경우가 있어요. 미리 알아두면 헛수고를 줄일 수 있죠.
      </p>

      <BorderBox>
        지급 제외 사유 4가지예요.<br /><br />
        · 이전 직장(최후 이직 사업주)에 다시 고용된 경우<br />
        · 실업신고 전에 이미 채용 약속이 있었던 경우<br />
        · 최근 2년 이내에 조기재취업수당을 받은 적 있는 경우<br />
        · 월 급여 574만원 이상인 경우 (2026년 기준)
      </BorderBox>

      <p style={body}>
        실업신고 전에 면접을 보고 합격 통보를 받았다면, 실업신고 이후에 취업한 것으로 볼 수 없어요.
        이 경우 조기재취업수당 대상에서 제외되니 주의하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 고용24 자료를 바탕으로 작성됐어요. 구직급여일액과 소정급여일수는 개인마다 다르니, 정확한 금액은 고용24에서 확인하세요." />
    </ArticleLayout>
  );
}
