"use client";

// Q1. 회사 직원이 10명 넘었는데 취업규칙을 만들어야 한다고 들었거나, 기존 취업규칙을 변경해야 하는 사업주/인사담당자.
// Q2. 취업규칙을 법에 맞게 작성(변경)하고, 노동청에 신고하고, 사업장에 공지하는 행동.
// Q3. 10인 이상 기준, 필수 기재 사항 7가지, 변경 시 동의/의견 청취 기준, 노동청 신고 방법(온라인·오프라인), 미신고 과태료 500만원, 공지 의무.
// Q4. Steps(작성→변경→신고→공지 절차) + Checklist(필수 기재 사항) + GreenBox(핵심 규칙) + BorderBox(서류 목록) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, Steps, DocTable, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const REQUIRED_ITEMS = [
  "업무 시작·종료 시각, 휴게시간, 휴일, 휴가",
  "임금의 결정·계산·지급 방법, 임금 산정 기간과 지급 시기",
  "퇴직에 관한 사항",
  "퇴직급여, 상여, 최저임금에 관한 사항",
  "근로자 식비, 작업용품 등 부담에 관한 사항",
  "안전과 보건에 관한 사항",
  "교육, 표창, 재해 부조에 관한 사항",
];

const DOCS = [
  { name: "취업규칙 신고서", required: true, where: "고용노동부 홈페이지 서식 다운로드" },
  { name: "취업규칙 본문", required: true, where: "2부 제출 (원본 1부 반환)" },
  { name: "의견 청취서 또는 동의서", required: true, where: "근로자 서명·날인 필수" },
  { name: "사업자등록증 사본", required: false, where: "최초 신고 시에만" },
];

const PROCESS_STEPS = [
  { title: "취업규칙 작성", desc: "근로기준법 제93조에서 정한 필수 기재 사항 7가지를 빠짐없이 포함해요. 징계·보상 등 해당 제도가 있으면 함께 기재해요." },
  { title: "근로자 의견 청취 또는 동의", desc: "유리하거나 중립적 변경은 의견 청취만 하면 돼요. 불리한 변경(연차 축소, 임금 삭감 등)은 근로자 과반수 동의가 필수예요.", tip: "회의록·서명부·동의서 등 증빙은 반드시 서면 보관" },
  { title: "노동청 신고", desc: "고용노동부 민원마당(온라인) 또는 관할 지방고용노동청(방문·우편)으로 신고해요. 접수 후 신고필증을 발급받아요." },
  { title: "사업장 공지", desc: "게시판·인트라넷·사내 메신저 등에 올려서 근로자가 언제든 볼 수 있게 해요. 공지하지 않으면 효력이 없어요." },
];

const FAQS = [
  { q: "직원 몇 명부터 취업규칙을 만들어야 하나요?", a: "상시 근로자 10명 이상 사업장부터 의무예요. 정규직뿐 아니라 파트타임·계약직·일용직 모두 포함해서 최근 1개월 평균 10명 이상이면 해당돼요." },
  { q: "취업규칙 안 만들면 어떻게 되나요?", a: "500만원 이하 과태료가 부과돼요. 더 큰 문제는 분쟁 시 회사가 주장하는 규칙이 법적 효력을 못 갖는다는 거예요." },
  { q: "변경할 때 직원 동의 꼭 받아야 하나요?", a: "불리한 변경(임금 삭감, 연차 축소, 근무시간 증가 등)은 과반수 동의 필수예요. 유리한 변경은 의견 청취만 하면 돼요." },
  { q: "동의 없이 변경하면 어떻게 되나요?", a: "불리한 변경인데 동의 없이 바꿨으면 그 부분은 무효예요. 기존 취업규칙이 그대로 적용돼요." },
  { q: "온라인으로 신고할 수 있나요?", a: "네. 고용노동부 민원마당(minwon.moel.go.kr)에서 '취업규칙 신고'를 선택하고 서류를 업로드하면 돼요." },
  { q: "취업규칙과 근로계약서가 다르면 어떻게 되나요?", a: "근로계약서가 취업규칙보다 불리한 조건이면 그 부분은 무효예요. 취업규칙 수준이 최소 기준이 되는 거예요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "근로기준법(법제처)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 민원마당", url: "https://minwon.moel.go.kr" },
      { label: "정부24 취업규칙 신고", url: "https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A05004&CappBizCD=14900000128" },
    ],
  },
];

