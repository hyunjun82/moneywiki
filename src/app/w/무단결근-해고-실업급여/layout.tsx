import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "무단결근 해고, 실업급여 받을 수 있을까? 인정 여부와 기준 | 머니위키",
  description: "무단결근으로 해고되면 중대한 귀책사유에 해당해 실업급여가 제한될 수 있죠. 횟수별 기준과 대응 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/무단결근-해고-실업급여" },
  openGraph: {
    title: "무단결근 해고, 실업급여 받을 수 있을까? 인정 여부와 기준 | 머니위키",
    description: "무단결근으로 해고되면 중대한 귀책사유에 해당해 실업급여가 제한될 수 있죠. 횟수별 기준과 대응 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/무단결근-해고-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
