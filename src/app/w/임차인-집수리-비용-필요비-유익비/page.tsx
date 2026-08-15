"use client";
// Q1: 세 들어 사는 집에서 보일러·수도 등 수리비를 직접 냈는데 돌려받을 수 있는지 궁금한 세입자
// Q2: 필요비/유익비 구분하고 집주인에게 비용 상환 청구
// Q3: 필요비 vs 유익비 차이, 청구 시점, 6개월 소멸시효, 특약으로 포기 가능한지, 증거 확보법
// Q4: GreenBox(결론 요약) + DocTable(필요비 vs 유익비 비교) + Steps(청구 절차) + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const COMPARE_DOCS = [
  { name: "필요비 (보일러 수리, 누수 보수 등)", required: true, where: "지출 즉시 청구 가능, 집주인 동의 불필요" },
  { name: "유익비 (발코니 확장, 바닥 시공 등)", required: false, where: "임대차 종료 후 청구, 법원이 상환 방법 결정" },
];

const STEPS = [
  {
    title: "수리 전 현황 사진·영상 촬영",
    desc: "고장 상태를 사진과 영상으로 남겨야 해요. 날짜가 찍히는 카메라 앱으로 촬영하면 증거로 쓸 수 있어요.",
    tip: "카카오톡 나에게 보내기로 날짜 기록 남기면 편해요",
  },
  {
    title: "집주인에게 수리 요청 (문자·카카오톡)",
    desc: "집주인에게 먼저 수리를 요청하고, 응답이 없거나 거부하면 직접 수리해도 돼요. 요청 기록을 반드시 남겨야 해요.",
    tip: "전화보다 문자나 카카오톡으로 보내야 증거가 남아요",
  },
  {
    title: "수리 후 영수증·견적서 보관",
    desc: "수리업체 영수증, 자재 구매 영수증, 견적서를 모두 보관해요. 현금 결제했으면 현금영수증이라도 받아두세요.",
  },
  {
    title: "비용 상환 청구서 발송",
    desc: "필요비는 지출 즉시, 유익비는 계약 종료 후 내용증명으로 청구해요. 6개월 안에 청구하지 않으면 소멸시효가 지나요.",
    tip: "내용증명은 우체국에서 발송 가능해요",
  },
];

const CHECKLIST = [
  "수리 전 고장 상태 사진·영상 촬영 완료",
  "집주인에게 수리 요청한 기록 (문자·카카오톡) 보관",
  "수리 영수증·견적서·계좌이체 내역 확보",
  "필요비인지 유익비인지 구분 (필수 수리 vs 가치 증가)",
  "청구 시효 6개월 이내인지 확인",
  "계약서에 수리비 포기 특약이 있는지 확인",
];

const FAQS = [
  { q: "보일러 고장을 제가 수리했는데 집주인에게 돌려받을 수 있나요?", a: "네, 돌려받을 수 있어요. 보일러 수리는 필요비에 해당하고, 민법 제626조에 따라 지출 즉시 청구할 수 있어요. 집주인 동의 없이 고쳤어도 청구 가능해요." },
  { q: "발코니 확장 비용도 청구할 수 있나요?", a: "발코니 확장은 유익비에 해당해요. 임대차가 끝난 뒤 청구 가능하고, 집주인이 지출액 또는 가치 증가액 중 하나를 선택해서 갚아요. 다만 집주인이 동의하지 않았다면 다툼이 생길 수 있어요." },
  { q: "계약서에 수리비 청구 안 된다는 특약이 있으면요?", a: "필요비 포기 특약은 유효해요. 다만 유익비 포기 특약도 일반적으로 유효하다고 봐요. 특약이 있으면 청구가 어려울 수 있으니 계약 전에 꼭 확인하세요." },
  { q: "청구 기한이 6개월인데, 언제부터 6개월인가요?", a: "필요비는 비용을 지출한 날부터, 유익비는 임대차가 종료된 날부터 6개월이에요. 기한이 지나면 소멸시효가 완성돼서 청구할 수 없어요." },
  { q: "집주인이 안 갚으면 어떻게 해요?", a: "내용증명 발송 후에도 안 갚으면 소액사건심판(2,000만원 이하)이나 민사소송으로 청구할 수 있어요. 증거(사진, 영수증, 문자 기록)를 잘 모아두면 유리해요." },
  { q: "월세에서 공제할 수 있나요?", a: "집주인과 합의하면 월세에서 공제할 수 있어요. 하지만 합의 없이 일방적으로 월세를 깎으면 월세 미납이 되니까 반드시 서면 합의를 받아요." },
];

