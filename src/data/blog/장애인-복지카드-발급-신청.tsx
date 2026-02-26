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
  title: "장애인 복지카드 발급 신청 방법 | 교통 세금 감면 혜택 종류",
  description: "장애인 등록을 하면 복지카드로 대중교통부터 세금까지 혜택을 받는다는 거 아시나요? 발급 방법과 혜택을 알려드려요.",
  category: "복지",
  keywords: [
    "장애인 복지카드 발급 신청 방법",
    "장애인 복지카드 교통 세금 감면 혜택",
    "장애인 복지카드 사용처 항목",
    "장애인 등록 신청 절차 서류",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-02-26",
  summary: [
    "장애인 복지카드는 장애인 등록 후 <strong>주민센터에서 무료 발급</strong>받을 수 있어요.",
    "대중교통 할인, 고속도로 통행료 50%, <strong>자동차세 감면</strong> 등 혜택이 다양해요.",
    "장애 유형·등급에 따라 혜택 범위가 달라지며, 중증장애인은 <strong>더 많은 감면</strong>을 받아요.",
  ],
  sources: [
    { name: "장애인복지법 제32조 장애인 등록", url: "https://www.law.go.kr/법령/장애인복지법", date: "2026-02" },
    { name: "보건복지부 장애인 복지 서비스 안내", url: "https://www.mohw.go.kr/menu.es?mid=a10305010100", date: "2026-02" },
  ],
  faq: [
    { q: "장애인 복지카드를 분실하면 어떻게 하나요?", a: "분실 시 주민센터에 재발급을 신청하면 돼요. 무료로 재발급받을 수 있어요. 복지카드 분실 신고를 빨리 해야 부정 사용을 막을 수 있어요." },
    { q: "장애인 등록 후 건강보험료에 영향이 있나요?", a: "장애인 등록 자체가 건강보험료에 영향을 주지는 않아요. 단, 장애인이면 산정특례를 통해 의료비 본인부담률이 낮아지는 혜택이 있어요. 건강보험료는 소득·재산 기준으로만 계산돼요." },
  ],
  ctaCard: {
    label: "발급 안내",
    mainText: "장애인 등록 후 주민센터 발급",
    subText: "대중교통·고속도로·세금 감면",
    url: "https://www.bokjiro.go.kr",
    external: true,
  },
  relatedDocs: [
    { title: "차상위계층 확인서 발급", url: "/w/차상위계층-확인서-발급" },
  ],
};

