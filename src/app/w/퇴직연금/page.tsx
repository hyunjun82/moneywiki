"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "퇴직연금 세 가지 종류 정확히 이해하기: 퇴직연금은 운용 방식에 따라 세 가지로 나뉘어요.",
  "DB형과 DC형 정확히 비교해보세요: 실제로 DB형과 DC형이 어떻게 다른지 비교 테이블로 보면:",
  "IRP로 추가 납입해 세액공제 받기: IRP는 DB형, DC형과 별개로 선택적으로 가입할 수 있어요.",
  "연금 수령으로 세금을 크게 줄이세요: 퇴직연금을 받는 방법에 따라 세금이 완전히 달라져요.",
  "중도에 꺼내기 어려우니 주의하세요: 퇴직연금은 노후 자금이라서 함부로 꺼낼 수 없어요.",
  "본인의 퇴직연금 상태 확인하기: 현재 가입한 퇴직연금의 상태를 확인하려면 금융감독원 통합연금포털을 이용하세요.",
];

const FAQS = [
  { q: "DB형과 DC형 중 뭐를 선택해야 해요?", a: "투자에 관심 없으면 DB형, 직접 운용하고 싶으면 DC형 선택하면 돼요. 회사가 이미 선택했다면 못 바꾸는 경우가 많아요." },
  { q: "IRP는 무조건 가입해야 하나요?", a: "선택사항이에요. 퇴직금을 IRP로 받거나, 추가로 납입해서 세액공제 받을 수 있어요." },
  { q: "연금으로 받으면 세금이 진짜 덜 나와요?", a: "네. 일시금은 퇴직소득세 3~5%지만, 연금은 연금소득세 3.3~5.5%로 더 적어요." },
  { q: "퇴직연금 세 가지 종류 정확히 이해하기에 대해 알려주세요", a: "퇴직연금은 운용 방식에 따라 세 가지로 나뉘어요." },
  { q: "DB형과 DC형 정확히 비교해보세요에 대해 알려주세요", a: "실제로 DB형과 DC형이 어떻게 다른지 비교 테이블로 보면:" },
  { q: "IRP로 추가 납입해 세액공제 받기에 대해 알려주세요", a: "IRP는 DB형, DC형과 별개로 선택적으로 가입할 수 있어요." },
  { q: "연금 수령으로 세금을 크게 줄이세요에 대해 알려주세요", a: "퇴직연금을 받는 방법에 따라 세금이 완전히 달라져요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "근로자퇴직급여보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "고용노동부 퇴직연금제도", url: "https://www.moel.go.kr/policy/policyinfo/retire/list.do" },
      { label: "근로자퇴직급여보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "금융감독원 통합연금포털", url: "https://pension.fss.or.kr" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>고용 · 근로</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>퇴직연금 종류 DB형과 DC형 비교</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>회사에서 퇴직연금에 가입했대요. DB형, DC형, IRP 중에 뭐가 좋은지 헷갈리시죠. 종류도 많고, 각각 특징이 달라서 어떤 걸 선택해야 할지 모르겠으신 거죠.</p>
      <Divider />

      <H2>퇴직연금 세 가지 종류 정확히 이해하기</H2>
      <p style={body}>퇴직연금은 운용 방식에 따라 세 가지로 나뉘어요.</p>
      <p style={body}>DB형(확정급여형)은 회사가 모든 운용을 책임지는 방식이에요. 퇴직할 때 받을 금액이 미리 확정돼 있어요. 퇴직 직전 3개월 평균임금 × 근속연수로 계산하는 방식은 기존 퇴직금과 같습니다. 회사가 펀드나 채권에 투자해서 수익을 만들어내면, 그걸 근로자에게 지급해요. 투자에 손실이 나더라도 정해진 금액은 보장돼요.</p>
      <p style={body}>DC형(확정기여형)은 개인이 직접 운용하는 방식이에요. 회사가 매년 연봉의 1/12 이상을 적립해주면, 그 돈을 본인이 펀드나 예금으로 직접 선택해서 투자해요. 조심스럽게 보수적으로 운용할 수도 있고, 적극적으로 공격적으로 운용할 수도 있어요. 운용을 잘하면 예상보다 더 많이 받을 수 있지만, 투자 손실이 나면 퇴직금이 줄어드는 거죠.</p>
      <GreenBox title="핵심 요약">퇴직연금은 운용 방식에 따라 세 가지로 나뉘어요.<br />DB형(확정급여형)은 회사가 모든 운용을 책임지는 방식이에요. 퇴직할 때 받을 금액이 미리 확정돼 있어요. 퇴직 직전 3개월 평균임금 × 근속연</GreenBox>
      <Divider />

      <H2>DB형과 DC형 정확히 비교해보세요</H2>
      <p style={body}>실제로 DB형과 DC형이 어떻게 다른지 비교 테이블로 보면:</p>
      <p style={body}>| 항목 | DB형 | DC형 |</p>
      <p style={body}>|------|------|------|</p>
      <BorderBox><p style={body}>실제로 DB형과 DC형이 어떻게 다른지 비교 테이블로 보면:</p></BorderBox>
      <Divider />

      <H2>IRP로 추가 납입해 세액공제 받기</H2>
      <p style={body}>IRP는 DB형, DC형과 별개로 선택적으로 가입할 수 있어요.</p>
      <p style={body}>퇴직금을 받으면 IRP로 옮길 수 있어요. 또는 직장을 다니면서도 추가로 돈을 납입할 수 있어요. 연간 1,800만원까지 납입할 수 있고, 그중 900만원(연금저축 포함)까지 세액공제를 받아요.</p>
      <p style={body}>총급여 5,500만원 이하면 16.5% 세액공제예요. 900만원 납입하면 148만500원(900만원 × 16.5%)을 돌려받는 거죠.</p>
      <Divider />

      <H2>연금 수령으로 세금을 크게 줄이세요</H2>
      <p style={body}>퇴직연금을 받는 방법에 따라 세금이 완전히 달라져요.</p>
      <p style={body}>일시금으로 받을 때: 퇴직소득세가 적용돼요. 근속연수가 길수록 공제가 커져서 대략 3~5% 정도의 세금을 냅니다.</p>
      <p style={body}>55세 이후 연금으로 받을 때: 연금소득세 3.3~5.5%만 내요. 일시금보다 30~40%를 감면받는 거나 마찬가지예요. 나이에 따라 세율이 달라져요:</p>
      <Divider />

      <H2>중도에 꺼내기 어려우니 주의하세요</H2>
      <p style={body}>퇴직연금은 노후 자금이라서 함부로 꺼낼 수 없어요.</p>
      <p style={body}>법정 사유가 있어야만 중도인출이 가능해요:</p>
      <p style={body}>- 무주택자인 본인과 배우자의 주택 구입</p>
      <Divider />

      <H2>본인의 퇴직연금 상태 확인하기</H2>
      <p style={body}>현재 가입한 퇴직연금의 상태를 확인하려면 금융감독원 통합연금포털을 이용하세요.</p>
      <p style={body}>공인인증서(개인인증서 포함)로 로그인하면 본인이 가입한 모든 연금을 한눈에 볼 수 있어요. DB형, DC형, IRP 어디에 얼마나 적립되어 있는지, 현재 운용 현황은 어떤지 다 조회 가능해요.</p>
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
