import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "5세대 실손 중증: 자기부담 한도",
  description: "5세대 실손보험은 암 같은 중증 질환 보장이 강화됐어요. 상급종합병원 입원 시 연간 자기부담금이 500만원을 넘지 않아서 4세대보다 부담이 줄어들어요",
  openGraph: { title: "5세대 실손 중증: 자기부담 한도", description: "5세대 실손보험은 암 같은 중증 질환 보장이 강화됐어요. 상급종합병원 입원 시 연간 자기부담금이 500만원을 넘지 않아서 4세대보다 부담이 줄어들어요", url: "https://jjyu.co.kr/w/5세대-실손보험-중증-보장" },
  alternates: { canonical: "https://jjyu.co.kr/w/5세대-실손보험-중증-보장" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