export default function Page() {
  const [sel, setSel] = useState<Record<string, string>>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));

  function getResult() {
    const { registered, grade, card_status } = sel;
    if (!registered || !grade || !card_status) return null;
    if (registered === "no") return "not_registered";
    if (card_status === "lost") return "reissue";
    if (grade === "severe") return "severe_benefits";
    return "standard_benefits";
  }

  const result = getResult();

  const toc = [
    { t: "STEP 01 복지카드 발급 상태 확인" },
    { t: "장애인 복지카드 발급 신청 방법은 어떻게 되나요?", sub: "등록 절차 · 주민센터 발급" },
    { t: "장애인 복지카드 교통·세금 감면 혜택은 무엇인가요?", sub: "대중교통 · 고속도로 · 자동차세" },
    { t: "장애인 복지카드 사용처는 어디인가요?", sub: "온·오프라인 이용처 · 문화·체육" },
    { t: "장애인 등록 신청 절차는 어떻게 되나요?", sub: "진단서 · 주민센터 신청 · 심사" },
    { t: "자주 묻는 질문" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "복지", "장애인"]}
      tags={["2026년 최신", "복지", "장애인", "복지카드"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>장애인 복지카드는 주민센터에서 <strong>무료로 발급</strong>받을 수 있어요. 대중교통·고속도로·세금 등 다양한 감면 혜택이 있어요.</>}
      sourceBar={{ badge: "보건복지부", name: "장애인 복지 서비스 안내", date: "2026.02" }}
      stickyLabel="장애인 복지카드"
      stickyValue="주민센터 무료 발급"
      stickyBtn="발급 방법 확인 ↑"
      disclaimer="이 글은 장애인복지법과 보건복지부 안내를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={<>
        <SidebarCTA items={[
          { icon: "♿", title: "복지로 장애인 서비스", sub: "장애인 지원 목록 조회", href: "https://www.bokjiro.go.kr", hot: true },
          { icon: "🏡", title: "차상위계층 확인서", sub: "복지로 신청 지원 혜택", href: "/w/차상위계층-확인서-발급" },
          { icon: "🏥", title: "노인장기요양 등급 신청", sub: "판정 기준과 본인부담금", href: "/w/장기요양보험-등급-신청-방법" },
        ]} />
        <SidebarDocs items={[
          { title: "차상위계층 확인서 발급", cat: "복지·지원금", href: "/w/차상위계층-확인서-발급" },
          { title: "노인장기요양 등급 신청", cat: "복지·지원금", href: "/w/장기요양보험-등급-신청-방법" },
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
      <Sec n="STEP 01" id="checker" title="복지카드 발급 상태 확인" sub="장애인 등록 여부 · 등급 · 카드 상태 선택" />
      <P>장애인 복지카드는 장애인으로 등록된 후 발급받을 수 있어요. 아직 등록이 안 됐다면 등록부터 해야 해요. 아래에서 현재 상황을 선택하면 다음 단계를 알 수 있어요.</P>

      <CheckerShell title="장애인 복지카드를 발급받을 수 있을까요?" sub="30초 확인">
        <CheckerQ n="1" label="현재 장애인으로 등록되어 있나요?" group="registered" opts={[
          ["yes", "네, 장애인 등록 완료예요"],
          ["no", "아직 등록 안 했어요"],
          ["pending", "신청 중이에요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="2" label="장애 정도가 어떻게 되나요?" group="grade" opts={[
          ["severe", "중증장애인이에요 (기존 1~3급)"],
          ["mild", "경증장애인이에요 (기존 4~6급)"],
          ["unknown", "잘 모르겠어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="3" label="복지카드 상태가 어떻게 되나요?" group="card_status" opts={[
          ["none", "아직 발급 안 받았어요"],
          ["have", "이미 가지고 있어요"],
          ["lost", "분실했어요"],
        ]} sel={sel} pick={pick} />
        <CheckerQ n="4" label="자동차를 소유하고 있나요?" group="car" opts={[
          ["yes", "네, 차가 있어요"],
          ["no", "없어요"],
        ]} sel={sel} pick={pick} />

        {result === "severe_benefits" && (
          <ResultPass title="중증장애인은 더 많은 혜택을 받아요">
            <P>중증장애인(기존 1~3급)은 고속도로 통행료 50% 감면, 공항버스 할인, 자동차세 감면 등 더 많은 혜택이 있어요. 주민센터에서 복지카드를 발급받으면 돼요.</P>
            <ResultCTA icon="♿" title="복지카드 발급 방법" desc="주민센터에서 무료 발급 가능해요" href="#s2" />
          </ResultPass>
        )}
        {result === "standard_benefits" && (
          <ResultPass title="장애인 복지카드 발급이 가능해요">
            <P>장애인으로 등록되어 있으면 주민센터에서 복지카드를 발급받을 수 있어요. 대중교통 할인, 공공시설 이용료 감면 등의 혜택이 있어요.</P>
            <ResultCTA icon="♿" title="복지카드 발급 방법" desc="주민센터에서 바로 발급 가능해요" href="#s2" />
          </ResultPass>
        )}
        {result === "not_registered" && (
          <ResultFail title="장애인 등록부터 해야 해요">
            <P>복지카드를 받으려면 먼저 장애인 등록이 필요해요. 진단서 발급 후 주민센터에 신청하면 심사 후 등록돼요. 등록 절차는 보통 1~2개월 걸려요.</P>
            <ResultCTA icon="♿" title="장애인 등록 절차 확인" desc="진단서 발급부터 등록까지 순서" href="#s5" />
          </ResultFail>
        )}
        {result === "reissue" && (
          <ResultPass title="복지카드 재발급 신청이 가능해요">
            <P>분실 시 주민센터에서 무료 재발급을 신청할 수 있어요. 신분증을 지참해서 방문하면 바로 신청할 수 있어요. 재발급에는 약 2~3주가 걸려요.</P>
            <ResultCTA icon="♿" title="복지카드 재발급 신청" desc="주민센터 방문으로 즉시 신청 가능" href="https://www.bokjiro.go.kr" />
          </ResultPass>
        )}
      </CheckerShell>

      <BridgeCard
        q="어떤 혜택이 있는지 궁금하시죠?"
        a="대중교통 할인, 고속도로 50%, 자동차세 감면, 공공시설 무료 등이 있어요."
        label="혜택 목록 자세히 보기"
        href="#s3"
      />

      <Divider />

      {/* SECTION 02 */}
      <Sec n="SECTION 02" id="s2" title="장애인 복지카드 발급 신청 방법은 어떻게 되나요?" sub="등록 절차 · 주민센터 발급" />
      <P>장애인 복지카드는 장애인으로 등록한 후 주민센터에서 발급받을 수 있어요. 장애인 등록증을 대신하는 카드 형태로 발급되며, 각종 할인·감면 혜택을 받을 때 제시하면 돼요.</P>
      <P>복지카드 발급은 무료예요. 주민센터에 방문해서 장애인 복지카드 발급 신청서를 작성하면 돼요. 신분증과 최근 찍은 사진(또는 현장 촬영)이 필요해요. 보통 2~3주 안에 발급돼요.</P>
      <P>복지카드에는 IC칩이 내장되어 있어요. 대중교통 단말기에 태그하거나 공공시설 할인 시 제시하면 자동으로 혜택이 적용돼요. 신용카드 기능은 없어요. 단순 신분·할인 확인 용도예요.</P>

      <H3>복지카드 발급 단계</H3>
      <Steps items={[
        { title: "장애인 등록 신청", desc: "진단서를 발급받아 주민센터에 장애인 등록 신청을 해요. 심사 후 1~2개월 내 결과가 나와요." },
        { title: "장애인 등록 완료 확인", desc: "등록 결과 통보 후 장애인증명서 또는 등록증을 확인해요." },
        { title: "복지카드 발급 신청", desc: "주민센터에 사진과 신분증을 가지고 방문해서 복지카드 발급 신청서를 작성해요." },
        { title: "카드 수령", desc: "약 2~3주 후 우편으로 카드가 도착해요. 주민센터에서 직접 수령도 가능해요." },
      ]} />

      <Divider />

      {/* SECTION 03 */}
      <Sec n="SECTION 03" id="s3" title="장애인 복지카드 교통·세금 감면 혜택은 무엇인가요?" sub="대중교통 · 고속도로 · 자동차세" />
      <P>장애인 복지카드의 대표 혜택은 교통 관련 감면이에요. 지하철·버스는 무료 또는 할인 이용이 가능해요. 서울·수도권 지하철은 장애인이 무료로 이용할 수 있어요.</P>
      <P>고속도로 통행료는 중증장애인(기존 1~3급)의 경우 50% 할인을 받아요. 장애인 본인 명의 차량이나 1인 가족이 동반한 경우에 해당해요. 하이패스로도 자동 적용돼요.</P>
      <P>자동차세 감면은 장애인 본인 명의 차량에 대해 자동차세를 면제 또는 감면해줘요. 경·소형 승용차는 취득세와 자동차세가 전액 면제돼요. 중형 이상은 일부 감면이에요. 지자체에 신청해야 감면이 적용돼요.</P>
      <P>항공기 요금 할인도 있어요. 국내선 항공료를 중증장애인은 50%, 경증은 30% 할인받아요. 항공사 홈페이지나 카운터에서 복지카드를 제시하면 돼요. 철도(KTX·무궁화) 요금도 할인받아요.</P>

      <H3>주요 교통·세금 혜택 정리</H3>
      <TableTitle>장애인 복지카드 교통·세금 혜택</TableTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr><THL>혜택 항목</THL><TH>중증장애인</TH><TH>경증장애인</TH></tr>
          </thead>
          <tbody>
            {[
              ["지하철·버스", "무료", "무료"],
              ["고속도로 통행료", "50% 할인", "해당 없음"],
              ["국내선 항공", "50% 할인", "30% 할인"],
              ["KTX·철도", "50% 할인", "30% 할인"],
              ["자동차세", "경·소형 전액 면제", "일부 감면"],
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
      <TableNote>혜택 범위는 장애 유형·등급에 따라 다를 수 있어요. 자세한 사항은 주민센터나 복지로에서 확인하세요.</TableNote>

      <RelatedMid
        title="복지 지원 관련 글도 확인해 보세요"
        items={[
          { icon: "🏡", title: "차상위계층 확인서 발급", desc: "복지로 신청 지원 혜택 종류", href: "/w/차상위계층-확인서-발급" },
          { icon: "🏥", title: "노인장기요양 등급 신청", desc: "판정 기준과 본인부담금", href: "/w/장기요양보험-등급-신청-방법" },
          { icon: "👨‍👩‍👧", title: "한부모가족 지원금 신청", desc: "양육비·아동 지원 금액 2026", href: "/w/한부모가족-지원금-신청-자격" },
        ]}
        hubHref="/category/복지"
        hubLabel="복지 전체 보기"
      />

      <Divider />

      {/* SECTION 04 */}
      <Sec n="SECTION 04" id="s4" title="장애인 복지카드 사용처는 어디인가요?" sub="온·오프라인 이용처 · 문화·체육" />
      <P>복지카드는 교통 할인 외에도 공공문화시설, 체육시설, 통신요금 등 다양한 곳에서 사용할 수 있어요. 국립박물관·미술관·공원 입장료 무료, 공공 체육시설 할인이 대표적이에요.</P>
      <P>통신요금 감면도 받을 수 있어요. 이동통신 요금 월 11,000원 면제, 인터넷요금 및 유선전화 요금도 감면해요. 각 이동통신사에 장애인 확인서나 복지카드를 제시해서 신청하면 돼요.</P>
      <P>전기·가스요금 감면도 있어요. 장애인 가구는 한국전력에 신청하면 전기요금 월 16,000~22,000원 할인을 받아요. 도시가스도 동절기·하절기 요금 감면이 있어요.</P>
      <P>복지카드로 도서관·영화관·스포츠 시설 등도 할인받을 수 있어요. 민간 기업이나 프랜차이즈에서도 자발적으로 장애인 할인을 제공하는 곳이 있어요. 복지카드를 제시하기 전에 할인 여부를 먼저 확인해보는 게 좋아요.</P>

      <H3>주요 사용처 목록</H3>
      <Info type="tip">{"전기·가스요금 감면은 자동으로 되지 않아요. 한국전력(123)이나 도시가스 고객센터에 별도 신청이 필요해요."}</Info>

      <Divider />

      {/* SECTION 05 */}
      <Sec n="SECTION 05" id="s5" title="장애인 등록 신청 절차는 어떻게 되나요?" sub="진단서 · 주민센터 신청 · 심사" />
      <P>장애인 등록의 첫 단계는 의료기관에서 장애 진단서를 발급받는 거예요. 장애 유형에 따라 진단할 수 있는 전문의가 다르고, 특정 기간 이상 치료·관찰 이력이 있어야 해요.</P>
      <P>진단서를 받은 후 주민등록 주소지 관할 주민센터에 방문해서 장애인 등록 신청서와 진단서를 제출해요. 주민센터 담당자가 국민연금공단에 심사를 요청해요.</P>
      <P>국민연금공단 심사 후 결과가 주민센터를 통해 통보돼요. 심사 기간은 보통 1~2개월이에요. 등록이 완료되면 복지카드 발급 신청을 해요.</P>
      <P>등록 결과에 이의가 있으면 심사 청구가 가능해요. 최초 결정에 불복하는 경우 주민센터를 통해 재심사를 청구할 수 있어요. 재심사에서도 불복하면 행정심판이나 행정소송을 할 수 있어요.</P>

      <H3>장애인 등록 절차 요약</H3>
      <Info type="warn">{"장애 진단서는 해당 장애 유형의 전문의에게 받아야 해요. 진단 기관이 맞지 않으면 반려될 수 있어요."}</Info>

      <ExtBtn
        badge="복지로 공식"
        text="장애인 복지카드 발급 안내"
        cta="안내 보러 가기 →"
        href="https://www.bokjiro.go.kr"
      />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "차상위계층 확인서 발급 방법 | 복지로 신청 지원 혜택 종류", desc: "차상위계층 확인서 발급 방법이에요", href: "/w/차상위계층-확인서-발급" },
        { title: "노인장기요양보험 등급 신청 방법 | 1등급 2등급 판정 기준 본인부담금", desc: "장기요양등급 신청과 판정 기준이에요", href: "/w/장기요양보험-등급-신청-방법" },
        { title: "한부모가족 지원금 신청 자격 2026 | 양육비 아동 지원 금액 확인", desc: "한부모가족 지원 금액과 신청 방법이에요", href: "/w/한부모가족-지원금-신청-자격" },
        { title: "기초생활수급자 주거급여 2026 | 임차가구 수선비 지원 금액 신청 방법", desc: "주거급여 지원 금액과 신청 방법이에요", href: "/w/기초생활수급자-주거급여-2026" },
        { title: "기초생활수급자 교육급여 신청 조건 | 초중고 교육활동비 지원 금액 2026", desc: "교육급여 지원 금액과 신청 방법이에요", href: "/w/기초생활수급자-교육급여-신청" },
      ]} />

      <PrevNext
        prev={{ title: "한부모가족 지원금 신청 자격 2026 | 양육비 아동 지원 금액 확인", href: "/w/한부모가족-지원금-신청-자격" }}
        next={{ title: "기초생활수급자 주거급여 2026 | 임차가구 수선비 지원 금액 신청 방법", href: "/w/기초생활수급자-주거급여-2026" }}
      />
    </BlogLayout>
  );
}
