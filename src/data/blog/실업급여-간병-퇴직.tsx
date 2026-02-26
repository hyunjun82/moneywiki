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
  title: "간병 사유 퇴직 실업급여 조건 | 정당사유 증빙서류 목록",
  description: "가족 간병으로 퇴직해도 실업급여 받는다는 사실 알고 계셨나요? 배우자·직계존비속 30일 이상 간병이 정당사유로 인정되는 기준과 증빙서류를 알려드려요.",
  category: "실업급여",
  keywords: [
    "간병 사유 퇴직 실업급여 수급 방법",
    "가족 간병 30일 증빙 서류 종류",
    "간병 사유 정당사유 인정 판단 사례",
    "배우자 부모 시부모 간병 실업급여 차이",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "배우자·직계존비속을 <strong>30일 이상</strong> 간병해야 하는 상황이면 정당사유로 인정돼요.",
    "간병 대상의 진단서·입원 확인서 등 의료 서류로 <strong>30일 이상 필요성</strong>을 증빙해야 해요.",
    "형제자매나 시부모·장인장모는 인정 범위에 해당하지 않아요.",
  ],
  sources: [
    { name: "고용보험법 시행규칙 별표 자발적 이직 정당사유", url: "https://www.law.go.kr/법령/고용보험법시행규칙", date: "2026-02" },
    { name: "고용노동부 정당한 이직 사유 안내", url: "https://www.moel.go.kr/policy/policyinfo/benefit/list.do", date: "2026-02" },
  ],
  faq: [
    { q: "간병 사유 퇴직 후 재취업 활동을 못 하면 실업급여가 중단되나요?", a: "실업급여는 구직 의사와 능력이 있어야 수급할 수 있어요. 간병 중이더라도 수급 기간 중에는 적극적인 구직활동을 해야 해요. 간병 상황이 계속된다면 대체 간병인을 구하거나 일정을 조율해서 취업 가능 상태임을 입증해야 해요." },
    { q: "간병 사유 퇴직과 육아 사유 퇴직 실업급여 조건이 다른가요?", a: "다르지 않아요. 둘 다 고용보험법 시행규칙 별표에서 정한 정당한 이직 사유예요. 간병은 배우자·직계존비속 30일 이상, 육아는 만 8세 이하 영유아 양육이 기준이에요. 인정 방식은 비슷해요." },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "간병 퇴직 정당사유 해당 여부 확인",
    subText: "간병 대상과 기간 선택",
    url: "/w/실업급여-수급자격-인정",
    external: false,
  },
  relatedDocs: [
    { title: "실업급여 수급자격 신청 절차", url: "/w/실업급여-수급자격-인정" },
    { title: "주 52시간 초과 퇴직 실업급여", url: "/w/52시간-초과-퇴직-실업급여" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { target, period } = sel;
    if (!target || !period) return null;
    return `${target}_${period}`;
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 간병 퇴직 정당사유 해당 여부 확인" },
    { t: "간병으로 퇴직하면 실업급여 받을 수 있나요?", sub: "정당사유 인정 조건 · 간병 대상 범위" },
    { t: "간병 사유 30일 기준 증빙 서류는 뭐가 필요한가요?", sub: "진단서 · 장기요양등급 · 가족관계증명" },
    { t: "간병 정당사유 인정받으려면 어떤 경우인가요?", sub: "인과관계 · 계속 근무 불가 · 심사 기준" },
    { t: "배우자 부모 시부모 간병 실업급여 차이가 있나요?", sub: "직계존속 범위 · 시부모·장인장모 제외" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "퇴직 정당사유"]}
      tags={["2026년 최신", "실업급여", "간병 퇴직", "정당사유"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>가족 간병으로 퇴직해도 <strong>배우자·직계존비속 30일 이상</strong> 간병 상황이면 정당사유로 인정돼요. 형제자매나 시부모는 범위에 해당하지 않아요.</>}
      sourceBar={{ badge: "법제처", name: "고용보험법 시행규칙 별표", date: "2026.02" }}
      stickyLabel="핵심 조건"
      stickyValue="직계존비속 30일 이상"
      stickyBtn="정당사유 해당 여부 확인 ↑"
      disclaimer="이 글은 고용보험법 시행규칙과 고용노동부 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "📋", title: "실업급여 수급자격 신청", sub: "신청 절차와 구비서류 안내", href: "/w/실업급여-수급자격-인정", hot: true },
          { icon: "💼", title: "52시간 초과 퇴직 정당사유", sub: "2개월 이상 지속 조건", href: "/w/52시간-초과-퇴직-실업급여" },
          { icon: "💰", title: "임금삭감 퇴직 정당사유", sub: "20% 기준 2개월 인정", href: "/w/실업급여-임금삭감-퇴직-정당사유" },
        ]} />
        <SidebarDocs items={[
          { title: "실업급여 수급자격 인정", cat: "실업급여·고용보험", href: "/w/실업급여-수급자격-인정" },
          { title: "임금삭감 퇴직 정당사유", cat: "실업급여·고용보험", href: "/w/실업급여-임금삭감-퇴직-정당사유" },
          { title: "52시간 초과 퇴직", cat: "실업급여·고용보험", href: "/w/52시간-초과-퇴직-실업급여" },
          { title: "실업급여 신청 방법", cat: "실업급여·고용보험", href: "/w/실업급여-신청방법" },
        ]} />
        <SidebarCalc items={[
          { title: "실업급여 계산기", href: "/w/실업급여-상한액" },
          { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
        ]} />
      </>}
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="checker" title="간병 퇴직 정당사유 해당 여부 확인" sub="간병 대상 · 30일 기준 선택" />
      <P>간병 사유 퇴직이 실업급여 정당사유로 인정되려면 간병 대상과 간병 기간 두 가지를 먼저 확인해야 해요. 아래에서 선택하면 바로 알 수 있어요.</P>

      <CheckerShell title="간병 퇴직으로 실업급여 받을 수 있나요?" sub="30초 확인">
        <CheckerQ n="1" label="간병 대상이 누구인가요?" group="target" opts={[
          ["family", "배우자, 직계존비속(부모·자녀·조부모)이에요"],
          ["other", "형제자매나 배우자의 부모(시부모·장인장모)예요"],
          ["myself", "본인 건강 악화로 퇴직했어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="간병 기간이 얼마나 됐나요?" group="period" opts={[
          ["over30", "30일 이상 간병이 필요한 상황이에요"],
          ["under30", "30일 미만이에요"],
        ]} sel={sel} pick={pick} />

        {result === "family_over30" && (
          <ResultPass title="정당사유 인정 가능해요">
            <P>배우자·직계존비속을 30일 이상 간병해야 하는 상황이라면 정당한 이직 사유로 인정돼요. 간병 대상의 진단서, 입원 확인서, 장기요양등급 판정서 등 의료 서류를 준비해서 고용센터에 수급자격 신청을 하세요.</P>
            <ResultCTA icon="📋" title="수급자격 인정 신청 방법" desc="신청 절차와 구비서류 안내" href="/w/실업급여-수급자격-인정" />
          </ResultPass>
        )}
        {result === "family_under30" && (
          <ResultFail title="30일 기준에 미달이에요">
            <P>간병 기간이 30일 미만이면 인정받기 어려워요. 30일 이상 지속될 것으로 예상된다면 의사 소견서에 장기 치료 계획을 포함해서 제출하면 도움이 돼요. 고용센터에서 상담받아보세요.</P>
          </ResultFail>
        )}
        {result === "other_over30" && (
          <ResultFail title="형제자매·시부모는 인정 범위 밖이에요">
            <P>고용보험법 시행규칙에서 인정하는 대상은 배우자·직계존비속이에요. 형제자매나 배우자의 부모(시부모·장인장모)는 해당되지 않아요. 다른 정당사유(건강 악화, 근로조건 악화 등) 여부를 고용센터에서 상담받아보세요.</P>
          </ResultFail>
        )}
        {result === "other_under30" && (
          <ResultFail title="대상·기간 모두 기준에 미달이에요">
            <P>간병 대상과 기간 두 가지가 모두 기준에 미달이에요. 다른 퇴직 사유(임금 미지급, 근로조건 위반 등)가 있는지 확인해보고, 복합 사유로 고용센터에 상담받아보세요.</P>
          </ResultFail>
        )}
        {result === "myself_over30" && (
          <ResultPass title="건강 악화도 정당사유가 될 수 있어요">
            <P>본인의 건강 악화로 근무가 어려워 퇴직했다면 별도의 정당사유로 인정받을 수 있어요. 의사 진단서와 치료 기록을 준비해서 고용센터에 상담받아보세요. 간병 사유와는 다른 경로로 심사받지만 인정 가능성이 있어요.</P>
            <ResultCTA icon="💬" title="고용노동부 1350 상담" desc="건강 악화 퇴직 정당사유 확인" href="https://www.moel.go.kr/policy/policyinfo/benefit/list.do" />
          </ResultPass>
        )}
        {result === "myself_under30" && (
          <ResultFail title="건강 악화 여부를 고용센터에서 심사받아야 해요">
            <P>건강 악화가 퇴직 사유라면 기간 기준이 아닌 다른 심사 기준이 적용돼요. 진단서와 의사 소견서를 준비해서 고용센터에 상담받아보세요. 치료 필요성이 인정되면 정당사유가 될 수 있어요.</P>
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="정당사유 인정이 됐으면 이제 신청 절차가 궁금하시죠?"
        a="이직확인서를 받은 후 고용24에서 수급자격 인정 신청을 해요."
        label="실업급여 신청 절차 보기"
        href="/w/실업급여-수급자격-인정"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="간병으로 퇴직하면 실업급여 받을 수 있나요?" sub="정당사유 인정 조건 · 간병 대상 범위" />
      <P>받을 수 있어요. 단, 모든 간병이 다 인정되는 건 아니에요. <A href="https://www.law.go.kr/법령/고용보험법시행규칙">고용보험법 시행규칙</A> 별표에서 특정 조건을 충족해야 정당한 이직 사유로 인정해요.</P>
      <P>인정되는 간병 대상은 배우자와 직계존비속이에요. 직계존속은 부모, 조부모예요. 직계비속은 자녀, 손자녀예요. 형제자매는 법적으로 인정되는 범위가 아니에요.</P>
      <P>기간 기준도 중요해요. 30일 이상 간병이 필요한 상황이어야 해요. 이미 30일을 간병했다는 게 아니라, 앞으로도 30일 이상 간병이 필요하다고 의사가 판단한 상황이어야 해요. 단기 간호나 2~3주 회복 지원은 인정받기 어려워요.</P>
      <P>간병 이후에도 구직 의사와 능력이 있어야 해요. 간병이 끝나면 취업 가능한 상태임을 고용센터에 보여줘야 해요. 수급 기간 중에도 구직활동을 해야 수당이 지급돼요.</P>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="간병 사유 30일 기준 증빙 서류는 뭐가 필요한가요?" sub="진단서 · 장기요양등급 · 가족관계증명" />
      <P>의사가 발행한 의료 서류가 기본이에요. 30일 이상 간병이 필요하다는 사실을 객관적으로 증빙해야 해요.</P>
      <TableTitle>간병 사유 퇴직 증빙서류 목록</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>서류 종류</THL><TH>내용</TH><TH>비고</TH></tr>
          </thead>
          <tbody>
            {[
              ["진단서", "병명·치료 기간·간병 필요 여부 포함", "필수"],
              ["입원 확인서", "입원 기간 및 치료 이력", "입원 시 제출"],
              ["의사 소견서", "간병인 필요 기간 명시", "가장 중요"],
              ["장기요양 판정서", "1~5등급 판정 결과", "있으면 유리"],
              ["가족관계증명서", "간병 대상이 직계존비속임을 증명", "필수"],
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
      <TableNote>장기요양등급을 받은 경우 간병 필요성이 공식 인정된 것이어서 심사가 훨씬 수월해요.</TableNote>

      <P>의사 소견서에 "약 X개월 간병 필요"라는 내용이 있으면 30일 이상 기준 증빙에 가장 효과적이에요. 장기 치료 예상 문구나 재활 기간 명시도 도움이 돼요.</P>
      <P>가족관계 확인 서류도 챙겨야 해요. 가족관계증명서나 주민등록등본으로 간병 대상이 배우자 또는 직계존비속임을 확인해요.</P>

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="간병 정당사유 인정받으려면 어떤 경우인가요?" sub="인과관계 · 계속 근무 불가 · 심사 기준" />
      <P>단순히 간병 상황이 있었다는 것만으로는 부족해요. 간병 때문에 계속 근무가 불가능했다는 인과관계가 있어야 해요.</P>
      <P>인과관계 증명이 핵심이에요. 간병 대상의 상태가 심각해서 본인이 직접 간병하지 않으면 안 되는 상황이어야 해요. 다른 가족이나 전문 간병인을 쓸 수 없는 사정도 설명되면 좋아요. 회사에 근로시간 조정이나 재택근무를 요청했는데 거부된 경우라면 인과관계가 더욱 명확해져요.</P>
      <P>퇴직 시점과 간병 시작이 일치해야 해요. 간병 필요 상황이 생겼고 그로 인해 퇴직했다는 연결이 명확해야 해요. 간병이 시작된 후 오래 지나서 퇴직했다면 연관성이 약해질 수 있어요. 퇴직 전에 회사에 간병 사유를 알렸다는 기록이 있으면 도움이 돼요.</P>
      <P>불인정 결정이 나와도 이의신청을 할 수 있어요. 결정 통보일로부터 90일 이내에 심사청구를 할 수 있어요. 추가 증빙 서류를 보완해서 재심사를 받을 수 있어요.</P>

      <RelatedMid
        hubHref="/w/실업급여-임금삭감-퇴직-정당사유"
        hubLabel="다른 정당사유 퇴직도 알아보기"
        items={[
          { icon: "💰", title: "임금삭감 퇴직 정당사유", desc: "임금 20% 감소 시 인정 조건", href: "/w/실업급여-임금삭감-퇴직-정당사유" },
          { icon: "⚠️", title: "임금체불 퇴직 정당사유", desc: "체불 후 자진퇴직 수급 조건", href: "/w/실업급여-임금체불-퇴직-정당사유" },
          { icon: "⏰", title: "52시간 초과 퇴직 실업급여", desc: "법정 근로시간 초과 퇴직 조건", href: "/w/52시간-초과-퇴직-실업급여" },
        ]}
      />

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="배우자 부모 시부모 간병 실업급여 차이가 있나요?" sub="직계존속 범위 · 시부모·장인장모 제외" />
      <P>배우자의 부모(시부모, 장인장모)는 인정 대상이 아니에요. 직계존비속은 본인 기준이에요. 배우자의 직계존속은 본인의 직계존속이 아니에요.</P>
      <P>부모님(직계존속)은 인정 대상이에요. 부모, 조부모, 증조부모 등 직계존속을 30일 이상 간병해야 하는 상황이면 정당사유가 돼요. 치매, 뇌졸중, 골절 등 장기 입원이나 재가 요양이 필요한 경우가 해당돼요.</P>
      <P>장기요양등급이 없어도 신청할 수 있어요. 진단서와 의사 소견서로 30일 이상 간병 필요성을 입증하면 돼요. 갑작스러운 사고로 장기요양 등급이 아직 없는 경우에도 병원 서류를 최대한 모아서 제출하면 돼요.</P>
      <P>자녀 간병도 인정 대상이에요. 만성 질환이나 장기 입원이 필요한 자녀를 간병해야 하는 경우라면 직계비속으로 인정돼요. 단, 만 8세 이하 영유아 양육은 별도의 육아 사유 정당사유로 처리돼요.</P>

      <ExtBtn badge="법제처 공식" text="고용보험법 시행규칙 정당사유 조항" cta="바로가기 →" href="https://www.law.go.kr/법령/고용보험법시행규칙" />

      <FAQAccordion items={meta.faq} />
      <RelatedArticles items={[
        { title: "실업급여 수급자격 신청 절차", desc: "비자발적 퇴직 조건과 신청 방법", href: "/w/실업급여-수급자격-인정" },
        { title: "주 52시간 초과 퇴직 실업급여", desc: "근로시간 초과 퇴직 정당사유 조건", href: "/w/52시간-초과-퇴직-실업급여" },
      ]} />
      <PrevNext
        prev={{ title: "52시간 초과 퇴직 실업급여", href: "/w/52시간-초과-퇴직-실업급여" }}
        next={{ title: "건설일용직 실업급여 조건", href: "/w/건설일용직-실업급여" }}
      />
    </BlogLayout>
  );
}
