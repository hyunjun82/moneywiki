"use client";
import { useState } from "react";
import {
  BlogLayout,
  C,
  Btn,
  TOC,
  Summary3,
  Sec,
  P,
  B,
  A,
  Info,
  InlineLink,
  SpokeLink,
  BridgeCard,
  ExtBtn,
  FAQAccordion,
  RelatedArticles,
  PrevNext,
  Divider,
  TableTitle,
  TableNote,
  TH,
  THL,
} from "@/components/wiki/BlogShared";

type Sel = { reason?: string; period?: string; docs?: string; code?: string };

export const META = {
  title: "자진퇴사 정당 이직 사유 12가지 | 실업급여 비자발적 인정 증빙서류",
  description:
    "자진퇴사해도 실업급여를 받을 수 있어요. 고용보험법 시행규칙 별표2에 따른 정당 이직 사유 12가지와 사유별 증빙서류 목록을 정리했어요.",
  keywords: [
    "자진퇴사 정당 이직 사유",
    "자진퇴사 비자발적 인정",
    "자진퇴사 이직확인서 코드",
    "자진퇴사 증빙서류",
  ],
  datePublished: "2026-03-05",
  lastUpdated: "2026-03-05",
  category: "실업급여",
  author: "머니위키 에디터",
  updateNote: "2026년 3월 기준",
  summary: [
    "자진퇴사여도 고용보험법 시행규칙 별표2의 12가지 사유에 해당하면 실업급여를 받을 수 있어요.",
    "임금체불·괴롭힘·통근 불가·질병·육아 등이 대표적인 정당 이직 사유예요.",
    "사유를 입증하는 증빙서류를 준비해서 고용센터에 진술서를 제출하면 심사를 받아요.",
  ],
  sources: [
    {
      name: "고용보험법 시행규칙 제101조 별표2",
      url: "https://www.law.go.kr/법령/고용보험법시행규칙",
      date: "2026-03",
    },
  ],
  faq: [
    {
      question: "임금이 한 달만 체불됐어도 정당사유로 인정되나요?",
      answer:
        "이직 전 1년간 2개월분 이상 체불이어야 정당사유로 인정돼요. 한 달치만 체불된 경우는 원칙적으로 해당되지 않아요. 다만 체불 금액이 전체 임금의 30% 이상이면 1개월이어도 인정될 수 있어요. 해당 여부가 애매하면 고용센터 상담을 받아보는 게 가장 확실해요.",
    },
    {
      question: "이직확인서에 개인 사정(코드 4번)으로 적혔는데, 실제로는 임금체불 때문에 나왔어요. 어떻게 하나요?",
      answer:
        "고용센터에서 실제 이직 사유로 이의 제기가 가능해요. 급여명세서, 통장 거래 내역, 미지급 임금에 관한 문자·이메일을 가져가서 진술서를 작성하면 돼요. 코드 4번이어도 실제 사유가 입증되면 코드 5번(정당한 자발적 이직) 심사를 받을 수 있어요.",
    },
  ],
  ctaCard: {
    label: "수급자격 확인",
    mainText: "피보험기간 조회하기",
    subText: "고용24에서 무료로 확인할 수 있어요",
    url: "https://www.work24.go.kr",
    external: true,
  },
};

