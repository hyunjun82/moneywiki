"use client";

// Q1. 청년도약계좌 못 탔거나 새 적금 상품을 찾는 19~34세 청년으로, 청년미래적금 가입 자격이 되는지 확인하고 싶은 상황.
// Q2. 본인이 일반형/우대형 중 어디에 해당하는지 판단하고, 출시 후 바로 신청하는 행동.
// Q3. 나이·소득·가구 중위소득 기준, 일반형 6% vs 우대형 12% 기여금 차이, 3년 만기 최대 2,200만원, 비과세 혜택, 중복가입 제한, 출시 시기(2026.6), 군복무 나이 연장.
// Q4. EligibilityChecker(자격 확인) + GreenBox(핵심 요약) + BorderBox(비교표) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const ELIG_ITEMS = [
  { id: "age", label: "만 19~34세 (군 복무 기간 최대 6년 추가 인정)" },
  { id: "income", label: "개인소득 연 6,000만원 이하 (자영업: 매출 3억원 이하)" },
  { id: "house", label: "가구 중위소득 200% 이하 (일반형 기준)" },
  { id: "nodup", label: "청년도약계좌 미가입 상태 (중복 불가)" },
];

const APPLY_STEPS = [
  { title: "자격 확인", desc: "나이, 개인소득, 가구 중위소득 기준 충족 여부를 점검해요. 건강보험자격득실확인서에서 가구원 소득을 확인할 수 있어요." },
  { title: "유형 선택", desc: "일반형(기여금 6%)과 우대형(기여금 12%) 중 본인에게 유리한 유형을 선택해요. 중소기업 재직자라면 우대형이 될 수 있어요." },
  { title: "서류 준비", desc: "신분증, 소득금액증명원(또는 원천징수영수증), 가족관계증명서, 건강보험자격득실확인서를 미리 챙겨요." },
  { title: "은행 앱에서 신청", desc: "2026년 6월 출시 후 서민금융진흥원 및 시중은행 앱에서 비대면 신청이 가능해요.", tip: "자동이체 설정하면 납입 놓칠 일 없어요" },
];

