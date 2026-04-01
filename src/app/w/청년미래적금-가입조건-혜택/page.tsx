"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";
// Q1. 청년 저축 상품을 찾다가 청년미래적금을 발견했거나 주변에서 가입했다는 얘기를 들은 20~30대
// Q2. 내가 가입 조건에 해당하는지 확인하고 실제로 가입하러 은행에 가거나 앱으로 신청
// Q3. 나이·소득·가구소득 조건 3가지, 우대형/일반형 기여금 차이, 비과세 혜택, 월 최대 50만원 한도
// Q4. 조건 체크리스트 + 혜택 비교표 + GreenBox 요약 + FAQ
// MAP-INTRO: 일반 적금이랑 뭐가 다른지 모르겠다면, 정부가 돈을 얹어준다는 게 핵심이에요
// MAP-TYPE: 자격확인
// MAP-H2: 가입조건 > 혜택비교 > 우대형vs일반형 > 가입방법 > FAQ
// MAP-COMP: 체크리스트 > 표 > GreenBox > BorderBox > FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const RELATED = [
  { slug: "IRP계좌-가입-세액공제", title: "IRP 가입과 세액공제", description: "청년미래적금과 함께 활용하면 절세 효과가 커요." },
  { slug: "연말정산-세율표", title: "연말정산 세율표", description: "소득 구간별 세율과 공제 효과를 확인하세요." },
];

const CHECK_ITEMS = [
  { id: "c1", label: "만 19~34세예요 (병역 이행 기간은 최대 6년 추가 인정)" },
  { id: "c2", label: "개인 소득이 연 6,000만원 이하예요" },
  { id: "c3", label: "가구 중위소득 200% 이하예요" },
  { id: "c4", label: "금융소득종합과세 대상이 아니에요 (금융소득 연 2,000만원 미만)" },
];

const BENEFIT_ROWS = [
  { item: "정부 기여금", general: "납입액의 6%", premium: "납입액의 12%" },
  { item: "비과세 혜택", general: "이자소득세 0원", premium: "이자소득세 0원" },
  { item: "은행 우대금리", general: "최대 +1.2%", premium: "최대 +1.2%" },
  { item: "월 납입 한도", general: "최대 50만원", premium: "최대 50만원" },
  { item: "가입 대상", general: "일반 청년", premium: "중소기업 취업 6개월 이내 청년" },
];

const FAQS = [
  {
    q: "34세가 넘어도 가입할 수 있나요?",
    a: "병역 이행 기간(최대 6년)을 빼줘요. 군대 2년 다녀왔다면 실질적으로 36세까지 가입 가능해요. 주민등록 생년월일 기준이에요.",
  },
  {
    q: "소득이 없어도 가입할 수 있나요?",
    a: "소득이 아예 없으면 가입 불가예요. 근로소득, 사업소득, 기타소득 중 하나가 있어야 해요. 대학생이라도 아르바이트 소득이 있으면 가입 가능해요.",
  },
  {
    q: "중도해지하면 어떻게 되나요?",
    a: "정부 기여금을 못 받아요. 본인이 납입한 원금과 일반 이자는 돌려받아요. 3년 만기를 채워야 기여금을 받을 수 있어요.",
  },
  {
    q: "여러 은행에서 동시에 가입할 수 있나요?",
    a: "1인 1계좌만 가능해요. 여러 은행 중 금리가 좋은 곳 하나를 선택해야 해요.",
  },
  {
    q: "청년도약계좌랑 동시에 가입할 수 있나요?",
    a: "가입 가능해요. 두 상품은 별개로 운영돼요. 다만 납입 여력이 되는지 먼저 생각해보세요. 청년미래적금은 3년 만기, 청년도약계좌는 5년 만기예요.",
  },
  {
    q: "월 50만원보다 적게 넣어도 되나요?",
    a: "괜찮아요. 월 2만원부터 50만원 사이에서 자유롭게 설정해요. 기여금은 납입액에 비례하니까 많이 넣을수록 기여금도 커져요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "서민금융진흥원: 청년미래적금 안내", url: "https://www.kinfa.or.kr" },
      { label: "금융위원회: 정책금융상품 정보", url: "https://www.fsc.go.kr" },
      { label: "금융감독원 금융상품한눈에: 은행별 금리 비교", url: "https://finlife.fss.or.kr" },
    ],
  },
];

