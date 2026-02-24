"use client";

import { useState } from "react";
import {
  C, Btn, Info, Divider, Sec, P, B, A,
  TableTitle, TableNote, TH, THL,
  BridgeCard, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext,
  InlineLink, SpokeLink,
} from "@/components/wiki/BlogShared";

type Res = { pass: boolean; headline: string; detail: string; badges: string[] };

function getResult(sel: Record<string, string>): Res | null {
  const { step, confirm } = sel;
  if (!step || !confirm) return null;

  if (step === "nothing" && confirm === "done") return {
    pass: true,
    headline: "지금 바로 워크넷 구직등록부터 시작하세요",
    detail: "이직확인서가 처리됐다면 워크넷 구직등록 → 고용24 실업신고 순으로 진행하면 돼요. 워크넷(www.work.go.kr)에 접속해서 구직 신청을 먼저 하세요.",
    badges: ["워크넷 구직등록 필요", "이직확인서 처리 완료"],
  };

  if (step === "nothing" && confirm === "unknown") return {
    pass: false,
    headline: "이직확인서 처리 여부를 먼저 확인해야 해요",
    detail: "이직확인서가 처리되지 않으면 실업급여 신청이 불가능해요. 고용24(work24.go.kr)에서 처리 여부를 먼저 확인해보세요. 미처리 상태라면 회사에 요청하거나 고용센터에 직권 신청을 요청할 수 있어요.",
    badges: ["이직확인서 확인 필요", "워크넷 등록 대기"],
  };

  if (step === "worknet" && confirm === "done") return {
    pass: true,
    headline: "고용24에서 실업신고만 하면 끝이에요",
    detail: "워크넷 구직등록을 마쳤다면 고용24(work24.go.kr)에 접속해서 수급자격 인정 신청(실업신고)을 하면 돼요. 신청 후 일주일 내외로 고용센터 수급자격 심사가 진행돼요.",
    badges: ["워크넷 완료", "고용24 실업신고 필요"],
  };

  if (step === "worknet" && confirm === "unknown") return {
    pass: false,
    headline: "이직확인서 처리를 확인 후 실업신고로 넘어가세요",
    detail: "고용24에서 실업신고를 하려면 이직확인서가 반드시 처리된 상태여야 해요. 고용24 로그인 → 실업급여 신청 화면에서 처리 여부를 확인할 수 있어요.",
    badges: ["이직확인서 확인 필요", "실업신고 대기"],
  };

  if (step === "reported") return {
    pass: true,
    headline: "수급자격 심사 결과를 기다리면 돼요",
    detail: "실업신고까지 완료했다면 고용센터에서 수급자격 심사가 진행돼요. 심사 완료 후 첫 실업인정일이 문자로 통보돼요. 실업인정일에 구직활동을 증명하면 급여가 지급돼요.",
    badges: ["실업신고 완료", "심사 대기 중"],
  };

  return null;
}

