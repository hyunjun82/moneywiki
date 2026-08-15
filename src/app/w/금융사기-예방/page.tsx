"use client";
// Q1. 보이스피싱·스미싱을 당하거나 당할 뻔해서, 예방법과 피해 시 대처법이 궁금한 상황이에요.
// Q2. 금융사기 유형을 구분하고, 예방 수칙을 지키며, 피해 발생 시 즉시 신고·지급정지하는 행동.
// Q3. 사기 유형(보이스피싱·파밍·스미싱), 예방 수칙, 피해 시 신고번호(112·1332), 지급정지 절차.
// Q4. Checklist(예방 수칙) + Steps(피해 시 대처) + GreenBox(핵심 요약) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const PREVENT_ITEMS = [
  "모르는 번호로 온 링크 절대 클릭 금지",
  "금융기관은 전화로 비밀번호·OTP를 절대 묻지 않아요",
  "검찰·경찰·금감원이 전화로 돈 이체 요구하면 100% 사기",
  "가족·지인 사칭 메시지는 반드시 직접 전화로 확인",
  "출처 불명 앱 설치 요구하면 즉시 전화 끊기",
  "계좌번호·주민번호를 카톡·문자로 보내지 않기",
];

const RESPONSE_STEPS = [
  { title: "즉시 112 신고", desc: "경찰에 피해 사실을 알려요.", tip: "골든타임 30분 — 빠를수록 돈 돌려받을 확률이 높아요" },
  { title: "은행 지급정지 요청", desc: "돈이 빠져나간 은행에 전화해서 사기 계좌 지급정지를 요청해요." },
  { title: "금감원 1332 신고", desc: "금융감독원에 피해 구제를 신청해요.", tip: "피해금 환급 절차가 시작돼요" },
  { title: "개인정보 노출 차단", desc: "개인정보노출자 사고예방 시스템(pd.fss.or.kr)에 등록해요." },
];

const FAQS = [
  { q: "보이스피싱 당했는데 돈 돌려받을 수 있나요?", a: "지급정지가 빠르면 가능해요. 사기 계좌에 잔액이 남아 있으면 피해금 환급 절차로 돌려받을 수 있어요. 30분이 골든타임이에요." },
  { q: "금융회사가 비밀번호를 물어보는 건 정상인가요?", a: "절대 아니에요. 은행·카드사·보험사는 전화로 비밀번호나 OTP 번호를 묻지 않아요. 물어보면 100% 사기예요." },
  { q: "스미싱 링크를 눌렀는데 어떻게 하나요?", a: "즉시 비행기모드로 전환하고, 악성 앱이 설치됐는지 확인하세요. 118(한국인터넷진흥원)에 전화해서 원격 점검을 받을 수 있어요." },
  { q: "AI 음성사기는 어떻게 구분하나요?", a: "목소리가 아무리 비슷해도 돈 관련 요청이면 반드시 직접 전화해서 확인하세요. AI로 합성한 음성은 갑자기 대화 맥락이 끊기는 특징이 있어요." },
  { q: "피해 예방 서비스는 어디서 신청하나요?", a: "개인정보노출자 사고예방 시스템(pd.fss.or.kr)에서 무료로 등록할 수 있어요. 등록하면 본인 명의로 신규 계좌·대출이 차단돼요." },
  { q: "가족이 사기를 당한 것 같은데 어떻게 도와주나요?", a: "본인이 직접 112에 신고하기 어렵다면 가족이 대신 신고할 수 있어요. 은행 지급정지도 피해자 가족이 요청 가능해요." },
];

const REFERENCES = [
  { category: "신고·상담", items: [
    { label: "금융감독원(1332)", url: "https://www.fss.or.kr" },
    { label: "개인정보노출 사고예방", url: "https://pd.fss.or.kr" },
    { label: "한국인터넷진흥원(118)", url: "https://www.kisa.or.kr" },
  ]},
];

const RELATED = [
  { slug: "관리종목-지정-효과-주식-거래", title: "관리종목 지정 시 거래 제한", description: "투자 사기 종목과 관리종목은 다르지만, 위험 신호를 구분할 줄 알아야 해요." },
  { slug: "예금자보호제도", title: "예금자보호제도", description: "내 예금이 보호되는 범위와 한도를 알아보세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 사기 예방</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        금융사기, 어떻게 막고 당하면 뭘 해야 하나요?<br />
        예방 수칙과 피해 대처법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "검찰인데요, 당신 계좌가 범죄에 사용됐어요." 이런 전화 받아보셨죠? 2026년에도 보이스피싱 피해가 줄지 않고 있어요.
        피해를 막으려면 예방 수칙을 지키는 게 가장 중요하고, 이미 당했다면 30분 안에 움직여야 해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>이 6가지만 지키면 대부분 막을 수 있어요</H2>
      <p style={body}>
        금융사기의 90%는 "링크 클릭"과 "전화 송금"에서 시작돼요. 아래 수칙만 철저히 지켜도 피해 확률이 크게 줄어요.
      </p>

      <Checklist items={PREVENT_ITEMS} />

      <p style={body}>
        금융기관은 전화로 절대 개인정보를 요구하지 않아요. 검찰·경찰·금감원도 마찬가지예요. 전화로 돈 얘기가 나오면 일단 끊고 해당 기관에 직접 전화해서 확인하세요.
      </p>

      <Divider />

      <H2>이미 당했다면? 30분이 골든타임이에요</H2>
      <p style={body}>
        돈을 보냈다면 최대한 빨리 움직여야 해요. 사기 계좌에 잔액이 남아 있을 때 지급정지를 걸어야 돌려받을 가능성이 생겨요.
      </p>

      <Steps steps={RESPONSE_STEPS} />

      <GreenBox title="핵심 연락처">
        경찰 신고: 112<br />
        금융감독원 상담: 1332<br />
        인터넷 침해 신고: 118 (한국인터넷진흥원)
      </GreenBox>

      <Divider />

      <H2>2026년 주의해야 할 신종 수법</H2>
      <p style={body}>
        AI 음성합성 사기가 늘고 있어요. 가족 목소리를 AI로 복제해서 "엄마, 급하게 돈 필요해"라고 전화하는 수법이에요.
        목소리가 아무리 비슷해도 돈 관련 요청이면 반드시 끊고 직접 전화로 확인하세요.
      </p>

      <BorderBox>
        <strong>2026년 주요 사기 유형</strong><br /><br />
        · <strong>AI 음성사기</strong>: 가족·지인 목소리를 합성해 송금 요구<br />
        · <strong>메신저 피싱</strong>: 카톡·문자로 지인을 사칭해 돈 요청<br />
        · <strong>앱 설치 유도</strong>: 택배·건강검진 사칭 문자로 악성 앱 설치
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 금융감독원 자료를 기준으로 작성됐어요. 사기 수법은 계속 변하니 금감원·경찰청 공지를 수시로 확인하세요." />
    </ArticleLayout>
  );
}
