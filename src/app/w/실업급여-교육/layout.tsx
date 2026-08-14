import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 온라인 교육 수강 방법, 14일 기한 안에 고용센터 방문하기",
  description: "실업급여 신청 전 고용24에서 수급자격 신청자 온라인 교육을 수강해야 해요. 1~2시간이면 끝나고 수료 후 14일 이내에 고용센터를 방문해서 수급자격을 신청하세요.",
  openGraph: {
    title: "실업급여 온라인 교육 수강 방법, 14일 기한 안에 고용센터 방문하기 | 머니위키",
    description: "실업급여 온라인 교육 수강 방법과 14일 기한을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-교육",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-교육" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
