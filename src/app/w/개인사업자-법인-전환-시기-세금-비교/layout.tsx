import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "개인사업자의 법인 전환 시기와 세금 비교: 언제가 최적일까",
  description: "개인사업자지만 법인으로 바꿀까 고민이시죠. 세금이 얼마나 적게 드는지, 언제 바꾸는 게 최적인지 완벽하게 설명해드릴게요",
  openGraph: { title: "개인사업자의 법인 전환 시기와 세금 비교: 언제가 최적일까 | 머니위키", description: "개인사업자지만 법인으로 바꿀까 고민이시죠. 세금이 얼마나 적게 드는지, 언제 바꾸는 게 최적인지 완벽하게 설명해드릴게요", url: "https://www.jjyu.co.kr/w/개인사업자-법인-전환-시기-세금-비교", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/개인사업자-법인-전환-시기-세금-비교" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
