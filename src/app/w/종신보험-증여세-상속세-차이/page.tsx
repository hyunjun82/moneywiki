"use client";

// Q1. 종신보험 계약자 변경이나 사망보험금 수령 시 세금이 궁금한 상황
// Q2. 증여세·상속세 중 어떤 세금이 나오는지 판단하고, 유리한 시점에 계약자를 변경한다
// Q3. 계약자 변경 시점별 과세 기준, 해지환급금 기준 증여세 계산, 상속세 과세 구간, 절세 전략
// Q4. CompareTable(증여세 vs 상속세) + GreenBox(핵심 판단 기준) + Steps(절세 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const COMPARE_ROWS = [
  { label: "과세 시점", optionA: "계약자 변경 시점", optionB: "피보험자 사망 시점" },
  { label: "과세 기준", optionA: "해지환급금", optionB: "사망보험금 전액" },
  { label: "공제", optionA: "5천만원 (직계존비속)", optionB: "배우자 5억·자녀 5천만원" },
  { label: "세율", optionA: "10~50%", optionB: "10~50%" },
  { label: "절세 포인트", optionA: "해지환급금이 작을 때 변경", optionB: "공제 한도 내면 비과세" },
];

const STEPS = [
  { title: "해지환급금 확인", desc: "보험사 앱이나 콜센터에서 현재 해지환급금을 조회해요. 이 금액이 증여세 과세 기준이에요." },
  { title: "증여공제 범위 확인", desc: "직계존비속 5천만원, 배우자 6억원이에요. 10년 내 이전 증여분을 합산해서 공제 한도를 넘는지 봐요." },
  { title: "계약자 변경", desc: "해지환급금이 공제 한도 이하라면 증여세 없이 변경 가능해요. 보험사에 계약자 변경 신청서를 내면 돼요." },
  { title: "증여세 신고", desc: "공제 초과분이 있으면 변경일이 속하는 달의 말일부터 3개월 이내에 홈택스에서 증여세 신고해요." },
];

const FAQS = [
  { q: "계약자 변경하면 무조건 증여세 내야 하나요?", a: "아니에요. 해지환급금이 증여공제(직계존비속 5천만원, 10년 합산) 이하면 증여세가 0원이에요. 초과분에만 10~50% 세율이 적용돼요." },
  { q: "해지환급금이 적을 때 변경하면 왜 유리한가요?", a: "계약 초기에는 해지환급금이 납입보험료보다 훨씬 적어요. 이때 변경하면 증여세가 적거나 없고, 나중에 사망보험금은 상속세 대상에서 빠져요." },
  { q: "아버지가 보험료 내고 자녀가 계약자면 어떻게 되나요?", a: "실질적으로 보험료를 부담한 사람이 누군지를 국세청이 봐요. 아버지가 냈다면 사망보험금은 상속세 과세 대상이에요." },
  { q: "증여세 신고 기한은 언제까지인가요?", a: "계약자 변경일이 속한 달의 말일부터 3개월 이내예요. 예를 들어 3월 15일에 변경했으면 6월 30일까지 신고해야 해요." },
  { q: "종신보험 사망보험금이 상속세 비과세되는 경우가 있나요?", a: "상속재산 전체가 상속공제(기본 5억+배우자 5억 등) 이하면 상속세가 0원이에요. 보험금 자체가 비과세는 아니지만 공제로 세금이 안 나올 수 있어요." },
  { q: "계약자 변경 없이 보험 유지하다 사망하면요?", a: "사망보험금 전액이 상속재산에 포함돼요. 해지환급금이 아니라 보험금 전액 기준이라 금액이 훨씬 커요." },
];

const SOURCES = [
  { name: "상속세 및 증여세법 — 법제처", href: "https://www.law.go.kr/법령/상속세및증여세법" },
  { name: "국세청 증여세 안내", href: "https://www.nts.go.kr" },
];

