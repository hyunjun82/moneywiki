"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 퇴사했거나 퇴사 예정인데 못 쓴 연차를 돈으로 받을 수 있는지, 얼마인지, 어떻게 청구하는지 궁금한 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 미사용 연차수당 금액을 계산하고, 회사가 안 주면 고용노동부에 임금체불 신고하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 계산 공식(1일 통상임금 × 미사용 일수), 통상임금 포함 항목, 소멸시효 3년, 청구 절차, 연차 사용 촉진 제도.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(계산 공식) + BorderBox(통상임금 포함/제외) + Steps(청구 절차) + Checklist(청구 전 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "퇴사할 때 안 쓴 연차 다 돈으로 받을 수 있나요?",
    a: "네. 퇴사 시 미사용 연차는 통상임금 기준으로 전액 지급받아야 해요. 마지막 급여에 '연차수당' 항목으로 들어와요.",
  },
  {
    q: "회사가 연차 사용 촉진했으면 수당 못 받나요?",
    a: "촉진 절차(6개월 전 촉구 → 2개월 전 서면 통지 → 1개월 전 최종 통지)를 모두 거쳤다면 수당 의무가 없어요. 형식적 통지만 하고 실제 사용을 막았다면 수당 청구 가능해요.",
  },
  {
    q: "통상임금에 식대도 포함되나요?",
    a: "월 10만 원 초과 식대는 포함돼요. 10만 원 이하 비과세 식대는 제외되는 경우가 많아요. 급여명세서에서 확인하세요.",
  },
  {
    q: "1년 미만 근무자도 연차수당 받을 수 있나요?",
    a: "네. 입사 후 1개월 개근하면 1일씩 연차가 생겨요. 6개월 근무 후 퇴사하면 최대 6일분 수당을 받을 수 있어요.",
  },
  {
    q: "소멸시효 3년이 지나면 진짜 못 받나요?",
    a: "법적 청구권이 소멸돼요. 다만 시효 만료 전에 내용증명을 보내면 6개월 연장되고, 그 안에 신고하면 시효가 중단돼요.",
  },
  {
    q: "재직 중에도 미사용 연차수당 청구 가능한가요?",
    a: "원칙적으로 연차는 사용해야 해요. 회사가 사용을 방해했다면 청구 가능하지만, 노동청 확인이 필요해요.",
  },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "근로기준법 제60조(법제처)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 민원마당", url: "https://minwon.moel.go.kr" },
      { label: "고용노동부 임금체불 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연차휴가-발생-기준-조건", title: "연차휴가 발생 기준", description: "근속연수별 연차 일수가 궁금하면 확인하세요." },
  { slug: "퇴직금-미지급-신고-처벌-지연이자", title: "퇴직금 미지급 신고 방법", description: "퇴직금도 못 받았다면 함께 신고하세요." },
  { slug: "통상임금-계산-방법", title: "통상임금 계산법", description: "연차수당 계산의 기본이 되는 통상임금을 알아보세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 연차 · 임금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        못 쓴 연차, 얼마 받을 수 있나요?<br />
        계산 공식·청구 방법·소멸시효
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        연차를 다 못 쓰고 퇴사하게 됐나요? 1년에 15일 발생하는 연차를 실제로 다 쓰기는 어렵죠.
        못 쓴 연차는 돈으로 받을 수 있어요. <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제60조</a>가 보장하고 있고,
        회사는 퇴직일로부터 14일 이내에 정산해야 해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>미사용 연차수당, 얼마 받나요?</H2>
      <p style={body}>
        공식은 간단해요. 1일 통상임금에 미사용 연차 일수를 곱하면 돼요.
      </p>

      <GreenBox title="미사용 연차수당 계산 공식">
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.9, fontWeight: 600 }}>
          미사용 연차수당 = 1일 통상임금 × 미사용 연차일수
        </p>
        <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.9 }}>
          월급 300만 원, 월 소정근로일수 20일 기준<br />
          1일 통상임금 = 300만 ÷ 20 = 15만 원<br />
          미사용 5일 → <strong>75만 원</strong> / 10일 → <strong>150만 원</strong> / 15일 → <strong>225만 원</strong>
        </p>
      </GreenBox>

      <Divider />

      <H2>통상임금에 뭐가 포함되나요?</H2>
      <p style={body}>
        기본급만 넣으면 손해예요. 정기적·고정적으로 받는 수당도 포함돼요.
      </p>

      <SectionBadge>포함·제외 항목</SectionBadge>
      <BorderBox title="통상임금 포함 vs 제외">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 13, marginBottom: 6 }}>포함</p>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, lineHeight: 1.9 }}>
              <li>기본급</li>
              <li>주휴수당</li>
              <li>직책수당(정기·고정)</li>
              <li>식대(10만 원 초과분)</li>
              <li>교통비(실비 변상 아닌 경우)</li>
            </ul>
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 13, marginBottom: 6 }}>제외</p>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, lineHeight: 1.9 }}>
              <li>연장근로수당</li>
              <li>경조사비</li>
              <li>퇴직금</li>
              <li>일부 상여금</li>
            </ul>
          </div>
        </div>
      </BorderBox>

      <Divider />

      <H2>회사가 안 주면 어떻게 청구하나요?</H2>
      <p style={body}>
        퇴직 시 자동으로 정산되는 게 원칙이에요. 안 됐다면 직접 청구해야 해요.
        <a href="https://minwon.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 민원마당</a>에서 온라인으로 10분이면 신고할 수 있어요.
      </p>

      <SectionBadge>청구 절차</SectionBadge>
      <Steps steps={[
        { title: "회사에 내용증명 발송", desc: "미사용 연차수당 지급을 요청하는 내용증명을 보내세요.", tip: "금액과 미사용 일수를 구체적으로 적으세요." },
        { title: "7일 대기", desc: "회사 응답을 기다리세요. 대부분 이 단계에서 해결돼요." },
        { title: "미지급 시 노동청 신고", desc: "고용노동부 민원마당(minwon.moel.go.kr)에서 임금체불 진정 접수하세요." },
        { title: "근로감독관 조사", desc: "담당 감독관이 사실관계를 조사해요." },
        { title: "지급 명령 또는 형사고발", desc: "미지급 확인 시 시정명령, 불이행 시 형사고발까지 진행돼요." },
      ]} />

      <Divider />

      <H2>소멸시효 3년, 놓치면 못 받아요</H2>
      <p style={body}>
        퇴직자는 퇴직일로부터 3년, 재직자는 연차 발생일로부터 3년이에요.
        2023년 1월 1일 퇴사했다면 2026년 1월 1일까지 청구해야 해요.
        3년 지나면 법적 청구권이 소멸돼서 강제할 방법이 없어요.
      </p>

      <BorderBox title="시효 중단 방법">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2, fontSize: 14 }}>
          <li>내용증명 발송 → 시효 6개월 연장</li>
          <li>노동청 임금체불 진정 → 시효 중단</li>
          <li>법원 지급명령 또는 소송 제기 → 시효 완전 중단</li>
        </ul>
      </BorderBox>

      <Divider />

      <H2>청구 전에 체크하세요</H2>

      <Checklist items={[
        "급여명세서에서 미사용 연차 일수 확인",
        "통상임금 계산 (기본급 + 고정수당 + 주휴수당)",
        "회사가 연차 사용 촉진 절차를 거쳤는지 확인",
        "퇴직일 기준 소멸시효 3년 내인지 확인",
        "근로계약서·급여명세서·연차 기록 사본 보관",
      ]} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 구체적인 금액 계산은 고용노동부(1350) 상담을 권장해요." />
    </ArticleLayout>
  );
}
