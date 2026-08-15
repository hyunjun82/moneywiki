"use client";
// Q1. 퇴직연금 계좌에 돈이 있는데 급하게 필요해서 빼고 싶은 상황 (집 구입, 병원비 등)
// Q2. 중도인출 가능 여부를 판단하고 신청까지 완료할 수 있어야 함
// Q3. 인출 가능한 5가지 사유, 사유별 서류, 세금 차이(3.3~5.5% vs 16.5%), 55세 전 전액만 가능
// Q4. 사유별 서류 DocTable + 세금 비교 표 + Steps + FAQ

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const STEPS = [
  {
    title: "중도인출 사유 해당 여부 확인",
    desc: "5가지 사유 중 내 상황이 해당되는지 확인하세요. 주택 구입은 무주택 확인이 필요하고, 요양은 의사 진단서에 '6개월 이상 요양 소견'이 명시돼야 해요. 파산은 법원 선고 결정문이 나온 상태여야 해요.",
    tip: "무주택 확인서는 정부24에서 무료로 발급받을 수 있어요",
  },
  {
    title: "금융사 앱에서 중도인출 신청",
    desc: "퇴직연금에 가입한 금융사(은행·증권사·보험사) 앱에서 '퇴직연금 중도인출' 메뉴로 들어가세요. 인출 사유를 선택하고 증빙 서류 사진을 업로드하면 돼요. 영업점 방문도 가능해요.",
    tip: "서류 업로드 시 사진이 선명하게 찍혀야 심사가 빠르게 진행돼요",
  },
  {
    title: "심사 후 입금 (3~5일)",
    desc: "서류 검토 후 3~5일 내 입금돼요. 세금은 자동으로 원천징수돼서 세후 금액만 받아요. 부득이한 사유로 인출하면 연금소득세 3.3~5.5%만 차감돼요.",
    tip: "55세 전에는 전액 인출만 가능해요. 일부만 빼는 건 55세 이후에만 가능해요",
  },
];

const DOCS = [
  { name: "매매계약서 + 무주택 확인서", required: true, where: "주택 구입 사유,무주택 확인서는 정부24 발급" },
  { name: "임대차계약서 + 무주택 확인서", required: true, where: "전세보증금 사유,본인 명의 전세 계약만 해당" },
  { name: "의사 진단서 (6개월 이상 요양 소견)", required: true, where: "요양 사유,본인·배우자·부양가족 해당" },
  { name: "법원 파산 선고 결정문", required: true, where: "파산 사유,신청이 아닌 법원 선고 결정문이어야 함" },
  { name: "피해 확인서 + 손실 증빙", required: true, where: "천재지변 사유,행정기관 발급 피해 확인서" },
];

const CHECKLIST = [
  "5가지 사유 중 내 상황 해당 여부 먼저 확인",
  "무주택 확인서: 정부24에서 무료 발급",
  "요양 진단서: '6개월 이상 요양 소견' 문구 포함 여부 확인",
  "파산: 신청만으로는 불가,법원 선고 결정문 필요",
  "55세 전은 전액 인출만 가능 (일부 인출 불가)",
  "중도인출 전 퇴직연금 담보 대출 대안 먼저 검토",
];

