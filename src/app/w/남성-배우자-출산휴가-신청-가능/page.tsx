"use client";
// Q1. 아내 출산 예정인데 남편도 휴가를 쓸 수 있는지, 며칠인지, 급여는 나오는지 궁금한 상황
// Q2. 회사에 배우자 출산휴가 20일을 고지하고, 고용보험에서 급여를 신청한다
// Q3. 20일 유급, 120일 이내 사용, 최대 4회 분할, 급여 월 최대 160만원, 위반 시 500만원 과태료
// Q4. GreenBox(핵심 요약) + Steps(신청 절차) + BorderBox(분할 사용 팁) + Checklist(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

const STEPS_APPLY = [
  {
    title: "회사에 휴가 사용을 고지하세요",
    desc: "배우자 출산휴가는 회사 승인이 필요 없어요. '배우자 출산으로 며칠부터 며칠까지 휴가 사용하겠습니다'라고 알리면 돼요. 회사가 거절할 수 없어요.",
  },
  {
    title: "서류를 제출하세요",
    desc: "배우자 출산휴가 신청서(회사 양식), 가족관계증명서 또는 주민등록등본, 출생증명서 또는 산모수첩을 제출해요. 회사마다 요구 서류가 조금 다를 수 있어요.",
  },
  {
    title: "휴가를 사용하세요",
    desc: "출산일로부터 120일 이내에 사용하면 돼요. 최대 4회까지 분할 사용이 가능해요. 20일을 한 번에 써도 되고, 나눠 써도 돼요.",
  },
  {
    title: "고용보험 급여를 신청하세요",
    desc: "휴가가 끝난 후 12개월 이내에 고용보험(ei.go.kr)에서 '배우자 출산휴가 급여'를 신청해요. 회사가 대신 해주는 경우도 많으니 인사팀에 먼저 물어보세요.",
    link: { label: "고용보험 바로가기", href: "https://www.ei.go.kr" },
  },
];

const CHECK = [
  "배우자 출산휴가 신청서 (회사 양식)",
  "가족관계증명서 또는 주민등록등본",
  "출생증명서 또는 산모수첩",
  "배우자 출산휴가 확인서 (급여 신청 시, 별지 제107호의2서식)",
  "통상임금 확인 서류 (급여명세서 또는 근로계약서)",
];

const FAQS = [
  { q: "배우자 출산휴가는 정확히 며칠인가요?", a: "20일이에요. 2025년 2월 23일부터 기존 10일에서 20일로 확대됐어요." },
  { q: "언제까지 사용해야 하나요?", a: "배우자가 출산한 날로부터 120일 이내에 사용하면 돼요. 기존 90일에서 확대됐어요. 출산 전에도 쓸 수 있어요." },
  { q: "몇 번에 나눠 쓸 수 있나요?", a: "최대 4회까지 분할 사용 가능해요. 예를 들어 출산 직후 10일 + 퇴원 후 5일 + 백일 전후 5일 이렇게 나눌 수 있어요." },
  { q: "급여는 얼마나 받나요?", a: "통상임금 100%를 지원받아요. 월 최대 1,607,650원이에요. 우선지원대상기업(300인 미만)은 20일 전액 고용보험 지원이고, 대기업은 첫 10일 회사 부담 + 나머지 10일 고용보험이에요." },
  { q: "회사가 휴가를 안 주면 어떻게 되나요?", a: "남녀고용평등법 제37조에 따라 500만원 이하 과태료가 부과돼요. 휴가 사용을 이유로 불이익을 줘도 위법이에요. 고용노동부 민원마당(minwon.moel.go.kr)에서 신고하면 돼요." },
  { q: "계약직이나 파트타이머도 쓸 수 있나요?", a: "네, 가능해요. 정규직, 계약직, 파트타이머 구분 없이 근로자라면 누구나 사용할 수 있어요. 고용보험 급여는 피보험기간 180일 이상이어야 받을 수 있어요." },
];

const REFS = [
  { category: "법령", items: [
    { label: "남녀고용평등과 일·가정 양립 지원에 관한 법률", url: "https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률" },
  ]},
  { category: "정부 안내", items: [
    { label: "찾기쉬운 생활법령정보 - 배우자 출산휴가", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1380&ccfNo=1&cciNo=2&cnpClsNo=1" },
    { label: "고용보험 - 배우자 출산휴가 급여", url: "https://www.ei.go.kr" },
    { label: "고용노동부", url: "https://www.moel.go.kr" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 출산 · 육아</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        남편도 출산휴가 20일 받을 수 있나요?<br />
        신청 방법과 급여까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아내 출산이 다가오는데 옆에서 돌봐주고 싶은 마음, 당연하죠?
      </p>
      <p style={body}>
        남편도 <strong>20일 유급휴가</strong>를 받을 수 있어요. 회사 승인 없이 고지만 하면 되고, 고용보험에서 급여도 지원받아요.
        <a href="https://www.law.go.kr/법령/남녀고용평등과일·가정양립지원에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>남녀고용평등법 제18조의2</a>에서 이 권리를 보장하고 있어요.
      </p>

      <Divider />

      <H2>배우자 출산휴가, 핵심만 정리하면 이래요</H2>

      <GreenBox title="배우자 출산휴가 요약">
        {"· 기간: 20일 유급 (2025.2.23부터 확대)\n· 사용 기한: 출산일로부터 120일 이내\n· 분할 사용: 최대 4회\n· 급여: 통상임금 100%, 월 최대 1,607,650원\n· 회사 승인: 불필요 (근로자 고지로 사용)"}
      </GreenBox>

      <Divider />

      <H2>신청은 이렇게 하면 돼요</H2>
      <p style={body}>
        복잡하게 생각할 필요 없어요. 회사에 알리고, 서류 내고, 휴가 쓰고, 급여 신청하면 끝이에요.
      </p>

      <SectionBadge>신청 순서</SectionBadge>
      <Steps steps={STEPS_APPLY} />

      <Divider />

      <H2>분할 사용, 이렇게 계획하세요</H2>
      <p style={body}>
        20일을 한 번에 써도 되지만, 상황에 따라 나눠 쓰는 게 더 효율적일 수 있어요. 4회까지 분할이 가능하니까 미리 계획을 세워보세요.
      </p>

      <BorderBox>
        <strong>분할 사용 예시</strong>{"\n"}
        {"· 1차: 출산 직후 10일 (산후조리원 입소 도움)\n· 2차: 퇴원 후 5일 (집 적응 기간)\n· 3차: 백일 전후 3일 (아기 병원 검진)\n· 4차: 예비일 2일 (긴급 상황 대비)\n\n* 모두 출산일로부터 120일 이내에 사용해야 해요"}
      </BorderBox>

      <Divider />

      <H2>준비해야 할 서류는 이것들이에요</H2>
      <SectionBadge>서류 목록</SectionBadge>
      <Checklist items={CHECK} />

      <p style={body}>
        육아휴직도 함께 계획하고 있다면, 배우자 출산휴가 이후 바로 연결해서 쓸 수 있어요. 인사팀에 미리 상의해 두면 수월해요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 남녀고용평등법에 따라 작성됐어요. 회사별 세부 절차는 인사팀에 문의하세요." />
    </div>
  );
}
