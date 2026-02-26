"use client";

import { useState } from "react";
import {
  C, Btn, Info, Divider, Sec, P, B, A,
  TableTitle, TableNote, TH, THL,
  BridgeCard, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext,
  InlineLink, SpokeLink,
} from "@/components/wiki/BlogShared";

// ── 체커 로직 ──
type ResLink = { icon: string; title: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; links: ResLink[] };

function getResult(sel: Record<string, string>): Res | null {
  const { hours, reported } = sel;
  if (!hours) return null;
  if (hours === "under15" && !reported) return null;

  if (hours === "over15") {
    return {
      pass: false,
      headline: "주 15시간 이상이면 취업으로 간주돼요",
      detail: "월 60시간(주 15시간) 이상 근무하면 취업으로 간주돼서 실업급여 수급이 중단돼요. 소정급여일수가 많이 남아있다면 조기재취업수당 신청이 가능해요.",
      badges: ["취업 간주", "수급 중단 가능"],
      links: [
        { icon: "💰", title: "조기재취업수당 조건 — 남은 급여 50%", href: "/w/실업급여-재취업-조건" },
        { icon: "📋", title: "실업급여 수급기간 계산 방법", href: "/w/실업급여-수급기간-몇개월-받나요" },
      ],
    };
  }

  if (hours === "oneday") {
    return {
      pass: true,
      headline: "하루 알바도 반드시 신고해야 해요",
      detail: "1일 단기 알바도 실업인정 신청 시 근로 사실을 신고해야 해요. 신고하면 그날 하루만 실업급여 지급에서 제외돼요. 신고하지 않으면 부정수급이 돼요.",
      badges: ["신고 필수", "1일 제외"],
      links: [
        { icon: "📋", title: "고용24 알바 신고 방법 단계별", href: "/w/실업급여-받으면서-알바-가능여부" },
        { icon: "⚠️", title: "알바 미신고 부정수급 처벌", href: "/w/실업급여-알바-미신고" },
      ],
    };
  }

  if (hours === "under15" && reported === "yes") {
    return {
      pass: true,
      headline: "정상적으로 수급할 수 있어요",
      detail: "주 15시간 미만 알바를 하고 신고도 했으면 근로일만 제외하고 나머지 날은 실업급여를 받을 수 있어요. 실업급여를 줄이지 않고 병행할 수 있어요.",
      badges: ["정상 수급", "신고 완료"],
      links: [
        { icon: "📋", title: "실업급여 소정급여일수 기준표", href: "/w/실업급여-소정급여일수" },
        { icon: "💰", title: "실업급여 기초일액 계산 방법", href: "/w/실업급여-기초일액" },
      ],
    };
  }

  if (hours === "under15" && reported === "no") {
    return {
      pass: false,
      headline: "지금 바로 자진신고를 해야 해요",
      detail: "신고하지 않고 알바를 하면 부정수급이 돼요. 자진신고 시 최초 1회는 추가 징수 없이 반환으로 처리될 수 있어요. 발견되면 반환 + 추가 징수가 붙어요.",
      badges: ["미신고", "즉시 자진신고 필요"],
      links: [
        { icon: "⚠️", title: "알바 미신고 부정수급 처벌 내용", href: "/w/실업급여-알바-미신고" },
        { icon: "📋", title: "고용24 알바 신고 방법 단계별", href: "/w/실업급여-받으면서-알바-가능여부" },
      ],
    };
  }

  return null;
}

