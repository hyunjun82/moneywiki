"use client";
import React, { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
  ChipsGrid,
} from "@/components/wiki/BlogShared";

/* ───── meta ───── */
export const meta = {
  title: "실업급여 직장내 괴롭힘 퇴직 정당사유 | 증빙서류 신고 절차",
  description:
    "직장내 괴롭힘으로 퇴사해도 실업급여를 받을 수 있어요. 정당사유 인정 기준과 증빙서류 신고 절차를 정리했어요.",
  category: "실업급여",
  keywords: ["직장내 괴롭힘", "퇴직 정당사유", "증빙서류", "신고 절차"],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-25",
  datePublished: "2026-02-25",
  summary: [
    "직장내 괴롭힘 퇴직은 고용보험법상 정당사유로 인정돼요",
    "증빙서류는 신고 접수 확인서·진단서·녹취록 등 3종 이상 준비",
    "2025년 하반기부터 5인 미만 사업장에도 괴롭힘 금지 적용",
  ],
  sources: [
    { name: "근로기준법 제76조의2", url: "https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1012828735", date: "2024-10" },
    { name: "고용보험법 시행규칙 별표2", url: "https://law.go.kr/flDownload.do?flSeq=59997997", date: "2024-01" },
    { name: "고용노동부 직장내 괴롭힘 매뉴얼", url: "https://www.moel.go.kr", date: "2023-04" },
  ],
  faq: [
    {
      q: "직장내 괴롭힘 증거가 부족해도 실업급여를 받을 수 있나요?",
      a: "증거가 부족하면 인정이 어려울 수 있어요. 하지만 고용노동부 진정 접수 확인서만 있어도 보완 자료로 인정되는 경우가 있어서, 일단 신고부터 하는 게 중요해요.",
    },
    {
      q: "직장내 괴롭힘 가해자가 사장(대표)이어도 신고가 가능한가요?",
      a: "네, 가능해요. 대표이사가 가해자인 경우 사내 조치를 기대하기 어려우니 고용노동부에 직접 진정을 넣는 게 효과적이에요.",
    },
  ],
  ctaCard: {
    label: "30초 판정",
    mainText: "정당사유 인정 조건",
    subText: "내 상황 해당 여부 확인",
    url: "#checker",
    external: false,
  },
  relatedDocs: [
    { title: "실업급여 수급 조건 정리", url: "/w/실업급여-수급-조건" },
  ],
};

/* ───── checker ───── */
type Ans = Record<string, string>;
function getResult(a: Ans) {
  if (!a.bullying || !a.evidence || !a.period || !a.resign) return null;

  const isBullying = a.bullying === "yes";
  const hasEvidence = a.evidence !== "none";
  const periodOk = a.period === "yes";
  const resignOk = a.resign === "self" || a.resign === "recommend";

  if (isBullying && hasEvidence && periodOk && resignOk) {
    return (
      <ResultPass title="정당사유 인정 가능성이 높아요" desc="직장내 괴롭힘 사실과 증빙서류가 갖춰져 있으면 고용센터에서 정당한 이직사유로 인정받을 수 있어요.">
        <ResultGrid items={[
          { icon: "📋", name: "괴롭힘 사실", pass: true, desc: "해당" },
          { icon: "📎", name: "증빙서류", pass: true, desc: "보유" },
          { icon: "⏱️", name: "피보험기간", pass: true, desc: "180일 이상" },
          { icon: "🚪", name: "퇴직 사유", pass: true, desc: "정당사유" },
        ]} />
        <ResultCTA icon="📝" title="실업급여 신청 방법" desc="고용24 온라인 신청 절차 안내" href="/w/실업급여-신청방법" />
        <ResultCTA icon="📂" title="구비서류 준비" desc="이직확인서·신분증·통장사본 등" href="/w/실업급여-구비서류" />
        <ResultCTA icon="🔢" title="예상 수령액 계산" desc="연봉별 실업급여 금액 확인" href="/w/실업급여-연봉별-계산" />
        <ResultCTA icon="📊" title="수급 조건 전체 확인" desc="피보험기간·퇴직사유 기준" href="/w/실업급여-수급-조건" />
      </ResultPass>
    );
  }

  const items = [
    { icon: "📋", name: "괴롭힘 사실", pass: isBullying, desc: isBullying ? "해당" : "미해당" },
    { icon: "📎", name: "증빙서류", pass: hasEvidence, desc: hasEvidence ? "보유" : "없음" },
    { icon: "⏱️", name: "피보험기간", pass: periodOk, desc: periodOk ? "180일 이상" : "180일 미만" },
    { icon: "🚪", name: "퇴직 사유", pass: resignOk, desc: resignOk ? "정당사유" : "확인 필요" },
  ];

  return (
    <ResultFail title="일부 조건이 부족해요" desc="아래 항목을 확인하고 부족한 부분을 보완하면 인정받을 수 있어요.">
      <ResultGrid items={items} />
      <div style={{ marginTop: 16 }}>
        <P><B>다른 방법도 있어요</B></P>
        <ResultCTA icon="📋" title="임금체불 퇴직 정당사유" desc="2개월 이상 체불 시 인정 기준" href="/w/실업급여-임금체불-퇴직-정당사유" />
        <ResultCTA icon="💰" title="임금삭감 퇴직 정당사유" desc="20% 이상 삭감 시 인정 기준" href="/w/실업급여-임금삭감-퇴직-정당사유" />
        <ResultCTA icon="🔍" title="이의신청 심사청구 절차" desc="불인정 시 90일 이내 이의제기" href="/w/실업급여-이의신청-심사청구-재심사-불복-절차" />
        <ResultCTA icon="📊" title="수급 조건 전체 확인" desc="피보험기간·퇴직사유 기준" href="/w/실업급여-수급-조건" />
      </div>
    </ResultFail>
  );
}

