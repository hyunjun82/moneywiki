"use client";
// Q1. 전세 계약 만료가 다가오는데 계약갱신청구권을 언제 행사해야 하는지 모르는 세입자 상황
// Q2. 만료 6개월~1개월 전 사이에 내용증명을 보내서 계약갱신청구권을 행사한다
// Q3. 행사 기간(6개월~1개월 전), 내용증명 발송법, 5% 상한 계산, 거절 사유, 놓쳤을 때 대안
// Q4. GreenBox(기간 요약) + Steps(행사 절차) + 기간 테이블 + BorderBox(놓쳤을 때) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "계약서에서 만료일을 확인하세요",
    desc: "임대차계약서에 적힌 계약 종료일을 확인해요. 여기서 역산해서 6개월 전~1개월 전 날짜를 캘린더에 표시해두세요. 만료일이 2026년 6월 30일이면 2025년 12월 31일~2026년 5월 31일 사이가 골든타임이에요.",
    tip: "만료일 7개월 전에 미리 날짜를 계산해두세요",
  },
  {
    title: "내용증명을 작성하세요",
    desc: "\"계약갱신청구권을 행사합니다\"라는 내용을 적은 문서를 만들어요. 임대인 이름, 물건 주소, 계약 만료일, 갱신 의사를 명확히 써야 해요. 우체국 방문하거나 인터넷우체국(epost.go.kr)에서 발송할 수 있어요.",
    tip: "비용은 5,000~7,000원 정도",
  },
  {
    title: "만료 3개월 전에 발송하세요",
    desc: "내용증명은 도착까지 2~3일 걸리기 때문에 여유를 두고 보내는 게 안전해요. 1개월 전에 딱 맞춰서 보내면 도착이 늦어져 기한을 놓칠 위험이 있어요. 3개월 전이 가장 안전한 시점이에요.",
    tip: "내용증명 발송 영수증은 반드시 보관",
  },
  {
    title: "집주인 답변을 확인하세요",
    desc: "집주인이 정당한 거절 사유 없이 거부하면 효력이 없어요. 갱신이 확정되면 기존 조건 + 최대 5% 인상으로 2년 연장돼요. 집주인이 거절 사유를 주장하면 그 사유가 적법한지 확인하세요.",
    tip: "실거주 목적 거절 후 3개월 내 미입주 시 위법",
  },
];

const CHECKLIST = [
  "계약 만료일 확인 / 임대차계약서에서 종료일 체크",
  "6개월 전~1개월 전 날짜 계산 / 캘린더에 표시",
  "내용증명 작성 / 갱신 의사를 명확히 기재",
  "만료 3개월 전까지 발송 / 도착 지연 대비 여유",
  "발송 영수증 보관 / 분쟁 시 증거로 필요",
];

const FAQS = [
  {
    q: "6개월 전보다 더 일찍 행사하면 안 되나요?",
    a: "안 돼요. 6개월 전부터 가능해요. 너무 일찍 보내면 법적 효력이 없어서 집주인이 \"그때 한 말은 의미 없어요\"라고 할 수 있어요. 6개월 전이 되면 다시 보내야 해요.",
  },
  {
    q: "기간 놓쳤으면 방법이 없나요?",
    a: "계약갱신청구권은 못 쓰지만, 묵시적갱신이 될 수 있어요. 계약 만료 후 서로 아무 말 안 하면 자동 연장되거든요. 다만 5% 상한이 적용 안 될 수 있어서 손해예요.",
  },
  {
    q: "계약서에 \"갱신 안 함\" 특약이 있으면 어떡하나요?",
    a: "무효예요. 계약갱신청구권은 강행규정이라 특약으로 배제할 수 없어요. 집주인이 계약서에 뭐라고 적어놨든 세입자의 갱신권은 유효해요.",
  },
  {
    q: "갱신하면 전세금을 얼마까지 올릴 수 있나요?",
    a: "최대 5%까지만 올릴 수 있어요. 전세금 3억이면 최대 3억 1,500만원이에요. 집주인이 5%를 넘게 올리겠다고 하면 거부할 수 있어요.",
  },
  {
    q: "갱신청구권은 몇 번 쓸 수 있나요?",
    a: "1회만이에요. 최초 계약 2년 + 갱신 2년 = 최대 4년 거주가 보장돼요. 갱신청구권을 쓴 후에는 재계약을 새로 해야 하는데, 이때는 5% 상한이 적용 안 돼요.",
  },
  {
    q: "집주인이 \"내가 살 거야\"라고 거절하면 어쩌나요?",
    a: "실거주 목적이면 정당한 거절 사유예요. 다만 거절 후 3개월 내에 실제로 입주하지 않으면 위법이에요. 다른 세입자를 들이거나 집을 팔면 손해배상 청구가 가능해요.",
  },
  {
    q: "월세도 5% 상한이 적용되나요?",
    a: "네. 보증금과 월세를 합산해서 전체 환산금액 기준 5%까지만 올릴 수 있어요. 보증금을 월세로 전환할 때는 법정 전환율을 적용해요.",
  },
];

