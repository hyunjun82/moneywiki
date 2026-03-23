import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "구직급여 미지급 유족 사망 받는 방법 | 머니위키",
  description: "실업급여 받다가 돌아가시면 미지급 구직급여 유족이 받을 수 있어요. 사망 다음 날부터 3년 내 신청하면 근로복지공단에서 지급해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/구직급여-미지급-유족-받기" },
  openGraph: { title: "구직급여 미지급 유족 사망 받는 방법 | 머니위키", description: "실업급여 받다가 돌아가시면 미지급 구직급여 유족이 받을 수 있어요. 사망 다음 날부터 3년 내 신청하면 근로복지공단에서 지급해요.", url: "https://www.jjyu.co.kr/w/구직급여-미지급-유족-받기", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
