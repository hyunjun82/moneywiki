"use client";
// Q1. 지역사랑상품권 가맹점을 운영하는데 등록이 취소될 수 있다는 걸 듣고 어떤 행위가 문제인지 미리 알고 싶은 상황이에요.
// Q2. 등록 취소 사유 4가지를 파악하고, 위반하지 않도록 가맹점 의무를 지키는 행동.
// Q3. 취소 사유(허위등록, 현금전환, 의무위반, 영업중단), 절차(시정명령→취소), 재등록 제한(1년), 처벌(형사처벌 가능).
// Q4. GreenBox(취소 사유 요약) + BorderBox(절차·사후처리) + Checklist(예방 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  "상품권을 현금으로 전환해주는 행위를 하지 않고 있나요?",
  "상품권 결제를 거부하거나 현금 고객보다 불리하게 대우하지 않나요?",
  "사업자등록 정보(상호, 주소, 업종)가 등록 내용과 일치하나요?",
  "장기 휴업 시 지자체에 미리 신고했나요?",
  "등록 제한업종(유흥, 사행 등)에 해당하지 않나요?",
];

const FAQS = [
  { q: "실수로 상품권을 현금으로 바꿔줬는데 바로 취소되나요?", a: "한두 번 실수는 경고 조치로 끝날 수 있어요. 하지만 반복되거나 고의적이면 등록 취소 사유가 돼요. 수수료를 받고 현금을 주는 건 절대 안 돼요." },
  { q: "등록 취소되면 미정산 금액은 어떻게 되나요?", a: "이미 결제된 상품권에 대한 정산금은 받을 수 있어요. 새로운 상품권 결제만 중단되는 거예요." },
  { q: "취소 후 재등록은 언제 할 수 있나요?", a: "등록 취소일로부터 1년간 재등록이 제한돼요. 둘 이상의 위반 사유가 있었으면 제한 기간이 1년이에요." },
  { q: "이의신청은 어떻게 하나요?", a: "취소 통지를 받은 날로부터 30일 이내에 해당 지자체에 이의신청할 수 있어요. 정당한 사유가 인정되면 취소가 철회될 수도 있어요." },
  { q: "영업을 잠시 쉬면 자동으로 취소되나요?", a: "일시적 휴업은 미리 신고하면 유예돼요. 다만 장기간 영업을 안 하거나 폐업하면 직권으로 취소될 수 있어요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "지역사랑상품권 이용 활성화에 관한 법률 (법제처)", url: "https://www.law.go.kr/법령/지역사랑상품권이용활성화에관한법률" },
      { label: "찾기쉬운 생활법령 - 가맹점 등록 및 취소", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1816&ccfNo=3&cciNo=1&cnpClsNo=1" },
      { label: "행정안전부 지역사랑상품권", url: "https://www.mois.go.kr/frt/sub/a06/b07/localVoucher/screen.do" },
    ],
  },
];

const RELATED = [
  { slug: "지역사랑상품권-훼손-재발급", title: "지역사랑상품권 훼손 재발급", description: "상품권이 찢어지거나 분실됐을 때 재발급 받는 방법이에요." },
  { slug: "소상공인-지원금-신청", title: "소상공인 지원금 신청", description: "소상공인이 받을 수 있는 정부 지원금을 안내해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 지역상품권</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        지역사랑상품권 가맹점, 왜 취소될까?<br />
        등록 취소 사유와 예방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        동네 가게를 운영하면서 지역사랑상품권 가맹점으로 등록하셨죠?
        그런데 특정 행위를 하면 등록이 강제 취소될 수 있어요.
        <a href="https://www.law.go.kr/법령/지역사랑상품권이용활성화에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>지역사랑상품권법</a>에서 정한 취소 사유를 미리 알아두면 불이익을 피할 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>등록 취소 사유 4가지</H2>
      <p style={body}>
        지자체장은 가맹점이 아래 사유에 해당하면 등록을 취소할 수 있어요. 특히 첫 번째는 의무 취소라서 재량의 여지가 없어요.
      </p>

      <GreenBox title="등록 취소 사유">
        <strong>1. 거짓·부정한 방법으로 등록</strong> (의무 취소)<br />
        폐업한 사업장으로 등록하거나 타인 명의를 빌린 경우예요. 적발되면 반드시 취소돼요.<br /><br />
        <strong>2. 상품권을 현금으로 전환</strong><br />
        가장 흔한 취소 사유예요. 물건을 팔지 않고 수수료를 받고 현금을 돌려주는 행위는 법 위반이고, 형사처벌까지 받을 수 있어요.<br /><br />
        <strong>3. 가맹점 의무 반복 위반</strong><br />
        상품권 결제를 거부하거나 상품권 사용 고객에게 불이익을 주는 행위를 반복하면 취소 대상이에요.<br /><br />
        <strong>4. 등록 제한업종 영위 또는 영업 중단</strong><br />
        유흥·사행 업종은 애초에 등록이 안 되고, 장기간 영업을 안 하면 직권 취소될 수 있어요.
      </GreenBox>

      <Divider />

      <H2>취소 절차와 사후 처리</H2>
      <p style={body}>
        등록 취소는 바로 이루어지지 않아요. 위반 사실이 확인되면 먼저 시정 명령이 나오고, 기한 내 개선하지 않으면 취소가 진행돼요.
      </p>

      <BorderBox>
        취소 절차 흐름이에요.<br /><br />
        · 위반 사실 확인 → <strong>시정 명령</strong> → 기한 내 미개선 → <strong>취소 결정</strong> → 서면 통지<br />
        · 이의신청: 통지일로부터 <strong>30일 이내</strong><br />
        · 재등록 제한: 취소일로부터 <strong>1년</strong><br />
        · 미정산 금액: 이미 결제된 건은 정산 가능<br />
        · 거짓 등록은 시정 명령 없이 <strong>즉시 취소</strong>
      </BorderBox>

      <Divider />

      <H2>취소 안 당하려면 이것만 지키세요</H2>
      <p style={body}>
        대부분의 취소 사유는 미리 알고 있으면 충분히 예방할 수 있어요.
      </p>

      <Checklist items={CHECK_ITEMS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 지역사랑상품권 이용 활성화에 관한 법률과 생활법령정보를 바탕으로 작성됐어요. 지자체별 운영 기준이 다를 수 있으니, 해당 지자체에 확인하세요." />
    </ArticleLayout>
  );
}
