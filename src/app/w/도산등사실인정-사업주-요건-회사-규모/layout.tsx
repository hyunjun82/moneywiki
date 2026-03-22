import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "회사가 폐업했는데 임금을 못 받았다면? 도산등사실인정 요건과 신청법 | 머니위키",
  description: "도산등사실인정은 6개월 이상 사업 + 산재보험 적용 사업장이면 신청 가능해요. 회사 규모 제한 없고, 인정받으면 체불 임금을 정부가 대신 지급해요. 요건과 절차를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/도산등사실인정-사업주-요건-회사-규모",
  },
  openGraph: {
    title: "회사가 폐업했는데 임금을 못 받았다면? 도산등사실인정 요건과 신청법",
    description: "6개월+산재보험 요건, 회사 규모 무관. 도산대지급금 신청까지 정리.",
    url: "https://www.jjyu.co.kr/w/도산등사실인정-사업주-요건-회사-규모",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
