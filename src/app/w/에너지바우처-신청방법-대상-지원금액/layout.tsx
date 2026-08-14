import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "에너지바우처 신청방법 대상 및 지원금액",
  description: "2026년부터 기초수급 다자녀가구도 에너지바우처 받을 수 있어요. 4인 가구 70만원 지원받는 신청방법 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/에너지바우처-신청방법-대상-지원금액" },
  openGraph: {
    title: "에너지바우처 신청방법 대상 및 지원금액",
    description: "2026년부터 기초수급 다자녀가구도 에너지바우처 받을 수 있어요. 4인 가구 70만원 지원받는 신청방법 알려드려요.",
    url: "https://www.jjyu.co.kr/w/에너지바우처-신청방법-대상-지원금액",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
