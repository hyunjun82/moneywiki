"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. K패스 쓰고 있는데 모두의 카드는 뭔지, 혜택이 더 좋은지, 별도 발급이 필요한지 궁금한 상황이에요.
// Q2. 모두의 카드 환급 기준을 이해하고, 본인 해당 여부를 확인해서 K패스 앱에서 등록/확인하는 행동.
// Q3. 기준금액 초과분 100% 환급, 대상별 기준금액 차이, 기존 K패스 자동 적용, 발급 카드사.
// Q4. GreenBox(핵심 혜택) + 표(대상별 기준금액) + Steps(신규 발급 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const STEPS = [
  { title: "K패스 앱 설치", desc: "구글 플레이스토어나 앱스토어에서 'K패스' 앱을 설치해요." },
  { title: "카드사 선택 및 발급 신청", desc: "앱에서 원하는 카드사를 선택하고 K패스 교통카드 발급을 신청해요. 신한, KB, 우리, 하나, 삼성, 현대, 롯데 등 주요 카드사에서 가능해요.", tip: "기존 K패스 카드가 있으면 이 단계 불필요" },
  { title: "카드 수령 후 K패스 등록", desc: "카드를 받으면 K패스 앱에서 카드를 등록해요. 교통카드 기능을 활성화하면 돼요." },
  { title: "대중교통 이용 시작", desc: "등록한 카드로 버스·지하철을 이용하면 자동으로 이용금액이 누적되고, 다음 달에 환급돼요." },
];

const FAQS = [
  {
    q: "기존 K패스 카드 있으면 모두의 카드 새로 발급받아야 하나요?",
    a: "아니에요. 기존 K패스 사용자는 별도 발급 없이 모두의 카드 혜택이 자동 적용돼요.",
  },
  {
    q: "환급은 언제 되나요?",
    a: "다음 달에 환급돼요. K패스 시스템에서 한 달 이용금액을 합산해서 가장 유리한 방식으로 자동 적용해요.",
  },
  {
    q: "택시도 환급 대상인가요?",
    a: "아니에요. 버스와 지하철(도시철도) 이용분만 환급 대상이에요. 택시, KTX 등은 포함되지 않아요.",
  },
  {
    q: "기존 K패스 20~53% 환급이랑 뭐가 다른가요?",
    a: "기존 K패스는 이용금액의 20~53%를 비율로 환급했어요. 모두의 카드는 기준금액 초과분을 100% 돌려주는 거라 대중교통을 많이 탈수록 유리해요.",
  },
  {
    q: "수도권이랑 비수도권 기준금액이 다른가요?",
    a: "동일해요. 거주 지역이 아니라 대상 유형(일반, 청년, 저소득층)에 따라 기준금액이 달라요.",
  },
  {
    q: "체크카드로도 발급되나요?",
    a: "네. 신용카드와 체크카드 모두 발급 가능해요. 체크카드로 발급받으면 소득공제 혜택도 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국토교통부 모두의 카드 안내", url: "https://www.molit.go.kr" },
      { label: "K패스 공식 사이트", url: "https://www.k-pass.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산-대중교통-공제", title: "연말정산 대중교통 공제", description: "대중교통 이용분 소득공제율과 공제 한도를 정리해요." },
  { slug: "연말정산-대중교통-신용카드", title: "대중교통 신용카드 공제", description: "신용카드·체크카드별 대중교통 공제율 차이예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>생활 · 교통 · 환급</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        모두의 카드, K패스랑 뭐가 다를까?<br />
        발급 방법과 환급 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        K패스 쓰고 계신데 모두의 카드는 또 뭔지 궁금하셨죠?
        2026년 1월부터 시행된 모두의 카드는 K패스의 확장판이에요.
        기준금액을 넘는 교통비를 100% 돌려줘요. 기존 K패스 카드가 있으면 자동 적용돼요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>기준금액 넘으면 초과분 100% 환급</H2>
      <p style={body}>
        모두의 카드는 월 대중교통 이용금액이 기준금액을 넘으면, 초과분 전액을 돌려주는 제도예요.
        기존 K패스의 20~53% 비율 환급보다 혜택이 훨씬 커졌어요.
      </p>

      <GreenBox>
        핵심 혜택이에요.<br />
        · 기준금액 <strong>초과분 100%</strong> 환급 (K패스 비율 환급과 중 유리한 쪽 자동 적용)<br />
        · 기존 K패스 카드 <strong>자동 적용</strong> (별도 발급 불필요)<br />
        · 대중교통(버스·지하철) 이용분만 해당
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>대상별 기준금액이 달라요</H2>
      <p style={body}>
        나이, 소득, 가구 조건에 따라 기준금액이 달라져요.
        기준금액이 낮을수록 환급받기 쉬워요.
      </p>

      <SectionBadge>대상별 기준금액</SectionBadge>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0faf6" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>대상</th>
              <th style={{ padding: "10px 12px", textAlign: "right", borderBottom: "2px solid #1D9E75" }}>월 기준금액</th>
              <th style={{ padding: "10px 12px", textAlign: "left", borderBottom: "2px solid #1D9E75" }}>기존 K패스 환급률</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["일반 (만 35세 이상)", "5.5만원", "20%"],
              ["청년 (만 19~34세)", "5.0만원", "30%"],
              ["어르신 (만 65세 이상)", "5.0만원", "53%"],
              ["저소득층", "4.0만원", "53%"],
              ["2자녀 가구", "5.0만원", "30%"],
              ["3자녀 이상 가구", "4.0만원", "53%"],
            ].map(([target, amount, rate], i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "9px 12px", fontWeight: 600 }}>{target}</td>
                <td style={{ padding: "9px 12px", textAlign: "right" }}>{amount}</td>
                <td style={{ padding: "9px 12px", color: "#555" }}>{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={body}>
        기존 K패스 비율 환급과 모두의 카드 초과분 100% 환급 중 유리한 쪽이 자동 적용돼요.
        대중교통을 적게 타는 달은 K패스 비율이 유리하고, 많이 타는 달은 모두의 카드가 유리해요.
      </p>

      <Divider />

      <H2>신규 발급은 이렇게 해요</H2>
      <p style={body}>
        이미 K패스 카드가 있으면 별도 발급이 필요 없어요.
        처음 발급받는 분만 아래 절차를 따르면 돼요.
      </p>

      <SectionBadge>K패스 신규 발급 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 국토교통부 자료를 바탕으로 작성됐어요. 환급 기준금액과 대상 범위는 정책 변경에 따라 달라질 수 있어요." />
    </ArticleLayout>
  );
}
