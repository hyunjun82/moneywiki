import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "5세대 실손보험 도수치료: 제외와 본인부담률",
  description: "5세대 실손보험에서 도수치료가 완전 제외됐다는 거 아시나요? 관리급여로 지정되면 본인부담률 95%로 거의 전액 본인이 부담해야 해요.",
  openGraph: { title: "5세대 실손보험 도수치료: 제외와 본인부담률 | 머니위키", description: "5세대 실손보험에서 도수치료가 완전 제외됐다는 거 아시나요? 관리급여로 지정되면 본인부담률 95%로 거의 전액 본인이 부담해야 해요.", url: "https://www.jjyu.co.kr/w/5세대-실손보험-도수치료-제외", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/5세대-실손보험-도수치료-제외" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
