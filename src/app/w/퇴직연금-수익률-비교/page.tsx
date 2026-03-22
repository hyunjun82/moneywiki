"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Checklist, FAQ, References, Disclaimer } from "@/components/article-ui";

const CHECKLIST = [
  "퇴직연금 수익률이 중요한 이유예요: 퇴직연금은 수십 년간 운용되는 장기 상품이에요.",
  "퇴직연금 수익률 조회 방법이에요: 내 퇴직연금 수익률을 확인하는 방법이에요.",
  "금융사별 수익률 특징이에요: 금융사 유형별로 수익률 특징이 달라요.",
  "수익률 비교 시 주의사항이에요: 수익률만 보면 안 돼요. 다른 것도 확인하세요.",
  "DC형 수익률이에요: DC형(확정기여형)은 본인이 운용하니까 수익률이 중요해요.",
  "IRP 수익률이에요: IRP(개인형 퇴직연금)도 본인이 운용해요.",
];

const FAQS = [
  { q: "퇴직연금 수익률은 어디서 확인하나요?", a: "금융감독원 통합연금포털에서 금융사별 수익률을 비교할 수 있어요." },
  { q: "퇴직연금 수익률이 높은 금융사는 어디예요?", a: "증권사가 은행보다 높은 경향이 있어요. 다만 변동이 크니 직접 확인하세요." },
  { q: "DC형 수익률과 IRP 수익률이 다른가요?", a: "네. 같은 금융사라도 상품별로 수익률이 달라요." },
  { q: "수익률만 보면 되나요?", a: "수수료도 확인하세요. 수익률이 높아도 수수료가 높으면 실이익이 줄어요." },
  { q: "수익률이 낮으면 금융사를 바꿀 수 있나요?", a: "네. 퇴직연금 사업자 변경으로 다른 금융사로 옮길 수 있어요." },
];

const REFERENCES = [{ category: "공식 자료", items: [
      { label: "금융감독원 통합연금포털", url: "https://100lifeplan.fss.or.kr" },
      { label: "고용노동부 퇴직연금 현황", url: "https://www.moel.go.kr" },
] }];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>퇴직연금 수익률 비교</h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>퇴직연금에 가입해 있는데, 내 수익률이 얼마인지 모르겠어요. 다른 금융사는 더 높다는데, 나는 잘 운용하고 있는 걸까요.</p>
      <Divider />

      <H2>퇴직연금 수익률이 중요한 이유예요</H2>
      <p style={body}>퇴직연금은 수십 년간 운용되는 장기 상품이에요.</p>
      <p style={body}>작은 수익률 차이가 복리로 쌓이면 은퇴 시점에 수천만원 차이가 날 수 있어요.</p>
      <p style={body}>상황: 30년간 매년 300만원씩 적립하는 경우예요.</p>
      <GreenBox title="핵심 요약">퇴직연금은 수십 년간 운용되는 장기 상품이에요.<br />작은 수익률 차이가 복리로 쌓이면 은퇴 시점에 수천만원 차이가 날 수 있어요.</GreenBox>
      <Divider />

      <H2>퇴직연금 수익률 조회 방법이에요</H2>
      <p style={body}>내 퇴직연금 수익률을 확인하는 방법이에요.</p>
      <p style={body}>가입한 금융사 앱(은행, 증권사)에서 내 퇴직연금 수익률을 확인할 수 있어요.</p>
      <p style={body}>금융감독원 통합연금포털에서 전체 금융사 수익률을 비교할 수 있어요.</p>
      <BorderBox><p style={body}>내 퇴직연금 수익률을 확인하는 방법이에요.</p></BorderBox>
      <Divider />

      <H2>금융사별 수익률 특징이에요</H2>
      <p style={body}>금융사 유형별로 수익률 특징이 달라요.</p>
      <p style={body}>특징: 안정적이지만 수익률이 낮은 편이에요.</p>
      <p style={body}>장점: 원금보장형 상품 위주로 안정적</p>
      <Divider />

      <H2>수익률 비교 시 주의사항이에요</H2>
      <p style={body}>수익률만 보면 안 돼요. 다른 것도 확인하세요.</p>
      <p style={body}>수익률이 높아도 수수료가 높으면 실수령액이 줄어요.</p>
      <p style={body}>예시: 수익률 5%, 수수료 1% → 실질 수익률 4%</p>
      <Divider />

      <H2>DC형 수익률이에요</H2>
      <p style={body}>DC형(확정기여형)은 본인이 운용하니까 수익률이 중요해요.</p>
      <p style={body}>전체 평균: 연 2~4% (많은 가입자가 원리금보장형 선택)</p>
      <p style={body}>실적배당형 선택자: 연 4~10% (변동 큼)</p>
      <Divider />

      <H2>IRP 수익률이에요</H2>
      <p style={body}>IRP(개인형 퇴직연금)도 본인이 운용해요.</p>
      <p style={body}>적극 운용자: 연 5~12% (변동 큼)</p>
      <p style={body}>위험자산 70% 활용: IRP는 위험자산을 70%까지 투자할 수 있어요.</p>
      <Divider />

      <H2>수익률 순위 확인 방법이에요</H2>
      <p style={body}>금융사별 수익률 순위를 확인하려면요.</p>
      <p style={body}>통합연금포털 → 퇴직연금 통계 → 사업자별 수익률</p>
      <p style={body}>- 금융사별 DC형/IRP 수익률</p>
      <Divider />

      <H2>수익률 낮으면 금융사 바꾸세요</H2>
      <p style={body}>수익률이 너무 낮으면 금융사를 변경할 수 있어요.</p>
      <p style={body}>회사에서 지정한 금융사 내에서 변경 가능해요. 회사 인사팀에 문의하세요.</p>
      <p style={body}>IRP는 자유롭게 금융사를 변경할 수 있어요.</p>
      <Divider />

      <H2>원리금보장형 vs 실적배당형이에요</H2>
      <p style={body}>퇴직연금 상품은 크게 두 가지로 나뉘어요.</p>
      <p style={body}>상품: 예금, 적금, ELB, GIC</p>
      <p style={body}>특징: 원금 보장, 확정 이자</p>
      <Divider />

      <H2>놓치기 쉬운 체크포인트</H2>
      <p style={body}>- 퇴직연금 수익률은 금융사마다 달라요</p>
      <p style={body}>- 통합연금포털에서 금융사별 수익률 비교 가능</p>
      <p style={body}>- 수수료도 꼭 확인하세요 (수익률 깎임)</p>
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