export default function Article() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "알바 가능 여부"]}
      tags={["2026년 기준", "실업급여", "알바 신고"]}
      date="2026-02-23"
      title="실업급여 받으면서 알바 가능 여부 | 월 60시간 기준 신고 방법"
      description={
        <>
          실업급여 수급 중 알바는 <strong style={{ color: C.t1 }}>월 60시간(주 15시간) 미만이면 가능</strong>해요. 단, 반드시 실업인정 신청 시 근로 사실을 신고해야 해요. 신고 안 하면 부정수급이에요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제57조 · 구직급여 수급 중 취업 신고 기준", date: "2026.02 기준" }}
      stickyLabel="기준 시간"
      stickyValue="월 60시간 미만"
      stickyBtn="신고 방법 확인 →"
      stickyHref="https://www.work24.go.kr"
    >
      <TOC items={[
        { t: "알바 가능 여부 체크", sub: "근무 시간 · 신고 여부 선택" },
        { t: "실업급여 받으면서 알바 가능 여부 — 월 60시간 기준이 뭐예요?", sub: null },
        { t: "실업급여 알바 하면 실업급여가 얼마나 줄어드나요?", sub: "근로일만 제외돼요" },
        { t: "실업급여 받으면서 알바 신고 방법은 어떻게 되나요?", sub: null },
        { t: "실업급여 알바 미신고 시 어떻게 되나요?", sub: null },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "실업급여 수급 중 알바는 <strong>월 60시간(주 15시간) 미만</strong>이면 가능해요. 이 이상이면 취업으로 간주돼요.",
        "알바를 하면 <strong>반드시 신고</strong>해야 해요. 실업인정 신청 시 근로 사실을 입력하면 돼요.",
        "신고하면 근로일만 실업급여에서 제외돼요. <strong>미신고하면 부정수급</strong>으로 반환 + 추가 징수가 붙어요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="알바 가능 여부 체크" sub="근무 시간을 선택해 주세요" />

      <P>실업급여 수급 중 알바 가능 여부는 근무 시간에 따라 달라요. 두 가지를 선택하면 내 상황에 맞는 안내를 바로 볼 수 있어요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💼</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>알바 가능 여부 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>30초 확인</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              주당 알바 근무 시간이 얼마나 되나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="hours" value="under15" label="주 15시간 미만이에요" sel={sel} pick={pick} />
              <Btn group="hours" value="over15" label="주 15시간 이상이에요" sel={sel} pick={pick} />
              <Btn group="hours" value="oneday" label="하루 단기 알바예요" sel={sel} pick={pick} />
            </div>
          </div>
          {sel.hours === "under15" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
                <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
                실업인정 신청 시 근로 사실을 신고했나요?
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                <Btn group="reported" value="yes" label="신고했어요" sel={sel} pick={pick} />
                <Btn group="reported" value="no" label="신고 안 했어요" sel={sel} pick={pick} />
              </div>
            </div>
          )}

          {result && (
            <div style={{ marginTop: 16, padding: 16, borderRadius: 8, background: result.pass ? C.navyLight : "#F5F5F5", border: result.pass ? "1px solid rgba(30,58,95,.1)" : `1px solid ${C.line}` }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: result.pass ? C.navy : C.t1, marginBottom: 4 }}>
                {result.pass ? "✅" : "⛔"} {result.headline}
              </div>
              <div style={{ fontSize: 13, color: C.t3, lineHeight: 1.55 }}>{result.detail}</div>
              <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" }}>
                {result.badges.map((b, i) => (
                  <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, background: result.pass ? C.navy : C.t4, color: "#fff" }}>{b}</span>
                ))}
              </div>
              {result.links.length > 0 && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: result.pass ? "1px solid rgba(30,58,95,.08)" : "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.t1, marginBottom: 6 }}>📖 관련 가이드</div>
                  {result.links.map((lnk, li) => (
                    <a key={li} href={lnk.href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", fontSize: 13, color: C.navy, fontWeight: 600, borderBottom: "1px solid rgba(30,58,95,.06)", textDecoration: "none" }}>
                      <span>{lnk.icon} {lnk.title}</span>
                      <span style={{ fontSize: 11, color: C.t4 }}>→</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 02 ── */}
      <Divider />
      <Sec n="SECTION 02" title="실업급여 받으면서 알바 가능 여부 — 월 60시간 기준이 뭐예요?" sub="취업 간주 기준선" />

      <P>실업급여를 받으면서 알바를 하는 건 원칙적으로 가능해요. 단, <B>월 60시간(주 15시간) 미만</B>이라는 조건이 있어요. 이 기준을 넘으면 취업으로 간주돼서 실업급여 수급이 중단될 수 있어요.</P>

      <P>월 60시간이라는 기준은 달력 기준 1개월 동안 모든 근무 시간을 합산한 거예요. 주당 15시간 × 4주 = 60시간이에요. 한 달에 2~3번 단기 알바를 하더라도 총 시간이 60시간을 넘으면 안 돼요.</P>

      <TableTitle>알바 시간별 처리 방식</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>근무 형태</THL><TH>처리 방식</TH><TH>실업급여</TH></tr>
          </thead>
          <tbody>
            {[
              ["주 15시간 미만 (월 60시간 미만)", "단기 취업 — 신고 후 계속 수급", "근로일 제외 지급"],
              ["주 15시간 이상 (월 60시간 이상)", "취업 간주 — 수급 자격 상실", "수급 중단"],
              ["1일 단기 알바 (일용직)", "단기 취업 — 신고 후 계속 수급", "해당일 제외 지급"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 8px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>※ 주 15시간 이상이어도 조기재취업수당 신청이 가능한 경우가 있어요.</TableNote>

      <P>주 15시간 이상 취업했다면 실업급여 수급은 중단되지만, 소정급여일수가 절반 이상 남아있으면 조기재취업수당을 신청할 수 있어요. 남은 급여의 50%를 일시금으로 받는 제도예요.</P>

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 알바 하면 실업급여가 얼마나 줄어드나요?" sub="근로일만 제외돼요" />

      <P>주 15시간 미만 알바를 하고 신고하면 <B>알바를 한 날(근로일)만 실업급여 지급에서 제외</B>돼요. 월별 수급이 아니라 일별로 계산되기 때문에, 알바를 많이 할수록 그만큼 실업급여 지급일수가 줄어요.</P>

      <P>예를 들어 월 10일 알바를 하고 신고했다면, 그 10일은 실업인정이 안 돼서 그날치 실업급여를 못 받아요. 하지만 소정급여일수에서 10일이 차감되는 게 아니라, 그냥 그 달에 10일 덜 받는 거예요. 소정급여일수는 그대로 남아요.</P>

      <P>결국 알바를 하면 그달 총 수령액은 줄지만, 수급기간이 12개월 안에 있다면 이후에 더 받을 수 있어요. 소정급여일수를 다 채울 때까지 계속 신청할 수 있어요.</P>

      <InlineLink icon="📅" title="실업급여 소정급여일수 기준표 — 얼마나 받나요?" desc="나이·피보험기간별 120~270일 기준표를 확인할 수 있어요." href="/w/실업급여-소정급여일수" />

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 받으면서 알바 신고 방법은 어떻게 되나요?" sub="실업인정 신청 시 입력" />

      <P>알바 신고는 실업인정 신청과 같이 진행해요. 고용24(work24.go.kr)에서 실업인정을 신청할 때 근로 사실이 있으면 해당 날짜와 시간, 임금을 입력하면 돼요. 별도의 서류 제출 없이 온라인에서 처리할 수 있어요.</P>

      <P>신고 내용은 근무처 이름, 근무 날짜, 근무 시간, 실제 지급받은 임금이에요. 고용24 화면에서 '취업/근로 사실' 체크박스를 선택하면 입력 칸이 나타나요. 일용직이라면 날짜별로 각각 입력해요.</P>

      <P>아직 임금을 받지 못했다면 나중에 수정 신고도 가능해요. 고용센터에 문의하면 처리 방법을 안내받을 수 있어요. 신고를 미루는 것보다 먼저 신고하고 수정하는 게 훨씬 나아요.</P>

      <BridgeCard
        question="고용24에서 알바 신고하는 방법이 헷갈리나요?"
        body={<>로그인 → 실업인정 신청 → 취업 사실 입력 순서예요. <strong style={{ color: C.navy }}>화면 캡처와 함께 단계별로 설명해 드려요.</strong></>}
        btnText="고용24 알바 신고 절차 상세 →"
        href="/w/실업급여-받으면서-알바-가능여부"
      />

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" title="실업급여 알바 미신고 시 어떻게 되나요?" sub="부정수급 처벌" />

      <P>알바를 하고 신고하지 않으면 <B>부정수급</B>이 돼요. 고용보험법에 따라 부정수급으로 받은 금액을 전액 반환해야 하고, 추가 징수가 붙어요. 단순 실수라도 적발되면 처벌을 피하기 어려워요.</P>

      <P>자진신고를 하면 최초 1회에 한해 추가 징수 없이 반환만 하는 감면 혜택이 있어요. 적발되기 전에 자진신고하는 게 훨씬 유리해요. 고용센터에 가서 부정수급 자진신고를 하면 돼요.</P>

      <P>고용센터는 카드 사용 내역, 건강보험 가입 이력, 근로복지공단 자료 등을 통해 취업 여부를 확인해요. 신고하지 않아도 나중에 발각될 가능성이 높아요.</P>

      <InlineLink icon="📝" title="실업급여 알바 신고방법 — 고용24 절차 단계별" desc="실업인정 신청 화면에서 근로 사실 입력하는 방법을 단계별로 정리했어요." href="/w/실업급여-받으면서-알바-가능여부" />

      <Info type="warn">
        알바 신고는 선택이 아니에요. 주 1시간 알바도 신고 대상이에요. 잊어버렸다면 다음 실업인정 때라도 이전 기간을 함께 신고하거나, 고용센터에 직접 방문해서 처리하세요.
      </Info>

      <div style={{ margin: "20px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 8 }}>📖 실업급여 더 알아보기</div>
        <SpokeLink num="01" title="고용24 알바 신고 방법 단계별 절차" desc="실업인정 신청 화면에서 근로 사실 입력하는 법" href="/w/실업급여-받으면서-알바-가능여부" />
        <SpokeLink num="02" title="알바 미신고 부정수급 처벌 — 환수 기준" desc="자진신고 감면 조건과 반환 처리 방법" href="/w/실업급여-알바-미신고" />
        <SpokeLink num="03" title="조기재취업수당 — 남은 급여 50% 조건" desc="취업 시 남은 실업급여 50%를 일시금으로 받는 방법" href="/w/실업급여-재취업-조건" />
      </div>

      <a href="https://www.work24.go.kr" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-blue">
        <span className="ext-btn-badge">고용24 공식</span>
        <span className="ext-btn-text">실업인정 신청 · 근로 사실 신고</span>
        <span className="ext-btn-cta">바로가기 →</span>
      </a>

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 받으면서 알바 가능 여부 기준이 어떻게 되나요?", a: "월 60시간(주 15시간) 미만이면 가능해요. 이 기준을 넘으면 취업으로 간주돼요. 가능한 경우에도 실업인정 신청 시 반드시 근로 사실을 신고해야 해요." },
        { q: "실업급여 알바를 신고하면 실업급여가 줄어드나요?", a: "근로일에 해당하는 날만 실업급여 지급에서 제외돼요. 소정급여일수 자체는 줄지 않아요. 12개월 기한 안에 남은 일수를 계속 받을 수 있어요." },
      ]} />

      <RelatedArticles items={[
        { title: "고용24 알바 신고 방법 단계별", desc: "실업급여 · 알바 신고", href: "/w/실업급여-받으면서-알바-가능여부" },
        { title: "알바 미신고 부정수급 처벌", desc: "실업급여 · 부정수급", href: "/w/실업급여-알바-미신고" },
        { title: "조기재취업수당 신청 조건", desc: "실업급여 · 조기재취업", href: "/w/실업급여-재취업-조건" },
      ]} />

      <PrevNext
        prev={{ title: "실업크레딧 신청 방법", href: "/w/실업급여-실업크레딧" }}
        next={{ title: "고용24 알바 신고 방법", href: "/w/실업급여-받으면서-알바-가능여부" }}
      />
    </BlogLayout>
  );
}
