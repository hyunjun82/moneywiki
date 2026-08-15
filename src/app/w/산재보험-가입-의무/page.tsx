"use client";
// Q1. 사업을 시작하거나 직원을 채용했는데 산재보험 가입이 의무인지, 안 하면 어떻게 되는지 몰라서 불안한 상황이에요.
// Q2. 산재보험 가입 대상인지 확인하고, 14일 이내 4대보험 정보연계센터에서 온라인 신고를 완료하는 행동.
// Q3. 1인 이상 고용 시 의무, 14일 이내 신고 기한, 미가입 시 과태료 300만원+보험급여 50% 추가 부담, 온라인/오프라인 신고 방법.
// Q4. EligibilityChecker(대상 확인) + Steps(신고 절차) + GreenBox(핵심 요약) + BorderBox(과태료) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  { id: "c1", label: "근로자를 1명 이상 고용하고 있다" },
  { id: "c2", label: "사업자등록증이 있다 (개인·법인 무관)" },
  { id: "c3", label: "고용 형태가 정규직·계약직·일용직·알바 중 하나이다" },
  { id: "c4", label: "농업·임업·어업·수렵업 상시 5인 미만 사업장이 아니다" },
];

const SIGNUP_STEPS = [
  { title: "4대보험 정보연계센터 접속", desc: "4insure.or.kr에 접속해서 회원가입 후 로그인해요. 공인인증서 또는 간편인증이 필요해요." },
  { title: "사업장 정보 입력", desc: "사업자등록번호, 사업장 주소, 업종, 근로자 수를 입력해요. 사업자등록증 사본도 첨부해요." },
  { title: "근로자 정보 입력", desc: "근로자 이름, 주민등록번호, 입사일, 월 보수액을 입력해요. 4대보험 동시 신고가 가능해요." },
  { title: "신고 제출 및 확인", desc: "입력 내용 확인 후 제출하면 10분 이내에 완료돼요. 접수 확인 문자가 와요.", tip: "사업 개시일로부터 14일 이내에 꼭 완료하세요" },
];

