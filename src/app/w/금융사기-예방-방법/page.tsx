"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 의심스러운 전화나 문자를 받았거나, 금융사기 뉴스를 보고 예방법을 알아두려는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 사기 유형을 구별하고, 의심 상황에서 즉시 대처(전화 끊기, 112·1332 신고)하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 3대 유형(보이스피싱·파밍·스미싱), 예방 수칙 5가지, 피해 시 대처 절차(112→지급정지→환급).
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → Checklist(예방 수칙) + Steps(피해 시 대처) + GreenBox(핵심 원칙) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd, Steps, Checklist,
  ArticleLayout,
} from "@/components/article-ui";

const PREVENTION_ITEMS = [
  "전화로 계좌번호·비밀번호·OTP 절대 알려주지 마세요",
  "출처 모르는 링크(문자·카톡) 클릭하지 마세요",
  "금융앱은 공식 앱스토어에서만 설치하세요",
  "공공기관은 전화로 돈을 요구하지 않아요 (100% 사기)",
  "가족 사칭 문자는 직접 전화해서 확인하세요",
  "스마트폰 보안 업데이트를 항상 최신으로 유지하세요",
];

const STEPS = [
  { title: "즉시 전화 끊기", desc: "의심되면 일단 전화를 끊으세요. 진짜 공공기관이면 다시 전화해도 돼요." },
  { title: "경찰 112 신고", desc: "보이스피싱 피해가 발생했다면 즉시 112에 신고하세요." },
  { title: "은행 지급정지 요청", desc: "돈을 보낸 은행 고객센터에 전화해서 해당 계좌 지급정지를 요청하세요.", tip: "빠를수록 돈을 돌려받을 확률이 높아져요." },
  { title: "금융감독원 1332 신고", desc: "금융감독원에도 피해 사실을 접수하세요. 피해금 환급 절차를 안내받을 수 있어요." },
  { title: "개인정보 노출 등록", desc: "금융감독원 개인정보노출자 사고예방시스템(pd.fss.or.kr)에 등록해서 추가 피해를 막으세요." },
];

const FAQS = [
  {
    q: "보이스피싱 피해금을 돌려받을 수 있나요?",
    a: "가능해요. 피해 사실을 신고하고 지급정지가 되면, 사기 계좌에 남은 돈에서 피해금을 환급받을 수 있어요. 다만 이미 인출된 금액은 환급이 어려울 수 있어요.",
  },
  {
    q: "검찰·경찰이라며 전화하면 어떻게 구별하나요?",
    a: "진짜 검찰이나 경찰은 전화로 계좌이체나 개인정보를 요구하지 않아요. 의심되면 전화를 끊고 해당 기관 대표번호로 직접 전화해서 확인하세요.",
  },
  {
    q: "문자 링크를 클릭해버렸는데 어떻게 하나요?",
    a: "즉시 스마트폰을 비행기 모드로 전환하고, 악성앱이 설치됐는지 확인하세요. 118(인터넷진흥원)에 전화하면 원격으로 점검해줘요.",
  },
  {
    q: "가족이 납치됐다며 돈을 요구하면요?",
    a: "전화를 끊지 말고 다른 전화기로 가족에게 직접 연락하세요. 대부분 가족은 안전해요. 그래도 연락이 안 되면 112에 바로 신고하세요.",
  },
  {
    q: "금융사기 예방 앱이 있나요?",
    a: "시티즌코난(경찰청), 후스콜(발신번호 확인) 같은 앱으로 의심 전화를 차단할 수 있어요. 통신사 스팸 차단 서비스도 무료로 신청 가능해요.",
  },
  {
    q: "노인 부모님 금융사기 예방은 어떻게 하나요?",
    a: "지연이체 서비스(이체 후 일정 시간 후 송금)를 신청해두세요. 출금한도를 낮춰두는 것도 방법이에요. 정기적으로 사기 수법을 알려드리는 게 가장 효과적이에요.",
  },
];

const REFERENCES = [
  {
    category: "공식 신고·예방 기관",
    items: [
      { label: "금융감독원 보이스피싱지킴이", url: "https://www.fss.or.kr/fss/bbs/B0000052/list.do?menuNo=200358" },
      { label: "금융감독원 개인정보노출 사고예방시스템", url: "https://pd.fss.or.kr" },
      { label: "경찰청 사이버수사국", url: "https://cyberbureau.police.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 사기예방</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        금융사기, 이것만 알면 안 당해요<br />
        유형별 예방법과 피해 대처 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "고객님 명의로 대포통장이 개설됐는데요." 이런 전화 받아보셨죠?
        금융사기는 예방이 최선이에요. 수법은 갈수록 교묘해지지만, 핵심 원칙만 기억하면 피할 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>금융사기 핵심 예방 수칙</H2>
      <p style={body}>
        <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a>이
        강조하는 가장 중요한 원칙이에요. 금융기관과 공공기관은 전화로 비밀번호나 계좌이체를 절대 요구하지 않아요.
      </p>

      <GreenBox>
        <strong>금융사기 예방 원칙 3가지</strong><br />
        1. 전화로 돈·개인정보 요구 = 100% 사기<br />
        2. 출처 모르는 링크 = 절대 클릭 금지<br />
        3. 의심되면 끊고, 112 또는 1332로 확인
      </GreenBox>

      <SectionBadge>예방 수칙 체크리스트</SectionBadge>
      <Checklist items={PREVENTION_ITEMS} />

      <Divider />

      <H2>주요 금융사기 유형은 뭔가요?</H2>
      <p style={body}>
        크게 보이스피싱, 파밍, 스미싱 3가지예요.
        어떤 수법인지 알아야 당하지 않아요.
      </p>

      <BorderBox title="3대 금융사기 유형">
        <strong>보이스피싱</strong>: 전화로 공공기관·금융회사를 사칭, 돈이나 개인정보를 빼앗는 수법<br /><br />
        <strong>파밍</strong>: 가짜 금융 사이트로 유도해서 로그인 정보를 훔치는 수법<br /><br />
        <strong>스미싱</strong>: 문자 메시지 링크를 클릭하면 악성앱이 설치되는 수법
      </BorderBox>

      <Divider />

      <H2>이미 피해를 당했다면 어떻게 하나요?</H2>
      <p style={body}>
        시간이 생명이에요. 1분이라도 빨리 신고하면 돈을 돌려받을 확률이 올라가요.
        아래 순서대로 즉시 행동하세요.
      </p>

      <SectionBadge>피해 시 대처 순서</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 금융감독원 자료를 바탕으로 작성됐어요. 피해 발생 시 즉시 112(경찰) 또는 1332(금융감독원)에 신고하세요." />
    </ArticleLayout>
  );
}
