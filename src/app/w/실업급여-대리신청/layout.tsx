import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 대리신청, 가족이 대신 할 수 있나? 위임장과 서류",
  description: "몸이 아파서 고용센터에 직접 못 가도 괜찮아요. 가족이나 지인이 위임장으로 대리신청할 수 있어요. 필요 서류와 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-대리신청" },
  openGraph: {
    title: "실업급여 대리신청, 가족이 대신 할 수 있나? 위임장과 서류 | 머니위키",
    description: "몸이 아파서 고용센터에 직접 못 가도 괜찮아요. 가족이나 지인이 위임장으로 대리신청할 수 있어요. 필요 서류와 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-대리신청",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