export default function 자진퇴사실업급여정당사유() {
  const [sel, setSel] = useState<Sel>({});

  function getResult() {
    const { reason, period, docs } = sel;

    if (!reason) {
      return {
        type: "idle",
        headline: "퇴사 이유를 먼저 선택해 주세요",
        detail: "4가지 항목을 선택하면 정당사유 해당 여부를 바로 알려드려요.",
        badges: [] as string[],
      };
    }
    if (reason === "personal") {
      return {
        type: "fail",
        headline: "정당사유 인정이 어려울 수 있어요",
        detail:
          "더 좋은 직장이나 개인 사정으로 퇴사하면 원칙적으로 수급자격이 제한돼요. 혹시 임금체불·괴롭힘·근로조건 변경 등 사업장 문제가 함께 있었다면 고용센터 상담을 받아보세요.",
        badges: ["수급 어려움"],
      };
    }
    if (period === "less") {
      return {
        type: "fail",
        headline: "피보험기간이 부족해요",
        detail:
          "퇴사 전 18개월 안에 180일 이상 근무해야 실업급여를 받을 수 있어요. 이전 직장 피보험기간을 합산할 수 있으니 고용24에서 먼저 확인해 보세요.",
        badges: ["피보험기간 미달"],
      };
    }
    if ((reason === "workplace" || reason === "health") && period === "180plus" && docs === "yes") {
      return {
        type: "pass",
        headline: "정당사유 인정 가능성이 높아요",
        detail:
          "사업장 문제나 건강·가족 사유는 고용보험법 시행규칙 별표2의 정당 이직 사유에 해당돼요. 증빙 서류를 가지고 고용센터를 방문하면 심사를 받을 수 있어요.",
        badges: ["정당사유 인정 가능"],
      };
    }
    if ((reason === "workplace" || reason === "health") && period === "180plus" && docs === "no") {
      return {
        type: "warn",
        headline: "증빙 서류 보완이 필요해요",
        detail:
          "사유 자체는 인정될 수 있지만 증빙이 없으면 불인정될 가능성이 높아요. 급여명세서, 진단서, 문자 내역 등 관련 서류를 최대한 수집한 뒤 고용센터를 방문하면 돼요.",
        badges: ["증빙 보완 필요"],
      };
    }
    return {
      type: "idle",
      headline: "나머지 항목도 선택해 주세요",
      detail: "피보험기간과 증빙 서류 여부를 선택하면 더 정확히 알려드릴 수 있어요.",
      badges: [] as string[],
    };
  }

  function pick(g: string, v: string) {
    setSel((p) => ({ ...p, [g]: v }));
  }

  const res = getResult();
  const done = Object.keys(sel).length >= 1;

  const tocItems = [
    { t: "자진퇴사 정당 이직 사유 12가지는 무엇인가요?", sub: null },
    { t: "자진퇴사 정당사유 비자발적 인정받는 방법은 어떻게 되나요?", sub: null },
    { t: "자진퇴사 정당사유 이직확인서 코드는 어떻게 확인하나요?", sub: null },
    { t: "자진퇴사 정당 이직 증빙서류는 어떻게 준비하나요?", sub: null },
  ];

  const questions: { group: keyof Sel; label: string; opts: { value: string; label: string }[] }[] = [
    {
      group: "reason",
      label: "퇴사 이유가 무엇인가요?",
      opts: [
        { value: "workplace", label: "임금체불·근로조건 변경·괴롭힘·통근 곤란" },
        { value: "health", label: "질병·부상·가족 간병·임신·출산·육아" },
        { value: "personal", label: "더 좋은 직장, 개인 사정" },
      ],
    },
    {
      group: "period",
      label: "퇴사 전 18개월 내 180일 이상 근무했나요?",
      opts: [
        { value: "180plus", label: "네, 180일 이상이에요" },
        { value: "less", label: "아니요, 180일 미만이에요" },
      ],
    },
    {
      group: "docs",
      label: "사유를 입증할 서류가 있나요?",
      opts: [
        { value: "yes", label: "있어요 (급여명세서·진단서·문자 등)" },
        { value: "no", label: "아직 없어요" },
      ],
    },
    {
      group: "code",
      label: "이직확인서 이직 사유 코드를 확인했나요?",
      opts: [
        { value: "code5", label: "코드 5번 (정당한 자발적 이직)이에요" },
        { value: "code4", label: "코드 4번 (자발적 이직)으로 돼 있어요" },
        { value: "unknown", label: "아직 확인 못했어요" },
      ],
    },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "자진퇴사 정당사유"]}
      tags={["2026년 기준", "실업급여", "자진퇴사", "정당사유"]}
      date="2026-03-05"
      title="자진퇴사 정당 이직 사유 12가지 | 실업급여 비자발적 인정 증빙서류"
      description="자진퇴사해도 실업급여를 받을 수 있어요. 고용보험법 시행규칙 별표2에 따른 정당 이직 사유 12가지와 사유별 증빙서류 목록을 정리했어요."
      sourceBar={{ badge: "출처", name: "고용보험법 시행규칙 · 고용24", date: "2026.03 기준" }}
      stickyLabel="피보험기간 조회"
      stickyValue="고용24"
      stickyBtn="수급자격 확인하기 →"
      stickyHref="https://www.work24.go.kr"
    >
      <TOC items={tocItems} />
      <Summary3
        items={[
          "자진퇴사여도 고용보험법 시행규칙 별표2의 12가지 사유에 해당하면 실업급여를 받을 수 있어요.",
          "임금체불·괴롭힘·통근 불가·질병·육아 등이 대표적인 정당 이직 사유예요.",
          "사유를 입증하는 증빙서류를 준비해서 고용센터에 진술서를 제출하면 심사를 받아요.",
        ]}
      />

      {/* 체커 */}
      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden", marginBottom: 8 }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x2714;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>내 자진퇴사, 정당사유에 해당하나요?</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 2, marginBottom: 0 }}>4가지 항목으로 정당사유 해당 여부를 판정해요</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          {questions.map(({ group, label, opts }, qi) => (
            <div key={group} style={{ marginBottom: qi < questions.length - 1 ? 18 : 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
                <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, flexShrink: 0 }}>{qi + 1}</span>
                {label}
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {opts.map((o) => (
                  <Btn key={o.value} group={group} value={o.value} label={o.label} sel={sel} pick={pick} />
                ))}
              </div>
            </div>
          ))}
          {done && (
            <div
              style={{
                marginTop: 16,
                padding: 16,
                borderRadius: 8,
                background: res.type === "pass" ? C.navyLight : res.type === "warn" ? "#FFFBF0" : "#F5F5F5",
                border: `1px solid ${res.type === "pass" ? "rgba(30,58,95,.1)" : res.type === "warn" ? "#FDE68A" : C.line}`,
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 800, color: res.type === "pass" ? C.navy : C.t1, marginBottom: 4 }}>
                {res.type === "pass" ? "✅" : res.type === "warn" ? "⚠️" : "❌"} {res.headline}
              </div>
              <div style={{ fontSize: 13, color: C.t3, lineHeight: 1.55 }}>{res.detail}</div>
              {res.badges.length > 0 && (
                <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" }}>
                  {res.badges.map((b, i) => (
                    <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, background: res.type === "pass" ? C.navy : "#9CA3AF", color: "#fff" }}>{b}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Divider />
      <Sec n="SECTION 02" id="h2-1" title="자진퇴사 정당 이직 사유 12가지는 무엇인가요?" sub="고용보험법 시행규칙 별표2 기준">
        <P>
          <B>자발적으로 그만뒀어도 12가지 사유 중 하나에 해당하면 실업급여를 받을 수 있어요.</B>{" "}
          <A href="https://www.law.go.kr/법령/고용보험법시행규칙">고용보험법 시행규칙 제101조 별표2</A>에서
          수급자격이 인정되는 자발적 이직 사유를 구체적으로 정하고 있어요. 핵심은 퇴사가 근로자의
          자유 의지가 아닌 사업주 귀책 사유나 불가피한 사정 때문이라는 걸 입증하는 거예요.
        </P>
        <TableTitle>자진퇴사 정당 이직 사유 12가지</TableTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                <TH>번호</TH>
                <THL>사유</THL>
                <TH>인정 기준</TH>
              </tr>
            </thead>
            <tbody>
              {[
                ["01", "근로조건 저하", "채용 시 약속한 것보다 현저히 낮은 조건으로 근무하게 된 경우"],
                ["02", "임금 체불", "이직 전 1년간 2개월분 이상 (또는 임금의 30% 이상) 체불"],
                ["03", "최저임금 미달", "지속적으로 최저임금 미만의 임금을 받은 경우"],
                ["04", "장시간 근로 강요", "주 52시간 초과 근무가 2개월 이상 지속된 경우"],
                ["05", "임금 삭감", "20% 이상 일방적 임금 삭감이 이루어진 경우"],
                ["06", "사업장 이전·통근 불가", "왕복 3시간 이상 소요되는 사업장 이전"],
                ["07", "직장 내 성희롱·성폭력", "사업주가 피해자 요청에도 조치를 취하지 않은 경우"],
                ["08", "직장 내 괴롭힘", "사업주가 신고 후에도 적절한 조치를 취하지 않은 경우"],
                ["09", "본인 질병·부상", "30일 이상 치료 필요, 유급휴가 불가 또는 복직 거부"],
                ["10", "가족 간병", "부모·배우자 등 가족이 30일 이상 직접 간호가 필요한 경우"],
                ["11", "임신·출산", "임신·출산으로 계속 근무 곤란, 육아휴직 거부 포함"],
                ["12", "육아", "만 8세 이하 자녀 돌봄 필요, 보육시설 이용 불가"],
              ].map(([num, reason, standard], ri) => (
                <tr key={ri}>
                  <td style={{ padding: "8px", textAlign: "center", borderBottom: `1px solid ${C.line}`, color: C.t3, fontWeight: 600, fontSize: 12 }}>{num}</td>
                  <td style={{ padding: "8px", textAlign: "left", borderBottom: `1px solid ${C.line}`, color: C.t1, fontWeight: 600 }}>{reason}</td>
                  <td style={{ padding: "8px", textAlign: "left", borderBottom: `1px solid ${C.line}`, color: C.t2 }}>{standard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableNote>※ 고용보험법 시행규칙 제101조 별표2, 2026년 3월 기준</TableNote>
        <P>
          배우자나 부모의 타지 발령으로 동반 이주하게 된 경우도 추가로 인정돼요. 이 경우 배우자의
          발령 공문이나 주민등록 이전 서류가 증빙이 돼요. 12가지 항목 외에도 고용센터 담당자
          판단에 따라 예외가 인정되는 경우가 있어요.
        </P>
        <P>
          12가지 중 해당 사유가 있어도 증빙 없이는 인정받기 어려워요. 고용센터는 수급자의 진술과
          증빙 자료를 종합해서 판단해요. 퇴사 전에 관련 서류를 미리 확보해두는 게 중요한 이유예요.
          급여명세서, 근로계약서, 문자 내역, 진단서 등이 대표적인 증빙이에요.
        </P>
      </Sec>

      <Divider />
      <Sec n="SECTION 03" id="h2-2" title="자진퇴사 정당사유 비자발적 인정받는 방법은 어떻게 되나요?" sub="고용센터 방문·진술서 작성">
        <P>
          <B>퇴사 후 12개월 이내에 고용센터를 방문해서 수급자격을 신청해야 해요.</B> 방문 전에
          고용24(work24.go.kr)에서 워크넷 구직 등록을 먼저 해두면 절차가 훨씬 빨라져요. 정당사유
          심사는 고용센터 방문이 반드시 필요하고, 온라인으로만 처리되지는 않아요.
        </P>
        <BridgeCard
          q="피보험기간 180일, 내 경우는 어떻게 계산하나요?"
          a="퇴사 전 18개월 안에 피보험 단위기간 180일 이상이어야 해요. 이전 직장 기간도 합산돼요."
          href="/w/실업급여-기준기간"
          label="피보험기간 계산 방법 보기"
        />
        <P>
          진술서 작성이 핵심이에요. 고용센터에서 이직 경위를 물어볼 때 구체적으로 말해야
          인정 가능성이 높아져요. "괴롭힘을 당했어요"보다 "2025년 12월부터 2026년 2월까지
          팀장으로부터 매일 반말과 폭언을 들었어요"처럼 날짜, 행위자, 행위 내용을 구체적으로
          서술해야 해요. 막연한 진술은 인정받기 어려워요.
        </P>
        <Info type="warn">정당사유 불인정 시 결과를 받은 날로부터 90일 이내에 이의신청이 가능해요. 이의신청은 고용센터에 서면으로 제출하고, 고용보험심사관이 재심사해요.</Info>
        <InlineLink icon="📋" title="실업급여 수급자격 신청 절차 전체 보기" desc="워크넷 등록부터 고용센터 방문, 첫 지급까지" href="/w/실업급여-수급자격-인정" />
        <P>
          합의 퇴직 형태로 나온 경우에도 심사를 받을 수 있어요. 사업주의 제안으로 이루어진
          합의 퇴직은 실질적 권고사직으로 볼 수 있어요. 반면 근로자가 먼저 퇴직 의사를 밝히고
          합의한 경우는 자발적 퇴직으로 판단하는 게 원칙이에요. 상황을 고용센터에 설명하면
          담당자가 판단해 줘요.
        </P>
      </Sec>

      <Divider />
      <Sec n="SECTION 04" id="h2-3" title="자진퇴사 정당사유 이직확인서 코드는 어떻게 확인하나요?" sub="코드 4번·5번 차이·이의 제기">
        <P>
          <B>이직확인서의 이직 사유 코드가 수급자격 심사에 직접적인 영향을 줘요.</B> 사업주가
          작성하는 이직확인서에는 이직 사유 코드가 기재돼요. 코드 4번은 자발적 이직(개인 사정)으로
          원칙적으로 수급자격이 제한되고, 코드 5번은 정당한 자발적 이직으로 예외 심사 대상이에요.
          코드 1·2번(회사 사정)과 코드 3번(계약 만료)은 원칙적으로 수급자격이 인정돼요.
        </P>
        <P>
          이직확인서는 고용24에서 확인할 수 있어요. 고용24 로그인 → 마이페이지 → 이직확인서
          조회에서 사업주가 제출한 내용을 볼 수 있어요. 사업주가 이직확인서를 제출하지 않은 경우
          고용센터에 제출을 요청할 수 있고, 허위 기재 시 고용노동부에 신고할 수 있어요.
        </P>
        <Info type="warn">코드 4번으로 기재됐어도 실제 사유가 정당사유에 해당하면 이의 제기가 가능해요. 증빙 자료를 가지고 고용센터를 방문하면 실제 사유 심사를 받을 수 있어요. 이직확인서 코드가 최종 결론이 아니에요.</Info>
        <P>
          코드 4번 이의 제기 방법이에요. 수급자격 신청 과정에서 동시에 이의를 제기할 수 있어요.
          진술서와 증빙을 함께 제출하면 심사관이 실제 사유를 재검토해요. 사업주에게 직접
          이직확인서 수정을 요청할 수도 있지만, 사업주가 거부할 경우 고용센터 심사를 통해
          실질적 이직 사유를 인정받는 방법을 써요.
        </P>
      </Sec>

      <Divider />
      <Sec n="SECTION 05" id="h2-4" title="자진퇴사 정당 이직 증빙서류는 어떻게 준비하나요?" sub="사유별 필요 서류 목록">
        <P>
          <B>사유마다 필요한 서류가 달라요.</B> 기본 서류는 근로계약서와 급여명세서예요. 여기에
          각 사유에 맞는 추가 증빙을 더해야 해요. 퇴사 전에 미리 확보해두는 게 중요해요. 퇴사 후에는
          사업장 접근이 어려워져서 서류를 받기 힘들어질 수 있어요.
        </P>
        <TableTitle>자진퇴사 정당 이직 사유별 증빙서류</TableTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                <THL>정당사유</THL>
                <TH>필요 증빙서류</TH>
              </tr>
            </thead>
            <tbody>
              {[
                ["임금체불·임금 삭감", "급여명세서, 통장 거래 내역, 임금 관련 문자·이메일"],
                ["근로조건 저하·장시간 근로", "근로계약서 (전·후 비교), 출퇴근 기록, 연장근무 지시 문자"],
                ["직장 내 괴롭힘·성희롱", "녹취 파일, 문자·카카오톡 캡처, 신고 접수증, 목격자 진술서"],
                ["통근 불가 (왕복 3시간+)", "주소지 확인 서류, 지도·교통 시간 캡처, 사업장 이전 공문"],
                ["본인 질병·부상", "진단서, 의사 소견서, 입원 확인서"],
                ["가족 간병", "가족관계증명서, 가족의 진단서, 간병 필요 의사 소견서"],
                ["임신·출산·육아", "임신 확인서, 출생증명서, 가족관계증명서, 보육시설 미이용 확인서"],
              ].map(([reason, docs], ri) => (
                <tr key={ri}>
                  <td style={{ padding: "8px", textAlign: "left", borderBottom: `1px solid ${C.line}`, color: C.t1, fontWeight: 600, width: "35%" }}>{reason}</td>
                  <td style={{ padding: "8px", textAlign: "left", borderBottom: `1px solid ${C.line}`, color: C.t2 }}>{docs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableNote>※ 고용센터 제출 서류 기준, 담당자 판단에 따라 추가 요청될 수 있어요</TableNote>
        <P>
          서류가 없을 때도 방법이 있어요. 문자나 카카오톡 내역은 캡처본으로 제출하면 돼요.
          녹취는 본인이 직접 대화한 내용을 녹음한 것도 증빙으로 인정돼요. 임금체불은
          고용노동부 체불 신고 접수증만 있어도 심사에 도움이 돼요. 증거가 없다면 진술서를
          최대한 구체적으로 작성하는 게 차선책이에요.
        </P>
        <P>
          증빙이 아예 없는 경우 진술서만으로도 심사를 받을 수 있어요. 날짜, 장소, 행위자,
          행위 내용을 구체적으로 기재할수록 인정 가능성이 높아져요. 동료 목격자가 있다면
          목격자 진술서를 추가로 제출하는 게 도움이 돼요. 불인정 시에도 90일 이내
          이의신청으로 재심사를 받을 수 있어요.
        </P>
        <SpokeLink num="01" title="실업급여 구비서류 전체 목록" desc="이직확인서·통장·사진 등 공통 준비 서류" href="/w/실업급여-구비서류" />
        <SpokeLink num="02" title="실업급여 수급자격 신청 절차" desc="고용센터 방문부터 첫 지급까지 단계별 안내" href="/w/실업급여-수급자격-인정" />
        <SpokeLink num="03" title="실업급여 이의신청 방법" desc="불인정 후 심사청구·재심사 90일 기한" href="/w/실업급여-이의신청-심사청구-재심사-불복-절차" />
      </Sec>

      <ExtBtn
        href="https://www.law.go.kr/법령/고용보험법시행규칙"
        badge="법제처 공식"
        text="고용보험법 시행규칙 제101조 별표2 — 정당한 이직 사유 전문"
        cta="바로가기"
      />

      <PrevNext
        prev={{ title: "실업급여 수급자격 제한 사유", href: "/w/실업급여-수급자격제한" }}
        next={{ title: "실업급여 구비서류 목록", href: "/w/실업급여-구비서류" }}
      />
      <FAQAccordion items={META.faq} />
      <RelatedArticles
        items={[
          { title: "실업급여 수급자격 신청 절차", href: "/w/실업급여-수급자격-인정", desc: "고용센터 방문부터 첫 지급까지" },
          { title: "실업급여 구비서류 목록", href: "/w/실업급여-구비서류", desc: "이직확인서·통장·사진 등 준비 서류" },
          { title: "실업급여 이의신청 방법", href: "/w/실업급여-이의신청-심사청구-재심사-불복-절차", desc: "불인정 후 심사청구 90일 기한" },
        ]}
      />
    </BlogLayout>
  );
}
