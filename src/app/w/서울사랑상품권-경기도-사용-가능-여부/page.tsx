"use client";

// Q1. 서울사랑상품권을 경기도에서 쓰려고 했는데 안 됐거나, 쓸 수 있는지 미리 확인하고 싶은 상황이에요.
// Q2. 지역사랑상품권은 발행 지자체 내에서만 쓸 수 있다는 걸 이해하고, 경기도에서는 경기지역화폐를 사용하는 행동.
// Q3. 서울사랑상품권은 서울만 가능, 경기도는 시·군별 별도, 광역시는 전체 사용, 할인 구매 방법.
// Q4. GreenBox(결론) + 표(지역별 상품권 정리) + BorderBox(할인 구매 팁) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "서울사랑상품권을 경기도 가맹점에서 결제하면 어떻게 되나요?",
    a: "결제가 거부돼요. 가맹점 단말기에서 서울시 이외 지역은 결제 처리가 안 되게 돼 있어요.",
  },
  {
    q: "서울에 살면서 경기도에서 일하면 어떤 상품권을 사야 하나요?",
    a: "주로 소비하는 지역의 상품권을 사는 게 유리해요. 경기도에서 자주 쓴다면 해당 시·군의 지역화폐를 구매하면 돼요.",
  },
  {
    q: "부산·인천 같은 광역시도 구별로 나뉘나요?",
    a: "아니에요. 부산, 대구, 인천, 광주, 대전, 울산 등 광역시는 대부분 전체 지역에서 사용할 수 있어요. 서울도 마찬가지예요.",
  },
  {
    q: "지역사랑상품권 할인 구매는 어떻게 하나요?",
    a: "발행 시기에 앱이나 은행에서 5~10% 할인된 가격으로 살 수 있어요. 설·추석 특별 판매 때는 할인율이 더 높아지기도 해요.",
  },
  {
    q: "온라인 쇼핑몰에서도 지역사랑상품권을 쓸 수 있나요?",
    a: "일반 온라인 쇼핑몰에서는 안 돼요. 해당 지역 오프라인 가맹점과 지역 배달앱 등 일부 플랫폼에서만 사용 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "지역사랑상품권 이용 활성화에 관한 법률", url: "https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=273427" },
      { label: "내고장알리미 — 지역사랑상품권 조회", url: "https://www.laiis.go.kr/lips/mlo/lcl/localGiftList.do" },
    ],
  },
];

const RELATED = [
  { slug: "신용카드-이용자", title: "신용카드 이용자 필수 상식", description: "카드 결제 관련 기본 지식을 정리해요." },
  { slug: "연말정산-신용카드-공제", title: "연말정산 신용카드 공제 한도", description: "지역사랑상품권도 소득공제 대상이에요. 공제율과 한도를 정리해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>생활 · 상품권 · 지역화폐</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        서울사랑상품권, 경기도에서 쓸 수 있을까?<br />
        지역사랑상품권 사용 범위 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        서울사랑상품권을 들고 경기도 가게에서 결제하려니 안 되셨죠?
        같은 수도권인데 왜 안 되는지 궁금하실 거예요.
        지역사랑상품권은 법에 따라 발행한 지자체 안에서만 쓸 수 있어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>서울사랑상품권은 서울에서만 돼요</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=273427" style={{ color: "#1D9E75", textDecoration: "underline" }}>지역사랑상품권 이용 활성화에 관한 법률</a>에 따르면
        지역사랑상품권은 발행한 지방자치단체장이 관할하는 행정구역 내 가맹점에서만 사용할 수 있어요.
        서울시장이 발행한 서울사랑상품권은 서울시 안에서만, 고양시장이 발행한 고양페이는 고양시 안에서만 써야 해요.
      </p>

      <GreenBox>
        핵심 결론이에요.<br />
        · 서울사랑상품권 → <strong>서울시 내</strong> 가맹점에서만 사용 가능<br />
        · 경기도에서는 → 해당 <strong>시·군별 지역화폐</strong>를 따로 구매해야 함<br />
        · 부산·인천 등 광역시 → <strong>전체 지역</strong>에서 사용 가능
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>경기도는 시·군별로 따로 있어요</H2>
      <p style={body}>
        서울이나 부산 같은 광역시는 전체가 하나의 상품권 구역이에요.
        하지만 경기도는 31개 시·군이 각각 별도의 지역화폐를 발행해요. 수원이면 수원페이, 성남이면 성남페이를 써야 해요.
      </p>

      <SectionBadge>수도권 주요 지역 상품권</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>지역</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>상품권 이름</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>사용 범위</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["서울시", "서울사랑상품권", "서울시 전체"],
              ["인천시", "인천e음", "인천시 전체"],
              ["수원시", "수원페이", "수원시 내"],
              ["성남시", "성남페이", "성남시 내"],
              ["고양시", "고양페이", "고양시 내"],
              ["용인시", "용인페이", "용인시 내"],
            ].map(([region, name, scope], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{region}</td>
                <td style={{ padding: "9px 12px" }}>{name}</td>
                <td style={{ padding: "9px 12px", color: "#555" }}>{scope}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>할인 구매하면 더 이득이에요</H2>
      <p style={body}>
        지역사랑상품권의 가장 큰 장점은 할인 구매예요.
        발행 시기에 5~10% 할인된 가격으로 살 수 있고, 설·추석 특별 판매 때는 할인율이 더 높아지기도 해요.
      </p>

      <BorderBox>
        할인 구매 팁이에요.<br /><br />
        · 발행 일정은 <a href="https://www.laiis.go.kr/lips/mlo/lcl/localGiftList.do" style={{ color: "#1D9E75", textDecoration: "underline" }}>내고장알리미</a>에서 확인<br />
        · 앱(제로페이, 지역화폐 앱) 또는 농협·신한 은행 앱에서 구매<br />
        · 월 구매 한도가 있으니 미리 확인 (보통 월 50~100만원)<br />
        · 연말정산 소득공제 30% 적용 (신용카드 15%보다 높음)
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 지역사랑상품권법과 내고장알리미 자료를 바탕으로 작성됐어요. 지역별 상품권 이름·할인율·구매 한도는 지자체 정책에 따라 달라질 수 있어요." />
    </ArticleLayout>
  );
}
