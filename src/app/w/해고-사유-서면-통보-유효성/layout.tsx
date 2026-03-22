import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "해고 서면 통보 의무: 효력 및 통보 방식별 차이 | 머니위키",
  description: "해고 서면 안 받았다면 그 해고는 무효라는 거 아시나요? 근로기준법 제27조에서 서면 통지 의무를 정하고 구두·카톡 통보는 효력이 없어요",
  openGraph: { title: "해고 서면 통보 의무: 효력 및 통보 방식별 차이 | 머니위키", description: "해고 서면 안 받았다면 그 해고는 무효라는 거 아시나요? 근로기준법 제27조에서 서면 통지 의무를 정하고 구두·카톡 통보는 효력이 없어요", url: "https://www.jjyu.co.kr/w/해고-사유-서면-통보-유효성", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/해고-사유-서면-통보-유효성" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
