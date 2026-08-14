import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "보증금 올려줬는데 우선변제권은? 증액분 확정일자 받는 법",
  description: "전세 보증금 증액분은 기존 확정일자로 보호 안 돼요. 증액계약서 작성 후 새 확정일자를 받아야 우선변제권이 생겨요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/우선변제권-보증금-증액" },
  openGraph: {
    title: "보증금 올려줬는데 우선변제권은? 증액분 확정일자 받는 법 | 머니위키",
    description: "전세 보증금 증액분은 기존 확정일자로 보호 안 돼요. 증액계약서 작성 후 새 확정일자를 받아야 우선변제권이 생겨요.",
    url: "https://www.jjyu.co.kr/w/우선변제권-보증금-증액",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
