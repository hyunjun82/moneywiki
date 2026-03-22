"use client";

// Q1. 상사나 동료에게 괴롭힘당하고 있는데 어떻게 대응해야 할지 모르는 상황이에요.
// Q2. 증거를 확보한 뒤 회사 내부 또는 고용노동부에 신고하고, 보호 조치를 받을 수 있어요.
// Q3. 괴롭힘 판단 기준(근로기준법 76조의2), 증거 확보 방법, 신고 경로(회사·노동청·1350), 신고자 보호(3년 징역/3천만원 벌금), 외부 지원 기관.
// Q4. GreenBox(괴롭힘 판단 기준) + Steps(대응 절차) + Checklist(증거 목록) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "신고하면 보복당하지 않나요?",
    a: "신고자를 불리하게 대우하면 3년 이하 징역 또는 3천만원 이하 벌금이에요. 익명 신고도 가능하고, 법으로 보호받으니 걱정하지 마세요.",
  },
  {
    q: "증거가 없어도 신고할 수 있나요?",
    a: "네, 가능해요. 회사에 조사 의무가 있으니 신고 접수만 해도 조사가 시작돼요. 다만 증거가 있으면 훨씬 유리해요.",
  },
  {
    q: "정당한 업무 지시와 괴롭힘의 차이는 뭔가요?",
    a: "업무상 적정 범위를 넘어 신체적·정신적 고통을 주거나 근무환경을 악화시키면 괴롭힘이에요. 야근 지시, 사실 기반 성과 면담은 정당한 지시예요.",
  },
  {
    q: "회사가 조사를 안 하면 어떡하나요?",
    a: "고용노동부(1350)에 직접 신고하세요. 회사가 신고 접수 후 조사 의무를 이행하지 않으면 1천만원 이하 과태료를 받아요.",
  },
  {
    q: "민사소송으로 손해배상도 받을 수 있나요?",
    a: "네. 정신적 피해에 대한 위자료, 치료비, 휴업 손해 등을 가해자와 회사에 청구할 수 있어요. 대한법률구조공단(132)에서 무료 상담 가능해요.",
  },
  {
    q: "산재 신청도 가능한가요?",
    a: "직장 내 괴롭힘으로 인한 정신질환(우울증, 적응장애 등)은 산업재해로 인정받을 수 있어요. 근로복지공단에 신청하세요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "근로기준법 제76조의2 (법제처)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "고용노동부 직장 내 괴롭힘 매뉴얼", url: "https://www.moel.go.kr/policy/policydata/view.do?bbs_seq=20230500514" },
      { label: "직장 내 괴롭힘 대처 (생활법령)", url: "https://www.easylaw.go.kr/CSP/OnhunqueansInfoRetrieve.laf?onhunqnaAstSeq=82&onhunqueSeq=5876" },
    ],
  },
];

const RELATED = [
  { slug: "구직급여-지급-제한-해제", title: "구직급여 지급 제한 해제", description: "퇴사 후 실업급여 제한 걸려도 해제받을 수 있어요." },
  { slug: "긴급복지-생계지원금-신청-방법", title: "긴급복지 생계지원금", description: "갑작스러운 퇴사로 생계가 어려우면 긴급복지도 확인하세요." },
];

const STEPS = [
  { title: "증거 확보", desc: "문자·이메일 캡처, 대화 녹음, CCTV, 목격자 진술 등을 실시간으로 모아요.", tip: "병원 진료 기록(진단서·처방전)도 중요한 증거예요" },
  { title: "회사 내부 신고", desc: "인사팀, 고충처리위원회, 윤리경영실 등에 신고서를 작성해서 증거와 함께 제출해요." },
  { title: "고용노동부 신고 (회사가 안 움직이면)", desc: "고용노동부 홈페이지 민원 신청, 가까운 노동청 방문, 또는 1350 전화로 신고해요. 익명 가능해요." },
  { title: "분리 조치·조사", desc: "회사는 피해자와 가해자를 분리(부서 이동·유급휴가)하고 사실 조사를 해야 해요." },
  { title: "결과 조치", desc: "괴롭힘 인정 시 가해자 징계(경고~해고), 피해자 보호 조치(근무환경 개선·상담 지원)가 이뤄져요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 괴롭힘 · 신고</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        직장 내 괴롭힘 당했다면?<br />
        신고 방법부터 보호 조치까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "상사가 매일 욕하고 업무에서 빼는데 참아야 하나요?" 아니에요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제76조의2</a>에 따라
        직장 내 괴롭힘은 법으로 금지돼요.
        회사에 신고하거나 고용노동부에 직접 신고할 수 있고, 신고자는 법으로 보호받아요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>어떤 행동이 직장 내 괴롭힘인가요?</H2>

      <GreenBox>
        직장 내 괴롭힘 판단 기준 (근로기준법 제76조의2)<br />
        · 직장에서의 지위·관계 <strong>우위를 이용</strong><br />
        · 업무상 <strong>적정 범위를 넘어</strong><br />
        · 신체적·정신적 <strong>고통</strong>을 주거나 근무환경을 <strong>악화</strong>
      </GreenBox>

      <p style={body}>
        업무와 무관한 심부름 강요, 폭언·인격 모독, 업무 배제·따돌림, 과도한 업무 부여, 사생활 침해가 해당돼요.
        반면 정당한 업무 지시, 사실 기반 성과 평가, 회사 규정에 따른 징계는 괴롭힘이 아니에요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>괴롭힘 대응, 이 순서로 하세요</H2>
      <p style={body}>
        증거부터 모으고, 신고하면 돼요. 회사가 안 움직이면 고용노동부에 직접 신고할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>증거, 이걸 모아두세요</H2>
      <p style={body}>
        증거가 많을수록 유리해요. 실시간으로 모으는 게 중요해요.
      </p>

      <Checklist items={[
        "문자·카톡·이메일 캡처 (괴롭힘 내용이 담긴 것)",
        "대화 녹음 (녹음은 당사자 동의 없어도 합법)",
        "목격자 진술 (동료 연락처)",
        "CCTV 영상 (해당 시)",
        "병원 진단서·처방전 (정신과 진료 포함)",
        "괴롭힘 일지 (날짜·시간·장소·내용·목격자 기록)",
      ]} />

      <Divider />

      <H2>외부 도움을 받을 수 있는 곳</H2>

      <BorderBox title="무료 상담·지원 기관">
        · 고용노동부 상담센터: <strong>1350</strong> (근로감독·신고 접수)<br />
        · 직장갑질119: 카카오톡 무료 상담 (민간 공익단체)<br />
        · 대한법률구조공단: <strong>132</strong> (무료 법률 상담)<br />
        · 정신건강복지센터: <strong>1577-0199</strong> (심리 상담)<br />
        · 공인노무사 무료 지원: 월평균 임금 300만원 미만 대상
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 법률 자문이 아니며, 개별 상황에 따라 판단이 달라질 수 있어요. 구체적 상담은 고용노동부(1350)나 노무사에게 문의하세요." />
    </ArticleLayout>
  );
}
