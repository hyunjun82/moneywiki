import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "대항력은 언제 생기나요? 전입신고 시점과 보증금 보호",
  description: "전입신고 다음 날 0시에 대항력이 발생해요. 점유+전입 동시 필요, 확정일자와의 차이, 잔금일 당일 처리가 핵심이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/대항력-발생-시점" },
  openGraph: { title: "대항력은 언제 생기나요? 전입신고 시점과 보증금 보호 | 머니위키", description: "전입신고 다음 날 0시에 대항력이 발생해요. 점유+전입 동시 필요, 확정일자와의 차이, 잔금일 당일 처리가 핵심이에요.", url: "https://www.jjyu.co.kr/w/대항력-발생-시점", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
