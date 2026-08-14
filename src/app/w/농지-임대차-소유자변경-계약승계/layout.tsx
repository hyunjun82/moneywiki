import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "농지 임대차 소유자 변경 계약 승계",
  description: "농사짓던 땅 주인이 바뀌었다고요? 임대차계약이 어떻게 되는지, 계속 농사지을 수 있는지 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/농지-임대차-소유자변경-계약승계" },
  openGraph: { title: "농지 임대차 소유자 변경 계약 승계", description: "농사짓던 땅 주인이 바뀌었다고요? 임대차계약이 어떻게 되는지, 계속 농사지을 수 있는지 알려드려요.", url: "https://www.jjyu.co.kr/w/농지-임대차-소유자변경-계약승계", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
