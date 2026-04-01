"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 소액임차인 기준 금액이 얼마인지, 내 보증금이 최우선변제 대상인지 확인하고 싶은 상황이에요.
// Q2. 내 보증금이 소액임차인 기준 이하인지 확인하고, 최우선변제금액이 얼마인지 파악하는 행동.
// Q3. 지역별 소액임차인 보증금 기준(서울 1억6500만원 등), 최우선변제금액, 전월세전환율, 전월세신고 기준.
// Q4. GreenBox(핵심 기준) + BorderBox(지역별 표) + Checklist(확인 항목) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  "내 보증금이 해당 지역 소액임차인 기준 이하인지 확인했나요?",
  "전입신고와 확정일자를 모두 갖추고 있나요?",
  "배당 시점 기준으로 시행령이 적용된다는 걸 알고 있나요?",
  "최우선변제금액이 낙찰가의 1/2을 넘을 수 없다는 점 확인했나요?",
];

const FAQS = [
  { q: "시행령이 법이랑 뭐가 달라요?", a: "법은 국회에서 만들고 큰 틀을 정해요. 시행령은 대통령이 만들어서 구체적인 금액·기준을 정하는 거예요. 시행령이 더 자주 바뀌어요." },
  { q: "내 지역이 과밀억제권역인지 어떻게 알아요?", a: "서울을 제외한 인천, 의정부, 구리, 남양주, 하남, 고양, 수원, 성남, 안양, 부천, 광명, 과천 등이 해당돼요. 확실하지 않으면 주민센터에 문의하세요." },
  { q: "시행령이 바뀌면 기존 계약도 영향받나요?", a: "새 기준은 개정 이후 계약부터 적용되는 게 원칙이에요. 다만 소액임차인 기준은 배당 시점 기준으로 적용되기도 해서, 경매 상황이면 법원에 확인하세요." },
  { q: "전월세전환율 상한이 뭔가요?", a: "보증금을 월세로 바꿀 때 적용하는 최대 이율이에요. 시행령에서 연 10%를 상한으로 정하고 있어서, 이보다 높은 월세를 요구하면 부당해요." },
  { q: "전월세신고 안 하면 어떻게 되나요?", a: "보증금 6천만원 초과 또는 월세 30만원 초과 계약은 신고 의무가 있어요. 미신고 시 과태료 대상이 될 수 있어요." },
  { q: "소액임차인이 여러 명이면 어떻게 되나요?", a: "최우선변제금액을 나눠서 받아요. 전체 합계가 낙찰가의 1/2을 넘으면 비율대로 배분돼요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "주택임대차보호법 시행령 (법제처)", url: "https://www.law.go.kr/법령/주택임대차보호법시행령" },
      { label: "주택임대차보호법 (법제처)", url: "https://www.law.go.kr/법령/주택임대차보호법" },
      { label: "찾기쉬운 생활법령 - 소액보증금 우선변제", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=629&ccfNo=5&cciNo=2&cnpClsNo=2" },
    ],
  },
];

const RELATED = [
  { slug: "소액임차인-최우선변제권", title: "소액임차인 최우선변제권", description: "보증금을 지키는 가장 강력한 방법이에요." },
  { slug: "임대차보호법", title: "주택임대차보호법", description: "전세·월세 세입자의 권리를 보호하는 법의 핵심 내용이에요." },
  { slug: "전세-보증금-반환-방법", title: "전세 보증금 반환 방법", description: "보증금 돌려받는 법적 절차를 안내해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주택임대차보호법 시행령<br />
        소액임차인 기준과 최우선변제금액
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &quot;소액임차인 기준이 서울은 1억6500만원이라는데, 이 숫자가 어디에 나와 있나요?&quot;
        <a href="https://www.law.go.kr/법령/주택임대차보호법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 시행령</a>에 나와 있어요.
        법 본문에는 &quot;소액임차인을 보호한다&quot;라고만 돼 있고, 구체적인 금액 기준은 전부 시행령에 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>소액임차인 보증금 기준 (2026년)</H2>
      <p style={body}>
        <a href="/w/소액임차인-최우선변제권" style={{ color: "#1D9E75", textDecoration: "underline" }}>소액임차인 최우선변제권</a>을 받으려면 보증금이 아래 기준 이하여야 해요.
        시행령 제10조와 제11조에 명시된 금액이에요.
      </p>

      <SectionBadge>지역별 소액임차인 기준</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>지역</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>보증금 기준</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>최우선변제금액</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["서울특별시", "1억6,500만원 이하", "5,500만원"],
              ["수도권 과밀억제권역·세종·용인·화성·김포", "1억4,500만원 이하", "4,800만원"],
              ["광역시(군 제외)·안산·광주·파주·이천·평택", "8,500만원 이하", "2,800만원"],
              ["그 외 지역", "7,500만원 이하", "2,500만원"],
            ].map(([region, limit, amount], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{region}</td>
                <td style={{ padding: "9px 12px" }}>{limit}</td>
                <td style={{ padding: "9px 12px" }}>{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox title="최우선변제 한도">
        소액임차인이라고 무조건 위 금액을 다 받는 건 아니에요.
        <strong>경매 낙찰가의 1/2</strong> 범위 안에서만 받을 수 있어요.
        집이 1억에 낙찰됐으면 최대 5천만원까지가 한도예요.
      </GreenBox>

      <Divider />

      <H2>전월세전환율 상한, 연 10%</H2>
      <p style={body}>
        보증금을 월세로 바꾸거나 반대로 할 때 적용하는 이율이에요.
        시행령에서 연 10%를 상한으로 정하고 있어요.
      </p>

      <BorderBox>
        보증금 1,000만원을 월세로 전환하면<br /><br />
        1,000만원 x 10% / 12개월 = <strong>월 83,333원</strong><br /><br />
        이보다 더 높은 월세를 요구하면 부당한 전환이에요. 한국은행 기준금리에 따라 조정될 수 있어요.
      </BorderBox>

      <Divider />

      <H2>전월세신고 의무, 이런 계약은 신고해야 해요</H2>
      <p style={body}>
        어떤 계약을 신고해야 하는지도 시행령에 나와 있어요.
      </p>

      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>조건</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>신고 의무</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["보증금 6,000만원 초과", "신고 필요"],
              ["월세 30만원 초과", "신고 필요"],
              ["둘 다 이하", "신고 불필요"],
            ].map(([cond, duty], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px" }}>{cond}</td>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{duty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <H2>내 상황 체크해보세요</H2>
      <p style={body}>
        계약 전이나 경매 배당 전에 아래 항목을 확인해보세요.
      </p>

      <Checklist items={CHECK_ITEMS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법 시행령을 바탕으로 작성됐어요. 시행령은 물가·전세가 변동에 따라 개정될 수 있으니, 중요한 계약 전에는 법제처에서 최신 기준을 확인하세요." />
    </ArticleLayout>
  );
}
