import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "아파트에서 고양이 키워도 되나요? 사육 규정 정리",
  description: "동물보호법상 반려동물 사육은 금지가 아니에요. 관리규약 사육 금지는 강제력 제한적. 2024년부터 고양이 등록 의무화.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/아파트-반려동물-고양이-사육" },
  openGraph: { title: "아파트 고양이 사육 가능?", description: "법적 금지 아님. 관리규약 확인 필요.", url: "https://www.jjyu.co.kr/w/아파트-반려동물-고양이-사육", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
