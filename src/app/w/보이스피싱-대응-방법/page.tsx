"use client";
// Q1. 검찰청·경찰청이라는 전화를 받았거나 이미 송금했는데 보이스피싱인 것 같아서 어떻게 해야 할지 모르는 상황
// Q2. 즉시 전화를 끊고 112·1332에 신고, 송금했다면 지급정지 신청으로 돈을 되찾는 방법 파악
// Q3. 공공기관은 계좌번호·비밀번호 요구 안 함, 지급정지 30분 이내 신청, 피해금 환급 절차, 예방 서비스
// Q4. 즉시 대응 Steps + 수법 유형표로 판단 빠르게
// MAP-INTRO: 낯선 번호로 검찰청이라고 전화와서 계좌번호 알려달라고 하면 100% 보이스피싱이에요
// MAP-TYPE: 절차
// MAP-H2: 보이스피싱 판단 기준 > 즉시 대응 방법 > 피해금 환급 절차 > 예방 서비스 > FAQ
// MAP-COMP: BorderBox > Steps > GreenBox > Checklist > FAQ

"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const SCAM_TYPES = [
  { type: "공공기관 사칭", example: "검찰·경찰·금감원에서 범죄 계좌 조사 협조 요청", trap: "안전 계좌로 이체, 비밀번호 요구" },
  { type: "가족 사칭 (딥보이스)", example: "자녀 목소리로 '엄마 나 사고났어, 급히 돈 보내'", trap: "AI 목소리 복제로 실제 가족처럼 들림" },
  { type: "금융기관 사칭", example: "은행 직원이 대출 권유, 계좌 정보 입력 요구", trap: "악성 앱 설치 유도, 개인정보 탈취" },
  { type: "택배·공공요금 미납", example: "택배 미배달 링크, 건강보험 환급금 등", trap: "링크 클릭 시 악성 앱 설치" },
];

const STEPS = [
  {
    title: "즉시 전화 끊기",
    desc: "의심되는 전화가 오면 일단 끊으세요. '확인해보겠다'고 말하고 끊는 게 가장 안전해요. 상대방이 '지금 바로 조치해야 한다', '나중에 전화하면 구속된다'고 협박하더라도 끊으면 돼요. 실제 검찰·경찰·금감원은 전화로 계좌번호를 묻지 않아요.",
    tip: "끊은 뒤 인터넷에서 해당 기관 공식 대표번호로 직접 전화해 사실 확인",
  },
  {
    title: "112 또는 1332에 신고",
    desc: "경찰(112) 또는 금융감독원(1332)에 신고하세요. 신고하면 해당 번호를 차단하고 다른 피해를 막을 수 있어요. 경찰청 사이버안전국(ecrm.police.go.kr)에서 온라인 신고도 가능해요. 통화 내역, 문자, 송금 증거를 캡처해두면 수사에 도움이 돼요.",
    tip: "상대방이 알려준 번호로는 절대 다시 전화하지 마세요",
    link: { label: "경찰청 사이버안전국 신고", href: "https://ecrm.police.go.kr" },
  },
  {
    title: "이미 송금했다면 즉시 지급정지 신청",
    desc: "송금한 은행 또는 사기 계좌가 있는 은행에 가서 '지급정지 신청'을 하세요. 30분 이내 신청하면 돈이 빠져나가기 전 막을 수 있어요. 은행 영업시간 외라면 은행 대표번호로 전화해도 돼요. 지급정지가 되면 사기범이 인출할 수 없어요.",
    tip: "1초라도 빨리 신청할수록 환급 가능성이 높아요",
  },
  {
    title: "피해금 환급 신청",
    desc: "지급정지 후 금융감독원에 채권소멸절차 개시 공고를 요청해요. 공고 기간(60일) 동안 다른 채권자가 없으면 피해금을 돌려받을 수 있어요. 계좌에 돈이 남아 있으면 전액 환급, 여러 피해자가 있으면 비율대로 나눠서 받아요.",
    tip: "지급정지 후 금융감독원(www.fss.or.kr)에서 환급 신청 절차 안내",
    link: { label: "금융감독원 보이스피싱 피해 신고", href: "https://www.fss.or.kr" },
  },
];

const CHECKLIST = [
  "공공기관은 전화로 계좌번호·비밀번호·OTP 번호를 절대 묻지 않아요",
  "안전 계좌·가상 계좌로 이체 요구 = 100% 보이스피싱",
  "'30분 안에 안 하면 구속' 같은 협박 = 무조건 보이스피싱",
  "의심 전화 받으면 끊고 인터넷 검색으로 공식 번호 찾아 직접 전화",
  "송금 후 30분 이내 은행 지급정지 신청 (영업시간 외는 대표번호)",
  "은행 앱에서 보이스피싱 예방 서비스 신청해두기 (무료)",
];

