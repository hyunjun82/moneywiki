"use client";

// Q1. 서울사랑상품권을 갖고 있는데 다른 지역(경기도 등)에서도 쓸 수 있는지 궁금한 상황
// Q2. 서울 안에서만 쓸 수 있다는 걸 확인하고, 다른 지역 방문 시 해당 지역 상품권을 구매한다
// Q3. 사용 가능 지역(서울 전역), 사용 불가 지역(경기도·인천 등), 제외 업종(대형마트·백화점), 가맹점 확인법
// Q4. GreenBox 핵심 요약 + BorderBox 제외 업종 + Checklist 사용 팁

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const USAGE_TIPS = [
  "서울페이플러스 앱에서 주변 가맹점 검색",
  "가맹점 스티커가 부착된 매장에서 QR 결제",
  "대형마트·백화점·SSM·온라인 쇼핑몰은 사용 불가",
  "경기도 방문 시 해당 시·군 상품권을 별도 구매",
  "온누리상품권은 전국 전통시장에서 사용 가능 (별도 상품권)",
  "잔액은 1천원 이상이면 환불 가능 (발행기관 문의)",
];

const FAQS = [
  { q: "서울사랑상품권 경기도에서 쓸 수 있나요?", a: "안 돼요. 서울시 내 가맹점에서만 사용 가능해요. 경기도는 해당 시·군에서 발행한 상품권(고양페이, 성남사랑상품권 등)을 써야 해요." },
  { q: "광역형이면 어디서든 되는 거 아닌가요?", a: "광역형은 서울 25개 구 전부에서 된다는 뜻이에요. 구 경계는 넘나들 수 있지만, 서울시 밖으로는 안 돼요." },
  { q: "구별 상품권과 광역 상품권 차이가 뭔가요?", a: "구별 상품권은 해당 자치구 내에서만, 광역 상품권은 서울 전역에서 쓸 수 있어요. 구별 상품권은 할인율이 더 높은 경우가 많아요." },
  { q: "편의점에서도 쓸 수 있나요?", a: "편의점이 가맹점으로 등록돼 있으면 가능해요. 서울페이플러스 앱에서 미리 확인하세요." },
  { q: "인천이나 부산에서도 서울 상품권이 되나요?", a: "안 돼요. 인천은 인천e음, 부산은 부산동백전 등 해당 지역 상품권을 이용해야 해요." },
  { q: "전국에서 쓸 수 있는 상품권이 있나요?", a: "온누리상품권은 전국 전통시장에서 사용 가능해요. 지역사랑상품권과 목적이 달라서, 전통시장 한정이지만 지역 제한은 없어요." },
];

const SOURCES = [
  { name: "지역사랑상품권 이용 활성화에 관한 법률", href: "https://www.law.go.kr/법령/지역사랑상품권이용활성화에관한법률" },
  { name: "서울사랑상품권 공식", href: "https://www.seoulpaygift.com" },
  { name: "서울페이플러스 가맹점 현황", href: "https://data.seoul.go.kr/dataList/OA-21099/F/1/datasetView.do" },
];

const RELATED = [
  { slug: "예금자보호제도", title: "예금자보호제도", description: "5천만원까지 예금이 보호되는 기준." },
  { slug: "CMA계좌-금리-혜택", title: "CMA 계좌 금리 혜택", description: "파킹 통장으로 이자 받는 법." },
  { slug: "ETF-투자-초보자", title: "ETF 투자 초보자 가이드", description: "ETF가 뭔지 기초부터 알려줘요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 상품권 · 서울사랑상품권</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        서울사랑상품권 어디서 쓸 수 있나?<br />
        사용지역과 제외 업종 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        서울사랑상품권 들고 경기도 가게에 갔더니 "안 돼요"라는 말 들은 적 있으시죠?
      </p>
      <p style={body}>
        서울사랑상품권은 서울시 내 가맹점에서만 쓸 수 있어요. 광역형이라고 해서 전국이 되는 게 아니라, 서울 25개 구 전역에서 된다는 뜻이에요. <a href="https://www.law.go.kr/법령/지역사랑상품권이용활성화에관한법률" style={{ color: "#1D9E75", textDecoration: "underline" }}>지역사랑상품권법</a>에 따라 발행 지자체 관할 구역에서만 사용 가능하도록 돼 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>사용 가능 지역, 딱 여기까지예요</H2>
      <p style={body}>
        사용 범위를 한눈에 정리했어요.
      </p>

      <GreenBox>
        사용 가능: 서울특별시 25개 구 전역 (강남·강북·서초·종로 등 구 제한 없음){"\n"}
        사용 불가: 경기도, 인천, 부산 등 서울 외 모든 지역{"\n"}
        제외 업종: 대형마트, 백화점, SSM(기업형 슈퍼), 온라인 쇼핑몰{"\n"}
        결제 방식: 서울페이플러스 앱으로 QR 결제
      </GreenBox>

      <p style={body}>
        28만여 개 가맹점이 등록돼 있어요. 동네 식당, 카페, 미용실, 편의점, 학원, 약국 등 생활 밀착형 매장에서 폭넓게 쓸 수 있어요. <a href="https://www.seoulpaygift.com" style={{ color: "#1D9E75", textDecoration: "underline" }}>서울페이플러스 앱</a>에서 주변 가맹점을 미리 검색하면 편해요.
      </p>

      <CategoryButton label="금융" count={12} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>왜 다른 지역에서 안 되는 건가요?</H2>
      <p style={body}>
        행정구역이 다르기 때문이에요.
      </p>

      <BorderBox>
        서울시와 경기도는 별개의 광역자치단체예요. 각 지자체가 조례를 만들어서 자기 지역 상품권을 발행하는 구조예요.{"\n"}
        경기도 가맹점은 경기도에서 발행한 상품권(고양페이, 수원페이 등)만 받아요.{"\n"}
        다른 지역에 자주 간다면 그 지역 상품권을 따로 사는 게 방법이에요.{"\n"}
        해당 지역 주민이 아니어도 대부분 구매 가능해요.
      </BorderBox>

      <Divider />

      <H2>사용할 때 이것만 기억하세요</H2>
      <p style={body}>
        알아두면 편리한 사용 팁이에요.
      </p>

      <SectionBadge>사용 팁</SectionBadge>
      <Checklist items={USAGE_TIPS} />

      <Divider />

      <H2>서울사랑상품권, 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        사용 지역 관련 질문만 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준으로 작성했어요. 가맹점 현황과 할인율은 수시로 변경되니 서울페이플러스 앱에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