const FAQS = [
  { q: "청년도약계좌 가입자도 청년미래적금 가입 가능해요?", a: "동시 가입은 안 돼요. 청년도약계좌 만기 후 갈아타기는 허용될 가능성이 높아요. 3년 이상 가입했으면 기여금 손해 없이 전환할 수 있어요." },
  { q: "군대 다녀왔으면 나이 계산 어떻게 해요?", a: "군 복무 기간은 최대 6년까지 연령에서 빼줘요. 2년 복무했으면 실질적으로 36세까지 가입 가능해요." },
  { q: "월 50만원 꼭 넣어야 해요?", a: "50만원은 최대 한도예요. 적게 넣어도 되고, 정부기여금은 실제 납입액 기준으로 계산돼요. 가능하면 꽉 채우는 게 유리하죠." },
  { q: "중도 해지하면 기여금은 어떻게 되나요?", a: "중도 해지 시 정부기여금은 반환해야 해요. 만기까지 유지하는 게 핵심이에요." },
  { q: "프리랜서·자영업자도 가입 가능해요?", a: "네. 직업 종류 상관없이 소득 기준만 충족하면 돼요. 자영업자는 연 매출 3억원 이하(일반형) 또는 1억원 이하(우대형)가 기준이에요." },
  { q: "이자소득에 세금이 붙나요?", a: "전액 비과세예요. 일반 적금이면 15.4% 세금 떼는데, 청년미래적금은 0원이에요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "금융위원회 청년미래적금 보도자료", url: "https://www.fsc.go.kr" },
      { label: "서민금융진흥원", url: "https://www.kinfa.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "청년자산형성-5종-비교", title: "청년자산형성 5종 비교", description: "청년미래적금 포함 정부지원 적금 5가지를 한눈에 비교해요." },
  { slug: "청년도약계좌-가입방법", title: "청년도약계좌 가입방법", description: "5년 만기 최대 5,000만원 청년도약계좌 안내예요." },
  { slug: "ISA계좌-단점", title: "ISA 계좌 장단점", description: "청년형 ISA 비과세 400만원 혜택과 주의점이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 청년 · 적금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청년미래적금, 나도 가입할 수 있을까?
        <br />
        <span style={{ fontSize: 18, fontWeight: 500, color: "#555" }}>
          자격 조건부터 신청 방법까지
        </span>
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        청년도약계좌 신규 가입이 끝났는데 아쉬웠나요? 2026년 6월에 청년미래적금이 나와요.
        3년만 넣으면 정부가 최대 12%까지 얹어주고, 이자소득 비과세에요.
        월 50만원씩 3년이면 최대 2,200만원을 만들 수 있죠.
      </p>

      <Divider />

      <H2>내가 가입 대상인지 먼저 체크해보세요</H2>
      <p style={body}>
        <a href="https://www.fsc.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융위원회</a> 발표 기준으로
        아래 조건을 모두 충족하면 일반형에 가입 가능해요. 우대형은 소득 기준이 더 낮은 대신 기여금이 2배예요.
      </p>
      <SectionBadge>자격 확인</SectionBadge>
      <EligibilityChecker items={ELIG_ITEMS} />

      <Divider />

      <H2>일반형 vs 우대형, 뭐가 다른가요?</H2>
      <p style={body}>
        둘 다 3년 만기에 월 최대 50만원 납입이에요. 차이는 기여금 비율과 소득 기준이에요.
      </p>
      <SectionBadge>유형별 비교</SectionBadge>
      <BorderBox title="일반형 vs 우대형 비교">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.8 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #1D9E75" }}>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>구분</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>일반형</th>
              <th style={{ padding: "8px 6px", textAlign: "left" }}>우대형</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px 6px" }}>정부기여금</td>
              <td style={{ padding: "8px 6px" }}>납입액의 6%</td>
              <td style={{ padding: "8px 6px", fontWeight: 600, color: "#1D9E75" }}>납입액의 12%</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px 6px" }}>개인소득</td>
              <td style={{ padding: "8px 6px" }}>6,000만원 이하</td>
              <td style={{ padding: "8px 6px" }}>3,600만원 이하</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px 6px" }}>가구 중위소득</td>
              <td style={{ padding: "8px 6px" }}>200% 이하</td>
              <td style={{ padding: "8px 6px" }}>150% 이하</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px 6px" }}>소상공인 매출</td>
              <td style={{ padding: "8px 6px" }}>3억원 이하</td>
              <td style={{ padding: "8px 6px" }}>1억원 이하</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 6px" }}>3년 최대 수령액</td>
              <td style={{ padding: "8px 6px" }}>약 2,000만원</td>
              <td style={{ padding: "8px 6px", fontWeight: 600, color: "#1D9E75" }}>약 2,200만원</td>
            </tr>
          </tbody>
        </table>
      </BorderBox>
      <p style={body}>
        우대형 대상자는 중소기업 신규 취업자(입사 6개월 이내), 중소기업 재직자(소득 3,600만원 이하), 소상공인(매출 1억원 이하)이에요.
      </p>

      <Divider />

      <H2>어디서 어떻게 신청하나요?</H2>
      <p style={body}>
        2026년 6월 출시 예정이에요. 관공서 방문 없이 <a href="https://www.kinfa.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>서민금융진흥원</a> 및 시중은행 앱으로 비대면 신청이 가능해요.
      </p>
      <SectionBadge>신청 4단계</SectionBadge>
      <Steps steps={APPLY_STEPS} />

      <Divider />

      <H2>청년도약계좌와 뭐가 다른가요?</H2>
      <p style={body}>
        둘 다 정부지원 청년 적금이지만 핵심 차이가 있어요.
      </p>
      <GreenBox title="핵심 차이 3가지">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2.1 }}>
          <li><strong>만기</strong>: 청년미래적금 3년 vs 청년도약계좌 5년</li>
          <li><strong>기여금</strong>: 청년미래적금 6~12% vs 청년도약계좌 3~6%</li>
          <li><strong>상태</strong>: 청년미래적금 2026년 6월 출시 vs 청년도약계좌 2025년 신규 종료</li>
        </ul>
      </GreenBox>
      <p style={body}>
        빠르게 목돈이 필요하면 청년미래적금, 이미 청년도약계좌에 가입했으면 만기까지 유지하는 게 유리해요.
        두 상품 동시 가입은 불가하지만, 청년도약계좌 만기 후 갈아타기는 허용될 가능성이 높아요.
        문의는 <strong>서민금융콜센터 1397</strong>로 하면 돼요.
      </p>

      <Divider />

      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />

      <RelatedArticles items={RELATED} />

      <Disclaimer text="이 글은 2026년 3월 기준 금융위원회 발표 자료를 바탕으로 작성했어요. 출시 시 세부 조건이 변경될 수 있으니 금융위원회 공식 발표를 확인하세요." />
    </ArticleLayout>
  );
}
