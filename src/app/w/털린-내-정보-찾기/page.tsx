"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// Q1: 개인정보 유출이 걱정돼서 내 계정이 다크웹에 노출됐는지 확인하려는 사람
// Q2: 털린 내정보 찾기 서비스에서 유출 여부 조회하고, 유출 시 비밀번호 변경
// Q3: 서비스 접속 방법, 조회 범위(2,300만건+40억건), 유출 시 후속 조치
// Q4: Steps(조회 절차) + GreenBox(핵심) + BorderBox(조회 범위) + Checklist + FAQ

const STEPS = [
  {
    title: "사이트 접속",
    desc: "kidc.eprivacy.go.kr에 접속해요. 개인정보보호위원회가 운영하는 공식 서비스라서 안전해요. 회원가입 없이 바로 이용할 수 있어요.",
    tip: "비슷한 이름의 사이트를 사칭하는 곳이 있으니 URL을 꼭 확인하세요.",
  },
  {
    title: "이용약관 동의 및 이메일 인증",
    desc: "이용약관에 동의하고 본인 확인용 이메일 인증을 진행해요. 인증 메일이 오면 링크를 클릭하면 돼요.",
  },
  {
    title: "아이디·비밀번호 입력 또는 이메일 조회",
    desc: "확인하고 싶은 아이디와 비밀번호를 입력하면 5초 안에 결과가 나와요. 2026년부터는 이메일 주소만으로도 유출 여부를 확인할 수 있어요. 입력한 정보는 암호화 처리되고 조회 후 즉시 파기돼요.",
  },
  {
    title: "유출 확인 시 즉시 대응",
    desc: "유출 이력이 나오면 해당 사이트의 비밀번호를 즉시 변경하세요. 같은 비밀번호를 쓰는 다른 사이트도 전부 바꿔야 해요. 2단계 인증 설정도 꼭 하세요.",
    tip: "비밀번호 관리 앱을 쓰면 사이트별로 다른 비밀번호를 안전하게 관리할 수 있어요.",
  },
];

const CHECKLIST = [
  "개인정보보호위원회 공식 서비스 — 무료, 회원가입 불필요",
  "국내 2,300만 건 + 글로벌 40억 건 데이터베이스 검색",
  "아이디·비밀번호 또는 이메일로 조회 가능",
  "입력 정보는 암호화 처리 후 즉시 파기",
  "유출 확인 시 즉시 비밀번호 변경 + 2단계 인증 설정",
  "같은 비밀번호 쓰는 다른 사이트도 전부 변경 필요",
];

const FAQS = [
  { q: "입력한 정보가 다른 곳에 저장되지 않나요?", a: "입력한 정보는 암호화 처리돼서 데이터베이스와 비교만 하고, 평문 데이터는 저장하지 않아요. 조회 후 즉시 파기돼요." },
  { q: "유출 이력이 나오면 어떻게 해야 하나요?", a: "즉시 해당 사이트 비밀번호를 변경하고, 같은 비밀번호를 쓰는 모든 사이트도 바꾸세요. 2단계 인증도 설정하세요." },
  { q: "조회했는데 유출 이력 없음이 나오면 안전한 건가요?", a: "현재까지 수집된 데이터 기준으로 유출이 없다는 뜻이에요. 100% 안전을 보장하진 않으니 주기적으로 확인하고 비밀번호를 바꾸는 습관이 좋아요." },
  { q: "유출된 경로도 알 수 있나요?", a: "유출 이력이 확인되면 대략적인 유출 경로 정보도 함께 제공돼요. 어느 사이트에서 유출됐는지 참고할 수 있어요." },
  { q: "민간 유출 확인 서비스도 있는데 뭐가 다르나요?", a: "민간 서비스도 있지만, 정부 서비스가 데이터베이스 규모가 크고 정확도가 높아요. KISA가 다크웹에서 직접 수집한 데이터를 활용하거든요." },
];

const REFERENCES = [
  {
    category: "공식 사이트",
    items: [
      { label: "털린 내정보 찾기 서비스", url: "https://kidc.eprivacy.go.kr/" },
      { label: "개인정보보호위원회: 유출 대응 안내", url: "https://www.privacy.go.kr/front/contents/cntntsView.do?contsNo=246" },
    ],
  },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>정보보호 · 개인정보 · 유출확인</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        내 아이디·비밀번호가 유출됐을까?<br />
        털린 내정보 찾기 조회 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        평소 쓰던 아이디와 비밀번호가 다크웹에 떠돌고 있다면 생각만 해도 무섭죠.
        개인정보보호위원회가 운영하는 '털린 내정보 찾기'에서 5분이면 확인할 수 있어요.
        무료이고 회원가입도 필요 없어요. 지금 바로 조회 방법을 알려드릴게요.
      </p>

      <Divider />

      <H2>어디서, 어떻게 조회하나요?</H2>
      <p style={body}>
        <a href="https://kidc.eprivacy.go.kr/" style={{ color: "#1D9E75", textDecoration: "underline" }}>kidc.eprivacy.go.kr</a>에서 아이디·비밀번호 또는 이메일을 입력하면 즉시 결과가 나와요.
        한국인터넷진흥원(KISA)이 다크웹에서 수집한 2,300만 건의 국내 계정정보와 구글 비밀번호 진단 40억 건을 검색해줘요.
      </p>

      <SectionBadge>조회 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>어떤 데이터를 검색하는 건가요?</H2>
      <p style={body}>
        KISA가 다크웹 등 음성화 사이트에서 직접 수집한 데이터예요.
        매월 갱신되고 있어서 최신 유출 정보를 확인할 수 있어요.
      </p>

      <BorderBox>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8 }}>아이디·비밀번호 조회</p>
        <p style={{ ...body, marginBottom: 4 }}>규모: 2,300만 건 (국내) | 갱신: 매월</p>
        <p style={{ ...body, fontWeight: 600, marginBottom: 8, marginTop: 12 }}>이메일 조회 (2026년 신규)</p>
        <p style={{ ...body, marginBottom: 0 }}>규모: 40억 건 (글로벌, 구글 연동) | 갱신: 매월</p>
      </BorderBox>

      <Divider />

      <H2>유출 확인되면 뭘 해야 하나요?</H2>
      <p style={body}>
        유출 이력이 나오면 바로 행동해야 해요. 시간이 지나면 2차 피해로 이어질 수 있거든요.
        비밀번호 변경이 가장 급하고, 같은 비밀번호를 쓰는 모든 사이트도 바꿔야 해요.
      </p>

      <GreenBox title="유출 확인 시 즉시 할 일">
        1. 해당 사이트 비밀번호 즉시 변경<br />
        2. 같은 비밀번호 쓰는 다른 사이트 전부 변경<br />
        3. 2단계 인증(OTP, 문자 인증) 설정<br />
        4. 비밀번호 관리 앱으로 사이트별 다른 비밀번호 사용
      </GreenBox>

      <Divider />

      <H2>핵심 체크리스트</H2>
      <p style={body}>
        개인정보 유출 조회와 관련된 핵심만 정리했어요.
      </p>

      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        털린 내정보 찾기 서비스 관련 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 개인정보보호위원회 안내를 바탕으로 작성됐어요. 유출 확인 후 구체적인 피해 대응은 개인정보 침해신고센터(118)에 문의하세요." />
    </div>
  );
}
