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
  title: "대지급금 불복 구제 절차 방법 | 이의신청 심사청구 90일 기한",
  description:
    "대지급금 거부당했는데 그냥 포기하셨나요? 90일 안에 이의신청하면 구제받을 수 있어요. 절차부터 공인노무사 비용 지원까지 알려드려요.",
  category: "임금",
  keywords: [
    "대지급금 불복 이의신청 90일 기한",
    "대지급금 구제 절차 이의신청 방법",
    "대지급금 공인노무사 비용 법률구조",
    "대지급금 심사청구 기각 행정소송",
  ],
  author: "머니위키 에디터",
  updateNote: "2026년 2월 기준",
  lastUpdated: "2026-02-26",
  datePublished: "2026-01-15",
  summary: [
    "거부 통보일로부터 90일 이내에 이의신청 — 이 기한을 넘기면 행정 구제가 막혀요",
    "이의신청 → 심사청구 → 재심사청구(또는 행정소송) 3단계 순서",
    "저소득 근로자는 대한법률구조공단 통해 공인노무사·변호사 비용 무료 지원 가능",
  ],
  sources: [
    { name: "임금채권보장법 이의신청 절차", url: "https://www.law.go.kr/법령/임금채권보장법", date: "2026-02" },
    { name: "근로복지공단 대지급금 불복 안내", url: "https://www.comwel.or.kr", date: "2026-02" },
  ],
  faq: [
    { q: "대지급금 불복 이의신청은 서면으로만 해야 하나요?", a: "근로복지공단 지사에 서면 또는 방문으로 신청할 수 있어요. 온라인 접수는 현재 제한적이라 직접 방문하거나 우편으로 신청하는 게 확실해요. 이의신청서에 불복 사유와 증거 자료를 첨부하면 돼요." },
    { q: "대지급금 구제 절차에서 공인노무사 선임이 꼭 필요한가요?", a: "필수는 아니에요. 본인이 직접 이의신청서를 작성해서 제출할 수 있어요. 하지만 사유 설명이 복잡하거나 심사청구·행정소송 단계로 넘어가면 전문가 도움이 유리해요. 무료 법률구조 제도도 활용할 수 있어요." },
  ],
};

type Sel = Record<string, string>;

function getResult(sel: Sel): string | null {
  const { days, reason } = sel;
  if (!days || !reason) return null;
  if (days === "over90") return reason === "requirement" ? "over90_req" : "over90_amt";
  if (days === "under30") return reason === "requirement" ? "urgent_req" : "urgent_amt";
  return reason === "requirement" ? "under90_req" : "under90_amt";
}

