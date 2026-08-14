import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여와 퇴직금, 둘 다 받을 수 있나요?",
  description: "실업급여와 퇴직금은 별개 제도라서 둘 다 받을 수 있어요. 퇴직금이 실업급여에 미치는 영향과 수령 순서를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-퇴직금" },
  openGraph: {
    title: "실업급여와 퇴직금, 둘 다 받을 수 있나요? | 머니위키",
    description: "실업급여와 퇴직금은 별개 제도라서 둘 다 받을 수 있어요. 퇴직금이 실업급여에 미치는 영향과 수령 순서를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-퇴직금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
