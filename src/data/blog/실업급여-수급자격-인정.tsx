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

type Sel = { worknet?: string; applied?: string };
type ResLink = { icon: "link" | "search"; title: string; desc: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; links: ResLink[] };

const META = {
  title: "실업급여 수급자격 신청 절차 | 고용센터 방문 및 심사 기간",
  description:
    "실업급여 수급자격 신청은 온라인 교육 수료 → 워크넷 구직등록 → 고용센터 방문 순이에요. 방문 후 심사는 보통 14일 이내에 결과가 나와요.",
  keywords: ["실업급여 수급자격", "신청 절차", "고용센터 방문", "심사 기간"],
  ogTitle: "실업급여 수급자격 신청 절차 | 머니위키",
  ogDescription: "고용센터 방문 전 준비물부터 14일 심사 기간, 불인정 이의신청까지 정리했어요.",
  datePublished: "2026-02-23",
  lastUpdated: "2026-02-23",
  category: "실업급여",
  faq: [
    {
      question: "실업급여 수급자격 신청을 고용센터가 아닌 다른 방법으로 할 수 있나요?",
      answer:
        "수급자격 신청은 반드시 관할 고용센터를 직접 방문해야 해요. 온라인 신청은 안 돼요. 방문 전에 온라인 교육 수료와 워크넷 구직등록을 먼저 해야 해요.",
    },
    {
      question: "실업급여 수급자격 심사 기간에 실업인정을 받을 수 있나요?",
      answer:
        "심사 결과가 나오기 전까지는 실업인정을 받을 수 없어요. 수급자격 인정 후 첫 실업인정일이 지정되고, 그때부터 실업급여를 받을 수 있어요.",
    },
  ],
};

