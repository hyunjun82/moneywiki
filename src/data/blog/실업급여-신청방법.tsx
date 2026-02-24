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

const readyLinks: ResLink[] = [
  { icon: "📋", title: "실업급여 구비서류 — 이직확인서 발급 방법", href: "/w/실업급여-구비서류" },
  { icon: "🧮", title: "실업급여 계산기 — 예상 수령액 확인", href: "/w/실업급여-계산기" },
];
const waitLinks: ResLink[] = [
  { icon: "📄", title: "워크넷 구직등록 방법", href: "/w/실업급여-실업신고" },
  { icon: "📋", title: "실업급여 구비서류 안내", href: "/w/실업급여-구비서류" },
];

function getResult(sel: Record<string, string>): Res | null {
  const { step, confirm } = sel;
  if (!step || !confirm) return null;

  if (step === "done" && confirm === "yes") return {
    pass: true,
    headline: "준비 완료! 고용센터 방문만 남았어요",
    detail: "워크넷 구직등록 + 고용24 온라인 교육(수료 후 14일 내)을 완료했다면 관할 고용센터에 방문해서 수급자격 인정 신청만 하면 돼요.",
    badges: ["신청 준비 완료", "고용센터 방문 필요"],
    links: readyLinks,
  };
  if (step === "done" && confirm === "no") return {
    pass: false,
    headline: "이직확인서 제출 여부를 먼저 확인해야 해요",
    detail: "고용24 → 개인서비스 → 이직확인서 조회에서 회사가 제출했는지 확인하세요. 미제출이면 회사에 요청하거나 고용센터에 신고할 수 있어요.",
    badges: ["이직확인서 확인 필요"],
    links: waitLinks,
  };
  if (step === "worknet" && confirm === "yes") return {
    pass: false,
    headline: "워크넷 완료 후 고용24 온라인 교육이 남았어요",
    detail: "고용24에서 수급자격 신청자 온라인 교육(30분~1시간)을 수료해야 해요. 수료 후 14일 이내에 고용센터를 방문해야 해요.",
    badges: ["온라인 교육 필요"],
    links: waitLinks,
  };
  if (step === "worknet" && confirm === "no") return {
    pass: false,
    headline: "이직확인서도 함께 확인해두세요",
    detail: "고용24 온라인 교육 수료와 이직확인서 제출 여부를 동시에 준비해두면 신청이 한 번에 돼요.",
    badges: ["온라인 교육 필요", "이직확인서 확인"],
    links: waitLinks,
  };
  if (step === "nothing" && confirm === "yes") return {
    pass: false,
    headline: "워크넷 구직등록 → 고용24 교육 → 방문 순서예요",
    detail: "먼저 워크넷(work.go.kr)에서 구직등록을 해요. 그 다음 고용24에서 수급자격 신청자 온라인 교육을 수료하고 14일 이내에 고용센터를 방문해요.",
    badges: ["워크넷 구직등록 먼저"],
    links: waitLinks,
  };
  if (step === "nothing" && confirm === "no") return {
    pass: false,
    headline: "워크넷 구직등록부터 시작해요",
    detail: "이직확인서 제출 여부도 고용24에서 확인해두세요. 모든 준비가 완료돼야 고용센터 방문 시 한 번에 신청이 가능해요.",
    badges: ["구직등록 먼저", "이직확인서 확인"],
    links: waitLinks,
  };

  return null;
}

