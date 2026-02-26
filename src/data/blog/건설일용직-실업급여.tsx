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
  title: "건설일용직 실업급여 신청 조건 | 피보험기간 180일 계산 방법",
  description: "건설일용직도 180일만 일하면 실업급여 받는다는 거 아시나요? 이직일 전 18개월 피보험기간 계산 방법과 여러 현장 합산 조건을 알려드려요.",
  category: "실업급여",
  keywords: [
    "건설일용직 실업급여 피보험단위기간 이직일 합산",
    "건설일용직 실업급여 이직일 전 18개월 근무",
    "건설일용직 실업급여 고용센터 접수 서류 목록",
    "건설일용직 근로내용 확인신고서 미제출 처리",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "건설일용직은 이직 전 <strong>18개월 내 피보험기간 180일 이상</strong>이면 실업급여를 받을 수 있어요.",
    "여러 현장에서 일한 날을 모두 <strong>합산</strong>하고, 사업주의 근로내용 확인신고 내역이 기준이에요.",
    "이직 상태는 마지막 현장 종료 또는 1개월 내 10일 미만 근무한 경우로 판단해요.",
  ],
  sources: [
    { name: "고용보험법 일용근로자 구직급여", url: "https://www.law.go.kr/법령/고용보험법", date: "2026-02" },
    { name: "고용노동부 건설일용직 고용보험 안내", url: "https://www.moel.go.kr/policy/policyinfo/benefit/list.do", date: "2026-02" },
  ],
  faq: [
    { q: "건설일용직 실업급여 신청 전에 마지막 현장에서 며칠이나 일해야 하나요?", a: "이직 전 1개월 내에 10일 미만 근무한 상태여야 해요. 마지막 현장이 종료되거나 1개월 내 10일 미만 일했을 때 이직한 것으로 봐요. 이직 상태가 된 시점부터 수급자격 신청이 가능해요." },
    { q: "건설일용직 피보험기간 180일은 같은 현장만 카운트되나요?", a: "아니에요. 여러 현장에서 일한 기간을 모두 합산해요. 고용보험에 가입된 사업장에서 일한 날을 모두 더하면 돼요. 다만 사업주가 근로내용 확인신고를 제대로 해야 기간이 인정돼요." },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "건설일용직 피보험기간 조회",
    subText: "고용24에서 내 기간 확인",
    url: "https://www.ei.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "건설일용근로자 실업급여 신청 절차", url: "/w/실업급여-건설일용직" },
    { title: "계약직 실업급여 신청 요건", url: "/w/계약직-실업급여" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { period, status } = sel;
    if (!period || !status) return null;
    return `${period}_${status}`;
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 건설일용직 실업급여 신청 가능 여부 확인" },
    { t: "피보험기간 180일은 어떻게 계산하나요?", sub: "여러 현장 합산 · 18개월 기준 기간" },
    { t: "이직일 전 18개월 기준은 어떻게 적용되나요?", sub: "이직일 계산 · 10일 미만 근무 판단" },
    { t: "건설일용직 실업급여 신청 서류 뭐가 필요한가요?", sub: "이직확인서 · 신분증 · 통장 사본" },
    { t: "근로내용 확인신고서 안 됐을 때 어떻게 하나요?", sub: "사업주 요청 · 고용센터 직권 조사" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "일용직·계약직"]}
      tags={["2026년 최신", "실업급여", "건설일용직", "피보험기간"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>건설일용직도 고용보험 가입 현장에서 일했다면 실업급여 대상이에요. <strong>18개월 내 180일 이상</strong> 여러 현장 합산으로 채울 수 있어요.</>}
      sourceBar={{ badge: "법제처", name: "고용보험법 일용근로자 구직급여", date: "2026.02" }}
      stickyLabel="핵심 조건"
      stickyValue="18개월 내 180일 이상"
      stickyBtn="신청 가능 여부 확인 ↑"
      disclaimer="이 글은 고용보험법과 고용노동부 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "🏗️", title: "건설일용직 신청 절차", sub: "이직확인서 발급부터 수급까지", href: "/w/실업급여-건설일용직", hot: true },
          { icon: "📄", title: "계약직 실업급여 요건", sub: "계약만료 180일 합산 기준", href: "/w/계약직-실업급여" },
          { icon: "💰", title: "2026년 실업급여 금액", sub: "일 68,100원 기준 계산", href: "/w/2026년-실업급여" },
        ]} />
        <SidebarDocs items={[
          { title: "건설일용직 신청 절차", cat: "실업급여·고용보험", href: "/w/실업급여-건설일용직" },
          { title: "계약직 실업급여 요건", cat: "실업급여·고용보험", href: "/w/계약직-실업급여" },
          { title: "실업급여 피보험기간 계산", cat: "실업급여·고용보험", href: "/w/실업급여-피보험기간-180일-계산" },
          { title: "실업급여 신청 방법", cat: "실업급여·고용보험", href: "/w/실업급여-신청방법" },
        ]} />
        <SidebarCalc items={[
          { title: "실업급여 계산기", href: "/w/실업급여-상한액" },
          { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
        ]} />
      </>}
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="checker" title="건설일용직 실업급여 신청 가능 여부 확인" sub="피보험기간 · 이직 상태 선택" />
      <P>건설일용직 실업급여는 피보험기간 요건과 이직 상태 두 가지가 핵심이에요. 아래에서 선택하면 바로 알 수 있어요.</P>

      <CheckerShell title="건설일용직 실업급여 신청할 수 있나요?" sub="30초 확인">
        <CheckerQ n="1" label="최근 18개월 내 고용보험 피보험기간이 얼마나 됐나요?" group="period" opts={[
          ["over180", "180일(약 6개월) 이상이에요"],
          ["unsure", "정확히 모르겠어요"],
          ["under180", "180일 미만이에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="현재 이직 상태인가요?" group="status" opts={[
          ["yes", "마지막 현장이 끝났거나 1개월 내 10일 미만 일했어요"],
          ["no", "아직 현장에서 일하고 있어요"],
        ]} sel={sel} pick={pick} />

        {result === "over180_yes" && (
          <ResultPass title="실업급여 신청 가능해요">
            <P>18개월 내 180일 이상 + 이직 상태가 확인됐어요. 마지막 현장 사업주에게 이직확인서 발급을 요청하고, 고용센터에 수급자격 신청을 하세요. 신청 후 구직활동을 정기적으로 신고해야 수당이 지급돼요.</P>
            <ResultCTA icon="🏗️" title="건설일용직 신청 절차 보기" desc="이직확인서 발급부터 수급까지" href="/w/실업급여-건설일용직" />
          </ResultPass>
        )}
        {result === "over180_no" && (
          <ResultFail title="이직 상태가 되면 신청하세요">
            <P>피보험기간 요건은 충족이지만 아직 이직 상태가 아니에요. 현장이 종료되거나 1개월 내 10일 미만 근무 상태가 되면 그때 신청할 수 있어요. 이직일로부터 12개월 내에 신청해야 해요.</P>
          </ResultFail>
        )}
        {result === "unsure_yes" && (
          <ResultPass title="고용24에서 피보험기간을 먼저 확인해보세요">
            <P>이직 상태는 됐으니 고용24에서 피보험기간 이력을 조회해보세요. 18개월 내 180일 이상이라면 바로 신청할 수 있어요. 누락된 기간이 있는지도 함께 확인하면 좋아요.</P>
            <ResultCTA icon="🔍" title="고용24 피보험기간 조회" desc="이력 및 기간 확인" href="https://www.ei.go.kr" />
          </ResultPass>
        )}
        {result === "unsure_no" && (
          <ResultFail title="피보험기간 확인 후 이직 상태가 되면 신청하세요">
            <P>피보험기간도 불확실하고 아직 이직 상태가 아니에요. 고용24에서 피보험기간 이력을 먼저 조회하고, 현장이 끊기면 이직일로부터 12개월 내에 신청하세요.</P>
          </ResultFail>
        )}
        {result === "under180_yes" && (
          <ResultFail title="180일 기준 미달이에요">
            <P>이직 상태이지만 18개월 내 피보험기간이 180일 미만이에요. 고용24에서 누락된 기간이 있는지 확인해보세요. 사업주가 근로내용 확인신고를 안 한 기간이 빠졌을 수 있어요.</P>
          </ResultFail>
        )}
        {result === "under180_no" && (
          <ResultFail title="피보험기간 180일을 먼저 채워야 해요">
            <P>18개월 내 180일을 채우고 이직 상태가 돼야 신청할 수 있어요. 사업주가 고용보험 신고를 제대로 하는지 확인하고, 누락이 있으면 고용센터에 신고하세요.</P>
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="조건이 충족됐으면 이제 신청 절차가 궁금하시죠?"
        a="이직확인서 발급부터 고용센터 방문 신청까지 단계별로 알 수 있어요."
        label="건설일용직 신청 절차 보기"
        href="/w/실업급여-건설일용직"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="피보험기간 180일은 어떻게 계산하나요?" sub="여러 현장 합산 · 18개월 기준 기간" />
      <P>이직 전 18개월 내에 실제 근무한 날수를 모두 합산해요. 현장별로 따로 계산하지 않아요. 이 기간 내에 A 현장 60일, B 현장 80일, C 현장 50일 일했다면 합산해서 190일이 돼요.</P>
      <P>180일은 달력 일수가 아니라 고용보험 납부 일수예요. 일용직이기 때문에 출근한 날만 카운트돼요. 주 5일 근무 기준으로 약 36주(9개월)가 돼요. 6개월 계약이면 130일 정도라서 이전 직장 기간을 합산해야 180일을 채울 수 있어요.</P>
      <P>18개월이라는 기간 제한이 있어요. 이직일로부터 역산해서 18개월 전보다 오래된 피보험기간은 합산이 안 돼요. 2년 전 직장 기간은 포함되지 않을 수 있으니 고용24에서 정확히 확인해보세요.</P>
      <P>이전에 실업급여를 받은 이력이 있으면 그 이전 기간은 합산이 안 돼요. 수급 후 새로 쌓인 피보험기간부터 다시 계산해요.</P>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="이직일 전 18개월 기준은 어떻게 적용되나요?" sub="이직일 계산 · 10일 미만 근무 판단" />
      <P>건설일용직은 이직일 판단이 일반 근로자와 달라요. 마지막 현장이 종료된 날 또는 최근 1개월 내에 10일 미만 일한 상태가 되는 날이 이직일이에요.</P>
      <P>10일 미만 기준을 이해해야 해요. 현장을 옮겨다니는 경우 딱 떨어지는 이직일이 없어요. 고용보험법에서는 "최근 1개월 내 10일 미만 근무한 날"을 이직 상태로 봐요. 다른 현장에서 계속 일하는 중이라면 이직 상태가 아니에요.</P>
      <P>이직 후 신청 기한도 있어요. 이직일로부터 12개월 이내에 수급자격을 신청해야 해요. 12개월이 지나면 피보험기간 요건을 충족해도 신청이 안 돼요. 이직 상태가 되면 빠르게 신청하는 게 좋아요.</P>
      <P>수급기간은 피보험기간에 따라 90~270일이에요. 건설일용직도 일반 소정급여일수 기준이 적용돼요. 50세 이상이면 구간별로 30일씩 추가돼요.</P>

      <RelatedMid
        hubHref="/w/실업급여-피보험기간-180일-계산"
        hubLabel="피보험기간 계산 방법 자세히 보기"
        items={[
          { icon: "📅", title: "피보험기간 180일 계산", desc: "18개월 내 가입일수 합산 방법", href: "/w/실업급여-피보험기간-180일-계산" },
          { icon: "📄", title: "계약직 실업급여 요건", desc: "계약만료 후 피보험기간 조건", href: "/w/계약직-실업급여" },
          { icon: "👴", title: "50세 이상 수급기간 혜택", desc: "최대 270일 연장 조건 안내", href: "/w/50세-이상-실업급여" },
        ]}
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="건설일용직 실업급여 신청 서류 뭐가 필요한가요?" sub="이직확인서 · 신분증 · 통장 사본" />
      <P>신청에 필요한 서류는 간단해요. 신분증, 이직확인서, 통장 사본이 기본이에요. 고용센터에 방문해서 수급자격 인정 신청서를 작성하면 돼요.</P>
      <TableTitle>건설일용직 실업급여 신청 서류</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>서류</THL><TH>발급처</TH><TH>비고</TH></tr>
          </thead>
          <tbody>
            {[
              ["신분증", "본인 보유", "필수"],
              ["이직확인서", "마지막 현장 사업주", "사업주 발급 요청"],
              ["통장 사본", "본인 보유", "수당 입금 계좌"],
              ["피보험기간 조회 출력", "고용24", "방문 전 확인 권장"],
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
      <TableNote>건설일용직은 인터넷 신청보다 고용센터 방문 신청이 원활해요. 이직확인서가 없어도 신청은 가능하지만 처리가 지연될 수 있어요.</TableNote>

      <P>이직확인서 발급은 사업주 의무예요. 사업주가 14일 내에 발급해야 하고, 거부하면 고용노동부(1350)에 신고할 수 있어요. 이직확인서 없이도 수급자격 신청 접수는 가능해요.</P>
      <P>방문 전에 고용24에서 피보험기간을 미리 조회하면 신청 당일 빠르게 처리돼요. 누락된 기간이 있으면 그 자리에서 보완 신청도 할 수 있어요.</P>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="근로내용 확인신고서 안 됐을 때 어떻게 하나요?" sub="사업주 요청 · 고용센터 직권 조사" />
      <P>건설일용직은 고용보험 신고 구조가 일반 사업장과 달라요. 원수급인(원청)이 하수급인(하청)이 고용한 일용직까지 포함해서 신고해야 해요. 신고 기한은 매월 다음 달 15일이에요.</P>
      <P>고용24에서 피보험기간 이력을 조회했을 때 실제로 일한 기간이 빠져있다면, 해당 현장 사업주에게 근로내용 확인신고 보완을 요청해요. 사업주는 과태료 부과 대상이기 때문에 대부분 협조해요.</P>
      <P>사업주가 협조하지 않으면 고용센터에 직권 조사를 신청할 수 있어요. 일당 지급 내역, 일용대장, 동료 진술 등 증빙이 될 만한 자료를 가지고 고용센터에 상담받으면 돼요.</P>
      <P>확인신고서 누락이 자주 발생하는 구조라서, 신청 전에 반드시 피보험기간 이력을 조회해보는 게 좋아요. 누락 기간이 있으면 보완 후 다시 180일을 계산해요.</P>

      <ExtBtn badge="고용24 공식" text="피보험기간 조회 및 수급자격 신청" cta="조회하기 →" href="https://www.ei.go.kr" />

      <FAQAccordion items={meta.faq} />
      <RelatedArticles items={[
        { title: "건설일용근로자 실업급여 신청 절차", desc: "고용센터 접수 단계별 방법", href: "/w/실업급여-건설일용직" },
        { title: "계약직 실업급여 신청 요건", desc: "180일 합산과 계약만료 조건", href: "/w/계약직-실업급여" },
      ]} />
      <PrevNext
        prev={{ title: "간병 사유 퇴직 실업급여", href: "/w/실업급여-간병-퇴직" }}
        next={{ title: "건설일용근로자 신청 절차", href: "/w/실업급여-건설일용직" }}
      />
    </BlogLayout>
  );
}
