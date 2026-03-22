"use client";

// Q1: 자진퇴사했거나 퇴사 예정인데 구직급여를 받을 수 있는지 모르는 상황
// Q2: 정당 사유를 증빙해서 고용센터에서 구직급여 수급자격 인정
// Q3: 정당 사유 6가지, 청년 자발퇴사 실업급여(2026 신규), 신청 절차, 대기기간·급여제한, 증거 준비
// Q4: GreenBox(정당사유 요약) + Steps(신청 절차) + CompareTable(자진퇴사 vs 권고사직) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { CompareTable } from "@/components/article-ui/CompareTable";

const COMPARE_ROWS = [
  { label: "퇴사 주체", optionA: "본인이 먼저 퇴사 의사 표시", optionB: "회사가 먼저 퇴사 권유" },
  { label: "구직급여 수급", optionA: "정당 사유 증명 필요", optionB: "바로 수급 가능" },
  { label: "급여제한 기간", optionA: "정당 사유 없으면 1개월", optionB: "없음" },
  { label: "증거 준비", optionA: "본인이 직접 준비", optionB: "이직확인서로 자동 인정" },
  { label: "회사와의 관계", optionA: "원만하게 마무리 가능", optionB: "회사 부담이 커서 거부할 수 있음" },
];

const STEPS = [
  {
    title: "퇴사 전 고용센터 사전 상담",
    desc: "퇴사하기 전에 관할 고용센터에서 상담받으세요. 내 사유가 정당 사유로 인정될 가능성이 있는지 미리 확인할 수 있어요. 사전 상담받은 분의 70% 이상이 인정받았어요.",
  },
  {
    title: "증거 자료 수집",
    desc: "급여명세서, 근로계약서, 의사 소견서, 문자·이메일 기록 등 정당 사유를 증명할 자료를 모아요. 퇴사 후에는 자료 확보가 어려우니 퇴사 전에 준비하세요.",
  },
  {
    title: "퇴사 후 워크넷 구직등록 + 온라인 교육",
    desc: "퇴사 후 워크넷에 구직등록하고 고용24에서 수급자격 신청자 온라인 교육을 수강해요. 교육 후 14일 이내에 고용센터를 방문해야 해요.",
    link: { label: "고용24 온라인 교육", href: "https://www.ei.go.kr" },
  },
  {
    title: "고용센터 방문 및 수급자격 신청",
    desc: "신분증, 증거 자료를 가지고 관할 고용센터에 방문해서 수급자격을 신청해요. 정당 사유를 설명하고 자료를 제출하면 심사가 시작돼요.",
  },
  {
    title: "심사 결과 확인 (2~4주)",
    desc: "고용센터에서 사실 관계를 조사해요. 정당 사유로 인정되면 7일 대기 후 바로 받고, 불인정되면 90일 이내 이의신청할 수 있어요.",
  },
];

const CHECKLIST = [
  "임금체불 증거 (급여명세서, 통장 내역)",
  "근로계약서 원본 또는 사본",
  "직장 내 괴롭힘 증거 (문자, 녹취, 진술서)",
  "의사 소견서 (건강 문제인 경우)",
  "사업장 이전 공문 (통근 곤란인 경우)",
  "육아휴직 거부 증거 (임신·육아인 경우)",
];

