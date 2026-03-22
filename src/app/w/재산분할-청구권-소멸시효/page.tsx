"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// Q1: 이혼 후 재산분할을 청구하고 싶은데 기한이 있는지 걱정되는 상황
// Q2: 이혼한 날부터 2년 안에 가정법원에 재산분할 심판 청구
// Q3: 제척기간 2년, 협의이혼 vs 재판이혼 기산일 차이, 소멸시효와 차이, 숨긴 재산 발견 시
// Q4: GreenBox(핵심 결론) + BorderBox(기산일 비교) + Checklist(행동) + FAQ

const CHECKLIST = [
  "이혼 성립일 확인: 협의이혼은 구청 신고일, 재판이혼은 판결 확정일",
  "이혼일로부터 2년 만료일 계산해서 달력에 표시",
  "상대방 재산 목록 정리: 부동산, 예금, 주식, 보험, 퇴직금 등",
  "숨긴 재산이 있을 수 있으니 재산조회 신청 준비",
  "2년 기한 전에 가정법원에 재산분할 심판 청구서 제출",
  "국민연금 분할연금도 함께 챙기기",
];

const FAQS = [
  { q: "2년이 지나면 정말 아무것도 못 받나요?", a: "맞아요. 재산분할 청구권은 제척기간이라서 2년이 지나면 법원에 청구해도 각하돼요. 소멸시효처럼 중단이나 정지가 안 되니까 기한을 꼭 지켜야 해요." },
  { q: "나중에 숨긴 재산을 발견해도 2년 안에 청구해야 하나요?", a: "네, 숨긴 재산이 나중에 나와도 기한은 이혼한 날부터 계산돼요. 다만 2년 안에 일부 재산만 먼저 청구한 경우, 같은 소송에서 나중에 발견한 재산을 추가 주장할 수 있어요." },
  { q: "협의이혼과 재판이혼의 기산일이 다른가요?", a: "달라요. 협의이혼은 구청에 이혼신고서를 접수한 날, 재판이혼은 법원 판결이 확정된 날부터 2년이에요." },
  { q: "재산분할 심판 청구는 어디에 하나요?", a: "상대방 주소지 관할 가정법원에 재산분할 심판 청구서를 제출하면 돼요. 대법원 홈페이지(scourt.go.kr)에서 가사사건 안내를 확인할 수 있어요." },
  { q: "소멸시효랑 제척기간이 뭐가 다른가요?", a: "소멸시효는 내용증명 발송 같은 행위로 중단시킬 수 있어요. 하지만 제척기간은 절대적이에요. 어떤 행위로도 기한을 연장하거나 중단할 수 없죠." },
  { q: "국민연금 분할연금도 2년 안에 청구해야 하나요?", a: "분할연금은 재산분할과 별개 제도예요. 이혼 후 국민연금공단에 별도 신청하면 되고, 혼인 기간 5년 이상이면 상대방 연금의 절반을 나눠 받을 수 있죠." },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "민법 제839조의2: 재산분할청구권", url: "https://www.law.go.kr/법령/민법" },
    ],
  },
  {
    category: "판례·공식 자료",
    items: [
      { label: "대법원 2023므11819: 제척기간 준수 확인", url: "https://casenote.kr/대법원/2023므11819" },
      { label: "찾기쉬운 생활법령정보: 재산분할", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=4&cciNo=2&cnpClsNo=4" },
      { label: "대법원 가사사건 안내", url: "https://www.scourt.go.kr" },
    ],
  },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>가정법률 · 이혼</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이혼 후 재산분할, 언제까지 청구할 수 있을까?<br />
        2년 제척기간과 청구 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이혼하고 나서 재산을 나눠달라고 할 수 있는 기한이 정해져 있어요.
        <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법 제839조의2</a>에 따르면
        이혼한 날부터 <strong>2년 이내</strong>에 청구해야 하고, 이 기한을 넘기면 아예 청구 자체가 불가능해요.
        소멸시효와 달리 중단이나 연장이 안 되는 <strong>제척기간</strong>이라서, 하루라도 늦으면 끝이에요.
      </p>

      <Divider />

      <H2>2년 기한은 언제부터 시작하나요?</H2>
      <p style={body}>
        이혼 유형에 따라 기산일이 달라요.
        <strong>협의이혼</strong>은 구청에 이혼신고서를 접수한 그날부터 2년이에요.
        <strong>재판이혼</strong>은 법원 판결이 확정된 날부터 2년이죠.
      </p>
      <p style={body}>
        예를 들어 2024년 3월 1일에 협의이혼 신고를 했다면, 2026년 2월 28일까지 가정법원에 청구해야 해요.
        하루라도 넘기면 법원이 각하하니까, 여유 있게 움직이세요.
      </p>

      <BorderBox>
        협의이혼: 이혼신고 접수일부터 2년 (예: 2024.3.1 → 2026.2.28까지)<br />
        재판이혼: 판결 확정일부터 2년 (예: 2024.6.15 → 2026.6.14까지)
      </BorderBox>

      <Divider />

      <H2>소멸시효랑 뭐가 다른가요?</H2>
      <p style={body}>
        핵심 차이는 <strong>중단 가능 여부</strong>예요. 소멸시효는 내용증명을 보내거나 소송을 제기하면 시효가 중단(정지)돼요.
        하지만 제척기간은 어떤 행위로도 기한을 연장하거나 중단할 수 없어요. 2년이 지나면 그걸로 끝이에요.
      </p>
      <p style={body}>
        이혼 후 재산이 어디에 있는지 모르겠다고요? 그래도 2년은 이혼한 날부터 흘러가요.
        나중에 상대방이 숨긴 재산을 발견해도 기한은 동일하죠.
        2023년 대법원 판결(2023므11819)에서도 2년 안에 법원에 청구만 하면 된다고 확인했어요.
        먼저 일부 재산만 청구해두고, 같은 소송에서 나중에 발견한 재산을 추가 주장하는 건 가능해요.
      </p>

      <GreenBox title="제척기간 vs 소멸시효">
        제척기간(재산분할): 2년 경과 시 권리 소멸, 중단·연장 <strong>불가</strong><br />
        소멸시효(일반 채권): 내용증명, 소송 등으로 중단·정지 <strong>가능</strong>
      </GreenBox>

      <Divider />

      <H2>2년 안에 뭘 해야 하나요?</H2>
      <p style={body}>
        가장 중요한 건 <strong>가정법원에 재산분할 심판 청구서를 제출</strong>하는 거예요.
        상대방 주소지 관할 가정법원에 청구하면 돼요. 협의가 안 되면 바로 심판 청구를 하세요.
        2년 안에 &ldquo;법원에 청구&rdquo;하는 게 기준이지, 판결이 2년 안에 나와야 하는 건 아니에요.
      </p>
      <p style={body}>
        상대방 재산이 어디에 있는지 모르면 법원에 재산조회를 신청할 수 있어요.
        부동산, 예금, 주식, 보험, 퇴직금 등을 한 번에 조회하는 제도가 있으니까요.
        <a href="/w/국민연금-분할연금" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금 분할연금</a>도 이혼 후 별도로 신청할 수 있으니 함께 챙기세요.
      </p>

      <SectionBadge>지금 해야 할 일 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민법과 대법원 판례를 바탕으로 작성했어요. 재산분할은 개별 사안마다 결과가 크게 달라지니, 구체적인 사안은 변호사 상담을 받으세요." />
    </div>
  );
}
