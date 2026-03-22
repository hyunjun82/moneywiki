import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경매 낙찰 후 등기는 어떻게 하나요? 등기 촉탁 절차와 서류 | 머니위키",
  description: "경매 매각대금 납부 후 법원이 등기소에 소유권이전등기를 촉탁해줘요. 필요 서류와 취득세 납부 절차를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/경매-부동산-등기-촉탁-신청-서류",
  },
  openGraph: {
    title: "경매 낙찰 후 등기는 어떻게 하나요? 등기 촉탁 절차와 서류",
    description: "매각대금 납부 → 서류 제출 → 법원 등기 촉탁. 직접 등기소 방문 불필요.",
    url: "https://www.jjyu.co.kr/w/경매-부동산-등기-촉탁-신청-서류",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
