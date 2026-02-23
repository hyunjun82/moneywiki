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

type Sel = { employed?: string; reported?: string };
type ResLink = { icon: "link" | "search"; title: string; desc: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; links: ResLink[] };

const META = {
  title: "실업급여 취업신고 방법 | 고용24 온라인 신고 절차",
  description:
    "취업한 날 다음 날까지 고용24에서 실업급여 취업신고를 해야 해요. 미신고하면 부정수급으로 전액 반환에 최대 5배 추가 징수까지 있어요.",
  keywords: ["실업급여 취업신고", "신고 방법", "고용24 온라인", "취업신고 온라인"],
  ogTitle: "실업급여 취업신고 방법 | 머니위키",
  ogDescription: "고용24 온라인 취업신고 절차와 미신고 시 처벌을 정리했어요.",
  datePublished: "2026-02-23",
  lastUpdated: "2026-02-23",
  category: "실업급여",
  faq: [
    {
      question: "실업급여 취업신고 후 바로 일 그만두면 어떻게 되나요?",
      answer:
        "취업신고 후 퇴사하면 남은 수급기간이 종료된 상태라 다시 실업급여를 받으려면 새로운 피보험기간을 충족해야 해요. 조기재취업수당을 신청했다면 12개월 미만 퇴사 시 수당을 받을 수 없어요.",
    },
    {
      question: "실업급여 취업신고를 잊어버리고 한 달 뒤에 했어요. 어떻게 되나요?",
      answer:
        "취업일 이후 받은 실업급여는 반환해야 해요. 다만 자진신고하면 추가 징수가 감면될 수 있어요. 지금이라도 빨리 고용센터(1350)에 연락하세요.",
    },
  ],
};

