import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "미성년자 이혼 후 재혼 가능할까? 성년의제와 법적 지위 | 머니위키",
  description: "미성년자가 혼인하면 성년의제가 적용되고 이혼 후에도 성년 지위가 유지돼요. 부모 동의 없이 재혼 가능하고 대기 기간도 없어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-미성년자-결혼-가능" },
  openGraph: {
    title: "미성년자 이혼 후 재혼 가능할까? 성년의제와 법적 지위 | 머니위키",
    description: "미성년자가 혼인하면 성년의제가 적용되고 이혼 후에도 성년 지위가 유지돼요.",
    url: "https://www.jjyu.co.kr/w/이혼-미성년자-결혼-가능",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
