import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 일용직",
  description: "일용직은 연말정산 안 해요. 일당 15만원까지 비과세이고, 초과분만 2.7% 세금 떼면 끝이에요",
  openGraph: { title: "연말정산 일용직 | 머니위키", description: "일용직은 연말정산 안 해요. 일당 15만원까지 비과세이고, 초과분만 2.7% 세금 떼면 끝이에요", url: "https://www.jjyu.co.kr/w/연말정산-일용직", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-일용직" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
