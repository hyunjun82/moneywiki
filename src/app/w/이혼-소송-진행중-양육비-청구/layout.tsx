import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼 소송 중에 양육비 받을 수 있나? 청구 방법과 산정 기준",
  description: "이혼 소송 진행 중에도 별도로 양육비를 청구할 수 있어요. 가정법원 소장 제출 방법, 산정기준표, 가처분 신청까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-소송-진행중-양육비-청구" },
  openGraph: {
    title: "이혼 소송 중에 양육비 받을 수 있나? 청구 방법과 산정 기준 | 머니위키",
    description: "이혼 소송 진행 중에도 별도로 양육비를 청구할 수 있어요. 가정법원 소장 제출 방법, 산정기준표, 가처분 신청까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/이혼-소송-진행중-양육비-청구",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
