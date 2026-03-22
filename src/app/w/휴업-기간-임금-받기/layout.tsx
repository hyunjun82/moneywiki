import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "산재로 쉬는 동안 임금은 어떻게 되나? 휴업급여 신청 방법과 지급액 | 머니위키",
  description: "산재 휴업급여는 평균임금의 70%를 지급받아요. 4일 이상 쉬면 대상이고, 청구서를 근로복지공단에 제출하면 14일 이내 입금돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/휴업-기간-임금-받기" },
  openGraph: {
    title: "산재로 쉬는 동안 임금은 어떻게 되나? 휴업급여 신청 방법과 지급액 | 머니위키",
    description: "산재 휴업급여는 평균임금의 70%를 지급받아요. 4일 이상 쉬면 대상이고, 청구서를 근로복지공단에 제출하면 14일 이내 입금돼요.",
    url: "https://www.jjyu.co.kr/w/휴업-기간-임금-받기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
