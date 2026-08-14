import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "임신 중 2시간 단축근무가 가능한가요? 근로시간 단축 조건과 신청",
  description: "임신 12주 이내·36주 이후 근로자는 하루 2시간 단축 가능해요. 급여 삭감 없이 근무 시간만 줄여요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임신-중-근로시간-단축-2시간-가능" },
  openGraph: { title: "임신 중 2시간 단축근무가 가능한가요? 근로시간 단축 조건과 신청 | 머니위키", description: "임신 12주 이내·36주 이후 근로자는 하루 2시간 단축 가능해요. 급여 삭감 없이 근무 시간만 줄여요.", url: "https://www.jjyu.co.kr/w/임신-중-근로시간-단축-2시간-가능", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
