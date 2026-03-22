import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "육아휴직 후 불리한 대우, 법으로 금지돼요 위반 시 제재와 대응 방법 | 머니위키",
  description: "육아휴직 후 불이익(해고·전보·감봉)은 남녀고용평등법 위반이에요. 500만원 과태료와 대응 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/육아휴직-불리한-대우-금지" },
  openGraph: { title: "육아휴직 후 불리한 대우, 법으로 금지돼요 위반 시 제재와 대응 방법 | 머니위키", description: "육아휴직 후 불이익(해고·전보·감봉)은 남녀고용평등법 위반이에요. 500만원 과태료와 대응 방법을 정리했어요.", url: "https://www.jjyu.co.kr/w/육아휴직-불리한-대우-금지", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
