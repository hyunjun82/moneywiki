import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "집을 식당으로 바꾸려면? 용도변경 허가부터 영업신고까지",
  description: "주택→음식점 용도변경은 건축법상 허가 대상이에요. 허가 신청, 공사, 사용승인, 영업신고까지 단계별 절차와 준비물을 안내해요.",
  openGraph: {
    title: "집을 식당으로 바꾸려면? 용도변경 허가부터 영업신고까지",
    description: "주택→음식점 용도변경은 건축법상 허가 대상이에요. 허가 신청, 공사, 사용승인, 영업신고까지 단계별 절차와 준비물을 안내해요.",
    type: "article",
  },
  alternates: { canonical: "/w/주택-음식점-용도변경-절차" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
