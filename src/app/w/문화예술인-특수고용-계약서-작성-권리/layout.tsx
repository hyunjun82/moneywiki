import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "문화예술인 특수고용·계약서 작성·권리",
  description: "문화예술인이 특수고용 계약을 체결할 때 표준계약서를 사용하고 자신의 권리를 지키는 방법을 알려드려요.",
  openGraph: { title: "문화예술인 특수고용·계약서 작성·권리", description: "문화예술인이 특수고용 계약을 체결할 때 표준계약서를 사용하고 자신의 권리를 지키는 방법을 알려드려요.", url: "https://jjyu.co.kr/w/문화예술인-특수고용-계약서-작성-권리" },
  alternates: { canonical: "https://jjyu.co.kr/w/문화예술인-특수고용-계약서-작성-권리" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
