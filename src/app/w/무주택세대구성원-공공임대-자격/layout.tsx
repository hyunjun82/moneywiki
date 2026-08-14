import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "무주택세대구성원 공공임대 자격 기준",
  description: "공공임대 신청할 때 나오는 무주택세대구성원이 뭔지 헷갈리시죠? 세대원 전원이 집 없어야 해요.",
  openGraph: { title: "무주택세대구성원 공공임대 자격 기준", description: "공공임대 신청할 때 나오는 무주택세대구성원이 뭔지 헷갈리시죠? 세대원 전원이 집 없어야 해요.", url: "https://jjyu.co.kr/w/무주택세대구성원-공공임대-자격" },
  alternates: { canonical: "https://jjyu.co.kr/w/무주택세대구성원-공공임대-자격" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
