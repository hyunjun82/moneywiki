"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "용산 IBD 주택 공급이란 뭔가요?: 용산 국제업무지구에 1만 가구를 공급하는 정부 대책이에요.",
  "용산 IBD 주택 공급 규모는 어떻게 되나요?: 1만 가구이고, 서울시 계획보다 4천 가구 늘어났어요.",
  "용산 IBD 청약 일정은 언제인가요?: 2027년 착공, 2028년 청약, 2029~2030년 입주 예정이에요.",
  "용산 IBD 입지 장점은 뭔가요?: 역세권이고, 여의도·강남 15분, 한강 조망 가능한 프리미엄 입지예요.",
];

const FAQS = [
  { q: "용산 IBD 주택 공급 청약은 언제 시작되나요?", a: "2028년 청약 예정이에요. 2027년 착공 후 1년 뒤 분양 공고가 나올 거예요. 무주택자 우선 공급돼요." },
  { q: "용산 IBD 주택 공급 분양가는 얼마인가요?", a: "아직 미정이에요. 분양가 상한제 적용 여부에 따라 달라지고, 주변 시세보다 낮을 가능성이 높아요." },
  { q: "용산 IBD 주택 공급이란 뭔가요?", a: "용산 국제업무지구에 1만 가구를 공급하는 정부 대책이에요." },
  { q: "용산 IBD 주택 공급 규모는 어떻게 되나요?", a: "1만 가구이고, 서울시 계획보다 4천 가구 늘어났어요." },
  { q: "용산 IBD 청약 일정은 언제인가요?", a: "2027년 착공, 2028년 청약, 2029~2030년 입주 예정이에요." },
  { q: "용산 IBD 입지 장점은 뭔가요?", a: "역세권이고, 여의도·강남 15분, 한강 조망 가능한 프리미엄 입지예요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "국토교통부", url: "https://www.molit.go.kr" },
      { label: "머니투데이", url: "https://www.mt.co.kr/estate/2026/01/29/2026012909593955700" },
      { label: "헤럴드경제", url: "https://biz.heraldcorp.com/article/10665172" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>용산 IBD 주택 공급 1만 가구: 청약 일정과 입지 장점 2026</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>용산에 1만 가구나 공급된다는 뉴스 봤는데 정말인가요? 결론부터 말하면 용산 국제업무지구(IBD)에 1만 가구 공급돼요. 원래 6천 가구였는데 용적률 상향으로 4천 가구 늘어난 거예요. 2027년 착공해서 2029~2030년 입주 가능하고, 입지는 역세권에 여의도·강남 접근성이 좋아요. 지금부터 규모, 일정, 입지 장점까지 정확히 알려드릴게요.</p>
      <Divider />

      <H2>용산 IBD 주택 공급이란 뭔가요?</H2>
      <p style={body}>용산 국제업무지구에 1만 가구를 공급하는 정부 대책이에요.</p>
      <p style={body}>국토교통부가 1월 29일 발표한 &quot;도심 주택공급 확대 및 신속화 방안&quot;에 포함된 핵심 사업이에요. 용산 IBD는 서울시가 원래 6천 가구로 계획했는데, 정부가 용적률을 높여서 1만 가구로 늘렸어요. 한강로3가 일대에 들어서는 대규모 주거단지고, 1월 29일 주택 공급대책의 최대 규모예요. 용산 캠프킴 2,500가구와 합치면 용산 일대만 1.25만 가구가 공급돼요.</p>
      <p style={body}>- 위치: 서울 용산구 한강로3가 일대</p>
      <GreenBox title="핵심 요약">용산 국제업무지구에 1만 가구를 공급하는 정부 대책이에요.<br />국토교통부가 1월 29일 발표한 "도심 주택공급 확대 및 신속화 방안"에 포함된 핵심 사업이에요. 용산 IBD는 서울시가 원래 6천 가구로 계획</GreenBox>
      <Divider />

      <H2>용산 IBD 주택 공급 규모는 어떻게 되나요?</H2>
      <p style={body}>1만 가구이고, 서울시 계획보다 4천 가구 늘어났어요.</p>
      <p style={body}>정부는 용산 IBD 용적률을 상향해서 기존 서울시 계획 6천 가구에서 1만 가구로 확대했어요. 머니투데이 보도에 따르면 이번 공급대책 중 단일 사업지로는 가장 큰 규모예요. 용산 전체로 보면 캠프킴 2,500가구, 501정보대 150가구가 추가돼서 총 1.25만 가구가 공급돼요.</p>
      <p style={body}>| 사업지 | 공급 가구 | 현재 상태 | 비고 |</p>
      <BorderBox><p style={body}>1만 가구이고, 서울시 계획보다 4천 가구 늘어났어요.</p></BorderBox>
      <Divider />

      <H2>용산 IBD 청약 일정은 언제인가요?</H2>
      <p style={body}>2027년 착공, 2028년 청약, 2029~2030년 입주 예정이에요.</p>
      <p style={body}>용산 IBD는 2026년 사업 승인과 설계를 마치고 2027년 착공해요. 보통 착공 1년 후 분양 공고가 나오니까 2028년쯤 청약 접수가 시작될 거예요. 준공까지 2~3년 걸리니까 2029년 말이나 2030년 초 입주 가능해요. 청약 자격은 무주택 기간, 부양가족 수, 청약 통장 가입 기간으로 결정돼요.</p>
      <p style={body}>용산 IBD 청약 일정 (예상):</p>
      <Divider />

      <H2>용산 IBD 입지 장점은 뭔가요?</H2>
      <p style={body}>역세권이고, 여의도·강남 15분, 한강 조망 가능한 프리미엄 입지예요.</p>
      <p style={body}>용산 IBD는 서울 중심부에 있어서 교통이 아주 편해요. 지하철 4호선 신용산역, 경의중앙선 용산역이 도보 10분 거리고, 이촌역도 가까워요. 헤럴드경제에 따르면 여의도까지 15분, 강남까지 20분이면 도착해요. 한강 조망이 가능한 일부 세대는 분양가가 높아도 경쟁률이 치솟을 거예요.</p>
      <p style={body}>- 지하철 3개 노선 (1호선, 4호선, 경의중앙선)</p>
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
