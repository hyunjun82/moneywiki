"use client";
import { useState } from "react";
import {
  C,
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "기초생활수급자 교육급여 신청 조건 | 초중고 교육활동비 지원 금액 2026",
  description: "기초생활수급자 자녀라면 교육급여로 학용품비까지 지원받을 수 있다는 거 아시나요? 지원 금액과 신청 방법을 알려드려요.",
  category: "복지",
  keywords: [
    "기초생활수급자 교육급여 신청 조건",
    "교육급여 초중고 지원 금액 2026",
    "기초생활수급자 교육활동비 신청 방법",
    "기초생활수급자 교육급여 지원 대상 학교",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "2026년 교육급여 선정 기준은 기준 중위소득 <strong>50%</strong> 이하예요.",
    "초등학생 <strong>487,000원</strong>, 중학생 <strong>679,000원</strong>, 고등학생 <strong>768,000원</strong>을 연 1회 지급해요.",
    "고등학생은 교육활동지원비 외에 <strong>교과서·수업료도 별도 지원</strong>받아요.",
  ],
  sources: [
    { name: "교육부 2026년 교육급여 지원 기준", url: "https://www.moe.go.kr/boardCnts/viewRenew.do?boardID=294&lev=0&statusYN=W&s=moe&m=020402&opType=N&boardSeq=99555", date: "2026-02" },
    { name: "복지로 교육급여 안내", url: "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003710", date: "2026-02" },
  ],
  faq: [
    { q: "교육급여는 현금으로 받나요, 바우처로 받나요?", a: "초·중학생은 교육활동지원비를 바우처(교육급여 카드)로 받아요. 학용품·학습교재·문화체험 등 교육활동 관련 목적에 사용할 수 있어요. 고등학생의 수업료·교과서는 학교로 직접 지급돼요." },
    { q: "이미 다른 급여(생계·주거급여)를 받고 있으면 교육급여도 자동으로 되나요?", a: "아니에요. 교육급여는 별도로 신청해야 해요. 다른 급여를 받고 있어도 교육급여는 자동으로 연결되지 않아요. 주민센터나 복지로에서 별도로 신청해야 해요." },
  ],
  ctaCard: {
    label: "지원 확인",
    mainText: "초등 487,000원 / 고등 768,000원",
    subText: "교육활동지원비 연 1회 지급",
    url: "https://www.bokjiro.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "기초생활수급자 주거급여 2026", url: "/w/기초생활수급자-주거급여-2026" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { income, grade, school_type } = sel;
    if (!income || !grade || !school_type) return null;
    if (income === "over") return "not_eligible";
    if (school_type === "special" || school_type === "other") return "check";
    if (income === "under") return "eligible";
    return "check";
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 교육급여 지원 가능 여부 확인" },
    { t: "기초생활수급자 교육급여 신청 조건은 무엇인가요?", sub: "중위소득 50% · 부양의무자 폐지" },
    { t: "교육급여 초중고 지원 금액은 얼마인가요?", sub: "학교급별 교육활동지원비" },
    { t: "기초생활수급자 교육활동비 신청 방법은 어떻게 되나요?", sub: "복지로 · 학교 신청 · 교육급여 카드" },
    { t: "기초생활수급자 교육급여 지원 대상 학교는 어디인가요?", sub: "국공립·사립·특수학교 범위" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "복지", "기초생활수급자"]}
      tags={["2026년 최신", "복지", "교육급여", "기초생활수급자"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>2026년 교육급여는 <strong>중위소득 50% 이하</strong> 가구 초·중·고교 재학생에게 교육활동지원비를 지원해요. 고등학생은 수업료와 교과서도 받아요.</>}
      sourceBar={{ badge: "교육부", name: "2026년 교육급여 지원 기준", date: "2026.02" }}
      stickyLabel="고등학생 교육급여"
      stickyValue="연 768,000원"
      stickyBtn="지원 금액 확인 ↑"
      disclaimer="이 글은 교육부와 복지로 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "📚", title: "복지로 교육급여 신청", sub: "온라인 신청 가능", href: "https://www.bokjiro.go.kr", hot: true },
          { icon: "🏠", title: "주거급여 2026", sub: "임차가구 월 최대 341,000원", href: "/w/기초생활수급자-주거급여-2026" },
          { icon: "👨‍👩‍👧", title: "한부모가족 지원금", sub: "양육비·아동 지원 금액 확인", href: "/w/한부모가족-지원금-신청-자격" },
        ]} />
        <SidebarDocs items={[
          { title: "기초생활수급자 주거급여 2026", cat: "복지·지원금", href: "/w/기초생활수급자-주거급여-2026" },
          { title: "한부모가족 지원금", cat: "복지·지원금", href: "/w/한부모가족-지원금-신청-자격" },
        ]} />
        <SidebarCalc items={[
          { title: "복지 서비스 모의계산", href: "https://www.bokjiro.go.kr" },
          { title: "실업급여 계산기", href: "/w/실업급여-상한액" },
        ]} />
      </>}
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="checker" title="교육급여 지원 가능 여부 확인" sub="소득 · 학교급 · 학교 유형 선택" />
      <P>교육급여는 소득 기준을 충족하고 초·중·고등학교에 재학 중인 학생을 대상으로 해요. 학교급에 따라 지원 금액이 달라요. 아래에서 상황을 선택해보세요.</P>

      <CheckerShell title="교육급여를 받을 수 있을까요?" sub="30초 확인">
        <CheckerQ n="1" label="가구 소득인정액이 중위소득 50% 이하인가요?" group="income" opts={[
          ["under", "네, 50% 이하예요"],
          ["over", "초과하는 것 같아요"],
          ["unknown", "잘 모르겠어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="자녀가 어느 학교급에 다니나요?" group="grade" opts={[
          ["elementary", "초등학교"],
          ["middle", "중학교"],
          ["high", "고등학교"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="3" label="다니는 학교 유형이 어떻게 되나요?" group="school_type" opts={[
          ["public", "국공립학교예요"],
          ["private", "사립학교예요"],
          ["special", "특수학교·대안학교예요"],
          ["other", "방송통신·검정고시 예정이에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="4" label="현재 다른 기초생활 급여를 받고 있나요?" group="other_benefit" opts={[
          ["yes", "생계·주거급여 등 받고 있어요"],
          ["no", "다른 급여는 없어요"],
        ]} sel={sel} pick={pick} />

        {result === "eligible" && (
          <ResultPass title="교육급여 지원 대상이에요">
            <P>소득 기준을 충족하면 초·중·고등학교 재학생에게 교육활동지원비를 지원해요. 주민센터나 복지로에서 신청하면 돼요. 다른 기초생활 급여와 별도로 신청해야 해요.</P>
            <ResultCTA icon="📚" title="복지로 교육급여 신청" desc="온라인으로 바로 신청 가능해요" href="https://www.bokjiro.go.kr" />
          </ResultPass>
        )}
        {result === "not_eligible" && (
          <ResultFail title="소득 기준 초과 시 교육급여 대상이 아니에요">
            <P>중위소득 50%를 초과하면 교육급여 대상이 아니에요. 교육비 지원은 교육청 지원 프로그램, 교육급여 외 장학금 등을 통해 받을 수 있어요.</P>
            <ResultCTA icon="📋" title="다른 교육 지원 찾기" desc="복지로에서 학생 지원 검색" href="https://www.bokjiro.go.kr" />
          </ResultFail>
        )}
        {result === "check" && (
          <ResultFail title="특수학교·대안학교 등은 별도 확인이 필요해요">
            <P>특수학교나 인가된 대안학교도 교육급여 지원 대상일 수 있어요. 비인가 대안학교나 방송통신학교는 지원 범위가 다를 수 있으니 주민센터에서 직접 확인하세요.</P>
            <ResultCTA icon="📋" title="교육급여 지원 학교 확인" desc="주민센터에서 대상 여부 조회" href="https://www.bokjiro.go.kr" />
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="학교급별 지원 금액이 얼마인지 궁금하시죠?"
        a="초등 487,000원, 중학 679,000원, 고등 768,000원이에요."
        label="지원 금액 자세히 보기"
        href="#s3"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="기초생활수급자 교육급여 신청 조건은 무엇인가요?" sub="중위소득 50% · 부양의무자 폐지" />
      <P>교육급여는 <A href="https://www.law.go.kr/법령/국민기초생활보장법">국민기초생활보장법</A>에 근거해 운영되는 급여 중 하나예요. 선정 기준은 기준 중위소득 50% 이하예요. 4인 가구 기준으로 월 소득인정액 약 300만원 이하가 기준이에요.</P>
      <P>교육급여는 다른 급여와 달리 부양의무자 기준이 없어요. 부모님 또는 자녀의 소득이 높아도 본인 가구 소득인정액이 기준 이하면 받을 수 있어요. 이 점이 생계·의료급여와 다른 부분이에요.</P>
      <P>수급자 본인이 아니라 자녀가 수혜 대상이에요. 수급 가구의 초·중·고교 재학생이라면 학교급에 맞는 교육활동지원비를 받아요. 가구에 여러 명의 자녀가 있다면 각 자녀마다 지원을 받아요.</P>
      <P>외국 국적 자녀도 국내 학교에 재학 중이면 지원 대상이 될 수 있어요. 다문화 가족이나 외국인 가구도 소득 기준을 충족하면 신청할 수 있어요. 주민센터에서 구체적인 조건을 확인해야 해요.</P>

      <H3>교육급여 2026년 선정 기준</H3>
      <TableTitle>가구원 수별 교육급여 선정 기준소득 (2026년)</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>가구원 수</THL><TH>기준 중위소득 50%</TH></tr>
          </thead>
          <tbody>
            {[
              ["1인 가구", "약 1,160,649원"],
              ["2인 가구", "약 1,917,922원"],
              ["3인 가구", "약 2,455,540원"],
              ["4인 가구", "약 2,983,289원"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 10px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>소득인정액은 실제 소득 외에 재산 환산액이 포함돼요. 복지로에서 모의계산이 가능해요.</TableNote>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="교육급여 초중고 지원 금액은 얼마인가요?" sub="학교급별 교육활동지원비" />
      <P>2026년 교육활동지원비는 초등학생 487,000원, 중학생 679,000원, 고등학생 768,000원이에요. 연 1회 지급되며, 바우처(교육급여 카드) 형태로 받아요.</P>
      <P>교육급여 카드는 학용품·학습교재·문구류·교복·도서·체험학습비 등 교육 목적으로 사용할 수 있어요. 일반 카드처럼 온라인·오프라인 모두 사용 가능하고, 사용처 제한이 있어요. 외식·여행 등 교육과 무관한 곳은 사용할 수 없어요.</P>
      <P>고등학생은 교육활동지원비 외에 수업료와 교과서 대금도 별도 지원받아요. 수업료는 학교에 직접 지급되고, 교과서도 무상으로 지원돼요. 사립 고등학교 재학생도 수업료 지원 대상이에요.</P>
      <P>교육활동지원비는 3월에 일괄 지급되는 게 원칙이에요. 단, 당해 연도 중 수급자로 선정된 경우는 선정 이후 남은 기간에 비례해서 받을 수 있어요. 전액을 받지 못하는 경우도 있어요.</P>

      <H3>학교급별 지원 내용 정리</H3>
      <TableTitle>2026년 교육급여 지원 내용</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>구분</THL><TH>교육활동지원비</TH><TH>수업료</TH><TH>교과서</TH></tr>
          </thead>
          <tbody>
            {[
              ["초등학교", "487,000원", "해당 없음", "국정교과서 지원"],
              ["중학교", "679,000원", "해당 없음", "국정교과서 지원"],
              ["고등학교", "768,000원", "실비 지원", "검정교과서 포함 지원"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 10px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>교육활동지원비는 연 1회 바우처로 지급돼요. 수업료·교과서는 학교로 직접 지급돼요.</TableNote>

      <RelatedMid
        title="복지 지원 관련 글도 확인해 보세요"
        items={[
          { icon: "🏠", title: "기초생활수급자 주거급여 2026", desc: "임차가구 월 최대 341,000원", href: "/w/기초생활수급자-주거급여-2026" },
          { icon: "👨‍👩‍👧", title: "한부모가족 지원금 신청", desc: "양육비·아동 지원 금액 2026", href: "/w/한부모가족-지원금-신청-자격" },
          { icon: "🏡", title: "차상위계층 확인서 발급", desc: "복지로 신청 지원 혜택 종류", href: "/w/차상위계층-확인서-발급" },
        ]}
        hubHref="/category/복지"
        hubLabel="복지 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="기초생활수급자 교육활동비 신청 방법은 어떻게 되나요?" sub="복지로 · 학교 신청 · 교육급여 카드" />
      <P>교육급여 신청은 가구 대표자 또는 보호자가 주민등록 주소지 관할 읍·면·동 주민센터에서 할 수 있어요. 복지로(bokjiro.go.kr)에서 온라인으로도 신청 가능해요.</P>
      <P>신청 시 필요한 주요 서류는 사회보장급여 신청서, 금융정보 제공 동의서, 재학증명서(해당 자녀)예요. 주민등록등본과 건강보험료 납부 확인서는 담당자가 직접 조회하므로 별도 제출이 필요 없는 경우가 많아요.</P>
      <P>교육급여 카드는 학교에서 배부하거나 신청서를 통해 발급받아요. 초·중학생은 카드사 앱이나 홈페이지에서 발급 현황을 확인할 수 있어요. 카드를 분실하면 재발급 신청이 가능해요.</P>
      <P>한 번 수급자로 선정되면 이후 매년 자동으로 지원되지 않아요. 소득 상황이 바뀌면 수급 자격이 박탈될 수 있어요. 매년 정기 조사를 통해 수급 자격을 유지하는지 확인해요.</P>

      <H3>신청 절차 요약</H3>
      <Info type="tip">{"복지로(bokjiro.go.kr)에서 온라인으로 신청하면 주민센터 방문 없이 처리할 수 있어요. 공동인증서가 필요해요."}</Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="기초생활수급자 교육급여 지원 대상 학교는 어디인가요?" sub="국공립·사립·특수학교 범위" />
      <P>지원 대상 학교는 초·중등교육법에 따라 설립된 학교예요. 국공립 초·중·고등학교, 사립 초·중·고등학교, 특수학교가 포함돼요. 의무교육 대상 학교와 인가를 받은 학교가 해당해요.</P>
      <P>비인가 대안학교는 지원 대상이 아니에요. 교육청 인가를 받은 대안학교는 지원이 가능하지만, 미인가는 제외돼요. 학교 인가 여부는 학교 측이나 주민센터에서 확인할 수 있어요.</P>
      <P>방송통신고등학교도 일반 고등학교처럼 수업료·교과서를 지원받을 수 있어요. 야간 학교나 성인을 위한 교육 기관도 학교 유형에 따라 달라질 수 있으니 개별 확인이 필요해요.</P>
      <P>검정고시는 교육급여 대상이 아니에요. 학교에 재학 중인 학생이 대상이에요. 검정고시를 통해 학력을 취득하려는 경우는 교육청 또는 지자체 장학사업을 알아보는 게 좋아요.</P>

      <H3>지원 대상 학교 범위</H3>
      <Info type="warn">{"비인가 대안학교는 지원 대상이 아니에요. 재학 중인 학교 인가 여부를 먼저 확인하세요."}</Info>

      <ExtBtn
        badge="복지로 공식"
        text="기초생활 교육급여 신청"
        cta="온라인 신청하기 →"
        href="https://www.bokjiro.go.kr"
      />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "기초생활수급자 주거급여 2026 | 임차가구 수선비 지원 금액 신청 방법", desc: "주거급여 지원 금액과 신청 방법이에요", href: "/w/기초생활수급자-주거급여-2026" },
        { title: "차상위계층 확인서 발급 방법 | 복지로 신청 지원 혜택 종류", desc: "차상위계층 확인서 발급 방법이에요", href: "/w/차상위계층-확인서-발급" },
        { title: "한부모가족 지원금 신청 자격 2026 | 양육비 아동 지원 금액 확인", desc: "한부모가족 지원 금액과 신청 방법이에요", href: "/w/한부모가족-지원금-신청-자격" },
        { title: "노인장기요양보험 등급 신청 방법 | 1등급 2등급 판정 기준 본인부담금", desc: "장기요양등급 신청과 판정 기준이에요", href: "/w/장기요양보험-등급-신청-방법" },
        { title: "장애인 복지카드 발급 신청 방법 | 교통 세금 감면 혜택 종류", desc: "복지카드 발급 방법과 혜택이에요", href: "/w/장애인-복지카드-발급-신청" },
      ]} />

      <PrevNext
        prev={{ title: "기초생활수급자 주거급여 2026 | 임차가구 수선비 지원 금액 신청 방법", href: "/w/기초생활수급자-주거급여-2026" }}
        next={{ title: "노인장기요양보험 등급 신청 방법 | 1등급 2등급 판정 기준 본인부담금", href: "/w/장기요양보험-등급-신청-방법" }}
      />
    </BlogLayout>
  );
}
