"use client";
// Q1. 실업급여 부정수급으로 적발됐거나 적발될까 불안한데, 반환금과 추가징수가 얼마나 나오는지 알고 싶은 상황이에요.
// Q2. 반환금·추가징수 규모를 파악하고, 자진신고 여부를 결정하거나, 환수 통보 후 분할납부 또는 이의신청을 하는 행동.
// Q3. 부정수급액 전액 반환 + 최대 5배 추가징수, 자진신고 시 추가징수 면제, 형사처벌 기준(5년 이하 징역/5천만원 이하 벌금), 분할납부·이의신청 방법.
// Q4. GreenBox(핵심 수치) + Steps(자진신고/대응 절차) + BorderBox(처벌 비교) + Checklist(자진신고 준비물) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const RESPONSE_STEPS = [
  { title: "환수 통보서 내용 확인", desc: "반환금과 추가징수액이 맞는지 꼼꼼히 살펴봐요. 부당하다고 생각되면 이의신청이 가능해요." },
  { title: "이의신청 (30일 이내)", desc: "통보받은 날부터 30일 이내에 고용센터에 이의신청서를 제출할 수 있어요. 증거 자료를 첨부하세요." },
  { title: "납부 계획 수립", desc: "한 번에 내기 어려우면 고용센터에 분할납부를 신청해요. 성실한 납부 계획이 있으면 법적 조치를 유예해주는 경우가 많아요." },
  { title: "자진신고 검토", desc: "아직 적발되지 않은 부정수급이 있다면 자진신고를 검토하세요. 적발 전 자진신고해야 추가징수 면제 혜택을 받을 수 있어요.", tip: "고용센터에서 조사를 시작한 뒤에는 자진신고 혜택 없어요" },
];

const SELF_REPORT_ITEMS = [
  "부정수급 기간 (언제부터 언제까지)",
  "부정수급 내용 (재취업 미신고, 알바 미신고 등)",
  "부정수급 금액 (받은 실업급여 총액)",
  "급여 이체 내역 또는 근무 기록 (증빙)",
  "고용센터 연락처 (1350 또는 관할 센터)",
];

