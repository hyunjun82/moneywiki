"use client";
// Q1. 오피스텔을 사려는데 주거용으로 쓰면 주택 수에 포함되는지, 세금이 얼마나 달라지는지 궁금한 상황
// Q2. 업무용과 주거용 차이를 파악하고, 세금(취득세·종부세·양도세) 영향을 계산해서 용도 결정을 내린다
// Q3. 주거용 판단 기준, 주택 수 포함 시점, 취득세(4.6% vs 1~12%), 종부세, 양도세 중과, 임대사업자 효과
// Q4. 비교표(업무용 vs 주거용) + GreenBox(세금 차이 예시) + EligibilityChecker(주거용 판단) + BorderBox(임대사업자) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const ELIG_ITEMS = [
  { id: "resident", label: "오피스텔에 전입신고를 했다 (또는 할 예정이다)" },
  { id: "living", label: "실제로 거주하고 있다 (생활 공간으로 사용)" },
  { id: "facility", label: "취사시설과 화장실이 구비되어 있다" },
  { id: "realty", label: "재산세가 '주택'으로 과세되고 있다" },
];

const CHECKLIST = [
  "오피스텔 용도 확인: 건축물대장에 업무시설인지 주거시설인지",
  "전입신고 여부 확인: 전입하면 주거용으로 간주될 수 있어요",
  "기존 보유 주택 수 확인: 오피스텔 포함 시 몇 주택자인지",
  "재산세 과세 구분 확인: 주택분이면 주택 수 포함",
  "조정대상지역 여부 확인: 중과세율 적용 여부 결정",
  "용도 변경 필요 시: 시·군·구청에 변경 신고",
];

const FAQS = [
  {
    q: "전입신고 안 하면 주택 수에 안 들어가나요?",
    a: "전입신고 여부만으로 판단하지 않아요. 재산세가 주택분으로 과세되고 있으면 전입신고와 관계없이 주택 수에 포함돼요. 실제 거주 여부를 세무서에서 확인하면 주거용으로 판정될 수도 있어요.",
  },
  {
    q: "오피스텔 분양받을 때 취득세가 4.6%라는데요?",
    a: "최초 분양 시에는 건축물대장상 업무시설이라 4.6%(취득세 4% + 지방교육세 0.4% + 농특세 0.2%)가 기본이에요. 이후 주거용으로 전환하면 주택 취득세 기준으로 재산정이 가능한 경우가 있어요.",
  },
  {
    q: "주거용 오피스텔도 1세대 1주택 비과세가 되나요?",
    a: "조건을 충족하면 가능해요. 주거용 오피스텔 1채만 보유하고, 2년 이상 보유(조정대상지역은 거주 요건 추가)하면 양도세 비과세를 받을 수 있어요. 하지만 다른 주택을 함께 보유하면 비과세가 깨져요.",
  },
  {
    q: "업무용으로 유지하는 게 세금에서 유리한가요?",
    a: "주택 수를 늘리고 싶지 않다면 업무용이 유리해요. 취득세 4.6% 고정이고, 종부세·양도세 중과에서 빠지니까요. 하지만 전입신고를 하면 대항력(보증금 보호)이 생기는 장점이 있어서 세금과 보호 사이에서 선택해야 해요.",
  },
  {
    q: "임대사업자 등록하면 세금이 줄어드나요?",
    a: "전용 40㎡ 이하 오피스텔은 취득세가 면제되고, 종부세 합산 배제(조건 충족 시), 양도세 중과 배제 혜택이 있어요. 대신 의무 임대기간(8~10년)과 임대료 인상 제한(5% 이내)을 지켜야 해요.",
  },
  {
    q: "오피스텔을 주거용에서 업무용으로 바꿀 수 있나요?",
    a: "시·군·구청에 용도변경 신고를 하면 돼요. 건축물대장 변경 → 재산세 과세 구분 변경 순서예요. 변경 시점부터 주택 수에서 빠지지만, 이전 기간의 주거용 사용 이력은 양도세 계산에 영향을 줘요.",
  },
  {
    q: "시가표준액 1억 이하 오피스텔도 주택 수에 포함되나요?",
    a: "아니에요. 2020년 이후 취득한 오피스텔이라도 시가표준액 1억 원 이하면 취득세 중과 대상 주택 수에서 제외돼요. 지방 소형 오피스텔은 이 기준에 해당하는 경우가 많아요.",
  },
];

const SOURCES = [
  { name: "지방세법", href: "https://www.law.go.kr/법령/지방세법" },
  { name: "종합부동산세법", href: "https://www.law.go.kr/법령/종합부동산세법" },
  { name: "위택스", href: "https://www.wetax.go.kr" },
];

