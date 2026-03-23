"use client";

// Q1. 대출 계약 후 후회하거나 급히 서명해서 취소하고 싶은 상황이에요.
// Q2. 14일 이내 철회권 행사 조건을 파악하고 내용증명으로 철회 절차를 진행하는 행동.
// Q3. 철회 기간(14일), 대상 대출(소비자 대출), 위약금 없음, 내용증명 작성법, 예외(주담대·사업자).
// Q4. GreenBox(핵심 요약) + Steps(절차) + DocTable(준비서류) + Checklist(확인사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const STEPS = [
  { title: "철회 기간 확인", desc: "계약서를 받은 날부터 14일 이내인지 확인해요. 계약일이 아니라 계약서 수령일이 기준이에요.", tip: "마지막 날이 공휴일이면 다음 평일까지 연장돼요." },
  { title: "내용증명 작성", desc: "우체국 내용증명으로 '대출 계약을 철회합니다'라고 명확히 적어요. 계약일·대출금액·이름·연락처를 포함해요." },
  { title: "내용증명 발송", desc: "우체국 방문 또는 인터넷우체국에서 내용증명을 보내요. 발송일이 철회일 기준이에요." },
  { title: "원금 반환", desc: "받은 원금을 금융기관 계좌로 이체해요. 이자·위약금은 없어요.", tip: "이체 영수증을 반드시 보관하세요." },
];

const DOCS = [
  { name: "내용증명서 (철회 의사 기재)", required: true, where: "우체국 홈페이지 양식 또는 자필 작성" },
  { name: "대출 계약서 사본", required: true, where: "금융기관에서 수령한 원본 사본" },
  { name: "본인 신분증 사본", required: true, where: "주민등록증 또는 운전면허증" },
  { name: "원금 반환 이체 영수증", required: true, where: "인터넷뱅킹 이체 후 캡처" },
];

const CHECKLIST = [
  "계약서 수령일로부터 14일 이내인지 확인했나요?",
  "개인 소비자 대출인지 확인했나요? (사업자 대출은 제외)",
  "내용증명에 계약일·대출금액·본인 정보를 적었나요?",
  "반환할 금액이 실제 수령 금액과 일치하나요?",
  "이체 영수증과 내용증명 접수증을 보관했나요?",
];

