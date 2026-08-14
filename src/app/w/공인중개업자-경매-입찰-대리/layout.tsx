import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "부동산 경매 입찰, 중개사가 대리할 수 있나요? 대리 입찰 가능 여부와 주의사항",
  description: "공인중개사는 경매 입찰 대리가 불가해요. 본인 또는 변호사·법무사만 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/공인중개업자-경매-입찰-대리" },
  openGraph: { title: "부동산 경매 입찰, 중개사가 대리할 수 있나요? 대리 입찰 가능 여부와 주의사항 | 머니위키", description: "공인중개사는 경매 입찰 대리가 불가해요. 본인 또는 변호사·법무사만 가능해요.", url: "https://www.jjyu.co.kr/w/공인중개업자-경매-입찰-대리", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
