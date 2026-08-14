import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "자녀장려금 신청 조건 및 지급액: 저소득가구 자녀 1인당 최대 100만원",
  description: "자녀장려금 받을 수 있는지 궁금하시죠. 저소득 가구에 자녀 1인당 최대 100만원을 지급해요",
  openGraph: { title: "자녀장려금 신청 조건 및 지급액: 저소득가구 자녀 1인당 최대 100만원", description: "자녀장려금 받을 수 있는지 궁금하시죠. 저소득 가구에 자녀 1인당 최대 100만원을 지급해요", url: "https://jjyu.co.kr/w/자녀장려금" },
  alternates: { canonical: "https://jjyu.co.kr/w/자녀장려금" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
