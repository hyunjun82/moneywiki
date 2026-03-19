import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경매정보 조회 사이트 법원경매 | 머니위키",
  description: "대법원 법원경매 공식 사이트와 무료 민간 플랫폼(경매마당, 우리경매, 옥션원) 비교. 초보자 추천과 입찰 시 주의사항.",
  openGraph: {
    title: "경매정보 조회 사이트 법원경매",
    description: "공식 사이트(courtauction.go.kr)와 무료 민간 플랫폼 비교. 입찰은 공식 사이트에서만.",
    url: "https://jjyu.co.kr/w/경매정보-조회-사이트-법원경매",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/경매정보-조회-사이트-법원경매",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
