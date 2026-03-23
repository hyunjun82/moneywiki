export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "보증금 못 받았는데 이사 가야 한다면? 임차권등기명령으로 대항력 유지하는 방법 | 머니위키",
  description: "전세 보증금 못 받고 이사 가면 대항력이 사라져요. 임차권등기명령 신청하면 이사 후에도 권리를 유지할 수 있어요. 비용 43,400원, 절차와 서류를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임대차-보증금-미반환-대항력-유지" },
  openGraph: {
    title: "보증금 못 받았는데 이사 가야 한다면? 임차권등기명령으로 대항력 유지하는 방법 | 머니위키",
    description: "전세 보증금 못 받고 이사 가면 대항력이 사라져요. 임차권등기명령 신청하면 이사 후에도 권리를 유지할 수 있어요. 비용 43,400원, 절차와 서류를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/임대차-보증금-미반환-대항력-유지",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
