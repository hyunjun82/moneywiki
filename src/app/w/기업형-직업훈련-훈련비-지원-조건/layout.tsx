import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기업형 직업훈련·훈련비 지원·조건",
  description: "기업이 직원 교육할 때 정부가 훈련비를 지원해 줘요. 신기술 분야는 훈련비의 3배까지 받을 수 있어요.",
  openGraph: { title: "기업형 직업훈련·훈련비 지원·조건 | 머니위키", description: "기업이 직원 교육할 때 정부가 훈련비를 지원해 줘요. 신기술 분야는 훈련비의 3배까지 받을 수 있어요.", url: "https://www.jjyu.co.kr/w/기업형-직업훈련-훈련비-지원-조건", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/기업형-직업훈련-훈련비-지원-조건" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
