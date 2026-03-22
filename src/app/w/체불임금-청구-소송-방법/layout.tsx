import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "체불임금 청구·소송 방법·증거 확보하기 | 머니위키",
  description: "임금 못 받았을 때 노동청 진정부터 소송까지 단계별 방법 알려드려요. 3년 소멸시효 전에 증거 확보하고 청구하세요.",
  openGraph: { title: "체불임금 청구·소송 방법·증거 확보하기 | 머니위키", description: "임금 못 받았을 때 노동청 진정부터 소송까지 단계별 방법 알려드려요. 3년 소멸시효 전에 증거 확보하고 청구하세요.", url: "https://www.jjyu.co.kr/w/체불임금-청구-소송-방법", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/체불임금-청구-소송-방법" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
