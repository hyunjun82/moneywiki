"use client";

// Q1. 회사에서 "월급에 야근비 다 포함"이라고 하는데, 이게 합법인지 의심되고, 추가 수당을 받을 수 있는지 알고 싶은 직장인.
// Q2. 포괄임금제가 본인 회사에서 유효한지 판단하고, 무효라면 미지급 수당을 청구하거나 노동청에 신고하는 행동.
// Q3. 유효 3요건(근로시간 산정 불가·명시적 합의·합리적 금액), 초과 시 추가 수당 의무, 무효 시 3년분 청구 가능, 2026년 포괄임금제 금지법 추진 현황.
// Q4. Checklist(유효성 점검) + GreenBox(유효 3요건) + BorderBox(무효 시 청구 방법) + Steps(대응 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const VALIDITY_CHECK = [
  "내 업무가 근로시간 산정이 객관적으로 불가능한 직종인가? (영업직·현장직 등)",
  "근로계약서에 '포괄임금제 적용'이 명시되어 있는가?",
  "포함 항목(기본급, 연장수당, 휴일수당 등)이 구분되어 기재되어 있는가?",
  "포괄임금액이 최저임금 이상 + 합리적 수준인가?",
  "회사가 실제 근로시간을 기록하고 있는가?",
  "예정 시간 초과 시 추가 수당을 주기로 되어 있는가?",
  "내가 충분히 이해하고 동의한 계약인가?",
];

const RESPONSE_STEPS = [
  { title: "근로계약서 확인", desc: "포괄임금제가 명시되어 있는지, 포함 항목과 금액이 구분되어 있는지 확인해요." },
  { title: "실제 근로시간 기록", desc: "지난 3개월간 출퇴근 기록을 확보해요. 회사에 근무 기록을 요청할 권리가 있어요. 기록이 없다면 그것도 문제예요.", tip: "카카오톡 퇴근 메시지, 교통카드 기록 등도 증거로 활용 가능" },
  { title: "유효성 판단", desc: "사무직인데 포괄임금제라면 유효하지 않을 가능성이 높아요. 사무직은 근로시간 산정이 가능하거든요." },
  { title: "추가 수당 청구 또는 신고", desc: "무효라면 지난 3년분 미지급 연장수당을 청구할 수 있어요. 고용노동부(1350)에 신고하거나 노동위원회에 진정해요." },
];

const FAQS = [
  { q: "포괄임금제가 뭔가요?", a: "기본급에 연장·야간·휴일수당을 미리 포함해서 월급을 정하는 방식이에요. 실제 야근 시간과 관계없이 고정 금액을 주는 거예요." },
  { q: "사무직도 포괄임금제가 유효해요?", a: "대부분 무효예요. 사무직은 출퇴근 시간을 당연히 기록할 수 있어서 '근로시간 산정이 불가능한 직종'에 해당하지 않아요." },
  { q: "포괄임금제가 유효해도 추가 수당 받을 수 있나요?", a: "네. 실제 근로시간이 약정 시간을 초과하면 초과분에 대한 수당을 별도로 줘야 해요." },
  { q: "포괄임금제를 거부할 수 있나요?", a: "근로자 동의가 필요한 계약이라 거부할 수 있어요. 거부했다고 불이익을 주면 부당노동행위로 신고 가능해요." },
  { q: "무효 판정 나면 얼마나 받을 수 있나요?", a: "지난 3년분 미지급 연장수당을 청구할 수 있어요. 금액은 실제 근로시간과 시급에 따라 달라져요." },
  { q: "2026년에 포괄임금제가 폐지되나요?", a: "2026년 상반기 시행을 목표로 포괄임금제 금지법이 추진 중이에요. 원칙적 금지 + 예외적 허용(고용노동부 인가) 방향이에요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "근로기준법(법제처)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 포괄임금제 안내", url: "https://labor.moel.go.kr/reportCntr/inclusiveWage.do" },
    ],
  },
];

