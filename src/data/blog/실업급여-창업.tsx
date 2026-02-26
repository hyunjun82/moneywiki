"use client";
import { useState } from "react";
import {
  BlogLayout,
  C,
  Btn,
  Divider,
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
  TableTitle,
  TableNote,
  TH,
  THL,
} from "@/components/wiki/BlogShared";

type Sel = { status?: string; days?: string };
type ResLink = { icon: "link" | "search"; title: string; desc: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; links: ResLink[] };

const META = {
  title: "실업급여 받으면서 창업 가능 여부 | 사업자등록 수급 중단 조건",
  description:
    "실업급여 받으면서 창업하면 사업자등록 즉시 수급이 중단돼요. 창업 준비 단계와 수급 중단 조건, 조기재취업수당까지 정리했어요.",
  keywords: ["실업급여 창업", "가능 여부", "사업자등록", "수급 중단 조건"],
  ogTitle: "실업급여 받으면서 창업 가능 여부 | 머니위키",
  ogDescription: "사업자등록 시 수급 중단 조건과 조기재취업수당을 정리했어요.",
  datePublished: "2026-02-23",
  lastUpdated: "2026-02-23",
  category: "실업급여",
  faq: [
    {
      question: "실업급여 창업 준비 중 비용이 발생했어요. 수급이 중단되나요?",
      answer:
        "준비 비용은 소득이 아니라서 수급이 중단되지 않아요. 사업자등록 전이고 실질적인 영업도 시작하지 않았으면 수급을 유지할 수 있어요.",
    },
    {
      question: "실업급여 받으면서 창업했는데 12개월 전에 폐업하면 어떻게 되나요?",
      answer:
        "조기재취업수당 자격이 사라져요. 12개월 이상 계속 사업을 영위해야 수당을 받을 수 있어요. 폐업 후 재취업하면 새 피보험기간을 충족해야 실업급여를 다시 받을 수 있어요.",
    },
  ],
};

