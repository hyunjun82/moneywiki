import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "건물 안전점검 C등급 조치 방법",
  description: "건물 안전점검에서 C등급 받았는데 어떻게 해야 하나요? C등급 의미, 보수 보강 조치, 정밀안전진단 주기를 자세히 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/건물-안전점검-C등급-조치" },
  openGraph: {
    title: "건물 안전점검 C등급 조치 방법",
    description: "건물 안전점검에서 C등급 받았는데 어떻게 해야 하나요? C등급 의미, 보수 보강 조치, 정밀안전진단 주기를 자세히 알려드려요.",
    url: "https://www.jjyu.co.kr/w/건물-안전점검-C등급-조치",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
