import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전세 중도해지 시 복비, 누가 내야 할까? 법적 기준과 협상 방법 | 머니위키",
  description: "전세 중도해지 시 중개보수는 법적으로 임차인 부담 의무가 없어요. 법제처 해석, 묵시적갱신 후 면제 기준, 집주인과의 협상 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전세계약-중도해지-중개보수-부담" },
  openGraph: {
    title: "전세 중도해지 시 복비, 누가 내야 할까? 법적 기준과 협상 방법 | 머니위키",
    description: "전세 중도해지 시 중개보수는 법적으로 임차인 부담 의무가 없어요. 법제처 해석, 묵시적갱신 후 면제 기준, 집주인과의 협상 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/전세계약-중도해지-중개보수-부담",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
