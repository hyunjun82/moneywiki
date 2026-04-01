"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1: 이직·퇴사·해지 후 환급금이 있다는 걸 들었는데 어떻게 찾는지 모르는 상황
// Q2: 정부24에서 본인인증 후 7가지 환급금 조회 및 신청 완료
// Q3: 정부24 조회 방법, 7가지 환급금 종류와 금액, 신청 방법, 5년 소멸시효
// Q4: Steps(조회 3단계) + DocTable(환급금 종류별) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "정부24 미환급금 조회 페이지 접속",
    desc: "정부24(gov.kr) 에 접속해서 '미환급금 찾기' 서비스를 검색하거나 바로 이동해요. PC와 모바일 모두 가능해요. 정부24 앱을 설치해도 돼요.",
    link: { label: "정부24 미환급금 조회", href: "https://www.gov.kr/portal/service/serviceInfo/174100000054" },
  },
  {
    title: "본인인증 로그인",
    desc: "카카오, 네이버, 공동인증서 중 편한 방법으로 간편인증 로그인해요. 본인 명의만 조회 가능하니 각자 직접 로그인해야 해요.",
    tip: "가짜 사이트 주의: 반드시 gov.kr 주소에서만 진행하세요",
  },
  {
    title: "조회 결과 확인 후 바로 신청",
    desc: "7가지 환급금이 한 번에 목록으로 나와요. 금액이 있는 항목을 클릭해서 바로 신청하면 돼요. 국세·지방세·건강보험은 정부24에서 즉시 신청 가능해요.",
    tip: "국민연금·통신환급금은 각 기관에 별도 신청해야 해요",
  },
];

const REFUND_TYPES = [
  { name: "국세 환급금", required: true, where: "평균 15만원, 최대 50만원 이상 / 정부24 신청" },
  { name: "지방세 환급금", required: true, where: "평균 5만원, 최대 30만원 / 정부24 신청" },
  { name: "건강보험 미환급금", required: true, where: "평균 8만원, 최대 30만원 / 정부24 신청" },
  { name: "국민연금 과오납금", required: true, where: "평균 10만원, 최대 50만원 / 1355 전화 신청" },
  { name: "보관금·송달료", required: false, where: "평균 3만원 / 법원에서 처리" },
  { name: "유료방송 미환급금", required: false, where: "평균 2만원 / 해당 방송사 전화" },
  { name: "통신 미환급금", required: false, where: "평균 1만원 / 해당 통신사 전화" },
];

const CHECKLIST = [
  "정부24(gov.kr) 주소 정확히 확인 (gov24.com, gov-kr.net은 가짜 사이트)",
  "본인 명의로 직접 로그인 (가족 대리 조회 불가)",
  "조회 후 금액 있는 항목 즉시 신청 (5년 지나면 소멸)",
  "2021년 이전 환급금 → 2026년 안에 신청 완료 필수",
  "국세·지방세·건강보험 → 정부24에서 바로 신청",
  "국민연금 과오납금 → 1355 전화 또는 공단 방문",
  "통신·방송 환급금 → 해당 통신사·방송사 직접 연락",
];

