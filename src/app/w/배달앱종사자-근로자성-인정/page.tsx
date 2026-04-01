"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 배달앱으로 일하는데 근로자인지 개인사업자인지 모르겠고, 보호받을 수 있는지 궁금한 상황이에요.
// Q2. 자신의 근무 형태를 기준으로 근로자성 인정 가능성을 판단하고, 필요 시 노무사 상담을 받는 행동.
// Q3. 근로자성 판단 기준(종속성·자율성·전속성), 인정/불인정 유형, 플랫폼 노무제공자 제도, 대법원 판례.
// Q4. GreenBox(핵심) + EligibilityChecker(근로자성 자가진단) + BorderBox(판례 요약) + Checklist(증거 보관) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const WORKER_CHECK = [
  { id: "schedule", label: "출퇴근 시간이나 최소 근무시간이 정해져 있어요" },
  { id: "reject", label: "배달 거부 시 불이익(콜 배정 감소, 패널티)을 받아요" },
  { id: "route", label: "배달 순서나 경로를 회사(앱)가 지정해요" },
  { id: "exclusive", label: "한 플랫폼에서만 전속으로 일해요" },
  { id: "uniform", label: "유니폼·가방 등 장비를 회사가 지급하고 착용을 강제해요" },
  { id: "regular", label: "매일 또는 거의 매일 정기적으로 일해요" },
];

const EVIDENCE_CHECKLIST = [
  "매일 근무 시간·배달 건수·수입 내역 기록",
  "앱 화면 캡처 (배달 수락/거부, 배차 알림, 페널티 내역)",
  "회사에서 온 공지·규칙·메시지 보관",
  "동료 배달기사 연락처 (진술서 요청 가능)",
  "고용보험·산재보험 가입 여부 확인",
];

const FAQS = [
  { q: "계약서에 '위탁계약'이라고 써 있으면 근로자가 아닌가요?", a: "계약서 형식보다 실질이 중요해요. 실제로 출퇴근하고 지시받으면 위탁계약이어도 근로자로 인정될 수 있어요." },
  { q: "여러 배달앱을 동시에 쓰면 근로자 인정이 어렵나요?", a: "자율성이 높다는 증거가 돼서 근로자 인정이 어려워져요. 한 플랫폼에만 전속으로 일하면 종속성이 높아 유리해요." },
  { q: "근로자로 인정받으면 뭐가 달라지나요?", a: "최저임금, 퇴직금, 연차휴가, 산재보상을 받을 수 있어요. 부당해고 시 구제신청도 가능하고요." },
  { q: "근로자가 아니어도 산재보험 받을 수 있나요?", a: "네, 플랫폼 노무제공자로 인정받으면 산재보험·고용보험에 가입할 수 있어요. 근로기준법 보호는 못 받지만 최소한의 사회보험 혜택은 돼요." },
  { q: "알고리즘이 배달을 강제하면 종속성이 높은 건가요?", a: "네, 2024년 대법원이 플랫폼 알고리즘의 역할도 종속성 판단에 고려해야 한다고 했어요. 거부 시 페널티가 있으면 실질적 강제로 봐요." },
  { q: "근로자성 인정을 받으려면 소송을 해야 하나요?", a: "노동위원회 구제신청이나 법원 소송으로 가야 해요. 결과가 보장되지 않으니 노무사 상담을 먼저 받는 걸 권해요." },
];

