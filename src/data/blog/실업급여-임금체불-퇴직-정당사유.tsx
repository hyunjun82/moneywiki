"use client";
import { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "실업급여 임금체불 퇴직 정당사유 | 2개월 기준 증빙서류",
  description: "임금을 2개월 이상 못 받았으면 정당사유 퇴직으로 인정돼요. 임금체불 증빙서류 준비부터 고용센터 신청까지 순서대로 정리했어요.",
  category: "실업급여",
  keywords: ["실업급여 임금체불", "퇴직 정당사유", "2개월 기준", "증빙서류 방법"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-25",
  datePublished: "2026-02-25",
  summary: [
    "임금 <strong>2개월분 이상</strong> 체불 시 정당한 이직사유로 인정돼요",
    "핵심 증빙: <strong>체불임금등사업주확인서</strong> + 고용노동부 진정서 사본",
    "일부 체불도 인정 가능 — 퇴직 전 <strong>1년 이내</strong> 체불이 기준이에요",
  ],
  sources: [
    { name: "고용보험법 시행규칙 별표2", url: "https://www.law.go.kr/법령/고용보험법시행규칙", date: "2026-01" },
  ],
  faq: [
    { q: "임금체불로 퇴직하면 자발적 퇴사로 처리되나요?", a: "아니에요. 고용보험법 시행규칙 별표2에 따라 임금이 2개월분 이상 체불된 경우 비자발적 퇴사(정당한 이직사유)로 인정돼요. 사업주가 이직확인서에 자발적 퇴사로 표기해도 고용센터에서 증빙서류를 확인하면 정당사유로 변경할 수 있어요." },
    { q: "임금체불 증빙서류 없이도 실업급여 신청이 가능한가요?", a: "원칙적으로 증빙서류가 필요해요. 하지만 고용노동부에 진정을 넣은 사실만 확인되면 진정서 접수 확인서로 대체할 수 있어요. 계좌이체내역이나 근로계약서도 보조 증빙으로 활용돼요." },
  ],
  ctaCard: {
    label: "30초 판정",
    mainText: "임금 2개월 이상 체불 → 정당사유",
    subText: "내 상황으로 바로 판정해보기",
    url: "#checker",
    external: false,
  },
  relatedDocs: [
    { title: "실업급여 신청 방법", url: "/w/실업급여-신청-방법-절차-준비서류" },
    { title: "실업급여 수급 조건", url: "/w/실업급여-수급-조건-자격-요건-완벽정리" },
  ],
};

type ResLink = { icon: string; title: string; desc: string; href: string };

export default function Article84() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  const getResult = () => {
    if (!sel.period || !sel.type || !sel.report || !sel.insurance) return null;
    const period2plus = sel.period === "2m" || sel.period === "3m";
    const validType = sel.type === "full" || sel.type === "partial";
    const insured = sel.insurance === "yes" || sel.insurance === "merge";
    const pass = period2plus && validType && insured;
    return { pass, period2plus, validType, insured, reported: sel.report === "yes" };
  };

  const result = getResult();

  const links: ResLink[] = [
    { icon: "📝", title: "실업급여 신청 방법과 절차", desc: "고용24 온라인 신청부터 준비서류까지 안내", href: "/w/실업급여-신청-방법-절차-준비서류" },
    { icon: "⚖️", title: "이의신청 심사청구 재심사", desc: "불인정 시 90일 내 이의제기 가능", href: "/w/실업급여-이의신청-심사청구-재심사-불복-절차" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "퇴직사유", "임금체불"]}
      tags={["2026년 기준", "실업급여", "임금체불"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={
        <>
          임금을 2개월 넘게 못 받고 퇴직했다면 <strong>정당한 이직사유</strong>로
          인정돼요. 고용보험법 시행규칙 별표2 기준으로 조건과 증빙서류를 정리했어요.
        </>
      }
      sourceBar={{
        badge: "출처",
        name: "고용보험법 시행규칙 별표2",
        date: "2026.01 시행",
      }}
      stickyLabel="임금체불 기준"
      stickyValue="2개월 이상"
      stickyBtn="내 상황 판정하기 ↑"
      disclaimer="이 글은 고용보험법 시행규칙을 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 정확한 수급 판정은 관할 고용센터에서 진행하세요."
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
              { title: "실업급여 수급 조건 정리", cat: "실업급여·수급자격", href: "/w/실업급여-수급-조건-자격-요건-완벽정리" },
              { title: "실업급여 신청 방법과 절차", cat: "실업급여·신청", href: "/w/실업급여-신청-방법-절차-준비서류" },
              { title: "임금삭감 퇴직 정당사유", cat: "실업급여·퇴직사유", href: "/w/실업급여-임금삭감-퇴직-정당사유" },
              { title: "직장내 괴롭힘 퇴직 정당사유", cat: "실업급여·퇴직사유", href: "/w/실업급여-직장내-괴롭힘-퇴직-정당사유" },
              { title: "이의신청 심사청구 재심사", cat: "실업급여·불복절차", href: "/w/실업급여-이의신청-심사청구-재심사-불복-절차" },
            ]}
          />
          <SidebarCalc
            items={[
              { title: "실업급여 계산기", href: "/w/실업급여-계산기" },
              { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
              { title: "연말정산 계산기", href: "/w/연말정산-계산기" },
              { title: "양도소득세 계산기", href: "/w/양도소득세-계산기" },
              { title: "대출이자 계산기", href: "/w/대출이자-계산기" },
            ]}
          />
        </>
      }
    >
      {/* 목차 */}
      <TOC
        items={[
          { t: "내 임금체불이 정당사유에 해당하는지 간편 체크", sub: null },
          { t: "실업급여 임금체불 2개월 기준이 뭐예요?", sub: "정당사유 인정 조건 요약표 · 퇴직 전 1년 이내 판단 기준" },
          { t: "실업급여 임금체불 증빙서류는 어떻게 받나요?", sub: "증빙서류 종류와 발급처 · 고용노동부 진정서 활용법" },
          { t: "실업급여 임금체불 일부만 돼도 인정되나요?", sub: "전액 체불 vs 일부 체불 차이 · 사례별 인정 여부 판단" },
          { t: "실업급여 임금체불 증빙서류 제출 절차가 어떻게 되나요?", sub: "고용센터 제출 순서 · 이직확인서 정정 방법" },
          { t: "자주 묻는 질문", sub: null },
        ]}
      />

      {/* 3줄 요약 */}
      <Summary3 items={meta.summary} />

      {/* PAS 브릿지 */}
      <BridgeCard
        q="월급 밀린 채 퇴사해도 실업급여 받을 수 있어요"
        a="사업주가 이직확인서에 '자발적 퇴사'로 적어도, 증빙서류만 있으면 고용센터에서 정당사유로 바꿔줘요. 2개월분 이상 체불이면 거의 인정돼요."
        label="내 상황 바로 판정하기 ↓"
        href="#checker"
      />

      {/* ═══ STEP 01: 체커 ═══ */}
      <Divider />
      <Sec n="STEP 01" id="checker" title="내 임금체불이 정당사유에 해당하는지 간편 체크" sub="4가지만 선택하면 바로 알 수 있어요" />

      <P>
        임금체불로 퇴직했을 때 실업급여를 받으려면 <B>체불 기간</B>과{" "}
        <B>피보험기간</B>이 핵심이에요. 고용보험법 시행규칙 별표2에서 정한 기준에
        맞으면 비자발적 퇴사와 동일하게 처리돼요. 사업주한테 월급을 못 받았다는 사실
        자체가 퇴직의 정당한 사유가 되는 거예요.
      </P>

      <P>
        많은 분들이 사업주가 월급을 안 줘서 어쩔 수 없이 그만뒀는데, 이직확인서에
        &apos;자발적 퇴사&apos;로 적혀있어서 실업급여를 못 받는다고 생각하시는데요.
        걱정하지 않아도 돼요. 증빙서류만 갖추면 고용센터에서 정당사유로 직접
        변경해줘요.
      </P>

      <CheckerShell
        title="임금체불 정당사유 판정"
        sub="30초 확인"
        desc="체불 기간과 유형만 알면 바로 판정돼요."
      >
        <CheckerQ
          n="1"
          label="임금을 받지 못한 기간이 얼마나 되나요?"
          group="period"
          opts={[["1m", "1개월 미만"], ["1-2m", "1~2개월"], ["2m", "2개월 이상"], ["3m", "3개월 이상"]]}
          sel={sel}
          pick={pick}
        />
        <CheckerQ
          n="2"
          label="체불 유형은 무엇인가요?"
          group="type"
          opts={[["full", "전액 체불"], ["partial", "일부 체불 (절반 이상)"], ["delay", "매번 지연 지급"]]}
          sel={sel}
          pick={pick}
        />
        <CheckerQ
          n="3"
          label="고용노동부에 임금체불 진정을 넣었나요?"
          group="report"
          opts={[["yes", "진정 완료"], ["no", "아직 안 함"], ["plan", "진정 예정"]]}
          sel={sel}
          pick={pick}
        />
        <CheckerQ
          n="4"
          label="고용보험 피보험기간이 180일 이상인가요?"
          group="insurance"
          opts={[["yes", "180일 이상"], ["no", "180일 미만"], ["merge", "이전 직장 합산 가능"]]}
          sel={sel}
          pick={pick}
        />

        {result &&
          (result.pass ? (
            <ResultPass
              title="임금체불 정당사유로 실업급여 수급 가능해요"
              desc={`임금이 ${sel.period === "3m" ? "3개월" : "2개월"} 이상 체불됐고 피보험기간도 충족돼요.${!result.reported ? " 고용노동부 진정을 먼저 넣으면 증빙이 더 수월해요." : ""}`}
            >
              <ResultGrid
                items={[
                  { icon: "✅", name: "체불 기간", pass: true, desc: sel.period === "3m" ? "3개월 이상" : "2개월 이상" },
                  { icon: "✅", name: "체불 유형", pass: true, desc: sel.type === "full" ? "전액 체불" : "일부 체불" },
                  { icon: result.reported ? "✅" : "⚠️", name: "진정 여부", pass: result.reported ?? false, desc: result.reported ? "진정 완료" : "진정 권장" },
                  { icon: "✅", name: "피보험기간", pass: true, desc: "충족" },
                ]}
              />
              {links.map((l, i) => (
                <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
              ))}
            </ResultPass>
          ) : (
            <ResultFail
              title={
                !result.period2plus
                  ? "체불 기간이 2개월 미만이에요"
                  : !result.insured
                    ? "피보험기간이 부족해요"
                    : "지연 지급은 체불로 인정되기 어려워요"
              }
              desc={
                !result.period2plus
                  ? "정당사유로 인정되려면 2개월분 이상 임금이 밀려야 해요. 다만 다른 정당사유에 해당할 수 있어요."
                  : !result.insured
                    ? "피보험기간 180일을 채워야 실업급여를 받을 수 있어요. 이전 직장 기간 합산도 가능해요."
                    : "매번 며칠씩 늦게 주는 건 체불로 보기 어렵지만, 다른 방법이 있어요."
              }
            >
              <ResultGrid
                items={[
                  { icon: "⏰", name: "체불 기간", pass: result.period2plus ?? false, desc: result.period2plus ? "2개월 이상" : "2개월 미만" },
                  { icon: "📑", name: "체불 유형", pass: result.validType ?? false, desc: result.validType ? "전액/일부 체불" : "지연 지급" },
                  { icon: "📝", name: "진정 여부", pass: sel.report === "yes", desc: sel.report === "yes" ? "진정 완료" : "미진정" },
                  { icon: "📅", name: "피보험기간", pass: result.insured ?? false, desc: result.insured ? "180일 충족" : "180일 미만" },
                ]}
              />
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #E5E7EB" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#111827", marginBottom: 6 }}>다른 방법도 있어요</div>
                {[
                  { icon: "💸", title: "임금삭감 퇴직 정당사유", desc: "20% 이상 삭감 시 별도 인정 가능", href: "/w/실업급여-임금삭감-퇴직-정당사유" },
                  { icon: "📋", title: "피보험기간 합산 방법", desc: "이전 직장 합산으로 180일 채우기", href: "/w/실업급여-피보험기간-180일-계산-합산-방법" },
                  { icon: "⚖️", title: "이의신청 심사청구 재심사", desc: "불인정 시 90일 내 이의제기 가능", href: "/w/실업급여-이의신청-심사청구-재심사-불복-절차" },
                  { icon: "😰", title: "직장내 괴롭힘 퇴직 정당사유", desc: "괴롭힘도 정당한 이직사유 인정", href: "/w/실업급여-직장내-괴롭힘-퇴직-정당사유" },
                ].map((item, i) => (
                  <a key={i} href={item.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < 3 ? "1px solid rgba(30,58,95,.08)" : "none", cursor: "pointer", textDecoration: "none" }}>
                    <span style={{ fontSize: 15 }}>{item.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#1E3A5F" }}>{item.title}</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 1 }}>{item.desc}</div>
                    </div>
                    <span style={{ fontSize: 11, color: "#9CA3AF" }}>→</span>
                  </a>
                ))}
              </div>
            </ResultFail>
          ))}
      </CheckerShell>

      {/* ═══ SECTION 02: 2개월 기준 ═══ */}
      <Divider />
      <Sec
        n="SECTION 02"
        id="s2"
        title="실업급여 임금체불 2개월 기준이 뭐예요?"
        sub="정당사유 인정 조건 요약표 · 퇴직 전 1년 이내 판단 기준"
      />

      <P>
        고용보험법 시행규칙 별표2에 따르면, 사업주가{" "}
        <A href="https://www.law.go.kr/법령/고용보험법시행규칙">
          임금을 지급기일 내에 2개월분 이상 지급하지 않은 경우
        </A>{" "}
        정당한 이직사유로 인정돼요. 여기서 &apos;2개월분&apos;이란 급여일 기준 2회
        이상 밀렸다는 뜻이에요. 1월분, 2월분 이렇게 두 달치 이상이 안 들어왔으면
        해당되는 거예요.
      </P>

      <P>
        중요한 건 퇴직일 기준 <B>직전 1년 이내</B>에 발생한 체불이어야 한다는
        점이에요. 3년 전에 밀렸던 임금은 정당사유로 인정받기 어려워요. 그리고 체불이
        퇴직의 직접적인 원인이 되어야 하기 때문에, 이미 오래전에 밀린 돈을 다 받은
        뒤 퇴사한 경우에도 인정이 안 돼요.
      </P>

      <P>
        2개월이 연속이어야 하는 건 아니에요. 예를 들어 3월에 한 번, 7월에 한 번
        이렇게 떨어져서 체불됐더라도 합산해서 2개월분 이상이면 기준에 맞아요. 다만
        고용센터에서 판단할 때 체불 패턴이 반복적이고 상습적일수록 인정받기가
        수월해요.
      </P>

      <H3>정당사유 인정 조건 요약표</H3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 400 }}>
          <thead>
            <tr>
              <THL>조건</THL>
              <TH>기준</TH>
              <TH>비고</TH>
            </tr>
          </thead>
          <tbody>
            {[
              ["체불 기간", "2개월분 이상", "연속 아니어도 합산 가능"],
              ["체불 시점", "퇴직 전 1년 이내", "오래된 체불은 불인정"],
              ["체불 유형", "전액 또는 일부", "일부 체불도 인정 가능"],
              ["증빙서류", "체불확인서 또는 진정서", "고용노동부 발급"],
              ["피보험기간", "180일 이상", "이전 직장 합산 가능"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    style={{
                      padding: "9px 8px",
                      textAlign: ci === 0 ? "left" : "center",
                      borderBottom: "1px solid #E5E7EB",
                      fontWeight: ci === 0 ? 600 : 400,
                      fontSize: 13,
                      color: ci === 0 ? "#111827" : "#374151",
                      background: ri === 0 ? "#F0F5FF" : "transparent",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>※ 고용보험법 시행규칙 별표2 기준 / 파란 행 = 가장 중요한 조건</TableNote>

      <H3>퇴직 전 1년 이내 판단 기준</H3>

      <P>
        &apos;퇴직 전 1년&apos;이라는 기간은 퇴직일(이직일)을 기준으로 역산해요.
        2026년 2월 25일에 퇴사했다면, 2025년 2월 26일부터 2026년 2월 25일까지 사이에
        발생한 체불만 인정돼요. 이 기간 안에 총 2개월분 이상이 밀려 있어야 해요.
      </P>

      <P>
        한 가지 더 알아둘 점은, 체불이 &apos;해소&apos;됐느냐 여부예요. 밀린 임금을
        퇴직 전에 전부 받았다면 정당사유가 사라져요. 퇴직 시점에 아직 밀린 상태여야
        해요. 반대로 퇴직 후에 체불 임금을 받더라도 이미 퇴직 시점에 체불이
        존재했으면 정당사유는 유지돼요.
      </P>

      <P>
        체불 기간이 애매한 경우, 예를 들어 1개월 15일치만 밀린 경우에는 고용센터
        담당자 재량에 따라 다를 수 있어요. 다만 1개월분 이상이면 &apos;근로조건
        저하&apos; 사유로 인정받을 여지가 있으니 일단 신청해보는 게 좋아요.
      </P>

      <InlineLink
        icon="📊"
        title="임금삭감 퇴직 정당사유 — 20% 기준 2개월 인정 조건"
        desc="임금이 깎인 경우의 정당사유 기준과 증빙 방법"
        href="/w/실업급여-임금삭감-퇴직-정당사유"
      />

      {/* ═══ SECTION 03: 증빙서류 ═══ */}
      <Divider />
      <Sec
        n="SECTION 03"
        id="s3"
        title="실업급여 임금체불 증빙서류는 어떻게 받나요?"
        sub="증빙서류 종류와 발급처 · 고용노동부 진정서 활용법"
      />

      <P>
        임금체불로 퇴직했다면 <B>증빙서류</B>가 실업급여 인정의 핵심이에요.
        사업주가 이직확인서에 &apos;자발적 퇴사&apos;로 체크했더라도, 체불 사실을
        증명할 서류만 있으면 고용센터에서 정당사유로 변경해줘요. 어떤 서류를 어디서
        받는지 정리해드릴게요.
      </P>

      <P>
        가장 확실한 증빙은 <B>체불임금등사업주확인서</B>예요. 이건 고용노동부
        (관할 노동청)에서 발급받는 공식 서류로, 사업주가 얼마를 밀렸는지 확인해주는
        거예요. 사업주가 협조하지 않으면 고용노동부에서 직접 조사 후 발급해줘요.
      </P>

      <P>
        체불확인서를 못 받는 상황이라면 <B>진정서 접수 확인서</B>로 대체할 수
        있어요. 고용노동부에 임금체불 진정을 넣으면 접수번호가 나오고, 이걸
        고용센터에 제출하면 체불 사실을 인정해줘요. 진정은 온라인(고용노동부 민원마당)
        또는 관할 노동청 방문으로 접수할 수 있어요.
      </P>

      <H3>증빙서류 종류와 발급처</H3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 450 }}>
          <thead>
            <tr>
              <THL>서류명</THL>
              <TH>발급처</TH>
              <TH>중요도</TH>
            </tr>
          </thead>
          <tbody>
            {[
              { row: ["체불임금등사업주확인서", "관할 노동청", "핵심 (가장 강력)"], hl: true },
              { row: ["진정서 접수 확인서", "고용노동부", "대체 가능"], hl: false },
              { row: ["근로계약서", "본인 보관", "보조 증빙"], hl: false },
              { row: ["급여명세서 · 임금대장", "사업장 / 본인", "원래 급여액 증명"], hl: false },
              { row: ["계좌이체내역서", "거래 은행", "실제 입금 여부 확인"], hl: false },
            ].map((item, ri) => (
              <tr key={ri}>
                {item.row.map((cell, ci) => (
                  <td
                    key={ci}
                    style={{
                      padding: "9px 8px",
                      textAlign: ci === 0 ? "left" : "center",
                      borderBottom: "1px solid #E5E7EB",
                      fontWeight: ci === 0 || item.hl ? 600 : 400,
                      fontSize: 13,
                      color: item.hl && ci === 2 ? "#1E3A5F" : ci === 0 ? "#111827" : "#374151",
                      background: item.hl ? "#F0F5FF" : "transparent",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>※ 체불확인서가 없으면 진정서 + 계좌이체내역 조합으로 대체 가능</TableNote>

      <H3>고용노동부 진정서 활용법</H3>

      <P>
        임금체불 진정은 <B>고용노동부 민원마당</B>(minwon.moel.go.kr)에서 온라인으로
        접수할 수 있어요. 민원 유형에서 &apos;임금체불&apos;을 선택하고, 체불 기간·금액·
        사업장 정보를 입력하면 돼요. 접수 후 보통 2~3주 안에 노동청에서 사업주에게
        연락이 가요.
      </P>

      <P>
        진정을 넣으면 두 가지 장점이 있어요. 첫째, <B>접수 확인서</B> 자체가
        증빙서류로 쓰여요. 둘째, 노동청 조사를 통해 <B>체불임금등사업주확인서</B>를
        공식 발급받을 수 있어요. 사업주가 비협조적이어도 노동청에서 직권으로
        조사하기 때문에 결과적으로 증빙이 나와요.
      </P>

      <P>
        한 가지 주의할 점은 진정 접수 후 사업주가 밀린 임금을 바로 지급하는
        경우예요. 이 경우 체불이 해소된 거라 퇴직 시점 기준으로 체불 상태가 아닐 수
        있어요. 그래서 퇴직 전에 미리 진정을 넣어두는 게 유리해요.
      </P>

      <Info type="warn">
        {"<strong>진정 타이밍:</strong> 퇴직 후에도 진정 접수는 가능하지만, 퇴직 전에 미리 넣어두면 체불 사실 입증이 훨씬 수월해요. 진정 접수일이 퇴직일보다 앞서면 <strong>정당사유 인정률이 높아져요.</strong>"}
      </Info>

      {/* RelatedMid — SECTION 03-04 사이 필수 */}
      <RelatedMid
        title="다른 퇴직 정당사유도 비교해 보세요"
        items={[
          { icon: "💸", title: "임금삭감 퇴직 정당사유", desc: "20% 이상 삭감 시 인정 조건", href: "/w/실업급여-임금삭감-퇴직-정당사유" },
          { icon: "😰", title: "직장내 괴롭힘 퇴직 정당사유", desc: "증빙서류와 신고 절차", href: "/w/실업급여-직장내-괴롭힘-퇴직-정당사유" },
          { icon: "📝", title: "이의신청 심사청구 재심사", desc: "불인정 시 90일 내 이의제기", href: "/w/실업급여-이의신청-심사청구-재심사-불복-절차" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 퇴직사유 전체 보기"
      />

      {/* ═══ SECTION 04: 일부 체불 ═══ */}
      <Divider />
      <Sec
        n="SECTION 04"
        id="s4"
        title="실업급여 임금체불 일부만 돼도 인정되나요?"
        sub="전액 체불 vs 일부 체불 차이 · 사례별 인정 여부 판단"
      />

      <P>
        결론부터 말하면, <B>일부 체불도 인정될 수 있어요.</B> 고용보험법 시행규칙
        별표2에서 &apos;임금을 지급하지 아니한 때&apos;라고만 규정하고 있어서,
        전액 체불만 해당되는 건 아니에요. 다만 일부 체불의 경우 고용센터에서 체불
        비율과 금액을 종합적으로 판단해요.
      </P>

      <P>
        예를 들어 월급 300만원 중 200만원만 받고 100만원이 매달 밀렸다면, 이것도
        체불이에요. 이런 상황이 2개월 이상 반복됐으면 정당사유로 인정받을 수
        있어요. 핵심은 체불 금액이 근로자에게 <B>상당한 불이익</B>을 주는 수준인지
        여부예요.
      </P>

      <P>
        반면 아주 소액만 밀린 경우, 예를 들어 월급 300만원 중 5만원이 한 달 늦게
        들어온 정도라면 정당사유로 보기 어려워요. 명확한 기준은 없지만, 실무적으로
        월 임금의 <B>30% 이상</B>이 체불됐으면 인정받을 가능성이 높아요.
      </P>

      <H3>전액 체불 vs 일부 체불 차이</H3>

      <P>
        전액 체불은 말 그대로 월급 전체를 못 받는 거예요. 이 경우 2개월분만
        채워지면 거의 자동으로 정당사유가 인정돼요. 증빙도 단순해요. 계좌에 입금
        기록이 아예 없으니까요. 고용센터에서 계좌이체내역만 확인하면 바로 판단할 수
        있어요.
      </P>

      <P>
        일부 체불은 조금 더 복잡해요. 원래 받아야 할 금액과 실제 받은 금액의 차이를
        증명해야 하거든요. 근로계약서에 적힌 급여액과 실제 입금액을 비교하는
        방식이에요. 그래서 일부 체불의 경우 <B>근로계약서</B>와{" "}
        <B>급여명세서</B>가 특히 중요한 증빙이 돼요.
      </P>

      <H3>사례별 인정 여부 판단</H3>

      <P>
        월급 250만원인 김 씨는 최근 3개월간 매달 150만원만 받았어요. 100만원씩 총
        300만원이 밀린 거예요. 이 경우 체불 비율이 40%이고 2개월 이상 지속됐으니{" "}
        <B>정당사유 인정</B>이에요. 근로계약서와 계좌이체내역을 함께 제출하면
        증빙이 완성돼요.
      </P>

      <P>
        반면 월급 300만원인 박 씨는 퇴직금 200만원을 못 받았어요. 이건 &apos;임금&apos;
        체불이 아니라 &apos;퇴직금&apos; 체불이에요. 퇴직금 미지급은 별도 사유(별표2
        제1호 다목)로 규정돼 있고, <B>퇴직금 지급기한(14일)</B>이 지나야 정당사유가
        돼요. 임금과 퇴직금은 다르게 판단된다는 걸 기억하세요.
      </P>

      <P>
        또 다른 사례로, 성과급이나 상여금이 밀린 경우가 있어요. 근로계약서나 취업규칙에
        지급 조건이 명시돼 있으면 임금으로 봐서 체불로 인정될 수 있어요. 하지만
        &apos;회사 사정에 따라 지급&apos;이라고만 적혀 있으면 인정받기 어려워요.
      </P>

      <InlineLink
        icon="💸"
        title="임금삭감 퇴직 정당사유 — 20% 기준 인정 조건"
        desc="임금이 삭감된 경우의 정당사유 기준과 증빙 방법"
        href="/w/실업급여-임금삭감-퇴직-정당사유"
      />

      <BridgeCard
        q="퇴직금 미지급도 정당사유가 돼요"
        a="퇴직금은 14일 이내 지급이 원칙이에요. 기한이 지나면 연 20% 지연이자가 붙고, 별도의 정당한 이직사유로 인정돼요."
        label="퇴직금 지급기한과 지연이자 보기"
        href="/w/퇴직금-지급기한-지연이자"
      />

      {/* ═══ SECTION 05: 제출 절차 ═══ */}
      <Divider />
      <Sec
        n="SECTION 05"
        id="s5"
        title="실업급여 임금체불 증빙서류 제출 절차가 어떻게 되나요?"
        sub="고용센터 제출 순서 · 이직확인서 정정 방법"
      />

      <P>
        임금체불로 퇴직한 후 실업급여를 받기까지의 절차를 순서대로 정리할게요.
        핵심은 <B>증빙서류를 먼저 갖추고</B>, 고용센터에서 수급자격 인정을 받는
        거예요. 이직확인서 내용이 잘못됐더라도 여기서 바로잡을 수 있어요.
      </P>

      <P>
        전체 과정은 보통 <B>2~4주</B>가 걸려요. 고용노동부 진정을 먼저 넣은
        경우에는 이미 증빙이 준비된 상태라 더 빠르게 진행돼요. 진정 없이 바로
        고용센터에 가는 경우에도 접수 자체는 가능하지만, 증빙 보완을 요구받을 수
        있어서 시간이 더 걸릴 수 있어요.
      </P>

      <P>
        가장 효율적인 순서는 이래요. 먼저 고용노동부에 진정을 넣고, 접수 확인서를
        받은 다음, 고용센터에서 실업급여를 신청하는 거예요. 이렇게 하면 한 번에
        처리가 돼요.
      </P>

      <H3>고용센터 제출 순서</H3>

      <P>
        1단계: <B>고용노동부 임금체불 진정 접수</B>. 민원마당(minwon.moel.go.kr)
        또는 관할 노동청 방문. 접수 후 확인서(접수번호) 수령. 이 단계는 생략
        가능하지만, 하면 증빙력이 확 올라가요.
      </P>

      <P>
        2단계: <B>이직확인서 확인</B>. 사업주가 이직확인서를 제출했는지 고용24에서
        확인해요. 미제출 시 고용센터에 신고하면 사업주에게 제출 독촉이 나가요.
        사업주가 끝까지 제출하지 않으면 고용센터가 직권으로 이직확인서를 작성할 수도
        있어요.
      </P>

      <P>
        3단계: <B>고용센터 방문 + 수급자격 신청</B>. 주소지 관할 고용센터에
        신분증, 증빙서류(체불확인서 또는 진정 접수 확인서 + 근로계약서 +
        계좌이체내역), 통장사본을 지참해서 방문해요. 워크넷 구직등록도 같이
        진행하면 돼요.
      </P>

      <H3>이직확인서 정정 방법</H3>

      <P>
        사업주가 이직확인서에 이직사유를 &apos;자발적 퇴사&apos;로 적은 경우가
        많아요. 이때 고용센터 담당자에게 <B>이직사유 변경 요청</B>을 하면 돼요.
        체불 증빙서류를 함께 제출하면 고용센터가 사업주에게 사실 확인을 하고, 확인이
        되면 &apos;정당한 이직사유(임금체불)&apos;로 변경해줘요.
      </P>

      <P>
        사업주가 사실관계를 부인하는 경우에도 고용노동부 진정 결과나 체불확인서가
        있으면 고용센터가 직권으로 정당사유를 인정할 수 있어요. 사업주의 동의가
        반드시 필요한 건 아니에요. 그래서 진정을 먼저 넣어두는 게 중요한 거예요.
      </P>

      <P>
        정정이 완료되면 <B>7일 대기기간</B> 후 첫 실업인정일부터 실업급여가
        지급돼요. 이직사유 변경에 추가로 걸리는 시간은 보통 1~2주 정도예요. 그
        기간 동안에도 구직활동은 미리 시작해두면 나중에 소급 인정받을 수 있어요.
      </P>

      <SpokeLink num={1} title="실업급여 신청 방법 절차 준비서류" desc="고용24 온라인 신청부터 준비서류까지 안내" href="/w/실업급여-신청-방법-절차-준비서류" />
      <SpokeLink num={2} title="임금삭감 퇴직 정당사유 인정 조건" desc="임금 20% 이상 삭감 시 정당사유 기준" href="/w/실업급여-임금삭감-퇴직-정당사유" />

      <ExtBtn
        href="https://www.ei.go.kr/ei/eih/cm/hm/main.do"
        badge="고용24 공식"
        text="실업급여 온라인 신청"
        cta="신청하기 →"
      />

      {/* ═══ FAQ ═══ */}
      <Divider />
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" />

      <FAQAccordion items={meta.faq} />

      {/* 관련 글 */}
      <RelatedArticles
        items={[
          { title: "실업급여 수급 조건 자격 요건", desc: "실업급여·수급자격", href: "/w/실업급여-수급-조건-자격-요건-완벽정리" },
          { title: "실업급여 신청 방법 절차 준비서류", desc: "실업급여·신청", href: "/w/실업급여-신청-방법-절차-준비서류" },
          { title: "임금삭감 퇴직 정당사유", desc: "실업급여·퇴직사유", href: "/w/실업급여-임금삭감-퇴직-정당사유" },
          { title: "직장내 괴롭힘 퇴직 정당사유", desc: "실업급여·퇴직사유", href: "/w/실업급여-직장내-괴롭힘-퇴직-정당사유" },
          { title: "이의신청 심사청구 재심사 절차", desc: "실업급여·불복절차", href: "/w/실업급여-이의신청-심사청구-재심사-불복-절차" },
        ]}
      />

      <PrevNext
        prev={{ title: "실업급여 피보험기간 180일 계산 합산 방법", href: "/w/실업급여-피보험기간-180일-계산-합산-방법" }}
        next={{ title: "실업급여 육아 퇴직 수급기간 연장", href: "/w/실업급여-육아-퇴직-수급기간-연장" }}
      />
    </BlogLayout>
  );
}
