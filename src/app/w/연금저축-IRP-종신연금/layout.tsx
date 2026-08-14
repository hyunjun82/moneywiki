import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연금저축·IRP, 종신연금으로 받으면? 평생 3.3% 세율과 전환 방법",
  description: "종신연금으로 전환하면 나이와 관계없이 평생 3.3%만 과세돼요. 확정기간형(55세 5.5%)보다 절세 효과가 크고, 생명보험사로 이전하면 전환 가능해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연금저축-IRP-종신연금",
  },
  openGraph: {
    title: "연금저축·IRP, 종신연금으로 받으면? 평생 3.3% 세율과 전환 방법",
    description: "종신연금 3.3% vs 확정기간형 5.5%. 생명보험사 이전 절차 안내.",
    url: "https://www.jjyu.co.kr/w/연금저축-IRP-종신연금",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
