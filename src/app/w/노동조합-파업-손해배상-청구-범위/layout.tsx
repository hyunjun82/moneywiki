import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "파업하면 회사가 손해배상을 청구할 수 있나요? 적법 파업과 불법 파업의 차이",
  description: "적법한 파업은 손해배상 면책이에요. 불법 파업(폭력·점거)만 손해배상 대상이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/노동조합-파업-손해배상-청구-범위" },
  openGraph: { title: "파업하면 회사가 손해배상을 청구할 수 있나요? 적법 파업과 불법 파업의 차이 | 머니위키", description: "적법한 파업은 손해배상 면책이에요. 불법 파업(폭력·점거)만 손해배상 대상이에요.", url: "https://www.jjyu.co.kr/w/노동조합-파업-손해배상-청구-범위", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
