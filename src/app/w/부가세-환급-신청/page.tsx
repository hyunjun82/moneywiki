"use client";
// Q1. 부가세 신고 후 환급이 나왔다는 걸 알게 된 사업자가 언제 받는지, 어떻게 신청하는지 모르는 상황
// Q2. 환급 일정을 확인하고 조기환급 해당 여부를 판단해서 가능하면 빨리 환급받는다
// Q3. 일반환급(30일), 조기환급(15일), 조기환급 대상, 홈택스 조회 방법, 환급 못 받는 경우
// Q4. BorderBox(환급 일정) + Steps(조기환급 절차) + Checklist(환급 확인 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "부가세 신고 시 조기환급 신청란 체크하세요",
    desc: "홈택스에서 부가세 확정신고를 작성할 때 '조기환급 신청' 란이 있어요. 영세율 사업자라면 이 칸에 체크하고 수출 증빙을 첨부하면 돼요. 설비 투자 사업자라면 설비 매입 증빙(세금계산서 등)을 첨부해야 해요. 신청하지 않으면 자동으로 일반환급으로 처리돼요.",
    tip: "조기환급 = 신고 후 15일 이내 / 일반환급 = 30일 이내",
    link: { label: "홈택스 바로가기", href: "https://www.hometax.go.kr" },
  },
  {
    title: "매월 조기환급이 필요하면 '월별 조기환급' 신청하세요",
    desc: "수출이 매달 있는 영세율 사업자는 6개월마다 기다리지 않고 매월 환급받을 수 있어요. 홈택스 '신고/납부 → 부가가치세 → 월별 조기환급'에서 해당 월의 매입·매출세액을 입력하고 신청하면 돼요. 매월 25일까지 신청해야 해요.",
    tip: "월별 조기환급 신청 기한: 매월 25일까지",
  },
  {
    title: "홈택스에서 환급 상태를 조회하세요",
    desc: "홈택스 로그인 후 '조회/발급 → 국세환급 → 환급금 상세조회'에서 처리 상태를 볼 수 있어요. '지급 대기' 상태면 처리 중인 거고, '지급 완료'면 이미 계좌에 입금된 거예요. 신고 직후에는 아직 조회가 안 될 수 있으니 신고 다음 날 이후에 확인해봐요.",
    tip: "환급 계좌가 해지됐거나 잘못 입력하면 입금이 안 될 수 있어요",
  },
  {
    title: "입금이 안 됐다면 계좌부터 점검해봐요",
    desc: "지급 완료로 뜨는데 통장에 안 들어왔다면 신고 시 등록한 환급 계좌가 올바른지 확인해요. 계좌가 해지됐거나 법인 사업자가 개인 계좌를 등록한 경우 입금이 안 돼요. 이 경우 홈택스에서 계좌 정보를 수정하고 세무서에 환급 재신청하면 돼요.",
    tip: "세금 체납이 있으면 환급금이 체납액에 자동 충당됨",
  },
];

const CHECKLIST = [
  "부가세 신고 기한 확인 / 1기 1월 25일, 2기 7월 25일",
  "환급 계좌 정확히 입력됐는지 확인 / 해지 계좌 주의",
  "세금 체납 여부 / 체납 있으면 환급금이 충당됨",
  "조기환급 대상 해당 여부 / 영세율 또는 설비투자 사업자",
  "지급 상태 홈택스 조회 / '지급 대기'면 세무서 문의",
];

const FAQS = [
  {
    q: "부가세 환급은 언제 받을 수 있나요?",
    a: "일반환급은 신고 마지막 날로부터 30일 이내예요. 1기 확정신고(1월 25일 기한)라면 2월 말까지 받는 거예요. 조기환급 대상은 신고 후 15일 이내에 받을 수 있어요. 실제로는 신고 내용에 따라 2주 만에 받기도 하고 30일을 꽉 채우기도 해요.",
  },
  {
    q: "조기환급 대상이 누구예요?",
    a: "영세율 적용 사업자(수출·외화 획득 사업), 사업 설비를 신설·취득·확장한 사업자, 재무구조 개선 계획을 이행 중인 사업자가 해당돼요. 단순히 매입이 많다는 이유만으로는 조기환급을 받을 수 없어요.",
  },
  {
    q: "환급이 신고 기한 뒤에도 안 들어오면 어떻게 하나요?",
    a: "홈택스에서 '국세환급금 상세조회'로 처리 상태를 확인해봐요. '지급 대기' 상태라면 세무서에서 검토 중인 거예요. 30일을 넘겼는데 '지급 완료'가 아니라면 관할 세무서나 국세청(126)에 직접 문의하세요. 서류 보완 요청이 있을 수도 있어요.",
  },
  {
    q: "부가세 환급을 못 받는 경우가 있나요?",
    a: "국세나 지방세 체납이 있으면 환급금이 체납액 충당에 먼저 쓰여요. 체납액이 환급금보다 많으면 한 푼도 못 받아요. 계좌 오류, 서류 미비, 세무조사 중인 경우도 환급이 보류될 수 있어요. 홈택스에서 지급 상태와 이유를 확인하면 원인을 알 수 있어요.",
  },
  {
    q: "부가세 환급은 자동으로 되나요, 신청해야 하나요?",
    a: "신고서에 환급세액이 나오면 별도 신청 없이 자동으로 환급돼요. 다만 환급 계좌를 신고서에 정확히 입력해야 하고, 조기환급을 원하면 신고 시 조기환급 신청란을 체크해야 해요. 신청을 안 하면 자동으로 일반환급(30일)으로 처리돼요.",
  },
  {
    q: "간이과세자도 부가세 환급을 받을 수 있나요?",
    a: "원칙적으로 어려워요. 간이과세자는 매입세액 공제 방식이 달라서 환급이 거의 발생하지 않아요. 단, 세금계산서를 발급하는 간이과세자는 일부 공제를 받을 수 있고, 시설 투자 등 특별한 경우엔 환급이 생길 수도 있어요. 이 경우 세무사 상담을 권해요.",
  },
];