/* ───── component ───── */
export default function Article86() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "퇴직사유", "직장내 괴롭힘"]}
      tags={["2026년 기준", "실업급여", "직장내 괴롭힘"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={
        <>
          직장에서 괴롭힘을 당하고 퇴사했는데, 실업급여를 받을 수 있을지 고민이시죠. <A href="https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1012828735">근로기준법 제76조의2</A>에 해당하는 괴롭힘이면 <B>고용보험법상 정당한 이직사유</B>로 인정돼요. 인정 기준부터 증빙서류, 신고 절차까지 정리했어요.
        </>
      }
      sourceBar={{
        badge: "법령 근거",
        name: "고용보험법 시행규칙 별표2 · 근로기준법 제76조의2",
        date: "2024.10 개정",
      }}
      stickyLabel="괴롭힘 퇴직"
      stickyValue="정당사유"
      stickyBtn="내 해당 여부 ↑"
      disclaimer="이 글은 고용보험법 시행규칙과 근로기준법을 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 정확한 판정은 관할 고용센터에서 진행하세요."
      sidebar={
        <>
          <SidebarCTA
            items={[
              { icon: "💰", title: "내 숨은 환급금 찾기", sub: "평균 13만원 환급", href: "/w/환급금-찾기", hot: true },
              { icon: "🏛️", title: "2026 정부지원금", sub: "30개+ 지원금", href: "/w/정부지원금" },
              { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
            ]}
          />
          <SidebarDocs
            items={[
              { title: "실업급여 수급 조건 정리", cat: "실업급여·수급자격", href: "/w/실업급여-수급-조건" },
              { title: "실업급여 신청 방법 절차", cat: "실업급여·신청", href: "/w/실업급여-신청방법" },
              { title: "임금체불 퇴직 정당사유", cat: "실업급여·퇴직사유", href: "/w/실업급여-임금체불-퇴직-정당사유" },
            ]}
          />
          <SidebarCalc
            items={[
              { title: "실업급여 계산기", href: "/calculators/실업급여-계산기" },
              { title: "퇴직금 계산기", href: "/calculators/퇴직금-계산기" },
              { title: "연말정산 계산기", href: "/calculators/연말정산-계산기" },
              { title: "양도소득세 계산기", href: "/calculators/양도소득세-계산기" },
              { title: "대출이자 계산기", href: "/calculators/대출이자-계산기" },
            ]}
          />
        </>
      }
    >
      {/* ── TOC ── */}
      <TOC
        items={[
          { t: "내 상황이 정당사유에 해당하는지 간편 체크", sub: null },
          { t: "직장내 괴롭힘 기준이 뭐예요?", sub: "법적 정의 3요소 · 인정되는 행위 유형" },
          { t: "증빙서류는 뭐가 필요한가요?", sub: "핵심 증빙 3종 · 보완 자료 활용법" },
          { t: "신고 절차는 어떻게 되나요?", sub: "사내 신고 우선 · 고용노동부 진정 · 고용센터 신청" },
          { t: "5인 미만 사업장도 해당되나요?", sub: "기존 적용 제외 · 2025년 하반기 확대" },
          { t: "자주 묻는 질문", sub: null },
        ]}
      />

      {/* ── Summary3 ── */}
      <Summary3
        items={[
          "직장내 괴롭힘 퇴직은 고용보험법상 정당사유로 인정돼요",
          "증빙서류는 신고 접수 확인서·진단서·녹취록 등 3종 이상 준비",
          "2025년 하반기부터 5인 미만 사업장에도 괴롭힘 금지 적용",
        ]}
      />

      {/* ══════ STEP 01 — 체커 ══════ */}
      <Sec n="1" id="checker" title="내 상황이 정당사유에 해당하는지 간편 체크" sub="4가지만 선택하면 바로 알 수 있어요">
        <P>
          직장내 괴롭힘으로 퇴사했다고 해서 무조건 실업급여가 나오는 건 아니에요. 괴롭힘 사실 확인, 증빙서류 유무, 피보험기간, 퇴직 경위까지 종합적으로 판단해요. 아래 체커로 내 상황이 정당사유에 해당하는지 먼저 확인해보세요.
        </P>
        <P>
          체커 결과는 참고용이에요. 최종 판정은 관할 고용센터에서 이직확인서와 증빙서류를 검토한 뒤 결정돼요.
        </P>

        <CheckerShell title="직장내 괴롭힘 정당사유 판정" sub="30초 확인">
          <CheckerQ n="1" label="직장내 괴롭힘을 당한 적이 있나요?" group="bullying"
            opts={[["yes", "네, 당했어요"], ["no", "아니요"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n="2" label="증빙할 수 있는 자료가 있나요?" group="evidence"
            opts={[["report", "신고 접수 확인서"], ["medical", "진단서·녹취록"], ["witness", "동료 진술서"], ["none", "없어요"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n="3" label="고용보험 가입기간이 180일 이상인가요?" group="period"
            opts={[["yes", "180일 이상"], ["no", "180일 미만"]]}
            sel={ans} pick={pick}
          />
          <CheckerQ n="4" label="퇴직 경위가 어떻게 되나요?" group="resign"
            opts={[["self", "괴롭힘 사유 자진퇴사"], ["recommend", "권고사직"], ["fired", "징계해고"]]}
            sel={ans} pick={pick}
          />
          {result}
        </CheckerShell>
      </Sec>

      <Divider />

      {/* ══════ SECTION 02 — 괴롭힘 기준 ══════ */}
      <Sec n="2" id="standard" title="직장내 괴롭힘 기준이 뭐예요?" sub="근로기준법이 정한 3가지 요소를 모두 충족해야 해요">
        <P>
          <A href="https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1012828735">근로기준법 제76조의2</A>는 직장내 괴롭힘을 명확하게 정의하고 있어요. 단순히 기분이 나빴다거나 상사가 싫다는 정도로는 인정되지 않아요. 법에서 정한 <B>3가지 요소를 모두 충족</B>해야 괴롭힘으로 인정돼요.
        </P>

        <H3>법적 정의 3요소</H3>
        <P>
          첫째, <B>직장에서의 지위 또는 관계의 우위</B>를 이용한 행위여야 해요. 상사가 부하에게, 다수가 소수에게 행하는 것이 전형적이에요. 둘째, <B>업무상 적정범위를 넘어선</B> 행위여야 해요. 업무 지시나 피드백 자체는 괴롭힘이 아니지만, 인격을 모독하거나 반복적으로 무시하는 건 적정범위를 벗어나요. 셋째, <B>신체적·정신적 고통을 주거나 근무환경을 악화</B>시킨 결과가 있어야 해요.
        </P>

        <TableTitle>괴롭힘 판단 3요소 요약</TableTitle>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 400 }}>
          <thead>
            <tr>
              <THL>요소</THL>
              <TH>기준</TH>
              <TH>예시</TH>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>지위·관계 우위</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>직급·인원·연차 등</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>팀장 → 사원, 다수 → 소수</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>업무상 적정범위 초과</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>지시 넘어 인격 침해</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>반복 폭언, 업무 배제</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>고통·환경 악화</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>피해 결과 발생</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>불면증, 우울증, 퇴사 압박</td>
            </tr>
          </tbody>
        </table>
        <TableNote>근로기준법 제76조의2 기준 / 3요소 모두 충족 시 인정</TableNote>

        <H3>인정되는 행위 유형</H3>
        <P>
          고용노동부 매뉴얼에서는 괴롭힘 유형을 크게 6가지로 분류해요. 폭언·모욕, 부당한 업무 지시(허드렛일만 시키기, 업무에서 완전 배제), 따돌림·무시, 사생활 침해, 회식 강요·사적 심부름, 부당한 인사조치 등이 대표적이에요. 한두 번의 다툼이 아니라 <B>반복적·지속적</B>이어야 하고, 피해자가 실제로 고통을 호소한 기록이 있으면 인정받기 훨씬 수월해요.
        </P>

        <Info type="warn">{"<strong>주의:</strong> 단순 업무 갈등이나 일회성 언쟁만으로는 괴롭힘으로 인정되기 어려워요. 반복성·지속성이 핵심 판단 요소예요."}</Info>

        <InlineLink icon="📊" title="실업급여 수급 조건 전체 확인" desc="피보험기간·퇴직사유 기준 한눈에" href="/w/실업급여-수급-조건" />
      </Sec>

      <Divider />

      {/* ══════ SECTION 03 — 증빙서류 ══════ */}
      <Sec n="3" id="evidence" title="증빙서류는 뭐가 필요한가요?" sub="핵심 3종만 갖추면 인정 가능성이 높아져요">
        <P>
          직장내 괴롭힘으로 정당사유를 인정받으려면 <B>괴롭힘 사실을 입증할 수 있는 증빙서류</B>가 반드시 필요해요. 증빙이 부족하면 고용센터에서 자발적 퇴사로 처리할 수 있어서, 퇴사 전부터 미리 준비하는 게 중요해요.
        </P>

        <H3>핵심 증빙 3종</H3>
        <P>
          가장 강력한 증빙은 <B>고용노동부 진정 접수 확인서</B>예요. 고용노동부에 직장내 괴롭힘 진정을 넣으면 접수 확인서를 받을 수 있는데, 이것만으로도 고용센터에서 정당사유 심사 시 유력한 자료로 활용돼요.
        </P>
        <P>
          두 번째는 <B>병원 진단서</B>예요. 괴롭힘으로 인한 우울증, 불안장애, 적응장애 등 정신건강의학과 진단서가 있으면 피해 사실을 객관적으로 입증할 수 있어요. 세 번째는 <B>녹취록이나 문자·메신저 캡처</B>예요. 폭언이나 모욕적인 메시지를 날짜별로 정리해두면 반복성을 증명하기 좋아요.
        </P>

        <TableTitle>증빙서류 종류와 효력</TableTitle>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 400 }}>
          <thead>
            <tr>
              <THL>서류</THL>
              <TH>확보 방법</TH>
              <TH>증거 효력</TH>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>진정 접수 확인서</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>고용노동부 진정 신청</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>매우 높음</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>정신건강 진단서</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>정신건강의학과 진료</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>높음</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>녹취록·메시지 캡처</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>본인 직접 수집</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>높음 (날짜 필수)</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>동료 진술서</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>목격 동료 작성</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>보통 (2인 이상 권장)</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151", fontWeight: 700 }}>사내 신고 접수 내역</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>인사팀·고충처리위원회</td>
              <td style={{ padding: "10px 8px", fontSize: 13.5, color: "#374151" }}>보통</td>
            </tr>
          </tbody>
        </table>

        <H3>보완 자료 활용법</H3>
        <P>
          핵심 증빙 외에도 동료 진술서를 추가하면 훨씬 유리해요. 진술서는 <B>괴롭힘을 직접 목격한 동료가 날짜, 장소, 내용을 구체적으로 적어서 서명</B>한 문서예요. 2인 이상이 진술하면 신뢰도가 높아져요. 또한 사내 고충처리위원회나 인사팀에 신고한 기록이 있다면, 회사가 적절한 조치를 하지 않았다는 점을 추가로 입증할 수 있어요.
        </P>

        <Info type="tip">{"<strong>팁:</strong> 퇴사 전에 증빙을 확보하는 게 핵심이에요. 퇴사 후에는 사내 자료 접근이 어려워지니, 재직 중에 녹취·캡처·진단서를 미리 준비하세요."}</Info>

        <InlineLink icon="📂" title="실업급여 신청 구비서류" desc="이직확인서·신분증 등 준비물 안내" href="/w/실업급여-구비서류" />
      </Sec>

      {/* ── RelatedMid (SECTION 03-04 사이) ── */}
      <RelatedMid
        title="다른 퇴직사유 글도 비교해 보세요"
        items={[
          { icon: "💰", title: "임금체불 퇴직 정당사유", desc: "2개월 이상 체불 시 인정 기준", href: "/w/실업급여-임금체불-퇴직-정당사유" },
          { icon: "📉", title: "임금삭감 퇴직 정당사유", desc: "20% 이상 삭감 시 인정 기준", href: "/w/실업급여-임금삭감-퇴직-정당사유" },
          { icon: "📊", title: "수급자격 제한 사유", desc: "자발적 퇴사 예외 인정 11가지", href: "/w/실업급여-수급자격제한" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      {/* ══════ SECTION 04 — 신고 절차 ══════ */}
      <Sec n="4" id="process" title="신고 절차는 어떻게 되나요?" sub="사내 신고부터 고용센터 실업급여 신청까지 3단계">
        <P>
          직장내 괴롭힘 신고와 실업급여 신청은 별개의 절차예요. 괴롭힘 신고는 고용노동부에, 실업급여 신청은 고용센터(고용24)에 해요. 두 절차를 동시에 진행할 수 있고, 순서도 상관없어요. 다만 <B>신고를 먼저 하면 증빙서류 확보에 유리</B>해서 순서대로 진행하는 게 좋아요.
        </P>

        <H3>사내 신고 우선</H3>
        <P>
          <A href="https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1012828735">근로기준법 제76조의3</A>에 따르면 사용자는 괴롭힘 신고를 접수하면 지체 없이 조사해야 해요. 사내에 고충처리위원회나 인사팀이 있다면 먼저 신고하세요. 회사가 조사 후 적절한 조치를 취하지 않았다면, 이 사실 자체가 고용센터 심사에서 유리한 증빙이 돼요. 반대로 회사가 가해자를 징계하고 근무환경이 개선됐는데도 퇴사한 경우에는 정당사유 인정이 어려울 수 있어요.
        </P>

        <H3>고용노동부 진정</H3>
        <P>
          사내 조치가 미흡하거나, 가해자가 대표이사여서 사내 신고가 어려운 경우에는 고용노동부에 직접 진정을 넣어요. 고용노동부 홈페이지(www.moel.go.kr)에서 온라인으로 접수할 수 있고, 관할 지방고용노동관서에 직접 방문해도 돼요. 진정이 접수되면 <B>접수 확인서</B>를 받을 수 있는데, 이 문서가 실업급여 신청 시 핵심 증빙이 돼요.
        </P>

        <H3>고용센터 신청</H3>
        <P>
          증빙서류를 확보한 뒤 퇴사하면, 이직확인서가 처리된 후 고용24(www.work24.go.kr)에서 실업급여를 신청해요. 이직사유서에 직장내 괴롭힘을 구체적으로 기재하고, 확보한 증빙서류를 함께 제출하면 돼요. 고용센터 담당자가 이직확인서의 퇴직사유와 증빙서류를 대조해서 정당사유 여부를 판단해요.
        </P>

        <BridgeCard
          q="괴롭힘은 확실한데, 실업급여 신청 절차가 막막하다면?"
          a="고용24에서 온라인으로 5단계만 따라가면 돼요. 워크넷 구직등록부터 시작하세요."
          label="실업급여 신청 방법 보기"
          href="/w/실업급여-신청방법"
        />
      </Sec>

      <Divider />

      {/* ══════ SECTION 05 — 5인 미만 ══════ */}
      <Sec n="5" id="under5" title="5인 미만 사업장도 해당되나요?" sub="2025년 하반기부터 단계적으로 적용이 확대돼요">
        <P>
          원래 근로기준법의 직장내 괴롭힘 조항(제76조의2)은 <B>상시 5인 이상 사업장</B>에만 적용됐어요. 5인 미만 소규모 사업장에서는 법적으로 괴롭힘 금지 의무가 없었기 때문에, 피해를 입어도 법적 보호를 받기 어려웠어요.
        </P>

        <H3>기존 적용 제외</H3>
        <P>
          근로기준법 제11조와 시행령 별표1에 따르면, 상시 4명 이하 사업장에는 제76조의2(괴롭힘 금지)와 제76조의3(조치 의무)이 적용되지 않았어요. 그래서 5인 미만 사업장 직원이 괴롭힘을 당해 퇴사해도 <B>정당사유로 인정받기가 훨씬 까다로웠</B>어요. 고용보험법 시행규칙 별표2의 정당한 이직사유에서도 근로기준법 적용 사업장을 전제로 하기 때문이에요.
        </P>

        <H3>2025년 하반기 확대</H3>
        <P>
          그런데 상황이 바뀌고 있어요. 정부는 <B>2025년 하반기부터 5인 미만 사업장에도 직장내 괴롭힘 금지 조항을 적용</B>하기로 했어요. 모성보호 규정과 함께 상대적으로 사업주 부담이 적은 조항부터 단계적으로 확대하는 방식이에요.
        </P>
        <P>
          이 개정이 시행되면 5인 미만 사업장 직원도 괴롭힘을 당했을 때 법적 보호를 받을 수 있고, 퇴직 시 정당사유 인정도 한결 수월해질 전망이에요. 다만 현재(2026년 2월 기준) 정확한 시행일이 확정되지 않은 부분이 있으니, 고용노동부 공지를 확인하는 게 좋아요.
        </P>

        <Info type="warn">{"<strong>현재 5인 미만 사업장이라면:</strong> 괴롭힘 금지 조항이 아직 완전 시행 전이라도, 고용노동부 진정은 접수 가능해요. 진정 접수 확인서를 받아두면 실업급여 심사에 도움이 돼요."}</Info>

        <BridgeCard
          q="실업급여 불인정 통보를 받았다면?"
          a="90일 안에 이의신청(심사청구)을 할 수 있어요. 비용은 무료예요."
          label="이의신청 절차 보기"
          href="/w/실업급여-이의신청-심사청구-재심사-불복-절차"
        />

        <ExtBtn
          badge="고용노동부 공식"
          text="직장내 괴롭힘 온라인 신고"
          cta="신고하기 →"
          href="https://www.moel.go.kr/minwon/fastCounsel/fastCslWrite.do"
        />
      </Sec>

      <Divider />

      {/* ══════ FAQ ══════ */}
      <Sec n="6" id="faq" title="자주 묻는 질문" sub="">
        <FAQAccordion items={meta.faq} />
      </Sec>

      {/* ── 하단 네비 ── */}
      <RelatedArticles
        items={[
          { title: "실업급여 수급 조건 정리", desc: "실업급여·수급자격", href: "/w/실업급여-수급-조건" },
          { title: "실업급여 신청 방법 절차 준비서류", desc: "실업급여·신청", href: "/w/실업급여-신청방법" },
          { title: "임금체불 퇴직 정당사유", desc: "실업급여·퇴직사유", href: "/w/실업급여-임금체불-퇴직-정당사유" },
          { title: "피보험기간 180일 계산 합산", desc: "실업급여·피보험기간", href: "/w/실업급여-피보험기간-180일-계산" },
          { title: "이의신청 심사청구 재심사 절차", desc: "실업급여·불복절차", href: "/w/실업급여-이의신청-심사청구-재심사-불복-절차" },
        ]}
      />
      <PrevNext
        prev={{ title: "육아 퇴직 수급기간 연장", href: "/w/실업급여-육아-퇴직-수급기간-연장" }}
        next={{ title: "공무원 교사 실업급여 차이", href: "/w/공무원-교사-실업급여-퇴직급여-차이-비교" }}
      />
    </BlogLayout>
  );
}
