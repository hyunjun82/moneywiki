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

const docLinks: ResLink[] = [
  { icon: "📋", title: "실업급여 신청방법 — 고용24 워크넷 절차", href: "/w/실업급여-신청방법" },
  { icon: "📄", title: "워크넷 구직등록 방법", href: "/w/실업급여-실업신고" },
];

function getResult(sel: Record<string, string>): Res | null {
  const { confirm, dispute } = sel;
  if (!confirm || !dispute) return null;

  if (confirm === "done" && dispute === "no") return {
    pass: true,
    headline: "서류 준비 완료! 신분증 챙겨서 고용센터 방문하면 돼요",
    detail: "이직확인서 처리 완료 + 이직 사유에 분쟁 없음 → 신분증만 있으면 수급자격 인정 신청이 가능해요. 고용센터에서 추가 서류를 요청할 수도 있으니 퇴직 관련 서류는 보관해두세요.",
    badges: ["신분증만 필요", "방문 준비 완료"],
    links: docLinks,
  };
  if (confirm === "done" && dispute === "yes") return {
    pass: false,
    headline: "이직 사유 분쟁 시 추가 서류가 필요해요",
    detail: "부당해고·임금체불 등 분쟁이 있으면 근로계약서, 급여명세서, 해고통보서 등 관련 서류를 챙기세요. 고용센터에서 실제 이직 사유를 확인하는 데 사용돼요.",
    badges: ["추가 서류 필요", "분쟁 사유 증빙"],
    links: docLinks,
  };
  if (confirm === "pending" && dispute === "no") return {
    pass: false,
    headline: "이직확인서 제출 먼저 확인해야 해요",
    detail: "고용24에서 이직확인서 처리 여부를 조회하세요. 회사는 퇴직 후 10일 이내 제출 의무가 있어요. 미제출이면 회사에 요청하거나 고용센터에 신고할 수 있어요.",
    badges: ["이직확인서 확인 필요"],
    links: docLinks,
  };
  if (confirm === "pending" && dispute === "yes") return {
    pass: false,
    headline: "이직확인서 + 분쟁 서류 모두 준비해야 해요",
    detail: "이직확인서가 처리되지 않았고 이직 사유 분쟁도 있으면 준비할 게 많아요. 고용센터에 먼저 전화해서 필요한 서류 목록을 확인받고 방문하는 게 좋아요.",
    badges: ["이직확인서 확인 필요", "추가 서류 준비"],
    links: docLinks,
  };
  if (confirm === "no" && dispute === "no") return {
    pass: false,
    headline: "이직확인서 없이는 수급자격 신청이 안 돼요",
    detail: "이직확인서가 미처리 상태면 고용센터 방문해도 수급자격 신청이 안 돼요. 회사에 제출 요청하거나 고용센터에 신고할 수 있어요. 제출 후 처리까지 2~3일 걸려요.",
    badges: ["이직확인서 없음", "방문 불가 상태"],
    links: docLinks,
  };
  if (confirm === "no" && dispute === "yes") return {
    pass: false,
    headline: "이직확인서 미제출 + 분쟁 — 고용센터 상담이 먼저예요",
    detail: "이직확인서 미제출과 이직 사유 분쟁이 겹치면 고용센터에 전화 또는 방문 상담을 먼저 받는 게 좋아요. 분쟁 사유 증빙도 함께 준비하세요.",
    badges: ["상담 필요", "이직확인서 없음"],
    links: docLinks,
  };

  return null;
}