const STEPS_CHECKLIST = [
  "나이: 만 19~34세 (병역 기간 최대 6년 추가 인정)",
  "소득: 개인 소득 연 6,000만원 이하 (전년도 소득 기준)",
  "가구소득: 중위소득 200% 이하 (부모님과 함께 살면 합산)",
  "금융소득: 연 2,000만원 미만 (금융소득종합과세 비대상)",
  "1인 1계좌: 여러 은행 중 하나만 선택",
  "가입 후: 3년 만기 채워야 기여금 수령 가능",
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>청년 금융 · 적금 · 정부지원</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년미래적금 가입조건과 혜택 정리<br />
        기여금·비과세·우대금리까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        일반 적금이랑 뭐가 다른지 모르겠다면, 정부가 돈을 얹어준다는 게 핵심이에요.
        납입액의 6~12%를 정부가 기여금으로 주고, 이자에 세금도 없어요.
        3년 만기로 월 50만원 넣으면 최대 약 2,200만원을 모을 수 있어요.
        <a href="/w/청년미래적금-청년도약계좌-차이" style={{ color: "#1D9E75", textDecoration: "underline" }}>청년도약계좌</a>와
        함께 활용하면 청년 자산 형성에 가장 효과적인 조합이에요.
      </p>

      <Divider />

      <H2>청년미래적금 가입조건, 내가 해당하나요?</H2>
      <p style={body}>
        4가지 조건을 모두 충족해야 가입할 수 있어요. 나이, 소득, 가구소득, 금융소득 순서로 확인하세요.
        하나라도 맞지 않으면 가입이 안 돼요.
      </p>
      <p style={body}>
        나이는 만 19~34세예요. 병역 이행 기간이 있으면 그만큼 나이에서 빼줘요. 군대 2년 다녀왔다면 실질적으로 36세까지 가능해요.
        소득은 개인 소득 6,000만원 이하인데, 근로·사업·기타소득을 모두 합친 금액이에요.
      </p>
      <p style={body}>
        가구 중위소득 200% 이하 조건은 부모님과 같이 살면 부모님 소득도 합산돼요.
        금융소득종합과세 기준인 연 2,000만원 이상 금융소득이 있으면 안 되는데, 이 정도면 대부분의 청년은 해당 없어요.
      </p>

      <SectionBadge>내 조건 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 조건 모두 충족해요. 가까운 시중은행 또는 앱에서 바로 가입 신청하세요."
        partialMatchText="조건 중 일부가 맞지 않아요. 서민금융진흥원(1397) 또는 가입 희망 은행에 문의하면 정확하게 확인할 수 있어요."
      />

      <Divider />

      <H2>청년미래적금 혜택, 일반 적금과 뭐가 달라요?</H2>
      <p style={body}>
        세 가지 혜택이 동시에 적용돼요. 정부 기여금, 비과세, 은행 우대금리예요.
        이 세 가지가 합쳐져서 일반 적금과 수익률 차이가 크게 벌어져요.
      </p>
      <p style={body}>
        비과세 혜택이 생각보다 커요. 일반 적금은 이자에서 15.4% 세금을 떼요.
        청년미래적금은 세금 0원이에요. 이자가 100만원이면 일반 적금은 84.6만원, 청년미래적금은 100만원 전액을 받아요.
      </p>

      <SectionBadge>우대형 vs 일반형 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>항목</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>일반형</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>우대형</th>
            </tr>
          </thead>
          <tbody>
            {BENEFIT_ROWS.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", fontWeight: 600 }}>{row.item}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb" }}>{row.general}</td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb", color: "#1D9E75", fontWeight: 600 }}>{row.premium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        우대형: 중소기업 취업 6개월 이내 청년, 기여금 12%<br />
        일반형: 그 외 청년 전체, 기여금 6%<br />
        월 50만원 × 36개월 = 납입금 1,800만원 + 기여금(일반형 약 108만원) + 이자 = 약 2,000만원 이상
      </GreenBox>

      <Divider />

      <H2>어디서, 어떻게 가입하나요?</H2>
      <p style={body}>
        대부분의 시중은행에서 가입할 수 있어요. 국민, 신한, 하나, 우리, 농협, 기업은행 등이에요.
        은행마다 기본금리와 우대금리 조건이 달라서 비교 후 가입하는 게 유리해요.
      </p>
      <p style={body}>
        우대금리는 주로 급여이체, 카드 사용, 자동이체 조건이에요.
        이미 급여통장이 있는 은행이면 우대금리를 받기 쉬워요.
        <a href="https://finlife.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원 금융상품한눈에</a>에서 실시간 은행별 금리를 비교해볼 수 있어요.
      </p>

      <BorderBox>
        가입 시 직전 연도 소득 증빙 서류가 필요해요. 근로소득자는 근로소득원천징수영수증,
        사업자는 종합소득세 신고서를 준비하세요. 국세청 홈택스에서 인터넷으로 발급 가능해요.
      </BorderBox>

      <Divider />

      <H2>가입 전 확인 체크리스트</H2>
      <p style={body}>
        가입 전에 놓치기 쉬운 포인트들을 정리했어요. 특히 중도해지 시 기여금을 받지 못한다는 점을 꼭 기억하세요.
      </p>

      <SectionBadge>가입 전 필수 확인</SectionBadge>
      <Checklist items={STEPS_CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        청년미래적금 가입 전에 많이 헷갈리는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <RelatedArticles items={RELATED} />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 2월 기준 서민금융진흥원 및 금융위원회 자료를 바탕으로 작성됐어요. 금리와 조건은 은행별, 시기별로 달라질 수 있으니 가입 전 해당 은행에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
