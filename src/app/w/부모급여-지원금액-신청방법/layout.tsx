import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "부모급여 신청·지원금액·어린이집 차액 받기",
  description: "부모급여는 0세 월 100만원, 1세 월 50만원 현금으로 받아요. 출생 60일 이내 신청하면 소급지원되니 복지로나 주민센터에서 바로 신청하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/부모급여-지원금액-신청방법" },
  openGraph: { title: "부모급여 신청·지원금액·어린이집 차액 받기", description: "부모급여는 0세 월 100만원, 1세 월 50만원 현금으로 받아요. 출생 60일 이내 신청하면 소급지원되니 복지로나 주민센터에서 바로 신청하세요", url: "https://www.jjyu.co.kr/w/부모급여-지원금액-신청방법", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