const REFERENCES = [
  {
    category: "법령 및 판례",
    items: [
      { label: "근로기준법 (근로자 정의)", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "찾기쉬운 생활법령정보 — 배달앱종사자", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1589" },
      { label: "고용노동부 FAQ", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "배달기사-종합소득세-신고-납부", title: "배달기사 종합소득세 신고", description: "3.3% 떼인 세금 환급받는 방법이에요." },
  { slug: "부당해고-공인노무사-무료법률지원", title: "부당해고 무료 법률지원", description: "공인노무사·변호사 무료 상담을 받을 수 있어요." },
  { slug: "산재보험-가입대상-적용범위", title: "산재보험 가입 대상", description: "플랫폼 종사자 산재보험 적용 범위예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로·노동 · 플랫폼 · 근로자성</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        배달앱 기사, 근로자일까 사업자일까?<br />
        근로자성 판단 기준과 보호 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        배달 일 하면서 &quot;나는 근로자야, 사업자야?&quot; 헷갈리죠?
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>상 근로자로 인정받으면 최저임금·퇴직금·산재보상까지 보장돼요.
        계약서 형식이 아니라 실제 근무 형태로 판단하는데, 어떤 기준인지 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      {/* ── 섹션 1: 판단 기준 ── */}
      <H2>근로자인지 어떻게 판단하나요?</H2>
      <p style={body}>
        법원은 종속성·자율성·전속성을 종합적으로 봐요. 한 가지 기준으로 결정되지 않고,
        실제 근무 형태를 여러 각도에서 평가해요. 아래 항목에 해당하는 게 많을수록 근로자로 인정받을 가능성이 높아요.
      </p>

      <SectionBadge>근로자성 자가진단</SectionBadge>
      <EligibilityChecker
        items={WORKER_CHECK}
        allMatchText="근로자성이 인정될 가능성이 높아요. 노무사 상담을 받아보세요."
        partialMatchText="일부 요소가 해당돼요. 개별 사안에 따라 판단이 달라질 수 있어요."
      />

      <p style={body}>
        2024년 대법원은 플랫폼 알고리즘까지 종속성 판단에 고려해야 한다고 했어요.
        앱이 배달 순서를 지정하거나 거부 시 콜 배정을 줄이는 건 실질적 강제로 볼 수 있다는 거죠.
      </p>

      <RelatedArticles items={RELATED} />
      <Divider />

      {/* ── 섹션 2: 인정/불인정 유형 ── */}
      <H2>인정된 사례와 불인정된 사례 차이</H2>
      <p style={body}>
        같은 배달 일이라도 근무 조건에 따라 결과가 완전히 달라져요.
      </p>

      <GreenBox title="근로자로 인정된 경우">
        회사가 출퇴근 시간을 지정하고, 배달 거부 시 불이익을 줬어요.
        배달 경로를 회사가 정했고, 유니폼 착용이 강제였어요.
        한 회사에만 전속으로 매일 일했어요.
        → 2024년 대법원, 타다 드라이버를 근로자로 인정.
      </GreenBox>

      <BorderBox>
        <b>근로자 불인정 사례</b><br />
        원하는 시간에만 접속해서 일했어요. 배달 거부가 자유롭고 페널티가 없었어요.
        여러 플랫폼을 동시에 쓰고 있었고, 며칠씩 쉬어도 제재가 없었어요.
        → 2024년 서울중앙지법, 배달라이더를 근로자로 불인정.
      </BorderBox>

      <Divider />

      {/* ── 섹션 3: 플랫폼 노무제공자 ── */}
      <H2>근로자가 아니어도 보호받을 수 있나요?</H2>
      <p style={body}>
        근로기준법상 근로자가 아니어도 &lsquo;플랫폼 노무제공자&rsquo;로 인정받으면 산재보험·고용보험에 가입할 수 있어요.
        최저임금이나 퇴직금은 못 받지만, 배달 중 사고가 나면 산재 처리가 되고,
        일감이 끊기면 실업급여 형태의 급여도 받을 수 있어요.
      </p>

      <GreenBox title="플랫폼 노무제공자 혜택">
        산재보험 적용 (배달 중 사고 시 치료비·휴업급여)<br />
        고용보험 적용 (일감 상실 시 실업급여 형태 지급)<br />
        요건: 플랫폼 통해 일감 수령 + 본인이 직접 노무 제공 + 일정 소득 기준 충족
      </GreenBox>

      <Divider />

      {/* ── 섹션 4: 증거 확보 ── */}
      <H2>나중을 위해 뭘 챙겨둬야 하나요?</H2>
      <p style={body}>
        근로자성 인정은 소송이나 구제신청으로 가야 해요. 증거가 핵심이니
        지금부터 근무 기록을 꼼꼼히 남겨두세요.
      </p>

      <SectionBadge>증거 보관 체크리스트</SectionBadge>
      <Checklist items={EVIDENCE_CHECKLIST} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법·판례를 바탕으로 작성됐어요. 근로자성 판단은 개별 사안마다 다르니 노무사 상담을 권해요." />
    </ArticleLayout>
  );
}
