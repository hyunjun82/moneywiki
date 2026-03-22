"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// Q1: 공인인증서가 없어졌다는데 뭐가 바뀐 건지 모르는 사람
// Q2: 공동인증서와 민간인증서 차이를 이해하고 상황별로 어떤 인증서를 쓸지 결정
// Q3: 2020년 폐지 배경, 공동인증서=기존 그대로, 민간인증서 종류와 사용처 차이
// Q4: GreenBox(결론) + BorderBox(비교) + Steps(인증서 선택법) + Checklist + FAQ

const STEPS = [
  {
    title: "기존 공인인증서 그대로 사용",
    desc: "이름만 공동인증서로 바뀌었을 뿐 기능은 똑같아요. 기존에 쓰던 인증서를 갱신하면 계속 사용할 수 있어요. 은행, 증권, 보험은 물론 정부24, 홈택스, 법원에서도 쓸 수 있어요.",
    tip: "유효기간 1년이라 매년 갱신해야 해요.",
  },
  {
    title: "민간인증서 등록",
    desc: "카카오톡, 네이버, 토스, PASS 앱에서 민간인증서를 발급받을 수 있어요. 앱 설치 후 지문이나 얼굴인식 등록하면 바로 사용 가능하고, 갱신도 자동이에요.",
    tip: "은행 거래, 간편결제 같은 일상적인 인증은 민간인증서가 편해요.",
  },
  {
    title: "용도별로 나눠 사용",
    desc: "공공기관(홈택스, 정부24, 법원 전자소송)은 공동인증서나 금융인증서를 써야 하는 곳이 많아요. 은행 이체, 보험 가입 같은 일상 금융은 민간인증서로 간편하게 하세요.",
  },
];

const CHECKLIST = [
  "공인인증서 → '공동인증서'로 이름만 변경 (기능 동일)",
  "민간인증서: 카카오, 네이버, 토스, PASS 등 앱에서 발급",
  "은행·증권사 대부분 민간인증서 도입 완료",
  "홈택스·정부24·법원은 아직 공동인증서 필요한 곳 많음",
  "공동인증서 1개 + 민간인증서 1개 조합이 가장 편리",
  "전자서명법상 공동인증서와 민간인증서의 법적 효력 동일",
];

const FAQS = [
  { q: "공인인증서가 없어졌으면 기존 인증서는 못 쓰나요?", a: "아니에요. 이름만 공동인증서로 바뀐 거예요. 기능은 그대로고 기존에 발급받은 인증서를 계속 쓸 수 있어요." },
  { q: "민간인증서로 모든 곳에서 쓸 수 있나요?", a: "은행·증권사는 대부분 돼요. 다만 홈택스, 정부24, 법원 전자소송 같은 공공기관은 아직 공동인증서나 금융인증서가 필요한 곳이 많아요." },
  { q: "금융인증서는 뭐예요?", a: "금융결제원이 만든 인증서예요. 클라우드에 저장돼서 PC·USB에 복사할 필요가 없어요. 유효기간 3년이고 자동 갱신돼요. 공동인증서보다 편리하죠." },
  { q: "민간인증서 중 어떤 게 좋아요?", a: "카카오, 네이버, 토스, PASS 중 평소에 자주 쓰는 앱으로 하면 돼요. 기능 차이는 거의 없어요. 사용처가 가장 많은 걸 기준으로 선택하세요." },
  { q: "공동인증서 발급비용이 있나요?", a: "개인용은 무료예요. 은행 홈페이지에서 발급받을 수 있어요. 사업자용(범용)은 유료고 연 4,400원이에요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "과학기술정보통신부: 전자서명법 개정 안내", url: "https://www.msit.go.kr" },
      { label: "금융위원회: 공인인증서 폐지 보도자료", url: "https://www.fsc.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 인증서 · 전자서명</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        공인인증서 폐지됐는데, 뭘 써야 하지?<br />
        공동인증서와 민간인증서 차이
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        공인인증서 없어졌다는 뉴스 봤는데 여전히 인증서를 쓰고 있죠.
        2020년 12월에 '공인' 독점이 폐지됐을 뿐이지, 인증서 자체가 사라진 건 아니에요.
        기존 공인인증서는 공동인증서로 이름만 바뀌었고, 카카오·네이버 같은 민간인증서도 법적으로 동등한 효력을 갖게 됐어요.
      </p>

      <Divider />

      <H2>뭐가 바뀐 건가요?</H2>
      <p style={body}>
        2020년 12월 전자서명법 개정으로 공인인증서의 독점적 지위가 사라졌어요.
        예전에는 공인인증서만 강제로 써야 했는데, 이제는 민간인증서도 동등하게 쓸 수 있어요.
        소비자가 인증 수단을 직접 선택하는 시대가 된 거예요.
      </p>

      <GreenBox title="핵심 변경 사항">
        공인인증서 → 공동인증서 (이름만 변경, 기능 동일)<br />
        민간인증서(카카오, 네이버, 토스 등)도 법적 효력 동일<br />
        특정 인증서 강제 금지 → 소비자 선택권 확대
      </GreenBox>

      <Divider />

      <H2>공동인증서 vs 민간인증서, 뭐가 다르죠?</H2>
      <p style={body}>
        공동인증서는 발급받고 PC·USB에 저장해야 하고 매년 갱신해야 해요.
        번거로운 대신 공공기관에서 쓸 수 있는 곳이 훨씬 많아요.
      </p>
      <p style={body}>
        민간인증서는 앱만 깔면 지문이나 얼굴인식으로 바로 써요.
        갱신도 자동이라 편하지만, 공공기관에서 아직 안 되는 곳이 있어요.
      </p>

      <BorderBox>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8 }}>공동인증서</p>
        <p style={{ ...body, marginBottom: 4 }}>발급: 은행 홈페이지 | 저장: PC·USB | 갱신: 매년</p>
        <p style={{ ...body, marginBottom: 4 }}>사용처: 은행, 증권, 보험, 홈택스, 정부24, 법원</p>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8, marginTop: 12 }}>민간인증서</p>
        <p style={{ ...body, marginBottom: 4 }}>발급: 카카오·네이버·토스 앱 | 저장: 클라우드 | 갱신: 자동</p>
        <p style={{ ...body, marginBottom: 0 }}>사용처: 은행, 증권, 보험 (공공기관은 제한적)</p>
      </BorderBox>

      <Divider />

      <H2>어떤 인증서를 써야 하나요?</H2>
      <p style={body}>
        가장 실용적인 방법은 공동인증서 1개 + 민간인증서 1개 조합이에요.
        공공기관은 공동인증서로, 일상 금융은 민간인증서로 나눠 쓰면 편해요.
      </p>

      <SectionBadge>인증서 선택 가이드</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>2026년 인증서 사용 현황 체크</H2>
      <p style={body}>
        지금 기준으로 인증서 관련해서 알아야 할 핵심만 정리했어요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        공인인증서 폐지와 민간인증서 관련 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 전자서명법을 바탕으로 작성됐어요. 각 기관별 인증서 지원 범위는 변경될 수 있으니 해당 기관 홈페이지에서 확인하세요." />
    </div>
  );
}