const SOURCES = [
  { name: "국세청 홈택스", href: "https://www.hometax.go.kr" },
  { name: "부가가치세법", href: "https://www.law.go.kr/법령/부가가치세법" },
  { name: "국세청", href: "https://www.nts.go.kr" },
];

const RELATED = [
  { slug: "종합소득세-환급-신청", title: "종합소득세 환급 신청 방법", description: "5월 종합소득세 신고 후 환급받는 절차." },
  { slug: "세금-환급-신청-방법", title: "세금 환급 신청 방법", description: "국세 환급금 조회와 신청 절차 정리." },
  { slug: "세금-납부-연장-신청", title: "세금 납부 기한 연장 신청", description: "자금 부족 시 납부 기한을 연장하는 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부가세 · 환급 신청 · 조기환급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        부가세 환급은 언제 들어오나요?<br />
        조기환급 신청부터 홈택스 조회까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "부가세 신고했는데 환급이 언제 들어오는지 모르겠어요."
      </p>
      <p style={body}>
        일반환급은 신고 기한 마지막 날로부터 <strong>30일 이내</strong>, 조기환급 대상이면 <strong>15일 이내</strong>에 들어와요.
        영세율 사업자나 설비 투자를 한 경우라면 조기환급을 신청해서 빨리 받을 수 있죠.
        환급이 안 들어올 때는 계좌 오류나 체납 여부를 먼저 확인해야 해요.
        아래에서 환급 일정과 조기환급 신청 방법을 정리해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 환급 일정 — 바로 답 */}
      <H2>부가세 환급 언제 받나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/부가가치세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>부가가치세법</a>에 따라 환급 지급 시기가 정해져 있어요.
        일반환급과 조기환급 중 어디에 해당하느냐에 따라 입금 속도가 달라요.
      </p>

      <BorderBox>
        <strong>부가세 환급 지급 일정</strong>{"\n"}
        · 일반환급: 신고 기한 마지막 날로부터 30일 이내{"\n"}
        · 조기환급: 신고 후 15일 이내{"\n"}
        · 월별 조기환급: 매월 25일 신청 → 15일 이내{"\n"}
        {"\n"}
        1기 확정신고(1월 25일 기한) → 2월 말까지 일반환급{"\n"}
        2기 확정신고(7월 25일 기한) → 8월 말까지 일반환급
      </BorderBox>

      <GreenBox>
        환급세액 계산{"\n"}
        매출세액 - 매입세액 = 납부(환급) 세액{"\n"}
        {"\n"}
        매출세액 100만원, 매입세액 150만원 → 50만원 환급{"\n"}
        (매입이 매출보다 많을 때 환급이 발생)
      </GreenBox>

      <CategoryButton label="세금 정보" count={12} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 조기환급 절차 */}
      <H2>조기환급 받으려면 이렇게 하세요</H2>
      <p style={body}>
        영세율 사업자나 설비 투자를 한 경우라면 신고 기한을 기다리지 않고 빨리 환급받을 수 있어요.
        자금 회전이 빠른 사업자한테는 15일 차이가 꽤 크죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-3: 환급 안 될 때 */}
      <H2>환급이 안 들어오는 이유 3가지</H2>
      <p style={body}>
        홈택스에 '지급 완료'라고 떴는데 통장에 없다면 계좌 문제예요.
        '지급 대기' 상태가 30일을 넘겼다면 세무서 추가 검토 중이거나 서류 보완이 필요한 거예요.
        가장 흔한 원인 세 가지를 정리했어요.
      </p>

      <SectionBadge>환급 지연·미수령 원인</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>원인</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>해결 방법</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["계좌 오류 (해지·잘못 입력)", "홈택스에서 계좌 수정 후 세무서에 재신청"],
              ["세금 체납", "체납액 확인 후 납부하면 나머지 환급받을 수 있음"],
              ["서류 미비 / 세무조사 중", "세무서 연락 확인 후 추가 서류 제출"],
            ].map(([cause, solution], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{cause}</td>
                <td style={{ padding: "9px 12px", color: "#374151" }}>{solution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        '부가세 환급'이라는 이메일이나 문자는 피싱일 가능성이 높아요.
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>는 환급금 안내를 이메일로 보내지 않아요.
        환급 여부는 반드시 홈택스에 직접 로그인해서 확인해야 해요.
      </p>

      <Divider />

      {/* H2-4: 체크리스트 */}
      <H2>환급 전 챙겨야 할 것들</H2>
      <p style={body}>
        부가세 환급에서 가장 자주 놓치는 건 계좌 오류와 체납 확인이에요.
        신고하기 전에 아래 항목을 한 번씩 체크해두면 나중에 당황하는 일이 없어요.
      </p>

      <SectionBadge>환급 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* H2-5: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        부가세 환급에서 실제로 자주 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 부가가치세법 기준으로 작성했어요. 환급 일정과 조기환급 요건은 법 개정에 따라 달라질 수 있으니 최신 내용은 국세청(126) 또는 홈택스에서 확인해 주세요." />
    </ArticleLayout>
  );
}
