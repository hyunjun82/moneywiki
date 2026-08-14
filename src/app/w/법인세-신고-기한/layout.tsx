import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "법인세 신고 기한: 연간 신고 횟수와 납부 일정",
  description: "법인세는 1년에 몇 번 내야 하는지 궁금하시죠? 중간예납과 확정신고 일정을 알려드려요",
  openGraph: { title: "법인세 신고 기한: 연간 신고 횟수와 납부 일정", description: "법인세는 1년에 몇 번 내야 하는지 궁금하시죠? 중간예납과 확정신고 일정을 알려드려요", url: "https://jjyu.co.kr/w/법인세-신고-기한" },
  alternates: { canonical: "https://jjyu.co.kr/w/법인세-신고-기한" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
