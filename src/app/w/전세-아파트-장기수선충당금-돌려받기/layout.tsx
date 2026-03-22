import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전세 장기수선충당금 돌려받기 — 관리비 환급 방법 | 머니위키",
  description: "장기수선충당금은 집주인이 내야 하는 돈이에요. 전세 살면서 대신 냈다면 이사할 때 관리사무소 납부확인서로 돌려받을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전세-아파트-장기수선충당금-돌려받기" },
  openGraph: {
    title: "전세 장기수선충당금 돌려받기 — 관리비 환급 방법 | 머니위키",
    description: "장기수선충당금은 집주인이 내야 하는 돈이에요. 전세 살면서 대신 냈다면 이사할 때 관리사무소 납부확인서로 돌려받을 수 있어요.",
    url: "https://www.jjyu.co.kr/w/전세-아파트-장기수선충당금-돌려받기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
