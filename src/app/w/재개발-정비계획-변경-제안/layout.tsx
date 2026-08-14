import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "재개발 정비계획 변경 제안 주민 가능 여부",
  description: "우리 동네 재개발 진행 중인데 정비계획 바꾸고 싶으시죠? 주민설명회, 공람, 지방의회 의견청취 거쳐서 변경 제안 가능해요.",
  openGraph: { title: "재개발 정비계획 변경 제안 주민 가능 여부", description: "우리 동네 재개발 진행 중인데 정비계획 바꾸고 싶으시죠? 주민설명회, 공람, 지방의회 의견청취 거쳐서 변경 제안 가능해요.", url: "https://jjyu.co.kr/w/재개발-정비계획-변경-제안" },
  alternates: { canonical: "https://jjyu.co.kr/w/재개발-정비계획-변경-제안" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
