import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "튼튼머니 적립시설 찾기 검색 방법 2026",
  description: "튼튼머니 적립 가능 시설 검색 방법. 지정시설 약 4,000여 개 확인.",
  openGraph: {
    title: "튼튼머니 적립시설 찾기 검색 방법 2026",
    description: "튼튼머니 적립 가능 시설 검색 방법. 지정시설 약 4,000여 개 확인.",
    url: "https://jjyu.co.kr/w/ttuntun-facility",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/ttuntun-facility",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
