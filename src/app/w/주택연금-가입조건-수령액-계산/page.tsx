"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "주택연금이 뭔가요?: 집을 담보로 평생 매달 연금을 받는 제도예요.",
  "주택연금 가입조건이 어떻게 되나요?: 부부 중 1명이 55세 이상이고, 주택 공시가격이 12억원 이하면 가입할 수 있어요.",
  "주택연금 수령액은 얼마나 되나요?: 나이가 많고 집값이 높을수록 매달 받는 금액이 커져요.",
  "주택연금 계산은 어떻게 하나요?: 주택가격, 나이, 지급방식 3가지를 기준으로 계산돼요.",
];

const FAQS = [
  { q: "주택연금 가입하면 집 소유권을 빼앗기나요?", a: "아니에요. 소유권은 그대로 유지되고 담보만 설정되는 거예요. 평생 살 수 있고 상속도 가능해요." },
  { q: "주택연금 받다가 일찍 사망하면 손해 아닌가요?", a: "아니에요. 가입 초기에 사망해도 그동안 받은 연금은 돌려주지 않아요. 자녀가 집을 팔아서 남은 금액을 상속받을 수 있어요." },
  { q: "주택연금이 뭔가요?", a: "집을 담보로 평생 매달 연금을 받는 제도예요." },
  { q: "주택연금 가입조건이 어떻게 되나요?", a: "부부 중 1명이 55세 이상이고, 주택 공시가격이 12억원 이하면 가입할 수 있어요." },
  { q: "주택연금 수령액은 얼마나 되나요?", a: "나이가 많고 집값이 높을수록 매달 받는 금액이 커져요." },
  { q: "주택연금 계산은 어떻게 하나요?", a: "주택가격, 나이, 지급방식 3가지를 기준으로 계산돼요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "한국주택금융공사 - 주택연금", url: "https://www.hf.go.kr/ko/sub03/sub03_01_01_01.do" },
      { label: "찾기쉬운 생활법령정보 - 주택연금", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=730" },
      { label: "금융위원회 - 주택연금 제도 개선", url: "https://www.fsc.go.kr/no010101/86211" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>주택연금 가입조건 수령액 계산</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>노후에 집은 있는데 생활비가 부족하면 막막하잖아요. 집을 팔지 않고도 매달 연금처럼 돈을 받을 수 있다는 거 아시나요.</p>
      <Divider />

      <H2>주택연금이 뭔가요?</H2>
      <p style={body}>집을 담보로 평생 매달 연금을 받는 제도예요.</p>
      <p style={body}>한국주택금융공사가 운영하는 공적 보증 제도인데요. 주택을 담보로 제공하면 죽을 때까지 매달 일정 금액을 받을 수 있어요. 집을 팔지 않고도 현금 수입이 생기는 셈이에요.</p>
      <p style={body}>&gt; 집 소유권은 그대로 유지되고, 평생 거주하면서 매달 연금 수령 가능.</p>
      <GreenBox title="핵심 요약">집을 담보로 평생 매달 연금을 받는 제도예요.<br />한국주택금융공사가 운영하는 공적 보증 제도인데요. 주택을 담보로 제공하면 죽을 때까지 매달 일정 금액을 받을 수 있어요. 집을 팔지 않고도 현금</GreenBox>
      <Divider />

      <H2>주택연금 가입조건이 어떻게 되나요?</H2>
      <p style={body}>부부 중 1명이 55세 이상이고, 주택 공시가격이 12억원 이하면 가입할 수 있어요.</p>
      <p style={body}>그렇다면 다주택자는 안 되나 싶겠지만, 부부 기준으로 보유한 주택 공시가격 합산이 12억원 이하면 괜찮아요. 금융위원회에서 2024년부터 기준을 9억에서 12억으로 올렸거든요.</p>
      <p style={body}>| 연령 | 부부 중 1명이 55세 이상 |</p>
      <BorderBox><p style={body}>부부 중 1명이 55세 이상이고, 주택 공시가격이 12억원 이하면 가입할 수 있어요.</p></BorderBox>
      <Divider />

      <H2>주택연금 수령액은 얼마나 되나요?</H2>
      <p style={body}>나이가 많고 집값이 높을수록 매달 받는 금액이 커져요.</p>
      <p style={body}>구체적으로 보면 이래요. 2026년 기준으로 3.13% 인상되었기 때문에 작년보다 월 지급액이 늘었어요. 예를 들어 3억원짜리 집에 사는 65세 부부라면 월 약 69만원을 받아요. 같은 집에 75세 부부라면 약 99만원을 받는 거죠.</p>
      <p style={body}>여기서 중요한 건 지급 방식이에요. 종신형으로 가입하면 평생 같은 금액을 받지만, 확정기간형으로 하면 일정 기간 동안 더 많이 받다가 그 이후에는 줄어들어요. 대부분은 종신형을 선택하는데, 안정적으로 평생 받는 게 목적이니까요.</p>
      <Divider />

      <H2>주택연금 계산은 어떻게 하나요?</H2>
      <p style={body}>주택가격, 나이, 지급방식 3가지를 기준으로 계산돼요.</p>
      <p style={body}>그러니까 정리하면 이렇게 되는 거예요. 먼저 주택가격은 한국부동산원 시세나 KB시세를 우선 적용해요. 아파트가 아닌 단독주택이나 빌라는 감정평가를 받아야 해요.</p>
      <p style={body}>나이는 부부 중 나이가 적은 사람을 기준으로 해요. 예를 들어 남편이 70세, 아내가 65세면 65세 기준으로 계산하는 거예요. 그래야 오래 받을 수 있으니까 공사 입장에서도 안전하게 계산하는 셈이에요.</p>
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
