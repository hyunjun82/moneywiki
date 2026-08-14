import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "폭행·상해 고소 방법 | 증거 확보부터 고소장 제출까지 4단계 | 머니위키",
  description:
    "폭행·상해 고소는 증거 확보에서 시작합니다. 진단서 발급, 증거 정리, 고소장 작성, 접수까지 네 단계 절차를 순서대로 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/폭행-상해-고소-방법" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
