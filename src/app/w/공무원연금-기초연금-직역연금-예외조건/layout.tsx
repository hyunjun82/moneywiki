import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "공무원연금 받으면 기초연금 못 받나? 직역연금 예외 조건",
  description: "공무원연금·사학연금·군인연금 수급자도 기초연금을 받을 수 있는 예외 조건을 정리했어요. 재직 기간 10년 미만, 유족연금 등이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/공무원연금-기초연금-직역연금-예외조건" },
  openGraph: {
    title: "공무원연금 받으면 기초연금 못 받나? 직역연금 예외 조건 | 머니위키",
    description: "공무원연금·사학연금·군인연금 수급자도 기초연금을 받을 수 있는 예외 조건을 정리했어요. 재직 기간 10년 미만, 유족연금 등이에요.",
    url: "https://www.jjyu.co.kr/w/공무원연금-기초연금-직역연금-예외조건",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
