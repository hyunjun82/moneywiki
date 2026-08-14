import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "월세 소득 신고: 30일 이내 신고 의무와 미신고 과태료",
  description: "월세 받으면 꼭 신고해야 하는지 궁금하시죠? 30일 이내 신고 안 하면 과태료가 얼마인지 알려드려요",
  openGraph: { title: "월세 소득 신고: 30일 이내 신고 의무와 미신고 과태료", description: "월세 받으면 꼭 신고해야 하는지 궁금하시죠? 30일 이내 신고 안 하면 과태료가 얼마인지 알려드려요", url: "https://jjyu.co.kr/w/월세-소득-신고" },
  alternates: { canonical: "https://jjyu.co.kr/w/월세-소득-신고" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
