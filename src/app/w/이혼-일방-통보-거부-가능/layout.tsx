import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼 일방 통보, 거부할 수 있을까? 협의이혼과 재판상 이혼 대응법 | 머니위키",
  description: "배우자가 일방적으로 이혼을 통보했을 때 거부하는 방법과 법적 근거를 정리했어요. 협의이혼은 100% 거부 가능하고, 재판상 이혼은 사유가 있어야 해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-일방-통보-거부-가능" },
  openGraph: {
    title: "이혼 일방 통보, 거부할 수 있을까? 협의이혼과 재판상 이혼 대응법 | 머니위키",
    description: "배우자가 일방적으로 이혼을 통보했을 때 거부하는 방법과 법적 근거를 정리했어요. 협의이혼은 100% 거부 가능하고, 재판상 이혼은 사유가 있어야 해요.",
    url: "https://www.jjyu.co.kr/w/이혼-일방-통보-거부-가능",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
