import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "전직금지 약정, 퇴사 후에도 효력이 있나요? 유효 요건과 위반 시 대응 | 머니위키",
  description: "전직금지 약정은 기간·범위·보상이 합리적이어야 유효해요. 과도한 약정은 무효가 될 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전직금지-약정-효력" },
  openGraph: { title: "전직금지 약정, 퇴사 후에도 효력이 있나요? 유효 요건과 위반 시 대응 | 머니위키", description: "전직금지 약정은 기간·범위·보상이 합리적이어야 유효해요. 과도한 약정은 무효가 될 수 있어요.", url: "https://www.jjyu.co.kr/w/전직금지-약정-효력", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
