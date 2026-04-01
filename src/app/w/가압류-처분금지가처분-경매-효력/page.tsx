"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 경매 물건을 검토하는데 등기부에 가압류·가처분이 있어서 낙찰 후 떠안는 건지 걱정하는 상황
// Q2. 말소기준권리 전후를 구분해서 인수·말소 여부를 판단하고 안전하게 입찰한다
// Q3. 말소기준권리 개념, 가압류 vs 가처분 차이, 전후 판단법, 등기부 확인 포인트
// Q4. GreenBox(결론 요약) + CompareTable(가압류 vs 가처분) + Steps(등기부 확인 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "등기부등본을 발급받으세요",
    desc: "대법원 인터넷등기소(iros.go.kr)에서 해당 부동산 등기부등본을 발급받으세요. 갑구(소유권)와 을구(담보권)를 모두 봐야 해요. 온라인으로 700원이면 바로 출력할 수 있어요.",
    tip: "갑구에 가압류·가처분, 을구에 근저당권이 표시돼요",
  },
  {
    title: "말소기준권리를 찾으세요",
    desc: "을구에서 가장 먼저 설정된 근저당권(또는 갑구의 압류)이 말소기준권리가 돼요. 이 권리의 접수일자를 기준으로 앞뒤를 나누면 돼요. 말소기준권리보다 뒤에 설정된 권리는 낙찰로 전부 사라져요.",
    tip: "접수일자 기준이지 설정일자 기준이 아니에요",
  },
  {
    title: "가압류·가처분의 접수일자를 비교해보세요",
    desc: "갑구에 있는 가압류와 처분금지가처분의 접수일자가 말소기준권리보다 뒤면 낙찰로 말소돼요. 앞이면 가처분은 인수될 수 있으니 주의하세요. 가압류는 말소기준권리 자체가 될 수도 있어서 별도로 확인이 필요해요.",
    tip: "선순위 가처분이 있으면 낙찰 후에도 소유권 분쟁 가능",
  },
  {
    title: "권리분석이 어려우면 전문가 상담을 받으세요",
    desc: "등기부 권리관계가 복잡하면 법무사나 경매 전문 변호사에게 등기부를 보여주고 상담받는 게 안전해요. 상담비 5~10만원으로 수천만원 손해를 막을 수 있어요.",
  },
];

const COMPARE_ROWS = [
  { label: "목적", optionA: "금전채권 보전 (돈 받기)", optionB: "소유권이전청구권 보전 (재산 자체)" },
  { label: "최종 목표", optionA: "경매로 현금화", optionB: "해당 재산의 소유권 취득" },
  { label: "말소기준 후 설정", optionA: "낙찰로 말소", optionB: "낙찰로 말소" },
  { label: "말소기준 전 설정", optionA: "말소기준권리가 될 수 있음", optionB: "원칙적으로 인수 (주의!)" },
  { label: "배당 참가", optionA: "배당요구 가능", optionB: "배당요구 불가" },
];

const FAQS = [
  {
    q: "경매 낙찰받으면 가압류는 전부 사라지나요?",
    a: "말소기준권리 이후에 설정된 가압류는 전부 말소돼요. 하지만 말소기준권리 자체가 가압류인 경우도 있고, 그보다 앞선 가압류는 상황에 따라 다를 수 있어요. 등기부에서 접수일자를 반드시 비교해야 해요.",
  },
  {
    q: "처분금지가처분이 선순위면 어떻게 되나요?",
    a: "말소기준권리보다 먼저 설정된 처분금지가처분은 원칙적으로 매수인에게 인수돼요. 가처분권자가 소유권을 주장할 수 있어서, 낙찰받고도 소유권 분쟁에 휘말릴 수 있죠. 이런 물건은 피하는 게 안전해요.",
  },
  {
    q: "가압류와 가처분, 등기부에서 어떻게 구분하나요?",
    a: "둘 다 갑구(소유권에 관한 사항)에 기재돼요. '가압류'는 '가압류'로, '처분금지가처분'은 '처분금지가처분'으로 표시돼요. 목적과 효력이 다르니 반드시 구분해서 봐야 해요.",
  },
  {
    q: "말소기준권리가 뭔지 모르겠어요",
    a: "쉽게 말하면 경매에서 '여기까지는 살아남고, 여기 이후는 다 지워진다'는 기준선이에요. 보통 을구의 선순위 근저당권이나 갑구의 압류가 말소기준권리가 돼요. 민사집행법 제91조에서 정하고 있어요.",
  },
  {
    q: "가압류가 여러 개 있으면 어떻게 되나요?",
    a: "말소기준권리 이후의 가압류는 몇 개든 전부 말소돼요. 문제는 말소기준권리 이전에 설정된 가압류인데, 이 경우 가압류 자체가 말소기준권리가 될 수 있어요. 법원 매각물건명세서에서 인수·말소 여부를 꼭 보세요.",
  },
  {
    q: "법원 매각물건명세서에 답이 있나요?",
    a: "네, 대법원 경매정보(courtauction.go.kr)에서 해당 사건의 매각물건명세서를 보면 인수되는 권리와 말소되는 권리가 정리돼 있어요. 입찰 전에 반드시 살펴보세요.",
  },
];

