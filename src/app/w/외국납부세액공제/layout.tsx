import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "외국납부세액공제 공제 방식과 한도 계산법",
  description: "해외에서 낸 세금을 국내 소득세에서 공제받는 방법이에요. 세액공제와 필요경비 방식 중 유리한 쪽을 선택할 수 있어요.",
  openGraph: { title: "외국납부세액공제 공제 방식과 한도 계산법 | 머니위키", description: "외국납부세액공제 방법이에요.", url: "https://www.jjyu.co.kr/w/외국납부세액공제", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/외국납부세액공제" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
