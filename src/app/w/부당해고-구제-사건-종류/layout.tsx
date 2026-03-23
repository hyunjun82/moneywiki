import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "부당해고, 어떤 종류가 있고 어떻게 구제받나요? 구제 사건 유형과 신청 방법 | 머니위키",
  description: "부당해고·부당전보·부당징계 등 노동위원회에 구제 신청할 수 있어요. 90일 이내 신청이 기한이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/부당해고-구제-사건-종류" },
  openGraph: { title: "부당해고, 어떤 종류가 있고 어떻게 구제받나요? 구제 사건 유형과 신청 방법 | 머니위키", description: "부당해고·부당전보·부당징계 등 노동위원회에 구제 신청할 수 있어요. 90일 이내 신청이 기한이에요.", url: "https://www.jjyu.co.kr/w/부당해고-구제-사건-종류", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
