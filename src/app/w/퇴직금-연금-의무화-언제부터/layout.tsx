import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 연금 의무화, 언제부터 어떻게 바뀌나요?",
  description: "퇴직금 연금 의무화 논의가 진행 중이에요. 현재 제도, 의무화 시 변경 사항, 대비 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-연금-의무화-언제부터" },
  openGraph: {
    title: "퇴직금 연금 의무화, 언제부터 어떻게 바뀌나요? | 머니위키",
    description: "퇴직금 연금 의무화 논의가 진행 중이에요. 현재 제도, 의무화 시 변경 사항, 대비 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-연금-의무화-언제부터",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