export default function Article62() {
  const [sel, setSel] = useState<Sel>({});

  function getResult(): Res {
    const { employed, reported } = sel;

    if (employed === "yes" && reported === "done")
      return {
        pass: true,
        headline: "취업신고 완료됐어요",
        detail:
          "정상적으로 신고했어요. 이후 잔여 수급이 종료되고, 소정급여일수의 절반 이상 남긴 상태에서 취업했으면 조기재취업수당도 신청할 수 있어요.",
        badges: ["신고 완료"],
        links: [{ icon: "link", title: "조기재취업수당 신청", desc: "남은 급여 50% 받는 방법", href: "/w/실업급여-재취업-조건" }],
      };

    if (employed === "yes" && reported === "pending")
      return {
        pass: false,
        headline: "즉시 취업신고가 필요해요",
        detail:
          "취업한 날의 다음 날까지 신고해야 해요. 신고 없이 받은 실업급여는 전액 반환해야 하고, 최대 5배 추가 징수까지 받을 수 있어요. 지금 바로 고용24에서 신고하세요.",
        badges: ["신고 필요", "즉시 처리"],
        links: [{ icon: "link", title: "고용24 취업신고", desc: "온라인 취업신고 바로가기", href: "https://www.ei.go.kr" }],
      };

    if (employed === "no" && reported === "done")
      return {
        pass: true,
        headline: "구직활동 계속하면 돼요",
        detail: "아직 취업 전이라면 구직활동을 계속하고 실업인정일에 정상 신고하면 돼요. 취업하면 다음 날까지 취업신고를 잊지 마세요.",
        badges: ["정상 수급"],
        links: [],
      };

    if (employed === "no" && reported === "pending")
      return {
        pass: true,
        headline: "구직활동 계속하면 돼요",
        detail:
          "아직 취업 전이라면 실업급여를 계속 받을 수 있어요. 취업하는 날의 다음 날까지 반드시 취업신고를 해야 해요. 잊으면 부정수급이 돼요.",
        badges: ["정상 수급"],
        links: [],
      };

    return {
      pass: false,
      headline: "조건을 선택해 주세요",
      detail: "취업 여부와 신고 상태를 선택하면 바로 안내해 드려요.",
      badges: [],
      links: [],
    };
  }

  function pick(g: string, v: string) {
    setSel((p) => ({ ...p, [g]: v }));
  }

  const res = getResult();

  const tocItems = [
    { t: "실업급여 취업신고는 언제 해야 하나요?", sub: null },
    { t: "실업급여 취업신고 방법은 어떻게 되나요?", sub: null },
    { t: "고용24에서 실업급여 취업신고는 어떻게 하나요?", sub: null },
    { t: "실업급여 취업신고 안 하면 어떻게 되나요?", sub: null },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "취업신고"]}
      tags={["2026년 기준", "실업급여", "취업신고", "고용24"]}
      date="2026-02-23"
      title="실업급여 취업신고 방법 | 고용24 온라인 신고 절차"
      description="취업한 날 다음 날까지 고용24에서 실업급여 취업신고를 해야 해요. 미신고하면 부정수급으로 전액 반환에 최대 5배 추가 징수까지 있어요."
      sourceBar={{ badge: "출처", name: "고용보험법 · 고용24", date: "2026.02 기준" }}
      stickyLabel="취업신고"
      stickyValue="고용24"
      stickyBtn="지금 신고하기 →"
      stickyHref="https://www.ei.go.kr"
    >
      <TOC items={tocItems} />
      <Summary3
        items={[
          "취업한 다음 날까지 고용센터 또는 고용24에서 취업신고를 해야 해요.",
          "미신고 상태로 실업급여를 받으면 부정수급으로 환수 + 최대 5배 추가 징수예요.",
          "신고 후 잔여 수급기간이 종료되고, 조기재취업수당 신청 자격이 생겨요.",
        ]}
      />

      {/* 체커 */}
      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x2714;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>취업신고, 나는 해야 하나요?</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>취업 여부와 신고 상태로 판정해요</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              현재 취업 상태가 어떻게 되나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="employed" value="yes" label="취업했어요" sel={sel} pick={pick} />
              <Btn group="employed" value="no" label="아직 구직 중이에요" sel={sel} pick={pick} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
              취업신고를 했나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="reported" value="done" label="이미 신고했어요" sel={sel} pick={pick} />
              <Btn group="reported" value="pending" label="아직 안 했어요" sel={sel} pick={pick} />
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
      <Sec id="h2-1" question="실업급여 취업신고는 언제 해야 하나요?">
        <P>
          <B>취업한 날의 다음 날까지 신고해야 해요.</B> 취업 당일이 아니라 다음 날까지라는 점이
          중요해요. 예를 들어 3월 5일에 출근했다면 3월 6일까지 신고해야 해요.
        </P>
        <P>
          취업신고 기한을 넘기면 취업일 이후 받은 실업급여가 전부 반환 대상이 돼요. 하루만 늦어도
          그 하루치 실업급여를 돌려줘야 해요. 자진신고하면 추가 징수를 줄일 수 있지만, 적발되면
          혜택이 없어요.
        </P>
        <InlineLink href="/w/실업급여-알바-미신고" label="부정수급 처벌 및 자진신고 감면 조건" />
        <P>
          여기서 "취업"의 기준은 실제 근무 시작일이에요. 합격 통보를 받은 날이나 근로계약서를 쓴
          날이 아니라 실제로 일을 시작한 날이에요. 수습 기간이라도 근무를 시작했으면 취업한 거예요.
        </P>
        <P>
          일을 시작한 날 바로 다음 날 신고가 기준이에요. 늦으면 부정수급이 되는 구조이니 취업
          확정 시 미리 고용24 로그인을 준비해 두면 좋아요.
        </P>
      </Sec>

      <Divider />
      <Sec id="h2-2" question="실업급여 취업신고 방법은 어떻게 되나요?">
        <P>
          <B>두 가지 방법이 있어요.</B> <A href="https://www.ei.go.kr">고용24</A>에서 온라인으로
          신고하는 방법과, 관할 고용센터에 직접 방문하는 방법이에요.
        </P>
        <P>
          온라인 신고가 훨씬 편해요. 고용24에 로그인 후 수급자격자 서비스 → 취업·훈련 신고 →
          취업신고 메뉴로 들어가면 돼요. 취업일, 사업장명, 취업 형태를 입력하면 5분이면 완료돼요.
        </P>
        <InlineLink href="/w/실업급여-재취업-조건" label="취업신고 후 조기재취업수당 신청 방법" />
        <P>
          방문 신고는 취업신고서를 작성해서 고용센터 창구에 제출하면 돼요. 신분증과 근로계약서
          사본을 지참하면 빠르게 처리돼요. 주소지 관할 고용센터가 아니어도 어느 센터에서나 신고할
          수 있어요.
        </P>
        <P>
          전화 신고(1350)는 안 돼요. 고용센터에 전화로 취업했다고 해도 정식 신고가 아니에요. 반드시
          온라인이나 방문으로 신고해야 해요.
        </P>
      </Sec>

      <Divider />
      <Sec id="h2-3" question="고용24에서 실업급여 취업신고는 어떻게 하나요?">
        <P>
          고용24 취업신고 온라인 절차는 <B>4단계</B>예요.
        </P>
        <P>
          1단계는 고용24 로그인이에요. 공동인증서나 간편인증으로 로그인하면 돼요. 2단계는 메뉴
          이동이에요. 수급자격자 서비스 → 취업·훈련 신고 → 취업신고 순으로 들어가면 돼요.
        </P>
        <P>
          3단계는 정보 입력이에요. 취업일, 사업장명, 취업 형태(상용직·계약직·자영업 등)를 입력해요.
          급여 정보는 입력 안 해도 돼요. 4단계로 제출하면 바로 접수 번호가 나와요. 이 번호를
          캡처해 두면 나중에 증빙이 필요할 때 사용할 수 있어요.
        </P>
        <BridgeCard
          q="취업신고 후 조기재취업수당 받을 수 있는지 궁금하시죠?"
          a="소정급여일수의 절반 이상 남기고 취업했으면 대상이에요. 남은 급여의 50%를 한꺼번에 받을 수 있어요."
          href="/w/실업급여-재취업-조건"
          label="조기재취업수당 조건 보기"
        />
        <P>
          신고 후에는 잔여 수급기간이 자동으로 종료돼요. 고용센터에서 별도로 연락이 오지는 않아요.
          조기재취업수당을 신청하려면 12개월 근무 후 별도 신청해야 해요.
        </P>
      </Sec>

      <Divider />
      <Sec id="h2-4" question="실업급여 취업신고 안 하면 어떻게 되나요?">
        <TableTitle>취업신고 방법별 비교</TableTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr><THL>구분</THL><TH>온라인 (고용24)</TH><TH>방문 (고용센터)</TH></tr>
            </thead>
            <tbody>
              {[
                ["소요 시간", "5분", "30분~1시간 (대기 포함)"],
                ["필요 서류", "없음 (로그인만)", "신분증 + 근로계약서 사본"],
                ["접수 시간", "24시간", "평일 09:00~18:00"],
                ["처리 결과", "즉시 확인", "현장 확인"],
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
        <TableNote>※ 전화 신고(1350)는 정식 신고로 인정되지 않아요</TableNote>
        <P>
          <B>부정수급으로 처리돼요.</B> 취업 후 신고 없이 받은 실업급여는{" "}
          <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제62조</A>에 따라 전액 반환해야
          하고, 받은 금액의 최대 5배까지 추가 징수를 당해요.
        </P>
        <P>
          적발 경로는 다양해요. 사용자가 4대보험을 신고하면 고용보험 가입 이력이 자동으로 생성돼요.
          그 기록이 수급이력과 대조되면 바로 발각돼요. 현금 근무라도 사용자가 비용 처리를 하면
          국세청 소득 자료에 남아요.
        </P>
        <Info>자진신고하면 추가 징수 금액이 감면돼요. 이미 취업 후 실업급여를 받은 기간이 있다면, 하루라도 빨리 고용센터(1350)에 연락하세요.</Info>
        <P>
          취업신고 의무를 어기면 형사처벌도 가능해요. 금액이 크거나 기간이 길면 1년 이하 징역 또는
          300만 원 이하 벌금이에요. 전과 기록도 남을 수 있어서 단순한 돈 문제가 아니에요.
        </P>
        <SpokeLink href="/w/실업급여-재취업-조건" title="조기재취업수당 신청 방법" desc="남은 급여 50% 받는 절차" />
        <SpokeLink href="/w/실업급여-알바-미신고" title="부정수급 처벌 기준" desc="미신고 수급 시 환수 및 처벌 내용" />
      </Sec>

      <ExtBtn
        href="https://www.ei.go.kr"
        badge="고용24 공식"
        text="실업급여 취업신고 온라인"
        cta="신고하기"
      />

      <PrevNext
        prev={{ title: "실업급여 받으면서 창업 가능 여부", href: "/w/실업급여-창업" }}
        next={{ title: "실업급여 해외여행 가능 여부", href: "/w/실업급여-해외체류" }}
      />
      <FAQAccordion items={META.faq} />
      <RelatedArticles
        items={[
          { title: "실업급여 조기재취업수당 신청 조건", href: "/w/실업급여-재취업-조건", desc: "남은 급여 50% 받는 방법" },
          { title: "실업급여 알바 미신고 부정수급 처벌", href: "/w/실업급여-알바-미신고", desc: "5배 환수 자진신고 감면" },
          { title: "실업급여 수급자격 신청 절차", href: "/w/실업급여-수급자격-인정", desc: "방문부터 첫 지급까지" },
        ]}
      />
    </BlogLayout>
  );
}
