"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 이혼을 앞두고 있는데 부부가 함께 받은 주택담보대출이 남아서, 누가 갚아야 하는지 알고 싶은 상황
// Q2. 공동명의 대출의 재산분할 기준을 이해하고, 이혼 전 대출 처리 방법을 결정한다
// Q3. 연대책임 구조, 공동채무 vs 개인채무 구분, 재산분할 비율, 대출 정리 방법(명의 변경·매각·대환)
// Q4. BorderBox(채무 유형별 분류) + Steps(대출 정리 절차) + GreenBox(핵심 요약) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "대출 잔액과 명의를 정확히 확인하세요",
    desc: "은행에서 대출 잔액 증명서를 발급받아요. 공동명의인지, 한 쪽만 차주인지, 담보는 어떻게 잡혀 있는지 파악하는 게 첫 단계예요.",
  },
  {
    title: "재산분할 협의에서 채무 분담을 정하세요",
    desc: "집을 누가 가져갈지, 대출은 누가 떠안을지 협의해요. 보통 집을 가져가는 쪽이 대출도 책임지는 구조로 정리해요. 공증을 받아두면 나중에 분쟁을 막을 수 있어요.",
  },
  {
    title: "은행에 명의 변경이나 대환을 상담하세요",
    desc: "한 쪽이 대출을 떠안기로 했으면 은행에 단독 명의 전환을 요청해요. 소득과 신용으로 단독 대출이 가능한지 심사를 받아야 해요. 안 되면 대환대출로 전환하는 방법도 있어요.",
  },
  {
    title: "합의서에 대출 처리 내용을 명확히 기재하세요",
    desc: "이혼 합의서나 법원 조정 조서에 대출 분담 내용을 구체적으로 적어요. '갑이 대출 전액을 책임진다' 같이 명확히 써야 해요. 다만 은행에 대한 연대책임은 별도 해소가 필요해요.",
  },
];

const FAQS = [
  {
    q: "부부끼리 6:4로 나누기로 했으면 은행도 인정해 주나요?",
    a: "안 돼요. 부부간 합의는 부부끼리만 유효해요. 은행 입장에서는 여전히 둘 다 채무자라서 한 쪽이 안 갚으면 다른 쪽에 전액 청구해요. 연대책임을 해소하려면 대출 명의를 변경해야 해요.",
  },
  {
    q: "사업하다가 생긴 빚도 재산분할 대상인가요?",
    a: "개인 사업 빚은 재산분할 대상이 아니에요. 공동생활과 관련 없는 개인 채무는 각자 책임이에요. 다만 사업 소득으로 가정 생활비를 냈다면 기여도로 인정받을 수 있어요.",
  },
  {
    q: "한 쪽이 대출 안 갚으면 내가 대신 갚아야 하나요?",
    a: "연대채무자라면 은행이 청구할 수 있어요. 대신 갚은 금액은 상대방에게 구상권을 행사해서 돌려받을 수 있어요. 하지만 상대방에게 재산이 없으면 실제 회수가 어려워요.",
  },
  {
    q: "이혼 전에 집을 팔고 대출을 갚는 게 나은가요?",
    a: "가장 깔끔한 방법이에요. 집을 매각하고 대출을 상환한 뒤 남은 금액을 나누면 돼요. 다만 양도소득세와 매매 시장 상황을 고려해야 해요.",
  },
  {
    q: "전세대출도 재산분할 대상인가요?",
    a: "부부 공동생활을 위한 전세자금 대출이면 재산분할 대상이에요. 보증금 반환과 대출 상환을 함께 정리해야 해요.",
  },
  {
    q: "재산분할 청구 기한이 있나요?",
    a: "이혼 후 2년 이내에 청구해야 해요. 2년이 지나면 재산분할을 요구할 수 없으니 이혼 전에 협의를 마무리하는 게 좋아요.",
  },
];

const SOURCES = [
  { name: "민법 제839조의2 (재산분할)", href: "https://www.law.go.kr/법령/민법" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr" },
];

const RELATED = [
  { slug: "이혼-빚-공동-부담-여부", title: "이혼 빚 공동 부담 여부", description: "이혼 시 배우자 빚을 나도 갚아야 하는지 판단 기준." },
  { slug: "재산분할-재산-은닉-확인-방법", title: "재산 은닉 확인 방법", description: "배우자가 재산을 숨겼을 때 법적으로 찾는 방법." },
  { slug: "이혼-고려중-재산-은닉-방지", title: "재산 은닉 방지", description: "이혼 준비 중 재산 은닉을 예방하는 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>가정법률 · 이혼 · 재산분할</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이혼 시 공동명의 대출, 누가 갚나요?<br />
        채무 분담 기준과 처리 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        집 살 때 같이 받은 대출이 남았는데, 이혼하면 누가 갚아야 하는 걸까요?
      </p>
      <p style={body}>
        <strong>공동명의 대출은 이혼해도 은행한테는 둘 다 채무자예요.</strong>
        부부끼리 나눴더라도 은행은 둘 다한테 전액 청구할 수 있어요.
        <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제839조의2</a>에서 재산분할을 규정하고 있지만, 은행에 대한 연대책임은 별도로 해소해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>어떤 빚이 재산분할 대상인가요?</H2>
      <p style={body}>
        모든 빚이 나뉘는 건 아니에요. 공동생활과 관련된 빚만 재산분할 대상이에요.
        법원은 채무의 성격을 따져서 공동채무인지 개인채무인지 판단해요.
      </p>

      <SectionBadge>채무 유형별 재산분할 대상 여부</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>채무 종류</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>대상 여부</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>사유</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["주택 구입 대출", "O", "부부 공동생활 목적"],
              ["생활비 카드빚", "O", "일상가사 관련"],
              ["전세자금 대출", "O", "공동 거주 목적"],
              ["사업자 개인 대출", "X", "개인 사업 목적"],
              ["도박·투기 빚", "X", "개인 일탈 행위"],
              ["혼인 전 빚", "X", "혼인 전 개인 채무"],
            ].map(([type, target, reason], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{type}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: target === "O" ? "#1D9E75" : "#ef4444" }}>{target}</td>
                <td style={{ padding: "9px 12px", color: "#6b7280" }}>{reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CategoryButton label="가정법률" count={6} href="/category/가정법률" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>이혼 후에도 연대책임이 계속된다고요?</H2>
      <p style={body}>
        맞아요. 이게 가장 중요한 포인트예요.
        부부끼리 "60:40으로 나누자"고 합의해도 <strong>은행은 그 합의를 인정 안 해요</strong>.
        은행한테는 두 사람 모두 100% 채무자예요.
      </p>

      <GreenBox>
        핵심 포인트{"\n"}
        · 부부간 채무 분담 합의 = 부부끼리만 유효{"\n"}
        · 은행에 대한 연대책임 = 이혼 후에도 계속{"\n"}
        · 한 쪽이 안 갚으면 → 다른 쪽에 전액 청구 가능{"\n"}
        · 연대책임 해소 = 대출 명의 변경 또는 상환 필수
      </GreenBox>

      <Divider />

      <H2>대출을 어떻게 정리하면 될까요?</H2>
      <p style={body}>
        이혼 시 공동명의 대출을 정리하는 절차예요.
        가장 깔끔한 건 매각 후 상환이지만, 상황에 따라 명의 변경도 가능해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />
      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 일반적인 법률 정보를 제공해요. 개별 상황에 따라 결과가 달라질 수 있으니, 구체적인 사안은 법률 전문가 상담을 받으세요." />
    </ArticleLayout>
  );
}
