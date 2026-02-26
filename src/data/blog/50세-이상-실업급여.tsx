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
  title: "50세 이상 실업급여 수급기간 혜택 | 최대 270일 연장 조건",
  description: "50세 이상이면 실업급여를 최대 270일까지 받는다는 사실 알고 계셨나요? 수급기간 연장 조건과 혜택을 정리해드려요.",
  category: "실업급여",
  keywords: [
    "50세 이상 실업급여 수급기간 최장 일수",
    "50세 이상 실업급여 피보험기간 270일 연장",
    "50세 이상 실업급여 일반 수급자 기간 비교",
    "50세 이상 취업촉진수당 조기재취업 수당",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "50세 이상은 같은 피보험기간에서 50세 미만보다 <strong>30일</strong> 더 받아요.",
    "피보험기간 10년 이상 + 50세 이상이면 최대 <strong>270일</strong>이에요.",
    "취업촉진수당(조기재취업수당 등)은 나이 무관하게 신청 가능해요.",
  ],
  sources: [
    { name: "고용보험법 별표 구직급여 소정급여일수", url: "https://www.law.go.kr/법령/고용보험법", date: "2026-02" },
    { name: "고용노동부 실업급여 안내", url: "https://www.moel.go.kr/policy/policyinfo/benefit/list.do", date: "2026-02" },
  ],
  faq: [
    { q: "50세 이상 실업급여 270일은 누구에게 해당되나요?", a: "고용보험 피보험기간이 10년 이상인 50세 이상 근로자에게 해당돼요. 피보험기간 10년 이상이면 50세 미만은 240일인데, 50세 이상은 270일이에요. 장애인도 동일하게 270일을 받아요." },
    { q: "50세 생일 전 퇴직하면 50세 이상 혜택을 못 받나요?", a: "퇴직일 기준으로 나이를 판단해요. 퇴직일이 50세 생일 이전이면 49세 기준이 적용돼요. 반대로 50세 생일 이후 퇴직이라면 50세 이상 기준이 그대로 적용돼요." },
  ],
  ctaCard: {
    label: "30초 확인",
    mainText: "50세 이상 실업급여 수급기간 조회",
    subText: "피보험기간 기준으로 바로 계산",
    url: "https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do",
    external: true,
  },
  relatedDocs: [
    { title: "2026년 실업급여 상한액 하한액", url: "/w/2026년-실업급여" },
    { title: "실업급여 수급자격 신청 절차", url: "/w/실업급여-수급자격-인정" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { tenure, age } = sel;
    if (!tenure || !age) return null;
    return `${tenure}_${age}`;
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 내 소정급여일수 확인" },
    { t: "50세 이상 실업급여는 얼마나 받나요?", sub: "수급기간 최장 일수 · 피보험기간별 비교" },
    { t: "50세 이상 실업급여 270일 연장 조건이 뭐예요?", sub: "피보험기간 10년 이상 · 퇴직일 기준 나이" },
    { t: "50세 이상 수급기간이 어떻게 달라지나요?", sub: "나이별 소정급여일수 비교표" },
    { t: "취업촉진수당도 받을 수 있나요?", sub: "조기재취업수당 · 직업능력개발수당" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "실업급여", "수급기간"]}
      tags={["2026년 최신", "실업급여", "50세 이상", "수급기간"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>50세 이상이면 실업급여 소정급여일수가 최대 <strong>270일</strong>이에요. 50세 미만 같은 조건보다 <strong>30일</strong> 더 받아요.</>}
      sourceBar={{ badge: "법제처", name: "고용보험법 별표 소정급여일수", date: "2026.02" }}
      stickyLabel="최대 수급기간"
      stickyValue="270일"
      stickyBtn="내 수급일수 확인 ↑"
      disclaimer="이 글은 고용보험법과 고용노동부 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "🧮", title: "실업급여 수령액 계산", sub: "고용24 모의 계산기", href: "https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do", hot: true },
          { icon: "📋", title: "실업급여 수급자격 조건", sub: "비자발적 퇴직 요건 확인", href: "/w/실업급여-수급자격-인정" },
          { icon: "💰", title: "2026년 상한·하한액", sub: "일 68,100원 기준 계산", href: "/w/2026년-실업급여" },
        ]} />
        <SidebarDocs items={[
          { title: "실업급여 수급자격 인정", cat: "실업급여·고용보험", href: "/w/실업급여-수급자격-인정" },
          { title: "2026년 실업급여 상한액", cat: "실업급여·고용보험", href: "/w/2026년-실업급여" },
          { title: "실업급여 신청 방법", cat: "실업급여·고용보험", href: "/w/실업급여-신청방법" },
          { title: "실업급여 구직활동 방법", cat: "실업급여·고용보험", href: "/w/실업급여-재취업-조건" },
        ]} />
        <SidebarCalc items={[
          { title: "실업급여 계산기", href: "/w/실업급여-상한액" },
          { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
          { title: "연말정산 계산기", href: "/w/연말정산-세액공제" },
        ]} />
      </>}
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="checker" title="내 소정급여일수 확인" sub="피보험기간 · 나이 선택하면 바로 알 수 있어요" />
      <P>50세 이상이면 소정급여일수가 달라져요. 피보험기간과 나이를 선택하면 수급 가능 일수를 바로 알 수 있어요.</P>

      <CheckerShell title="50세 이상 실업급여 수급기간 얼마예요?" sub="30초 확인">
        <CheckerQ n="1" label="고용보험 피보험기간이 얼마나 됐나요?" group="tenure" opts={[
          ["over10", "10년 이상이에요"],
          ["mid", "1년 이상~10년 미만이에요"],
          ["short", "1년 미만이에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="퇴직 당시 나이가 어떻게 되나요?" group="age" opts={[
          ["over50", "50세 이상이에요"],
          ["under50", "50세 미만이에요"],
        ]} sel={sel} pick={pick} />

        {result === "over10_over50" && (
          <ResultPass title="최대 270일 — 50세 이상 최대 혜택이에요">
            <P>피보험기간 10년 이상 + 50세 이상이면 소정급여일수 270일이에요. 50세 미만 같은 조건(240일)보다 30일 더 받아요. 일 68,100원(2026년 상한) 기준 총 약 1,839만원이에요.</P>
            <ResultCTA icon="🧮" title="고용24 수령액 계산기" desc="정확한 금액 모의 계산" href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do" />
          </ResultPass>
        )}
        {result === "over10_under50" && (
          <ResultPass title="240일 — 일반 최대 수급기간이에요">
            <P>피보험기간 10년 이상이면 50세 미만도 240일을 받아요. 50세 이상이었다면 270일이지만, 기본 최대 구간에 해당해요. 일 68,100원 기준 총 약 1,634만원이에요.</P>
            <ResultCTA icon="🧮" title="고용24 수령액 계산기" desc="내 예상 수령액 확인" href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do" />
          </ResultPass>
        )}
        {result === "mid_over50" && (
          <ResultPass title="180~240일 — 50세 이상 가산이 적용돼요">
            <P>피보험기간 1~3년이면 180일, 3~5년이면 210일, 5~10년이면 240일이에요. 50세 미만보다 각 30일씩 추가돼요. 정확한 일수는 고용24에서 확인하세요.</P>
            <ResultCTA icon="🧮" title="고용24 소정급여일수 확인" desc="피보험기간 입력 후 확인" href="https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do" />
          </ResultPass>
        )}
        {result === "mid_under50" && (
          <ResultPass title="150~210일 — 기본 구간이에요">
            <P>피보험기간 1~3년이면 150일, 3~5년이면 180일, 5~10년이면 210일이에요. 50세 이상 기준 대비 각 30일 적어요. 피보험기간을 더 쌓으면 다음 구간으로 올라가요.</P>
          </ResultPass>
        )}
        {result === "short_over50" && (
          <ResultPass title="120일 — 피보험기간 1년 미만 예외 구간이에요">
            <P>피보험기간 1년 미만 구간은 50세 이상이라도 120일로 동일해요. 이 구간만 나이 가산이 없어요. 피보험기간이 1년을 넘으면 30일 가산이 적용돼요.</P>
          </ResultPass>
        )}
        {result === "short_under50" && (
          <ResultPass title="120일 — 기본 최저 구간이에요">
            <P>피보험기간 1년 미만이면 나이와 무관하게 120일이에요. 피보험기간이 쌓일수록 수급일수가 늘어나요. 이전 직장 피보험기간도 합산할 수 있어요.</P>
          </ResultPass>
        )}
      </CheckerShell>

      <BridgeCard
        q="수급기간을 알았으면 이제 수급자격 조건이 궁금하시죠?"
        a="피보험기간 180일 이상, 비자발적 퇴직 등 기본 조건부터 확인해야 해요."
        label="실업급여 수급자격 확인"
        href="/w/실업급여-수급자격-인정"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="50세 이상 실업급여는 얼마나 받나요?" sub="수급기간 최장 일수 · 피보험기간별 비교" />
      <P>50세 이상이면 같은 피보험기간 기준으로 소정급여일수가 30일 더 길어요. <A href="https://www.law.go.kr/법령/고용보험법">고용보험법</A> 별표에서 50세 이상(또는 장애인)을 별도 구간으로 분리해서 더 많이 받도록 정하고 있어요.</P>
      <P>피보험기간 10년 이상 + 50세 이상이면 최대 270일이에요. 50세 미만 같은 조건은 240일이에요. 30일 차이가 2026년 상한 기준(일 68,100원)으로 약 204만원 차이예요.</P>
      <P>50세 이상 혜택은 퇴직일 기준으로 판단해요. 수급 중에 50세 생일이 지나도 이미 확정된 소정급여일수는 바뀌지 않아요. 퇴직 당시 나이가 중요해요.</P>
      <P>장애인도 동일한 혜택을 받아요. 나이와 무관하게 장애인이면 소정급여일수 계산 시 50세 이상과 동일한 기준이 적용돼요.</P>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="50세 이상 실업급여 270일 연장 조건이 뭐예요?" sub="피보험기간 10년 이상 · 퇴직일 기준 나이" />
      <P>270일을 받으려면 두 가지가 모두 충족돼야 해요. 퇴직일 기준 나이 50세 이상, 고용보험 피보험기간 통산 10년 이상이에요. 한 직장에서 10년이 아니어도 돼요. 여러 직장을 합산한 총 피보험기간이 10년 이상이면 돼요.</P>
      <P>나이 기준일은 퇴직일이에요. 퇴직일이 50세 생일 이전이면 49세 기준, 생일 이후면 50세 이상 기준이에요. 생일 직전에 퇴직하면 아쉽게도 50세 미만으로 처리돼요.</P>
      <P>피보험기간 계산은 여러 직장을 합산해요. A 회사 5년 + B 회사 5년이라면 총 10년으로 인정돼요. 다만, 실업급여를 받은 기간은 피보험기간에서 차감될 수 있으니 주의해야 해요.</P>
      <P>수급 신청 전 고용24에서 내 피보험기간을 조회해보세요. 고용24 → 실업급여 → 피보험기간 확인에서 내 이력을 볼 수 있어요.</P>

      <Info type="warn">퇴직일 기준으로 나이를 판단해요. 50세 생일이 퇴직일 이후라면 아쉽게도 49세 기준이 적용돼요. 생일 이후로 퇴직일을 조금 늦출 수 있다면 소정급여일수 30일 차이가 생겨요.</Info>

      <RelatedMid
        title="실업급여 수급기간 관련 글"
        items={[
          { icon: "💰", title: "2026년 실업급여 상한액 하한액", desc: "일 68,100원 기준 월 수령액", href: "/w/2026년-실업급여" },
          { icon: "📋", title: "실업급여 수급자격 인정 조건", desc: "비자발적 퇴직 기준 확인", href: "/w/실업급여-수급자격-인정" },
          { icon: "🏛️", title: "실업급여 신청 방법 절차", desc: "고용센터 신청 단계별 안내", href: "/w/실업급여-신청방법" },
        ]}
        hubHref="/category/실업급여"
        hubLabel="실업급여 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="50세 이상 수급기간이 어떻게 달라지나요?" sub="나이별 소정급여일수 비교표" />
      <P>피보험기간별로 50세 이상과 미만의 소정급여일수 차이를 비교한 표예요. 피보험기간 1년 미만 구간만 예외이고, 나머지는 모두 30일 차이가 나요.</P>

      <TableTitle>피보험기간별 소정급여일수 비교</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>피보험기간</THL><TH>50세 미만</TH><TH>50세 이상/장애인</TH><TH>차이</TH></tr>
          </thead>
          <tbody>
            {[
              ["1년 미만", "120일", "120일", "없음"],
              ["1~3년", "150일", "180일", "+30일"],
              ["3~5년", "180일", "210일", "+30일"],
              ["5~10년", "210일", "240일", "+30일"],
              ["10년 이상", "240일", "270일", "+30일"],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "8px 8px", textAlign: ci === 0 ? "left" : "center", borderBottom: `1px solid ${C.line}`, color: ci === 0 ? C.t1 : C.t2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableNote>피보험기간 1년 미만 구간은 나이 무관 120일로 동일해요. 나머지 구간은 모두 50세 이상이면 30일 가산돼요.</TableNote>

      <P>수급기간 중에 50세가 된다고 해서 늘어나지 않아요. 퇴직 당시 나이로 한 번 결정되면 변경되지 않아요. 수급기간 중 생일이 지나도 이미 결정된 소정급여일수는 유지돼요.</P>
      <P>피보험기간 1년 미만 구간에서는 50세 이상 혜택이 없어요. 1년을 넘기면 다음 구간부터 30일 가산이 시작돼요. 아르바이트나 단기 근무자도 피보험기간 180일을 채우면 기본 수급권이 생겨요.</P>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="취업촉진수당도 받을 수 있나요?" sub="조기재취업수당 · 직업능력개발수당" />
      <P>나이 제한 없이 신청 가능해요. 취업촉진수당은 실업급여 수급자 전체를 대상으로 해요. 50세 이상이라는 이유로 추가 혜택이 있지는 않지만, 수급일수가 길어서 혜택 규모가 더 커요.</P>
      <P>조기재취업수당은 소정급여일수의 절반 이상이 남은 상태에서 취업하면 잔여 수급액의 50%를 일시금으로 받는 제도예요. 50세 이상이라면 소정급여일수가 길기 때문에 조기재취업 시 더 많은 금액을 받을 수 있어요.</P>
      <P>직업능력개발수당도 받을 수 있어요. 실업급여 수급 중 고용센터가 지정한 훈련에 참여하면 훈련 기간 동안 추가 수당을 받아요. 50세 이상도 동일하게 신청 가능해요.</P>
      <P>훈련 연장급여도 있어요. 고용센터장이 지정한 훈련을 수강하는 경우 소정급여일수를 초과해 훈련 기간 동안 연장급여를 받을 수 있어요. 구직급여 수급 중 직업훈련을 병행하면 수급 기간이 늘어나요.</P>

      <BridgeCard
        q="취업촉진수당 신청 전 구직활동 조건도 확인해야 해요"
        a="매 4주마다 구직활동 실적을 고용센터에 제출해야 수급이 유지돼요."
        label="실업급여 구직활동 조건 보기"
        href="/w/실업급여-재취업-조건"
      />

      <ExtBtn badge="법제처 공식" text="고용보험법 별표 소정급여일수" cta="바로가기 →" href="https://www.law.go.kr/법령/고용보험법" />

      <Divider />

      <FAQAccordion items={meta.faq.map(f => ({ q: f.q, a: f.a }))} />

      <RelatedArticles items={[
        { title: "2026년 실업급여 상한액·하한액 기준", desc: "일 68,100원 상한 기준 월 수령액 계산법", href: "/w/2026년-실업급여" },
        { title: "실업급여 수급자격 인정 절차", desc: "비자발적 퇴직 조건과 신청 방법", href: "/w/실업급여-수급자격-인정" },
        { title: "실업급여 신청 방법 구비서류", desc: "이직확인서·온라인 신청 단계 안내", href: "/w/실업급여-신청방법" },
        { title: "실업급여 구직활동 조건", desc: "4주마다 재취업 활동 인정 기준", href: "/w/실업급여-재취업-조건" },
        { title: "실업급여 대기기간 7일", desc: "수급 개시 전 대기기간 규정 안내", href: "/w/실업급여-대기기간" },
      ]} />

      <PrevNext
        prev={{ title: "2026년 실업급여 상한액 하한액 기준", href: "/w/2026년-실업급여" }}
        next={{ title: "주 52시간 초과 퇴직 실업급여 조건", href: "/w/52시간-초과-퇴직-실업급여" }}
      />
    </BlogLayout>
  );
}
