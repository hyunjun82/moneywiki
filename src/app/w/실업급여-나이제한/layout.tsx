import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 나이제한, 65세 넘으면 못 받을까? 연령별 수급 기간 | 머니위키",
  description: "실업급여 나이 제한 기준은 65세예요. 65세 이전 고용보험 가입자는 퇴직 시 나이 무관하게 수급 가능하고, 50세 이상은 수급기간이 더 길어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-나이제한" },
  openGraph: {
    title: "실업급여 나이제한, 65세 넘으면 못 받을까? 연령별 수급 기간 | 머니위키",
    description: "실업급여 나이 제한 기준은 65세예요. 65세 이전 고용보험 가입자는 퇴직 시 나이 무관하게 수급 가능하고, 50세 이상은 수급기간이 더 길어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-나이제한",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
