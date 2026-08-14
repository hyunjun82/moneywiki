import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "임차권등기명령 비용은 얼마? 수수료부터 절차까지",
  description: "임차권등기명령 신청비용은 총 43,400원이에요. 이 비용은 나중에 임대인에게 청구할 수 있고, 등기하면 이사 가도 대항력이 유지돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임차권등기명령-신청비용-수수료-절차" },
  openGraph: {
    title: "임차권등기명령 비용은 얼마? 수수료부터 절차까지 | 머니위키",
    description: "임차권등기명령 신청비용은 총 43,400원이에요. 등기하면 이사 가도 대항력이 유지돼요.",
    url: "https://www.jjyu.co.kr/w/임차권등기명령-신청비용-수수료-절차",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
