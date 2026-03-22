import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "신용점수 올리는 방법 6가지, 3~6개월이면 100점 올릴 수 있어요 | 머니위키",
  description: "신용점수를 올리려면 연체 방지가 1순위예요. 카드 사용률 30% 관리, 체크카드 등록, 비금융정보 제출까지 6가지 방법으로 3~6개월 내 점수를 올릴 수 있어요.",
  openGraph: {
    title: "신용점수 올리는 방법 6가지, 3~6개월이면 100점 올릴 수 있어요 | 머니위키",
    description: "신용점수 올리는 실전 방법 6가지를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/신용점수-올리는-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/신용점수-올리는-방법" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
