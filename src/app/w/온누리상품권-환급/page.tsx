"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "온누리상품권 환급은 얼마나 받나요?: 전통시장에서 사용하면 30% 캐시백받아요.",
  "온누리상품권 30% 환급은 어디서 적용되나요?: 전국 200개 농축산물 시장, 200개 수산물 시장에서 적용돼요.",
  "온누리상품권 전통시장에서 어떻게 쓰나요?: 현금처럼 내면 돼요. 거스름돈도 나와요.",
  "온누리상품권 사용법 주의사항은 뭔가요?: 30% 환급 신청을 꼭 해야 받아요.",
  "결론: 온누리상품권으로 전통시장 장보면 30% 환급받아 실질 40% 절약이에요.",
];

const FAQS = [
  { q: "온누리상품권 환급은 어디서 받나요?", a: "전통시장에서 결제 후 영수증으로 환급받거나, 모바일 온누리상품권은 자동 캐시백돼요. 시장마다 환급 방식이 달라요." },
  { q: "온누리상품권 환급 한도는 얼마인가요?", a: "월 100만원까지 구매 가능하고, 환급은 구매 금액의 30%예요. 100만원 쓰면 30만원 환급받는 셈이에요." },
  { q: "온누리상품권 환급은 얼마나 받나요?", a: "전통시장에서 사용하면 30% 캐시백받아요." },
  { q: "온누리상품권 30% 환급은 어디서 적용되나요?", a: "전국 200개 농축산물 시장, 200개 수산물 시장에서 적용돼요." },
  { q: "온누리상품권 전통시장에서 어떻게 쓰나요?", a: "현금처럼 내면 돼요. 거스름돈도 나와요." },
  { q: "온누리상품권 사용법 주의사항은 뭔가요?", a: "30% 환급 신청을 꼭 해야 받아요." },
  { q: "결론에 대해 알려주세요", a: "온누리상품권으로 전통시장 장보면 30% 환급받아 실질 40% 절약이에요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "소상공인진흥공단", url: "https://www.sbiz.or.kr" },
      { label: "온누리상품권 홈페이지", url: "https://www.onnurishop.co.kr" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>생활정보</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>온누리상품권 환급 30%: 전통시장 할인받는 방법 총정리</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>전통시장에서 장보면 30% 돌려받을 수 있어요. 온누리상품권으로 결제하면 되는데, 사는 법부터 환급받는 법까지 알려드릴게요.</p>
      <Divider />

      <H2>온누리상품권 환급은 얼마나 받나요?</H2>
      <p style={body}>전통시장에서 사용하면 30% 캐시백받아요.</p>
      <p style={body}>10만원어치 장보면 3만원 돌려받는 거예요.</p>
      <p style={body}>상품권 살 때 5~10% 할인받고, 쓸 때 30% 환급까지 받으니까 실질 할인율은 40% 가까워요.</p>
      <GreenBox title="핵심 요약">전통시장에서 사용하면 30% 캐시백받아요.<br />10만원어치 장보면 3만원 돌려받는 거예요.</GreenBox>
      <Divider />

      <H2>온누리상품권 30% 환급은 어디서 적용되나요?</H2>
      <p style={body}>전국 200개 농축산물 시장, 200개 수산물 시장에서 적용돼요.</p>
      <p style={body}>모든 전통시장에서 되는 건 아니고, 정부 지정 시장에서만 30% 환급이에요.</p>
      <p style={body}>지정 시장 아니면 상품권 사용은 되지만 30% 환급은 안 돼요.</p>
      <BorderBox><p style={body}>전국 200개 농축산물 시장, 200개 수산물 시장에서 적용돼요.</p></BorderBox>
      <Divider />

      <H2>온누리상품권 전통시장에서 어떻게 쓰나요?</H2>
      <p style={body}>현금처럼 내면 돼요. 거스름돈도 나와요.</p>
      <p style={body}>지류(종이) 상품권은 현금처럼 내고, 거스름돈은 1천원 미만만 현금으로 받아요.</p>
      <p style={body}>모바일 온누리(제로페이, 카카오페이 등)는 QR 결제하면 자동 캐시백돼요.</p>
      <Divider />

      <H2>온누리상품권 사용법 주의사항은 뭔가요?</H2>
      <p style={body}>30% 환급 신청을 꼭 해야 받아요.</p>
      <p style={body}>모바일은 자동 캐시백이지만, 지류 상품권은 영수증으로 별도 신청해야 해요.</p>
      <p style={body}>시장 상인회나 관리사무소에서 환급 신청하면 돼요.</p>
      <Divider />

      <H2>결론</H2>
      <p style={body}>온누리상품권으로 전통시장 장보면 30% 환급받아 실질 40% 절약이에요.</p>
      <p style={body}>환급 신청 안 하면 돈 못 받으니까 모바일 상품권 쓰거나 당일 신청하세요.</p>
      <p style={body}>설 성수품 할인이랑 같이 쓰면 명절 장보기 비용 절반으로 줄일 수 있어요.</p>
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
