"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer,
} from "@/components/article-ui";

// Q1: 회사가 파산/회생절차에 들어갔는데 밀린 임금을 어떻게 받는지 모르는 상황
// Q2: 도산 유형(파산 vs 회생)을 확인하고, 근로복지공단에 대지급금 신청
// Q3: 재판상 도산의 정의, 파산 vs 회생 차이, 대지급금 신청 기한 2년, 서류, 사실상 도산과의 차이
// Q4: EligibilityChecker(도산 유형 진단) + GreenBox(핵심 비교) + Steps(신청 절차) + FAQ

const CHECK_ITEMS = [
  { id: "c1", label: "법원에서 파산 선고 또는 회생절차 개시 결정이 나왔어요" },
  { id: "c2", label: "결정일로부터 2년이 아직 안 지났어요" },
  { id: "c3", label: "체불된 임금, 퇴직금, 휴업수당이 있어요" },
  { id: "c4", label: "도산 관련 결정 신청일 1년 전~3년 이내에 퇴직했어요" },
];

const STEPS_DATA = [
  { title: "도산 유형 확인", desc: "법원에서 파산 선고가 났는지, 회생절차 개시 결정이 났는지 확인하세요. 법원 공고나 인터넷 등기소에서 확인 가능해요." },
  { title: "결정문 확보", desc: "파산 선고문 또는 회생절차 개시 결정문 사본을 준비하세요. 법원에 신청하면 발급받을 수 있어요." },
  { title: "체불 금액 정리", desc: "체불된 임금, 퇴직금, 휴업수당 금액을 정리하세요. 근로계약서, 급여명세서, 통장 내역이 증빙이에요." },
  { title: "대지급금 청구서 제출", desc: "퇴직 당시 사업장 관할 지방고용노동관서를 거쳐 근로복지공단(comwel.or.kr)에 도산대지급금 지급청구서를 제출하세요.", tip: "결정일로부터 2년 이내에 신청해야 해요" },
  { title: "심사 후 지급", desc: "심사가 완료되면 대지급금이 통장으로 입금돼요. 초과분은 파산 배당이나 회생채권으로 별도 청구하세요." },
];

