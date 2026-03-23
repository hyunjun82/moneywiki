import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 야간근로수당 비과세 총정리 | 머니위키",
  description: "2025년 연말정산에서 야간근로수당이 비과세로 처리되는 조건과 한도를 완벽하게 정리했어요. 월 240만원까지 비과세 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-야간근로수당-비과세" },
  openGraph: { title: "연말정산 야간근로수당 비과세 총정리 | 머니위키", description: "2025년 연말정산에서 야간근로수당이 비과세로 처리되는 조건과 한도를 완벽하게 정리했어요. 월 240만원까지 비과세 가능해요.", url: "https://www.jjyu.co.kr/w/연말정산-야간근로수당-비과세", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
