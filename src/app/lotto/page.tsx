import type { Metadata } from "next";
import HomeView from "@/components/lotto/HomeView";

/**
 * /lotto — 로또 번호 추천 (시안 lotto-main.html)
 *
 * 제목·설명은 실제 연관검색어를 반영한다:
 *   로또 번호 추천 · 로또 번호 뽑기 · 로또 번호 추출기 · 로또 번호 생성기
 */

const TITLE = "로또 번호 추천 — 뽑기·추출기로 6/45 번호 생성";
const DESC =
  "로또 번호를 무료로 추천해 드립니다. 1~45번 공이 도는 3D 추첨기에서 중복 없는 6개 번호와 보너스 번호를 뽑고, 지난주 당첨 번호와 몇 개 맞는지 바로 확인하세요. 회원가입 없이 3초면 됩니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "로또 번호 추천",
    "로또 번호 뽑기",
    "로또 번호 추출기",
    "로또 번호 생성기",
    "로또 번호",
    "로또 6/45",
    "행운번호 추천",
  ],
  alternates: { canonical: "/lotto" },
  openGraph: {
    type: "website",
    url: "/lotto",
    title: TITLE,
    description: DESC,
  },
};

const webApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "로또 번호 추천 추출기",
  url: "https://www.jjyu.co.kr/lotto",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  description: DESC,
  inLanguage: "ko-KR",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  featureList: [
    "1~45 중복 없는 6개 번호 추첨",
    "보너스 번호 추첨",
    "지난주 당첨 번호 일치 개수 확인",
    "번호 복사·공유",
    "최근 추첨 기록 보관",
  ],
};

const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "로또 번호 추천은 어떻게 뽑나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "추첨기 버튼을 누르면 1부터 45까지 중에서 중복 없이 6개 번호와 보너스 번호 1개를 무작위로 뽑습니다. 회원가입이나 설치 없이 바로 사용할 수 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "추천받은 번호가 당첨될 확률이 높나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "아닙니다. 번호는 매번 무작위로 생성되며 당첨을 보장하지 않습니다. 1등 당첨 확률은 814만분의 1로, 어떤 방식으로 번호를 고르든 확률은 같습니다.",
      },
    },
    {
      "@type": "Question",
      name: "뽑은 번호를 저장할 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "최근 추첨 기록이 화면에 남고, 번호 복사와 공유 버튼으로 다른 곳에 옮길 수 있습니다. 기록은 브라우저를 새로고침하면 사라집니다.",
      },
    },
    {
      "@type": "Question",
      name: "로또는 누구나 구매할 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "만 19세 이상만 구매할 수 있습니다. 이 페이지는 번호를 추천할 뿐이며 복권을 판매하지 않습니다.",
      },
    },
  ],
};

export default function LottoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <HomeView />
    </>
  );
}
