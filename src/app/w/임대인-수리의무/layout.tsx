import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "집 고장났는데, 집주인이 고쳐줘야 하나요? 임대인 수리의무",
  description: "보일러·누수·배관 등 대수선은 임대인 책임이에요. 형광등·수도꼭지 등 소수선은 임차인 부담. 수리의무 범위와 대응법 정리.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임대인-수리의무" },
  openGraph: { title: "임대인 수리의무 범위", description: "대수선=집주인, 소수선=세입자. 안 고쳐주면 비용청구 가능.", url: "https://www.jjyu.co.kr/w/임대인-수리의무", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
