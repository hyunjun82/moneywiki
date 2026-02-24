"use client";

import { useState } from "react";
import {
  C, Btn, Info, Divider, Sec, P, B, A,
  TableTitle, TableNote, TH, THL,
  BridgeCard, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext,
  InlineLink, SpokeLink,
} from "@/components/wiki/BlogShared";

type ResLink = { icon: string; title: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; links: ResLink[] };

const links1: ResLink[] = [
  { icon: "📋", title: "실업급여 신청방법 — 고용24 워크넷 절차", href: "/w/실업급여-신청방법" },
  { icon: "🧮", title: "실업급여 계산기 — 예상 수령액 확인", href: "/w/실업급여-계산기" },
];

function getResult(sel: Record<string, string>): Res | null {
  const { type, method } = sel;
  if (!type || !method) return null;

  if (type === "daily") return {
    pass: true,
    headline: "대기기간 없음! 신고일부터 바로 수급 시작이에요",
    detail: "건설일용근로자는 고용보험법 제49조 단서에 따라 대기기간이 면제돼요. 실업 신고한 날부터 바로 구직급여 수급 자격이 생겨요.",
    badges: ["대기기간 0일", "신고일부터 수급"],
    links: links1,
  };

  if (type === "general" && method === "online") return {
    pass: false,
    headline: "온라인 신고일부터 7일 대기 후 수급 시작이에요",
    detail: "고용24에서 실업 신고가 완료된 날이 1일이에요. 그 날 포함 7일이 지나면 수급이 시작돼요. 온라인 신고도 방문과 동일하게 적용돼요.",
    badges: ["대기기간 7일", "신고 완료일 기준"],
    links: links1,
  };

  if (type === "general" && method === "visit") return {
    pass: false,
    headline: "고용센터 방문 신고일부터 7일 대기 후 수급이에요",
    detail: "고용센터 방문해서 실업 신고한 날이 1일이에요. 그 날부터 7일(6일 추가)이 지나면 급여가 시작돼요. 신고일을 달력에 기록해두세요.",
    badges: ["대기기간 7일", "방문 신고일 기준"],
    links: links1,
  };

  if (type === "shortterm" && method === "online") return {
    pass: false,
    headline: "단기 알바·계약직도 7일 대기기간이 적용돼요",
    detail: "건설일용근로자가 아닌 경우 근무 기간이 짧아도 7일 대기기간은 동일하게 적용돼요. 온라인 신고 완료일부터 7일이에요.",
    badges: ["대기기간 7일", "동일 적용"],
    links: links1,
  };

  if (type === "shortterm" && method === "visit") return {
    pass: false,
    headline: "단기 근무자도 7일 대기기간이 있어요",
    detail: "단기 계약직·아르바이트도 건설일용근로자가 아니면 7일 대기기간이 동일하게 적용돼요. 고용센터 방문 신고일부터 계산해요.",
    badges: ["대기기간 7일", "동일 적용"],
    links: links1,
  };

  return null;
}

