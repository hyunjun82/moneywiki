"use client";
import React, { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
  ChipsGrid,
} from "@/components/wiki/BlogShared";

/* ───── meta ───── */
export const meta = {
  title: "실업급여 임금삭감 퇴직 정당사유 | 20% 기준 2개월 인정 조건",
  description:
    "임금이 20% 넘게 깎이면 실업급여 정당사유가 된다는 거 아세요? 2개월 이상 지속 조건과 증빙 서류까지 정리했어요.",
  category: "실업급여",
  keywords: ["실업급여 임금삭감", "퇴직 정당사유", "20% 기준", "2개월 인정"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-25",
  datePublished: "2026-02-25",
  summary: [
    "종전 임금 대비 20% 이상 삭감되면 정당한 이직사유로 인정돼요",
    "삭감이 이직일 전 1년 이내에 2개월 이상 지속돼야 해요",
    "급여명세서·근로계약서 등 삭감 전후 비교 증빙이 필수예요",
  ],
  sources: [
    { name: "고용보험법 시행규칙 별표2", url: "https://www.law.go.kr/lsInfoP.do?lsiSeq=246268", date: "2024-01" },
    { name: "고용보험법 제40조", url: "https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1000011086", date: "2024-01" },
  ],
  faq: [
    {
      q: "실업급여 임금삭감 기본급이 아니라 수당만 깎여도 정당사유가 되나요?",
      a: "네, 해당돼요. 기본급뿐 아니라 수당·성과급을 포함한 총 임금이 20% 이상 줄었으면 정당사유로 인정돼요. 고용센터에서는 삭감 전후 총 지급액을 기준으로 판단해요.",
    },
    {
      q: "실업급여 임금삭감에 동의했는데 나중에 퇴직해도 정당사유가 되나요?",
      a: "동의 경위에 따라 달라져요. 사실상 거부할 수 없는 상황에서 서명했다면 인정될 수 있어요. 다만 본인이 적극적으로 동의한 경우에는 인정이 어려울 수 있어요.",
    },
  ],
  ctaCard: {
    label: "30초 판정",
    mainText: "20% 이상 + 2개월 지속",
    subText: "내 상황 해당 여부 확인",
    url: "#checker",
    external: false,
  },
  relatedDocs: [
    { title: "실업급여 수급 조건 정리", url: "/w/실업급여-수급-조건" },
  ],
};

/* ───── checker ───── */
type Ans = Record<string, string>;
function getResult(a: Ans) {
  if (!a.cutType || !a.cutRate || !a.duration || !a.evidence) return null;

  const rateOk = a.cutRate === "over20";
  const durationOk = a.duration === "over2m";
  const evidenceOk = a.evidence !== "none";
  const typeLabel = a.cutType === "base" ? "기본급" : a.cutType === "bonus" ? "수당·성과급" : "전체 연봉";

  if (rateOk && durationOk) {
    return (
      <ResultPass title="정당사유 인정 가능성이 높아요" desc={`${typeLabel} 20% 이상 삭감이 2개월 넘게 지속됐어요. ${evidenceOk ? "증빙 서류도 있으니" : "증빙 서류를 보완하면"} 고용센터에서 인정받을 가능성이 높아요.`}>
        <ResultGrid items={[
          { icon: "📉", name: "삭감 비율", pass: true, desc: "20% 이상" },
          { icon: "⏱️", name: "지속 기간", pass: true, desc: "2개월 이상" },
          { icon: "📋", name: "증빙 서류", pass: evidenceOk, desc: evidenceOk ? "보유" : "보완 필요" },
          { icon: "🚪", name: "퇴직 경위", pass: true, desc: `${typeLabel} 삭감` },
        ]} />
        <ResultCTA icon="📊" title="실업급여 수급 조건 전체 확인" desc="피보험기간·퇴직사유 기준" href="/w/실업급여-수급-조건" />
        <ResultCTA icon="📝" title="실업급여 신청 방법 절차" desc="고용24 온라인 5단계 안내" href="/w/실업급여-신청방법" />
        <ResultCTA icon="🔢" title="예상 수령액 계산" desc="연봉별 실업급여 금액 확인" href="/w/실업급여-연봉별-계산" />
        <ResultCTA icon="📂" title="직장내 괴롭힘 정당사유" desc="괴롭힘 퇴직 정당사유 인정 기준" href="/w/실업급여-직장내-괴롭힘-퇴직-정당사유" />
      </ResultPass>
    );
  }

  const items = [
    { icon: "📉", name: "삭감 비율", pass: rateOk, desc: rateOk ? "20% 이상" : (a.cutRate === "10to20" ? "10~20% (경계 구간)" : "10% 미만") },
    { icon: "⏱️", name: "지속 기간", pass: durationOk, desc: durationOk ? "2개월 이상" : "2개월 미만" },
    { icon: "📋", name: "증빙 서류", pass: evidenceOk, desc: evidenceOk ? "보유" : "없음" },
    { icon: "🚪", name: "퇴직 경위", pass: rateOk && durationOk, desc: `${typeLabel} 삭감` },
  ];

  return (
    <ResultFail title="일부 조건이 부족해요" desc="아래 항목을 확인하고 부족한 부분을 보완하면 인정받을 수 있어요.">
      <ResultGrid items={items} />
      <div style={{ marginTop: 16 }}>
        <ResultCTA icon="📊" title="수급자격 제한 사유 확인" desc="자발적 퇴직 예외 11가지" href="/w/실업급여-수급자격제한" />
        <ResultCTA icon="📋" title="직장내 괴롭힘 정당사유" desc="괴롭힘 퇴직 인정 기준" href="/w/실업급여-직장내-괴롭힘-퇴직-정당사유" />
        <ResultCTA icon="💰" title="임금체불 퇴직 정당사유" desc="2개월 이상 체불 시 인정 기준" href="/w/실업급여-임금체불-퇴직-정당사유" />
        <ResultCTA icon="🔍" title="이의신청 심사청구 절차" desc="불인정 시 90일 이내 이의제기" href="/w/실업급여-이의신청-심사청구-재심사-불복-절차" />
      </div>
    </ResultFail>
  );
}

/* ───── component ───── */
export default function Article81() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "퇴직사유", "임금삭감"]}
      tags={["2026년 기준", "실업급여", "임금삭감"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={
        <>
          회사에서 갑자기 월급을 깎겠다고 하면 당혹스러울 수밖에 없어요. <A href="https://www.law.go.kr/lsInfoP.do?lsiSeq=246268">고용보험법 시행규칙 별표2</A>에서는 임금삭감 퇴직을 <B>정당한 이직사유</B>로 인정해요. 20% 기준 계산법부터 2개월 조건, 증빙 서류까지 정리했어요.
        </>
      }
      sourceBar={{
        badge: "법령 근거",
        name: "고용보험법 시행규칙 별표2",
        date: "2024.01 개정",
      }}
      stickyLabel="임금삭감"
      stickyValue="20% + 2개월"
      stickyBtn="내 상황 확인 ↑"
      disclaimer="이 글은 고용보험법 시행규칙을 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 정확한 판정은 관할 고용센터에서 진행하세요."
      sidebar={
        <>
          <SidebarCTA
            items={[
              { icon: "💰", title: "내 숨은 환급금 찾기", sub: "평균 13만원 환급", href: "/w/환급금-찾기", hot: true },
              { icon: "🏛️", title: "2026 정부지원금", sub: "30개+ 지원금", href: "/w/정부지원금" },
              { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
            ]}
          />
          <SidebarDocs
            items={[
              { title: "실업급여 수급 조건 정리", cat: "실업급여·수급자격", href: "/w/실업급여-수급-조건" },
              { title: "실업급여 신청 방법 절차", cat: "실업급여·신청", href: "/w/실업급여-신청방법" },
              { title: "임금체불 퇴직 정당사유", cat: "실업급여·퇴직사유", href: "/w/실업급여-임금체불-퇴직-정당사유" },
            ]}
          />
          <SidebarCalc
            items={[
              { title: "실업급여 계산기", href: "/calculators/실업급여-계산기" },
              { title: "퇴직금 계산기", href: "/calculators/퇴직금-계산기" },
              { title: "연말정산 계산기", href: "/calculators/연말정산-계산기" },
              { title: "양도소득세 계산기", href: "/calculators/양도소득세-계산기" },
              { title: "대출이자 계산기", href: "/calculators/대출이자-계산기" },
            ]}
          />
        </>
      }
    >
      {/* ── TOC ── */}
      <TOC
        items={[
          { t: "내 임금삭감이 정당사유에 해당하는지 간편 체크", sub: null },
          { t: "임금삭감 퇴직은 정당사유로 인정되나요?", sub: "법적 근거 · 인정되는 삭감 유형 3가지" },
          { t: "20% 기준은 어떻게 계산하나요?", sub: "기본 계산 공식 · 삭감 비율별 인정 가능성" },
          { t: "2개월 인정 조건이 뭐예요?", sub: "이직일 전 1년 이내 기준 · 비연속 합산 가능" },
          { t: "증빙 서류는 뭐가 필요한가요?", sub: "서류 체크리스트 · 없을 때 대처 방법" },
          { t: "자주 묻는 질문", sub: null },
        ]}
      />

      {/* ── Summary3 ── */}
      <Summary3
        items={[
          "종전 임금 대비 20% 이상 삭감되면 정당한 이직사유로 인정돼요",
          "삭감이 이직일 전 1년 이내에 2개월 이상 지속돼야 해요",
          "급여명세서·근로계약서 등 삭감 전후 비교 증빙이 필수예요",
        ]}
      />

      {/* ══════ STEP 01 — 체커 ══════ */}
      <Sec n={1} id="checker" title="내 임금삭감이 정당사유에 해당하는지 간편 체크" sub="삭감 유형·비율·기간·증빙 4가지만 선택하면 돼요">
        <P>
          임금삭감으로 퇴사했다고 해서 무조건 정당사유가 되는 건 아니에요. 고용센터에서는 삭감 비율, 지속 기간, 증빙 서류를 종합적으로 판단해요. 아래 체커로 내 상황이 인정 가능성이 있는지 먼저 확인해보세요.
        </P>
        <P>
          체커 결과는 참고용이에요. 최종 판정은 관할 고용센터에서 이직확인서와 증빙서류를 검토한 뒤 결정돼요.
        </P>

        <CheckerShell title="임금삭감 정당사유 판정" subtitle="30초 확인">
          <CheckerQ n={1} label="임금이 어떻게 삭감됐나요?" group="cutType"
            opts={[["base", "기본급이 깎였어요"], ["bonus", "수당·성과급이 없어졌어요"], ["total", "전체 연봉이 삭감됐어요"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n={2} label="삭감 비율이 어느 정도인가요?" group="cutRate"
            opts={[["over20", "20% 이상 삭감"], ["10to20", "10~20% 삭감"], ["under10", "10% 미만 삭감"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n={3} label="삭감이 얼마나 지속됐나요?" group="duration"
            opts={[["over2m", "2개월 이상 지속"], ["under2m", "2개월 미만"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n={4} label="삭감 증빙 서류가 있나요?" group="evidence"
            opts={[["full", "급여명세서 있어요"], ["contract", "근로계약서만 있어요"], ["none", "아무것도 없어요"]]}
            sel={ans} pick={pick}
          />
          {result}
        </CheckerShell>
      </Sec>

      <Divider />

      {/* ══════ SECTION 02 — 정당사유 인정 여부 ══════ */}
      <Sec n={2} id="valid-reason" title="임금삭감 퇴직은 정당사유로 인정되나요?" sub="법적 근거와 인정되는 삭감 유형 3가지를 알아볼게요">
        <P>
          <A href="https://www.law.go.kr/lsInfoP.do?lsiSeq=246268">고용보험법 시행규칙 별표2</A>에서는 "실제 근로조건이 채용 시 제시된 조건이나 일반적으로 적용받던 조건보다 낮아지게 된 경우"를 정당한 이직사유로 규정하고 있어요. 임금삭감은 이 조건에 해당하는 대표적인 사례예요.
        </P>
        <P>
          법조문에는 구체적인 삭감 비율이 명시되어 있지 않지만, 고용센터 실무에서는 <B>종전 임금 대비 20% 이상 삭감</B>을 유의미한 기준으로 적용하는 경우가 많아요. 10~20% 삭감은 개별 사안에 따라 판단이 갈리는 구간이에요.
        </P>
        <P>
          중요한 건, 단순히 임금이 줄었다고 바로 인정되는 게 아니라는 점이에요. 삭감이 <B>이직일 전 1년 이내에 2개월 이상</B> 지속돼야 한다는 시간 요건도 함께 충족해야 해요.
        </P>

        <H3>인정되는 삭감 유형 3가지</H3>
        <P>
          첫째, <B>기본급 삭감</B>이에요. 가장 명확한 케이스로, 월급이 300만원에서 240만원으로 줄면 20% 삭감이에요. 둘째, <B>수당·성과급 폐지</B>예요. 기본급은 그대로인데 직무수당, 야근수당, 식대 등이 없어져서 총 임금이 줄어도 해당돼요. 셋째, <B>연봉 재계약 시 삭감</B>이에요. 연봉 협상에서 회사가 일방적으로 삭감을 통보한 경우가 여기에 해당해요.
        </P>

        <Info type="warn">{"<strong>주의:</strong> 연봉 동결은 삭감이 아니에요. 작년과 올해 연봉이 같다고 해서 정당사유가 되는 건 아니에요. 실제로 기존보다 줄어야 해요."}</Info>

        <InlineLink icon="📋" title="수급자격 제한 사유 전체 보기" desc="자발적 퇴직도 예외가 있는 11가지 사유" href="/w/실업급여-수급자격제한" />
      </Sec>

      <Divider />

      {/* ══════ SECTION 03 — 20% 기준 ══════ */}
      <Sec n={3} id="cut-rate" title="20% 기준은 어떻게 계산하나요?" sub="기본급+수당 포함 총 임금으로 비교해요">
        <P>
          삭감 비율은 삭감 전 총 임금과 삭감 후 총 임금을 비교해서 계산해요. 기본급, 수당, 성과급을 모두 합한 총 지급액이 기준이에요. 기본급만 보는 게 아니라 통장에 실제로 찍히는 총액으로 비교한다고 생각하면 돼요.
        </P>

        <H3>기본 계산 공식</H3>
        <P>
          공식은 간단해요. <B>(삭감 전 월 총 임금 − 삭감 후 월 총 임금) ÷ 삭감 전 월 총 임금 × 100</B>이에요. 예를 들어 월급이 350만원에서 270만원으로 줄었으면 (350 − 270) ÷ 350 × 100 = 22.9%예요. 20% 이상이니 정당사유에 해당할 수 있어요.
        </P>
        <P>
          주의할 점은 세전 총액으로 비교한다는 거예요. 실수령액이 아니라 세금 공제 전 급여총액이 기준이에요. 급여명세서의 "지급총액" 항목을 보면 정확한 금액을 알 수 있어요.
        </P>

        <H3>삭감 비율별 인정 가능성</H3>
        <P>
          20% 이상 삭감이면 인정 가능성이 높아요. 10~20% 구간은 동종업계 같은 직급의 평균 임금보다 현저히 낮다는 점을 추가로 소명하면 인정 가능성이 올라가요. 고용노동부의 업종별 임금 실태조사 자료를 참고할 수 있어요. 10% 미만은 현저한 저하로 보기 어려워서 단독으로는 인정이 어려워요.
        </P>

        <Info type="tip">{"<strong>팁:</strong> 수당 삭감도 포함해서 계산하세요. 야근수당, 교통비, 식대가 없어졌다면 그것도 총 임금 감소분에 포함돼요."}</Info>

        <BridgeCard
          q="20% 이상 삭감인데, 실업급여 수급 조건을 전체적으로 확인하고 싶다면?"
          a="피보험기간 180일 이상 + 비자발적 퇴사 조건도 동시에 충족해야 해요."
          label="실업급여 수급 조건 보기"
          href="/w/실업급여-수급-조건"
        />
      </Sec>

      {/* ── RelatedMid (SECTION 03-04 사이) ── */}
      <RelatedMid
        title="다른 퇴직사유 글도 비교해 보세요"
        items={[
          { icon: "💰", title: "임금체불 퇴직 정당사유", desc: "2개월 이상 체불 시 인정 기준", href: "/w/실업급여-임금체불-퇴직-정당사유" },
          { icon: "😔", title: "직장내 괴롭힘 정당사유", desc: "괴롭힘 증빙서류·신고 절차", href: "/w/실업급여-직장내-괴롭힘-퇴직-정당사유" },
          { icon: "🔍", title: "이의신청 심사청구 절차", desc: "불인정 시 90일 이내 이의제기", href: "/w/실업급여-이의신청-심사청구-재심사-불복-절차" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      {/* ══════ SECTION 04 — 2개월 조건 ══════ */}
      <Sec n={4} id="two-months" title="2개월 인정 조건이 뭐예요?" sub="이직일 전 1년 이내, 비연속 발생도 합산 가능해요">
        <P>
          임금삭감이 있었다 해도 짧은 기간에 끝났으면 정당사유로 인정받기 어려워요. <A href="https://www.law.go.kr/lsInfoP.do?lsiSeq=246268">고용보험법 시행규칙 별표2</A>에서는 "이직일 전 1년 이내에 2개월 이상 발생"한 경우를 요건으로 정하고 있어요.
        </P>

        <H3>이직일 전 1년 이내 기준</H3>
        <P>
          "이직일 전 1년"은 퇴직일을 기준으로 거꾸로 12개월을 계산해요. 예를 들어 2026년 6월 30일에 퇴직한다면 2025년 7월 1일부터 2026년 6월 30일까지가 기준 기간이에요. 이 안에 임금삭감이 2개월 이상 있어야 해요. 1년보다 더 이전에 삭감이 있었어도 기준 기간 밖이면 인정되지 않아요.
        </P>

        <H3>비연속 합산 가능</H3>
        <P>
          2개월이 꼭 연속일 필요는 없어요. 예를 들어 3월에 삭감됐다가 4월에 원복, 6~7월에 다시 삭감됐으면 삭감 상태인 달을 합산해서 3개월로 계산돼요. 이직일 전 1년 안에 삭감 상태가 총 2개월 이상이면 조건을 충족해요. 다만 연속 2개월 이상 삭감이 있는 경우가 더 인정받기 쉬워서, 비연속 삭감은 추가 소명이 필요할 수 있어요.
        </P>

        <Info type="tip">{"<strong>팁:</strong> 삭감이 막 시작됐다면 2개월을 채운 뒤에 퇴사하는 게 유리해요. 1개월 29일만에 퇴사하면 조건 미충족으로 정당사유가 인정되지 않아요."}</Info>

        <InlineLink icon="📊" title="실업급여 수급 조건 전체 확인" desc="피보험기간·퇴직사유 기준 한눈에" href="/w/실업급여-수급-조건" />
      </Sec>

      <Divider />

      {/* ══════ SECTION 05 — 증빙 서류 ══════ */}
      <Sec n={5} id="documents" title="증빙 서류는 뭐가 필요한가요?" sub="급여명세서가 핵심이고, 없을 때 대처 방법도 있어요">
        <P>
          임금삭감으로 정당사유를 주장하려면 "삭감 전"과 "삭감 후"를 비교할 수 있는 서류가 필수예요. 고용센터에서 구두 주장만으로 인정해주지 않기 때문에, 삭감 사실을 객관적으로 증명할 서류를 미리 확보해두는 게 중요해요.
        </P>

        <TableTitle>증빙 서류 체크리스트</TableTitle>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 400 }}>
          <thead>
            <tr>
              <THL>서류명</THL>
              <TH>용도</TH>
              <TH>필수 여부</TH>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>급여명세서 (삭감 전·후)</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>총 임금 비교, 삭감 비율 산정</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>필수</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>근로계약서 (변경 전·후)</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>계약 조건 변경 확인</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>권장</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>임금삭감 통보서</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>회사의 일방적 통보 증빙</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>있으면 유리</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>급여 입금 통장 내역</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>실제 지급액 변동 확인</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>보조 자료</td>
            </tr>
          </tbody>
        </table>
        <TableNote>급여명세서가 가장 핵심이에요. 삭감 전 2~3개월 + 삭감 후 2개월분을 준비하세요.</TableNote>

        <H3>서류가 없을 때 대처 방법</H3>
        <P>
          급여명세서를 회사에서 안 줬다면 고용노동부에 <B>임금명세서 미교부 진정</B>을 할 수 있어요. 근로기준법 제48조에 따라 사업주는 임금을 지급할 때 임금명세서를 교부할 의무가 있어요. 진정을 통해 서류를 확보하는 방법이 있어요.
        </P>
        <P>
          통장 입금 내역도 보조 증빙으로 활용할 수 있어요. 매달 회사에서 이체된 금액이 줄어든 내역이 있으면, 급여명세서가 없더라도 삭감 사실을 간접적으로 증명할 수 있어요. 모바일 뱅킹에서 입금 이력을 캡처해두세요.
        </P>
        <P>
          카카오톡이나 이메일로 임금삭감을 통보받은 기록도 증빙이 돼요. 구두 통보만 있었다면 내용을 정리해서 본인이 기록해두고, 가능하다면 동료의 확인서를 함께 확보하는 것도 방법이에요.
        </P>

        <Info type="warn">{"<strong>주의:</strong> 퇴사 전에 서류를 확보하세요. 퇴사 후에는 회사에서 서류 발급을 거부하는 경우가 많아요. 재직 중에 미리 챙기는 게 가장 안전해요."}</Info>

        <BridgeCard
          q="실업급여가 불인정됐다면 이의신청을 할 수 있어요"
          a="처분 통보를 받은 날부터 90일 이내에 심사청구를 할 수 있어요. 비용은 무료예요."
          label="이의신청 절차 보기"
          href="/w/실업급여-이의신청-심사청구-재심사-불복-절차"
        />

        <ExtBtn
          badge="고용보험 공식"
          text="실업급여 수급자격 인터넷 신청"
          cta="신청하기 →"
          href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do"
        />
      </Sec>

      <Divider />

      {/* ══════ FAQ ══════ */}
      <Sec n={6} id="faq" title="자주 묻는 질문" sub="">
        <FAQAccordion items={meta.faq} />
      </Sec>

      {/* ── 하단 네비 ── */}
      <RelatedArticles
        items={[
          { title: "실업급여 수급 조건 정리", cat: "실업급여·수급자격", href: "/w/실업급여-수급-조건" },
          { title: "임금체불 퇴직 정당사유 인정 기준", cat: "실업급여·퇴직사유", href: "/w/실업급여-임금체불-퇴직-정당사유" },
          { title: "직장내 괴롭힘 퇴직 정당사유", cat: "실업급여·퇴직사유", href: "/w/실업급여-직장내-괴롭힘-퇴직-정당사유" },
          { title: "이의신청 심사청구 재심사 절차", cat: "실업급여·불복절차", href: "/w/실업급여-이의신청-심사청구-재심사-불복-절차" },
          { title: "수급자격 제한 사유 11가지", cat: "실업급여·수급자격", href: "/w/실업급여-수급자격제한" },
        ]}
      />
      <PrevNext
        prev={{ title: "수급자격 제한 사유", href: "/w/실업급여-수급자격제한" }}
        next={{ title: "이의신청 심사청구 절차", href: "/w/실업급여-이의신청-심사청구-재심사-불복-절차" }}
      />
    </BlogLayout>
  );
}
