"use client";
import React, { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, SpokeLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Tag, Btn,
  Steps,
} from "@/components/wiki/BlogShared";

/* ───── meta ───── */
export const meta = {
  title: "야유회 사고 산재보상 받는 방법 | 업무 관련성 인정 기준",
  description:
    "야유회 중 사고가 나면 산재보상 받을 수 있다는 거 아시나요? 회사가 주최하고 비용을 부담한 행사라면 업무상 재해로 인정돼요. 신청 방법과 증빙서류를 정리했어요.",
  category: "산재",
  keywords: [
    "야유회 사고 산재 인정 기준",
    "산재보상 업무 관련성 판단",
    "야유회 회식 사고 차이",
    "산재 신청 증빙서류 준비",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-01-20",
  summary: [
    "회사가 주최하고 비용을 부담한 야유회 사고는 업무상 재해로 산재보상 인정돼요",
    "주최 주체·비용 부담·참석 강제성 세 가지가 업무 관련성 핵심 판단 기준이에요",
    "산재 신청은 회사 동의 없이 근로복지공단에 직접 하고, 기한은 사고일로부터 3년이에요",
  ],
  sources: [
    {
      name: "산업재해보상보험법",
      url: "https://www.law.go.kr/법령/산업재해보상보험법",
      date: "2026-02",
    },
    {
      name: "근로복지공단 업무상 재해 안내",
      url: "https://www.comwel.or.kr",
      date: "2026-02",
    },
  ],
  faq: [
    {
      q: "야유회 사고 신청은 회사 동의 없이 할 수 있나요?",
      a: "네, 근로자가 직접 근로복지공단에 신청할 수 있어요. 회사가 산재 신청을 막거나 협박하면 법 위반이에요. 회사 동의 없이 바로 공단에 접수하면 돼요.",
    },
    {
      q: "야유회 사고 음주 상태였으면 산재가 안 되나요?",
      a: "음주 자체가 제외 사유는 아니에요. 다만 과도한 음주로 인한 폭행 유발이 원인이면 제외될 수 있어요. 대부분의 사교적 음주 상황 사고는 인정 가능해요.",
    },
  ],
  ctaCard: {
    label: "산재 신청",
    mainText: "근로복지공단 요양급여 신청",
    subText: "온라인으로 바로 신청 가능",
    url: "https://www.comwel.or.kr",
    external: true,
  },
  relatedDocs: [
    { title: "퇴직금 지연이자 받기", url: "/w/퇴직급여-지급-지연이자-받기" },
    { title: "야유회 사고 산재 판례", url: "/w/산재보상-회사-주최-야유회-사고" },
    { title: "파견근로자 2년 후 고용", url: "/w/파견근로자-2년-후-고용" },
  ],
};

/* ───── checker ───── */
type Ans = Record<string, string>;

function getResult(a: Ans): React.ReactNode | null {
  if (!a.host || !a.forced || !a.cost || !a.location) return null;

  const isCompany = a.host === "company";
  const isForced = a.forced === "yes";
  const hasCost = a.cost === "yes";

  if (isCompany && isForced) {
    return (
      <ResultPass title="업무 관련성 인정 가능성이 높아요" desc="회사 주최 + 참석 강제성이 있으면 업무상 행사로 판단돼요. 근로복지공단에 요양급여 신청서를 제출하고, 야유회 공지문·참석자 명단·회사 지출 증빙을 첨부하세요.">
        <ResultGrid items={[
          { icon: "🏢", name: "주최 주체", pass: true, desc: "회사 공식 행사" },
          { icon: "📢", name: "참석 강제성", pass: true, desc: "강제 또는 불이익 있음" },
          { icon: "💰", name: "비용 부담", pass: hasCost, desc: hasCost ? "회사 비용 부담" : "근로자 자부담" },
        ]} />
        <ResultCTA icon="📋" title="근로복지공단 산재 신청" desc="요양급여 신청 바로가기" href="https://www.comwel.or.kr" />
        <ResultCTA icon="📁" title="증빙서류 준비 방법" desc="공지문·명단·영수증 목록" href="#docs" />
      </ResultPass>
    );
  }

  if (isCompany && !isForced && hasCost) {
    return (
      <ResultPass title="회사 주최라면 자유 참석이어도 인정 가능해요" desc="회사가 비용을 부담하고 공식 주최한 행사라면 자유 참석이라도 인정될 수 있어요. 참석률이 높고 업무 목적(단합·친목)이 있었다는 점을 증명하면 유리해요.">
        <ResultGrid items={[
          { icon: "🏢", name: "주최 주체", pass: true, desc: "회사 공식 행사" },
          { icon: "📢", name: "참석 강제성", pass: false, desc: "자유 참석" },
          { icon: "💰", name: "비용 부담", pass: true, desc: "회사 비용 부담" },
        ]} />
        <ResultCTA icon="📋" title="근로복지공단 산재 신청" desc="요양급여 신청 바로가기" href="https://www.comwel.or.kr" />
      </ResultPass>
    );
  }

  if (!isCompany && isForced) {
    return (
      <ResultFail title="강제성 증빙으로 인정 시도해볼 수 있어요" desc="자발적 행사라도 실질적 참석 강제가 있었다면 업무 관련성 주장이 가능해요. 문자·이메일·카카오톡 등 강제 참석을 지시한 기록을 모아두고 노무사 상담을 먼저 받아보세요.">
        <ResultGrid items={[
          { icon: "🏢", name: "주최 주체", pass: false, desc: "자발적 행사" },
          { icon: "📢", name: "참석 강제성", pass: true, desc: "강제 지시 기록 있음" },
          { icon: "💰", name: "비용 부담", pass: hasCost, desc: hasCost ? "회사 비용 부담" : "자비 부담" },
        ]} />
        <ResultCTA icon="📋" title="근로복지공단 업무상 재해 안내" desc="판단 기준 상세 안내" href="https://www.comwel.or.kr" />
      </ResultFail>
    );
  }

  return (
    <ResultFail title="자발적 행사는 업무 관련성 인정이 어려워요" desc="직원들이 자발적으로 사비로 모인 행사에서의 사고는 산재로 인정받기 어려워요. 회사의 관여나 지원 여부, 암묵적 강제 여부를 추가로 확인해 보세요.">
      <ResultGrid items={[
        { icon: "🏢", name: "주최 주체", pass: false, desc: "자발적 행사" },
        { icon: "📢", name: "참석 강제성", pass: false, desc: "자유 참석" },
        { icon: "💰", name: "비용 부담", pass: hasCost, desc: hasCost ? "일부 회사 지원" : "자비 부담" },
      ]} />
    </ResultFail>
  );
}

/* ───── component ───── */
export default function Article101() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "산재", "산재보상", "야유회 사고"]}
      tags={["2026년 최신", "산재", "업무상 재해"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>야유회 중 사고가 났는데 <B>산재 신청이 가능한지</B> 막막하시죠? 회사가 주최하고 비용을 부담한 행사라면 <B>업무상 재해</B>로 인정돼요. 회사 동의 없이 직접 신청할 수 있어요.</>}
      sourceBar={{ badge: "법제처", name: "산재보상보험법·근로복지공단", date: "2026.02" }}
      stickyLabel="신청 기한"
      stickyValue="사고일로부터 3년"
      stickyBtn="산재 신청"
      disclaimer="이 글은 산업재해보상보험법·근로복지공단 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "⚖️", title: "퇴직금 지연이자 받기", sub: "14일 미지급 시 연 20% 이자", href: "/w/퇴직급여-지급-지연이자-받기", hot: true },
          { icon: "💰", title: "내 숨은 환급금 찾기", sub: "평균 13만원 환급", href: "/w/환급금-찾기" },
          { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
        ]} />
        <SidebarDocs items={[
          { title: "외국인근로자 산재보험", cat: "산재·보상", href: "/w/외국인근로자-산재보험-받기" },
          { title: "파견근로자 2년 후 고용", cat: "노동·고용", href: "/w/파견근로자-2년-후-고용" },
          { title: "학력 위조 해고 정당성", cat: "노동·해고", href: "/w/학력-거짓-해고-정당성" },
          { title: "퇴직금 지연이자 계산", cat: "퇴직·임금", href: "/w/퇴직급여-지급-지연이자-받기" },
          { title: "간이대지급금 신청 방법", cat: "임금·체불", href: "/w/간이대지급금-신청-방법-절차" },
        ]} />
        <SidebarCalc items={[
          { title: "실업급여 계산기", href: "/w/실업급여-계산기" },
          { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
          { title: "연말정산 계산기", href: "/w/연말정산-계산기" },
          { title: "양도소득세 계산기", href: "/w/양도소득세-계산기" },
          { title: "대출이자 계산기", href: "/w/대출이자-계산기" },
        ]} />
      </>}
    >
      <TOC items={[
        { t: "야유회 사고, 산재 신청이 가능할까?", sub: "야유회 주최 · 참석 강제성 · 비용 부담" },
        { t: "야유회 사고도 산재로 인정받나요?", sub: "업무상 재해 기준 · 장소 무관 · 회사 밖 행사" },
        { t: "산재보상 업무 관련성은 어떻게 판단하나요?", sub: "주최 주체 · 비용 부담 · 참석 강제성" },
        { t: "야유회 회식 사고 차이가 있나요?", sub: "1차·2차 회식 · 이동 중 사고 · 개인 일탈" },
        { t: "산재 신청에 증빙서류는 뭘 준비하나요?", sub: "요양급여 신청서 · 공지문 · 진단서" },
        { t: "자주 묻는 질문", sub: "회사 동의 없이 신청 · 음주 상태 사고" },
      ]} />

      <Summary3 items={meta.summary} />

      {/* ───── STEP 01: 체커 ───── */}
      <Sec n="STEP 01" id="checker" title="야유회 사고, 산재 신청이 가능할까?" sub="야유회 주최 · 참석 강제성 · 비용 부담">
        <CheckerShell title="야유회 사고 업무 관련성 확인" sub="30초 확인" desc="야유회 성격과 참석 경위를 선택하면 업무 관련성 인정 가능성을 알려드려요.">
          <CheckerQ n="1" label="야유회를 누가 주최했나요?" group="host"
            opts={[["company","회사가 공식 주최한 행사예요"],["voluntary","직원들이 자발적으로 모인 행사예요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="2" label="참석 강제성이 있었나요?" group="forced"
            opts={[["yes","참석 지시가 있었거나 불참 시 불이익이 있었어요"],["no","자유롭게 참석 여부를 선택했어요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="3" label="회사가 비용을 부담했나요?" group="cost"
            opts={[["yes","교통비·식비 등 회사 비용으로 진행됐어요"],["no","개인 비용으로 진행됐어요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="4" label="사고는 언제 발생했나요?" group="location"
            opts={[["during","행사 진행 중 사고예요"],["travel","이동 중 (버스·차량) 사고예요"],["personal","행사 중 개인 행동 중 사고예요"]]}
            sel={ans} pick={pick} />
          {result}
        </CheckerShell>
      </Sec>

      <BridgeCard
        q="다치고 퇴직하게 됐을 때 퇴직금은요?"
        a="퇴직 후 14일 이내에 퇴직금을 못 받으면 연 20% 지연이자가 붙어요."
        label="퇴직금 지연이자 확인"
        href="/w/퇴직급여-지급-지연이자-받기"
      />

      <Divider />

      {/* ───── SECTION 02: 산재 인정 여부 ───── */}
      <Sec n="SECTION 02" id="recognition" title="야유회 사고도 산재로 인정받나요?" sub="업무상 재해 기준 · 장소 무관 · 회사 밖 행사">
        <P><A href="https://www.law.go.kr/법령/산업재해보상보험법">산업재해보상보험법</A>에 따르면 업무와 관련된 행사에서 발생한 사고는 업무상 재해로 인정돼요. 야유회가 <B>회사 주최 행사</B>라면 장소가 회사 밖이어도 산재 적용이 돼요. 대법원 판례도 회사 행사 중 발생한 사고를 업무상 재해로 인정한 사례가 다수예요.</P>
        <P>핵심 판단 기준은 <B>행사의 업무 관련성</B>이에요. 회사가 주최하고 비용을 부담했는지, 참석을 지시했거나 불참 시 불이익이 있었는지가 가장 중요해요. 이 두 조건이 충족되면 사고 발생 장소가 어디든 산재가 적용돼요.</P>
        <P>자유 참석 행사라도 인정될 수 있어요. 회사가 공식적으로 공지하고, 참석률이 높으며, 회사가 비용의 상당 부분을 부담했다면 묵시적 강제로 인정돼요. 형식이 자유 참석이어도 실질은 업무 행사인 거예요.</P>
        <P>반면 직원들이 사비로 모인 비공식 모임은 산재 인정이 어려워요. 회사와의 연결고리가 없으면 순수 개인 활동으로 보거든요. 야유회가 어느 쪽에 해당하는지 확인하는 게 먼저예요.</P>

        <Info type="tip">{"산재 신청은 <strong>회사 동의 없이</strong> 근로복지공단에 직접 할 수 있어요. 회사가 신청을 막으면 그 자체로 법 위반이에요."}</Info>

        <InlineLink icon="⚖️" title="야유회 산재 판례 상세" desc="법원 인정 사례와 불인정 사례" href="/w/산재보상-회사-주최-야유회-사고" />
      </Sec>

      <Divider />

      {/* ───── SECTION 03: 업무 관련성 판단 ───── */}
      <Sec n="SECTION 03" id="work-relation" title="산재보상 업무 관련성은 어떻게 판단하나요?" sub="주최 주체 · 비용 부담 · 참석 강제성">
        <P>세 가지를 봐요. 주최 주체, 비용 부담, 참석 강제성이에요. <A href="https://www.comwel.or.kr">근로복지공단</A>에서 업무 관련성 조사 시 이 세 요소를 중심으로 판단해요.</P>

        <H3>주최 주체 판단</H3>
        <P>주최 주체가 회사 명의면 업무 관련성이 강해요. 총무팀이나 인사팀이 기획하고 회사 공문으로 공지했다면 명확한 업무 행사예요. 반면 특정 부서 사원들끼리 준비한 자체 모임은 업무 관련성이 약해요. 회사 이름으로 공지가 나갔는지, 회사 시스템(사내 게시판·이메일)을 통해 안내됐는지가 핵심이에요.</P>

        <H3>비용 부담 판단</H3>
        <P>비용 부담도 중요한 증거예요. 교통비·입장료·식비를 회사 법인카드로 결제했거나 출장비로 처리했다면 업무 행사라는 증거가 돼요. 근로자가 일부를 부담했더라도 회사 지원이 있었다면 인정 가능성이 높아요. 법인카드 영수증이나 회계 처리 내역이 핵심 증빙이에요.</P>

        <H3>참석 강제성 판단</H3>
        <P>참석 강제성이 가장 강력한 판단 요소예요. "불참 시 인사 불이익"이라는 직접적 지시뿐 아니라, 상사가 참석을 강하게 권유하거나 불참자를 나중에 문제 삼는 분위기도 강제성으로 볼 수 있어요. 이런 내용이 담긴 문자나 이메일을 캡처해두면 증빙이 돼요.</P>

        <InlineLink icon="📁" title="증빙서류 준비 목록" desc="공지문·영수증·진단서 체크리스트" href="#docs" />
      </Sec>

      <RelatedMid
        title="다른 노동·산재 정보도 살펴보세요"
        items={[
          { icon: "🌍", title: "외국인근로자 산재보험", desc: "체류자격 무관 신청 방법", href: "/w/외국인근로자-산재보험-받기" },
          { icon: "⚖️", title: "퇴직금 지연이자 계산", desc: "14일 기한 연 20% 적용 기준", href: "/w/퇴직급여-지급-지연이자-받기" },
          { icon: "🏭", title: "파견근로자 2년 후 고용", desc: "직접 고용 의무 전환 안내", href: "/w/파견근로자-2년-후-고용" },
        ]}
        hubHref="/category/산재"
        hubLabel="산재·노동 전체 보기"
      />

      <Divider />

      {/* ───── SECTION 04: 야유회 vs 회식 차이 ───── */}
      <Sec n="SECTION 04" id="picnic-vs-dinner" title="야유회 회식 사고 차이가 있나요?" sub="1차·2차 회식 · 이동 중 사고 · 개인 일탈">
        <P>법적으로는 같은 기준이에요. 야유회든 회식이든 업무 관련성 판단 기준은 동일해요. 회사 주최 + 비용 부담 + 참석 강제성이 핵심이에요. 다만 상황별로 적용 방식에 차이가 있어요.</P>
        <P>회식 사고는 1차·2차 문제가 있어요. 회사가 공식적으로 주관한 1차 회식 중 사고는 산재로 인정되는 경우가 많아요. 자발적으로 이어진 2차 술자리에서 발생한 사고는 그 관련성이 약해져요. 다만 2차가 상사 지시로 이어진 경우라면 다를 수 있어요.</P>
        <P>야유회는 이동 중 사고도 포함돼요. 회사 버스나 차량으로 이동하다 발생한 교통사고는 업무상 재해가 돼요. 개인 차량으로 이동 중 사고는 업무 목적임을 추가로 증명해야 해요. 행사 중 개인적인 일탈 행동으로 다친 경우는 제외돼요.</P>

        <TableTitle>상황별 산재 인정 가능성</TableTitle>
        <table><thead><tr><THL>상황</THL><TH>인정 가능성</TH><TH>핵심 조건</TH></tr></thead><tbody>
          {[
            ["회사 주최 야유회 행사 중", "높음", "회사 공지·비용 부담 증빙"],
            ["회사 버스·차량 이동 중", "높음", "회사 이동 수단 사용 증빙"],
            ["1차 회식 중", "높음", "회사 주관 공식 회식 증빙"],
            ["2차 자발적 술자리 중", "낮음", "상사 지시 기록 필요"],
            ["개인 차량 이동 중", "중간", "업무 목적 이동 증빙 필요"],
            ["행사 중 개인 일탈 행동", "없음", "업무 관련성 없음"],
          ].map((r, i) => <tr key={i}><THL>{r[0]}</THL><td>{r[1]}</td><td>{r[2]}</td></tr>)}
        </tbody></table>
        <TableNote>*근로복지공단·법원 판례 기준 (2026.02)</TableNote>

        <BridgeCard
          q="산재 신청 구체적인 절차가 궁금하시죠?"
          a="요양급여 신청서 작성부터 공단 제출까지 4단계로 진행돼요."
          label="신청 절차 확인"
          href="#docs"
        />
      </Sec>

      <Divider />

      {/* ───── SECTION 05: 증빙서류 ───── */}
      <Sec n="SECTION 05" id="docs" title="산재 신청에 증빙서류는 뭘 준비하나요?" sub="요양급여 신청서 · 공지문 · 진단서">
        <P>4가지를 준비해요. 요양급여 신청서, 야유회 관련 증빙, 진단서, 사고 경위서예요. <A href="https://www.comwel.or.kr">근로복지공단</A> 홈페이지에서 요양급여 신청서를 내려받을 수 있어요.</P>

        <Steps items={[
          { title: "요양급여 신청서 작성", desc: "근로복지공단 홈페이지에서 내려받아 사업장 정보, 사고 일시·장소·경위를 작성해요. 치료 중인 병원에서 도와주는 경우도 있어요." },
          { title: "야유회 증빙 서류 수집", desc: "회사 공지문(이메일·사내 공문), 야유회 일정표, 참석자 명단, 법인카드 영수증을 모아요. 참석 지시 문자나 카카오톡 캡처도 좋아요." },
          { title: "진단서 발급", desc: "사고 당일 치료받은 병원에서 발급받아요. 부상 부위와 정도가 명확히 기재돼야 해요." },
          { title: "근로복지공단 제출", desc: "관할 근로복지공단 지사에 방문 또는 온라인으로 제출해요. 접수 후 공단에서 업무 관련성 조사를 진행해요." },
        ]} />

        <Info type="warn">{"산재 신청 기한은 <strong>사고일로부터 3년</strong>이에요. 기한이 지나면 신청이 불가능하니 가능한 빨리 접수하세요."}</Info>

        <TableTitle>신청 시 필요한 서류</TableTitle>
        <table><thead><tr><THL>서류</THL><TH>내용</TH><TH>발급·수집 방법</TH></tr></thead><tbody>
          {[
            ["요양급여 신청서", "사고 경위·부상 내용 기재", "근로복지공단 홈페이지 다운로드"],
            ["야유회 공지문", "회사 주최 증빙", "사내 게시판·이메일 캡처"],
            ["비용 지출 내역", "회사 비용 부담 증빙", "법인카드 영수증·출장비 내역"],
            ["참석자 명단", "공식 행사 증빙", "총무팀·행사 주최 부서 요청"],
            ["진단서", "부상 내용 확인", "치료 병원 발급"],
            ["사고 경위서", "사고 과정 서술", "본인 직접 작성"],
          ].map((r, i) => <tr key={i}><THL>{r[0]}</THL><td>{r[1]}</td><td>{r[2]}</td></tr>)}
        </tbody></table>
        <TableNote>*근로복지공단 기준 (2026.02)</TableNote>

        <SpokeLink num="01" title="외국인근로자 산재보험 신청" desc="체류자격 무관 신청 방법" href="/w/외국인근로자-산재보험-받기" />

        <ExtBtn badge="근로복지공단 공식" text="업무상 재해 요양급여 신청" cta="신청하기 →" href="https://www.comwel.or.kr" />
      </Sec>

      <Divider />

      {/* ───── FAQ ───── */}
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" sub="회사 동의 없이 신청 · 음주 상태 사고">
        <FAQAccordion items={meta.faq} />
      </Sec>

      <RelatedArticles items={[
        { title: "외국인근로자 산재보험 신청", desc: "체류자격 무관 신청 방법", href: "/w/외국인근로자-산재보험-받기" },
        { title: "퇴직금 지연이자 계산", desc: "14일 기한 연 20% 이자 계산", href: "/w/퇴직급여-지급-지연이자-받기" },
        { title: "파견근로자 2년 후 고용", desc: "직접 고용 의무와 전환지원금", href: "/w/파견근로자-2년-후-고용" },
        { title: "간이대지급금 신청 방법", desc: "임금체불 최대 700만원 한도", href: "/w/간이대지급금-신청-방법-절차" },
        { title: "학력 위조 해고 정당성", desc: "업무 관련성 판례 기준", href: "/w/학력-거짓-해고-정당성" },
      ]} />
      <PrevNext
        prev={{ title: "5세대 실손보험 갈아타기 시기", href: "/w/5세대-실손보험-갈아타기-시기" }}
        next={{ title: "외국인근로자 산재보험 신청", href: "/w/외국인근로자-산재보험-받기" }}
      />
    </BlogLayout>
  );
}
