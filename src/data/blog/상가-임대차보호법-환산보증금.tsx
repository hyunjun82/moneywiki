"use client";
import { useState } from "react";
import {
  C,
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3, Divider,
  Info, InlineLink, BridgeCard, ExtBtn,
  TH, THL, TableTitle, TableNote,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultCTA,
  FAQAccordion, RelatedArticles, PrevNext, RelatedMid,
  SidebarCTA, SidebarDocs, SidebarCalc,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "상가 임대차보호법 환산보증금 계산 | 계약갱신 요구권 임대료 인상 한도",
  description: "상가 세입자도 계약갱신 요구권이 있다는 거 알고 계세요? 환산보증금 기준과 임대료 인상 한도를 알려드려요.",
  category: "부동산",
  keywords: [
    "상가 임대차보호법 환산보증금 보증금 월세",
    "상가 임대차 계약갱신 요구권 행사 방법",
    "상가 임대료 인상 5% 초과 상한 규정",
    "상가 임대차보호법 적용 보증금 서울 금액",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "환산보증금 = 보증금 + (월세 × 100), <strong>서울 기준 9억원 이하</strong>면 임대료 5% 제한 적용",
    "계약갱신 요구권은 환산보증금 관계없이 <strong>최대 10년</strong> 모든 상가 임차인에게 적용",
    "임대료 인상 제한 5%는 환산보증금 한도 이하 임차인에게만 적용돼요",
  ],
  sources: [
    { name: "상가건물 임대차보호법 제2조", url: "https://www.law.go.kr/법령/상가건물임대차보호법", date: "2026-02" },
    { name: "상가건물 임대차보호법 시행령 제2조", url: "https://www.law.go.kr/법령/상가건물임대차보호법시행령", date: "2026-02" },
  ],
  faq: [
    { q: "상가 임대차보호법 환산보증금 초과하면 아무 보호도 못 받나요?", a: "아니에요. 환산보증금을 초과해도 계약갱신 요구권(10년), 묵시적 갱신, 권리금 보호 등 대부분의 보호는 받을 수 있어요. 다만 임대료 5% 인상 제한은 적용되지 않아요." },
    { q: "상가 임대차 계약갱신 요구권 10년이란 정확히 무엇인가요?", a: "최초 계약일로부터 10년이 되기 전까지 임차인이 계약 갱신을 요구하면 임대인은 정당한 사유 없이 거절할 수 없어요. 임대인이 직접 사용하거나 재건축하는 경우는 거절 가능해요." },
  ],
  ctaCard: {
    label: "30초 계산",
    mainText: "환산보증금 계산 + 적용 여부 확인",
    subText: "보증금·월세·지역 선택",
    url: "/w/상가-임대차보호법-환산보증금",
    external: false,
  },
  relatedDocs: [
    { title: "생애최초 취득세 감면 조건 2026", url: "/w/생애최초-취득세-감면-조건-2026" },
    { title: "기초생활수급자 주거급여 2026", url: "/w/기초생활수급자-주거급여-2026" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { deposit, rent, region } = sel;
    if (!deposit || !rent || !region) return null;
    const depositNum = deposit === "lt1eok" ? 5000 : deposit === "1to3eok" ? 20000 : 50000;
    const rentNum = rent === "none" ? 0 : rent === "lt100" ? 5000 : 15000;
    const hwansan = depositNum + (rentNum * 100);
    const threshold = region === "seoul" ? 90000 : region === "metro" ? 69000 : region === "city" ? 54000 : 37000;
    if (hwansan <= threshold) return "protected";
    return "not_protected";
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 환산보증금 보호 여부 확인" },
    { t: "상가 임대차보호법 환산보증금 계산 방법은 어떻게 되나요?", sub: "보증금·월세 합산 공식 · 지역별 한도" },
    { t: "상가 임대차 계약갱신 요구권이란 무엇인가요?", sub: "10년 갱신권 · 거절 가능 사유" },
    { t: "상가 임대료 인상 한도는 얼마인가요?", sub: "5% 상한 · 예외 조항" },
    { t: "배우자 부모 시부모 간병 실업급여 차이가 있나요?", sub: "환산보증금 초과 임차인 권리 · 대응 방법" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "부동산", "상가임대차"]}
      tags={["2026년 최신", "부동산", "상가임대차", "계약갱신"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>상가 세입자는 <strong>환산보증금 기준</strong>에 따라 임대료 인상 제한 여부가 달라져요. 환산보증금 = 보증금 + (월세 × 100)으로 계산하고, 서울은 9억원이 기준이에요.</>}
      sourceBar={{ badge: "법제처", name: "상가건물 임대차보호법 제2조", date: "2026.02" }}
      stickyLabel="환산보증금 기준"
      stickyValue="서울 9억 / 기타 3.7~6.9억"
      stickyBtn="계산해보기 ↑"
      disclaimer="이 글은 상가건물 임대차보호법을 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "🏪", title: "대법원 판례 검색", sub: "상가임대차 관련 판례", href: "https://glaw.scourt.go.kr", hot: true },
          { icon: "🏠", title: "생애최초 취득세 감면", sub: "2026년 200만원 감면 조건", href: "/w/생애최초-취득세-감면-조건-2026" },
          { icon: "📋", title: "주거급여 신청 방법", sub: "기초생활수급자 임차가구 지원", href: "/w/기초생활수급자-주거급여-2026" },
        ]} />
        <SidebarDocs items={[
          { title: "생애최초 취득세 감면 2026", cat: "부동산", href: "/w/생애최초-취득세-감면-조건-2026" },
          { title: "기초생활수급자 주거급여", cat: "복지", href: "/w/기초생활수급자-주거급여-2026" },
        ]} />
        <SidebarCalc items={[
          { title: "상가 환산보증금 계산기", href: "https://www.law.go.kr/법령/상가건물임대차보호법" },
          { title: "국가법령정보 상가임대차법", href: "https://www.law.go.kr/법령/상가건물임대차보호법" },
        ]} />
      </>}
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />

      {/* STEP 01 */}
      <Sec n="STEP 01" id="checker" title="환산보증금 보호 여부 확인" sub="보증금 · 월세 · 지역 선택" />
      <P>상가건물 임대차보호법의 임대료 인상 제한(5%)이 적용되는지 확인해드려요. 보증금, 월세, 지역을 선택하면 환산보증금을 계산해서 보호 여부를 알 수 있어요.</P>

      <CheckerShell title="환산보증금 보호 여부 확인기" sub="30초 확인">
        <CheckerQ n="1" label="임차 보증금이 얼마인가요?" group="deposit" opts={[
          ["lt1eok", "1억원 미만"],
          ["1to3eok", "1~3억원"],
          ["gt3eok", "3억원 초과"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="월세가 있나요?" group="rent" opts={[
          ["none", "없음 (전세)"],
          ["lt100", "100만원 미만"],
          ["gt100", "100만원 이상"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="3" label="상가 소재지가 어디인가요?" group="region" opts={[
          ["seoul", "서울특별시"],
          ["metro", "수도권 과밀억제권역 (경기·인천 일부)"],
          ["city", "광역시 (부산·대구·광주·대전·울산·세종)"],
          ["other", "기타 지역"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="4" label="현재 임대차 계약 기간이 얼마나 됐나요?" group="duration" opts={[
          ["lt1year", "1년 미만"],
          ["1to5year", "1~5년"],
          ["gt5year", "5년 이상"],
        ]} sel={sel} pick={pick} />

        {result === "protected" && (
          <ResultPass title="환산보증금 한도 이하 → 임대료 5% 제한 적용돼요">
            <P>임차하신 상가의 환산보증금이 지역 기준 이하예요. 임대인은 임대료를 5%를 초과해서 올릴 수 없어요. 계약갱신 요구권(10년)과 권리금 보호도 함께 적용돼요.</P>
            <ResultCTA icon="📋" title="상가건물 임대차보호법 전문" desc="내 권리를 정확히 확인하세요" href="https://www.law.go.kr/법령/상가건물임대차보호법" />
          </ResultPass>
        )}
        {result === "not_protected" && (
          <ResultFail title="환산보증금 한도 초과 → 임대료 5% 제한 미적용">
            <P>환산보증금이 지역 기준을 초과해요. 임대료 5% 인상 제한은 적용되지 않아요. 하지만 계약갱신 요구권(10년)과 권리금 보호는 여전히 적용돼요. 계약서에 인상 한도 특약을 넣는 방법을 고려해보세요.</P>
            <ResultCTA icon="⚠️" title="계약서 특약으로 인상 제한" desc="임대료 상한 특약 넣는 방법 확인" href="https://www.law.go.kr/법령/상가건물임대차보호법" />
          </ResultFail>
        )}
      </CheckerShell>

      <BridgeCard
        q="환산보증금이 뭔지부터 알아야 할 것 같으세요?"
        a="보증금 + (월세 × 100)으로 계산해요. 예를 들어 보증금 1억 + 월세 100만원이라면 환산보증금은 2억원이에요."
        label="환산보증금 계산법 보기"
        href="#s02"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s02" title="상가 임대차보호법 환산보증금 계산 방법은 어떻게 되나요?" sub="보증금·월세 합산 공식 · 지역별 한도" />
      <P>환산보증금은 보증금과 월세를 하나의 금액으로 환산한 값이에요. 공식은 환산보증금 = 보증금 + (월세 × 100)이에요. 월세 100만원은 보증금 1억원과 같다고 보는 거예요.</P>
      <P>예를 들어 서울 상가를 보증금 3억원, 월세 200만원에 임차했다면 환산보증금은 3억 + (200만 × 100) = 3억 + 2억 = 5억원이에요. 서울 기준 9억원 이하이므로 임대료 인상 5% 제한이 적용돼요.</P>

      <H3>지역별 환산보증금 한도</H3>
      <TableTitle>상가 임대차보호법 지역별 환산보증금 한도</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>지역</THL><THL>환산보증금 한도</THL><THL>해당 지역</THL></tr>
          </thead>
          <tbody>
            {[
              ["서울특별시", "9억원", "서울 전역"],
              ["수도권 과밀억제권역", "6억 9천만원", "경기·인천 일부 (과밀억제권역 고시)"],
              ["광역시 등", "5억 4천만원", "부산·대구·광주·대전·울산·세종"],
              ["기타 지역", "3억 7천만원", "위에 해당하지 않는 지역"],
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
      <TableNote>출처: 상가건물 임대차보호법 시행령 제2조 / 2026년 기준</TableNote>

      <P>환산보증금 한도를 초과하는 임차인도 계약갱신 요구권, 권리금 보호는 적용돼요. 2018년 법 개정으로 환산보증금 관계없이 모든 상가 임차인이 계약갱신 요구권을 가져요.</P>
      <Info type="tip">{"월세가 없는 전세형 임대차라면 보증금 자체가 환산보증금이에요. 환산보증금 한도 이하인지 확인하면 임대료 인상 제한 적용 여부를 바로 알 수 있어요."}</Info>

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s03" title="상가 임대차 계약갱신 요구권이란 무엇인가요?" sub="10년 갱신권 · 거절 가능 사유" />
      <P>계약갱신 요구권은 임차인이 계약 갱신을 요구할 때 임대인이 정당한 사유 없이 거절할 수 없는 권리예요. 2018년 10월부터 환산보증금 관계없이 모든 상가 임차인에게 최대 10년까지 적용돼요.</P>
      <P>임차인은 계약 만료 6개월 전부터 1개월 전까지 계약 갱신을 요구할 수 있어요. 임대인이 거절할 수 있는 사유는 3기(3개월분) 이상 차임 연체, 임차인의 동의 없는 무단 전대·양도, 고의·과실로 인한 시설 훼손, 임대인의 직접 사용, 건물 재건축 등이에요.</P>
      <H3>갱신 거절 가능 사유</H3>
      <P>임대인이 건물을 직접 사용하려는 경우엔 계약갱신을 거절할 수 있어요. 단, 정당한 직접 사용 사유임을 입증해야 하고, 거절 후 3개월 내에 다른 임차인에게 임대하거나 직접 사용하지 않으면 임차인에게 손해를 배상해야 해요.</P>
      <P>갱신 거절 통보는 서면으로 하는 것이 안전해요. 내용증명을 활용하면 나중에 분쟁이 생겼을 때 증거로 활용할 수 있어요. 임차인 역시 계약 만료 전에 갱신 요구를 서면으로 하는 게 좋아요.</P>

      <RelatedMid
        title="부동산 관련 글도 확인해 보세요"
        items={[
          { icon: "🏠", title: "생애최초 취득세 감면 2026", desc: "200만원까지 취득세 감면 신청 방법", href: "/w/생애최초-취득세-감면-조건-2026" },
          { icon: "💰", title: "기초생활수급자 주거급여", desc: "임차가구 수선비 지원 금액 확인", href: "/w/기초생활수급자-주거급여-2026" },
          { icon: "👨‍👩‍👧", title: "한부모가족 지원금 신청", desc: "2026년 양육비 아동 지원 금액", href: "/w/한부모가족-지원금-신청-자격" },
        ]}
        hubHref="/category/부동산"
        hubLabel="부동산 글 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s04" title="상가 임대료 인상 한도는 얼마인가요?" sub="5% 상한 · 예외 조항" />
      <P>환산보증금 한도 이하 임차인에게는 임대료 인상 상한이 5%예요. 임대인은 계약 갱신 시 차임(월세)과 보증금을 합산해서 5%를 초과해 올릴 수 없어요. 5%는 주변 시세 변화를 감안해서 결정돼요.</P>
      <P>5% 제한은 임차인이 동의하면 더 인상하는 것도 가능해요. 하지만 임차인이 동의하지 않으면 임대인은 5%를 초과해서 인상하거나 계약 갱신을 거절할 수 없어요. 계약서에 5% 초과 인상 조항이 있어도 효력이 없어요.</P>
      <H3>5% 제한 예외</H3>
      <P>임대인이 임차 목적물 전부 또는 일부를 재건축·대수선하는 경우, 사업자 변경 등으로 임대 목적물이 달라지는 경우는 예외가 될 수 있어요. 이 경우 임대료 협의가 필요하고 분쟁이 생기면 법원 조정이나 소액심판을 이용할 수 있어요.</P>
      <P>환산보증금 한도를 초과하는 임차인은 5% 제한이 없지만, 계약서에 인상 상한 특약을 넣어두는 게 좋아요. 특약은 임대인과 협의해서 넣을 수 있고, 나중에 분쟁이 생겼을 때 법적 효력이 있어요.</P>
      <Info type="warn">{"임대료가 5% 초과 인상됐다면 임차인은 '증액 제한 초과분 반환 청구'를 할 수 있어요. 지급한 날부터 3년 이내에 청구해야 소멸시효에 걸리지 않아요."}</Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s05" title="환산보증금 초과 임차인의 권리와 대응 방법은 어떻게 되나요?" sub="환산보증금 초과 임차인 권리 · 대응 방법" />
      <P>환산보증금 한도를 초과해도 상가 임차인으로서 받을 수 있는 보호가 많아요. 계약갱신 요구권(10년), 권리금 회수 기회 보호, 묵시적 갱신, 임차권 등기 명령 등은 모두 적용돼요.</P>
      <P>권리금 보호는 임대인이 정당한 사유 없이 신규 임차인과 권리금 계약을 방해하면 안 된다는 내용이에요. 임차인은 자신이 구한 신규 임차인과 권리금 계약을 체결할 권리가 있어요. 임대인이 이를 방해하면 손해배상 청구가 가능해요.</P>
      <H3>분쟁 시 대응 방법</H3>
      <P>임대료 인상 분쟁은 법원 소액심판이나 대한법률구조공단 상담을 이용할 수 있어요. 임대차 관련 분쟁은 상가건물임대차분쟁조정위원회(각 시·도에 설치)에 조정을 신청하면 비용을 절감할 수 있어요.</P>
      <P>계약서에 특약을 넣어두는 것이 가장 좋은 예방책이에요. 임대료 인상 제한, 계약 갱신 조건, 원상복구 범위 등을 구체적으로 명시하면 나중에 분쟁을 줄일 수 있어요. 계약서 작성 전 법률 전문가 검토를 받으면 좋아요.</P>
      <Info type="tip">{"대한법률구조공단(132)에 전화하면 무료 법률 상담을 받을 수 있어요. 임대차 관련 분쟁을 저비용으로 해결하는 데 도움이 돼요."}</Info>

      <ExtBtn
        badge="법제처 공식"
        text="상가건물 임대차보호법 전문"
        cta="법령 확인하기 →"
        href="https://www.law.go.kr/법령/상가건물임대차보호법"
      />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "생애최초 주택 취득세 감면 조건 2026 | 1주택 200만원 면제 신청 방법", desc: "생애 처음 집을 사면 취득세 200만원 감면받아요", href: "/w/생애최초-취득세-감면-조건-2026" },
        { title: "기초생활수급자 주거급여 2026 | 임차가구 수선비 지원 금액 신청 방법", desc: "임차가구 주거급여 지원 금액이에요", href: "/w/기초생활수급자-주거급여-2026" },
        { title: "한부모가족 지원금 신청 자격 2026 | 양육비 아동 지원 금액 확인", desc: "한부모가족 양육비·아동 지원 금액이에요", href: "/w/한부모가족-지원금-신청-자격" },
        { title: "프리랜서 3.3% 원천징수 환급 방법 | 종합소득세 신고 필요경비 공제", desc: "3.3% 환급받는 종합소득세 신고 방법이에요", href: "/w/프리랜서-3.3-원천징수-환급" },
        { title: "재산세 납부 기간 2026 | 7월 9월 분납 주택 토지 계산", desc: "2026년 재산세 납부 기간과 계산 방법이에요", href: "/w/재산세-납부-기간-2026" },
      ]} />

      <PrevNext
        prev={{ title: "생애최초 주택 취득세 감면 조건 2026 | 1주택 200만원 면제 신청 방법", href: "/w/생애최초-취득세-감면-조건-2026" }}
        next={{ title: "소상공인 노란우산공제 가입 조건 | 연간 소득공제 금액 절세 혜택", href: "/w/소상공인-노란우산공제-가입" }}
      />
    </BlogLayout>
  );
}
