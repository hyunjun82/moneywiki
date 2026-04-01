"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. IRP에 모아둔 퇴직금을 종신연금으로 전환하면 세금이 얼마나 줄어드는지, 어떻게 하는 건지 알고 싶은 상황
// Q2. 생명보험사로 IRP를 이전해서 종신연금으로 전환하는 절차를 실행하고, 세금 절감 효과를 확인한다
// Q3. 이전 절차(생명보험사 계좌 개설→이전 신청→연금 수령), 세율 차이(3.3~5.5%), 수령 한도(연간 1,500만원), 이전 수수료
// Q4. Steps(전환 절차) + GreenBox(세율 비교) + BorderBox(주의사항) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS_DATA = [
  {
    title: "생명보험사에서 IRP 계좌를 새로 개설해요",
    desc: "종신연금은 생명보험사만 취급할 수 있어요. 삼성생명, 한화생명, 교보생명, 신한라이프 등에서 IRP 계좌를 개설하면 돼요. 홈페이지나 모바일앱에서 비대면으로 가능하고, 신분증과 기존 IRP 계좌 정보만 있으면 되죠.",
    tip: "증권사·은행 IRP에서는 종신연금 전환이 안 돼요",
  },
  {
    title: "새 계좌에서 이전(계약이관) 신청해요",
    desc: "새로 만든 생명보험사 IRP 계좌에서 '연금 이전 신청'을 하면 돼요. 기존 금융기관에 직접 방문할 필요 없이, 새 금융기관이 이전 절차를 대행해 줘요. 기존 금융기관에서 유선으로 이전 의사를 확인하는 전화가 올 수 있어요.",
    tip: "이전은 해지가 아니라 계약유지로 간주돼요",
  },
  {
    title: "이전 완료 후 연금 상품을 선택해요",
    desc: "계좌 이전은 보통 5~10영업일이 걸려요. 이전이 완료되면 종신연금 상품을 매수할 수 있어요. 확정기간형(10년·20년)과 종신형 중 선택하면 되고, 종신형을 선택해야 사망 시까지 연금을 받을 수 있죠.",
    tip: "이전 완료까지 5~10영업일 소요",
  },
  {
    title: "만 55세 이상이면 연금 수령을 시작해요",
    desc: "IRP 가입일로부터 5년이 경과하고 만 55세 이상이면 연금 수령이 가능해요. 단, 퇴직금이 들어있는 IRP는 가입기간과 관계없이 퇴직 시점부터 수령할 수 있어요. 연간 수령한도 이내로 받아야 3.3~5.5% 저율과세가 적용돼요.",
    tip: "퇴직급여 포함 IRP는 가입기간 요건 면제",
  },
];

const CHECKLIST = [
  "만 55세 이상인지 / 연금 수령 나이 요건",
  "IRP 가입 5년 경과했는지 / 퇴직급여 포함 시 면제",
  "생명보험사 IRP 계좌 개설했는지 / 증권사·은행은 종신연금 불가",
  "연간 수령액이 1,500만원 이하인지 / 초과 시 16.5% 과세",
  "기존 IRP에 압류·질권 설정이 없는지 / 설정 시 이전 제한",
  "이전 수수료 면제 여부 / 대부분 무료, 일부 보험 7년 이내 수수료",
];

const FAQS = [
  {
    q: "종신연금이 확정기간형보다 세금이 적은 건가요?",
    a: "네, 확정기간형은 70세 미만 수령 시 5.5%인데 종신연금은 나이와 관계없이 3.3~5.5%예요. 80세 이상부터는 3.3%만 떼니까 오래 살수록 절세 효과가 커지죠. 연간 1,500만원 이내 수령이 조건이에요.",
  },
  {
    q: "계좌 이전하면 기존 세액공제 혜택이 사라지나요?",
    a: "아니에요. 이전은 해지가 아니라 계약유지로 간주되니까 기존에 받은 세액공제(연 최대 900만원 × 13.2~16.5%)는 그대로 유지돼요. 이전 과정에서 세금이 부과되지 않아요.",
  },
  {
    q: "이전 수수료가 있나요?",
    a: "대부분 금융기관은 무료예요. 다만 일부 보험상품형 IRP는 가입 후 7년 이내에 이전하면 중도해지 수수료가 발생할 수 있어요. 이전 전에 기존 금융기관에 수수료 여부를 확인해 보세요.",
  },
  {
    q: "연간 1,500만원 넘게 받으면 어떻게 되나요?",
    a: "초과분에 대해 16.5%의 기타소득세가 적용돼요. 3.3%와 16.5%는 차이가 크니까 수령액을 1,500만원 이내로 조절하는 게 유리해요. 월로 따지면 약 125만원 이내가 되겠죠.",
  },
  {
    q: "퇴직금만 있는 IRP도 종신연금으로 전환할 수 있나요?",
    a: "가능해요. 퇴직금이 들어있는 IRP는 가입기간 5년 요건이 면제되니까 퇴직하자마자 생명보험사로 이전해서 종신연금을 시작할 수 있어요. 퇴직금 재원에 대해서는 퇴직소득세 30~40% 감면도 받을 수 있죠.",
  },
  {
    q: "증권사 IRP에서 바로 종신연금 전환은 왜 안 되나요?",
    a: "종신연금은 생명보험 상품이라서 생명보험사만 취급할 수 있어요. 증권사나 은행 IRP에서는 확정기간형 연금만 가능해요. 종신연금을 받으려면 반드시 생명보험사 IRP로 이전해야 하는 거예요.",
  },
];

