import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "직장 상사 폭행 싸움 해고 | 머니위키",
  description: "상사가 먼저 때려서 정당방위로 맞섰는데 해고당했다면요? 정당한 이유 없는 부당해고일 가능성이 높아요. 구제 방법 알려드려요.",
  openGraph: { title: "직장 상사 폭행 싸움 해고 | 머니위키", description: "상사가 먼저 때려서 정당방위로 맞섰는데 해고당했다면요? 정당한 이유 없는 부당해고일 가능성이 높아요. 구제 방법 알려드려요.", url: "https://www.jjyu.co.kr/w/직장-상사-폭행-싸움-해고", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/직장-상사-폭행-싸움-해고" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
