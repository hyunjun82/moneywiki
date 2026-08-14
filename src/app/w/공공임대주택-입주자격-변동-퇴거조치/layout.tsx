import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "공공임대 입주자격 변동되면 퇴거? 자격 변경 기준과 대응",
  description: "공공임대 입주자격 변동되면 퇴거? 자격 변경 기준과 대응에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/공공임대주택-입주자격-변동-퇴거조치" },
  openGraph: { title: "공공임대 입주자격 변동되면 퇴거? 자격 변경 기준과 대응", description: "공공임대 입주자격 변동되면 퇴거? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/공공임대주택-입주자격-변동-퇴거조치", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
