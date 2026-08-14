import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "등기부 주민등록 주소 다를 때 대항력",
  description: "현관문 호수랑 등기부 호수가 다른데 전세 대항력 인정되는지 걱정되시죠",
  openGraph: { title: "등기부 주민등록 주소 다를 때 대항력 | 머니위키", description: "현관문 호수랑 등기부 호수가 다른데 전세 대항력 인정되는지 걱정되시죠", url: "https://www.jjyu.co.kr/w/등기부-주민등록-주소-다를-때-대항력", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/등기부-주민등록-주소-다를-때-대항력" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
