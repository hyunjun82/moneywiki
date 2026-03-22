"use client";

// Q1. 주택연금 받으면서 이사해야 하는데 연금이 끊기는 건 아닌지 걱정하는 상황
// Q2. 담보주택 변경 절차를 파악하고, 새 집값에 따른 월지급금 변동을 이해해서 이사 결정
// Q3. 같은 유형 주택끼리만 변경, 공시가격 9억 초과 제한, 신청서 제출, 약 1개월 소요, 월지급금 조정
// Q4. GreenBox(변경 가능 조건) + Steps(신청 절차) + BorderBox(월지급금 변동) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const APPLY_STEPS = [
  {
    title: "한국주택금융공사 상담",
    description: "콜센터(1688-8114)나 가까운 지사에서 담보주택 변경 가능 여부를 먼저 확인해요. 새 집의 공시가격과 유형이 조건에 맞는지 점검받을 수 있어요.",
  },
  {
    title: "조건변경 신청서 제출",
    description: "서명 또는 기명날인한 '주택연금 조건변경 신청서'를 공사에 제출해요. 채권자(금융기관)의 확인이 필요한데, 원하면 공사가 전화나 팩스로 직접 확인해 줘요.",
  },
  {
    title: "새 집 감정평가",
    description: "기존 집과 새 집을 각각 평가해서 담보가치를 비교해요. 이 결과에 따라 월지급금이 조정돼요.",
  },
  {
    title: "근저당권 해지 및 설정",
    description: "기존 집의 근저당권을 해지하고 새 집에 근저당권을 설정해요. 매매계약부터 완료까지 약 1개월 정도 걸려요.",
  },
];

const FAQS = [
  {
    q: "주택연금 받다가 이사하면 연금이 끊기나요?",
    a: "아니요. 담보주택 변경 승인을 받으면 끊기지 않아요. 새 집으로 담보를 옮기면 계속 받을 수 있어요.",
  },
  {
    q: "아파트에서 오피스텔로 바꿀 수 있나요?",
    a: "안 돼요. 일반주택과 오피스텔 간, 일반주택과 노인복지주택 간 변경은 허용되지 않아요. 같은 유형끼리만 가능해요.",
  },
  {
    q: "새 집이 더 싸면 월지급금이 줄어드나요?",
    a: "네, 줄어들 수 있어요. 담보가치가 낮아지면 월지급금도 감소해요. 너무 많이 줄면 변경 자체가 제한될 수도 있어요.",
  },
  {
    q: "담보주택 변경하면 비용이 드나요?",
    a: "근저당권 해지·설정 비용이 들어요. 감정평가 비용도 발생할 수 있으니 공사에 미리 문의하세요.",
  },
  {
    q: "이사 후 그 집에 반드시 살아야 하나요?",
    a: "네, 실제 거주해야 해요. 특별한 사유 없이 1년 이상 비우면 주택연금이 중단될 수 있어요.",
  },
  {
    q: "변경 처리 기간은 얼마나 걸리나요?",
    a: "매매계약부터 근저당권 설정까지 약 1개월 정도예요. 지사 사정에 따라 더 걸릴 수 있으니 여유 있게 준비하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "한국주택금융공사법", url: "https://www.law.go.kr/법령/한국주택금융공사법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "찾기쉬운 생활법령정보: 담보주택 변경", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=730&ccfNo=3&cciNo=2&cnpClsNo=3" },
      { label: "한국주택금융공사: 가입자 안내", url: "https://www.hf.go.kr/ko/sub03/sub03_02_05_03.do" },
    ],
  },
];

const RELATED = [
  { slug: "주택연금-가입조건-수령액-계산", title: "주택연금 가입 조건과 수령액", description: "가입 기준과 월지급금 계산이에요." },
  { slug: "주택연금-거주의무-일시적-부재-허용", title: "주택연금 거주의무와 일시적 부재", description: "집을 비워도 되는 경우를 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 주택연금 · 이사</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주택연금 받으면서 이사 갈 수 있을까?<br />
        담보주택 변경 조건과 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        주택연금을 받고 있는데 건강 문제나 가족 사정으로 이사를 해야 할 수 있죠.
        연금이 끊기는 건 아닌지 걱정되실 텐데, 담보주택 변경 신청을 하면 새 집에서도 계속 받을 수 있어요.
        다만 집값 차이에 따라 월지급금이 달라질 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>이사해도 주택연금을 계속 받을 수 있나요?</H2>
      <SectionBadge>변경 가능 조건</SectionBadge>

      <p style={body}>
        <a href="https://www.hf.go.kr/ko/sub03/sub03_02_05_03.do" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국주택금융공사</a>에
        담보주택 변경을 신청하면 새 집으로 옮겨도 연금을 계속 받을 수 있어요.
        새 집을 본인(또는 배우자와 공동) 전부 소유하고, 실제로 거주해야 해요.
      </p>

      <GreenBox title="담보주택 변경 조건">
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>소유 요건</strong>: 새 집을 전부 소유 (본인 또는 배우자 공동 소유)</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>거주 요건</strong>: 새 집에 실제 거주</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>같은 유형</strong>: 일반주택↔일반주택만 가능 (오피스텔, 노인복지주택 간 변경 불가)</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>공시가격</strong>: 신규 주택 공시가격 9억 초과 + 기존보다 높으면 변경 불가</p>
        <p style={{ margin: 0, lineHeight: 1.9, fontSize: 13 }}><strong>월지급금</strong>: 감액이사로 월지급금이 과도하게 줄면 변경 제한</p>
      </GreenBox>

      <p style={body}>
        확정기간방식이나 사전가입 방식으로 받고 있다면 월지급금이 감소하는 변경은 불가능할 수 있어요.
        본인 상황에 맞는지 공사에 먼저 상담하는 게 좋아요.
      </p>

      <Divider />

      <H2>새 집값에 따라 월지급금이 어떻게 바뀌나요?</H2>

      <p style={body}>
        담보주택을 변경하면 기존 집과 새 집을 각각 감정평가해서 담보가치를 비교해요.
        그 결과에 따라 월지급금이 조정돼요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>집값에 따른 월지급금 변동</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}><strong>새 집 &gt; 기존 집</strong>: 월지급금 증가</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}><strong>새 집 = 기존 집</strong>: 월지급금 비슷하게 유지</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}><strong>새 집 &lt; 기존 집</strong>: 월지급금 감소 (과도하면 변경 제한)</p>
        <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.9 }}>
          이사 시점의 시가가 아니라 감정평가 금액 기준이에요.
        </p>
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>담보주택 변경은 어떻게 신청하나요?</H2>
      <SectionBadge>신청 절차</SectionBadge>

      <p style={body}>
        <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=730&ccfNo=3&cciNo=2&cnpClsNo=3" style={{ color: "#1D9E75", textDecoration: "underline" }}>찾기쉬운 생활법령정보</a>에
        따르면 조건변경 신청서를 한국주택금융공사에 제출하면 돼요.
        매매계약부터 근저당권 설정까지 약 1개월 정도 걸리니 여유 있게 준비하세요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <p style={{ ...body, marginTop: 14 }}>
        이사한 뒤에도 반드시 그 집에 살아야 해요.
        특별한 사유 없이 1년 이상 비우면 <a href="/w/주택연금-거주의무-일시적-부재-허용" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택연금이 중단</a>될 수 있으니 주의하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 한국주택금융공사 기준으로 작성됐어요. 개인 상황에 따라 조건이 다를 수 있으니 공사 콜센터(1688-8114)에서 상담받으세요." />
    </ArticleLayout>
  );
}