const FAQS = [
  {
    q: "자진퇴사하면 무조건 1개월 기다려야 하나요?",
    a: "정당 사유로 인정되면 급여제한 1개월이 없어져요. 7일 대기만 거치고 바로 받을 수 있어요. 200~300만원 차이가 나니까 정당 사유 증명이 중요해요.",
  },
  {
    q: "2026년 청년 자발퇴사 실업급여가 뭔가요?",
    a: "만 18~34세 청년이 커리어 전환 목적으로 자발 퇴사해도 생애 1회 실업급여를 받을 수 있는 제도예요. 2026년 3월 31일부터 시행됐어요. 구직촉진수당 월 60만원을 최대 6개월 받아요.",
  },
  {
    q: "회사가 이직확인서를 안 써주면요?",
    a: "고용센터에 직접 신청하면 돼요. 회사가 14일 이내에 제출 안 하면 과태료가 부과돼요.",
  },
  {
    q: "임금체불 3개월인데 증거가 통장 내역밖에 없어요",
    a: "통장 내역만으로도 충분해요. 급여가 안 들어온 게 확인되면 정당 사유로 인정받을 수 있어요. 급여명세서가 있으면 더 확실하고요.",
  },
  {
    q: "정당 사유 불인정 시 이의신청하면 받을 확률은요?",
    a: "통계상 이의신청의 약 40%가 인정받아요. 추가 증거를 보완해서 제출하면 확률이 올라가요. 노무사 상담을 받으면 더 좋아요.",
  },
  {
    q: "권고사직을 회사에 요구하는 게 나은가요?",
    a: "정당 사유가 명확하면 자진퇴사로 진행해도 문제없어요. 권고사직을 억지로 요구하면 회사와 관계만 나빠질 수 있어요. 증거를 철저히 준비하는 게 현실적이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "고용보험법 시행령 제101조", url: "https://www.law.go.kr/법령/고용보험법시행령" },
    ],
  },
  {
    category: "공식 서비스",
    items: [
      { label: "고용24 (실업급여 신청)", url: "https://www.ei.go.kr" },
      { label: "워크넷 (구직등록)", url: "https://www.work.go.kr" },
      { label: "고용노동부", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "실업급여-수급-조건", title: "실업급여 수급 조건", description: "구직급여를 받기 위한 기본 자격 조건이에요." },
  { slug: "임금체불-진정-신고-방법", title: "임금체불 신고 방법", description: "임금을 못 받았을 때 노동부에 진정 넣는 절차예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 실업급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        스스로 사표 쓰고 구직급여 받을 수 있을까?<br />
        정당 사유와 신청 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;자진퇴사는 실업급여 안 된다&rdquo;는 말 때문에 걱정하고 계시죠?
        정당한 사유가 있으면 가능해요.
        <a href="https://www.law.go.kr/법령/고용보험법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행령</a>에서
        정한 정당 사유에 해당하면 자진퇴사여도 <a href="/w/실업급여-수급-조건" style={{ color: "#1D9E75" }}>구직급여</a>를 받을 수 있어요.
        2026년 3월부터는 만 34세 이하 청년의 자발적 퇴사도 생애 1회 지원 대상이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>정당 사유 6가지, 이 중 하나면 돼요</H2>
      <p style={body}>
        고용센터에서 아래 사유 중 하나를 인정받으면 급여제한 없이 구직급여를 받을 수 있어요.
        핵심은 증거예요. 증거가 확실할수록 인정률이 높아지죠.
      </p>

      <GreenBox>
        <strong>자진퇴사 정당 사유 6가지</strong><br /><br />
        1. 임금체불·퇴직금 미지급 (2개월 이상 또는 30% 이상)<br />
        2. 근로계약서와 실제 업무가 다를 때<br />
        3. 직장 내 괴롭힘·성희롱·성폭력<br />
        4. 건강 문제로 근무 불가 (의사 소견서 필요)<br />
        5. 임신·출산·육아 문제 (육아휴직 거부 포함)<br />
        6. 사업장 이전으로 왕복 3시간 이상 통근
      </GreenBox>

      <p style={body}>
        임금체불이 가장 흔한 사유예요. 통장 내역에 급여가 안 들어온 게 확인되면 인정률이 83%에 달해요.
        직장 내 괴롭힘은 문자나 녹취록이 증거가 돼요.
      </p>

      <CategoryButton label="근로·실업급여 정보" count={5} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>자진퇴사 vs 권고사직, 뭐가 유리한가요?</H2>
      <p style={body}>
        회사에서 권고사직을 해주겠다고 하면 받는 게 편하긴 해요. 하지만 거절당할 수도 있죠.
        정당 사유가 명확하면 자진퇴사로 진행해도 결과는 같아요.
      </p>

      <SectionBadge>자진퇴사 vs 권고사직</SectionBadge>
      <CompareTable titleA="자진퇴사" titleB="권고사직" rows={COMPARE_ROWS} />

      <Divider />

      <H2>신청 절차, 퇴사 전부터 준비하세요</H2>
      <p style={body}>
        퇴사 후 12개월 이내에 신청해야 해요. 퇴사 전에 증거를 모아두는 게 가장 중요해요.
        퇴사 후에는 회사 자료에 접근하기 어렵거든요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>증거 준비 체크리스트</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴사 전에 아래 자료를 미리 확보해두세요. 고용센터 심사에서 증거가 핵심이에요.
      </p>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 시행령을 바탕으로 작성됐어요. 개별 사안은 관할 고용센터 상담을 통해 정확히 확인하세요." />
    </ArticleLayout>
  );
}
