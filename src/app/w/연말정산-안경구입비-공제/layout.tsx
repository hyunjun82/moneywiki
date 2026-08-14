import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "안경 구입비 연말정산 공제 되나? 의료비 세액공제 대상과 한도",
  description: "안경 구입비 연말정산 공제 되나? 의료비 세액공제 대상과 한도에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-안경구입비-공제" },
  openGraph: { title: "안경 구입비 연말정산 공제 되나? 의료비 세액공제 대상과 한도", description: "안경 구입비 연말정산 공제 되나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/연말정산-안경구입비-공제", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
