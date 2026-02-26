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
  title: "육아 시간선택제 일자리 신청 방법 | 근로시간 단축 급여 보전",
  description:
    "아이 때문에 풀타임이 힘드신가요? 육아 시간선택제로 근로시간을 줄이면 정부가 임금 감소분을 보전해줘요. 2026년 월 최대 200만원 지원 조건과 신청 방법을 정리했어요.",
  category: "육아",
  keywords: [
    "육아 시간선택제 일자리 신청",
    "시간선택제 근로시간 단축 급여",
    "육아기 근로시간 단축 2026 상한액",
    "시간선택제 일자리 신청 방법 절차",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-01-15",
  summary: [
    "만 8세 이하 자녀가 있으면 주 15~35시간으로 단축하고 급여 보전을 받을 수 있어요",
    "2026년 기준 첫 3개월 월 최대 200만원, 이후 월 150만원까지 지원돼요",
    "고용24에서 근로자와 사업주가 각각 신청하고, 매달 1회씩 받을 수 있어요",
  ],
  sources: [
    {
      name: "고용노동부 시간선택제 일자리 안내",
      url: "https://www.moel.go.kr/policy/policyinfo/work/list.do",
      date: "2026-02",
    },
    {
      name: "고용24 육아기 근로시간 단축 급여",
      url: "https://www.ei.go.kr",
      date: "2026-02",
    },
  ],
  faq: [
    {
      q: "시간선택제 일자리 육아 신청 기간이 따로 있나요?",
      a: "육아기 근로시간 단축은 자녀 1명당 최대 24개월 사용할 수 있어요. 육아휴직과 합산해서 쓸 수 있고, 육아휴직 미사용 기간을 단축으로 전환하면 최대 48개월까지 늘어나요.",
    },
    {
      q: "시간선택제로 바꾸면 4대 보험은 어떻게 되나요?",
      a: "4대 보험은 단축된 근로시간과 실제 임금 기준으로 재산정돼요. 고용보험 피보험기간은 계속 쌓여요. 건강보험·국민연금은 줄어든 월급 기준으로 납부해요.",
    },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "육아기 근로시간 단축 급여 신청",
    subText: "고용24에서 온라인 신청 가능",
    url: "https://www.ei.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "실업급여 수급자격 인정", url: "/w/실업급여-수급자격-인정" },
    { title: "파견근로자 2년 후 고용", url: "/w/파견근로자-2년-후-고용" },
    { title: "야유회 사고 산재보상", url: "/w/야유회-사고-산재보상-받기" },
  ],
};

/* ───── checker ───── */
type Ans = Record<string, string>;