export default function Article61() {
  const [sel, setSel] = useState<Sel>({});

  function getResult(): Res {
    const { status, days } = sel;

    if (status === "prep" && days === "over")
      return {
        pass: true,
        headline: "수급 지속 가능해요",
        detail:
          "등록 전 준비 단계는 수급이 중단되지 않아요. 소득이 발생하면 실업인정일에 신고해야 해요. 등록 타이밍을 잘 잡으면 조기재취업수당도 챙길 수 있어요.",
        badges: ["수급 유지", "조기재취업수당 가능"],
        links: [{ icon: "link", title: "조기재취업수당 계산", desc: "남은 급여 50% 받는 방법", href: "/w/실업급여-재취업-조건" }],
      };

    if (status === "prep" && days === "under")
      return {
        pass: true,
        headline: "수급 지속 가능해요",
        detail:
          "등록 전이면 수급은 유지돼요. 다만 절반 미만이 남은 상태에서 등록하면 조기재취업수당을 받을 수 없어요. 타이밍을 잘 고려하는 게 좋아요.",
        badges: ["수급 유지"],
        links: [],
      };

    if (status === "prep" && days === "unknown")
      return {
        pass: true,
        headline: "수급 지속 가능해요",
        detail:
          "등록 전이면 수급은 유지돼요. 소정급여일수의 절반 이상을 남긴 시점에 등록하면 조기재취업수당도 받을 수 있어요. 고용24에서 남은 급여일수를 먼저 조회해 두세요.",
        badges: ["수급 유지", "일수 확인 필요"],
        links: [
          {
            icon: "search",
            title: "수급이력 조회",
            desc: "고용24에서 남은 급여일수 조회",
            href: "https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do",
          },
        ],
      };

    if (status === "registered" && days === "over")
      return {
        pass: false,
        headline: "수급 중단, 조기재취업수당 가능해요",
        detail:
          "등록일부터 수급이 중단돼요. 소정급여일수의 절반 이상을 남기고 등록했으니 조기재취업수당 대상이에요. 12개월 이상 사업을 영위한 뒤 고용24에서 신청하면 돼요.",
        badges: ["수급 중단", "조기재취업수당 가능"],
        links: [{ icon: "link", title: "조기재취업수당 신청", desc: "남은 급여 50% 받는 방법", href: "/w/실업급여-재취업-조건" }],
      };

    if (status === "registered" && days === "under")
      return {
        pass: false,
        headline: "수급 중단, 조기재취업수당은 어려워요",
        detail:
          "등록일부터 수급이 중단돼요. 소정급여일수의 절반 미만만 남긴 상태라 조기재취업수당 대상이 아니에요. 이후 사업에 집중하면 돼요.",
        badges: ["수급 중단"],
        links: [],
      };

    if (status === "registered" && days === "unknown")
      return {
        pass: false,
        headline: "수급 중단, 조기재취업수당 확인이 필요해요",
        detail:
          "등록으로 수급은 중단됐어요. 소정급여일수 절반 이상을 남기고 등록했다면 조기재취업수당 신청이 가능해요. 고용24에서 남은 급여일수를 조회해 두세요.",
        badges: ["수급 중단", "일수 확인 필요"],
        links: [
          {
            icon: "search",
            title: "수급이력 조회",
            desc: "고용24에서 급여일수 조회",
            href: "https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do",
          },
        ],
      };

    return {
      pass: false,
      headline: "조건을 선택해 주세요",
      detail: "창업 상태와 남은 급여일수를 선택하면 수급 중단 여부를 바로 알려드려요.",
      badges: [],
      links: [],
    };
  }

  function pick(g: string, v: string) {
    setSel((p) => ({ ...p, [g]: v }));
  }

  const res = getResult();

  const tocItems = [
    { t: "실업급여 받으면서 창업하면 수급이 중단되나요?", sub: "사업자등록 전 준비 단계는 수급 유지" },
    { t: "실업급여 수급 중 사업자등록하면 어떻게 되나요?", sub: "등록일부터 즉시 수급 중단" },
    { t: "실업급여 창업 시 조기재취업수당 받을 수 있나요?", sub: "남은 급여일수 1/2 이상이면 대상" },
    { t: "실업급여 창업 수급 중단 조건은 무엇인가요?", sub: "등록·영업·소득 중 가장 이른 날" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "창업"]}
      tags={["2026년 기준", "실업급여", "창업", "사업자등록"]}
      date="2026-02-23"
      title="실업급여 받으면서 창업 가능 여부 | 사업자등록 수급 중단 조건"
      description="실업급여 받으면서 창업하면 사업자등록 즉시 수급이 중단돼요. 창업 준비 단계와 수급 중단 조건, 조기재취업수당까지 정리했어요."
      sourceBar={{ badge: "출처", name: "고용보험법 · 고용24", date: "2026.02 기준" }}
      stickyLabel="수급이력 조회"
      stickyValue="고용24"
      stickyBtn="수급이력 조회하기 →"
      stickyHref="https://www.ei.go.kr"
    >
      <TOC items={tocItems} />
      <Summary3
        items={[
          "창업 준비 단계(사업자등록 전)는 수급 지속 가능, 등록 이후는 수급 중단이에요.",
          "소정급여일수의 1/2 이상 남기고 창업하면 조기재취업수당 대상이에요.",
          "사업자등록 후 미신고 수급하면 부정수급으로 최대 5배 환수돼요.",
        ]}
      />

      {/* 체커 */}
      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x2714;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>내 창업 상황, 수급 중단되나요?</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>사업자등록 여부와 남은 급여일수로 판정해요</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              현재 창업 상태가 어떻게 되나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="status" value="prep" label="사업자등록 전, 준비 중이에요" sel={sel} pick={pick} />
              <Btn group="status" value="registered" label="사업자등록을 했어요" sel={sel} pick={pick} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
              소정급여일수의 절반 이상 남았나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="days" value="over" label="네, 절반 이상 남았어요" sel={sel} pick={pick} />
              <Btn group="days" value="under" label="아니에요, 절반 미만이에요" sel={sel} pick={pick} />
              <Btn group="days" value="unknown" label="모르겠어요" sel={sel} pick={pick} />
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
      <Sec n="SECTION 01" id="h2-1" title="실업급여 받으면서 창업하면 수급이 중단되나요?" sub="사업자등록 전 준비 단계는 수급 유지">
        <P>
          <B>창업 준비 단계라면 수급이 중단되지 않아요.</B> 시장조사, 사업 계획 수립, 자금 준비 같은
          준비 활동은 취업으로 간주되지 않아요. 이 기간에는 실업급여를 받으면서 창업을 준비할 수 있어요.
        </P>
        <P>
          단, 사업자를 내거나 실질적으로 영업을 시작하거나 소득이 발생하는 순간부터 달라져요.{" "}
          <A href="https://www.law.go.kr/법령/고용보험법">고용보험법</A>에 따라 이 시점 이후는
          취업으로 간주돼 수급이 중단돼요.
        </P>
        <InlineLink icon="calculator" title="조기재취업수당 계산 방법" desc="남은 급여일수 기준 수당 산출" href="/w/실업급여-재취업-조건" />
        <P>
          소득 없는 창업 준비와 소득이 생기는 시점은 구분해야 해요. 창업 교육 수강이나 임대 계약
          검토는 준비 단계로 봐요. 하지만 시험 판매나 용역 제공으로 돈이 들어오면 그날부터
          실업인정일에 신고해야 해요.
        </P>
        <P>
          쉽게 정리하면, 사업자를 내기 전까지는 수급 유지, 낸 이후는 수급 중단이에요. 창업 교육비나
          사업 준비 비용 지출은 소득이 아니라서 수급에 영향이 없어요.
        </P>
      </Sec>

      <Divider />
      <Sec n="SECTION 02" id="h2-2" title="실업급여 수급 중 사업자등록하면 어떻게 되나요?" sub="등록일부터 즉시 수급 중단">
        <P>
          <B>사업자등록일부터 수급이 중단돼요.</B> 등록하면 취업으로 간주되기 때문이에요. 해당일에
          바로 고용센터에 취업 신고를 해야 해요.
        </P>
        <P>
          취업 신고를 하지 않고 수급을 계속 받으면 부정수급이에요. 이후 받은 금액은 전액 반환해야
          하고, <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제62조</A>에 따라 최대
          5배 추가 징수까지 있어요. 형사처벌도 가능해요.
        </P>
        <Info type="warn">부정수급 적발 시 받은 급여 전액 반환 + 최대 5배 추가 징수예요. 등록 즉시 고용24에서 취업 신고를 해야 해요.</Info>
        <P>
          신고는 간단해요. 등록 후 고용24에서 온라인으로 취업 신고를 하면 돼요. 신고하면 잔여 수급
          기간이 종료되고 조기재취업수당 신청 자격이 생겨요.
        </P>
        <InlineLink icon="link" title="부정수급 처벌 및 자진신고 감면 조건" desc="미신고 적발 시 환수 절차와 감면 방법" href="/w/실업급여-알바-미신고" />
        <P>
          등록 없이 실질적으로 영업을 시작한 경우도 마찬가지예요. 프리랜서 계약이나 현금 거래로
          소득이 생기면 그날부터 신고해야 해요. 등록 정보는 국세청과 연동되어 나중에 적발될 수 있어요.
        </P>
      </Sec>

      <Divider />
      <Sec n="SECTION 03" id="h2-3" title="실업급여 창업 시 조기재취업수당 받을 수 있나요?" sub="남은 급여일수 1/2 이상이면 대상">
        <P>
          <B>받을 수 있어요.</B> 자영업도 조기재취업수당 대상이에요.{" "}
          <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제64조</A>에서 재취업뿐 아니라
          자영업 창업도 대상으로 명시하고 있어요.
        </P>
        <P>
          조기재취업수당을 받으려면 두 가지 조건이 모두 필요해요. 첫째, 소정급여일수의 1/2 이상을
          남긴 상태에서 창업해야 해요. 둘째, 창업 후 12개월 이상 계속 사업을 영위해야 해요.
        </P>
        <P>
          수당 계산은 간단해요. 남은 소정급여일수 × 1일 지급액 × 50%예요. 빨리 창업할수록 남은
          일수가 많아서 수당이 커지는 구조예요. 예를 들어 210일 중 60일만 받고 창업하면 남은
          150일분의 50%를 한꺼번에 받아요.
        </P>
        <BridgeCard
          q="창업하면 조기재취업수당이 얼마나 나오나요?"
          a="남은 소정급여일수에 따라 달라요. 빨리 창업할수록 수당이 커지는 구조예요."
          href="/w/실업급여-재취업-조건"
          label="조기재취업수당 계산 방법 보기"
        />
        <P>
          신청 시점은 12개월 사업 영위 완료 후예요. 수급 전부터 준비하던 사업은 대상에서 제외돼요.
          12개월을 채운 뒤 고용24에서 신청하면 돼요.
        </P>
      </Sec>

      <Divider />
      <Sec n="SECTION 04" id="h2-4" title="실업급여 창업 수급 중단 조건은 무엇인가요?" sub="등록·영업·소득 중 가장 이른 날">
        <P>
          수급 중단 시점은 <B>세 가지 중 가장 이른 날</B>이에요. 사업자등록일, 실질적 영업 시작일,
          소득 발생일 중 먼저 오는 날부터 수급이 중단돼요.
        </P>
        <TableTitle>창업 단계별 수급 영향 비교</TableTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr><THL>구분</THL><TH>수급 영향</TH><TH>조기재취업수당</TH></tr>
            </thead>
            <tbody>
              {[
                ["창업 준비 (등록 전)", "수급 유지", "등록 시 1/2 이상 남기면 가능"],
                ["사업자등록일", "즉시 중단", "1/2 이상 남긴 경우 가능"],
                ["실질 영업 시작일", "즉시 중단", "등록일 기준 판단"],
                ["소득 발생일", "즉시 중단 + 신고 의무", "등록일 기준 판단"],
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
        <TableNote>※ 세 가지 중 가장 이른 날부터 수급 중단</TableNote>
        <P>
          "등록만 안 했으니까 괜찮겠지"는 통하지 않아요. 등록 없이 먼저 영업을 시작하거나 소득이
          생기면 그날부터 수급 중단 대상이에요. 이미 받은 실업급여는 전액 반환해야 해요.
        </P>
        <P>
          창업 준비 기간을 최대한 활용하고, 소정급여일수의 절반 이상을 남긴 시점에 등록하면
          조기재취업수당도 챙길 수 있어요. 창업 타이밍을 신중하게 잡는 게 중요한 이유예요.
        </P>
        <P>
          재취업수당 신청을 계획하고 있다면, 창업 전에 고용24에서 남은 소정급여일수를 반드시
          조회해 보세요. 절반 이상이 남아 있는 시점에 등록해야 수당을 받을 수 있어요.
        </P>
        <SpokeLink num="01" href="/w/실업급여-재취업-조건" title="조기재취업수당 신청 방법" desc="남은 급여 50% 받는 절차 안내" />
        <SpokeLink num="02" href="/w/실업급여-알바-미신고" title="부정수급 처벌 기준" desc="미신고 수급 시 환수 및 처벌 내용" />
        <SpokeLink num="03" href="/w/실업급여-수급자격-인정" title="수급자격 신청 절차" desc="고용센터 방문부터 첫 지급까지" />
      </Sec>

      <ExtBtn
        href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do"
        badge="고용24 공식"
        text="조기재취업수당 신청 및 취업신고"
        cta="바로가기"
      />

      <PrevNext
        prev={{ title: "실업급여 조기재취업수당 신청 조건", href: "/w/실업급여-재취업-조건" }}
        next={{ title: "실업급여 취업신고 방법", href: "/w/실업급여-수급중-취업-신고방법" }}
      />
      <FAQAccordion items={META.faq} />
      <RelatedArticles
        items={[
          { title: "실업급여 조기재취업수당 신청 조건", href: "/w/실업급여-재취업-조건", desc: "남은 급여 50% 받는 방법" },
          { title: "실업급여 부정수급 처벌", href: "/w/실업급여-알바-미신고", desc: "자진신고 감면 조건" },
          { title: "실업급여 수급자격 신청 절차", href: "/w/실업급여-수급자격-인정", desc: "방문부터 첫 지급까지" },
        ]}
      />
    </BlogLayout>
  );
}
