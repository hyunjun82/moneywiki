"use client";
import { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
  FormulaCard, CaseBox, ChipsGrid,
} from "@/components/wiki/BlogShared";

type Q1 = "y" | "n";
type Q2 = "spouse" | "child" | "parent" | "other";
type Q3 = "y" | "n";
type Q4 = "within3" | "over3";

const meta = {
  title: "실업급여 미지급 상속 청구 | 수급자 사망 유족 지급 요건",
  description: "구직급여 수급자가 사망하면 남은 미지급 실업급여를 유족이 청구할 수 있어요. 유족 순위, 청구 서류, 소멸시효 3년까지 정리했어요.",
  category: "실업급여",
  keywords: [
    "실업급여 미지급 상속 청구",
    "수급자 사망 미지급 유족 지급",
    "실업급여 미지급 청구 서류",
    "실업급여 미지급 소멸시효 3년",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "수급자 사망 시 미지급 구직급여는 유족이 청구할 수 있어요",
    "유족 순위: 배우자 → 자녀 → 부모 → 손자녀 → 조부모 → 형제자매",
    "소멸시효는 3년이며 사망일 기준으로 기산해요",
  ],
  sources: [
    { name: "고용보험법 제55조 미지급 실업급여 청구", url: "https://www.law.go.kr/lsSc.do?menuId=1&subMenuId=15&tabMenuId=81&query=%EA%B3%A0%EC%9A%A9%EB%B3%B4%ED%97%98%EB%B2%95#undefined", date: "2026-02" },
  ],
  faq: [
    { q: "실업급여 미지급 상속 청구는 어디서 하나요?", a: "수급자의 거주지 또는 사업장 관할 고용센터에서 청구할 수 있어요. 고용24 온라인에서도 일부 가능하지만 사망 관련 서류는 방문 제출이 필요한 경우가 많아요." },
    { q: "실업급여 미지급분 소멸시효는 언제부터 기산하나요?", a: "수급자의 사망일부터 3년이 소멸시효예요. 3년이 지나면 청구권이 소멸되니 빠르게 신청하는 게 좋아요." },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "미지급 실업급여 청구 가능할까?",
    subText: "유족 조건 체크하고 바로 확인",
    url: "#checker",
    external: false,
  },
  relatedDocs: [{ title: "실업급여 수급자격 인정", url: "/w/실업급여-수급자격-인정" }],
};

