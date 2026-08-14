import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "급수관 검사 기준치 초과 조치방법 — 항목별 기준과 대응",
  description: "급수관 검사에서 납·철·탁도 기준치가 초과되면 관리사무소에 즉시 조치를 요청할 수 있어요. 항목별 기준과 배관 교체 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/급수관-검사-기준치-초과-조치방법" },
  openGraph: {
    title: "급수관 검사 기준치 초과 조치방법",
    description: "수질 기준 항목별 초과 시 대응 절차와 배관 교체 비용 안내.",
    url: "https://www.jjyu.co.kr/w/급수관-검사-기준치-초과-조치방법",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