const FAQS = [
  {
    q: "퇴직연금을 일부만 빼서 쓸 수 있나요?",
    a: "55세 전에는 안 돼요. 전액 인출(해지)만 가능해요. 55세 이후에는 일부 인출이 가능해요. 전액 인출하면 계좌가 해지되고, 나중에 다시 가입해야 해요.",
  },
  {
    q: "중도인출하면 세금이 얼마나 나오나요?",
    a: "부득이한 사유로 인출하면 연금소득세 3.3~5.5%만 내요. 사유 없이 해지하면 기타소득세 16.5%가 부과돼요. 1,000만원 기준으로 세금 차이가 110만원 이상 나요.",
  },
  {
    q: "집을 사려고 퇴직연금을 뺐다가 나중에 또 받을 수 있나요?",
    a: "전액 인출하면 계좌가 해지돼요. 이후에 IRP를 새로 개설해서 다시 적립할 수 있지만, 기존에 쌓인 기간은 초기화돼요.",
  },
  {
    q: "전세는 중도인출 사유가 되나요?",
    a: "무주택자가 본인 명의로 전세 계약을 할 때 가능해요. 월세는 안 되고 전세만 해당돼요. 임대차계약서와 무주택 확인서를 제출하면 돼요.",
  },
  {
    q: "배우자 수술비용으로 중도인출이 가능한가요?",
    a: "의사 진단서에 6개월 이상 요양이 필요하다는 소견이 있어야 해요. 단순 수술비는 해당되지 않아요. 진단서에 '6개월 이상 요양 필요' 문구가 있는지 꼭 확인하세요.",
  },
  {
    q: "계좌 해지 없이 돈을 빌릴 수 있는 방법이 있나요?",
    a: "퇴직연금 담보 대출이 있어요. 계좌를 유지한 채로 돈을 빌릴 수 있어요. 중도인출보다 나을 수 있으니 금융사에 먼저 문의해보세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법: 중도인출 사유 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청: 연금소득세 안내", url: "https://www.nts.go.kr" },
      { label: "정부24: 무주택 확인서 발급", url: "https://www.gov.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직연금-수령-나이-55세-기준-조기-수령", title: "퇴직연금 수령 나이 55세 기준", description: "55세 이후 연금·일시금 수령 방법과 세금 차이예요." },
  { slug: "퇴직금-중간정산-신청-법정-사유-절차", title: "퇴직금 중간정산 신청 방법", description: "퇴직금 중간정산 법정 사유와 신청 절차예요." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "퇴직소득세 계산법과 IRP 절세 방법을 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · 중도인출 · 조건</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 중도인출 조건과 사유,<br />
        신청 방법까지 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직연금은 원칙적으로 55세까지 못 빼요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>에서 정한 부득이한 사유 5가지에 해당할 때만 55세 전 중도인출이 가능해요.
        해당 사유로 인출하면 연금소득세 3.3~5.5%만 내지만, 사유 없이 그냥 해지하면 기타소득세 16.5%를 내야 해요.
        <a href="/w/퇴직연금-수령-나이-55세-기준-조기-수령" style={{ color: "#1D9E75", textDecoration: "underline" }}>55세 이후 수령</a>을 기다릴 수 있다면 기다리는 게 유리해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>중도인출 가능한 부득이한 사유 5가지</H2>
      <p style={body}>
        사유 없이는 인출할 수 없어요. 아래 5가지 중 하나에 해당하고 증빙 서류를 제출해야 인출할 수 있어요.
        사유에 해당하면 일반 해지(16.5%) 대신 연금소득세 3.3~5.5%만 내는 게 가장 큰 혜택이에요.
      </p>

      <SectionBadge>사유별 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox>
        55세 전에는 전액 인출만 가능해요. 계좌가 해지되기 때문에 정말 필요한 경우에만 인출하세요.
        퇴직연금 담보 대출이 가능한 금융사라면 계좌 유지하면서 빌리는 방식도 검토해볼 수 있어요.
      </BorderBox>

      <Divider />

      <H2>중도인출 vs 해지: 세금 차이</H2>
      <p style={body}>
        같은 금액을 받아도 인출 방식에 따라 세금이 크게 달라요. 부득이한 사유가 있으면 반드시 증빙 서류를 준비해서 낮은 세율을 적용받는 게 유리해요.
      </p>

      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0fdf8" }}>
              <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>구분</th>
              <th style={{ padding: "10px 14px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>세율</th>
              <th style={{ padding: "10px 14px", textAlign: "right", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>1,000만원 기준 세금</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb", color: "#1D9E75", fontWeight: 600 }}>부득이한 사유 중도인출</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb", color: "#1D9E75", fontWeight: 600 }}>3.3~5.5%</td>
              <td style={{ padding: "9px 14px", textAlign: "right", borderBottom: "1px solid #e5e7eb", color: "#1D9E75", fontWeight: 600 }}>33만~55만원</td>
            </tr>
            <tr style={{ backgroundColor: "#fafafa" }}>
              <td style={{ padding: "9px 14px", borderBottom: "1px solid #e5e7eb", color: "#ef4444" }}>사유 없는 일반 해지</td>
              <td style={{ padding: "9px 14px", textAlign: "center", borderBottom: "1px solid #e5e7eb", color: "#ef4444" }}>16.5%</td>
              <td style={{ padding: "9px 14px", textAlign: "right", borderBottom: "1px solid #e5e7eb", color: "#ef4444" }}>165만원</td>
            </tr>
          </tbody>
        </table>
      </div>

      <GreenBox>
        세금 차이: 부득이한 사유로 인출 vs 그냥 해지 = 110만원 이상 차이 (1,000만원 기준)<br />
        서류 하나가 세금 100만원 이상을 줄여요.
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>중도인출 신청 방법 3단계</H2>
      <p style={body}>
        신청 자체는 금융사 앱에서 간단히 할 수 있어요. 증빙 서류 준비가 가장 중요한 단계예요.
        서류 사진이 흐리거나 내용이 빠지면 심사가 지연될 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>중도인출 전 체크리스트</H2>
      <p style={body}>
        인출 전에 내 상황이 사유에 해당하는지, 서류가 모두 준비됐는지 확인하세요.
        전액 인출로 계좌가 해지되기 때문에 돌이킬 수 없어요. 신중하게 결정하는 게 중요해요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직연금 중도인출에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법과 소득세법을 바탕으로 작성됐어요. 중도인출 사유와 세율은 법령 개정에 따라 달라질 수 있으니 최신 기준은 금융사 또는 국세청(126)에서 확인하세요." />
    </ArticleLayout>
  );
}
