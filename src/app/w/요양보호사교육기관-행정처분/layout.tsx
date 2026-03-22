import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "요양보호사교육기관 행정처분 기준과 사유 | 머니위키",
  description: "요양보호사교육기관이 행정처분 받는 사유와 기준을 알려드려요. 지정취소부터 업무정지까지 처분 종류와 대응 방법 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/요양보호사교육기관-행정처분" },
  openGraph: {
    title: "요양보호사교육기관 행정처분 기준과 사유",
    description: "요양보호사교육기관이 행정처분 받는 사유와 기준을 알려드려요. 지정취소부터 업무정지까지 처분 종류와 대응 방법 확인하세요.",
    url: "https://www.jjyu.co.kr/w/요양보호사교육기관-행정처분",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
