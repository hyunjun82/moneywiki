"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

/*
Q1. 노후 대비하면서 세액공제도 받고 싶은데, IRP를 어디서 어떻게 가입하는지 모르는 상황이에요.
Q2. 금융기관별 차이를 비교하고, 온라인으로 IRP 계좌를 개설할 수 있어야 해요.
Q3. 가입 조건(만 18세+소득), 금융기관별 수수료·ETF 라인업 차이, 세액공제 한도(900만원), 온라인/오프라인 가입 절차.
Q4. 금융기관 비교표(CompareTable) + 가입 절차(Steps) + 가입 전 체크리스트(Checklist) + FAQ.
*/

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// ─── 데이터 ───

const STEPS = [
  { title: "금융기관 선택", desc: "은행·증권사·보험사 중 수수료와 투자 라인업을 비교해서 골라요." },
  { title: "앱 설치 또는 영업점 방문", desc: "온라인이면 해당 금융기관 앱을 다운받고, 오프라인이면 지점에 신분증 들고 방문해요." },
  { title: "본인인증 후 IRP 계좌 개설", desc: "앱에서 '퇴직연금 IRP' 메뉴 선택 → 본인인증 → 직업·소득 입력 → 투자성향 테스트를 진행해요." },
  { title: "자동이체 설정", desc: "매달 일정 금액을 자동 납입하도록 설정하면 세액공제 한도를 빠짐없이 채울 수 있어요." },
  { title: "투자상품 배분", desc: "원금보장형(예금)과 실적배당형(ETF)에 분산 투자하세요. 원금보장형에만 두면 수익률이 낮아요." },
];

const CHECKLIST_ITEMS = [
  "만 18세 이상이고 소득(근로·사업·기타)이 있는지 확인",
  "연금저축과 합산 납입한도 연 1,800만원, 세액공제 한도 연 900만원 체크",
  "온라인 가입 시 수수료 무료 여부 확인 (대부분 0원)",
  "ETF 투자 원하면 증권사, 예금 위주면 은행이 유리",
  "가입 후 55세까지 중도인출 제한 — 긴급자금 여유 있는지 점검",
];

const FAQS = [
  { q: "IRP와 연금저축, 둘 다 가입해야 하나요?", a: "세액공제 한도를 최대로 채우려면 둘 다 가입하는 게 유리해요. 연금저축은 600만원까지, IRP는 나머지 300만원을 넣으면 합산 900만원 한도를 채울 수 있죠." },
  { q: "회사 퇴직연금(DB형·DC형)이 있어도 IRP 가입이 가능한가요?", a: "네, 가능해요. 회사 퇴직연금과 별개로 개인 IRP를 추가 개설할 수 있고, 세액공제도 따로 받아요." },
  { q: "IRP 수수료는 얼마나 나오나요?", a: "온라인 전용 상품은 운용관리 수수료 0원인 곳이 많아요. 오프라인 가입 시 연 0.2~0.5% 수수료가 붙을 수 있으니 비교해보세요." },
  { q: "55세 전에 돈을 뺄 수 있나요?", a: "원칙적으로 55세까지 인출이 안 돼요. 다만 무주택자 주택 구입, 6개월 이상 요양, 파산·개인회생 등 법정 사유에 해당하면 중도인출이 가능해요." },
  { q: "세액공제율은 얼마예요?", a: "총급여 5,500만원 이하면 납입액의 16.5%, 초과하면 13.2%를 돌려받아요. 900만원 전부 넣으면 최대 148.5만원(16.5% 기준) 환급이 가능하죠." },
  { q: "IRP에서 ETF를 직접 고를 수 있나요?", a: "증권사 IRP라면 가능해요. 은행이나 보험사 IRP는 ETF 라인업이 제한적이라서, ETF 투자를 원하면 증권사를 추천해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "금융감독원 퇴직연금 통합포털", url: "https://100lifeplan.fss.or.kr" },
    { label: "고용노동부 퇴직연금제도 안내", url: "https://www.moel.go.kr/policy/policyinfo/retire/list.do" },
    { label: "국세청 연금계좌 세액공제", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875" },
  ]},
];

