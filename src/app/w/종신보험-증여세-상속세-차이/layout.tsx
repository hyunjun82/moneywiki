import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "종신보험 증여세·상속세 차이 | 계약 구조에 따라 갈리는 기준",
  description:
    "계약자·피보험자·수익자를 누구로 두느냐에 따라 증여세가 나올지 상속세가 나올지 달라집니다. 계약자 변경 시 과세 기준과 간주상속재산 요건, 공제 한도를 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/종신보험-증여세-상속세-차이" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