const SOURCES = [
  { name: "민사집행법", href: "https://www.law.go.kr/법령/민사집행법" },
  { name: "찾기쉬운 생활법령정보", href: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=306&ccfNo=2&cciNo=1&cnpClsNo=2" },
  { name: "대법원 법원경매정보", href: "https://www.courtauction.go.kr" },
];

const RELATED = [
  { slug: "부동산-경매-절차", title: "부동산 경매 절차", description: "입찰부터 소유권 이전까지 전체 흐름." },
  { slug: "경매-낙찰-점유자-인도명령-명도소송", title: "경매 낙찰 후 인도명령과 명도소송", description: "점유자가 안 나갈 때 법적 해결 방법." },
  { slug: "가압류-신청", title: "가압류 신청 방법", description: "금전채권 보전을 위한 가압류 절차." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 경매 · 권리분석</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경매 물건에 가압류·가처분이 있다면?<br />
        말소와 인수 판단법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        경매 물건 등기부를 봤는데 가압류 3건, 처분금지가처분 2건이 빼곡하게 적혀 있으면 당황스럽죠.
      </p>
      <p style={body}>
        핵심은 <strong>말소기준권리</strong>예요. 이 기준선 이후에 설정된 가압류와 가처분은 낙찰로 <strong>전부 말소</strong>돼요.
        기준선 이전의 가처분은 인수될 수 있으니 주의가 필요하고요.
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법</a> 제91조가 이 규칙을 정하고 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>말소기준권리, 이것만 알면 돼요</H2>
      <p style={body}>
        말소기준권리가 뭐냐고요? 경매에서 &ldquo;여기부터는 다 지워진다&rdquo;는 기준선이에요. 보통 을구에 있는 선순위 근저당권이나 갑구의 압류가 말소기준권리가 돼요.
      </p>
      <p style={body}>
        이 기준선 <strong>이후</strong>에 등기된 권리(후순위 근저당, 가압류, 가처분 등)는 낙찰과 동시에 전부 소멸해요. 매수인이 떠안지 않아요. 반대로 기준선 <strong>이전</strong>에 등기된 권리 중 일부는 매수인에게 인수돼요. 특히 처분금지가처분이 선순위면 소유권 분쟁으로 번질 수 있어서 위험하죠.
      </p>

      <GreenBox title="한 줄 결론">
        말소기준권리 이후 = 낙찰로 전부 말소. 이전 가처분 = 인수 가능 → 입찰 전 반드시 확인.
      </GreenBox>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>가압류와 처분금지가처분, 뭐가 다르죠?</H2>
      <p style={body}>
        둘 다 채무자 재산을 묶어두는 건 같아요. 하지만 최종 목적이 전혀 달라요. 가압류는 나중에 돈을 받기 위해 재산을 경매로 현금화하려는 거고, 처분금지가처분은 그 재산 자체의 소유권을 가져오려는 거예요.
      </p>

      <SectionBadge>가압류 vs 처분금지가처분</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>가압류</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>처분금지가처분</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{row.label}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{row.optionA}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{row.optionB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        경매 입찰자 입장에서 중요한 차이는 마지막 줄이에요. 선순위 가처분이 있으면 낙찰받아도 소유권을 온전히 행사 못 할 수 있어요. 이런 물건은 경매 초보라면 피하는 게 맞아요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>등기부에서 말소·인수를 판단하는 순서</H2>
      <p style={body}>
        입찰 전에 등기부등본을 꼭 떼야 해요. 700원이면 온라인으로 바로 확인할 수 있고, 이 확인 하나가 수천만원 손해를 막아줘요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        <a href="/w/부동산-경매-절차" style={{ color: "#1D9E75", textDecoration: "underline" }}>부동산 경매 절차</a> 전체 흐름을 먼저 파악하면 권리분석이 한결 수월해져요.
      </p>

      <Divider />

      <H2>실제로 이렇게 판단하세요</H2>
      <p style={body}>
        A 물건을 예로 들어볼게요. 을구에 근저당권이 2020년 3월 15일 접수돼 있어요. 이게 말소기준권리예요. 갑구에 가압류가 2021년 5월(후순위), 처분금지가처분이 2022년 1월(후순위)에 각각 설정돼 있어요.
      </p>

      <BorderBox>
        <strong>A 물건 판단</strong><br />
        근저당권(2020.3.15) = 말소기준권리<br />
        가압류(2021.5) → 후순위 → <span style={{ color: "#1D9E75", fontWeight: 700 }}>낙찰로 말소</span><br />
        처분금지가처분(2022.1) → 후순위 → <span style={{ color: "#1D9E75", fontWeight: 700 }}>낙찰로 말소</span><br />
        결론: 안전한 물건
      </BorderBox>

      <p style={body}>
        B 물건은 다르죠. 처분금지가처분이 2019년 11월(선순위)에 설정돼 있고, 근저당권이 2020년 3월에 있어요. 이 경우 가처분이 말소기준권리보다 앞서니까 원칙적으로 인수돼요. 가처분권자가 소유권을 주장할 수 있어서 위험한 물건이에요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 법률 정보를 제공하며 법률 자문이 아니에요. 구체적인 사안은 법무사나 변호사와 상담하세요." />
    </ArticleLayout>
  );
}
