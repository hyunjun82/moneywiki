import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "전월세상한제 5% 인상 한도 총정리 | 머니위키",
  description: "계약 갱신할 때 보증금 5%까지만 올릴 수 있어요. 집주인이 더 올리겠다고 하면 거부하세요",
  openGraph: { title: "전월세상한제 5% 인상 한도 총정리", description: "계약 갱신할 때 보증금 5%까지만 올릴 수 있어요. 집주인이 더 올리겠다고 하면 거부하세요", url: "https://jjyu.co.kr/w/전월세상한제" },
  alternates: { canonical: "https://jjyu.co.kr/w/전월세상한제" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