export default function Article() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "구비서류"]}
      tags={["2026년 기준", "실업급여", "이직확인서"]}
      date="2026-02-24"
      title="실업급여 신청 구비서류 및 절차 | 이직확인서 발급 방법"
      description={
        <>
          신분증 하나면 돼요. <strong style={{ color: C.t1 }}>이직확인서는 회사가 제출</strong>해요. 본인이 직접 챙길 서류는 신분증뿐인데, 이직확인서 처리 여부 확인이 핵심이에요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 · 고용24", date: "2026.02 기준" }}
      stickyLabel="서류 확인"
      stickyValue="이직확인서"
      stickyBtn="고용24 조회 →"
      stickyHref="https://www.work24.go.kr"
    >
      <TOC items={[
        { t: "구비서류 준비 상태 체크", sub: "이직확인서 처리 여부 확인" },
        { t: "실업급여 신청 구비서류는 뭐가 있나요?", sub: null },
        { t: "실업급여 이직확인서는 어떻게 받나요?", sub: "발급 요청과 처리 흐름" },
        { t: "실업급여 신청 필요 서류는 온라인으로 제출할 수 있나요?", sub: null },
        { t: "실업급여 구비서류 빠뜨리면 어떻게 되나요?", sub: null },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "본인이 직접 챙길 서류는 <strong>신분증 하나</strong>예요. 나머지는 회사와 시스템이 처리해요.",
        "이직확인서는 <strong>회사가 퇴직 후 10일 이내</strong> 고용24에 제출해야 해요.",
        "이직 사유에 <strong>분쟁이 있는 경우에만</strong> 근로계약서·급여명세서 등 추가 서류가 필요해요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" id="checker" title="구비서류 준비 상태 체크" sub="이직확인서 상태와 이직 사유를 선택해주세요" />

      <P>이직확인서 처리 여부와 이직 사유 분쟁 여부에 따라 필요한 서류가 달라져요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x1F4C4;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>실업급여 구비서류 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>내 상황에 맞는 서류 확인</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              고용24에서 이직확인서 처리됐나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="confirm" value="done" label="처리 완료됐어요" sel={sel} pick={pick} />
              <Btn group="confirm" value="pending" label="아직 처리 중이에요" sel={sel} pick={pick} />
              <Btn group="confirm" value="no" label="제출 안 됐어요" sel={sel} pick={pick} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
              이직 사유에 분쟁이 있나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="dispute" value="no" label="없어요 (합의 퇴직·권고사직)" sel={sel} pick={pick} />
              <Btn group="dispute" value="yes" label="있어요 (부당해고·임금체불 등)" sel={sel} pick={pick} />
            </div>
          </div>

          {result && (
            <div style={{ marginTop: 16, padding: 16, borderRadius: 8, background: result.pass ? C.navyLight : "#F5F5F5", border: result.pass ? "1px solid rgba(30,58,95,.1)" : `1px solid ${C.line}` }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: result.pass ? C.navy : C.t1, marginBottom: 4 }}>
                {result.pass ? "✅" : "📌"} {result.headline}
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
      <Sec n="SECTION 02" id="docs" title="실업급여 신청 구비서류는 뭐가 있나요?" sub="신분증 하나가 전부예요" />

      <P>실업급여 신청 시 본인이 직접 챙겨야 할 서류는 <B>신분증 1개</B>뿐이에요. 주민등록증이나 운전면허증을 가져가면 돼요. 통장 사본은 일부 고용센터에서 요청하는 경우도 있지만 대부분은 계좌번호만 알려주면 돼요.</P>

      <P>이직확인서는 회사가 알아서 제출해야 해요. 본인이 발급받아 가져갈 필요가 없어요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법</A>에서 사업주는 이직한 피보험자가 요청하거나 직권으로 이직확인서를 퇴직 후 10일 이내에 고용센터에 제출하도록 정하고 있어요.</P>

      <P>근로계약서, 급여명세서, 해고통보서 등은 이직 사유에 분쟁이 있을 때만 필요해요. 합의 퇴직이나 권고사직이라면 고용센터에서 추가 서류를 요청하지 않아요. 혹시 모르니 관련 서류는 보관해두는 게 좋아요.</P>

      <TableTitle>실업급여 신청 구비서류 요약</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>서류</THL><TH>준비 주체</TH><TH>비고</TH></tr>
          </thead>
          <tbody>
            {[
              ["신분증", "본인", "주민등록증 또는 운전면허증"],
              ["이직확인서", "회사", "퇴직 후 10일 내 제출 의무"],
              ["통장 사본", "본인 (선택)", "일부 센터 요청 시"],
              ["근로계약서·급여명세서", "본인 (분쟁 시)", "이직 사유 분쟁 있을 때만"],
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
      <TableNote>※ 이직확인서 처리 상태는 고용24에서 조회 가능</TableNote>

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" id="confirm" title="실업급여 이직확인서는 어떻게 받나요?" sub="회사가 10일 내 제출, 본인이 받는 게 아니에요" />

      <P>이직확인서는 본인이 발급받는 서류가 아니에요. 회사가 <A href="https://www.work24.go.kr">고용24</A>나 고용센터를 통해 직접 제출하는 서류예요. 퇴직 후 회사는 10일 이내에 제출할 의무가 있어요. 본인이 할 일은 고용24에서 처리 여부를 조회하는 것뿐이에요.</P>

      <P>고용24 → 개인서비스 → 실업급여 → '이직확인서 처리 현황 조회'에서 제출 여부를 볼 수 있어요. 미제출 상태라면 회사 인사담당자에게 제출 요청을 해요. 요청해도 제출하지 않으면 고용센터(1350)에 신고할 수 있어요. 회사가 정당한 이유 없이 제출을 거부하면 과태료 대상이에요.</P>

      <P>이직확인서가 처리된 후 고용센터 방문 시 시스템에서 자동으로 불러와요. 본인이 인쇄해서 가져갈 필요가 없어요. 처리까지 보통 2~3일이 걸리니 처리 완료를 확인하고 나서 고용센터 방문 날짜를 잡는 게 좋아요.</P>

      <Info type="warn">{'<strong>주의:</strong> 이직확인서 미제출 상태에서 고용센터를 방문하면 수급자격 신청이 안 돼요. 방문 전 반드시 고용24에서 처리 여부를 확인하세요.'}</Info>

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" id="online" title="실업급여 신청 필요 서류는 온라인으로 제출할 수 있나요?" sub="이직확인서는 회사가 온라인 제출, 나머지는 방문이에요" />

      <P>이직확인서는 회사가 고용24 사업주 서비스를 통해 온라인으로 제출해요. 예전에는 고용센터에 직접 가야 했지만 이제는 온라인 제출이 일반화됐어요. 본인이 할 일은 없고, 고용24에서 처리 완료 여부만 조회하면 돼요.</P>

      <P>수급자격 인정 신청 자체는 고용센터 방문이 원칙이에요. 고용24에서 온라인 교육 수료와 일부 사전 입력은 가능하지만, 첫 번째 수급자격 신청은 관할 고용센터에 직접 방문해야 해요. 상담사 면담을 통해 이직 사유와 구직 의사를 확인하는 절차가 있기 때문이에요.</P>

      <P>이후 실업인정은 고용24에서 온라인으로 처리할 수 있어요. 4차 이후부터는 온라인 실업인정이 가능한 경우가 많아요. 각 실업인정일마다 고용센터에서 안내하는 방식을 따라가면 돼요.</P>

      <BridgeCard
        question="실업급여 신청 전체 절차가 궁금하세요?"
        body={<>워크넷 구직등록부터 첫 입금까지 <strong style={{ color: C.navy }}>5단계 전체 흐름</strong>을 신청방법 가이드에서 정리했어요.</>}
        btnText="실업급여 신청방법 전체 절차 →"
        href="/w/실업급여-신청방법"
      />

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" id="missing" title="실업급여 구비서류 빠뜨리면 어떻게 되나요?" sub="이직확인서 미처리가 가장 흔한 문제예요" />

      <P>신분증을 빠뜨리면 당일 신청이 불가능해요. 다른 사진 ID라도 있으면 상담 후 처리 여부를 확인해야 해요. 대부분의 경우 주민등록증·운전면허증이 없으면 당일 신청이 안 되니 꼭 챙기세요.</P>

      <P>이직확인서가 미처리 상태에서 방문하면 신청이 안 돼요. 가장 흔한 문제예요. 방문 전 반드시 고용24에서 처리 완료를 확인하고 오세요. 이직확인서 처리까지 기다리는 동안 워크넷 구직등록과 고용24 온라인 교육을 미리 완료해두면 시간 낭비가 없어요.</P>

      <P>분쟁이 있는데 관련 서류를 안 가져왔다면 고용센터에서 재방문 안내를 받아요. 부당해고·임금체불 같은 상황이라면 근로계약서, 급여명세서, 문자 내역 등 증빙을 최대한 준비해서 방문하는 게 좋아요.</P>

      <SpokeLink num="01" title="실업급여 신청방법 — 고용24 워크넷 절차" desc="5단계 신청 흐름과 방문 전 체크리스트" href="/w/실업급여-신청방법" />

      <a href="https://www.work24.go.kr" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-black">
        <span className="ext-btn-badge">고용24 공식</span>
        <span className="ext-btn-text">이직확인서 처리 현황 조회</span>
        <span className="ext-btn-cta">조회하기 →</span>
      </a>

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 구비서류 신청할 때 이직확인서를 본인이 가져가야 하나요?", a: '아니에요. 이직확인서는 <strong>회사가 고용24에 직접 제출</strong>해요. 본인은 고용24에서 처리 여부만 확인하면 돼요.' },
        { q: "실업급여 구비서류가 빠지면 다음 날 다시 방문해야 하나요?", a: '이직확인서 미처리면 처리 완료 후 재방문해야 해요. 신분증 문제면 당일 빠른 재방문으로 해결될 수도 있어요. 고용센터에 전화로 먼저 확인해 보세요.' },
      ]} />

      <RelatedArticles items={[
        { title: "실업급여 신청방법 — 고용24 워크넷 절차", desc: "실업급여 · 신청방법", href: "/w/실업급여-신청방법" },
        { title: "실업급여 워크넷 구직등록 방법", desc: "실업급여 · 실업신고", href: "/w/실업급여-실업신고" },
        { title: "실업급여 대기기간 — 첫 입금일 계산", desc: "실업급여 · 대기기간", href: "/w/실업급여-대기기간" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 신청방법", href: "/w/실업급여-신청방법" }}
        next={{ title: "실업급여 신청기간 12개월", href: "/w/실업급여-신청기간" }}
      />
    </BlogLayout>
  );
}
