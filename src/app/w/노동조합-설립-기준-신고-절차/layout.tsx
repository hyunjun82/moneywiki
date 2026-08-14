import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "노동조합 설립·기준·신고 절차",
  description: "근로자들이 함께 권리를 지키기 위해 노동조합을 만들 수 있어요. 설립하는 데 비용도 없고 절차도 간단해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/노동조합-설립-기준-신고-절차" },
  openGraph: { title: "노동조합 설립·기준·신고 절차", description: "근로자들이 함께 권리를 지키기 위해 노동조합을 만들 수 있어요. 설립하는 데 비용도 없고 절차도 간단해요.", url: "https://www.jjyu.co.kr/w/노동조합-설립-기준-신고-절차", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
