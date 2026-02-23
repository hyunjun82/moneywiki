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

type Sel = { quit?: string; reason?: string };
type ResLink = { icon: "link" | "search"; title: string; desc: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; links: ResLink[] };

const META = {
  title: "실업급여 수급자격 제한 사유 | 중대과실 해고 자진퇴사 기준",
  description:
    "자발적으로 그만뒀는데 실업급여를 받을 수 있을지 고민이시죠? 수급자격제한 사유와 예외 인정 조건 11가지를 정리했어요.",
  keywords: ["실업급여 수급자격제한", "수급자격 사유", "자발적 퇴사", "예외 인정"],
  ogTitle: "실업급여 수급자격 제한 사유 | 머니위키",
  ogDescription: "중대과실 해고, 자진퇴사 기준, 예외 인정 11가지 사유를 한눈에 확인해 보세요.",
  datePublished: "2026-02-23",
  lastUpdated: "2026-02-23",
  category: "실업급여",
  faq: [
    {
      question: "실업급여 수급자격제한을 받으면 얼마나 못 받나요?",
      answer:
        "수급자격이 제한되면 해당 이직 건으로는 실업급여를 받을 수 없어요. 재취업 후 피보험기간 180일을 다시 채워야 수급이 가능해요. 예외 사유가 인정되면 제한 없이 수급할 수 있어요.",
    },
    {
      question: "실업급여 수급자격제한 이직 사유를 사업주가 허위 신고하면 어떻게 되나요?",
      answer:
        "사업주가 이직확인서를 허위로 작성하면 고용보험법 위반이에요. 문자·이메일·급여명세서 등 실제 사유를 입증할 자료를 확보해두면 고용센터에서 이의 제기가 가능해요.",
    },
  ],
};