function getResult(a: Ans): React.ReactNode | null {
  if (!a.child || !a.employer || !a.period || !a.hours) return null;

  if (a.child === "under8" && a.employer === "agree") {
    return (
      <ResultPass title="급여 보전 신청이 가능해요" desc="만 8세 이하 자녀가 있고 회사가 동의했다면 육아기 근로시간 단축 급여를 받을 수 있어요. 단축 전 통상임금의 100%(첫 5시간)와 80%(나머지)가 지급돼요.">
        <ResultGrid items={[
          { icon: "👶", name: "자녀 나이", pass: true, desc: "만 8세 이하 — 대상" },
          { icon: "🏢", name: "회사 동의", pass: true, desc: "동의 완료" },
          { icon: "💰", name: "급여 보전", pass: true, desc: "월 최대 200만원 (첫 3개월)" },
        ]} />
        <ResultCTA icon="📋" title="고용24 급여 신청" desc="육아기 근로시간 단축 급여 신청" href="https://www.ei.go.kr" />
        <ResultCTA icon="📖" title="신청 절차 확인" desc="4단계 신청 방법 안내" href="#apply" />
      </ResultPass>
    );
  }

  if (a.child === "under8" && a.employer === "reject") {
    return (
      <ResultFail title="회사 동의를 먼저 받아야 해요" desc="자격은 되지만 회사가 거부하면 단독 신청이 안 돼요. 육아기 근로시간 단축은 법적 권리예요. 사업주가 정당한 사유 없이 거부하면 고용노동부(1350)에 신고할 수 있어요.">
        <ResultGrid items={[
          { icon: "👶", name: "자녀 나이", pass: true, desc: "만 8세 이하 — 대상" },
          { icon: "🏢", name: "회사 동의", pass: false, desc: "거부 또는 협의 중" },
          { icon: "⚖️", name: "법적 권리", pass: true, desc: "거부 시 신고 가능" },
        ]} />
        <ResultCTA icon="📞" title="고용노동부 1350 상담" desc="사업주 거부 시 신고 안내" href="https://www.moel.go.kr" />
      </ResultFail>
    );
  }

  return (
    <ResultFail title="육아기 근로시간 단축 급여 대상이 아니에요" desc="만 8세 이하(초등학교 2학년 이하) 자녀가 있을 때만 육아기 단축 급여를 받을 수 있어요. 만 9세 이상이라면 회사 자체 유연근무제나 재택근무 제도를 알아보세요.">
      <ResultGrid items={[
        { icon: "👶", name: "자녀 나이", pass: false, desc: "만 9세 이상 — 대상 아님" },
        { icon: "🏢", name: "일반 단축", pass: true, desc: "회사 자체 제도 활용 가능" },
        { icon: "💰", name: "정부 지원", pass: false, desc: "이 제도는 해당 안 됨" },
      ]} />
    </ResultFail>
  );
}