const REFERENCES = [
  { category: "법령", items: [
    { label: "민법 제626조 (임차인의 상환청구권)", url: "https://www.law.go.kr/법령/민법/제626조" },
    { label: "민법 제627조 (유익비 상환청구권)", url: "https://www.law.go.kr/법령/민법/제627조" },
  ]},
  { category: "참고", items: [
    { label: "찾기쉬운 생활법령정보 - 유익비상환청구", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=627&ccfNo=4&cciNo=3&cnpClsNo=1" },
  ]},
];

const RELATED = [
  { slug: "확정일자", title: "확정일자 받는 방법", description: "보증금을 지키려면 확정일자가 필수예요." },
  { slug: "임대차계약서-작성법", title: "임대차계약서 작성법", description: "수리비 특약을 계약서에 넣는 방법이에요." },
  { slug: "소액사건-소장-작성-내용-양식", title: "소액사건 소장 작성법", description: "집주인이 안 갚을 때 소송하는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        세입자가 직접 수리한 비용, 돌려받을 수 있을까?<br />
        필요비·유익비 청구 방법과 기한
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        보일러가 고장 나서 급하게 수리했는데, 이 비용을 집주인한테 받을 수 있는 건지 모르겠다고요?
        민법 제626조에 따라 세입자가 필수적인 수리를 했다면 비용을 돌려받을 수 있어요.
        다만 수리 종류에 따라 필요비와 유익비로 나뉘고, 청구 시점과 방법이 달라요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>필요비와 유익비, 뭐가 다를까?</H2>
      <p style={body}>
        세입자가 지출한 수리비는 크게 두 가지로 나뉘어요. 집을 유지하기 위한 필수 수리는 필요비, 집의 가치를 높이는 공사는 유익비예요.
        구분이 중요한 이유는 청구 시점이 다르기 때문이에요.
      </p>

      <SectionBadge>필요비 vs 유익비 비교</SectionBadge>
      <DocTable docs={COMPARE_DOCS} />

      <GreenBox title="핵심 차이">
        필요비는 보일러·누수·배관 같은 필수 수리 → 지출 즉시 청구 가능.
        유익비는 인테리어·발코니 확장 같은 가치 증가 공사 → 계약 종료 후 청구.
        둘 다 6개월 안에 청구하지 않으면 소멸시효가 지나요.
      </GreenBox>

      <CategoryButton label="부동산·임대차 정보" count={8} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>수리비 돌려받는 절차</H2>
      <p style={body}>
        증거가 핵심이에요. 고장 상태 사진, 수리 요청 기록, 영수증 이 세 가지가 없으면 청구 자체가 어려워요.
        아래 순서대로 준비하면 돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전에 꼭 확인할 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        특약을 확인하지 않고 청구했다가 거절당하는 경우가 많아요. 특히 계약서에 "세입자가 수리비를 부담한다"는 특약이 있으면 필요비도 청구가 안 될 수 있어요.
      </p>

      <SectionBadge>수리비 청구 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 민법 제626조·제627조를 바탕으로 작성됐어요. 구체적인 사안은 법률 상담을 통해 확인해보세요." />
    </ArticleLayout>
  );
}
