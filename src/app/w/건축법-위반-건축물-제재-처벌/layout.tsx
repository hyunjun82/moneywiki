import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "건축법 위반하면 어떤 처벌 받나요? 이행강제금부터 형사처벌까지",
  description: "건축법 위반 시 이행강제금(매년 반복), 형사처벌(3년/5억), 행정조치(철거)까지 세 가지 제재를 동시에 받을 수 있어요. 위반 유형별 금액과 대응법 정리.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/건축법-위반-건축물-제재-처벌",
  },
  openGraph: {
    title: "건축법 위반 제재와 처벌 종류 정리",
    description: "이행강제금 매년 반복, 형사처벌 3년/5억, 행정 철거 명령까지.",
    url: "https://www.jjyu.co.kr/w/건축법-위반-건축물-제재-처벌",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
