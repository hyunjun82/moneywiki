import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 온라인 교육, 안 들으면? 이수 기준과 수강 순서 | 머니위키",
  description: "실업급여 받으려면 수급자격 신청자 교육을 먼저 이수해야 해요. 고용24에서 온라인으로 약 1시간이면 끝나고, 교육 후 바로 실업급여 신청이 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-온라인-교육" },
  openGraph: {
    title: "실업급여 온라인 교육, 안 들으면? 이수 기준과 수강 순서 | 머니위키",
    description: "실업급여 받으려면 수급자격 신청자 교육을 먼저 이수해야 해요. 고용24에서 온라인으로 약 1시간이면 끝나고, 교육 후 바로 실업급여 신청이 가능해요.",
    url: "https://www.jjyu.co.kr/w/실업급여-온라인-교육",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