const RELATED = [
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 납부 방법", description: "주택 취득세 세율과 60일 납부 기한." },
  { slug: "양도소득세-계산", title: "양도소득세 계산 방법", description: "집 팔 때 양도차익 세금 계산법." },
  { slug: "종합부동산세-기준", title: "종합부동산세 부과 기준", description: "공시가 합산과 세율 구조 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 오피스텔 · 세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주거용 오피스텔, 주택 수에 포함되나요?<br />
        취득세·종부세·양도세 차이 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        오피스텔 하나 샀을 뿐인데, 갑자기 2주택자가 될 수 있어요.
      </p>
      <p style={body}>
        주거용으로 사용하면 <a href="https://www.law.go.kr/법령/지방세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>지방세법</a>상 주택 수에 포함돼요.
        업무용 오피스텔 <a href="/w/취득세-계산-세율-납부" style={{ color: "#1D9E75", textDecoration: "underline" }}>취득세</a>는 4.6% 고정이지만, 주거용은 <strong>1~12%</strong>까지 왔다 갔다 해요.
        어떤 기준으로 '주거용'이 되는지, 세금이 얼마나 달라지는지 아래에서 확인하세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 업무용 vs 주거용 세금 비교 */}
      <H2>업무용과 주거용, 세금이 이렇게 달라요</H2>
      <p style={body}>
        같은 오피스텔이라도 용도에 따라 세금 체계가 완전히 바뀌어요.
        아래 표를 보면 차이가 한눈에 들어오죠.
      </p>

      <SectionBadge>용도별 세금 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>세금 항목</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>업무용</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>주거용</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["취득세", "4.6% (고정)", "1~12% (주택 수 따라)"],
              ["재산세", "0.25%", "0.1~0.4% (주택)"],
              ["종부세", "대상 아님", "주택분 합산 대상"],
              ["양도세", "일반세율", "주택 기준 (중과 가능)"],
              ["주택 수 포함", "미포함", "포함"],
            ].map(([item, biz, home], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{item}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{biz}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#1D9E75", fontWeight: 600 }}>{home}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        5억 원 오피스텔 취득세 비교{"\n\n"}
        · 업무용: 5억 x 4.6% = 2,300만 원{"\n"}
        · 주거용 1주택: 5억 x 1.1% = 550만 원{"\n"}
        · 주거용 2주택 (조정지역): 5억 x 8.4% = 4,200만 원{"\n\n"}
        1주택이면 주거용이 훨씬 저렴하지만, 2주택 이상이면 업무용보다 비싸져요.
      </GreenBox>

      <CategoryButton label="부동산 정보" count={10} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 주거용 판단 기준 */}
      <H2>내 오피스텔이 '주거용'으로 잡히는 기준</H2>
      <p style={body}>
        건축물대장에 '업무시설'로 되어 있어도, 실제 사용이 주거용이면 주택으로 봐요.
        아래 항목 중 해당하는 게 많을수록 주거용으로 판정될 가능성이 높아요.
      </p>

      <EligibilityChecker
        items={ELIG_ITEMS}
        allMatchText="주거용 오피스텔로 판단될 가능성이 높아요."
        partialMatchText="일부만 해당해도 세무조사 시 주거용으로 판정될 수 있어요."
      />

      <p style={body}>
        핵심은 <strong>재산세 과세 구분</strong>이에요. 재산세가 주택분으로 나오고 있으면, 취득세·종부세·양도세 모두 주택 기준으로 적용돼요.
        본인 오피스텔의 재산세 고지서를 확인해 보세요.
        주택 수에 포함되면 종부세와 양도세까지 영향을 받으니까 미리 대비해야 하죠.
      </p>

      <Divider />

      {/* H2-3: 종부세·양도세 */}
      <H2>종부세·양도세까지 영향이 이어져요</H2>
      <p style={body}>
        주거용 오피스텔이 주택 수에 들어가면 종합부동산세와 양도소득세까지 연쇄적으로 영향을 받아요.
      </p>

      <BorderBox>
        <strong>종부세</strong>{"\n"}
        · 주거용 오피스텔은 주택분 종부세 합산 대상{"\n"}
        · 과세 기준일: 매년 6월 1일{"\n"}
        · 1세대 1주택자 공제 9억 원 (부부 공동명의 12억 원){"\n"}
        · 업무용은 종부세 대상이 아님{"\n\n"}
        <strong>양도소득세</strong>{"\n"}
        · 주거용 포함 2주택: 기본세율 + 20%p 중과{"\n"}
        · 주거용 포함 3주택 이상: 기본세율 + 30%p 중과{"\n"}
        · 1세대 1주택 비과세: 주거용 오피스텔 1채만 보유 시 가능 (2년 보유 요건)
      </BorderBox>

      <p style={body}>
        업무용으로 유지하면 종부세에서 빠지고 양도세 중과도 없어요.
        하지만 전입신고를 못 하면 임차인 보호(대항력)를 받지 못하는 단점이 있어요.
        세금을 아낄 건지, 보증금 보호를 받을 건지 상황에 따라 판단해야 해요.
      </p>

      <Divider />

      {/* H2-4: 체크리스트 */}
      <H2>오피스텔 매수 전 체크리스트</H2>
      <p style={body}>
        오피스텔을 사기 전에 반드시 확인해야 할 항목들이에요.
        특히 기존에 주택을 보유하고 있다면 주택 수 변동이 세금에 미치는 영향이 크니까 미리 따져보세요.
      </p>

      <SectionBadge>매수 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        주거용 오피스텔 세금에서 실제로 헷갈리는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 지방세법·종합부동산세법 기준으로 작성했어요. 세율과 주택 수 산정 기준은 정책 변경에 따라 달라질 수 있으니 위택스 또는 국세청에서 최신 기준을 확인해 주세요." />
    </ArticleLayout>
  );
}
