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
  title: "실업급여 불인정 이의신청 방법 | 심사청구 재심사 90일 기한",
  description:
    "실업급여 불인정 통보를 받으면 90일 안에 이의를 제기할 수 있어요. 심사청구부터 행정소송까지 단계별 절차를 정리했어요.",
  category: "실업급여",
  keywords: ["실업급여 이의신청", "불인정 방법", "심사청구 재심사", "90일 기한"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-25",
  datePublished: "2026-02-25",
  summary: [
    "고용센터 처분을 안 날부터 90일 이내에 심사청구할 수 있어요",
    "심사관 결정에 불만이면 재심사청구(고용보험심사위원회)를 제기해요",
    "심사청구·재심사청구 모두 무료이고, 비용 부담이 없어요",
  ],
  sources: [
    { name: "고용보험법 제87조", url: "https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1000011133", date: "2024-01" },
    { name: "고용보험법 제88조", url: "https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1000011134", date: "2024-01" },
    { name: "고용보험심사위원회 공식 포털", url: "https://eiac.ei.go.kr", date: "2026-02" },
  ],
  faq: [
    {
      q: "실업급여 이의신청 비용이 드나요?",
      a: "아니요, 심사청구와 재심사청구 모두 무료예요. 별도의 수수료나 인지대가 없어요. 다만 행정소송으로 가면 소송비용이 발생해요.",
    },
    {
      q: "실업급여 이의신청에 변호사가 꼭 필요한가요?",
      a: "법적으로 의무는 아니에요. 본인이 직접 심사청구서를 작성해서 제출할 수 있어요. 사안이 복잡하면 대한법률구조공단(전화 132)에서 무료 상담을 받을 수 있어요.",
    },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "처분 통보 후 90일 기한",
    subText: "내 이의신청 가능 여부 확인",
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
  if (!a.reason || !a.timing || !a.stage || !a.evidence) return null;

  const timingOk = a.timing === "within90";
  const evidenceOk = a.evidence === "enough";
  const isRejected = a.stage === "rejected";
  const reasonLabel = a.reason === "deny" ? "수급자격 불인정" : a.reason === "amount" ? "급여액 이의" : "부정수급 환수";

  if (!timingOk) {
    return (
      <ResultFail title="90일 기한이 지났어요" desc="원칙적으로 기한 도과 시 심사청구가 각하돼요. 천재지변·중대 질병 등 본인 책임이 없는 사유가 있으면 사유 해소 후 14일 이내에 예외 신청이 가능해요.">
        <ResultGrid items={[
          { icon: "⏱️", name: "기한 상태", pass: false, desc: "90일 초과" },
          { icon: "📋", name: "사유", pass: false, desc: reasonLabel },
          { icon: "📎", name: "증빙 서류", pass: evidenceOk, desc: evidenceOk ? "있음" : "부족" },
          { icon: "🔄", name: "진행 단계", pass: false, desc: isRejected ? "심사 기각됨" : "미신청" },
        ]} />
        <div style={{ marginTop: 16 }}>
          <ResultCTA icon="📊" title="실업급여 수급 조건 재확인" desc="피보험기간·퇴직사유 기준" href="/w/실업급여-수급-조건" />
          <ResultCTA icon="📋" title="수급자격 제한 사유" desc="자발적 퇴직 예외 11가지" href="/w/실업급여-수급자격제한" />
          <ResultCTA icon="🏛️" title="대한법률구조공단 무료 상담" desc="복잡한 사안은 132번 상담" href="https://www.klac.or.kr" />
          <ResultCTA icon="🔢" title="피보험기간 180일 계산" desc="이전 직장 합산 방법 확인" href="/w/실업급여-피보험기간-180일-계산" />
        </div>
      </ResultFail>
    );
  }

  if (isRejected) {
    return (
      <ResultPass title="재심사청구를 제기할 수 있어요" desc={`심사관 결정을 안 날부터 90일 이내에 고용보험심사위원회에 재심사청구서를 제출하세요. ${evidenceOk ? "증빙 서류가 있으니 새로운 증거를 추가해서 제출하면 유리해요." : "부족한 증빙 서류를 먼저 보완하세요."}`}>
        <ResultGrid items={[
          { icon: "⏱️", name: "기한 상태", pass: true, desc: "90일 이내" },
          { icon: "📋", name: "사유", pass: true, desc: reasonLabel },
          { icon: "📎", name: "증빙 서류", pass: evidenceOk, desc: evidenceOk ? "있음" : "보완 필요" },
          { icon: "🔄", name: "진행 단계", pass: true, desc: "재심사청구 가능" },
        ]} />
        <ResultCTA icon="🏛️" title="고용보험심사위원회 재심사청구" desc="온라인 재심사청구 안내" href="https://eiac.ei.go.kr" />
        <ResultCTA icon="📊" title="수급자격 제한 사유 확인" desc="불인정 사유에 해당하는지" href="/w/실업급여-수급자격제한" />
        <ResultCTA icon="📝" title="실업급여 신청 방법" desc="재신청 방법 단계별 안내" href="/w/실업급여-신청방법" />
        <ResultCTA icon="🔢" title="피보험기간 180일 계산" desc="이전 직장 합산 방법 확인" href="/w/실업급여-피보험기간-180일-계산" />
      </ResultPass>
    );
  }

  return (
    <ResultPass title="심사청구를 진행할 수 있어요" desc={`${reasonLabel} 사유로 심사청구가 가능해요. ${evidenceOk ? "증빙 서류도 있으니 관할 고용센터에 심사청구서를 제출하세요." : "증빙 서류를 먼저 확보한 뒤 제출하면 인정 가능성이 높아져요."}`}>
      <ResultGrid items={[
        { icon: "⏱️", name: "기한 상태", pass: true, desc: "90일 이내" },
        { icon: "📋", name: "사유", pass: true, desc: reasonLabel },
        { icon: "📎", name: "증빙 서류", pass: evidenceOk, desc: evidenceOk ? "있음" : "보완 필요" },
        { icon: "🔄", name: "진행 단계", pass: true, desc: "심사청구 가능" },
      ]} />
      <ResultCTA icon="📄" title="실업급여 구비서류 안내" desc="심사청구 시 필요한 서류 목록" href="/w/실업급여-구비서류" />
      <ResultCTA icon="📊" title="수급자격 제한 사유 확인" desc="불인정 사유에 해당하는지" href="/w/실업급여-수급자격제한" />
      <ResultCTA icon="📝" title="실업급여 신청 방법" desc="수급자격 인정 재신청 안내" href="/w/실업급여-신청방법" />
      <ResultCTA icon="🔢" title="피보험기간 180일 계산" desc="이전 직장 합산 방법 확인" href="/w/실업급여-피보험기간-180일-계산" />
    </ResultPass>
  );
}

/* ───── component ───── */
export default function Article82() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "불복절차", "이의신청"]}
      tags={["2026년 기준", "실업급여", "이의신청"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={
        <>
          실업급여 수급자격이 불인정됐다고 해서 바로 포기할 필요는 없어요. <A href="https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1000011133">고용보험법 제87조</A>에 따라 심사청구, 재심사청구, 행정소송까지 3단계 불복 절차가 있어요. 90일 기한부터 단계별 절차까지 정리했어요.
        </>
      }
      sourceBar={{
        badge: "법령 근거",
        name: "고용보험법 제87조·제88조",
        date: "2024.01 기준",
      }}
      stickyLabel="이의신청"
      stickyValue="90일 이내 무료"
      stickyBtn="내 상황 확인 ↑"
      disclaimer="이 글은 고용보험법을 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 복잡한 사안은 대한법률구조공단(132번)에서 무료 상담을 받으세요."
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
              { title: "수급자격 제한 사유", cat: "실업급여·불인정", href: "/w/실업급여-수급자격제한" },
              { title: "실업급여 신청 방법 절차", cat: "실업급여·신청", href: "/w/실업급여-신청방법" },
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
          { t: "내 불복 절차 진행 가능 여부 간편 체크", sub: null },
          { t: "이의신청은 어떻게 하나요?", sub: "불복 3단계 흐름 · 심사청구서 작성 방법" },
          { t: "심사청구 90일 기한은 언제부터인가요?", sub: "기산점 계산법 · 심사 결정 기간 30일" },
          { t: "재심사청구는 언제 할 수 있나요?", sub: "제출처 3곳 선택 · 결정 기간 50일" },
          { t: "90일 기한을 넘기면 어떻게 되나요?", sub: "예외 사유 · 행정소송 마지막 방법" },
          { t: "자주 묻는 질문", sub: null },
        ]}
      />

      {/* ── Summary3 ── */}
      <Summary3
        items={[
          "고용센터 처분을 안 날부터 90일 이내에 심사청구할 수 있어요",
          "심사관 결정에 불만이면 재심사청구(고용보험심사위원회)를 제기해요",
          "심사청구·재심사청구 모두 무료이고, 비용 부담이 없어요",
        ]}
      />

      {/* ══════ STEP 01 — 체커 ══════ */}
      <Sec n={1} id="checker" title="내 불복 절차 진행 가능 여부 간편 체크" sub="불복 사유·기한·단계·증빙 4가지만 선택하면 돼요">
        <P>
          실업급여 불인정 후 이의신청이 가능한지는 기한, 처분 사유, 증빙 서류 유무에 따라 달라져요. 90일 기한을 넘기면 원칙적으로 이의신청이 불가능해요. 아래 체커로 현재 상황을 먼저 확인해보세요.
        </P>
        <P>
          체커 결과는 참고용이에요. 정확한 절차와 가능 여부는 관할 고용센터 또는 고용보험심사위원회에서 확인하는 게 좋아요.
        </P>

        <CheckerShell title="이의신청 절차 체크" subtitle="30초 확인">
          <CheckerQ n={1} label="어떤 처분에 이의가 있나요?" group="reason"
            opts={[["deny", "수급자격 불인정"], ["amount", "급여액 산정 이의"], ["return", "부정수급 환수 처분"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n={2} label="처분 통보를 받은 지 얼마나 됐나요?" group="timing"
            opts={[["within90", "90일 이내"], ["over90", "90일 초과"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n={3} label="심사청구를 이미 했나요?" group="stage"
            opts={[["notyet", "아직 안 했어요"], ["rejected", "했는데 기각됐어요"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n={4} label="증빙 서류가 있나요?" group="evidence"
            opts={[["enough", "이직확인서·급여명세서 등 있어요"], ["lack", "부족하거나 없어요"]]}
            sel={ans} pick={pick}
          />
          {result}
        </CheckerShell>
      </Sec>

      <Divider />

      {/* ══════ SECTION 02 — 이의신청 방법 ══════ */}
      <Sec n={2} id="appeal-method" title="이의신청은 어떻게 하나요?" sub="불복 3단계 흐름과 심사청구서 작성 포인트를 알아볼게요">
        <P>
          고용센터의 처분에 불만이 있으면 <B>심사청구 → 재심사청구 → 행정소송</B> 순서로 불복할 수 있어요. 각 단계마다 90일의 기한이 있고, 앞 단계를 거치지 않으면 다음 단계로 갈 수 없어요.
        </P>

        <H3>불복 절차 3단계 흐름</H3>
        <P>
          첫 번째 단계인 <B>심사청구</B>는 관할 고용센터에 심사청구서를 제출하는 거예요. 심사청구를 받은 고용보험심사관이 30일 이내에 결정을 내려요. 두 번째 단계인 <B>재심사청구</B>는 심사관 결정이 불만일 때 고용보험심사위원회에 제기하는 거예요. 위원회가 50일 이내에 결정해요.
        </P>
        <P>
          세 번째 단계인 <B>행정소송</B>은 재심사 결정에도 불복할 때 관할 법원에 소송을 제기하는 방법이에요. 소송비용이 발생하고 절차가 복잡해지니, 대부분의 경우 심사청구와 재심사청구 단계에서 해결하는 게 좋아요.
        </P>

        <H3>심사청구서 작성 포인트</H3>
        <P>
          심사청구서에는 본인의 이름, 주소, 주민등록번호, 처분 내용, 그리고 이의를 제기하는 이유를 써야 해요. 가장 중요한 건 <B>"왜 고용센터의 판단이 잘못됐는지"</B>를 구체적으로 설명하는 부분이에요. 단순히 "억울하다"가 아니라 법적 근거와 증거를 함께 제시해야 해요. 예를 들어 임금체불로 퇴사했는데 자발적 퇴사로 처리됐다면, 별표2 조항과 급여명세서·통장 내역 등 증빙을 함께 첨부하세요.
        </P>

        <Info type="tip">{"<strong>팁:</strong> 심사청구서 양식은 고용센터에서 받을 수 있어요. 양식 없이 자유 형식으로 작성해도 접수는 가능하지만, 양식을 활용하면 빠뜨리는 항목 없이 작성할 수 있어요."}</Info>

        <InlineLink icon="📋" title="수급자격 제한 사유 전체 보기" desc="불인정 사유에 해당하는지 먼저 확인" href="/w/실업급여-수급자격제한" />
      </Sec>

      <Divider />

      {/* ══════ SECTION 03 — 90일 기한 ══════ */}
      <Sec n={3} id="review-90days" title="심사청구 90일 기한은 언제부터인가요?" sub="기산점이 중요해요 — 처분을 안 날부터 계산돼요">
        <P>
          90일 기한의 시작점(기산점)이 언제인지 정확히 아는 게 가장 중요해요. 기한을 하루라도 넘기면 심사청구 자체가 각하되기 때문이에요.
        </P>

        <H3>기산점 계산법</H3>
        <P>
          기한은 <A href="https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1000011133">고용보험법 제87조</A>에 따라 <B>"처분이 있음을 안 날"</B>부터 시작돼요. 보통은 고용센터에서 처분 결과를 통보한 날이에요. 우편으로 받았다면 우편물 수령일, 고용24에서 확인했다면 로그인해서 열람한 날이 기산점이에요.
        </P>
        <P>
          예를 들어 2026년 3월 1일에 불인정 통보를 받았다면, 90일째인 5월 29일까지 심사청구서를 제출해야 해요. 주말·공휴일도 포함해서 달력대로 계산하지만, 마지막 날이 공휴일이면 그 다음 영업일까지 연장돼요.
        </P>

        <H3>심사 결정 기간 30일</H3>
        <P>
          심사청구가 접수되면 고용보험심사관이 <B>30일 이내</B>에 결정을 내려요. 결정은 "인용(청구 인정)"과 "기각(청구 거부)" 두 가지예요. 결정 결과는 서면으로 통보되고, 기각 시 재심사청구 방법과 기한도 함께 안내돼요. 심사 기간 중에 고용센터를 방문해서 본인 상황을 직접 설명하면 추가 사정을 전달할 수 있어요.
        </P>

        <Info type="warn">{"<strong>주의:</strong> 90일이 지나면 심사청구가 각하돼요. 처분 통보를 받으면 증빙 서류를 확보하면서 동시에 기한을 체크하세요."}</Info>

        <BridgeCard
          q="임금삭감으로 퇴직했는데 불인정됐다면?"
          a="20% 이상 삭감 + 2개월 지속 증빙서류가 있다면 심사청구로 뒤집을 가능성이 있어요."
          label="임금삭감 정당사유 보기"
          href="/w/실업급여-임금삭감-퇴직-정당사유"
        />
      </Sec>

      {/* ── RelatedMid (SECTION 03-04 사이) ── */}
      <RelatedMid
        title="다른 퇴직사유 글도 비교해 보세요"
        items={[
          { icon: "📉", title: "임금삭감 퇴직 정당사유", desc: "20% 기준 2개월 인정 조건", href: "/w/실업급여-임금삭감-퇴직-정당사유" },
          { icon: "💰", title: "임금체불 퇴직 정당사유", desc: "2개월 이상 체불 시 인정 기준", href: "/w/실업급여-임금체불-퇴직-정당사유" },
          { icon: "😔", title: "직장내 괴롭힘 정당사유", desc: "증빙서류·신고 절차 안내", href: "/w/실업급여-직장내-괴롭힘-퇴직-정당사유" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      {/* ══════ SECTION 04 — 재심사청구 ══════ */}
      <Sec n={4} id="re-review" title="재심사청구는 언제 할 수 있나요?" sub="심사 기각 후 90일 이내, 고용보험심사위원회에 제출해요">
        <P>
          심사관의 결정이 나왔는데 기각됐다면, 한 단계 더 불복할 수 있어요. <A href="https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1000011134">고용보험법 제88조</A>에 따라 고용보험심사위원회에 <B>재심사청구</B>를 제기하는 거예요. 기한은 심사관 결정을 안 날부터 다시 90일이에요.
        </P>

        <H3>제출처 3곳 선택</H3>
        <P>
          재심사청구서는 세 곳 중 편한 곳에 제출하면 돼요. <B>원래 처분을 한 고용센터</B>, <B>지방고용노동관서(고용노동부 지사)</B>, 또는 <B>고용보험심사위원회</B>에 직접 제출할 수 있어요. 고용센터에 제출하는 게 가장 간편해요. 재심사청구서 내용은 심사청구서보다 더 체계적이어야 해요. 첫 심사에서 제출하지 못한 새로운 증거가 있다면 이 단계에서 추가하는 게 효과적이에요.
        </P>

        <H3>재심사 결정 기간 50일</H3>
        <P>
          고용보험심사위원회는 재심사청구를 접수한 날부터 <B>50일 이내</B>에 결정을 내려요. 심사청구(30일)보다 시간이 더 걸리는 이유는 위원회가 여러 위원의 합의체로 운영되기 때문이에요. 재심사에서도 기각됐는데 여전히 불만이라면, 재심사 결정을 안 날부터 90일 이내에 관할 행정법원에 행정소송을 제기할 수 있어요.
        </P>

        <TableTitle>불복 절차 단계별 비교</TableTitle>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 400 }}>
          <thead>
            <tr>
              <THL>단계</THL>
              <TH>제출처</TH>
              <TH>결정 기간</TH>
              <TH>기한</TH>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>1단계 심사청구</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>관할 고용센터</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>30일 이내</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>처분 통보 후 90일</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>2단계 재심사청구</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>고용보험심사위원회</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>50일 이내</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>심사 결정 후 90일</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>3단계 행정소송</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>관할 행정법원</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>수개월~1년</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>재심사 결정 후 90일</td>
            </tr>
          </tbody>
        </table>
        <TableNote>각 단계 기한은 모두 "처분/결정을 안 날"부터 90일이에요.</TableNote>

        <InlineLink icon="📄" title="실업급여 구비서류 안내" desc="심사청구 시 필요한 서류 목록" href="/w/실업급여-구비서류" />
      </Sec>

      <Divider />

      {/* ══════ SECTION 05 — 기한 초과 ══════ */}
      <Sec n={5} id="deadline-over" title="90일 기한을 넘기면 어떻게 되나요?" sub="예외 사유가 있으면 14일 이내 구제 가능해요">
        <P>
          원칙적으로 90일 기한을 넘기면 심사청구·재심사청구가 각하돼요. "각하"는 내용을 보지도 않고 기한 초과를 이유로 거부하는 거예요. 기한 관리가 왜 중요한지 알 수 있는 부분이에요.
        </P>

        <H3>기한 도과 예외 사유</H3>
        <P>
          본인에게 책임 없는 사유로 기한을 넘긴 경우에는 예외가 인정돼요. <B>천재지변</B>, <B>중대한 질병으로 거동 불가</B>, <B>해외 체류 중 통보를 못 받은 경우</B> 등이 해당해요. 이런 사유가 해소된 날부터 14일 이내에 심사청구를 제기하면 기한 도과로 처리되지 않아요.
        </P>
        <P>
          다만 "몰랐다"거나 "바빠서"는 예외 사유로 인정되지 않아요. 처분 통보를 받은 시점을 정확히 기록해두고, 가능하다면 통보 수령일을 증명할 수 있는 자료(우편물 수령 기록, 고용24 로그인 기록 등)를 보관하세요.
        </P>

        <H3>행정소송 마지막 방법</H3>
        <P>
          심사청구와 재심사청구를 모두 거쳤는데도 결과가 불만족스러우면, 관할 행정법원에 <B>행정소송</B>을 제기할 수 있어요. 재심사 결정을 안 날부터 90일 이내에 소장을 제출해야 해요. 소송비용(인지대, 송달료)이 발생하고 변호사 선임 비용도 들 수 있어요. 경제적 사정이 어려우면 대한법률구조공단(전화 132)에서 무료 법률 지원을 받을 수 있어요.
        </P>

        <Info type="warn">{"<strong>주의:</strong> 행정소송도 재심사 결정을 안 날부터 90일 기한이 있어요. 모든 단계에서 90일을 꼭 기억하세요."}</Info>

        <BridgeCard
          q="이의신청 전에 수급 조건을 다시 확인하고 싶다면?"
          a="피보험기간 180일, 비자발적 퇴사 등 기본 조건이 충족됐는지 재확인해보세요."
          label="수급 조건 다시 보기"
          href="/w/실업급여-수급-조건"
        />

        <ExtBtn
          badge="정부 공식"
          text="고용보험심사위원회 재심사청구"
          cta="바로가기 →"
          href="https://eiac.ei.go.kr"
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
          { title: "수급자격 제한 사유 11가지", cat: "실업급여·불인정", href: "/w/실업급여-수급자격제한" },
          { title: "임금삭감 퇴직 정당사유 기준", cat: "실업급여·퇴직사유", href: "/w/실업급여-임금삭감-퇴직-정당사유" },
          { title: "임금체불 퇴직 정당사유 기준", cat: "실업급여·퇴직사유", href: "/w/실업급여-임금체불-퇴직-정당사유" },
          { title: "직장내 괴롭힘 퇴직 정당사유", cat: "실업급여·퇴직사유", href: "/w/실업급여-직장내-괴롭힘-퇴직-정당사유" },
        ]}
      />
      <PrevNext
        prev={{ title: "임금삭감 퇴직 정당사유", href: "/w/실업급여-임금삭감-퇴직-정당사유" }}
        next={{ title: "임금체불 퇴직 정당사유", href: "/w/실업급여-임금체불-퇴직-정당사유" }}
      />
    </BlogLayout>
  );
}
