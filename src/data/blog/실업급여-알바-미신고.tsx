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
  const { situation, timing } = sel;
  if (!situation) return null;
  if (situation === "unreported" && !timing) return null;

  if (situation === "about-to") {
    return {
      pass: true,
      headline: "신고 방법을 미리 알아두면 돼요",
      detail: "알바를 할 예정이라면 실업인정 신청 시 근로 사실을 입력하면 돼요. 주 15시간(월 60시간) 미만이면 수급을 유지할 수 있어요.",
      badges: ["신고 예정", "사전 안내"],
      links: [
        { icon: "📝", title: "고용24 알바 신고 방법 단계별", href: "/w/실업급여-받으면서-알바-가능여부" },
        { icon: "💼", title: "알바 가능 여부 — 월 60시간 기준", href: "/w/실업급여-받으면서-알바" },
      ],
    };
  }

  if (situation === "already-reported") {
    return {
      pass: true,
      headline: "자진신고 처리 중이에요",
      detail: "자진신고를 했다면 고용센터에서 검토 후 연락이 올 수 있어요. 최초 1회 자진신고 시 추가 징수 없이 반환만 하는 감면이 적용될 수 있어요.",
      badges: ["자진신고 완료", "처리 대기"],
      links: [
        { icon: "📝", title: "실업인정 신청 방법 전체 정리", href: "/w/실업급여-수급자격-인정" },
        { icon: "💼", title: "알바 가능 여부 기준 확인", href: "/w/실업급여-받으면서-알바" },
      ],
    };
  }

  if (situation === "unreported" && timing === "recent") {
    return {
      pass: false,
      headline: "빨리 자진신고하는 게 훨씬 유리해요",
      detail: "적발 전 자진신고 시 최초 1회는 추가 징수 없이 반환만 처리될 수 있어요. 고용센터에 직접 방문해서 부정수급 자진신고를 하세요.",
      badges: ["미신고", "즉시 자진신고 권장"],
      links: [
        { icon: "📝", title: "고용24 알바 신고 방법", href: "/w/실업급여-받으면서-알바-가능여부" },
        { icon: "💼", title: "알바 가능 여부 기준 확인", href: "/w/실업급여-받으면서-알바" },
      ],
    };
  }

  if (situation === "unreported" && timing === "past") {
    return {
      pass: false,
      headline: "오래됐어도 자진신고가 유리해요",
      detail: "한참 전 미신고 사실이라도 적발 전에 자진신고하면 추가 징수가 감면될 수 있어요. 고용센터에 방문해서 상담하세요. 지금이라도 자진신고가 유리해요.",
      badges: ["미신고 기간 있음", "자진신고 권장"],
      links: [
        { icon: "📝", title: "고용24 알바 신고 방법", href: "/w/실업급여-받으면서-알바-가능여부" },
        { icon: "💼", title: "부정수급 처벌 기준 상세", href: "/w/실업급여-알바-미신고" },
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
      breadcrumb={["홈", "실업급여", "부정수급"]}
      tags={["2026년 기준", "실업급여", "부정수급"]}
      date="2026-02-23"
      title="실업급여 알바 미신고 부정수급 처벌 | 5배 환수 자진신고 감면 조건"
      description={
        <>
          실업급여 수급 중 알바를 하고 신고하지 않으면 부정수급이에요. <strong style={{ color: C.t1 }}>받은 금액 전액 반환 + 추가 징수</strong>가 붙어요. 적발 전 자진신고 시 추가 징수 감면 혜택이 있어요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제62조 · 제116조", date: "2026.02 기준" }}
      stickyLabel="자진신고"
      stickyValue="추가 징수 감면"
      stickyBtn="자진신고 방법 →"
      stickyHref="https://www.work24.go.kr"
    >
      <TOC items={[
        { t: "현재 상황 확인", sub: "자진신고 필요 여부 체크" },
        { t: "실업급여 알바 미신고 부정수급 처벌이 어떻게 되나요?", sub: "반환 + 추가 징수 기준" },
        { t: "실업급여 5배 환수란 어떤 의미예요?", sub: "반환과 추가 징수 계산 방식" },
        { t: "실업급여 알바 미신고 자진신고 감면 조건이 어떻게 되나요?", sub: "자진신고 시 혜택" },
        { t: "고용센터는 미신고를 어떻게 알 수 있나요?", sub: "적발 경로와 대응" },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "알바 미신고는 <strong>부정수급</strong>이에요. 받은 금액 전액 반환 + 추가 징수가 붙어요.",
        "자진신고 시 최초 1회는 <strong>추가 징수 없이 반환만</strong> 처리될 수 있어요. 적발 전에 신고하는 게 유리해요.",
        "<strong>3년 이하 징역 또는 3천만원 이하 벌금</strong>의 형사처벌까지 받을 수 있어요. 고의적이거나 금액이 클수록 처벌이 강해요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="현재 상황 확인" sub="상황을 선택해 주세요" />

      <P>알바 미신고 상황인지, 앞으로 신고해야 하는지 먼저 확인해 보세요. 상황에 맞는 안내를 바로 볼 수 있어요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚠️</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>부정수급 상황 확인</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>30초 확인</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              지금 상황이 어떻게 되나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="situation" value="unreported" label="알바 했는데 신고 안 했어요" sel={sel} pick={pick} />
              <Btn group="situation" value="about-to" label="앞으로 알바할 예정이에요" sel={sel} pick={pick} />
              <Btn group="situation" value="already-reported" label="이미 자진신고 했어요" sel={sel} pick={pick} />
            </div>
          </div>
          {sel.situation === "unreported" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
                <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
                알바를 언제 했나요?
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                <Btn group="timing" value="recent" label="최근이에요 (이번 달~몇 주 전)" sel={sel} pick={pick} />
                <Btn group="timing" value="past" label="한참 전이에요 (몇 달 전)" sel={sel} pick={pick} />
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
      <Sec n="SECTION 02" title="실업급여 알바 미신고 부정수급 처벌이 어떻게 되나요?" sub="반환 + 추가 징수 기준" />

      <P>알바를 하고 신고하지 않으면 고용보험법 제62조에 따라 부정수급 처리가 돼요. 기본 처벌은 두 가지예요. 부정하게 받은 금액을 전액 반환하고, 추가 징수가 붙어요. 상황에 따라 형사처벌로 이어지기도 해요.</P>

      <P><A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제62조</A>에 따르면, 부정수급으로 받은 구직급여는 전액 반환해야 하고, 이에 추가해서 부정수급액에 상당하는 금액 이하를 더 징수할 수 있어요. 반환 금액과 추가 징수를 합하면 상당한 금액이 될 수 있어요.</P>

      <TableTitle>부정수급 처벌 기준</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>처벌 유형</THL><TH>내용</TH></tr>
          </thead>
          <tbody>
            {[
              ["반환 명령", "부정하게 받은 실업급여 전액 반환"],
              ["추가 징수", "반환 금액 외 추가로 부정수급액 이하 징수 (고용보험법 제62조)"],
              ["수급 자격 제한", "부정수급 적발 시 남은 수급자격 상실"],
              ["형사처벌", "3년 이하 징역 또는 3천만원 이하 벌금 (고용보험법 제116조)"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 8px", textAlign: "left", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>형사처벌은 부정수급 금액이 크거나 고의적인 반복 수급의 경우에 적용돼요. 단기 알바 1~2번을 신고하지 않은 수준이라면 형사처벌까지 가는 경우는 드물어요. 하지만 반환 + 추가 징수만으로도 상당한 금액이 될 수 있어요.</P>

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 5배 환수란 어떤 의미예요?" sub="반환과 추가 징수 계산 방식" />

      <P>포털에서 '실업급여 부정수급 5배 환수'라는 표현을 많이 볼 수 있어요. 이건 <B>부정수급 금액 반환 + 추가 징수를 합산했을 때 최대 배수</B>를 말해요. 법 조문상 추가 징수 가능 금액과 반환 금액을 합산하면 상당히 커질 수 있어요.</P>

      <P>구체적으로 적용 배수는 부정수급 유형, 고의성 여부, 금액 규모에 따라 다르게 결정돼요. 고용보험법 시행규칙에서 부정수급 유형별 추가 징수 기준을 따로 정하고 있어요. 자진신고 여부에 따라 적용되는 기준도 달라져요.</P>

      <P>중요한 건 자진신고를 하면 추가 징수가 면제되거나 감경될 수 있다는 거예요. 적발되기 전에 자진신고하면 반환만 하는 수준으로 처리될 수 있어요. 발각된 뒤에는 감면 혜택이 없어져요.</P>

      <InlineLink icon="📝" title="고용24 알바 신고 방법 — 단계별 절차" desc="다음 실업인정 신청 때 근로 사실 신고하는 방법이에요." href="/w/실업급여-받으면서-알바-가능여부" />

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 알바 미신고 자진신고 감면 조건이 어떻게 되나요?" sub="자진신고 시 혜택" />

      <P>자진신고는 적발되기 전에 스스로 신고하는 거예요. <B>최초 1회 자진신고 시</B> 추가 징수 없이 반환만 하는 감면 혜택이 주어질 수 있어요. 두 번째 이상이거나 적발 후라면 감면이 적용되지 않아요.</P>

      <P>자진신고는 관할 고용센터에 직접 방문해서 부정수급 자진신고를 하면 돼요. 가져갈 서류는 신분증과 관련 근로 자료(근로계약서, 급여명세서, 통장 입금 내역 등)예요. 사전에 전화로 예약하고 방문하면 편해요.</P>

      <P>자진신고를 하더라도 부정하게 받은 금액 자체는 반환해야 해요. 감면되는 건 추가 징수 부분이에요. 반환은 분할납부가 가능한 경우도 있으니 고용센터에서 상담하세요.</P>

      <Info type="warn">
        자진신고 감면은 적발 전에 신고한 경우에만 해당해요. 이미 고용센터에서 조사가 시작됐거나 연락을 받은 뒤라면 자진신고 감면이 적용되지 않아요. 빨리 신고할수록 유리해요.
      </Info>
      <InlineLink icon="⚠️" title="실업급여 부정수급 처벌 기준" desc="부정수급 유형별 처벌 기준과 환수 범위를 정리했어요." href="/w/실업급여-부정수급" />

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" title="고용센터는 미신고를 어떻게 알 수 있나요?" sub="적발 경로와 대응" />

      <P>고용센터는 다양한 경로로 부정수급을 적발해요. 국민건강보험 직장가입자 전환 내역, 근로복지공단 산재·고용보험 자료, 국세청 원천징수 자료 등을 정기적으로 대조해요. 알바를 하면 사업주가 고용보험이나 소득세를 신고하는 경우가 많아서 자연스럽게 드러나요.</P>

      <P>특히 3.3% 세금을 원천징수하는 프리랜서 계약이라면 국세청 자료와 대조해서 소득이 있는 걸 파악할 수 있어요. 건강보험 직장가입자로 등록되는 경우도 마찬가지예요. 알바 사실을 숨기기가 생각보다 어려워요.</P>

      <P>적발되면 소명 기회를 주는 게 원칙이에요. 하지만 소명이 되더라도 신고 의무를 몰랐다는 주장은 잘 받아들여지지 않아요. 알바 신고 의무는 수급자격 인정 시 서면으로 안내되기 때문이에요.</P>

      <BridgeCard
        question="실업급여 알바 신고를 어떻게 하는지 모르겠나요?"
        body={<>고용24에서 실업인정 신청 시 취업/근로 사실을 입력하면 돼요. <strong style={{ color: C.navy }}>단계별 화면과 함께 정리했어요.</strong></>}
        btnText="고용24 알바 신고 방법 확인 →"
        href="/w/실업급여-받으면서-알바-가능여부"
      />

      <div style={{ margin: "20px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 8 }}>📖 실업급여 더 알아보기</div>
        <SpokeLink num="01" title="고용24 알바 신고 방법 단계별" desc="실업인정 신청 화면에서 근로 사실 입력하는 법" href="/w/실업급여-받으면서-알바-가능여부" />
        <SpokeLink num="02" title="실업급여 알바 가능 여부 — 월 60시간 기준" desc="취업 간주 기준과 가능한 알바 범위 정리" href="/w/실업급여-받으면서-알바" />
        <SpokeLink num="03" title="실업급여 소정급여일수 기준표" desc="나이·피보험기간별 120~270일 기준" href="/w/실업급여-소정급여일수" />
      </div>

      <a href="https://www.work24.go.kr" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-black">
        <span className="ext-btn-badge">고용24 공식</span>
        <span className="ext-btn-text">부정수급 자진신고 · 실업인정 신청</span>
        <span className="ext-btn-cta">바로가기 →</span>
      </a>

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 알바 미신고 부정수급 처벌이 어떻게 되나요?", a: "받은 금액 전액 반환 + 추가 징수가 붙어요. 고의적이거나 금액이 크면 3년 이하 징역 또는 3천만원 이하 벌금의 형사처벌도 받을 수 있어요. 적발 전 자진신고 시 추가 징수 감면이 가능해요." },
        { q: "실업급여 알바 미신고 자진신고 감면 조건이 어떻게 되나요?", a: "적발 전 최초 1회 자진신고 시 추가 징수 없이 반환만 하는 감면이 적용될 수 있어요. 자진신고는 관할 고용센터 방문으로 하면 돼요. 발각 후에는 감면이 안 돼요." },
      ]} />

      <RelatedArticles items={[
        { title: "고용24 알바 신고 방법 단계별", desc: "실업급여 · 알바 신고", href: "/w/실업급여-받으면서-알바-가능여부" },
        { title: "실업급여 알바 가능 여부 — 월 60시간 기준", desc: "실업급여 · 알바 규정", href: "/w/실업급여-받으면서-알바" },
        { title: "조기재취업수당 신청 조건", desc: "실업급여 · 조기재취업", href: "/w/실업급여-재취업-조건" },
      ]} />

      <PrevNext
        prev={{ title: "고용24 알바 신고 방법", href: "/w/실업급여-받으면서-알바-가능여부" }}
        next={{ title: "조기재취업수당 신청 조건", href: "/w/실업급여-재취업-조건" }}
      />
    </BlogLayout>
  );
}
