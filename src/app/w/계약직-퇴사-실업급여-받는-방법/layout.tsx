import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "계약직 퇴사, 실업급여 받을 수 있을까? 증빙과 신청 방법",
  description: "계약직 계약만료 퇴사는 비자발적 이직이에요. 이직확인서 퇴사 사유가 계약만료로 돼 있으면 실업급여를 받을 수 있어요. 필요 서류와 신청 방법 정리.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/계약직-퇴사-실업급여-받는-방법",
  },
  openGraph: {
    title: "계약직 퇴사, 실업급여 받을 수 있을까? 증빙과 신청 방법",
    description: "계약만료 퇴사 = 비자발적 이직. 이직확인서 확인 후 고용24에서 신청.",
    url: "https://www.jjyu.co.kr/w/계약직-퇴사-실업급여-받는-방법",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
