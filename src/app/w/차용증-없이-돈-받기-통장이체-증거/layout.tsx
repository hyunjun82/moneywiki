import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "차용증 없이 빌려준 돈 받는 법, 통장이체 증거 활용 | 머니위키",
  description: "차용증 없이 빌려준 돈을 돌려받는 방법. 통장이체 증거력, 추가 증거 확보, 내용증명·지급명령 절차를 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/차용증-없이-돈-받기-통장이체-증거" },
  openGraph: {
    title: "차용증 없이 빌려준 돈 받는 법, 통장이체 증거 활용 | 머니위키",
    description: "차용증 없이 빌려준 돈을 돌려받는 방법과 통장이체 증거 활용법을 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/차용증-없이-돈-받기-통장이체-증거",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