const SOURCES = [
  { name: "금융감독원", href: "https://www.fss.or.kr" },
  { name: "근로자퇴직급여보장법", href: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
  { name: "국세청 연금소득 안내", href: "https://www.nts.go.kr" },
];

const RELATED = [
  { slug: "연금저축펀드-세액공제-한도", title: "연금저축펀드 세액공제 한도", description: "연금저축 세액공제 한도와 IRP 합산 기준." },
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 일시금 vs 연금 비교", description: "일시금과 연금 수령의 세금·수익 차이." },
  { slug: "IRP-세액공제-한도", title: "IRP 세액공제 한도", description: "IRP 납입 세액공제 한도와 활용법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>IRP · 종신연금 · 퇴직연금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        IRP를 종신연금으로 전환하려면?<br />
        생명보험사 이전 절차와 세금 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "IRP에 모아둔 퇴직금, 종신연금으로 받으면 세금이 얼마나 줄어들까요?"
      </p>
      <p style={body}>
        확정기간형으로 받으면 55세 기준 <strong>5.5%</strong> 세율인데, 종신연금으로 전환하면 <strong>3.3~5.5%</strong>까지 낮출 수 있어요.
        80세 넘으면 3.3%만 떼니까 오래 살수록 절세 효과가 커지죠.
        생명보험사로 IRP를 이전하면 되는데, 절차가 생각보다 간단해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 전환 절차 - 방법형이므로 Steps 먼저 */}
      <H2>종신연금 전환, 어떤 순서로 하나요?</H2>
      <p style={body}>
        IRP 종신연금 전환은 생명보험사로 계좌를 이전하는 방식이에요.
        기존 금융기관을 해지하는 게 아니라 이전이라서 세제혜택이 그대로 유지돼요.
        <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a>에서도 계좌 이전을 해지와 구분하고 있죠.
      </p>

      <Steps steps={STEPS_DATA} />

      <CategoryButton label="연금·퇴직" count={8} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: 세율 비교 */}
      <H2>종신연금이 세금 면에서 왜 유리한가요?</H2>
      <p style={body}>
        연금 수령 시 세율은 수령 방식과 나이에 따라 달라져요.
        종신연금의 핵심 장점은 나이가 많아질수록 세율이 낮아진다는 거예요.
      </p>

      <SectionBadge>연금 수령 방식별 세율 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>수령 나이</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>확정기간형</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>종신연금</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["55~69세", "5.5%", "4.4%"],
              ["70~79세", "4.4%", "3.3%"],
              ["80세 이상", "3.3%", "3.3%"],
            ].map(([age, fixed, life], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{age}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", color: "#6b7280" }}>{fixed}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{life}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        IRP 1억원을 연간 1,200만원씩 받는다면{"\n"}
        · 확정기간형(55세): 1,200만 × 5.5% = 연 66만원 세금{"\n"}
        · 종신연금(55세): 1,200만 × 4.4% = 연 52.8만원 세금{"\n"}
        → 연간 <strong>13.2만원</strong> 절세, 20년이면 <strong>264만원</strong> 차이
      </GreenBox>

      <p style={body}>
        퇴직급여가 포함된 IRP라면 추가 혜택이 있어요.
        퇴직소득세에 대해 10년차까지 30% 감면, 11년차부터 40% 감면이 적용돼요.
        연금으로 받는 것 자체가 일시금보다 세금이 훨씬 적죠.
      </p>

      <Divider />

      {/* H2-3: 주의사항 */}
      <H2>전환 전에 꼭 확인할 것들</H2>
      <p style={body}>
        종신연금 전환이 무조건 유리한 건 아니에요.
        수령 한도를 넘기면 오히려 세금이 확 뛰니까 아래 사항을 반드시 점검하세요.
      </p>

      <BorderBox>
        <strong>연간 수령 한도 주의</strong>{"\n"}
        · 연간 1,500만원 이하 → 3.3~5.5% 저율과세{"\n"}
        · 연간 1,500만원 초과 → 초과분 16.5% 기타소득세{"\n"}
        · 월 125만원 이내로 수령하면 한도 내에서 받을 수 있어요{"\n"}
        · 연금저축 + IRP 수령액 합산 기준이에요
      </BorderBox>

      <SectionBadge>전환 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <p style={body}>
        <a href="/w/퇴직연금-수령-일시금-연금-비교" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직연금 일시금과 연금 수령</a>의 세금 차이도 함께 비교해 보면 판단이 수월해져요.
      </p>

      <Divider />

      {/* H2-4: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 종신연금 전환에서 실제로 많이 헷갈리는 부분이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성했어요. 세율·수령 한도 등은 세법 개정에 따라 달라질 수 있으니 최신 기준은 금융감독원 또는 국세청에서 확인해 주세요." />
    </ArticleLayout>
  );
}
