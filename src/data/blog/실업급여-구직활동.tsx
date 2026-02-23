"use client";

import { useState } from "react";
import {
  C, Btn, Tag, Info, Divider, Sec, P, B, A, H3,
  TableTitle, TableNote, TH, THL,
  BridgeCard, ExtBtn, BlogLayout, TOC, Summary3,
  FAQAccordion, RelatedArticles, PrevNext,
} from "@/components/wiki/BlogShared";

// ── 체커 로직 ──
type Res = { pass: boolean; headline: string; detail: string; badges: string[] };

function getResult(sel: Record<string, string>): Res | null {
  const { round, activity } = sel;
  if (!round) return null;

  if (round === "1st") {
    if (activity === "online-edu") return { pass: true, headline: "1차 실업인정 가능해요", detail: "수급자격자 온라인 교육을 이수하면 1차 실업인정이 자동 처리돼요. 별도 구직활동은 불필요해요.", badges: ["온라인 교육 이수", "자동 처리"] };
    return { pass: true, headline: "1차는 온라인 교육만으로 충분해요", detail: "1차 실업인정은 수급자격자 온라인 교육 수강만으로 인정돼요. 입사지원이나 면접은 2차부터 활용하는 게 효율적이에요.", badges: ["온라인 교육 권장"] };
  }

  if (round === "2-4") {
    if (activity === "online-edu") return { pass: false, headline: "온라인 교육은 1차 전용이에요", detail: "수급자격자 온라인 교육은 1차 실업인정에만 사용할 수 있어요. 2차부터는 입사지원, 면접 등 재취업 활동이 필요해요.", badges: ["1차 전용"] };
    return { pass: true, headline: "실업인정 가능해요", detail: "2~4차는 재취업 활동 1회 이상이면 인정돼요. 구직활동과 구직 외 활동(직업훈련·취업특강) 모두 가능해요.", badges: ["재취업 활동 1회"] };
  }

  if (round === "5plus") {
    if (activity === "online-edu") return { pass: false, headline: "온라인 교육은 1차 전용이에요", detail: "5차 이후에는 재취업 활동 2회 이상이 필요하고, 그중 구직활동 1회는 필수예요. 온라인 교육은 해당하지 않아요.", badges: ["1차 전용"] };
    if (activity === "training") return { pass: true, headline: "재취업 활동 1회로 인정 — 추가 활동 필요", detail: "직업훈련·취업특강은 구직 외 활동이라 재취업 활동 1회로 인정돼요. 나머지 1회는 입사지원·면접 등 구직활동이 필요해요.", badges: ["구직 외 활동", "구직활동 추가 필요"] };
    return { pass: true, headline: "구직활동 1회로 인정돼요", detail: "5차 이후 필수인 구직활동 1회에 해당해요. 나머지 1회는 다른 날 추가 활동이 필요해요. 1일 1회만 인정되니 이틀에 나눠서 활동하세요.", badges: ["구직활동 인정", "추가 1회 필요"] };
  }

  return null;
}

