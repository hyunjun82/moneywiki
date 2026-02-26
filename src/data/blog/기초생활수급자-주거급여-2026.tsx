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
  title: "기초생활수급자 주거급여 2026 | 임차가구 수선비 지원 금액 신청 방법",
  description: "기초생활수급자 주거급여가 임차가구와 자가가구로 나뉜다는 거 아시나요? 2026년 지원 금액과 신청 방법을 알려드려요.",
  category: "복지",
  keywords: [
    "기초생활수급자 주거급여 신청 자격",
    "주거급여 임차가구 지원 금액 2026",
    "주거급여 수선비 지원 자가가구",
    "기초생활수급자 주거급여 신청 방법",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "2026년 주거급여 선정 기준은 기준 중위소득 <strong>48%</strong> 이하예요.",
    "임차가구는 지역·가구원수별 <strong>기준임대료 이하</strong> 실제 임차료를 지원받아요.",
    "자가가구는 노후도에 따라 <strong>최대 1,241만원</strong>의 수선비를 받을 수 있어요.",
  ],
  sources: [
    { name: "국토교통부 2026년 주거급여 지원 기준", url: "https://www.molit.go.kr/USR/BORD0201/m_34/DTL.jsp?id=wp_policy&idx=18126", date: "2026-02" },
    { name: "주거급여 포털", url: "https://www.hb.go.kr/", date: "2026-02" },
  ],
  faq: [
    { q: "주거급여 받으면서 전입신고를 안 해도 되나요?", a: "아니에요. 임차가구 주거급여를 받으려면 실제 거주하는 주소에 전입신고가 되어 있어야 해요. 전입신고와 임대차계약서상 주소가 일치해야 지원을 받을 수 있어요." },
    { q: "주거급여 신청 후 얼마나 걸려요?", a: "신청 후 약 30일 이내에 결정 통보가 돼요. 소득·재산 조사 기간에 따라 다소 차이가 있을 수 있어요. 급여 지급은 결정 통보 후 다음 달부터 지급돼요." },
  ],
  ctaCard: {
    label: "지원 확인",
    mainText: "임차가구 기준임대료 지원",
    subText: "1인 가구 서울 기준 341,000원",
    url: "https://www.bokjiro.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "기초생활수급자 교육급여", url: "/w/기초생활수급자-교육급여-신청" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { income, tenure, region } = sel;
    if (!income || !tenure || !region) return null;
    if (income === "over") return "not_eligible";
    if (income === "under" && tenure === "rent") return "rent_support";
    if (income === "under" && tenure === "own") return "repair_support";
    return "check";
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 주거급여 지원 가능 여부 확인" },
    { t: "기초생활수급자 주거급여 신청 자격은 무엇인가요?", sub: "중위소득 48% · 부양의무자 기준 완화" },
    { t: "주거급여 임차가구 지원 금액은 얼마인가요?", sub: "지역별 기준임대료 · 실지급액" },
    { t: "주거급여 수선비 지원은 어떻게 되나요?", sub: "자가가구 노후도별 최대 1,241만원" },
    { t: "기초생활수급자 주거급여 신청 방법은 어떻게 되나요?", sub: "복지로 · 주민센터 신청 절차" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "복지", "기초생활수급자"]}
      tags={["2026년 최신", "복지", "주거급여", "기초생활수급자"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>2026년 기초생활수급자 주거급여는 <strong>중위소득 48% 이하</strong>이면 신청할 수 있어요. 임차가구는 기준임대료, 자가가구는 수선비를 지원받아요.</>}
      sourceBar={{ badge: "국토교통부", name: "2026년 주거급여 지원 기준", date: "2026.02" }}
      stickyLabel="주거급여 선정 기준"
      stickyValue="중위소득 48% 이하"
      stickyBtn="지원 금액 확인 ↑"
      disclaimer="이 글은 국토교통부와 주거급여 포털을 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "🏠", title: "복지로 주거급여 신청", sub: "온라인 신청 가능", href: "https://www.bokjiro.go.kr", hot: true },
          { icon: "📚", title: "교육급여 지원 금액", sub: "초중고 교육활동비 지원", href: "/w/기초생활수급자-교육급여-신청" },
          { icon: "🏡", title: "생애최초 취득세 감면", sub: "주택 취득세 200만원 면제", href: "/w/생애최초-취득세-감면-조건-2026" },
        ]} />
        <SidebarDocs items={[
          { title: "기초생활수급자 교육급여", cat: "복지·지원금", href: "/w/기초생활수급자-교육급여-신청" },
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
      <Sec n="STEP 01" id="checker" title="주거급여 지원 가능 여부 확인" sub="소득 · 거주 유형 · 지역 선택" />
      <P>주거급여는 소득이 기준을 충족하고 주거 불안정 상황에 있는 가구를 지원하는 제도예요. 임차가구와 자가가구에 따라 지원 내용이 달라요. 아래에서 내 상황을 선택해보세요.</P>

      <CheckerShell title="주거급여를 받을 수 있을까요?" sub="30초 확인">
        <CheckerQ n="1" label="가구 소득인정액이 중위소득 48% 이하인가요?" group="income" opts={[
          ["under", "네, 48% 이하예요"],
          ["over", "초과하는 것 같아요"],
          ["unknown", "잘 모르겠어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="현재 거주 형태가 어떻게 되나요?" group="tenure" opts={[
          ["rent", "월세·전세로 거주 중이에요"],
          ["own", "본인 명의 주택에 거주해요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="3" label="거주 지역이 어디인가요?" group="region" opts={[
          ["seoul", "서울이에요"],
          ["metro", "경기·인천·광역시예요"],
          ["other", "기타 지역이에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="4" label="주민등록상 주소와 실거주지가 일치하나요?" group="registered" opts={[
          ["yes", "일치해요"],
          ["no", "다른 주소예요"],
        ]} sel={sel} pick={pick} />

        {result === "rent_support" && (
          <ResultPass title="임차가구 기준임대료를 지원받을 수 있어요">
            <P>임차가구는 실제 임차료와 기준임대료 중 낮은 금액을 지원받아요. 서울 기준 1인 가구는 월 최대 341,000원이에요. 주민센터 또는 복지로에서 신청할 수 있어요.</P>
            <ResultCTA icon="🏠" title="복지로 주거급여 신청" desc="온라인으로 바로 신청 가능해요" href="https://www.bokjiro.go.kr" />
          </ResultPass>
        )}
        {result === "repair_support" && (
          <ResultPass title="자가가구 수선비를 지원받을 수 있어요">
            <P>자가가구는 주택 노후도 등급에 따라 경·중·대보수로 나눠 수선비를 지원받아요. 최대 1,241만원까지 지원 가능해요. 주민센터에서 신청하면 돼요.</P>
            <ResultCTA icon="🏠" title="복지로 자가가구 수선 신청" desc="노후도 진단 후 수선 지원받기" href="https://www.bokjiro.go.kr" />
          </ResultPass>
        )}
        {result === "not_eligible" && (
          <ResultFail title="소득 기준을 초과하면 주거급여 대상이 아니에요">
            <P>중위소득 48%를 초과하면 주거급여 대상이 아니에요. 다른 주거 지원 사업(전세자금대출, 청년 임차보증금 지원 등)을 알아보는 게 도움이 될 수 있어요.</P>
            <ResultCTA icon="📋" title="다른 주거 지원 찾아보기" desc="복지로에서 다양한 지원금 검색" href="https://www.bokjiro.go.kr" />
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="임차가구 지원 금액이 얼마인지 궁금하시죠?"
        a="서울 1인 기준 월 최대 341,000원, 가구원 수와 지역에 따라 달라요."
        label="임차가구 지원 금액 바로 보기"
        href="#s3"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="기초생활수급자 주거급여 신청 자격은 무엇인가요?" sub="중위소득 48% · 부양의무자 기준 완화" />
      <P>주거급여는 <A href="https://www.molit.go.kr">국토교통부</A>가 운영하는 기초생활보장급여예요. 소득인정액이 기준 중위소득 48% 이하인 가구가 신청할 수 있어요. 2026년 기준 1인 가구는 월 소득인정액 약 112만원 이하예요.</P>
      <P>주거급여는 부양의무자 기준이 완전히 폐지됐어요. 2021년부터 부양의무자 유무와 관계없이 본인 가구 소득·재산만으로 선정해요. 부모님이나 자녀의 소득이 많아도 본인 소득이 기준 이하면 받을 수 있어요.</P>
      <P>주민등록상 주소와 실거주지가 일치해야 해요. 임차가구는 임대차계약서와 주민등록 주소가 같아야 지원을 받을 수 있어요. 전입신고가 되어 있지 않으면 지원 대상에서 제외될 수 있어요.</P>
      <P>기초수급자가 아닌 차상위계층도 주거급여를 받을 수 있어요. 다른 급여(생계·의료·교육)는 안 되더라도 주거급여만 받는 경우도 있어요. 이 경우 주거급여 수급자로 분류돼요.</P>

      <H3>2026년 주거급여 선정 기준</H3>
      <TableTitle>가구원 수별 소득인정액 기준 (2026년)</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>가구원 수</THL><TH>기준 중위소득 48%</TH></tr>
          </thead>
          <tbody>
            {[
              ["1인 가구", "약 1,114,223원"],
              ["2인 가구", "약 1,841,305원"],
              ["3인 가구", "약 2,357,329원"],
              ["4인 가구", "약 2,864,957원"],
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
      <TableNote>소득인정액 기준은 매년 변경돼요. 정확한 금액은 복지로(bokjiro.go.kr)에서 모의계산으로 확인하세요.</TableNote>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="주거급여 임차가구 지원 금액은 얼마인가요?" sub="지역별 기준임대료 · 실지급액" />
      <P>임차가구는 실제 내는 임차료와 지역별 기준임대료 중 낮은 금액을 지원받아요. 실제 월세가 기준임대료보다 낮으면 실제 월세 전액을 지원해요. 기준임대료보다 높으면 기준임대료만 지원해요.</P>
      <P>기준임대료는 지역과 가구원 수에 따라 달라요. 서울이 가장 높고, 그다음 경기·인천, 광역시, 그 외 지역 순이에요. 가구원 수가 많을수록 기준임대료도 높아져요.</P>
      <P>전세가구도 주거급여 지원을 받을 수 있어요. 전세보증금을 월세로 환산(월세 전환율 적용)해서 기준임대료와 비교해요. 실제 월세가 없어도 전세보증금 규모에 따라 지원 여부가 결정돼요.</P>

      <H3>지역별 기준임대료 (1인 가구 기준)</H3>
      <TableTitle>2026년 주거급여 기준임대료 (1인 가구)</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>지역</THL><TH>1인 가구</TH><TH>2인 가구</TH><TH>4인 가구</TH></tr>
          </thead>
          <tbody>
            {[
              ["서울", "341,000원", "382,000원", "480,000원"],
              ["경기·인천", "268,000원", "300,000원", "376,000원"],
              ["광역시·세종·특별자치시", "216,000원", "240,000원", "302,000원"],
              ["그 외 지역", "178,000원", "198,000원", "248,000원"],
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
      <TableNote>2026년 기준임대료는 변동될 수 있어요. 주거급여 포털(hb.go.kr)에서 최신 금액을 확인하세요.</TableNote>

      <RelatedMid
        title="복지 지원 관련 글도 확인해 보세요"
        items={[
          { icon: "📚", title: "기초생활수급자 교육급여", desc: "초중고 교육활동비 지원 금액", href: "/w/기초생활수급자-교육급여-신청" },
          { icon: "👨‍👩‍👧", title: "한부모가족 지원금 신청", desc: "양육비·아동 지원 금액 2026", href: "/w/한부모가족-지원금-신청-자격" },
          { icon: "🏠", title: "차상위계층 확인서 발급", desc: "복지로 신청 혜택 종류", href: "/w/차상위계층-확인서-발급" },
        ]}
        hubHref="/category/복지"
        hubLabel="복지 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="주거급여 수선비 지원은 어떻게 되나요?" sub="자가가구 노후도별 최대 1,241만원" />
      <P>자가가구 주거급여는 노후된 주택을 수리하는 비용을 지원해요. 주택 노후도를 경·중·대보수 3단계로 구분하고, 단계별로 지원금이 달라요. 현금이 아니라 직접 공사를 발주하는 방식이에요.</P>
      <P>경보수는 도배·장판 등 가벼운 수선이에요. 457만원 한도로 지원해요. 중보수는 오·폐수·단열 등 중간 수준 수선으로 849만원 한도예요. 대보수는 지붕·기둥 등 구조 보강으로 최대 1,241만원이에요.</P>
      <P>수선 지원은 3년에 한 번씩 받을 수 있어요. 같은 가구가 매년 받을 수는 없어요. 노후도 진단은 LH(한국토지주택공사)가 실시하고, 결과에 따라 어떤 수선을 지원받는지 결정돼요.</P>

      <H3>수선 유형별 지원 한도</H3>
      <Info type="tip">{"자가 주택 수선비는 한 번에 큰 금액이 들어가는 경우가 많아요. 미리 주민센터에서 노후도 진단 신청을 해두는 게 좋아요."}</Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="기초생활수급자 주거급여 신청 방법은 어떻게 되나요?" sub="복지로 · 주민센터 신청 절차" />
      <P>신청은 주민등록 주소지 관할 읍·면·동 주민센터에서 할 수 있어요. 복지로(bokjiro.go.kr) 홈페이지에서 온라인 신청도 가능해요. 온라인 신청 시 공동인증서가 필요해요.</P>
      <P>신청 시 필요한 서류는 사회보장급여 신청서, 금융정보 제공 동의서, 임대차계약서(임차가구), 통장 사본이에요. 주민등록등본은 담당자가 직접 조회하므로 별도 제출이 불필요한 경우도 있어요.</P>
      <P>신청 후 소득·재산 조사와 주택 조사가 진행돼요. 임차가구는 임대차계약서와 실거주 여부를 확인하고, 자가가구는 주택 노후도 진단을 받아요. 전체 처리 기간은 약 30~60일이에요.</P>
      <P>주거급여는 매월 20일에 지급돼요. 신청 월분부터 소급 적용되는 경우도 있어요. 수급자로 선정된 후 임대차계약이 바뀌거나 이사를 하면 변경 신고를 해야 계속 지원받을 수 있어요.</P>

      <H3>주거급여 신청 서류 목록</H3>
      <Info type="warn">{"임차가구는 임대차계약서상 주소와 전입신고 주소가 일치해야 해요. 다른 경우 지원이 거절될 수 있어요."}</Info>

      <ExtBtn
        badge="복지로 공식"
        text="기초생활 주거급여 신청"
        cta="온라인 신청하기 →"
        href="https://www.bokjiro.go.kr"
      />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "기초생활수급자 교육급여 신청 조건 | 초중고 교육활동비 지원 금액 2026", desc: "교육급여 지원 금액과 신청 방법이에요", href: "/w/기초생활수급자-교육급여-신청" },
        { title: "차상위계층 확인서 발급 방법 | 복지로 신청 지원 혜택 종류", desc: "차상위계층 확인서 발급 방법이에요", href: "/w/차상위계층-확인서-발급" },
        { title: "한부모가족 지원금 신청 자격 2026 | 양육비 아동 지원 금액 확인", desc: "한부모가족 지원 금액과 신청 방법이에요", href: "/w/한부모가족-지원금-신청-자격" },
        { title: "생애최초 주택 취득세 감면 조건 2026 | 1주택 200만원 면제 신청 방법", desc: "생애최초 취득세 200만원 감면이에요", href: "/w/생애최초-취득세-감면-조건-2026" },
        { title: "노인장기요양보험 등급 신청 방법 | 1등급 2등급 판정 기준 본인부담금", desc: "장기요양등급 신청과 판정 기준이에요", href: "/w/장기요양보험-등급-신청-방법" },
      ]} />

      <PrevNext
        prev={{ title: "취업후상환 학자금대출 의무 상환 조건 | 소득 초과 상환액 계산 방법", href: "/w/취업후상환-학자금대출-상환" }}
        next={{ title: "기초생활수급자 교육급여 신청 조건 | 초중고 교육활동비 지원 금액 2026", href: "/w/기초생활수급자-교육급여-신청" }}
      />
    </BlogLayout>
  );
}