const SOURCES = [
  { name: "주택임대차보호법", href: "https://www.law.go.kr/법령/주택임대차보호법" },
  { name: "인터넷우체국", href: "https://www.epost.go.kr" },
  { name: "정부24", href: "https://www.gov.kr" },
];

const RELATED = [
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 납부", description: "집 살 때 내는 세금 정리." },
  { slug: "부동산-거래신고-공인중개사-신고방법", title: "부동산 거래신고 방법", description: "공인중개사 거래 신고 절차." },
  { slug: "아파트-관리사무소장-업무-역할", title: "관리사무소장 업무", description: "아파트 관리사무소 역할 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차 · 계약갱신</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        계약갱신청구권, 언제 행사해야 하나요?<br />
        6개월~1개월 전 골든타임과 행사 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "전세 2년 살았는데 더 살고 싶어요. 집주인한테 어떻게 말하면 되죠?"
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제6조의3</a>에 따라
        계약갱신청구권을 행사하면 <strong>2년 더 살 수 있고</strong>, 전세금은 <strong>최대 5%까지만</strong> 올릴 수 있어요.
        단, 반드시 계약 만료 <strong>6개월 전~1개월 전</strong> 사이에 행사해야 해요.
        하루라도 늦으면 권리 자체가 사라지고, 집주인 마음대로 할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>행사 가능 기간, 정확히 언제부터 언제까지?</H2>
      <p style={body}>
        계약 만료일에서 역산해요. 6개월 전부터 1개월 전까지가 골든타임이에요.
        이 기간 밖이면 행사 자체가 안 돼요.
      </p>

      <SectionBadge>만료일 2026년 6월 30일 기준</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>시점</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>날짜</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>행사 가능</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["7개월 전", "2025년 11월 30일", "아직 안 됨"],
              ["6개월 전", "2025년 12월 31일", "이때부터 가능"],
              ["3개월 전 (권장)", "2026년 3월 31일", "가장 안전한 시점"],
              ["1개월 전 (마감)", "2026년 5월 31일", "마지막 기한"],
              ["만료일", "2026년 6월 30일", "이미 늦음"],
            ].map(([label, date, status], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i === 2 ? "#f0fdf4" : i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{date}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: i === 2 ? "#1D9E75" : i >= 4 ? "#dc2626" : "#374151", fontWeight: i === 2 || i >= 4 ? 700 : 400 }}>{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        골든타임: 만료 6개월 전 ~ 1개월 전{"\n"}
        가장 안전한 시점: 3개월 전에 내용증명 발송{"\n"}
        1회만 행사 가능 → 최초 2년 + 갱신 2년 = 최대 4년 거주
      </GreenBox>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>내용증명 보내는 순서</H2>
      <p style={body}>
        구두로 "더 살게요"라고 말해도 되지만, 나중에 집주인이 "그런 말 안 들었는데?"라고 하면 곤란해요.
        내용증명은 발송 사실을 우체국이 증명해주니까 가장 확실한 방법이에요.
      </p>

      <SectionBadge>행사 절차 4단계</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>기간 놓쳤으면 어떻게 되나요?</H2>
      <p style={body}>
        1개월 전 마감을 넘겼다면 계약갱신청구권은 사라져요.
        하지만 완전히 방법이 없는 건 아니에요.
      </p>

      <BorderBox title="기간 경과 시 대안">
        묵시적갱신: 계약 만료 후 양쪽 다 아무 말 안 하면 자동 연장{"\n"}
        → 5% 상한 적용이 안 될 수 있어서 갱신청구권보다 불리해요{"\n\n"}
        합의 갱신: 집주인과 협의해서 재계약{"\n"}
        → 5% 상한 없이 집주인 마음대로 금액 설정 가능{"\n\n"}
        결론: 기간 내에 행사하는 게 절대적으로 유리해요
      </BorderBox>

      <Divider />

      <H2>행사 전에 꼭 준비하세요</H2>

      <Checklist items={CHECKLIST} />

      <Divider />

      <FAQ items={FAQS} />

      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 주택임대차보호법으로 작성됐어요. 상가임대차는 별도 법률(상가건물임대차보호법)이 적용돼요." />
    </ArticleLayout>
  );
}
