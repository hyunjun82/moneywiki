import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "청년미래적금 가입조건과 혜택 정리",
  description: "만 19~34세, 소득 6,000만원 이하면 가입 가능해요. 정부 기여금 6~12% + 비과세로 3년 만에 최대 2,200만원 모을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년미래적금-가입조건-혜택" },
  openGraph: {
    title: "청년미래적금 가입조건과 혜택 정리 | 머니위키",
    description: "만 19~34세, 소득 6,000만원 이하면 가입 가능해요. 정부 기여금 6~12% + 비과세로 3년 만에 최대 2,200만원 모을 수 있어요.",
    url: "https://www.jjyu.co.kr/w/청년미래적금-가입조건-혜택",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
