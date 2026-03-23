export const dynamic = "force-dynamic";
import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "임차권등기명령 신청 절차와 필요 서류 | 머니위키",
  description: "보증금 못 받고 이사해야 할 때 임차권등기명령을 신청하면 대항력이 유지돼요. 신청 절차와 비용을 정리했어요.",
  openGraph: { title: "임차권등기명령 신청 절차와 필요 서류 | 머니위키", description: "임차권등기명령 신청 방법이에요.", url: "https://www.jjyu.co.kr/w/임차권등기명령-신청", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/임차권등기명령-신청" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
