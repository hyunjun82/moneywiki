import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "집 매입 후 부동산거래 신고 30일 기한 절차 | 머니위키",
  description: "집 매매계약 후 30일 이내 부동산거래 신고 의무. 온라인·오프라인 신고 방법, 필요 서류, 미신고 과태료 기준.",
  openGraph: {
    title: "집 매입 후 부동산거래 신고 30일 기한 절차",
    description: "30일 이내 신고, 필요 서류, 미신고 과태료 기준.",
    url: "https://jjyu.co.kr/w/집-매입-후-부동산거래-신고-의무",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/집-매입-후-부동산거래-신고-의무" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
