import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "체크카드 대여 처벌 — 처벌 기준·금융제한·대응 방법 | 머니위키",
  description: "체크카드 빌려주면 전자금융거래법 위반으로 5년 이하 징역이에요. 처벌 기준, 금융거래 제한, 이미 빌려줬을 때 대응법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/체크카드-대여-처벌-대포통장" },
  openGraph: {
    title: "체크카드 대여 처벌 — 처벌 기준·금융제한·대응 방법 | 머니위키",
    description: "체크카드 빌려주면 전자금융거래법 위반으로 5년 이하 징역이에요. 처벌 기준, 금융거래 제한, 이미 빌려줬을 때 대응법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/체크카드-대여-처벌-대포통장",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
