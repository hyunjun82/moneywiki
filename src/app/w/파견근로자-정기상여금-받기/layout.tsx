import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "파견근로자 정기상여금, 못 받고 있다면 | 머니위키",
  description: "파견직도 정규직과 같은 일을 하면 상여금을 똑같이 받을 권리가 있어요. 차별시정 신청 방법과 증거 확보 요령을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/파견근로자-정기상여금-받기" },
  openGraph: {
    title: "파견근로자 정기상여금, 못 받고 있다면 | 머니위키",
    description: "파견직도 정규직과 같은 일을 하면 상여금을 똑같이 받을 권리가 있어요. 차별시정 신청 방법과 증거 확보 요령을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/파견근로자-정기상여금-받기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
