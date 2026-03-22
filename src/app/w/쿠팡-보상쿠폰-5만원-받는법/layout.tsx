import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "쿠팡 보상쿠폰 5만원 받는법과 0원 상품 구매 꿀팁 | 머니위키",
  description: "쿠팡 개인정보 유출 보상으로 5만원 쿠폰 받았는데 어떻게 쓰는지 모르겠죠? 0원으로 생수, 라면 공짜로 받는 방법 알려드려요.",
  openGraph: { title: "쿠팡 보상쿠폰 5만원 받는법과 0원 상품 구매 꿀팁", description: "쿠팡 개인정보 유출 보상으로 5만원 쿠폰 받았는데 어떻게 쓰는지 모르겠죠? 0원으로 생수, 라면 공짜로 받는 방법 알려드려요.", url: "https://jjyu.co.kr/w/쿠팡-보상쿠폰-5만원-받는법" },
  alternates: { canonical: "https://jjyu.co.kr/w/쿠팡-보상쿠폰-5만원-받는법" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