const RELATED = [
  { slug: "근로계약서-작성-방법", title: "근로계약서 작성 방법", description: "필수 기재 사항과 양식 안내예요." },
  { slug: "연차휴가-계산-방법", title: "연차휴가 계산 방법", description: "입사일 기준 연차 발생과 계산법이에요." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법", description: "평균임금 기준 퇴직금 산정법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동 · 인사</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        취업규칙, 어떻게 만들고 신고하나?
        <br />
        <span style={{ fontSize: 18, fontWeight: 500, color: "#555" }}>
          작성부터 변경·신고 절차까지
        </span>
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        직원이 10명 넘었는데 취업규칙을 만들라는 얘기를 들었나요?
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>에서 의무로 정하고 있어요.
        안 만들면 500만원 과태료, 분쟁 생기면 회사가 더 불리해지죠.
      </p>

      <Divider />

      <H2>취업규칙에 반드시 들어가야 할 내용은?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제93조</a>에서
        절대적 필수 기재 사항 7가지를 정하고 있어요. 하나라도 빠지면 취업규칙이 무효가 될 수 있어요.
      </p>
      <SectionBadge>필수 기재 사항 7가지</SectionBadge>
      <Checklist items={REQUIRED_ITEMS} />
      <p style={body}>
        징계 제도, 퇴직금 제도, 상여금 제도 등이 있으면 이것도 구체적으로 명시해야 해요. 징계 사유와 절차가 없으면 징계 자체가 무효가 될 수 있거든요.
      </p>

      <Divider />

      <H2>변경할 때 직원 동의가 필요한 경우는?</H2>
      <p style={body}>
        변경 내용이 근로자에게 유리한지 불리한지에 따라 절차가 달라져요.
      </p>
      <GreenBox title="변경 유형별 절차">
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2.2 }}>
          <li><strong>불리한 변경</strong> (임금 삭감, 연차 축소, 근무시간 증가) → 과반수 노동조합 또는 근로자 과반수의 <strong>동의</strong> 필수</li>
          <li><strong>유리하거나 중립적 변경</strong> (임금 인상, 연차 확대) → <strong>의견 청취</strong>만 하면 됨</li>
        </ul>
      </GreenBox>
      <p style={body}>
        동의나 의견 청취 증빙은 꼭 서면으로 남겨야 해요. 회의록, 서명부, 동의서 등이 나중에 핵심 증거가 돼요.
        동의 없이 불리하게 변경하면 그 부분은 효력이 없고, 기존 취업규칙이 그대로 적용돼요.
      </p>

      <Divider />

      <H2>작성부터 신고·공지까지 절차</H2>
      <p style={body}>
        취업규칙 작성(변경) → 의견 청취/동의 → 노동청 신고 → 사업장 공지, 이 4단계를 모두 거쳐야 법적 효력이 생겨요.
      </p>
      <SectionBadge>4단계 절차</SectionBadge>
      <Steps steps={PROCESS_STEPS} />

      <Divider />

      <H2>신고할 때 필요한 서류는?</H2>
      <p style={body}>
        <a href="https://minwon.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 민원마당</a>에서
        온라인 신고하거나, 관할 지방고용노동청에 방문·우편으로 제출해요.
      </p>
      <SectionBadge>제출 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <ArticleAd position="mid" />

      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />

      <RelatedArticles items={RELATED} />

      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성했어요. 구체적 사안은 관할 고용노동청이나 노무사에게 상담하세요." />
    </ArticleLayout>
  );
}
