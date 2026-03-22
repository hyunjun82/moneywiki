"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 파밍이라는 금융사기 수법이 있다고 들었는데 어떻게 막는지 모르거나, 이미 의심 상황을 겪은 상태예요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 파밍 예방 수칙을 실천하고, 피해 시 즉시 신고·지급정지를 요청하는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 파밍 vs 피싱 차이, 예방 수칙(자물쇠·즐겨찾기·백신), 피해 시 신고처(112·1332), 지급정지 요청 방법.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → GreenBox(예방 핵심) + Steps(피해 시 대처) + Checklist(예방 수칙) + BorderBox(피싱 차이) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, Steps, Checklist, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "파밍과 피싱의 차이가 뭔가요?", a: "피싱은 가짜 링크를 보내서 클릭하게 만드는 거예요. 파밍은 정상 주소를 입력해도 악성코드가 가짜 사이트로 연결해요. 파밍이 더 교묘해요." },
  { q: "파밍 예방에 가장 중요한 건 뭔가요?", a: "윈도우 보안 업데이트와 백신 프로그램이에요. 악성코드가 파밍의 시작이니까 이걸 막아야 해요." },
  { q: "주소창 자물쇠가 뭔가요?", a: "HTTPS 보안 접속을 뜻해요. 주소창 왼쪽에 자물쇠 아이콘이 보이면 보안 접속이에요. 없으면 가짜 사이트일 수 있어요." },
  { q: "파밍 피해 입으면 돈을 돌려받을 수 있나요?", a: "지급정지가 빠르면 돌려받을 가능성이 높아요. 금감원(1332)에 신고하고 지급정지 요청 후, 피해구제 신청서를 제출하세요." },
  { q: "은행에서 비밀번호를 물어보면 사기인가요?", a: "네, 100% 사기예요. 금융회사는 전화·이메일·문자로 비밀번호, 보안카드 번호, OTP 번호를 절대 물어보지 않아요." },
  { q: "스마트폰에서도 파밍이 가능한가요?", a: "가능해요. 악성 앱을 설치하면 스마트폰에서도 파밍이 발생해요. 출처 불명 앱을 설치하지 마세요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 금융사기 예방", url: "https://www.fss.or.kr" },
      { label: "경찰청 사이버안전국", url: "https://cyberbureau.police.go.kr" },
      { label: "KB국민은행 보안센터", url: "https://obank.kbstar.com/quics?page=C034307" },
    ],
  },
];

const RESPONSE_STEPS = [
  { title: "비밀번호 즉시 변경", desc: "은행·카드사 비밀번호를 모두 바꾸세요. 공동인증서도 재발급받으세요.", tip: "같은 비밀번호를 쓰는 다른 사이트도 전부 변경" },
  { title: "금융회사에 지급정지 요청", desc: "해당 금융회사 고객센터에 전화해서 계좌 지급정지를 요청하세요.", tip: "몇 분 안에 돈이 빠져나갈 수 있어서 빠를수록 좋아요" },
  { title: "112·1332에 신고", desc: "경찰(112)과 금융감독원(1332)에 피해 사실을 신고하세요." },
  { title: "악성코드 제거", desc: "백신 프로그램으로 전체 검사를 돌려요. 필요하면 포맷이 가장 확실해요." },
  { title: "피해구제 신청", desc: "금융감독원에 피해구제 신청서를 제출하세요. 지급정지가 빠르면 환급 가능성이 높아요." },
];

const PREVENTION_ITEMS = [
  "윈도우·맥 보안 업데이트를 자동으로 켜두세요",
  "백신 프로그램을 설치하고 최신 버전으로 유지하세요",
  "금융 사이트는 즐겨찾기에 등록하고, 즐겨찾기로 접속하세요",
  "주소창 자물쇠(HTTPS)를 확인하세요",
  "이메일·문자의 링크를 클릭하지 말고, 주소를 직접 입력하세요",
  "출처 불분명한 파일을 다운로드하지 마세요",
  "금융거래 알림 서비스(SMS/푸시)를 설정하세요",
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 보안 · 사기예방</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        파밍 예방, 이것만 지키세요<br />
        피해 시 대처법과 신고 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        은행 홈페이지 주소를 정확하게 입력했는데 이상한 사이트로 연결됐다고요?
        파밍은 피싱보다 더 교묘해서 주소를 직접 입력해도 당할 수 있어요.
        예방 수칙과 피해 시 대처법을 알려드릴게요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>파밍이 뭔가요?</H2>
      <p style={body}>
        파밍(Pharming)은 컴퓨터나 스마트폰에 악성코드를 심어서 DNS 설정을 조작하는 수법이에요.
        정상 주소를 입력해도 가짜 사이트로 자동 연결되고, 거기서 입력한 계좌번호·비밀번호가 사기범에게 넘어가요.
      </p>

      <BorderBox>
        <strong>피싱 vs 파밍 차이</strong><br />
        · <strong>피싱</strong>: 가짜 링크를 문자·이메일로 보내서 클릭하게 만드는 수법<br />
        · <strong>파밍</strong>: 정상 주소를 입력해도 악성코드가 가짜 사이트로 연결하는 수법<br />
        · <strong>스미싱</strong>: 문자(SMS) + 피싱. 악성 앱 설치를 유도하는 수법<br />
        → 파밍은 사용자가 직접 주소를 입력해도 당할 수 있어서 가장 교묘해요.
      </BorderBox>

      <Divider />

      <H2>이것만 지키면 막을 수 있어요</H2>
      <p style={body}>
        파밍의 시작은 악성코드예요. 악성코드가 설치되지 않으면 파밍도 불가능해요.
        아래 수칙을 지키면 대부분 예방할 수 있어요.
      </p>

      <SectionBadge>파밍 예방 수칙</SectionBadge>
      <Checklist items={PREVENTION_ITEMS} />

      <GreenBox title="가장 중요한 3가지">
        <strong>1.</strong> 보안 업데이트·백신은 항상 최신으로<br />
        <strong>2.</strong> 금융 사이트는 즐겨찾기로만 접속<br />
        <strong>3.</strong> 비밀번호·보안카드 번호를 묻는 건 무조건 사기
      </GreenBox>

      <ArticleAd position="mid" />
      <Divider />

      <H2>피해가 의심되면 즉시 이렇게 하세요</H2>
      <p style={body}>
        이상한 사이트에 정보를 입력한 걸 깨달은 순간 바로 행동해야 해요.
        몇 분 안에 돈이 빠져나갈 수 있거든요.
      </p>

      <SectionBadge>피해 시 대처 절차</SectionBadge>
      <Steps steps={RESPONSE_STEPS} />

      <Divider />

      <H2>2026년 금융사기는 더 교묘해졌어요</H2>
      <p style={body}>
        AI 음성 복제, 딥페이크 영상 같은 새로운 수법이 등장했어요.
        가족이나 지인 목소리를 흉내 내서 송금을 요구하는 사례가 늘고 있어요.
        전화로 급하게 돈을 요구하면 반드시 직접 전화해서 확인하세요.
        <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a>(1332)에서 최신 사기 유형을 안내받을 수 있어요.
      </p>

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 금융감독원·경찰청 자료를 바탕으로 작성했어요. 피해 발생 시 즉시 112, 금융감독원 1332에 신고하세요." />
    </div>
  );
}
