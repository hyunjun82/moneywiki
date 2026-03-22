import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "홈택스 법인세 전자신고 방법 및 절차: 로그인부터 신고까지 | 머니위키",
  description: "법인세 신고 어렵게 생각하셨나요. 홈택스에서 단계별로 신고하는 방법과 필요한 서류를 쉽게 설명해드릴게요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/홈택스-법인세-전자신고-방법-절차" },
  openGraph: { title: "홈택스 법인세 전자신고 방법 및 절차: 로그인부터 신고까지", description: "법인세 신고 어렵게 생각하셨나요. 홈택스에서 단계별로 신고하는 방법과 필요한 서류를 쉽게 설명해드릴게요", url: "https://www.jjyu.co.kr/w/홈택스-법인세-전자신고-방법-절차", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
