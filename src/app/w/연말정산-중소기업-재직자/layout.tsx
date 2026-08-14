import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "중소기업 다니면 연말정산에서 뭐가 다른가요? 소득세 감면과 추가 혜택",
  description: "중소기업 재직자는 소득세 90% 감면(청년 5년), 일반 재직자는 70% 감면 혜택이 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-중소기업-재직자" },
  openGraph: { title: "중소기업 다니면 연말정산에서 뭐가 다른가요? 소득세 감면과 추가 혜택 | 머니위키", description: "중소기업 재직자는 소득세 90% 감면(청년 5년), 일반 재직자는 70% 감면 혜택이 있어요.", url: "https://www.jjyu.co.kr/w/연말정산-중소기업-재직자", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
