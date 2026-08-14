import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금 연계감액, 없어지나? 폐지 논의와 현재 기준",
  description: "기초연금 연계감액 폐지 논의가 어디까지 왔는지, 현재 적용 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-연계감액-폐지논의-현재기준" },
  openGraph: {
    title: "기초연금 연계감액, 없어지나? 폐지 논의와 현재 기준 | 머니위키",
    description: "기초연금 연계감액 폐지 논의가 어디까지 왔는지, 현재 적용 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-연계감액-폐지논의-현재기준",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
