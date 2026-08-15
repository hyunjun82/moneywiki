// Q1. 명절을 앞두고 자금 사정이 빠듯한 소상공인이 대출·보증 지원을 알아보는 상황
// Q2. 소상공인 명절자금 대출·보증 신청을 완료할 수 있어야 함
// Q3. 39.3조 원 규모, 신청 자격(연매출 10억 이하, 상시근로자 5인 미만), 필요 서류, 신청 채널(소상공인시장진흥공단·신용보증기금·시중은행)
// Q4. Steps(신청 절차) + DocTable(서류) + EligibilityChecker(자격) + FAQ

"use client";
export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, EligibilityChecker, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "소상공인 확인서 발급이 가능한 사업자예요" },
  { id: "c2", label: "연매출 10억 원 이하예요" },
  { id: "c3", label: "상시근로자 5인 미만이에요 (제조·건설·운수업은 10인 미만)" },
  { id: "c4", label: "국세·지방세 체납이 없어요" },
];

const STEPS_DATA = [
  {
    title: "소상공인 확인서 발급",
    desc: "소상공인시장진흥공단 홈페이지(semas.or.kr)에서 온라인으로 발급받을 수 있어요. 사업자등록증 정보만 있으면 바로 조회돼요.",
    tip: "유효기간이 1년이니까 기한이 남았는지 먼저 확인하세요",
  },
  {
    title: "신청 서류 준비",
    desc: "사업자등록증, 대표자 신분증, 부가세과세표준증명원, 국세·지방세 완납증명서가 기본이에요. 임대사업자라면 임대차계약서도 준비하세요.",
    tip: "홈택스에서 부가세과세표준증명원을 무료로 발급받을 수 있어요",
  },
  {
    title: "대출·보증 신청",
    desc: "소상공인시장진흥공단 정책자금(sbiz24.kr)에서 온라인 신청하거나, 신용보증기금·지역신용보증재단에서 보증서를 받은 뒤 시중은행에서 대출받는 방식이에요.",
    tip: "시중은행 명절자금 물량이 가장 크니까 주거래 은행부터 문의하세요",
  },
  {
    title: "심사 및 자금 수령",
    desc: "신청 후 심사 기간은 보통 1~2주예요. 승인되면 3영업일 이내 계좌로 입금돼요.",
  },
];

const DOCS = [
  { name: "사업자등록증 사본", required: true, where: "세무서 또는 홈택스" },
  { name: "대표자 신분증", required: true, where: "본인 소지" },
  { name: "소상공인 확인서", required: true, where: "소상공인시장진흥공단" },
  { name: "부가세과세표준증명원", required: true, where: "홈택스 (무료 발급)" },
  { name: "국세·지방세 완납증명서", required: true, where: "홈택스·위택스" },
  { name: "임대차계약서 사본", required: false, where: "해당 시 본인 소지" },
  { name: "재무제표 또는 매출증빙", required: false, where: "세무사 또는 홈택스" },
];

const FAQS = [
  { q: "소상공인 명절자금 대출 금리가 얼마나 되나요?", a: "정책자금은 연 3~4% 수준이에요. 시중 대출보다 낮고, 신용등급과 담보 유무에 따라 달라지니 상담 시 정확한 금리를 확인하세요." },
  { q: "기존 정책자금 이용 중인데 추가 대출이 가능한가요?", a: "한도 내라면 가능해요. 기존 대출 상환 유예도 신청할 수 있으니 진흥공단에 문의해보세요." },
  { q: "전통시장 상인도 신청할 수 있나요?", a: "네, 전통시장 입점 업주도 소상공인 확인서만 있으면 동일하게 신청 가능해요." },
  { q: "법인 사업자도 신청할 수 있나요?", a: "소상공인 기준(연매출 10억 이하, 상시근로자 5인 미만)에 해당하면 법인도 신청 가능해요." },
  { q: "명절자금 신청 기한이 있나요?", a: "명절 전 집중 접수 기간이 있고, 예산 소진 시 조기 마감될 수 있어요. 설 2주 전까지 신청하는 게 안전해요." },
  { q: "온라인 신청 외에 방문 신청도 가능한가요?", a: "네, 소상공인시장진흥공단 지역센터에 방문해서 접수할 수 있어요. 사전 예약하면 대기 시간을 줄일 수 있죠." },
];

