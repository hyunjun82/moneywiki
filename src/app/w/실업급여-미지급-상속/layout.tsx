import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 미지급 상속 유족 청구 순위와 3년 소멸시효 | 머니위키",
  description: "실업급여 수급 중 사망 시 유족이 미지급 급여를 청구할 수 있어요. 배우자·자녀 1순위, 상속 포기와 무관, 사망일로부터 3년 이내 청구 가능.",
  openGraph: {
    title: "실업급여 미지급 상속 유족 청구 순위와 3년 소멸시효",
    description: "유족의 고유 청구권이라 상속 포기해도 받을 수 있어요. 순위와 3년 시효 확인.",
    url: "https://jjyu.co.kr/w/실업급여-미지급-상속",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/실업급여-미지급-상속",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