export default function Article() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "구직활동 인정"]}
      tags={["2026년 기준", "실업급여", "구직활동"]}
      date="2026-02-21"
      title="실업급여 구직활동 인정 증빙 방법 | 워크넷 입사지원 온라인 교육"
      description={
        <>
          실업인정일에 활동 실적을 제출하지 않으면 그 회차 급여가 <strong style={{ color: C.t1 }}>통째로 보류</strong>돼요. 워크넷 자동 연동부터 증빙 방법까지 정리했어요.
        </>
      }
      sourceBar={{ badge: "출처", name: "고용보험법 제44조 · 고용24", date: "2026.02 기준" }}
      stickyLabel="실업인정 신청"
      stickyValue="고용24"
      stickyBtn="온라인 신청 바로가기 →"
      stickyHref="https://www.work24.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do"
    >
      {/* 목차 */}
      <TOC items={[
        { t: "내 구직활동, 실업인정 받을 수 있을까?", sub: "차수 × 활동유형 간편 체크" },
        { t: "구직활동 인정 기준은 어떻게 되나요?", sub: null },
        { t: "구직활동 증빙은 어떻게 하나요?", sub: "활동 유형별 증빙 방법 테이블" },
        { t: "워크넷 입사지원으로 인정받는 방법", sub: null },
        { t: "온라인 교육은 어디서 받나요?", sub: "차수별 인정 기준 테이블" },
        { t: "자주 묻는 질문", sub: null },
      ]} />

      {/* 3줄 요약 */}
      <Summary3 items={[
        "1차: 수급자격자 온라인 교육 1회 수강 (<strong>고용센터 출석 불필요</strong>)",
        "2~4차: 재취업 활동 1회 이상 (입사지원·면접·직업훈련 모두 가능)",
        "5차 이후: 재취업 활동 <strong>2회 이상</strong>, 그중 구직활동(입사지원·면접) 1회 필수",
      ]} />

      {/* ── STEP 01. 체커 ── */}
      <Divider />
      <Sec n="STEP 01" title="내 구직활동, 실업인정 받을 수 있을까?" sub="차수와 활동 유형을 선택하면 바로 알 수 있어요" />

      <P>실업급여를 받으려면 실업인정일마다 구직활동 실적을 제출해야 해요. 차수마다 필요한 횟수가 다르고, 활동 종류에 따라 인정 여부도 달라져요. 한 번 놓치면 다음 인정일까지 기다려야 하니까 미리 확인하는 게 좋아요.</P>

      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x2714;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>구직활동 인정 여부 체크</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>30초면 확인할 수 있어요</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          {/* 그룹 1: 차수 */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              지금 몇 차 실업인정인가요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="round" value="1st" label="1차 (첫 번째)" sel={sel} pick={pick} />
              <Btn group="round" value="2-4" label="2~4차" sel={sel} pick={pick} />
              <Btn group="round" value="5plus" label="5차 이후" sel={sel} pick={pick} />
            </div>
          </div>
          {/* 그룹 2: 활동유형 */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
              어떤 활동을 했나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="activity" value="job-search" label="입사지원·면접" sel={sel} pick={pick} />
              <Btn group="activity" value="training" label="직업훈련·취업특강" sel={sel} pick={pick} />
              <Btn group="activity" value="online-edu" label="온라인 교육" sel={sel} pick={pick} />
            </div>
          </div>

          {/* 결과 */}
          {result && (
            <div style={{ marginTop: 16, padding: 16, borderRadius: 8, background: result.pass ? C.navyLight : "#F5F5F5", border: result.pass ? "1px solid rgba(30,58,95,.1)" : `1px solid ${C.line}` }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: result.pass ? C.navy : C.t1, marginBottom: 4 }}>
                {result.pass ? "\u2705" : "\u26D4"} {result.headline}
              </div>
              <div style={{ fontSize: 13, color: C.t3, lineHeight: 1.55 }}>{result.detail}</div>
              <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" }}>
                {result.badges.map((b, i) => (
                  <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, background: result.pass ? C.navy : C.t4, color: "#fff" }}>{b}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 02. 인정 기준 ── */}
      <Divider />
      <Sec n="SECTION 02" title="실업급여 구직활동 인정 기준은 어떻게 되나요?" sub="실업인정일 = 구직활동 실적 제출일" />

      <P><A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제44조</A>에서는 실업급여를 받으려면 적극적으로 일자리를 찾고 있다는 걸 증명해야 한다고 정해요. 정해진 실업인정일에 구직활동 실적을 제출해야 급여가 지급되는 방식이에요.</P>

      <P>구직활동으로 인정되는 활동은 크게 두 가지로 나뉘어요. 첫 번째는 <B>구직활동</B>이에요. 워크넷·사람인·잡코리아 같은 채용사이트에서의 입사지원, 면접 참여, 구인업체 방문 상담이 여기에 해당해요. 두 번째는 <B>구직 외 활동</B>으로, 직업훈련 참여, 고용센터 취업특강 수강, 직업심리검사 등이 포함돼요.</P>

      <P>활동별 인정 횟수에는 한도가 있어요. 취업특강은 온·오프라인 합산 <B>최대 3회</B>까지만, 직업심리검사와 심리안정프로그램은 각 <B>1회</B>까지만 실업인정 실적으로 인정돼요. 그리고 중요한 규칙이 하나 있어요. <B>1일 1회만 인정</B>되기 때문에 같은 날 여러 활동을 해도 1회로만 계산해요. 2회가 필요한 차수는 반드시 이틀에 걸쳐 활동해야 해요.</P>

      <Info type="warn">{'<strong>1일 1회 규칙:</strong> 같은 날 입사지원 2건을 해도 1회로만 인정돼요. 5차 이후(2회 필요)에는 <strong>반드시 이틀에 나눠서</strong> 활동해야 해요.'}</Info>

      {/* ── SECTION 03. 증빙 방법 ── */}
      <Divider />
      <Sec n="SECTION 03" title="실업급여 구직활동 증빙은 어떻게 하나요?" sub="온라인 활동과 오프라인 활동의 증빙 방식이 달라요" />

      <P>구직활동이 실적으로 인정받으려면 활동에 맞는 증빙 방법을 알아야 해요. 놓치기 쉬운 부분인데, 온라인 채용사이트 지원은 고용24와 연동 여부가 핵심이에요. 연동되는 사이트라면 별도 서류 없이 자동으로 처리돼요.</P>

      <P>연동이 안 되는 사이트에서 지원했다면 지원 완료 화면을 캡처해서 제출하면 돼요. 오프라인 활동은 확인서가 필요해요. 면접을 봤다면 면접확인서, 직업훈련에 참여했다면 출석확인서를 받아서 첨부해야 해요.</P>

      <TableTitle>활동 유형별 증빙 방법</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 420 }}>
          <thead>
            <tr><THL>활동 유형</THL><TH>증빙 방법</TH><TH>비고</TH></tr>
          </thead>
          <tbody>
            {[
              ["워크넷 입사지원", "자동 연동 (증빙 불필요)", "가장 간편"],
              ["연동 민간사이트", "자동 연동", "사람인·잡코리아 등"],
              ["비연동 사이트", "지원 완료 화면 캡처", "회사명·날짜 포함"],
              ["면접 참여", "면접확인서", "업체에서 발급"],
              ["직업훈련", "출석확인서", "훈련기관에서 발급"],
              ["취업특강", "수강확인서", "최대 3회 한도"],
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
      <TableNote>※ 워크넷 지원이 가장 간편 — 지원 즉시 고용24에 자동 반영</TableNote>

      <P>실업인정 신청은 <A href="https://www.work24.go.kr">고용24</A> 앱이나 웹사이트에서 &quot;실업인정 신청&quot;을 선택하고 구직활동 내역을 입력하면 돼요. 워크넷 지원 내역은 자동으로 불러오고, 그 외 활동은 직접 입력 후 증빙자료를 첨부하면 완료예요.</P>

      <BridgeCard
        question="구직활동 허위로 신고하면 어떻게 되나요?"
        body={<>실적을 허위로 제출하면 부정수급으로 분류돼요. 받은 급여를 전액 반환하는 것은 물론, <strong style={{ color: C.navy }}>최대 5배 추가 징수</strong>와 형사처벌까지 이어질 수 있어요.</>}
        btnText="부정수급 처벌 기준과 면제 조건 보기 →"
        href="/w/실업급여-부정수급"
      />

      {/* ── SECTION 04. 워크넷 ── */}
      <Divider />
      <Sec n="SECTION 04" title="워크넷 입사지원으로 실업급여 구직활동 인정받을 수 있나요?" sub="자동 연동이라 증빙이 가장 편해요" />

      <P>워크넷 입사지원은 실업급여 구직활동 증빙 방법 중 가장 편리한 방식이에요. <A href="https://www.work.go.kr">워크넷</A>에서 채용공고에 지원하면 고용24에 자동으로 연동되기 때문에 별도 서류 준비 없이 실업인정 신청 화면에서 확인만 하면 돼요.</P>

      <P>실제로 보면, 지원 시 직종이나 지역 범위를 너무 좁게 설정하지 않는 게 좋아요. 희망 직종이 아니어도 지원 가능하고, 다양한 공고에 지원해도 구직활동으로 인정돼요. 다만 취업 의사 없이 반복 지원하다가 부정수급으로 적발되면 불이익이 생길 수 있으니 성실하게 활동하는 게 원칙이에요.</P>

      <P>사람인·잡코리아 같은 민간 채용사이트도 고용24와 연동되는 경우가 많아요. 연동 가능한 사이트 목록은 <A href="https://www.work24.go.kr">고용24</A>에서 확인할 수 있어요. 연동이 안 되는 사이트에서 지원했다면 입사지원 완료 화면을 캡처해서 첨부하면 실적으로 인정받을 수 있어요. 회사명, 직종, 지원 날짜가 확인 가능한 화면이어야 해요.</P>

      {/* ── SECTION 05. 온라인 교육 ── */}
      <Divider />
      <Sec n="SECTION 05" title="실업급여 구직활동 온라인 교육은 어디서 받나요?" sub="1차 실업인정은 교육 수강만으로 끝나요" />

      <P>실업급여 수급 첫 번째 실업인정은 구직활동 대신 수급자격자 교육 수강으로 대체돼요. 수급자격 인정 신청을 마치면 고용24에서 &quot;수급자격자 교육&quot;을 수강하라는 안내가 나오는데, 이 과정을 이수해야 1차 실업인정이 처리돼요. 이수를 안 하면 <B>1차 급여가 지급되지 않으니</B> 반드시 수강해야 해요.</P>

      <P>수강 시간은 약 1시간이에요. 고용24 앱이나 웹사이트에서 PC·스마트폰 모두 들을 수 있어요. 이수 완료 후에는 자동으로 1차 실업인정 실적이 처리되니까 따로 신청할 필요가 없어요.</P>

      <TableTitle>차수별 구직활동 인정 기준</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>차수</THL><TH>인정 기준</TH><TH>구직활동 필수 여부</TH></tr>
          </thead>
          <tbody>
            {[
              ["1차", "수급자격자 교육 수강", "불필요"],
              ["2~4차", "재취업 활동 1회 이상", "불필요 (구직 외 활동 가능)"],
              ["5차 이후", "재취업 활동 2회 이상", "구직활동 1회 필수 포함"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 8px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 || ri === 2 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>※ 1일 1회만 인정 — 2회 필요 시 반드시 이틀에 걸쳐 활동</TableNote>

      <H3>나한테 맞는 방법은?</H3>

      <div style={{ background: C.navyLight2, border: `1px solid ${C.line}`, borderRadius: 8, margin: "12px 0", overflow: "hidden" }}>
        {[
          { t: "1차 실업인정이라면", d: "수급자격자 교육만 들으면 끝나요" },
          { t: "2~4차라면", d: "워크넷 입사지원 1회가 가장 간편해요" },
          { t: "5차 이후라면", d: "입사지원 + 면접(또는 훈련)을 이틀에 나눠서 하세요" },
        ].map((item, i) => (
          <div key={i} style={{ padding: "12px 16px", borderBottom: i < 2 ? `1px solid ${C.line}` : "none", display: "flex", gap: 12 }}>
            <div style={{ width: 22, height: 22, background: C.navy, color: "#fff", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: C.t1, marginBottom: 1 }}>{item.t}</h4>
              <p style={{ fontSize: 12, color: C.t3, lineHeight: 1.45, margin: 0 }}>{item.d}</p>
            </div>
          </div>
        ))}
      </div>

      <BridgeCard
        question="실업인정 후 급여가 언제 들어오는지 궁금하시죠?"
        body={<>실업인정 신청 후 보통 <strong style={{ color: C.navy }}>2~5일 이내</strong>에 입금돼요. 지급일 계산법과 첫 입금까지 걸리는 기간을 정리했어요.</>}
        btnText="실업급여 지급일 기준 보기 →"
        href="/w/실업급여-지급일"
      />

      <ExtBtn
        badge="고용24 공식"
        text="실업인정 온라인 신청"
        cta="신청하기 →"
        href="https://www.work24.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do"
      />

      {/* ── FAQ ── */}
      <Divider />
      <Sec n="FAQ" title="자주 묻는 질문" />
      <FAQAccordion items={[
        { q: "실업급여 구직활동 인정 횟수가 차수마다 다른가요?", a: '<strong>네, 달라요.</strong> 1차는 온라인 교육, 2~4차는 재취업 활동 1회, 5차 이후는 2회(구직활동 1회 필수)예요. 1일 1회만 인정되니까 2회가 필요한 차수는 이틀에 걸쳐 활동해야 해요.' },
        { q: "사람인이나 잡코리아 입사지원도 실업급여 구직활동으로 인정되나요?", a: '고용24와 연동되는 민간 채용사이트는 <strong>자동으로 인정</strong>돼요. 연동이 안 되는 사이트라면 지원 완료 화면을 캡처해서 첨부하면 돼요.' },
      ]} />

      {/* 관련 글 */}
      <RelatedArticles items={[
        { title: "실업급여 신청방법 — 고용센터 방문부터 온라인까지", desc: "실업급여 · 신청", href: "/w/실업급여-신청방법" },
        { title: "실업급여 부정수급 — 형사처벌 기준과 자진신고 감경", desc: "실업급여 · 부정수급", href: "/w/실업급여-부정수급" },
        { title: "실업급여 지급일 — 실업인정 후 입금까지 기간", desc: "실업급여 · 지급일", href: "/w/실업급여-지급일" },
        { title: "실업급여 기준기간 — 이직일 18개월 피보험 180일", desc: "실업급여 · 기준기간", href: "/w/실업급여-기준기간" },
      ]} />

      <PrevNext
        prev={{ title: "실업급여 수급자격 인정", href: "/w/실업급여-수급자격-인정" }}
        next={{ title: "실업급여 기준기간 18개월", href: "/w/실업급여-기준기간" }}
      />
    </BlogLayout>
  );
}
