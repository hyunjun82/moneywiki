import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "국민연금 연기연금 | 머니위키",
  description: "국민연금 늦게 받으면 얼마나 더 받나요? 연기연금 증액률과 신청 방법 정리했어요",
  openGraph: { title: "국민연금 연기연금 | 머니위키", description: "국민연금 늦게 받으면 얼마나 더 받나요? 연기연금 증액률과 신청 방법 정리했어요", url: "https://www.jjyu.co.kr/w/국민연금-연기연금", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/국민연금-연기연금" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