export default function Article() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "대기기간"]}
      tags={["2026년 기준", "실업급여", "대기기간 7일"]}
      date="2026-02-24"
      title="실업급여 대기기간 7일 | 실업급여 첫 입금일 계산"
      description={
        <>
          신청하고 바로 입금되는 게 아니에요. <strong style={{ color: C.t1 }}>7일 대기기간</strong>이 있어서 그 기간은 급여가 안 나와요. 언제부터 시작되고, 첫 입금일은 언제인지 정리했어요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제49조 · 고용24", date: "2026.02 기준" }}
      stickyLabel="첫 입금일 계산"
      stickyValue="대기기간 확인"
      stickyBtn="실업급여 신청 →"
      stickyHref="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do"
    >
      <TOC items={[
        { t: "내 대기기간 + 첫 입금일 간편 체크", sub: "근로 유형 × 신고 방법 선택" },
        { t: "실업급여 대기기간 7일은 왜 있나요?", sub: null },
        { t: "실업급여 대기기간 계산은 어떻게 하나요?", sub: "신고일 포함 7일 계산법" },
        { t: "실업급여 첫 입금일은 언제 계산되나요?", sub: null },
        { t: "실업급여 대기기간 예외 조건은 무엇인가요?", sub: null },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "실업 신고일부터 <strong>7일간</strong>이 대기기간이에요. 이 기간에는 급여가 안 나와요.",
        "건설일용근로자는 예외 — <strong>대기기간 없이</strong> 신고일부터 바로 수급이에요.",
        "첫 입금은 대기기간 종료 후 첫 실업인정을 받은 날로부터 <strong>2~3일 내</strong>예요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" id="checker" title="내 대기기간 + 첫 입금일 간편 체크" sub="근로 유형과 신고 방법을 선택하면 바로 알 수 있어요" />

      <P>내 상황에 맞는 항목을 선택하면 대기기간 시작일과 첫 입금일을 바로 확인할 수 있어요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x1F4C5;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>실업급여 대기기간 시작일 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>고용보험법 제49조 기준</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              최종 이직 당시 근로 유형은?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="type" value="general" label="일반 직장인" sel={sel} pick={pick} />
              <Btn group="type" value="shortterm" label="단기계약·아르바이트" sel={sel} pick={pick} />
              <Btn group="type" value="daily" label="건설일용근로자" sel={sel} pick={pick} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
              실업 신고 방법은?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="method" value="online" label="고용24 온라인 신고" sel={sel} pick={pick} />
              <Btn group="method" value="visit" label="고용센터 방문 신고" sel={sel} pick={pick} />
            </div>
          </div>

          {result && (
            <div style={{ marginTop: 16, padding: 16, borderRadius: 8, background: result.pass ? C.navyLight : "#F5F5F5", border: result.pass ? "1px solid rgba(30,58,95,.1)" : `1px solid ${C.line}` }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: result.pass ? C.navy : C.t1, marginBottom: 4 }}>
                {result.pass ? "✅" : "⏳"} {result.headline}
              </div>
              <div style={{ fontSize: 13, color: C.t3, lineHeight: 1.55 }}>{result.detail}</div>
              <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" }}>
                {result.badges.map((b, i) => (
                  <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, background: result.pass ? C.navy : C.t4, color: "#fff" }}>{b}</span>
                ))}
              </div>
              {result.links.length > 0 && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: result.pass ? "1px solid rgba(30,58,95,.08)" : "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.t1, marginBottom: 6 }}>&#x1F4D6; 관련 가이드</div>
                  {result.links.map((lnk, li) => (
                    <a key={li} href={lnk.href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", fontSize: 13, color: C.navy, fontWeight: 600, borderBottom: "1px solid rgba(30,58,95,.06)", textDecoration: "none" }}>
                      <span>{lnk.icon}{" "}{lnk.title}</span>
                      <span style={{ fontSize: 11, color: C.t4 }}>&#x2192;</span>
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
      <Sec n="SECTION 02" id="why" title="실업급여 대기기간 7일은 왜 있나요?" sub="부정수급 방지 + 구직의사 확인 목적이에요" />

      <P><A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제49조</A>에서 정한 대기기간은 <B>실업 신고일부터 7일간 급여가 지급되지 않는 기간</B>이에요. 실업급여는 고용보험료와 국고로 운영되는 공적 자금이에요. 그래서 정부는 신청자가 실제로 구직활동 의사가 있는지, 부정 목적은 아닌지 확인하는 기간을 두는 거예요.</P>

      <P>대기기간이 없다면 어떨까요? 퇴직하자마자 바로 받을 수 있으니 취업 의사 없이 수급을 시도하는 사례가 늘어날 수 있어요. 7일이라는 기간 동안 실제로 일자리를 찾는 행동을 시작하게 유도하는 취지도 있어요. 이 기간을 워크넷 이력서 정비, 자기소개서 작성, 면접 준비에 쓰는 게 좋아요.</P>

      <P>대기기간은 이직 전체 수급 기간에서 딱 한 번만 적용돼요. 수급 시작 후에는 대기기간 없이 실업인정 주기(2주 또는 4주)마다 급여가 나와요. 처음 한 번만 기다리면 그 다음부터는 정상적으로 입금돼요.</P>

      <Info type="tip">{'<strong>활용 팁:</strong> 대기기간 7일 동안 워크넷 구직등록, 이력서 작성, 고용24 온라인 교육 수강을 완료해두면 대기기간이 끝나자마자 바로 실업인정 준비가 돼요.'}</Info>

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" id="calc" title="실업급여 대기기간 계산은 어떻게 하나요?" sub="신고일을 1일로 계산, 7일째 종료예요" />

      <P>계산 방법은 단순해요. <B>실업 신고일을 1일로 세어</B>, 그 날부터 7일째 되는 날 대기기간이 끝나요. 예를 들어 1월 15일에 신고했다면 1월 15일이 1일차, 1월 21일이 7일차예요. 그러면 <B>1월 22일부터 구직급여 수급 자격</B>이 생겨요.</P>

      <P>중요한 건 <B>퇴직일이 아니라 실업 신고일</B>이에요. 1월 10일에 퇴직했어도 1월 20일에 고용센터에 신고했다면, 대기기간은 1월 20일부터 시작해요. 그만큼 첫 입금일이 늦어지니 퇴직 후 최대한 빨리 신고하는 게 유리해요.</P>

      <TableTitle>대기기간 계산 예시</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>신고일</THL><TH>대기기간 종료일</TH><TH>첫 수급 시작일</TH></tr>
          </thead>
          <tbody>
            {[
              ["1월 15일", "1월 21일 (7일차)", "1월 22일"],
              ["2월 1일", "2월 7일 (7일차)", "2월 8일"],
              ["3월 10일", "3월 16일 (7일차)", "3월 17일"],
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
      <TableNote>※ 신고일 포함 7일 계산. 온라인·방문 모두 동일 기준 적용</TableNote>

      <Info type="warn">{'<strong>온라인 신고 주의:</strong> 고용24에서 신고할 때 자정 직전에 완료하면 그 날이 신고일이에요. 하루 차이가 첫 입금일을 하루 늦추니 신고 완료 날짜를 꼭 기록해두세요.'}</Info>

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" id="first-pay" title="실업급여 첫 입금일은 언제 계산되나요?" sub="대기기간 종료 후 첫 실업인정 이후 2~3일 내예요" />

      <P>대기기간이 끝난다고 바로 입금되는 게 아니에요. 대기기간 종료 후에 처음으로 <B>실업인정</B>을 받아야 해요. 실업인정은 "구직활동을 성실히 했음"을 고용센터에 증명하는 절차예요. 실업인정을 받은 날로부터 <B>2~3일 내에 첫 입금</B>이 돼요.</P>

      <P>수급자격 인정 후 고용센터에서 실업인정일을 지정해줘요. 보통 2주 후가 첫 번째 실업인정일이에요. 이날 고용센터 방문(또는 온라인)으로 실업인정을 받으면 그 직후에 입금돼요. 첫 입금 금액은 대기기간 종료 다음날부터 첫 실업인정일까지의 일수 × 1일 구직급여예요.</P>

      <P>정리하면 이런 흐름이에요. 실업 신고 → 7일 대기 → 수급자격 인정(1~2주) → 첫 실업인정일 → 2~3일 내 입금. 신고부터 첫 입금까지 보통 3~4주가 걸려요. 생활비가 부족하다면 미리 계획을 세워두는 게 중요해요.</P>

      <BridgeCard
        question="실업인정은 어떻게 받나요?"
        body={<>구직활동 증빙과 실업인정 절차가 궁금하다면 <strong style={{ color: C.navy }}>실업급여 신청방법 가이드</strong>에 전체 흐름을 정리했어요.</>}
        btnText="실업급여 신청방법 전체 절차 보기 →"
        href="/w/실업급여-신청방법"
      />

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" id="exception" title="실업급여 대기기간 예외 조건은 무엇인가요?" sub="건설일용근로자와 특수 상황은 예외예요" />

      <P><B>건설일용근로자</B>는 대기기간이 없어요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제49조 단서</A>에서 최종 이직 당시 건설일용근로자였던 경우를 명시적으로 예외로 정해요. 건설업은 단기 일용직 고용이 특성상 잦아서 정부가 특별히 배려한 거예요. 신고일부터 바로 구직급여를 받을 수 있어요.</P>

      <P>코로나19 같은 국가재난 상황에서는 긴급 조치로 대기기간이 임시 단축되거나 생략된 사례가 있었어요. 이런 특수 상황은 예측이 어려우니 고용노동부 공식 공지를 주시하는 수밖에 없어요. 현재 기준(2026년 2월)으로는 건설일용근로자 외에 대기기간 면제 특례는 없어요.</P>

      <P>이직 사유에 문제가 있거나(부당해고, 임금체불 등) 이직확인서 내용이 잘못됐다면 고용센터에서 상담을 받으세요. 이직 사유 정정이 이루어지면 수급자격 인정에 영향을 줄 수 있어요. 대기기간 자체가 달라지는 건 아니지만 수급 여부와 연결돼요.</P>

      <SpokeLink num="01" title="실업급여 수급자격 — 비자발적 퇴직 조건" desc="수급자격 인정 기준과 비자발적 퇴직 유형 정리" href="/w/실업급여-수급자격" />

      <a href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-black">
        <span className="ext-btn-badge">고용24 공식</span>
        <span className="ext-btn-text">실업급여 인터넷 신청</span>
        <span className="ext-btn-cta">신청하기 →</span>
      </a>

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 대기기간 7일인 이유가 뭐예요?", a: '급여를 받기 전에 실제로 구직활동 의사가 있는지 확인하는 기간이에요. <strong>부정수급 방지</strong>와 구직활동 장려가 목적이에요.' },
        { q: "실업급여 대기기간 중에 취업하면 어떻게 되나요?", a: '대기기간 중 재취업하면 실업급여를 받을 수 없어요. 대기기간이 끝난 후부터 급여를 받기 시작하니까요. <strong>조기재취업수당</strong>은 대기기간 이후 수급기간 중 재취업 시 해당돼요.' },
      ]} />

      <RelatedArticles items={[
        { title: "실업급여 신청방법 — 고용24 워크넷 절차", desc: "실업급여 · 신청방법", href: "/w/실업급여-신청방법" },
        { title: "실업급여 수급자격 — 비자발적 퇴직 조건", desc: "실업급여 · 수급자격", href: "/w/실업급여-수급자격" },
        { title: "실업급여 소정급여일수 — 나이·근속별 계산", desc: "실업급여 · 소정급여일수", href: "/w/실업급여-소정급여일수" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 수급 조건 전체", href: "/w/실업급여-수급-조건" }}
        next={{ title: "실업급여 신청방법 고용24", href: "/w/실업급여-신청방법" }}
      />
    </BlogLayout>
  );
}
