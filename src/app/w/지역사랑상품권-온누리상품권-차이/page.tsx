"use client";

// Q1. 상품권을 사려는데 지역사랑이랑 온누리가 뭐가 다른지 모르겠고, 어떤 걸 사야 이득인지 궁금한 상황이에요.
// Q2. 본인 소비 패턴에 맞는 상품권을 골라서 할인받고 구매하는 행동.
// Q3. 발행주체 차이, 사용처(동네 vs 전통시장), 2026년 할인율, 구매한도, 소득공제 혜택 비교.
// Q4. 비교표(핵심 차이) + GreenBox(결론) + BorderBox(구매 방법) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "지역사랑상품권으로 전통시장에서 쓸 수 있나요?", a: "전통시장이 지역사랑 가맹점으로 등록돼 있으면 가능해요. 대부분의 전통시장 상인은 가입돼 있어요." },
  { q: "온누리상품권 소득공제율이 얼마예요?", a: "전통시장 사용분으로 40% 소득공제를 받을 수 있어요. 신용카드(15%)보다 훨씬 높아요." },
  { q: "두 상품권 다 사도 되나요?", a: "네, 각각 별도 한도라 둘 다 구매할 수 있어요. 할인 혜택도 각각 받을 수 있어요." },
  { q: "지역사랑상품권 할인율은 전국 같나요?", a: "아니요, 지자체마다 달라요. 보통 5~10%인데, 재정 상황에 따라 할인을 안 하는 곳도 있어요." },
  { q: "온누리상품권은 어디서 사나요?", a: "농협·우체국 창구, 온누리상품권 앱, 제로페이 앱에서 구매할 수 있어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "온누리상품권 공식 사이트", url: "https://onnurigift.or.kr/" },
    { label: "지역사랑상품권 이용 활성화에 관한 법률", url: "https://www.law.go.kr/법령/지역사랑상품권이용활성화에관한법률" },
    { label: "중소벤처기업부 전통시장 정책", url: "https://www.mss.go.kr" },
  ] },
];

const RELATED = [
  { slug: "연말정산-신혼부부", title: "연말정산 신혼부부 절세 전략", description: "전통시장 소득공제 40%를 활용하면 절세 효과가 커요." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산·세율·납부", description: "부동산 취득 시 세금 계산법을 정리했어요." },
  { slug: "부가세-환급-신청", title: "부가세 환급 신청 방법", description: "사업자라면 부가세 환급도 챙기세요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 상품권 · 절약</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        지역사랑상품권 vs 온누리상품권<br />
        할인율·사용처·소득공제 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        둘 다 할인받아서 사는 상품권인데, 어디서 쓰느냐에 따라 완전히 달라요.
        동네 가게를 자주 가면 지역사랑, 전통시장을 즐기면 온누리가 맞아요.
        2026년 기준 할인율과 한도까지 비교해볼게요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>핵심 차이, 한눈에 비교해볼게요</H2>
      <p style={body}>
        발행 주체부터 사용처, 할인율까지 전부 달라요. 아래 표에서 바로 확인하세요.
      </p>

      <SectionBadge>2026년 기준 비교표</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>구분</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>지역사랑상품권</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>온누리상품권</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["발행 주체", "시·군·구 지자체", "중소벤처기업부"],
              ["사용처", "해당 지역 소상공인 가맹점", "전국 전통시장·상점가"],
              ["할인율", "5~10% (지자체마다 상이)", "명절 10%, 평시 7%"],
              ["구매 한도", "월 50~70만원 (지자체별)", "월 100만원"],
              ["소득공제", "30% (지역화폐)", "40% (전통시장)"],
              ["형태", "앱 충전·카드형", "종이·카드형·모바일"],
              ["대형마트 사용", "불가", "불가"],
            ].map(([label, local, onnuri], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600, color: "#333" }}>{label}</td>
                <td style={{ padding: "9px 12px" }}>{local}</td>
                <td style={{ padding: "9px 12px" }}>{onnuri}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>어떤 상품권을 사야 이득일까?</H2>
      <p style={body}>
        소비 패턴에 따라 달라요. 동네 편의점이나 카페를 자주 가면 지역사랑이 맞아요.
        전통시장에서 장을 보는 편이면 온누리가 소득공제 혜택도 크고 할인율도 높아요.
      </p>

      <GreenBox>
        선택 기준 정리예요.<br />
        · 동네 가게·편의점·카페 → <strong>지역사랑상품권</strong><br />
        · 전통시장·재래시장 → <strong>온누리상품권</strong> (소득공제 40%)<br />
        · 둘 다 자주 간다면 → 각각 구매해서 혜택을 나눠 받으세요
      </GreenBox>

      <Divider />

      <H2>구매 방법이 궁금하다면</H2>
      <p style={body}>
        지역사랑상품권은 각 지자체 앱에서 바로 충전해요. 서울은 '서울페이+', 경기도는 '경기지역화폐' 앱이에요.
        온누리상품권은 구매 경로가 여러 개예요.
      </p>

      <BorderBox>
        <strong>온누리상품권 구매처</strong><br /><br />
        · 종이형: 농협·우체국 창구<br />
        · 카드형: 농협·우체국에서 전용카드 발급 후 충전<br />
        · 모바일형: 온누리상품권 앱, 제로페이 앱<br /><br />
        2026년 기준 개인 구매한도는 월 100만원, 보유한도는 200만원이에요.
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 중소벤처기업부·각 지자체 자료를 바탕으로 작성했어요. 할인율과 구매한도는 정책 변경 시 달라질 수 있어요." />
    </ArticleLayout>
  );
}
