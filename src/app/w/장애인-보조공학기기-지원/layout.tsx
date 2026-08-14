import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "장애인 보조공학기기, 어떻게 지원받나요? 지원 대상과 신청 방법",
  description: "장애인 보조기기 지원은 국민건강보험+장애인복지관에서 신청해요. 교부·대여·수리 지원이 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/장애인-보조공학기기-지원" },
  openGraph: { title: "장애인 보조공학기기, 어떻게 지원받나요? 지원 대상과 신청 방법 | 머니위키", description: "장애인 보조기기 지원은 국민건강보험+장애인복지관에서 신청해요. 교부·대여·수리 지원이 가능해요.", url: "https://www.jjyu.co.kr/w/장애인-보조공학기기-지원", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
