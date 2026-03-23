import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경매 말소기준권리 인수되는 권리 구분법 | 머니위키",
  description: "경매 낙찰 후 떠안는 권리와 소멸되는 권리를 구분해요. 말소기준권리 기준으로 선순위는 인수, 후순위는 말소. 유치권·법정지상권은 무조건 인수.",
  openGraph: {
    title: "경매 말소기준권리 인수되는 권리 구분법",
    description: "선순위는 인수, 후순위는 말소. 유치권·법정지상권은 순위 무관 무조건 인수.",
    url: "https://jjyu.co.kr/w/경매-말소기준권리-인수되는-권리",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/경매-말소기준권리-인수되는-권리" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