const FAQS = [
  {
    q: "보이스피싱 피해금 돌려받을 수 있나요?",
    a: "송금 후 30분 이내 지급정지 신청하면 가능성이 높아요. 사기범이 아직 인출 전이면 전액 환급 가능해요. 늦더라도 지급정지와 피해금 환급 절차를 밟으면 일부 돌려받을 수 있어요.",
  },
  {
    q: "가족 목소리를 흉내 내는 딥보이스 피싱은 어떻게 구별하나요?",
    a: "의심되면 본인에게 직접 전화하거나 문자를 보내세요. 가족만 아는 질문을 해보는 것도 방법이에요. '지금 전화 못 받으니 일단 보내' 같은 말은 100% 보이스피싱이에요.",
  },
  {
    q: "악성 앱을 설치했는데 어떻게 하나요?",
    a: "즉시 스마트폰을 비행기 모드로 전환하고, 통신사에 전화해 원격 접속 차단을 요청하세요. 그다음 스마트폰 초기화 후 공식 앱스토어에서만 앱을 다시 설치해요. 금융 앱 비밀번호도 전부 바꾸세요.",
  },
  {
    q: "신고했는데도 돈을 못 찾으면 어쩌죠?",
    a: "피해금 환급 절차를 밟고, 돌려받지 못한 금액은 피해 접수 후 구제 방안을 금융감독원과 상담하세요. 전액 환급이 어려운 경우에도 일부라도 받을 수 있는 경우가 있어요.",
  },
  {
    q: "보이스피싱 예방 서비스는 어떻게 신청하나요?",
    a: "은행 앱 또는 홈페이지에서 '보이스피싱 예방 서비스' 또는 '이상금융거래 탐지 서비스'를 신청하면 돼요. 무료이고, 의심 거래 발생 시 자동 차단 또는 SMS 경고를 받을 수 있어요.",
  },
  {
    q: "개인정보를 알려줬는데 어떻게 해야 하나요?",
    a: "즉시 해당 금융기관에 연락해서 비밀번호를 바꾸고, 공인인증서(공동인증서)를 재발급하세요. 개인정보 노출 사실은 금융감독원 파인(fine.fss.or.kr)에 등록해두면 도용 피해를 줄일 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령·공식 기관",
    items: [
      { label: "전기통신금융사기 피해 방지 및 피해금 환급에 관한 특별법", url: "https://www.law.go.kr/법령/전기통신금융사기피해방지및피해금환급에관한특별법" },
      { label: "금융감독원: 보이스피싱 피해 신고", url: "https://www.fss.or.kr" },
      { label: "경찰청 사이버안전국: 사이버범죄 신고", url: "https://ecrm.police.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "금융사기-예방", title: "금융사기 예방 방법", description: "보이스피싱 외 대출 사기, 투자 사기 예방 방법이에요." },
  { slug: "금융분쟁조정", title: "금융분쟁조정 신청 방법", description: "피해금 환급이 안 될 때 금감원 분쟁조정 절차예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>
        금융 · 보이스피싱 · 피해 대응
      </p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        보이스피싱 대응 방법<br />
        신고·지급정지·환급 절차 한 번에
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        낯선 번호로 검찰청이라고 전화와서 계좌번호 알려달라고 하면 100% 보이스피싱이에요.
        공공기관은 전화로 금융정보를 절대 묻지 않아요.
        송금했다면 1초라도 빨리 지급정지를 신청해야 돌려받을 가능성이 높아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>보이스피싱인지 바로 판단하는 기준</H2>
      <p style={body}>
        아래 중 하나라도 해당하면 보이스피싱이에요. 아무리 그럴듯하게 들려도 즉시 끊으세요.
        AI 딥보이스로 실제 가족 목소리를 흉내 내는 경우도 늘고 있어요.
      </p>

      <BorderBox>
        ① 공공기관이 전화로 계좌번호·비밀번호·OTP 요구<br />
        ② "안전 계좌", "가상 계좌"로 돈을 옮기라는 지시<br />
        ③ "지금 안 하면 구속", "30분 이내" 등 급박하게 재촉<br />
        ④ 가족이 사고·사기 피해자라며 급히 돈 요구<br />
        ⑤ 대출 권유하며 선입금·수수료 요구
      </BorderBox>

      <SectionBadge>주요 수법 유형</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>수법</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>전형적인 수법</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 600 }}>함정</th>
            </tr>
          </thead>
          <tbody>
            {SCAM_TYPES.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{row.type}</td>
                <td style={{ padding: "9px 12px", fontSize: 13, color: "#374151" }}>{row.example}</td>
                <td style={{ padding: "9px 12px", fontSize: 13, color: "#dc2626" }}>{row.trap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>보이스피싱 대응 4단계</H2>
      <p style={body}>
        전화를 받은 순간부터 돈을 돌려받는 것까지 순서가 있어요.
        특히 이미 송금했다면 시간이 생명이에요.
        30분 이내 지급정지를 신청하면 전액 환급 가능성이 크게 높아져요.
      </p>

      <Steps steps={STEPS} />

      <GreenBox>
        지급정지 신청: 송금한 은행 또는 수취 은행 중 아무 곳에나 신청<br />
        신고 전화: 경찰 112 / 금융감독원 1332 / 금융결제원 1577-5500<br />
        30분 이내 신청 = 전액 환급 가능성 최대
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>보이스피싱 예방 체크리스트</H2>
      <p style={body}>
        미리 예방하는 게 가장 좋아요. 은행 앱의 예방 서비스는 무료이고 의심 거래를 자동으로 차단해줘요.
        가족 중에 어르신이 계시면 함께 설명해드리는 게 좋아요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        보이스피싱 대응과 피해 환급에 대해 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 전기통신금융사기 피해 방지법을 바탕으로 작성됐어요. 신고 번호와 환급 절차는 변경될 수 있으니 금융감독원(1332) 또는 경찰(112)에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
