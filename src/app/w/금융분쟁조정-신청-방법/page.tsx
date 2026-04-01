"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 은행이나 보험사에 억울한 일을 당해서 소송 없이 빠르게 해결하고 싶은 상황
// Q2. 금융감독원에 분쟁조정을 신청하고, 조정안을 수락해서 분쟁을 종결한다
// Q3. 신청 대상(금융회사 분쟁), 3가지 접수 방법, 처리 기간(30일+60일), 조정안 효력(재판상 화해)
// Q4. Steps(신청 절차) + GreenBox(핵심 요약) + BorderBox(효력) + DocTable(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, References, Disclaimer,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "금융감독원 홈페이지에서 신청하세요",
    desc: "fss.or.kr에 접속해서 '분쟁조정 신청하기' 메뉴에서 신청서를 작성해요. 방문은 서울 여의도 본원이나 전국 지원에서 가능하고, 우편 접수도 돼요.",
    link: { label: "금융감독원 바로가기", href: "https://www.fss.or.kr" },
  },
  {
    title: "금융감독원장이 합의를 권고해요",
    desc: "신청을 받으면 내용을 금융회사에 통지하고 30일 이내에 합의를 권고해요. 이 단계에서 합의되면 바로 종결돼요.",
  },
  {
    title: "합의 불성립 시 조정위원회에 회부돼요",
    desc: "합의가 안 되면 금융분쟁조정위원회로 넘어가요. 위원회는 60일 이내에 조정안을 작성해요. 신청부터 최대 90일이면 결과가 나오는 거예요.",
  },
  {
    title: "조정안을 수락하면 종결돼요",
    desc: "조정안을 받은 날부터 20일 이내에 수락 여부를 결정해요. 양쪽이 수락하면 재판상 화해와 동일한 효력이 생겨요. 한쪽이라도 거부하면 조정 불성립이고, 소송으로 갈 수 있어요.",
  },
];

const DOCS = [
  { name: "분쟁조정신청서", required: true, where: "금융감독원 홈페이지 양식" },
  { name: "관련 증거서류 (계약서, 거래내역서)", required: true, where: "본인 보관 자료" },
  { name: "신청인 신분증 사본", required: true, where: "본인 지참" },
  { name: "위임장 + 인감증명서 (대리인 신청 시)", required: false, where: "본인 작성" },
  { name: "대리인 신분증 사본 (대리인 신청 시)", required: false, where: "대리인 지참" },
];

const FAQS = [
  { q: "금융분쟁조정 신청에 비용이 드나요?", a: "무료예요. 신청비도 없고, 대리인을 쓸 때 드는 비용만 본인이 부담하면 돼요. 소송보다 비용 부담이 훨씬 적어요." },
  { q: "처리 기간은 얼마나 걸리나요?", a: "합의 권고 30일 + 조정안 작성 60일 = 최대 90일이에요. 합의 단계에서 끝나면 30일 안에 해결될 수도 있어요." },
  { q: "조정안에 불복하면 어떻게 되나요?", a: "조정안 제시받고 20일 내에 거부하면 돼요. 답이 없으면 거부한 걸로 봐요. 이후 법원에 소송을 제기할 수 있고, 조정 과정에서 모은 자료가 소송에 도움이 돼요." },
  { q: "금융회사가 조정안을 이행 안 하면요?", a: "양쪽이 수락한 조정안은 재판상 화해와 동일한 효력이에요. 금융회사가 이행하지 않으면 강제집행도 가능해요." },
  { q: "보험금 분쟁도 조정 대상인가요?", a: "네, 대상이에요. 보험금 지급 거부, 보험 해약 분쟁, 보험 모집 과정에서의 부당행위 모두 조정 신청이 가능해요. 보험 분쟁이 금융분쟁조정에서 가장 많은 비중을 차지해요." },
  { q: "한국소비자원 분쟁조정과 뭐가 다른가요?", a: "한국소비자원은 일반 소비자분쟁을 다루고, 금융감독원은 금융 전문 분쟁을 다뤄요. 금융 거래 관련이면 금융감독원이 전문성이 높아서 유리해요." },
];

