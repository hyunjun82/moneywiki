"use client";
import { useState } from "react";
import {
  C,
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Btn,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "주 52시간 초과 퇴직 실업급여 조건 | 2개월 이상 정당사유 증빙",
  description: "주 52시간 초과 근무가 2개월 이상이면 자발적 퇴직이라도 실업급여 받는다는 거 아시나요? 정당사유 인정 기준과 증빙서류를 알려드려요.",
  category: "실업급여",
  keywords: [
    "주 52시간 초과 근무 실업급여 계산 방법",
    "주 52시간 초과 2개월 연속 합산 여부",
    "주 52시간 초과 퇴직 증빙 서류 목록",
    "주 52시간 초과 연장근로 평균 시간 산정",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "퇴직 전 1년 내 주 52시간 초과 근무가 <strong>2개월 이상</strong>이면 실업급여 받을 수 있어요.",
    "2개월은 반드시 연속일 필요 없어요. 1년 내 누적 <strong>2개월 이상</strong>이면 돼요.",
    "증빙서류는 임금명세서, 출퇴근 기록, 야근 수당 내역 등이 필요해요.",
  ],
  sources: [
    { name: "고용보험법 시행규칙 정당한 이직 사유", url: "https://www.law.go.kr/법령/고용보험법시행규칙", date: "2026-02" },
    { name: "고용노동부 실업급여 정당한 이직 사유 안내", url: "https://www.moel.go.kr/policy/policyinfo/benefit/list.do", date: "2026-02" },
  ],
  faq: [
    { q: "주 52시간 초과 2개월은 어떻게 증명하나요?", a: "임금명세서, 출퇴근 기록, 연장근로 수당 내역, 카드 야식 영수증 등 객관적 증빙이 필요해요. 회사가 협조하지 않으면 고용노동부에 진정을 통해 자료를 확보할 수 있어요." },
    { q: "주 52시간 초과가 반복되다가 중간에 정상인 주가 있어도 되나요?", a: "됩니다. 연속 2개월이 아니라 이직 전 1년 내 누적 2개월(8주) 이상이면 돼요. 중간에 52시간 이하인 주가 있어도 52시간 초과 주만 합산해서 8주 이상이면 인정돼요." },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "52시간 초과 실업급여 수급 여부 확인",
    subText: "근무 기간과 증빙 여부 선택",
    url: "/w/실업급여-수급자격-인정",
    external: false,
  },
  relatedDocs: [
    { title: "실업급여 수급자격 신청 절차", url: "/w/실업급여-수급자격-인정" },
    { title: "실업급여 구직활동 방법", url: "/w/실업급여-재취업-조건" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { period, proof } = sel;
    if (!period || !proof) return null;
    return `${period}_${proof}`;
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 수급 가능 여부 확인" },
    { t: "주 52시간 초과 기준은 어떻게 되나요?", sub: "1주 52시간 계산법 · 연장근로 포함" },
    { t: "2개월은 연속이어야 하나요?", sub: "1년 내 누적 계산 · 주 단위 합산" },
    { t: "정당사유 증빙서류는 뭐가 필요한가요?", sub: "임금명세서 · 출퇴근 기록 · 수당 내역" },
    { t: "평균 근로시간은 어떻게 계산하나요?", sub: "1주 기준 · 실제 근무시간 산정" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "정당사유 퇴직"]}
      tags={["2026년 최신", "실업급여", "52시간 초과", "정당사유"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>주 52시간 초과 근무가 <strong>2개월 이상</strong>이면 자발적 퇴직이라도 실업급여를 받을 수 있어요. 연속이 아닌 누적 <strong>2개월</strong>이에요.</>}
      sourceBar={{ badge: "고용노동부", name: "정당한 이직 사유 안내", date: "2026.02" }}
      stickyLabel="인정 기준"
      stickyValue="누적 2개월"
      stickyBtn="수급 가능 여부 확인 ↑"
      disclaimer="이 글은 고용보험법 시행규칙과 고용노동부 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "📋", title: "실업급여 수급자격 조건", sub: "비자발적 퇴직 요건 확인", href: "/w/실업급여-수급자격-인정", hot: true },
          { icon: "💰", title: "2026년 상한·하한액", sub: "일 68,100원 기준 계산", href: "/w/2026년-실업급여" },
          { icon: "🏛️", title: "실업급여 신청 방법", sub: "구비서류 온라인 신청", href: "/w/실업급여-신청방법" },
        ]} />
        <SidebarDocs items={[
          { title: "실업급여 수급자격 인정", cat: "실업급여·고용보험", href: "/w/실업급여-수급자격-인정" },
          { title: "실업급여 신청 방법", cat: "실업급여·고용보험", href: "/w/실업급여-신청방법" },
          { title: "2026년 실업급여 금액", cat: "실업급여·고용보험", href: "/w/2026년-실업급여" },
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
      <Sec n="STEP 01" id="checker" title="수급 가능 여부 확인" sub="52시간 초과 기간 · 증빙 여부 선택" />
      <P>주 52시간 초과 근무가 얼마나 됐는지, 증빙서류가 있는지 선택하면 수급 가능 여부를 바로 알 수 있어요.</P>

      <CheckerShell title="주 52시간 초과 실업급여 받을 수 있나요?" sub="30초 확인">
        <CheckerQ n="1" label="이직 전 1년 내 주 52시간 초과 근무가 얼마나 됐나요?" group="period" opts={[
          ["over2", "누적 2개월(8주) 이상이에요"],
          ["border", "1~2개월 사이예요 (경계선)"],
          ["under1", "1개월 미만이에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="52시간 초과 사실을 증명할 서류가 있나요?" group="proof" opts={[
          ["yes", "임금명세서·출퇴근 기록 등 있어요"],
          ["no", "서류가 없거나 부족해요"],
        ]} sel={sel} pick={pick} />

        {result === "over2_yes" && (
          <ResultPass title="정당사유 인정 가능성이 높아요">
            <P>누적 2개월 이상 + 증빙서류까지 있으면 정당한 이직 사유로 인정될 가능성이 높아요. 이직확인서 발급 후 고용센터에 수급자격 인정 신청을 하면 돼요.</P>
            <ResultCTA icon="📋" title="실업급여 수급자격 인정 신청" desc="신청 절차 단계별 안내" href="/w/실업급여-수급자격-인정" />
          </ResultPass>
        )}
        {result === "over2_no" && (
          <ResultPass title="증빙 부족 — 서류 확보가 먼저예요">
            <P>2개월 이상 초과했더라도 증빙이 없으면 인정이 어려울 수 있어요. 고용노동부 진정을 통해 자료를 확보하거나, 동료 증언·카드 야식 영수증 등 간접 증빙을 준비해요.</P>
            <ResultCTA icon="🏛️" title="고용노동부 민원마당" desc="임금명세서 미지급 진정 접수" href="https://minwon.moel.go.kr" />
          </ResultPass>
        )}
        {result === "border_yes" && (
          <ResultFail title="2개월 미달 — 추가 사유 확인이 필요해요">
            <P>1~2개월 사이면 기준 미달이에요. 다만 다른 정당사유(임금삭감, 직장 내 괴롭힘 등)와 복합적으로 인정받는 경우도 있어요. 고용센터 상담을 먼저 받아보세요.</P>
            <ResultCTA icon="📞" title="고용노동부 고객상담센터" desc="1350 무료 상담" href="https://www.moel.go.kr" />
          </ResultFail>
        )}
        {result === "border_no" && (
          <ResultFail title="기간도 부족, 증빙도 부족해요">
            <P>2개월 미만이면서 증빙도 없는 경우예요. 자발적 퇴직으로 처리될 가능성이 높아요. 다른 정당사유가 있는지 고용센터에서 상담해보세요.</P>
          </ResultFail>
        )}
        {result === "under1_yes" && (
          <ResultFail title="1개월 미만 — 정당사유로 인정되기 어려워요">
            <P>1개월 미만은 정당사유 기준에 미달해요. 52시간 초과가 계속된다면 퇴직 전 충분히 기간을 채우거나, 회사에 시정 요청 기록을 남겨두는 게 좋아요.</P>
          </ResultFail>
        )}
        {result === "under1_no" && (
          <ResultFail title="기간과 증빙 모두 부족해요">
            <P>52시간 초과 기간이 1개월 미만이고 증빙도 없으면 정당사유 인정이 거의 어려워요. 다른 퇴직 사유가 있는지 전문가(공인노무사)에게 상담해보세요.</P>
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="수급 가능 여부를 알았으면 신청 방법이 궁금하시죠?"
        a="이직확인서를 받은 후 고용24에서 온라인으로 신청할 수 있어요."
        label="실업급여 신청 절차 보기"
        href="/w/실업급여-신청방법"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="주 52시간 초과 기준은 어떻게 되나요?" sub="1주 52시간 계산법 · 연장근로 포함" />
      <P>1주 52시간은 법정 근로시간 40시간 + 연장근로 12시간이에요. <A href="https://www.law.go.kr/법령/근로기준법">근로기준법 제53조</A>에서 사용자는 1주에 12시간을 한도로 연장 근무를 시킬 수 있다고 정하고 있어요. 그 한도를 초과하는 근무가 52시간 초과 근무예요.</P>
      <P>계산 방법이에요. 월요일부터 일요일 7일을 기준으로 실제 근무한 시간을 합산해요. 소정 근무시간(계약상 근무시간)이 아니라 실제로 일한 시간 기준이에요. 야근, 주말 근무, 휴일 근무 모두 포함해요.</P>
      <P>예를 들어 평일 하루 10시간씩 5일을 일하면 50시간이에요. 여기에 토요일 4시간 근무가 추가되면 54시간이 되어 52시간을 2시간 초과해요. 이 주는 52시간 초과 주로 계산돼요.</P>
      <P>상시 5인 미만 사업장은 적용 예외예요. 근로기준법 연장근로 한도 규정은 상시 5인 이상 사업장에 적용돼요. 5인 미만 사업장이면 52시간 초과를 이유로 한 정당사유 인정이 어려울 수 있어요.</P>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="2개월은 연속이어야 하나요?" sub="1년 내 누적 계산 · 주 단위 합산" />
      <P>연속이 아니어도 돼요. 이직일 이전 1년 내에 누적으로 2개월 이상이면 인정돼요. <A href="https://www.law.go.kr/법령/고용보험법시행규칙">고용보험법 시행규칙</A>에서 이직 전 1년 이내에 2개월 이상 기간 동안 근로기준법 제53조를 위반한 초과 근무가 있었다면 정당한 이직 사유로 보고 있어요.</P>
      <P>중간에 정상 주가 있어도 괜찮아요. 예를 들어 52시간 초과 주가 1월에 4주, 4월에 5주라면 총 9주로 2개월을 넘어요. 2월~3월이 정상 근무여도 상관없이 52시간 초과 주만 합산해요.</P>
      <P>주 단위로 계산하는 게 정확해요. 2개월은 대략 8주예요. 52시간 초과 주가 8주 이상이면 기준을 충족해요. 임금명세서나 근무기록에서 주별로 초과 시간을 합산해서 계산하면 돼요.</P>
      <P>이직 전 최근 1년 이내에 해당해야 해요. 2년 전 초과 근무는 기준 기간을 벗어나서 인정이 안 돼요. 퇴직 전 최근 1년 치 근무 기록을 기준으로 삼아요.</P>

      <Info type="warn">2개월 기준은 이직 전 1년 내에요. 예전에 52시간을 많이 초과했어도 이직일 기준 1년이 지났다면 인정받기 어려워요. 퇴직 결심 시점에서 기간을 꼼꼼히 확인하세요.</Info>

      <RelatedMid
        title="실업급여 정당사유 관련 글"
        items={[
          { icon: "📋", title: "실업급여 수급자격 인정 조건", desc: "비자발적 퇴직 기준 확인", href: "/w/실업급여-수급자격-인정" },
          { icon: "💰", title: "2026년 실업급여 금액 기준", desc: "상한액·하한액 월 수령액", href: "/w/2026년-실업급여" },
          { icon: "🏛️", title: "실업급여 신청 방법", desc: "이직확인서 발급부터 신청까지", href: "/w/실업급여-신청방법" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="정당사유 증빙서류는 뭐가 필요한가요?" sub="임금명세서 · 출퇴근 기록 · 수당 내역" />
      <P>객관적인 기록이 있어야 인정받을 가능성이 높아요. 회사가 협조하지 않아도 내가 보관하고 있는 서류로 충분히 증빙할 수 있어요.</P>

      <TableTitle>52시간 초과 증빙서류 종류</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>서류 종류</THL><TH>증빙 방법</TH><TH>입수 방법</TH></tr>
          </thead>
          <tbody>
            {[
              ["임금명세서", "연장근로 수당 항목 확인", "급여 이체 내역서, 이메일 수령본"],
              ["출퇴근 기록", "실제 근무 시간대 확인", "사내 시스템 캡처, 카드 교통 내역"],
              ["야근 식대·교통비", "야근 사실 간접 증명", "법인카드·개인카드 결제 내역"],
              ["업무 메신저·이메일", "심야 업무 사실 확인", "카카오톡·슬랙 캡처 보관"],
              ["동료 진술서", "기록 없을 때 보완 증빙", "공증 없이도 참고 자료 활용 가능"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 8px", textAlign: "left", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>회사가 자료 제공을 거부하면 고용노동부에 진정을 통해 자료 확보를 요청할 수 있어요.</TableNote>

      <P>퇴직 전에 서류를 미리 저장해두는 게 좋아요. 퇴직 후에는 회사 시스템에 접근이 어려워져요. 업무 메신저, 이메일, 출퇴근 기록 등을 미리 다운로드하거나 캡처해두세요.</P>
      <P>회사가 임금명세서를 교부하지 않았다면 고용노동부에 신고할 수 있어요. 2021년 11월부터 임금명세서 교부가 의무화돼서 미교부는 과태료 대상이에요. 신고를 통해 간접적으로 증빙 자료를 확보할 수 있어요.</P>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="평균 근로시간은 어떻게 계산하나요?" sub="1주 기준 · 실제 근무시간 산정" />
      <P>1주(7일) 단위로 실제 근무한 총 시간을 계산해요. 소정근로시간(계약서상 시간)이 아니라 실제 일한 시간 기준이에요. 야근, 주말 근무, 휴일 근무 모두 포함돼요.</P>
      <P>계산 예시예요. 평일 9시 출근·22시 퇴근 기준으로 점심 1시간 제외하면 하루 12시간이에요. 5일이면 60시간이에요. 52시간 한도 대비 8시간 초과에요. 이 주는 52시간 초과 주로 분류돼요.</P>
      <P>포괄임금제여도 실제 근무시간이 기준이에요. 포괄임금 계약이라도 실제로 52시간을 초과해서 일했다면 인정받을 수 있어요. 실제 근무 사실을 입증하는 게 핵심이에요.</P>
      <P>주 단위 계산이 어렵다면 월 단위로 환산해도 돼요. 1개월 약 4.34주 기준으로, 월 초과 근무 시간을 주당으로 나눠서 계산해요. 평균이 주 52시간을 넘으면 기준에 해당해요.</P>

      <BridgeCard
        q="증빙서류를 다 모았다면 이제 신청 절차를 알아볼까요?"
        a="이직확인서를 먼저 받은 후 고용24에서 수급자격 인정 신청을 해요."
        label="실업급여 신청 방법 보기"
        href="/w/실업급여-신청방법"
      />

      <ExtBtn badge="법제처 공식" text="고용보험법 시행규칙 정당한 이직 사유" cta="바로가기 →" href="https://www.law.go.kr/법령/고용보험법시행규칙" />

      <Divider />

      <FAQAccordion items={meta.faq.map(f => ({ q: f.q, a: f.a }))} />

      <RelatedArticles items={[
        { title: "실업급여 수급자격 인정 절차", desc: "비자발적 퇴직 조건과 신청 방법", href: "/w/실업급여-수급자격-인정" },
        { title: "실업급여 신청 방법 구비서류", desc: "이직확인서·온라인 신청 절차", href: "/w/실업급여-신청방법" },
        { title: "50세 이상 실업급여 수급기간", desc: "최대 270일 수급 조건 안내", href: "/w/50세-이상-실업급여" },
        { title: "계약만료 실업급여 수급 조건", desc: "재계약 거부 비자발적 이직 판단", href: "/w/실업급여-계약만료" },
        { title: "2026년 실업급여 금액 기준", desc: "상한·하한액 월 수령액 계산", href: "/w/2026년-실업급여" },
      ]} />

      <PrevNext
        prev={{ title: "50세 이상 실업급여 수급기간", href: "/w/50세-이상-실업급여" }}
        next={{ title: "65세 이상 실업급여 수급 조건", href: "/w/65세-이상-실업급여" }}
      />
    </BlogLayout>
  );
}
