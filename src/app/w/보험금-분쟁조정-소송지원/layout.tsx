import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "보험금 분쟁조정 후 소송지원 제도 | 머니위키",
  description: "금융감독원 분쟁조정이 부당한데 소송하고 싶으신가요? 금융소비자 소송지원 제도를 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/보험금-분쟁조정-소송지원" },
  openGraph: {
    title: "보험금 분쟁조정 후 소송지원 제도",
    description: "금융감독원 분쟁조정이 부당한데 소송하고 싶으신가요? 금융소비자 소송지원 제도를 알려드려요.",
    url: "https://www.jjyu.co.kr/w/보험금-분쟁조정-소송지원",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
