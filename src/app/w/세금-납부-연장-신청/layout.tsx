import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "세금 납부 기한 연장 신청",
  description: "세금 납부 기한 3일 전까지 홈택스에서 신청하면 최대 9개월 유예. 7천만원 이하는 담보 없이 가능. 신청 절차 정리.",
  openGraph: {
    title: "세금 납부 기한 연장 신청",
    description: "홈택스에서 최대 9개월 납부 유예 신청 방법. 7천만원 이하 담보 없이 가능.",
    url: "https://jjyu.co.kr/w/세금-납부-연장-신청",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/세금-납부-연장-신청",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
