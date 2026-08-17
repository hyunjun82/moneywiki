import type { Metadata } from "next";
import ToolView from "@/components/lotto/ToolView";

/**
 * /lotto/tool — 로또 번호 추출기 (시안 lotto-main.html 의 tool 화면)
 */

const TITLE = "로또 번호 추출기 — 6/45 번호 뽑기";
const DESC =
  "버튼 한 번으로 1~45 중 중복 없는 6개 번호와 보너스 번호를 뽑습니다. 뽑은 번호는 복사·공유할 수 있고 최근 추첨 기록도 함께 남습니다. 무료이며 회원가입이 필요 없습니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "로또 번호 추출기",
    "로또 번호 뽑기",
    "로또 번호 생성기",
    "로또 번호 추천",
    "로또 랜덤 번호",
    "로또 6/45 추첨",
  ],
  alternates: { canonical: "/lotto/tool" },
  openGraph: {
    type: "website",
    url: "/lotto/tool",
    title: TITLE,
    description: DESC,
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "로또 번호 추천",
      item: "https://www.jjyu.co.kr/lotto",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "로또 번호 추출기",
      item: "https://www.jjyu.co.kr/lotto/tool",
    },
  ],
};

const howTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "로또 번호 추출기로 번호 뽑는 방법",
  description: DESC,
  totalTime: "PT10S",
  inLanguage: "ko-KR",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "번호 추첨하기 누르기",
      text: "추첨기 아래 '번호 추첨하기' 버튼을 누르면 공이 하나씩 나옵니다.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "6개 번호와 보너스 확인",
      text: "1~45 중 중복 없는 6개 번호가 나온 뒤 마지막에 보너스 번호가 붙습니다.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "복사하거나 공유하기",
      text: "마음에 들면 복사·공유 버튼으로 번호를 옮기고, 아니면 다시 추첨합니다.",
    },
  ],
};

export default function LottoToolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }}
      />
      <ToolView />
    </>
  );
}