/* ───── component ───── */
export default function Article103() {
  const [ans, setAns] = useState<Ans>({});
  const pick = (g: string, v: string) => setAns((p) => ({ ...p, [g]: v }));
  const result = getResult(ans);

  return (
    <BlogLayout
      breadcrumb={["홈", "육아", "육아지원", "시간선택제"]}
      tags={["2026년 최신", "육아", "시간선택제"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>육아 때문에 근무시간을 줄이면 월급이 너무 깎일까봐 걱정되시죠? 육아 시간선택제를 쓰면 <B>정부가 임금 감소분을 보전</B>해줘요. 2026년 첫 3개월 <B>월 최대 200만원</B>까지 지원돼요.</>}
      sourceBar={{ badge: "고용노동부", name: "고용노동부·고용24", date: "2026.02" }}
      stickyLabel="최대 지원"
      stickyValue="월 200만원 (첫 3개월)"
      stickyBtn="신청하기"
      disclaimer="이 글은 고용노동부·고용보험 공식 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "👶", title: "육아기 단축 급여 신청", sub: "고용24 온라인 신청", href: "https://www.ei.go.kr", hot: true },
          { icon: "💰", title: "내 숨은 환급금 찾기", sub: "평균 13만원 환급", href: "/w/환급금-찾기" },
          { icon: "📋", title: "2026년 달라지는 제도", sub: "변경사항 정리", href: "/w/2026-변경사항" },
        ]} />
        <SidebarDocs items={[
          { title: "야유회 사고 산재보상", cat: "산재·보상", href: "/w/야유회-사고-산재보상-받기" },
          { title: "외국인근로자 산재보험", cat: "산재·외국인", href: "/w/외국인근로자-산재보험-받기" },
          { title: "파견근로자 2년 후 고용", cat: "노동·고용", href: "/w/파견근로자-2년-후-고용" },
          { title: "실업급여 수급자격 인정", cat: "실업급여", href: "/w/실업급여-수급자격-인정" },
          { title: "퇴직금 지연이자 계산", cat: "퇴직·임금", href: "/w/퇴직급여-지급-지연이자-받기" },
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
        { t: "육아 시간선택제 급여 보전 받을 수 있나요?", sub: "자녀 나이 · 회사 동의 · 단축 시간" },
        { t: "육아 시간선택제 일자리는 어떻게 활용하나요?", sub: "만 8세 이하 · 주 15~35시간 · 24개월" },
        { t: "시간선택제 근로시간 단축 급여는 얼마인가요?", sub: "100%·80% 보전 · 계산 예시" },
        { t: "육아기 근로시간 단축 2026 상한액이 얼마예요?", sub: "월 200만원 · 150만원 · 구간별" },
        { t: "시간선택제 일자리 신청은 어떻게 하나요?", sub: "고용24 신청 · 필요 서류 · 지급 주기" },
        { t: "자주 묻는 질문", sub: "신청 기간 · 4대 보험" },
      ]} />

      <Summary3 items={meta.summary} />

      {/* ───── STEP 01: 체커 ───── */}
      <Sec n="STEP 01" id="checker" title="육아 시간선택제 급여 보전 받을 수 있나요?" sub="자녀 나이 · 회사 동의 · 단축 시간">
        <CheckerShell title="육아 시간선택제, 나도 급여 보전 받을 수 있을까?" sub="30초 확인" desc="자녀 나이와 근무 형태를 선택하면 급여 보전 조건을 바로 알려드려요.">
          <CheckerQ n="1" label="자녀 나이가 어떻게 되나요?" group="child"
            opts={[["under8","만 8세 이하 (초등학교 2학년 이하)예요"],["over8","만 9세 이상이에요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="2" label="회사가 단축 근무에 동의했나요?" group="employer"
            opts={[["agree","동의했어요"],["reject","거부하거나 아직 협의 중이에요"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="3" label="단축하려는 기간이 얼마나 돼요?" group="period"
            opts={[["under6","6개월 이하"],["over6","6개월 초과"]]}
            sel={ans} pick={pick} />
          <CheckerQ n="4" label="단축 후 근로시간이 얼마나 될까요?" group="hours"
            opts={[["15to20","주 15~20시간"],["20to35","주 20~35시간"]]}
            sel={ans} pick={pick} />
          {result}
        </CheckerShell>
      </Sec>

      <BridgeCard
        q="육아휴직과 시간선택제 단축, 어느 게 더 유리할까요?"
        a="육아휴직과 시간선택제 단축을 조합하면 최대 혜택을 받을 수 있어요."
        label="육아휴직 급여 비교"
        href="/w/실업급여-수급자격-인정"
      />

      <Divider />

      {/* ───── SECTION 02: 활용 방법 ───── */}
      <Sec n="SECTION 02" id="how-to-use" title="육아 시간선택제 일자리는 어떻게 활용하나요?" sub="만 8세 이하 · 주 15~35시간 · 24개월">
        <P><A href="https://www.moel.go.kr/policy/policyinfo/work/list.do">고용노동부</A>에 따르면 만 8세 이하(초등학교 2학년 이하) 자녀를 둔 근로자는 근로시간을 <B>주 15시간 이상~35시간 이하</B>로 줄일 수 있어요. 시간선택제 일자리 형태로 전환하는 거예요.</P>
        <P>육아 근로시간 단축은 자녀 1명당 최대 <B>24개월</B> 사용할 수 있어요. 육아휴직과 합산해서 쓸 수 있는데, 육아휴직을 전혀 쓰지 않았다면 단축 기간을 최대 48개월까지 늘릴 수 있어요. 육아휴직 1개월을 단축 2개월로 교환하는 방식이에요.</P>
        <P>단축 폭은 근로자가 자유롭게 정할 수 있어요. 풀타임이 주 40시간이라면 주 20~25시간으로 줄일 수 있고, 원하면 주 15시간까지도 가능해요. 사업주가 거부할 수 있는 사유는 법으로 제한돼 있어서, 정당한 사유 없이 거부하면 고용노동부에 신고할 수 있어요.</P>

        <Info type="warn">{"주 <strong>15시간 미만</strong>이 되면 단시간 근로자로 분류돼 4대 보험 적용에 변동이 생길 수 있어요. 최소 15시간 이상으로 단축하는 게 좋아요."}</Info>

        <InlineLink icon="💼" title="파견근로자 2년 후 정규직 전환" desc="직접 고용 의무와 전환지원금" href="/w/파견근로자-2년-후-고용" />
      </Sec>

      <Divider />

      {/* ───── SECTION 03: 급여 보전 금액 ───── */}
      <Sec n="SECTION 03" id="amount" title="시간선택제 근로시간 단축 급여는 얼마인가요?" sub="100%·80% 보전 · 계산 예시">
        <P>정부가 임금 감소분을 직접 채워줘요. <A href="https://www.ei.go.kr">고용24</A>에 따르면 단축된 시간에 따라 두 가지 구간으로 계산돼요.</P>

        <H3>구간별 보전율</H3>
        <P>첫 번째 구간은 <B>최초 5시간 단축 부분</B>이에요. 단축 전 통상임금의 100%가 지급돼요. 주 40시간 → 주 35시간으로 5시간 줄였다면, 그 5시간 치 임금 전액을 정부가 보전해줘요. 두 번째 구간은 5시간 초과 단축 부분으로, 통상임금의 80%가 지급돼요.</P>

        <H3>계산 예시</H3>
        <P>월 통상임금 300만원, 주 40시간 → 주 20시간(20시간 단축)으로 줄인 경우를 보면 이래요. 단축 20시간 중 첫 5시간은 100% 보전, 나머지 15시간은 80% 보전이에요. 대략 월 80~100만원 수준이 지급돼요. 정확한 금액은 고용24 모의계산에서 확인할 수 있어요.</P>
        <P>하한액은 따로 없고, 상한액은 있어요. 상한이 있기 때문에 통상임금이 높을수록 실제 보전율은 낮아질 수 있어요. 월 통상임금이 200만원 이하라면 단축으로 줄어드는 임금의 대부분이 채워지는 거예요.</P>

        <InlineLink icon="📊" title="실업급여 수급자격 인정" desc="고용보험 가입기간 확인" href="/w/실업급여-수급자격-인정" />
      </Sec>

      <RelatedMid
        title="다른 노동·육아 지원도 살펴보세요"
        items={[
          { icon: "⚖️", title: "야유회 사고 산재 신청", desc: "업무 관련성 인정 기준", href: "/w/야유회-사고-산재보상-받기" },
          { icon: "🌍", title: "외국인근로자 산재보험", desc: "체류자격 무관 신청 방법", href: "/w/외국인근로자-산재보험-받기" },
          { icon: "💼", title: "파견근로자 2년 후 고용", desc: "전환지원금 월 60만원", href: "/w/파견근로자-2년-후-고용" },
        ]}
        hubHref="/category/육아"
        hubLabel="육아지원 전체 보기"
      />

      <Divider />

      {/* ───── SECTION 04: 2026 상한액 ───── */}
      <Sec n="SECTION 04" id="limit" title="육아기 근로시간 단축 2026 상한액이 얼마예요?" sub="월 200만원 · 150만원 · 구간별">
        <P>2026년 기준 첫 3개월 월 최대 <B>200만원</B>, 이후 월 <B>150만원</B>이에요. 상한액이 높아졌기 때문에 중저임금 근로자는 사실상 전액 보전에 가까운 효과를 볼 수 있어요.</P>

        <TableTitle>2026년 육아기 근로시간 단축 급여 상한액</TableTitle>
        <table><thead><tr><THL>구간</THL><TH>상한액</TH><TH>보전율</TH></tr></thead><tbody>
          {[
            ["첫 3개월 — 단축 첫 5시간", "월 200만원", "통상임금 100%"],
            ["첫 3개월 — 5시간 초과 단축", "월 200만원 한도 내", "통상임금 80%"],
            ["4개월 이후", "월 150만원", "통상임금 80%"],
          ].map((r, i) => <tr key={i}><THL>{r[0]}</THL><td>{r[1]}</td><td>{r[2]}</td></tr>)}
        </tbody></table>
        <TableNote>*고용노동부 기준 (2026.02), 매년 조정될 수 있어요</TableNote>

        <P>상한액은 매년 조정될 수 있어요. 신청 전에 고용24나 고용노동부 홈페이지에서 현재 기준을 꼭 확인하세요. 사업주가 단축 근무자에게 임금 외에 별도 불이익을 주는 건 금지돼 있어요.</P>

        <BridgeCard
          q="정확한 급여 보전 금액이 얼마인지 궁금하시죠?"
          a="고용24 모의계산에서 내 통상임금과 단축 시간을 입력하면 바로 계산할 수 있어요."
          label="고용24 모의계산"
          href="https://www.ei.go.kr"
        />
      </Sec>

      <Divider />

      {/* ───── SECTION 05: 신청 방법 ───── */}
      <Sec n="SECTION 05" id="apply" title="시간선택제 일자리 신청은 어떻게 하나요?" sub="고용24 신청 · 필요 서류 · 지급 주기">
        <P>근로자와 사업주가 각각 신청해야 해요. 육아기 근로시간 단축 급여는 근로자가 <A href="https://www.ei.go.kr">고용24</A>에서 신청하고, 사업주도 별도로 고용24에서 지원금 신청을 해야 해요.</P>

        <Steps items={[
          { title: "회사에 단축 신청", desc: "회사에 육아기 근로시간 단축 신청서를 제출하고 단축 시작일을 확정해요. 단축 시작일 전에 서면 합의가 필요해요." },
          { title: "고용24에서 급여 신청", desc: "단축 시작 후 1개월부터 신청 가능해요. 고용24(ei.go.kr)에서 개인서비스 → 육아기 근로시간 단축 급여 신청 메뉴로 가면 돼요." },
          { title: "서류 제출", desc: "육아기 근로시간 단축 확인서(사업주 발급), 통상임금 확인 서류, 가족관계증명서(처음 신청 시)가 필요해요. 모두 고용24 온라인으로 제출 가능해요." },
          { title: "매달 신청 → 지급", desc: "매월 단축 근무한 내역을 신청하면 고용센터 심사 후 다음 달에 지급돼요. 신청 기한은 단축 종료 후 12개월 이내예요." },
        ]} />

        <Info type="warn">{"<strong>매달 빠짐없이 신청</strong>해야 해요. 신청 기한(단축 종료 후 12개월)을 넘기면 그 달 치는 받을 수 없어요."}</Info>

        <SpokeLink num="01" title="실업급여 수급자격 인정" desc="고용보험 가입기간 확인 방법" href="/w/실업급여-수급자격-인정" />

        <ExtBtn badge="고용24 공식" text="육아기 근로시간 단축 급여 신청" cta="신청하기 →" href="https://www.ei.go.kr" />
      </Sec>

      <Divider />

      {/* ───── FAQ ───── */}
      <Sec n="FAQ" id="faq" title="자주 묻는 질문" sub="신청 기간 · 4대 보험">
        <FAQAccordion items={meta.faq} />
      </Sec>

      <RelatedArticles items={[
        { title: "야유회 사고 산재보상 받기", desc: "업무 관련성 인정 기준과 증빙", href: "/w/야유회-사고-산재보상-받기" },
        { title: "외국인근로자 산재보험 신청", desc: "체류자격 무관 신청 방법", href: "/w/외국인근로자-산재보험-받기" },
        { title: "파견근로자 2년 후 고용", desc: "직접 고용 의무와 전환지원금", href: "/w/파견근로자-2년-후-고용" },
        { title: "실업급여 수급자격 인정", desc: "수급 자격 판정과 서류 안내", href: "/w/실업급여-수급자격-인정" },
        { title: "퇴직금 지연이자 계산", desc: "14일 기한 연 20% 이자", href: "/w/퇴직급여-지급-지연이자-받기" },
      ]} />
      <PrevNext
        prev={{ title: "외국인근로자 산재보험 신청", href: "/w/외국인근로자-산재보험-받기" }}
        next={{ title: "장애인고용부담금 감면 계산", href: "/w/장애인고용부담금-감면-계산" }}
      />
    </BlogLayout>
  );
}
