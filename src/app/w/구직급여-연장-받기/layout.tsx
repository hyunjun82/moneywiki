import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 다 받았는데, 연장할 수 있나요? 구직급여 연장 조건과 신청",
  description: "개별연장·훈련연장·특별연장 3가지 방법으로 구직급여를 최대 60일 더 받을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/구직급여-연장-받기" },
  openGraph: { title: "실업급여 다 받았는데, 연장할 수 있나요? 구직급여 연장 조건과 신청 | 머니위키", description: "개별연장·훈련연장·특별연장 3가지 방법으로 구직급여를 최대 60일 더 받을 수 있어요.", url: "https://www.jjyu.co.kr/w/구직급여-연장-받기", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
