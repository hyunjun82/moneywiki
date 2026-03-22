import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "국세체납 주택압류 보증금 회수 대처방법 | 머니위키",
  description: "집주인이 국세 체납으로 집이 압류됐어요. 보증금 못 받을까 걱정되시죠? 임차권등기명령, 민사조정, 보증금반환소송으로 대처할 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/국세체납-주택압류-보증금-회수" },
  openGraph: { title: "국세체납 주택압류 보증금 회수 대처방법 | 머니위키", description: "집주인이 국세 체납으로 집이 압류됐어요. 보증금 못 받을까 걱정되시죠? 임차권등기명령, 민사조정, 보증금반환소송으로 대처할 수 있어요.", url: "https://www.jjyu.co.kr/w/국세체납-주택압류-보증금-회수", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
