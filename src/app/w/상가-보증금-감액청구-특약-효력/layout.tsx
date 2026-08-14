import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "감액청구 금지 특약, 정말 유효한가요? 상가 보증금 감액",
  description: "상가 감액청구 금지 특약은 무효예요. 상가임대차보호법 제11조 감액청구권은 강행규정. 시세 하락 시 감액 청구 가능.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/상가-보증금-감액청구-특약-효력" },
  openGraph: { title: "감액청구 금지 특약, 정말 유효한가요?", description: "강행규정 위반 = 무효. 시세 하락 시 감액 청구 가능.", url: "https://www.jjyu.co.kr/w/상가-보증금-감액청구-특약-효력", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
