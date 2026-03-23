export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "재건축 조합장 해임, 어떻게 진행하나요? 발의부터 총회까지 | 머니위키",
  description: "조합원 10분의 1 이상 발의로 해임 총회 소집이 가능하고, 과반수 출석에 출석조합원 과반수 동의로 해임돼요. 소집공고 14일, 소집통지 7일 전 절차를 지켜야 무효가 안 돼요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/재건축-조합장-해임-방법-절차",
  },
  openGraph: {
    title: "재건축 조합장 해임, 어떻게 진행하나요? 발의부터 총회까지",
    description: "조합원 1/10 이상 발의 → 소집공고 14일 → 소집통지 7일 → 총회 의결. 절차별 주의사항 정리.",
    url: "https://www.jjyu.co.kr/w/재건축-조합장-해임-방법-절차",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
