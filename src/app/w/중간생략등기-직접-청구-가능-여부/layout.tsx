import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "중간생략등기, 직접 청구할 수 있을까? 합의 요건과 대위등기 | 머니위키",
  description: "중간생략등기는 A, B, C 전원 합의가 있어야 직접 청구 가능해요. 합의가 없으면 대위등기로 B 명의를 거쳐야 해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/중간생략등기-직접-청구-가능-여부" },
  openGraph: {
    title: "중간생략등기, 직접 청구할 수 있을까? 합의 요건과 대위등기 | 머니위키",
    description: "A→C 직접 등기를 위한 전원 합의 요건, 합의 불가 시 대위등기 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/중간생략등기-직접-청구-가능-여부",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