const RELATED = [
  { slug: "증여세-계산-세율-공제", title: "증여세 계산 세율과 공제 한도", description: "직계존비속·배우자별 공제 금액과 세율 구간 정리." },
  { slug: "상속세-계산-세율-공제", title: "상속세 계산 세율과 공제", description: "상속세 기본 공제부터 세율 구간까지." },
  { slug: "종신보험-상속세-면제", title: "종신보험 상속세 면제 조건", description: "보험금이 상속세에서 빠지는 경우." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 보험 · 상속·증여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        종신보험, 증여세와 상속세 중 뭐가 나올까?<br />
        계약자 변경 시점별 세금 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        종신보험 계약자를 자녀로 바꾸면 증여세가 나올까요, 상속세가 나올까요? 핵심은 &ldquo;언제&rdquo; 바꾸느냐예요.
      </p>
      <p style={body}>
        계약자가 살아 있을 때 변경하면 해지환급금 기준으로 증여세, 사망 후 보험금을 받으면 사망보험금 전액 기준으로 상속세가 나와요. <a href="https://www.law.go.kr/법령/상속세및증여세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>상속세 및 증여세법</a>이 이 기준을 정하고 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>증여세 vs 상속세, 핵심 차이부터 보세요</H2>
      <p style={body}>
        같은 종신보험이라도 계약자를 바꾸는 시점에 따라 과세 기준이 완전히 달라져요. 해지환급금과 사망보험금은 금액 차이가 크기 때문에 세금도 크게 달라지죠.
      </p>

      <SectionBadge>증여세 vs 상속세 비교</SectionBadge>
      <div style={{ overflowX: "auto", margin: "1.2rem 0", borderRadius: 10, border: "1px solid #E5E7EB" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14.5 }}>
          <thead>
            <tr style={{ backgroundColor: "#F0FDF4" }}>
              <th style={{ textAlign: "left", padding: "10px 14px", fontWeight: 600, color: "#1D9E75", borderBottom: "1px solid #E5E7EB" }}>구분</th>
              <th style={{ textAlign: "left", padding: "10px 14px", fontWeight: 600, color: "#1D9E75", borderBottom: "1px solid #E5E7EB" }}>증여세</th>
              <th style={{ textAlign: "left", padding: "10px 14px", fontWeight: 600, color: "#1D9E75", borderBottom: "1px solid #E5E7EB" }}>상속세</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #F3F4F6" }}>
                <td style={{ padding: "10px 14px", fontWeight: 600, fontSize: 14 }}>{r.label}</td>
                <td style={{ padding: "10px 14px", fontSize: 14 }}>{r.optionA}</td>
                <td style={{ padding: "10px 14px", fontSize: 14 }}>{r.optionB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        보험료를 10년 넣어서 해지환급금이 8천만원인 보험이라면, 계약자 변경 시 증여세는 8천만원 기준이에요. 반면 사망 후 보험금 3억을 받으면 상속세는 3억 기준이 되죠. 차이가 크죠.
      </p>

      <CategoryButton label="세금 정보" count={15} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>해지환급금이 적을 때 변경하면 왜 유리할까?</H2>
      <p style={body}>
        계약 초기에는 해지환급금이 납입보험료보다 훨씬 적어요. 이때 계약자를 변경하면 증여세가 0원이거나 아주 적죠.
      </p>

      <GreenBox title="절세 핵심 원리">
        해지환급금 5천만원 이하 시점에 계약자 변경 → 증여세 0원{"\n"}
        이후 자녀 명의로 유지 → 사망보험금은 상속세 대상 아님{"\n"}
        결과: 사망보험금 수억 원에 세금 0원
      </GreenBox>

      <p style={body}>
        단, 10년 이내에 다른 증여가 있었다면 합산돼요. <a href="/w/증여세-계산-세율-공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>증여세 공제 한도</a>를 미리 확인하세요.
      </p>

      <Divider />

      <H2>계약자 변경부터 신고까지 절차는?</H2>
      <p style={body}>
        실제로 계약자를 바꾸려면 아래 순서로 진행하면 돼요.
      </p>

      <SectionBadge>계약자 변경 절차</SectionBadge>
      <Steps steps={STEPS} />

      <p style={body}>
        증여세 신고는 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 직접 할 수 있어요. 공제 한도 이하라도 신고해두면 나중에 세무 분쟁을 예방할 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>종신보험 세금에서 헷갈리기 쉬운 부분이에요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 상속세 및 증여세법을 바탕으로 작성했어요. 개별 보험 상품과 계약 조건에 따라 과세 결과가 달라질 수 있으니, 정확한 세액은 국세청(nts.go.kr)이나 세무사에게 확인하세요." />
    </ArticleLayout>
  );
}
