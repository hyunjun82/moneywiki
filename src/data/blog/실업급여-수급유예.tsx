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

type Sel = { reason?: string; period?: string };
type ResLink = { icon: "link" | "search"; title: string; desc: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; links: ResLink[] };

const META = {
  title: "실업급여 수급유예 신청 방법 | 질병 출산 최대 4년 연장 조건",
  description:
    "질병이나 출산으로 실업급여를 최대 4년까지 연장할 수 있어요. 수급유예 신청 방법과 인정 사유, 4년 계산법을 정리했어요.",
  keywords: ["실업급여 수급유예", "신청 방법", "질병 출산", "최대 4년 연장"],
  ogTitle: "실업급여 수급유예 신청 방법 | 머니위키",
  ogDescription: "질병·출산 시 수급유예 신청 방법과 최대 4년 연장 계산법을 정리했어요.",
  datePublished: "2026-02-23",
  lastUpdated: "2026-02-23",
  category: "실업급여",
  faq: [
    {
      question: "실업급여 수급유예를 신청하면 수급기간이 어떻게 달라지나요?",
      answer:
        "원래 퇴직 후 12개월이 수급기간인데, 수급유예 사유가 인정된 기간만큼 연장돼요. 최대 4년까지 늘어날 수 있어요. 예를 들어 출산으로 1년 유예하면 수급기간이 2년으로 연장돼요.",
    },
    {
      question: "실업급여 수급유예 중에 구직활동을 해야 하나요?",
      answer:
        "아니에요. 수급유예 사유가 해소될 때까지 구직활동 의무가 없어요. 사유가 없어진 후 고용센터에 신고하면 남은 급여일수만큼 수급을 재개할 수 있어요.",
    },
  ],
};

