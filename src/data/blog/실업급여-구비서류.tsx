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

type Q1 = "issued" | "not";
type Q2 = "y" | "n";
type Q3 = "involuntary" | "voluntary";
type Q4 = "online" | "visit";

const meta = {
  title: "실업급여 구비서류 준비 목록 | 이직확인서 통장 사진 필요 서류",
  description: "실업급여 신청에 필요한 구비서류를 정리했어요. 이직확인서, 신분증, 통장사본, 사진까지 온라인과 방문 신청 차이도 함께 알려드려요.",
  category: "실업급여",
  keywords: [
    "실업급여 구비서류 준비 목록",
    "이직확인서 발급 고용보험 서류",
    "실업급여 구비서류 온라인 방문 차이",
    "실업급여 구비서류 추가 제출 서류",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-27",
  datePublished: "2026-02-27",
  summary: [
    "기본 구비서류: 이직확인서 + 신분증 + 통장사본 + 사진 1장",
    "이직확인서는 퇴직 후 사업주가 10일 이내에 고용24로 제출해요",
    "온라인 신청은 사진 불필요, 방문 신청은 증명사진 1장 지참해요",
  ],
  sources: [
    { name: "고용24 실업급여 신청 안내", url: "https://www.ei.go.kr/ei/eih/es/pb/pbAr/retrievePbArInfo.do?games_no=4821&menu_id=&ggn_type=sub", date: "2026-02" },
  ],
  faq: [
    { q: "실업급여 구비서류 이직확인서 없으면 신청 안 되나요?", a: "이직확인서가 없어도 수급자격 인정 신청은 가능해요. 다만 이직확인서가 처리돼야 구직급여를 실제로 받을 수 있어요. 사업주가 발급을 안 해주면 고용센터에 직접 신고할 수 있어요." },
    { q: "실업급여 구비서류 온라인 신청 시 사진이 필요한가요?", a: "고용24 온라인 신청 시에는 별도의 증명사진이 필요하지 않아요. 방문 신청 시에만 증명사진 1장을 지참해야 해요." },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "내 서류 준비가 됐는지 체크해요",
    subText: "4가지만 선택하면 바로 결과 확인",
    url: "#checker",
    external: false,
  },
  relatedDocs: [{ title: "실업급여 신청방법", url: "/w/실업급여-신청방법" }],
};

export default function Page() {
  const [q1, setQ1] = useState<Q1 | "">("");
  const [q2, setQ2] = useState<Q2 | "">("");
  const [q3, setQ3] = useState<Q3 | "">("");
  const [q4, setQ4] = useState<Q4 | "">("");

  type GridItem = { icon: string; name: string; pass: boolean; desc: string };
  type ResLink = { icon: string; title: string; desc: string; href: string };
  type Result = { pass: boolean; title: string; desc: string; grid: GridItem[]; links: ResLink[] };

  function getResult(): Result | null {
    if (!q1 || !q2 || !q3 || !q4) return null;
    const grid: GridItem[] = [
      { icon: "📄", name: "이직확인서 발급", pass: q1 === "issued", desc: q1 === "issued" ? "사업주 제출 완료" : "아직 미발급 상태예요" },
      { icon: "📅", name: "피보험기간 180일+", pass: q2 === "y", desc: q2 === "y" ? "수급 요건 충족" : "기간 부족으로 미충족" },
      { icon: "🏢", name: "비자발적 퇴사", pass: q3 === "involuntary", desc: q3 === "involuntary" ? "수급 대상 퇴사 사유" : "추가 증빙 서류 필요" },
      { icon: "💻", name: "신청 방법 준비", pass: true, desc: q4 === "online" ? "온라인 신청 가능" : "방문 서류 지참 필요" },
    ];
    const allPass = grid.every((g) => g.pass);
    if (allPass) {
      return {
        pass: true,
        title: "서류 준비 완료, 신청 가능해요",
        desc: q4 === "online"
          ? "고용24 온라인으로 바로 수급자격 인정 신청을 할 수 있어요. 신분증·통장사본을 스캔해 두세요."
          : "고용센터 방문 신청 시 이직확인서·신분증·통장사본·증명사진 1장을 챙기면 돼요.",
        grid,
        links: [
          { icon: "🏢", title: "고용24 수급자격 인정 신청", desc: "온라인 신청 바로가기", href: "https://www.ei.go.kr/ei/eih/cm/hm/main.do" },
          { icon: "📋", title: "실업급여 신청방법 단계별 안내", desc: "신청 절차 전체 흐름 정리", href: "/w/실업급여-신청방법" },
          { icon: "📅", title: "실업급여 신청기간 기한", desc: "퇴직 후 12개월 이내 신청해야 해요", href: "/w/실업급여-신청기간" },
          { icon: "💰", title: "실업급여 연봉별 계산 예시", desc: "내 월급 기준 예상 수령액 확인", href: "/w/실업급여-연봉별-계산" },
        ],
      };
    }
    return {
      pass: false,
      title: "미충족 항목이 있어요",
      desc: "빨간 항목을 먼저 해결하세요. 이직확인서 미발급 시 사업주에게 요청하거나 고용센터에 신고할 수 있어요.",
      grid,
      links: [
        { icon: "📋", title: "실업급여 수급자격 인정 조건", desc: "피보험기간 합산 방법 안내", href: "/w/실업급여-수급자격-인정" },
        { icon: "📅", title: "실업급여 피보험기간 180일 계산", desc: "근무일수 계산 기준 정리", href: "/w/실업급여-피보험기간-180일-계산" },
        { icon: "🏢", title: "고용24 이직확인서 신고", desc: "미발급 사업주 신고 바로가기", href: "https://www.ei.go.kr/ei/eih/cm/hm/main.do" },
        { icon: "🔍", title: "실업급여 임금삭감 퇴직 사유", desc: "자발적 퇴사 예외 인정 사유", href: "/w/실업급여-임금삭감-퇴직-정당사유" },
      ],
    };
  }

  const result = getResult();

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "구비서류"]}
      tags={["2026년 최신", "실업급여", "신청서류"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>실업급여 신청에 필요한 서류가 뭔지 막막하죠. 핵심 서류는 <B>이직확인서 + 신분증 + 통장사본</B>이에요. 온라인과 방문 신청에 따라 준비 서류가 조금 달라요. 체커로 먼저 내 상황을 확인해 보세요.</>}
      sourceBar={{ badge: "출처", name: "고용24 실업급여 신청 안내", date: "2026.02 기준" }}
      stickyLabel="기본 서류"
      stickyValue="이직확인서·신분증·통장"
      stickyBtn="서류 준비 체크 ↑"
      disclaimer="이 글은 고용24 공식 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요. 정확한 서류 목록은 관할 고용센터에서 확인하세요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "📋", title: "고용24 수급자격 신청", sub: "온라인 신청 바로가기", href: "https://www.ei.go.kr/ei/eih/cm/hm/main.do", hot: true },
          { icon: "📅", title: "실업급여 신청기간 확인", sub: "퇴직 후 12개월 이내", href: "/w/실업급여-신청기간" },
          { icon: "💰", title: "실업급여 계산기", sub: "예상 수령액 미리 계산", href: "/w/실업급여-연봉별-계산" },
        ]} />
        <SidebarDocs items={[
          { title: "실업급여 신청방법 안내", cat: "실업급여·신청", href: "/w/실업급여-신청방법" },
          { title: "실업급여 신청기간 기한", cat: "실업급여·기한", href: "/w/실업급여-신청기간" },
          { title: "실업급여 수급자격 인정", cat: "실업급여·자격", href: "/w/실업급여-수급자격-인정" },
          { title: "실업급여 실업신고 방법", cat: "실업급여·신고", href: "/w/실업급여-실업신고" },
          { title: "실업급여 대기기간 안내", cat: "실업급여·대기", href: "/w/실업급여-대기기간" },
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
        { t: "내 서류 준비 됐는지 체크해요", sub: null },
        { t: "실업급여 구비서류 기본 목록은?", sub: "이직확인서 · 신분증 · 통장사본 · 사진" },
        { t: "실업급여 구비서류 온라인과 방문 차이는?", sub: "온라인 스캔 제출 · 방문 원본 지참" },
        { t: "실업급여 구비서류 추가 제출 서류는?", sub: "자발적 퇴사 예외 · 특수 케이스 서류" },
        { t: "실업급여 구비서류 이직확인서 없으면?", sub: "사업주 미발급 · 고용센터 신고 방법" },
        { t: "자주 묻는 질문", sub: null },
      ]} />
      <Summary3 items={[
        "기본 구비서류: 이직확인서 + 신분증 + 통장사본 + 사진 1장",
        "이직확인서는 퇴직 후 사업주가 10일 이내에 고용24로 제출해요",
        "온라인 신청은 사진 불필요, 방문 신청은 증명사진 1장 지참해요",
      ]} />

      <Sec n={1} id="checker" title="내 서류 준비 됐는지 체크해요" sub={null}>
        <P>실업급여를 신청하려면 몇 가지 서류를 준비해야 해요. 서류가 빠지면 신청이 지연되거나 추가 방문이 필요해지기도 해요.</P>
        <P>4가지 항목을 선택하면 지금 서류 준비가 됐는지, 추가로 무엇이 필요한지 바로 알려드려요.</P>
        <CheckerShell title="내 서류 준비 됐는지 체크해요" subtitle="30초 확인" intro="4가지를 선택하면 서류 준비 완료 여부를 알려드려요.">
          <CheckerQ n={1} group={1} label="이직확인서가 발급됐나요?" opts={[["issued", "사업주가 발급·제출했어요"], ["not", "아직 발급 안 됐어요"]]} sel={q1} pick={setQ1 as (v: string) => void} />
          <CheckerQ n={2} group={1} label="고용보험 피보험기간이 180일 이상인가요?" opts={[["y", "180일 이상이에요"], ["n", "180일 미만이에요"]]} sel={q2} pick={setQ2 as (v: string) => void} />
          <CheckerQ n={3} group={2} label="퇴직 사유가 무엇인가요?" opts={[["involuntary", "비자발적 퇴사 (권고사직·계약만료)"], ["voluntary", "자발적 퇴사 (개인 사정)"]]} sel={q3} pick={setQ3 as (v: string) => void} />
          <CheckerQ n={4} group={2} label="신청 방법은 어떻게 할 예정인가요?" opts={[["online", "고용24 온라인 신청"], ["visit", "고용센터 방문 신청"]]} sel={q4} pick={setQ4 as (v: string) => void} />
          {result && (() => {
            const links = result.links as ResLink[];
            return result.pass ? (
              <ResultPass title={result.title} desc={result.desc}>
                <ResultGrid items={result.grid} />
                {links.map((l) => (
                  <ResultCTA key={l.href} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />
                ))}
              </ResultPass>
            ) : (
              <ResultFail title={result.title} desc={result.desc}>
                <ResultGrid items={result.grid} />
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
        q="서류를 다 챙겼다면 실업급여 신청 절차를 확인하세요"
        a="워크넷 구직 등록 → 수급자격 인정신청 → 실업인정 순서로 진행해요."
        label="실업급여 신청방법 전체 보기"
        href="/w/실업급여-신청방법"
      />

      <Sec n={2} id="basic" title="실업급여 구비서류 기본 목록은?" sub="이직확인서 · 신분증 · 통장사본 · 사진">
        <P>실업급여(구직급여) 신청에 필요한 기본 서류는 크게 4가지예요. <B>이직확인서, 신분증, 통장사본, 증명사진</B>이에요. 이 중 하나라도 빠지면 신청 처리가 지연돼요.</P>
        <TableTitle>실업급여 기본 구비서류 목록</TableTitle>
        <table><thead><THL items={["서류", "발급처", "비고"]} /></thead><tbody>
          <TH items={["이직확인서", "사업주 → 고용24 제출", "퇴직 후 10일 이내 자동 제출"]} />
          <TH items={["신분증", "본인 소지", "주민등록증·운전면허증"]} />
          <TH items={["통장사본", "은행", "본인 명의 통장 앞면"]} />
          <TH items={["증명사진", "사진관·편의점", "방문 신청 시만 필요"]} />
        </tbody></table>
        <P>이직확인서는 사업주가 퇴직 후 10일 이내에 고용24에 직접 제출해요. 근로자가 별도로 받아올 필요 없이, 고용24에서 처리 여부를 조회할 수 있어요.</P>
        <P>통장사본은 본인 명의 통장이라면 어떤 은행이든 관계없어요. 체크카드 계좌도 가능해요. 온라인 신청 시에는 계좌번호를 직접 입력하면 되니 사본 첨부가 필요 없어요.</P>
        <Info type="warn">{"<strong>수급자격신청서는 별도로 작성해요:</strong> 고용24 온라인 신청 시에는 화면에서 입력하고, 방문 신청 시에는 고용센터에서 양식을 받아 작성해요. 미리 출력하거나 방문 당일 현장에서 작성 가능해요."}</Info>
        <InlineLink icon="📋" title="실업급여 실업신고 방법" desc="수급자격 인정신청 온라인 접수 안내" href="/w/실업급여-실업신고" />
      </Sec>

      <Divider />

      <Sec n={3} id="online-visit" title="실업급여 구비서류 온라인과 방문 차이는?" sub="온라인 스캔 제출 · 방문 원본 지참">
        <H3>온라인 신청 시 서류</H3>
        <P>고용24 온라인 신청 시에는 증명사진이 필요 없어요. 신분증과 통장 정보는 화면에서 직접 입력하면 되고, 이직확인서는 사업주가 시스템에 이미 등록해 둔 것을 자동으로 확인해요.</P>
        <H3>방문 신청 시 서류</H3>
        <P>고용센터 방문 신청 시에는 <B>증명사진 1장</B>을 반드시 지참해야 해요. 이직확인서 원본을 가져갈 필요는 없지만, 신분증·통장사본 원본은 지참해야 해요.</P>
        <P>방문 신청이 필요한 경우는 온라인 신청이 어렵거나, 특수 사유(자발적 퇴사 예외, 장기미취업 등)로 담당자 상담이 필요한 때예요. 일반적인 비자발적 퇴사라면 온라인으로 모두 처리 가능해요.</P>
        <P>방문 시 거주지 관할 고용센터로 가야 해요. 사업장 소재지가 다른 지역이어도 거주지 고용센터에서 신청하면 돼요. 고용24 고용센터 찾기 기능으로 가까운 곳을 미리 확인해 두세요.</P>
        <InlineLink icon="🏢" title="실업급여 고용센터 찾기" desc="거주지 관할 고용센터 위치 확인" href="/w/실업급여-고용센터-찾기-고용24-사용법" />
      </Sec>

      <RelatedMid
        title="실업급여 신청 절차도 함께 확인해 보세요"
        items={[
          { icon: "📋", title: "실업급여 신청방법 안내", desc: "고용24 온라인 단계별 신청 순서", href: "/w/실업급여-신청방법" },
          { icon: "📅", title: "실업급여 신청기간 기한", desc: "퇴직 후 12개월 이내 접수 시기", href: "/w/실업급여-신청기간" },
          { icon: "🏢", title: "실업급여 실업신고 방법", desc: "고용24 온라인 수급자격 신청", href: "/w/실업급여-실업신고" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      <Sec n={4} id="extra" title="실업급여 구비서류 추가 제출 서류는?" sub="자발적 퇴사 예외 · 특수 케이스 서류">
        <H3>자발적 퇴사 예외 사유 증빙</H3>
        <P>자발적으로 퇴사했지만 정당한 사유가 있다면 추가 서류를 제출해 수급자격을 인정받을 수 있어요. 임금체불이라면 임금대장, 체불확인서를, 직장 내 괴롭힘이라면 진정서 접수증·의료기록 등을 준비해요.</P>
        <P>이사로 인한 퇴사라면 이사 전·후 주소지 확인 서류, 전·월세 계약서가 필요해요. 통근 거리가 왕복 3시간 이상 늘어났음을 증명해야 해요. 건강 악화라면 의사 소견서·진단서를 첨부해야 해요.</P>
        <H3>기타 특수 상황 서류</H3>
        <P>외국인 근로자는 체류자격 관련 서류를 추가로 제출해야 해요. 65세 이상 고령자는 일부 서류 양식이 다를 수 있으니 사전에 고용센터에 문의하는 게 좋아요.</P>
        <BridgeCard
          q="자발적 퇴사였는데 정당한 사유가 있어요"
          a="임금삭감, 직장 내 괴롭힘, 건강 악화 등 12가지 정당 사유가 인정돼요. 증빙 서류를 갖춰 고용센터에 제출하면 돼요."
          label="자발적 퇴사 예외 사유 보기"
          href="/w/실업급여-임금삭감-퇴직-정당사유"
        />
      </Sec>

      <Divider />

      <Sec n={5} id="no-doc" title="실업급여 구비서류 이직확인서 없으면?" sub="사업주 미발급 · 고용센터 신고 방법">
        <P>사업주가 이직확인서를 발급해 주지 않거나 늦게 제출하는 경우가 있어요. 이런 경우에도 수급자격 인정 신청 자체는 가능하지만, 이직확인서가 처리되지 않으면 구직급여가 실제로 지급되지 않아요.</P>
        <P>사업주가 이직확인서 제출을 거부하거나 지연하면 <B>고용24 또는 관할 고용센터에 신고</B>할 수 있어요. 고용보험법상 사업주는 피보험자가 퇴직한 다음 날부터 10일 이내에 이직확인서를 제출해야 하고, 위반 시 과태료가 부과돼요.</P>
        <P>신고 후 고용센터에서 사업주에게 제출을 촉구하게 돼요. 사업주가 폐업했거나 연락이 되지 않는 경우에는 고용센터가 직권으로 확인 절차를 진행해요. 이 경우 근로계약서, 급여명세서, 4대보험 취득·상실 확인서 등 근로 사실을 입증하는 서류가 필요해요.</P>
        <P>이직확인서 없이 신청한 경우 서류가 처리되는 대로 수급자격이 소급 인정돼요. 신청일을 기준으로 대기기간이 시작되므로 이직확인서가 없어도 최대한 빨리 신청하는 게 유리해요.</P>
        <SpokeLink num={1} title="실업급여 신청방법 단계별 안내" desc="고용24 온라인 신청 전체 흐름" href="/w/실업급여-신청방법" />
        <SpokeLink num={2} title="실업급여 신청기간 기한 안내" desc="퇴직 후 12개월 이내 접수 시기" href="/w/실업급여-신청기간" />
        <ExtBtn badge="고용24 공식" text="이직확인서 미제출 신고하기" cta="바로가기 →" href="https://www.ei.go.kr/ei/eih/cm/hm/main.do" />
      </Sec>

      <Divider />

      <FAQAccordion items={meta.faq} />
      <RelatedArticles items={[
        { title: "실업급여 신청방법 단계별 안내", href: "/w/실업급여-신청방법" },
        { title: "실업급여 신청기간 기한 안내", href: "/w/실업급여-신청기간" },
        { title: "실업급여 수급자격 인정 조건", href: "/w/실업급여-수급자격-인정" },
        { title: "실업급여 실업신고 방법 안내", href: "/w/실업급여-실업신고" },
        { title: "실업급여 재취업 조건 안내", href: "/w/실업급여-재취업-조건" },
      ]} />
      <PrevNext
        prev={{ title: "실업급여 재취업 조건 안내", href: "/w/실업급여-재취업-조건" }}
        next={{ title: "실업급여 미지급 상속 청구", href: "/w/실업급여-미지급-상속" }}
      />
    </BlogLayout>
  );
}
