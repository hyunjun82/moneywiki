"use client";
import { useState } from "react";
import {
  C,
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3, Divider,
  Info, InlineLink, BridgeCard, ExtBtn,
  TH, THL, TableTitle, TableNote,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultCTA,
  FAQAccordion, RelatedArticles, PrevNext, RelatedMid,
  SidebarCTA, SidebarDocs, SidebarCalc,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "재산세 납부 기간 2026 | 7월 9월 분납 주택 토지 계산",
  description: "재산세는 7월과 9월 두 번 내야 한다는 거 알고 계세요? 2026년 납부 기간과 주택·토지별 분납 조건을 알려드려요.",
  category: "세금",
  keywords: [
    "재산세 납부 기간 7월 9월 납부일",
    "재산세 주택 7월 9월 20만원 기준",
    "재산세 주택 토지 세율 공시가격",
    "재산세 감면 1주택 세액 공제",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "주택 재산세는 <strong>7월(50%)·9월(50%)</strong> 두 번 납부, 토지는 9월 전액",
    "연간 재산세 <strong>20만원 이하</strong>면 7월에 전액 납부, 9월 없음",
    "1세대 1주택 공시가격 9억 이하 <strong>5% 세액공제</strong> 자동 적용",
  ],
  sources: [
    { name: "지방세법 제111조 재산세 세율", url: "https://www.law.go.kr/법령/지방세법", date: "2026-02" },
    { name: "행정안전부 재산세 납부 안내", url: "https://www.mois.go.kr", date: "2026-02" },
    { name: "위택스 재산세 납부", url: "https://www.wetax.go.kr", date: "2026-02" },
  ],
  faq: [
    { q: "재산세 7월에 다 낸 경우 9월에 또 내야 하나요?", a: "주택 재산세는 연간 세액의 절반씩 두 번 나눠 내요. 7월 고지서는 1/2이고, 9월에 나머지 1/2 고지서가 와요. 연간 20만원 이하면 7월에 전액 납부해요." },
    { q: "재산세 납부 기간이 지나면 어떻게 되나요?", a: "납부 기한이 지나면 지연 가산세 3%가 붙어요. 이후 매달 0.75%씩 중가산세가 추가돼요. 위택스나 은행 앱으로 언제든 납부할 수 있어요." },
  ],
  ctaCard: {
    label: "위택스 납부",
    mainText: "재산세 → 위택스에서 납부",
    subText: "7월 16~31일 / 9월 16~30일",
    url: "https://www.wetax.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "종합소득세 신고 안 하면 가산세", url: "/w/종합소득세-신고-안하면-가산세" },
    { title: "프리랜서 3.3% 원천징수 환급", url: "/w/프리랜서-3.3-원천징수-환급" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { prop_type, tax_amount, pay_month, one_home } = sel;
    if (!prop_type || !tax_amount || !pay_month || !one_home) return null;
    if (prop_type === "land") return "land_sep";
    if (prop_type === "building") return "building_july";
    if (tax_amount === "lt20") return "july_full";
    if (tax_amount === "gt500") return "split_eligible";
    if (one_home === "yes") return "house_half_discount";
    return "house_half";
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 납부 구조 확인" },
    { t: "재산세 납부 기간은 언제인가요?", sub: "7월·9월 납부일 · 유형별 구분" },
    { t: "재산세 7월 9월 분납 조건은 무엇인가요?", sub: "20만원 기준 · 500만원 분납" },
    { t: "재산세 주택 토지 계산 방법은 어떻게 되나요?", sub: "공시가격 세율 · 계산 예시" },
    { t: "재산세 감면 조건은 어떻게 되나요?", sub: "1주택 감면 · 세액 공제" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "세금", "재산세"]}
      tags={["2026년 최신", "세금", "재산세", "납부기간"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>재산세는 6월 1일 기준 부동산 소유자에게 부과돼요. <strong>주택은 7월·9월 반반</strong>, 토지는 9월, 건물은 7월에 전액 납부해요. 납부 기간을 놓치면 가산세가 붙어요.</>}
      sourceBar={{ badge: "행안부", name: "지방세법 제111조", date: "2026.02" }}
      stickyLabel="납부 기간"
      stickyValue="7월 16~31일 / 9월 16~30일"
      stickyBtn="납부하러 가기 ↑"
      disclaimer="이 글은 지방세법과 행정안전부 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "🏠", title: "위택스 재산세 납부", sub: "7월·9월 납부 기간 확인", href: "https://www.wetax.go.kr", hot: true },
          { icon: "💰", title: "프리랜서 3.3% 환급", sub: "5월 종합소득세 신고로 환급", href: "/w/프리랜서-3.3-원천징수-환급" },
          { icon: "⚠️", title: "종합소득세 가산세", sub: "신고 안 하면 20% 가산세", href: "/w/종합소득세-신고-안하면-가산세" },
        ]} />
        <SidebarDocs items={[
          { title: "프리랜서 3.3% 환급", cat: "세금·절세", href: "/w/프리랜서-3.3-원천징수-환급" },
          { title: "종합소득세 가산세", cat: "세금·절세", href: "/w/종합소득세-신고-안하면-가산세" },
          { title: "간이과세자 기준 2026", cat: "세금·절세", href: "/w/부가가치세-간이과세자-기준-2026" },
        ]} />
        <SidebarCalc items={[
          { title: "재산세 계산기 (위택스)", href: "https://www.wetax.go.kr" },
          { title: "공시가격 조회 (부동산공시가격)", href: "https://www.realtyprice.kr" },
        ]} />
      </>}
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="checker" title="납부 구조 확인" sub="부동산 유형 · 세액 규모 선택" />
      <P>재산세는 부동산 유형에 따라 납부 시기와 방법이 달라요. 주택인지, 건물인지, 토지인지에 따라 7월에 낼지 9월에 낼지가 결정돼요. 아래에서 내 상황을 선택해보세요.</P>

      <CheckerShell title="재산세 납부 구조 확인기" sub="30초 확인">
        <CheckerQ n="1" label="보유한 부동산 유형이 어떻게 되나요?" group="prop_type" opts={[
          ["house", "주택 (아파트·단독·빌라 등)"],
          ["building", "건물 (상가·오피스 등 비주거)"],
          ["land", "토지 (농지·임야·나대지 등)"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="연간 재산세 예상액이 얼마인가요?" group="tax_amount" opts={[
          ["lt20", "20만원 이하"],
          ["20to500", "20~500만원"],
          ["gt500", "500만원 초과"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="3" label="납부 예정 월이 언제인가요?" group="pay_month" opts={[
          ["july", "7월"],
          ["sep", "9월"],
          ["both", "7월·9월 모두"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="4" label="1세대 1주택 여부가 어떻게 되나요?" group="one_home" opts={[
          ["yes", "1세대 1주택 (세대원 포함)"],
          ["no", "다주택 또는 비주거 부동산"],
        ]} sel={sel} pick={pick} />

        {result === "land_sep" && (
          <ResultPass title="토지는 9월에 전액 납부해요">
            <P>토지분 재산세는 9월 16일~30일에 전액 납부해요. 7월에는 납부할 금액이 없어요. 9월 납부 기간 내에 위택스나 은행에서 납부하면 돼요.</P>
            <ResultCTA icon="🏡" title="위택스에서 토지 재산세 납부" desc="9월 16~30일 납부 기간 확인" href="https://www.wetax.go.kr" />
          </ResultPass>
        )}
        {result === "building_july" && (
          <ResultPass title="건물(비주거)은 7월에 전액 납부해요">
            <P>상가, 오피스 등 주거 외 건물분 재산세는 7월 16일~31일에 전액 납부해요. 납부 기간을 놓치면 지연 가산세 3%가 붙으니 주의하세요.</P>
            <ResultCTA icon="🏢" title="위택스에서 건물 재산세 납부" desc="7월 16~31일 납부 기간" href="https://www.wetax.go.kr" />
          </ResultPass>
        )}
        {result === "july_full" && (
          <ResultPass title="주택 재산세 20만원 이하 → 7월에 전액 납부">
            <P>연간 재산세가 20만원 이하라면 7월 16일~31일에 전액 납부해요. 9월에는 별도 청구가 없어요. 납부 고지서를 확인해서 전액인지 1/2인지 금액을 확인하세요.</P>
            <ResultCTA icon="📋" title="위택스에서 주택 재산세 납부" desc="7월 16~31일 전액 납부" href="https://www.wetax.go.kr" />
          </ResultPass>
        )}
        {result === "split_eligible" && (
          <ResultPass title="재산세 500만원 초과 → 분납 신청 가능해요">
            <P>재산세 본세가 250만원을 초과하면 납부 기한 후 45일 이내에 분납을 신청할 수 있어요. 초과분을 나눠 낼 수 있어서 한 번에 내는 부담을 줄일 수 있어요.</P>
            <ResultCTA icon="💡" title="위택스 분납 신청" desc="납부 기한 후 45일 이내 신청" href="https://www.wetax.go.kr" />
          </ResultPass>
        )}
        {result === "house_half_discount" && (
          <ResultPass title="1주택자는 7월·9월 각 1/2, 5% 세액공제 적용">
            <P>1세대 1주택 공시가격 9억원 이하라면 재산세 5% 세액공제 혜택이 있어요. 주택 재산세는 7월 16~31일에 1/2, 9월 16~30일에 나머지 1/2를 내요.</P>
            <ResultCTA icon="🏠" title="위택스에서 주택 재산세 납부" desc="7월·9월 각각 1/2씩 납부" href="https://www.wetax.go.kr" />
          </ResultPass>
        )}
        {result === "house_half" && (
          <ResultPass title="주택 재산세는 7월·9월 각 1/2씩 납부해요">
            <P>주택 재산세 20만원 초과 시 7월 16~31일에 1/2, 9월 16~30일에 나머지 1/2를 납부해요. 납부 고지서가 각각 발송되니 한 번만 내지 않도록 주의하세요.</P>
            <ResultCTA icon="🏠" title="위택스에서 주택 재산세 납부" desc="7월·9월 각각 1/2씩 납부" href="https://www.wetax.go.kr" />
          </ResultPass>
        )}
      </CheckerShell>

      <BridgeCard
        q="재산세 고지서가 7월에 왔는데 9월에도 또 오나요?"
        a="주택 재산세는 7월과 9월 두 번 나눠 내요. 7월 고지서는 연간 세액의 1/2이고, 9월에 나머지 1/2 고지서가 와요."
        label="납부 기간 확인"
        href="#s02"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s02" title="재산세 납부 기간은 언제인가요?" sub="7월·9월 납부일 · 유형별 구분" />
      <P>재산세는 과세 기준일인 6월 1일 현재 소유자에게 부과돼요. 6월 1일 이전에 팔았다면 납세 의무가 없고, 6월 2일 이후에 팔았다면 여전히 납세 의무가 있어요. 부동산 매매 시점을 정할 때 참고하면 절세가 돼요.</P>

      <H3>부동산 유형별 납부 기간 (2026년)</H3>
      <TableTitle>부동산 유형별 재산세 납부 기간</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>부동산 유형</THL><THL>7월 납부</THL><THL>9월 납부</THL><THL>비고</THL></tr>
          </thead>
          <tbody>
            {[
              ["주택 (재산세 20만원 초과)", "7월 16~31일 (1/2)", "9월 16~30일 (1/2)", "연간 세액을 반반 납부"],
              ["주택 (재산세 20만원 이하)", "7월 16~31일 (전액)", "없음", "7월에 한 번만 납부"],
              ["건물 (비주거)", "7월 16~31일 (전액)", "없음", "상가·오피스 등"],
              ["토지", "없음", "9월 16~30일 (전액)", "농지·임야·나대지 등"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 10px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>과세 기준일: 6월 1일 현재 소유자 / 기간 내 미납 시 3% 가산세 부과</TableNote>

      <P>납부 방법은 은행 방문, 위택스 인터넷 납부, 스마트폰 앱, ARS(1599-9111), 자동이체 등 다양해요. 카드 납부도 가능하고 포인트도 쓸 수 있어요.</P>
      <Info type="tip">{"6월 1일 기준일 전에 부동산을 취득했다면 전 소유자와 협의해서 세금 부담을 나누는 특약을 쓰기도 해요. 법적으로는 취득일 기준이지만 관행적으로 비율로 나누는 경우도 있어요."}</Info>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s03" title="재산세 7월 9월 분납 조건은 무엇인가요?" sub="20만원 기준 · 500만원 분납" />
      <P>주택 재산세 20만원 기준은 7월에 전액 납부할지, 7월·9월로 나눌지를 결정하는 기준이에요. 연간 재산세가 20만원 이하면 7월에 한 번만 내고, 20만원 초과면 7월과 9월에 각각 절반씩 내요.</P>
      <P>공시가격 기준으로 대략 3~4억원 주택 정도에서 연간 재산세 20만원 선이 형성돼요. 하지만 지역별 과세표준, 공정시장가액비율, 세율 구간에 따라 달라지므로 고지서를 직접 확인하는 게 정확해요.</P>
      <H3>분납 제도 (250만원 초과)</H3>
      <P>재산세 본세가 250만원을 초과하면 납부 기한 후 45일 이내에 분납을 신청할 수 있어요. 초과분을 최대 3번까지 나눠낼 수 있어서 자금 부담을 줄일 수 있어요. 분납 신청은 위택스 또는 관할 시·군·구청 세무과에서 해요.</P>
      <P>분납은 이자가 없는 대신 기한 내에 반드시 납부해야 해요. 분납 신청 후에도 기한을 지키지 않으면 가산세 3%가 붙어요. 분납 일정을 달력에 메모해두는 게 좋아요.</P>
      <Info type="warn">{"주택 재산세 7월 납부 기간(7월 16~31일)을 지키지 않으면 지연 가산세 3%가 즉시 부과돼요. 자동이체 설정을 해두면 잊어버릴 걱정이 없어요."}</Info>

      <RelatedMid
        title="세금 관련 글도 확인해 보세요"
        items={[
          { icon: "💰", title: "프리랜서 3.3% 환급", desc: "3.3% 원천징수 세금 돌려받는 방법", href: "/w/프리랜서-3.3-원천징수-환급" },
          { icon: "⚠️", title: "종합소득세 가산세", desc: "신고 안 하면 최대 40% 가산세", href: "/w/종합소득세-신고-안하면-가산세" },
          { icon: "🏪", title: "간이과세자 기준 2026", desc: "연 매출 8천만원 간이과세 기준", href: "/w/부가가치세-간이과세자-기준-2026" },
        ]}
        hubHref="/category/세금"
        hubLabel="세금 글 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s04" title="재산세 주택 토지 계산 방법은 어떻게 되나요?" sub="공시가격 세율 · 계산 예시" />
      <P>재산세 = 공시가격 × 공정시장가액비율 × 세율로 계산해요. 공시가격은 국토교통부 부동산공시가격 알리미에서 조회할 수 있어요. 공정시장가액비율은 2026년 기준 주택의 경우 43~45% 수준이에요.</P>
      <P>주택 세율은 과세표준(공시가격×비율)에 따라 달라요. 재산세 외에 지방교육세(재산세의 20%), 도시지역분 등도 붙어서 실제 납부액은 재산세보다 더 많아요.</P>

      <H3>주택 재산세 세율 구조</H3>
      <TableTitle>주택 재산세 세율 구조</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>과세표준 (공시가격×비율)</THL><THL>세율</THL><THL>누진 공제</THL></tr>
          </thead>
          <tbody>
            {[
              ["6,000만원 이하", "0.1%", "—"],
              ["6,000만원 초과 ~ 1억5,000만원 이하", "0.15%", "3만원"],
              ["1억5,000만원 초과 ~ 3억원 이하", "0.25%", "18만원"],
              ["3억원 초과", "0.4%", "63만원"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 10px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>출처: 지방세법 제111조 / 실제 납부액은 지방교육세(재산세의 20%) 별도 부과</TableNote>

      <H3>계산 예시 (공시가격 4억원 아파트)</H3>
      <P>공시가격 4억원 아파트의 경우 공정시장가액비율 43% 적용 시 과세표준은 1억 7,200만원이에요. 세율 구간에 따라 계산하면 재산세 약 25만원, 지방교육세 5만원으로 연간 약 30만원이에요. 7월과 9월에 각각 15만원씩 납부해요.</P>
      <P>공시가격 조회는 부동산공시가격 알리미(realtyprice.kr)에서 직접 확인할 수 있어요. 아파트 단지명과 동·호수를 입력하면 해당 연도 공시가격을 조회할 수 있어요.</P>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s05" title="재산세 감면 조건은 어떻게 되나요?" sub="1주택 감면 · 세액 공제" />
      <P>1세대 1주택이고 공시가격이 9억원 이하인 경우, 주택 재산세에서 5% 세액공제 혜택이 적용돼요. 별도 신청 없이 자동으로 적용되니 고지서에서 확인하면 돼요.</P>
      <P>1세대 1주택 판단은 주민등록상 같은 세대가 1채만 소유한 경우예요. 배우자와 미성년 자녀는 동일 세대로 보므로, 가족 중 누군가 다른 주택을 소유하고 있다면 1주택 혜택을 받기 어려워요.</P>
      <H3>고령자·장기보유 납부 유예</H3>
      <P>만 60세 이상이면서 주택을 5년 이상 보유한 경우 재산세 납부 유예 제도를 이용할 수 있어요. 재산세를 유예하고 주택 처분 시 정산해요. 소득이 없는 고령자에게 현금 부담을 줄여주는 제도예요.</P>
      <P>임대사업자로 등록한 경우 임대주택의 재산세가 감면될 수 있어요. 전용면적 40㎡ 이하는 100%, 40~60㎡는 75%, 60~85㎡는 50% 감면해요. 지방세 감면 조례에 따라 지역별로 다를 수 있어요.</P>
      <Info type="tip">{"재산세 납부 유예나 임대사업자 감면은 관할 시·군·구청 세무과에 문의하면 해당 여부를 확인할 수 있어요. 자동 적용 안 되는 항목도 있으니 사전에 확인하세요."}</Info>

      <ExtBtn
        badge="행안부 공식"
        text="위택스 재산세 납부"
        cta="납부하러 가기 →"
        href="https://www.wetax.go.kr"
      />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "프리랜서 3.3% 원천징수 환급 방법 | 종합소득세 신고 필요경비 공제", desc: "3.3% 원천징수 환급받는 신고 방법이에요", href: "/w/프리랜서-3.3-원천징수-환급" },
        { title: "종합소득세 신고 안 하면 가산세 | 무신고 납부불성실 세율 계산", desc: "신고 안 하면 최대 40% 가산세가 붙어요", href: "/w/종합소득세-신고-안하면-가산세" },
        { title: "간이과세자 기준 매출 2026 | 일반과세 전환 부가세 신고 방법", desc: "매출 8천만원 기준 간이·일반과세 차이예요", href: "/w/부가가치세-간이과세자-기준-2026" },
        { title: "건강보험 지역가입자 보험료 계산 | 재산 소득 점수 부과 방식", desc: "소득·재산·자동차를 점수로 환산하는 방법이에요", href: "/w/건강보험-지역가입자-보험료-계산" },
        { title: "국민연금 조기노령연금 신청 조건 | 만 60세 수령 감액 손익분기점", desc: "조기 수령 감액 비율과 손익분기점이에요", href: "/w/국민연금-조기수령-신청-조건" },
      ]} />

      <PrevNext
        prev={{ title: "종합소득세 신고 안 하면 가산세 | 무신고 납부불성실 세율 계산", href: "/w/종합소득세-신고-안하면-가산세" }}
        next={{ title: "프리랜서 3.3% 원천징수 환급 방법 | 종합소득세 신고 필요경비 공제", href: "/w/프리랜서-3.3-원천징수-환급" }}
      />
    </BlogLayout>
  );
}