const FAQS = [
  { q: "계약서를 받은 날과 계약한 날이 다르면 어느 쪽 기준이에요?", a: "계약서를 실제로 받은 날이 기준이에요. 3월 1일에 계약했는데 계약서를 3월 5일에 받았다면 3월 5일부터 14일을 세요." },
  { q: "전화로 철회 의사를 전달해도 되나요?", a: "법적으로는 유효하지만 증거가 남지 않아요. 나중에 '연락 받은 적 없다'고 하면 곤란해지니 반드시 내용증명을 이용하세요." },
  { q: "위약금이나 수수료를 요구하면 어떻게 하나요?", a: "14일 이내 철회는 위약금·수수료가 법으로 금지돼 있어요. 거부하고 금융감독원(1332)에 민원을 넣으세요." },
  { q: "주택담보대출도 14일 이내에 철회할 수 있나요?", a: "등기가 완료된 주택담보대출은 철회가 제한돼요. 등기 전이라면 가능할 수 있으니 금융기관에 즉시 확인하세요." },
  { q: "돈을 이미 써버렸으면 철회가 안 되나요?", a: "원금 전액을 반환해야 철회가 완료돼요. 다른 곳에서 빌려서라도 14일 안에 돌려주면 위약금 없이 취소 가능해요." },
  { q: "대부업체 대출과 은행 대출 모두 철회 가능한가요?", a: "네, 개인 소비자 대출이면 은행·저축은행·캐피탈·대부업체 대출 모두 14일 이내 철회가 가능해요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "대부업 등의 등록 및 금융이용자 보호에 관한 법률", url: "https://www.law.go.kr/법령/대부업등의등록및금융이용자보호에관한법률" },
      { label: "여신전문금융업법", url: "https://www.law.go.kr/법령/여신전문금융업법" },
      { label: "금융감독원 민원상담", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "대출-사기-주의사항", title: "대출 사기 유형과 예방법", description: "보이스피싱·불법대부업 피해를 막는 체크리스트예요." },
  { slug: "신용등급-조회-방법", title: "신용등급 조회 방법", description: "무료로 내 신용점수를 확인하는 3가지 방법이에요." },
  { slug: "마이너스-통장-관리", title: "마이너스 통장 관리와 이자", description: "한도대출 이자 줄이는 실전 관리법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 대출 · 소비자보호</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        대출 계약 후 마음이 바뀌었다면?<br />
        14일 이내 철회권 조건과 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        급하게 서명한 대출, 집에 와서 다시 계산해보니 감당이 안 되죠?
        계약서를 받은 날부터 14일 안에 철회하면 위약금 없이 원금만 돌려주면 돼요.
        <a href="https://www.law.go.kr/법령/대부업등의등록및금융이용자보호에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>대부업법</a>이 보장하는 청약철회권, 조건과 절차를 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      {/* ── 섹션 1: 철회권 핵심 조건 ── */}
      <H2>철회권, 누가 언제 쓸 수 있나요?</H2>
      <p style={body}>
        개인 소비자 대출을 받은 사람이라면 이유를 불문하고 14일 안에 계약을 취소할 수 있어요.
        &quot;그냥 마음이 바뀌었어요&quot;만으로도 충분하죠. 은행·저축은행·캐피탈·대부업체 대출이 모두 해당돼요.
      </p>
      <p style={body}>
        기간은 &lsquo;계약서를 실제로 받은 날&rsquo;부터 시작해요. 계약한 날이 아니에요.
        3월 1일에 서명하고 계약서를 3월 5일에 받았다면 3월 18일까지 철회할 수 있어요.
        마지막 날이 토요일이나 공휴일이면 다음 영업일까지 연장되고요.
      </p>

      <GreenBox title="핵심 정리">
        대상: 개인 소비자 대출 (은행·저축은행·캐피탈·대부업체)<br />
        기간: 계약서 수령일로부터 14일 이내<br />
        비용: 위약금·이자·수수료 전혀 없음. 원금만 반환<br />
        방법: 내용증명으로 철회 의사 전달 → 원금 이체
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      {/* ── 섹션 2: 절차 ── */}
      <H2>내용증명부터 원금 반환까지 절차</H2>
      <p style={body}>
        전화로도 법적으로 유효하지만, 증거가 남지 않아서 위험해요.
        내용증명을 보내면 &lsquo;언제, 무슨 내용을 보냈는지&rsquo; 법적으로 증명할 수 있어요.
        우체국 방문 또는 인터넷우체국에서 보낼 수 있고, 접수일이 철회일 기준이에요.
      </p>

      <SectionBadge>철회 절차 4단계</SectionBadge>
      <Steps steps={STEPS} />

      <p style={body}>
        원금을 돌려줄 때 수수료를 제외하고 받은 경우엔 실제 입금된 금액만 반환하면 돼요.
        이체 영수증은 분쟁 대비용으로 최소 3년 보관하세요.
      </p>

      <Divider />

      {/* ── 섹션 3: 준비 서류 ── */}
      <H2>준비해야 할 서류가 뭔가요?</H2>
      <p style={body}>
        내용증명 발송과 원금 반환 시 아래 서류를 미리 챙겨두면 빠르게 처리할 수 있어요.
        내용증명 양식은 우체국 홈페이지에서 다운로드 가능하고, 직접 작성해도 돼요.
      </p>

      <SectionBadge>필요 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* ── 섹션 4: 철회 불가 경우 ── */}
      <H2>철회가 안 되는 경우도 있나요?</H2>
      <p style={body}>
        모든 대출이 다 되는 건 아니에요. 아래 세 가지는 주의하세요.
      </p>

      <BorderBox>
        <b>14일 경과</b>: 기간이 지나면 철회권이 소멸돼요. 중도상환 수수료를 내고 갚아야 해요.<br /><br />
        <b>등기가 완료된 담보대출</b>: 주택담보대출·전세자금대출은 등기가 끝나면 철회가 제한돼요.<br /><br />
        <b>사업자 대출</b>: 개인 소비자 대출만 보호받아요. 사업 목적 대출은 계약서 조건대로 처리돼요.
      </BorderBox>

      <p style={body}>
        금융기관이 수수료나 위약금을 요구하면 &quot;청약철회권을 행사해요. 법으로 위약금이 금지돼 있어요&quot;라고 말하고,
        계속 요구하면 <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a>(1332)에 민원을 넣으세요.
      </p>

      <SectionBadge>철회 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 대부업법·여신전문금융업법을 바탕으로 작성됐어요. 금융상품별 세부 조건은 금융기관에 직접 확인하세요." />
    </ArticleLayout>
  );
}
