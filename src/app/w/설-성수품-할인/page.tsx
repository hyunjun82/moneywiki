"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 설 차례상 준비하면서 물가 부담을 줄이려고 정부 할인 혜택이 있는지 찾는 소비자
// Q2. 대형마트 앱에서 할인쿠폰을 다운받고, 전통시장에서 온누리상품권을 활용해 최대 50% 절약한다
// Q3. 정부 910억 투입, 16대 성수품 27만톤, 대형마트 30%/온라인 40%/전통시장 50%, 쿠폰 소진 주의
// Q4. GreenBox(핵심 요약) + BorderBox(채널별 할인) + Steps(할인 받는 법) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "대형마트 앱에서 할인쿠폰을 다운받으세요",
    desc: "이마트, 홈플러스, 롯데마트 앱에서 '설 성수품 할인쿠폰'을 검색해서 다운로드하세요. 결제 시 자동 적용돼요. 한도 소진되면 끝이니까 미리 받아두는 게 좋아요.",
  },
  {
    title: "온라인몰에서는 자동 할인을 확인하세요",
    desc: "농협몰, 쿠팡, 배민B마트 등에서 정부 할인 지원 상품에 자동 할인이 적용돼요. '농축산물 할인지원' 배너를 찾으면 돼요. 선착순 마감 품목이 많으니 서두르세요.",
    link: { label: "농축산물 할인지원", href: "https://sale.foodnuri.go.kr/" },
  },
  {
    title: "전통시장은 온누리상품권으로 결제하세요",
    desc: "전통시장에서 온누리상품권을 사용하면 시장 가격에서 추가 30% 환급까지 받아요. 결과적으로 50% 가까이 할인되는 효과예요. 현장 환급 참여 시장은 200곳이에요.",
  },
];

const FAQS = [
  {
    q: "할인쿠폰은 어디서 받나요?",
    a: "대형마트 앱(이마트, 홈플러스, 롯데마트)이나 농협몰, 쿠팡에서 다운받을 수 있어요. 전통시장은 별도 쿠폰 없이 온누리상품권 사용하면 자동 환급돼요.",
  },
  {
    q: "할인 대상 품목이 뭔가요?",
    a: "16대 성수품이에요. 배추, 무, 양파, 대파, 마늘, 건고추, 사과, 배, 한우, 돼지고기, 닭고기, 달걀, 고등어, 갈치, 명태, 오징어예요.",
  },
  {
    q: "할인은 언제까지 하나요?",
    a: "설 연휴 전후 약 2주간이에요. 대형마트는 설 직전 주말(2월 8~9일)이 할인폭이 가장 크고, 온라인은 선착순이라 빨리 소진될 수 있어요.",
  },
  {
    q: "어디서 사는 게 가장 싸나요?",
    a: "전통시장 + 온누리상품권 조합이 최대 50% 할인으로 가장 저렴해요. 대형마트는 최대 30%, 온라인몰은 최대 40% 할인이에요.",
  },
  {
    q: "쿠폰 한도가 소진되면 어떻게 되나요?",
    a: "정부 할인 예산이 소진되면 정가로 구매해야 해요. 인당 주 2만원 한도라서 가족 각자 앱을 깔고 다운받으면 더 많이 받을 수 있어요.",
  },
  {
    q: "온누리상품권은 어디서 사나요?",
    a: "은행, 우체국, 편의점에서 살 수 있어요. 모바일 상품권은 제로페이 앱에서 구매 가능하고요. 10% 할인된 가격에 살 수 있는 기간도 있으니 확인해 보세요.",
  },
];

const SOURCES = [
  { name: "농축산물 할인지원", href: "https://sale.foodnuri.go.kr/" },
  { name: "정책브리핑", href: "https://www.korea.kr/news/policyNewsView.do?newsId=148958705" },
  { name: "기획재정부", href: "https://www.moef.go.kr" },
];

