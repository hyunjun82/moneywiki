import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "해고 예고 미실시 효력 | 머니위키",
  description: "해고 예고를 안 하고 바로 해고했다면 무효일까요? 예고 의무와 위반 시 효력, 예고수당 청구 방법을 알려드려요.",
  openGraph: { title: "해고 예고 미실시 효력 | 머니위키", description: "해고 예고를 안 하고 바로 해고했다면 무효일까요? 예고 의무와 위반 시 효력, 예고수당 청구 방법을 알려드려요.", url: "https://www.jjyu.co.kr/w/해고-예고-미실시-효력", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/해고-예고-미실시-효력" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
