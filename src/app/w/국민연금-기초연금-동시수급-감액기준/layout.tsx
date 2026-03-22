import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "국민연금이랑 기초연금 둘 다 받을 수 있을까? 동시 수급과 감액 기준 | 머니위키",
  description: "국민연금을 받아도 기초연금을 받을 수 있어요. 다만 국민연금 수령액에 따라 기초연금이 감액될 수 있는데, 감액 기준과 계산법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/국민연금-기초연금-동시수급-감액기준" },
  openGraph: { title: "국민연금이랑 기초연금 둘 다 받을 수 있을까? 동시 수급과 감액 기준 | 머니위키", description: "국민연금을 받아도 기초연금을 받을 수 있어요. 다만 국민연금 수령액에 따라 기초연금이 감액될 수 있는데, 감액 기준과 계산법을 정리했어요.", url: "https://www.jjyu.co.kr/w/국민연금-기초연금-동시수급-감액기준", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
