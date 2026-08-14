import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "출산휴가·배우자 출산휴가 | 20일 기간·급여 계산·신청 방법 | 머니위키",
  description:
    "배우자 출산휴가는 20일입니다. 출산전후휴가와 무엇이 다른지, 급여는 어떻게 계산하는지, 신청 절차와 기한은 언제까지인지 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/출산휴가-배우자출산휴가" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
