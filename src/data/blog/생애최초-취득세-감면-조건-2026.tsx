"use client";
import { useState } from "react";
import {
  C,
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Steps,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "생애최초 주택 취득세 감면 조건 2026 | 1주택 200만원 면제 신청 방법",
  description: "생애 처음 집을 사면 취득세를 200만 원까지 면제받을 수 있다는 거 알고 계세요? 2026년 감면 조건과 신청 방법을 알려드려요.",
  category: "부동산",
  keywords: [
    "생애최초 취득세 감면 조건",
    "1주택 취득세 200만원 면제 혜택",
    "생애최초 취득세 신청 방법 구청",
    "생애최초 취득세 감면 불가 사례",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "생애최초 주택 구입 시 취득세를 <strong>200만원 한도</strong>로 전액 면제받을 수 있어요.",
    "세대 전원 무주택, 취득 후 3개월 이내 전입, <strong>3년 이상 거주</strong> 조건이 있어요.",
    "등기 전에 관할 지자체 세무과에 신청해야 감면받을 수 있어요.",
  ],
  sources: [
    { name: "지방세특례제한법 제36조의3 생애최초 주택 취득세", url: "https://www.law.go.kr/법령/지방세특례제한법", date: "2026-02" },
    { name: "행정안전부 생애최초 주택 취득세 감면 안내", url: "https://www.mois.go.kr/frt/bbs/type010/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000008&nttId=99199", date: "2026-02" },
  ],
  faq: [
    { q: "생애최초 취득세 감면을 신청하지 않아도 자동으로 되나요?", a: "아니에요. 자동으로 되지 않아요. 반드시 등기 전에 관할 시·군·구청 세무과에 감면 신청서를 제출해야 해요. 등기를 먼저 하면 취득세가 부과된 이후라 경정 청구로 돌려받아야 해요." },
    { q: "생애최초로 샀는데 3년 내에 팔면 어떻게 되나요?", a: "3년 이내에 전출·매각·증여 등이 발생하면 감면받은 취득세 전액을 추징해요. 이사를 자주 다녀야 하는 상황이라면 3년 거주 조건이 지켜지는지 반드시 확인해야 해요." },
  ],
  ctaCard: {
    label: "감면 확인",
    mainText: "취득세 200만원 면제 조건",
    subText: "무주택 + 전입 + 3년 거주",
    url: "https://www.wetax.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "상가 임대차보호법 환산보증금", url: "/w/상가-임대차보호법-환산보증금" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { housing, resident, plan } = sel;
    if (!housing || !resident || !plan) return null;
    if (housing === "no" && resident === "yes" && plan === "yes") return "eligible";
    if (housing === "yes") return "has_house";
    if (resident === "no") return "no_resident";
    if (plan === "no") return "no_plan";
    return "check_needed";
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 감면 가능 여부 확인" },
    { t: "생애최초 주택 취득세 감면 조건은 무엇인가요?", sub: "무주택 세대 · 전입 · 3년 거주" },
    { t: "생애최초 취득세 감면 금액은 얼마인가요?", sub: "200만원 한도 · 1.1% 세율 계산" },
    { t: "생애최초 취득세 감면 신청 방법은 어떻게 되나요?", sub: "신청 서류 · 등기 전 제출 필수" },
    { t: "생애최초 취득세 감면 불가 사례는 무엇인가요?", sub: "추징 조건 · 주의사항" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "부동산", "취득세"]}
      tags={["2026년 최신", "부동산", "취득세", "생애최초"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>생애 처음 집을 살 때 취득세를 <strong>200만원 한도</strong>로 면제받을 수 있어요. 세대 전원 무주택 + 전입 + 3년 거주 조건을 충족하면 돼요.</>}
      sourceBar={{ badge: "법제처", name: "지방세특례제한법 제36조의3", date: "2026.02" }}
      stickyLabel="취득세 감면 한도"
      stickyValue="최대 200만원"
      stickyBtn="감면 조건 확인 ↑"
      disclaimer="이 글은 지방세특례제한법과 행정안전부 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "🏠", title: "생애최초 취득세 신청", sub: "위택스에서 온라인 신청", href: "https://www.wetax.go.kr", hot: true },
          { icon: "📋", title: "상가 임대차 환산보증금", sub: "보호법 적용 기준 확인", href: "/w/상가-임대차보호법-환산보증금" },
          { icon: "💰", title: "노란우산공제 절세 혜택", sub: "소상공인 소득공제 연 500만원", href: "/w/소상공인-노란우산공제-가입" },
        ]} />
        <SidebarDocs items={[
          { title: "상가 임대차보호법 환산보증금", cat: "부동산·임대차", href: "/w/상가-임대차보호법-환산보증금" },
        ]} />
        <SidebarCalc items={[
          { title: "취득세 계산기", href: "https://www.wetax.go.kr" },
          { title: "양도소득세 계산기", href: "/w/양도소득세-계산기" },
        ]} />
      </>}
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="checker" title="감면 가능 여부 확인" sub="무주택 · 전입 · 거주 계획 선택" />
      <P>생애최초 취득세 감면은 아무나 받는 게 아니에요. 세대 전원 무주택 여부, 실거주 계획, 가격 조건 등을 확인해야 해요. 아래에서 내 상황을 선택하면 감면 가능 여부를 알 수 있어요.</P>

      <CheckerShell title="생애최초 취득세 감면을 받을 수 있을까요?" sub="30초 확인">
        <CheckerQ n="1" label="세대 전원이 무주택인가요? (배우자·자녀 포함)" group="housing" opts={[
          ["yes", "현재 주택이 있어요"],
          ["no", "세대 전원 무주택이에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="취득 후 3개월 이내 전입신고할 수 있나요?" group="resident" opts={[
          ["yes", "네, 전입 가능해요"],
          ["no", "사정상 어렵거나 미정이에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="3" label="3년 이상 해당 주택에 거주할 계획인가요?" group="plan" opts={[
          ["yes", "3년 이상 거주할 거예요"],
          ["no", "단기 거주 후 이사할 것 같아요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="4" label="이번이 생애 처음 주택 구입인가요?" group="first" opts={[
          ["yes", "처음이에요"],
          ["no", "이전에 주택을 소유한 적 있어요"],
        ]} sel={sel} pick={pick} />

        {result === "eligible" && (
          <ResultPass title="취득세 200만원 감면 대상이에요">
            <P>세대 전원 무주택, 전입 가능, 3년 거주 계획 모두 충족했어요. 주택 구입 후 등기 전에 관할 구청 세무과에 감면 신청서를 제출하면 200만원 한도로 취득세를 면제받을 수 있어요.</P>
            <ResultCTA icon="🏠" title="위택스 취득세 신고·신청" desc="등기 전 온라인으로 신청 가능해요" href="https://www.wetax.go.kr" />
          </ResultPass>
        )}
        {result === "has_house" && (
          <ResultFail title="현재 주택 보유 중이면 감면 대상이 아니에요">
            <P>생애최초 취득세 감면은 세대 전원 무주택 상태에서만 받을 수 있어요. 기존 주택을 먼저 처분하거나, 무주택 상태가 된 후에 취득해야 해요.</P>
            <ResultCTA icon="📋" title="취득세 일반 세율 확인" desc="보유 주택 수에 따른 취득세율 정리" href="https://www.wetax.go.kr" />
          </ResultFail>
        )}
        {result === "no_resident" && (
          <ResultFail title="전입 계획이 없으면 나중에 추징될 수 있어요">
            <P>감면 후 3개월 이내에 전입신고를 하지 않으면 감면받은 취득세를 추징해요. 전입이 어려운 사정이 있다면 감면 신청 전에 세무사에게 상담해보세요.</P>
            <ResultCTA icon="📋" title="취득세 감면 추징 조건" desc="전입·거주 요건 자세히 보기" href="#s5" />
          </ResultFail>
        )}
        {result === "no_plan" && (
          <ResultFail title="3년 내 이사 계획이 있다면 추징 위험이 있어요">
            <P>감면 후 3년 이내 전출·매각·증여가 발생하면 취득세 전액을 추징해요. 주거 계획을 먼저 확인하고 감면 신청 여부를 결정하세요.</P>
            <ResultCTA icon="📋" title="추징 조건 자세히 보기" desc="3년 거주 요건과 예외 사항 확인" href="#s5" />
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="취득세 감면을 신청하는 방법이 궁금하시죠?"
        a="등기 전에 관할 구청 세무과에 감면 신청서를 제출해야 해요."
        label="신청 방법 바로 보기"
        href="#s4"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="생애최초 주택 취득세 감면 조건은 무엇인가요?" sub="무주택 세대 · 전입 · 3년 거주" />
      <P>생애최초 취득세 감면은 <A href="https://www.law.go.kr/법령/지방세특례제한법">지방세특례제한법 제36조의3</A>에 따라 생애 처음 주택을 구입하는 경우 취득세를 200만원 한도로 면제해주는 제도예요. 2022년 6월 21일부터 주택 가격 제한 없이 모든 가격의 주택에 적용돼요.</P>
      <P>감면 조건은 크게 세 가지예요. 첫째, 취득일 현재 세대 전원이 무주택이어야 해요. 배우자와 미성년 자녀를 포함한 세대 전원이 해당돼요. 과거에 주택을 소유한 적이 있더라도 취득일 기준으로 무주택이면 대상이에요.</P>
      <P>둘째, 취득한 주택에 3개월 이내에 전입신고를 해야 해요. 주거용으로 실제 사용하는 조건이에요. 전세를 끼고 매입하거나 임대 목적으로 구입하는 경우는 이 조건을 충족하기 어려워요.</P>
      <P>셋째, 3년 이상 계속 거주해야 해요. 3년 이내에 전출하거나 매각·증여하면 감면받은 취득세를 전액 추징해요. 불가피한 사정으로 이사가 예정되어 있다면 감면 신청 전에 세무사 상담을 받는 게 좋아요.</P>

      <H3>무주택 세대 판단 기준</H3>
      <TableTitle>생애최초 취득세 감면 조건 3가지</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>조건</THL><TH>세부 내용</TH><TH>주의사항</TH></tr>
          </thead>
          <tbody>
            {[
              ["세대 전원 무주택", "배우자·미성년 자녀 포함 전원 무주택", "취득일 기준, 과거 소유는 무관"],
              ["3개월 이내 전입", "취득일로부터 3개월 이내 전입신고", "임대·전세 목적이면 충족 어려움"],
              ["3년 이상 거주", "전입 후 3년 계속 거주 필요", "3년 내 이사·매각 시 추징"],
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

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="생애최초 취득세 감면 금액은 얼마인가요?" sub="200만원 한도 · 1.1% 세율 계산" />
      <P>취득세 감면 금액은 최대 200만원이에요. 실제 산출된 취득세가 200만원을 초과하면 200만원만 감면하고 나머지는 납부해야 해요. 200만원 이하라면 취득세 전액이 면제돼요.</P>
      <P>예를 들어 4억원짜리 주택을 처음 사는 경우, 일반 취득세율 1.1%(85㎡ 이하 기준)를 적용하면 취득세는 440만원이에요. 여기서 200만원이 감면되니까 240만원만 내면 돼요.</P>
      <P>3억원짜리 주택이라면 취득세는 330만원인데 200만원 감면 후 130만원만 납부해요. 1억 8천만원 이하 주택이라면 취득세(198만원)가 200만원 이하라 전액 면제될 수 있어요.</P>
      <P>취득세 외에 농어촌특별세와 지방교육세는 별도예요. 농어촌특별세는 비과세, 지방교육세는 취득세의 10%로 계산되는데 감면이 따로 적용돼요. 실제 납부 금액은 위택스에서 정확히 계산해보는 게 좋아요.</P>

      <H3>취득세 감면 계산 예시</H3>
      <TableTitle>주택 가격별 취득세 감면 계산</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>주택 가격</THL><TH>취득세 (1.1%)</TH><TH>감면액</TH><TH>실납부액</TH></tr>
          </thead>
          <tbody>
            {[
              ["1억 5천만원", "165만원", "165만원 (전액)", "0원"],
              ["2억원", "220만원", "200만원", "20만원"],
              ["3억원", "330만원", "200만원", "130만원"],
              ["5억원", "550만원", "200만원", "350만원"],
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
      <TableNote>취득세율 1.1%는 6억원 이하 85㎡ 이하 기준이에요. 가격·면적에 따라 달라져요.</TableNote>

      <RelatedMid
        title="부동산 관련 글도 확인해 보세요"
        items={[
          { icon: "🏪", title: "상가 임대차 환산보증금", desc: "보호법 적용 기준과 임대료 인상 한도", href: "/w/상가-임대차보호법-환산보증금" },
          { icon: "🏠", title: "기초생활수급자 주거급여 2026", desc: "임차가구 지원 금액과 신청 방법", href: "/w/기초생활수급자-주거급여-2026" },
          { icon: "💰", title: "재산세 납부 기간 2026", desc: "7월·9월 분납 주택 토지 계산", href: "/w/재산세-납부-기간-2026" },
        ]}
        hubHref="/category/부동산"
        hubLabel="부동산 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="생애최초 취득세 감면 신청 방법은 어떻게 되나요?" sub="신청 서류 · 등기 전 제출 필수" />
      <P>가장 중요한 포인트는 등기 전에 신청해야 한다는 거예요. 소유권 이전 등기를 마친 이후에는 취득세가 자동으로 부과되어서, 이미 낸 세금을 경정 청구로 돌려받는 절차가 필요해요. 번거로우니 꼭 등기 전에 신청하세요.</P>
      <P>신청 장소는 주택 소재지 관할 시·군·구청 세무과예요. 온라인으로는 위택스(wetax.go.kr)에서 신청할 수 있어요. 온라인 신청이 더 빠르고 편리해요.</P>

      <H3>단계별 신청 절차</H3>
      <Steps items={[
        { title: "잔금 납부 및 주택 취득", desc: "매도인과 잔금을 주고받아요. 이 시점이 취득일이에요." },
        { title: "세무과 감면 신청서 제출", desc: "취득일로부터 60일 이내(등기 전)에 시·군·구청 세무과에 신청서를 제출해요. 위택스 온라인 신청도 가능해요." },
        { title: "취득세 감면 후 납부", desc: "감면된 금액을 확인하고 차액(남은 취득세)을 납부해요. 200만원 이하라면 납부 없이 면제돼요." },
        { title: "소유권 이전 등기", desc: "취득세 납부(또는 면제) 확인 후 법원에 소유권 이전 등기를 신청해요." },
        { title: "전입신고 (3개월 이내)", desc: "취득일로부터 3개월 이내에 전입신고를 완료해야 감면이 유지돼요." },
      ]} />

      <TableTitle>신청 시 필요한 서류</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>서류</THL><TH>용도</TH><TH>발급처</TH></tr>
          </thead>
          <tbody>
            {[
              ["생애최초 주택 취득 감면 신청서", "감면 신청 주요 서류", "세무과 또는 위택스 출력"],
              ["주민등록등본", "세대 전원 무주택 확인", "주민센터·정부24"],
              ["매매계약서 사본", "취득 금액·주택 확인", "본인 소지"],
              ["가족관계증명서", "배우자·자녀 무주택 확인", "주민센터·정부24"],
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

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="생애최초 취득세 감면 불가 사례는 무엇인가요?" sub="추징 조건 · 주의사항" />
      <P>감면을 받았더라도 사후 조건을 지키지 않으면 추징돼요. 감면 후 3년 이내에 전출·매각·증여 등이 발생하면 감면받은 취득세 전액을 납부해야 해요. 추징세 외에 가산세도 붙을 수 있어요.</P>
      <P>3개월 이내 전입신고를 하지 않은 경우도 추징 대상이에요. 전세를 끼고 매입했다면 전세 계약 만료 전에는 전입이 어렵기 때문에 조건을 충족하기 어려울 수 있어요. 이런 경우 감면 신청 전에 반드시 검토가 필요해요.</P>
      <P>세대 전원 무주택 조건은 취득일 기준이에요. 부부가 각자 주택을 사거나 배우자가 다른 주택을 보유 중이라면 감면 대상이 아니에요. 배우자가 분양권·조합원입주권을 가진 경우도 주택으로 보는 경우가 있어요.</P>
      <P>주거 외 목적으로 사용하거나 불법 개조·용도 변경 등이 발생해도 추징될 수 있어요. 상업용으로 리모델링하거나 임대사업자로 등록하는 경우는 감면 조건을 충족하지 않는 것으로 볼 수 있어요.</P>

      <H3>감면 후 추징 되는 경우</H3>
      <Info type="warn">{"감면 후 3년 내에 이사·매각·증여 시 취득세 전액이 추징돼요. 가산세까지 붙으면 감면 혜택보다 더 낼 수도 있어요."}</Info>

      <ExtBtn
        badge="위택스 공식"
        text="취득세 생애최초 감면 신청"
        cta="신청하러 가기 →"
        href="https://www.wetax.go.kr"
      />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "상가 임대차보호법 환산보증금 계산 | 계약갱신 요구권 임대료 인상 한도", desc: "상가 세입자 보호법 적용 기준이에요", href: "/w/상가-임대차보호법-환산보증금" },
        { title: "기초생활수급자 주거급여 2026 | 임차가구 수선비 지원 금액 신청 방법", desc: "주거급여 지원 금액과 신청 방법이에요", href: "/w/기초생활수급자-주거급여-2026" },
        { title: "재산세 납부 기간 2026 | 7월 9월 분납 조건 주택 토지 계산 방법", desc: "재산세 납부 기간과 분납 조건이에요", href: "/w/재산세-납부-기간-2026" },
        { title: "종합소득세 신고 안 하면 가산세 | 무신고 납부불성실 세율 계산", desc: "종합소득세 가산세 종류와 계산 방법이에요", href: "/w/종합소득세-신고-안하면-가산세" },
        { title: "소상공인 노란우산공제 가입 조건 | 연간 소득공제 금액 절세 혜택", desc: "소상공인 소득공제 제도예요", href: "/w/소상공인-노란우산공제-가입" },
      ]} />

      <PrevNext
        prev={{ title: "상가 임대차보호법 환산보증금 계산 | 계약갱신 요구권 임대료 인상 한도", href: "/w/상가-임대차보호법-환산보증금" }}
        next={{ title: "소상공인 노란우산공제 가입 조건 | 연간 소득공제 금액 절세 혜택", href: "/w/소상공인-노란우산공제-가입" }}
      />
    </BlogLayout>
  );
}
