// Q1. 집을 샀는데 등기이전 절차를 몰라서 막막한 상황
// Q2. 소유권이전등기를 기한 내에 완료할 수 있어야 함 (서류 준비 → 취득세 납부 → 등기 신청)
// Q3. 잔금일로부터 60일 기한, 매도인·매수인 서류, 취득세 1~3%, 등기신청수수료 15,000원/건, 셀프등기 가능, 법무사 60~150만 원
// Q4. Steps(절차) + DocTable(서류) + GreenBox(비용 비교) + Checklist + FAQ

"use client";

export const dynamic = "force-static";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

// ─── 데이터 ──────────────────────────────────────────

const STEPS_DATA = [
  {
    title: "부동산 거래신고 (계약 후 30일 이내)",
    desc: "매매계약 체결 후 30일 이내에 시·군·구청에 실거래가 신고를 해야 해요. 공인중개사가 중개했다면 중개사가 대신 해주는 경우가 많죠.",
    tip: "부동산거래관리시스템(rtms.molit.go.kr)에서 온라인으로도 신고 가능해요",
  },
  {
    title: "취득세 신고·납부 (잔금일로부터 60일 이내)",
    desc: "관할 구청 세무과에서 취득세를 신고하고 납부하세요. 주택 가격과 주택 수에 따라 1~3%예요. 위택스(wetax.go.kr)에서 온라인 납부도 돼요.",
    tip: "생애 최초 주택 구입이면 취득세 감면 혜택이 있으니 반드시 확인하세요",
  },
  {
    title: "등기 서류 준비",
    desc: "매도인 서류(등기필정보, 인감증명서, 주민등록표등본)와 매수인 서류(주민등록표초본, 신분증)를 모두 준비하세요. 인감증명서는 발급일로부터 3개월 이내여야 해요.",
  },
  {
    title: "등기소 방문 또는 온라인 신청",
    desc: "관할 등기소에 방문하거나 대법원 인터넷등기소(iros.go.kr)에서 e-form으로 신청하세요. 등기신청수수료는 부동산 1건당 15,000원이에요.",
    tip: "셀프등기하면 법무사 수수료 60~150만 원을 아낄 수 있어요",
  },
];

const SELLER_DOCS = [
  { name: "등기필정보(등기권리증)", required: true, where: "매도인 보관 중" },
  { name: "인감증명서 (3개월 이내)", required: true, where: "주민센터 또는 정부24" },
  { name: "주민등록표등본", required: true, where: "주민센터 또는 정부24" },
  { name: "법인등기부등본 (법인인 경우)", required: false, where: "인터넷등기소" },
];

const BUYER_DOCS = [
  { name: "주민등록표초본 (주소변동 포함)", required: true, where: "주민센터 또는 정부24" },
  { name: "신분증 사본", required: true, where: "본인 소지" },
  { name: "위임장 (대리인 신청 시)", required: false, where: "직접 작성" },
];

const COMMON_DOCS = [
  { name: "소유권이전등기 신청서 (e-form)", required: true, where: "인터넷등기소에서 작성" },
  { name: "매매계약서 원본", required: true, where: "본인 소지" },
  { name: "거래신고필증 원본", required: true, where: "시·군·구청 발급" },
  { name: "취득세 납부확인서", required: true, where: "위택스 또는 구청 세무과" },
  { name: "국민주택채권 매입증명서", required: true, where: "은행 또는 온라인 매입" },
];

const CHECKLIST = [
  "잔금일로부터 60일 기한 달력에 표시",
  "매도인에게 인감증명서·등기필정보 요청",
  "취득세 신고·납부 완료 (위택스 또는 구청)",
  "국민주택채권 매입 완료",
  "인터넷등기소에서 e-form 신청서 작성",
  "등기소 방문 시 모든 원본 서류 지참",
];

