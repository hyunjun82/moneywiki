import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "가등기된 지분, 본등기로 바꿀 수 있나? 전환 조건과 절차 | 머니위키",
  description: "가등기된 지분도 본등기 전환이 가능해요. 순위는 가등기 시점으로 소급되고 중간 처분은 실효되죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/가등기-지분-본등기-전환" },
  openGraph: {
    title: "가등기된 지분, 본등기로 바꿀 수 있나? 전환 조건과 절차 | 머니위키",
    description: "가등기된 지분도 본등기 전환이 가능해요. 순위는 가등기 시점으로 소급되고 중간 처분은 실효되죠.",
    url: "https://www.jjyu.co.kr/w/가등기-지분-본등기-전환",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