const REFS = [
  { category: "기관", items: [
    { label: "금융감독원 금융민원상담", url: "https://www.fss.or.kr/fss/main/sub1.do?menuNo=201093" },
    { label: "찾기쉬운 생활법령정보 - 금융분쟁조정", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=572&ccfNo=6&cciNo=2&cnpClsNo=1" },
  ]},
  { category: "법령", items: [
    { label: "금융분쟁조정세칙", url: "https://www.law.go.kr/행정규칙/금융분쟁조정세칙" },
  ]},
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 분쟁 해결</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        금융회사에 억울한 일 당했다면?<br />
        금융분쟁조정 신청 방법과 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        은행이나 보험사에서 부당한 대우를 받았는데 소송은 시간도 돈도 부담되시죠?
      </p>
      <p style={body}>
        <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a>에 분쟁조정을 신청하면 <strong>무료</strong>로 빠르게 해결할 수 있어요.
        최대 90일이면 결과가 나오고, 양쪽이 수락한 조정안은 재판상 화해와 같은 효력이 생기죠.
      </p>

      <Divider />

      <H2>어떤 분쟁을 조정받을 수 있나요?</H2>
      <p style={body}>
        은행, 저축은행, 보험, 증권, 카드 등 금융회사와 금융거래로 분쟁이 생긴 경우 누구나 신청할 수 있어요. 대출 거절, 보험금 지급 거부, 카드 부당청구, 예금 인출 거부 같은 문제가 대표적이에요.
      </p>

      <GreenBox title="금융분쟁조정 핵심 요약">
        {"· 신청비: 무료\n· 처리 기간: 최대 90일 (합의 30일 + 조정 60일)\n· 조정안 수락 시: 재판상 화해와 동일한 효력\n· 접수 방법: 온라인, 방문(여의도 본원/지원), 우편"}
      </GreenBox>

      <p style={body}>
        다만 이미 소송 중이거나 판결이 확정된 사건은 조정 대상이 아니에요. 분쟁 금액이 2천만원 이하면 금융감독원장이 먼저 합의를 권고하고, 2천만원을 초과하면 바로 조정위원회로 가요.
      </p>

      <Divider />

      <H2>신청은 어떻게 하나요?</H2>
      <p style={body}>
        온라인, 방문, 우편 3가지 방법으로 신청할 수 있어요. 본인이 직접 하는 게 원칙이지만 대리인도 가능해요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>어떤 서류가 필요한가요?</H2>
      <SectionBadge>제출 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        증거 자료를 꼼꼼하게 준비할수록 유리해요. 계약서, 녹취록, 문자 메시지, 이메일 등 분쟁 관련 자료를 빠짐없이 제출하세요.
      </p>

      <Divider />

      <H2>조정안의 효력은 어디까지인가요?</H2>
      <p style={body}>
        양쪽이 조정안을 수락하면 법적으로 재판상 화해와 동일한 효력이 생겨요. 확정판결과 같은 효과라서 별도 소송이 필요 없어요.
      </p>

      <BorderBox>
        <strong>조정안 수락/거부에 따른 결과</strong>{"\n"}
        {"· 양쪽 수락: 재판상 화해 효력 → 금융회사 미이행 시 강제집행 가능\n· 한쪽 거부: 조정 불성립 → 법원 소송 가능 (조정 과정 자료 활용 가능)\n· 20일 내 무응답: 거부로 간주"}
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFS} />
      <Disclaimer text="이 글은 2026년 3월 기준 금융분쟁조정세칙에 따라 작성됐어요. 구체적인 분쟁 사례는 금융감독원 금융민원상담(1332)에 문의하세요." />
    </div>
  );
}
