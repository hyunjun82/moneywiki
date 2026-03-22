import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실비보험 청구 방법 앱으로 3분 만에 끝내기 | 머니위키",
  description: "병원 다녀온 후 실비보험은 앱으로 간단하게 청구해요. 영수증 사진 2개면 충분해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/의료비-실비보험-청구-방법" },
  openGraph: {
    title: "실비보험 청구 방법 앱으로 3분 만에 끝내기",
    description: "병원 다녀온 후 실비보험은 앱으로 간단하게 청구해요. 영수증 사진 2개면 충분해요.",
    url: "https://www.jjyu.co.kr/w/의료비-실비보험-청구-방법",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
