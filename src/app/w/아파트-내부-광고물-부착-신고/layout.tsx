import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "아파트 내부 광고물 부착 신고 규정 관리사무소 | 머니위키",
  description: "아파트 내부 광고물은 구청 신고 불필요, 관리사무소 동의 필수. 외부 광고물은 옥외광고물법 적용. 무단 부착 시 과태료.",
  openGraph: { title: "아파트 내부 광고물 부착 신고 규정", description: "내부는 관리사무소 동의, 외부는 구청 신고 필요.", url: "https://jjyu.co.kr/w/아파트-내부-광고물-부착-신고" },
  alternates: { canonical: "https://jjyu.co.kr/w/아파트-내부-광고물-부착-신고" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
