"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 회사에서 갑자기 무급휴가를 통보받고 월급이 끊길 위기에 처한 상황이에요.
// Q2. 무급휴가를 거부하고 휴업수당(평균임금 70%)을 청구하거나 노동청에 진정을 제기하는 행동.
// Q3. 위법 근거(근로기준법 제46조), 휴업수당 70% 계산, 노동청 진정 절차, 부당해고 구제신청, 증거 확보 방법.
// Q4. GreenBox(핵심) + Steps(대응 절차) + Checklist(증거 확보) + BorderBox(처벌 기준) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const RESPONSE_STEPS = [
  { title: "서면으로 거부 의사 표시", desc: "\"무급휴가에 동의하지 않습니다\"를 이메일 또는 내용증명으로 보내요. 카카오톡도 가능하지만 대화 캡처를 보관하세요.", tip: "구두로만 말하면 나중에 '합의했다'고 주장당할 수 있어요." },
  { title: "휴업수당 서면 요청", desc: "회사에 평균임금 70% 휴업수당 지급을 서면으로 요청해요. 근로기준법 제46조를 근거로 명시하세요." },
  { title: "고용노동부 진정 제기", desc: "회사가 거부하면 고용노동부 민원마당에서 임금체불(휴업수당 미지급) 진정을 넣어요. 1350에 먼저 전화 상담도 가능해요.", tip: "진정 접수 후 2주 내 근로감독관이 배정돼요." },
  { title: "부당해고 구제신청 (해고 시)", desc: "무급휴가 거부를 이유로 해고됐다면 해고일 3개월 이내에 노동위원회에 구제신청해요." },
];

const EVIDENCE_CHECKLIST = [
  "무급휴가 통보 문자·이메일·사내공지문 캡처",
  "거부 의사 표시한 이메일·내용증명 사본",
  "근로계약서, 임금명세서, 출퇴근 기록",
  "동료 근로자 진술서 (같은 상황이면 집단 대응 가능)",
  "녹음 파일 (통화 녹음은 일방 당사자 동의로 합법)",
];

