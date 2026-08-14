import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "상대방이 아이를 안 만나게 한다면? 면접교섭권 방해 시 법적 대응",
  description: "면접교섭권 방해는 이행명령→과태료→감치 순서로 강제할 수 있어요. 대응 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼소송-중-면접교섭권-방해-대응" },
  openGraph: { title: "상대방이 아이를 안 만나게 한다면? 면접교섭권 방해 시 법적 대응 | 머니위키", description: "면접교섭권 방해는 이행명령→과태료→감치 순서로 강제할 수 있어요. 대응 방법을 정리했어요.", url: "https://www.jjyu.co.kr/w/이혼소송-중-면접교섭권-방해-대응", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
