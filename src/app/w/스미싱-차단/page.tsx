"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 의심 문자를 받았거나, 링크 클릭 후 소액결제 피해를 당해서 어떻게 차단하고 대처하는지 알고 싶은 상황이에요.
// Q2. 소액결제를 원천 차단하고, 스마트폰 보안 설정을 강화하고, 이미 피해를 당했다면 118에 신고하는 행동.
// Q3. AI 차단 서비스, 소액결제 차단 방법, 스마트폰 보안 설정, 피해 시 신고 번호(118·182), 예방 수칙.
// Q4. Steps(차단 설정) + Checklist(예방 수칙) + GreenBox(긴급 연락처) + BorderBox(적발 사례) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const BLOCK_STEPS = [
  { title: "소액결제 차단", desc: "이동통신사 고객센터(114)에 전화해서 소액결제를 원천 차단하세요. 필요할 때만 켜고 다시 끄면 돼요.", tip: "소액결제 자체를 꺼두면 악성 앱이 설치돼도 돈이 안 빠져요" },
  { title: "출처 불명 앱 설치 차단", desc: "스마트폰 설정 → 보안 → '알 수 없는 출처 앱 설치'를 비활성화해요. 공식 앱 스토어에서만 설치하도록 제한하세요." },
  { title: "모바일 백신 설치", desc: "V3 모바일, 알약 등 모바일 백신을 설치하고 자동 업데이트를 켜두세요. 악성 앱 설치를 사전에 차단해줘요." },
  { title: "AI 스미싱 차단 활성화", desc: "갤럭시 S25 이후 모델은 '인텔리전스로 차단' 기능이 기본 탑재돼 있어요. 설정에서 활성화 여부를 확인하세요." },
];

const PREVENT_ITEMS = [
  "출처 불명 문자의 링크는 절대 클릭하지 않기",
  "택배·청첩장·쿠폰 문자도 일단 의심하기",
  "은행·카드사·공공기관 문자의 링크도 공식 앱에서 직접 확인하기",
  "\"폰 바꿨어\" 문자 받으면 전화로 직접 확인하기",
  "다단계 인증(MFA) 설정하기",
  "주기적으로 소액결제 내역 확인하기",
];

