"use client";
import { useState } from "react";
import {
  C,
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "종합소득세 신고 안 하면 가산세 | 무신고 납부불성실 세율 계산",
  description: "종합소득세 신고를 안 하면 20% 가산세가 붙는다는 거 알고 계셨나요? 무신고·납부불성실 가산세율과 줄이는 방법을 알려드려요.",
  category: "세금",
  keywords: [
    "종합소득세 가산세 무신고 납부 과태료",
    "종합소득세 무신고 가산세율 20%",
    "종합소득세 납부불성실 가산세 계산",
    "종합소득세 가산세 기한후신고 경감",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "종합소득세 무신고 시 납부 세액의 <strong>20%</strong>가 무신고 가산세로 붙어요.",
    "납부를 늦게 하면 하루당 <strong>0.022%</strong>씩 납부불성실 가산세가 추가돼요.",
    "기한 후 신고를 빨리 할수록 가산세를 줄일 수 있어요. <strong>1개월 이내 50% 경감</strong>이에요.",
  ],
  sources: [
    { name: "국세기본법 제47조의2 무신고 가산세", url: "https://www.law.go.kr/법령/국세기본법", date: "2026-02" },
    { name: "국세청 종합소득세 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2227&cntntsId=7693", date: "2026-02" },
  ],
  faq: [
    { q: "종합소득세 신고 안 해도 되는 경우가 있나요?", a: "있어요. 근로소득만 있고 연말정산을 마친 경우, 비과세 소득만 있는 경우, 분리과세로 납세 의무가 종결된 경우 등은 신고 의무가 없어요. 다만 2,000만원 이하 금융소득이나 사업소득·부동산 임대소득이 있으면 신고 대상이에요." },
    { q: "종합소득세 가산세를 낼 돈이 없으면 어떻게 되나요?", a: "신고는 하되 납부를 나중에 하면 납부불성실 가산세만 추가돼요. 신고 자체를 안 하면 무신고 가산세(20%)까지 더해져 부담이 커요. 납부가 어렵다면 국세청에 분납이나 징수유예를 신청해보세요." },
  ],
  ctaCard: {
    label: "30초 계산",
    mainText: "내 가산세 금액 계산",
    subText: "신고 여부·미납 세액 선택",
    url: "https://www.hometax.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "프리랜서 3.3% 원천징수 환급", url: "/w/프리랜서-3.3-원천징수-환급" },
    { title: "간이과세자 기준 매출 2026", url: "/w/부가가치세-간이과세자-기준-2026" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { filed, days_late, fraud } = sel;
    if (!filed || !days_late || !fraud) return null;
    if (filed === "not_filed" && fraud === "yes") return "fraud_penalty";
    if (filed === "not_filed") return "no_filing_penalty";
    if (filed === "filed_no_pay") return "late_payment_only";
    return "small_penalty";
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 가산세 금액 확인" },
    { t: "종합소득세 신고 안 하면 가산세가 얼마나 되나요?", sub: "무신고 가산세 20% · 부정무신고 40%" },
    { t: "종합소득세 무신고 가산세율은 어떻게 되나요?", sub: "일반무신고 20% · 부정무신고 40% 기준" },
    { t: "종합소득세 납부불성실 가산세는 어떻게 계산하나요?", sub: "하루 0.022% · 미납일수 계산" },
    { t: "종합소득세 가산세 줄이는 방법이 있나요?", sub: "기한후신고 경감율 · 자진신고 방법" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "세금", "종합소득세"]}
      tags={["2026년 최신", "세금", "종합소득세", "가산세"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>종합소득세 신고를 안 하면 <strong>20% 무신고 가산세</strong>와 하루 0.022% 납부불성실 가산세가 붙어요. 기한 후 신고하면 50%까지 경감돼요.</>}
      sourceBar={{ badge: "법제처", name: "국세기본법 제47조의2", date: "2026.02" }}
      stickyLabel="무신고 가산세"
      stickyValue="납부 세액의 20%"
      stickyBtn="가산세 계산 ↑"
      disclaimer="이 글은 국세기본법과 국세청 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "📊", title: "종합소득세 신고 바로가기", sub: "홈택스에서 직접 신고", href: "https://www.hometax.go.kr", hot: true },
          { icon: "💼", title: "프리랜서 3.3% 환급", sub: "종합소득세 신고로 환급받기", href: "/w/프리랜서-3.3-원천징수-환급" },
          { icon: "🏪", title: "간이과세자 부가세 신고", sub: "2026년 8천만원 기준", href: "/w/부가가치세-간이과세자-기준-2026" },
        ]} />
        <SidebarDocs items={[
          { title: "프리랜서 3.3% 환급", cat: "세금·절세", href: "/w/프리랜서-3.3-원천징수-환급" },
          { title: "간이과세자 기준 2026", cat: "세금·절세", href: "/w/부가가치세-간이과세자-기준-2026" },
        ]} />
        <SidebarCalc items={[
          { title: "종합소득세 계산기", href: "https://www.hometax.go.kr" },
          { title: "실업급여 계산기", href: "/w/실업급여-상한액" },
        ]} />
      </>}
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="checker" title="가산세 금액 확인" sub="신고 여부 · 납부 지연 일수 선택" />
      <P>종합소득세 가산세는 신고를 안 했는지, 납부를 늦었는지에 따라 달라요. 아래에서 내 상황을 선택하면 가산세 종류와 대략적인 금액을 확인할 수 있어요.</P>

      <CheckerShell title="내 종합소득세 가산세는 얼마나 될까요?" sub="30초 확인">
        <CheckerQ n="1" label="종합소득세 신고를 하셨나요?" group="filed" opts={[
          ["not_filed", "아직 신고 안 했어요 (기한 경과)"],
          ["filed_no_pay", "신고는 했는데 납부를 못 했어요"],
          ["filed_late", "기한 후 늦게 신고했어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="신고·납부 기한으로부터 얼마나 지났나요?" group="days_late" opts={[
          ["1month", "1개월 이내예요"],
          ["1to3", "1~3개월 사이예요"],
          ["over3", "3개월 이상 됐어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="3" label="소득을 의도적으로 숨기거나 장부를 조작했나요?" group="fraud" opts={[
          ["no", "아니요, 몰라서 안 했어요"],
          ["yes", "의도적으로 누락했어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="4" label="미납 세금이 얼마나 되나요?" group="amount" opts={[
          ["small", "100만원 미만이에요"],
          ["mid", "100만원~500만원이에요"],
          ["large", "500만원 이상이에요"],
        ]} sel={sel} pick={pick} />

        {result === "fraud_penalty" && (
          <ResultFail title="부정무신고로 40% 가산세가 붙어요">
            <P>의도적으로 소득을 숨기거나 장부를 조작하면 부정무신고 가산세 40%가 붙어요. 일반무신고(20%)보다 두 배예요. 납부불성실 가산세도 별도 추가돼요. 세무사와 상담해서 빨리 자진신고 하는 게 좋아요.</P>
            <ResultCTA icon="📊" title="홈택스 기한후신고" desc="자진신고로 가산세 경감 가능" href="https://www.hometax.go.kr" />
          </ResultFail>
        )}
        {result === "no_filing_penalty" && (
          <ResultFail title="무신고 가산세 20%가 붙어요">
            <P>신고를 안 하면 납부해야 할 세금의 20%가 무신고 가산세로 추가돼요. 여기에 납부불성실 가산세(하루 0.022%)도 추가돼요. 빨리 기한후신고를 하면 경감받을 수 있어요. 1개월 이내면 50% 경감이에요.</P>
            <ResultCTA icon="📊" title="홈택스 기한후신고" desc="빨리 신고할수록 가산세 경감" href="https://www.hometax.go.kr" />
          </ResultFail>
        )}
        {result === "late_payment_only" && (
          <ResultPass title="납부불성실 가산세만 붙어요">
            <P>신고는 했는데 납부를 못 했다면 무신고 가산세는 없어요. 납부불성실 가산세(하루 0.022%)만 미납 기간만큼 추가돼요. 빨리 납부할수록 가산세 총액이 줄어요.</P>
            <ResultCTA icon="📊" title="홈택스 납부하기" desc="미납 세금 빨리 납부하기" href="https://www.hometax.go.kr" />
          </ResultPass>
        )}
        {result === "small_penalty" && (
          <ResultPass title="기한후신고로 경감받을 수 있어요">
            <P>늦게라도 기한후신고를 했다면 가산세 일부를 경감받을 수 있어요. 경감율은 신고 시기에 따라 다르고, 빠를수록 유리해요.</P>
            <ResultCTA icon="📊" title="가산세 경감율 확인" desc="기한후신고 경감율 기준 보기" href="#s5" />
          </ResultPass>
        )}
      </CheckerShell>

      <BridgeCard
        q="가산세 계산 방법이 궁금하시죠?"
        a="무신고 20%와 납부불성실 하루 0.022%를 따로 계산해서 합산해요."
        label="가산세 계산 방법 바로 보기"
        href="#s4"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="종합소득세 신고 안 하면 가산세가 얼마나 되나요?" sub="무신고 가산세 20% · 부정무신고 40%" />
      <P>종합소득세 신고 기한(매년 5월 31일)까지 신고하지 않으면 무신고 가산세가 붙어요. 가산세는 납부해야 할 세액을 기준으로 계산해요.</P>
      <P>일반 무신고 가산세는 납부 세액의 20%예요. 예를 들어 납부해야 할 종합소득세가 100만원이라면 가산세 20만원이 추가돼요. 여기에 납부불성실 가산세도 별도로 붙어요.</P>
      <P>의도적으로 소득을 숨기거나 장부를 조작한 경우(부정행위)는 부정무신고 가산세로 40%가 부과돼요. 일반 무신고의 두 배예요. <A href="https://www.law.go.kr/법령/국세기본법">국세기본법 제47조의2</A>에 근거해요.</P>
      <P>무신고 가산세와 납부불성실 가산세는 중복 부과돼요. 신고도 안 하고 납부도 안 했다면 두 가산세가 동시에 붙어요. 세금 자체가 0원이면 가산세도 0원이지만, 환급세액이 있어도 무신고 가산세는 붙어요.</P>

      <H3>무신고 가산세 20%</H3>
      <TableTitle>종합소득세 가산세 종류</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>가산세 종류</THL><TH>세율</TH><TH>적용 조건</TH></tr>
          </thead>
          <tbody>
            {[
              ["일반 무신고 가산세", "납부 세액의 20%", "기한 내 미신고"],
              ["부정 무신고 가산세", "납부 세액의 40%", "의도적 소득 누락·장부 조작"],
              ["납부불성실 가산세", "미납 세액 × 0.022% × 일수", "납부 지연 일수만큼 부과"],
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
      <Sec n="SECTION 03" id="s3" title="종합소득세 무신고 가산세율은 어떻게 되나요?" sub="일반무신고 20% · 부정무신고 40% 기준" />
      <P>무신고 가산세율은 납부 세액(세금으로 내야 할 금액)에 20%를 곱한 금액이에요. 수입금액이 아니라 납부 세액 기준이에요. 납부 세액이 0원이면 무신고 가산세도 0원이에요.</P>
      <P>단, 수입 금액의 0.07%와 비교해서 더 큰 금액으로 부과해요. 즉, 최소 수입금액의 0.07%는 가산세로 내야 해요. 납부 세액이 매우 적어도 수입이 많으면 최소 가산세가 적용돼요.</P>
      <P>부정무신고는 기준이 달라요. 납부 세액의 40% 또는 수입금액의 14% 중 큰 금액이에요. 의도적인 조작이 확인되면 세무 조사까지 이어질 수 있어요.</P>
      <P>무신고 가산세는 연 1회 부과돼요. 같은 세목에서 여러 기간의 가산세가 합산되는 게 아니라, 해당 연도 신고·납부 기한에 대한 가산세예요.</P>

      <H3>부정무신고 40% 기준</H3>
      <Info type="warn">{"종합소득세 신고 의무가 있는지 모르는 경우가 많아요. 프리랜서, 부업 소득자, 부동산 임대소득자는 신고 의무 여부를 홈택스나 세무사에서 먼저 확인하세요."}</Info>

      <RelatedMid
        title="세금 관련 글도 확인해 보세요"
        items={[
          { icon: "💼", title: "프리랜서 3.3% 환급", desc: "3.3% 원천징수 환급받는 방법", href: "/w/프리랜서-3.3-원천징수-환급" },
          { icon: "🏪", title: "간이과세자 기준 2026", desc: "8천만원 기준 일반과세 전환 조건", href: "/w/부가가치세-간이과세자-기준-2026" },
          { icon: "🏠", title: "재산세 납부 기간 2026", desc: "7월·9월 분납 주택 토지 계산", href: "/w/재산세-납부-기간-2026" },
        ]}
        hubHref="/category/세금"
        hubLabel="세금 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="종합소득세 납부불성실 가산세는 어떻게 계산하나요?" sub="하루 0.022% · 미납일수 계산" />
      <P>납부불성실 가산세는 납부해야 할 세금을 기한 내에 내지 않으면 하루에 0.022%씩 붙는 가산세예요. 매일 조금씩 쌓이기 때문에 오래 미납할수록 총 가산세가 커져요.</P>
      <P>계산 공식: 미납 세액 × 0.022% × 미납 일수예요. 예를 들어 100만원을 100일 동안 미납하면 납부불성실 가산세는 1,000,000 × 0.00022 × 100 = 22,000원이에요.</P>
      <P>연 환산하면 약 8%예요. 시중 대출 이자보다 높을 수 있어요. 세금을 일부러 늦게 내는 건 손해예요. 빨리 납부할수록 가산세가 줄어요.</P>
      <P>납부불성실 가산세의 최대 한도는 없어요. 미납 기간이 길어질수록 계속 쌓여요. 무신고 가산세와 함께 계산하면 전체 가산세 부담이 상당히 커질 수 있어요.</P>

      <H3>하루 0.022% 계산</H3>
      <InlineLink
        icon="📊"
        title="홈택스 세금 납부"
        desc="미납 세금과 가산세를 한 번에 확인하고 납부할 수 있어요"
        href="https://www.hometax.go.kr"
      />

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="종합소득세 가산세 줄이는 방법이 있나요?" sub="기한후신고 경감율 · 자진신고 방법" />
      <P>기한후신고를 하면 무신고 가산세를 일부 경감받을 수 있어요. 자진해서 빨리 신고할수록 경감 비율이 높아요. 경감된 금액만큼 실제 납부 가산세가 줄어요.</P>

      <TableTitle>기한후신고 무신고 가산세 경감율</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>기한후 신고 시기</THL><TH>경감율</TH><TH>예시 (원래 가산세 100만원)</TH></tr>
          </thead>
          <tbody>
            {[
              ["신고 기한 후 1개월 이내", "50% 경감", "→ 50만원만 납부"],
              ["1개월 초과~3개월 이내", "30% 경감", "→ 70만원 납부"],
              ["3개월 초과~6개월 이내", "20% 경감", "→ 80만원 납부"],
              ["6개월 초과~1년 이내", "10% 경감", "→ 90만원 납부"],
              ["1년 초과", "경감 없음", "→ 100만원 전액 납부"],
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
      <TableNote>납부불성실 가산세(0.022%/일)는 경감 대상이 아니에요. 빨리 납부해야 줄어요.</TableNote>

      <P>기한후신고는 홈택스(hometax.go.kr)에서 할 수 있어요. 종합소득세 → 신고/납부 → 기한후신고 메뉴에서 진행하면 돼요. 신고와 납부를 동시에 처리하는 게 가장 효율적이에요.</P>
      <P>세금 전액 납부가 어렵다면 분납 신청이나 징수유예 신청을 고려해볼 수 있어요. 세무서에 직접 방문하거나 국세청 홈페이지에서 신청할 수 있어요. 다만 가산세는 계속 쌓이므로 최대한 빨리 처리하는 것이 좋아요.</P>

      <H3>기한후신고 경감율</H3>
      <ExtBtn
        badge="국세청 홈택스"
        text="종합소득세 기한후신고"
        cta="신고하러 가기 →"
        href="https://www.hometax.go.kr"
      />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "프리랜서 3.3% 원천징수 환급 방법 | 종합소득세 신고 필요경비 공제", desc: "3.3% 세금 돌려받는 종합소득세 신고 방법이에요", href: "/w/프리랜서-3.3-원천징수-환급" },
        { title: "간이과세자 기준 매출 2026 | 일반과세 전환 부가세 신고 방법", desc: "2026년 간이과세자 8천만원 기준과 전환 조건이에요", href: "/w/부가가치세-간이과세자-기준-2026" },
        { title: "재산세 납부 기간 2026 | 7월 9월 분납 주택 토지 계산", desc: "2026년 재산세 납부 기간과 계산 방법이에요", href: "/w/재산세-납부-기간-2026" },
        { title: "국민연금 임의가입 전업주부 조건 | 월 보험료 수령액 손익분기점", desc: "전업주부 국민연금 임의가입 조건이에요", href: "/w/국민연금-임의가입-전업주부" },
        { title: "건강보험 피부양자 탈락 조건 2026 | 금융소득 초과 지역가입자 전환", desc: "소득·금융소득·재산 탈락 기준 3가지예요", href: "/w/건강보험-피부양자-탈락-조건-2026" },
      ]} />

      <PrevNext
        prev={{ title: "국민연금 조기노령연금 신청 조건 | 만 60세 수령 감액 손익분기점", href: "/w/국민연금-조기수령-신청-조건" }}
        next={{ title: "간이과세자 기준 매출 2026 | 일반과세 전환 부가세 신고 방법", href: "/w/부가가치세-간이과세자-기준-2026" }}
      />
    </BlogLayout>
  );
}