const REFERENCES = [
  {
    category: "공식 기관",
    items: [
      { label: "소상공인시장진흥공단: 정책자금 안내", url: "https://www.semas.or.kr" },
      { label: "소상공인24: 온라인 신청 포털", url: "https://www.sbiz24.kr" },
      { label: "중소벤처기업부: 소상공인 지원정책", url: "https://www.mss.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "온누리상품권-환급", title: "온누리상품권 환급 방법", description: "전통시장 소비 활성화를 위한 온누리상품권 사용법과 환급 절차를 정리했어요." },
  { slug: "설-성수품-할인", title: "설 성수품 할인 정보", description: "명절 성수품 할인 행사 일정과 참여 방법을 정리했어요." },
  { slug: "부가세-환급-신청", title: "부가세 환급 신청 방법", description: "부가가치세 환급 대상과 신청 절차를 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>정부지원금 · 소상공인 · 대출</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        소상공인 명절자금, 39조 대출 어떻게 받나?<br />
        신청 조건과 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        명절 앞두고 인건비에 재료비, 밀려오는 결제 대금까지. 자금 사정이 빠듯하죠.
      </p>
      <p style={body}>
        정부가 소상공인·중소기업에 <strong>총 39.3조 원</strong> 규모의 명절자금을 공급하고 있어요.
        저금리 신규 대출뿐 아니라 기존 대출 상환 유예까지 포함된 금액이에요.{" "}
        <a href="https://www.mss.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>중소벤처기업부</a>가
        매년 설·추석에 편성하는 지원책이죠.
      </p>
      <p style={body}>
        어디서 신청하는지, 서류는 뭘 준비해야 하는지, 내가 자격이 되는지 한 번에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>신청 자격이 되는지 먼저 확인하세요</H2>
      <p style={body}>
        소상공인 확인서를 발급받을 수 있는 사업자면 기본 자격이 돼요. 연매출 10억 원 이하, 상시근로자 5인 미만(제조·건설·운수업은 10인 미만) 기준이에요.{" "}
        <a href="https://www.semas.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>소상공인시장진흥공단</a>에서
        확인서를 온라인으로 발급받을 수 있죠.
      </p>
      <p style={body}>
        국세·지방세 체납이 없어야 하고, 휴·폐업 상태가 아니어야 해요. 신용등급이 낮으면 직접 대출은 어려울 수 있는데, 이때는 신용보증기금이나 지역신용보증재단의 보증서를 받아서 시중은행에서 대출받는 방법이 있어요.
      </p>
      <SectionBadge>자격 확인</SectionBadge>
      <EligibilityChecker items={CHECK_ITEMS} />

      <Divider />

      <H2>신청 절차는 어떻게 되나요?</H2>
      <p style={body}>
        크게 두 가지 경로가 있어요. 첫째는 소상공인시장진흥공단 정책자금(직접 대출), 둘째는 신용보증기금·지역보증재단 보증서를 받고 시중은행에서 대출받는 방식이에요.
      </p>
      <p style={body}>
        시중은행 명절자금 물량이 훨씬 크니까, 주거래 은행부터 문의하는 게 빠를 수 있어요. 정책자금은 금리가 낮은 대신 심사가 조금 더 걸리죠.
      </p>
      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>필요한 서류는 뭘 준비해야 하나요?</H2>
      <p style={body}>
        사업자등록증, 소상공인 확인서, 매출 증빙이 기본이에요. 홈택스에서 대부분 무료로 발급받을 수 있으니 미리 뽑아두면 현장에서 시간을 아낄 수 있죠.
      </p>
      <SectionBadge>서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>정책자금 대출과 시중은행 대출, 뭐가 다른가요?</H2>
      <p style={body}>
        정책자금은 소상공인시장진흥공단이 직접 빌려주는 거예요. 금리가 연 3~4%로 낮고, 거치기간(원금 안 갚는 기간)이 2년 정도 있어요. 대신 한도가 정해져 있고, 예산 소진 시 조기 마감되죠.
      </p>
      <p style={body}>
        시중은행 명절자금은 신용보증기금·지역보증재단 보증서를 받아서 대출받는 구조예요. 보증료가 연 0.5~1% 정도 추가되지만, 물량이 크고 승인이 빠른 편이에요. 주거래 은행에서 신용평가가 이미 돼 있으니까요.
      </p>
      <GreenBox title="어디서 신청하면 유리한가요?">
        신용등급 양호하고 빠른 자금이 필요하면 시중은행, 금리를 최대한 낮추고 싶으면 정책자금이에요. 기존 정책자금 이용자라면 상환 유예 신청도 가능하죠.
      </GreenBox>

      <Divider />

      <H2>기존 대출 상환 유예는 어떻게 신청하나요?</H2>
      <p style={body}>
        이미 정책자금 대출을 받고 있는 분은 원금 상환을 유예받을 수 있어요. 명절 전후 자금 압박을 줄이기 위한 조치죠.
      </p>
      <p style={body}>
        소상공인시장진흥공단에 전화(1357)하거나,{" "}
        <a href="https://www.sbiz24.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>소상공인24</a>에서
        온라인으로 유예 신청할 수 있어요. 별도 서류 없이 기존 대출 정보만으로 처리되는 경우가 많아요.
      </p>
      <BorderBox title="취약계층 추가 지원">
        취약계층 대상 정책금융 1.1조 원도 별도 공급돼요. 생계급여 수급자는 급여 6.5% 인상도 적용되니, 해당되는 분은{" "}
        <a href="/w/긴급복지-생계지원금-신청-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>긴급복지 생계지원금</a>도 확인해보세요.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 정부 정책 안내를 목적으로 작성됐어요. 실제 대출 조건은 개별 심사에 따라 달라질 수 있으니, 신청 전 해당 기관에 직접 확인하세요." />
      <RelatedArticles items={RELATED} />
    </ArticleLayout>
  );
}
