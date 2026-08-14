import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 고향사랑기부금",
  description: "10만원 기부하면 전액 세액공제 + 3만원 답례품으로 오히려 3만원 이득이에요. 2025년부터 한도가 2천만원으로 4배 늘었어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-고향사랑기부금" },
  openGraph: {
    title: "연말정산 고향사랑기부금",
    description: "10만원 기부하면 전액 세액공제 + 3만원 답례품으로 오히려 3만원 이득이에요. 2025년부터 한도가 2천만원으로 4배 늘었어요",
    url: "https://www.jjyu.co.kr/w/연말정산-고향사랑기부금",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
