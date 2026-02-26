"use client";
import { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "실업급여 육아 퇴직 수급기간 연장 | 8세 이하 자녀 최대 4년 특례",
  description: "육아 사유로 퇴직하면 실업급여 수급기간이 최대 4년까지 연장돼요. 8세 이하 자녀 기준과 연장 신청 방법을 정리했어요.",
  category: "실업급여",
  keywords: ["실업급여 육아 연장", "육아 퇴직", "최대 4년 특례", "8세 이하 조건"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-25",
  datePublished: "2026-02-25",
  summary: [
    "육아 사유 퇴직 시 수급기간 <strong>최대 4년</strong>까지 연장 가능해요",
    "자녀 기준: <strong>8세 이하</strong> 또는 초등학교 2학년 이하",
    "고용보험법 <strong>제48조</strong> + 시행령 제70조가 근거 법령이에요",
  ],
  sources: [
    { name: "고용보험법 제48조", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=3&cnpClsNo=1", date: "2026-01" },
    { name: "고용보험법 시행령 제70조", url: "https://www.law.go.kr/법령/고용보험법시행령", date: "2026-01" },
  ],
  faq: [
    { q: "육아 퇴직이 아니라 육아휴직 후 복직했다가 퇴직해도 연장되나요?", a: "네, 퇴직 사유가 아니라 수급기간 중 육아로 취업할 수 없는 상태면 연장 신청이 가능해요. 퇴직 후 구직급여를 받는 동안 육아 사유가 있으면 돼요." },
    { q: "아이가 두 명이면 수급기간이 더 늘어나나요?", a: "아니에요. 자녀 수와 관계없이 수급기간 연장은 최대 4년이에요. 다만 육아 사유 기간이 길어지면 그만큼 연장 가능 기간도 늘어나요." },
  ],
  ctaCard: {
    label: "30초 판정",
    mainText: "육아 퇴직 → 수급기간 최대 4년",
    subText: "내 상황으로 연장 가능 여부 확인",
    url: "#checker",
    external: false,
  },
  relatedDocs: [
    { title: "실업급여 신청 방법", url: "/w/실업급여-신청-방법-절차-준비서류" },
    { title: "실업급여 수급 조건", url: "/w/실업급여-수급-조건-자격-요건-완벽정리" },
  ],
};

export default function Article85() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  const getResult = () => {
    if (!sel.child || !sel.reason || !sel.insured || !sel.period) return null;
    const childOk = sel.child === "under8" || sel.child === "elem2";
    const reasonOk = sel.reason === "care" || sel.reason === "both";
    const insuredOk = sel.insured === "yes" || sel.insured === "merge";
    const periodOk = sel.period !== "over12";
    const pass = childOk && reasonOk && insuredOk && periodOk;
    return { pass, childOk, reasonOk, insuredOk, periodOk };
  };

  const result = getResult();

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "수급기간", "육아 연장"]}
      tags={["2026년 기준", "실업급여", "육아 퇴직"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={
        <>
          아이를 돌봐야 해서 구직활동을 못 하고 있다면, 실업급여{" "}
          <strong>수급기간을 최대 4년까지</strong> 늘릴 수 있어요.
          고용보험법 제48조에 따른 연장 조건과 신청 방법을 정리했어요.
        </>
      }
      sourceBar={{
        badge: "출처",
        name: "고용보험법 제48조 · 시행령 제70조",
        date: "2026.01 시행",
      }}
      stickyLabel="수급기간 연장"
      stickyValue="최대 4년"
      stickyBtn="내 연장 가능 여부 ↑"
      disclaimer="이 글은 고용보험법을 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 정확한 연장 판정은 관할 고용센터에서 진행하세요."
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
              { title: "임금체불 퇴직 정당사유", cat: "실업급여·퇴직사유", href: "/w/실업급여-임금체불-퇴직-정당사유" },
              { title: "피보험기간 180일 계산 합산", cat: "실업급여·피보험기간", href: "/w/실업급여-피보험기간-180일-계산-합산-방법" },
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
          { t: "내 육아 상황이 수급기간 연장에 해당하는지 간편 체크", sub: null },
          { t: "실업급여 육아 연장은 어떤 조건에서 가능한가요?", sub: "연장 가능 사유 전체 목록 · 자녀 나이 기준 정리" },
          { t: "실업급여 육아 퇴직도 정당사유로 인정되나요?", sub: "비자발적 퇴사 인정 기준 · 육아휴직 후 퇴직 사례" },
          { t: "실업급여 최대 4년 특례는 어떻게 적용되나요?", sub: "기본 12개월과 연장의 차이 · 연장 신청 절차" },
          { t: "실업급여 8세 이하 조건은 정확히 언제까지인가요?", sub: "만 나이 기준 판단법 · 초등 2학년 기준 적용" },
          { t: "자주 묻는 질문", sub: null },
        ]}
      />

      {/* 3줄 요약 */}
      <Summary3 items={meta.summary} />

      {/* PAS 브릿지 */}
      <BridgeCard
        q="아이 때문에 구직활동을 못 하는데, 실업급여가 끊기나요?"
        a="걱정하지 않아도 돼요. 육아 사유가 있으면 수급기간이 최대 4년까지 연장돼요. 그 기간 동안 실업급여 수급 자격이 유지되기 때문에, 아이가 어느 정도 크면 그때 구직활동을 시작할 수 있어요."
        label="내 연장 가능 여부 확인 ↓"
        href="#checker"
      />

      {/* ═══ STEP 01: 체커 ═══ */}
      <Divider />
      <Sec n="STEP 01" id="checker" title="내 육아 상황이 수급기간 연장에 해당하는지 간편 체크" sub="4가지만 선택하면 바로 알 수 있어요" />

      <P>
        실업급여 수급기간 연장은 <B>구직급여를 받을 수 있는 기간</B>을 늘려주는
        제도예요. 보통 실업급여는 퇴직 후 12개월 안에 받아야 하는데, 육아처럼
        취업이 어려운 사유가 있으면 그 기간만큼 연장할 수 있어요.
      </P>

      <P>
        연장은 자동이 아니에요. 고용센터에 직접 신청해야 하고, 육아 사유를 증명하는
        서류도 필요해요. 아래 체커로 내 상황이 연장 대상인지 먼저 확인해보세요.
      </P>

      <CheckerShell
        title="육아 수급기간 연장 판정"
        subtitle="30초 확인"
        intro="자녀 나이와 퇴직 상황만 알면 바로 판정돼요."
      >
        <CheckerQ
          n="1"
          label="자녀의 나이가 어떻게 되나요?"
          group="child"
          opts={[["under8", "8세 이하 (만 나이)"], ["elem2", "초등 2학년 이하"], ["over8", "8세 초과"]]}
          sel={sel}
          pick={pick}
        />
        <CheckerQ
          n="2"
          label="퇴직 또는 구직 중단 사유가 뭔가요?"
          group="reason"
          opts={[["care", "육아 전담"], ["both", "출산 + 육아"], ["other", "다른 사유"]]}
          sel={sel}
          pick={pick}
        />
        <CheckerQ
          n="3"
          label="고용보험 피보험기간이 180일 이상인가요?"
          group="insured"
          opts={[["yes", "180일 이상"], ["no", "180일 미만"], ["merge", "이전 직장 합산 가능"]]}
          sel={sel}
          pick={pick}
        />
        <CheckerQ
          n="4"
          label="퇴직한 지 얼마나 됐나요?"
          group="period"
          opts={[["under6", "6개월 이내"], ["under12", "6~12개월"], ["over12", "12개월 초과"]]}
          sel={sel}
          pick={pick}
        />

        {result &&
          (result.pass ? (
            <ResultPass
              title="육아 수급기간 연장 대상이에요"
              desc={`자녀가 ${sel.child === "under8" ? "8세 이하" : "초등 2학년 이하"}이고 피보험기간도 충족돼요. 고용센터에 연장 신청을 하면 최대 4년까지 수급기간이 늘어나요.`}
            >
              <ResultGrid
                items={[
                  { icon: "✅", name: "자녀 나이", pass: true, desc: sel.child === "under8" ? "8세 이하" : "초등 2학년 이하" },
                  { icon: "✅", name: "퇴직 사유", pass: true, desc: sel.reason === "both" ? "출산 + 육아" : "육아 전담" },
                  { icon: "✅", name: "피보험기간", pass: true, desc: "180일 충족" },
                  { icon: "✅", name: "퇴직 시점", pass: true, desc: sel.period === "under6" ? "6개월 이내" : "12개월 이내" },
                ]}
              />
              <ResultCTA
                icon="📝"
                title="실업급여 신청 방법과 절차"
                desc="고용24 온라인 신청부터 준비서류까지 안내"
                href="/w/실업급여-신청-방법-절차-준비서류"
              />
            </ResultPass>
          ) : (
            <ResultFail
              title={
                !result.childOk
                  ? "자녀가 8세를 초과했어요"
                  : !result.reasonOk
                    ? "육아 외 사유는 별도 확인이 필요해요"
                    : !result.insuredOk
                      ? "피보험기간이 부족해요"
                      : "퇴직 후 12개월이 지났어요"
              }
              desc={
                !result.childOk
                  ? "8세 이하 또는 초등 2학년 이하 자녀만 육아 연장 사유에 해당해요. 다만 질병·부상 등 다른 연장 사유가 있을 수 있어요."
                  : !result.reasonOk
                    ? "육아 외 사유(질병, 부상, 배우자 국외발령 등)로도 연장이 가능해요. 고용센터에서 상담받아보세요."
                    : !result.insuredOk
                      ? "피보험기간 180일을 채워야 실업급여 자체를 받을 수 있어요. 이전 직장 합산도 확인해보세요."
                      : "수급기간 연장 신청을 먼저 했어야 해요. 12개월 초과 시에도 사전 신청이 있었다면 인정될 수 있어요."
              }
            >
              <ResultGrid
                items={[
                  { icon: result.childOk ? "✅" : "❌", name: "자녀 나이", pass: result.childOk ?? false, desc: result.childOk ? "기준 충족" : "8세 초과" },
                  { icon: result.reasonOk ? "✅" : "⚠️", name: "퇴직 사유", pass: result.reasonOk ?? false, desc: result.reasonOk ? "육아 사유" : "다른 사유" },
                  { icon: result.insuredOk ? "✅" : "❌", name: "피보험기간", pass: result.insuredOk ?? false, desc: result.insuredOk ? "180일 충족" : "180일 미만" },
                  { icon: result.periodOk ? "✅" : "❌", name: "퇴직 시점", pass: result.periodOk ?? false, desc: result.periodOk ? "12개월 이내" : "12개월 초과" },
                ]}
              />
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #E5E7EB" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#111827", marginBottom: 6 }}>다른 방법도 있어요</div>
                {[
                  { icon: "📋", title: "피보험기간 합산 방법", desc: "이전 직장 합산으로 180일 채우기", href: "/w/실업급여-피보험기간-180일-계산-합산-방법" },
                  { icon: "💸", title: "임금체불 퇴직 정당사유", desc: "2개월 이상 체불 시 정당사유 인정", href: "/w/실업급여-임금체불-퇴직-정당사유" },
                  { icon: "😰", title: "직장내 괴롭힘 퇴직 정당사유", desc: "괴롭힘도 정당한 이직사유 인정", href: "/w/실업급여-직장내-괴롭힘-퇴직-정당사유" },
                  { icon: "⚖️", title: "이의신청 심사청구 재심사", desc: "불인정 시 90일 내 이의제기 가능", href: "/w/실업급여-이의신청-심사청구-재심사-불복-절차" },
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

      {/* ═══ SECTION 02: 연장 조건 ═══ */}
      <Divider />
      <Sec
        n="SECTION 02"
        id="s2"
        title="실업급여 육아 연장은 어떤 조건에서 가능한가요?"
        sub="연장 가능 사유 전체 목록 · 자녀 나이 기준 정리"
      />

      <P>
        실업급여 수급기간 연장은{" "}
        <A href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=3&cnpClsNo=1">
          고용보험법 제48조
        </A>
        에 근거해요. 구직급여의 수급기간은 원칙적으로 퇴직 후 12개월이지만, 취업이
        불가능한 정당한 사유가 있으면 그 기간만큼 연장돼요. 육아는 대표적인 연장
        사유 중 하나예요.
      </P>

      <P>
        연장은 &apos;수급기간을 뒤로 미뤄주는 것&apos;이에요. 원래 12개월 안에
        다 받아야 할 실업급여를, 육아 기간만큼 뒤로 밀어서 나중에 받을 수 있게
        해주는 거예요. 실업급여 금액이 늘어나는 건 아니지만, 받을 수 있는 기한이
        늘어나는 거라 실질적으로 큰 도움이 돼요.
      </P>

      <P>
        한 가지 꼭 알아둘 점은, 연장 신청을 <B>사전에</B> 해야 한다는 거예요.
        수급기간이 끝나고 나서 &apos;육아 때문에 못 받았는데&apos;라고 하면 소급
        적용이 안 돼요. 육아로 구직활동이 어려워지는 시점에 바로 고용센터에
        연장 신청을 해야 해요.
      </P>

      <H3>연장 가능 사유 전체 목록</H3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 400 }}>
          <thead>
            <tr>
              <THL>사유</THL>
              <TH>근거</TH>
              <TH>비고</TH>
            </tr>
          </thead>
          <tbody>
            {[
              { row: ["임신 · 출산 · 육아", "시행령 제70조", "가장 많이 활용"], hl: true },
              { row: ["본인 질병 · 부상", "시행령 제70조", "진단서 필요"], hl: false },
              { row: ["배우자 질병 · 부상 간병", "시행령 제70조", "가족관계증명서"], hl: false },
              { row: ["배우자 국외발령 동행", "시행령 제70조", "재외국민등록증"], hl: false },
              { row: ["직계존비속 질병 간병", "시행령 제70조", "진단서 + 가족관계"], hl: false },
              { row: ["병역의무 이행", "시행령 제70조", "입영통지서"], hl: false },
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
                      color: item.hl && ci === 0 ? "#1E3A5F" : ci === 0 ? "#111827" : "#374151",
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
      <TableNote>※ 고용보험법 시행령 제70조 기준 / 파란 행 = 육아 연장 사유</TableNote>

      <H3>자녀 나이 기준 정리</H3>

      <P>
        육아 연장의 핵심 기준은 자녀의 나이예요. 고용보험법 시행령에서 직접적으로
        &apos;8세 이하&apos;라고 명시하지는 않지만, 육아휴직 대상 기준인{" "}
        <B>만 8세 이하 또는 초등학교 2학년 이하</B>를 준용하는 게 실무 관례예요.
        고용센터에서도 이 기준으로 판단해요.
      </P>

      <P>
        여기서 &apos;만 8세 이하&apos;는 생일 기준이에요. 아이가 2018년 3월생이면
        2026년 3월에 만 8세가 돼요. 그 전까지는 연장 사유로 인정받을 수 있어요.
        초등학교 2학년 기준은 학년이 시작되는 3월 1일부터 다음 해 2월 말까지를
        한 학년으로 봐요.
      </P>

      <P>
        두 기준 중 하나만 충족하면 돼요. 만 나이로는 8세를 넘었지만 아직 초등 2학년
        이하라면(예: 일찍 입학한 경우) 연장 사유에 해당해요. 반대로 초등 3학년이지만
        만 8세라면(늦게 입학한 경우) 역시 해당돼요.
      </P>

      <InlineLink
        icon="📊"
        title="피보험기간 180일 계산 방법 — 이전 직장 합산 가능"
        desc="여러 직장 경력 합산으로 180일 채우는 방법"
        href="/w/실업급여-피보험기간-180일-계산-합산-방법"
      />

      {/* ═══ SECTION 03: 정당사유 인정 ═══ */}
      <Divider />
      <Sec
        n="SECTION 03"
        id="s3"
        title="실업급여 육아 퇴직도 정당사유로 인정되나요?"
        sub="비자발적 퇴사 인정 기준 · 육아휴직 후 퇴직 사례"
      />

      <P>
        육아 퇴직이 실업급여의 <B>정당한 이직사유</B>로 인정되는지는 상황에 따라
        달라요. 단순히 &apos;아이를 돌보고 싶어서 퇴사했다&apos;는 자발적 퇴사로
        분류될 수 있어요. 하지만 몇 가지 조건이 충족되면 정당사유로 인정받을 수
        있어요.
      </P>

      <P>
        고용보험법 시행규칙 별표2에 따르면, <B>자녀의 질병 · 부상으로 30일 이상
        간병</B>해야 하는 경우에는 정당한 이직사유로 인정돼요. 또한 배우자의 전근,
        가족 간병 등의 사유와 결합되면 인정 가능성이 높아져요. 단순한 육아 목적
        퇴직은 정당사유로 인정받기 어렵다는 점은 알아두세요.
      </P>

      <P>
        다만 여기서 중요한 건, <B>수급기간 연장</B>과 <B>정당사유 인정</B>은 별개
        라는 거예요. 정당사유로 퇴직해서 실업급여를 받고 있는 도중에 육아 사유가
        생기면 수급기간 연장을 신청할 수 있어요. 퇴직 사유와 연장 사유는 따로
        판단해요.
      </P>

      <H3>비자발적 퇴사 인정 기준</H3>

      <P>
        육아와 관련된 비자발적 퇴사 인정 사례를 정리하면 이래요. 첫째, 사업주가
        육아휴직을 거부하거나 불이익을 준 경우예요. 법적으로 육아휴직은 근로자의
        권리인데, 사업주가 이를 거부하면 정당사유가 돼요. 둘째, 육아기 근로시간
        단축을 신청했는데 거부당한 경우도 마찬가지예요.
      </P>

      <P>
        셋째, 임신 중 업무 전환을 요청했는데 사업주가 거부한 경우예요. 근로기준법상
        임산부는 야간·휴일 근로 제한과 경량 업무 전환을 요청할 수 있는데, 이걸
        거부하면 정당사유로 인정돼요. 넷째, 출산전후휴가를 부여하지 않은 경우도
        해당해요.
      </P>

      <H3>육아휴직 후 퇴직 사례</H3>

      <P>
        육아휴직을 다 쓰고 복직했는데 이전과 다른 부서로 배치되거나, 원래 업무와
        전혀 다른 일을 시키는 경우가 있어요. 이런 <B>불리한 처우</B>는 정당사유로
        인정될 수 있어요. 육아휴직 복귀 후 3개월 이내에 퇴직하면서 불리한 처우를
        증명할 수 있으면 인정 가능성이 높아요.
      </P>

      <P>
        반면, 육아휴직을 충분히 사용하고 정상 복직한 뒤 &apos;아이를 더 돌보고
        싶어서&apos; 자발적으로 퇴사한 경우에는 정당사유가 아니에요. 이 경우에도
        실업급여 자체는 못 받지만, 나중에 다른 직장에 취업했다가 퇴직하면 그때
        받을 수 있어요.
      </P>

      <Info type="warn">
        {"<strong>핵심 구분:</strong> 정당사유(실업급여 수급 자격)와 수급기간 연장(받을 수 있는 기한 연장)은 별개예요. 정당사유로 실업급여를 받는 중에 육아 사유가 생기면, 수급기간 연장을 <strong>추가로</strong> 신청하는 거예요."}
      </Info>

      {/* RelatedMid — SECTION 03-04 사이 필수 */}
      <RelatedMid
        title="다른 퇴직 정당사유도 비교해 보세요"
        items={[
          { icon: "💸", title: "임금체불 퇴직 정당사유", desc: "2개월 이상 체불 시 인정 조건", href: "/w/실업급여-임금체불-퇴직-정당사유" },
          { icon: "💰", title: "임금삭감 퇴직 정당사유", desc: "20% 이상 삭감 시 인정 조건", href: "/w/실업급여-임금삭감-퇴직-정당사유" },
          { icon: "😰", title: "직장내 괴롭힘 퇴직 정당사유", desc: "증빙서류와 신고 절차", href: "/w/실업급여-직장내-괴롭힘-퇴직-정당사유" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      {/* ═══ SECTION 04: 4년 특례 ═══ */}
      <Divider />
      <Sec
        n="SECTION 04"
        id="s4"
        title="실업급여 최대 4년 특례는 어떻게 적용되나요?"
        sub="기본 12개월과 연장의 차이 · 연장 신청 절차"
      />

      <P>
        실업급여 수급기간은 기본 <B>12개월</B>이에요. 퇴직일 다음 날부터 12개월
        안에 소정급여일수만큼 받아야 해요. 그런데 육아처럼 취업이 불가능한 사유가
        있으면, 그 불가능한 기간을 12개월에 더해줘요. 이 합산 기간이 최대
        <B>4년</B>을 넘을 수 없다는 게 &apos;4년 특례&apos;의 핵심이에요.
      </P>

      <P>
        예를 들어볼게요. 2026년 1월에 퇴직했고, 소정급여일수가 150일(약 5개월)이라면
        원래 2027년 1월까지 다 받아야 해요. 그런데 아이가 태어나서 2년간 육아를
        해야 한다면, 수급기간이 12개월 + 24개월 = 36개월로 연장돼요. 즉 2029년
        1월까지 150일치를 받을 수 있게 되는 거예요.
      </P>

      <P>
        4년이 최대라는 건, 여러 사유를 합쳐도 퇴직일로부터 4년을 넘길 수 없다는
        뜻이에요. 육아 2년 + 본인 질병 1년이면 합산 3년이라 4년 안에 들어가요.
        하지만 육아 3년 + 질병 2년이면 합산 5년인데, 이 경우에도 최대 4년만
        인정돼요.
      </P>

      <H3>기본 12개월과 연장의 차이</H3>

      <P>
        기본 12개월은 모든 실업급여 수급자에게 동일하게 적용돼요. 이 기간 안에
        실업인정일마다 고용센터에 출석하고, 구직활동을 증명해야 해요. 연장이 되면
        이 12개월이 &apos;일시정지&apos;되는 거라고 생각하면 돼요. 육아 기간 동안은
        실업인정을 받지 않아도 되고, 육아가 끝나면 다시 이어서 받을 수 있어요.
      </P>

      <P>
        연장 기간 중에는 실업급여가 <B>지급되지 않아요.</B> 연장은 &apos;나중에
        받을 수 있게 기한을 늘려주는 것&apos;이지, 육아 중에 실업급여를 주는 게
        아니에요. 육아가 끝나고 다시 구직활동을 시작하면 남은 소정급여일수만큼
        받을 수 있어요.
      </P>

      <H3>연장 신청 절차</H3>

      <P>
        1단계: <B>관할 고용센터 방문 또는 고용24 접수</B>. 수급기간 연장 신청서를
        작성해요. 온라인(고용24)으로도 일부 접수가 가능하지만, 첫 신청은 방문이
        확실해요. 신분증, 주민등록등본(자녀 확인용), 구직급여 수급자격 인정서를
        지참하세요.
      </P>

      <P>
        2단계: <B>육아 사유 증빙서류 제출</B>. 주민등록등본으로 자녀의 나이를
        확인하고, 별도의 어린이집·유치원 미이용 확인서나 자녀 돌봄 사실확인서 등을
        요구할 수 있어요. 서류는 고용센터마다 조금씩 다를 수 있으니 사전에
        전화로 확인하는 게 좋아요.
      </P>

      <P>
        3단계: <B>승인 후 수급기간 자동 연장</B>. 승인되면 고용24에서 수급기간이
        변경된 걸 확인할 수 있어요. 이후 육아가 끝나고 구직활동을 재개하면 고용센터에
        다시 출석해서 실업인정을 받으면 돼요. 남은 급여일수는 그대로 유지돼요.
      </P>

      <BridgeCard
        q="육아휴직 급여와 실업급여, 동시에 받을 수 있나요?"
        a="안 돼요. 육아휴직 급여를 받고 있는 동안에는 실업급여를 받을 수 없어요. 육아휴직이 끝나고 퇴직한 후에 실업급여를 신청하는 거예요. 수급기간 연장은 실업급여 수급 중에 육아 사유가 생겼을 때 활용하는 제도예요."
        label="실업급여 신청 절차 보기"
        href="/w/실업급여-신청-방법-절차-준비서류"
      />

      {/* ═══ SECTION 05: 8세 이하 기준 ═══ */}
      <Divider />
      <Sec
        n="SECTION 05"
        id="s5"
        title="실업급여 8세 이하 조건은 정확히 언제까지인가요?"
        sub="만 나이 기준 판단법 · 초등 2학년 기준 적용"
      />

      <P>
        &apos;8세 이하&apos;는 <B>만 나이</B> 기준이에요. 2022년부터 시행된
        만 나이 통일법에 따라, 생일이 지나야 한 살이 더해져요. 2018년 5월생 아이라면
        2026년 5월에 만 8세가 돼요. 5월 전까지는 만 7세이므로 &apos;8세 이하&apos;에
        해당해요.
      </P>

      <P>
        실무적으로 고용센터에서는 <B>연장 신청일</B> 기준으로 자녀의 만 나이를
        판단해요. 연장 신청을 넣는 시점에 아이가 만 8세 이하이면 돼요. 연장이
        승인된 후에 아이가 만 9세가 되더라도 이미 승인된 연장은 취소되지 않아요.
        그래서 신청 타이밍이 중요해요.
      </P>

      <P>
        만약 아이가 곧 만 9세가 된다면, 8세인 동안 빨리 연장 신청을 넣는 게
        유리해요. 생일이 지나서 만 9세가 되면 육아 연장 사유가 소멸하니까요. 다만
        초등 2학년 이하 기준도 있으니, 만 나이가 넘었더라도 학년을 확인해보세요.
      </P>

      <H3>만 나이 기준 판단법</H3>

      <P>
        만 나이 = 현재 연도 - 출생 연도. 단, 생일이 아직 안 지났으면 1을 빼요.
        예를 들어 2018년 8월생 아이의 2026년 3월 기준 만 나이는 2026 - 2018 - 1 =
        만 7세예요. 2026년 8월이 지나면 만 8세가 돼요. 만 8세까지는 연장 대상이에요.
      </P>

      <P>
        쌍둥이나 연년생이 있는 경우, 막내 자녀 기준으로 판단해요. 첫째가 만 10세여도
        둘째가 만 6세라면 육아 연장 사유에 해당해요. 어떤 자녀든 한 명이라도
        8세 이하이면 돼요.
      </P>

      <H3>초등 2학년 기준 적용</H3>

      <P>
        초등학교 2학년 이하라는 기준은 만 나이와 별도로 적용돼요. 아이가 일찍
        입학해서 만 8세를 넘었지만 아직 초등 2학년이라면 연장 대상이에요. 반대로
        만 8세이지만 초등 3학년이라면? 이 경우에도 만 나이 기준(8세 이하)에
        해당하므로 연장 가능해요.
      </P>

      <P>
        학년 기준은 3월 1일부터 다음 해 2월 말까지를 한 학년으로 봐요. 초등 2학년은
        보통 만 8~9세에 해당하는데, 입학 시기에 따라 달라질 수 있어요. 고용센터에
        제출할 때는 주민등록등본(생년월일 확인)과 재학증명서(학년 확인)를 함께
        가져가면 확실해요.
      </P>

      <P>
        정리하면, <B>만 8세 이하</B> 또는 <B>초등 2학년 이하</B> 중 하나만
        충족하면 육아 연장 사유가 인정돼요. 두 기준 모두 넘으면(만 9세 이상 +
        초등 3학년 이상) 육아 연장은 안 되지만, 다른 연장 사유(질병, 부상 등)가
        있으면 별도로 신청할 수 있어요.
      </P>

      <ExtBtn
        href="https://www.ei.go.kr/ei/eih/cm/hm/main.do"
        badge="고용24 공식"
        text="실업급여 수급기간 연장 신청"
        cta="신청하기 →"
      />

      {/* ═══ FAQ ═══ */}
      <Divider />
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" />

      <FAQAccordion items={meta.faq} />

      {/* 관련 글 */}
      <RelatedArticles
        items={[
          { num: "01", title: "실업급여 수급 조건 자격 요건", desc: "실업급여·수급자격", href: "/w/실업급여-수급-조건-자격-요건-완벽정리" },
          { num: "02", title: "실업급여 신청 방법 절차 준비서류", desc: "실업급여·신청", href: "/w/실업급여-신청-방법-절차-준비서류" },
          { num: "03", title: "임금체불 퇴직 정당사유", desc: "실업급여·퇴직사유", href: "/w/실업급여-임금체불-퇴직-정당사유" },
          { num: "04", title: "피보험기간 180일 계산 합산", desc: "실업급여·피보험기간", href: "/w/실업급여-피보험기간-180일-계산-합산-방법" },
          { num: "05", title: "이의신청 심사청구 재심사 절차", desc: "실업급여·불복절차", href: "/w/실업급여-이의신청-심사청구-재심사-불복-절차" },
        ]}
      />

      <PrevNext
        prev={{ title: "실업급여 임금체불 퇴직 정당사유", href: "/w/실업급여-임금체불-퇴직-정당사유" }}
        next={{ title: "실업급여 직장내 괴롭힘 퇴직 정당사유", href: "/w/실업급여-직장내-괴롭힘-퇴직-정당사유" }}
      />
    </BlogLayout>
  );
}
