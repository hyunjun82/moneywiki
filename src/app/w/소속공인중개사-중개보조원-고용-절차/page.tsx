"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "소속공인중개사와 중개보조원 차이: 소속공인중개사는 공인중개사 자격증 있는 사람이에요. 개업공인중개사를 도와 중개업무 전반을 할 수 있어요.",
  "고용 전 필수 교육: 소속공인중개사로 고용하려면 실무교육 수료증이 필요해요.",
  "소속공인중개사 고용 신고: 정부24에서 온라인 신고 가능해요.",
  "중개보조원 고용 신고: 중개보조원 신고도 정부24에서 해요.",
  "고용관계 종료 신고: 직원이 퇴사하면 종료된 날부터 10일 이내에 신고해야 해요.",
  "고용 시 주의사항: 이중 고용은 절대 안 돼요. 한 사람이 두 곳 이상에서 동시에 일할 수 없어요.",
];

const FAQS = [
  { q: "공인중개사를 중개보조원으로 고용해도 되나요?", a: "안 돼요. 공인중개사 자격 있으면 소속공인중개사로만 고용 가능해요. 중개보조원으로 신고하면 위법이에요." },
  { q: "고용 신고 안 하고 일 시키면 어떻게 되나요?", a: "300만원 이하 과태료 부과돼요. 고용관계 종료 신고 안 해도 마찬가지예요." },
  { q: "다른 중개사무소에서 이미 일하는 사람을 우리 사무소에도 고용할 수 있나요?", a: "안 돼요. 이중 고용은 금지돼요. 기존 사무소에서 고용관계 종료 신고한 후에만 가능해요." },
  { q: "소속공인중개사와 중개보조원 차이에 대해 알려주세요", a: "소속공인중개사는 공인중개사 자격증 있는 사람이에요. 개업공인중개사를 도와 중개업무 전반을 할 수 있어요." },
  { q: "고용 전 필수 교육에 대해 알려주세요", a: "소속공인중개사로 고용하려면 실무교육 수료증이 필요해요." },
  { q: "소속공인중개사 고용 신고에 대해 알려주세요", a: "정부24에서 온라인 신고 가능해요." },
  { q: "중개보조원 고용 신고에 대해 알려주세요", a: "중개보조원 신고도 정부24에서 해요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "공인중개사법", url: "https://www.law.go.kr" },
      { label: "찾기쉬운 생활법령정보 - 공인중개사 고용", url: "https://www.easylaw.go.kr" },
      { label: "정부24 소속공인중개사 고용 신고", url: "https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A09005&CappBizCD=15000000689" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>소속공인중개사 중개보조원 고용 절차 2026</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>중개사무소 운영하는데 업무가 많아져서 소속공인중개사나 중개보조원 한 명 뽑으려고요. 어떤 절차 거쳐야 하나요?</p>
      <Divider />

      <H2>소속공인중개사와 중개보조원 차이</H2>
      <p style={body}>소속공인중개사는 공인중개사 자격증 있는 사람이에요. 개업공인중개사를 도와 중개업무 전반을 할 수 있어요.</p>
      <p style={body}>중개보조원은 자격증 없어도 돼요. 대신 중개 계약 체결은 못 하고, 단순 보조 업무만 해요.</p>
      <p style={body}>소속공인중개사는 실무교육 수료해야 하고, 중개보조원은 직무교육 수료해야 해요.</p>
      <GreenBox title="핵심 요약">소속공인중개사는 공인중개사 자격증 있는 사람이에요. 개업공인중개사를 도와 중개업무 전반을 할 수 있어요.<br />중개보조원은 자격증 없어도 돼요. 대신 중개 계약 체결은 못 하고, 단순 보조 업무만 해요.</GreenBox>
      <Divider />

      <H2>고용 전 필수 교육</H2>
      <p style={body}>소속공인중개사로 고용하려면 실무교육 수료증이 필요해요.</p>
      <p style={body}>한국공인중개사협회에서 실무교육 받을 수 있어요. 보통 2~3일 과정이에요.</p>
      <p style={body}>중개보조원은 직무교육을 받아야 해요. 역시 공인중개사협회에서 교육해요.</p>
      <BorderBox><p style={body}>소속공인중개사로 고용하려면 실무교육 수료증이 필요해요.</p></BorderBox>
      <Divider />

      <H2>소속공인중개사 고용 신고</H2>
      <p style={body}>정부24에서 온라인 신고 가능해요.</p>
      <p style={body}>신고서, 공인중개사자격증 사본, 실무교육수료증 사본, 인감을 준비하세요.</p>
      <p style={body}>인감은 소속공인중개사가 계약서에 찍을 도장이에요. 등록관청에 인장등록도 함께 해요.</p>
      <Divider />

      <H2>중개보조원 고용 신고</H2>
      <p style={body}>중개보조원 신고도 정부24에서 해요.</p>
      <p style={body}>신고서와 직무교육수료증 사본만 있으면 돼요. 인장등록은 필요 없어요.</p>
      <p style={body}>중개보조원은 계약 체결 권한 없으니까요.</p>
      <Divider />

      <H2>고용관계 종료 신고</H2>
      <p style={body}>직원이 퇴사하면 종료된 날부터 10일 이내에 신고해야 해요.</p>
      <p style={body}>신고서만 제출하면 돼요. 온라인이나 방문 신고 모두 가능해요.</p>
      <p style={body}>신고 안 하면 이중 고용 문제 생길 수 있어요. 전 직장에서 종료 신고 안 한 상태로 다른 곳에서 일하면 둘 다 과태료 받아요.</p>
      <Divider />

      <H2>고용 시 주의사항</H2>
      <p style={body}>이중 고용은 절대 안 돼요. 한 사람이 두 곳 이상에서 동시에 일할 수 없어요.</p>
      <p style={body}>공인중개사 자격 있는 사람을 중개보조원으로 신고하면 안 돼요. 무조건 소속공인중개사로 고용해야 해요.</p>
      <p style={body}>교육 수료 전에 일 시키면 안 돼요. 교육 먼저 받고 신고 후 업무 시작해야 해요.</p>
      <Divider />

      <H2>고용 신고 서류 제출처</H2>
      <p style={body}>중개사무소 등록한 시·군·구청에 제출해요.</p>
      <p style={body}>서울시는 자치구청, 지방은 시·군청 민원과나 건설과예요.</p>
      <p style={body}>온라인은 정부24, 오프라인은 직접 방문하면 돼요.</p>
      <Divider />

      <H2>직원 채용 시 확인사항</H2>
      <p style={body}>소속공인중개사는 자격증 진위 확인하세요. 한국산업인력공단에서 조회 가능해요.</p>
      <p style={body}>교육 수료 여부도 확인하세요. 협회에 문의하면 확인해 줘요.</p>
      <p style={body}>이전 직장 고용관계 종료 신고됐는지 확인하세요. 이중 고용 방지하려면 필수예요.</p>
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
