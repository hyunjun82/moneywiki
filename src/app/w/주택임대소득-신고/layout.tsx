import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "주택임대소득 신고 방법 분리과세 종합과세 선택 기준 | 머니위키",
  description: "주택임대소득 2,000만원 이하면 분리과세 14% 선택 가능해요. 홈택스에서 예상세액 비교하고 유리한 쪽으로 신고하면 돼요.",
  openGraph: { title: "주택임대소득 신고 방법 분리과세 종합과세 선택 기준 | 머니위키", description: "주택임대소득 2,000만원 이하면 분리과세 14% 선택 가능해요. 홈택스에서 예상세액 비교하고 유리한 쪽으로 신고하면 돼요.", url: "https://www.jjyu.co.kr/w/주택임대소득-신고", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택임대소득-신고" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
