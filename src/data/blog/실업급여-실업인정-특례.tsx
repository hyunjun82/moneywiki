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
  const { reason, docs } = sel;
  if (!reason || !docs) return null;

  if (reason === "sick" && docs === "ready") return {
    pass: true,
    headline: "진단서만 있으면 특례 인정돼요. 고용24로 제출하세요",
    detail: "질병·부상으로 출석이 불가능한 경우, 의료기관 발행 진단서(치료기간 명시)를 고용24 또는 고용센터에 제출하면 실업인정 특례로 처리돼요. 실업인정일 전날까지 제출해야 해요.",
    badges: ["특례 인정 가능", "진단서 제출"],
  };

  if (reason === "sick" && docs === "none") return {
    pass: false,
    headline: "진단서를 먼저 발급받아야 해요",
    detail: "질병·부상 특례 신청에는 반드시 의료기관 진단서가 필요해요. 진단서에는 치료 기간이 명시되어 있어야 해요. 발급 후 고용24나 고용센터에 제출하세요.",
    badges: ["진단서 발급 필요", "제출 전"],
  };

  if (reason === "interview" && docs === "ready") return {
    pass: true,
    headline: "면접 확인서 제출로 특례 인정 받을 수 있어요",
    detail: "채용 면접·필기시험·채용 행사 참석은 실업인정 특례 사유예요. 면접 확인서, 채용공고 캡처, 입사지원 확인서 등 증빙을 고용24에 제출하면 돼요.",
    badges: ["특례 인정 가능", "면접 확인서 제출"],
  };

  if (reason === "interview" && docs === "none") return {
    pass: false,
    headline: "면접 증빙 서류를 준비해야 해요",
    detail: "면접 특례를 인정받으려면 회사명, 면접 일시가 나오는 증빙이 필요해요. 채용공고 링크·이메일 초대장·면접 확인서 중 하나를 준비하세요.",
    badges: ["증빙 서류 필요", "제출 전"],
  };

  if (reason === "education" && docs === "ready") return {
    pass: true,
    headline: "교육·훈련 참석 확인서로 특례 처리돼요",
    detail: "고용센터 알선 직업훈련, 국가기술자격 시험 참석은 특례 사유예요. 훈련기관 출석확인서나 시험 수험표를 고용24에 제출하면 돼요.",
    badges: ["특례 인정 가능", "확인서 제출"],
  };

  if (reason === "education" && docs === "none") return {
    pass: false,
    headline: "훈련기관에서 출석확인서를 받아야 해요",
    detail: "교육·훈련 특례는 훈련기관 출석확인서 또는 시험 수험표가 필요해요. 서류 없이는 특례 처리가 안 돼요. 고용센터 알선 훈련이 아닌 경우는 인정되지 않을 수 있어요.",
    badges: ["출석확인서 필요", "제출 전"],
  };

  return {
    pass: false,
    headline: "고용센터에 직접 문의해야 해요",
    detail: "천재지변, 신체 장애 등 특수한 사유는 고용센터에서 개별 심사를 해요. 사유를 증명할 수 있는 서류를 가지고 관할 고용센터에 문의하세요.",
    badges: ["개별 심사 필요", "고용센터 문의"],
  };
}

