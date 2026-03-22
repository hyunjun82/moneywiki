import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주택임대차보호법 시행령, 소액임차인 기준과 최우선변제금액 | 머니위키",
  description: "서울 1억6500만원, 수도권 1억4500만원 등 지역별 소액임차인 보증금 기준과 최우선변제금액을 시행령 기준으로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임대차보호법-시행령" },
  openGraph: {
    title: "주택임대차보호법 시행령, 소액임차인 기준과 최우선변제금액 | 머니위키",
    description: "서울 1억6500만원, 수도권 1억4500만원 등 지역별 소액임차인 보증금 기준과 최우선변제금액을 시행령 기준으로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/임대차보호법-시행령",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
