"use client";
// Q1. 전세 계약이 끝났는데 집주인도 나도 아무 말 안 해서 묵시적 갱신이 됐는지, 됐다면 어떻게 되는지 궁금한 세입자
// Q2. 묵시적 갱신 성립 여부를 확인하고, 해지 통보 방법과 시기를 알아서 행동한다
// Q3. 성립 조건(6개월~2개월 전 미통보), 갱신 기간(2년), 해지 방법(3개월 전 통보), 계약갱신청구권과 차이
// Q4. GreenBox(묵시적 갱신 핵심 요약) + Steps(해지 절차) + BorderBox(계약갱신청구권 비교) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "해지 의사를 집주인에게 통보하세요",
    desc: "묵시적 갱신 후 임차인은 언제든 해지할 수 있어요. '묵시적 갱신된 임대차 계약을 주택임대차보호법 제6조의2에 따라 해지합니다'라고 통보하면 돼요. 통보한 날로부터 3개월 후에 해지 효력이 생겨요.",
    tip: "통보일 + 3개월 = 해지 효력 발생일",
  },
  {
    title: "내용증명으로 보내면 확실해요",
    desc: "카톡이나 문자도 가능하지만, 나중에 '못 받았다'고 하면 증명하기 어려워요. 우체국 내용증명은 공식 기록이 남으니까 분쟁 시 확실한 증거가 돼요. 우체국 방문하면 당일 발송 가능해요.",
    tip: "내용증명 = 법적 분쟁 시 확실한 증거",
  },
  {
    title: "3개월 후에 이사하고 보증금 돌려받으세요",
    desc: "해지 효력이 발생하는 날에 이사 나가면 돼요. 보증금은 집주인이 반환해야 하고, 안 돌려주면 보증금 반환소송을 할 수 있어요. 전세보증보험에 가입돼 있다면 HUG에 청구해도 돼요.",
    tip: "보증금 미반환 시 임차권등기명령 활용",
  },
];

const FAQS = [
  {
    q: "묵시적 갱신되면 보증금이 올라가나요?",
    a: "아니에요. 이전 계약과 동일한 조건으로 연장돼요. 집주인이 보증금을 올리겠다고 하면 거부할 수 있어요. 묵시적 갱신 자체는 조건 변경 없이 같은 금액으로 연장되는 거예요.",
  },
  {
    q: "묵시적 갱신 후 기간은 얼마나 되나요?",
    a: "주택은 2년, 상가는 1년이에요. 원래 계약이 2년이었다면 다시 2년이 추가로 연장돼요. 이 기간이 지나면 또 아무 말 없으면 다시 묵시적 갱신될 수 있어요.",
  },
  {
    q: "집주인이 묵시적 갱신 후에 나가라고 할 수 있나요?",
    a: "갱신된 기간(2년) 동안은 정당한 사유 없이 해지할 수 없어요. 본인이나 직계가족 실거주, 재건축 같은 정당한 사유가 있어야 해요. '다른 사람에게 비싸게 세주고 싶어서'는 안 돼요.",
  },
  {
    q: "묵시적 갱신은 횟수 제한이 있나요?",
    a: "없어요. 계약갱신청구권은 1회만 쓸 수 있지만, 묵시적 갱신은 횟수 제한 없이 반복될 수 있어요. 매번 만료 때 양쪽이 아무 말 안 하면 계속 연장돼요.",
  },
  {
    q: "묵시적 갱신과 계약갱신청구권, 뭐가 다른가요?",
    a: "계약갱신청구권은 임차인이 적극적으로 '2년 더 살겠다'고 요구하는 거예요. 1회 한정이고, 6개월~2개월 전에 통보해야 해요. 묵시적 갱신은 양쪽 다 아무 말 안 해서 자동으로 연장되는 거예요. 횟수 제한 없어요.",
  },
  {
    q: "월세 2번 안 냈는데도 묵시적 갱신되나요?",
    a: "아니에요. 2기 차임(2번 치 월세)을 연체한 임차인은 묵시적 갱신 자격이 없어요. 집주인이 이를 이유로 갱신을 거절할 수 있어요.",
  },
];

