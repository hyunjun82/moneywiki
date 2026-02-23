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

const commonLinks: ResLink[] = [
  { icon: "📅", title: "소정급여일수 기준표 확인", href: "/w/실업급여-소정급여일수" },
  { icon: "💰", title: "1일 기초일액 계산 방법", href: "/w/실업급여-기초일액" },
];

function getResult(sel: Record<string, string>): Res | null {
  const { when, days } = sel;
  if (!when || !days) return null;

  if (when === "within12" && days === "remains") {
    return {
      pass: true,
      headline: "지금 바로 신청할 수 있어요",
      detail: "이직 후 12개월 이내에 소정급여일수도 남아있으니 정상적으로 수급할 수 있어요. 빨리 신청할수록 실업인정일이 앞당겨져서 유리해요.",
      badges: ["신청 가능", "기한 내"],
      links: commonLinks,
    };
  }
  if (when === "within12" && days === "exhausted") {
    return {
      pass: false,
      headline: "소정급여일수를 이미 다 받았어요",
      detail: "12개월 기한은 남았지만 소정급여일수를 모두 소진했으면 더 받을 수 없어요.",
      badges: ["수급 종료", "일수 소진"],
      links: [{ icon: "📋", title: "조기재취업수당 조건 확인", href: "/w/실업급여-재취업-조건" }],
    };
  }
  if (when === "over12") {
    return {
      pass: false,
      headline: "이직 후 12개월이 지났어요",
      detail: "소정급여일수가 남아있어도 이직일로부터 12개월이 지나면 신청할 수 없어요. 수급기간은 연장 사유(질병·출산·육아 등)가 있을 때만 예외가 돼요.",
      badges: ["기한 초과", "신청 불가"],
      links: [{ icon: "📋", title: "수급기간 연장 사유 확인", href: "/w/실업급여-수급-조건" }],
    };
  }
  if (when === "notyet") {
    return {
      pass: true,
      headline: "아직 신청 전이라면 빠를수록 좋아요",
      detail: "퇴직 후 아직 신청을 안 했다면 빨리 신청하세요. 실업급여는 수급자격 인정 신청일 이후 실업 상태부터 인정되기 때문에, 늦게 신청하면 그만큼 못 받아요.",
      badges: ["신청 전", "빨리 신청 필요"],
      links: commonLinks,
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
      breadcrumb={["홈", "실업급여", "수급기간"]}
      tags={["2026년 기준", "실업급여", "수급기간"]}
      date="2026-02-23"
      title="실업급여 수급기간 몇개월 받나 | 퇴직 후 12개월 신청 기한"
      description={
        <>
          실업급여 수급기간은 이직 후 12개월이에요. 이 기한 안에 소정급여일수를 소진해야 해요. <strong style={{ color: C.t1 }}>12개월 기한 계산 방법과 주의사항</strong>을 정리했어요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제48조 · 고용보험 시행규칙", date: "2026.02 기준" }}
      stickyLabel="수급기간"
      stickyValue="이직 후 12개월"
      stickyBtn="기한 계산하기 →"
      stickyHref="https://www.work24.go.kr"
    >
      <TOC items={[
        { t: "내 수급 가능 여부 바로 확인", sub: "이직 시점과 현재 상태 체크" },
        { t: "실업급여 수급기간은 몇 개월인가요?", sub: null },
        { t: "실업급여 퇴직 후 12개월 기한은 어떻게 계산하나요?", sub: null },
        { t: "실업급여 바로 신청 안 하면 어떻게 되나요?", sub: "늦게 신청할수록 손해예요" },
        { t: "실업급여 소정급여일수와 수급기간 차이가 뭐예요?", sub: null },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "수급기간은 <strong>이직 후 12개월</strong>이에요. 이 기간 내에 소정급여일수를 소진해야 해요.",
        "늦게 신청할수록 손해예요. <strong>신청일 이전 실업 기간</strong>은 인정되지 않아요.",
        "질병·출산·육아 등 특별 사유가 있으면 수급기간을 <strong>최대 4년까지 연장</strong>할 수 있어요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="내 수급 가능 여부 바로 확인" sub="이직 시점과 현재 상태를 선택해 주세요" />

      <P>아직 받을 수 있는지, 이미 기한이 지났는지 헷갈리는 경우가 많아요. 두 가지만 선택하면 바로 알 수 있어요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⏱️</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>수급기간 내 신청 가능 여부 확인</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>이직 후 12개월 × 소정급여일수 잔여 여부</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              이직(퇴직) 후 지금 몇 개월이 됐나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="when" value="notyet" label="아직 신청 전 (곧 퇴직)" sel={sel} pick={pick} />
              <Btn group="when" value="within12" label="12개월 이내" sel={sel} pick={pick} />
              <Btn group="when" value="over12" label="12개월 초과" sel={sel} pick={pick} />
            </div>
          </div>
          {sel.when === "within12" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
                <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
                소정급여일수가 남아있나요?
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                <Btn group="days" value="remains" label="아직 남아있어요" sel={sel} pick={pick} />
                <Btn group="days" value="exhausted" label="이미 다 받았어요" sel={sel} pick={pick} />
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
      <Sec n="SECTION 02" title="실업급여 수급기간은 몇 개월인가요?" sub="이직일로부터 12개월이에요" />

      <P><A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제48조</A>에 따라 실업급여 수급기간은 <B>이직일(퇴직일)로부터 12개월</B>이에요. 이 12개월 안에 소정급여일수를 전부 소진해야 해요. 소정급여일수가 120일이든 270일이든, 12개월이라는 기한은 동일하게 적용돼요.</P>

      <P>수급기간과 소정급여일수는 별개의 개념이에요. 소정급여일수가 240일이어도 이직 후 12개월이 지나면 남은 일수를 받을 수 없어요. 반대로 소정급여일수 120일을 12개월 안에 모두 받으면 수급이 자연 종료돼요.</P>

      <P>특별한 사유가 있으면 수급기간이 연장돼요. 질병이나 부상, 임신·출산·육아, 병역 의무 등으로 인해 실업급여를 받을 수 없는 기간이 있으면, 그 기간만큼 수급기간이 늘어나요. 최대 4년(12개월 + 3년)까지 연장될 수 있어요.</P>

      <TableTitle>수급기간 연장 사유와 최대 기간</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>연장 사유</THL><TH>연장 기간</TH><TH>최대 수급기간</TH></tr>
          </thead>
          <tbody>
            {[
              ["질병·부상", "실제 불취업 기간", "최대 4년"],
              ["임신·출산·육아", "실제 불취업 기간", "최대 4년"],
              ["병역 의무 이행", "복무 기간", "최대 4년"],
              ["재해·재난", "실제 불취업 기간", "최대 4년"],
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
      <TableNote>※ 연장 신청은 수급기간 중 해당 사유가 발생한 즉시 고용센터에 신고해야 해요</TableNote>

      <InlineLink icon="📅" title="소정급여일수 기준표 — 나이·피보험기간별" desc="몇 일 받을 수 있는지 나이와 피보험기간별로 정리했어요." href="/w/실업급여-소정급여일수" />

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 퇴직 후 12개월 기한은 어떻게 계산하나요?" sub="이직일 기준으로 역산해요" />

      <P>12개월 기한은 <B>이직일(마지막 근무일의 다음 날)</B>부터 시작해요. 2026년 3월 31일이 마지막 근무일이라면, 이직일은 4월 1일이고 수급기간은 2027년 3월 31일까지예요.</P>

      <P>주의할 점은, 이직일과 퇴직일을 혼동하는 경우예요. 이직일은 고용보험 상에서 근로 관계가 끝난 날의 다음 날이에요. 회사가 이직확인서에 기재하는 날짜가 이직일이에요. 고용24 에서 확인할 수 있어요.</P>

      <P>실업급여를 신청했어도 대기기간 7일이 있어요. 신청한 날부터 7일은 대기기간으로 실업급여가 지급되지 않아요. 수급기간 12개월에서 이 7일이 포함된 채로 흘러가기 때문에, 늦게 신청할수록 실질적인 수급 기간이 짧아져요.</P>

      <Info type="warn">실업급여는 신청한 날 이후부터 인정돼요. 퇴직 후 3개월 뒤에 신청하면 그 3개월치는 받을 수 없어요. 빨리 신청할수록 유리해요.</Info>

      <InlineLink icon="📋" title="실업급여 수급자격 신청 절차 — 고용센터 방문" desc="신청 전 이직확인서 처리, 워크넷 등록, 교육 이수 순서를 정리했어요." href="/w/실업급여-수급-조건" />

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" title="실업급여 바로 신청 안 하면 어떻게 되나요?" sub="늦을수록 받는 금액이 줄어요" />

      <P>실업급여는 퇴직 후 늦게 신청할수록 실질적으로 손해예요. 가장 큰 이유는 <B>신청일 이전 실업 기간을 인정하지 않기</B> 때문이에요. 퇴직 후 2개월이 지나서 신청했다면, 그 2개월 동안은 실업급여를 받을 수 없어요.</P>

      <P>또한 수급기간은 이직일부터 12개월이에요. 신청이 늦어지면 그만큼 수급에 쓸 수 있는 기간이 줄어들어요. 소정급여일수가 270일인데 8개월 후에 신청했다면, 실제로는 4개월(120일)밖에 받지 못할 수도 있어요.</P>

      <P>단, 신청을 늦게 해도 소정급여일수 자체가 줄어드는 건 아니에요. 270일 받을 자격이라면 신청 후 남은 수급기간 동안 270일을 채우면 돼요. 다만 12개월이라는 기한이 함께 적용되니, 늦게 신청한 만큼 일수를 다 받지 못할 수 있어요.</P>

      <BridgeCard
        question="퇴직 후 실업급여 신청 전에 뭘 먼저 해야 하나요?"
        body={<>이직확인서 처리, 워크넷 구직등록, 수급자격 교육 이수 후 고용센터에 신청해요. <strong style={{ color: C.navy }}>빨리 신청할수록 실수령액이 많아요.</strong></>}
        btnText="실업급여 신청 절차 전체 확인 →"
        href="/w/실업급여-수급-조건"
      />

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" title="실업급여 소정급여일수와 수급기간 차이가 뭐예요?" sub="헷갈리는 두 개념을 정리해요" />

      <P>이 두 가지를 헷갈려서 수급 기회를 날리는 경우가 생각보다 많아요. 한마디로 정리하면, <B>소정급여일수는 얼마나 받을 수 있는지(일수), 수급기간은 언제까지 받을 수 있는지(기한)</B>예요.</P>

      <TableTitle>소정급여일수 vs 수급기간 비교</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>구분</THL><TH>소정급여일수</TH><TH>수급기간</TH></tr>
          </thead>
          <tbody>
            {[
              ["의미", "받을 수 있는 최대 일수", "신청 가능한 기한"],
              ["기준", "나이 × 피보험기간", "이직일로부터 12개월"],
              ["범위", "120일 ~ 270일", "고정 12개월"],
              ["초과 시", "수급 자연 종료", "남은 일수 소멸"],
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

      <P>둘 다 충족해야 실업급여를 전부 받을 수 있어요. 소정급여일수가 남아있어도 12개월이 지나면 못 받고, 12개월이 남아있어도 소정급여일수를 다 소진하면 수급이 끝나요.</P>

      <div style={{ margin: "20px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 8 }}>📖 실업급여 더 알아보기</div>
        <SpokeLink num="01" title="실업급여 소정급여일수 기준표" desc="나이·피보험기간별 120~270일 기준표" href="/w/실업급여-소정급여일수" />
        <SpokeLink num="02" title="실업급여 기초일액 — 1일 지급액" desc="평균임금 60% 상하한액 기준 정리" href="/w/실업급여-기초일액" />
        <SpokeLink num="03" title="실업급여 조기재취업수당 — 빨리 취업하면 보너스" desc="남은 급여의 50% 조기재취업수당 조건" href="/w/실업급여-재취업-조건" />
      </div>

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 수급기간은 몇 개월인가요?", a: "이직일(퇴직일 다음 날)로부터 12개월이에요. 이 기간 안에 소정급여일수를 소진해야 해요. 질병·출산 등 특별 사유가 있으면 최대 4년까지 연장할 수 있어요." },
        { q: "실업급여 소정급여일수와 수급기간 차이가 뭐예요?", a: "소정급여일수는 받을 수 있는 최대 일수(120~270일)예요. 수급기간은 이직 후 12개월이라는 신청 기한이에요. 두 조건 모두 충족해야 전부 받을 수 있어요." },
      ]} />

      <RelatedArticles items={[
        { title: "실업급여 소정급여일수 기준표", desc: "실업급여 · 소정급여일수", href: "/w/실업급여-소정급여일수" },
        { title: "실업급여 수급자격 — 비자발적 퇴직 조건", desc: "실업급여 · 수급자격", href: "/w/실업급여-수급-조건" },
        { title: "실업급여 조기재취업수당 신청 조건", desc: "실업급여 · 조기재취업", href: "/w/실업급여-재취업-조건" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 소정급여일수 기준표", href: "/w/실업급여-소정급여일수" }}
        next={{ title: "실업급여 국민연금 납부예외 신청", href: "/w/실업급여-국민연금-유예" }}
      />
    </BlogLayout>
  );
}
