import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "아동수당 신청, 어떻게 하나요? 온라인 절차와 서류",
  description: "아동수당 온라인 신청은 복지로에서 5분이면 끝나요. 필요한 서류 3가지와 출생 후 60일 이내 소급 규정까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/아동수당-신청방법" },
  openGraph: {
    title: "아동수당 신청, 어떻게 하나요? 온라인 절차와 서류 | 머니위키",
    description: "아동수당 온라인 신청은 복지로에서 5분이면 끝나요. 필요한 서류 3가지와 출생 후 60일 이내 소급 규정까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/아동수당-신청방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
