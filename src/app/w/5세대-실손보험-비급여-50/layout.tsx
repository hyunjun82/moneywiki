import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "5세대 실손 비급여: 50% 기준 | 머니위키",
  description: "5세대 실손보험은 비급여 자기부담률이 50%로 올라요. 4세대 30%보다 높아지지만 보험료는 30~50% 저렴해져요. 비중증과 중증 보장 차이를 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/5세대-실손보험-비급여-50" },
  openGraph: { title: "5세대 실손 비급여: 50% 기준", description: "5세대 실손보험은 비급여 자기부담률이 50%로 올라요. 4세대 30%보다 높아지지만 보험료는 30~50% 저렴해져요. 비중증과 중증 보장 차이를", url: "https://www.jjyu.co.kr/w/5세대-실손보험-비급여-50", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
