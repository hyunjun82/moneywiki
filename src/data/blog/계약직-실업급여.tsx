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
  title: "계약직 실업급여 신청 요건 | 이전 직장 피보험기간 합산 계산",
  description: "계약직 실업급여 신청 요건이 복잡하게 느껴지시죠? 18개월 이내 피보험기간 180일 계산법과 이전 직장 합산 방법을 알려드려요.",
  category: "실업급여",
  keywords: [
    "계약직 실업급여 피보험단위기간 180일 합산",
    "계약직 실업급여 18개월 이전 직장 합산 방법",
    "계약직 여러 직장 고용보험 이직일 소급 확인",
    "계약직 피보험기간 고용24 이력 내역 조회",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "계약직도 이직 전 <strong>18개월 내 피보험기간 180일 이상</strong>이면 정규직과 동일하게 실업급여를 받을 수 있어요.",
    "여러 직장의 피보험기간을 <strong>합산</strong>할 수 있고, 이전에 실업급여를 받지 않은 기간이면 합산 가능해요.",
    "이직일 기준 역산 18개월이 기준이어서, 오래된 직장 기간은 <strong>합산 제외</strong>될 수 있어요.",
  ],
  sources: [
    { name: "고용보험법 피보험단위기간", url: "https://www.law.go.kr/법령/고용보험법", date: "2026-02" },
    { name: "고용24 수급자격 안내", url: "https://www.ei.go.kr", date: "2026-02" },
  ],
  faq: [
    { q: "계약직 실업급여 파견직도 받을 수 있나요?", a: "네, 파견직도 받을 수 있어요. 파견회사와의 계약이 만료되면 계약직 계약만료와 동일하게 수급자격이 생겨요. 이직확인서는 파견 나간 회사가 아니라 파견회사에서 제출해요." },
    { q: "계약직 실업급여 받으려면 이직확인서에 뭐라고 기재돼야 하나요?", a: "계약만료 또는 갱신 거부(회사 측)로 기재되면 돼요. 회사가 개인 사정으로 쓰면 고용센터 심사에서 불리할 수 있어요. 계약 기간이 명시된 근로계약서를 보관해두면 심사 시 도움이 돼요." },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "계약직 피보험기간 180일 합산 확인",
    subText: "고용24에서 이력 조회",
    url: "https://www.ei.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "계약만료 실업급여 수급 조건", url: "/w/실업급여-계약만료" },
    { title: "실업급여 수급자격 신청 절차", url: "/w/실업급여-수급자격-인정" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { tenure, reason } = sel;
    if (!tenure || !reason) return null;
    return `${tenure}_${reason}`;
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 계약직 피보험기간 수급 여부 확인" },
    { t: "계약직도 180일 합산해서 실업급여 받을 수 있나요?", sub: "여러 직장 합산 · 정규직과 동일 조건" },
    { t: "이전 직장 피보험기간 합산은 어떻게 하나요?", sub: "18개월 역산 · 이전 수급 후 재계산" },
    { t: "여러 직장 고용보험 이직일을 어떻게 확인하나요?", sub: "이직일 기준 · 18개월 소급 적용" },
    { t: "고용24에서 피보험기간 내역 조회하는 방법이 뭐예요?", sub: "로그인 조회 · 누락 기간 확인" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "일용직·계약직"]}
      tags={["2026년 최신", "실업급여", "계약직", "피보험기간"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>계약직도 <strong>18개월 내 피보험기간 180일 이상</strong>이면 실업급여를 받을 수 있어요. 이전 직장 기간 합산으로 채울 수 있어요.</>}
      sourceBar={{ badge: "법제처", name: "고용보험법 피보험단위기간", date: "2026.02" }}
      stickyLabel="핵심 조건"
      stickyValue="18개월 내 180일"
      stickyBtn="피보험기간 확인 ↑"
      disclaimer="이 글은 고용보험법과 고용24 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "📄", title: "계약만료 실업급여 조건", sub: "재계약 거부 비자발적 이직 판단", href: "/w/실업급여-계약만료", hot: true },
          { icon: "📋", title: "실업급여 수급자격 신청", sub: "신청 절차와 구비서류 안내", href: "/w/실업급여-수급자격-인정" },
          { icon: "💰", title: "2026년 실업급여 금액", sub: "일 68,100원 기준 계산", href: "/w/2026년-실업급여" },
        ]} />
        <SidebarDocs items={[
          { title: "계약만료 실업급여 조건", cat: "실업급여·고용보험", href: "/w/실업급여-계약만료" },
          { title: "실업급여 수급자격 인정", cat: "실업급여·고용보험", href: "/w/실업급여-수급자격-인정" },
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
      <Sec n="STEP 01" id="checker" title="계약직 피보험기간 수급 여부 확인" sub="피보험기간 · 계약 종료 방식 선택" />
      <P>계약직 실업급여를 받을 수 있는지는 피보험기간과 계약 종료 방식으로 판단해요. 아래에서 선택하면 바로 알 수 있어요.</P>

      <CheckerShell title="계약직 실업급여 신청할 수 있나요?" sub="30초 확인">
        <CheckerQ n="1" label="고용보험 피보험기간이 얼마나 됐나요?" group="tenure" opts={[
          ["over180", "이전 직장 포함 180일 이상이에요"],
          ["borderline", "여러 직장 합산하면 될 것 같아요"],
          ["under180", "180일이 안 될 것 같아요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="계약이 어떻게 끝났나요?" group="reason" opts={[
          ["expired", "계약기간이 만료됐거나 회사가 갱신 안 했어요"],
          ["refused", "회사가 갱신 제안했지만 내가 거부했어요"],
        ]} sel={sel} pick={pick} />

        {result === "over180_expired" && (
          <ResultPass title="실업급여 수급자격이 돼요">
            <P>피보험기간 180일 이상 + 계약만료 비자발적 이직이면 수급자격이 생겨요. 고용24에서 수급자격 신청을 하고, 워크넷 구직 등록 후 고용센터 방문으로 절차를 진행하세요.</P>
            <ResultCTA icon="📋" title="고용24 수급자격 신청" desc="온라인으로 바로 신청" href="https://www.ei.go.kr" />
          </ResultPass>
        )}
        {result === "over180_refused" && (
          <ResultFail title="정당사유 심사가 필요해요">
            <P>피보험기간은 충족하지만, 내가 재계약을 거부했다면 자발적 이직으로 볼 수 있어요. 임금체불, 근로조건 악화 등 정당사유가 있으면 인정될 수 있어요. 고용센터에서 상담받아보세요.</P>
          </ResultFail>
        )}
        {result === "borderline_expired" && (
          <ResultPass title="고용24에서 합산 기간을 확인해보세요">
            <P>이전 직장 피보험기간을 합산하면 180일이 될 것 같다면 고용24에서 이력을 먼저 조회하세요. 이직일 기준 18개월 내 기간만 합산되니 정확한 기간을 먼저 확인하면 좋아요.</P>
            <ResultCTA icon="🔍" title="고용24 피보험기간 조회" desc="전체 이력 및 기간 확인" href="https://www.ei.go.kr" />
          </ResultPass>
        )}
        {result === "borderline_refused" && (
          <ResultFail title="피보험기간 확인 + 정당사유 심사가 필요해요">
            <P>합산 기간이 180일이 되는지 고용24에서 먼저 확인하고, 재계약 거부 사유도 고용센터에서 상담받아야 해요. 두 가지 모두 확인이 필요한 상황이에요.</P>
          </ResultFail>
        )}
        {result === "under180_expired" && (
          <ResultFail title="피보험기간 180일이 부족해요">
            <P>계약만료로 비자발적 이직은 맞지만 18개월 내 피보험기간이 180일 미만이에요. 이전 직장 기간이 18개월 이내라면 합산되니 고용24에서 전체 이력을 확인해보세요.</P>
            <ResultCTA icon="🔍" title="고용24 피보험기간 조회" desc="이전 직장 합산 여부 확인" href="https://www.ei.go.kr" />
          </ResultFail>
        )}
        {result === "under180_refused" && (
          <ResultFail title="수급자격이 되기 어려운 상황이에요">
            <P>피보험기간도 부족하고 자발적 이직 가능성도 있어요. 이전 직장 피보험기간이 18개월 내에 있는지 고용24에서 확인하고, 재계약 거부 사유도 고용센터에서 상담받아보세요.</P>
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="수급 자격이 됐으면 계약만료 처리 방식도 확인해보셨나요?"
        a="회사가 거절했는지 내가 거절했는지에 따라 이직 분류가 달라져요."
        label="계약만료 실업급여 조건 보기"
        href="/w/실업급여-계약만료"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="계약직도 180일 합산해서 실업급여 받을 수 있나요?" sub="여러 직장 합산 · 정규직과 동일 조건" />
      <P>받을 수 있어요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법</A>에서 계약직과 정규직 수급 조건을 따로 구분하지 않아요. 이직일 기준 18개월 이내에 피보험기간 180일 이상이면 동일하게 수급자격이 생겨요.</P>
      <P>단기 계약을 여러 번 반복했어도 합산돼요. A 회사 4개월, B 회사 계약직 3개월이면 합산 7개월로 180일을 초과해요. 회사가 달라도 이직일 기준 18개월 이내 기간이면 모두 합산돼요.</P>
      <P>이전에 실업급여를 받은 이력이 있으면 그 이전 기간은 합산이 안 돼요. 수급 후 새로 쌓인 피보험기간부터 다시 계산해요. 고용24에서 이력을 조회하면 정확한 시작 기준을 알 수 있어요.</P>
      <P>파견직도 동일해요. 파견회사를 통해 일하다가 계약이 끝나면 파견회사와의 계약만료예요. 파견회사에서 고용보험에 가입해줬다면 피보험기간이 쌓여 있어요.</P>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="이전 직장 피보험기간 합산은 어떻게 하나요?" sub="18개월 역산 · 이전 수급 후 재계산" />
      <P>이직일(퇴직일)로부터 역산해서 18개월 전부터 이직일까지 고용보험에 가입된 날을 모두 합산해요. 중간에 쉰 기간은 포함되지 않아요.</P>
      <TableTitle>피보험기간 합산 계산 예시</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>직장</THL><TH>기간</TH><TH>합산 여부</TH></tr>
          </thead>
          <tbody>
            {[
              ["현 직장 (계약직 6개월)", "약 130일", "합산 가능"],
              ["이전 직장 (4개월, 18개월 이내)", "약 80일", "합산 가능"],
              ["2년 전 직장 (18개월 초과)", "일부 또는 전체 제외", "합산 불가"],
              ["이전 수급 기간 이전 직장", "수급 후 기간만 인정", "합산 불가"],
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
      <TableNote>18개월 계산은 이직일이 바뀌면 결과도 달라져요. 고용24에서 실제 이직일 기준으로 조회하는 게 정확해요.</TableNote>

      <P>이전 직장에서 실업급여를 받았다면 그 이전 기간은 합산이 안 돼요. 수급 종료 후 새로 취업해서 쌓인 기간부터만 계산해요. 이 기간이 180일을 넘으면 다시 수급자격이 생겨요.</P>

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="여러 직장 고용보험 이직일을 어떻게 확인하나요?" sub="이직일 기준 · 18개월 소급 적용" />
      <P>이직일은 퇴직일을 말해요. 현재 직장의 퇴직일이 기준이 돼요. 이직일로부터 역산해서 18개월 전에 재직 중이었던 이전 직장들의 피보험기간이 합산 대상이에요.</P>
      <P>이직일이 언제인지 정확히 알아야 해요. 근로계약서 종료일, 이직확인서 이직일, 고용24 이력의 피보험 상실일이 모두 일치하는지 확인하는 게 좋아요. 불일치가 있으면 고용센터에서 보완 처리를 해야 해요.</P>
      <P>18개월을 소급하면 합산 가능 범위가 정해져요. 예를 들어 2026년 3월 1일 이직이라면 2024년 9월 1일부터 2026년 3월 1일까지가 합산 기간이에요. 이 범위 안에 있는 이전 직장 기간만 합산돼요.</P>
      <P>이전 직장과 현 직장 사이에 공백기가 있어도 괜찮아요. 피보험기간에 가입되지 않은 공백 기간은 합산에 포함되지 않지만, 합산 자격을 없애지는 않아요. 공백 기간이 있어도 18개월 이내 기간 내에서 가입된 날만 합산해요.</P>

      <RelatedMid
        hubHref="/w/실업급여-피보험기간-180일-계산"
        hubLabel="피보험기간 계산 방법 자세히 보기"
        items={[
          { icon: "📅", title: "피보험기간 180일 계산", desc: "이직일 기준 18개월 합산 방법", href: "/w/실업급여-피보험기간-180일-계산" },
          { icon: "📋", title: "계약만료 실업급여 조건", desc: "재계약 거부 유형별 수급 여부", href: "/w/실업급여-계약만료" },
          { icon: "✅", title: "실업급여 수급자격 인정", desc: "비자발적 퇴직 신청 절차 안내", href: "/w/실업급여-수급자격-인정" },
        ]}
      />

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="고용24에서 피보험기간 내역 조회하는 방법이 뭐예요?" sub="로그인 조회 · 누락 기간 확인" />
      <P>고용24(ei.go.kr)에 로그인하면 내 피보험자 이력을 확인할 수 있어요. 공인인증서 또는 간편인증(카카오, 네이버 등)으로 로그인하면 돼요.</P>
      <P>조회 경로예요. 고용24 로그인 → 고용보험 → 피보험자격 이력 메뉴에서 직장별 취득일과 상실일, 피보험기간을 볼 수 있어요. 이직일 기준 18개월 내 기간이 총 얼마인지도 계산해볼 수 있어요.</P>
      <P>누락된 기간이 있으면 보완 신청을 해야 해요. 이력에 내가 일한 직장이 없거나 기간이 짧게 나온다면, 해당 사업주에게 피보험자격 신고 보완을 요청하거나 고용센터에 직권 조사를 신청할 수 있어요.</P>
      <P>신청 전에 조회하는 게 중요해요. 고용센터 방문 전에 미리 조회해서 합산 기간이 180일 이상인지 확인하면 당일 처리가 빠르게 돼요. 부족한 경우 보완 후 다시 신청할 수 있어요.</P>

      <ExtBtn badge="고용24 공식" text="피보험기간 조회 및 수급자격 신청" cta="조회하기 →" href="https://www.ei.go.kr" />

      <FAQAccordion items={meta.faq} />
      <RelatedArticles items={[
        { title: "계약만료 실업급여 수급 조건", desc: "재계약 거부 유형별 수급 여부", href: "/w/실업급여-계약만료" },
        { title: "실업급여 수급자격 신청 절차", desc: "비자발적 퇴직 조건과 신청 방법", href: "/w/실업급여-수급자격-인정" },
      ]} />
      <PrevNext
        prev={{ title: "계약만료 실업급여 조건", href: "/w/실업급여-계약만료" }}
        next={{ title: "실업급여 수급자격 인정", href: "/w/실업급여-수급자격-인정" }}
      />
    </BlogLayout>
  );
}