export default function Article112() {
  const [sel, setSel] = useState<Sel>({});
  const pick = (g: string, v: string) => setSel((p) => ({ ...p, [g]: v }));
  const result = getResult(sel);

  const toc = [
    { t: "STEP 01 이의신청 가능 여부 확인", sub: "경과 기간 · 불복 사유" },
    { t: "불복 구제 절차 3단계 순서", sub: "이의신청 · 심사청구 · 행정소송" },
    { t: "이의신청 90일 기한 계산 방법", sub: "기산점 · 기한 연장 예외" },
    { t: "공인노무사 비용 지원 방법", sub: "법률구조공단 무료 지원" },
    { t: "심사청구 기각 후 행정소송 절차", sub: "재심사청구 · 처분일 1년" },
  ];

  return (
    <BlogLayout
      breadcrumb={["홈", "노동·임금", "체불임금", "대지급금"]}
      tags={["2026년 최신", "대지급금", "이의신청"]}
      date={meta.lastUpdated}
      title={meta.title}
      description={<>대지급금 거부 통보를 받았어도 끝이 아니에요. <B>90일 이내</B>에 이의신청하면 다시 심사를 받을 수 있어요. 3단계 구제 절차와 비용 지원 방법을 정리했어요.</>}
      sourceBar={{ badge: "법제처", name: "임금채권보장법·근로복지공단", date: "2026.02" }}
      stickyLabel="이의신청 기한"
      stickyValue="거부 통보 후 90일"
      stickyBtn="근로복지공단 이의신청"
      stickyHref="https://www.comwel.or.kr"
      disclaimer="이 글은 임금채권보장법과 근로복지공단 공식 자료를 바탕으로 작성된 정보 제공 목적의 콘텐츠예요."
      sidebar={
        <>
          <SidebarCTA items={[
            { icon: "📋", title: "근로복지공단 이의신청", sub: "거부 결정 불복 접수", href: "https://www.comwel.or.kr", hot: true },
            { icon: "⚖️", title: "법률구조공단 무료 상담", sub: "공인노무사 비용 지원", href: "https://www.klac.or.kr" },
            { icon: "📞", title: "고용노동부 1350 상담", sub: "임금체불 구제 안내", href: "https://www.moel.go.kr" },
          ]} />
          <SidebarDocs items={[
            { title: "간이대지급금 신청 방법", cat: "임금·체불", href: "/w/간이대지급금-신청-방법-절차" },
            { title: "간이대지급금 상한액 계산", cat: "임금·체불", href: "/w/간이대지급금-지급액-상한액" },
            { title: "대지급금 금액 계산 연차 상여금", cat: "임금·체불", href: "/w/대지급금-금액-계산-연차-상여금" },
          ]} />
          <SidebarCalc items={[
            { title: "퇴직금 계산기", href: "/w/퇴직금-계산기" },
            { title: "실업급여 계산기", href: "/w/실업급여-계산기" },
          ]} />
        </>
      }
    >
      <TOC items={toc} />
      <Summary3 items={meta.summary} />
      <BridgeCard
        q="대지급금 거부 후 아직 90일이 지나지 않았나요?"
        a="90일 이내라면 이의신청으로 다시 심사받을 수 있어요. 기한과 불복 사유를 먼저 확인해 보세요."
        label="가능 여부 확인"
        href="#checker"
      />

      {/* STEP 01 */}
      <Sec n="01" id="checker" title="STEP 01 이의신청 가능 여부 확인" sub="경과 기간 · 불복 사유">
        <CheckerShell title="대지급금 불복 구제 절차가 맞나요?" sub="30초 확인">
          <CheckerQ
            n="1"
            label="거부 통보를 받은 지 얼마나 됐나요?"
            group="days"
            opts={[
              ["under30", "한 달(30일) 이내예요"],
              ["under90", "30일~90일 사이예요"],
              ["over90", "90일이 지났어요"],
            ]}
            sel={sel}
            pick={pick}
          />
          <CheckerQ
            n="2"
            label="불복하고 싶은 이유가 무엇인가요?"
            group="reason"
            opts={[
              ["requirement", "요건 미충족으로 거부당했어요"],
              ["amount", "지급 금액이 너무 적어요"],
            ]}
            sel={sel}
            pick={pick}
          />
          {result === "urgent_req" && (
            <ResultPass title="30일 이내 — 빠르게 이의신청하세요">
              <P>거부 통보 후 한 달 이내예요. 지금 바로 이의신청을 준비하면 돼요. 요건 미충족 사유를 반박할 증거(재직기간 확인서, 임금명세서 등)를 첨부해서 근로복지공단에 제출하세요. 처리 기간은 30일 이내예요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "이의신청 기한", pass: true, desc: "90일 내 → 충분히 가능" },
                { icon: "📋", name: "증거 첨부", pass: true, desc: "재직 증빙 + 임금 기록" },
                { icon: "📞", name: "담당자 문의", pass: true, desc: "공단 지사 방문 추천" },
              ]} />
              <ResultCTA icon="📋" title="근로복지공단 이의신청" desc="불복 사유 서면 제출" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "urgent_amt" && (
            <ResultPass title="30일 이내 — 지급액 불복 이의신청 가능해요">
              <P>지급액이 너무 적다면 90일 이내에 이의신청할 수 있어요. 체불 임금 계산 오류나 항목 누락을 증명하는 서류를 첨부하세요. 급여명세서, 근로계약서, 통장 거래 내역이 유용해요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "이의신청 기한", pass: true, desc: "30일 이내 → 여유 있음" },
                { icon: "📋", name: "항목 누락 확인", pass: true, desc: "연차수당·상여금 체크" },
                { icon: "💰", name: "추가 서류", pass: true, desc: "급여명세서 준비" },
              ]} />
              <ResultCTA icon="📋" title="근로복지공단 이의신청" desc="금액 불복 접수" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "under90_req" && (
            <ResultPass title="90일 이내 — 아직 이의신청이 가능해요">
              <P>거부 통보일로부터 90일 이내라면 이의신청을 할 수 있어요. 요건 미충족 사유를 반박할 증거를 최대한 모아서 제출하세요. 기한이 얼마 남지 않았다면 서류가 불완전해도 일단 접수하는 게 중요해요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "이의신청 가능", pass: true, desc: "90일 이내" },
                { icon: "⚠️", name: "서류 준비", pass: true, desc: "기한 촉박 시 먼저 접수" },
                { icon: "📋", name: "증거 보완", pass: true, desc: "접수 후 추가 제출 가능" },
              ]} />
              <ResultCTA icon="📋" title="근로복지공단 이의신청" desc="기한 내 빠른 접수" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "under90_amt" && (
            <ResultPass title="90일 이내 — 금액 불복 이의신청 하세요">
              <P>90일 이내라면 지급 금액에 대해서도 이의신청이 가능해요. 체불 임금 내역 중 누락된 항목이 있는지 다시 확인하세요. 급여명세서나 근로계약서에 기재된 금액과 지급 결정액의 차이를 명시해서 제출하면 돼요.</P>
              <ResultGrid items={[
                { icon: "✅", name: "이의신청 가능", pass: true, desc: "90일 이내" },
                { icon: "📋", name: "차이 명시", pass: true, desc: "계산 근거 제출" },
                { icon: "💰", name: "연차·상여 포함", pass: true, desc: "통상임금 항목 확인" },
              ]} />
              <ResultCTA icon="📋" title="근로복지공단 이의신청" desc="금액 불복 접수" href="https://www.comwel.or.kr" />
            </ResultPass>
          )}
          {result === "over90_req" && (
            <ResultFail title="90일 경과 — 이의신청 기간이 끝났어요">
              <P>이의신청 기한 90일이 지나면 행정 내부 절차로는 불복이 막혀요. 다만 처분일로부터 1년 이내라면 행정법원에 소송을 제기할 수 있어요. 요건이 잘못 판단됐다는 근거가 있으면 소송 가능성이 있어요.</P>
              <ResultGrid items={[
                { icon: "❌", name: "이의신청", pass: false, desc: "기한 초과" },
                { icon: "⚖️", name: "행정소송", pass: true, desc: "처분일로부터 1년 이내" },
                { icon: "📞", name: "전문가 상담", pass: true, desc: "법률구조공단 활용" },
              ]} />
              <ResultCTA icon="⚖️" title="법률구조공단 무료 상담" desc="행정소송 가능성 확인" href="https://www.klac.or.kr" />
            </ResultFail>
          )}
          {result === "over90_amt" && (
            <ResultFail title="90일 경과 — 민사소송으로 청구하세요">
              <P>이의신청 기한이 지났지만 임금채권 소멸시효(3년)가 남아있다면 민사소송으로 체불 임금을 직접 청구할 수 있어요. 법원에 임금 청구 소송을 제기하거나 지급 명령을 신청하는 방법이 있어요.</P>
              <ResultGrid items={[
                { icon: "❌", name: "이의신청", pass: false, desc: "기한 초과" },
                { icon: "💰", name: "민사소송", pass: true, desc: "3년 소멸시효 내 가능" },
                { icon: "📞", name: "법률 상담", pass: true, desc: "법률구조공단 무료" },
              ]} />
              <ResultCTA icon="⚖️" title="법률구조공단 무료 상담" desc="민사소송 방법 확인" href="https://www.klac.or.kr" />
            </ResultFail>
          )}
          {!result && (
            <ResultFail title="경과 기간을 선택해 주세요">
              <P>거부 통보 후 경과 기간과 불복 사유를 선택하면 적합한 구제 절차를 안내해 드려요.</P>
            </ResultFail>
          )}
        </CheckerShell>
      </Sec>
      <Divider />

      {/* SECTION 02 */}
      <Sec n="02" id="steps" title="불복 구제 절차 3단계 순서" sub="이의신청 · 심사청구 · 행정소송">
        <P><B>3단계로 구성돼요.</B> 이의신청 → 심사청구 → 재심사청구(또는 행정소송) 순이에요. <A href="https://www.law.go.kr/법령/임금채권보장법">임금채권보장법</A>에 따라 각 단계에서 기한이 정해져 있어요.</P>
        <P>1단계 이의신청이에요. 근로복지공단에서 거부 결정을 받으면 90일 이내에 공단에 이의신청서를 제출해요. 공단 내부에서 재검토하는 단계예요. 처리 기간은 30일 이내예요. 이의신청서에 불복 사유와 증거를 구체적으로 적어야 해요.</P>
        <P>2단계 심사청구예요. 이의신청도 기각되면 고용보험심사위원회에 심사청구를 할 수 있어요. 이의신청 결정 통보일로부터 90일 이내에 청구해야 해요. 위원회에서 독립적으로 재심사해요. 처리 기간은 통상 60일이에요.</P>
        <P>3단계 재심사청구 또는 행정소송이에요. 심사청구도 기각되면 재심사청구나 행정법원에 소송을 제기할 수 있어요. 소송 기한은 처분일로부터 1년 이내예요. 각 단계마다 기한을 놓치면 다음 단계로 넘어갈 수 없어요.</P>

        <H3>단계별 이의신청 절차 요약</H3>
        <TableTitle>대지급금 불복 구제 절차 3단계</TableTitle>
        <table>
          <thead><tr>
            <th>단계</th><th>신청 기관</th><th>기한</th><th>처리 기간</th>
          </tr></thead>
          <tbody>
            <tr><td>1단계 이의신청</td><td>근로복지공단</td><td>거부 통보 후 90일</td><td>30일 이내</td></tr>
            <tr><td>2단계 심사청구</td><td>고용보험심사위원회</td><td>이의신청 결정 후 90일</td><td>60일 이내</td></tr>
            <tr><td>3단계 행정소송</td><td>행정법원</td><td>처분일로부터 1년</td><td>재판 기간 상이</td></tr>
          </tbody>
        </table>
        <TableNote>각 단계는 순서대로 진행해야 해요. 이의신청을 거치지 않고 바로 심사청구는 안 돼요.</TableNote>
      </Sec>
      <Divider />

      {/* SECTION 03 */}
      <Sec n="03" id="deadline" title="이의신청 90일 기한 계산 방법" sub="기산점 · 기한 연장 예외">
        <P><B>거부 결정 통보서를 받은 날로부터 90일이에요.</B> 통보서를 등기우편으로 받은 날이 기산점이에요. 공시송달인 경우엔 공시 후 14일이 지나면 수령한 것으로 봐요.</P>
        <P>90일 기한은 엄격하게 적용돼요. 기한 내에 이의신청서를 제출하지 않으면 불복이 차단돼요. 다만 천재지변이나 자신의 귀책 없이 기한을 못 지킨 경우엔 사유 해소 후 1개월 이내에 보완 신청을 할 수 있어요.</P>
        <P>기한이 임박했다면 서류가 완벽하지 않아도 일단 신청서를 제출하세요. 나중에 추가 서류를 보완할 수 있어요. 서류 미비로 접수 자체가 거부되는 경우는 드물어요.</P>
        <P>이의신청서 작성이 막막하면 근로복지공단 지사에 방문해서 서식을 받고 담당자 설명을 들으면 돼요. 불복 사유를 구체적으로 적고, 원래 신청 시 제출하지 못한 서류를 추가로 첨부하는 게 중요해요.</P>
        <InlineLink icon="link" title="근로복지공단 이의신청" desc="불복 절차 접수" href="https://www.comwel.or.kr" />
      </Sec>
      <RelatedMid
        title="대지급금 관련 글도 확인해 보세요"
        items={[
          { icon: "💰", title: "간이대지급금 신청 방법", desc: "체불확인서 발급부터 신청까지", href: "/w/간이대지급금-신청-방법-절차" },
          { icon: "📊", title: "간이대지급금 지급액 상한액", desc: "700만원 한도 항목별 계산", href: "/w/간이대지급금-지급액-상한액" },
          { icon: "📋", title: "대지급금 연차 상여금 계산", desc: "통상임금 포함 여부 기준", href: "/w/대지급금-금액-계산-연차-상여금" },
        ]}
        hubHref="/category/임금"
        hubLabel="체불임금 전체 보기"
      />
      <Divider />

      {/* SECTION 04 */}
      <Sec n="04" id="cost" title="공인노무사 비용 지원 방법" sub="법률구조공단 무료 지원">
        <P><B>법률구조공단을 통한 무료 지원이 가능해요.</B> 저소득 근로자는 공인노무사나 변호사 비용 없이 전문가 도움을 받을 수 있어요. <A href="https://www.klac.or.kr">대한법률구조공단</A>에서 월 소득 기준 이하인 근로자에게 무료 법률 상담과 소송대리 서비스를 제공해요.</P>
        <P>임금체불·대지급금 불복 사건도 지원 대상이에요. 사전에 자격 심사를 받고 지원 신청을 해야 해요. 법률구조공단 콜센터(132)나 가까운 지부를 방문하면 돼요.</P>
        <P>공인노무사를 개인 선임하는 경우 비용은 사건 복잡도에 따라 다르지만 대략 50만원~200만원 수준이에요. 이의신청 단계는 비교적 저렴하고, 행정소송으로 넘어가면 더 높아져요.</P>
        <P>근로복지공단 지사에서 기본적인 이의신청 방법은 무료로 안내해줘요. 간단한 사건이라면 직접 이의신청서를 작성해서 제출해도 돼요. 사유가 명확하고 추가 증거만 보완하면 되는 경우라면 직접 진행하는 게 현실적이에요.</P>
        <InlineLink icon="link" title="법률구조공단 무료 상담" desc="132 또는 지부 방문" href="https://www.klac.or.kr" />
      </Sec>
      <Divider />

      {/* SECTION 05 */}
      <Sec n="05" id="lawsuit" title="심사청구 기각 후 행정소송 절차" sub="재심사청구 · 처분일 1년">
        <P><B>행정소송이 마지막 수단이에요.</B> 재심사청구나 행정법원 소송으로 넘어가는 단계예요. 최초 처분(거부 결정)일로부터 1년 이내에 제기해야 해요.</P>
        <P>심사청구 기각 후 재심사청구를 할 수 있어요. 고용보험심사위원회 기각 결정 통보일로부터 90일 이내에 재심사청구를 할 수 있어요. 처리 기간은 60일 이내예요.</P>
        <P>행정소송은 행정법원에서 진행돼요. 공단의 처분이 위법함을 증명하면 돼요. 소송 비용은 인지대 등이 들지만 법률구조공단 지원을 받으면 줄일 수 있어요.</P>
        <P>실무적으로는 이의신청 단계에서 명확한 증거를 보완해서 해결되는 경우가 많아요. 심사청구까지 가는 사건은 사실 관계 다툼이 복잡한 경우예요. 전문가 도움을 받는 게 좋아요.</P>

        <ExtBtn badge="근로복지공단 공식" text="대지급금 이의신청 접수" cta="신청하기 →" href="https://www.comwel.or.kr" />
      </Sec>
      <Divider />

      <FAQAccordion items={meta.faq} />

      <RelatedArticles items={[
        { title: "간이대지급금 신청 방법 절차", desc: "체불확인서 발급부터 접수까지 단계별 안내", href: "/w/간이대지급금-신청-방법-절차" },
        { title: "간이대지급금 지급액 상한액", desc: "700만원 한도 항목별 계산 방법", href: "/w/간이대지급금-지급액-상한액" },
        { title: "대지급금 금액 계산 연차 상여금", desc: "통상임금 포함 여부 기준 정리", href: "/w/대지급금-금액-계산-연차-상여금" },
        { title: "퇴직급여 지급 지연이자 받기", desc: "14일 이후 연 20% 지연이자 청구", href: "/w/퇴직급여-지급-지연이자-받기" },
        { title: "파견근로자 2년 후 직접 고용", desc: "파견 기간 만료 후 전환 의무 기준", href: "/w/파견근로자-2년-후-고용" },
      ]} />
      <PrevNext
        prev={{ title: "대지급금 금액 계산 연차 상여금", href: "/w/대지급금-금액-계산-연차-상여금" }}
        next={{ title: "대지급금 임금채권 우선변제 차이", href: "/w/대지급금-임금채권-우선변제-차이" }}
      />
    </BlogLayout>
  );
}