export default function Article() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "신청방법"]}
      tags={["2026년 기준", "실업급여", "신청 절차"]}
      date="2026-02-24"
      title="실업급여 신청방법 고용24 워크넷 | 실업급여 수급자격 인정 절차"
      description={
        <>
          워크넷 구직등록 → 고용24 온라인 교육 → 고용센터 방문, <strong style={{ color: C.t1 }}>이 3단계</strong>가 핵심이에요. 수급자격 인정부터 실업인정까지 전체 절차를 정리했어요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 · 고용24", date: "2026.02 기준" }}
      stickyLabel="5단계 신청"
      stickyValue="실업급여"
      stickyBtn="고용24 신청 →"
      stickyHref="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do"
    >
      <TOC items={[
        { t: "신청 준비 상태 체크", sub: "워크넷 · 이직확인서 준비 여부" },
        { t: "실업급여 신청방법 순서는 어떻게 되나요?", sub: "5단계 요약" },
        { t: "실업급여 신청방법 고용24 워크넷 활용은 어떻게 하나요?", sub: "구직등록 + 온라인 교육" },
        { t: "실업급여 수급자격 인정 신청은 어디서 하나요?", sub: "고용센터 방문 준비" },
        { t: "실업급여 수급자격 인정 절차에서 실업인정은 어떻게 받나요?", sub: null },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      <Summary3 items={[
        "워크넷 구직등록 → 고용24 온라인 교육 → 고용센터 방문, <strong>이 순서</strong>로 진행해요.",
        "고용24 온라인 교육 수료 후 <strong>14일 이내</strong>에 고용센터를 방문해야 해요.",
        "수급자격 인정 후 <strong>4주마다 실업인정</strong>을 받으면 급여가 입금돼요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" id="checker" title="신청 준비 상태 체크" sub="현재 진행 단계와 이직확인서 상태를 선택해주세요" />

      <P>지금 어느 단계까지 됐는지 선택하면 다음에 뭘 해야 하는지 바로 알 수 있어요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x1F4CB;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>실업급여 신청 준비 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>현재 준비 단계 확인</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              지금 어느 단계까지 됐나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="step" value="nothing" label="아무것도 안 했어요" sel={sel} pick={pick} />
              <Btn group="step" value="worknet" label="워크넷 구직등록만 완료" sel={sel} pick={pick} />
              <Btn group="step" value="done" label="구직등록 + 온라인 교육 완료" sel={sel} pick={pick} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
              이직확인서 고용24 제출 됐나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="confirm" value="yes" label="제출됨 확인했어요" sel={sel} pick={pick} />
              <Btn group="confirm" value="no" label="모르겠거나 안 됐어요" sel={sel} pick={pick} />
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
      <Sec n="SECTION 02" id="steps" title="실업급여 신청방법 순서는 어떻게 되나요?" sub="5단계로 정리돼요" />

      <P>실업급여 신청은 크게 5단계예요. 워크넷 구직등록 → 고용24 온라인 교육 → 고용센터 방문(수급자격 인정 신청) → 실업인정 → 입금 순서예요. 온라인으로 처리되는 부분이 늘어서 고용센터 방문은 수급자격 신청 때 1회만 가면 돼요(이후 실업인정은 온라인 가능).</P>

      <TableTitle>실업급여 신청 5단계</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>단계</THL><TH>할 일</TH><TH>방법</TH></tr>
          </thead>
          <tbody>
            {[
              ["1단계", "워크넷 구직등록", "온라인 (work.go.kr)"],
              ["2단계", "수급자격 신청자 온라인 교육", "고용24 — 약 30분~1시간"],
              ["3단계", "수급자격 인정 신청", "관할 고용센터 방문"],
              ["4단계", "구직활동 + 실업인정", "4주마다 (온라인 가능)"],
              ["5단계", "구직급여 입금", "실업인정 후 2~3일 내"],
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
      <TableNote>※ 수급자격 인정 후 실업인정일 지정까지 1~2주 소요</TableNote>

      <InlineLink icon="📋" title="실업급여 구비서류 — 이직확인서 발급 방법" desc="신분증 외에 뭐가 필요한지, 이직확인서 받는 방법" href="/w/실업급여-구비서류" />

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" id="online" title="실업급여 신청방법 고용24 워크넷 활용은 어떻게 하나요?" sub="구직등록과 온라인 교육 2가지가 핵심이에요" />

      <P>먼저 <A href="https://www.work.go.kr">워크넷(work.go.kr)</A>에 접속해서 회원가입 후 '구직등록' 메뉴에서 이력서를 작성해요. 학력·경력·희망 직종만 입력하면 10~15분이면 완료돼요. 내용은 나중에 수정할 수 있으니 처음엔 간단히 써도 괜찮아요. <B>워크넷 구직등록 없이 고용센터에 가면 다시 오라는 말을 들어요</B>. 방문 전에 반드시 먼저 해야 해요.</P>

      <P>다음으로 <A href="https://www.ei.go.kr">고용24(ei.go.kr)</A>에서 '수급자격 신청자 온라인 교육'을 수강해요. 개인서비스 → 실업급여 메뉴에서 찾을 수 있어요. 약 30분~1시간 분량이고, 중간에 끊었다 이어서 들을 수 있어요. 끝까지 들어야 수료증이 나오는데, 수료 후 <B>14일 이내에 고용센터를 방문</B>해야 해요. 14일을 넘기면 다시 들어야 해요.</P>

      <P>이직확인서 제출 여부도 미리 고용24에서 조회해두세요. 회사는 퇴직 후 10일 이내에 이직확인서를 제출할 의무가 있어요. 제출 안 됐으면 회사에 요청하거나 고용센터에 신고할 수 있어요. 이직확인서가 처리돼야 수급자격 인정이 가능해요.</P>

      <Info type="warn">{'<strong>14일 기한 주의:</strong> 온라인 교육 수료 후 14일이 넘으면 수료 인정이 안 돼서 다시 들어야 해요. 교육 수료 즉시 고용센터 방문 날짜를 잡아두세요.'}</Info>

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" id="center" title="실업급여 수급자격 인정 신청은 어디서 하나요?" sub="거주지 관할 고용센터에 방문해야 해요" />

      <P>온라인 교육 수료 후 거주지 관할 <A href="https://www.work.go.kr">고용센터</A>에 방문해요. 고용24 → '고용센터 찾기'에서 주소로 관할 센터를 조회할 수 있어요. 방문 시 신분증(주민등록증·운전면허증)만 있으면 돼요. 급여명세서나 근로계약서는 이직 사유에 분쟁이 있을 때만 필요해요.</P>

      <P>센터에서 번호표를 뽑고 대기 후 상담사와 면담해요. 퇴직 사유, 구직 의사 등을 확인해요. 보통 당일 또는 2~3일 내에 수급자격 인정 여부가 결정돼요. 수급자격이 인정되면 1~2주 후에 첫 실업인정일이 지정돼요. 이날부터 실제 급여를 받기 시작해요.</P>

      <P>방문 전에 준비할 사항을 정리하면 이렇게 돼요. 워크넷 구직등록 완료, 고용24 온라인 교육 수료(14일 이내), 이직확인서 제출 여부 확인, 신분증 지참이에요. 이 4가지가 갖춰져야 한 번에 신청이 완료돼요.</P>

      <BridgeCard
        question="고용센터 방문 시 필요한 구비서류가 더 있나요?"
        body={<>신분증 외에 이직확인서 처리 상태와 추가 서류가 필요한 경우를 <strong style={{ color: C.navy }}>구비서류 안내</strong>에서 정리했어요.</>}
        btnText="실업급여 구비서류 전체 안내 →"
        href="/w/실업급여-구비서류"
      />

      {/* ── SECTION 05 ── */}
      <Divider />
      <Sec n="SECTION 05" id="recognition" title="실업급여 수급자격 인정 절차에서 실업인정은 어떻게 받나요?" sub="4주마다 구직활동을 증명해야 급여가 나와요" />

      <P>수급자격 인정 후에는 고용센터에서 지정한 실업인정일마다 구직활동을 증명해야 해요. 이 절차를 <B>실업인정</B>이라고 해요. 4주에 최소 1회 이상 입사지원, 면접, 직업훈련, 취업박람회 참가 등 구직활동을 하고 이를 증명하면 돼요.</P>

      <P>1~3차 실업인정은 고용센터를 방문해야 하는 경우가 많고, 4차 이후부터는 고용24에서 온라인으로 처리 가능한 경우가 많아요. 워크넷에서 입사지원을 하면 구직활동이 자동으로 기록돼서 별도 증빙 없이 편리해요. 실업인정일을 달력에 꼭 표시해두세요.</P>

      <P>실업인정일에 신청을 못 하면 그 기간 급여를 받을 수 없어요. 단, 질병·천재지변·면접 등 정당한 사유가 있으면 사전에 날짜 변경을 신청할 수 있어요. 고용센터에 미리 연락하거나 고용24에서 변경 신청을 해두는 게 중요해요.</P>

      <SpokeLink num="01" title="실업급여 실업인정 특례 — 불출석 인정 방법" desc="질병·면접으로 실업인정일 못 가면 인정받는 방법" href="/w/실업급여-실업인정-특례" />

      <a href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-black">
        <span className="ext-btn-badge">고용24 공식</span>
        <span className="ext-btn-text">실업급여 인터넷 신청</span>
        <span className="ext-btn-cta">신청하기 →</span>
      </a>

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 신청방법 — 어디서 어떻게 해요?", a: '워크넷 구직등록 → 고용24 온라인 교육 → 관할 고용센터 방문 순서예요. 방문 시 신분증만 있으면 되고, <strong>이직확인서는 회사가 제출</strong>해요.' },
        { q: "실업급여 신청하면 바로 나오나요?", a: '수급자격 인정 후 대기기간 7일이 지나고 <strong>첫 실업인정 후 2~3일 내</strong>에 입금돼요. 신청부터 첫 입금까지 보통 3~4주 걸려요.' },
      ]} />

      <RelatedArticles items={[
        { title: "실업급여 대기기간 7일 — 첫 입금일 계산", desc: "실업급여 · 대기기간", href: "/w/실업급여-대기기간" },
        { title: "실업급여 구비서류 — 이직확인서 발급", desc: "실업급여 · 구비서류", href: "/w/실업급여-구비서류" },
        { title: "실업급여 수급자격 — 비자발적 퇴직 조건", desc: "실업급여 · 수급자격", href: "/w/실업급여-수급자격" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 대기기간", href: "/w/실업급여-대기기간" }}
        next={{ title: "실업급여 구비서류", href: "/w/실업급여-구비서류" }}
      />
    </BlogLayout>
  );
}
