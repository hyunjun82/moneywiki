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
  title: "한부모가족 지원금 신청 자격 2026 | 양육비 아동 지원 금액 확인",
  description: "한부모가족이라면 양육비와 아동 지원금을 받을 수 있다는 거 아시나요? 2026년 지원 자격과 금액을 알려드려요.",
  category: "복지",
  keywords: [
    "한부모가족 지원금 신청 자격",
    "한부모가족 양육비 지원 금액 2026",
    "한부모가족 아동 지원금 월 금액",
    "한부모가족 지원금 신청 절차 서류",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "2026년 한부모가족 선정 기준은 기준 중위소득 <strong>63% 이하</strong>예요.",
    "아동 1인당 <strong>월 21만원</strong>(청소년 한부모는 월 35만원)을 지원받아요.",
    "주민센터 또는 복지로에서 <strong>연중 상시 신청</strong>이 가능해요.",
  ],
  sources: [
    { name: "한부모가족지원법 제5조 지원 대상 기준", url: "https://www.law.go.kr/법령/한부모가족지원법", date: "2026-02" },
    { name: "여성가족부 2026년 한부모가족 지원사업 안내", url: "https://www.mogef.go.kr/sp/fam/sp_fam_f005.do", date: "2026-02" },
  ],
  faq: [
    { q: "한부모가족 지원금은 세금이 부과되나요?", a: "아니에요. 한부모가족 아동양육비·아동교육지원비 등은 비과세 소득이에요. 지원금을 받더라도 소득세나 건강보험료 산정에 영향을 주지 않아요." },
    { q: "이혼 후 상대방이 양육비를 주지 않으면 어떻게 하나요?", a: "한국건강가정진흥원의 '양육비이행관리원'에서 양육비 이행 지원을 받을 수 있어요. 상대방이 양육비를 지급하지 않으면 법원에 이행명령 신청을 하거나, 양육비이행관리원을 통해 선지급 제도를 이용할 수 있어요." },
  ],
  ctaCard: {
    label: "지원 확인",
    mainText: "아동 1인당 월 21만원 지원",
    subText: "중위소득 63% 이하 한부모가족",
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
    const { income, family_type, child_age } = sel;
    if (!income || !family_type || !child_age) return null;
    if (income === "over") return "not_eligible";
    if (family_type === "teen_parent") return "teen_parent_support";
    if (income === "under") return "eligible";
    return "check";
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 한부모가족 지원 가능 여부 확인" },
    { t: "한부모가족 지원금 신청 자격은 무엇인가요?", sub: "중위소득 63% · 부양의무자 폐지" },
    { t: "한부모가족 양육비 지원 금액은 얼마인가요?", sub: "아동 월 21만원 · 청소년 35만원" },
    { t: "한부모가족 아동 지원금은 얼마인가요?", sub: "교육·추가 지원 항목 정리" },
    { t: "한부모가족 지원금 신청 절차와 서류는 무엇인가요?", sub: "복지로 · 주민센터 · 제출 서류" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "복지", "한부모가족"]}
      tags={["2026년 최신", "복지", "한부모가족", "양육비지원"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>2026년 한부모가족 지원금은 <strong>중위소득 63% 이하</strong>이면 받을 수 있어요. 아동 1인당 월 21만원, 청소년 한부모는 35만원이에요.</>}
      sourceBar={{ badge: "여성가족부", name: "2026년 한부모가족 지원사업", date: "2026.02" }}
      stickyLabel="아동양육비"
      stickyValue="월 21만원 (청소년 35만원)"
      stickyBtn="지원 자격 확인 ↑"
      disclaimer="이 글은 한부모가족지원법과 여성가족부 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "👨‍👩‍👧", title: "복지로 한부모 지원 신청", sub: "온라인 신청 가능", href: "https://www.bokjiro.go.kr", hot: true },
          { icon: "📚", title: "기초생활수급자 교육급여", sub: "초중고 교육활동비 지원", href: "/w/기초생활수급자-교육급여-신청" },
          { icon: "🏠", title: "기초생활수급자 주거급여", sub: "임차가구 월 최대 341,000원", href: "/w/기초생활수급자-주거급여-2026" },
        ]} />
        <SidebarDocs items={[
          { title: "기초생활수급자 교육급여", cat: "복지·지원금", href: "/w/기초생활수급자-교육급여-신청" },
          { title: "차상위계층 확인서 발급", cat: "복지·지원금", href: "/w/차상위계층-확인서-발급" },
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
      <Sec n="STEP 01" id="checker" title="한부모가족 지원 가능 여부 확인" sub="소득 수준 · 가족 형태 · 자녀 연령 선택" />
      <P>한부모가족 지원금은 소득 기준과 가족 형태 조건을 모두 충족해야 받을 수 있어요. 아래에서 상황을 선택하면 지원 가능 여부와 대략적인 금액을 알 수 있어요.</P>

      <CheckerShell title="한부모가족 지원금을 받을 수 있을까요?" sub="30초 확인">
        <CheckerQ n="1" label="가구 소득인정액이 기준 중위소득 63% 이하인가요?" group="income" opts={[
          ["under", "네, 63% 이하예요"],
          ["over", "초과하는 것 같아요"],
          ["unknown", "잘 모르겠어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="가족 형태가 어떻게 되나요?" group="family_type" opts={[
          ["single_parent", "이혼·사망·미혼 등으로 혼자 자녀를 양육해요"],
          ["teen_parent", "만 24세 이하 청소년 한부모예요"],
          ["grandparent", "조부·조모가 손자녀를 양육해요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="3" label="자녀 나이가 어떻게 되나요?" group="child_age" opts={[
          ["under18", "만 18세 미만이에요 (고등학교 재학 중이면 만 22세까지)"],
          ["over18", "만 18세 이상이에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="4" label="다른 복지 급여를 받고 있나요?" group="benefit" opts={[
          ["basic", "기초생활수급자예요"],
          ["none", "다른 급여 없어요"],
        ]} sel={sel} pick={pick} />

        {result === "eligible" && (
          <ResultPass title="한부모가족 지원금 신청이 가능해요">
            <P>소득 기준을 충족하고 조건에 맞으면 월 21만원의 아동양육비를 받을 수 있어요. 추가로 교육지원비, 생활보조금 등도 신청 가능해요. 주민센터나 복지로에서 신청하면 돼요.</P>
            <ResultCTA icon="👨‍👩‍👧" title="복지로 한부모 지원 신청" desc="온라인으로 바로 신청 가능해요" href="https://www.bokjiro.go.kr" />
          </ResultPass>
        )}
        {result === "teen_parent_support" && (
          <ResultPass title="청소년 한부모는 더 많은 지원을 받아요">
            <P>만 24세 이하 청소년 한부모는 아동양육비 월 35만원, 검정고시 학습비, 자립촉진수당 등 추가 지원이 있어요. 일반 한부모가족보다 더 많은 혜택을 받을 수 있어요.</P>
            <ResultCTA icon="👨‍👩‍👧" title="청소년 한부모 지원 신청" desc="복지로에서 바로 신청 가능해요" href="https://www.bokjiro.go.kr" />
          </ResultPass>
        )}
        {result === "not_eligible" && (
          <ResultFail title="소득 기준 초과 시 지원 대상이 아니에요">
            <P>소득인정액이 중위소득 63%를 초과하면 한부모가족 지원금 대상이 아니에요. 단, 소득인정액 계산이 복잡하니 복지로 모의계산으로 정확히 확인해보세요.</P>
            <ResultCTA icon="📋" title="소득인정액 모의계산" desc="복지로에서 정확히 계산하기" href="https://www.bokjiro.go.kr" />
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="양육비 지원 금액이 얼마인지 궁금하시죠?"
        a="아동 1인당 월 21만원, 청소년 한부모는 월 35만원이에요."
        label="지원 금액 자세히 보기"
        href="#s3"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="한부모가족 지원금 신청 자격은 무엇인가요?" sub="중위소득 63% · 부양의무자 폐지" />
      <P><A href="https://www.law.go.kr/법령/한부모가족지원법">한부모가족지원법</A>에 따라 이혼·사망·미혼 등으로 배우자 없이 자녀를 양육하는 가구를 지원해요. 만 18세 미만 자녀(고등학교 재학 중이면 만 22세까지)를 양육하는 한부모가족이 대상이에요.</P>
      <P>소득 기준은 기준 중위소득 63% 이하예요. 2026년 기준 1인 가구(한부모+자녀) 소득인정액이 월 약 146만원 이하면 해당될 수 있어요. 가구원 수가 많을수록 기준 소득도 높아져요.</P>
      <P>한부모가족 지원에는 부양의무자 기준이 없어요. 부모님이나 형제자매 소득이 높아도 본인 가구 소득인정액만으로 판단해요. 이 점이 기초생활 생계급여와 다른 부분이에요.</P>
      <P>조부·조모가 손자녀를 양육하는 조손가족도 한부모가족에 준하여 지원받을 수 있어요. 아버지 또는 어머니 없이 조부·조모가 양육하는 경우 동일한 신청 방법으로 지원받을 수 있어요.</P>

      <H3>지원 대상 한부모가족 유형</H3>
      <TableTitle>한부모가족 지원 대상 유형</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>가족 유형</THL><TH>내용</TH><TH>자녀 연령</TH></tr>
          </thead>
          <tbody>
            {[
              ["이혼 한부모", "이혼 후 자녀 양육 가구", "만 18세 미만 (재학 시 22세)"],
              ["사별 한부모", "배우자 사망 후 자녀 양육", "만 18세 미만 (재학 시 22세)"],
              ["미혼 한부모", "결혼 없이 자녀 양육", "만 18세 미만 (재학 시 22세)"],
              ["청소년 한부모", "만 24세 이하 한부모", "추가 지원 대상"],
              ["조손가족", "조부·조모가 손자녀 양육", "동일 기준 적용"],
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

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="한부모가족 양육비 지원 금액은 얼마인가요?" sub="아동 월 21만원 · 청소년 35만원" />
      <P>2026년 한부모가족 아동양육비는 아동 1인당 월 21만원이에요. 자녀가 2명이면 월 42만원을 받아요. 만 5세 이하 영유아 자녀는 추가로 영아 양육비 월 20만원을 더 받을 수 있어요.</P>
      <P>청소년 한부모(만 24세 이하)는 아동양육비가 월 35만원으로 일반보다 더 많아요. 추가로 청소년 한부모 자립촉진수당(월 10만원)과 검정고시 학습비도 받을 수 있어요.</P>
      <P>기초생활수급자인 한부모가족은 아동양육비 중복 지원이 일부 제한될 수 있어요. 기초수급자 지원이 더 많은 경우 차액만 지원하는 방식으로 운영해요. 주민센터에서 정확한 금액을 확인하세요.</P>
      <P>지원금은 매월 20일경에 지급돼요. 선정 이후 다음 달부터 지급이 시작돼요. 신청이 빠를수록 지원을 빨리 받을 수 있어요. 소급 적용은 되지 않으니 빨리 신청하는 게 좋아요.</P>

      <H3>2026년 한부모가족 양육비 지원 금액</H3>
      <TableTitle>주요 아동양육비 지원 금액</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>지원 항목</THL><TH>월 지원금</TH><TH>대상</TH></tr>
          </thead>
          <tbody>
            {[
              ["아동양육비", "21만원/아동", "만 18세 미만 자녀"],
              ["영아 양육비 (추가)", "+20만원/아동", "만 5세 이하 영유아"],
              ["청소년 한부모 아동양육비", "35만원/아동", "만 24세 이하 한부모"],
              ["자립촉진수당 (청소년)", "10만원/가구", "청소년 한부모 자립 지원"],
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
          { icon: "📚", title: "기초생활수급자 교육급여", desc: "초중고 교육활동비 지원 금액", href: "/w/기초생활수급자-교육급여-신청" },
          { icon: "🏠", title: "기초생활수급자 주거급여", desc: "임차가구 월 최대 341,000원", href: "/w/기초생활수급자-주거급여-2026" },
          { icon: "🏡", title: "차상위계층 확인서 발급", desc: "복지로 신청 지원 혜택 종류", href: "/w/차상위계층-확인서-발급" },
        ]}
        hubHref="/category/복지"
        hubLabel="복지 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="한부모가족 아동 지원금은 얼마인가요?" sub="교육·추가 지원 항목 정리" />
      <P>아동양육비 외에도 교육지원비, 아동교육지원비 등 추가 지원이 있어요. 고등학생 자녀가 있는 경우 학용품비를 포함한 교육지원을 받을 수 있어요. 자세한 내용은 주민센터에서 상담받으세요.</P>
      <P>한부모가족 생활보조금도 있어요. 기초수급자가 아닌 한부모가족 중 소득인정액이 더 낮은 경우 추가 생활보조금을 받을 수 있어요. 지역마다 추가 지원 사업이 있을 수 있어요.</P>
      <P>법원을 통해 양육비를 받아야 하지만 상대방이 주지 않는 경우, 양육비이행관리원에서 선지급 서비스를 받을 수 있어요. 양육비를 못 받는 동안 한시적으로 국가가 대신 지급해주는 제도예요.</P>
      <P>주거 지원은 한부모가족 임대주택 우선 공급 자격을 부여해요. LH 공공임대 청약 시 한부모가족 특별 공급 물량이 있어요. 청약 통장이 없어도 신청할 수 있는 경우가 있으니 LH에 문의해보세요.</P>

      <H3>기타 주요 지원 항목</H3>
      <Info type="tip">{"양육비를 못 받고 있다면 양육비이행관리원(02-2040-4600)에 연락해보세요. 법적 절차 없이도 도움받을 수 있어요."}</Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="한부모가족 지원금 신청 절차와 서류는 무엇인가요?" sub="복지로 · 주민센터 · 제출 서류" />
      <P>한부모가족 지원금 신청은 주민등록 주소지 관할 읍·면·동 주민센터에서 할 수 있어요. 복지로(bokjiro.go.kr)에서 온라인 신청도 가능해요. 연중 상시 신청이 가능하니 소득 기준을 충족하면 빨리 신청하는 게 좋아요.</P>
      <P>신청 서류는 사회보장급여 신청서, 금융정보 제공 동의서, 가족관계증명서(가구원 확인), 소득·재산 확인 서류예요. 이혼의 경우 이혼증명서나 주민등록등본으로 가족 상황을 확인해요. 아버지·어머니 중 한쪽만 주민등록에 있으면 인정이 돼요.</P>
      <P>신청 후 소득·재산 조사가 약 2~4주 진행돼요. 선정 결과는 문자나 우편으로 통보돼요. 선정 후 다음 달부터 지원금이 지급돼요.</P>
      <P>지원금을 받다가 재혼이나 소득 변동이 생기면 변경 신고를 해야 해요. 허위 신고로 지원을 받으면 반환 명령과 제재가 있을 수 있어요. 상황이 변하면 즉시 주민센터에 알려야 해요.</P>

      <H3>신청 서류 목록</H3>
      <Info type="warn">{"재혼이나 소득 변동이 발생하면 즉시 주민센터에 신고해야 해요. 신고하지 않으면 지원금 환수 처분을 받을 수 있어요."}</Info>

      <ExtBtn
        badge="복지로 공식"
        text="한부모가족 지원금 신청"
        cta="온라인 신청하기 →"
        href="https://www.bokjiro.go.kr"
      />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "기초생활수급자 교육급여 신청 조건 | 초중고 교육활동비 지원 금액 2026", desc: "교육급여 지원 금액과 신청 방법이에요", href: "/w/기초생활수급자-교육급여-신청" },
        { title: "기초생활수급자 주거급여 2026 | 임차가구 수선비 지원 금액 신청 방법", desc: "주거급여 지원 금액과 신청 방법이에요", href: "/w/기초생활수급자-주거급여-2026" },
        { title: "차상위계층 확인서 발급 방법 | 복지로 신청 지원 혜택 종류", desc: "차상위계층 확인서 발급 방법이에요", href: "/w/차상위계층-확인서-발급" },
        { title: "노인장기요양보험 등급 신청 방법 | 1등급 2등급 판정 기준 본인부담금", desc: "장기요양등급 신청과 판정 기준이에요", href: "/w/장기요양보험-등급-신청-방법" },
        { title: "장애인 복지카드 발급 신청 방법 | 교통 세금 감면 혜택 종류", desc: "복지카드 발급 방법과 혜택이에요", href: "/w/장애인-복지카드-발급-신청" },
      ]} />

      <PrevNext
        prev={{ title: "차상위계층 확인서 발급 방법 | 복지로 신청 지원 혜택 종류", href: "/w/차상위계층-확인서-발급" }}
        next={{ title: "장애인 복지카드 발급 신청 방법 | 교통 세금 감면 혜택 종류", href: "/w/장애인-복지카드-발급-신청" }}
      />
    </BlogLayout>
  );
}
