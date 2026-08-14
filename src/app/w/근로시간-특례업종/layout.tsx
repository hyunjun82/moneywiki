import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "근로시간 특례업종·5개 업종 범위·연장근로 제한·폐지 계획",
  description: "근로시간 특례는 5개 업종만 주 52시간 예외 인정해요. 육상운송업, 수상운송업, 항공운송업, 보건업, 통신판매업이 해당되며 주 12시간까지 연장근로 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/근로시간-특례업종" },
  openGraph: { title: "근로시간 특례업종·5개 업종 범위·연장근로 제한·폐지 계획", description: "근로시간 특례는 5개 업종만 주 52시간 예외 인정해요. 육상운송업, 수상운송업, 항공운송업, 보건업, 통신판매업이 해당되며 주 12시간까지 연", url: "https://www.jjyu.co.kr/w/근로시간-특례업종", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
