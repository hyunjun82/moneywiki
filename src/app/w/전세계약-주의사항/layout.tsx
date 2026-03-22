import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "전세계약 주의사항 및 전세사기 예방 방법 | 머니위키",
  description: "전세사기 안 당하려면 등기부등본 당일 확인 + 시세 70% 이하 + 전세보증보험 이 3가지 필수예요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전세계약-주의사항" },
  openGraph: {
    title: "전세계약 주의사항 및 전세사기 예방 방법",
    description: "전세사기 안 당하려면 등기부등본 당일 확인 + 시세 70% 이하 + 전세보증보험 이 3가지 필수예요.",
    url: "https://www.jjyu.co.kr/w/전세계약-주의사항",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
