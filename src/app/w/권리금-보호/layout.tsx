import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "권리금 보호 받는 방법과 손해배상 청구",
  description: "상가 권리금을 법으로 보호받을 수 있어요. 임대인이 방해하면 손해배상 청구 가능해요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/권리금-보호" },
  openGraph: { title: "권리금 보호 받는 방법과 손해배상 청구 | 머니위키", description: "상가 권리금을 법으로 보호받을 수 있어요. 임대인이 방해하면 손해배상 청구 가능해요", url: "https://www.jjyu.co.kr/w/권리금-보호", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
