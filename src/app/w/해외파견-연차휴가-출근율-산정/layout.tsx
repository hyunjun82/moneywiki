import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "해외파견 연차휴가 출근율 산정 | 머니위키",
  description: "해외 파견근무 중인 근로자의 연차휴가 출근율은 어떻게 계산하나요? 해외파견 연차휴가 산정 방법을 알려드릴게요.",
  openGraph: { title: "해외파견 연차휴가 출근율 산정 | 머니위키", description: "해외 파견근무 중인 근로자의 연차휴가 출근율은 어떻게 계산하나요? 해외파견 연차휴가 산정 방법을 알려드릴게요.", url: "https://www.jjyu.co.kr/w/해외파견-연차휴가-출근율-산정", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/해외파견-연차휴가-출근율-산정" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
