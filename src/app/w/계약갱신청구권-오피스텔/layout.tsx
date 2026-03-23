import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "계약갱신청구권 오피스텔 | 머니위키",
  description: "주거용 오피스텔은 계약갱신청구권 적용돼요. 업무용은 안 돼요",
  openGraph: { title: "계약갱신청구권 오피스텔", description: "주거용 오피스텔은 계약갱신청구권 적용돼요. 업무용은 안 돼요", url: "https://jjyu.co.kr/w/계약갱신청구권-오피스텔" },
  alternates: { canonical: "https://jjyu.co.kr/w/계약갱신청구권-오피스텔" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
