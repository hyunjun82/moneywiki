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
  title: "차상위계층 확인서 발급 방법 | 복지로 신청 지원 혜택 종류",
  description: "차상위계층이면 복지 혜택을 추가로 받을 수 있다는 거 아시나요? 확인서 발급 방법과 지원 혜택을 알려드려요.",
  category: "복지",
  keywords: [
    "차상위계층 확인서 발급 소득 기준",
    "차상위계층 복지 혜택 감면 항목",
    "차상위계층 확인서 신청 방법 복지로",
    "차상위계층 확인서 유효기간 갱신",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "차상위계층은 기준 중위소득 <strong>50% 이하</strong>이면서 기초수급자가 아닌 가구예요.",
    "에너지·통신비 감면, 의료비 지원, 교육비 지원 등 <strong>다양한 혜택</strong>이 있어요.",
    "확인서는 주민센터 또는 복지로(bokjiro.go.kr)에서 <strong>무료로 발급</strong>돼요.",
  ],
  sources: [
    { name: "국민기초생활보장법 시행규칙 차상위계층 기준", url: "https://www.law.go.kr/법령/국민기초생활보장법", date: "2026-02" },
    { name: "복지로 차상위계층 지원 안내", url: "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00002830", date: "2026-02" },
  ],
  faq: [
    { q: "차상위계층 확인서가 있으면 바로 혜택을 받을 수 있나요?", a: "확인서는 차상위계층임을 증명하는 서류예요. 각 혜택을 받으려면 해당 기관이나 서비스에 별도로 신청해야 해요. 확인서를 발급받은 후 에너지 복지·통신비 감면 등 각 사업에 개별 신청이 필요해요." },
    { q: "차상위계층 확인서는 얼마나 유효한가요?", a: "일반적으로 발급일로부터 1년이 유효기간이에요. 유효기간이 지나면 갱신 신청이 필요해요. 소득·재산 변동이 있으면 갱신 심사에서 자격이 박탈될 수도 있어요." },
  ],
  ctaCard: {
    label: "혜택 확인",
    mainText: "중위소득 50% 이하 → 차상위계층",
    subText: "에너지·통신·의료비 감면 혜택",
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
    const { income, current_benefit } = sel;
    if (!income || !current_benefit) return null;
    if (income === "over") return "not_eligible";
    if (income === "under" && current_benefit === "basic") return "already_basic";
    if (income === "under") return "eligible";
    return "check";
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 차상위계층 해당 여부 확인" },
    { t: "차상위계층 확인서 발급 소득 기준은 무엇인가요?", sub: "중위소득 50% 이하 · 재산 기준" },
    { t: "차상위계층 복지 혜택 감면 항목은 무엇인가요?", sub: "에너지·통신비·의료비·교육비" },
    { t: "차상위계층 확인서 신청 방법은 어떻게 되나요?", sub: "복지로 온라인 · 주민센터 방문" },
    { t: "차상위계층 확인서 유효기간과 갱신은 어떻게 되나요?", sub: "1년 유효 · 갱신 신청" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "복지", "차상위계층"]}
      tags={["2026년 최신", "복지", "차상위계층", "지원 혜택"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>차상위계층은 <strong>중위소득 50% 이하</strong>로 기초수급자가 아닌 가구예요. 확인서 하나로 에너지·통신·의료비 감면 혜택을 받을 수 있어요.</>}
      sourceBar={{ badge: "복지로", name: "차상위계층 지원 안내", date: "2026.02" }}
      stickyLabel="차상위계층 기준"
      stickyValue="중위소득 50% 이하"
      stickyBtn="혜택 목록 확인 ↑"
      disclaimer="이 글은 국민기초생활보장법과 복지로 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "📋", title: "복지로 차상위 신청", sub: "온라인 신청 가능", href: "https://www.bokjiro.go.kr", hot: true },
          { icon: "🏠", title: "주거급여 2026", sub: "기초수급자 주거 지원", href: "/w/기초생활수급자-주거급여-2026" },
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
      <Sec n="STEP 01" id="checker" title="차상위계층 해당 여부 확인" sub="소득 수준 · 현재 수급 상태 선택" />
      <P>차상위계층 여부를 확인하기 전에 소득인정액을 대략 알아야 해요. 소득인정액은 실제 소득과 재산 환산액을 합산한 금액이에요. 아래에서 상황을 선택하면 해당 여부를 알 수 있어요.</P>

      <CheckerShell title="차상위계층에 해당하나요?" sub="30초 확인">
        <CheckerQ n="1" label="가구 소득인정액이 중위소득 50% 이하인가요?" group="income" opts={[
          ["under", "네, 50% 이하인 것 같아요"],
          ["over", "초과하는 것 같아요"],
          ["unknown", "잘 모르겠어요 (복지로에서 확인 필요)"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="현재 기초생활수급자(생계·주거·의료급여)를 받고 있나요?" group="current_benefit" opts={[
          ["basic", "네, 이미 기초수급자예요"],
          ["none", "아니요, 기초수급자는 아니에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="3" label="주민등록 기준 가구원 수가 몇 명인가요?" group="family" opts={[
          ["1", "1인 가구예요"],
          ["2", "2인 가구예요"],
          ["3plus", "3인 이상 가구예요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="4" label="에너지·통신비 감면 혜택을 받은 적 있나요?" group="existing" opts={[
          ["no", "없어요"],
          ["yes", "이미 일부 받고 있어요"],
        ]} sel={sel} pick={pick} />

        {result === "eligible" && (
          <ResultPass title="차상위계층 신청이 가능해요">
            <P>소득인정액이 중위소득 50% 이하이면 차상위계층으로 선정될 수 있어요. 주민센터나 복지로에서 확인서 발급을 신청하면 돼요. 심사 후 선정되면 다양한 감면 혜택을 받을 수 있어요.</P>
            <ResultCTA icon="📋" title="복지로 차상위 신청" desc="온라인으로 바로 신청 가능해요" href="https://www.bokjiro.go.kr" />
          </ResultPass>
        )}
        {result === "already_basic" && (
          <ResultPass title="기초수급자는 차상위 혜택 중 일부를 자동으로 받아요">
            <P>기초생활수급자는 이미 더 많은 혜택을 받고 있어요. 차상위계층 확인서는 별도 발급이 필요하지 않을 수 있어요. 단, 일부 사업은 차상위 확인서가 필요하니 주민센터에서 확인하세요.</P>
            <ResultCTA icon="📋" title="수급자 혜택 목록 확인" desc="복지로에서 받을 수 있는 혜택 조회" href="https://www.bokjiro.go.kr" />
          </ResultPass>
        )}
        {result === "not_eligible" && (
          <ResultFail title="소득인정액 초과 시 차상위계층 대상이 아니에요">
            <P>중위소득 50%를 초과하면 차상위계층 대상이 아니에요. 그러나 소득인정액 계산 방식이 복잡하니 복지로에서 모의계산을 해보거나 주민센터에서 상담받는 게 정확해요.</P>
            <ResultCTA icon="📋" title="소득인정액 모의계산" desc="복지로에서 정확히 계산하기" href="https://www.bokjiro.go.kr" />
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="어떤 혜택이 있는지 궁금하시죠?"
        a="에너지·통신비 감면부터 의료비·교육비 지원까지 다양해요."
        label="지원 혜택 목록 바로 보기"
        href="#s3"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="차상위계층 확인서 발급 소득 기준은 무엇인가요?" sub="중위소득 50% 이하 · 재산 기준" />
      <P>차상위계층은 <A href="https://www.law.go.kr/법령/국민기초생활보장법">국민기초생활보장법</A>에 규정된 계층이에요. 소득인정액이 기준 중위소득 50% 이하이면서 기초생활수급자로 선정되지 않은 가구를 말해요.</P>
      <P>소득인정액은 실제 소득과 재산 환산액을 합산해 계산해요. 월급·사업소득·연금·금융소득을 합산하고, 토지·건물·금융재산 등을 소득으로 환산해요. 재산이 많으면 소득이 적어도 차상위계층 기준을 초과할 수 있어요.</P>
      <P>2026년 기준 중위소득 50%는 1인 가구 기준 월 약 116만원, 4인 가구 기준 약 298만원이에요. 정확한 기준은 매년 변경되니 복지로 모의계산으로 확인하는 게 좋아요.</P>
      <P>차상위계층은 별도의 재산 기준이 있어요. 일반재산·금융재산·자동차가 기준을 초과하면 소득인정액이 높아져 탈락할 수 있어요. 소형 주택 한 채를 가진 경우도 재산 환산액이 높을 수 있어요.</P>

      <H3>2026년 차상위계층 소득 기준 (중위소득 50%)</H3>
      <TableTitle>가구원 수별 소득인정액 기준</TableTitle>
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
      <TableNote>소득인정액에는 재산 환산액이 포함돼요. 단순 월급만으로 판단하면 안 돼요.</TableNote>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="차상위계층 복지 혜택 감면 항목은 무엇인가요?" sub="에너지·통신비·의료비·교육비" />
      <P>차상위계층으로 선정되면 다양한 감면·지원 혜택을 받을 수 있어요. 대표적으로 에너지 복지, 통신요금 감면, 의료비 지원, 교육비 지원이 있어요.</P>
      <P>에너지 복지는 동절기·하절기 난방·냉방비를 지원해요. 연탄·등유·가스 등 연료비를 보조해주거나 전기요금을 감면해줘요. 한국에너지재단이나 주민센터를 통해 신청할 수 있어요.</P>
      <P>통신요금 감면은 월 최대 26,000원 감면이에요. 이동통신, 유선전화, 초고속인터넷 요금이 해당돼요. 이동통신사에 직접 신청하거나 복지로를 통해 신청할 수 있어요.</P>
      <P>의료비 지원은 의료급여 2종 수급자와 동일한 수준으로 본인부담금을 낮춰줘요. 교육비 지원은 학교 급식비·교육활동비 등이 포함돼요. 각 혜택은 별도로 신청해야 받을 수 있어요.</P>

      <H3>주요 혜택 목록</H3>
      <TableTitle>차상위계층 주요 지원 혜택</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>혜택 분야</THL><TH>내용</TH><TH>신청처</TH></tr>
          </thead>
          <tbody>
            {[
              ["에너지 복지", "난방비·전기료 감면 지원", "주민센터·한국에너지재단"],
              ["통신요금 감면", "월 최대 26,000원", "이동통신사 직접 신청"],
              ["의료비 지원", "본인부담금 경감 (의료급여 2종 수준)", "주민센터"],
              ["교육비 지원", "급식비·교육활동비 등", "학교·주민센터"],
              ["문화누리카드", "연 11만원 문화·여행 바우처", "주민센터·복지로"],
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

      <RelatedMid
        title="복지 지원 관련 글도 확인해 보세요"
        items={[
          { icon: "🏠", title: "기초생활수급자 주거급여 2026", desc: "임차가구 월 최대 341,000원", href: "/w/기초생활수급자-주거급여-2026" },
          { icon: "👨‍👩‍👧", title: "한부모가족 지원금 신청", desc: "양육비·아동 지원 금액 2026", href: "/w/한부모가족-지원금-신청-자격" },
          { icon: "📚", title: "기초생활수급자 교육급여", desc: "초중고 교육활동비 지원", href: "/w/기초생활수급자-교육급여-신청" },
        ]}
        hubHref="/category/복지"
        hubLabel="복지 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="차상위계층 확인서 신청 방법은 어떻게 되나요?" sub="복지로 온라인 · 주민센터 방문" />
      <P>차상위계층 확인서는 주민등록 주소지 관할 읍·면·동 주민센터에서 신청할 수 있어요. 복지로(bokjiro.go.kr) 홈페이지에서도 온라인으로 신청할 수 있어요. 공동인증서가 있으면 온라인 신청이 더 편리해요.</P>
      <P>신청 시 필요한 서류는 사회보장급여 신청서, 금융정보 제공 동의서예요. 주민등록등본·건강보험료 납부 확인서는 담당자가 직접 조회해요. 추가 서류가 필요한 경우 주민센터에서 안내해줘요.</P>
      <P>신청 후 소득·재산 조사가 진행돼요. 조사는 약 2~4주 걸려요. 선정되면 차상위계층 확인서를 발급해줘요. 확인서 발급은 무료예요.</P>
      <P>확인서가 발급되면 각 혜택을 개별적으로 신청해야 해요. 에너지 지원은 주민센터, 통신요금 감면은 이동통신사, 의료비 지원은 건강보험공단 등 각 기관에 따로 신청이 필요해요.</P>

      <H3>신청 시 필요한 서류 목록</H3>
      <Info type="tip">{"복지로(bokjiro.go.kr)에서 온라인 신청하면 주민센터 방문 없이 처리할 수 있어요. 공동인증서가 필요해요."}</Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="차상위계층 확인서 유효기간과 갱신은 어떻게 되나요?" sub="1년 유효 · 갱신 신청" />
      <P>차상위계층 확인서의 유효기간은 발급일로부터 1년이에요. 매년 새로 신청해야 확인서가 유지돼요. 갱신 시에도 소득·재산 조사를 새로 해요.</P>
      <P>소득이나 재산이 늘어나면 갱신에서 탈락할 수 있어요. 반대로 자격이 유지되면 계속 혜택을 받을 수 있어요. 변동 사항이 생기면 주민센터에 신고해야 해요.</P>
      <P>갱신 신청은 기존과 동일한 방법으로 하면 돼요. 주민센터 방문이나 복지로 온라인 신청이 가능해요. 만료 전에 미리 갱신 신청을 하면 혜택이 끊기지 않아요.</P>
      <P>확인서가 만료된 경우 그동안 받던 혜택이 중단될 수 있어요. 통신요금 감면, 에너지 복지 등은 자격 만료 시 자동으로 해지되는 경우가 있어요. 갱신을 빠트리지 않도록 주의해야 해요.</P>

      <H3>갱신 주의사항</H3>
      <Info type="warn">{"유효기간이 지나면 혜택이 중단될 수 있어요. 매년 갱신 신청을 잊지 마세요."}</Info>

      <ExtBtn
        badge="복지로 공식"
        text="차상위계층 확인서 신청"
        cta="온라인 신청하기 →"
        href="https://www.bokjiro.go.kr"
      />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "기초생활수급자 주거급여 2026 | 임차가구 수선비 지원 금액 신청 방법", desc: "주거급여 지원 금액과 신청 방법이에요", href: "/w/기초생활수급자-주거급여-2026" },
        { title: "기초생활수급자 교육급여 신청 조건 | 초중고 교육활동비 지원 금액 2026", desc: "교육급여 지원 금액과 신청 방법이에요", href: "/w/기초생활수급자-교육급여-신청" },
        { title: "한부모가족 지원금 신청 자격 2026 | 양육비 아동 지원 금액 확인", desc: "한부모가족 지원 금액과 신청 방법이에요", href: "/w/한부모가족-지원금-신청-자격" },
        { title: "노인장기요양보험 등급 신청 방법 | 1등급 2등급 판정 기준 본인부담금", desc: "장기요양등급 신청과 판정 기준이에요", href: "/w/장기요양보험-등급-신청-방법" },
        { title: "장애인 복지카드 발급 신청 방법 | 교통 세금 감면 혜택 종류", desc: "복지카드 발급 방법과 혜택이에요", href: "/w/장애인-복지카드-발급-신청" },
      ]} />

      <PrevNext
        prev={{ title: "노인장기요양보험 등급 신청 방법 | 1등급 2등급 판정 기준 본인부담금", href: "/w/장기요양보험-등급-신청-방법" }}
        next={{ title: "한부모가족 지원금 신청 자격 2026 | 양육비 아동 지원 금액 확인", href: "/w/한부모가족-지원금-신청-자격" }}
      />
    </BlogLayout>
  );
}
