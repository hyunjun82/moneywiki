import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "혼인 전 재산 약정, 이혼 시 효력 있을까? 부부재산계약",
  description: "혼인신고 전 부부재산계약은 당사자 간 유효하지만 등기해야 완전해요. 현저히 불공정하면 법원이 수정할 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-혼인신고-전-재산-약정" },
  openGraph: { title: "혼인 전 재산 약정, 이혼 시 효력 있을까?", description: "부부재산계약 효력 요건과 한계.", url: "https://www.jjyu.co.kr/w/이혼-혼인신고-전-재산-약정", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
