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
  title: "건강보험 본인부담상한제 신청 방법 | 소득분위별 의료비 초과 환급",
  description: "병원비가 너무 많이 나왔다면 건강보험 본인부담상한제로 돌려받을 수 있어요. 소득분위별 한도와 환급 방법을 알려드려요.",
  category: "건강보험",
  keywords: [
    "건강보험 본인부담상한제 소득분위 한도",
    "의료비 본인부담 초과 환급 신청",
    "본인부담상한제 사전급여 동일 요양기관",
    "본인부담상한제 사후환급 다음 해 정산",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "연간 의료비 본인부담금이 소득분위별 상한액을 초과하면 <strong>초과분 전액을 돌려받아요.</strong>",
    "별도 신청 없이도 다음 해 <strong>8월경</strong> 건강보험공단이 자동으로 초과분을 환급해줘요.",
    "같은 의료기관에서 <strong>81만원 초과</strong> 시에는 사전급여로 그 자리에서 면제받을 수 있어요.",
  ],
  sources: [
    { name: "국민건강보험법 제44조 본인부담상한제", url: "https://www.law.go.kr/법령/국민건강보험법", date: "2026-02" },
    { name: "건강보험공단 본인부담상한제 안내", url: "https://www.nhis.or.kr/nhis/policy/wbhacb00m01.do", date: "2026-02" },
  ],
  faq: [
    { q: "본인부담상한제 환급 대상인지 어떻게 알 수 있나요?", a: "건강보험공단에서 매년 8~9월경 초과자에게 문자나 우편으로 통보해줘요. 통보를 받으면 공단 홈페이지에서 환급 신청을 하거나 자동 이체로 받을 수 있어요. 직접 확인하려면 공단 고객센터(1577-1000)나 홈페이지에서 조회할 수 있어요." },
    { q: "비급여 의료비도 본인부담상한제에 포함되나요?", a: "비급여 의료비는 포함되지 않아요. 건강보험이 적용되는 급여 항목의 본인부담금만 계산해요. 상급병실료, 선택진료비, 미용 시술 등 비급여 항목은 아무리 많아도 상한제 대상이 아니에요." },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "본인부담상한제 환급 대상인지 확인",
    subText: "소득분위·연간 의료비 선택",
    url: "https://www.nhis.or.kr/nhis/policy/wbhacb00m01.do",
    external: true,
  },
  relatedDocs: [
    { title: "건강보험 피부양자 탈락 조건", url: "/w/건강보험-피부양자-탈락-조건-2026" },
    { title: "지역가입자 보험료 계산", url: "/w/건강보험-지역가입자-보험료-계산" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { income_rank, total_medical, same_hospital } = sel;
    if (!income_rank || !total_medical || !same_hospital) return null;

    const limits: Record<string, number> = {
      rank1: 87, rank23: 108, rank45: 162,
      rank67: 303, rank8: 408, rank9: 514, rank10: 780,
    };
    const limit = limits[income_rank] ?? 162;

    if (same_hospital === "over81") return "pre_benefit";
    if (total_medical === "over_limit") return "post_refund";
    if (total_medical === "near_limit") return "check_later";
    return "not_yet";
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 본인부담상한제 환급 대상 여부 확인" },
    { t: "건강보험 본인부담상한제란 무엇인가요?", sub: "상한제 개념 · 급여 항목만 해당" },
    { t: "건강보험 본인부담상한제 소득분위별 한도는 얼마인가요?", sub: "1~10분위 상한액 · 소득분위 확인 방법" },
    { t: "건강보험 본인부담상한제 신청 방법은 어떻게 되나요?", sub: "사전급여 자동 적용 · 사후환급 신청" },
    { t: "건강보험 본인부담상한제 환급 금액은 어떻게 계산하나요?", sub: "3가지 사례별 계산 · 환급 시기" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "건강보험", "본인부담상한제"]}
      tags={["2026년 최신", "건강보험", "의료비", "환급"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>연간 의료비가 소득분위별 상한액을 넘으면 <strong>초과분 전액을 환급</strong>받을 수 있어요. 별도 신청 없이도 공단이 자동으로 정산해줘요.</>}
      sourceBar={{ badge: "법제처", name: "국민건강보험법 제44조", date: "2026.02" }}
      stickyLabel="최저 상한액"
      stickyValue="1분위 87만원"
      stickyBtn="환급 대상 확인 ↑"
      disclaimer="이 글은 국민건강보험법과 건강보험공단 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "💊", title: "본인부담상한제 환급 조회", sub: "건강보험공단에서 확인", href: "https://www.nhis.or.kr/nhis/policy/wbhacb00m01.do", hot: true },
          { icon: "🏥", title: "피부양자 탈락 조건 2026", sub: "소득·재산 기준 확인", href: "/w/건강보험-피부양자-탈락-조건-2026" },
          { icon: "💰", title: "지역가입자 보험료 계산", sub: "소득·재산·자동차 점수 확인", href: "/w/건강보험-지역가입자-보험료-계산" },
        ]} />
        <SidebarDocs items={[
          { title: "피부양자 탈락 조건", cat: "건강보험·의료", href: "/w/건강보험-피부양자-탈락-조건-2026" },
          { title: "지역가입자 보험료 계산", cat: "건강보험·의료", href: "/w/건강보험-지역가입자-보험료-계산" },
          { title: "임의계속가입 신청", cat: "건강보험·의료", href: "/w/건강보험-임의계속가입-퇴직-후" },
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
      <Sec n="STEP 01" id="checker" title="본인부담상한제 환급 대상 여부 확인" sub="소득분위 · 연간 의료비 선택" />
      <P>본인부담상한제 환급은 소득분위와 연간 의료비 합산액에 따라 결정돼요. 아래에서 내 상황을 선택하면 환급 가능 여부를 확인할 수 있어요.</P>

      <CheckerShell title="내 의료비 환급 받을 수 있나요?" sub="30초 확인">
        <CheckerQ n="1" label="건강보험료 소득분위가 어디에 해당하나요? (건보공단 통보 기준)" group="income_rank" opts={[
          ["rank1", "1분위 (최저 소득)"],
          ["rank23", "2~3분위"],
          ["rank45", "4~5분위"],
          ["rank67", "6~7분위"],
          ["rank8", "8분위"],
          ["rank9", "9분위"],
          ["rank10", "10분위 (최고 소득)"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="올해 의료기관에서 낸 본인부담금 총액이 어느 정도인가요?" group="total_medical" opts={[
          ["over_limit", "상한액을 초과한 것 같아요"],
          ["near_limit", "상한액 근처예요"],
          ["not_much", "상한액보다 훨씬 적어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="3" label="같은 의료기관에서 연간 81만원 이상 내셨나요?" group="same_hospital" opts={[
          ["over81", "네, 한 의료기관에서 81만원 이상 냈어요"],
          ["no", "아니요, 여러 곳에서 나눠서 냈어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="4" label="올해 입원 치료를 받으셨나요?" group="hospitalized" opts={[
          ["yes", "네, 입원 치료를 받았어요"],
          ["no", "아니요, 외래 치료만 받았어요"],
        ]} sel={sel} pick={pick} />

        {result === "pre_benefit" && (
          <ResultPass title="사전급여로 그 자리에서 면제받을 수 있어요">
            <P>같은 의료기관에서 연간 81만원을 초과하면 그 초과분은 해당 병원에서 그 자리에서 면제(사전급여)가 돼요. 별도 신청 없이 의료기관이 공단에 청구하면 자동으로 처리돼요.</P>
            <ResultCTA icon="🏥" title="건강보험공단 사전급여 안내" desc="사전급여 적용 의료기관 확인" href="https://www.nhis.or.kr/nhis/policy/wbhacb00m01.do" />
          </ResultPass>
        )}
        {result === "post_refund" && (
          <ResultPass title="사후환급 대상일 가능성이 높아요">
            <P>연간 본인부담금 총액이 소득분위별 상한액을 초과한 것 같으면 다음 해 8~9월경 건강보험공단에서 자동으로 초과분을 환급해줘요. 별도 신청 없이 우편이나 문자로 통보받아요.</P>
            <ResultCTA icon="💰" title="환급 대상 여부 조회" desc="건강보험공단 홈페이지에서 확인" href="https://www.nhis.or.kr/nhis/policy/wbhacb00m01.do" />
          </ResultPass>
        )}
        {result === "check_later" && (
          <ResultPass title="연말까지 추이를 지켜봐야 해요">
            <P>현재 의료비가 상한액 근처라면 연말까지 더 납부 내역이 생길 수 있어요. 연간 집계는 12월 31일 기준이에요. 다음 해 8~9월에 공단에서 초과 여부를 자동으로 확인해줘요.</P>
          </ResultPass>
        )}
        {result === "not_yet" && (
          <ResultFail title="현재는 상한제 적용 대상이 아닌 것 같아요">
            <P>연간 본인부담금이 소득분위별 상한액에 미달하면 환급 대상이 아니에요. 앞으로도 의료비가 많이 발생하면 상한액을 넘길 수 있으니 납부 내역을 잘 기록해두세요.</P>
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="소득분위별 상한액이 얼마인지 궁금하시죠?"
        a="1분위 87만원부터 10분위 780만원까지 소득에 따라 달라져요."
        label="소득분위별 상한액 바로 보기"
        href="#s3"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="건강보험 본인부담상한제란 무엇인가요?" sub="상한제 개념 · 급여 항목만 해당" />
      <P>본인부담상한제는 연간 의료비 중 건강보험 급여 항목의 본인부담금 합계가 일정 금액을 초과하면 초과분을 건강보험공단이 대신 부담해주는 제도예요. 큰 병에 걸렸을 때 과도한 의료비 부담을 줄여주는 안전망이에요.</P>
      <P>적용 대상은 건강보험 급여 항목의 본인부담금이에요. 비급여 항목(상급병실료, 선택진료비, 미용 시술 등)은 포함되지 않아요. 아무리 비급여 의료비가 많이 나와도 상한제 혜택을 받을 수 없어요.</P>
      <P>크게 두 가지 방식으로 적용돼요. 사전급여는 같은 의료기관에서 연간 81만원을 초과하면 그 자리에서 면제받는 방식이에요. 사후환급은 여러 의료기관에서 낸 총 본인부담금이 소득분위별 상한액을 초과할 때 다음 해에 돌려받는 방식이에요.</P>
      <P><A href="https://www.law.go.kr/법령/국민건강보험법">국민건강보험법 제44조</A>에 근거한 제도로, 매년 소득분위별 상한액이 건강보험공단 고시로 조정돼요. 건강보험공단에서 자동으로 계산하기 때문에 초과 시 신청하지 않아도 자동 통보돼요.</P>

      <H3>상한제 개념</H3>
      <Info type="tip">{"본인부담상한제와 재난적의료비 지원사업은 다른 제도예요. 비급여 의료비도 지원받으려면 재난적의료비 지원사업을 별도로 신청해야 해요."}</Info>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="건강보험 본인부담상한제 소득분위별 한도는 얼마인가요?" sub="1~10분위 상한액 · 소득분위 확인 방법" />
      <P>소득분위별 상한액은 매년 조정돼요. 소득이 낮을수록 상한액이 낮아서 조금만 내도 초과분을 돌려받을 수 있어요. 소득분위가 높을수록 상한액이 높아요.</P>

      <TableTitle>소득분위별 본인부담 상한액 (2024년 기준)</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>소득분위</THL><TH>연간 상한액</TH><TH>해당 소득 수준</TH></tr>
          </thead>
          <tbody>
            {[
              ["1분위", "87만원", "건강보험료 최저 구간"],
              ["2~3분위", "108만원", "저소득 구간"],
              ["4~5분위", "162만원", "중하위 소득 구간"],
              ["6~7분위", "303만원", "중위 소득 구간"],
              ["8분위", "408만원", "중상위 소득 구간"],
              ["9분위", "514만원", "고소득 구간"],
              ["10분위", "780만원", "건강보험료 최고 구간"],
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
      <TableNote>매년 건강보험공단에서 상한액이 조정돼요. 정확한 연도별 금액은 건강보험공단 홈페이지에서 확인하세요.</TableNote>

      <P>내 소득분위는 건강보험료 납부 내역을 기준으로 결정돼요. 건강보험공단 홈페이지에 로그인하면 내 소득분위를 확인할 수 있어요. 전년도 소득을 기준으로 다음 해 분위가 결정돼요.</P>

      <H3>소득분위 확인 방법</H3>
      <InlineLink
        icon="📊"
        title="건강보험공단 소득분위 확인"
        desc="공단 홈페이지 로그인 → 개인 민원 → 자격·보험료 조회에서 확인"
        href="https://www.nhis.or.kr"
      />

      <RelatedMid
        title="건강보험 관련 글도 확인해 보세요"
        items={[
          { icon: "🏥", title: "피부양자 탈락 조건 2026", desc: "소득·금융소득·재산 탈락 기준 3가지", href: "/w/건강보험-피부양자-탈락-조건-2026" },
          { icon: "📋", title: "임의계속가입 신청 방법", desc: "퇴직 후 2개월 이내 신청해야 해요", href: "/w/건강보험-임의계속가입-퇴직-후" },
          { icon: "💊", title: "지역가입자 보험료 계산", desc: "소득·재산·자동차 점수 산정 방법", href: "/w/건강보험-지역가입자-보험료-계산" },
        ]}
        hubHref="/category/건강보험"
        hubLabel="건강보험 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="건강보험 본인부담상한제 신청 방법은 어떻게 되나요?" sub="사전급여 자동 적용 · 사후환급 신청" />
      <P>본인부담상한제는 별도 신청 없이도 자동으로 적용돼요. 건강보험공단이 알아서 초과분을 계산하고 통보해줘요. 다만 환급을 직접 신청하면 더 빨리 받을 수 있는 경우도 있어요.</P>
      <P>사전급여는 의료기관 단계에서 자동 적용돼요. 같은 의료기관에서 한 해에 낸 본인부담금이 81만원을 초과하면, 그 초과분을 의료기관이 공단에 직접 청구해서 환자는 내지 않아도 돼요. 환자가 별도로 신청할 필요가 없어요.</P>
      <P>사후환급은 건강보험공단이 다음 해 8~9월경 초과 여부를 확인하고 통보해줘요. 우편이나 문자로 통보를 받으면 공단 홈페이지, 앱, 전화(1577-1000)로 신청해서 환급받을 수 있어요. 계좌를 등록해두면 자동 이체도 돼요.</P>
      <P>본인이 직접 신청하고 싶다면 다음 해 1월부터 건강보험공단에 청구할 수 있어요. 당해 연도 의료비 내역을 모두 모은 뒤, 공단 홈페이지에서 신청하면 돼요. 처리 기간은 약 2~3주 정도예요.</P>

      <H3>사전급여 자동 적용</H3>
      <Info type="warn">{"본인부담상한제 환급 통보를 받았는데도 신청하지 않으면 3년 이내에 청구권이 소멸돼요. 환급 통보를 받으면 미루지 말고 신청하세요."}</Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="건강보험 본인부담상한제 환급 금액은 어떻게 계산하나요?" sub="3가지 사례별 계산 · 환급 시기" />
      <P>환급 금액은 연간 본인부담금 합계에서 소득분위별 상한액을 뺀 금액이에요. 상한액을 초과한 만큼 전부 돌려받아요.</P>

      <TableTitle>사례별 환급 계산</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>사례</THL><TH>소득분위</TH><TH>연간 의료비</TH><TH>상한액</TH><TH>환급액</TH></tr>
          </thead>
          <tbody>
            {[
              ["암 진단 1분위 환자", "1분위", "300만원", "87만원", "213만원"],
              ["허리 수술 4분위", "4~5분위", "250만원", "162만원", "88만원"],
              ["만성질환 6분위", "6~7분위", "200만원", "303만원", "해당 없음"],
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
      <TableNote>의료비는 급여 항목 본인부담금만 합산해요. 비급여는 포함되지 않아요.</TableNote>

      <P>환급 시기는 원칙적으로 다음 해 8~9월이에요. 의료 이용 내역이 모두 건강보험공단에 집계된 후 초과 여부를 확인해요. 사전급여는 해당 연도 의료 이용 시점에 바로 적용돼요.</P>
      <P>환급 금액에 이의가 있으면 공단 고객센터(1577-1000)에 문의하거나, 건강보험공단 홈페이지에서 이의신청을 할 수 있어요. 90일 이내에 신청해야 해요.</P>

      <H3>환급 시기</H3>
      <ExtBtn
        badge="건강보험공단"
        text="본인부담상한제 환급 신청"
        cta="바로 신청 →"
        href="https://www.nhis.or.kr/nhis/policy/wbhacb00m01.do"
      />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "건강보험 피부양자 탈락 조건 2026 | 금융소득 초과 지역가입자 전환", desc: "소득·금융소득·재산 탈락 기준 3가지를 알아보세요", href: "/w/건강보험-피부양자-탈락-조건-2026" },
        { title: "퇴직 후 건강보험 임의계속가입 신청 | 지역가입자 보험료 차이 비교", desc: "퇴직 후 임의계속가입 vs 지역가입자 비교해요", href: "/w/건강보험-임의계속가입-퇴직-후" },
        { title: "건강보험 지역가입자 보험료 계산 | 재산 소득 점수 부과 방식", desc: "소득·재산·자동차를 점수로 환산하는 방법을 알아보세요", href: "/w/건강보험-지역가입자-보험료-계산" },
        { title: "국민연금 임의가입 전업주부 조건 | 월 보험료 수령액 손익분기점", desc: "소득 없는 전업주부의 국민연금 임의가입 조건이에요", href: "/w/국민연금-임의가입-전업주부" },
        { title: "종합소득세 신고 안 하면 가산세 | 무신고 납부불성실 세율 계산", desc: "종합소득세 신고 안 하면 붙는 가산세율이에요", href: "/w/종합소득세-신고-안하면-가산세" },
      ]} />

      <PrevNext
        prev={{ title: "퇴직 후 건강보험 임의계속가입 신청 | 지역가입자 보험료 차이 비교", href: "/w/건강보험-임의계속가입-퇴직-후" }}
        next={{ title: "건강보험 지역가입자 보험료 계산 | 재산 소득 점수 부과 방식", href: "/w/건강보험-지역가입자-보험료-계산" }}
      />
    </BlogLayout>
  );
}