const FAQS = [
  {
    q: "미환급금 조회는 무료인가요?",
    a: "네, 완전 무료예요. 정부24에서 본인인증만 하면 30초 안에 조회돼요. 수수료를 받는다는 문자나 연락은 사기예요.",
  },
  {
    q: "환급금 신청 후 언제 입금되나요?",
    a: "국세는 30일 이내, 건강보험은 14일 이내, 통신·방송은 7일 이내 입금돼요. 계좌 입력하면 자동 입금이에요.",
  },
  {
    q: "100만원 이상 받는 경우도 있나요?",
    a: "네, 부동산 매매 시 취득세 환급, 직장 이직 시 건강보험료 중복 납부, 종합소득세 환급 누락이 겹치면 100만원 이상 받는 경우도 있어요.",
  },
  {
    q: "5년 지난 환급금은 정말 못 받나요?",
    a: "국세·지방세·건강보험 환급금은 5년 시효가 지나면 청구권이 소멸돼요. 2020년 환급금은 2025년까지가 마지막이었어요.",
  },
  {
    q: "가족 환급금도 대신 조회해줄 수 있나요?",
    a: "일반 대리 조회는 안 돼요. 법정대리인(미성년자 부모)이거나 위임장을 제출한 경우만 가능해요. 가족 각자가 직접 로그인해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 서비스",
    items: [
      { label: "정부24 미환급금 조회 서비스", url: "https://www.gov.kr/portal/service/serviceInfo/174100000054" },
    ],
  },
  {
    category: "기관 문의",
    items: [
      { label: "정부24 고객센터 110", url: "https://www.gov.kr" },
      { label: "국세청 126", url: "https://www.nts.go.kr" },
      { label: "건강보험공단 1577-1000", url: "https://www.nhis.or.kr" },
      { label: "국민연금공단 1355", url: "https://www.nps.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-환급금-조회", title: "연말정산 환급금 조회 방법", description: "연말정산에서 더 낸 세금을 돌려받는 방법이에요." },
  { slug: "종합소득세-환급", title: "종합소득세 환급 신청", description: "프리랜서·자영업자 종합소득세 환급 받는 방법이에요." },
  { slug: "건강보험-환급금", title: "건강보험 환급금 신청", description: "건강보험료 과다 납부분을 돌려받는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 환급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        미환급금 조회 정부24<br />
        국세·건강보험·통신 환급금 7가지 한번에
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        내 이름으로 환급금이 쌓여 있는데 모르고 있다면요? 이직이나 퇴사, 통신사 해지 후 받지 못한 환급금이 남아 있는 경우가 생각보다 많아요.
        <a href="https://www.gov.kr/portal/service/serviceInfo/174100000054" style={{ color: "#1D9E75", textDecoration: "underline" }}>정부24</a>에서 7가지 환급금을 한 번에 조회할 수 있어요.
        5년이 지나면 청구권이 소멸되니까 지금 바로 조회하는 게 좋아요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>정부24에서 30초 만에 조회하는 방법</H2>
      <p style={body}>
        별도 앱 설치 없이 PC나 모바일 브라우저에서 바로 조회할 수 있어요. 카카오·네이버 간편인증이면 30초도 안 걸려요.
        조회 후 금액이 있으면 그 자리에서 바로 신청도 돼요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton label="세금·환급 정보" count={8} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>조회되는 환급금 7가지와 신청 방법</H2>
      <p style={body}>
        국세·건강보험·지방세는 정부24에서 바로 신청할 수 있어요. 국민연금이나 통신·방송 환급금은 각 기관에 별도로 연락해야 해요.
        신청 기관이 다르니까 목록 전체를 꼼꼼하게 확인해야 해요.
      </p>

      <SectionBadge>환급금 종류별 평균 금액</SectionBadge>
      <DocTable docs={REFUND_TYPES} />

      <GreenBox>
        환급금이 여러 종류라면 합산하면 꽤 큰 금액이 될 수 있어요. 직장 이직 시 건강보험료 중복 납부(평균 8만원) + 국세 환급(평균 15만원) + 국민연금 과오납(평균 10만원)만 합쳐도 33만원이에요. 부동산 거래가 있었다면 취득세 환급까지 더해서 100만원 이상인 경우도 있어요.
      </GreenBox>

      <Divider />

      <H2>놓치지 않기 위한 체크리스트</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        환급금은 5년 시효가 있어요. 이미 소멸한 환급금은 되살릴 수 없으니까 지금 조회한 뒤 바로 신청까지 마쳐야 해요.
      </p>
      <SectionBadge>조회·신청 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <BorderBox>
        <strong>소멸시효 계산 예시</strong><br />
        2021년 발생 환급금 → 2026년 안에 신청 필수<br />
        2020년 발생 환급금 → 2025년 12월 31일로 이미 소멸<br />
        <br />
        국세·지방세·건강보험 환급금 모두 5년 시효 적용
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 정부24 미환급금 조회 서비스를 바탕으로 작성됐어요. 환급 기준과 절차는 변경될 수 있으니 최신 정보는 정부24(gov.kr) 또는 고객센터 110에서 직접 안내받아봐요." />
    </ArticleLayout>
  );
}
