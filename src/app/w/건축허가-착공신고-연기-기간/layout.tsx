import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "건축허가 착공신고 연기 가능 기간 | 머니위키",
  description: "건축허가 받았는데 당장 공사 시작이 어려워요. 착공신고를 얼마나 연기할 수 있나요? 1년까지 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/건축허가-착공신고-연기-기간" },
  openGraph: { title: "건축허가 착공신고 연기 가능 기간", description: "건축허가 받았는데 당장 공사 시작이 어려워요. 착공신고를 얼마나 연기할 수 있나요? 1년까지 가능해요.", url: "https://www.jjyu.co.kr/w/건축허가-착공신고-연기-기간", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
