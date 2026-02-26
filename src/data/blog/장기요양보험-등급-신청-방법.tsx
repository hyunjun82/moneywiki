"use client";
import { useState } from "react";
import {
  C,
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3,
  Info, InlineLink, BridgeCard, ExtBtn,
  FAQAccordion, RelatedArticles, PrevNext,
  RelatedMid, SidebarCTA, SidebarDocs, SidebarCalc,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultCTA,
  Divider, TableTitle, TableNote, TH, THL, Steps,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "노인장기요양보험 등급 신청 방법 | 1등급 2등급 판정 기준 본인부담금",
  description: "부모님 거동이 불편하면 장기요양등급 신청이 가능하다는 거 아시나요? 1~5등급 판정 기준과 본인부담금을 알려드려요.",
  category: "복지",
  keywords: [
    "노인장기요양보험 등급 신청 방법",
    "장기요양 1등급 2등급 판정 기준",
    "장기요양보험 본인부담금 계산",
    "장기요양 등급 신청 서류 절차",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "장기요양등급은 1~5등급 + 인지지원등급으로 나뉘고, <strong>52가지 기능 항목</strong>을 평가해요.",
    "1등급은 95점 이상으로 일상생활 전반 도움 필요, 5등급은 45~51점 수준이에요.",
    "시설 이용 본인부담금은 급여비의 <strong>20%</strong>이고, 의료급여·기초수급자는 더 낮아요.",
  ],
  sources: [
    { name: "국민건강보험공단 장기요양 인정 기준", url: "https://www.longtermcare.or.kr/npbs/e/b/102/npeb102m01.web", date: "2026-02" },
    { name: "노인장기요양보험 법령정보", url: "https://www.law.go.kr/법령/노인장기요양보험법", date: "2026-02" },
  ],
  faq: [
    { q: "장기요양등급 신청 후 결과가 마음에 안 들면 어떻게 하나요?", a: "이의신청이 가능해요. 결정 통보를 받은 날로부터 90일 이내에 국민건강보험공단에 이의신청을 할 수 있어요. 이후 장기요양심판위원회에 재심사를 청구할 수도 있어요." },
    { q: "치매가 있어도 거동이 가능하면 등급을 받을 수 있나요?", a: "네, 가능해요. 인지지원등급 제도가 있어요. 치매로 인지기능이 저하되었지만 신체 기능은 어느 정도 유지된 경우에도 인지지원등급(1~5등급 외 별도 등급)을 받을 수 있어요. 주야간보호 서비스를 이용할 수 있어요." },
  ],
  ctaCard: {
    label: "등급 확인",
    mainText: "장기요양 1~5등급 판정",
    subText: "52개 항목 방문조사로 결정",
    url: "https://www.longtermcare.or.kr",
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
    const { mobility, dementia, age } = sel;
    if (!mobility || !dementia || !age) return null;
    if (age === "under65" && dementia === "no") return "age_issue";
    if (mobility === "severe") return "high_grade";
    if (mobility === "partial" || dementia === "yes") return "mid_grade";
    return "low_grade";
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 등급 신청 가능 여부 확인" },
    { t: "노인장기요양보험 등급 신청 방법은 어떻게 되나요?", sub: "신청 절차 · 방문조사 · 판정위원회" },
    { t: "장기요양 1~5등급 판정 기준은 무엇인가요?", sub: "장기요양인정점수 · 등급별 범위" },
    { t: "장기요양보험 본인부담금은 얼마인가요?", sub: "재가 15% · 시설 20% · 감면 대상" },
    { t: "장기요양 등급 신청 서류는 무엇인가요?", sub: "신청 서류 · 의사소견서 제출" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "복지", "장기요양"]}
      tags={["2026년 최신", "복지", "노인장기요양", "장기요양보험"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>노인장기요양보험은 65세 이상이거나 노인성 질병이 있으면 신청할 수 있어요. <strong>1~5등급+인지지원등급</strong>으로 판정돼요.</>}
      sourceBar={{ badge: "국민건강보험공단", name: "장기요양 인정 기준", date: "2026.02" }}
      stickyLabel="시설 본인부담금"
      stickyValue="급여비의 20%"
      stickyBtn="등급 신청 방법 ↑"
      disclaimer="이 글은 국민건강보험공단과 노인장기요양보험법을 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "🏥", title: "장기요양 신청 바로가기", sub: "국민건강보험공단 공식", href: "https://www.longtermcare.or.kr", hot: true },
          { icon: "🏠", title: "주거급여 2026", sub: "기초수급자 주거 지원", href: "/w/기초생활수급자-주거급여-2026" },
          { icon: "♿", title: "장애인 복지카드 발급", sub: "교통·세금 감면 혜택", href: "/w/장애인-복지카드-발급-신청" },
        ]} />
        <SidebarDocs items={[
          { title: "기초생활수급자 주거급여 2026", cat: "복지·지원금", href: "/w/기초생활수급자-주거급여-2026" },
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
      <Sec n="STEP 01" id="checker" title="등급 신청 가능 여부 확인" sub="거동 상태 · 인지 기능 · 연령 선택" />
      <P>장기요양등급 신청 전에 기본 조건을 확인해야 해요. 65세 이상이거나 치매·뇌졸중 등 노인성 질병이 있어야 해요. 아래에서 상황을 선택하면 어떤 등급대를 받을 가능성이 있는지 대략 알 수 있어요.</P>

      <CheckerShell title="장기요양등급을 받을 수 있을까요?" sub="30초 확인">
        <CheckerQ n="1" label="현재 거동 상태가 어떻게 되나요?" group="mobility" opts={[
          ["severe", "혼자서 아무것도 못 해요 (식사·이동·배변 전부 도움 필요)"],
          ["partial", "일부는 가능하지만 많은 도움이 필요해요"],
          ["minor", "약간의 불편함만 있고 대부분 스스로 가능해요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="치매나 인지 기능 저하가 있나요?" group="dementia" opts={[
          ["yes", "치매 진단을 받았거나 인지 저하가 있어요"],
          ["no", "인지 기능은 정상이에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="3" label="연령이 어떻게 되나요?" group="age" opts={[
          ["over65", "만 65세 이상이에요"],
          ["under65", "65세 미만이에요 (노인성 질병 있음)"],
          ["under65_no", "65세 미만이고 노인성 질병 없어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="4" label="의사 소견서를 발급받을 수 있나요?" group="doc" opts={[
          ["yes", "주치의나 병원에서 발급 가능해요"],
          ["no", "아직 진단을 받지 않았어요"],
        ]} sel={sel} pick={pick} />

        {result === "high_grade" && (
          <ResultPass title="1~2등급 가능성이 있어요">
            <P>일상생활 전반에 걸쳐 도움이 필요한 경우 1~2등급을 받을 가능성이 있어요. 방문조사에서 52개 기능 항목을 평가해 최종 결정돼요. 국민건강보험공단에 신청하면 돼요.</P>
            <ResultCTA icon="🏥" title="장기요양 등급 신청" desc="국민건강보험공단에서 바로 신청" href="https://www.longtermcare.or.kr" />
          </ResultPass>
        )}
        {result === "mid_grade" && (
          <ResultPass title="3~4등급이나 인지지원등급 가능성이 있어요">
            <P>일부 도움이 필요하거나 치매가 있으면 3~4등급 또는 인지지원등급을 받을 수 있어요. 신청 후 방문조사와 의사소견서를 바탕으로 최종 판정돼요.</P>
            <ResultCTA icon="🏥" title="장기요양 등급 신청" desc="국민건강보험공단에서 신청하기" href="https://www.longtermcare.or.kr" />
          </ResultPass>
        )}
        {result === "low_grade" && (
          <ResultFail title="현재 상태로는 등급 받기 어려울 수 있어요">
            <P>경미한 불편함만 있다면 장기요양등급을 받기 어려울 수 있어요. 하지만 신청 자체는 가능하고 방문조사에서 정확히 판정해요. 예상보다 낮게 나올 수 있어도 신청해보는 게 좋아요.</P>
            <ResultCTA icon="🏥" title="장기요양 등급 신청" desc="방문조사 후 정확히 판정돼요" href="https://www.longtermcare.or.kr" />
          </ResultFail>
        )}
        {result === "age_issue" && (
          <ResultFail title="65세 미만이면 노인성 질병이 있어야 신청 가능해요">
            <P>65세 미만은 치매·뇌졸중·파킨슨병 등 노인성 질병이 있어야 장기요양 신청이 가능해요. 노인성 질병 없이는 신청 대상이 아니에요.</P>
            <ResultCTA icon="📋" title="노인성 질병 목록 확인" desc="해당 질병 여부를 먼저 확인해보세요" href="https://www.longtermcare.or.kr" />
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="등급 판정 기준이 궁금하시죠?"
        a="52개 기능 항목을 점수화해서 95점 이상은 1등급, 45점 이상은 5등급이에요."
        label="등급 판정 기준 바로 보기"
        href="#s3"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="노인장기요양보험 등급 신청 방법은 어떻게 되나요?" sub="신청 절차 · 방문조사 · 판정위원회" />
      <P><A href="https://www.law.go.kr/법령/노인장기요양보험법">노인장기요양보험법</A>에 따라 운영되는 장기요양보험은 일상생활을 혼자 수행하기 어려운 노인에게 신체·가사 활동을 지원해요. 국민건강보험공단이 운영해요.</P>
      <P>신청 자격은 65세 이상 또는 65세 미만이지만 치매·뇌졸중·파킨슨병 등 노인성 질병이 있는 경우예요. 나이 조건이 충족되면 언제든지 신청할 수 있어요. 신청자는 본인, 가족, 법정대리인이 할 수 있어요.</P>

      <H3>신청부터 결정까지 절차</H3>
      <Steps items={[
        { title: "국민건강보험공단 신청", desc: "가까운 공단 지사 방문, 전화(1577-1000) 또는 온라인(longtermcare.or.kr)으로 신청서를 제출해요." },
        { title: "방문조사 (공단 직원)", desc: "공단 소속 직원이 신청자 거주지를 방문해서 52개 기능 항목을 조사해요. 약 1~2시간 소요돼요." },
        { title: "의사소견서 제출", desc: "주치의 또는 병원에서 의사소견서를 발급받아 제출해요. 비용은 본인 부담(공단에서 일부 지원)이에요." },
        { title: "등급판정위원회 심의", desc: "방문조사 결과와 의사소견서를 종합해서 등급을 결정해요." },
        { title: "결과 통보 및 급여 이용", desc: "신청 후 약 30일 이내에 결과를 통보해요. 등급 확정 후 요양 서비스를 이용할 수 있어요." },
      ]} />

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="장기요양 1~5등급 판정 기준은 무엇인가요?" sub="장기요양인정점수 · 등급별 범위" />
      <P>등급 판정은 52개 기능 항목을 조사해서 나온 장기요양인정점수로 결정돼요. 점수가 높을수록 기능 저하가 심각하고, 높은 등급(1등급)을 받아요. 점수가 낮으면 낮은 등급이에요.</P>
      <P>1등급은 장기요양인정점수 95점 이상이에요. 일상생활에서 전적으로 타인의 도움이 필요한 상태예요. 2등급은 75~95점 미만, 3등급은 60~75점, 4등급은 51~60점, 5등급은 45~51점이에요.</P>
      <P>인지지원등급은 45점 미만이지만 치매로 인해 일상생활 수행에 어려움이 있는 경우예요. 신체 기능은 어느 정도 유지되지만 인지 기능이 저하된 경우 주야간보호 서비스를 받을 수 있어요.</P>
      <P>점수가 높더라도 의사소견서 내용이 불충분하면 낮은 등급으로 결정될 수 있어요. 방문조사 때 일상생활 어려움을 구체적으로 설명하고, 의사소견서에도 상세한 내용이 담겨야 해요.</P>

      <H3>장기요양인정점수별 등급</H3>
      <TableTitle>장기요양 등급 판정 기준</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>등급</THL><TH>인정점수</TH><TH>상태</TH></tr>
          </thead>
          <tbody>
            {[
              ["1등급", "95점 이상", "일상생활 전적 도움 필요"],
              ["2등급", "75~95점 미만", "일상생활 상당 부분 도움 필요"],
              ["3등급", "60~75점 미만", "일상생활 부분 도움 필요"],
              ["4등급", "51~60점 미만", "일상생활 일부 도움 필요"],
              ["5등급", "45~51점 미만", "치매특별등급 (인지 기능 저하)"],
              ["인지지원등급", "45점 미만 + 치매", "치매로 일상생활 어려움 (주야간보호 전용)"],
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
        title="노인·복지 관련 글도 확인해 보세요"
        items={[
          { icon: "🏠", title: "기초생활수급자 주거급여", desc: "임차가구 월 최대 341,000원", href: "/w/기초생활수급자-주거급여-2026" },
          { icon: "♿", title: "장애인 복지카드 발급", desc: "교통·세금 감면 혜택 종류", href: "/w/장애인-복지카드-발급-신청" },
          { icon: "🏡", title: "차상위계층 확인서 발급", desc: "복지로 신청 지원 혜택 종류", href: "/w/차상위계층-확인서-발급" },
        ]}
        hubHref="/category/복지"
        hubLabel="복지 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="장기요양보험 본인부담금은 얼마인가요?" sub="재가 15% · 시설 20% · 감면 대상" />
      <P>장기요양 서비스를 이용할 때 본인이 일부 부담해야 해요. 재가급여(방문요양, 주야간보호 등)는 급여비의 15%, 시설급여(요양원 입소 등)는 20%가 본인부담금이에요.</P>
      <P>기초생활수급자와 의료급여 수급자는 본인부담금이 면제 또는 경감돼요. 기초수급자는 본인부담금이 없어요. 의료급여 수급자는 재가급여 7.5%, 시설급여 10%로 낮아져요. 차상위계층도 일부 경감 혜택이 있어요.</P>
      <P>월 한도액을 초과하는 부분은 공단이 지원하지 않고 전액 본인 부담이에요. 월 한도액은 등급에 따라 달라요. 1등급이 가장 높고, 등급이 낮을수록 월 한도액도 줄어요.</P>
      <P>식재료비, 이미용비 등 비급여 항목은 본인부담금과 별도로 내야 해요. 요양원 입소 시 숙식비도 별도 부담이에요. 실제 이용 비용은 급여비 + 비급여 항목 + 식비 등을 모두 합산해야 해요.</P>

      <H3>본인부담금 경감 대상</H3>
      <Info type="tip">{"기초생활수급자는 장기요양 본인부담금이 전액 면제돼요. 신청 시 수급자 확인서를 함께 제출하세요."}</Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="장기요양 등급 신청 서류는 무엇인가요?" sub="신청 서류 · 의사소견서 제출" />
      <P>장기요양 신청에 필요한 기본 서류는 장기요양 인정신청서와 의사소견서예요. 신청서는 국민건강보험공단 지사나 홈페이지에서 받을 수 있어요. 의사소견서는 주치의에게 발급받으면 돼요.</P>
      <P>의사소견서는 신청 후 공단에서 발급 요청서를 보내줘요. 그 요청서를 가지고 병원에 가면 의사소견서를 발급받을 수 있어요. 발급 비용의 일부를 공단이 부담해요. 대형병원보다 동네 의원에서도 발급 가능해요.</P>
      <P>신청자 대신 가족이 신청하는 경우 가족관계증명서와 신청자 본인의 신분증이 필요해요. 법정대리인이 신청한다면 위임장과 대리인 신분증도 필요해요. 주민등록등본은 공단이 직접 조회해요.</P>
      <P>방문조사 예약은 신청 후 공단에서 연락을 줘요. 방문조사 날짜에 신청자가 반드시 있어야 해요. 평소 일상생활에서 어떤 도움이 필요한지 구체적으로 설명하는 것이 등급 판정에 도움이 돼요.</P>

      <H3>신청 서류 목록</H3>
      <Info type="warn">{"방문조사 당일 신청자가 집에 없으면 재방문 조사가 필요해요. 가능하면 가족이 함께 있어 설명해 주세요."}</Info>

      <ExtBtn
        badge="국민건강보험공단"
        text="노인장기요양보험 등급 신청"
        cta="신청하러 가기 →"
        href="https://www.longtermcare.or.kr"
      />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "기초생활수급자 주거급여 2026 | 임차가구 수선비 지원 금액 신청 방법", desc: "주거급여 지원 금액과 신청 방법이에요", href: "/w/기초생활수급자-주거급여-2026" },
        { title: "차상위계층 확인서 발급 방법 | 복지로 신청 지원 혜택 종류", desc: "차상위계층 확인서 발급 방법이에요", href: "/w/차상위계층-확인서-발급" },
        { title: "장애인 복지카드 발급 신청 방법 | 교통 세금 감면 혜택 종류", desc: "복지카드 발급 방법과 혜택이에요", href: "/w/장애인-복지카드-발급-신청" },
        { title: "한부모가족 지원금 신청 자격 2026 | 양육비 아동 지원 금액 확인", desc: "한부모가족 지원 금액과 신청 방법이에요", href: "/w/한부모가족-지원금-신청-자격" },
        { title: "기초생활수급자 교육급여 신청 조건 | 초중고 교육활동비 지원 금액 2026", desc: "교육급여 지원 금액과 신청 방법이에요", href: "/w/기초생활수급자-교육급여-신청" },
      ]} />

      <PrevNext
        prev={{ title: "기초생활수급자 교육급여 신청 조건 | 초중고 교육활동비 지원 금액 2026", href: "/w/기초생활수급자-교육급여-신청" }}
        next={{ title: "차상위계층 확인서 발급 방법 | 복지로 신청 지원 혜택 종류", href: "/w/차상위계층-확인서-발급" }}
      />
    </BlogLayout>
  );
}
