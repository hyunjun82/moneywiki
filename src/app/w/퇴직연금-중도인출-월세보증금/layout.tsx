import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "월세 보증금, 퇴직연금에서 빼도 되나? 인출 조건부터 세금·신청까지 | 머니위키",
  description: "무주택자 월세·전세 보증금 마련은 법정 사유예요. 기타소득세 없이 퇴직소득세만 내고 인출하는 조건과 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-중도인출-월세보증금" },
  openGraph: {
    title: "월세 보증금, 퇴직연금에서 빼도 되나? 인출 조건부터 세금·신청까지 | 머니위키",
    description: "무주택자 월세·전세 보증금 마련은 법정 사유예요. 기타소득세 없이 퇴직소득세만 내고 인출하는 조건과 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-중도인출-월세보증금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
