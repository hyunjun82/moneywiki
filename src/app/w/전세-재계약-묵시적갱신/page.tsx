"use client";

// Q1. 전세 계약 만료가 다가오는데 집주인이 연락이 없어서 계속 살 수 있는지, 보증금이 올라가는지 걱정하는 상황
// Q2. 묵시적갱신 조건을 파악하고, 계약갱신청구권과 비교해서 유리한 방향으로 대응할 수 있어야 함
// Q3. 묵시적갱신 성립 시점(6개월~1개월), 2년 연장, 5% 상한, 임차인 3개월 퇴거권, 갱신청구권과의 차이
// Q4. GreenBox(성립 조건 요약) + CompareTable(묵시적갱신 vs 갱신청구권) + Steps(대응 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const COMPARE_DATA = [
  { label: "방식", optionA: "자동 (양쪽 통보 없음)", optionB: "임차인이 적극 요청" },
  { label: "사용 횟수", optionA: "제한 없음", optionB: "1회만 가능" },
  { label: "임대인 거절", optionA: "기한 내 통보 시만 가능", optionB: "실거주 등 정당 사유 시 거절 가능" },
  { label: "임차인 퇴거", optionA: "3개월 전 통보 후 언제든", optionB: "원칙상 2년 거주" },
  { label: "보증금", optionA: "종전 조건 유지", optionB: "5% 이내 인상 가능" },
];

const RESPONSE_STEPS = [
  {
    title: "계약 만료일 확인",
    description: "임대차계약서에 적힌 만료일을 확인해요. 만료 6개월 전부터 통보 기간이 시작돼요.",
  },
  {
    title: "집주인 통보 여부 확인",
    description: "만료 1개월 전까지 집주인이 갱신 거절이나 조건 변경을 통보했는지 확인해요. 카톡, 문자, 내용증명 등 기록을 살펴봐요.",
  },
  {
    title: "통보 없으면 묵시적갱신 확정",
    description: "양쪽 모두 아무 말 안 했으면 종전 조건 그대로 2년 연장돼요. 보증금도 그대로예요.",
  },
  {
    title: "증거 보관",
    description: "만약의 분쟁에 대비해서 기존 계약서, 통화 기록, 문자 메시지 등을 잘 보관해 두세요.",
  },
];

