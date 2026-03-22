import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "새벽 음악 소음, 층간소음 기준 넘을까? 데시벨 기준과 신고 절차 | 머니위키",
  description: "야간(22~06시) 공기전달 소음 기준은 1분 등가소음도 38dB, 최고소음도 52dB이에요. 층간소음이웃사이센터에서 무료 상담과 측정을 받을 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/아파트-층간소음-새벽-음악-소음기준",
  },
  openGraph: {
    title: "새벽 음악 소음, 층간소음 기준 넘을까? 데시벨 기준과 신고 절차",
    description: "야간 기준 38dB 초과 시 층간소음. 이웃사이센터 무료 상담·측정 안내.",
    url: "https://www.jjyu.co.kr/w/아파트-층간소음-새벽-음악-소음기준",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
