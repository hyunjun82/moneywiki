import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "입주자대표회의 구성 선거 절차 어떻게 되나요",
  description: "입주자대표회의는 어떻게 구성되나요? 동별로 대표자 뽑고 전체 입주자 10분의 1 이상 투표하면 선출돼요. 임기는 2년이에요.",
  openGraph: { title: "입주자대표회의 구성 선거 절차 어떻게 되나요", description: "입주자대표회의는 어떻게 구성되나요? 동별로 대표자 뽑고 전체 입주자 10분의 1 이상 투표하면 선출돼요. 임기는 2년이에요.", url: "https://jjyu.co.kr/w/입주자대표회의-구성-선거-절차" },
  alternates: { canonical: "https://jjyu.co.kr/w/입주자대표회의-구성-선거-절차" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
