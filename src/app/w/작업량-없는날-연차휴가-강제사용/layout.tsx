export const dynamic = "force-dynamic";
import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "작업량 없는 날 연차휴가 강제사용 | 머니위키",
  description: "작업량이 없는 날을 회사가 일방적으로 연차휴가로 처리할 수 있나요? 연차휴가 강제 사용의 적법성을 알려드릴게요.",
  openGraph: { title: "작업량 없는 날 연차휴가 강제사용", description: "작업량이 없는 날을 회사가 일방적으로 연차휴가로 처리할 수 있나요? 연차휴가 강제 사용의 적법성을 알려드릴게요.", url: "https://jjyu.co.kr/w/작업량-없는날-연차휴가-강제사용" },
  alternates: { canonical: "https://jjyu.co.kr/w/작업량-없는날-연차휴가-강제사용" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
