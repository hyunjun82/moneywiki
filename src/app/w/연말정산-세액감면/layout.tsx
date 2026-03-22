import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 세액감면 | 머니위키",
  description: "세액감면은 세액공제보다 유리한 제도예요. 중소기업 청년은 90%, 경력단절여성은 70%까지 세금을 감면받을 수 있어요.",
  openGraph: { title: "연말정산 세액감면", description: "세액감면은 세액공제보다 유리한 제도예요. 중소기업 청년은 90%, 경력단절여성은 70%까지 세금을 감면받을 수 있어요.", url: "https://jjyu.co.kr/w/연말정산-세액감면" },
  alternates: { canonical: "https://jjyu.co.kr/w/연말정산-세액감면" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