const FAQS = [
  { q: "소유권이전등기를 60일 넘기면 어떻게 되나요?", a: "취득세 신고 기한(60일)을 넘기면 과태료가 부과돼요. 등기를 안 하면 법적으로 소유자로 인정받지 못하고, 매도인이 같은 집을 다른 사람에게 팔면 먼저 등기한 사람이 소유자가 되죠." },
  { q: "셀프등기 어렵지 않나요?", a: "인터넷등기소에서 e-form으로 신청서를 작성하면 생각보다 어렵지 않아요. 법무사 수수료 60~150만 원을 아낄 수 있죠. 다만 서류 하나라도 틀리면 반려되니 꼼꼼히 확인해야 해요." },
  { q: "취득세가 얼마나 되나요?", a: "주택의 경우 1~3%예요. 6억 이하 1주택이면 1~2%, 다주택자는 세율이 더 높아요. 생애 최초 주택 구입이면 감면 혜택이 있으니 구청 세무과에 확인하세요." },
  { q: "법무사 수수료는 얼마 정도인가요?", a: "보통 60~150만 원이에요. 집값이 5억 이하면 60~80만 원, 10억 이상이면 100~150만 원 정도 받아요. 등기가 복잡한 경우 더 받을 수 있죠." },
  { q: "국민주택채권은 뭔가요?", a: "등기를 할 때 의무적으로 매입해야 하는 채권이에요. 매입 즉시 할인 매도할 수 있어서 실제 부담은 매입액의 3~5% 수준이에요. 은행 창구나 온라인에서 매입 가능하죠." },
  { q: "공동명의로 등기하려면 어떻게 하나요?", a: "매매계약서에 공동명의로 기재되어 있으면 등기 신청 시 지분 비율을 적으면 돼요. 공동명의자 모두의 서류가 필요하죠." },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "찾기쉬운 생활법령정보: 소유권이전등기", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=566&ccfNo=3&cciNo=1&cnpClsNo=1" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "대법원 인터넷등기소", url: "https://www.iros.go.kr" },
      { label: "위택스: 취득세 신고·납부", url: "https://www.wetax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "부동산-매매-절차-계약-등기-순서", title: "부동산 매매 절차 전체 순서", description: "계약서 작성부터 잔금, 등기까지 전체 순서를 정리했어요." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 세율", description: "주택 취득세 세율과 계산 방법을 정리했어요." },
  { slug: "국민주택채권-매입-소유권이전등기-계산", title: "국민주택채권 매입 계산", description: "등기 시 필요한 국민주택채권 매입액과 실제 부담을 계산해봐요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 등기 · 매매</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        소유권이전등기 신청 절차, 서류부터 셀프등기까지<br />
        비용 비교와 60일 기한
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        집을 샀는데 &ldquo;등기 하세요&rdquo;라는 말만 듣고 뭘 해야 할지 모르겠죠.
      </p>
      <p style={body}>
        소유권이전등기는 부동산의 주인이 바뀌었다는 걸 공식 기록하는 절차예요. 잔금을 줬다고 자동으로 내 집이 되는 게 아니거든요.{" "}
        <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=566&ccfNo=3&cciNo=1&cnpClsNo=1" style={{ color: "#1D9E75", textDecoration: "underline" }}>찾기쉬운 생활법령정보</a>에
        따르면 잔금일로부터 <strong>60일 이내</strong>에 등기를 마쳐야 과태료가 없어요.
      </p>
      <p style={body}>
        서류 준비부터 취득세 납부, 셀프등기와 법무사 비용 비교까지 한 번에 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>등기 절차는 어떤 순서로 진행하나요?</H2>
      <p style={body}>
        거래신고 → 취득세 납부 → 서류 준비 → 등기 신청, 이 네 단계예요. 각 단계별 기한이 있으니 놓치지 않는 게 중요하죠.
      </p>
      <SectionBadge>절차</SectionBadge>
      <Steps steps={STEPS_DATA} />

      <Divider />

      <H2>매도인이 준비할 서류는 뭔가요?</H2>
      <p style={body}>
        매도인 서류가 빠지면 등기 신청이 아예 안 돼요. 잔금일에 맞춰 미리 준비해달라고 요청하세요. 인감증명서는 발급일로부터 3개월 이내여야 유효하니 너무 일찍 떼면 안 되죠.
      </p>
      <SectionBadge>매도인 서류</SectionBadge>
      <DocTable docs={SELLER_DOCS} />

      <Divider />

      <H2>매수인과 공통 서류는 뭘 준비하나요?</H2>
      <p style={body}>
        매수인은 주민등록표초본과 신분증이 기본이에요. 공통으로 필요한 건 매매계약서 원본, 거래신고필증, 취득세 납부확인서, 국민주택채권 매입증명서예요.
      </p>
      <SectionBadge>매수인·공통 서류</SectionBadge>
      <DocTable docs={[...BUYER_DOCS, ...COMMON_DOCS]} />

      <Divider />
      <ArticleAd position="mid" />

      <H2>셀프등기와 법무사, 비용 차이가 얼마나 되나요?</H2>
      <p style={body}>
        셀프등기하면 법무사 수수료 60~150만 원을 아낄 수 있어요.{" "}
        <a href="https://www.iros.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>인터넷등기소</a>에서
        e-form으로 신청서를 작성하면 등기신청수수료 부동산 1건당 15,000원만 내면 되죠.
      </p>
      <GreenBox title="비용 비교 (6억 주택 기준)">
        셀프등기: 취득세 약 600~1,800만 원 + 등기수수료 15,000원 + 국민주택채권 = 취득세+α | 법무사 대행: 위 금액 + 법무사 수수료 60~80만 원 추가
      </GreenBox>
      <p style={body}>
        처음 집을 사는 분이라면 법무사에게 맡기는 게 안전할 수 있어요. 서류 하나 빠지면 반려되고 다시 가야 하니까요. 경험이 있고 시간 여유가 있다면 셀프등기로 비용을 아끼는 것도 좋은 선택이죠.
      </p>

      <Divider />

      <H2>등기 전에 꼭 확인해야 할 것들</H2>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <BorderBox title="등기 안 하면 어떻게 되나요?">
        60일 기한을 넘기면 과태료가 부과돼요. 더 큰 문제는 등기부에 이름이 안 올라간 상태에서 매도인이 같은 집을 다른 사람에게 팔면, 먼저 등기한 사람이 소유자가 된다는 점이에요. 잔금 주는 날 바로 등기하는 게 가장 안전하죠.
      </BorderBox>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 일반적인 등기 절차 안내를 목적으로 작성됐어요. 특수한 매매(경매, 상속, 증여 등)는 절차가 다를 수 있으니 전문가 상담을 받으세요." />
      <RelatedArticles items={RELATED} />
    </ArticleLayout>
  );
}
