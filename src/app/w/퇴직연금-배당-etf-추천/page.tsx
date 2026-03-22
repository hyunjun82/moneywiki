"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "배당 ETF 장점이에요: 퇴직연금에서 배당 ETF가 좋은 이유예요.",
  "미국 배당 ETF 추천이에요: 미국 고배당주에 투자하는 ETF예요.",
  "국내 배당 ETF 추천이에요: 국내 고배당주에 투자하는 ETF예요.",
  "월배당 ETF 추천이에요: KODEX 미국배당프리미엄액티브: 매월 배당을 줘요. 커버드콜 전략으로 배당수익률이 높아요. TIGER 미국",
  "배당 재투자 방법이에요: 배당금을 재투자하면 복리 효과가 커요.",
  "놓치기 쉬운 체크포인트: - 퇴직연금에서 배당금에 '세금이 안 붙어요'",
];

const FAQS = [
  { q: "퇴직연금에서 배당금 받을 수 있어요?", a: "네. 배당 ETF에 투자하면 분기마다 배당금이 계좌에 들어와요." },
  { q: "배당금에 세금 붙어요?", a: "퇴직연금 계좌 안에서는 배당금에 세금이 안 붙어요. 수령할 때 세금 내요." },
  { q: "월배당 ETF도 있어요?", a: "네. 매월 배당을 주는 월배당 ETF도 있어요. 분기배당보다 잦아요." },
  { q: "배당 ETF 위험자산이에요?", a: "주식형 배당 ETF는 위험자산이에요. 70% 한도 내에서 투자해야 해요." },
  { q: "배당 재투자되나요?", a: "금융기관마다 달라요. 자동 재투자되면 복리 효과가 커요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "금융감독원 퇴직연금", url: "https://www.fss.or.kr" },
      { label: "고용노동부 퇴직연금제도", url: "https://www.moel.go.kr/policy/policyinfo/retire/list.do" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>퇴직연금 배당 ETF 추천</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>퇴직연금으로 배당금도 받고 싶으시죠. 배당 ETF가 장기 투자에 좋은지 궁금하시죠.</p>
      <Divider />

      <H2>배당 ETF 장점이에요</H2>
      <p style={body}>퇴직연금에서 배당 ETF가 좋은 이유예요.</p>
      <p style={body}>정기적인 배당금을 받아요. 분기마다 또는 매월 배당금이 계좌에 들어와요. 배당금에 세금이 안 붙어요. 일반 계좌는 배당소득세 15.4%가 붙지만, 퇴직연금 계좌는 수령할 때까지 세금이 이연돼요. 복리 효과가 커요. 배당금을 재투자하면 장기적으로 자산이 더 불어나요.</p>
      <GreenBox title="핵심 요약">퇴직연금에서 배당 ETF가 좋은 이유예요.<br />정기적인 배당금을 받아요. 분기마다 또는 매월 배당금이 계좌에 들어와요. 배당금에 세금이 안 붙어요. 일반 계좌는 배당소득세 15.4%가 붙지만</GreenBox>
      <Divider />

      <H2>미국 배당 ETF 추천이에요</H2>
      <p style={body}>미국 고배당주에 투자하는 ETF예요.</p>
      <p style={body}>| ETF | 특징 | 배당 주기 |</p>
      <p style={body}>|-----|------|----------|</p>
      <BorderBox><p style={body}>미국 고배당주에 투자하는 ETF예요.</p></BorderBox>
      <Divider />

      <H2>국내 배당 ETF 추천이에요</H2>
      <p style={body}>국내 고배당주에 투자하는 ETF예요.</p>
      <p style={body}>KODEX 고배당: 국내 고배당주에 투자해요. 배당수익률이 높은 편이에요. TIGER 코스피고배당: 코스피 고배당 지수를 추종해요. ARIRANG 고배당주: KB자산운용에서 운용해요.</p>
      <p style={body}>국내 배당 ETF는 은행, 통신, 에너지 업종 비중이 높아요. 미국 배당 ETF보다 배당수익률이 높은 경우가 많아요.</p>
      <Divider />

      <H2>월배당 ETF 추천이에요</H2>
      <p style={body}>KODEX 미국배당프리미엄액티브: 매월 배당을 줘요. 커버드콜 전략으로 배당수익률이 높아요. TIGER 미국나스닥100커버드콜: 나스닥100에 커버드콜 전략을 적용해요. 매월 배당이에요.</p>
      <p style={body}>월배당 ETF는 현금흐름이 필요한 분에게 좋아요. 단, 커버드콜 전략은 상승장에서 수익이 제한될 수 있어요.</p>
      <Divider />

      <H2>배당 재투자 방법이에요</H2>
      <p style={body}>배당금을 재투자하면 복리 효과가 커요.</p>
      <p style={body}>금융기관에 따라 자동 재투자 설정이 가능해요. 설정해두면 배당금이 들어올 때마다 같은 ETF를 자동으로 매수해요. 자동 재투자가 안 되면 직접 매수하세요. 배당금이 들어오면 수동으로 ETF를 추가 매수해요.</p>
      <Divider />

      <H2>놓치기 쉬운 체크포인트</H2>
      <p style={body}>- 퇴직연금에서 배당금에 &quot;세금이 안 붙어요&quot;</p>
      <p style={body}>- 배당 ETF도 &quot;위험자산&quot;이에요. 70% 한도 적용</p>
      <p style={body}>- &quot;분기배당&quot;이 일반적이고 &quot;월배당&quot;도 있어요</p>
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
