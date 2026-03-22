"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "외국인근로자 재입국 제도가 뭔가요?: 성실하게 일한 외국인근로자가 출국 후 빨리 다시 입국해서 일할 수 있는 제도예요.",
  "외국인근로자 재입국 신청 조건은 뭔가요?: 사업장 변경 없이 4년 10개월 근무해야 해요.",
  "외국인근로자 재입국 절차는 어떻게 되나요?: 출국 전에 고용주가 재고용 신청해야 해요.",
  "외국인근로자 재입국 관련 주의사항은요?: 재입국 특례는 1번만 사용 가능해요.",
];

const FAQS = [
  { q: "외국인근로자 재입국은 몇 번 가능한가요?", a: "1번만 가능해요. 최초 4년 10개월 + 재입국 후 4년 10개월, 총 최대 9년 8개월 일할 수 있어요" },
  { q: "외국인근로자 재입국 특례 없이도 다시 올 수 있나요?", a: "가능해요. 하지만 일반 절차로는 출국 후 6개월 기다려야 하고 한국어 시험도 다시 봐야 해요" },
  { q: "외국인근로자 재입국 제도가 뭔가요?", a: "성실하게 일한 외국인근로자가 출국 후 빨리 다시 입국해서 일할 수 있는 제도예요." },
  { q: "외국인근로자 재입국 신청 조건은 뭔가요?", a: "사업장 변경 없이 4년 10개월 근무해야 해요." },
  { q: "외국인근로자 재입국 절차는 어떻게 되나요?", a: "출국 전에 고용주가 재고용 신청해야 해요." },
  { q: "외국인근로자 재입국 관련 주의사항은요?", a: "재입국 특례는 1번만 사용 가능해요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "찾기쉬운 생활법령정보 - 재입국 취업", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=2042&ccfNo=3&cciNo=2&cnpClsNo=3" },
      { label: "고용노동부 - 성실외국인근로자 재입국", url: "https://www.moel.go.kr/news/enews/report/enewsView.do?news_seq=12802" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 근로</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>외국인근로자 재입국 취업 특례: 외국인근로자 재입국 제도 및 신청 조건</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>&quot;E-9 비자로 4년 넘게 일했어요. 계속 일하고 싶은데 어떻게 하나요?&quot;</p>
      <Divider />

      <H2>외국인근로자 재입국 제도가 뭔가요?</H2>
      <p style={body}>성실하게 일한 외국인근로자가 출국 후 빨리 다시 입국해서 일할 수 있는 제도예요.</p>
      <p style={body}>일반적으로 E-9 비자는 4년 10개월까지만 일할 수 있어요. 더 일하려면 한 번 나갔다가 다시 와야 하는데, 보통은 6개월 기다려야 하고 한국어 시험도 다시 봐야 해요.</p>
      <p style={body}>하지만 성실근로자 재입국 특례를 받으면 3개월만 기다리면 돼요. 한국어 시험이나 취업 교육도 면제돼요. 찾기쉬운 생활법령정보에서 자세한 내용을 확인할 수 있어요.</p>
      <GreenBox title="핵심 요약">성실하게 일한 외국인근로자가 출국 후 빨리 다시 입국해서 일할 수 있는 제도예요.<br />일반적으로 E-9 비자는 4년 10개월까지만 일할 수 있어요. 더 일하려면 한 번 나갔다가 다시 와야 하는데, 보통은 6개월 기다려야 하고 한국</GreenBox>
      <Divider />

      <H2>외국인근로자 재입국 신청 조건은 뭔가요?</H2>
      <p style={body}>사업장 변경 없이 4년 10개월 근무해야 해요.</p>
      <p style={body}>성실근로자로 인정받으려면 까다로운 조건이 있어요. 한 직장에서 오래 성실하게 일했다는 증거가 필요해요.</p>
      <p style={body}>- E-9 비자로 4년 10개월 근무 완료해야 해요</p>
      <BorderBox><p style={body}>사업장 변경 없이 4년 10개월 근무해야 해요.</p></BorderBox>
      <Divider />

      <H2>외국인근로자 재입국 절차는 어떻게 되나요?</H2>
      <p style={body}>출국 전에 고용주가 재고용 신청해야 해요.</p>
      <p style={body}>재입국 특례를 받으려면 출국 전에 준비를 다 끝내야 해요. 출국한 다음에는 신청할 수 없으니까 주의하세요.</p>
      <p style={body}>1단계: 출국 전 준비 (고용주가 해야 할 일)</p>
      <Divider />

      <H2>외국인근로자 재입국 관련 주의사항은요?</H2>
      <p style={body}>재입국 특례는 1번만 사용 가능해요.</p>
      <p style={body}>재입국 특례로 다시 한국에 와서 4년 10개월 일하면 끝이에요. 그 다음에는 일반 절차로 출국하고 6개월 기다려야 해요.</p>
      <p style={body}>title 성실근로자 재입국 특례 타임라인</p>
      <Divider />
      <H2>핵심 체크리스트</H2>
      <p style={body}>핵심 사항을 정리했어요.</p>
      <SectionBadge>체크 항목</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>관련 질문을 모았어요.</p>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성됐어요. 최신 기준은 관련 기관에서 확인하세요." />
    </div>
  );
}
