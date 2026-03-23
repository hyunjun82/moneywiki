import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "건축물 용도 변경 기준 | 머니위키",
  description: "집을 사무실로 바꾸고 싶은데 신고만 하면 되는지 허가가 필요한지 궁금하시죠",
  openGraph: { title: "건축물 용도 변경 기준", description: "집을 사무실로 바꾸고 싶은데 신고만 하면 되는지 허가가 필요한지 궁금하시죠", url: "https://jjyu.co.kr/w/건축물-용도-변경-기준" },
  alternates: { canonical: "https://jjyu.co.kr/w/건축물-용도-변경-기준" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
