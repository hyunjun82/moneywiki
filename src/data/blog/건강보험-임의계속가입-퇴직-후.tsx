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
  title: "퇴직 후 건강보험 임의계속가입 신청 | 지역가입자 보험료 차이 비교",
  description: "퇴직하면 건강보험료가 갑자기 올라서 당황하셨나요? 임의계속가입으로 직장 보험료 수준을 유지하는 방법과 지역가입자 비교를 알려드려요.",
  category: "건강보험",
  keywords: [
    "건강보험 임의계속가입 퇴직 후 보험료",
    "임의계속가입 지역가입자 보험료 차이",
    "퇴직 후 건강보험 임의계속가입 기한",
    "임의계속가입 36개월 유지 혜택",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "퇴직 후 <strong>2개월 이내</strong>에 신청해야 임의계속가입을 이용할 수 있어요.",
    "임의계속가입 보험료는 직장 다닐 때 내던 금액의 <strong>약 2배</strong> 수준이에요.",
    "재산이 많으면 임의계속가입이 유리하고, 재산이 적으면 지역가입자가 더 저렴할 수 있어요.",
  ],
  sources: [
    { name: "국민건강보험법 제110조 임의계속가입", url: "https://www.law.go.kr/법령/국민건강보험법", date: "2026-02" },
    { name: "국민건강보험공단 임의계속가입 안내", url: "https://www.nhis.or.kr/nhis/policy/wbhabb00m01.do", date: "2026-02" },
  ],
  faq: [
    { q: "임의계속가입 중간에 취업하면 어떻게 되나요?", a: "재취업해서 직장가입자가 되면 임의계속가입이 자동으로 종료돼요. 직장에서 건강보험이 다시 적용되기 때문에 별도로 탈퇴 신청을 할 필요는 없어요. 다만 새 직장 취업 사실을 건강보험공단에 알리면 이중 납부를 피할 수 있어요." },
    { q: "임의계속가입 보험료를 체납하면 어떻게 되나요?", a: "보험료를 2회 이상 체납하면 임의계속가입 자격이 취소돼요. 취소되면 지역가입자로 전환되고 체납된 보험료와 연체료를 내야 해요. 보험료 납부가 어렵다면 미리 건강보험공단에 연락해서 분할납부 등을 상담해보세요." },
  ],
  ctaCard: {
    label: "2분 비교",
    mainText: "임의계속가입 vs 지역가입자",
    subText: "내 보험료 상황 선택",
    url: "/w/건강보험-지역가입자-보험료-계산",
    external: false,
  },
  relatedDocs: [
    { title: "지역가입자 보험료 계산", url: "/w/건강보험-지역가입자-보험료-계산" },
    { title: "피부양자 탈락 조건", url: "/w/건강보험-피부양자-탈락-조건-2026" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { prev_premium, asset, income_after, family } = sel;
    if (!prev_premium || !asset || !income_after || !family) return null;
    if (family === "yes") return "suggest_dependent";
    if (asset === "high") return "cont_favorable";
    if (asset === "low" && income_after === "none") return "region_favorable";
    return "calc_compare";
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 임의계속가입 vs 지역가입자 유리한 쪽 확인" },
    { t: "퇴직 후 건강보험 임의계속가입이란 무엇인가요?", sub: "임의계속가입 개념 · 신청 기한 2개월" },
    { t: "건강보험 임의계속가입 신청 방법은 어떻게 되나요?", sub: "신청 방법 3가지 · 필요 서류" },
    { t: "건강보험 임의계속가입 보험료는 얼마인가요?", sub: "직장 보험료 2배 기준 · 보험료 계산 방법" },
    { t: "건강보험 임의계속가입과 지역가입자 중 어떤 게 유리한가요?", sub: "재산·소득 따라 비교 · 선택 가이드" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "건강보험", "임의계속가입"]}
      tags={["2026년 최신", "건강보험", "임의계속가입", "지역가입자"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>퇴직 후 <strong>2개월 이내</strong>에 신청하면 직장 보험료 수준으로 36개월 유지할 수 있어요. 재산이 많으면 지역가입자보다 훨씬 저렴해요.</>}
      sourceBar={{ badge: "법제처", name: "국민건강보험법 제110조", date: "2026.02" }}
      stickyLabel="신청 기한"
      stickyValue="퇴직 후 2개월 이내"
      stickyBtn="유리한 쪽 바로 확인 ↑"
      disclaimer="이 글은 국민건강보험법과 건강보험공단 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "💊", title: "지역가입자 보험료 계산", sub: "소득·재산·자동차 점수 확인", href: "/w/건강보험-지역가입자-보험료-계산", hot: true },
          { icon: "🏥", title: "피부양자 탈락 조건", sub: "2026년 소득·재산 기준", href: "/w/건강보험-피부양자-탈락-조건-2026" },
          { icon: "💰", title: "본인부담상한제 환급", sub: "소득분위별 의료비 초과 환급", href: "/w/건강보험-본인부담상한제-신청" },
        ]} />
        <SidebarDocs items={[
          { title: "지역가입자 보험료 계산", cat: "건강보험·의료", href: "/w/건강보험-지역가입자-보험료-계산" },
          { title: "피부양자 탈락 조건", cat: "건강보험·의료", href: "/w/건강보험-피부양자-탈락-조건-2026" },
          { title: "본인부담상한제 환급", cat: "건강보험·의료", href: "/w/건강보험-본인부담상한제-신청" },
        ]} />
        <SidebarCalc items={[
          { title: "건강보험 지역가입자 계산기", href: "/w/건강보험-지역가입자-보험료-계산" },
          { title: "실업급여 계산기", href: "/w/실업급여-상한액" },
        ]} />
      </>}
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="checker" title="임의계속가입 vs 지역가입자 유리한 쪽 확인" sub="재산 규모 · 퇴직 후 소득 선택" />
      <P>임의계속가입과 지역가입자 중 어느 쪽이 더 저렴한지는 재산과 소득에 따라 달라져요. 아래에서 내 상황을 선택하면 유리한 쪽을 확인할 수 있어요.</P>

      <CheckerShell title="나는 임의계속가입이 유리할까요?" sub="2분 비교">
        <CheckerQ n="1" label="직장 다닐 때 본인 부담 월 건강보험료가 얼마였나요?" group="prev_premium" opts={[
          ["lt5", "5만원 미만이었어요"],
          ["5to10", "5만원~10만원 사이였어요"],
          ["gt10", "10만원 이상이었어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="퇴직 후 내 명의 재산(재산세 과표 기준)이 어느 정도인가요?" group="asset" opts={[
          ["low", "1억원 이하로 거의 없어요"],
          ["mid", "1억~5억원 정도예요"],
          ["high", "5억원이 넘어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="3" label="퇴직 후 예상 소득이 있나요?" group="income_after" opts={[
          ["none", "없어요 (백수 또는 전업 준비 중)"],
          ["some", "월 100만원 이하 소액이에요"],
          ["much", "월 200만원 이상 예상해요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="4" label="가족 중 직장가입자가 있어서 피부양자 등록이 가능한가요?" group="family" opts={[
          ["yes", "네, 배우자나 자녀 직장가입자가 있어요"],
          ["no", "아니요, 없어요"],
        ]} sel={sel} pick={pick} />

        {result === "suggest_dependent" && (
          <ResultPass title="피부양자 등록이 가장 유리해요">
            <P>가족 중 직장가입자가 있다면 피부양자로 등록하는 게 보험료가 전혀 없어서 가장 유리해요. 임의계속가입이나 지역가입자 전환 전에 피부양자 등록 가능 여부를 먼저 확인해보세요. 소득·재산 기준을 충족하면 바로 신청할 수 있어요.</P>
            <ResultCTA icon="🏥" title="피부양자 탈락 조건 확인" desc="2026년 소득·재산 기준 확인하기" href="/w/건강보험-피부양자-탈락-조건-2026" />
          </ResultPass>
        )}
        {result === "cont_favorable" && (
          <ResultPass title="재산이 많으면 임의계속가입이 유리해요">
            <P>재산세 과표가 높으면 지역가입자 보험료에 재산 점수가 많이 반영돼서 비싸져요. 임의계속가입으로 직장 보험료 수준을 유지하는 게 더 저렴할 수 있어요. 퇴직 후 2개월 이내에 건강보험공단에 신청하세요.</P>
            <ResultCTA icon="📋" title="임의계속가입 신청 방법" desc="건강보험공단 방문·전화·인터넷 신청" href="https://www.nhis.or.kr/nhis/policy/wbhabb00m01.do" />
          </ResultPass>
        )}
        {result === "region_favorable" && (
          <ResultPass title="재산·소득이 적으면 지역가입자가 더 저렴할 수 있어요">
            <P>재산과 소득이 모두 적다면 지역가입자 보험료가 낮게 나와서 임의계속가입보다 저렴할 수 있어요. 지역가입자 최저 보험료 수준과 임의계속가입 예상 보험료를 비교해보세요.</P>
            <ResultCTA icon="💊" title="지역가입자 보험료 계산" desc="소득·재산·자동차 점수로 예상 보험료 확인" href="/w/건강보험-지역가입자-보험료-계산" />
          </ResultPass>
        )}
        {result === "calc_compare" && (
          <ResultPass title="두 가지를 직접 비교해봐야 해요">
            <P>상황에 따라 달라질 수 있어요. 임의계속가입 보험료는 직장 다닐 때 내던 금액의 2배 수준이에요. 지역가입자 보험료는 소득·재산·자동차를 점수로 환산해서 계산해요. 두 금액을 비교해보고 유리한 쪽을 선택하세요.</P>
            <ResultCTA icon="💊" title="지역가입자 보험료 계산" desc="예상 지역가입자 보험료 산정" href="/w/건강보험-지역가입자-보험료-계산" />
          </ResultPass>
        )}
      </CheckerShell>

      <BridgeCard
        q="임의계속가입과 지역가입자 핵심 차이가 궁금하시죠?"
        a="보험료 기준이 다르고 신청 기한이 있어요. 아래에서 자세히 알려드려요."
        label="핵심 차이 바로 보기"
        href="#s2"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="퇴직 후 건강보험 임의계속가입이란 무엇인가요?" sub="임의계속가입 개념 · 신청 기한 2개월" />
      <P>임의계속가입은 퇴직 후에도 직장가입자 보험료 기준을 일정 기간 유지할 수 있는 제도예요. 직장에서 나오면 자동으로 지역가입자로 전환되는데, 이를 원치 않는 경우 임의로 계속 가입 상태를 유지하는 것이에요.</P>
      <P>신청 기한이 엄격해요. 퇴직일의 다음 날부터 2개월 이내에 신청해야 해요. 2개월을 넘기면 임의계속가입이 불가능하고 지역가입자로만 전환돼요. 건강보험공단 홈페이지, 앱, 전화(1577-1000), 지사 방문으로 신청할 수 있어요.</P>
      <P>유지 기간은 최대 36개월이에요. 퇴직 후 3년 동안만 임의계속가입을 유지할 수 있어요. 36개월이 지나면 지역가입자로 전환돼요. 이 기간 동안 보험료를 꾸준히 납부해야 해요.</P>
      <P>임의계속가입 중 재취업하면 자동으로 종료돼요. 새 직장에서 직장가입자가 되는 순간부터 임의계속가입은 효력을 잃어요. 체납 없이 유지하다가 재취업하면 별도 절차 없이 자연스럽게 전환돼요.</P>

      <H3>임의계속가입 개념</H3>
      <TableTitle>임의계속가입 핵심 정보</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>항목</THL><TH>내용</TH></tr>
          </thead>
          <tbody>
            {[
              ["신청 기한", "퇴직 다음 날부터 2개월 이내"],
              ["유지 기간", "최대 36개월"],
              ["보험료 기준", "퇴직 전 직장 보험료 (회사분+본인분 합산)"],
              ["신청 방법", "공단 홈페이지, 앱, 전화(1577-1000), 지사 방문"],
              ["종료 조건", "36개월 경과, 재취업, 2회 이상 체납"],
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
      <Sec n="SECTION 03" id="s3" title="건강보험 임의계속가입 신청 방법은 어떻게 되나요?" sub="신청 방법 3가지 · 필요 서류" />
      <P>임의계속가입 신청은 세 가지 방법으로 할 수 있어요. 온라인, 전화, 방문 모두 가능해요. 가장 빠른 건 건강보험공단 홈페이지나 앱을 통한 인터넷 신청이에요.</P>
      <P>인터넷 신청: <A href="https://www.nhis.or.kr">건강보험공단 홈페이지(nhis.or.kr)</A>에 로그인한 후 '임의계속가입 신청' 메뉴에서 신청할 수 있어요. 공동인증서나 간편인증이 필요해요. 신청 즉시 처리되고 다음 달부터 보험료가 부과돼요.</P>
      <P>전화 신청: 건강보험공단 고객센터 <B>1577-1000</B>으로 전화해서 신청할 수 있어요. 평일 오전 9시~오후 6시에 운영해요. 상담원과 통화 후 신청 처리가 돼요.</P>
      <P>방문 신청: 가까운 건강보험공단 지사를 직접 방문해서 신청할 수 있어요. 신분증을 지참하면 돼요. 지사는 공단 홈페이지에서 찾을 수 있어요.</P>

      <H3>필요 서류</H3>
      <Info type="tip">{"임의계속가입 신청 시 퇴직 증명 서류는 따로 필요 없어요. 건강보험공단에서 직장 상실 정보를 직접 확인해요. 신분증만 있으면 돼요."}</Info>

      <RelatedMid
        title="건강보험 관련 글도 확인해 보세요"
        items={[
          { icon: "🏥", title: "피부양자 탈락 조건 2026", desc: "소득·재산·금융소득 탈락 기준 3가지", href: "/w/건강보험-피부양자-탈락-조건-2026" },
          { icon: "💊", title: "지역가입자 보험료 계산", desc: "소득·재산·자동차 점수 산정 방법", href: "/w/건강보험-지역가입자-보험료-계산" },
          { icon: "💰", title: "본인부담상한제 환급", desc: "의료비 초과분 돌려받는 방법", href: "/w/건강보험-본인부담상한제-신청" },
        ]}
        hubHref="/category/건강보험"
        hubLabel="건강보험 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="건강보험 임의계속가입 보험료는 얼마인가요?" sub="직장 보험료 2배 기준 · 보험료 계산 방법" />
      <P>임의계속가입 보험료는 퇴직 전 마지막 직장에서 내던 보험료 기준으로 계산돼요. 직장 다닐 때는 회사가 절반을 부담했는데, 임의계속가입에서는 회사분까지 전액 본인이 내야 해요.</P>
      <P>직장 다닐 때 본인 부담 보험료의 약 2배라고 생각하면 돼요. 예를 들어 직장에서 월 8만원을 냈다면 임의계속가입 보험료는 약 16만원이에요. 정확한 금액은 마지막 직장에서 납부한 총 건강보험료(회사분+본인분)와 같아요.</P>
      <P>단, 임의계속가입 보험료에는 상한이 있어요. <A href="https://www.law.go.kr/법령/국민건강보험법">국민건강보험법</A>에 따라 전전년도 평균 보험료의 일정 배수를 초과하지 않도록 상한이 적용돼요. 고소득자의 경우 직장 보험료가 매우 높더라도 임의계속가입 보험료는 상한 내로 제한될 수 있어요.</P>
      <P>보험료는 매년 1월에 조정돼요. 새 보험료율이 고시되면 임의계속가입 보험료도 그에 맞춰 변경돼요. 36개월 동안 동일한 금액이 아니라 매년 조금씩 달라질 수 있어요.</P>

      <H3>보험료 계산 방법</H3>
      <BridgeCard
        q="지역가입자 보험료가 얼마인지 직접 계산해보고 싶으시죠?"
        a="소득·재산·자동차 점수를 합산해서 계산할 수 있어요. 두 금액을 비교해보세요."
        label="지역가입자 보험료 계산하기"
        href="/w/건강보험-지역가입자-보험료-계산"
      />

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="건강보험 임의계속가입과 지역가입자 중 어떤 게 유리한가요?" sub="재산·소득 따라 비교 · 선택 가이드" />
      <P>어느 쪽이 유리한지는 퇴직 후 재산과 소득에 따라 달라져요. 일반적으로 재산이 많으면 임의계속가입이, 재산이 적으면 지역가입자가 더 저렴해요.</P>

      <TableTitle>임의계속가입 vs 지역가입자 핵심 차이</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>항목</THL><TH>임의계속가입</TH><TH>지역가입자</TH></tr>
          </thead>
          <tbody>
            {[
              ["보험료 기준", "직장 보험료 (회사분+본인분)", "소득+재산+자동차 점수"],
              ["신청 필요", "퇴직 후 2개월 이내 신청 필수", "자동 전환"],
              ["유리한 경우", "재산이 많고 소득이 낮을 때", "재산 없고 소득도 낮을 때"],
              ["유지 기간", "최대 36개월", "무기한"],
              ["보험료 변동", "연 1회 조정", "소득·재산 변동 시 변경"],
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
      <TableNote>재산이 많거나 자동차가 있으면 지역가입자 보험료에 점수가 추가되어 비싸져요.</TableNote>

      <P>재산이 없고 퇴직 후 소득도 없다면 지역가입자 최저 보험료가 더 저렴할 수 있어요. 건강보험공단에서 제공하는 지역가입자 모의 계산기로 예상 보험료를 확인해보세요.</P>
      <P>피부양자 등록이 가능하다면 임의계속가입이나 지역가입자 전환보다 훨씬 유리해요. 가족 중 직장가입자가 있고 본인 소득·재산이 기준 이하라면 피부양자 등록을 먼저 시도해보세요.</P>

      <H3>선택 가이드</H3>
      <Info type="warn">{"임의계속가입은 신청 기한(퇴직 후 2개월)을 놓치면 선택 자체가 불가능해요. 퇴직 후 보험료 비교를 미루지 말고 빨리 계산해보세요."}</Info>

      <ExtBtn
        badge="건강보험공단"
        text="임의계속가입 신청 및 모의 계산"
        cta="바로가기 →"
        href="https://www.nhis.or.kr/nhis/policy/wbhabb00m01.do"
      />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "건강보험 피부양자 탈락 조건 2026 | 금융소득 초과 지역가입자 전환", desc: "소득·금융소득·재산 탈락 기준 3가지를 알아보세요", href: "/w/건강보험-피부양자-탈락-조건-2026" },
        { title: "건강보험 지역가입자 보험료 계산 | 재산 소득 점수 부과 방식", desc: "소득·재산·자동차를 점수로 환산하는 방법을 알아보세요", href: "/w/건강보험-지역가입자-보험료-계산" },
        { title: "건강보험 본인부담상한제 신청 방법 | 소득분위별 의료비 초과 환급", desc: "연간 의료비 상한액 초과분을 돌려받는 방법이에요", href: "/w/건강보험-본인부담상한제-신청" },
        { title: "국민연금 임의가입 전업주부 조건 | 월 보험료 수령액 손익분기점", desc: "소득 없는 전업주부의 국민연금 임의가입 조건을 알아보세요", href: "/w/국민연금-임의가입-전업주부" },
        { title: "종합소득세 신고 안 하면 가산세 | 무신고 납부불성실 세율 계산", desc: "종합소득세 신고 안 하면 붙는 가산세율과 계산 방법이에요", href: "/w/종합소득세-신고-안하면-가산세" },
      ]} />

      <PrevNext
        prev={{ title: "건강보험 피부양자 탈락 조건 2026 | 금융소득 초과 지역가입자 전환", href: "/w/건강보험-피부양자-탈락-조건-2026" }}
        next={{ title: "건강보험 본인부담상한제 신청 방법 | 소득분위별 의료비 초과 환급", href: "/w/건강보험-본인부담상한제-신청" }}
      />
    </BlogLayout>
  );
}