const FAQS = [
  { q: "파산과 회생 중 근로자에게 뭐가 유리한가요?", a: "상황마다 달라요. 파산은 회사가 없어지지만 대지급금 + 배당으로 체불 임금 회수가 비교적 확실해요. 회생은 고용이 유지될 수 있지만 임금 지급이 구조조정 계획에 따라 지연되거나 조정될 수 있죠." },
  { q: "대지급금 한도가 얼마예요?", a: "도산대지급금은 퇴직 당시 연령에 따라 상한이 있어요. 최종 3개월분 임금과 최종 3년분 퇴직금, 최종 3개월분 휴업수당이 지급 범위이고, 연령별 상한액이 적용되죠." },
  { q: "회생절차 중인 회사에서도 대지급금을 받을 수 있나요?", a: "받을 수 있어요. 법원의 회생절차 개시 결정이 내려진 시점부터 대지급금 신청 요건이 충족돼요. 회생채권 신고도 병행하세요." },
  { q: "사실상 도산이랑 뭐가 다른가요?", a: "재판상 도산은 법원 결정(파산 선고, 회생 개시)이 근거예요. 사실상 도산은 법원 절차 없이 폐업한 경우이고, 고용노동부에서 도산등사실인정을 받아야 해요. 대지급금 한도는 동일하지만 절차가 달라요." },
  { q: "2년이 지나면 아무것도 못 받나요?", a: "대지급금 신청 기한은 지나지만, 임금채권 소멸시효(3년)가 남아 있으면 파산 배당이나 민사소송으로 직접 청구할 수 있어요." },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "임금채권보장법", url: "https://www.law.go.kr/법령/임금채권보장법" },
      { label: "채무자 회생 및 파산에 관한 법률", url: "https://www.law.go.kr/법령/채무자회생및파산에관한법률" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "근로복지공단: 도산대지급금 안내", url: "https://www.comwel.or.kr" },
      { label: "찾기쉬운 생활법령정보: 대지급금", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1694&ccfNo=3&cciNo=3&cnpClsNo=1" },
    ],
  },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", color: "#111" }}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 임금채권 · 도산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        회사가 파산·회생했는데 밀린 임금은?<br />
        재판상 도산 대지급금 신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사가 법원에서 파산 선고를 받았거나 회생절차에 들어갔다면, 밀린 임금을 받을 수 있는 방법이 있어요.
        <a href="https://www.law.go.kr/법령/임금채권보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금채권보장법</a>에 따라
        <strong>도산대지급금</strong>을 근로복지공단에 신청하면 국가가 사업주 대신 체불 임금을 지급해주죠.
        재판상 도산은 별도로 도산등사실인정을 받을 필요 없이, <strong>법원 결정문</strong>만 있으면 바로 신청할 수 있어요.
      </p>

      <Divider />

      <H2>재판상 도산이면 대지급금 바로 신청할 수 있나요?</H2>
      <p style={body}>
        맞아요. 재판상 도산은 법원이 공식적으로 선고하는 도산이에요. 크게 <strong>파산</strong>과 <strong>회생</strong> 두 가지 유형이 있죠.
        법원의 파산 선고문이나 회생절차 개시 결정문이 대지급금 신청 근거가 돼요.
        사실상 도산(법원 절차 없이 폐업)과 달리 고용노동부의 도산등사실인정 절차를 밟을 필요가 없어요.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 모두 해당되네요. 법원 결정문을 가지고 근로복지공단에 대지급금을 바로 신청하세요."
        partialMatchText="일부 조건이 안 맞아요. 해당되지 않는 항목을 확인하고 근로복지공단(1588-0075)에 상담해보세요."
      />

      <Divider />

      <H2>파산과 회생의 차이가 뭔가요?</H2>
      <p style={body}>
        <strong>파산</strong>은 회사가 완전히 청산되는 절차예요. 법원이 파산관재인을 선임하고, 회사 자산을 처분해서 채권자에게 배당하죠.
        회사가 없어지니까 고용이 종료되지만, 임금채권은 최우선 변제 대상이라 배당에서 먼저 받을 수 있어요.
      </p>
      <p style={body}>
        <strong>회생</strong>(법정관리)은 회사를 살리는 절차예요. 관리인이 회생계획을 수립하고, 법원 인가를 받으면 채권자들이 원금 일부를 탕감받는 조건으로 회사가 존속하게 되죠.
        고용이 유지될 가능성이 있지만, 임금 지급이 구조조정 계획에 따라 지연되거나 조정될 수 있어요.
      </p>

      <GreenBox title="파산 vs 회생 비교">
        파산: 회사 소멸 → 고용 종료 → 대지급금 + 파산 배당으로 임금 회수<br />
        회생: 회사 존속 → 고용 유지 가능 → 대지급금 + 회생채권 신고로 임금 청구
      </GreenBox>

      <Divider />

      <H2>신청은 어떻게 하나요?</H2>
      <p style={body}>
        법원 결정문을 확보한 뒤 <a href="https://www.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a>에 청구서를 제출하면 돼요.
        결정일로부터 <strong>2년 이내</strong>에 신청해야 하니까 시간을 놓치지 마세요.
        대지급금과 파산 배당(또는 회생채권)은 <strong>동시에 진행</strong>하는 게 유리해요. 대지급금 한도 초과분을 배당이나 회생에서 추가 청구할 수 있으니까요.
      </p>

      <SectionBadge>신청 절차 5단계</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <BorderBox>
        신청 기한: 법원 결정일로부터 <strong>2년 이내</strong><br />
        대지급금 범위: 최종 3개월분 임금 + 최종 3년분 퇴직금 + 최종 3개월분 휴업수당<br />
        신청처: 퇴직 당시 사업장 관할 지방고용노동관서 → 근로복지공단<br />
        문의: 근로복지공단 <strong>1588-0075</strong>
      </BorderBox>

      <Divider />

      <H2>사실상 도산이랑은 뭐가 다른가요?</H2>
      <p style={body}>
        사실상 도산은 법원 절차 없이 회사가 문을 닫은 경우예요. 이때는 먼저 고용노동부에 <strong>도산등사실인정</strong>을 신청해서 인정서를 받아야 해요.
        재판상 도산은 법원 결정문이 곧 근거이니까 이 과정이 필요 없죠.
      </p>
      <p style={body}>
        대지급금 한도는 동일해요. 재판상 도산이든 사실상 도산이든 지급 범위와 상한액은 같아요.
        다만 재판상 도산은 파산 배당이나 회생채권이라는 추가 회수 수단이 있다는 게 큰 차이예요.
        사실상 도산은 이런 절차가 없어서 대지급금 한도를 넘는 금액을 회수하기가 어려워요.
      </p>

      <GreenBox title="도산등사실인정이 필요한 경우">
        법원 절차 없이 폐업 → <a href="/w/도산등사실인정-신청-방법-서류" style={{ color: "#1D9E75", textDecoration: "underline" }}>도산등사실인정 신청</a> → 인정 후 대지급금 신청<br />
        법원 파산/회생 결정 → 결정문으로 바로 대지급금 신청 (도산등사실인정 불필요)
      </GreenBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 임금채권보장법과 근로복지공단 공식 안내를 바탕으로 작성했어요. 대지급금 상한액은 연도별로 변동되니 근로복지공단(1588-0075)에서 최신 기준을 확인하세요." />
    </div>
  );
}
