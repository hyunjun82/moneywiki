import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "월세 군입대 중도해지 보증금 반환",
  description: "월세 계약기간 중에 군대 가게 됐어요. 중도해지하고 보증금 돌려받을 수 있는지 알려드려요",
  openGraph: { title: "월세 군입대 중도해지 보증금 반환", description: "월세 계약기간 중에 군대 가게 됐어요. 중도해지하고 보증금 돌려받을 수 있는지 알려드려요", url: "https://jjyu.co.kr/w/월세-군입대-중도해지-보증금-반환" },
  alternates: { canonical: "https://jjyu.co.kr/w/월세-군입대-중도해지-보증금-반환" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
