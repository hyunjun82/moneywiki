"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "국민은행 퇴직연금 ETF 투자 방법이에요: KB스타뱅킹 앱에서 투자해요.",
  "추천 ETF 위험자산이에요: 위험자산 70% 한도 내에서 투자할 ETF예요.",
  "추천 ETF 안전자산이에요: 안전자산 30% 채울 ETF예요.",
  "포트폴리오 예시예요: 국민은행 퇴직연금 포트폴리오 예시예요.",
  "놓치기 쉬운 체크포인트: - 국민은행 DC형, IRP에서 'ETF 투자 가능'해요",
];

const FAQS = [
  { q: "국민은행 퇴직연금에서 ETF 투자할 수 있어요?", a: "네. DC형이나 IRP라면 ETF 투자 가능해요. KB스타뱅킹 앱에서 매수해요." },
  { q: "어떤 ETF를 살 수 있어요?", a: "국민은행에서 취급하는 ETF 상품 중에서 선택할 수 있어요. S&P500, 나스닥 등 다양해요." },
  { q: "수수료가 있어요?", a: "ETF 매매 수수료는 없거나 저렴해요. 운용보수는 ETF마다 달라요." },
  { q: "원금보장형만 있어요?", a: "아니요. 원금보장형 외에 실적배당형(ETF, 펀드)도 있어요." },
  { q: "안전자산 30%는 어떻게 맞춰요?", a: "채권 ETF나 예금형 상품으로 30% 이상 채우면 돼요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "국민은행 퇴직연금", url: "https://www.kbstar.com" },
      { label: "금융감독원 퇴직연금", url: "https://www.fss.or.kr" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>국민은행 퇴직연금 ETF 추천</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>국민은행 퇴직연금인데 ETF로 투자하고 싶으시죠. 어떤 ETF를 살 수 있는지 궁금하시죠.</p>
      <Divider />

      <H2>국민은행 퇴직연금 ETF 투자 방법이에요</H2>
      <p style={body}>KB스타뱅킹 앱에서 투자해요.</p>
      <p style={body}>앱에 로그인한 후 퇴직연금 메뉴로 가세요. 운용지시 또는 상품변경 메뉴를 찾으세요. 투자하고 싶은 ETF를 검색하세요. 매수 금액을 입력하고 주문하면 돼요.</p>
      <p style={body}>안전자산 30% 규정은 시스템에서 자동으로 체크해줘요.</p>
      <GreenBox title="핵심 요약">KB스타뱅킹 앱에서 투자해요.<br />앱에 로그인한 후 퇴직연금 메뉴로 가세요. 운용지시 또는 상품변경 메뉴를 찾으세요. 투자하고 싶은 ETF를 검색하세요. 매수 금액을 입력하고 주</GreenBox>
      <Divider />

      <H2>추천 ETF 위험자산이에요</H2>
      <p style={body}>위험자산 70% 한도 내에서 투자할 ETF예요.</p>
      <p style={body}>TIGER 미국S&P500: 미국 대형주 500개에 투자해요. 장기 수익률이 검증됐어요. KODEX 미국나스닥100: 기술주 중심이에요. 성장성이 높아요. ACE 미국S&P500: S&P500 추종하면서 운용보수가 저렴해요. KODEX 200: 국내 대형주에 투자해요.</p>
      <BorderBox><p style={body}>위험자산 70% 한도 내에서 투자할 ETF예요.</p></BorderBox>
      <Divider />

      <H2>추천 ETF 안전자산이에요</H2>
      <p style={body}>안전자산 30% 채울 ETF예요.</p>
      <p style={body}>KODEX 국고채10년: 10년 만기 국고채에 투자해요. TIGER 단기채권액티브: 단기채권 중심이라 변동성이 적어요. 예금형 상품: 원리금보장 상품도 안전자산으로 분류돼요.</p>
      <Divider />

      <H2>포트폴리오 예시예요</H2>
      <p style={body}>국민은행 퇴직연금 포트폴리오 예시예요.</p>
      <p style={body}>| 자산 | 비중 | 상품 |</p>
      <p style={body}>|------|------|------|</p>
      <Divider />

      <H2>놓치기 쉬운 체크포인트</H2>
      <p style={body}>- 국민은행 DC형, IRP에서 &quot;ETF 투자 가능&quot;해요</p>
      <p style={body}>- &quot;KB스타뱅킹 앱&quot;에서 매수해요</p>
      <p style={body}>- 안전자산 &quot;30% 이상&quot; 유지해야 해요</p>
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