export default function Article69() {
  const [sel, setSel] = useState<Sel>({});

  function getResult(): Res {
    const { quit, reason } = sel;

    if (quit === "involuntary" && reason === "normal")
      return {
        pass: true,
        headline: "수급자격이 인정될 가능성이 높아요",
        detail:
          "비자발적 이직은 원칙적으로 수급자격이 인정돼요. 이직확인서 이직 사유가 실제와 일치하는지, 피보험기간 180일 이상인지만 확인하면 돼요.",
        badges: ["수급 가능"],
        links: [
          {
            icon: "link",
            title: "수급자격 신청 절차",
            desc: "고용센터 방문 전 준비할 것들",
            href: "/w/실업급여-수급자격-인정",
          },
        ],
      };

    if (quit === "involuntary" && reason === "justified")
      return {
        pass: true,
        headline: "수급자격이 인정될 가능성이 높아요",
        detail:
          "비자발적 이직은 이직 사유와 관계없이 수급자격이 인정돼요. 피보험기간 180일 이상 조건도 함께 확인하면 돼요.",
        badges: ["수급 가능"],
        links: [
          {
            icon: "link",
            title: "수급자격 신청 절차",
            desc: "고용센터 방문 전 준비할 것들",
            href: "/w/실업급여-수급자격-인정",
          },
        ],
      };

    if (quit === "voluntary" && reason === "justified")
      return {
        pass: true,
        headline: "예외 사유에 해당하면 수급이 가능해요",
        detail:
          "자발적 퇴사여도 직장 내 괴롭힘·임금 체불·왕복 3시간 이상 통근·30일 이상 질병·육아 사유라면 수급자격이 인정돼요. 증빙 서류를 가지고 고용센터를 방문하면 돼요.",
        badges: ["예외 인정 가능"],
        links: [
          {
            icon: "link",
            title: "자발적 퇴사 예외 조건",
            desc: "인정되는 11가지 사유 전체 목록",
            href: "/w/실업급여-자발적퇴사",
          },
        ],
      };

    if (quit === "voluntary" && reason === "normal")
      return {
        pass: false,
        headline: "수급자격이 제한될 가능성이 높아요",
        detail:
          "단순 개인 사정이나 더 좋은 직장을 찾아 퇴사하면 수급자격이 제한돼요. 임금 체불이나 근로조건 변경 등 다른 사유가 있었다면 고용센터 상담을 받아보는 게 좋아요.",
        badges: ["수급 제한 가능"],
        links: [
          {
            icon: "link",
            title: "자발적 퇴사 예외 조건",
            desc: "혹시 예외에 해당하는지 확인",
            href: "/w/실업급여-자발적퇴사",
          },
        ],
      };

    return {
      pass: false,
      headline: "퇴사 경위를 선택해 주세요",
      detail: "퇴사 방식과 이유를 선택하면 수급 가능 여부를 바로 알려드려요.",
      badges: [],
      links: [],
    };
  }

  function pick(g: string, v: string) {
    setSel((p) => ({ ...p, [g]: v }));
  }

  const res = getResult();

  const tocItems = [
    { t: "실업급여 수급자격제한은 어떤 경우에 해당하나요?", sub: null },
    { t: "실업급여 수급자격제한 중대과실 해고 기준은 뭐예요?", sub: null },
    { t: "실업급여 수급자격제한에서 자발적 퇴사 기준은 어떻게 되나요?", sub: null },
    { t: "실업급여 수급자격제한 예외 정당한 사유는 뭐예요?", sub: null },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "수급자격제한"]}
      tags={["2026년 기준", "실업급여", "수급자격제한", "자진퇴사"]}
      date="2026-02-23"
      title="실업급여 수급자격 제한 사유 | 중대과실 해고 자진퇴사 기준"
      description="자발적으로 그만뒀는데 실업급여를 받을 수 있을지 고민이시죠? 수급자격제한 사유와 예외 인정 조건 11가지를 정리했어요."
      sourceBar={{ badge: "출처", name: "고용보험법 · 고용24", date: "2026.02 기준" }}
      stickyLabel="수급이력 조회"
      stickyValue="고용24"
      stickyBtn="수급이력 조회하기 →"
      stickyHref="https://www.ei.go.kr"
    >
      <TOC items={tocItems} />
      <Summary3
        items={[
          "자발적 퇴사는 원칙적으로 수급자격이 제한되지만, 11가지 예외 사유가 있어요.",
          "직장 내 괴롭힘·임금 체불·왕복 3시간 이상 통근·질병·육아 등은 예외로 인정돼요.",
          "예외 인정을 받으려면 증빙 서류를 준비해서 고용센터에 방문하면 돼요.",
        ]}
      />

      {/* 체커 */}
      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x2714;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>내 이직 사유, 수급자격 제한될까요?</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>퇴사 경위와 이유로 수급 가능 여부를 판정해요</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              퇴사 경위는 어떻게 되나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="quit" value="involuntary" label="권고사직·계약만료·해고예요" sel={sel} pick={pick} />
              <Btn group="quit" value="voluntary" label="제가 먼저 사직서를 냈어요" sel={sel} pick={pick} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
              퇴사 이유가 무엇인가요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="reason" value="normal" label="더 좋은 직장, 개인 사정 등" sel={sel} pick={pick} />
              <Btn group="reason" value="justified" label="괴롭힘·임금체불·통근 어려움·건강·육아" sel={sel} pick={pick} />
            </div>
          </div>
          {Object.keys(sel).length >= 1 && (
            <div style={{ marginTop: 16, padding: 16, borderRadius: 8, background: res.pass ? C.navyLight : "#F5F5F5", border: res.pass ? "1px solid rgba(30,58,95,.1)" : `1px solid ${C.line}` }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: res.pass ? C.navy : C.t1, marginBottom: 4 }}>
                {res.pass ? "✅" : "⛔"} {res.headline}
              </div>
              <div style={{ fontSize: 13, color: C.t3, lineHeight: 1.55 }}>{res.detail}</div>
              {res.badges.length > 0 && (
                <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" }}>
                  {res.badges.map((b, i) => (
                    <span key={i} style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 4, background: res.pass ? C.navy : C.t4, color: "#fff" }}>{b}</span>
                  ))}
                </div>
              )}
              {res.links.length > 0 && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: res.pass ? "1px solid rgba(30,58,95,.08)" : "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.t1, marginBottom: 6 }}>📖 관련 가이드</div>
                  {res.links.map((lnk, li) => (
                    <a key={li} href={lnk.href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", fontSize: 13, color: C.navy, fontWeight: 600, borderBottom: "1px solid rgba(30,58,95,.06)", textDecoration: "none" }}>
                      <span>{lnk.title}</span>
                      <span style={{ fontSize: 11, color: C.t4 }}>{"→"}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Divider />
      <Sec id="h2-1" question="실업급여 수급자격제한은 어떤 경우에 해당하나요?">
        <P>
          <B>자발적 이직이 원칙적인 제한 사유예요.</B> 스스로 사직서를 내고 그만둔 경우, 별다른 사유
          없이 무단 결근한 경우, 이전에 부정수급 이력이 있는 경우가 해당돼요.{" "}
          <A href="https://www.law.go.kr/법령/고용보험법시행규칙">고용보험법 시행규칙 제101조</A>에서
          수급자격을 제한하는 이직 사유를 구체적으로 규정하고 있어요.
        </P>
        <P>
          반면 비자발적 이직은 제한 사유가 아니에요. 권고사직, 계약 만료, 폐업·도산, 해고는
          수급자격이 인정돼요. 이 경우 이직확인서에 이직 사유가 제대로 기재돼 있으면 신청하면 돼요.
        </P>
        <InlineLink href="/w/실업급여-수급자격-인정" label="수급자격 신청 절차 전체 보기" />
        <P>
          제한 사유 해당 여부는 이직확인서와 수급자 진술을 종합해서 판단해요. 같은 사직서 제출이어도
          사업주가 이직확인서를 어떻게 작성했는지, 수급자가 어떤 사유를 입증하는지에 따라 결과가
          달라져요.
        </P>
        <P>
          이직확인서 이직 사유 코드를 보면 코드 1·2는 회사 사정(권고사직·경영 악화), 코드 3은
          계약 기간 만료, 코드 4는 자발적 이직(개인 사정), 코드 5는 자발적 이직(정당한 사유)예요.
          코드 4는 원칙적으로 제한, 코드 5는 예외 심사 대상이에요.
        </P>
      </Sec>

      <Divider />
      <Sec id="h2-2" question="실업급여 수급자격제한 중대과실 해고 기준은 뭐예요?">
        <P>
          <B>고의·중대한 귀책 사유로 해고된 경우 수급자격이 제한돼요.</B> 형사처분을 받을 만한 행위,
          사업에 막대한 지장을 초래하는 행위, 장기간 무단결근이 대표적인 사유예요.
        </P>
        <P>
          구체적으로는 업무상 횡령·배임·폭행, 허위 서류 제출로 취업한 경우, 사업 정보 유출,
          연속 7일 이상 무단결근 등이 해당돼요. 단순 업무 실수나 성과 부진은 중대과실에 해당하지
          않아요.
        </P>
        <Info>중대과실 해고 여부는 이직확인서 이직 사유 코드와 수급자 진술을 종합해서 판단해요. 억울하게 기재된 경우 고용센터에서 이의 제기가 가능해요.</Info>
        <BridgeCard
          q="수급자격 제한 여부가 확인됐다면 신청 절차가 궁금하시죠?"
          a="고용센터 방문 전에 워크넷 구직등록과 온라인 교육 수료가 먼저예요."
          href="/w/실업급여-수급자격-인정"
          label="수급자격 신청 절차 보기"
        />
        <P>
          중대과실 해고라도 사업주의 귀책 사유(임금 체불, 근로조건 일방 변경 등)가 함께 있었다면
          예외 심사를 받을 수 있어요. 퇴사 전에 관련 증거(문자, 이메일, 급여명세서 등)를 확보해두는
          게 중요해요.
        </P>
      </Sec>

      <Divider />
      <Sec id="h2-3" question="실업급여 수급자격제한에서 자발적 퇴사 기준은 어떻게 되나요?">
        <P>
          <B>사직서를 직접 제출하면 원칙적으로 자발적 퇴사예요.</B> 사직서 제출 형태에 상관없이
          근로자가 먼저 고용 관계 종료를 요청하면 자발적 이직으로 봐요.
        </P>
        <P>
          다만 사업주가 권고사직을 유도한 경우에는 다를 수 있어요. "그만두지 않으면 해고하겠다",
          "다음 달부터 급여를 삭감하겠다"는 압박으로 사직서를 낸 경우라면 실질적 권고사직에 해당할
          수 있어요. 이런 경우에는 관련 대화 내용을 증거로 남겨두면 좋아요.
        </P>
        <InlineLink href="/w/실업급여-자발적퇴사" label="자진퇴사 예외 조건 11가지 전체 보기" />
        <P>
          합의 퇴직도 상황에 따라 다르게 판단돼요. 사업주의 제안으로 이루어진 합의 퇴직은
          비자발적으로 볼 수 있어요. 반면 근로자가 먼저 퇴직 의사를 밝히고 합의한 경우는
          자발적 퇴직으로 판단해요.
        </P>
        <P>
          실질적으로는 이직확인서에 기재된 코드가 중요해요. 코드가 4번(자발적)으로 기재돼 있어도
          실제 사유를 입증하면 예외 인정이 가능해요. 고용센터 방문 시 진술서와 증빙 자료를 함께
          제출하면 돼요.
        </P>
      </Sec>

      <Divider />
      <Sec id="h2-4" question="실업급여 수급자격제한 예외 정당한 사유는 뭐예요?">
        <P>
          <B>11가지 유형이 있어요.</B>{" "}
          <A href="https://www.law.go.kr/법령/고용보험법시행규칙">고용보험법 시행규칙 제101조</A>{" "}
          별표2에서 정하고 있어요. 주요 예외 사유를 알아두면 실제로 도움이 돼요.
        </P>
        <P>
          대표적인 6가지는 이래요. 직장 내 괴롭힘·성희롱(사업주가 해결하지 않은 경우), 임금 체불
          (이직 전 1년간 2개월 이상), 최저임금 미달(지속적으로 최저임금 미만), 통근 어려움(왕복
          3시간 이상), 질병·부상(30일 이상 치료 필요), 임신·출산·육아(만 8세 이하 자녀 돌봄 필요)예요.
        </P>
        <TableTitle>수급자격제한 예외 인정 주요 사유</TableTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr><THL>사유</THL><TH>인정 기준</TH><TH>필요 증빙</TH></tr>
            </thead>
            <tbody>
              {[
                ["직장 내 괴롭힘", "사업주가 해결 조치 안 한 경우", "녹취·문자·이메일"],
                ["임금 체불", "이직 전 1년간 2개월 이상", "급여명세서·통장 내역"],
                ["최저임금 미달", "지속적으로 최저임금 미만", "근로계약서·급여대장"],
                ["통근 어려움", "왕복 3시간 이상 소요", "주소지 확인·교통 증빙"],
                ["질병·부상", "30일 이상 치료 필요", "진단서·소견서"],
                ["임신·출산·육아", "만 8세 이하 자녀 돌봄", "가족관계증명서"],
              ].map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ padding: "8px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TableNote>※ 고용보험법 시행규칙 제101조 별표2 기준, 6가지 대표 사유</TableNote>
        <Info>예외 인정에는 증빙이 필요해요. 괴롭힘은 녹취나 문자, 임금 체불은 급여명세서나 통장 내역, 통근 거리는 주소지 확인, 질병은 진단서가 증빙이 돼요.</Info>
        <P>
          고용센터 방문 시 진술서를 작성해요. "괴롭힘을 당했어요"보다 "0월 0일 상사로부터
          이런 행위를 당했어요"처럼 날짜와 내용이 구체적이어야 인정받기 유리해요. 예외 불인정 시
          90일 이내 이의신청이 가능해요.
        </P>
        <SpokeLink href="/w/실업급여-수급자격-인정" title="실업급여 수급자격 신청 절차" desc="고용센터 방문부터 첫 지급까지" />
        <SpokeLink href="/w/실업급여-자발적퇴사" title="자진퇴사 후 실업급여 예외 조건" desc="11가지 인정 사유 전체 목록" />
        <SpokeLink href="/w/실업급여-구비서류" title="실업급여 구비서류 목록" desc="고용센터 방문 전 준비물" />
      </Sec>

      <ExtBtn
        href="https://www.law.go.kr/법령/고용보험법시행규칙"
        badge="법제처 공식"
        text="고용보험법 시행규칙 수급자격제한 조항"
        cta="바로가기"
      />

      <PrevNext
        prev={{ title: "실업급여 수급자격 신청 절차", href: "/w/실업급여-수급자격-인정" }}
        next={undefined}
      />
      <FAQAccordion items={META.faq} />
      <RelatedArticles
        items={[
          { title: "실업급여 수급자격 신청 절차", href: "/w/실업급여-수급자격-인정", desc: "고용센터 방문부터 첫 지급까지" },
          { title: "자진퇴사 후 실업급여 예외 조건", href: "/w/실업급여-자발적퇴사", desc: "11가지 인정 사유 전체 목록" },
          { title: "실업급여 구비서류 목록", href: "/w/실업급여-구비서류", desc: "고용센터 방문 전 준비물" },
        ]}
      />
    </BlogLayout>
  );
}
