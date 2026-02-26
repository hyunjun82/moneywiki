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
  title: "국민연금 임의가입 전업주부 조건 | 월 보험료 수령액 손익분기점",
  description: "소득 없는 전업주부도 국민연금에 가입할 수 있다는 거 아시나요? 임의가입 조건과 최소 보험료, 손익분기점을 알려드려요.",
  category: "국민연금",
  keywords: [
    "국민연금 임의가입 전업주부 자격",
    "전업주부 국민연금 임의가입 최소 보험료",
    "국민연금 임의가입 예상 수령액 계산",
    "국민연금 임의가입 손익분기점 나이",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "전업주부, 학생, 무직자도 국민연금에 <strong>임의가입</strong>이 가능해요.",
    "최소 보험료는 기준소득월액 최솟값의 9%로, <strong>월 약 10만원 초반대</strong>예요.",
    "납부 기간이 길수록 유리하고, 일반적으로 <strong>만 80세</strong> 전후에 손익분기점에 도달해요.",
  ],
  sources: [
    { name: "국민연금법 제10조 임의가입", url: "https://www.law.go.kr/법령/국민연금법", date: "2026-02" },
    { name: "국민연금공단 임의가입 안내", url: "https://www.nps.or.kr/jsppage/business/join/join_02.jsp", date: "2026-02" },
  ],
  faq: [
    { q: "국민연금 임의가입 중 직장에 취업하면 어떻게 되나요?", a: "취업해서 직장가입자가 되면 임의가입 자격이 자동으로 상실돼요. 직장에서 국민연금에 자동 가입되기 때문에 별도 탈퇴 신청을 할 필요가 없어요. 납부한 기간은 통산되어 나중에 수령액 계산에 포함돼요." },
    { q: "국민연금 임의가입 탈퇴는 언제든지 할 수 있나요?", a: "언제든지 탈퇴 신청이 가능해요. 다만 탈퇴 후 다시 가입하려면 60세 미만이어야 해요. 납부한 보험료는 돌려받을 수 없지만 가입 기간으로 인정돼서 나중에 연금 수령에 포함돼요." },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "임의가입 대상 여부 확인",
    subText: "현재 직업 상태 선택",
    url: "https://www.nps.or.kr/jsppage/business/join/join_02.jsp",
    external: true,
  },
  relatedDocs: [
    { title: "국민연금 조기수령 신청 조건", url: "/w/국민연금-조기수령-신청-조건" },
    { title: "건강보험 피부양자 탈락 조건", url: "/w/건강보험-피부양자-탈락-조건-2026" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { status, age, history } = sel;
    if (!status || !age || !history) return null;
    if (status === "employed" || status === "self") return "already_insured";
    if (age === "over60") return "age_limit";
    if (history === "10years") return "may_receive_now";
    return "eligible";
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 국민연금 임의가입 대상 여부 확인" },
    { t: "국민연금 임의가입 자격은 어떻게 되나요?", sub: "임의가입 대상 · 가입 연령 범위" },
    { t: "전업주부 국민연금 임의가입 방법은 어떻게 되나요?", sub: "신청 방법 · 보험료 납부" },
    { t: "국민연금 임의가입 최소 보험료는 얼마인가요?", sub: "기준소득월액 최솟값 · 월 보험료" },
    { t: "국민연금 임의가입 수령액은 얼마나 되나요?", sub: "예상 수령액 계산 · 손익분기점" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "국민연금", "임의가입"]}
      tags={["2026년 최신", "국민연금", "전업주부", "임의가입"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>소득 없는 전업주부도 <strong>임의가입</strong>으로 국민연금에 가입할 수 있어요. 최소 보험료와 예상 수령액, 손익분기점을 알려드려요.</>}
      sourceBar={{ badge: "법제처", name: "국민연금법 제10조", date: "2026.02" }}
      stickyLabel="최소 보험료"
      stickyValue="월 약 10만원 초반"
      stickyBtn="임의가입 대상 확인 ↑"
      disclaimer="이 글은 국민연금법과 국민연금공단 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "💰", title: "국민연금 임의가입 신청", sub: "국민연금공단 안내", href: "https://www.nps.or.kr/jsppage/business/join/join_02.jsp", hot: true },
          { icon: "📊", title: "국민연금 조기수령 조건", sub: "만 60세 조기수령 감액 기준", href: "/w/국민연금-조기수령-신청-조건" },
          { icon: "🏥", title: "건강보험 피부양자 탈락", sub: "2026년 소득·재산 기준", href: "/w/건강보험-피부양자-탈락-조건-2026" },
        ]} />
        <SidebarDocs items={[
          { title: "국민연금 조기수령 조건", cat: "국민연금·노후", href: "/w/국민연금-조기수령-신청-조건" },
          { title: "건강보험 피부양자 탈락", cat: "건강보험·의료", href: "/w/건강보험-피부양자-탈락-조건-2026" },
        ]} />
        <SidebarCalc items={[
          { title: "국민연금 예상 수령액 계산기", href: "https://www.nps.or.kr" },
          { title: "건강보험 지역가입자 계산기", href: "/w/건강보험-지역가입자-보험료-계산" },
        ]} />
      </>}
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="checker" title="국민연금 임의가입 대상 여부 확인" sub="현재 직업 상태 · 나이 · 가입 이력 선택" />
      <P>국민연금 임의가입은 직장인, 자영업자가 아닌 분들이 자발적으로 국민연금에 가입할 수 있는 제도예요. 아래에서 내 상황을 선택하면 가입 가능 여부를 확인할 수 있어요.</P>

      <CheckerShell title="내가 국민연금 임의가입 대상인가요?" sub="30초 확인">
        <CheckerQ n="1" label="현재 직업 상태가 어떻게 되나요?" group="status" opts={[
          ["housewife", "전업주부예요"],
          ["student", "학생이에요"],
          ["unemployed", "무직(구직 중)이에요"],
          ["employed", "직장에 다니고 있어요"],
          ["self", "자영업·프리랜서예요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="현재 나이가 어떻게 되나요?" group="age" opts={[
          ["under60", "만 60세 미만이에요"],
          ["over60", "만 60세 이상이에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="3" label="이전 국민연금 납부 이력이 있나요?" group="history" opts={[
          ["none", "없어요 (처음 가입)"],
          ["some", "있어요 (일부 납부)"],
          ["10years", "10년 이상 납부했어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="4" label="배우자가 국민연금 직장가입자인가요?" group="spouse" opts={[
          ["yes", "네, 직장가입자예요"],
          ["no", "아니요, 없거나 직장가입자가 아니에요"],
        ]} sel={sel} pick={pick} />

        {result === "already_insured" && (
          <ResultPass title="이미 국민연금 가입 대상이에요">
            <P>직장인이나 자영업자는 의무가입 대상이에요. 임의가입이 아닌 직장가입 또는 지역가입으로 이미 국민연금이 납부되고 있어요.</P>
          </ResultPass>
        )}
        {result === "age_limit" && (
          <ResultFail title="만 60세 이상은 임의가입이 안 돼요">
            <P>국민연금 임의가입은 만 18세 이상 만 60세 미만만 가능해요. 60세가 넘었다면 임의계속가입(만 65세까지)을 검토해볼 수 있어요. 다만 임의계속가입은 기존 가입 이력이 있어야 해요.</P>
          </ResultFail>
        )}
        {result === "may_receive_now" && (
          <ResultPass title="이미 연금 수령 가능 요건을 충족해요">
            <P>10년 이상 납부했다면 만 63세(1969년 이후 출생자 기준)부터 노령연금을 받을 수 있어요. 임의가입을 더 하면 수령액이 늘어나요. 현재 예상 수령액을 국민연금공단에서 확인해보세요.</P>
            <ResultCTA icon="📊" title="국민연금 예상 수령액 확인" desc="내 기여 기간 기준 수령액 조회" href="https://www.nps.or.kr" />
          </ResultPass>
        )}
        {result === "eligible" && (
          <ResultPass title="국민연금 임의가입이 가능해요">
            <P>전업주부, 학생, 무직자로 만 60세 미만이라면 임의가입이 가능해요. 월 최소 보험료는 기준소득월액 최솟값의 9%예요. 가입 기간이 길수록 노후에 받는 금액이 늘어나요.</P>
            <ResultCTA icon="💰" title="국민연금 임의가입 신청" desc="국민연금공단 홈페이지에서 신청" href="https://www.nps.or.kr/jsppage/business/join/join_02.jsp" />
          </ResultPass>
        )}
      </CheckerShell>

      <BridgeCard
        q="임의가입 보험료가 얼마인지 궁금하시죠?"
        a="기준소득월액 최솟값의 9%예요. 2026년 기준은 국민연금공단에서 확인해보세요."
        label="보험료 기준 바로 보기"
        href="#s4"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="국민연금 임의가입 자격은 어떻게 되나요?" sub="임의가입 대상 · 가입 연령 범위" />
      <P>국민연금 임의가입은 의무가입 대상이 아닌 사람이 자발적으로 국민연금에 가입하는 제도예요. <A href="https://www.law.go.kr/법령/국민연금법">국민연금법 제10조</A>에 근거해요.</P>
      <P>가입 대상은 국내에 거주하는 만 18세 이상 만 60세 미만으로 의무가입 대상이 아닌 사람이에요. 전업주부, 학생, 무직자, 아르바이트생(5인 미만 사업장 일부)이 해당돼요.</P>
      <P>의무가입 대상인 직장인, 자영업자, 농어업인은 이미 국민연금에 가입되어 있어요. 이분들은 임의가입이 아니라 기존 가입 유형이 유지돼요.</P>
      <P>만 60세 이상이라면 임의계속가입 제도를 이용할 수 있어요. 만 65세까지 납부 기간을 늘려서 수령액을 높일 수 있어요. 단, 이미 국민연금 가입 이력이 있어야 해요.</P>

      <H3>임의가입 대상</H3>
      <TableTitle>국민연금 가입 유형 비교</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>가입 유형</THL><TH>대상</TH><TH>보험료 부담</TH></tr>
          </thead>
          <tbody>
            {[
              ["직장가입 (의무)", "직장인 (1인 이상 사업장)", "본인 50% + 회사 50%"],
              ["지역가입 (의무)", "자영업자·농어업인 등", "본인 100%"],
              ["임의가입 (자발적)", "전업주부·학생·무직자", "본인 100% (금액 선택)"],
              ["임의계속가입", "60세 이상 기가입자", "본인 100%"],
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
      <Sec n="SECTION 03" id="s3" title="전업주부 국민연금 임의가입 방법은 어떻게 되나요?" sub="신청 방법 · 보험료 납부" />
      <P>신청은 국민연금공단 홈페이지, 모바일 앱, 방문, 전화(1355)로 할 수 있어요. 간단하게 본인 확인 후 원하는 기준소득월액과 납부 방법을 선택하면 돼요.</P>
      <P>신청 시 기준소득월액을 선택해야 해요. 기준소득월액 최솟값부터 최댓값 사이에서 자유롭게 선택할 수 있어요. 기준소득월액이 높을수록 보험료도 높고, 나중에 받는 연금도 많아요.</P>
      <P>보험료 납부는 자동이체나 지로(납부서)로 매월 납부해요. 한 번 선택한 기준소득월액은 나중에 변경 신청을 통해 바꿀 수 있어요. 보험료 납부가 어려우면 납부 예외(휴직)를 신청할 수 있어요.</P>
      <P>납부 예외 기간은 나중에 반납할 수 있어요. 추후 납부(추납)를 통해 납부 예외 기간의 보험료를 나중에 낼 수 있어요. 추납하면 해당 기간도 가입 기간으로 인정돼서 연금 수령액이 늘어나요.</P>

      <H3>신청 방법</H3>
      <InlineLink
        icon="📋"
        title="국민연금 임의가입 신청 바로가기"
        desc="국민연금공단 홈페이지에서 온라인으로 간편하게 신청할 수 있어요"
        href="https://www.nps.or.kr/jsppage/business/join/join_02.jsp"
      />

      <RelatedMid
        title="국민연금 관련 글도 확인해 보세요"
        items={[
          { icon: "📊", title: "국민연금 조기수령 조건", desc: "만 60세 조기수령 감액 손익분기점", href: "/w/국민연금-조기수령-신청-조건" },
          { icon: "💊", title: "건강보험 피부양자 탈락", desc: "임의가입하면 피부양자 자격에 영향 없어요", href: "/w/건강보험-피부양자-탈락-조건-2026" },
          { icon: "💰", title: "종합소득세 신고 가산세", desc: "소득이 생기면 종합소득세 신고해야 해요", href: "/w/종합소득세-신고-안하면-가산세" },
        ]}
        hubHref="/category/국민연금"
        hubLabel="국민연금 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="국민연금 임의가입 최소 보험료는 얼마인가요?" sub="기준소득월액 최솟값 · 월 보험료" />
      <P>임의가입 최소 보험료는 기준소득월액 최솟값의 9%예요. 기준소득월액 최솟값은 국민연금공단이 매년 7월에 조정해요. 2024년 기준 최솟값은 37만원으로, 최소 보험료는 약 33,300원이었어요.</P>
      <P>하지만 실제로는 더 많이 내는 것이 유리할 수 있어요. 기준소득월액을 높게 설정하면 나중에 받는 연금이 더 많아요. 많은 분들이 100만원~200만원 수준의 기준소득월액으로 임의가입을 해요.</P>
      <P>2026년 기준 최솟값은 매년 7월에 조정되므로 국민연금공단 홈페이지에서 정확한 금액을 확인해야 해요. 최댓값도 함께 확인해서 본인 상황에 맞는 금액을 선택하세요.</P>
      <P>직장가입자의 경우 회사가 절반을 부담하지만, 임의가입자는 전액 본인이 부담해요. 이 점을 고려해서 납부 가능한 금액을 선택하세요. 중간에 기준소득월액 변경 신청이 가능하니 처음부터 부담스러우면 최솟값으로 시작해도 돼요.</P>

      <H3>기준소득월액 최솟값</H3>
      <Info type="tip">{"임의가입 보험료는 전액 세금 공제 대상이에요. 연말정산이나 종합소득세 신고 시 납부한 국민연금 보험료를 소득공제로 처리할 수 있어요."}</Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="국민연금 임의가입 수령액은 얼마나 되나요?" sub="예상 수령액 계산 · 손익분기점" />
      <P>수령액은 가입 기간과 평균 기준소득월액에 따라 달라져요. 오래 납부할수록, 많이 납부할수록 나중에 더 많이 받아요. 국민연금공단 홈페이지에서 예상 수령액을 시뮬레이션해볼 수 있어요.</P>
      <P>예를 들어 월 10만원(기준소득월액 약 112만원)으로 10년 납부했을 때 만 63세부터 매달 약 15~20만원 수령할 수 있어요. 납부 기간이 늘어날수록 수령액도 올라가요.</P>
      <P>손익분기점은 총 납부액과 총 수령액이 같아지는 시점이에요. 일반적으로 만 78~82세 정도에 손익분기점에 도달해요. 장수할수록 임의가입의 이득이 커요. 국민연금은 물가 상승률이 반영되는 실질 연금이어서 장기적으로 유리해요.</P>
      <P>수급 시작 나이는 출생연도에 따라 달라요. 1969년 이후 출생자는 만 65세부터 정상 수령이에요. 조기 수령은 만 60세부터 가능하지만 매년 6%씩 감액돼요.</P>

      <H3>예상 수령액 계산</H3>
      <BridgeCard
        q="국민연금 조기 수령하면 얼마나 감액되는지 궁금하시죠?"
        a="1년 일찍 받으면 6%, 5년 일찍 받으면 최대 30% 감액돼요."
        label="조기수령 감액 기준 보기"
        href="/w/국민연금-조기수령-신청-조건"
      />

      <ExtBtn
        badge="국민연금공단"
        text="국민연금 예상 수령액 시뮬레이션"
        cta="계산해보기 →"
        href="https://www.nps.or.kr"
      />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "국민연금 조기노령연금 신청 조건 | 만 60세 수령 감액 손익분기점", desc: "국민연금 조기수령 조건과 감액 손익분기점을 알아보세요", href: "/w/국민연금-조기수령-신청-조건" },
        { title: "건강보험 피부양자 탈락 조건 2026 | 금융소득 초과 지역가입자 전환", desc: "소득·금융소득·재산 탈락 기준 3가지를 알아보세요", href: "/w/건강보험-피부양자-탈락-조건-2026" },
        { title: "건강보험 지역가입자 보험료 계산 | 재산 소득 점수 부과 방식", desc: "소득·재산·자동차를 점수로 환산하는 방법이에요", href: "/w/건강보험-지역가입자-보험료-계산" },
        { title: "종합소득세 신고 안 하면 가산세 | 무신고 납부불성실 세율 계산", desc: "종합소득세 신고 안 하면 붙는 가산세율이에요", href: "/w/종합소득세-신고-안하면-가산세" },
        { title: "프리랜서 3.3% 원천징수 환급 방법 | 종합소득세 신고 필요경비 공제", desc: "3.3% 세금 돌려받는 종합소득세 신고 방법이에요", href: "/w/프리랜서-3.3-원천징수-환급" },
      ]} />

      <PrevNext
        prev={{ title: "건강보험 지역가입자 보험료 계산 | 재산 소득 점수 부과 방식", href: "/w/건강보험-지역가입자-보험료-계산" }}
        next={{ title: "국민연금 조기노령연금 신청 조건 | 만 60세 수령 감액 손익분기점", href: "/w/국민연금-조기수령-신청-조건" }}
      />
    </BlogLayout>
  );
}
