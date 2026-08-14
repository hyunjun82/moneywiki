import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경매 낙찰 후 소유권이전, 바로 내 집이 되나? 등기 절차와 주의사항",
  description: "경매 낙찰받았다고 바로 소유권이 넘어오지 않아요. 매각허가결정 확정 후 대금 납부까지 완료해야 법원이 등기를 처리해주죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/경매-낙찰-후-등기-소유권이전" },
  openGraph: {
    title: "경매 낙찰 후 소유권이전, 바로 내 집이 되나? 등기 절차와 주의사항 | 머니위키",
    description: "경매 낙찰받았다고 바로 소유권이 넘어오지 않아요. 매각허가결정 확정 후 대금 납부까지 완료해야 법원이 등기를 처리해주죠.",
    url: "https://www.jjyu.co.kr/w/경매-낙찰-후-등기-소유권이전",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
