import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "상속주택 양도세 거주요건, 동일세대·별도세대 비과세 조건 비교",
  description: "상속주택 양도소득세 비과세는 동일세대·별도세대 여부에 따라 달라요. 별도세대면 상속인이 직접 2년 거주해야 하고 동일세대면 피상속인 기간을 합산할 수 있어요.",
  openGraph: {
    title: "상속주택 양도세 거주요건, 동일세대·별도세대 비과세 조건 비교 | 머니위키",
    description: "상속주택 비과세를 위한 거주요건과 동일·별도세대 차이를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/상속주택-양도세-거주요건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/상속주택-양도세-거주요건" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