const SOURCES = [
  { name: "주택임대차보호법 제6조", href: "https://www.law.go.kr/법령/주택임대차보호법" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=629&ccfNo=4&cciNo=4&cnpClsNo=1" },
];

const RELATED = [
  { slug: "계약갱신청구권-재계약-거절-사유", title: "계약갱신청구권 사용법", description: "1회 한정 2년 재계약 요구 방법." },
  { slug: "임대차-보증금-인상-한도-5프로", title: "보증금 인상 5% 한도", description: "집주인이 보증금 올릴 수 있는 한도." },
  { slug: "주택임대차-최소-기간-2년", title: "주택임대차 최소 기간", description: "2년 미만 계약도 2년으로 보장." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 &middot; 임대차 &middot; 묵시적 갱신</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약 끝났는데 아무 말 없었다면?<br />
        묵시적 갱신 조건과 해지 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "전세 2년 끝났는데, 집주인도 나도 아무 말 안 했어요. 나가야 하나요?"
      </p>
      <p style={body}>
        나가지 않아도 돼요. 양쪽 다 아무 말 안 했으면 <strong>자동으로 2년 연장</strong>돼요. 이걸 '묵시적 갱신'이라고 해요. <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제6조</a>에서 정하고 있죠. 이전과 <strong>동일한 조건</strong>으로 연장되니까 보증금도 그대로예요. 나가고 싶으면 <strong>3개월 전에 통보</strong>하면 돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>묵시적 갱신, 어떤 조건에서 성립하나요?</H2>
      <p style={body}>
        계약 만료 전 일정 기간에 양쪽 모두 아무런 의사 표시를 안 하면 성립돼요.
      </p>

      <SectionBadge>성립 조건</SectionBadge>
      <GreenBox>
        주택: 계약 만료 6개월~2개월 전까지 양쪽 모두 미통보 → 자동 2년 연장{"\n"}
        상가: 계약 만료 6개월~1개월 전까지 양쪽 모두 미통보 → 자동 1년 연장{"\n\n"}
        이전 계약과 동일한 조건(보증금, 월세, 기타)으로 연장돼요.{"\n"}
        횟수 제한 없이 반복 가능해요.
      </GreenBox>

      <p style={body}>
        예를 들어 2024년 3월~2026년 2월 전세 계약인데, 2025년 8월~12월 사이에 집주인도 세입자도 아무 말 안 했다면? 2026년 3월~2028년 2월까지 자동으로 연장돼요. 단, 임차인이 월세를 2번 이상 연체했다면 묵시적 갱신이 안 돼요.
      </p>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>묵시적 갱신 후에 나가고 싶으면 어떻게 하나요?</H2>
      <p style={body}>
        임차인은 언제든 3개월 전 통보로 해지할 수 있어요. 2년을 다 채울 필요 없어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>계약갱신청구권과 뭐가 다른가요?</H2>
      <p style={body}>
        둘은 완전히 다른 제도예요. 상황에 따라 어떤 게 유리한지 달라요.
      </p>

      <SectionBadge>비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>묵시적 갱신</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>계약갱신청구권</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["발동 방식", "양쪽 아무 말 안 함", "임차인이 적극 요구"],
              ["횟수", "제한 없음", "1회 한정"],
              ["통보 시기", "필요 없음 (자동)", "만료 6~2개월 전"],
              ["임대료 변경", "불가 (동일 조건)", "5% 이내 인상 가능"],
              ["임차인 해지", "언제든 3개월 전 통보", "2년 확정 거주"],
            ].map(([item, tacit, request], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{tacit}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{request}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        <a href="/w/계약갱신청구권-재계약-거절-사유" style={{ color: "#1D9E75", textDecoration: "underline" }}>계약갱신청구권</a>은 2년 확정 거주가 보장되고, 묵시적 갱신은 임차인이 유연하게 3개월 전 통보로 나갈 수 있어요. 장기 거주 확정이 필요하면 갱신청구권, 유연성이 필요하면 묵시적 갱신이 유리해요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법을 바탕으로 작성했어요. 구체적인 법률 분쟁은 대한법률구조공단(132)이나 변호사 상담을 받으세요." />
    </ArticleLayout>
  );
}
