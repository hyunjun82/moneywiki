import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "주택 이용 방법 전세 월세 반전세 차이 | 머니위키",
  description: "전세, 월세, 반전세 뭐가 다른지 헷갈리시죠? 각각의 차이점과 장단점을 쉽게 알려드려요.",
  openGraph: { title: "주택 이용 방법 전세 월세 반전세 차이 | 머니위키", description: "전세, 월세, 반전세 뭐가 다른지 헷갈리시죠? 각각의 차이점과 장단점을 쉽게 알려드려요.", url: "https://www.jjyu.co.kr/w/주택-이용-방법-전세-월세-차이", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택-이용-방법-전세-월세-차이" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
