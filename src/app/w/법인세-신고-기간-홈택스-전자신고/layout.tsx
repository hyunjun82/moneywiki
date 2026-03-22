import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "법인세 신고, 언제까지 어떻게? 홈택스 전자신고 절차 | 머니위키",
  description: "12월 결산법인은 3월 31일까지 법인세를 신고해야 해요. 홈택스 전자신고로 세액공제 혜택도 받을 수 있죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/법인세-신고-기간-홈택스-전자신고" },
  openGraph: {
    title: "법인세 신고, 언제까지 어떻게? 홈택스 전자신고 절차 | 머니위키",
    description: "12월 결산법인은 3월 31일까지 법인세를 신고해야 해요. 홈택스 전자신고로 세액공제 혜택도 받을 수 있죠.",
    url: "https://www.jjyu.co.kr/w/법인세-신고-기간-홈택스-전자신고",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
