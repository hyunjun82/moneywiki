import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "고인이 못 받은 구직급여, 유족이 받을까? 미지급 구직급여 신청 방법",
  description: "구직급여 수급자가 사망하면 유족이 미지급 급여를 받을 수 있어요. 배우자·자녀·부모 순서, 필요 서류, 고용센터 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/구직급여-상속" },
  openGraph: {
    title: "고인이 못 받은 구직급여, 유족이 받을까? 미지급 구직급여 신청 방법 | 머니위키",
    description: "구직급여 수급자가 사망하면 유족이 미지급 급여를 받을 수 있어요. 배우자·자녀·부모 순서, 필요 서류, 고용센터 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/구직급여-상속",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
