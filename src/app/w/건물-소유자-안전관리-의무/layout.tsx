import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "건물 소유자 안전관리 의무, 뭘 어떻게 해야 하나? 선임부터 과태료까지 | 머니위키",
  description: "건물주라면 전기·승강기·가스·보일러 안전관리자 선임이 법적 의무예요. 미선임 시 과태료와 벌금 기준, 점검 주기를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/건물-소유자-안전관리-의무" },
  openGraph: {
    title: "건물 소유자 안전관리 의무, 뭘 어떻게 해야 하나? 선임부터 과태료까지 | 머니위키",
    description: "건물주라면 전기·승강기·가스·보일러 안전관리자 선임이 법적 의무예요. 미선임 시 과태료와 벌금 기준, 점검 주기를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/건물-소유자-안전관리-의무",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
