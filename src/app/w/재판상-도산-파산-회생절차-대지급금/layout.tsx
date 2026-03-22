import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "회사가 파산·회생했는데 밀린 임금은? 재판상 도산 대지급금 신청 방법 | 머니위키",
  description: "회사 파산이나 회생절차 시 도산대지급금으로 체불 임금을 받을 수 있어요. 파산 vs 회생 차이, 신청 기한 2년, 근로복지공단 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/재판상-도산-파산-회생절차-대지급금" },
  openGraph: {
    title: "회사가 파산·회생했는데 밀린 임금은? 재판상 도산 대지급금 신청 방법 | 머니위키",
    description: "회사 파산이나 회생절차 시 도산대지급금으로 체불 임금을 받을 수 있어요. 파산 vs 회생 차이, 신청 기한 2년, 근로복지공단 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/재판상-도산-파산-회생절차-대지급금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
