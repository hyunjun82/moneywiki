"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 투자용으로 집을 사서 전세 놓고 한 번도 안 살았는데, 팔 때 양도세 비과세를 받을 수 있는지 확인하려는 상황
// Q2. 내 주택이 비과세 요건을 충족하는지 판단하고, 부족하면 거주 계획을 세운다
// Q3. 비과세 3요건(1세대+1주택+2년 보유), 조정지역 2년 거주요건, 12억 초과 시 과세 방식, 장기보유특별공제율
// Q4. EligibilityChecker(비과세 요건 체크) + GreenBox(결론 요약) + 세율표(장특공제) + Steps(거주 증명) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIG_ITEMS = [
  { id: "one", label: "양도일 현재 1세대가 국내에 주택 1채만 보유하고 있나요?" },
  { id: "two", label: "해당 주택을 취득일로부터 2년 이상 보유했나요?" },
  { id: "three", label: "양도가액이 12억원 이하인가요?" },
  { id: "four", label: "조정대상지역에서 2017.8.3 이후 취득했다면 2년 이상 거주했나요?" },
];

const PROVE_STEPS = [
  {
    title: "전입신고 기간을 먼저 확인하세요",
    desc: "주민센터에서 전입세대 열람을 통해 전입신고 기간을 확인할 수 있어요. 전입 기간이 2년 이상이어야 하고, 중간에 빠져나간 기간이 있으면 합산해서 계산해요.",
    tip: "전입신고만으로는 부족해요. 실제 거주 증거가 필요해요.",
  },
  {
    title: "공과금 납부내역을 모아두세요",
    desc: "전기요금, 수도요금, 가스요금 납부내역이 실거주의 핵심 증거예요. 전입신고만 해놓고 다른 집에서 산 경우 공과금이 거의 안 나오기 때문에 국세청이 바로 알아채요.",
    tip: "공과금이 일정하게 나와야 실거주로 인정",
  },
  {
    title: "관리비 내역과 생활 증거를 챙기세요",
    desc: "아파트 관리비 납부내역, 자녀 재학증명서, 우편물 수령 기록 같은 증거를 확보하세요. 국세청 실거주 판정에서 이런 서류들이 결정적인 역할을 해요.",
    tip: "자녀 학교 재학증명서가 가장 강력한 증거 중 하나",
  },
  {
    title: "양도소득세 비과세 신고를 하세요",
    desc: "홈택스(hometax.go.kr)에서 양도소득세 예정신고를 해요. 비과세 대상이더라도 12억 초과분이 있으면 신고가 필요해요. 12억 이하라면 신고 의무는 없지만 신고해두면 분쟁 예방에 도움이 돼요.",
    tip: "비과세라도 신고해두면 나중에 증명이 편해요",
  },
];

const FAQS = [
  { q: "조정지역에서 샀는데 지금은 해제됐어요. 거주요건 적용돼요?", a: "취득 당시에 조정대상지역이었다면 거주요건이 적용돼요. 나중에 해제되더라도 취득 시점이 기준이에요. 2017.8.3~취득일 사이에 조정지역이었는지가 중요하죠." },
  { q: "2년 거주를 연속으로 안 해도 돼요?", a: "연속 거주가 아니어도 돼요. 합산해서 2년이면 충족해요. 예를 들어 1년 살다가 다른 집에서 1년 살고 다시 돌아와서 1년 살면 합산 2년이에요." },
  { q: "12억 넘으면 전액 과세돼요?", a: "아니에요. 12억원까지는 비과세고 초과분에 대해서만 과세돼요. 15억에 팔았다면 3억원 부분에 대해서만 세금을 계산해요." },
  { q: "거주요건 못 채웠는데 세금 줄일 방법 없나요?", a: "장기보유특별공제를 받을 수 있어요. 3년 이상 보유하면 연 2%씩, 10년이면 최대 20%까지 양도차익에서 공제해줘요. 비과세보다는 덜하지만 세금을 꽤 줄일 수 있어요." },
  { q: "부부가 각각 1채씩 있으면 1세대 1주택 아닌가요?", a: "부부는 같은 세대예요. 부부가 각각 1채씩 있으면 1세대 2주택이에요. 한 채를 먼저 팔아야 나머지 한 채에 비과세를 적용받을 수 있어요." },
  { q: "일시적 2주택이면 비과세 받을 수 있다는데요?", a: "네. 이사 등으로 새 집을 사고 기존 집을 아직 못 팔았다면, 기존 집을 3년 이내에 팔면 비과세 적용이 돼요. 조정지역은 2년 이내에 팔아야 하고요." },
];

