"use client";
import { useState } from "react";
import BlogLayout from "@/components/wiki/BlogLayout";
import {
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

type Sel = { timing?: string; notice?: string };
type ResLink = { icon: "link" | "search"; title: string; desc: string; href: string };
type Res = { pass: boolean; headline: string; detail: string; badges: string[]; links: ResLink[] };

const META = {
  title: "실업급여 해외여행 가능 여부 | 해외체류 수급 중단 재개 방법",
  description:
    "실업급여 수급 중 해외여행은 가능해요. 출국 기간 중에는 급여가 정지되고 귀국 후 재개돼요. 수급 공백 없이 다녀올 수 있는 실무 기준 42일 계산법을 정리했어요.",
  keywords: ["실업급여 해외체류", "출국 가능 여부", "42일 기준", "수급 중단 재개"],
  ogTitle: "실업급여 해외여행 가능 여부 | 머니위키",
  ogDescription: "해외체류 시 수급 중단 조건과 42일 기준, 귀국 후 재개 방법을 정리했어요.",
  datePublished: "2026-02-23",
  lastUpdated: "2026-02-23",
  category: "실업급여",
  faq: [
    {
      question: "실업급여 해외체류 중 온라인으로 실업인정 신청하면 되는 거 아닌가요?",
      answer:
        "안 돼요. 해외에서 우회 접속 등으로 온라인 실업인정을 신청하면 부정수급으로 간주돼요. 이미 지급된 실업급여 환수 + 추가 징수 처분을 받을 수 있어요.",
    },
    {
      question: "실업급여 해외체류 기간이 길어지면 수급자격이 완전히 사라지나요?",
      answer:
        "수급기간(퇴직 후 12개월) 내에 귀국하면 남은 급여일수만큼 수급을 재개할 수 있어요. 단, 해외 체류 기간은 수급일수에 포함되지 않으니 수급기간이 촉박해질 수 있어요.",
    },
  ],
};

export default function Article63() {
  const [sel, setSel] = useState<Sel>({});

  function getResult(): Res {
    const { timing, notice } = sel;

    if (timing === "before" && notice === "yes")
      return {
        pass: true,
        headline: "문제없어요",
        detail:
          "실업인정일 전에 귀국하고 사전에 알렸으면 정상적으로 수급할 수 있어요. 귀국 후 실업인정일에 정상 신청하면 돼요.",
        badges: ["정상 수급"],
        links: [],
      };

    if (timing === "before" && notice === "no")
      return {
        pass: true,
        headline: "문제없지만 사전 안내를 권장해요",
        detail:
          "실업인정일 전 귀국하면 급여 수령에는 문제없어요. 다만 장기 해외 체류 시 고용센터에 미리 알려두면 나중에 문제가 생길 소지가 줄어요.",
        badges: ["정상 수급"],
        links: [],
      };

    if (timing === "miss" && notice === "yes")
      return {
        pass: false,
        headline: "귀국 후 14일 이내 실업인정일 변경 신청하세요",
        detail:
          "실업인정일에 귀국하지 못하면 귀국 후 14일 이내에 고용센터에 출석해 실업인정일 변경을 신청해야 해요. 이 기한을 넘기면 해당 실업인정 기간의 급여를 받을 수 없어요.",
        badges: ["변경 신청 필요"],
        links: [{ icon: "link", title: "관할 고용센터 찾기", desc: "귀국 후 방문할 센터 조회", href: "/w/실업급여-수급자격-인정" }],
      };

    if (timing === "miss" && notice === "no")
      return {
        pass: false,
        headline: "귀국 후 즉시 고용센터에 연락하세요",
        detail:
          "실업인정일을 놓쳤으면 귀국 후 14일 이내에 고용센터에 출석해 실업인정일 변경을 신청해야 해요. 기한 내에 신청하지 않으면 해당 기간 급여를 못 받아요.",
        badges: ["변경 신청 필요", "14일 기한"],
        links: [{ icon: "link", title: "고용24 실업인정", desc: "귀국 후 실업인정 절차 확인", href: "https://www.ei.go.kr" }],
      };

    if (timing === "long" && notice === "yes")
      return {
        pass: false,
        headline: "수급기간 내 귀국 여부가 핵심이에요",
        detail:
          "해외 체류 기간은 수급일수에 포함되지 않아요. 퇴직 후 12개월 내에 귀국하면 남은 급여일수만큼 받을 수 있어요. 12개월을 초과하면 잔여 급여를 받을 수 없으니 일정을 잘 계산하세요.",
        badges: ["수급기간 주의"],
        links: [{ icon: "search", title: "수급기간 계산", desc: "내 수급 종료일 확인", href: "https://www.ei.go.kr" }],
      };

    if (timing === "long" && notice === "no")
      return {
        pass: false,
        headline: "수급기간 내 귀국 여부가 핵심이에요",
        detail:
          "장기 해외 체류 시 퇴직 후 12개월이라는 수급기간이 지나면 잔여 급여를 받을 수 없어요. 고용센터에 상황을 알리고 수급유예 가능 여부를 상담해 보세요.",
        badges: ["수급기간 주의", "고용센터 상담 필요"],
        links: [{ icon: "link", title: "수급유예 신청 방법", desc: "수급기간 연장 가능 여부 확인", href: "/w/실업급여-수급유예" }],
      };

    return {
      pass: false,
      headline: "조건을 선택해 주세요",
      detail: "출국 일정과 실업인정일 관계를 선택하면 바로 안내해 드려요.",
      badges: [],
      links: [],
    };
  }

  const res = getResult();

  const tocItems = [
    { id: "h2-1", label: "실업급여 수급 중 해외여행 가도 되나요?" },
    { id: "h2-2", label: "실업급여 해외체류 42일 기준은 어떻게 계산하나요?" },
    { id: "h2-3", label: "실업급여 해외체류 시 수급 중단은 어떻게 되나요?" },
    { id: "h2-4", label: "실업급여 해외체류 후 수급 재개 조건은 뭐예요?" },
  ];

  return (
    <BlogLayout meta={META}>
      <TOC items={tocItems} />
      <Summary3
        items={[
          "해외체류 자체는 금지되지 않지만, 체류 중에는 실업인정을 받을 수 없어 급여가 지급되지 않아요.",
          "실업인정 주기(28일) + 변경 여유(14일) = 42일이 수급 공백 없이 다녀올 수 있는 실무 기준이에요.",
          "수급기간(퇴직 후 12개월) 내에 귀국해야 남은 급여일수를 그대로 받을 수 있어요.",
        ]}
      />

      {/* 체커 */}
      <div className="checker-wrap">
        <div className="checker-card">
          <div className="ck-header">
            <strong className="ck-title">해외 출국, 수급에 문제없나요?</strong>
            <span className="ck-sub">30초 확인</span>
          </div>
          <p className="ck-intro">출국 일정과 실업인정일 관계만 알면 바로 판정돼요.</p>

          <div className="ck-group">
            <p className="ck-q">출국 기간과 실업인정일의 관계가 어떻게 되나요?</p>
            <div className="ck-opts">
              {[
                { v: "before", t: "실업인정일 전에 귀국해요" },
                { v: "miss", t: "실업인정일에 해외에 있어요" },
                { v: "long", t: "장기 체류로 수급기간이 걱정돼요" },
              ].map((o) => (
                <button
                  key={o.v}
                  className={`ck-opt${sel.timing === o.v ? " on" : ""}`}
                  onClick={() => setSel((p) => ({ ...p, timing: o.v }))}
                >
                  {o.t}
                </button>
              ))}
            </div>
          </div>

          <div className="ck-group">
            <p className="ck-q">고용센터에 출국 사실을 알렸나요?</p>
            <div className="ck-opts">
              {[
                { v: "yes", t: "알렸어요" },
                { v: "no", t: "아직 안 알렸어요" },
              ].map((o) => (
                <button
                  key={o.v}
                  className={`ck-opt${sel.notice === o.v ? " on" : ""}`}
                  onClick={() => setSel((p) => ({ ...p, notice: o.v }))}
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

      <Sec id="h2-1" question="실업급여 수급 중 해외여행 가도 되나요?">
        <P>
          <B>가능해요.</B> 실업급여 수급 중 해외여행 자체를 금지하는 규정은 없어요.{" "}
          <A href="https://1350.moel.go.kr/home/hp/data/faqView.do?faq_idx=1000001196">고용노동부</A>에
          따르면 구직활동을 한 사실이 있으면 실업급여 지급이 가능하다고 명시하고 있어요.
        </P>
        <P>
          단, 출국 가능 여부와 급여 지급 여부는 별개예요. 해외에 있는 동안은 실업인정을 받을 수
          없어서, 체류 기간 동안은 급여가 지급되지 않아요. 귀국해서 실업인정을 받아야 급여가 나와요.
        </P>
        <InlineLink href="/w/실업급여-알바-미신고" label="부정수급 처벌 기준 및 환수 조건" />
        <P>
          주의해야 할 점이 있어요. 해외에서 우회 접속 등의 방법으로 온라인 실업인정을 신청하면
          부정수급이에요. 해외 체류 중 IP를 바꿔서 고용24에 접속해도 시스템이 감지할 수 있어요.
        </P>
        <P>
          쉽게 말하면, 해외여행은 가능하지만 그 기간 동안 급여는 멈춰요. 귀국하면 다시 시작돼요.
          출국 전에 실업인정일을 고용24에서 미리 확인해두는 게 좋아요.
        </P>
      </Sec>

      <Sec id="h2-2" question="실업급여 해외체류 42일 기준은 어떻게 계산하나요?">
        <P>
          42일은 법으로 정해진 고정 수치가 아니에요. <B>실무적으로 알려진 최대 공백 없이 다녀올 수
          있는 기간</B>이에요.
        </P>
        <P>
          계산 근거는 이래요. 실업인정은 보통 4주(28일) 주기로 진행돼요. 실업인정일을 놓쳐도 귀국
          후 14일 이내에 변경 신청이 1회 허용돼요. 28일 + 14일 = 42일이 한 번의 실업인정 주기 내에서
          수급 공백 없이 다녀올 수 있는 최대 기간인 거예요.
        </P>
        <InlineLink href="/w/실업급여-수급기간-몇개월-받나요" label="실업급여 수급기간 계산 방법" />
        <P>
          이 42일을 넘기면 어떻게 될까요? 변경 신청 1회를 이미 소진했다면, 다음 실업인정일을 또
          놓치게 돼요. 그 기간의 급여는 받을 수 없어요. 다음 실업인정일에 맞춰 귀국하거나, 귀국 후
          바로 고용센터에 신고해야 해요.
        </P>
        <P>
          실업인정 주기가 2주(14일)인 경우도 있어요. 이때는 14일 + 14일 = 28일이 한 주기 내 최대
          기간이 돼요. 본인의 실업인정 주기를 고용24에서 확인하고 출국 일정을 잡는 게 중요해요.
        </P>
      </Sec>

      <Sec id="h2-3" question="실업급여 해외체류 시 수급 중단은 어떻게 되나요?">
        <P>
          <B>수급이 "중단"되는 게 아니라 "정지"되는 개념이에요.</B> 귀국하면 남은 급여일수만큼 다시
          받을 수 있어요. 해외에 있던 날들은 수급일수로 카운트되지 않아요.
        </P>
        <P>
          예를 들어 소정급여일수가 180일인데 90일 받고 30일 해외에 있었다면, 귀국 후 나머지 90일을
          그대로 받을 수 있어요. 해외 체류 30일 동안 급여가 지급되지 않았을 뿐이지, 수급자격이
          사라진 건 아니에요.
        </P>
        <P>
          다만 수급기간이라는 시간 제한이 있어요. 수급기간은 퇴직일부터 12개월이에요. 이 12개월
          안에 남은 급여일수를 모두 사용해야 해요. 해외에 너무 오래 있다 보면 수급기간이 지나서
          잔여 급여를 못 받을 수 있어요.
        </P>
        <BridgeCard
          q="장기 해외 체류로 수급기간이 걱정된다면?"
          a="질병, 출산 외에도 일부 사유로 수급기간을 연장할 수 있어요. 수급유예 신청 조건을 먼저 보세요."
          href="/w/실업급여-수급유예"
          label="수급유예 신청 조건 보기"
        />
        <P>
          12개월 수급기간 내에서만 잔여 급여를 받을 수 있다는 점을 꼭 기억해 두세요. 출국 전에
          수급 종료일을 고용24에서 미리 조회해두면 여행 일정을 안전하게 잡을 수 있어요.
        </P>
      </Sec>

      <Sec id="h2-4" question="실업급여 해외체류 후 수급 재개 조건은 뭐예요?">
        <P>
          귀국 후 수급 재개에 필요한 조건은 두 가지예요. <B>수급기간(퇴직 후 12개월) 내에 귀국</B>해야
          하고, <B>실업인정일에 맞춰 정상 신청</B>해야 해요.
        </P>
        <P>
          실업인정일에 귀국하지 못한 경우, 귀국 후 14일 이내에 관할 고용센터에 출석해서 실업인정일
          변경을 신청하면 돼요. 이 변경은 전체 수급기간 중 1회만 허용돼요. 기한(14일)을 넘기면
          해당 실업인정 기간의 급여는 포기해야 해요.
        </P>
        <Info>귀국 후 별도의 "재개 신청"은 없어요. 실업인정일에 정상적으로 고용24에서 신고하면 그날부터 급여가 다시 나와요.</Info>
        <P>
          재개 절차는 간단해요. 귀국 후 다음 실업인정일에 고용24에서 온라인으로 정상 신청하거나,
          고용센터에 출석하면 돼요. 출국 전에 실업인정일을 미리 확인해두면 귀국 일정 잡기가 훨씬
          편해요.
        </P>
        <SpokeLink href="/w/실업급여-수급유예" title="실업급여 수급유예 신청 방법" desc="질병·출산·육아 시 최대 4년 연장" />
        <SpokeLink href="/w/실업급여-수급기간-몇개월-받나요" title="실업급여 수급기간" desc="퇴직 후 12개월 신청 기한 계산" />
      </Sec>

      <ExtBtn
        href="https://www.ei.go.kr"
        badge="고용24 공식"
        text="실업인정일 조회 및 변경 신청"
        cta="바로가기"
      />

      <PrevNext
        prev={{ title: "실업급여 취업신고 방법", href: "/w/실업급여-수급중-취업-신고방법" }}
        next={{ title: "실업급여 수급유예 신청 방법", href: "/w/실업급여-수급유예" }}
      />
      <FAQAccordion items={META.faq} />
      <RelatedArticles
        items={[
          { title: "실업급여 수급유예 신청 방법", href: "/w/실업급여-수급유예", desc: "최대 4년 연장 조건" },
          { title: "실업급여 수급기간 몇개월", href: "/w/실업급여-수급기간-몇개월-받나요", desc: "퇴직 후 12개월 기한" },
          { title: "실업급여 부정수급 처벌", href: "/w/실업급여-알바-미신고", desc: "자진신고 감면 조건" },
        ]}
      />
    </BlogLayout>
  );
}
