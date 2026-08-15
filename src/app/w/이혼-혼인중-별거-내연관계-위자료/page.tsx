"use client";
// Q1. 별거 중인 배우자가 다른 사람을 만났는데 위자료를 받을 수 있는지 궁금한 상황이에요.
// Q2. 혼인파탄 시점을 판단하고, 위자료 청구 가능 여부를 확인해서 소송을 준비하는 행동.
// Q3. 단순 별거 ≠ 혼인파탄, 혼인파탄 판단 기준(별거기간·교류·생활비), 위자료 금액 범위, 청구 시효 3년.
// Q4. GreenBox(핵심 결론) + BorderBox(별거기간별 판단) + 표(금액 산정 요소) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "별거 중 배우자가 외도했는데 위자료를 받을 수 있나요?", a: "단순 별거만으로는 혼인파탄으로 보지 않아요. 별거 중에도 연락이나 생활비 지원이 있었다면 혼인 실체가 남아있는 거라 위자료 청구가 가능해요." },
  { q: "5년 넘게 별거했는데 위자료 받을 수 있나요?", a: "장기간 별거로 부부관계가 완전히 파탄됐다면 위자료 청구가 어려워요. 다만 별거 중에도 만남·생활비 지원이 있었다면 여전히 가능할 수 있어요." },
  { q: "졸혼(별거) 중 다른 사람을 만나면 어떻게 되나요?", a: "법적으로는 여전히 혼인 상태라서 정조 의무가 있어요. 졸혼 중 외도하면 유책 배우자가 될 수 있고, 위자료를 지급해야 할 수 있어요." },
  { q: "위자료 청구 시효는 얼마인가요?", a: "이혼 확정일로부터 3년이에요. 이혼 소송 중에 함께 청구하거나, 이혼 후 3년 이내에 별도 소송으로 청구해야 해요." },
  { q: "위자료 금액은 보통 얼마인가요?", a: "혼인파탄 전 외도라면 3천만~5천만원이 일반적이에요. 악질적인 경우 1억원 이상도 인정돼요. 장기 별거로 파탄 인정되면 대폭 감액되거나 기각될 수 있어요." },
  { q: "상간자에게도 위자료를 청구할 수 있나요?", a: "혼인파탄 전이라면 상간자 소송도 가능해요. 다만 부부공동생활이 이미 파탄된 상태였으면 상간자에 대한 청구가 기각될 수 있어요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "찾기쉬운 생활법령정보 - 이혼 위자료", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=233&ccfNo=4&cciNo=1&cnpClsNo=1" },
    { label: "대법원 2024. 10. 25. 판결 (위자료 산정 고려요소)", url: "https://www.scourt.go.kr/portal/news/NewsViewAction.work?seqnum=10123&gubun=4" },
    { label: "민법 (정조 의무, 이혼 사유)", url: "https://www.law.go.kr/법령/민법" },
  ]},
];