export default function Article65() {
  const [sel, setSel] = useState<Sel>({});

  function getResult(): Res {
    const { reason, period } = sel;

    if (reason === "illness" && period === "valid")
      return {
        pass: true,
        headline: "수급유예 신청이 가능해요",
        detail:
          "질병·부상으로 구직활동이 어려우면 수급유예 대상이에요. 수급기간 내에 고용센터에서 신청하세요. 의사 소견서나 진단서가 필요해요.",
        badges: ["신청 가능", "진단서 준비"],
        links: [{ icon: "link", title: "고용24 수급유예 신청", desc: "온라인으로 수급기간 연장", href: "https://www.ei.go.kr" }],
      };

    if (reason === "birth" && period === "valid")
      return {
        pass: true,
        headline: "수급유예 신청이 가능해요",
        detail:
          "임신, 출산, 3세 이하 자녀 육아는 수급유예 대상이에요. 출산 예정일 또는 자녀 나이를 확인하고 수급기간 내에 신청하세요. 출생증명서나 임신확인서가 필요해요.",
        badges: ["신청 가능"],
        links: [{ icon: "link", title: "고용24 수급유예 신청", desc: "온라인으로 수급기간 연장", href: "https://www.ei.go.kr" }],
      };

    if (reason === "spouse" && period === "valid")
      return {
        pass: true,
        headline: "수급유예 신청이 가능해요",
        detail:
          "배우자의 해외 발령 등으로 동반 출국하는 경우도 수급유예 대상이에요. 배우자의 파견 발령서 등 증빙이 필요해요.",
        badges: ["신청 가능", "증빙 준비"],
        links: [{ icon: "link", title: "고용24 수급유예 신청", desc: "온라인으로 수급기간 연장", href: "https://www.ei.go.kr" }],
      };

    if (reason === "none" && period === "valid")
      return {
        pass: false,
        headline: "수급유예 대상이 아니에요",
        detail:
          "수급유예는 구직활동이 불가한 특별한 사유가 있을 때만 가능해요. 해당 사유가 없으면 수급기간 내에 실업인정을 받아서 급여를 수령하세요.",
        badges: ["해당 없음"],
        links: [],
      };

    if ((reason === "illness" || reason === "birth" || reason === "spouse" || reason === "none") && period === "expired")
      return {
        pass: false,
        headline: "수급기간이 만료됐어요",
        detail:
          "수급기간(퇴직 후 12개월)이 지나면 수급유예를 신청할 수 없어요. 수급유예는 수급기간이 남아 있을 때 미리 신청해야 해요.",
        badges: ["수급기간 만료"],
        links: [],
      };

    return {
      pass: false,
      headline: "조건을 선택해 주세요",
      detail: "구직 불가 사유와 수급기간 여부를 선택하면 바로 안내해 드려요.",
      badges: [],
      links: [],
    };
  }

  const res = getResult();

  const tocItems = [
    { t: "실업급여 수급유예는 무엇인가요?", sub: null },
    { t: "실업급여 수급유예 신청은 어떻게 하나요?", sub: null },
    { t: "실업급여 수급유예 질병 출산 조건은 뭐예요?", sub: null },
    { t: "실업급여 수급유예 최대 4년 연장은 어떻게 계산하나요?", sub: null },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "수급유예"]}
      tags={["2026년 기준", "실업급여", "수급유예", "4년 연장"]}
      date="2026-02-23"
      title="실업급여 수급유예 신청 방법 | 질병 출산 최대 4년 연장 조건"
      description="질병이나 출산으로 실업급여를 최대 4년까지 연장할 수 있어요. 수급유예 신청 방법과 인정 사유, 4년 계산법을 정리했어요."
      sourceBar={{ badge: "출처", name: "고용보험법 · 고용24", date: "2026.02 기준" }}
      stickyLabel="수급유예 신청"
      stickyValue="고용센터"
      stickyBtn="관할 센터 찾기 →"
      stickyHref="https://www.ei.go.kr"
    >
      <TOC items={tocItems} />
      <Summary3
        items={[
          "질병, 출산, 육아 등 구직활동이 불가한 사유 발생 시 수급기간을 최대 4년까지 연장할 수 있어요.",
          "수급유예는 수급기간(퇴직 후 12개월)이 지나기 전에 신청해야 해요.",
          "고용24 온라인 또는 관할 고용센터 방문으로 신청하면 돼요.",
        ]}
      />

      {/* 체커 */}
      <div className="checker-wrap">
        <div className="checker-card">
          <div className="ck-header">
            <strong className="ck-title">수급유예 신청이 가능할까요?</strong>
            <span className="ck-sub">30초 확인</span>
          </div>
          <p className="ck-intro">사유와 수급기간 잔여 여부만 알면 바로 판정돼요.</p>

          <div className="ck-group">
            <p className="ck-q">구직활동이 어려운 사유가 있나요?</p>
            <div className="ck-opts">
              {[
                { v: "illness", t: "질병이나 부상이 있어요" },
                { v: "birth", t: "임신, 출산, 3세 이하 육아예요" },
                { v: "spouse", t: "배우자 동반 출국이 예정됐어요" },
                { v: "none", t: "해당 사유가 없어요" },
              ].map((o) => (
                <button
                  key={o.v}
                  className={`ck-opt${sel.reason === o.v ? " on" : ""}`}
                  onClick={() => setSel((p) => ({ ...p, reason: o.v }))}
                >
                  {o.t}
                </button>
              ))}
            </div>
          </div>

          <div className="ck-group">
            <p className="ck-q">퇴직 후 12개월(수급기간)이 지났나요?</p>
            <div className="ck-opts">
              {[
                { v: "valid", t: "아직 12개월 내예요" },
                { v: "expired", t: "12개월이 지났어요" },
              ].map((o) => (
                <button
                  key={o.v}
                  className={`ck-opt${sel.period === o.v ? " on" : ""}`}
                  onClick={() => setSel((p) => ({ ...p, period: o.v }))}
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

      <Sec id="h2-1" question="실업급여 수급유예는 무엇인가요?">
        <P>
          <B>수급유예는 실업급여 수급기간을 일시적으로 멈추는 제도예요.</B> 구직활동이 불가능한
          특별한 사유가 생겼을 때, 수급기간을 그 기간만큼 연장해 주는 거예요.
        </P>
        <P>
          원래 수급기간은 퇴직일부터 12개월이에요. 이 12개월 안에 소정급여일수를 모두 써야 해요.
          하지만 출산이나 질병으로 구직활동을 못 하면 12개월이 그냥 지나가 버려요. 수급유예는
          이를 막기 위한 제도예요.
        </P>
        <InlineLink href="/w/실업급여-수급기간-몇개월-받나요" label="실업급여 수급기간 계산 방법" />
        <P>
          <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 제48조</A>에서 질병, 출산,
          육아 등 구직활동이 어려운 사유가 생기면 수급기간을 최대 4년까지 연장할 수 있도록
          정하고 있어요.
        </P>
        <P>
          쉽게 말하면, 사유 기간만큼 수급 시계가 멈추는 것이에요. 회복 후 다시 시작되고,
          남은 급여일수를 그대로 받을 수 있어요.
        </P>
      </Sec>

      <Sec id="h2-2" question="실업급여 수급유예 신청은 어떻게 하나요?">
        <P>
          <A href="https://www.ei.go.kr">고용24</A>에서 온라인으로 신청하거나 관할 고용센터에
          방문해서 신청할 수 있어요. 온라인 신청이 더 편해요.
        </P>
        <P>
          온라인 신청 절차는 이래요. 고용24 로그인 → 수급자격자 서비스 → 수급기간 연장 신청 →
          사유 선택 및 증빙서류 업로드 → 제출이에요. 증빙서류는 사유에 따라 다른데, 질병이면
          진단서, 출산이면 출생증명서, 육아이면 가족관계증명서가 필요해요.
        </P>
        <InlineLink href="/w/실업급여-수급자격-인정" label="고용센터 방문 신청 절차" />
        <P>
          신청 시기가 중요해요. 수급기간이 지나기 전에 신청해야 해요. 퇴직 후 12개월이 지난 뒤에
          신청하면 안 돼요. 사유가 발생하면 최대한 빨리 신청하는 게 좋아요.
        </P>
        <P>
          고용센터에서 신청 내용을 검토하고 수급기간 연장을 승인하면, 사유가 해소될 때까지
          수급기간이 정지돼요. 사유 해소 후 다시 고용센터에 신고하면 수급을 재개할 수 있어요.
        </P>
      </Sec>

      <Sec id="h2-3" question="실업급여 수급유예 질병 출산 조건은 뭐예요?">
        <P>
          수급유예 사유는{" "}
          <A href="https://www.law.go.kr/법령/고용보험법">고용보험법 시행령</A>에서 구체적으로
          정하고 있어요. 대표적인 인정 사유예요.
        </P>
        <P>
          질병·부상의 경우 단순 감기 수준은 안 되고, 30일 이상 구직활동이 어렵다는 의사 소견서가
          있어야 해요. 출산의 경우 출산 전후 일정 기간이 자동으로 인정돼요. 3세 이하 육아는
          어린이집·유치원을 이용하지 않고 직접 양육하는 경우에 인정돼요.
        </P>
        <P>
          배우자 동반 출국의 경우, 배우자가 해외로 파견 발령을 받은 경우에 한해 인정돼요.
          배우자의 파견 발령서 등 공식 증빙이 필요해요.
        </P>
        <BridgeCard
          q="내 소정급여일수와 수급기간이 얼마나 되는지 궁금하시죠?"
          a="수급유예로 연장하더라도 원래 소정급여일수는 변하지 않아요. 나이와 가입기간으로 정해지는 소정급여일수를 먼저 확인해 보세요."
          href="/w/실업급여-수급기간-몇개월-받나요"
          label="수급기간 기준표 보기"
        />
        <P>
          사유가 여러 개 겹친다면 각 사유 기간을 합산할 수 있어요. 출산 후 육아까지 이어지면
          출산 기간 + 육아 기간을 합쳐서 연장이 인정될 수 있어요.
        </P>
      </Sec>

      <Sec id="h2-4" question="실업급여 수급유예 최대 4년 연장은 어떻게 계산하나요?">
        <P>
          수급유예 기간은 원래 수급기간(12개월)에 더해지는 방식이에요. <B>최대 연장 기간은 원래
          수급기간을 합쳐 총 4년(48개월)</B>이에요.
        </P>
        <P>
          예를 들어 볼게요. 퇴직 후 3개월간 수급하다가 출산으로 2년 수급유예 신청이 승인됐다면,
          수급기간이 12개월 → 12 + 24 = 36개월로 연장돼요. 나머지 소정급여일수를 그 36개월
          안에 사용하면 돼요.
        </P>
        <Info>수급유예 기간이 4년을 초과하더라도 최대 4년(48개월)이 한도예요. 사유가 아무리 길어도 4년까지만 인정돼요.</Info>
        <P>
          수급유예가 끝난 뒤에는 고용센터에 사유 해소 신고를 해야 해요. 신고 후 2~3주 내에
          구직급여 수급이 재개돼요. 사유 해소 신고를 잊어버리면 수급기간이 그냥 흘러가니 빠르게
          신고하는 게 중요해요.
        </P>
        <SpokeLink href="/w/실업급여-수급기간-몇개월-받나요" title="실업급여 수급기간 몇개월" desc="퇴직 후 12개월 신청 기한 계산" />
        <SpokeLink href="/w/실업급여-해외체류" title="실업급여 해외여행 가능 여부" desc="해외체류 수급 중단 재개 방법" />
      </Sec>

      <ExtBtn
        href="https://www.ei.go.kr"
        badge="고용24 공식"
        text="실업급여 수급유예 신청"
        cta="신청하기"
      />

      <PrevNext
        prev={{ title: "실업급여 해외여행 가능 여부", href: "/w/실업급여-해외체류" }}
        next={{ title: "실업급여 온라인 교육 수강 방법", href: "/w/실업급여-교육" }}
      />
      <FAQAccordion items={META.faq} />
      <RelatedArticles
        items={[
          { title: "실업급여 수급기간 몇개월", href: "/w/실업급여-수급기간-몇개월-받나요", desc: "퇴직 후 12개월 기한 계산" },
          { title: "실업급여 해외여행 가능 여부", href: "/w/실업급여-해외체류", desc: "42일 기준 수급 중단 재개" },
          { title: "실업급여 수급자격 신청 절차", href: "/w/실업급여-수급자격-인정", desc: "고용센터 방문 및 심사 기간" },
        ]}
      />
    </BlogLayout>
  );
}