const FAQS = [
  { q: "부정수급 들키면 얼마나 내야 하나요?", a: "받은 실업급여 전액을 반환하고, 그 금액의 최대 5배까지 추가 징수돼요. 예를 들어 500만원을 부정 수급했으면 반환금 500만원 + 추가징수 최대 2,500만원으로 총 3,000만원까지 가능해요." },
  { q: "자진신고하면 어떤 혜택이 있나요?", a: "적발 전 자진신고하면 최대 5배 추가징수를 면제받아요. 부정수급 원금만 반환하면 돼요. 형사처벌도 면제될 수 있어요. 다만 공모형이나 3년 내 반복 적발자는 면제 대상이 아니에요." },
  { q: "형사처벌은 어떻게 되나요?", a: "5년 이하 징역 또는 5,000만원 이하 벌금에 처해질 수 있어요. 형사처벌과 환수는 별개라서 벌금을 내더라도 반환금+추가징수는 따로 내야 해요." },
  { q: "분할납부가 가능한가요?", a: "가능해요. 고용24(ei.go.kr)에서 온라인 신청하거나 관할 고용센터를 방문해서 신청하면 돼요. 성실하게 분할 납부 계획을 세우면 법적 조치를 유예해주는 경우가 많아요." },
  { q: "실업급여 수급이 끝났으면 괜찮은가요?", a: "아니에요. 수급이 끝난 후에도 소멸시효(3년) 이내에 적발되면 반환 및 추가징수 대상이에요. 시간이 지났다고 안심할 수 없어요." },
  { q: "부정수급 환수율이 얼마나 되나요?", a: "국회예산정책처에 따르면 실업급여 부정수급 환수율은 약 60%대예요. 환수를 피할 수 없고, 미납하면 체납처분(재산 압류 등)이 이어져요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "고용보험법 (법제처)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용24 부정수급 안내", url: "https://www.ei.go.kr" },
      { label: "찾기쉬운 생활법령정보 실업급여 부정수급", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=5&cciNo=2&cnpClsNo=2" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급자격", title: "실업급여 받을 수 있는 조건", description: "부정수급 걱정 없이 정당하게 받는 조건이에요." },
  { slug: "실업급여-알바-미신고", title: "실업급여 알바 미신고 처벌", description: "알바하고 신고 안 하면 어떻게 되는지 정리했어요." },
  { slug: "실업급여-부정수급", title: "실업급여 부정수급 유형 정리", description: "어떤 행위가 부정수급에 해당하는지 확인하세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 실업급여 · 부정수급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 부정수급 반환, 얼마나 내야 하나요?<br />
        추가징수 5배와 자진신고 면제 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부정수급으로 적발되면 받은 실업급여를 전부 돌려줘야 해요. 거기서 끝이 아니에요.
        <a href="https://www.law.go.kr/법령/고용보험법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에 따르면 부정수급액의 최대 5배까지 추가 징수돼요.
        500만원을 거짓으로 받았다면 최대 3,000만원을 내야 하는 거예요.
        하지만 적발 전에 자진신고하면 추가징수를 면제받을 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>반환금과 추가징수, 얼마나 나오나요?</H2>
      <p style={body}>
        부정수급이 확정되면 두 가지 제재가 내려져요. 하나는 부정수급 원금 전액 반환, 다른 하나는 추가징수예요.
        2025년 기준 실업급여 부정수급 건수는 1만 7,246건, 금액은 230억원을 넘었어요.
      </p>

      <SectionBadge>부정수급 제재 규모</SectionBadge>
      <GreenBox title="핵심 수치">
        <p style={{ ...body, marginBottom: 6 }}><strong>반환</strong>: 부정수급 원금 100% 전액 반환</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>추가징수</strong>: 부정수급액의 최대 5배 이하 (고의성·금액·반복 여부에 따라 결정)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>형사처벌</strong>: 5년 이하 징역 또는 5,000만원 이하 벌금</p>
        <p style={{ ...body, marginBottom: 0 }}><strong>급여 중단</strong>: 적발 시점부터 남은 실업급여 전액 중단</p>
      </GreenBox>

      <p style={body}>
        실제로는 5배가 최대치이고, 상황에 따라 2~3배 수준에서 결정되는 경우가 많아요.
        고의성, 기간, 금액, 반성 정도를 종합적으로 고려해요.
        하지만 적발되면 반환은 피할 수 없고, 미납하면 재산 압류까지 이어져요.
      </p>

      <Divider />

      <H2>자진신고하면 추가징수 면제돼요</H2>
      <p style={body}>
        적발 전에 본인이 먼저 자진신고하면 최대 5배 추가징수를 면제받을 수 있어요.
        형사처벌도 면제될 수 있어요. 원금(부정수급액)만 반환하면 돼요.
      </p>

      <SectionBadge>자진신고 vs 적발 비교</SectionBadge>
      <BorderBox title="자진신고 혜택 비교 (부정수급 500만원 기준)">
        <p style={{ ...body, marginBottom: 8 }}><strong>자진신고한 경우</strong></p>
        <p style={{ ...body, marginBottom: 8 }}>반환금 500만원만 납부. 추가징수 면제. 형사처벌 면제 가능.</p>
        <p style={{ ...body, marginBottom: 8 }}><strong>적발된 경우</strong></p>
        <p style={{ ...body, marginBottom: 0 }}>반환금 500만원 + 추가징수 최대 2,500만원 = 최대 3,000만원. 형사처벌 별도.</p>
      </BorderBox>

      <p style={body}>
        자진신고가 안 되는 경우도 있어요. 다른 사람과 공모한 부정수급이거나, 최근 3년 내 부정수급으로 이미 적발된 적이 있으면 면제 대상이 아니에요.
        핵심은 "적발 전"이라는 타이밍이에요. 고용센터에서 조사를 시작한 뒤에는 자진신고 혜택이 없어요.
      </p>

      <Divider />

      <H2>환수 통보를 받았다면 이렇게 대응하세요</H2>
      <p style={body}>
        고용센터에서 부정수급을 적발하면 환수 결정 통보서를 보내요.
        여기에 반환금, 추가징수액, 납기일, 납부 방법이 전부 적혀 있어요.
      </p>

      <SectionBadge>대응 순서</SectionBadge>
      <Steps steps={RESPONSE_STEPS} />

      <Divider />

      <H2>자진신고할 때 준비할 것</H2>
      <p style={body}>
        지금 미신고 상태라면 하루라도 빨리 자진신고하는 게 유리해요.
        시간이 지날수록 부정수급 기간이 늘어나고, 적발 가능성도 높아져요.
        <a href="https://www.ei.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 온라인으로 신청하거나 고용센터(1350)에 전화하세요.
      </p>

      <SectionBadge>자진신고 준비물</SectionBadge>
      <Checklist items={SELF_REPORT_ITEMS} />

      <Divider />

      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 고용24 자료를 바탕으로 작성했어요. 개별 사안은 고용센터(1350)에 상담받으세요." />
    </ArticleLayout>
  );
}
