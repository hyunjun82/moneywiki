import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "경매 권리분석 저당권 임차권 인수 여부 | 머니위키",
  description: "경매 권리분석 했더니 저당권 1순위, 임차권 2순위예요. 이 권리들이 매수인에게 인수되는지 알려드릴게요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/경매-권리분석-저당권-임차권-인수" },
  openGraph: { title: "경매 권리분석 저당권 임차권 인수 여부 | 머니위키", description: "경매 권리분석 했더니 저당권 1순위, 임차권 2순위예요. 이 권리들이 매수인에게 인수되는지 알려드릴게요.", url: "https://www.jjyu.co.kr/w/경매-권리분석-저당권-임차권-인수", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
