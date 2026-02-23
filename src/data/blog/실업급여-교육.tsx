"use client";
import { useState } from "react";
import {
  BlogLayout,
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
} from "@/components/wiki/BlogShared";

type Sel = { edu?: string; visit?: string };
type ResLink = { icon: "link" | "search"; title: string; desc: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; links: ResLink[] };

const META = {
  title: "실업급여 온라인 교육 수강 방법 | 고용센터 방문 기한 및 절차",
  description:
    "고용24에서 수급자격 신청자 온라인 교육을 먼저 수강해야 해요. 교육 수료 후 14일 이내에 관할 고용센터를 방문해야 수급자격 신청이 돼요.",
  keywords: ["실업급여 온라인 교육", "수강 방법", "14일 기한", "고용센터 방문"],
  ogTitle: "실업급여 온라인 교육 수강 방법 | 머니위키",
  ogDescription: "온라인 교육 수강 방법과 14일 이내 고용센터 방문 절차를 정리했어요.",
  datePublished: "2026-02-23",
  lastUpdated: "2026-02-23",
  category: "실업급여",
  faq: [
    {
      question: "실업급여 온라인 교육을 안 들으면 어떻게 되나요?",
      answer:
        "교육을 수강하지 않으면 수급자격 신청이 불가능해요. 고용센터 방문 전에 반드시 교육을 완료해야 해요. 교육을 듣지 않으면 고용센터 방문이 소용없어요.",
    },
    {
      question: "실업급여 온라인 교육을 이미 들었는데 또 들어야 하나요?",
      answer:
        "한 번만 들으면 돼요. 이전에 실업급여를 받은 적이 있어도 같은 계정으로 로그인하면 이수 이력이 유지돼요. 다만 수급자격 신청 기간이 지나면 다시 들어야 할 수 있어요.",
    },
  ],
};