const FAQS = [
  { q: "직원 1명만 있는데 산재보험 꼭 가입해야 하나요?", a: "네, 근로자 1명이라도 고용하면 의무예요. 정규직이든 알바든 일용직이든 상관없어요. 5인 미만 예외는 퇴직금이나 일부 근로기준법 규정이지 산재보험은 해당하지 않아요." },
  { q: "알바나 일용직도 산재보험 대상이에요?", a: "맞아요. 하루만 일하는 단기 일용직도 산재보험 적용 대상이에요. 근로계약서 없이 구두로 합의하고 일했어도 마찬가지예요." },
  { q: "산재보험 안 들면 과태료가 얼마나 나와요?", a: "미신고 시 300만원 이하 과태료가 부과돼요. 반복 위반하면 최대 300만원까지 올라가요. 산재 사고 발생 시 보험급여의 50%를 사업주가 추가 부담해야 해서 훨씬 무거워요." },
  { q: "산재보험료는 사업주가 전액 부담하나요?", a: "네, 산재보험료는 100% 사업주 부담이에요. 근로자가 낼 몫은 없어요. 업종별로 보험료율이 다르고, 사무직은 약 0.7%, 제조업은 1.8%, 건설업은 2~3% 수준이에요." },
  { q: "1인 자영업자도 산재보험에 가입할 수 있나요?", a: "가능해요. 특수형태근로종사자(배달라이더, 대리기사 등)나 1인 자영업자는 근로복지공단에서 본인이 직접 신청하면 임의 가입할 수 있어요." },
  { q: "산재보험 신고 기한을 넘겼으면 어떡하나요?", a: "늦었더라도 바로 신고하세요. 지연 신고라도 접수는 돼요. 과태료가 부과될 수 있지만, 미가입 상태에서 산재 사고가 발생하면 피해가 훨씬 크니까 하루라도 빨리 처리하는 게 낫아요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "산업재해보상보험법 (법제처)", url: "https://www.law.go.kr/법령/산업재해보상보험법" },
      { label: "근로복지공단 산재보험 안내", url: "https://www.kcomwel.or.kr" },
      { label: "4대보험 정보연계센터", url: "https://www.4insure.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "고용보험-가입-대상-조건", title: "고용보험 가입 대상과 조건", description: "산재보험과 함께 가입하는 고용보험 기준을 정리했어요." },
  { slug: "4대보험-가입-신고-방법", title: "4대보험 한 번에 신고하는 방법", description: "4대보험 정보연계센터에서 동시에 가입하는 절차예요." },
  { slug: "산재휴업급여계산기", title: "산재 휴업급여 계산기", description: "산재로 일을 못 하면 받는 휴업급여 금액을 계산해봐요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동 · 4대보험</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        산재보험 가입 의무 대상은?<br />
        신고 방법부터 미가입 과태료까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        직원 뽑았는데 산재보험 가입해야 하는지 헷갈리시죠? 결론부터 말하면, 근로자 1명이라도 고용하면 무조건 의무예요.
        "5인 미만이라 예외 아닌가요?" 하시는 분 많은데, 그건 퇴직금 규정이지 산재보험은 1인부터 적용돼요.
        14일 안에 신고 안 하면 과태료 300만원에, 사고 나면 보험급여의 50%까지 사업주가 직접 물어야 해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>우리 사업장이 산재보험 의무 가입 대상인지 확인해보세요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/산업재해보상보험법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75", textDecoration: "underline" }}>산업재해보상보험법 제6조</a>에 따르면
        근로자를 사용하는 모든 사업 또는 사업장이 산재보험 당연 적용 대상이에요.
        회사 규모나 근로자 수와 상관없이, 정규직 1명이든 알바 1명이든 한 명이라도 고용하면 가입해야 해요.
      </p>
      <p style={body}>
        예외는 딱 하나, 상시 근로자 5명 미만 농업·임업·어업·수렵업이에요. 이 경우만 임의 가입(의무는 아니지만 가입 가능)이에요.
        나머지 전부 의무 가입이라고 생각하면 돼요.
      </p>

      <SectionBadge>가입 의무 체크리스트</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="산재보험 의무 가입 대상이에요. 14일 이내에 신고하세요." partialMatchText="일부 해당하지 않는 항목이 있지만, 근로자 고용 사실이 있으면 대부분 의무 가입이에요." />

      <p style={body}>
        고용 형태는 중요하지 않아요. 정규직, 계약직, 파트타임, 아르바이트, 일용직 모두 적용돼요.
        심지어 하루만 일하는 단기 일용직도 산재보험 대상이에요.
      </p>

      <Divider />

      <H2>산재보험 신고 절차, 온라인으로 10분이면 끝나요</H2>
      <p style={body}>
        사업을 시작하거나 처음 직원을 채용하면 14일 이내에 신고해야 해요.
        가장 간편한 방법은 <a href="https://www.4insure.or.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75", textDecoration: "underline" }}>4대보험 정보연계센터</a>에서 온라인 신고하는 거예요.
        건강보험, 국민연금, 고용보험까지 4가지를 한 번에 처리할 수 있어요.
      </p>

      <SectionBadge>온라인 신고 절차</SectionBadge>
      <Steps steps={SIGNUP_STEPS} />

      <p style={body}>
        오프라인으로 하려면 <a href="https://www.kcomwel.or.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a> 관할 지사를 방문하면 돼요.
        사업자등록증 사본, 근로자 명부, 임금대장을 가져가세요. 관할 지사 위치는 근로복지공단 홈페이지에서 확인할 수 있어요.
      </p>

      <Divider />

      <H2>미가입하면 과태료·배상 책임이 이만큼이에요</H2>
      <p style={body}>
        산재보험에 가입하지 않으면 두 가지 불이익이 있어요.
        하나는 행정적 과태료, 다른 하나는 산재 사고 발생 시 직접 배상 책임이에요.
        특히 후자가 훨씬 무거워요.
      </p>

      <SectionBadge>미가입 시 불이익</SectionBadge>
      <BorderBox title="과태료 및 추가 부담">
        <p style={{ ...body, marginBottom: 8 }}><strong>미신고 과태료</strong>: 300만원 이하 (위반 횟수에 따라 100만~300만원)</p>
        <p style={{ ...body, marginBottom: 8 }}><strong>산재 발생 시</strong>: 근로복지공단이 지급한 보험급여의 50%를 사업주에게 추가 청구</p>
        <p style={{ ...body, marginBottom: 8 }}><strong>민사 배상</strong>: 미가입 상태에서 근로자 사망·중상 시 수억원 손해배상 청구 가능</p>
        <p style={{ ...body, marginBottom: 0 }}>산재보험에 가입했다면 보험에서 처리되지만, 미가입이면 전액 사업주 개인 재산으로 배상해야 해요.</p>
      </BorderBox>

      <p style={body}>
        예를 들어 치료비 1,000만원이 나왔다면, 근로복지공단이 보험급여를 지급한 후 사업주에게 500만원을 청구해요.
        여기에 과태료까지 합치면 부담이 커요. 산재 사고가 발생하지 않아도 미가입 자체가 위반이니까 하루라도 빨리 가입하는 게 낫아요.
      </p>

      <Divider />

      <H2>업종별 산재보험료율, 얼마나 내야 하나요?</H2>
      <p style={body}>
        산재보험료는 100% 사업주 부담이에요. 근로자가 낼 금액은 없어요.
        보험료율은 업종마다 재해 위험도에 따라 달라요. 위험한 업종일수록 높아요.
      </p>

      <SectionBadge>업종별 보험료율</SectionBadge>
      <GreenBox title="주요 업종 보험료율 (2026년 기준)">
        <p style={{ ...body, marginBottom: 6 }}><strong>사무직</strong>: 약 0.7% (월급 300만원 기준 월 2.1만원)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>제조업</strong>: 평균 1.8% (식품 1.4%, 금속가공 2.3%)</p>
        <p style={{ ...body, marginBottom: 6 }}><strong>건설업</strong>: 2~3% (고층 공사는 3% 이상도 가능)</p>
        <p style={{ ...body, marginBottom: 0 }}>정확한 보험료율은 <a href="https://www.kcomwel.or.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a>(1588-0075)에서 확인하세요.</p>
      </GreenBox>

      <p style={body}>
        보험료 납부는 매년 3월 31일까지 전년도 실적을 신고하고 정산해요.
        월별 납부나 연 1회 납부 중 선택 가능하고, 가상계좌·자동이체·카드 결제도 돼요.
      </p>

      <Divider />

      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 산업재해보상보험법과 근로복지공단 자료를 바탕으로 작성했어요. 업종별 보험료율은 매년 변경될 수 있으니 근로복지공단에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
