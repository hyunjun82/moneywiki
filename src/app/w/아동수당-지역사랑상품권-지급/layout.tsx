import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "아동수당이 상품권으로 나오나요? 지역사랑상품권 지급 기준",
  description: "일부 지자체에서 아동수당을 지역사랑상품권으로 지급해요. 지역별 차이와 확인 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/아동수당-지역사랑상품권-지급" },
  openGraph: { title: "아동수당이 상품권으로 나오나요? 지역사랑상품권 지급 기준 | 머니위키", description: "일부 지자체에서 아동수당을 지역사랑상품권으로 지급해요. 지역별 차이와 확인 방법을 정리했어요.", url: "https://www.jjyu.co.kr/w/아동수당-지역사랑상품권-지급", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