export default function Article66() {
  const [sel, setSel] = useState<Sel>({});

  function getResult(): Res {
    const { edu, visit } = sel;

    if (edu === "done" && visit === "done")
      return {
        pass: true,
        headline: "수급자격 신청 완료예요",
        detail:
          "교육도 완료하고 고용센터도 방문했으면 수급자격 심사가 진행 중이에요. 심사 결과는 보통 14일 이내에 나와요.",
        badges: ["신청 완료"],
        links: [{ icon: "search", title: "수급자격 심사 결과 조회", desc: "고용24에서 진행 상태 확인", href: "https://www.ei.go.kr" }],
      };

    if (edu === "done" && visit === "pending")
      return {
        pass: false,
        headline: "14일 이내에 고용센터를 방문하세요",
        detail:
          "교육은 완료됐어요. 이제 14일 이내에 관할 고용센터를 방문해서 수급자격을 신청해야 해요. 신분증과 이직확인서 사본을 지참하면 돼요.",
        badges: ["고용센터 방문 필요"],
        links: [{ icon: "link", title: "관할 고용센터 찾기", desc: "주소지 기준 센터 조회", href: "https://www.ei.go.kr" }],
      };

    if (edu === "pending" && visit === "pending")
      return {
        pass: false,
        headline: "온라인 교육부터 수강하세요",
        detail:
          "고용24에서 수급자격 신청자 교육을 먼저 수강해야 해요. 교육 완료 후 14일 이내에 고용센터를 방문해야 수급자격을 신청할 수 있어요.",
        badges: ["교육 수강 필요"],
        links: [{ icon: "link", title: "고용24 온라인 교육", desc: "수급자격 신청자 교육 수강", href: "https://www.ei.go.kr" }],
      };

    if (edu === "pending" && visit === "done")
      return {
        pass: false,
        headline: "교육 미수강으로 신청이 안 됐을 거예요",
        detail:
          "교육을 먼저 수강하지 않으면 수급자격 신청이 불가능해요. 고용24에서 교육을 완료한 후 다시 고용센터를 방문해야 해요.",
        badges: ["교육 수강 필요"],
        links: [{ icon: "link", title: "고용24 온라인 교육", desc: "수급자격 신청자 교육 수강", href: "https://www.ei.go.kr" }],
      };

    return {
      pass: false,
      headline: "진행 상태를 선택해 주세요",
      detail: "교육 수강 여부와 방문 여부를 선택하면 다음 단계를 알려드려요.",
      badges: [],
      links: [],
    };
  }

  const res = getResult();

  const tocItems = [
    { t: "실업급여 온라인 교육은 필수인가요?", sub: null },
    { t: "실업급여 온라인 교육 수강 방법은 어떻게 되나요?", sub: null },
    { t: "실업급여 온라인 교육 후 14일 기한은 뭐예요?", sub: null },
    { t: "실업급여 온라인 교육 후 고용센터 방문은 어떻게 하나요?", sub: null },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "온라인 교육"]}
      tags={["2026년 기준", "실업급여", "온라인 교육", "고용센터 방문"]}
      date="2026-02-23"
      title="실업급여 온라인 교육 수강 방법 | 고용센터 방문 기한 및 절차"
      description="고용24에서 수급자격 신청자 온라인 교육을 먼저 수강해야 해요. 교육 수료 후 14일 이내에 관할 고용센터를 방문해야 수급자격 신청이 돼요."
      sourceBar={{ badge: "출처", name: "고용보험법 · 고용24", date: "2026.02 기준" }}
      stickyLabel="온라인 교육"
      stickyValue="고용24"
      stickyBtn="교육 수강하기 →"
      stickyHref="https://www.work24.go.kr"
    >
      <TOC items={tocItems} />
      <Summary3
        items={[
          "실업급여 신청 전 고용24에서 수급자격 신청자 온라인 교육을 반드시 수강해야 해요.",
          "교육 수료 후 14일 이내에 관할 고용센터를 방문해서 수급자격을 신청해야 해요.",
          "교육 수강 시간은 약 1~2시간이고, 고용24 로그인 후 언제든 가능해요.",
        ]}
      />

      {/* 체커 */}
      <div className="checker-wrap">
        <div className="checker-card">
          <div className="ck-header">
            <strong className="ck-title">내 온라인 교육 진행 상태는?</strong>
            <span className="ck-sub">30초 확인</span>
          </div>
          <p className="ck-intro">교육 수강 여부와 고용센터 방문 여부만 알면 다음 단계가 뭔지 바로 알려드려요.</p>

          <div className="ck-group">
            <p className="ck-q">수급자격 신청자 온라인 교육을 수강했나요?</p>
            <div className="ck-opts">
              {[
                { v: "done", t: "완료했어요" },
                { v: "pending", t: "아직 안 했어요" },
              ].map((o) => (
                <button
                  key={o.v}
                  className={`ck-opt${sel.edu === o.v ? " on" : ""}`}
                  onClick={() => setSel((p) => ({ ...p, edu: o.v }))}
                >
                  {o.t}
                </button>
              ))}
            </div>
          </div>

          <div className="ck-group">
            <p className="ck-q">고용센터를 방문했나요?</p>
            <div className="ck-opts">
              {[
                { v: "done", t: "방문했어요" },
                { v: "pending", t: "아직 안 갔어요" },
              ].map((o) => (
                <button
                  key={o.v}
                  className={`ck-opt${sel.visit === o.v ? " on" : ""}`}
                  onClick={() => setSel((p) => ({ ...p, visit: o.v }))}
                >
                  {o.t}
                </button>
              ))}
            </div>
          </div>

          {Object.keys(sel).length >= 1 && (
            <div className={`ck-res ${res.pass ? "ok" : "ng"}`}>
              <p className="ck-headline">{res.headline}</p>
              <p className="ck-detail">{res.detail}</p>
              {res.badges.length > 0 && (
                <div className="ck-badges">
                  {res.badges.map((b) => (
                    <span key={b} className="ck-badge">
                      {b}
                    </span>
                  ))}
                </div>
              )}
              {res.links.map((l) => (
                <a key={l.href} href={l.href} className="ck-link">
                  <span className="ck-lt">{l.title}</span>
                  <span className="ck-ld">{l.desc}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <Sec id="h2-1" question="실업급여 온라인 교육은 필수인가요?">
        <P>
          <B>필수예요.</B> <A href="https://www.law.go.kr/법령/고용보험법시행규칙">고용보험법 시행규칙</A>에
          따라 수급자격 신청 전 교육 수강이 의무화돼 있어요. 교육을 수료하지 않으면 수급자격 신청
          자체가 안 돼요.
        </P>
        <P>
          교육 목적은 두 가지예요. 실업급여 수급 절차와 의무사항을 미리 알려주는 것, 그리고 부정수급
          예방이에요. 교육 내용은 실업인정 주기, 구직활동 기준, 부정수급 처벌 등이에요.
        </P>
        <InlineLink href="/w/실업급여-수급자격-인정" label="수급자격 신청 절차 전 과정" />
        <P>
          교육 시간은 약 1~2시간이에요. 한 번에 다 듣지 않아도 돼요. 일시정지하고 나중에 이어서
          들을 수 있어요. 고용24에 로그인만 되어 있으면 PC, 스마트폰, 태블릿 어디서든 수강할 수 있어요.
        </P>
        <P>
          고용센터 방문 전에 반드시 고용24에서 교육을 먼저 완료해야 해요. 교육 미수료 상태로
          방문하면 그날 접수가 안 될 수 있어요.
        </P>
      </Sec>

      <Sec id="h2-2" question="실업급여 온라인 교육 수강 방법은 어떻게 되나요?">
        <P>
          수강 절차는 <B>4단계</B>예요. 고용24 로그인 → 수급자격 신청자 교육 동영상 시청 →
          퀴즈 풀기 → 이수증 발급 확인 순이에요.
        </P>
        <P>
          동영상 시청 후 간단한 퀴즈를 풀어야 이수가 완료돼요. 퀴즈 점수가 기준에 미달하면
          재응시해야 해요. 이수증은 고용24에서 언제든지 다시 출력할 수 있어요.
        </P>
        <InlineLink href="/w/실업급여-구비서류" label="고용센터 방문 시 준비물 목록" />
        <P>
          실업급여를 처음 신청하는 분은 수급자격 신청자 교육을 들으면 돼요. 재수급자(이전에
          실업급여를 받은 적 있는 분)는 교육 이수 이력이 남아 있으면 생략할 수 있는 경우도 있어요.
        </P>
        <P>
          로그인은 공동인증서나 카카오·네이버 간편인증으로 할 수 있어요. 고용24 앱을 스마트폰에
          설치하면 이동 중에도 수강할 수 있어서 편해요.
        </P>
      </Sec>

      <Sec id="h2-3" question="실업급여 온라인 교육 후 14일 기한은 뭐예요?">
        <P>
          <B>교육 수료 후 14일 이내에 관할 고용센터를 방문해서 수급자격을 신청해야 해요.</B> 이
          기한을 넘기면 신청이 늦어질 수 있어요.
        </P>
        <P>
          14일 기한이 중요한 이유가 있어요. 실업급여 수급자격 신청은 교육 수료 후 빠를수록 유리해요.
          신청이 늦어질수록 대기기간(7일)과 첫 실업인정일이 뒤로 밀려서 첫 지급일이 늦어져요.
        </P>
        <P>
          수급기간(퇴직 후 12개월)도 고려해야 해요. 신청을 미루다 보면 수급기간이 줄어들어요.
          퇴직 후 1~2주 안에 교육을 수강하고 바로 고용센터를 방문하는 게 좋아요.
        </P>
        <BridgeCard
          q="고용센터 방문 후 심사 절차가 어떻게 되는지 궁금하시죠?"
          a="수급자격 심사 기간과 불인정 시 이의신청 방법을 알려드려요. 방문부터 첫 지급까지 전 과정을 정리했어요."
          href="/w/실업급여-수급자격-인정"
          label="수급자격 신청 절차 보기"
        />
        <P>
          퇴직 후 12개월 안에만 신청하면 되니까 여유가 있다고 생각할 수 있어요. 하지만 실제로
          받을 수 있는 기간이 줄어들기 때문에 빨리 신청하는 게 유리해요.
        </P>
      </Sec>

      <Sec id="h2-4" question="실업급여 온라인 교육 후 고용센터 방문은 어떻게 하나요?">
        <P>
          교육 이수 후 주소지 관할 고용센터에 방문하면 돼요.{" "}
          <A href="https://www.ei.go.kr">고용24</A>에서 고용센터 찾기 메뉴로 관할 센터를
          검색할 수 있어요.
        </P>
        <P>
          방문 시 지참 서류가 있어요. 신분증, 이직확인서 사본(사업주가 이미 신고했으면 생략 가능),
          통장 사본, 워크넷 구직등록 확인증이 필요해요. 워크넷 구직등록은 방문 전에 미리 해야 해요.
        </P>
        <Info>고용24나 전화(1350)로 사전 예약하면 대기 없이 바로 상담받을 수 있어요. 요즘 고용센터는 붐벼서 당일 대기가 1시간 이상 걸리는 경우가 많아요.</Info>
        <P>
          방문하면 상담사와 면담 후 수급자격 심사가 접수돼요. 심사 기간은 보통 14일 이내예요.
          결과가 나오면 첫 실업인정일이 지정되고, 그때부터 실업인정을 받아서 급여를 받을 수 있어요.
        </P>
        <SpokeLink href="/w/실업급여-수급자격-인정" title="실업급여 수급자격 신청 절차" desc="고용센터 방문부터 첫 지급까지" />
        <SpokeLink href="/w/실업급여-구비서류" title="실업급여 구비서류 목록" desc="이직확인서·통장 사본 준비법" />
      </Sec>

      <ExtBtn
        href="https://www.ei.go.kr"
        badge="고용24 공식"
        text="수급자격 신청자 온라인 교육 수강"
        cta="수강하기"
      />

      <PrevNext
        prev={{ title: "실업급여 수급유예 신청 방법", href: "/w/실업급여-수급유예" }}
        next={{ title: "실업급여 수급자격 신청 절차", href: "/w/실업급여-수급자격-인정" }}
      />
      <FAQAccordion items={META.faq} />
      <RelatedArticles
        items={[
          { title: "실업급여 수급자격 신청 절차", href: "/w/실업급여-수급자격-인정", desc: "고용센터 방문 및 심사 기간" },
          { title: "실업급여 구비서류 목록", href: "/w/실업급여-구비서류", desc: "이직확인서·통장 사본 준비법" },
          { title: "실업급여 수급유예 신청 방법", href: "/w/실업급여-수급유예", desc: "질병·출산 시 최대 4년 연장" },
        ]}
      />
    </BlogLayout>
  );
}
