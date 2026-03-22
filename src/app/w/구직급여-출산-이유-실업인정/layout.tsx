import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "출산으로 퇴사해도 구직급여 되나? 출산 사유 실업인정 기준 | 머니위키",
  description: "출산으로 퇴사해도 구직급여 되나? 출산 사유 실업인정 기준에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/구직급여-출산-이유-실업인정" },
  openGraph: { title: "출산으로 퇴사해도 구직급여 되나? 출산 사유 실업인정 기준", description: "출산으로 퇴사해도 구직급여 되나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/구직급여-출산-이유-실업인정", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