const FAQS = [
  { q: "동의서에 서명했는데 취소할 수 있나요?", a: "강압적 분위기에서 받은 동의는 무효예요. 서명 당시 자유로운 의사결정이 아니었음을 증명하면 취소할 수 있어요." },
  { q: "무급휴가 중에도 4대보험은 유지되나요?", a: "네, 근로관계가 지속되니까 4대보험 자격은 그대로예요. 보험료도 계속 납부돼야 해요." },
  { q: "휴업수당은 정확히 얼마예요?", a: "평균임금(퇴직 전 3개월 임금 평균)의 70%예요. 월 300만원이면 210만원이에요. 다만 통상임금의 70%를 초과할 수 없어요." },
  { q: "회사가 경영난이면 무급휴가가 정당한가요?", a: "경영난이어도 근로자 동의 없이 강제하면 위법이에요. 경영 사정은 휴업수당 지급 의무를 면제해주지 않아요." },
  { q: "노동청 진정하면 보복 당하지 않나요?", a: "신고를 이유로 불이익을 주면 부당노동행위로 추가 처벌받아요. 근로기준법 제104조가 보호해요." },
  { q: "휴업수당 안 주면 사업주 처벌이 어떻게 되나요?", a: "2년 이하 징역 또는 2,000만원 이하 벌금이에요. 미지급 휴업수당에 연 20% 지연이자도 붙어요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "근로기준법 제46조 (휴업수당)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 민원마당", url: "https://minwon.moel.go.kr" },
      { label: "중앙노동위원회 (구제신청)", url: "https://www.nlrc.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "부당해고-공인노무사-무료법률지원", title: "부당해고 무료 법률지원", description: "공인노무사·변호사 무료 상담 받는 방법이에요." },
  { slug: "휴업수당-계산-방법", title: "휴업수당 계산 방법", description: "평균임금 70% 계산법을 상세히 알려드려요." },
  { slug: "부당해고-구제신청-절차", title: "부당해고 구제신청 절차", description: "노동위원회 구제신청서 작성부터 판정까지 안내해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 부당처우 · 대응</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        회사가 무급휴가를 강요한다면?<br />
        거부 방법과 휴업수당 청구 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;다음 주부터 무급으로 쉬세요&quot; 통보받으셨나요? 근로자 동의 없는 무급휴가 강요는
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제46조</a> 위반이에요.
        거부할 권리가 있고, 평균임금의 70%를 휴업수당으로 받을 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      {/* ── 섹션 1: 위법 근거 ── */}
      <H2>무급휴가 강요, 왜 위법인가요?</H2>
      <p style={body}>
        회사 사정으로 근로자를 쉬게 하는 건 법적으로 &lsquo;휴업&rsquo;이에요.
        휴업 시에는 평균임금의 70% 이상을 휴업수당으로 줘야 해요.
        무급으로 처리하면 휴업수당 미지급이라 근로기준법 위반이죠.
      </p>
      <p style={body}>
        &quot;경영이 어려우니 협조해달라&quot;고 해도 동의 없이 강제할 수 없어요.
        동의서에 서명했더라도 강압적 분위기에서 받은 동의는 법적으로 무효예요.
        거부했다고 해고하면 부당해고에 해당되고요.
      </p>

      <GreenBox title="핵심 정리">
        근로자 동의 없는 무급휴가 = 근로기준법 제46조 위반<br />
        휴업수당: 평균임금의 70% (월 300만원이면 210만원)<br />
        미지급 시: 2년 이하 징역 또는 2,000만원 이하 벌금<br />
        거부 후 해고 시: 부당해고 → 노동위원회 구제신청
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      {/* ── 섹션 2: 대응 절차 ── */}
      <H2>거부하고 휴업수당 받는 절차</H2>
      <p style={body}>
        서면으로 거부 의사를 먼저 밝히고, 회사가 무시하면 노동청에 진정을 넣는 순서예요.
        증거가 핵심이니 문자·이메일·녹음을 반드시 남기세요.
      </p>

      <SectionBadge>대응 절차 4단계</SectionBadge>
      <Steps steps={RESPONSE_STEPS} />

      <p style={body}>
        노동청에 진정을 접수하면 근로감독관이 사업주에게 휴업수당 지급 명령을 내려요.
        14일 내에 지급해야 하고, 불응하면 검찰 송치까지 갈 수 있어요.
      </p>

      <Divider />

      {/* ── 섹션 3: 처벌과 지연이자 ── */}
      <H2>사업주 처벌 수위는 어느 정도인가요?</H2>
      <p style={body}>
        휴업수당 미지급은 형사처벌 대상이에요. 밀린 금액과 별개로 지연이자까지 붙어요.
      </p>

      <BorderBox>
        <b>형사처벌</b>: 2년 이하 징역 또는 2,000만원 이하 벌금<br /><br />
        <b>지연이자</b>: 미지급 기간에 대해 연 20% 지연이자 부과<br /><br />
        <b>실제 사례</b>: 2025년 서울중앙지법, 6개월간 휴업수당 미지급 사업주에게 벌금 500만원 선고
      </BorderBox>

      <Divider />

      {/* ── 섹션 4: 증거 확보 ── */}
      <H2>어떤 증거를 챙겨야 하나요?</H2>
      <p style={body}>
        노동청 진정이든 노동위원회 구제신청이든 증거가 승패를 결정해요.
        아래 항목을 지금 바로 확보해두세요.
      </p>

      <SectionBadge>증거 체크리스트</SectionBadge>
      <Checklist items={EVIDENCE_CHECKLIST} />

      <p style={body}>
        동료도 같은 상황이라면 집단으로 대응하는 게 효과적이에요.
        여러 명이 함께 진정하면 사업주에게 더 강한 압박이 돼요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 개별 사안은 고용노동부 1350에 문의하세요." />
    </ArticleLayout>
  );
}
