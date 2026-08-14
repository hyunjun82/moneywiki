import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "소득세 중간예납 분납 1000만원 초과 2월 2일까지 분할 납부",
  description: "소득세 중간예납이 1,000만원을 넘으면 분납할 수 있어요. 1차는 11월, 2차는 2월 2일까지 내면 돼요.",
  openGraph: { title: "소득세 중간예납 분납 1000만원 초과 2월 2일까지 분할 납부 | 머니위키", description: "소득세 중간예납이 1,000만원을 넘으면 분납할 수 있어요. 1차는 11월, 2차는 2월 2일까지 내면 돼요.", url: "https://www.jjyu.co.kr/w/소득세-중간예납-분납", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/소득세-중간예납-분납" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