const RELATED = [
  { slug: "이혼-사유-별거-2년", title: "이혼 사유 별거 2년", description: "장기 별거로 이혼 사유가 되는 기준이에요." },
  { slug: "이혼-소송-증거-제시-필요", title: "이혼 소송 증거 준비", description: "위자료 청구에 필요한 증거 종류와 효력이에요." },
  { slug: "이혼-소송-진행중-양육비-청구", title: "이혼 중 양육비 청구", description: "이혼 소송 중에도 양육비를 받을 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>가정법률 · 이혼 · 위자료</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        별거 중 배우자 외도, 위자료 받을 수 있나?<br />
        혼인파탄 판단 기준과 금액
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        별거하고 있는데 배우자가 다른 사람을 만나고 있다는 걸 알게 됐어요.
        위자료를 청구할 수 있을까요?
        핵심은 '혼인파탄 시점'이에요. 파탄 전이면 청구 가능, 파탄 후면 어려워요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>단순 별거는 혼인파탄이 아니에요</H2>
      <p style={body}>
        법원은 별거를 시작했다고 바로 혼인관계가 끝났다고 보지 않아요.
        <a href="https://www.law.go.kr/법령/민법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민법</a>상 부부에게는 정조의무가 있고,
        이 의무는 별거 중에도 유지돼요.
      </p>

      <GreenBox>
        핵심 결론이에요.<br />
        · 단순 별거 = 혼인파탄 아님 → <strong>위자료 청구 가능</strong><br />
        · 장기 별거 + 교류 단절 = 파탄 인정 가능 → 위자료 <strong>감액 또는 기각</strong><br />
        · 졸혼 중 외도 = 법적 혼인 상태 → <strong>유책 배우자</strong> 될 수 있음<br />
        · 위자료 청구 시효: 이혼 확정일로부터 <strong>3년</strong>
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>혼인파탄은 어떤 기준으로 판단하나요?</H2>
      <p style={body}>
        법원은 별거 기간만 보는 게 아니라 여러 요소를 종합적으로 판단해요.
        2024년 10월 대법원 판결에서도 혼인파탄 이후 유책행위를 위자료 산정에 고려할 수 있다고 했어요.
      </p>

      <SectionBadge>별거 기간별 판단 경향</SectionBadge>
      <BorderBox>
        <strong>단기 별거 (1년 미만)</strong><br />
        혼인파탄 인정 어려움. 위자료 청구 가능해요.<br /><br />
        <strong>중기 별거 (1~3년)</strong><br />
        별거 중 교류 정도에 따라 달라요. 연락·생활비 지원이 있었으면 파탄 아님. 위자료 일부 감액 가능해요.<br /><br />
        <strong>장기 별거 (3년 이상)</strong><br />
        부부관계 실체 소멸 여부를 엄격히 심사해요. 교류가 전혀 없었으면 파탄 인정 → 위자료 대폭 감액 또는 기각돼요.
      </BorderBox>

      <p style={body}>
        법원이 보는 포인트는 4가지예요. 별거 기간이 얼마나 되는지,
        별거 중 부부 간 연락이나 만남이 있었는지, 생활비·양육비 지원이 있었는지,
        부부관계 회복 노력이 있었는지예요. 이 중 하나라도 해당하면 혼인 실체가 남아있다고 판단해요.
      </p>

      <Divider />

      <H2>위자료 금액은 얼마나 되나요?</H2>
      <p style={body}>
        금액은 외도의 정도, 혼인 기간, 재산 상태, 자녀 유무 등을 종합해서 정해져요.
      </p>

      <SectionBadge>위자료 금액 산정 요소</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>요소</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>금액 증가</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>금액 감소</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["혼인 기간", "10년 이상 장기 혼인", "단기 혼인"],
              ["외도 기간", "장기간 반복적 외도", "일회성"],
              ["자녀 영향", "자녀가 알게 된 경우", "자녀 없음"],
              ["재산 유출", "내연인에게 금전 지원", "금전 지원 없음"],
              ["별거 기간", "단기 별거", "장기 별거(파탄 인정)"],
              ["청구인 과실", "과실 없음", "청구인도 잘못 있음"],
            ].map(([factor, up, down], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{factor}</td>
                <td style={{ padding: "9px 12px", color: "#1D9E75" }}>{up}</td>
                <td style={{ padding: "9px 12px", color: "#ef4444" }}>{down}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        혼인파탄 전 외도라면 3천만~5천만원이 일반적이고, 악질적이면 1억원 이상도 인정돼요.
        반대로 장기 별거로 파탄 인정되면 청구 자체가 기각될 수 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 민법과 대법원 판례를 바탕으로 작성됐어요. 위자료 청구는 개별 사정에 따라 결과가 다를 수 있으니 변호사나 법률구조공단 상담을 받아보세요." />
    </ArticleLayout>
  );
}
