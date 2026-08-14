import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "대출 조기 상환, 수수료 안 내려면? 중도상환 수수료 면제 조건과 계산법",
  description: "변동금리 대출은 3년 경과 후 중도상환 수수료가 면제돼요. 고정금리는 고정기간 종료 후 적용되고, 정책자금·전세·신용대출은 대부분 수수료 없어요. 최대 1.5% 한도.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/중도상환-수수료-면제",
  },
  openGraph: {
    title: "대출 조기 상환, 수수료 안 내려면? 중도상환 수수료 면제 조건과 계산법",
    description: "변동금리 3년 면제, 고정금리 기간 종료 후 면제. 계산법과 절약 방법.",
    url: "https://www.jjyu.co.kr/w/중도상환-수수료-면제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