const SOURCES = [
  { name: "국세청 양도소득세", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7707&mi=2308" },
  { name: "소득세법", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "소득세법 시행령", href: "https://www.law.go.kr/법령/소득세법시행령" },
];

const RELATED = [
  { slug: "취득세-계산-세율-납부", title: "취득세 세율 계산과 납부 방법", description: "집 살 때 내는 세금, 1~3% 세율과 60일 납부 기한." },
  { slug: "경매-권리분석-말소기준권리-인수-소멸", title: "경매 권리분석과 말소기준권리", description: "경매로 집 사기 전에 꼭 알아야 할 인수와 소멸 권리." },
  { slug: "부동산-매매-계약-절차", title: "부동산 매매 계약 절차", description: "계약서 작성부터 잔금까지 매매 절차 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>양도소득세 · 부동산 세금 · 비과세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        1세대 1주택 양도세 비과세, 받을 수 있을까?<br />
        조정지역 거주요건과 판단 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "투자용으로 사서 전세 놓고 한 번도 안 살았는데, 양도세 안 내도 되나요?"
      </p>
      <p style={body}>
        1세대 1주택이면 2년 보유만으로 비과세라고 알고 있는 분이 많은데, <strong>조정대상지역</strong>에서 2017년 8월 3일 이후에 취득한 주택은 <strong>2년 거주요건</strong>이 추가로 필요해요.
        거주 안 했으면 비과세가 안 되고, <a href="/w/취득세-계산-세율-납부" style={{ color: "#1D9E75", textDecoration: "underline" }}>취득세</a>와 별개로 양도차익 전체에 세금이 붙어요.
        아래에서 내 주택이 비과세 대상인지 바로 확인해 보세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 비과세 요건 체크 */}
      <H2>내 주택, 비과세 받을 수 있는지 체크해 보세요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제89조</a>에서 정한 1세대 1주택 비과세 요건은 크게 4가지예요.
        조정대상지역 여부에 따라 거주요건이 추가되기 때문에 취득 시점과 지역을 꼭 확인해야 해요.
      </p>

      <SectionBadge>비과세 요건 셀프 체크</SectionBadge>
      <EligibilityChecker
        items={ELIG_ITEMS}
        allMatchText="4가지 요건을 모두 충족하면 양도소득세 비과세를 받을 수 있어요."
        partialMatchText="체크되지 않은 요건이 있으면 비과세가 어려울 수 있어요. 아래에서 각 요건을 자세히 확인하세요."
      />

      <p style={body}>
        4가지 중 하나라도 빠지면 비과세가 안 돼요. 특히 조정지역 거주요건을 놓치는 분이 많으니 취득 시점과 지역을 반드시 확인하세요.
      </p>

      <CategoryButton label="부동산 세금 정보" count={8} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 비과세 기본 구조 */}
      <H2>2년 보유 + 12억 이하면 세금이 0원이에요</H2>
      <p style={body}>
        1세대가 국내에 1주택만 갖고 있고, 2년 이상 보유했다면 양도소득세가 비과세예요. 양도가액 12억원 이하일 때 세금이 아예 0원이 되는 거죠.
      </p>

      <GreenBox title="1세대 1주택 비과세 핵심 요약">
        {"1세대: 배우자 + 같은 주소에 살고 있는 가족 전체가 1세대\n1주택: 양도일 현재 국내에 주택 1채만 보유\n2년 보유: 취득일부터 양도일까지 2년 이상\n12억 기준: 양도가액 12억 이하면 전액 비과세, 초과분만 과세"}
      </GreenBox>

      <p style={body}>
        8억에 사서 10억에 팔았다면? 2억 양도차익이 생겼지만 12억 이하니까 세금 0원이에요. 15억에 팔았다면? 12억까지는 비과세고, 초과분 3억에 해당하는 양도차익에만 세금이 붙어요.
      </p>

      <Divider />

      {/* H2-3: 조정지역 거주요건 */}
      <H2>조정대상지역이면 왜 2년 거주까지 필요한가요?</H2>
      <p style={body}>
        2017년 8.2 대책 이후 투기 과열을 막기 위해 <a href="https://www.law.go.kr/법령/소득세법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 시행령 제154조 제2항</a>에서 조정대상지역 취득 주택에 거주요건을 추가했어요.
        이 규정의 핵심은 "전세 놓고 시세차익만 노리는 투자를 막겠다"는 거예요.
      </p>

      <BorderBox>
        <strong>조정대상지역 거주요건 적용 대상</strong>{"\n"}
        {"· 2017년 8월 3일 이후 취득한 주택\n· 취득 당시 해당 지역이 조정대상지역이었던 경우\n· 나중에 조정지역이 해제되더라도 취득 시점이 기준\n· 2년 보유 + 2년 거주, 둘 다 충족해야 비과세"}
      </BorderBox>

      <p style={body}>
        서울 강남구에서 2020년에 아파트를 사서 전세만 놓았다면, 6년 넘게 보유해도 거주 안 했으니 비과세 못 받아요. 반대로 2022년부터 2년 동안 실제로 살았다면, 보유 + 거주 요건을 모두 충족해서 비과세가 가능하죠.
      </p>

      <Divider />

      {/* H2-4: 거주 증명 방법 */}
      <H2>거주했다는 걸 어떻게 증명하나요?</H2>
      <p style={body}>
        전입신고만 해놓고 실제로 안 살면 안 돼요. <a href="https://www.nts.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a>이 공과금, 관리비, 학교 기록까지 전부 확인해요. 공과금이 거의 안 나왔다면 "실거주 아님"으로 판정하고 비과세를 부인하죠.
      </p>

      <SectionBadge>거주 증명 4단계</SectionBadge>
      <Steps steps={PROVE_STEPS} />

      <p style={body}>
        증거는 많을수록 유리해요. 전입신고 + 공과금 + 관리비 + 자녀 학교 기록까지 갖추면 국세청 조사에서 문제없이 통과할 수 있어요.
      </p>

      <Divider />

      {/* H2-5: 거주요건 못 채웠을 때 */}
      <H2>거주 안 했으면 세금을 얼마나 내야 하나요?</H2>
      <p style={body}>
        비과세는 못 받지만 장기보유특별공제로 세금을 줄일 수 있어요. 3년 이상 보유하면 보유 기간에 따라 양도차익의 일부를 공제해줘요.
      </p>

      <SectionBadge>비거주 시 장기보유특별공제율</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>보유 기간</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>공제율</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["3년", "6%"], ["4년", "8%"], ["5년", "10%"],
              ["6년", "12%"], ["7년", "14%"], ["8년", "16%"],
              ["9년", "18%"], ["10년", "20%"], ["11년", "22%"],
              ["12년", "24%"], ["13년", "26%"], ["14년", "28%"], ["15년 이상", "30%"],
            ].map(([period, rate], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{period}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        6년 보유, 양도차익 2억이라면? 12% 공제로 2,400만원을 빼고 1억 7,600만원에 세율을 적용해요. 비과세만큼은 아니지만 적지 않은 금액이죠. 보유 기간이 길수록 유리하니까, 팔 시점을 조절하는 것도 전략이에요.
      </p>

      <Divider />

      {/* H2-6: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        양도세 비과세에서 실제로 헷갈리는 질문들만 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법 및 시행령으로 작성했어요. 세율과 비과세 요건은 정책 변경에 따라 달라질 수 있으니 최신 기준은 국세청 또는 홈택스에서 확인해 주세요." />
    </ArticleLayout>
  );
}
