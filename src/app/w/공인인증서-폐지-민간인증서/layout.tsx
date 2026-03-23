import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "공인인증서 폐지 후 공동인증서와 민간인증서 차이 | 머니위키",
  description: "2020년 공인인증서 폐지 후 공동인증서로 이름이 바뀌었어요. 카카오·네이버 민간인증서와 차이점, 용도별 선택법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/공인인증서-폐지-민간인증서" },
  openGraph: {
    title: "공인인증서 폐지 후 공동인증서와 민간인증서 차이 | 머니위키",
    description: "2020년 공인인증서 폐지 후 공동인증서로 이름이 바뀌었어요. 카카오·네이버 민간인증서와 차이점, 용도별 선택법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/공인인증서-폐지-민간인증서",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
