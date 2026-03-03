// @ts-nocheck
"use client";
import { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3, Divider,
  Info, InlineLink, SpokeLink, ExtBtn, TableTitle, TableNote,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  FAQAccordion, RelatedArticles, PrevNext, RelatedMid,
  SidebarCTA, SidebarDocs, SidebarCalc, BridgeCard,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "학력 위조 해고 정당성 판단 | 업무 관련성 판례 기준",
  description:
    "이력서 학력을 거짓으로 썼다고 무조건 해고가 되는 건 아니에요. 해고 정당성은 업무 관련성과 판례 기준으로 판단해요. 부당해고 구제 신청 방법까지 알려드려요.",
  category: "노동",
  keywords: [
    "학력 위조 해고 업무 관련성 판단",
    "학력 위조 해고 판례 기준 정당성",
    "학력 허위 기재 해고 부당해고 가능",
    "학력 위조 해고 노동위원회 구제 신청",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-01-15",
  summary: [
    "학력 위조 해고는 업무 관련성이 없으면 부당해고로 인정될 수 있어요",
    "법원은 채용 조건 명시 여부와 실제 업무 수행 영향을 핵심으로 봐요",
    "부당해고 판정 시 노동위원회 구제 신청으로 복직 또는 임금 수령 가능",
  ],
  sources: [
    { name: "근로기준법 제23조 - 해고 등의 제한", url: "https://www.law.go.kr/법령/근로기준법", date: "2026-02" },
    { name: "중앙노동위원회 판정례", url: "https://www.nlrc.go.kr", date: "2026-02" },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "학력 위조 해고 → 부당해고 여부",
    subText: "채용 조건·업무 관련성 선택으로 판단",
    url: "#checker",
    external: false,
  },
  faq: [
    { q: "학력 위조 해고 시 실업급여는 받을 수 있나요?", a: "정당한 해고로 판정돼도 자발적 이직이 아니라서 실업급여는 받을 수 있어요. 다만 합의 퇴직이라면 이직 사유에 따라 달라지니 고용센터에서 확인받는 게 좋아요." },
    { q: "학력 위조 해고 판례 기준이 최근 바뀌었나요?", a: "최근 판례도 일관되게 업무 관련성 기준을 유지하고 있어요. 단순 학력 허위 기재만으로 해고가 정당하지 않고, 채용 조건과 실제 업무 수행에 미친 영향을 종합 판단해요." },
  ],
};

type ResLink = { icon: string; title: string; desc: string; href: string };
type Sel = Record<string, string>;

function getResult(sel: Sel): string | null {
  const { requirement, impact } = sel;
  if (!requirement || !impact) return null;
  if (requirement === "mandatory" && impact === "yes") return "justified";
  if (requirement === "mandatory" && impact === "no") return "unfair_impact";
  if (requirement === "optional" && impact === "yes") return "unfair_req";
  return "unfair_clear";
}

export default function Article108() {
  const [sel, setSel] = useState<Sel>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  const links: ResLink[] = [
    { icon: "⚖️", title: "노동위원회 부당해고 구제 신청", desc: "해고 통보 후 3개월 이내 접수", href: "https://www.nlrc.go.kr" },
    { icon: "📞", title: "고용노동부 1350 상담", desc: "부당해고 판단 무료 상담", href: "https://www.moel.go.kr" },
  ];

  const toc = [
    { t: "STEP 01 부당해고 여부 확인", sub: "채용 조건 · 업무 관련성" },
    { t: "해고 정당성 판단 기준", sub: "채용 조건 명시 · 업무 영향" },
    { t: "업무 관련성 판단 요소", sub: "직종 특성 · 수행 성과 · 신뢰 훼손" },
    { t: "판례 기준으로 본 결론", sub: "정당 해고 사례 · 부당해고 사례" },
    { t: "노동위원회 구제 신청 방법", sub: "3개월 기한 · 준비 서류" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "노동·고용", "해고", "학력위조"]}
      tags={["2026년 최신", "해고", "부당해고"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>학력을 부풀렸다고 <B>무조건 정당한 해고가 되는 건 아니에요.</B> 법원과 노동위원회는 업무 관련성을 핵심으로 봐요. 부당해고라면 <B>3개월 이내에 구제 신청</B>할 수 있어요.</>}
      sourceBar={{ badge: "법제처", name: "근로기준법·중앙노동위원회", date: "2026.02" }}
      stickyLabel="구제 신청 기한"
      stickyValue="해고 통보 3개월 이내"
      stickyBtn="노동위원회 구제 신청"
      stickyHref="https://www.nlrc.go.kr"
      disclaimer="이 글은 근로기준법·노동위원회 판정례를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={
        <>
          <SidebarCTA items={[
            { icon: "⚖️", title: "노동위원회 구제 신청", sub: "해고 통보 3개월 이내 신청", href: "https://www.nlrc.go.kr", hot: true },
            { icon: "📞", title: "고용노동부 1350 상담", sub: "부당해고 판단 문의", href: "https://www.moel.go.kr" },
            { icon: "📋", title: "근로기준법 제23조", sub: "해고 제한 조항 원문", href: "https://www.law.go.kr/법령/근로기준법" },
          ]} />
          <SidebarDocs items={[
            { title: "파견근로자 직접 고용 의무", cat: "노동·고용", href: "/w/파견근로자-2년-후-고용" },
            { title: "퇴직금 지연이자 계산", cat: "퇴직·임금", href: "/w/퇴직급여-지급-지연이자-받기" },
            { title: "야유회 사고 산재보상", cat: "산재·보상", href: "/w/야유회-사고-산재보상-받기" },
          ]} />
          <SidebarCalc items={[
            { title: "실업급여 계산기", href: "/w/실업급여-계산기" },
            { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
          ]} />
        </>
      }
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />
      <BridgeCard
        q="학력을 부풀렸다고 무조건 해고가 정당한 건가요?"
        a="학력 위조 해고의 정당성은 업무 관련성이 핵심이에요. 내 상황이 부당해고에 해당하는지 먼저 확인해 보세요."
        label="부당해고 여부 확인"
        href="#checker"
      />

      {/* STEP 01 */}
      <Sec n="01" id="checker" title="STEP 01 부당해고 여부 확인" sub="채용 조건 · 업무 관련성">
        <CheckerShell title="학력 위조 해고, 부당해고일까요?" sub="30초 확인">
          <CheckerQ
            n="1"
            label="채용 당시 학력이 필수 조건이었나요?"
            group="requirement"
            opts={[
              ["mandatory", "공고에 학력 조건이 명시됐어요"],
              ["optional", "학력 조건이 없거나 불명확했어요"],
            ]}
            sel={sel}
            pick={pick}
          />
          <CheckerQ
            n="2"
            label="학력이 실제 업무 수행에 영향을 줬나요?"
            group="impact"
            opts={[
              ["yes", "해당 학력이 없었으면 담당 업무를 못 했어요"],
              ["no", "학력과 무관하게 업무를 잘 수행했어요"],
            ]}
            sel={sel}
            pick={pick}
          />
          {result === "justified" && (
            <ResultFail title="해고가 정당할 가능성이 높아요">
              <P>채용 공고에 학력 요건이 명시됐고 업무 수행에도 실질적인 영향이 있었다면 해고가 정당하다고 판단될 가능성이 높아요. 다만 최종 판단은 노동위원회나 법원이 해요. 해고 절차(서면 통보, 사전 예고 등)가 지켜졌는지도 꼭 확인해보세요.</P>
              <ResultGrid items={[
                { icon: "⚠️", name: "채용 조건", pass: false, desc: "학력 명시 있음" },
                { icon: "⚠️", name: "업무 관련성", pass: false, desc: "실질 영향 있음" },
                { icon: "📋", name: "해고 절차", pass: true, desc: "서면 통보 확인" },
              ]} />
              <ResultCTA icon="📞" title="노동위원회 상담" desc="구제 신청 여부 문의" href="https://www.nlrc.go.kr" />
            </ResultFail>
          )}
          {result === "unfair_impact" && (
            <ResultPass title="업무 영향이 없으면 부당해고일 수 있어요">
              <P>학력 조건이 있었어도 실제로 업무를 잘 수행했다면 해고 정당성이 약해져요. 법원과 노동위원회는 실질적 업무 영향을 중요하게 봐요. 해고 통보 후 3개월 이내에 노동위원회에 구제 신청을 접수하세요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "채용 조건", pass: false, desc: "학력 명시 있음" },
                { icon: "✅", name: "업무 관련성", pass: true, desc: "실질 영향 없음" },
                { icon: "📋", name: "구제 가능", pass: true, desc: "3개월 이내 신청" },
              ]} />
              {links.map((l, i) => <ResultCTA key={i} icon={l.icon} title={l.title} desc={l.desc} href={l.href} />)}
            </ResultPass>
          )}
          {result === "unfair_req" && (
            <ResultPass title="학력 조건이 없었으면 부당해고일 수 있어요">
              <P>채용 공고에 학력 조건이 없었다면 학력 허위 기재만으로 해고하기 어려워요. 업무 영향이 있더라도 채용 조건에 명시되지 않았다면 해고 사유가 약해요. 노동위원회에 구제 신청을 고려해보세요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "채용 조건", pass: true, desc: "학력 조건 없음" },
                { icon: "⚠️", name: "업무 관련성", pass: false, desc: "영향 있음 주장" },
                { icon: "📋", name: "구제 가능", pass: true, desc: "3개월 이내 신청" },
              ]} />
              <ResultCTA icon="⚖️" title="노동위원회 구제 신청" desc="부당해고 구제 접수" href="https://www.nlrc.go.kr" />
            </ResultPass>
          )}
          {result === "unfair_clear" && (
            <ResultPass title="부당해고일 가능성이 높아요">
              <P>채용 조건에 학력이 없었고 업무도 문제없이 수행했다면 학력 위조를 이유로 한 해고는 부당해고에 해당할 가능성이 높아요. 해고 통보일로부터 3개월 이내에 노동위원회에 구제 신청을 하세요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "채용 조건", pass: true, desc: "학력 조건 없음" },
                { icon: "✅", name: "업무 관련성", pass: true, desc: "실질 영향 없음" },
                { icon: "📋", name: "구제 가능성", pass: true, desc: "부당해고 강하게 가능" },
              ]} />
              <ResultCTA icon="⚖️" title="노동위원회 구제 신청" desc="부당해고 구제 접수" href="https://www.nlrc.go.kr" />
            </ResultPass>
          )}
          {!result && (
            <ResultFail title="채용 조건을 선택해 주세요">
              <P>학력 요건과 업무 관련성을 선택하면 해고 정당성 판단 방향을 안내해 드려요.</P>
            </ResultFail>
          )}
        </CheckerShell>
      </Sec>
      <Divider />

      {/* SECTION 02 */}
      <Sec n="02" id="criteria" title="해고 정당성 판단 기준" sub="채용 조건 명시 · 업무 영향">
        <P><B>법원은 두 가지를 핵심으로 봐요.</B> 첫째, 채용 조건에 해당 학력이 명시됐는가. 둘째, 학력 위조가 실제 업무 수행에 영향을 미쳤는가예요. <A href="https://www.law.go.kr/법령/근로기준법">근로기준법 제23조</A>는 정당한 이유 없는 해고를 금지하고 있어요.</P>
        <P>대법원 판례는 일관되게 업무 관련성을 중요하게 봐요. 학력을 부풀려 취업했어도 그 학력 수준에 해당하는 업무 능력을 실제로 갖추고 발휘했다면, 해고가 부당하다고 본 판례가 여러 건 있어요.</P>
        <P>채용 공고에 명확한 학력 조건이 없었던 경우는 더 강하게 부당해고로 인정되는 경향이 있어요. "우대 사항"이나 "관련 학과 졸업 우대"처럼 불명확한 기재도 마찬가지예요. 반면 "반드시 해당 학과 졸업자"처럼 필수 조건으로 명시된 경우는 해고 정당성이 인정될 가능성이 높아요.</P>
        <P>학력 위조 사실을 어떻게 알게 됐는지도 중요해요. 재직 중 자진 신고한 경우와 회사가 배경 조사를 통해 적발한 경우, 외부 고발로 알려진 경우마다 판단이 달라질 수 있어요.</P>

        <H3>채용 조건별 해고 정당성 판단</H3>
        <TableTitle>학력 조건 여부와 업무 영향에 따른 판단</TableTitle>
        <table>
          <thead><tr>
            <th>채용 조건</th><th>업무 영향</th><th>해고 정당성</th>
          </tr></thead>
          <tbody>
            <tr><td>학력 명시 있음</td><td>실질 영향 있음</td><td>정당 가능성 높음</td></tr>
            <tr><td>학력 명시 있음</td><td>실질 영향 없음</td><td>부당해고 가능</td></tr>
            <tr><td>학력 조건 없음</td><td>실질 영향 있음</td><td>부당해고 가능</td></tr>
            <tr><td>학력 조건 없음</td><td>실질 영향 없음</td><td>부당해고 가능성 높음</td></tr>
          </tbody>
        </table>
        <TableNote>최종 판단은 노동위원회·법원이 사실관계를 종합해 결정해요</TableNote>
      </Sec>
      <Divider />

      {/* SECTION 03 */}
      <Sec n="03" id="impact" title="업무 관련성 판단 요소" sub="직종 특성 · 수행 성과 · 신뢰 훼손">
        <P><B>실질적 업무 수행 능력과 실적이 기준이에요.</B> 노동위원회와 법원이 업무 관련성을 판단할 때 보는 요소들이에요.</P>
        <P>학력이 채용 핵심 요건이었는지를 먼저 봐요. 의사·변호사·회계사 등 면허·자격이 필요한 직종에서 허위 자격으로 취업했다면 해고가 정당해요. 하지만 일반 사무직에서 대졸로 기재했는데 실제 업무는 고졸도 충분히 수행 가능한 경우라면 다른 판단이 나올 수 있어요.</P>
        <P>입사 후 실제 업무 능력과 성과도 중요해요. 수년간 문제없이 근무했고 승진까지 했다면 학력 위조가 업무에 영향이 없었다는 증거가 돼요. 반대로 학력 위조 발각과 동시에 업무 능력 부족이 드러난 경우는 해고 정당성이 강해져요.</P>
        <P>사용자의 신뢰 관계 훼손도 고려해요. 채용 전형에서 학력이 핵심 평가 요소였다면 허위 기재 자체가 신의칙 위반으로 인정될 수 있어요. 학력 요건이 형식적이었다면 신뢰 훼손 정도도 낮게 평가돼요.</P>
      </Sec>

      <RelatedMid
        items={[
          { icon: "⚖️", title: "파견근로자 직접 고용 의무", desc: "파견 2년 초과 시 정규직 전환 요구 방법", href: "/w/파견근로자-2년-후-고용" },
          { icon: "💰", title: "퇴직금 지연이자 계산", desc: "퇴직금 미지급 시 연 20% 지연이자 청구", href: "/w/퇴직급여-지급-지연이자-받기" },
        ]}
        hubHref="/w/실업급여"
        hubLabel="실업급여 허브 → 전체 내용 보기"
      />
      <Divider />

      {/* SECTION 04 */}
      <Sec n="04" id="precedent" title="판례 기준으로 본 결론" sub="정당 해고 사례 · 부당해고 사례">
        <P><B>판례는 일관되게 실질적 업무 영향을 중심으로 봐요.</B> 대법원과 각급 법원의 판결을 종합하면 공통된 기준이 있어요.</P>
        <P>해고가 정당하다고 본 사례들이에요. 전문 자격증이나 면허가 필요한 직종에서 허위 자격으로 취업한 경우예요. 채용 공고에 필수 학력 요건이 명시됐고 학력 미달이면 채용 자체가 안 됐을 경우예요. 학력 위조 사실이 고객 신뢰나 거래에 직접 영향을 미친 경우예요.</P>
        <P>부당해고로 판단한 사례들이에요. 수년간 성실히 근무했고 능력도 충분히 입증된 경우예요. 채용 조건에 학력이 명시되지 않았거나 우대 사항에 불과했던 경우예요. 학력 미달이었어도 업무에 실질적인 지장이 없었던 경우예요.</P>
        <P>따라서 학력 위조 사실이 있어도 상황에 따라 부당해고를 다툴 여지가 있어요. 해고 통보를 받았다면 포기하기 전에 노동위원회 상담을 받아보는 게 좋아요.</P>

        <InlineLink
          icon="⚖️"
          title="파견근로자 직접 고용 의무 — 2년 초과 정규직 전환"
          desc="2년 파견 후 직접 고용 요구 가능한 법적 근거"
          href="/w/파견근로자-2년-후-고용"
        />

        <Info type="warn">해고 통보일로부터 3개월이 지나면 노동위원회 구제 신청이 불가해요. 부당해고 의심 시 즉시 3개월 기한을 확인하세요.</Info>
      </Sec>
      <Divider />

      {/* SECTION 05 */}
      <Sec n="05" id="appeal" title="노동위원회 구제 신청 방법" sub="3개월 기한 · 준비 서류">
        <P><B>해고 통보 후 3개월 이내에 신청해야 해요.</B> 중앙노동위원회(nlrc.go.kr)나 관할 지방노동위원회에 부당해고 구제 신청서를 제출하면 돼요.</P>
        <P>신청 비용은 없어요. 구제 신청 후 심문회의를 거쳐 판정이 나와요. 기간은 보통 2~3개월이에요. 노동위원회에서 부당해고로 판정되면 복직 명령 또는 해고 기간 임금 상당액 지급 명령이 내려져요.</P>
        <P>준비 서류예요. 해고 통보서(서면 또는 문자 캡처), 재직 기간 동안의 업무 능력·성과 관련 자료, 채용 공고(학력 조건 명시 여부 확인), 근로계약서가 필요해요. 학력 조건이 채용 공고에 없었다는 증거를 확보하는 게 중요해요.</P>
        <P>노무사의 도움을 받는 것도 좋아요. 서울·경기 지역은 무료 노무사 상담 서비스를 이용할 수 있어요. 고용노동부 1350으로 전화하면 상담 연결을 받을 수 있어요.</P>

        <InlineLink
          icon="📞"
          title="부당해고 구제 신청 — 노동위원회 3개월 기한"
          desc="해고 통보 후 3개월 이내 구제 신청 절차와 준비 서류"
          href="/w/부당해고-노동위원회-구제신청"
        />

        <SpokeLink num={1} title="파견근로자 2년 후 정규직 전환" desc="파견 2년 초과 시 직접 고용 요구 방법" href="/w/파견근로자-2년-후-고용" />
        <SpokeLink num={2} title="퇴직금 지연이자 계산" desc="퇴직금 미지급 시 연 20% 지연이자 청구" href="/w/퇴직급여-지급-지연이자-받기" />

        <ExtBtn
          badge="노동위원회 공식"
          text="부당해고 구제 신청 접수"
          cta="신청하기 →"
          href="https://www.nlrc.go.kr"
        />
      </Sec>
      <Divider />

      <FAQAccordion items={meta.faq.map((f) => ({ q: f.q, a: f.a }))} />
      <RelatedArticles items={[
        { title: "파견근로자 직접 고용 의무", desc: "파견 2년 초과 시 정규직 전환 요구 방법", href: "/w/파견근로자-2년-후-고용" },
        { title: "퇴직금 지연이자 계산", desc: "퇴직금 미지급 시 연 20% 지연이자 청구", href: "/w/퇴직급여-지급-지연이자-받기" },
      ]} />
      <PrevNext
        prev={{ title: "파견근로자 2년 후 정규직 전환", href: "/w/파견근로자-2년-후-고용" }}
        next={{ title: "간이대지급금 신청 방법 절차", href: "/w/간이대지급금-신청-방법-절차" }}
      />
    </BlogLayout>
  );
}
