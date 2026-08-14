import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "증축·대수선 허가, 어떤 서류가 필요한가요? 신청 절차부터 무허가 벌금까지",
  description: "증축·대수선 허가 신청 시 허가신청서, 등기부등본, 설계도서 등 필수 서류 목록과 구청 신청 절차를 정리했어요. 무허가 공사 시 도시지역 기준 5억원 이하 벌금이에요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/건축-증축-대수선-허가-신청-서류",
  },
  openGraph: {
    title: "증축·대수선 허가, 어떤 서류가 필요한가요? 신청 절차부터 무허가 벌금까지",
    description: "허가신청서, 설계도서, 등기부등본 등 필수 서류 목록과 신청 4단계 절차.",
    url: "https://www.jjyu.co.kr/w/건축-증축-대수선-허가-신청-서류",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
