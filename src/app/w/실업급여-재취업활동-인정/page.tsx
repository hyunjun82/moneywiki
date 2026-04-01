"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// Q1: 실업급여 받는 중인데 어떤 활동이 재취업활동으로 인정되는지 모르는 수급자
// Q2: 인정되는 활동과 안 되는 활동을 구분하고, 증빙 방법까지 파악해서 실업인정 받기
// Q3: 인정 활동 종류, 불인정 활동, 횟수 기준(1~2차 1회, 3차~ 2회), 증빙 방법
// Q4: GreenBox(인정 기준 요약) + BorderBox(인정 vs 불인정 비교) + Checklist + FAQ

const CHECKLIST = [
  "워크넷 입사지원 → 자동 연동 (별도 증빙 불필요)",
  "사람인·잡코리아 → 지원확인서 출력 보관",
  "기업 채용사이트 직접 지원 → 지원완료 화면 캡처",
  "면접 참석 → 면접확인서 수령 (회사 직인 필요)",
  "직업훈련·내일배움카드 → 수료증 제출",
  "채용박람회 → 참가확인서 수령",
  "같은 회사 같은 공고 반복 지원 금지 (1회만 인정)",
];

const FAQS = [
  { q: "워크넷 말고 사람인, 잡코리아도 인정되나요?", a: "네, 모든 채용사이트 지원이 인정돼요. 워크넷은 자동 연동되고, 민간 사이트는 지원확인서를 출력하거나 화면을 캡처해두면 돼요." },
  { q: "같은 날 여러 회사에 지원하면 여러 번 인정되나요?", a: "네, 각각 별도로 인정돼요. 같은 날 3개 회사에 지원하면 3회로 인정돼요. 단, 같은 회사 같은 공고에 반복 지원은 1회만이에요." },
  { q: "면접에서 떨어져도 구직활동으로 인정되나요?", a: "합격 여부와 관계없이 면접 참석 자체가 구직활동이에요. 면접확인서를 받아두세요." },
  { q: "채용공고 검색만 해도 인정되나요?", a: "아니에요. 단순 검색이나 이력서 수정만으로는 인정 안 돼요. 실제로 입사지원을 해야 구직활동으로 인정돼요." },
  { q: "구직활동 횟수가 부족하면 어떻게 되나요?", a: "해당 차수의 실업급여가 지급되지 않아요. 다음 실업인정일까지 부족한 횟수를 채우면 지급받을 수 있어요." },
  { q: "65세 이상이면 기준이 완화되나요?", a: "65세 이상 고령자, 장애인, 임산부, 만성질환자는 구직활동 횟수가 완화 적용돼요. 1회만으로 인정되는 경우가 있어요." },
];

const REFERENCES = [
  {
    category: "공식 사이트",
    items: [
      { label: "고용보험: 실업급여 안내", url: "https://www.ei.go.kr" },
      { label: "워크넷: 구직활동 등록", url: "https://www.work.go.kr" },
      { label: "고용노동부: 고용보험 제도", url: "https://www.moel.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 실업급여 · 구직활동</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 재취업활동, 뭐가 인정되고 뭐가 안 되나?<br />
        인정 기준과 증빙 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        <a href="/w/실업급여-수급-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여</a>를 받으려면 적극적인 재취업활동을 해야 해요.
        어떤 활동이 인정되고, 어떤 건 안 되는지 헷갈리는 분이 많죠.
        인정되는 활동과 안 되는 활동, 증빙 방법까지 한 번에 정리했어요.
      </p>

      <Divider />

      <H2>인정되는 활동은 뭐가 있나요?</H2>
      <p style={body}>
        구직활동, 직업훈련, 창업 준비 세 가지 카테고리로 나뉘어요.
        핵심은 '실제 행동'이 있어야 한다는 거예요. 검색이나 수정만으로는 안 돼요.
      </p>

      <GreenBox title="인정되는 구직활동">
        온라인 입사지원 (워크넷, 사람인, 잡코리아, 원티드 등 모든 사이트)<br />
        이력서 제출 (방문, 우편, 이메일)<br />
        면접 참석 (화상면접 포함, 합격 여부 무관)<br />
        채용설명회·직업박람회 참가<br />
        내일배움카드 훈련, 국비지원 교육, 고용센터 직업상담<br />
        창업교육·사업계획서 작성·창업박람회 참가
      </GreenBox>

      <Divider />

      <H2>인정 안 되는 활동은요?</H2>
      <p style={body}>
        채용공고 검색, 이력서 수정, 취업사이트 가입 같은 건 구직활동이 아니에요.
        실제로 지원을 해야 인정돼요. 허위 입사지원은 부정수급으로 처벌받아요.
      </p>

      <BorderBox>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8, color: "#dc2626" }}>절대 인정 안 되는 것</p>
        <p style={{ ...body, marginBottom: 4 }}>채용공고 검색만 한 경우</p>
        <p style={{ ...body, marginBottom: 4 }}>이력서 수정만 한 경우 (제출해야 인정)</p>
        <p style={{ ...body, marginBottom: 4 }}>취업사이트 가입만 한 경우</p>
        <p style={{ ...body, marginBottom: 4 }}>구인광고 스크랩만 한 경우</p>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8, marginTop: 12, color: "#dc2626" }}>부정수급 처벌 대상</p>
        <p style={{ ...body, marginBottom: 0 }}>허위 입사지원, 같은 회사 같은 공고 반복 지원</p>
      </BorderBox>

      <Divider />

      <H2>실업인정 횟수는 몇 회예요?</H2>
      <p style={body}>
        1~2차 실업인정: 1회 이상 구직활동이면 돼요.
        3차 이후부터는 2회 이상 해야 해요.
        장기수급자(6개월 이상)도 2회 이상이에요.
      </p>
      <p style={body}>
        65세 이상 고령자, 장애인, 임산부, 만성질환자는 횟수가 완화돼요.
        1회만으로 인정되는 경우가 있으니 고용센터에 확인하세요.
      </p>

      <GreenBox title="실업인정 횟수 기준">
        1~2차: 1회 이상 | 3차 이후: 2회 이상<br />
        고령자·장애인·임산부·만성질환자: 완화 적용
      </GreenBox>

      <Divider />

      <H2>증빙은 어떻게 하나요?</H2>
      <p style={body}>
        워크넷은 지원 내역이 자동 연동돼서 별도 증빙이 필요 없어요.
        사람인, 잡코리아 같은 민간 사이트는 지원확인서를 출력해야 해요.
        면접은 면접확인서(회사 직인), 교육은 수료증을 제출하면 돼요.
      </p>

      <SectionBadge>증빙 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        실업급여 재취업활동 인정 관련 실제 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법을 바탕으로 작성됐어요. 세부 기준은 관할 고용센터(1350)에서 확인하세요." />
    </div>
  );
}