const FAQS = [
  { q: "스미싱 문자를 받았는데 링크를 안 눌렀어요. 괜찮은가요?", a: "링크를 안 눌렀으면 괜찮아요. 문자만 받는 것으로는 피해가 발생하지 않아요. 해당 번호를 차단하고 삭제하세요." },
  { q: "링크를 눌렀는데 앱은 안 깔았어요. 위험한가요?", a: "링크만 클릭하고 앱 설치를 안 했다면 대부분 괜찮아요. 다만 개인정보 입력 화면이 나왔는데 정보를 입력했다면 118에 신고하세요." },
  { q: "이미 소액결제가 된 것 같아요. 어떡하죠?", a: "즉시 통신사에 전화해서 결제를 취소하고 소액결제를 차단하세요. 그 다음 118(한국인터넷진흥원)과 182(사이버경찰청)에 신고해요. 금융감독원(1332)에도 연락하세요." },
  { q: "갤럭시 AI 차단 기능은 어떤 폰에서 되나요?", a: "2026년 3월 기준 갤럭시 S25 시리즈에 탑재돼 있어요. 한국인터넷진흥원(KISA) 신고 데이터 월 500만건을 학습해서 악성 메시지를 자동으로 걸러줘요." },
  { q: "\"저금리 대출 가능\" 문자도 스미싱인가요?", a: "대부분 사기예요. 정상적인 금융기관은 문자로 대출을 권유하지 않아요. 해당 기관 공식 홈페이지나 고객센터로 직접 확인하세요." },
  { q: "스미싱 신고는 어디에 하나요?", a: "국번 없이 118(한국인터넷진흥원)로 전화하면 무료 상담받을 수 있어요. 금전 피해가 발생했으면 182(사이버경찰청)에도 신고해야 해요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "한국인터넷진흥원(KISA) 스미싱 예방", url: "https://www.kisa.or.kr" },
      { label: "금융감독원", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "대출-사기-주의사항", title: "대출 사기 주의사항", description: "저금리 대출 미끼 문자부터 보이스피싱까지 대처법이에요." },
  { slug: "금융-인증서-발급", title: "금융 인증서 발급 방법", description: "공인인증서 대신 금융인증서로 보안을 강화하세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 보안 · 사기 예방</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        스미싱 차단, 이렇게 막으세요<br />
        소액결제 차단부터 피해 신고까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "택배가 도착했습니다" 문자 받고 링크 눌렀다가 소액결제 몇십만원 청구된 적 있으시죠?
        스미싱은 갈수록 교묘해지고 있어요. 2026년부터는 AI가 자동으로 걸러주는 서비스도 나왔지만, 기본 예방이 가장 중요해요.
        소액결제 자체를 꺼두면 악성 앱이 설치돼도 돈이 안 빠져나가요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>스미싱 차단 설정, 지금 바로 하세요</H2>
      <p style={body}>
        가장 확실한 차단법은 소액결제를 아예 꺼버리는 거예요.
        소액결제 기능 자체를 끄면 악성 앱이 깔려도 돈이 빠져나갈 수 없어요.
        거기에 스마트폰 보안 설정까지 강화하면 피해 가능성이 90% 이상 줄어요.
      </p>

      <SectionBadge>차단 설정 순서</SectionBadge>
      <Steps steps={BLOCK_STEPS} />

      <Divider />

      <H2>스미싱 예방 수칙, 이것만 기억하세요</H2>
      <p style={body}>
        기술적인 차단도 중요하지만, 결국 "의심스러운 링크를 안 누르는 것"이 가장 효과적이에요.
        정상적인 기관은 문자에 링크를 거의 안 보내요. 보내더라도 공식 앱에서 알림으로 먼저 안내해요.
      </p>

      <SectionBadge>예방 수칙 체크리스트</SectionBadge>
      <Checklist items={PREVENT_ITEMS} />

      <Divider />

      <H2>피해가 발생했다면 이렇게 대처하세요</H2>
      <p style={body}>
        이미 링크를 클릭했거나 앱이 설치됐다면 빠르게 움직여야 해요.
        신고가 빠를수록 피해를 줄일 수 있어요.
      </p>

      <SectionBadge>긴급 연락처</SectionBadge>
      <GreenBox title="스미싱 피해 신고">
        <p style={{ ...body, marginBottom: 6 }}><strong>118</strong>: 한국인터넷진흥원 (무료 상담·대처법 안내)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>182</strong>: 사이버경찰청 (금전 피해·개인정보 유출 신고)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>1332</strong>: 금융감독원 (금융 피해 상담)</p>
        <p style={{ ...body, marginBottom: 0 }}><strong>114</strong>: 이동통신사 (소액결제 취소·차단)</p>
      </GreenBox>

      <p style={body}>
        소액결제가 이미 발생했다면 즉시 통신사에 전화해서 결제를 취소하세요.
        그 다음 소액결제를 차단하고, 118과 182에 신고해요.
        경찰에 신고하면 일부 환급받을 수 있는 경우도 있어요.
      </p>

      <Divider />

      <H2>AI 스미싱 차단 서비스, 뭐가 달라졌나요?</H2>
      <p style={body}>
        2026년 3월부터 삼성 갤럭시 S25 시리즈에 AI 기반 스팸 자동 차단 기능이 탑재됐어요.
        <a href="https://www.kisa.or.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국인터넷진흥원(KISA)</a> 신고 데이터 월 500만건을 학습해서 악성 메시지를 자동으로 분류하고 차단해줘요.
      </p>

      <BorderBox title="AI 차단 서비스 현황">
        <p style={{ ...body, marginBottom: 6 }}><strong>갤럭시 S25</strong>: '인텔리전스로 차단' 기능 기본 탑재</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>우리은행</strong>: 안랩 V3 Mobile Plus 기반 'AI-스미싱 문자 안심 서비스'</p>
        <p style={{ ...body, marginBottom: 0 }}><strong>KT</strong>: 스미싱 지킴이 서비스 (문자 내 링크 클릭 시 불법 사이트 차단)</p>
      </BorderBox>

      <Divider />

      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 한국인터넷진흥원과 금융감독원 자료를 바탕으로 작성했어요. 스미싱 수법은 계속 변하니 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
