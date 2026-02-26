"use client";

import { useState } from "react";
import {
  C, Btn, Info, Divider, Sec, P, B, A,
  TableTitle, TableNote, TH, THL,
  BridgeCard, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext,
  InlineLink, SpokeLink, Steps,
} from "@/components/wiki/BlogShared";

// ── 체커 로직 ──
type ResLink = { icon: string; title: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; links: ResLink[] };

function getResult(sel: Record<string, string>): Res | null {
  const { account, period } = sel;
  if (!account || !period) return null;

  if (account === "yes" && period === "next-date") {
    return {
      pass: true,
      headline: "다음 실업인정일에 신고하면 돼요",
      detail: "고용24 로그인 → 실업인정 신청 → 취업/근로 사실 체크 → 근무처·날짜·시간·임금 입력 → 제출 순서예요. 실업인정일 전날까지 입력할 수 있어요.",
      badges: ["준비 완료", "신고 가능"],
      links: [
        { icon: "⚠️", title: "알바 미신고 부정수급 처벌 내용", href: "/w/실업급여-알바-미신고" },
        { icon: "💼", title: "실업급여 알바 가능 기준 — 월 60시간", href: "/w/실업급여-받으면서-알바" },
      ],
    };
  }

  if (account === "yes" && period === "past-missed") {
    return {
      pass: false,
      headline: "이전 기간 미신고라면 고용센터에 방문해야 해요",
      detail: "이미 지나간 실업인정 기간에 신고를 못 했다면 고용24 온라인으로는 수정이 어려워요. 고용센터에 직접 방문해서 미신고 사실을 알리고 처리 방법을 안내받으세요.",
      badges: ["미신고 기간 있음", "고용센터 방문 필요"],
      links: [
        { icon: "⚠️", title: "자진신고 감면 — 부정수급 처벌 내용", href: "/w/실업급여-알바-미신고" },
        { icon: "💼", title: "알바 가능 여부 기준 확인", href: "/w/실업급여-받으면서-알바" },
      ],
    };
  }

  if (account === "no") {
    return {
      pass: false,
      headline: "고용24 계정 만들기가 먼저예요",
      detail: "실업급여 신청을 위해서는 고용24 계정이 필요해요. work24.go.kr에서 회원가입 후 본인인증을 마치면 실업인정 신청이 가능해요.",
      badges: ["계정 없음", "회원가입 필요"],
      links: [
        { icon: "💼", title: "실업급여 수급자격 신청 방법", href: "/w/실업급여-수급-조건" },
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
      breadcrumb={["홈", "실업급여", "알바 신고방법"]}
      tags={["2026년 기준", "실업급여", "고용24 알바 신고"]}
      date="2026-02-23"
      title="실업급여 알바 신고방법 고용24 | 근로내역 제출 서류 절차"
      description={
        <>
          실업급여 수급 중 알바를 했다면 실업인정 신청 시 <strong style={{ color: C.t1 }}>고용24에서 근로 사실을 신고</strong>해야 해요. 근무처·날짜·시간·임금을 입력하면 돼요. 신고 안 하면 부정수급이에요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제47조 · 실업인정 기준", date: "2026.02 기준" }}
      stickyLabel="신고 방법"
      stickyValue="고용24 실업인정"
      stickyBtn="고용24 바로가기 →"
      stickyHref="https://www.work24.go.kr"
    >
      <TOC items={[
        { t: "알바 신고 준비 상태 확인", sub: "고용24 계정 · 신고 시기 체크" },
        { t: "실업급여 알바 신고방법 고용24에서 어떻게 하나요?", sub: "단계별 절차" },
        { t: "실업급여 알바 신고 시 필요한 정보가 무엇인가요?", sub: null },
        { t: "실업급여 알바 신고 후 실업급여는 어떻게 달라지나요?", sub: null },
        { t: "실업급여 알바 신고 시 자주 하는 실수는 무엇인가요?", sub: null },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "알바 신고는 고용24 실업인정 신청 화면에서 <strong>취업/근로 사실</strong>을 선택하고 내용을 입력하면 돼요.",
        "신고 내용: <strong>근무처, 근무 날짜, 근무 시간, 실제 임금</strong>이에요. 별도 서류 제출 없이 온라인 처리 가능해요.",
        "신고하면 근로일만 실업급여에서 제외돼요. <strong>소정급여일수는 줄지 않아요</strong>.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="알바 신고 준비 상태 확인" sub="고용24 계정과 신고 시기를 선택해 주세요" />

      <P>알바 신고를 위한 준비 상태를 확인해 보세요. 고용24 계정 여부와 신고 시기에 따라 절차가 달라져요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📝</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>알바 신고 준비 상태 확인</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>30초 확인</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              고용24 계정이 있나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="account" value="yes" label="있어요" sel={sel} pick={pick} />
              <Btn group="account" value="no" label="없어요" sel={sel} pick={pick} />
              <Btn group="account" value="unsure" label="잘 모르겠어요" sel={sel} pick={pick} />
            </div>
          </div>
          {sel.account === "yes" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
                <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
                알바를 언제 했나요?
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                <Btn group="period" value="next-date" label="다음 실업인정일 전이에요" sel={sel} pick={pick} />
                <Btn group="period" value="past-missed" label="이미 지나간 기간이에요" sel={sel} pick={pick} />
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
      <Sec n="SECTION 02" title="실업급여 알바 신고방법 고용24에서 어떻게 하나요?" sub="단계별 신고 절차" />

      <P>알바 신고는 실업인정 신청과 같이 진행해요. 따로 별도 신고가 아니라, 실업인정 신청 화면에서 근로 사실을 입력하는 거예요. 실업인정일 전날까지 입력하면 돼요.</P>

      <Steps items={[
        {
          title: "고용24 로그인",
          desc: "work24.go.kr에 접속해서 공동인증서, 간편인증(카카오, 네이버 등)으로 로그인해요.",
        },
        {
          title: "실업인정 신청 메뉴 선택",
          desc: "로그인 후 '실업인정 신청' 메뉴를 찾아요. 실업인정일이 가까워지면 메인 화면에 바로 뜨는 경우가 많아요.",
        },
        {
          title: "취업·근로 사실 체크",
          desc: "실업인정 신청 화면에서 '취업(근로)한 사실이 있나요?' 항목에 체크해요. 체크하면 근로 내용 입력 칸이 나타나요.",
        },
        {
          title: "근무 내용 입력",
          desc: "근무처 이름, 근무 날짜(일별 각각), 1일 근무 시간, 실제 지급받은 임금을 입력해요. 일용직이라면 날짜별로 각각 입력해야 해요.",
        },
        {
          title: "신청 완료 및 결과 확인",
          desc: "제출하면 입력한 근로일은 실업인정에서 제외돼요. 나머지 날은 정상적으로 실업급여가 지급돼요.",
        },
      ]} />

      <Info type="tip">
        고용24 앱(스마트폰)에서도 동일하게 신고할 수 있어요. PC보다 앱이 더 간편할 수 있어요. '실업인정 신청' 아이콘을 누르면 바로 신청 화면으로 이동해요.
      </Info>

      <InlineLink icon="💼" title="실업급여 알바 가능 여부 — 월 60시간 기준" desc="알바가 가능한지 시간 기준과 취업 간주 조건을 정리했어요." href="/w/실업급여-받으면서-알바" />

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 알바 신고 시 필요한 정보가 무엇인가요?" sub="입력 필수 항목 정리" />

      <P>알바 신고에 필요한 정보는 미리 정리해 두면 편해요. 특별한 서류 제출은 필요하지 않지만, 정확한 내용을 입력해야 해요. 나중에 고용보험 자료와 대조할 수 있어요.</P>

      <TableTitle>알바 신고 입력 항목</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>항목</THL><TH>내용</TH><TH>비고</TH></tr>
          </thead>
          <tbody>
            {[
              ["근무처 이름", "사업장 명칭", "정확하게 입력"],
              ["근무 날짜", "일별 각각 선택", "복수 날짜 각각 입력"],
              ["1일 근무 시간", "실제 근무 시간 (분 단위)", "정확한 시간 입력"],
              ["지급받은 임금", "실제 지급 금액", "세전/세후 구분 없음"],
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
      <TableNote>※ 임금을 아직 받지 못했다면 예상 금액으로 입력하고 나중에 수정 신고할 수 있어요.</TableNote>

      <P>근로계약서나 급여명세서를 보관해 두면 나중에 고용센터에서 확인 요청이 왔을 때 대응하기 편해요. 특히 사업주가 고용보험 신고를 다르게 하는 경우 본인 자료가 필요할 수 있어요.</P>

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 알바 신고 후 실업급여는 어떻게 달라지나요?" sub="근로일만 제외 처리돼요" />

      <P>알바를 신고하면 <B>근로일에 해당하는 날만 실업인정이 안 돼요</B>. 쉽게 말하면, 알바한 날은 실업급여를 못 받고 그날이 소정급여일수에서 소진되지 않아요. 나머지 날은 정상적으로 실업급여가 나와요.</P>

      <P>예를 들어 실업인정 기간 28일 중 10일 알바를 하고 신고했다면, 10일치는 실업급여가 나오지 않고 나머지 18일치만 지급돼요. 소정급여일수에서는 18일이 소진돼요. 10일은 그대로 남아서 나중에 받을 수 있어요.</P>

      <P>주 15시간 이상 일한 경우에는 다르게 처리돼요. 취업으로 간주되면 그 시점부터 실업급여 수급이 중단돼요. 소정급여일수가 많이 남아있다면 조기재취업수당 신청이 가능해요.</P>

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" title="실업급여 알바 신고 시 자주 하는 실수는 무엇인가요?" sub="실수 방지 가이드" />

      <P>가장 많이 하는 실수는 <B>신고를 깜빡하는 거예요</B>. 실업인정 신청할 때 근로 사실 체크를 잊어버리는 경우가 있어요. 신청하기 전에 알바한 날짜를 따로 메모해 두면 도움이 돼요.</P>

      <P>또 하나는 임금을 받지 못했다고 신고를 안 하는 경우예요. 임금 지급 여부와 상관없이 실제 근무한 사실이 있으면 신고해야 해요. 나중에 임금을 받으면 수정 신고할 수 있어요.</P>

      <P>하루 단기 알바를 여러 날 했을 때 날짜 하나를 빠뜨리는 경우도 있어요. 일용직처럼 날짜별로 각각 입력해야 하는데, 한 번에 합쳐서 입력하면 안 돼요. 날짜마다 별도 행을 만들어서 입력하는 게 맞아요.</P>

      <InlineLink icon="⚠️" title="알바 미신고 부정수급 처벌 — 환수 기준" desc="자진신고하면 최초 1회 추가 징수 없이 반환만으로 처리될 수 있어요." href="/w/실업급여-알바-미신고" />

      <Info type="warn">
        실업인정 신청 기한을 놓치면 그 기간 실업급여를 받지 못해요. 알바 신고 때문에 실업인정 신청 자체를 미루는 일이 없도록, 신청 기한을 먼저 지키는 게 중요해요.
      </Info>

      <div style={{ margin: "20px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 8 }}>📖 실업급여 더 알아보기</div>
        <SpokeLink num="01" title="실업급여 알바 가능 여부 — 월 60시간 기준" desc="취업 간주 기준과 가능한 알바 범위 정리" href="/w/실업급여-받으면서-알바" />
        <SpokeLink num="02" title="알바 미신고 부정수급 처벌 내용" desc="자진신고 감면 조건과 반환 처리 방법" href="/w/실업급여-알바-미신고" />
        <SpokeLink num="03" title="실업급여 소정급여일수 기준표" desc="나이·피보험기간별 받을 수 있는 일수" href="/w/실업급여-소정급여일수" />
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
        { q: "실업급여 알바 신고를 고용24에서 어떻게 하나요?", a: "work24.go.kr 로그인 → 실업인정 신청 → 취업/근로 사실 체크 → 근무처·날짜·시간·임금 입력 → 제출 순서예요. 별도 서류 제출 없이 온라인으로 처리돼요." },
        { q: "실업급여 알바 신고 후 실업급여가 얼마나 줄어드나요?", a: "알바한 날(근로일)만 실업인정에서 제외돼요. 소정급여일수 자체는 줄지 않아요. 근로일에는 실업급여가 나오지 않고, 나머지 날은 정상 지급돼요." },
      ]} />

      <RelatedArticles items={[
        { title: "실업급여 알바 가능 여부 — 월 60시간 기준", desc: "실업급여 · 알바 규정", href: "/w/실업급여-받으면서-알바" },
        { title: "알바 미신고 부정수급 처벌", desc: "실업급여 · 부정수급", href: "/w/실업급여-알바-미신고" },
        { title: "실업급여 소정급여일수 기준표", desc: "실업급여 · 소정급여일수", href: "/w/실업급여-소정급여일수" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 받으면서 알바 가능 여부", href: "/w/실업급여-받으면서-알바" }}
        next={{ title: "알바 미신고 부정수급 처벌", href: "/w/실업급여-알바-미신고" }}
      />
    </BlogLayout>
  );
}
