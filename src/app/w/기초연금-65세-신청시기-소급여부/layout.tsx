import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금, 65세 되면 바로 나올까? 신청 시기와 소급 여부 | 머니위키",
  description: "기초연금은 65세 생일 1개월 전부터 신청 가능해요. 늦게 신청하면 소급이 안 되니 신청 시기가 중요해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-65세-신청시기-소급여부" },
  openGraph: {
    title: "기초연금, 65세 되면 바로 나올까? 신청 시기와 소급 여부 | 머니위키",
    description: "기초연금은 65세 생일 1개월 전부터 신청 가능해요. 늦게 신청하면 소급이 안 되니 신청 시기가 중요해요.",
    url: "https://www.jjyu.co.kr/w/기초연금-65세-신청시기-소급여부",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
