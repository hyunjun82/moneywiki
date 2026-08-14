import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "부동산등기부 열람·발급 방법 — 등기사항증명서 종류별 선택 가이드",
  description: "등기사항증명서 5가지 종류 중 어떤 걸 받아야 하는지, 받고 나서 어디를 봐야 하는지 정리했어요. 매매·전세 계약 전 필수 확인 체크리스트예요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/부동산등기부-열람-발급-방법" },
  openGraph: {
    title: "부동산등기부 열람·발급 방법 — 등기사항증명서 종류별 선택 가이드 | 머니위키",
    description: "등기사항증명서 5가지 종류 중 어떤 걸 받아야 하는지, 받고 나서 어디를 봐야 하는지 정리했어요. 매매·전세 계약 전 필수 확인 체크리스트예요.",
    url: "https://www.jjyu.co.kr/w/부동산등기부-열람-발급-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
