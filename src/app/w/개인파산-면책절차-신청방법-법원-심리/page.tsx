"use client";
// Q1. 빚이 감당 안 되는데 개인파산으로 빚을 탕감받을 수 있는지, 절차가 어떤지 알고 싶은 상황
// Q2. 파산+면책 동시신청 절차를 파악하고 관할 법원에 신청서를 제출한다
// Q3. 파산과 면책 차이, 동시폐지 vs 관재인 선임, 심리 기간(3~6개월), 면책 불허 사유, 비용
// Q4. GreenBox(결론) + Steps(신청 절차) + BorderBox(비용표) + Checklist(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "빚과 재산 목록을 정리하세요",
    desc: "누구에게 얼마를 빚졌는지 전부 정리해야 해요. 은행 대출, 카드값, 개인 빚 전부요. 통장 잔액, 부동산, 자동차, 보험, 퇴직금도 함께 적으세요. 이 목록이 신청서의 핵심이에요.",
    tip: "채권자 목록에서 하나라도 빠뜨리면 면책이 안 될 수 있어요",
  },
  {
    title: "관할 법원에 파산·면책 동시신청서를 제출하세요",
    desc: "주소지 관할 지방법원 파산계에 신청해요. 서울은 서울회생법원이에요. 신청서 양식은 법원 민원실, 대법원 전자소송(ecfs.scourt.go.kr), 법률구조공단에서 받을 수 있어요. 파산과 면책을 동시에 신청하는 게 일반적이에요.",
    tip: "혼자 해도 되지만 어려우면 법률구조공단(132번) 무료 지원",
    link: { label: "전자소송 바로가기", href: "https://ecfs.scourt.go.kr" },
  },
  {
    title: "인지대·송달료를 납부하세요",
    desc: "인지대 약 20만원, 송달료 10~30만원, 관보공고료 약 10만원이 필요해요. 돈이 없으면 법원에 소송구조 신청서를 내면 비용을 면제받거나 나중에 낼 수 있어요.",
    tip: "소송구조 신청하면 비용 면제·유예 가능",
  },
  {
    title: "법원 심리기일에 출석하세요",
    desc: "서류 접수 후 30일 내에 파산선고 여부가 결정돼요. 면책심문은 파산선고일로부터 60일 이내에 진행돼요. 법원에 가서 판사 질문에 성실하게 답하면 돼요. 재산 상태, 빚을 진 경위를 물어봐요.",
  },
  {
    title: "면책 결정을 받으세요",
    desc: "면책 불허 사유가 없으면 14일 이내에 면책 결정이 나와요. 면책이 확정되면 남은 빚이 전부 소멸해요. 채권자의 독촉, 강제집행도 전부 멈춰요.",
    tip: "면책 확정 후 신용정보원에 연체 정보 삭제 요청",
  },
];

const CHECKLIST = [
  "파산 및 면책 신청서 (법원 양식)",
  "채무자 목록 (누구에게 얼마 빚졌는지 전부)",
  "재산 목록 (통장, 부동산, 자동차, 보험, 퇴직금)",
  "가족관계증명서",
  "소득증명서 (급여명세서 또는 소득금액증명원)",
  "주민등록등본",
  "최근 2년 통장 거래내역",
];

const FAQS = [
  {
    q: "파산 신청하면 빚이 바로 없어지나요?",
    a: "아니에요. 파산선고는 '이 사람은 빚을 못 갚겠다'는 법원 인정이고, 면책 결정을 받아야 빚이 실제로 사라져요. 파산만 하고 면책 못 받으면 재산만 빼앗기고 빚은 남아요. 반드시 면책까지 받아야 해요.",
  },
  {
    q: "법원 심리는 얼마나 걸려요?",
    a: "동시폐지(재산이 거의 없을 때)면 3~4개월이면 면책까지 끝나요. 관재인이 선임되면(재산이 좀 있을 때) 6개월~1년 걸려요. 법원마다 속도가 달라서 지방 법원이 상대적으로 빠른 편이에요.",
  },
  {
    q: "도박 빚도 면책 받을 수 있나요?",
    a: "원칙적으로 도박, 주식, 코인 등 사행행위로 진 빚은 면책 불허 사유예요. 하지만 법원이 재량으로 면책(재량면책)을 해주는 경우가 있어요. 성실하게 절차를 따르고 반성하는 태도를 보이면 가능성이 높아지죠.",
  },
  {
    q: "변호사 없이 혼자 할 수 있나요?",
    a: "네, 가능해요. 법원에서 양식을 받아 직접 작성하면 돼요. 어려우면 법률구조공단(132번)에서 무료 상담과 서류 작성 도움을 받을 수 있어요. 소득 기준을 충족하면 변호사 비용도 지원받고요.",
  },
  {
    q: "면책 받아도 못 없어지는 빚이 있나요?",
    a: "세금, 건강보험료, 국민연금, 벌금, 과태료, 양육비, 고의 손해배상금은 면책이 안 돼요. 이런 채무는 파산 후에도 갚아야 해요.",
  },
  {
    q: "개인파산과 개인회생, 뭐가 다른가요?",
    a: "소득이 없으면 개인파산, 소득이 있으면 개인회생이 유리해요. 파산은 재산을 전부 처분하고 빚을 탕감받는 거고, 회생은 3~5년간 일부를 갚고 나머지를 탕감받는 거예요. 월급 200만원 이상이면 개인회생을 먼저 검토하세요.",
  },
  {
    q: "면책 후 신용은 언제 회복돼요?",
    a: "면책 확정 후 신용정보원에 연체 정보 삭제를 요청할 수 있어요. 신용등급이 정상화되기까지 5~7년 걸리지만, 면책 직후에도 체크카드는 바로 만들 수 있어요.",
  },
];

