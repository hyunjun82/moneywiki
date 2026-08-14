import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여에 세금이 붙나요? 비과세 여부와 소득 신고",
  description: "실업급여는 비과세 소득이에요. 소득세·건강보험료가 부과되지 않고, 연말정산에도 포함 안 돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-비과세" },
  openGraph: { title: "실업급여에 세금이 붙나요? 비과세 여부와 소득 신고 | 머니위키", description: "실업급여는 비과세 소득이에요. 소득세·건강보험료가 부과되지 않고, 연말정산에도 포함 안 돼요.", url: "https://www.jjyu.co.kr/w/실업급여-비과세", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
