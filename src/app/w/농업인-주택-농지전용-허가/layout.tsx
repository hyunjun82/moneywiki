import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "농지에 집 짓고 싶은데 허가가 필요한가요? 농지전용 절차 | 머니위키",
  description: "농업인이 660㎡ 이하 주택을 짓는 경우 농지전용 허가가 필요해요. 농지보전부담금 50% 감면. 신청 서류와 절차 정리.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/농업인-주택-농지전용-허가" },
  openGraph: { title: "농지에 집 짓고 싶은데 허가가 필요한가요?", description: "농업인 주택 농지전용 허가 요건과 절차.", url: "https://www.jjyu.co.kr/w/농업인-주택-농지전용-허가", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
