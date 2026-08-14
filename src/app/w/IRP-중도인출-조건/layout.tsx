import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "IRP 중도인출 조건, 55세 전 허용 사유 6가지와 세금",
  description: "IRP는 55세 전에도 법정 사유에 해당하면 중도인출 가능해요. 무주택 주택구입, 장기요양 등 6가지 사유와 기타소득세 16.5% 세금 구조를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/IRP-중도인출-조건",
  },
  openGraph: {
    title: "IRP 중도인출 조건, 55세 전 허용 사유 6가지와 세금",
    description: "IRP 중도인출 6가지 법정 사유, 사유별 증빙서류, 기타소득세 16.5% 구조를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/IRP-중도인출-조건",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
