import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "양육비 청구 방법 신청 절차 | 미지급 강제집행 이행명령",
  description:
    "이혼 후 양육비 청구 방법과 신청 절차를 정리했습니다. 양육비 산정기준표, 강제집행, 이행명령 등 미지급 대응까지 한눈에 확인할 수 있습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/양육비-청구" },
  openGraph: {
    title: "양육비 청구 방법 신청 절차 | 미지급 강제집행 이행명령 | 머니위키",
    description:
      "이혼 후 양육비 청구 방법과 신청 절차를 정리했습니다. 양육비 산정기준표, 강제집행, 이행명령 등 미지급 대응까지 한눈에 확인할 수 있습니다.",
    url: "https://www.jjyu.co.kr/w/양육비-청구",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
