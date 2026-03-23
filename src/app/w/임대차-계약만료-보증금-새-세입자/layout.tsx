export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "새 세입자 들어오면 보증금 준다는데? 절대 이사 먼저 가면 안 돼요 | 머니위키",
  description: "이사를 먼저 나가면 대항력이 사라져서 보증금을 못 받을 수 있어요. 임차권등기명령을 먼저 받고 이사하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임대차-계약만료-보증금-새-세입자" },
  openGraph: {
    title: "새 세입자 들어오면 보증금 준다는데? 절대 이사 먼저 가면 안 돼요",
    description: "이사 전 임차권등기명령 필수. 대항력 없이 이사하면 보증금 위험.",
    url: "https://www.jjyu.co.kr/w/임대차-계약만료-보증금-새-세입자",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
