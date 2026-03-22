"use client";

// Q1. 지역사랑상품권이 찢어지거나 물에 젖어서 사용 불가인데 바꿀 수 있는지 궁금한 상황
// Q2. 카드형/지류형별 재발급 방법을 파악하고, 필요 서류 챙겨서 발행처 방문
// Q3. 일련번호 확인 가능 여부가 핵심, 카드형은 재발급(3~5일), 지류형은 즉시 교환, 고의 훼손 불가
// Q4. GreenBox(재발급 조건) + BorderBox(카드형 vs 지류형) + Steps(재발급 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const REISSUE_STEPS = [
  {
    title: "훼손된 상품권과 신분증 준비",
    description: "본인 확인 서류(신분증)와 훼손된 상품권을 챙기세요. 구매 영수증이 있으면 더 빨리 처리돼요.",
  },
  {
    title: "발행처 또는 판매대행점 방문",
    description: "구청 민원실, 농협, 우체국 같은 판매처에 가서 '상품권 훼손으로 교환 요청'이라고 말하세요.",
  },
  {
    title: "일련번호 확인 및 사용 이력 조회",
    description: "담당자가 상품권의 일련번호(카드번호)를 확인해서 아직 사용 안 된 건지 조회해요.",
  },
  {
    title: "새 상품권 수령 또는 환불",
    description: "지류형은 현장에서 바로 교환해 줘요. 카드형은 기존 카드 무효화 후 새 카드 발급까지 3~5일 걸려요.",
  },
];

const FAQS = [
  {
    q: "절반만 남은 상품권도 교환 가능한가요?",
    a: "일련번호가 온전히 남아있으면 가능해요. 최종 판단은 발행처에서 하니까 일단 가져가 보세요.",
  },
  {
    q: "물에 젖은 상품권은 어떻게 하나요?",
    a: "잘 말려서 일련번호가 보이면 교환 가능해요. 완전히 지워져서 번호를 알 수 없으면 어려워요.",
  },
  {
    q: "재발급 수수료가 있나요?",
    a: "대부분 무료예요. 고의 훼손이나 반복 신청이면 제한될 수 있어요.",
  },
  {
    q: "분실한 상품권도 재발급 되나요?",
    a: "분실과 훼손은 달라요. 카드형은 즉시 정지 신청하면 잔액 보호가 되는데, 지류형은 분실하면 찾기 어려워요.",
  },
  {
    q: "카드형 상품권이 긁혀서 안 읽히면?",
    a: "마그네틱이나 IC칩 손상으로 단말기에서 인식이 안 되는 것도 훼손이에요. 발행처에서 새 카드로 바꿔줘요.",
  },
  {
    q: "모바일 지역사랑상품권도 훼손되나요?",
    a: "모바일은 물리적 훼손이 없어서 해당 안 돼요. 앱 오류라면 고객센터에 문의하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "지역사랑상품권 이용 활성화에 관한 법률", url: "https://www.law.go.kr/법령/지역사랑상품권이용활성화에관한법률" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "행정안전부: 지역사랑상품권 제도", url: "https://www.mois.go.kr/frt/sub/a06/b07/localVoucher/screen.do" },
    ],
  },
];

const RELATED = [
  { slug: "지역사랑상품권-구매-혜택", title: "지역사랑상품권 구매 혜택", description: "할인 구매와 캐시백 혜택이에요." },
  { slug: "지역사랑상품권-온누리상품권-차이", title: "지역사랑 vs 온누리 상품권 차이", description: "두 상품권의 사용처와 혜택 비교예요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 상품권 · 재발급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        지역사랑상품권이 찢어졌는데 바꿀 수 있을까?<br />
        훼손 재발급 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        지갑에 넣어뒀던 지역사랑상품권이 찢어지거나 물에 젖어서 못 쓰게 됐죠?
        5만 원권인데 버리긴 아깝고, 가게에서 안 받을 것 같고요.
        일련번호가 확인 가능하면 새 상품권으로 바꿀 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>어떤 경우에 재발급이 되나요?</H2>
      <SectionBadge>재발급 조건</SectionBadge>

      <p style={body}>
        <a href="https://www.law.go.kr/법령/지역사랑상품권이용활성화에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>지역사랑상품권법</a>에
        따라 훼손된 상품권은 일련번호가 확인 가능하면 교환이나 재발급을 받을 수 있어요.
      </p>

      <GreenBox title="재발급 가능 여부 판단">
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>가능</strong>: 일련번호(카드번호)가 한쪽이라도 보이는 경우</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>가능</strong>: 절반 이상 남아있고 번호 식별 가능한 경우</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9, fontSize: 13 }}><strong>불가</strong>: 일련번호 완전 훼손, 위조·변조 흔적</p>
        <p style={{ margin: 0, lineHeight: 1.9, fontSize: 13 }}><strong>불가</strong>: 고의 훼손, 이미 사용된 상품권 재사용 시도</p>
      </GreenBox>

      <p style={body}>
        찢어진 경우 양쪽 조각을 모두 가져가면 판단이 쉬워요.
        물에 젖었다면 잘 말려서 번호가 보이도록 만들어 가세요.
      </p>

      <Divider />

      <H2>카드형과 지류형 처리가 다른가요?</H2>

      <p style={body}>
        상품권 형태에 따라 처리 방식과 소요 기간이 달라요.
      </p>

      <BorderBox>
        <p style={{ margin: "0 0 6px", fontWeight: 700 }}>카드형 vs 지류형 처리 비교</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}><strong>카드형</strong>: 기존 카드 무효화 → 새 카드 발급 (3~5일 소요) → 잔액 이전</p>
        <p style={{ margin: "0 0 4px", lineHeight: 1.9 }}><strong>지류형</strong>: 현장 즉시 교환 → 훼손 상품권 회수 → 같은 금액 새 상품권</p>
        <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.9 }}>
          지류형 재고가 없으면 환불로 처리하기도 해요.
        </p>
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>재발급 절차는 어떻게 되나요?</H2>
      <SectionBadge>재발급 절차</SectionBadge>

      <p style={body}>
        <a href="https://www.mois.go.kr/frt/sub/a06/b07/localVoucher/screen.do" style={{ color: "#1D9E75", textDecoration: "underline" }}>행정안전부</a>에서
        안내하는 기본 절차예요. 지자체마다 세부 절차가 약간 다를 수 있어요.
      </p>

      <Steps steps={REISSUE_STEPS} />

      <p style={{ ...body, marginTop: 14 }}>
        카드형은 앱에 등록해 두면 분실 신고도 쉽고 잔액 확인도 편리해요.
        상품권을 많이 쓴다면 카드형이나 모바일을 추천해요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성됐어요. 지자체마다 처리 방식이 다를 수 있으니 해당 지역 구청이나 발행처에 문의하세요." />
    </ArticleLayout>
  );
}
