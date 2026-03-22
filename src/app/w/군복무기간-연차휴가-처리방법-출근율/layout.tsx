import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "군복무기간 연차휴가 처리방법 출근율 | 머니위키",
  description: "군복무기간은 연차휴가 계산에 어떻게 반영되나요? 군대 다녀온 후 연차휴가 처리 방법을 알려드릴게요.",
  openGraph: { title: "군복무기간 연차휴가 처리방법 출근율", description: "군복무기간은 연차휴가 계산에 어떻게 반영되나요? 군대 다녀온 후 연차휴가 처리 방법을 알려드릴게요.", url: "https://jjyu.co.kr/w/군복무기간-연차휴가-처리방법-출근율" },
  alternates: { canonical: "https://jjyu.co.kr/w/군복무기간-연차휴가-처리방법-출근율" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
