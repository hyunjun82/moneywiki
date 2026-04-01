"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1: 세금을 더 냈는데 환급금이 있는지 모르거나, 있다는 건 알지만 신청 방법을 모르는 상황
// Q2: 홈택스에서 환급금 조회하고 계좌 등록해서 수령 완료
// Q3: 조회 방법(홈택스·손택스·정부24), 신청 절차, 5년 소멸시효, 종류별 차이, 피싱 주의
// Q4: Steps(신청 절차) + GreenBox(핵심 기한) + BorderBox(환급 종류) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "홈택스에서 환급금 조회",
    desc: "홈택스에 로그인 → 조회/발급 → 국세환급 → 환급금 상세조회로 들어가요. 5년 이내 환급금을 확인할 수 있어요.",
    link: { label: "홈택스 환급금 조회", href: "https://www.hometax.go.kr" },
  },
  {
    title: "환급받을 계좌 등록",
    desc: "본인 명의 계좌만 가능해요. 타인 명의 계좌는 안 돼요. 계좌번호를 정확히 입력하세요.",
  },
  {
    title: "환급 신청 버튼 클릭",
    desc: "조회 화면에서 '환급 신청'을 누르면 끝이에요. 2주 이내에 입금되고, 금액이 크면 한 달까지 걸릴 수 있어요.",
  },
  {
    title: "입금 확인",
    desc: "홈택스에서 지급 상태를 확인할 수 있어요. '지급 완료'인데 안 들어왔으면 은행에 문의해보세요.",
  },
];

const CHECKLIST = [
  "홈택스 또는 손택스에서 미수령 환급금 조회 완료",
  "정부24에서 지방세·4대보험 환급금도 함께 확인",
  "5년 이내 환급금인지 확인 (5년 초과 시 국고 귀속)",
  "본인 명의 계좌로 등록 (타인 명의 불가)",
  "체납 세금이 있으면 환급금에서 자동 차감되는지 확인",
  "국세청 사칭 피싱 문자·이메일 주의",
];

const FAQS = [
  {
    q: "환급금이 있다는 문자가 왔는데 진짜인가요?",
    a: "국세청은 미수령 환급금 안내를 문자나 이메일로 보내지 않아요. 링크 클릭하지 말고 직접 홈택스에 접속해서 확인하세요. 돈을 내라고 하면 100% 사기예요.",
  },
  {
    q: "5년이 지난 환급금은 정말 못 받나요?",
    a: "최초 지급요구일부터 5년이 지나면 국고로 귀속돼요. 이후에는 신청해도 돌려받을 수 없어요. 환급금 생기면 바로 신청하는 게 좋아요.",
  },
  {
    q: "연말정산 환급금도 따로 신청해야 하나요?",
    a: "아니에요. 연말정산 환급은 회사에서 처리해서 2월 급여와 함께 자동으로 들어와요. 따로 신청할 필요 없어요.",
  },
  {
    q: "종합소득세 환급은 언제 들어오나요?",
    a: "5월에 신고하면 보통 6월 말~7월 초에 입금돼요. 신고할 때 계좌를 정확히 적었는지 꼭 확인하세요.",
  },
  {
    q: "세금 체납이 있으면 환급금은 어떻게 되나요?",
    a: "체납액에서 자동으로 차감돼요. 체납이 환급금보다 크면 한 푼도 못 받을 수 있어요.",
  },
  {
    q: "원클릭 환급이 뭔가요?",
    a: "2026년 3월부터 시작된 서비스예요. 홈택스 첫 화면에서 '원클릭 환급 신고' 버튼을 누르면 최대 5년치 환급금을 한 번에 신청할 수 있어요. 3월 31일까지 신청하면 4월 말에 입금돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 서비스",
    items: [
      { label: "국세청 홈택스 환급금 조회", url: "https://www.hometax.go.kr" },
      { label: "정부24 미환급금 통합 조회", url: "https://www.gov.kr/portal/service/serviceInfo/174100000054" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "국세기본법 (환급금 소멸시효)", url: "https://www.law.go.kr/법령/국세기본법" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-환급-조회-기간", title: "연말정산 환급 조회", description: "연말정산 환급금이 언제 들어오는지 확인하는 방법이에요." },
  { slug: "종합소득세-환급-신청", title: "종합소득세 환급 신청", description: "5월 신고 후 환급 절차와 일정이에요." },
  { slug: "부가세-환급-신청", title: "부가세 환급 신청", description: "사업자 부가세 환급 신청 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금 · 환급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        세금 환급 신청 방법, 내 환급금 조회부터<br />
        수령까지 한 번에
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        세금을 더 냈는데 돌려받을 수 있다는 걸 모르는 분이 많아요.
        국세청에 따르면 매년 수천억원의 미수령 환급금이 쌓이고 있죠.
        5년이 지나면 국고로 귀속돼서 영영 못 받아요.
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서
        지금 바로 조회해보세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>환급금 조회부터 수령까지 4단계</H2>
      <p style={body}>
        홈택스나 손택스에서 5분이면 끝나요. 미수령 환급금은 자동으로 안 주니까 직접 신청해야 해요.
        신청 후 보통 2주 이내에 입금돼요.
      </p>

      <Steps steps={STEPS} />

      <GreenBox>
        <strong>2026년 원클릭 환급 서비스</strong><br />
        홈택스 첫 화면 → '원클릭 환급 신고' 클릭 → 최대 5년치 일괄 신청<br />
        3월 31일까지 신청하면 4월 말 입금 (이후 신청은 3개월 소요)
      </GreenBox>

      <CategoryButton label="세금·환급 정보" count={5} href="/category/세금" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>정부24에서 지방세·4대보험 환급도 확인하세요</H2>
      <p style={body}>
        국세 환급금만 조회하면 놓치는 게 있어요.
        <a href="https://www.gov.kr/portal/service/serviceInfo/174100000054" style={{ color: "#1D9E75", textDecoration: "underline" }}>정부24</a>에서는
        지방세, 건강보험, 국민연금, 고용보험, 산재보험 미환급금까지 한 번에 조회할 수 있어요.
      </p>

      <BorderBox>
        <strong>환급금 종류별 신청 경로</strong><br /><br />
        <a href="/w/연말정산-환급-조회-기간" style={{ color: "#1D9E75" }}>연말정산 환급</a>: 회사에서 2월 급여와 함께 자동 지급<br />
        <a href="/w/종합소득세-환급-신청" style={{ color: "#1D9E75" }}>종합소득세 환급</a>: 5월 신고 → 6~7월 자동 입금<br />
        <a href="/w/부가세-환급-신청" style={{ color: "#1D9E75" }}>부가세 환급</a>: 1·7월 신고 → 30일 이내 지급<br />
        양도소득세 환급: 신고 후 30일 이내<br />
        경정청구 환급: 심사 후 2~3개월
      </BorderBox>

      <p style={body}>
        ARS로도 조회할 수 있어요. 126(국세상담센터) → 8번 → 1번 → 본인인증하면 환급금 내역을 들을 수 있어요.
        인터넷이 어려운 분은 관할 세무서에 신분증과 통장 사본을 가져가서 직접 신청해도 돼요.
      </p>

      <Divider />

      <H2>환급금 수령 전 체크리스트</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        조회했는데 환급금이 있다면 바로 신청하세요. 5년 넘기면 국고로 귀속돼요. 피싱도 조심하고요.
      </p>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 국세기본법과 홈택스 서비스를 바탕으로 작성됐어요. 환급 절차와 일정은 변경될 수 있으니 홈택스에서 최신 정보를 직접 확인해봐요." />
    </ArticleLayout>
  );
}
