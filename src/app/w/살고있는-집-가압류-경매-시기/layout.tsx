import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "집에 가압류 걸렸는데, 경매는 언제 되나요? 기간과 대응 방법",
  description: "가압류만으로는 경매 안 돼요. 본안소송 승소 후 강제집행해야 경매가 시작되고, 최소 6개월~1년 이상 걸려요. 합의·변제·개인회생으로 대응할 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/살고있는-집-가압류-경매-시기",
  },
  openGraph: {
    title: "집에 가압류 걸렸는데, 경매는 언제 되나요? 기간과 대응 방법",
    description: "가압류는 임시조치. 경매까지 최소 6개월~1년. 합의·변제로 대응 가능.",
    url: "https://www.jjyu.co.kr/w/살고있는-집-가압류-경매-시기",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