export default function Article68() {
  const [sel, setSel] = useState<Sel>({});

  function getResult(): Res {
    const { worknet, applied } = sel;

    if (worknet === "done" && applied === "done")
      return {
        pass: true,
        headline: "심사 진행 중이에요",
        detail:
          "수급자격 신청이 완료됐어요. 심사 결과는 보통 14일 이내에 나와요. 결과가 나오면 첫 실업인정일이 지정되고 그때부터 실업급여를 받을 수 있어요.",
        badges: ["신청 완료", "심사 대기"],
        links: [
          {
            icon: "search",
            title: "수급자격 심사 결과 조회",
            desc: "고용24에서 진행 상태 조회",
            href: "https://www.ei.go.kr",
          },
        ],
      };

    if (worknet === "done" && applied === "pending")
      return {
        pass: false,
        headline: "고용센터 방문이 남아 있어요",
        detail:
          "워크넷 등록은 완료됐어요. 이제 관할 고용센터를 방문해서 수급자격을 신청해야 해요. 신분증, 통장 사본을 지참하면 돼요. 온라인 교육도 미리 수료해야 해요.",
        badges: ["고용센터 방문 필요"],
        links: [{ icon: "link", title: "관할 고용센터 찾기", desc: "주소지 기준 센터 조회", href: "https://www.ei.go.kr" }],
      };

    if (worknet === "pending" && applied === "pending")
      return {
        pass: false,
        headline: "워크넷 구직등록부터 해야 해요",
        detail:
          "고용센터 방문 전에 워크넷에서 구직등록을 먼저 해야 해요. 등록 후 관할 고용센터를 방문해서 수급자격을 신청하면 돼요. 온라인 교육도 미리 수료해야 해요.",
        badges: ["워크넷 등록 필요"],
        links: [{ icon: "link", title: "워크넷 구직등록", desc: "수급자격 신청 전 필수", href: "https://www.work.go.kr" }],
      };

    if (worknet === "pending" && applied === "done")
      return {
        pass: false,
        headline: "신청이 정상적으로 처리되지 않았을 수 있어요",
        detail:
          "워크넷 구직등록 없이는 수급자격 신청이 불가능해요. 워크넷 등록 후 고용센터를 다시 방문해서 신청해야 해요.",
        badges: ["워크넷 등록 필요"],
        links: [{ icon: "link", title: "워크넷 구직등록", desc: "수급자격 신청 전 필수", href: "https://www.work.go.kr" }],
      };

    return {
      pass: false,
      headline: "조건을 선택해 주세요",
      detail: "등록 여부와 신청 여부를 선택하면 다음 단계를 안내해 드려요.",
      badges: [],
      links: [],
    };
  }

  function pick(g: string, v: string) {
    setSel((p) => ({ ...p, [g]: v }));
  }

  const res = getResult();

  const tocItems = [
    { t: "실업급여 수급자격 신청은 어떻게 하나요?", sub: null },
    { t: "실업급여 수급자격 고용센터 방문 시 뭐가 필요한가요?", sub: null },
    { t: "실업급여 수급자격 심사 기간은 얼마나 걸리나요?", sub: null },
    { t: "실업급여 수급자격 불인정되면 어떻게 되나요?", sub: null },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "수급자격 신청"]}
      tags={["2026년 기준", "실업급여", "수급자격", "고용센터 방문"]}
      date="2026-02-23"
      title="실업급여 수급자격 신청 절차 | 고용센터 방문 및 심사 기간"
      description="실업급여 수급자격 신청은 온라인 교육 수료 → 워크넷 구직등록 → 고용센터 방문 순이에요. 방문 후 심사는 보통 14일 이내에 결과가 나와요."
      sourceBar={{ badge: "출처", name: "고용보험법 · 고용24", date: "2026.02 기준" }}
      stickyLabel="수급자격 신청"
      stickyValue="고용24"
      stickyBtn="수급자격 신청하기 →"
      stickyHref="https://www.work24.go.kr"
    >
      <TOC items={tocItems} />
      <Summary3
        items={[
          "수급자격 신청 순서는 온라인 교육 → 워크넷 구직등록 → 고용센터 방문이에요.",
          "고용센터 방문 후 심사는 보통 14일 이내에 결과가 나와요.",
          "수급자격 불인정 통보를 받으면 90일 이내에 심사청구로 이의신청이 가능해요.",
        ]}
      />

      {/* 체커 */}
      <div style={{ background: "#FFF", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>&#x2714;</div>
          <div>
            <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: 0 }}>내 수급자격 신청 단계는 어디까지?</h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 1, margin: 0 }}>등록 여부와 신청 여부로 다음 단계를 알려드려요</p>
          </div>
        </div>
        <div style={{ padding: "20px 18px" }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>1</span>
              워크넷 구직등록을 완료했나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="worknet" value="done" label="완료했어요" sel={sel} pick={pick} />
              <Btn group="worknet" value="pending" label="아직 안 했어요" sel={sel} pick={pick} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: C.t2, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, background: C.navy, color: "#fff", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>2</span>
              고용센터에서 수급자격을 신청했나요?
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <Btn group="applied" value="done" label="신청했어요" sel={sel} pick={pick} />
              <Btn group="applied" value="pending" label="아직 안 했어요" sel={sel} pick={pick} />
              <Btn group="applied" value="unsure" label="잘 모르겠어요" sel={sel} pick={pick} />
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
      <Sec n="SECTION 01" id="h2-1" title="실업급여 수급자격 신청은 어떻게 하나요?" sub="3단계 순서 안내">
        <P>
          <B>순서가 있어요.</B> 온라인 교육 수료 → 워크넷 구직등록 → 고용센터 방문 신청 순서예요.
          순서를 바꾸면 방문이 허탕이 될 수 있어요.
        </P>
        <P>
          1단계는 <A href="https://www.ei.go.kr">고용24</A>에서 수급자격 신청자 온라인 교육을
          수강하는 거예요. 약 1~2시간이고 퀴즈를 통과해야 이수가 완료돼요. 2단계는 워크넷에서
          구직등록을 하는 거예요.
        </P>
        <InlineLink icon="🎓" title="실업급여 온라인 교육 수강 방법" desc="고용24에서 1~2시간 수강 후 14일 이내 고용센터 방문해야 해요." href="/w/실업급여-교육" />
        <P>
          1단계와 2단계는 순서가 바뀌어도 무방하지만, 고용센터 방문 전에 둘 다 완료돼야 해요.
          고용센터에서는 두 가지 이수 여부를 방문 시 확인해요.
        </P>
        <TableTitle>수급자격 신청 단계별 절차</TableTitle>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr><THL>단계</THL><TH>내용</TH><TH>소요 시간</TH><TH>방법</TH></tr>
            </thead>
            <tbody>
              {[
                ["1단계", "온라인 교육 수료", "1~2시간", "고용24 접속"],
                ["2단계", "워크넷 구직등록", "10~20분", "워크넷 접속"],
                ["3단계", "고용센터 방문 신청", "30분~1시간", "관할 센터 방문"],
                ["4단계", "수급자격 심사", "14일 이내", "고용센터 심사"],
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
        <TableNote>※ 1단계와 2단계는 순서 무관, 3단계 전에 둘 다 완료 필수</TableNote>
        <P>
          쉽게 말하면, 온라인 두 가지 완료 → 고용센터 한 번 방문이에요. 방문 당일 완료할 수도
          있지만, 미리 해두면 대기 시간 없이 바로 신청할 수 있어요.
        </P>
      </Sec>

      <Divider />
      <Sec n="SECTION 02" id="h2-2" title="실업급여 수급자격 고용센터 방문 시 뭐가 필요한가요?" sub="4가지 준비물">
        <P>
          <B>4가지를 챙겨야 해요.</B> 신분증, 통장 사본, 이직확인서, 워크넷 구직등록 확인증이에요.
        </P>
        <P>
          신분증은 주민등록증, 운전면허증, 여권 중 하나예요. 통장 사본은 실업급여 입금받을 본인
          명의 계좌예요. 모바일 뱅킹 화면 캡처도 인정돼요.
        </P>
        <InlineLink icon="📝" title="실업급여 구비서류 전체 목록" desc="이직확인서·통장 사본 등 방문 전 준비물을 정리했어요." href="/w/실업급여-구비서류" />
        <P>
          이직확인서는 사업주가 고용24에 이미 신고했으면 지참 불필요해요. 방문 전 고용24에서
          처리 여부를 조회할 수 있어요. 워크넷 구직등록 확인증은 워크넷에서 출력하거나
          스마트폰 화면으로 대체 가능해요.
        </P>
        <P>
          사전 예약을 추천해요. 방문객이 많아서 당일 대기가 1~2시간 이상 걸릴 수 있어요. 고용24나
          전화(1350)로 예약하면 정해진 시간에 바로 상담받을 수 있어요.
        </P>
      </Sec>

      <Divider />
      <Sec n="SECTION 03" id="h2-3" title="실업급여 수급자격 심사 기간은 얼마나 걸리나요?" sub="심사 소요 기간">
        <P>
          <B>보통 14일 이내예요.</B> 방문 신청일로부터 14일 안에 수급자격 인정 여부가 결정돼요.
          결과는 고용24에서 조회하거나, 우편으로 통보받아요.
        </P>
        <P>
          심사 내용은 이직 사유 확인이에요. 비자발적 이직(권고사직, 계약 만료, 도산 등)인지
          판단해요. 사업주가 제출한 이직확인서 내용과 수급자 진술이 일치하는지 확인해요.
        </P>
        <Info type="warn">심사 중 고용센터 연락을 놓치면 안 돼요. 추가 서류나 진술을 요청받는 경우가 있어요. 고용24 알림을 켜두면 진행 상황을 놓치지 않아요.</Info>
        <BridgeCard
          q="방문 전에 수급자격 조건이 되는지 먼저 알아야 하지 않을까요?"
          a="피보험기간 180일 이상, 비자발적 퇴사가 기본 조건이에요. 자발적 퇴사도 11가지 예외 사유가 있어요."
          href="/w/실업급여-수급자격제한"
          label="수급자격 제한 사유 확인"
        />
        <P>
          심사 기간 중에는 별도로 연락이 오지 않는 게 일반적이에요. 걱정된다면 고용24에서
          직접 처리 현황을 조회할 수 있어요.
        </P>
      </Sec>

      <Divider />
      <Sec n="SECTION 04" id="h2-4" title="실업급여 수급자격 불인정되면 어떻게 되나요?" sub="이의신청 방법">
        <P>
          <B>이의신청이 가능해요.</B> 불인정 통보를 받은 날로부터 90일 이내에 고용보험 심사위원회에
          심사청구를 할 수 있어요. <A href="https://www.ei.go.kr">고용24</A>에서 온라인으로 하거나,
          관할 고용센터에 서면으로 제출하면 돼요.
        </P>
        <P>
          불인정 이유는 통보문에 명시돼요. 주로 자발적 퇴사로 판단됐거나, 이직확인서 내용과
          진술이 다른 경우예요. 반박할 수 있는 증거(문자, 이메일, 녹음 등)를 준비하면 심사청구에
          유리해요.
        </P>
        <Info type="warn">이의신청 기간은 90일이에요. 불인정 통보를 받은 날부터 계산해요. 기간이 지나면 이의신청이 불가능하므로 빠르게 처리하는 게 좋아요.</Info>
        <P>
          심사청구 결과도 불복한다면 재심사청구를 할 수 있어요. 고용보험 심사관의 결정에 불복하면
          고용보험심판위원회에 재심사청구(90일 이내)를 할 수 있어요. 그래도 안 되면 행정소송으로
          가는 경우도 있어요.
        </P>
        <SpokeLink num="01" title="실업급여 수급자격 제한 사유" desc="자발적 퇴사 예외 인정 11가지" href="/w/실업급여-수급자격제한" />
        <SpokeLink num="02" title="실업급여 온라인 교육 수강 방법" desc="14일 이내 고용센터 방문 기한" href="/w/실업급여-교육" />
        <SpokeLink num="03" title="실업급여 구비서류 목록" desc="이직확인서·통장 사본 준비법" href="/w/실업급여-구비서류" />
      </Sec>

      <ExtBtn
        href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePbPersonBnefMain.do"
        badge="고용24 공식"
        text="실업급여 수급자격 신청 안내"
        cta="신청하기"
      />

      <PrevNext
        prev={{ title: "실업급여 온라인 교육 수강 방법", href: "/w/실업급여-교육" }}
        next={{ title: "실업급여 수급자격 제한 사유", href: "/w/실업급여-수급자격제한" }}
      />
      <FAQAccordion items={META.faq} />
      <RelatedArticles
        items={[
          { title: "실업급여 수급자격 제한 사유", href: "/w/실업급여-수급자격제한", desc: "자발적 퇴사 예외 인정 조건" },
          { title: "실업급여 온라인 교육 수강 방법", href: "/w/실업급여-교육", desc: "14일 이내 고용센터 방문 기한" },
          { title: "실업급여 구비서류 목록", href: "/w/실업급여-구비서류", desc: "고용센터 방문 전 준비물" },
        ]}
      />
    </BlogLayout>
  );
}