const FAQS = [
  {
    q: "묵시적갱신되면 몇 년 더 살 수 있나요?",
    a: "2년이에요. 처음 계약과 동일하게 2년 연장돼요. 임차인은 언제든 3개월 전 통보하면 나갈 수 있어요.",
  },
  {
    q: "묵시적갱신이랑 계약갱신청구권, 뭐가 다른가요?",
    a: "묵시적갱신은 아무 말 없이 자동 연장되는 거고, 계약갱신청구권은 임차인이 직접 요청하는 거예요. 묵시적갱신은 횟수 제한이 없지만, 갱신청구권은 1회만 가능해요.",
  },
  {
    q: "집주인이 보증금 10% 올리겠다고 하면 어떻게 하나요?",
    a: "거부하면 돼요. 주택임대차보호법 제7조에 따라 5% 이내만 인상 가능해요. 거부하고 가만히 있으면 묵시적갱신으로 종전 조건 유지돼요.",
  },
  {
    q: "집주인이 실거주한다고 통보하면 막을 수 있나요?",
    a: "만료 1개월 전까지 실거주 통보를 하면 묵시적갱신이 안 돼요. 다만 갱신 후에 통보하면 이미 갱신됐으니 효력이 없어요.",
  },
  {
    q: "묵시적갱신 후 집주인이 갑자기 나가라고 하면?",
    a: "이미 묵시적갱신이 성립했으면 2년간 거주 권리가 보장돼요. 내용증명으로 거주 권리를 주장하세요.",
  },
  {
    q: "재계약서를 새로 쓰면 뭐가 달라지나요?",
    a: "재계약서를 쓰면 새 계약이에요. 확정일자를 새로 받아야 하고, 보증금도 합의하에 변경 가능해요. 묵시적갱신은 이런 절차 없이 종전 그대로 유지돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "주택임대차보호법 제6조 (묵시적갱신)", url: "https://www.law.go.kr/법령/주택임대차보호법" },
      { label: "주택임대차보호법 제7조 (차임 증감 상한)", url: "https://www.law.go.kr/법령/주택임대차보호법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국토교통부: 임대차 정책", url: "https://www.molit.go.kr" },
      { label: "대법원 판례: 묵시적갱신 관련", url: "https://glaw.scourt.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "계약갱신청구권-사용법", title: "계약갱신청구권 행사 방법", description: "1회 한정 갱신권 사용 절차예요." },
  { slug: "전세보증금-반환보증", title: "전세보증금 반환보증 가입", description: "보증금 못 돌려받을 때 보호 방법이에요." },
  { slug: "전입신고-방법", title: "전입신고 온라인 방법", description: "전입신고로 대항력을 확보하세요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 전세 · 계약갱신</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전세 묵시적갱신, 자동으로 2년 연장될까?<br />
        조건부터 보증금 상한까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 계약 만료가 다가오는데 집주인한테 아무 연락이 없죠?
        그냥 계속 살아도 되는지, 보증금이 올라가는 건 아닌지 걱정되실 거예요.
        결론부터 말하면, 양쪽 다 아무 말 안 하면 종전 조건 그대로 2년 자동 연장돼요.
        이걸 묵시적갱신이라고 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>묵시적갱신은 어떤 조건에서 성립하나요?</H2>
      <SectionBadge>성립 조건</SectionBadge>

      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제6조</a>에
        따라 계약 만료 6개월~1개월 전까지 임대인이나 임차인 어느 쪽도 갱신 거절이나 조건 변경을 통보하지 않으면 종전 계약과 동일한 조건으로 다시 임대차한 것으로 봐요.
      </p>
      <p style={body}>
        쉽게 말해, 계약 만료일이 2026년 6월 30일이라면 5월 31일까지 아무 말 안 하면 자동으로 2028년 6월 30일까지 2년 연장되는 거예요.
        집주인이 보증금을 올리겠다고 통보하지 않았다면 보증금도 그대로예요.
      </p>

      <GreenBox title="묵시적갱신 성립 요건">
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>통보 기한</strong>: 만료 6개월~1개월 전</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>임대인</strong>: 갱신 거절 또는 조건 변경 통보 없음</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>임차인</strong>: 갱신 거절 통보 없음</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>결과</strong>: 종전 조건 그대로 2년 연장</p>
        <p style={{ margin: 0, lineHeight: 1.9, fontSize: 13 }}><strong>보증금</strong>: 인상 없이 그대로 유지</p>
      </GreenBox>

      <p style={body}>
        임차인에게 유리한 점이 하나 있어요.
        묵시적갱신된 후에는 임차인이 <strong>언제든 3개월 전 통보</strong>만 하면 나갈 수 있어요.
        2년을 꼭 채울 필요가 없죠.
        반면 임대인은 2년 동안 임차인에게 나가라고 할 수 없어요.
      </p>

      <Divider />

      <H2>보증금은 얼마까지 올릴 수 있나요?</H2>
      <SectionBadge>5% 상한</SectionBadge>

      <p style={body}>
        묵시적갱신이 되면 보증금은 종전 금액 그대로예요.
        만약 집주인이 갱신 전에 인상을 요구했다면 <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제7조</a>에 따라 5% 이내만 가능해요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>보증금 3억 원 기준 계산</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>5% 인상 시: 3억 x 5% = 1,500만 원</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}>최대 인상 후 보증금: 3억 1,500만 원</p>
        <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.9 }}>
          1,500만 원을 초과해서 올리면 임차인이 거부할 수 있고, 거부하면 종전 조건으로 묵시적갱신돼요.
        </p>
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>묵시적갱신과 계약갱신청구권, 뭐가 다를까?</H2>

      <p style={body}>
        둘 다 2년 연장이고 5% 상한이 적용되지만 성격이 달라요.
        묵시적갱신은 가만히 있으면 자동으로 되는 거고, <a href="/w/계약갱신청구권-사용법" style={{ color: "#1D9E75", textDecoration: "underline" }}>계약갱신청구권</a>은 임차인이 직접 요청하는 거예요.
      </p>

      <GreenBox title="묵시적갱신 vs 계약갱신청구권">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>구분</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>묵시적갱신</th>
              <th style={{ textAlign: "left", padding: "5px 8px" }}>계약갱신청구권</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_DATA.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <td style={{ padding: "5px 8px", fontWeight: 600, whiteSpace: "nowrap" }}>{row.label}</td>
                <td style={{ padding: "5px 8px" }}>{row.optionA}</td>
                <td style={{ padding: "5px 8px" }}>{row.optionB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GreenBox>

      <p style={body}>
        전략적으로 보면, 갱신청구권을 아껴두고 묵시적갱신으로 먼저 가는 게 유리한 경우가 많아요.
        묵시적갱신은 횟수 제한이 없으니 쓸 수 있을 때 쓰고, 갱신청구권은 집주인이 실거주를 이유로 나가라고 할 때 쓰는 거예요.
      </p>

      <Divider />

      <H2>만료 전에 어떻게 대응해야 하나요?</H2>
      <SectionBadge>대응 절차</SectionBadge>

      <p style={body}>
        전세 계약 만료가 가까워졌다면 아래 순서대로 움직이세요.
        핵심은 집주인의 통보가 있었는지 확인하고, 증거를 남겨두는 거예요.
      </p>

      <Steps steps={RESPONSE_STEPS} />

      <p style={{ ...body, marginTop: 14 }}>
        집주인이 부당하게 나가라고 할 때는 내용증명으로 묵시적갱신 사실을 알리세요.
        <a href="/w/전세보증금-반환보증" style={{ color: "#1D9E75", textDecoration: "underline" }}>전세보증금 반환보증</a>에
        가입해 두면 보증금을 못 돌려받는 상황도 대비할 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 주택임대차보호법 기준으로 작성됐어요. 법 개정 시 내용이 달라질 수 있으니 법제처에서 최신 법령을 확인하세요." />
    </ArticleLayout>
  );
}