const RELATED = [
  { slug: "설-고속도로-무료", title: "설 고속도로 무료 기간", description: "2월 15~18일 4일간 통행료 면제." },
  { slug: "미환급금-조회-정부24-환급금-찾기", title: "미환급금 조회 방법", description: "정부24에서 숨은 환급금 찾는 법." },
  { slug: "긴급복지-생계지원금-신청-방법", title: "긴급복지 생계지원금", description: "위기 상황 긴급 지원 신청 방법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>생활정보 · 물가 · 설 할인</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026 설 성수품, 최대 50% 할인받는 법<br />
        정부 쿠폰부터 전통시장 환급까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        설 차례상 준비하려면 물가 부담이 크죠.
      </p>
      <p style={body}>
        2026년 설에 정부가 <strong>910억원을 투입</strong>해서 16대 성수품을 최대 <strong>50% 할인</strong> 지원해요.
        대형마트 앱에서 쿠폰 다운받으면 최대 30%, 전통시장에서 온누리상품권 쓰면 최대 50% 효과예요.
        쿠폰 한도가 소진되면 정가 구매라 <strong>미리 다운받아 두는 게 핵심</strong>이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>할인받는 방법, 3단계면 돼요</H2>
      <p style={body}>
        채널마다 할인 방법이 달라요. 대형마트, 온라인, 전통시장 중 상황에 맞게 선택하세요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton label="생활정보" count={5} href="/category/생활정보" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>채널별 할인율을 비교하면</H2>
      <p style={body}>
        같은 품목이라도 어디서 사느냐에 따라 할인율이 달라요.
      </p>

      <SectionBadge>채널별 할인 비교</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0fdf4" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>채널</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>할인 방법</th>
              <th style={{ padding: "10px 12px", textAlign: "center", borderBottom: "2px solid #1D9E75", fontWeight: 700 }}>최대 할인율</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["대형마트", "앱 쿠폰 다운로드", "최대 30%"],
              ["온라인몰", "자동 할인 적용", "최대 40%"],
              ["전통시장", "온누리상품권 + 환급", "최대 50%"],
            ].map(([ch, method, rate], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ padding: "9px 12px" }}>{ch}</td>
                <td style={{ padding: "9px 12px", textAlign: "center" }}>{method}</td>
                <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#1D9E75" }}>{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GreenBox>
        최대 절약 조합{"\n"}
        · 전통시장에서 채소·과일 구입 + 온누리상품권 결제 = 최대 50%{"\n"}
        · 대형마트에서 정육 구입 + 앱 쿠폰 = 최대 30%{"\n"}
        · 온라인 농협몰에서 선물세트 + 자동 할인 = 최대 40%
      </GreenBox>

      <Divider />
      <ArticleAd position="mid" />

      <H2>16대 성수품 할인 대상 품목</H2>
      <p style={body}>
        정부가 27만 톤을 역대 최대로 공급하는 품목들이에요.
      </p>

      <BorderBox>
        <strong>할인 대상 16대 성수품</strong>{"\n"}
        · 채소: 배추, 무, 양파, 대파, 마늘, 건고추{"\n"}
        · 과일: 사과, 배{"\n"}
        · 육류: 한우, 돼지고기, 닭고기, 달걀{"\n"}
        · 수산물: 고등어, 갈치, 명태, 오징어
      </BorderBox>

      <p style={body}>
        명절에 가장 많이 쓰는 품목 위주예요.
        브랜드 한정이나 수량 제한이 있을 수 있으니 매장에서 확인하세요.
        <a href="/w/설-고속도로-무료" style={{ color: "#1D9E75", textDecoration: "underline" }}>설 고속도로 무료</a> 기간에 귀성하면서 중간에 마트 들르는 것도 방법이에요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        설 성수품 할인에서 실제로 많이 궁금해하는 것들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 설 민생안정대책 기준으로 작성했어요. 할인 기간·한도·대상 품목은 정부 발표에 따라 달라질 수 있으니 농축산물 할인지원 사이트에서 최신 정보를 확인해 주세요." />
    </ArticleLayout>
  );
}
