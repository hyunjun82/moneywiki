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
  title: "실업급여 지급일 입금 요일 | 실업인정일 지급주기 계산",
  description:
    "실업급여는 실업인정일 다음 영업일에 입금돼요. 지급주기와 입금 요일 계산 방법을 정리했어요.",
  category: "실업급여",
  keywords: ["실업급여 지급일", "입금 요일", "실업인정일", "지급주기 계산"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-25",
  datePublished: "2026-02-25",
  summary: [
    "실업급여는 실업인정일 다음 영업일에 계좌로 입금돼요",
    "지급주기는 2주(14일)이고 대기기간 7일 후 첫 실업인정이 이뤄져요",
    "실업인정일이 금요일이면 보통 월요일에 입금돼요",
  ],
  sources: [
    { name: "고용보험법 제47조", url: "https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1000011093", date: "2024-01" },
    { name: "고용24 실업인정 안내", url: "https://www.work24.go.kr/re/b/REREABA01.do", date: "2026-02" },
    { name: "고용보험 실업급여 업무 처리 규정", url: "https://www.moel.go.kr", date: "2025-12" },
  ],
  faq: [
    {
      q: "실업급여 입금이 실업인정일 당일에 되지 않는 이유가 뭐예요?",
      a: "고용센터에서 실업인정 처리를 완료한 뒤 금융기관에 지급 요청을 해야 해서 하루 정도 걸려요. 대부분 다음 영업일 오전 중에 입금돼요.",
    },
    {
      q: "실업인정일을 놓치면 그 회차 실업급여는 못 받나요?",
      a: "원칙적으로 실업인정일을 지키지 않으면 해당 회차 실업급여가 지급되지 않아요. 다만 천재지변·입원 등 불가피한 사유가 있으면 고용센터에 사전 신고 후 일정 변경이 가능해요.",
    },
  ],
  ctaCard: {
    label: "내 입금일 계산",
    mainText: "실업인정일 → 입금일",
    subText: "다음 영업일 계산 방법",
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
  if (!a.status || !a.date || !a.report || !a.account) return null;

  const statusOk = a.status === "approved";
  const dateOk = a.date === "yes";
  const reportOk = a.report === "done";
  const accountOk = a.account === "yes";

  if (statusOk && dateOk && reportOk && accountOk) {
    return (
      <ResultPass title="실업급여 입금을 기다리면 돼요" desc="수급자격 인정 + 실업인정 신청까지 완료됐으면 실업인정일 다음 영업일에 입금돼요. 영업일 기준이라 주말·공휴일은 제외돼요.">
        <ResultGrid items={[
          { icon: "✅", name: "수급자격", pass: true, desc: "인정됨" },
          { icon: "📅", name: "실업인정일", pass: true, desc: "확인됨" },
          { icon: "📋", name: "구직활동 보고", pass: true, desc: "완료" },
          { icon: "🏦", name: "입금 계좌", pass: true, desc: "등록됨" },
        ]} />
        <ResultCTA icon="📅" title="실업인정일 온라인 신청" desc="고용24에서 구직활동 실적 입력·제출" href="https://www.work24.go.kr/re/b/REREABA01.do" />
        <ResultCTA icon="🔢" title="예상 수령액 계산" desc="연봉별 실업급여 금액 확인" href="/w/실업급여-연봉별-계산" />
        <ResultCTA icon="📊" title="지급주기 전체 흐름" desc="대기기간~마지막 입금일 계산" href="/w/실업급여-소정급여일수" />
        <ResultCTA icon="🔍" title="수급 조건 확인" desc="피보험기간·퇴직사유 기준" href="/w/실업급여-수급-조건" />
      </ResultPass>
    );
  }

  const items = [
    { icon: "✅", name: "수급자격", pass: statusOk, desc: statusOk ? "인정됨" : "미인정/신청 중" },
    { icon: "📅", name: "실업인정일", pass: dateOk, desc: dateOk ? "확인됨" : "미확인" },
    { icon: "📋", name: "구직활동 보고", pass: reportOk, desc: reportOk ? "완료" : "미완료" },
    { icon: "🏦", name: "입금 계좌", pass: accountOk, desc: accountOk ? "등록됨" : "미등록" },
  ];

  return (
    <ResultFail title="아직 처리가 필요한 단계가 있어요" desc="아래 항목을 완료해야 실업급여 입금이 시작돼요.">
      <ResultGrid items={items} />
      <div style={{ marginTop: 16 }}>
        <ResultCTA icon="📝" title="실업급여 신청 방법 절차" desc="수급자격 인정 신청 단계별 안내" href="/w/실업급여-신청방법" />
        <ResultCTA icon="📍" title="관할 고용센터 찾기" desc="고용24에서 주소 입력으로 바로 확인" href="/w/실업급여-고용센터-찾기-고용24-사용법" />
        <ResultCTA icon="📊" title="실업급여 수급 조건" desc="피보험기간·퇴직사유 기준 확인" href="/w/실업급여-수급-조건" />
        <ResultCTA icon="🔢" title="피보험기간 180일 계산" desc="이전 직장 합산 방법" href="/w/실업급여-피보험기간-180일-계산" />
      </div>
    </ResultFail>
  );
}

/* ───── component ───── */
export default function Article90() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "수령", "지급일·입금일"]}
      tags={["2026년 기준", "실업급여", "지급일"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={
        <>
          실업급여 신청을 했는데 언제 통장에 들어오는지 궁금하죠. 원칙은 <B>실업인정일 다음 영업일</B>에 입금이에요. <A href="https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1000011093">고용보험법 제47조</A>에 따라 실업인정이 완료되면 지급이 처리돼요. 지급주기와 입금 요일 계산 방법을 정리했어요.
        </>
      }
      sourceBar={{
        badge: "법령 근거",
        name: "고용보험법 제47조 · 고용24",
        date: "2026.02 기준",
      }}
      stickyLabel="입금일"
      stickyValue="실업인정 다음 영업일"
      stickyBtn="지급주기 확인 ↑"
      disclaimer="이 글은 고용보험법과 고용24 공식 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 정확한 지급일은 관할 고용센터에서 확인하세요."
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
              { title: "실업급여 연봉별 계산기", cat: "실업급여·계산", href: "/w/실업급여-연봉별-계산" },
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
          { t: "내 입금 진행 상태 간편 체크", sub: null },
          { t: "실업급여 지급일은 어떻게 정해지나요?", sub: "대기기간 7일 · 첫 실업인정일 산정" },
          { t: "실업급여 입금 요일은 언제예요?", sub: "다음 영업일 원칙 · 주말·공휴일 처리" },
          { t: "실업인정일과 지급일 관계가 뭐예요?", sub: "실업인정 처리 흐름 · 지연 원인" },
          { t: "지급주기 계산은 어떻게 하나요?", sub: "2주 지급주기 계산 · 전체 수급 일정" },
          { t: "자주 묻는 질문", sub: null },
        ]}
      />

      {/* ── Summary3 ── */}
      <Summary3
        items={[
          "실업급여는 실업인정일 다음 영업일에 계좌로 입금돼요",
          "지급주기는 2주(14일)이고 대기기간 7일 후 첫 실업인정이 이뤄져요",
          "실업인정일이 금요일이면 보통 월요일에 입금돼요",
        ]}
      />

      {/* ══════ STEP 01 — 체커 ══════ */}
      <Sec n="1" id="checker" title="내 입금 진행 상태 간편 체크" sub="4가지 확인하면 현재 단계를 알 수 있어요">
        <P>
          실업급여 입금이 늦거나 안 들어올 때 막막하죠. 대부분은 수급자격 미인정, 실업인정 미신청, 구직활동 보고 누락 중 하나예요. 아래 체커로 현재 단계를 확인해보세요.
        </P>
        <P>
          실업인정 신청은 고용24 또는 고용센터 방문으로 해요. 구직활동 실적(워크넷 입사지원, 취업특강 수강 등)을 입력해야 처리가 완료돼요.
        </P>

        <CheckerShell title="실업급여 입금 준비 체크" sub="30초 확인">
          <CheckerQ n="1" label="수급자격 인정을 받은 상태인가요?" group="status"
            opts={[["approved", "인정받았어요"], ["pending", "신청 중이에요"], ["not-yet", "아직 신청 안 했어요"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n="2" label="다음 실업인정일이 언제인지 알고 있나요?" group="date"
            opts={[["yes", "알고 있어요"], ["no", "모르겠어요"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n="3" label="이번 회차 실업인정 신청(구직활동 보고)을 했나요?" group="report"
            opts={[["done", "완료했어요"], ["not-yet", "아직 안 했어요"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n="4" label="실업급여 입금 계좌가 등록돼 있나요?" group="account"
            opts={[["yes", "등록됐어요"], ["no", "미등록이에요"]]}
            sel={ans} pick={pick}
          />
          {result}
        </CheckerShell>
      </Sec>

      <Divider />

      {/* ══════ SECTION 02 — 지급일 산정 ══════ */}
      <Sec n="2" id="payment-date" title="실업급여 지급일은 어떻게 정해지나요?" sub="대기기간 7일이 끝나야 첫 실업인정일이 잡혀요">
        <P>
          실업급여 지급은 퇴직 직후부터 바로 시작되지 않아요. <A href="https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1000011093">고용보험법 제47조</A>에 따라 수급자격 인정 후 <B>대기기간 7일</B>이 지나야 첫 지급이 시작돼요. 대기기간에는 실업급여가 나오지 않아요.
        </P>

        <H3>대기기간 7일</H3>
        <P>
          수급자격 인정일(고용센터에서 수급자격 인정을 받은 날)로부터 7일간이 대기기간이에요. 이 기간은 실업 상태인지 확인하는 기간으로, 실업급여가 지급되지 않아요. 대기기간 7일이 지난 날부터 실업인정을 받을 수 있어요.
        </P>
        <P>
          예를 들어 3월 1일에 수급자격 인정을 받으면, 3월 8일부터 실업인정 대상 기간이 시작돼요. 첫 실업인정일은 보통 수급자격 인정일로부터 2~4주 후로 잡혀요. 정확한 날짜는 고용센터 담당자가 지정하며, 고용24 앱에서 확인할 수 있어요.
        </P>

        <H3>첫 실업인정일 산정</H3>
        <P>
          첫 실업인정일은 수급자격 인정 이후 <B>약 2~4주 사이</B>에 잡혀요. 고용센터에서 수급자격증을 발급받을 때 첫 실업인정일이 함께 통보돼요. 담당 고용센터의 담당자 배정 일정과 센터 혼잡도에 따라 날짜가 달라질 수 있어요.
        </P>

        <Info type="tip">{"<strong>팁:</strong> 첫 실업인정일에는 반드시 고용센터에 방문하거나 고용24에서 온라인으로 실업인정 신청을 해야 해요. 이날을 놓치면 해당 회차 실업급여가 지급되지 않아요."}</Info>

        <InlineLink icon="📊" title="실업급여 수급 조건 전체 확인" desc="피보험기간·퇴직사유 기준 한눈에" href="/w/실업급여-수급-조건" />
      </Sec>

      <Divider />

      {/* ══════ SECTION 03 — 입금 요일 ══════ */}
      <Sec n="3" id="deposit-day" title="실업급여 입금 요일은 언제예요?" sub="실업인정일 다음 영업일에 들어와요">
        <P>
          실업인정이 완료되면 <B>다음 영업일(평일)</B>에 등록한 계좌로 입금돼요. 영업일 기준이기 때문에 주말과 공휴일은 제외돼요. 실업인정일이 화요일이면 수요일, 목요일이면 금요일에 입금되는 식이에요.
        </P>

        <H3>다음 영업일 원칙</H3>
        <P>
          실업인정이 오후에 처리되더라도 당일 입금은 되지 않아요. 고용센터에서 처리 완료 후 금융기관에 지급 요청을 전달하는 데 시간이 걸리기 때문이에요. 대부분 <B>다음 날 오전 중</B>에 입금되는데, 은행마다 처리 시간이 다르므로 오후에 입금되는 경우도 있어요.
        </P>

        <TableTitle>실업인정일별 예상 입금일</TableTitle>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 400 }}>
          <thead>
            <tr>
              <THL>실업인정일</THL>
              <TH>예상 입금일</TH>
              <TH>비고</TH>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>월요일</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>화요일</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>다음 날 오전 중</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>화요일</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>수요일</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>다음 날 오전 중</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>수요일</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>목요일</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>다음 날 오전 중</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>목요일</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>금요일</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>다음 날 오전 중</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>금요일</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>월요일</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>주말 제외, 다음 주 월요일</td>
            </tr>
          </tbody>
        </table>
        <TableNote>영업일(평일) 기준 / 공휴일 껴있으면 그 다음 영업일로 이동</TableNote>

        <H3>주말·공휴일 처리</H3>
        <P>
          실업인정일이 금요일이면 그 다음 영업일인 월요일에 입금돼요. 공휴일이 끼어 있으면 공휴일을 건너뛰고 가장 빠른 영업일에 입금돼요. 설·추석 연휴처럼 여러 날이 연속 공휴일이면 연휴 이후 첫 영업일에 입금돼요.
        </P>

        <Info type="warn">{"<strong>주의:</strong> 은행별로 입금 처리 시간이 다를 수 있어요. 일반적으로 오전 중에 입금되지만, 일부 은행은 오후에 처리되기도 해요. 오전에 입금이 안 됐다면 오후까지 기다려보세요."}</Info>

        <InlineLink icon="📋" title="실업급여 구직활동 인정 기준" desc="워크넷 입사지원·취업특강 등 인정 범위" href="/w/실업급여-구직활동" />
      </Sec>

      {/* ── RelatedMid (SECTION 03-04 사이) ── */}
      <RelatedMid
        title="실업급여 수령과 관련된 글도 보세요"
        items={[
          { icon: "🔢", title: "실업급여 연봉별 계산", desc: "내 월급 기준 예상 수령액 확인", href: "/w/실업급여-연봉별-계산" },
          { icon: "📅", title: "실업급여 소정급여일수", desc: "120~270일 산정 기준", href: "/w/실업급여-소정급여일수" },
          { icon: "📊", title: "실업급여 수급 조건 정리", desc: "피보험기간·퇴직사유 기준", href: "/w/실업급여-수급-조건" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      {/* ══════ SECTION 04 — 실업인정일과 지급일 관계 ══════ */}
      <Sec n="4" id="recognition-relation" title="실업인정일과 지급일 관계가 뭐예요?" sub="실업인정 처리가 완료돼야 지급 요청이 들어가요">
        <P>
          실업인정일에 구직활동 실적을 제출하고 담당자가 인정 처리를 완료해야 지급 요청이 금융기관에 전달돼요. 온라인 신청은 자정(00:00~24:00) 안에 제출해야 당일 처리로 인정돼요. 기한을 넘기면 다음 날 처리로 밀려서 입금이 하루 더 늦어져요.
        </P>

        <H3>실업인정 처리 흐름</H3>
        <P>
          실업인정 신청(구직활동 보고) → 고용센터 담당자 검토 → 인정 완료 → 금융기관 지급 요청 → 계좌 입금, 이 순서로 처리돼요. 온라인 신청은 자동화 처리가 빠르지만, 방문 신청은 담당자 처리 시간에 따라 당일 처리 여부가 달라질 수 있어요.
        </P>

        <H3>지연 원인</H3>
        <P>
          입금이 예상보다 늦는 경우는 주로 세 가지예요. 첫째, 구직활동 실적 증빙이 부족해서 추가 확인이 필요한 경우예요. 둘째, 공휴일이나 주말이 끼어서 영업일 처리가 밀린 경우예요. 셋째, 시스템 점검이나 오류로 일시적으로 처리가 지연되는 경우예요. 예상 입금일보다 2영업일 이상 늦으면 관할 고용센터에 문의하는 게 좋아요.
        </P>

        <BridgeCard
          q="실업급여 입금이 2일 이상 늦어진다면?"
          a="고용24 마이페이지에서 실업인정 처리 현황을 확인하거나, 관할 고용센터 전화로 처리 상태를 조회할 수 있어요."
          label="관할 고용센터 찾기"
          href="/w/실업급여-고용센터-찾기-고용24-사용법"
        />
      </Sec>

      <Divider />

      {/* ══════ SECTION 05 — 지급주기 계산 ══════ */}
      <Sec n="5" id="cycle-calculation" title="지급주기 계산은 어떻게 하나요?" sub="2주 간격이 기본이고 전체 수급 일정도 미리 알 수 있어요">
        <P>
          실업인정은 원칙적으로 <B>2주(14일)</B>에 한 번씩 이뤄져요. 첫 실업인정일을 기준으로 이후 실업인정일이 2주 단위로 자동 설정돼요. 실업인정을 받을 때마다 2주치 실업급여가 한 번에 입금되는 구조예요.
        </P>

        <H3>2주 지급주기 계산</H3>
        <P>
          예를 들어 첫 실업인정일이 3월 15일이라면, 2차 실업인정일은 3월 29일, 3차는 4월 12일 이런 식으로 2주 단위로 계속돼요. 실업인정일마다 14일치 실업급여(1일 소정급여일수 기준)가 지급돼요. 마지막 회차는 남은 일수만큼만 지급돼요.
        </P>
        <P>
          소정급여일수(120~270일)를 14로 나누면 대략 몇 번의 실업인정을 받는지 계산할 수 있어요. 예를 들어 소정급여일수가 180일이면 180 ÷ 14 ≈ 12~13회 정도 실업인정을 받게 돼요.
        </P>

        <H3>전체 수급 일정</H3>
        <P>
          수급 기간은 수급자격 인정일로부터 <B>12개월</B>이에요. 12개월 내에 소정급여일수를 모두 소진하지 못하면, 남은 일수를 받지 못하고 종료돼요. 수급 기간 중 취업하면 취업일부터 수급이 중단되고, 재취업 활동 촉진수당(조기재취업수당)을 받을 수 있는 경우도 있어요.
        </P>

        <Info type="tip">{"<strong>팁:</strong> 고용24 '나의 급여현황'에서 소정급여일수, 지급된 일수, 남은 일수를 실시간으로 확인할 수 있어요."}</Info>

        <BridgeCard
          q="실업급여 이의신청 기한(90일)을 모르고 넘겼다면?"
          a="90일을 넘기면 원칙적으로 이의신청이 불가해요. 다만 정당한 사유가 있으면 예외 적용이 가능해요."
          label="이의신청 절차 확인"
          href="/w/실업급여-이의신청-심사청구-재심사-불복-절차"
        />

        <ExtBtn
          badge="고용24 공식"
          text="실업인정 온라인 신청"
          cta="신청하기 →"
          href="https://www.work24.go.kr/re/b/REREABA01.do"
        />
      </Sec>

      <Divider />

      {/* ══════ FAQ ══════ */}
      <Sec n="6" id="faq" title="자주 묻는 질문" sub="">
        <FAQAccordion items={meta.faq} />
      </Sec>

      {/* ── 하단 네비 ── */}
      <RelatedArticles
        items={[
          { title: "실업급여 수급 조건 정리", desc: "실업급여·수급자격", href: "/w/실업급여-수급-조건" },
          { title: "실업급여 신청 방법 절차 준비서류", desc: "실업급여·신청", href: "/w/실업급여-신청방법" },
          { title: "실업급여 연봉별 계산 방법", desc: "실업급여·계산", href: "/w/실업급여-연봉별-계산" },
          { title: "관할 고용센터 찾기 고용24", desc: "실업급여·신청", href: "/w/실업급여-고용센터-찾기-고용24-사용법" },
          { title: "피보험기간 180일 계산 합산", desc: "실업급여·피보험기간", href: "/w/실업급여-피보험기간-180일-계산" },
        ]}
      />
      <PrevNext
        prev={{ title: "관할 고용센터 찾기 고용24", href: "/w/실업급여-고용센터-찾기-고용24-사용법" }}
        next={{ title: "실업급여 수급 조건 정리", href: "/w/실업급여-수급-조건" }}
      />
    </BlogLayout>
  );
}