export default function Article75() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "실업인정 특례"]}
      tags={["2026년 기준", "실업급여", "실업인정 특례"]}
      date="2026-02-24"
      title="실업급여 실업인정 특례 조건 | 실업급여 불출석 인정 방법"
      description={
        <>
          실업급여 <strong style={{ color: C.t1 }}>실업인정일에 못 가도</strong> 질병, 면접, 교육 등 사유가 있으면 특례로 인정돼요. 사유별 제출 서류와 신청 방법을 정리했어요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 시행규칙 제92조 · 고용24", date: "2026.02 기준" }}
      stickyLabel="특례 신청"
      stickyValue="불출석 사유 증빙 제출"
      stickyBtn="고용24 온라인 접수 →"
      stickyHref="https://www.work24.go.kr/cm/c/d/CMCDD108L.do"
    >
      <TOC items={[
        { t: "실업급여 실업인정 특례가 뭐예요?", sub: "불출석 사유 × 서류 준비 선택" },
        { t: "실업급여 실업인정 특례 조건은 뭐가 있나요?", sub: "사유 6가지와 필요 서류" },
        { t: "실업급여 질병으로 실업인정일 못 가면 어떻게 하나요?", sub: null },
        { t: "실업급여 면접이나 교육도 실업인정 특례로 인정되나요?", sub: null },
      ]} />

      <Summary3 items={[
        "질병·면접·교육 등 정당한 사유면 <strong>불출석 특례</strong>가 가능해요.",
        "사유별 증빙 서류를 <strong>실업인정일 전날까지</strong> 제출해야 해요.",
        "고용24 온라인 또는 고용센터 방문 중 <strong>선택 가능</strong>해요.",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" id="s1" title="실업급여 실업인정 특례가 뭐예요?" sub="불출석 사유와 서류 준비 상황을 선택하면 가이드를 드려요" />

      <P>실업급여를 받으려면 28일마다 고용센터에 방문하거나 온라인으로 구직활동을 증명해야 해요. 이걸 <B>실업인정</B>이라고 해요. 그런데 어쩔 수 없는 사정으로 실업인정일에 못 갈 때가 있어요.</P>
      <P>이럴 때 활용할 수 있는 게 <B>실업인정 특례</B>예요. 정당한 사유가 있다면 출석하지 않아도 실업인정을 받을 수 있는 제도예요. 사유와 서류만 갖추면 급여가 끊기지 않아요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x1F4CB;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>실업인정 특례 사유 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>고용보험법 시행규칙 제92조 기준</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              불출석 사유는 무엇인가요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const }}>
              <Btn group="reason" value="sick" label="질병·부상" sel={sel} pick={pick} />
              <Btn group="reason" value="interview" label="면접·채용 행사" sel={sel} pick={pick} />
              <Btn group="reason" value="education" label="교육·훈련" sel={sel} pick={pick} />
              <Btn group="reason" value="other" label="천재지변·기타" sel={sel} pick={pick} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
              증빙 서류는?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const }}>
              <Btn group="docs" value="ready" label="준비됐어요" sel={sel} pick={pick} />
              <Btn group="docs" value="none" label="아직 없어요" sel={sel} pick={pick} />
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
      <Sec n="SECTION 02" id="s2" title="실업급여 실업인정 특례 조건은 뭐가 있나요?" sub="사유 6가지와 필요 서류를 정리했어요" />

      <P>고용보험법 시행규칙에서 정한 실업인정 특례 사유는 크게 6가지예요. 모두 증빙 서류를 제출해야 인정돼요. 서류 없이 구두로만 신청하면 처리되지 않아요.</P>

      <TableTitle>실업인정 특례 사유와 필요 서류</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>특례 사유</THL><THL>필요 서류</THL></tr>
          </thead>
          <tbody>
            {[
              ["질병·부상", "의료기관 진단서 (치료기간 명시)"],
              ["면접·필기시험", "면접 확인서, 채용공고, 이메일 초대장"],
              ["직업훈련·자격시험", "훈련 출석확인서, 수험표"],
              ["천재지변", "피해 확인서 또는 뉴스 기사"],
              ["신체적 장애", "장애인 등록증 또는 진단서"],
              ["기타 부득이한 사유", "고용센터 개별 심사"],
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
      <TableNote>※ 서류는 실업인정일 전날까지 고용24(온라인) 또는 고용센터(방문)에 제출해야 해요.</TableNote>

      <P>특례 신청은 실업인정일이 지나기 전에 해야 해요. 고용24에 접속해서 '실업인정 특례 신청' 메뉴에서 서류를 첨부하면 돼요.</P>
      <P>특례가 인정되면 해당 실업인정일에 출석하지 않아도 구직활동 인정과 급여 지급이 동일하게 이루어져요. 단, 다음 실업인정일에는 반드시 정상 출석해야 해요.</P>

      {/* ── SECTION 03 ── */}
      <Divider />
      <Sec n="SECTION 03" id="s3" title="실업급여 질병으로 실업인정일 못 가면 어떻게 하나요?" sub="진단서 한 장이면 해결돼요" />

      <P>갑자기 아프거나 다쳐서 실업인정일에 이동이 불가능할 때가 있어요. 이런 경우 가장 먼저 할 일은 병원에서 진단서를 발급받는 거예요. 진단서에는 치료 기간이 꼭 명시되어 있어야 해요.</P>
      <P>진단서를 발급받았다면 고용24에 접속해서 실업인정 특례 신청 메뉴에 진단서 파일을 첨부하면 돼요. 직접 방문하지 않아도 온라인으로 처리할 수 있어요.</P>

      <Info type="warn">{'<strong>주의:</strong> 단순 감기나 경미한 증상은 인정되지 않을 수 있어요. 입원이나 거동이 불가능한 상황임이 진단서에 명확하게 나타나야 해요.'}</Info>

      <P>입원 중이라 본인이 직접 신청하기 어렵다면, 가족이 대리인으로 신청할 수 있어요. 대리인 신청 시에는 위임장과 대리인 신분증도 함께 제출해야 해요.</P>
      <P>치료 기간이 길어서 여러 실업인정일에 걸쳐 출석이 불가능하다면, 각 실업인정일마다 특례 신청을 해야 해요. 한 번 제출한 진단서가 이후 실업인정일에 자동으로 적용되지는 않아요.</P>

      {/* ── SECTION 04 ── */}
      <Divider />
      <Sec n="SECTION 04" id="s4" title="실업급여 면접이나 교육도 실업인정 특례로 인정되나요?" sub="구직활동 자체가 특례 사유가 될 수 있어요" />

      <P>면접 참석은 실업인정 특례 사유로 인정돼요. 실업급여의 목적이 재취업 촉진이기 때문에, 면접처럼 적극적인 구직활동은 출석을 대체하는 정당한 사유로 봐요.</P>
      <P>다만 회사 이름, 면접 일시가 확인되는 서류가 필요해요. 이메일로 받은 면접 초대장, 채용공고 캡처, 회사 발행 면접 확인서 등이 인정돼요.</P>

      <TableTitle>면접·교육 특례 인정 여부</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>사유</THL><THL>인정 여부</THL><THL>필요 증빙</THL></tr>
          </thead>
          <tbody>
            {[
              ["채용 면접", "인정", "면접 확인서, 이메일 초대장"],
              ["필기·적성 시험", "인정", "시험 안내 공문 또는 수험표"],
              ["채용 박람회 참석", "인정", "참가 확인서"],
              ["고용센터 알선 훈련", "인정", "훈련 출석확인서"],
              ["사설 어학원·자격증 학원", "불인정", "—"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 8px", textAlign: ci === 1 ? "center" : "left", borderBottom: `1px solid ${C.line}`, color: ci === 1 ? (cell === "인정" ? "#10b981" : "#ef4444") : C.t2, fontWeight: ci === 0 ? 700 : ci === 1 ? 700 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>※ 사설 학원이나 개인 공부는 특례 사유로 인정되지 않아요. 고용센터가 알선한 훈련이어야 해요.</TableNote>

      <P>교육의 경우, 고용센터가 직접 알선한 직업훈련이나 국가기술자격 시험 참석은 특례로 인정돼요. 반면 본인이 개인적으로 등록한 사설 학원은 특례 사유가 되지 않아요.</P>
      <P>면접 특례가 인정된 날은 구직활동 1회로도 카운트돼요. 실업인정 특례와 구직활동 인정이 동시에 처리되기 때문에, 면접을 다녀왔다면 특례 신청을 꼭 하는 게 유리해요.</P>

      <SpokeLink num="01" title="실업급여 구직활동 인정 — 차수별 증빙 방법" desc="차수별 구직활동 기준과 인정되는 활동 정리" href="/w/실업급여-구직활동" />

      <a href="https://www.work24.go.kr/cm/c/d/CMCDD108L.do" target="_blank" rel="noopener noreferrer" className="ext-btn ext-btn-black">
        <span className="ext-btn-badge">고용24 공식</span>
        <span className="ext-btn-text">실업인정 특례 신청</span>
        <span className="ext-btn-cta">바로가기 →</span>
      </a>

      <Divider />
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 실업인정 특례는 몇 번이나 쓸 수 있나요?", a: "사유가 생길 때마다 쓸 수 있어요. 횟수 제한은 없어요. 다만 매번 증빙 서류를 제출해야 해요. 서류 없이는 특례로 처리되지 않아요." },
        { q: "실업급여 실업인정 특례 신청을 기한 이후에 하면 어떻게 되나요?", a: "원칙적으로 실업인정일 전날까지 제출해야 해요. 불가피한 사정으로 이후에 제출한 경우에는 고용센터에서 개별적으로 판단해요. 최대한 빨리 제출하는 게 중요해요." },
      ]} />

      <BridgeCard
        question="실업인정 특례를 쓴 뒤 다음 실업인정은 어떻게 하나요?"
        body={<>구직활동 증빙 기준이 차수마다 달라져요. <strong style={{ color: C.navy }}>실업급여 구직활동 인정 가이드</strong>에서 차수별 기준을 확인해보세요.</>}
        btnText="구직활동 인정 기준 →"
        href="/w/실업급여-구직활동"
      />

      <RelatedArticles items={[
        { title: "실업급여 신청방법 — 고용24 5단계 절차", desc: "실업급여 · 신청방법", href: "/w/실업급여-신청방법" },
        { title: "실업급여 구직활동 인정 — 차수별 증빙", desc: "실업급여 · 구직활동", href: "/w/실업급여-구직활동" },
        { title: "실업급여 워크넷 구직등록 방법", desc: "실업급여 · 실업신고", href: "/w/실업급여-실업신고" },
        { title: "실업급여 수급유예 조건", desc: "실업급여 · 수급유예", href: "/w/실업급여-수급유예" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 워크넷 구직등록", href: "/w/실업급여-실업신고" }}
        next={{ title: "실업급여 구직활동 인정", href: "/w/실업급여-구직활동" }}
      />
    </BlogLayout>
  );
}