export default function Article74() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "실업신고"]}
      tags={["2026년 기준", "실업급여", "워크넷 구직등록"]}
      date="2026-02-24"
      title="실업급여 워크넷 구직등록 방법 | 고용24 실업신고 절차"
      description={
        <>
          실업급여 받으려면 <strong style={{ color: C.t1 }}>워크넷 구직등록</strong> 후 고용24에서 실업신고를 해야 해요. 순서를 헷갈리면 신청이 반려될 수 있어서 단계별로 정리했어요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용24 · 워크넷 공식", date: "2026.02 기준" }}
      stickyLabel="1단계"
      stickyValue="워크넷 구직등록"
      stickyBtn="고용24 실업신고 →"
      stickyHref="https://www.work24.go.kr/cm/c/d/CMCDD108L.do"
    >
      <TOC items={[
        { t: "실업급여 워크넷 구직등록은 왜 필요한가요?", sub: "현재 단계 × 이직확인서 상태 선택" },
        { t: "실업급여 워크넷 구직등록은 어떻게 하나요?", sub: "PC·모바일 모두 10분이면 완료돼요" },
        { t: "실업급여 실업신고와 구직등록 차이가 뭐예요?", sub: null },
        { t: "실업급여 구직등록 안 하면 어떻게 되나요?", sub: null },
      ]} />

      <Summary3 items={[
        "워크넷 구직등록 → 고용24 실업신고 <strong>순서를 반드시</strong> 지켜야 해요.",
        "이직확인서 처리가 완료된 후에야 <strong>실업신고가 가능</strong>해요.",
        "두 절차 모두 <strong>온라인</strong>으로 처리할 수 있어요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" id="s1" title="실업급여 워크넷 구직등록은 왜 필요한가요?" sub="현재 진행 단계를 선택하면 다음 할 일을 알려드려요" />

      <P>실업급여는 그냥 신청한다고 바로 나오는 게 아니에요. 정해진 순서를 지켜야 처리가 돼요. <B>워크넷 구직등록 → 고용24 실업신고 → 수급자격 인정</B> 이 순서를 반드시 지켜야 해요.</P>
      <P>워크넷 구직등록은 "나는 지금 일자리를 찾고 있는 실업자예요"라고 공식 등록하는 절차예요. 이 등록이 없으면 고용24에서 수급자격 신청(실업신고)을 아예 할 수 없어요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x1F4CB;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>실업급여 실업신고 단계 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>고용24 + 워크넷 연동 기준</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              지금 어느 단계까지 완료했나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const }}>
              <Btn group="step" value="nothing" label="아무것도 안 함" sel={sel} pick={pick} />
              <Btn group="step" value="worknet" label="워크넷 구직등록만" sel={sel} pick={pick} />
              <Btn group="step" value="reported" label="고용24 실업신고까지" sel={sel} pick={pick} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
              이직확인서 처리는?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const }}>
              <Btn group="confirm" value="done" label="처리 완료됨" sel={sel} pick={pick} />
              <Btn group="confirm" value="unknown" label="모르겠음·처리 중" sel={sel} pick={pick} />
            </div>
          </div>

          {result && (
            <div style={{ marginTop: 16, padding: 16, borderRadius: 8, background: result.pass ? C.navyLight : "#F5F5F5", border: result.pass ? "1px solid rgba(30,58,95,.1)" : `1px solid ${C.line}` }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: result.pass ? C.navy : C.t1, marginBottom: 4 }}>
                {result.pass ? "✅" : "⚠️"} {result.headline}
              </div>
              <div style={{ fontSize: 13, color: C.t3, lineHeight: 1.55 }}>{result.detail}</div>
              <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" as const }}>
                {result.badges.map((b, i) => (
                  <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, background: result.pass ? C.navy : C.t4, color: "#fff" }}>{b}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 02 ── */}
      <Divider />
      <Sec n="SECTION 02" id="s2" title="실업급여 워크넷 구직등록은 어떻게 하나요?" sub="PC·모바일 모두 10분이면 완료돼요" />

      <P>워크넷 구직등록은 생각보다 간단해요. 워크넷(www.work.go.kr)에 접속해서 로그인하고, 이력서를 등록하면 돼요. 공인인증서나 간편 인증(카카오, 네이버 등)으로 로그인할 수 있어요.</P>

      <TableTitle>워크넷 구직등록 단계별 절차</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>단계</THL><THL>내용</THL><THL>주의사항</THL></tr>
          </thead>
          <tbody>
            {[
              ["1단계", "워크넷 접속 후 로그인", "공인인증서 또는 간편인증"],
              ["2단계", "이력서 작성 및 등록", "희망직종·임금 입력 필수"],
              ["3단계", "구직 신청 완료 확인", "구직신청번호 메모 권장"],
              ["4단계", "고용24에서 실업신고", "워크넷 연동 자동 확인"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 8px", textAlign: ci === 0 ? "center" : "left", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.navy : C.t2, fontWeight: ci === 0 ? 700 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>※ 워크넷 구직등록 후 고용24와 자동으로 연동돼요. 별도 연결 작업 없이 바로 실업신고가 가능해요.</TableNote>

      <P>이력서는 길게 쓸 필요 없어요. 기본 정보(이름, 생년월일, 연락처)와 최근 직장 정보, 희망직종·임금 정도만 입력해도 등록이 완료돼요.</P>
      <P>워크넷 구직등록이 완료되면 고용24(work24.go.kr)로 넘어가서 실업급여 신청(수급자격 인정 신청)을 진행하면 돼요. 두 사이트가 연동되어 있어서 구직등록 정보가 자동으로 불러와져요.</P>

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" id="s3" title="실업급여 실업신고와 구직등록 차이가 뭐예요?" sub="사이트도 다르고 역할도 달라요" />

      <P>이 두 가지를 헷갈리는 분들이 많아요. 워크넷 구직등록과 고용24 실업신고는 역할도, 사이트도 다른 별개의 절차예요. 실업급여를 받으려면 두 가지 모두 해야 해요.</P>
      <P>워크넷 구직등록은 취업 지원 시스템에 구직자로 등록하는 것이고, 고용24 실업신고(수급자격 인정 신청)는 고용보험에서 실업급여를 받을 자격을 신청하는 거예요.</P>

      <TableTitle>워크넷 구직등록 vs 고용24 실업신고 비교</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>구분</THL><THL>워크넷 구직등록</THL><THL>고용24 실업신고</THL></tr>
          </thead>
          <tbody>
            {[
              ["사이트", "www.work.go.kr", "www.work24.go.kr"],
              ["역할", "구직자 등록", "수급자격 인정 신청"],
              ["선후 관계", "먼저 해야 함", "구직등록 후 가능"],
              ["주관 기관", "고용노동부", "고용보험(고용노동부)"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 8px", textAlign: "left", borderBottom: `1px solid ${C.line}`, color: C.t2, fontWeight: ci === 0 ? 700 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>※ 두 사이트는 연동되어 있어요. 워크넷에서 구직등록을 마치면 고용24에서 정보가 자동으로 불러와져요.</TableNote>

      <P>워크넷은 "취업 도우미 등록", 고용24는 "실업급여 신청"이에요. 순서는 워크넷 먼저, 고용24 나중이에요.</P>
      <P>두 사이트 모두 PC와 모바일 앱에서 이용 가능해요. 고용24 앱을 설치하면 실업인정도 모바일로 편하게 처리할 수 있어요.</P>

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" id="s4" title="실업급여 구직등록 안 하면 어떻게 되나요?" sub="구직등록이 없으면 실업신고 자체가 불가능해요" />

      <P>워크넷 구직등록을 하지 않으면 고용24에서 실업신고를 아예 할 수 없어요. 시스템이 구직자 등록 여부를 먼저 확인하기 때문이에요. 이직확인서가 처리됐어도 구직등록이 없으면 진행이 안 돼요.</P>
      <P>간혹 구직등록 없이 고용센터를 방문하는 분들이 있어요. 고용센터에서 현장 등록을 도와주기도 하지만, 온라인으로 미리 해두면 방문 시간을 크게 줄일 수 있어요.</P>

      <Info type="warn">{'<strong>구직활동 의무:</strong> 구직등록 후에는 구직활동을 성실히 해야 해요. 실업인정 시 구직활동 내역 제출이 요구되고, 허위 기재 시 부정수급으로 처리될 수 있어요.'}</Info>

      <P>구직등록은 언제든 취소할 수 있어요. 취업이 확정되면 고용24에서 취업 사실을 신고하면 되고, 이후 구직등록도 자동으로 종료돼요. 취업 후에도 실업급여를 계속 받으면 부정수급이에요.</P>

      <a href="https://www.work.go.kr/seekWork/regst/insertReqstInfoForm.do" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-black">
        <span className="ext-btn-badge">워크넷 공식</span>
        <span className="ext-btn-text">구직등록 바로 시작하기</span>
        <span className="ext-btn-cta">바로가기 →</span>
      </a>

      <Divider />
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 워크넷 구직등록과 고용24 실업신고는 같은 건가요?", a: "다른 절차예요. 워크넷은 취업 지원 포털에서 구직자로 등록하는 과정이고, 고용24는 고용보험 기반의 수급자격 인정 신청(실업신고)을 하는 곳이에요. 두 가지 모두 해야 실업급여 신청이 완료돼요." },
        { q: "실업급여 워크넷 구직등록은 언제 해야 하나요?", a: "퇴직 후 최대한 빨리 하는 게 좋아요. 수급기간이 퇴직일 다음날부터 12개월이기 때문에, 늦게 신청할수록 수령 가능한 일수가 줄어들 수 있어요." },
      ]} />

      <BridgeCard
        question="구직등록과 실업신고를 마쳤다면, 실업인정일을 빠뜨리지 않는 게 중요해요."
        body={<>실업급여 신청 전체 절차가 궁금하다면 <strong style={{ color: C.navy }}>실업급여 신청방법 가이드</strong>에서 5단계 전체 흐름을 확인해보세요.</>}
        btnText="실업급여 신청방법 전체 보기 →"
        href="/w/실업급여-신청방법"
      />

      <RelatedArticles items={[
        { title: "실업급여 신청방법 — 고용24 5단계 절차", desc: "실업급여 · 신청방법", href: "/w/실업급여-신청방법" },
        { title: "실업급여 구비서류 — 이직확인서 발급", desc: "실업급여 · 구비서류", href: "/w/실업급여-구비서류" },
        { title: "실업급여 신청기간 — 퇴직 후 12개월", desc: "실업급여 · 신청기간", href: "/w/실업급여-신청기간" },
        { title: "실업급여 부정수급 — 반환 기준", desc: "실업급여 · 부정수급", href: "/w/실업급여-부정수급" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 신청기간", href: "/w/실업급여-신청기간" }}
        next={{ title: "실업급여 실업인정 특례", href: "/w/실업급여-실업인정-특례" }}
      />
    </BlogLayout>
  );
}
