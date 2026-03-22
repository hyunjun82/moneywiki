import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "중소기업 청년 전세대출, 2026년 소득기준과 금리 우대 | 머니위키",
  description: "2025년부터 청년버팀목으로 통합됐어요. 소득기준 5천만원(부부 7천만원)으로 완화, 중소기업 재직자는 금리 0.4%p 우대로 최저 1%대 가능. 수도권 3억 한도.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/중소기업-청년-전세대출-소득기준",
  },
  openGraph: {
    title: "중소기업 청년 전세대출, 2026년 소득기준과 금리 우대",
    description: "청년버팀목 통합, 소득 5천만원, 중기 재직 금리 0.4%p 우대.",
    url: "https://www.jjyu.co.kr/w/중소기업-청년-전세대출-소득기준",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
