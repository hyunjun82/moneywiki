"use client";

// Q1. 고액 전세 계약을 앞두고 확정일자만으로 부족한지, 전세권 설정등기까지 해야 하는지 판단하려는 상황
// Q2. 전세권 설정등기와 확정일자의 차이를 이해하고, 내 상황에 맞는 보호 수단을 선택한다
// Q3. 전세권의 물권적 효력, 확정일자와 비교(경매권·이사 시 권리 유지), 등기 비용(보증금 0.2%), 필요 서류, 임대인 동의
// Q4. 비교표 + Steps(설정 절차) + GreenBox(비용 계산) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "임대인과 전세권 설정에 합의하세요",
    desc: "전세권 설정등기는 임대인 동의가 필수예요. 계약 전에 전세권 설정 의사를 확인하세요. 임대인이 거부하면 강제할 수 없어서, 이 경우 확정일자로 대체해야 해요.",
  },
  {
    title: "필요 서류를 준비하세요",
    desc: "등기신청서, 전세권설정계약서, 임대인 인감증명서, 임대인 주민등록초본, 임차인 주민등록등본, 등기권리증(임대인 소유)이 필요해요. 인감증명서는 3개월 이내 발급분이어야 해요.",
  },
  {
    title: "등록면허세를 납부하세요",
    desc: "전세금의 0.2%가 등록면허세예요. 여기에 지방교육세(등록면허세의 20%)와 등기수수료(약 15,000원)가 붙어요. 보증금 3억이면 총 약 73만원이에요.",
  },
  {
    title: "등기소에 신청하세요",
    desc: "대법원 인터넷등기소(iros.go.kr)에서 온라인으로 신청하거나 관할 등기소에 방문해서 신청해요. 접수 후 3~5일이면 등기가 완료돼요.",
    link: { label: "인터넷등기소", href: "https://www.iros.go.kr" },
  },
];

const FAQS = [
  {
    q: "전세권 설정등기와 확정일자, 뭘 해야 하나요?",
    a: "대부분 확정일자로 충분해요. 보증금이 고액(5억 이상)이거나 이사할 가능성이 있으면 전세권을 검토해 보세요. 전세권은 이사해도 권리가 유지되고 직접 경매도 신청할 수 있어요.",
  },
  {
    q: "전세권 설정 비용은 누가 내나요?",
    a: "통상 설정 비용은 임차인이, 말소 비용은 임대인이 부담해요. 특약으로 다르게 정할 수도 있으니 계약 시 협의하세요.",
  },
  {
    q: "임대인이 전세권 설정을 거부하면요?",
    a: "강제할 수 없어요. 임대인 동의 없이는 전세권 설정등기가 불가능해요. 이 경우 전입신고 + 확정일자를 받고, 전세보증보험에 가입하는 게 차선이에요.",
  },
  {
    q: "전세권 있으면 전입신고 안 해도 되나요?",
    a: "전세권 자체로 대항력은 있지만, 소액임차인 최우선변제를 받으려면 전입신고가 필요해요. 실생활에서도 전입신고는 해야 하니 둘 다 하는 게 좋아요.",
  },
  {
    q: "계약 끝나면 전세권 말소는 어떻게 하나요?",
    a: "전세금 반환 후 말소등기를 신청해요. 전세권자 인감증명서, 전세권 등기필증, 말소등기신청서가 필요해요. 말소 비용은 통상 임대인 부담이에요.",
  },
  {
    q: "전세보증보험과 전세권, 둘 다 해야 하나요?",
    a: "둘 다 하면 가장 안전하지만, 비용 부담이 커요. 보통은 전세보증보험만으로 충분해요. 고액 전세이면서 임대인 재정이 불안하면 전세권까지 검토해 보세요.",
  },
];

const SOURCES = [
  { name: "민법 제303조~제319조", href: "https://www.law.go.kr/법령/민법" },
  { name: "대법원 인터넷등기소", href: "https://www.iros.go.kr" },
];

const RELATED = [
  { slug: "확정일자", title: "확정일자", description: "전입신고와 확정일자로 우선변제권을 확보하는 방법." },
  { slug: "대항력-발생-시점", title: "대항력 발생 시점", description: "전입신고 다음 날 0시에 대항력이 발생해요." },
  { slug: "전세보증보험", title: "전세보증보험", description: "보증금 못 받을 때를 대비하는 보험." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 전세 · 권리 보호</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전세권 설정등기, 확정일자랑 뭐가 다를까?<br />
        비용·절차·효력 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 보증금이 큰데, 확정일자만 받으면 충분한 걸까요?
      </p>
      <p style={body}>
        전세권 설정등기는 확정일자보다 <strong>더 강력한 보호</strong>를 받아요.
        이사해도 권리가 유지되고, 보증금을 안 주면 <strong>소송 없이 바로 경매 신청</strong>이 가능해요.
        대신 임대인 동의가 필요하고 비용(보증금의 약 0.24%)이 들어요.
        <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제303조</a>에서 전세권을 규정하고 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>전세권과 확정일자, 핵심 차이가 뭔가요?</H2>
      <p style={body}>
        가장 큰 차이는 <strong>경매신청권</strong>이에요. 전세권이 있으면 보증금 미반환 시 소송 없이 바로 경매를 신청할 수 있어요.
        확정일자는 지급명령이나 소송을 거쳐야 해요.
      </p>

      <SectionBadge>전세권 vs 확정일자 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>전세권</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>확정일자</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["권리 성질", "물권 (등기부 기재)", "채권 (확정일자부)"],
              ["대항력", "등기 즉시", "전입 다음 날 0시"],
              ["경매신청권", "직접 경매 가능", "소송/지급명령 필요"],
              ["이사 시", "권리 유지", "대항력 상실"],
              ["비용", "보증금의 약 0.24%", "600원"],
              ["임대인 동의", "필수", "불필요"],
            ].map(([item, jeonse, hwakjeong], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 600 }}>{jeonse}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{hwakjeong}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CategoryButton label="부동산 정보" count={12} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>전세권 설정 비용은 얼마 드나요?</H2>
      <p style={body}>
        전세권 설정에 드는 비용을 보증금 3억원 기준으로 계산해 볼게요.
      </p>

      <GreenBox>
        보증금 3억원 기준 전세권 설정 비용{"\n"}
        · 등록면허세: 3억 x 0.2% = 600,000원{"\n"}
        · 지방교육세: 60만 x 20% = 120,000원{"\n"}
        · 등기수수료: 약 15,000원{"\n"}
        · 합계: 약 735,000원{"\n\n"}
        확정일자는 600원이에요. 비용 차이가 큰 대신 보장도 달라요.
      </GreenBox>

      <Divider />

      <H2>전세권 설정 절차는 이렇게 진행돼요</H2>
      <p style={body}>
        임대인 동의를 먼저 받고, 서류 준비 후 등기소에 신청하면 돼요.
        온라인으로도 가능해요.
      </p>

      <Steps steps={STEPS} />

      <BorderBox>
        <strong>내 상황에 맞는 선택 가이드</strong>{"\n"}
        · 일반적인 전세 → 확정일자 + 전세보증보험이면 충분{"\n"}
        · 보증금 5억 이상 고액 전세 → 전세권 검토{"\n"}
        · 이사 가능성이 높다 → 전세권 유리 (이사해도 권리 유지){"\n"}
        · 임대인이 동의 안 한다 → 확정일자 + 전세보증보험
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 일반적인 부동산 법률 정보를 제공해요. 구체적인 등기 절차는 관할 등기소나 법무사에게 확인하세요." />
    </ArticleLayout>
  );
}
