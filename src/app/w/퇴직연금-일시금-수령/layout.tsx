import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 일시금 수령, 조건·세금·신청 방법 | 머니위키",
  description: "55세 이상이면 퇴직연금을 일시금으로 받을 수 있어요. 퇴직소득세 5~15%가 빠지고, 연금보다 세금이 더 많아요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-일시금-수령" },
  openGraph: {
    title: "퇴직연금 일시금 수령, 조건·세금·신청 방법 | 머니위키",
    description: "55세 이상이면 퇴직연금을 일시금으로 받을 수 있어요. 퇴직소득세 5~15%가 빠지고, 연금보다 세금이 더 많아요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-일시금-수령",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