const SOURCES = [
  { name: "채무자 회생 및 파산에 관한 법률", href: "https://www.law.go.kr/법령/채무자회생및파산에관한법률" },
  { name: "서울회생법원 개인파산 안내", href: "https://slb.scourt.go.kr/rel/guide/personal_b/index.jsp" },
  { name: "대한법률구조공단", href: "https://www.klac.or.kr" },
];

const RELATED = [
  { slug: "개인회생-신청-조건", title: "개인회생 신청 조건", description: "소득이 있다면 개인회생이 유리해요." },
  { slug: "파산선고-동시폐지-의미", title: "파산선고 동시폐지란", description: "재산이 없으면 절차가 빨라져요." },
  { slug: "채무-조정-방법", title: "채무 조정 방법", description: "파산 전에 할 수 있는 채무 조정." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>법률 · 개인파산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        빚이 감당이 안 된다면?<br />
        개인파산 면책 신청 절차와 기간
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이자만 매달 수백만원씩 나가는데 원금은 줄지 않아요. 도저히 갚을 수 없다면 법적으로 빚을 탕감받는 길이 있어요.
      </p>
      <p style={body}>
        <strong>파산선고 + 면책 결정</strong>을 받으면 남은 빚이 법적으로 소멸해요.
        <a href="https://www.law.go.kr/법령/채무자회생및파산에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>채무자 회생 및 파산에 관한 법률</a>에서 정한 절차예요.
        동시폐지(재산이 거의 없을 때)면 <strong>3~4개월</strong>이면 끝나요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>파산과 면책, 무슨 차이죠?</H2>
      <p style={body}>
        &ldquo;파산 신청하면 빚이 사라진다&rdquo;고 생각하시는 분이 많은데, 정확히는 2단계예요. 파산선고는 &ldquo;이 사람은 재산이 없어서 빚을 못 갚는다&rdquo;는 법원의 인정이에요. 면책 결정이 &ldquo;남은 빚은 안 갚아도 된다&rdquo;는 허가예요.
      </p>

      <GreenBox title="핵심 구분">
        파산선고 = 빚 못 갚는다는 인정 (재산 처분){"\n"}
        면책 결정 = 남은 빚 탕감 허가 (빚 소멸){"\n"}
        파산만 하고 면책 못 받으면 → 재산만 잃고 빚은 그대로
      </GreenBox>

      <p style={body}>
        그래서 실무에서는 파산과 면책을 동시에 신청해요. 신청서에 &ldquo;파산 및 면책 신청&rdquo;이라고 체크하면 한꺼번에 진행되죠.
      </p>

      <CategoryButton label="법률 정보" count={8} href="/category/법률" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>신청부터 면책까지 5단계 절차예요</H2>
      <p style={body}>
        혼자서도 할 수 있어요. 서류가 좀 많지만 법원 양식에 맞춰 작성하면 돼요. 복잡하면 <a href="https://www.klac.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>법률구조공단</a>(132번)에서 무료로 도와줘요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>비용, 생각보다 적게 들어요</H2>
      <p style={body}>
        &ldquo;빚이 있는데 파산 비용도 내야 해?&rdquo; 맞아요. 하지만 돈이 없으면 소송구조로 면제받을 수 있어요.
      </p>

      <SectionBadge>개인파산 비용</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>금액</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>면제 가능</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["인지대", "약 20만원", "O (소송구조)"],
              ["송달료", "10~30만원", "O (소송구조)"],
              ["관보공고료", "약 10만원", "O (소송구조)"],
              ["관재인 비용", "50~200만원", "X (선임 시만)"],
            ].map(([item, amount, exempt], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{item}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{amount}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{exempt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        동시폐지(대부분의 경우)면 관재인 비용이 안 들어요. 인지대와 송달료만 합하면 40만원 내외이고, 소송구조를 받으면 이마저도 면제돼요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>준비 서류 체크리스트예요</H2>
      <p style={body}>
        서류가 많아 보이지만 정부24나 주민센터에서 대부분 발급받을 수 있어요. 통장 거래내역은 거래은행에 요청하면 돼요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 법률 정보를 제공하며 법률 자문이 아니에요. 구체적인 사안은 법률구조공단이나 변호사와 상담하세요." />
    </ArticleLayout>
  );
}