// ─── 페이지 ───

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · IRP · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        개인퇴직연금 IRP 가입, 어디서 하면 유리할까?<br />
        비교와 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        노후 준비는 해야겠는데, IRP 가입은 어디서 하는 게 좋은지 고민되죠.
      </p>
      <p style={body}>
        은행·증권사·보험사 어디서든 가입할 수 있지만, 수수료와 투자 상품이 다 달라요.
        증권사는 ETF 라인업이 넓고, 은행은 지점 접근성이 좋고, 보험사는 연금보험 형태로 운용되죠.
        연금저축과 합산해서 연 900만원까지{" "}
        <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875" style={{ color: "#1D9E75", textDecoration: "underline" }}>세액공제</a>를
        받을 수 있으니, 가입 전에 금융기관부터 비교해보세요.
      </p>

      <Divider />

      {/* 섹션 1: 가입 조건 */}
      <H2>IRP 가입 조건은 뭔가요?</H2>
      <p style={body}>
        만 18세 이상이면서 소득이 있으면 누구나 가입할 수 있어요.
        근로소득, 사업소득, 기타소득 전부 해당되죠.
        직장인·자영업자·프리랜서·공무원·군인 가리지 않아요.
      </p>
      <p style={body}>
        회사에서 DB형이나 DC형 퇴직연금에 가입돼 있어도 개인 IRP는 별도로 만들 수 있어요.
        다만 55세까지 인출이 제한되니, 긴급자금 여유가 있는 상태에서 가입하는 게 좋죠.
      </p>

      <GreenBox title="가입 조건 요약">
        만 18세 이상 + 소득 있는 사람 (직장인·자영업자·프리랜서 등)<br />
        회사 퇴직연금과 별도로 추가 가입 가능<br />
        납입한도 연 1,800만원 (연금저축+DC형+IRP 합산)<br />
        세액공제 한도 연 900만원 (연금저축 합산)
      </GreenBox>

      <Divider />

      {/* 섹션 2: 금융기관 비교 */}
      <H2>은행·증권사·보험사, 어디가 유리할까?</H2>
      <p style={body}>
        IRP는 가입하는 금융기관에 따라 수수료, 투자 상품 라인업, 앱 편의성이 다 달라요.
        한 번 만들면 오래 쓰는 계좌니까, 수수료보다는 투자 전략에 맞는 곳을 고르는 게 중요하죠.
      </p>

      <SectionBadge>금융기관별 특징</SectionBadge>
      <BorderBox>
        <p style={{ ...body, marginBottom: 8 }}><strong>증권사</strong> — ETF·펀드 라인업이 넓어요. 적극적으로 투자해서 수익률을 높이려면 증권사가 맞아요. 미래에셋·삼성·키움 등이 대표적이죠.</p>
        <p style={{ ...body, marginBottom: 8 }}><strong>은행</strong> — 예금·적금 중심으로 안정적 운용이 가능해요. 가까운 지점에서 대면 상담받고 싶으면 은행이 편하죠.</p>
        <p style={body}><strong>보험사</strong> — 연금보험 형태로 운용돼요. 원리금 보장형 위주라 안정적이지만, ETF 투자 폭은 좁아요.</p>
      </BorderBox>
      <p style={body}>
        온라인 전용 상품을 고르면 운용관리 수수료가 0원인 곳이 많아요. 수수료 차이가 20~30년 뒤 복리로 크게 벌어지니까, 꼭 비교하고 가입하세요.
      </p>

      <Divider />

      {/* 섹션 3: 가입 절차 */}
      <H2>온라인으로 어떻게 가입하나요?</H2>
      <p style={body}>
        스마트폰 앱에서 10분이면 끝나요. 영업점 방문 없이 비대면으로 바로 개설할 수 있죠.
      </p>
      <Steps steps={STEPS} />
      <p style={body}>
        영업점을 선호하면 신분증 하나만 들고 가까운 지점을 방문하세요.
        창구 직원이 투자성향 테스트부터 상품 추천까지 안내해줘요.
      </p>

      <Divider />

      {/* 섹션 4: 세액공제 */}
      <H2>세액공제는 얼마까지 받을 수 있나요?</H2>
      <p style={body}>
        연금저축과 IRP를 합산해서 연 900만원까지 세액공제 대상이에요.
        연금저축은 600만원 한도가 있으니, 연금저축 600만원 + IRP 300만원으로 나눠 넣는 게 일반적이죠.
      </p>
      <p style={body}>
        총급여 5,500만원 이하면 납입액의 <strong>16.5%</strong>를 환급받아요.
        900만원 전부 넣으면 최대 <strong>148.5만원</strong>을 돌려받는 셈이에요.
        총급여 5,500만원 초과면 공제율이 <strong>13.2%</strong>로 낮아지지만, 그래도 최대 118.8만원 환급이니 꽤 쏠쏠하죠.
      </p>

      <GreenBox title="세액공제 핵심">
        납입한도: 연금저축 + IRP 합산 연 900만원<br />
        5,500만원 이하 → 16.5% (최대 148.5만원 환급)<br />
        5,500만원 초과 → 13.2% (최대 118.8만원 환급)
      </GreenBox>

      <Divider />

      {/* 섹션 5: 체크리스트 */}
      <H2>가입 전에 꼭 챙길 건 뭔가요?</H2>
      <p style={body}>
        IRP는 장기 계좌라서 한 번 가입하면 55세까지 묶여요.
        가입 전에 이것만 확인하면 나중에 후회할 일이 없어요.
      </p>
      <Checklist items={CHECKLIST_ITEMS} />
      <p style={body}>
        <a href="/w/퇴직연금-세액공제" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직연금 세액공제</a> 글에서
        연금저축과 IRP 세액공제 차이를 더 자세히 비교할 수 있어요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 정보를 바탕으로 작성됐어요. 세법이나 금융상품 조건은 변경될 수 있으니, 가입 전에 해당 금융기관에 직접 확인하세요." />
    </div>
  );
}
