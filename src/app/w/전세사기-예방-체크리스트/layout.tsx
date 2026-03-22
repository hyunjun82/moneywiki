import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전세사기, 계약 전에 이것만 확인하세요. 예방 체크리스트 | 머니위키",
  description: "등기부등본, 시세, 전세보증보험 가입 가능 여부. 이 세 가지만 확인해도 전세사기 90%는 예방할 수 있어요. 체크리스트로 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/전세사기-예방-체크리스트",
  },
  openGraph: {
    title: "전세사기, 계약 전에 이것만 확인하세요. 예방 체크리스트",
    description: "등기부등본·시세·보증보험 확인으로 전세사기 예방하기.",
    url: "https://www.jjyu.co.kr/w/전세사기-예방-체크리스트",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
