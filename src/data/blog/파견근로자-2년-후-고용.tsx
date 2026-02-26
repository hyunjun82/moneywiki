"use client";
import { useState } from "react";
import {
  BlogLayout, TOC, Summary3, Sec, P, B, A, H3, Divider,
  InlineLink, ExtBtn, TableTitle, TableNote,
  CheckerShell, CheckerQ, ResultPass, ResultFail, ResultGrid, ResultCTA,
  FAQAccordion, RelatedArticles, PrevNext, RelatedMid,
  SidebarCTA, SidebarDocs, SidebarCalc, BridgeCard,
} from "@/components/wiki/BlogShared";

const meta = {
  title: "파견근로자 2년 후 정규직 전환 | 직접 고용 의무 전환지원금 신청",
  description:
    "파견으로 2년 넘게 일했는데 회사에서 아무 말이 없나요? 사용업체에 직접 고용 의무가 생겨요. 직접 고용 요구 방법과 전환지원금 신청 조건을 알려드려요.",
  category: "고용",
  keywords: [
    "파견근로자 2년 직접 고용 의무",
    "파견 정규직 전환 거부 신고",
    "파견근로자 정규직 전환지원금 신청",
    "파견 직접 고용 후 처우 기준",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-01-15",
  summary: [
    "파견 허용 업무 2년 초과 시 사용업체에 직접 고용 의무 발생",
    "거부 시 고용노동부 신고 또는 노동위원회 구제 신청(3개월 이내)",
    "정규직 전환 시 월 최대 30만원, 최대 2년 전환지원금 지원",
  ],
  sources: [
    { name: "파견근로자 보호 등에 관한 법률", url: "https://www.law.go.kr/법령/파견근로자보호등에관한법률", date: "2026-02" },
    { name: "고용노동부 비정규직 지원 제도", url: "https://www.moel.go.kr", date: "2026-02" },
  ],
  faq: [
    { q: "파견근로자 2년 기간 중간에 교체하면 초기화되나요?", a: "아니에요. 같은 업무에 투입된 총 파견 기간이 기준이라 사람이 바뀌어도 업무 기간이 누적돼요. 파견 자리 자체의 기간을 보는 거예요." },
    { q: "파견근로자 정규직 전환지원금 신청은 어디서 하나요?", a: "사업주가 고용24(ei.go.kr)에서 전환 후 3개월 이내에 신청해야 해요. 늦으면 소급 지급이 안 되니 근로자도 사업주에게 빨리 신청을 요청하는 게 중요해요." },
  ],
};

type Sel = Record<string, string>;

function getResult(sel: Sel): string | null {
  const { period, type } = sel;
  if (!period || !type) return null;
  if (period === "over2" && type === "normal") return "duty";
  if (period === "over2" && type === "banned") return "illegal";
  if (period === "under2" && type === "banned") return "illegalEarly";
  return "notYet";
}

export default function Article107() {
  const [sel, setSel] = useState<Sel>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  const toc = [
    { t: "STEP 01 직접 고용 의무 확인", sub: "파견 기간 · 업무 유형" },
    { t: "직접 고용 의무가 생겼나요?", sub: "2년 초과 기준 · 파견 금지 업무" },
    { t: "정규직 전환 거부 대응 방법", sub: "고용노동부 신고 · 노동위원회 구제" },
    { t: "전환지원금 얼마나 받나요?", sub: "기업 규모별 금액 · 신청 기한" },
    { t: "직접 고용 후 처우 기준", sub: "임금 · 퇴직금 · 4대 보험" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "노동·고용", "파견근로자", "직접고용"]}
      tags={["2026년 최신", "파견", "정규직 전환"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>파견 2년이 넘었는데 아무 말이 없나요? <B>사용업체에 직접 고용 의무</B>가 생겨요. 직접 고용 요구 방법과 <B>전환지원금 월 최대 30만원</B> 신청 조건을 정리했어요.</>}
      sourceBar={{ badge: "법제처", name: "파견근로자보호법·고용노동부", date: "2026.02" }}
      stickyLabel="전환지원금 상한"
      stickyValue="월 최대 30만원"
      stickyBtn="전환지원금 신청"
      stickyHref="https://www.ei.go.kr"
      disclaimer="이 글은 파견근로자보호법·고용노동부 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={
        <>
          <SidebarCTA items={[
            { icon: "🔄", title: "정규직 전환지원금 신청", sub: "월 최대 30만원, 2년 지원", href: "https://www.ei.go.kr", hot: true },
            { icon: "📞", title: "고용노동부 1350 상담", sub: "직접 고용 요구 및 신고", href: "https://www.moel.go.kr" },
            { icon: "⚖️", title: "노동위원회 구제 신청", sub: "불법파견·부당해고 신청", href: "https://www.nlrc.go.kr" },
          ]} />
          <SidebarDocs items={[
            { title: "계약직 실업급여 조건", cat: "실업급여", href: "/w/계약직-실업급여" },
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
        q="파견으로 2년 넘게 일했는데 회사에서 아무 말이 없나요?"
        a="2년 초과 파견은 사용업체에 직접 고용 의무가 생겨요. 아래에서 내 상황을 먼저 확인해 보세요."
        label="직접 고용 의무 확인"
        href="#checker"
      />

      {/* STEP 01 */}
      <Sec n="01" id="checker" title="STEP 01 직접 고용 의무 확인" sub="파견 기간 · 업무 유형">
        <CheckerShell title="파견근로자 2년 직접 고용 의무 확인" sub="30초 확인">
          <CheckerQ
            n="1"
            label="파견 근무 기간이 얼마나 됐나요?"
            group="period"
            opts={[
              ["over2", "2년이 넘었어요"],
              ["under2", "2년이 안 됐어요"],
            ]}
            sel={sel}
            pick={pick}
          />
          <CheckerQ
            n="2"
            label="업무 유형이 어떻게 되나요?"
            group="type"
            opts={[
              ["normal", "일반 파견 허용 업무예요"],
              ["banned", "제조업 직접 생산 등 파견 금지 업무예요"],
            ]}
            sel={sel}
            pick={pick}
          />
          {result === "duty" && (
            <ResultPass title="사용업체에 직접 고용 의무가 생겼어요">
              <P>일반 파견 허용 업무에서 2년 초과 파견이면 사용업체가 직접 고용해야 해요. 근로자는 고용 청구권을 행사할 수 있고, 사용업체가 거부하면 고용노동부에 신고 가능해요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "직접 고용 의무", pass: true, desc: "2년 초과 발생" },
                { icon: "💰", name: "전환지원금", pass: true, desc: "월 최대 30만원" },
                { icon: "📋", name: "처우 기준", pass: true, desc: "기존 임금 이상" },
              ]} />
              <ResultCTA icon="📞" title="고용노동부 1350 상담" desc="직접 고용 요구 및 신고 방법 안내" href="https://www.moel.go.kr" />
            </ResultPass>
          )}
          {result === "illegal" && (
            <ResultPass title="파견 금지 업무라면 2년 전이어도 직접 고용 청구 가능해요">
              <P>제조업 직접 생산 등 파견 금지 업무에서는 2년 초과와 무관하게 파견 계약 자체가 위법이에요. 불법 파견이 인정되면 사용업체와 직접 근로관계가 성립돼요.</P>
              <ResultGrid items={[
                { icon: "⚠️", name: "불법 파견 해당", pass: true, desc: "파견 자체 위법" },
                { icon: "📋", name: "직접 고용 간주", pass: true, desc: "근로관계 성립" },
                { icon: "📞", name: "신고 경로", pass: true, desc: "노동위원회 구제" },
              ]} />
              <ResultCTA icon="⚠️" title="노동위원회 구제 신청" desc="불법파견·부당해고 신청 안내" href="https://www.nlrc.go.kr" />
            </ResultPass>
          )}
          {result === "illegalEarly" && (
            <ResultPass title="파견 금지 업무라면 2년 전이어도 청구 가능해요">
              <P>파견 금지 업무는 기간과 무관하게 파견 계약 자체가 위법이에요. 고용노동부나 노동위원회에 진정을 접수하면 직접 고용 관계를 인정받을 수 있어요.</P>
              <ResultGrid items={[
                { icon: "⚠️", name: "불법 파견 해당", pass: true, desc: "기간 무관 위법" },
                { icon: "📋", name: "고용 간주", pass: true, desc: "직접 근로관계" },
                { icon: "📞", name: "신고 가능", pass: true, desc: "노동위원회 구제" },
              ]} />
              <ResultCTA icon="📞" title="노동위원회 구제 신청" desc="불법파견 진정 접수" href="https://www.nlrc.go.kr" />
            </ResultPass>
          )}
          {result === "notYet" && (
            <ResultFail title="아직 2년이 안 됐어요">
              <P>파견 기간 2년이 되면 직접 고용 의무가 생겨요. 2년이 가까워지면 미리 사용업체에 고용 전환을 협의해 보세요. 만료 전 계약 종료는 부당해고로 볼 여지도 있어요.</P>
              <ResultGrid items={[
                { icon: "⏳", name: "고용 의무", pass: false, desc: "2년 후 발생" },
                { icon: "📋", name: "사전 협의", pass: true, desc: "전환 요청 가능" },
              ]} />
            </ResultFail>
          )}
          {!result && (
            <ResultFail title="파견 기간과 업무 유형을 선택해 주세요">
              <P>위 항목을 선택하면 직접 고용 의무 여부를 안내해 드려요.</P>
            </ResultFail>
          )}
        </CheckerShell>
      </Sec>
      <Divider />

      {/* SECTION 02 */}
      <Sec n="02" id="duty" title="직접 고용 의무가 생겼나요?" sub="2년 초과 기준 · 파견 금지 업무">
        <P><B>사용업체에 직접 고용 의무가 발생해요.</B> <A href="https://www.law.go.kr/법령/파견근로자보호등에관한법률">파견근로자 보호 등에 관한 법률 제6조의2</A>에 따라 파견 기간 2년을 초과하면 사용업체가 파견 근로자를 직접 고용해야 해요.</P>
        <P>직접 고용 의무에서 중요한 건 고용 형태가 아니에요. 정규직이든 계약직이든 직접 고용 계약을 체결해야 한다는 거예요. 다만 직접 고용 시 기존 파견 계약 때의 임금 수준 이상으로 해야 해요. 파견 때보다 임금을 깎으면 파견법 위반이에요.</P>
        <P>2년 기간 계산 방식도 알아두세요. 같은 파견 업무에 투입된 총 기간이 기준이에요. 사람을 교체해도 업무 자체가 같으면 기간이 누적돼요. 중간에 짧은 공백이 있어도 실질적으로 계속 파견이면 합산될 수 있어요.</P>
        <P>파견 금지 업무(제조업 직접 생산 등)에서는 기간과 무관하게 파견 자체가 위법이에요. 이 경우 <B>직접 고용 간주</B> 규정이 적용돼 근로 관계가 사용업체와 직접 성립한 것으로 봐요.</P>

        <H3>파견 허용 업무와 금지 업무 구분</H3>
        <TableTitle>파견 허용 여부 비교</TableTitle>
        <table>
          <thead><tr>
            <th>구분</th><th>대상 업무</th><th>2년 초과 시</th>
          </tr></thead>
          <tbody>
            <tr><td>파견 허용 업무</td><td>전문직·사무직 등 32개 업종</td><td>직접 고용 의무 발생</td></tr>
            <tr><td>파견 금지 업무</td><td>제조업 직접 생산·건설업 등</td><td>파견 자체 위법 → 고용 간주</td></tr>
          </tbody>
        </table>
        <TableNote>파견 허용 업무 목록은 파견근로자보호법 시행령 [별표1] 참조</TableNote>
      </Sec>
      <Divider />

      {/* SECTION 03 */}
      <Sec n="03" id="refuse" title="정규직 전환 거부 대응 방법" sub="고용노동부 신고 · 노동위원회 구제">
        <P><B>고용노동부 신고와 노동위원회 구제 신청이 가능해요.</B> 사용업체가 직접 고용 의무를 이행하지 않으면 근로자는 법적 구제 수단을 활용할 수 있어요.</P>
        <P>고용노동부 신고 방식이에요. 파견 2년 초과 후 직접 고용을 요구했는데 거부당했다면 관할 고용센터에 진정을 접수하세요. 근로감독관이 사업주에게 시정 명령을 내려요. 시정 명령을 무시하면 형사 처벌 대상이에요.</P>
        <P>노동위원회 구제 신청도 가능해요. 부당해고 또는 불법 파견으로 구제 신청을 할 수 있어요. 구제 신청 기한은 의무 위반 발생일로부터 3개월 이내예요. 노동위원회 결정 후 불복 시 행정소송으로 이어질 수 있어요.</P>
        <P>민사소송으로 직접 고용 확인 청구 소송을 제기하는 방법도 있어요. 법원에서 근로 관계가 인정되면 체불 임금까지 함께 받을 수 있어요. 노무사나 변호사와 상담 후 진행하는 게 유리해요.</P>

        <H3>구제 수단 비교</H3>
        <TableTitle>직접 고용 거부 대응 방법 3가지</TableTitle>
        <table>
          <thead><tr>
            <th>수단</th><th>신청 기한</th><th>결과</th>
          </tr></thead>
          <tbody>
            <tr><td>고용노동부 진정</td><td>제한 없음</td><td>시정 명령 → 형사 처벌</td></tr>
            <tr><td>노동위원회 구제</td><td>3개월 이내</td><td>복직 또는 화해 권고</td></tr>
            <tr><td>민사소송</td><td>소멸시효 3년</td><td>직접 고용 확인 + 체불임금</td></tr>
          </tbody>
        </table>
      </Sec>

      <RelatedMid
        items={[
          { icon: "📋", title: "계약직 실업급여 조건", desc: "직접 고용 후 계약 만료 시 실업급여 자격 확인", href: "/w/계약직-실업급여" },
          { icon: "💰", title: "퇴직금 지연이자 계산", desc: "퇴직금 미지급 시 연 20% 지연이자 청구 방법", href: "/w/퇴직급여-지급-지연이자-받기" },
        ]}
        hubHref="/w/실업급여"
        hubLabel="실업급여 허브 → 전체 내용 보기"
      />
      <Divider />

      {/* SECTION 04 */}
      <Sec n="04" id="subsidy" title="전환지원금 얼마나 받나요?" sub="기업 규모별 금액 · 신청 기한">
        <P><B>월 최대 30만원, 최대 2년 지원해요.</B> 비정규직 근로자를 정규직으로 전환하는 사업주에게 지급하는 정부 지원금이에요. 전환지원금은 사업주가 받지만, 근로자 입장에서도 정규직 전환을 요청하는 근거가 돼요.</P>
        <P>지원 조건이 있어요. 파견·용역·기간제 등 비정규직 근로자를 정규직으로 전환해야 해요. 전환 후 6개월 이상 계속 고용을 유지해야 하고, 우선지원 대상 기업(중소·중견기업)이어야 해요.</P>
        <P>지원 금액은 기업 규모에 따라 달라요. 30인 미만 중소기업은 월 30만원, 30~99인 기업은 월 20만원이에요. 지원 기간은 전환 후 최대 24개월로, 총 최대 720만원까지 받을 수 있어요.</P>
        <P>전환지원금 신청은 사업주가 고용24에서 해요. 전환 후 3개월 이내에 신청해야 하고, 늦으면 소급 지급이 안 돼요. 근로자 입장에서는 사업주에게 신청을 요청하거나 고용센터에 문의하면 돼요.</P>

        <H3>기업 규모별 전환지원금 지원 금액</H3>
        <TableTitle>정규직 전환지원금 지원 금액</TableTitle>
        <table>
          <thead><tr>
            <th>기업 규모</th><th>월 지원금</th><th>최대 기간</th><th>최대 총액</th>
          </tr></thead>
          <tbody>
            <tr><td>30인 미만</td><td>30만원</td><td>24개월</td><td>720만원</td></tr>
            <tr><td>30~99인</td><td>20만원</td><td>24개월</td><td>480만원</td></tr>
          </tbody>
        </table>
        <TableNote>전환지원금 신청 → 고용24(ei.go.kr), 전환 후 3개월 이내 신청 필수</TableNote>
      </Sec>
      <Divider />

      {/* SECTION 05 */}
      <Sec n="05" id="treatment" title="직접 고용 후 처우 기준" sub="임금 · 퇴직금 · 4대 보험">
        <P><B>파견 기간보다 낮아지면 안 돼요.</B> 직접 고용 후 임금, 근로시간 등 근로조건은 최소한 기존 파견 계약 수준 이상이어야 해요. 임금을 깎으면 파견법 위반이에요.</P>
        <P>처우 기준은 비교 가능한 정규직 근로자 기준으로 맞춰야 해요. 같은 업무를 하는 정규직이 있다면 그 근로자와 차별을 둘 수 없어요. 임금뿐 아니라 복지, 휴가, 상여금 등도 포함돼요.</P>
        <P>퇴직금 계산 시 파견 기간도 합산돼요. 직접 고용 후 계속 근무한다면, 파견 기간을 포함한 근속 기간 전체가 퇴직금 계산 기준이 돼요. 파견 시절 퇴직금이 이미 지급됐다면 그 이후부터 새로 계산해요.</P>
        <P>4대 보험도 파견 때와 동일하게 적용돼요. 직접 고용 후에도 고용보험, 건강보험, 국민연금, 산재보험이 모두 유지돼요. 피보험 기간도 파견 기간부터 계속 이어져요.</P>

        <InlineLink
          icon="📋"
          title="계약직 실업급여 조건"
          desc="직접 고용 후 계약 만료 시 실업급여 자격"
          href="/w/계약직-실업급여"
        />

        <ExtBtn
          badge="법제처 공식"
          text="파견근로자보호법 2년 초과 고용 조항"
          cta="바로가기 →"
          href="https://www.law.go.kr/법령/파견근로자보호등에관한법률"
        />
      </Sec>
      <Divider />

      <FAQAccordion items={meta.faq.map((f) => ({ q: f.q, a: f.a }))} />
      <RelatedArticles items={[
        { title: "계약직 실업급여 조건", desc: "직접 고용 후 계약 만료 시 실업급여 자격 확인", href: "/w/계약직-실업급여" },
        { title: "퇴직금 지연이자 계산", desc: "퇴직금 미지급 시 연 20% 지연이자 청구 방법", href: "/w/퇴직급여-지급-지연이자-받기" },
      ]} />
      <PrevNext
        prev={{ title: "육아 시간선택제 일자리 신청 방법", href: "/w/육아-시간선택제-일자리" }}
        next={{ title: "학력 위조 해고 정당성 판단", href: "/w/학력-거짓-해고-정당성" }}
      />
    </BlogLayout>
  );
}
