export const dynamic = "force-dynamic";
import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "임차권등기명령 신청 방법 및 대항력 유지 | 머니위키",
  description: "보증금 못 받았는데 이사해야 할 때 임차권등기명령 신청하면 대항력이 유지돼요. 비용은 약 1만5천원이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임차권등기명령" },
  openGraph: {
    title: "임차권등기명령 신청 방법 및 대항력 유지",
    description: "보증금 못 받았는데 이사해야 할 때 임차권등기명령 신청하면 대항력이 유지돼요. 비용은 약 1만5천원이에요.",
    url: "https://www.jjyu.co.kr/w/임차권등기명령",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
