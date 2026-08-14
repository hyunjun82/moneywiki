import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "임차인 집수리 비용, 필요비 유익비 청구 방법과 기한",
  description: "세입자가 직접 수리한 비용을 집주인에게 돌려받을 수 있어요. 필요비는 즉시, 유익비는 계약 종료 후 청구 가능하고 6개월 안에 청구해야 해요.",
  openGraph: {
    title: "임차인 집수리 비용, 필요비 유익비 청구 방법과 기한 | 머니위키",
    description: "세입자가 수리한 비용을 필요비·유익비로 나눠 집주인에게 청구하는 방법이에요.",
    url: "https://www.jjyu.co.kr/w/임차인-집수리-비용-필요비-유익비",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/임차인-집수리-비용-필요비-유익비" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
