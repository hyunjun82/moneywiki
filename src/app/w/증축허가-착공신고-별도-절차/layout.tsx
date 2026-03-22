import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "증축허가 후 착공신고 별도 제출 여부 | 머니위키",
  description: "증축허가 받았으면 바로 공사 시작해도 되나요? 착공신고를 별도로 해야 하는지 알아볼게요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/증축허가-착공신고-별도-절차" },
  openGraph: { title: "증축허가 후 착공신고 별도 제출 여부", description: "증축허가 받았으면 바로 공사 시작해도 되나요? 착공신고를 별도로 해야 하는지 알아볼게요.", url: "https://www.jjyu.co.kr/w/증축허가-착공신고-별도-절차", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
