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
  title: "계약만료 실업급여 수급 조건 | 재계약 거부 비자발적 이직 판단 방법",
  description: "계약직 계약만료되면 실업급여 받을 수 있는지 고민이시죠? 회사가 갱신을 거절한 경우와 내가 거절한 경우 차이를 알려드려요.",
  category: "실업급여",
  keywords: [
    "계약만료 실업급여 무조건 수급 가능 여부",
    "계약만료 재계약 거부 비자발적 이직 판단",
    "계약만료 비자발적 이직 퇴직금 실업급여 비교",
    "계약만료 회사 재계약 제안 거절 실업급여",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "계약만료는 <strong>비자발적 퇴사</strong>로 분류돼서 피보험기간 180일 이상이면 실업급여를 받을 수 있어요.",
    "여러 번 갱신한 계약직이 갑자기 갱신 거절 당했다면 <strong>갱신 기대권</strong>으로 비자발적 이직 인정돼요.",
    "회사가 재계약을 제안했는데 내가 거절했다면 자발적 이직으로 볼 수 있어 <strong>정당사유 심사</strong>가 필요해요.",
  ],
  sources: [
    { name: "고용보험법 이직 사유별 수급자격", url: "https://www.law.go.kr/법령/고용보험법", date: "2026-02" },
    { name: "고용24 수급자격 안내", url: "https://www.ei.go.kr", date: "2026-02" },
  ],
  faq: [
    { q: "계약만료 실업급여 이직확인서에 뭐라고 기재돼야 하나요?", a: "계약만료 또는 갱신 거부(회사 측)로 기재되면 돼요. 회사가 개인 사정으로 쓰면 고용센터 심사에서 불리할 수 있어요. 계약 기간이 명시된 근로계약서를 보관해두면 심사 시 도움이 돼요." },
    { q: "계약만료와 권고사직은 실업급여에서 어떻게 다른가요?", a: "둘 다 비자발적 이직으로 분류돼요. 계약만료는 계약 기간이 종료된 것, 권고사직은 사업주 요청으로 퇴직한 것이에요. 수급자격 인정 면에서 큰 차이는 없어요. 다만 이직확인서 기재 사유가 다르게 처리될 수 있어요." },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "계약만료 실업급여 수급 여부 확인",
    subText: "계약 종료 방식 선택",
    url: "/w/실업급여-수급자격-인정",
    external: false,
  },
  relatedDocs: [
    { title: "실업급여 수급자격 신청 절차", url: "/w/실업급여-수급자격-인정" },
    { title: "계약직 실업급여 신청 요건", url: "/w/계약직-실업급여" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { quit, days } = sel;
    if (!quit || !days) return null;
    return `${quit}_${days}`;
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 계약만료 실업급여 수급 여부 확인" },
    { t: "계약만료로 퇴직하면 무조건 실업급여 받을 수 있나요?", sub: "비자발적 이직 인정 · 피보험기간 180일" },
    { t: "재계약 거부했을 때 비자발적 이직으로 인정되나요?", sub: "회사 거부 · 본인 거부 차이" },
    { t: "계약만료 후 퇴직금과 실업급여 둘 다 받을 수 있나요?", sub: "퇴직금 · 실업급여 동시 수급" },
    { t: "회사가 재계약을 제안했는데 내가 거절하면 어떻게 되나요?", sub: "정당사유 심사 · 근로조건 악화 기준" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "일용직·계약직"]}
      tags={["2026년 최신", "실업급여", "계약만료", "비자발적 이직"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>계약만료는 <strong>비자발적 퇴사</strong>로 실업급여 받을 수 있어요. 회사가 거절했는지, 내가 거절했는지에 따라 처리가 달라져요.</>}
      sourceBar={{ badge: "법제처", name: "고용보험법 이직 사유별 수급자격", date: "2026.02" }}
      stickyLabel="핵심 조건"
      stickyValue="계약만료 = 비자발적 이직"
      stickyBtn="수급 여부 확인 ↑"
      disclaimer="이 글은 고용보험법과 고용24 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "📋", title: "실업급여 수급자격 신청", sub: "신청 절차와 구비서류 안내", href: "/w/실업급여-수급자격-인정", hot: true },
          { icon: "📄", title: "계약직 실업급여 요건", sub: "18개월 180일 합산 계산", href: "/w/계약직-실업급여" },
          { icon: "💰", title: "2026년 실업급여 금액", sub: "일 68,100원 기준 계산", href: "/w/2026년-실업급여" },
        ]} />
        <SidebarDocs items={[
          { title: "실업급여 수급자격 인정", cat: "실업급여·고용보험", href: "/w/실업급여-수급자격-인정" },
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
      <Sec n="STEP 01" id="checker" title="계약만료 실업급여 수급 여부 확인" sub="계약 종료 방식 · 피보험기간 선택" />
      <P>계약만료 후 실업급여를 받을 수 있는지는 계약이 어떻게 끝났는지와 피보험기간에 따라 달라져요. 아래에서 선택하면 바로 알 수 있어요.</P>

      <CheckerShell title="계약만료 후 실업급여 받을 수 있나요?" sub="30초 확인">
        <CheckerQ n="1" label="어떻게 계약이 끝났나요?" group="quit" opts={[
          ["expired", "계약기간이 만료됐거나 회사가 재계약을 거부했어요"],
          ["renewal", "여러 번 갱신했는데 이번에 갱신이 안 됐어요"],
          ["refused", "회사가 재계약하자 했지만 내가 거부했어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="고용보험 피보험기간이 얼마나 됐나요?" group="days" opts={[
          ["enough", "이전 직장 포함 180일 이상이에요"],
          ["short", "180일이 안 될 것 같아요"],
        ]} sel={sel} pick={pick} />

        {result === "expired_enough" && (
          <ResultPass title="실업급여 수급자격이 돼요">
            <P>계약만료는 비자발적 이직으로 분류되고, 피보험기간 180일 이상을 충족하면 수급자격이 생겨요. 퇴사 후 고용24에서 수급자격 신청을 하고, 워크넷 구직 등록 후 고용센터 방문으로 진행하세요.</P>
            <ResultCTA icon="📋" title="고용24 수급자격 신청" desc="온라인으로 바로 신청" href="https://www.ei.go.kr" />
          </ResultPass>
        )}
        {result === "expired_short" && (
          <ResultFail title="피보험기간 180일을 확인해야 해요">
            <P>계약만료로 비자발적 퇴사는 맞지만, 18개월 이내 피보험기간이 180일 이상이어야 해요. 이전 직장 가입기간도 합산되니 고용24에서 전체 피보험기간을 확인하세요.</P>
            <ResultCTA icon="🔍" title="고용24 피보험기간 조회" desc="전체 가입기간 확인" href="https://www.ei.go.kr" />
          </ResultFail>
        )}
        {result === "renewal_enough" && (
          <ResultPass title="갱신 기대권으로 비자발적 이직 인정돼요">
            <P>반복 갱신 후 갑자기 거절당했다면 갱신 기대권이 인정돼요. 비자발적 이직으로 처리돼서 수급자격이 생겨요. 피보험기간 180일 이상도 충족하니 바로 신청하세요.</P>
            <ResultCTA icon="📋" title="고용24 수급자격 신청" desc="온라인으로 바로 신청" href="https://www.ei.go.kr" />
          </ResultPass>
        )}
        {result === "renewal_short" && (
          <ResultFail title="갱신 기대권은 인정되지만 피보험기간을 확인해야 해요">
            <P>갱신 기대권으로 비자발적 이직 인정은 가능하지만 피보험기간 180일이 부족해요. 이전 직장 기간 합산 여부를 고용24에서 확인해보세요.</P>
          </ResultFail>
        )}
        {result === "refused_enough" && (
          <ResultFail title="정당사유 여부를 심사받아야 해요">
            <P>회사가 재계약을 제안했는데 내가 거부했다면 자발적 이직으로 볼 수 있어요. 임금체불, 근로조건 악화, 질병, 가족 사유 등 정당한 이유가 있으면 인정될 수 있어요. 고용센터에서 상담받으세요.</P>
            <ResultCTA icon="💬" title="고용센터 상담" desc="1350 전화 상담" href="https://www.moel.go.kr/policy/policyinfo/benefit/list.do" />
          </ResultFail>
        )}
        {result === "refused_short" && (
          <ResultFail title="수급자격이 되기 어려운 상황이에요">
            <P>내가 재계약을 거부한 경우엔 정당사유 심사가 필요하고, 피보험기간 180일도 안 되면 두 가지 모두 미달이에요. 이전 직장 피보험기간을 합산해서 180일이 되는지 먼저 확인하세요.</P>
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="수급 자격이 됐으면 이제 신청 절차가 궁금하시죠?"
        a="이직확인서를 받은 후 고용24에서 수급자격 인정 신청을 해요."
        label="실업급여 신청 절차 보기"
        href="/w/실업급여-수급자격-인정"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="계약만료로 퇴직하면 무조건 실업급여 받을 수 있나요?" sub="비자발적 이직 인정 · 피보험기간 180일" />
      <P>무조건은 아니지만 대부분 받을 수 있어요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법</A>에서 기간제 계약 종료는 비자발적 이직으로 분류해요. 본인이 그만두고 싶어서 나온 게 아니라, 계약 기간이 끝나서 나온 거니까요.</P>
      <P>피보험기간 180일은 채워야 해요. 이직일 기준 18개월 이내에 고용보험에 가입된 날이 180일 이상이어야 해요. 1년 계약이면 약 250일이라서 충분해요. 6개월 계약이라면 130일 정도라서 이전 직장 기간을 합산해야 할 수 있어요.</P>
      <P>이직확인서에 계약만료로 기재돼야 해요. 회사가 "계약기간 만료" 또는 "갱신 거부(회사)"로 기재하면 비자발적 이직으로 처리돼요. 다른 사유로 기재됐다면 고용센터에 이의를 제기할 수 있어요.</P>
      <P>정규직과 수급 조건이 동일해요. 계약직이라서 수급 조건이 더 엄격하거나 수당 금액이 줄어들지 않아요. 나이, 가입기간, 평균임금으로 동일하게 계산해요.</P>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="재계약 거부했을 때 비자발적 이직으로 인정되나요?" sub="회사 거부 · 본인 거부 차이" />
      <P>누가 거부했느냐에 따라 달라요. 회사가 거부하면 비자발적 이직, 내가 거부하면 자발적 이직으로 볼 수 있어요.</P>
      <TableTitle>재계약 거부 주체별 실업급여 처리</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>거부 주체</THL><TH>이직 분류</TH><TH>수급 여부</TH></tr>
          </thead>
          <tbody>
            {[
              ["회사가 재계약 안 함", "비자발적 이직", "수급 가능"],
              ["여러 번 갱신 후 회사 거절", "갱신 기대권 인정", "수급 가능"],
              ["내가 재계약 거부", "자발적 이직 가능성", "정당사유 심사 필요"],
              ["내가 거부 + 정당사유 있음", "정당한 이직", "인정 시 수급 가능"],
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
      <P>여러 번 갱신해온 계약직이 갑자기 갱신 거절당하면 갱신 기대권이 인정돼요. 3년 이상 반복 갱신했는데 4년차에 거절당했다면 비자발적 이직으로 볼 수 있어요. 이직확인서에 이 상황이 정확히 기재돼야 해요.</P>
      <P>내가 거부한 경우라도 정당한 사유가 있으면 인정돼요. 임금체불, 근로조건 악화, 건강 문제, 가족 돌봄 등 정당한 이유가 있으면 자발적 이직이어도 수급자격이 인정될 수 있어요.</P>

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="계약만료 후 퇴직금과 실업급여 둘 다 받을 수 있나요?" sub="퇴직금 · 실업급여 동시 수급" />
      <P>둘 다 받을 수 있어요. 퇴직금과 실업급여는 별개의 제도예요. 퇴직금은 근로자퇴직급여보장법에 따른 권리이고, 실업급여는 고용보험에서 나와요.</P>
      <P>퇴직금은 1년 이상 근무했을 때 발생해요. 계약 기간이 1년 이상이고 주 15시간 이상 근무했다면 퇴직금을 받을 수 있어요. 계약이 만료됐어도 퇴직금 청구권은 유지돼요.</P>
      <P>수급 중에 퇴직금을 수령해도 실업급여에 영향이 없어요. 퇴직금을 먼저 받고, 실업급여는 이후 신청 기간 내에 별도로 신청하면 돼요. 수급 중 취업활동 상황만 정직하게 신고하면 돼요.</P>
      <P>다만 퇴직금 수령 시기가 실업급여 신청 시점에 영향을 주는 경우는 없어요. 퇴직금과 실업급여는 완전히 독립적으로 처리되는 제도예요.</P>

      <RelatedMid
        hubHref="/w/계약직-실업급여"
        hubLabel="계약직 실업급여 상세 조건 보기"
        items={[
          { icon: "📄", title: "계약직 실업급여 요건", desc: "180일 합산과 재계약 거부 조건", href: "/w/계약직-실업급여" },
          { icon: "📅", title: "실업급여 피보험기간 계산", desc: "이직일 기준 18개월 합산 방법", href: "/w/실업급여-피보험기간-180일-계산" },
          { icon: "✅", title: "실업급여 수급자격 인정", desc: "비자발적 퇴직 신청 절차 안내", href: "/w/실업급여-수급자격-인정" },
        ]}
      />

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="회사가 재계약을 제안했는데 내가 거절하면 어떻게 되나요?" sub="정당사유 심사 · 근로조건 악화 기준" />
      <P>자발적 이직으로 볼 수 있어요. 회사는 연장을 원했는데 내가 거부했다면 수급자격이 제한될 수 있어요. 단, 거부에 정당한 이유가 있다면 달라져요.</P>
      <P>인정되는 정당사유 예시예요. 임금이 20% 이상 삭감되거나, 근로시간·근무지·직무 등 근로조건이 현저히 악화된 경우예요. 통근 시간이 왕복 3시간 이상 늘어난 경우도 해당될 수 있어요. 건강 문제나 가족 돌봄 사유도 인정받을 수 있어요.</P>
      <P>고용센터 심사 면담 시 구체적인 사유와 증빙 자료를 제출해야 해요. 근로조건 변경 통보 문서, 임금 명세서, 진단서 등을 준비하면 좋아요. 퇴사 전에 고용센터(1350)에 상담해서 본인 상황이 정당사유에 해당하는지 확인하는 게 가장 안전해요.</P>
      <P>불인정 결정이 나오면 90일 이내에 이의신청을 할 수 있어요. 추가 증빙을 보완해서 재심사를 받을 수 있어요.</P>

      <ExtBtn badge="고용24 공식" text="계약직 수급자격 신청" cta="신청하기 →" href="https://www.ei.go.kr" />

      <FAQAccordion items={meta.faq} />
      <RelatedArticles items={[
        { title: "실업급여 수급자격 신청 절차", desc: "비자발적 퇴직 조건과 신청 방법", href: "/w/실업급여-수급자격-인정" },
        { title: "계약직 실업급여 신청 요건", desc: "180일 합산과 계약만료 조건", href: "/w/계약직-실업급여" },
      ]} />
      <PrevNext
        prev={{ title: "건설일용근로자 신청 절차", href: "/w/실업급여-건설일용직" }}
        next={{ title: "계약직 실업급여 180일 합산", href: "/w/계약직-실업급여" }}
      />
    </BlogLayout>
  );
}
