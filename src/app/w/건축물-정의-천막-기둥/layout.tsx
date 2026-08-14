import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "천막·기둥만 있어도 건축물인가요? 건축법상 건축물 정의",
  description: "지붕과 기둥 또는 벽이 있으면 건축법상 건축물이에요. 천막 구조물도 해당될 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/건축물-정의-천막-기둥" },
  openGraph: { title: "천막·기둥만 있어도 건축물인가요? 건축법상 건축물 정의 | 머니위키", description: "지붕과 기둥 또는 벽이 있으면 건축법상 건축물이에요. 천막 구조물도 해당될 수 있어요.", url: "https://www.jjyu.co.kr/w/건축물-정의-천막-기둥", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
