import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "표준세액공제 13만원 vs 특별공제, 어떤 게 유리할까?",
  description: "표준세액공제는 13만원 고정이에요. 보장성보험 하나만 있어도 12만원인데 의료비·교육비까지 합하면 특별공제가 훨씬 유리해요. 비교 기준과 경정청구 방법까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-표준세액공제",
  },
  openGraph: {
    title: "표준세액공제 13만원 vs 특별공제, 어떤 게 유리할까?",
    description: "보험료만 있어도 특별공제가 유리. 비교 기준과 경정청구까지.",
    url: "https://www.jjyu.co.kr/w/연말정산-표준세액공제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
