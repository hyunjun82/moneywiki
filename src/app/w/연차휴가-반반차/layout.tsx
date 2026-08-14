import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연차휴가 반반차, 2시간만 쓸 수 있나? 법적 근거와 도입 방법",
  description: "반반차는 법정 제도가 아니라 회사 취업규칙으로 도입해야 해요. 시간단위 연차와 차이, 급여 계산, 도입 절차까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연차휴가-반반차" },
  openGraph: {
    title: "연차휴가 반반차, 2시간만 쓸 수 있나? 법적 근거와 도입 방법 | 머니위키",
    description: "반반차는 법정 제도가 아니라 회사 취업규칙으로 도입해야 해요. 시간단위 연차와 차이, 급여 계산, 도입 절차까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연차휴가-반반차",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
