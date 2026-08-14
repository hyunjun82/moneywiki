import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연금저축 종신연금 세율: 3.3% vs 확정기간형 16.5% 차이",
  description: "종신연금 3.3% vs 확정기간형 16.5%, 세율 차이가 5배라는 거 아시나요? 나이와 수령 방식에 따른 세율 비교 알려드려요",
  openGraph: { title: "연금저축 종신연금 세율: 3.3% vs 확정기간형 16.5% 차이 | 머니위키", description: "종신연금 3.3% vs 확정기간형 16.5%, 세율 차이가 5배라는 거 아시나요? 나이와 수령 방식에 따른 세율 비교 알려드려요", url: "https://www.jjyu.co.kr/w/연금저축-종신연금-세율", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연금저축-종신연금-세율" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
