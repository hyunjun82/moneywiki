import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "5세대 실손보험, 보험료가 절반이라는데? 4세대와 보장 비교 | 머니위키",
  description: "5세대 실손보험은 4세대보다 보험료가 30~50% 저렴하지만 비급여 자기부담률이 50%로 올라가요. 연간 보장한도도 1,000만원으로 줄어서 병원비 패턴에 따라 유불리가 갈려요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/5세대-실손보험-보험료-비교",
  },
  openGraph: {
    title: "5세대 실손보험, 보험료가 절반이라는데? 4세대와 보장 비교",
    description: "보험료 30~50% 인하, 비급여 자기부담 50%, 연간 한도 1,000만원. 갈아타기 판단 기준.",
    url: "https://www.jjyu.co.kr/w/5세대-실손보험-보험료-비교",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
