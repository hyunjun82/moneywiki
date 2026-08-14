import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금 받던 분이 돌아가셨다면? 미지급분 청구와 기한",
  description: "기초연금 수급자가 사망하면 유족이 미지급 연금을 청구할 수 있어요. 청구 기한은 5년이고, 필요한 서류와 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-사망-미지급분-청구-기한" },
  openGraph: { title: "기초연금 받던 분이 돌아가셨다면? 미지급분 청구와 기한 | 머니위키", description: "기초연금 수급자가 사망하면 유족이 미지급 연금을 청구할 수 있어요. 청구 기한은 5년이고, 필요한 서류와 절차를 정리했어요.", url: "https://www.jjyu.co.kr/w/기초연금-사망-미지급분-청구-기한", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
