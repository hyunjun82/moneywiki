import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "주택 지분취득 거주요건 | 머니위키",
  description: "주택 지분을 나눠 취득한 경우 거주요건 적용 방법. 조정대상지역 지분 취득, 해제 후 추가 취득 시 비과세 조건을 정리해요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택-지분취득-거주요건" },
  openGraph: { title: "주택 지분취득 거주요건 | 머니위키", description: "주택 지분을 나눠 취득한 경우 거주요건 적용 방법. 조정대상지역 지분 취득, 해제 후 추가 취득 시 비과세 조건을 정리해요", url: "https://www.jjyu.co.kr/w/주택-지분취득-거주요건", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
