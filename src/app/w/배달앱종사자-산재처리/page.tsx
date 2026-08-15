"use client";
// Q1. 배달하다 사고가 났는데 산재보험이 적용되는지, 어떻게 신청하는지 모르겠는 상황이에요.
// Q2. 산재보험 적용 대상임을 확인하고, 근로복지공단에 산재 신청을 해서 치료비·휴업급여를 받는 행동.
// Q3. 특수형태근로종사자 산재 의무가입(2021.7~), 업무상 재해 인정 기준, 신청 절차, 급여 종류, 보험료 부담 구조.
// Q4. GreenBox(적용 대상 요약) + Steps(신청 절차) + BorderBox(급여 종류) + Checklist(서류) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "배달 중 사고는 무조건 산재 인정되나요?", a: "배달 경로에서 벗어나지 않았다면 대부분 인정돼요. 신호대기 중 사고, 음식 픽업 중 미끄러짐도 포함돼요." },
  { q: "플랫폼 회사가 산재보험을 안 들었으면요?", a: "2021년 7월부터 의무가입이라 미가입이면 회사 잘못이에요. 그래도 근로복지공단에 신청하면 공단이 조사해서 처리해줘요." },
  { q: "보험료는 누가 내나요?", a: "사업주와 배달기사가 절반씩 부담해요. 배달 수입에서 자동으로 공제되는 경우가 많아요." },
  { q: "산재 신청하면 불이익은 없나요?", a: "법적으로 산재 신청을 이유로 불이익을 줄 수 없어요. 계약 해지나 배달 배정 축소도 금지돼 있어요." },
  { q: "배달 끝나고 귀가 중 사고도 산재인가요?", a: "출퇴근 재해로 인정될 수 있어요. 통상적인 경로를 벗어나지 않았다면 가능해요." },
  { q: "휴업급여는 얼마나 받나요?", a: "평균임금의 70%를 매일 지급받아요. 치료 기간 동안 소득이 끊기지 않도록 보장해줘요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "산업재해보상보험법", url: "https://www.law.go.kr/법령/산업재해보상보험법" },
    { label: "근로복지공단 산재보험 안내", url: "https://www.kcomwel.or.kr" },
    { label: "찾기쉬운 생활법령 (배달앱종사자)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1589&ccfNo=2&cciNo=1&cnpClsNo=2" },
  ] },
];

const RELATED = [
  { slug: "중소기업-취업자-소득세-감면-이직", title: "중소기업 취업자 소득세 감면", description: "배달 외 중소기업에 취업하면 소득세 감면 혜택이 있어요." },
  { slug: "긴급복지-생계지원금-신청-방법", title: "긴급복지 생계지원금 신청", description: "사고로 소득이 끊겼다면 긴급복지 지원도 받을 수 있어요." },
  { slug: "기간제근로자-무기계약-전환-시기", title: "기간제 근로자 무기계약 전환", description: "고용 안정과 관련된 근로자 권리를 확인하세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 산재보험 · 배달</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        배달 중 사고, 산재보험 받을 수 있을까?<br />
        신청 방법부터 급여 종류까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        오토바이로 배달하다 넘어졌거나 차에 부딪혔다면 산재보험부터 확인하세요.
        배달기사도 2021년 7월부터 산재보험 의무가입 대상이에요.
        플랫폼 회사가 안 들어줬어도 신청할 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>배달기사, 산재보험 적용 대상이에요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/산업재해보상보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>산업재해보상보험법</a> 개정으로
        배달기사는 '노무제공자'(구 특수형태근로종사자)로 분류돼요.
        퀵서비스, 대리운전, 학습지 교사와 같은 범주예요.
      </p>

      <GreenBox>
        배달기사 산재보험 핵심이에요.<br />
        · 2021년 7월부터 <strong>의무가입</strong> 대상<br />
        · 보험료: 사업주·배달기사 <strong>각 50%</strong> 부담<br />
        · 복수 플랫폼 근무해도 <strong>모두 적용</strong><br />
        · 근로자성 인정 여부와 <strong>무관</strong>하게 보호받음
      </GreenBox>

      <Divider />

      <H2>어떤 사고가 산재로 인정되나요?</H2>
      <p style={body}>
        배달 경로에서 벗어나지 않은 업무 중 사고라면 대부분 인정돼요.
        음식 픽업하러 가다가 미끄러진 것, 배달 중 신호대기에서 추돌당한 것 모두 해당해요.
      </p>

      <BorderBox>
        <strong>산재 인정 O / X 사례</strong><br /><br />
        &#10003; 배달 경로에서 교통사고 → 인정<br />
        &#10003; 음식 픽업 중 매장 계단에서 넘어짐 → 인정<br />
        &#10003; 배달 중간 화장실 이용 중 다침 → 인정<br />
        &#10007; 배달 끝나고 친구 만나러 가다 사고 → 불인정<br />
        &#10007; 음주 상태에서 배달 중 사고 → 불인정<br />
        &#10007; 고의로 사고를 낸 경우 → 불인정
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>산재 신청은 이렇게 해요</H2>

      <Steps steps={[
        { title: "사고 즉시 병원 방문", desc: "산재 지정 의료기관이면 좋지만 아니어도 괜찮아요. 진단서를 꼭 받으세요." },
        { title: "근로복지공단에 산재 신청", desc: "가까운 지사 방문 또는 온라인(total.comwel.or.kr)으로 요양급여 청구서를 제출하세요." },
        { title: "증빙자료 제출", desc: "사고 경위서, 진단서, 배달 기록(앱 캡처)을 함께 내요. 회사 확인서가 없어도 공단이 직접 조사해요." },
        { title: "공단 심사 후 승인", desc: "업무 관련성을 심사해서 산재 여부를 결정해요. 보통 2~4주 걸려요." },
        { title: "급여 수령", desc: "치료비(요양급여), 생활비(휴업급여), 장해 보상(장해급여) 등을 받아요." },
      ]} />

      <Divider />

      <H2>준비할 서류 체크리스트</H2>

      <Checklist items={[
        "요양급여 청구서 (근로복지공단 양식)",
        "사고 경위서 (본인 작성)",
        "의사 진단서 (초진 기록)",
        "배달 앱 기록 캡처 (사고 시점 배달 이력)",
        "사고 현장 사진·블랙박스 (있는 경우)",
      ]} />

      <p style={body}>
        <a href="https://www.kcomwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a> 전화번호는
        1588-0075예요. 사고 발생 즉시 신청하는 게 가장 좋아요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 산업재해보상보험법·근로복지공단 자료를 바탕으로 작성했어요. 개별 사안마다 산재 인정 여부가 다를 수 있으니 근로복지공단에 직접 문의하세요." />
    </ArticleLayout>
  );
}
