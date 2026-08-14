import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "보증금 증액 한도 5% 제한 거절 방법",
  description: "보증금 인상은 1년 이내 불가, 1년 후에도 5%까지만 가능. 초과 요구 거절 방법과 초과분 반환 청구.",
  openGraph: { title: "보증금 증액 한도 5% 제한 거절 방법", description: "1년 이내 증액 불가, 5% 상한 규정과 대응법.", url: "https://jjyu.co.kr/w/보증금-증액-한도-5퍼센트-제한" },
  alternates: { canonical: "https://jjyu.co.kr/w/보증금-증액-한도-5퍼센트-제한" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
