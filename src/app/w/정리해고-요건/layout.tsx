import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "정리해고 통보받았다면? 4대 요건과 부당해고 구제 방법 | 머니위키",
  description: "정리해고는 4대 요건을 모두 충족해야 합법이에요. 하나라도 안 지키면 부당해고로 원직 복직할 수 있어요. 요건과 구제 절차를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/정리해고-요건",
  },
  openGraph: {
    title: "정리해고 통보받았다면? 4대 요건과 부당해고 구제 방법",
    description: "정리해고 4대 요건과 부당해고 구제 절차.",
    url: "https://www.jjyu.co.kr/w/정리해고-요건",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