export default function Page() {
  const [q1, setQ1] = useState<Q1 | "">("");
  const [q2, setQ2] = useState<Q2 | "">("");
  const [q3, setQ3] = useState<Q3 | "">("");
  const [q4, setQ4] = useState<Q4 | "">("");

  type ResLink = { icon: string; title: string; desc: string; href: string };
  type Result = { pass: boolean; title: string; desc: string; links: ResLink[] };

  function getResult(): Result | null {
    if (!q1 || !q2 || !q3 || !q4) return null;

    if (q4 === "over3") {
      return {
        pass: false,
        title: "소멸시효가 지났어요",
        desc: "사망일로부터 3년이 지나면 미지급 실업급여 청구권이 소멸돼요. 안타깝게도 청구가 어려워요.",
        links: [
          { icon: "📋", title: "실업급여 수급자격 인정 조건", desc: "기본 수급 요건 전체 정리", href: "/w/실업급여-수급자격-인정" },
          { icon: "📅", title: "실업급여 소정급여일수 기준", desc: "나이·피보험기간별 일수 확인", href: "/w/실업급여-소정급여일수" },
        ],
      };
    }
    if (q1 === "n") {
      return {
        pass: false,
        title: "수급자격 인정이 선행되어야 해요",
        desc: "사망자가 수급자격 인정을 받지 못한 경우 미지급 실업급여를 청구할 수 없어요.",
        links: [
          { icon: "📋", title: "실업급여 수급자격 인정 조건", desc: "수급자격 인정 기준 상세 정리", href: "/w/실업급여-수급자격-인정" },
          { icon: "📅", title: "실업급여 신청방법 안내", desc: "고용24 온라인 신청 전체 흐름", href: "/w/실업급여-신청방법" },
        ],
      };
    }
    if (q3 === "n") {
      return {
        pass: false,
        title: "선순위 유족이 먼저 청구해야 해요",
        desc: "유족 중 선순위가 있다면 선순위 유족이 먼저 청구해야 해요. 선순위 유족이 포기하면 다음 순위가 청구할 수 있어요.",
        links: [
          { icon: "📋", title: "실업급여 미지급 청구 서류", desc: "유족 순위별 서류 목록 확인", href: "/w/실업급여-미지급-상속" },
          { icon: "🏢", title: "고용24 미지급 청구 안내", desc: "고용센터 방문 청구 방법", href: "https://www.ei.go.kr/ei/eih/cm/hm/main.do" },
        ],
      };
    }
    return {
      pass: true,
      title: "미지급 실업급여 청구 가능해요",
      desc: "관할 고용센터에 사망진단서, 유족관계증명서, 통장사본 등을 제출하면 돼요.",
      links: [
        { icon: "🏢", title: "고용24 미지급 실업급여 청구", desc: "관할 고용센터 방문 청구 안내", href: "https://www.ei.go.kr/ei/eih/cm/hm/main.do" },
        { icon: "📋", title: "실업급여 구비서류 목록", desc: "청구에 필요한 기본 서류 목록", href: "/w/실업급여-구비서류" },
      ],
    };
  }

  const result = getResult();

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "미지급 상속"]}
      tags={["2026년 최신", "실업급여", "유족 청구"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>구직급여 수급자가 사망한 경우 남은 <B>미지급 실업급여</B>를 유족이 청구할 수 있어요. 유족 순위와 청구 서류, <B>소멸시효 3년</B>까지 정리했어요.</>}
      sourceBar={{ badge: "법령", name: "고용보험법 제55조 미지급 실업급여", date: "2026.02 기준" }}
      stickyLabel="청구 기한"
      stickyValue="사망일로부터 3년"
      stickyBtn="유족 청구 조건 확인 ↑"
      disclaimer="이 글은 고용보험법 제55조를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 정확한 청구 여부는 고용센터에서 확인하세요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "🏢", title: "고용센터 미지급 청구", sub: "유족 청구 서류 제출", href: "https://www.ei.go.kr/ei/eih/cm/hm/main.do", hot: true },
          { icon: "📋", title: "실업급여 구비서류 목록", sub: "신청 서류 전체 정리", href: "/w/실업급여-구비서류" },
          { icon: "📅", title: "실업급여 수급기간", sub: "최대 9개월 일수 확인", href: "/w/실업급여-수급기간-몇개월-받나요" },
        ]} />
        <SidebarDocs items={[
          { title: "실업급여 수급자격 인정", cat: "실업급여·자격", href: "/w/실업급여-수급자격-인정" },
          { title: "실업급여 구비서류 목록", cat: "실업급여·서류", href: "/w/실업급여-구비서류" },
          { title: "실업급여 신청방법 안내", cat: "실업급여·신청", href: "/w/실업급여-신청방법" },
          { title: "실업급여 소정급여일수", cat: "실업급여·지급일수", href: "/w/실업급여-소정급여일수" },
          { title: "실업급여 상한액 하한액", cat: "실업급여·금액", href: "/w/실업급여-상한액" },
        ]} />
        <SidebarCalc items={[
          { title: "실업급여 계산기", href: "/w/실업급여-연봉별-계산" },
          { title: "퇴직금 계산기", href: "/w/퇴직급여-지급-지연이자-받기" },
          { title: "건강보험료 계산기", href: "/w/건강보험-지역가입자-보험료-계산" },
          { title: "연말정산 계산기", href: "/w/프리랜서-3.3-원천징수-환급" },
          { title: "소득세 계산기", href: "/w/종합소득세-신고-안하면-가산세" },
        ]} />
      </>}
    >
      <TOC items={[
        { t: "미지급 실업급여 청구 가능할까?", sub: null },
        { t: "실업급여 미지급 상속 받을 수 있나요?", sub: "유족 순위 · 청구 자격 조건" },
        { t: "실업급여 미지급 청구 서류는 무엇인가요?", sub: "사망진단서 · 유족관계증명서 · 통장" },
        { t: "실업급여 미지급 사례별 판단은?", sub: "배우자 · 자녀 · 형제자매 사례" },
        { t: "실업급여 미지급 소멸시효는?", sub: "사망일 기준 3년 · 청구 시기 주의" },
        { t: "자주 묻는 질문", sub: null },
      ]} />
      <Summary3 items={[
        "수급자 사망 시 미지급 구직급여는 유족이 청구할 수 있어요",
        "유족 순위: 배우자 → 자녀 → 부모 → 손자녀 → 조부모 → 형제자매",
        "소멸시효는 3년이며 사망일 기준으로 기산해요",
      ]} />

      <Sec n={1} id="checker" title="미지급 실업급여 청구 가능할까?" sub={null}>
        <P>구직급여를 수급하던 중 사망한 경우, 아직 받지 못한 실업급여는 사라지지 않아요. <B>유족이 대신 청구</B>할 수 있는 권리가 있어요.</P>
        <P>4가지 조건을 확인하면 청구 가능 여부를 바로 알 수 있어요. 아래 체커에서 상황을 선택해 보세요.</P>
        <CheckerShell title="미지급 실업급여 청구 가능할까?" subtitle="30초 확인" intro="4가지를 선택하면 청구 가능 여부를 바로 알려드려요.">
          <CheckerQ n={1} group={1} label="사망자가 수급자격 인정을 받은 상태였나요?" opts={[["y", "수급자격 인정을 받았어요"], ["n", "수급자격 인정 전이에요"]]} sel={q1} pick={setQ1 as (v: string) => void} />
          <CheckerQ n={2} group={1} label="청구자의 유족 관계가 어떻게 되나요?" opts={[["spouse", "배우자"], ["child", "자녀 또는 부모"], ["parent", "손자녀 또는 조부모"], ["other", "형제자매"]]} sel={q2} pick={setQ2 as (v: string) => void} />
          <CheckerQ n={3} group={2} label="내가 선순위 유족인가요?" opts={[["y", "선순위 유족이에요"], ["n", "선순위 유족이 있어요"]]} sel={q3} pick={setQ3 as (v: string) => void} />
          <CheckerQ n={4} group={2} label="사망일로부터 얼마나 됐나요?" opts={[["within3", "3년 이내예요"], ["over3", "3년이 지났어요"]]} sel={q4} pick={setQ4 as (v: string) => void} />
          {result && (() => {
            const links = result.links as ResLink[];
            return result.pass ? (
              <ResultPass title={result.title} desc={result.desc}>
                {links.map((l) => (
                  <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
                ))}
              </ResultPass>
            ) : (
              <ResultFail title={result.title} desc={result.desc}>
                {links.map((l) => (
                  <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
                ))}
              </ResultFail>
            );
          })()}
        </CheckerShell>
      </Sec>

      <Divider />

      <BridgeCard
        q="미지급 청구 조건이 충족됐다면 서류 준비를 시작하세요"
        a="사망진단서, 유족관계증명서, 통장사본을 준비해 관할 고용센터에 방문하면 돼요."
        label="청구 서류 목록 보기"
        href="#docs"
      />

      <Sec n={2} id="eligibility" title="실업급여 미지급 상속 받을 수 있나요?" sub="유족 순위 · 청구 자격 조건">
        <P>미지급 실업급여 청구권은 <B>고용보험법 제55조</B>에 규정돼 있어요. 수급자격자가 사망한 경우 아직 지급받지 못한 실업급여를 유족이 청구할 수 있는 제도예요.</P>
        <P>유족 청구 순위는 민법 상속 순위와 유사하게 적용돼요. <B>배우자가 1순위</B>이고, 그 다음이 자녀, 부모, 손자녀, 조부모, 형제자매 순이에요. 같은 순위의 유족이 여러 명이라면 동등한 권리를 가져요.</P>
        <P>중요한 것은 사망 당시 수급자격 인정을 받은 상태여야 한다는 점이에요. 수급자격 신청은 했지만 인정 결정이 나기 전에 사망한 경우에는 유족이 대신 인정 신청을 진행할 수 있어요.</P>
        <P>구직급여 수급 중 사망한 경우뿐 아니라, 수급자격 인정 후 아직 수급을 시작하지 않은 상태에서 사망한 경우에도 청구 가능해요. 대기기간 중 사망한 경우에도 잔여 소정급여일수에 해당하는 금액을 청구할 수 있어요.</P>
        <Info type="warn">{"<strong>생계를 같이하지 않아도 청구 가능해요:</strong> 유족의 청구권은 동거 여부와 관계없이 인정돼요. 다만 동순위 유족이 여러 명이라면 합의하여 1명이 대표로 청구하는 것이 편리해요."}</Info>
        <InlineLink icon="📋" title="실업급여 수급자격 인정 조건" desc="수급자격 인정 기준 전체 정리" href="/w/실업급여-수급자격-인정" />
      </Sec>

      <Divider />

      <Sec n={3} id="docs" title="실업급여 미지급 청구 서류는 무엇인가요?" sub="사망진단서 · 유족관계증명서 · 통장">
        <H3>기본 청구 서류</H3>
        <P>미지급 실업급여를 청구하려면 사망자와의 관계를 증명하는 서류와 수령 계좌를 확인하는 서류가 필요해요. 기본 서류는 <B>사망진단서, 가족관계증명서(또는 기본증명서), 청구인 신분증, 청구인 통장사본</B>이에요.</P>
        <H3>추가 서류</H3>
        <P>선순위 유족이 청구를 포기하는 경우에는 포기 확인서 또는 동의서가 필요해요. 사망자의 수급자격 확인을 위해 사망자의 주민등록등본이나 이직확인서 사본을 요청받을 수도 있어요.</P>
        <P>고용센터에 따라 요구 서류가 다를 수 있으니, 방문 전에 관할 고용센터에 전화로 확인하는 게 좋아요. 서류가 완비돼야 처리 기간이 단축되기 때문에 미리 확인하는 게 유리해요.</P>
        <BridgeCard
          q="서류 준비가 됐다면 관할 고용센터에 방문하세요"
          a="방문 시 담당자가 청구인 확인 후 미지급 금액을 안내해 드려요. 처리 기간은 보통 2~3주 정도 걸려요."
          label="고용센터 찾기"
          href="/w/실업급여-고용센터-찾기-고용24-사용법"
        />
      </Sec>

      <RelatedMid
        title="실업급여 관련 다른 글도 함께 살펴보세요"
        items={[
          { icon: "📋", title: "실업급여 구비서류 목록", desc: "이직확인서·통장·사진 필요 서류", href: "/w/실업급여-구비서류" },
          { icon: "📅", title: "실업급여 소정급여일수", desc: "나이·피보험기간별 120~270일", href: "/w/실업급여-소정급여일수" },
          { icon: "💰", title: "실업급여 상한액 하한액", desc: "2026년 기준 일일 상한 66,000원", href: "/w/실업급여-상한액" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      <Sec n={4} id="cases" title="실업급여 미지급 사례별 판단은?" sub="배우자 · 자녀 · 형제자매 사례">
        <H3>배우자가 청구한 이 씨 사례</H3>
        <P>남편이 구직급여 수급 중 갑작스럽게 사망했어요. 배우자는 1순위 유족으로 바로 청구 가능해요. 사망진단서, 가족관계증명서, 이 씨 본인 통장사본을 준비해 관할 고용센터에 방문했고, 잔여 미지급 구직급여를 수령했어요.</P>
        <H3>자녀가 청구한 박 씨 사례</H3>
        <P>아버지가 수급자격 인정 직후 대기기간 중 사망했어요. 아버지에게 배우자가 없어 자녀(2순위)인 박 씨가 청구했어요. 기본증명서로 자녀 관계를 증명하고, 형제들의 동의서를 함께 제출해 단독 청구했어요.</P>
        <H3>형제자매가 청구한 김 씨 사례</H3>
        <P>수급자에게 배우자·자녀·부모·손자녀·조부모가 모두 없어서 마지막 순위인 형제자매가 청구했어요. 선순위 유족이 없음을 증명하는 가족관계증명서 전체를 제출해야 했어요. 처리 시간이 다소 길었지만 결국 미지급 금액을 수령할 수 있었어요.</P>
        <P>어떤 유족 순위든 사망일부터 3년 이내에 청구하면 돼요. 선순위 유족이 포기 의사를 밝히면 다음 순위 유족이 청구할 수 있어요. 가족 간 합의를 통해 대표 청구인을 정하는 것이 가장 효율적이에요.</P>
      </Sec>

      <Divider />

      <Sec n={5} id="expiry" title="실업급여 미지급 소멸시효는?" sub="사망일 기준 3년 · 청구 시기 주의">
        <P>미지급 실업급여 청구권의 소멸시효는 <B>사망일로부터 3년</B>이에요. 3년이 지나면 청구권이 소멸되어 지급받을 수 없으니, 되도록 빨리 청구하는 게 좋아요.</P>
        <P>소멸시효는 사망일을 기준으로 하는 것이지, 유족이 사망 사실을 안 날부터 기산하지 않아요. 가족 간 연락이 늦어지거나 서류 준비에 시간이 걸리더라도, 사망일로부터 3년 이내에 청구를 완료해야 해요.</P>
        <P>청구 후 처리 기간은 보통 2~3주 정도 걸려요. 서류가 완비된 상태에서 접수하면 처리가 빠르게 진행돼요. 처리 완료 후 청구인 통장으로 미지급 금액이 입금돼요.</P>
        <P>미지급 금액이 소액이더라도 청구하는 것이 좋아요. 수급자가 납부한 고용보험료에서 비롯된 권리이고, 청구 절차가 어렵지 않으니 3년 이내에 챙겨볼 것을 권장해요.</P>
        <InlineLink icon="📋" title="실업급여 소정급여일수 기준" desc="나이·피보험기간별 잔여일수 계산 방법" href="/w/실업급여-소정급여일수" />
        <SpokeLink num={1} title="실업급여 수급자격 인정 조건" desc="비자발적 퇴사 · 피보험기간 180일 이상" href="/w/실업급여-수급자격-인정" />
        <SpokeLink num={2} title="실업급여 구비서류 준비 목록" desc="이직확인서 · 통장 · 사진 필요 서류" href="/w/실업급여-구비서류" />
        <ExtBtn badge="고용보험 공식" text="미지급 실업급여 유족 청구" cta="바로가기 →" href="https://www.ei.go.kr/ei/eih/cm/hm/main.do" />
      </Sec>

      <Divider />

      <FAQAccordion items={meta.faq} />
      <RelatedArticles items={[
        { title: "실업급여 수급자격 인정 조건", href: "/w/실업급여-수급자격-인정" },
        { title: "실업급여 구비서류 준비 목록", href: "/w/실업급여-구비서류" },
        { title: "실업급여 신청방법 단계별 안내", href: "/w/실업급여-신청방법" },
        { title: "실업급여 소정급여일수 계산", href: "/w/실업급여-소정급여일수" },
        { title: "실업급여 재취업 조건 안내", href: "/w/실업급여-재취업-조건" },
      ]} />
      <PrevNext
        prev={{ title: "실업급여 구비서류 준비 목록", href: "/w/실업급여-구비서류" }}
        next={{ title: "실업급여 이의신청 심사청구 절차", href: "/w/실업급여-이의신청-심사청구-재심사-불복-절차" }}
      />
    </BlogLayout>
  );
}