const RELATED = [
  { slug: "연장근로-초과근무-수당-계산", title: "연장근로 수당 계산", description: "연장·야간·휴일근로 수당 계산법이에요." },
  { slug: "임금-미지급-회사-고소", title: "임금 미지급 고소", description: "밀린 임금 청구와 노동청 신고 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동 · 임금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        포괄임금제, 우리 회사도 합법일까?
        <br />
        <span style={{ fontSize: 18, fontWeight: 500, color: "#555" }}>
          유효 조건과 연장수당 청구 방법
        </span>
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;월급에 야근비 다 포함이에요&quot;라고 회사가 말하는데, 진짜 맞는지 궁금하죠.
        포괄임금제는 아무 회사나 할 수 있는 게 아니에요. 대법원도 매우 제한적으로만 인정하고 있어요.
      </p>

      <Divider />

      <H2>포괄임금제가 유효하려면 3가지 조건이 필요해요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>과 대법원 판례에 따르면,
        3가지를 모두 충족해야 포괄임금제가 유효해요.
      </p>
      <GreenBox title="유효 3요건">
        <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 2.4 }}>
          <li><strong>근로시간 산정이 객관적으로 불가능</strong> (영업직·현장직 등. 사무직은 대부분 해당 안 됨)</li>
          <li><strong>근로자와 명시적 합의</strong> (일방적 통보는 무효. 계약서에 포함 항목·금액 구분 기재)</li>
          <li><strong>포괄임금액이 합리적 수준</strong> (최저임금 이상 + 실제 손해 안 보는 금액)</li>
        </ol>
      </GreenBox>
      <p style={body}>
        사무직이 9시 출근·6시 퇴근하면서 포괄임금제라고요? 근로시간 산정이 가능한 직종이니 유효하지 않을 가능성이 높아요.
      </p>

      <Divider />

      <H2>우리 회사 포괄임금제, 유효한지 점검해보세요</H2>
      <p style={body}>
        아래 항목 중 하나라도 &apos;아니오&apos;가 있으면 유효성에 문제가 있을 수 있어요.
      </p>
      <SectionBadge>유효성 자가 점검</SectionBadge>
      <Checklist items={VALIDITY_CHECK} />

      <Divider />

      <H2>포괄임금제가 무효라면 어떻게 되나요?</H2>
      <p style={body}>
        무효 판정 나면 회사가 월급을 다시 계산해야 해요.
      </p>
      <BorderBox title="무효 시 근로자 권리">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2.2 }}>
          <li>실제 근로시간 기준으로 연장수당 <strong>재계산</strong></li>
          <li>지난 <strong>3년분</strong> 미지급 수당 청구 가능 (소멸시효 3년)</li>
          <li><strong>고용노동부(1350)</strong>에 신고 또는 노동위원회 진정</li>
          <li>심각한 경우 임금체불로 <strong>형사고소</strong> 가능</li>
        </ul>
      </BorderBox>

      <Divider />

      <H2>의심된다면 이렇게 대응하세요</H2>
      <p style={body}>
        바로 신고하기보다 증거를 먼저 확보하는 게 유리해요.
      </p>
      <SectionBadge>대응 절차</SectionBadge>
      <Steps steps={RESPONSE_STEPS} />

      <Divider />

      <H2>2026년 포괄임금제 금지법 추진 현황</H2>
      <p style={body}>
        2025년 7월 근로기준법 개정안이 발의됐어요. 원칙적 금지 + 예외적 허용 방향으로 가고 있어요.
      </p>
      <BorderBox title="개정안 핵심 내용">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2.2 }}>
          <li>포괄임금제 <strong>원칙적 금지</strong></li>
          <li>예외 적용 시 <strong>고용노동부 장관 인가</strong> 필요</li>
          <li>근로자 대표와 <strong>사전 협의</strong> + 해당 근로자 <strong>명시적 동의</strong></li>
          <li>2026년 상반기 시행 목표로 추진 중</li>
        </ul>
      </BorderBox>

      <Divider />

      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />

      <RelatedArticles items={RELATED} />

      <Disclaimer text="이 글은 2026년 3월 기준 법령과 판례를 바탕으로 작성했어요. 개별 사안은 노무사나 변호사에게 상담하세요." />
    </ArticleLayout>
  );
}
