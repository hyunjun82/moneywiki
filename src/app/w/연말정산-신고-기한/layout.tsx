import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 신고 기한은 언제까지인가요? 기한과 놓쳤을 때 대처법 | 머니위키",
  description: "회사는 3월 10일까지 원천세 신고, 개인은 5월 종합소득세로 추가 공제 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-신고-기한" },
  openGraph: { title: "연말정산 신고 기한은 언제까지인가요? 기한과 놓쳤을 때 대처법 | 머니위키", description: "회사는 3월 10일까지 원천세 신고, 개인은 5월 종합소득세로 추가 공제 가능해요.", url: "https://www.jjyu.co.kr/w/연말정산-신고-기한", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
