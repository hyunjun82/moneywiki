"use client";

// Q1. 이사를 앞두고 비용이 얼마나 드는지, 포장이사가 좋은지 반포장이 좋은지 가격 감을 잡고 싶어요.
// Q2. 본인 평수·짐 양에 맞는 비용을 파악하고, 최소 3곳 견적을 비교해서 업체를 선정하는 행동.
// Q3. 평수별 평균 가격, 포장/반포장/일반 차이, 비용 영향 요소(시기·층수·거리), 절약 팁, 파손 대응.
// Q4. 표(평수별 가격) + GreenBox(절약 핵심) + Checklist(견적 시 확인) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "포장이사와 반포장이사 차이가 뭔가요?", a: "포장이사는 업체가 포장·운반·정리까지 다 해요. 반포장이사는 포장만 업체가 하고 정리는 본인이 해요. 포장이사가 20~30% 더 비싸요." },
  { q: "이사비용에 부가세가 포함돼 있나요?", a: "업체마다 달라요. 견적받을 때 부가세 포함 여부를 반드시 확인하세요. 부가세 별도면 10%가 추가돼요." },
  { q: "이사 후 물건이 파손됐으면 어떻게 하나요?", a: "당일 바로 확인하고 사진을 찍어두세요. 한국소비자원 기준 3일 이내 신고가 보상에 유리해요." },
  { q: "카드 결제하면 수수료가 붙나요?", a: "허가 업체는 카드 수수료를 받지 않아요. 현금 결제를 강요하는 업체는 피하세요." },
  { q: "사다리차 비용은 별도인가요?", a: "네. 보통 10~20만원이 별도로 들어요. 엘리베이터 사용 가능하면 사다리차 비용을 아낄 수 있어요." },
  { q: "이사 성수기는 언제인가요?", a: "2~4월 봄, 8~9월 가을이 성수기예요. 주말과 월말도 비싸요. 평일·월초·비수기에 이사하면 20~30% 절약 가능해요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "한국소비자원 이사 피해구제", url: "https://www.kca.go.kr" },
    { label: "국토교통부 화물운송주선사업 신고업체", url: "https://www.molit.go.kr" },
  ]},
];

const RELATED = [
  { slug: "포장이사-비용-견적-업체선택", title: "포장이사 비용 견적 비교", description: "포장이사 업체 선정 기준과 견적 비교 방법이에요." },
  { slug: "이사-체크리스트-준비물-절차", title: "이사 체크리스트", description: "이사 전·당일·후에 챙겨야 할 것들을 정리했어요." },
  { slug: "전입신고-방법", title: "전입신고 방법", description: "이사 후 14일 이내에 전입신고하는 절차예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 이사 · 비용</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        이사비용, 평수별로 얼마나 들까?<br />
        포장이사 평균 가격과 절약법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        이사 날짜는 잡았는데 비용이 감이 안 오죠?
        같은 평수여도 업체마다 10~30% 차이가 나요.
        평수별 평균 가격과 비용을 줄이는 방법까지 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>평수별 포장이사 평균 가격</H2>
      <p style={body}>
        2026년 기준, 수도권 포장이사 평균 가격이에요. 지역·업체·시기에 따라 달라질 수 있어요.
      </p>

      <SectionBadge>평수별 가격표</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>평수</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>포장이사</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>반포장이사</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["원룸 (10평 미만)", "30~50만원", "20~30만원"],
              ["투룸 (10~20평)", "50~80만원", "40~60만원"],
              ["아파트 20평대", "70~100만원", "50~80만원"],
              ["아파트 30평대", "100~150만원", "70~100만원"],
              ["아파트 40평 이상", "150~250만원", "100~150만원"],
            ].map(([size, full, half], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{size}</td>
                <td style={{ padding: "9px 12px" }}>{full}</td>
                <td style={{ padding: "9px 12px" }}>{half}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        인건비가 전체 견적의 약 70%를 차지해요. 짐이 많으면 인력 추가로 비용이 올라가고,
        대형 가전·피아노·금고 같은 특수 물품은 별도 요금이에요.
      </p>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>비용에 가장 큰 영향을 주는 요소</H2>
      <p style={body}>
        같은 평수인데 왜 견적이 다른지 알면 협상 포인트가 생겨요.
      </p>

      <BorderBox>
        <strong>비용 영향 5대 요소</strong><br /><br />
        · <strong>짐 양</strong>: 가구·가전 개수, 박스 수량이 핵심이에요. 안 쓰는 물건은 미리 정리하세요<br />
        · <strong>이동 거리</strong>: 기본 10~20km 포함, 초과하면 추가돼요. 장거리면 많이 비싸요<br />
        · <strong>층수</strong>: 엘리베이터 없으면 층당 1~3만원 추가, 사다리차 10~20만원 별도<br />
        · <strong>시기</strong>: 봄(2~4월)·가을(8~9월) 성수기, 주말·월말이 비싸요<br />
        · <strong>특수 물품</strong>: 피아노·금고·수족관은 별도 견적이에요
      </BorderBox>

      <Divider />

      <H2>이사비용 아끼는 방법</H2>
      <p style={body}>
        같은 조건이라도 시기와 준비에 따라 20~30%까지 절약할 수 있어요.
      </p>

      <GreenBox>
        절약 핵심 4가지예요.<br />
        · 최소 <strong>3곳 이상</strong> 견적 비교 (방문 견적이 정확해요)<br />
        · <strong>비수기</strong>(5~7월, 10~12월) + 평일 + 월초에 이사하세요<br />
        · 안 쓰는 물건 정리해서 <strong>짐 줄이기</strong> (박스 수 = 비용)<br />
        · 엘리베이터 확인해서 <strong>사다리차 비용 절약</strong>하세요
      </GreenBox>

      <Divider />

      <H2>견적받을 때 꼭 확인할 것들</H2>
      <p style={body}>
        나중에 추가금이 나오면 억울하잖아요. 계약 전에 미리 확인하세요.
      </p>

      <SectionBadge>확인 체크리스트</SectionBadge>
      <Checklist items={[
        "부가세 포함 여부 (별도면 10% 추가)",
        "추가 비용 항목 (층수·거리·사다리차·특수물품)",
        "파손 시 보상 규정과 보험 가입 여부",
        "카드 결제 가능 여부, 현금영수증 발급",
        "국토교통부 신고 허가 업체인지 확인",
        "이사 당일 파손 확인 → 사진 촬영 → 3일 내 신고",
      ]} />

      <p style={body}>
        이사 당일에는 짐 풀기 전에 파손 여부를 바로 확인하세요. 문제가 있으면 사진 찍고
        <a href="https://www.kca.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}> 한국소비자원</a>에
        3일 이내 신고해야 보상받기 수월해요.
        이사 끝나면 <a href="/w/전입신고-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>전입신고</a>도 바로 하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 수도권 평균 가격이에요. 지역·업체·시기에 따라 실제 비용이 달라질 수 있으니 반드시 여러 업체에 견적을 받아보세요." />
    </ArticleLayout>
  );
}
