import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "경력증명서 발급 거부 대응법과 대체 서류 | 머니위키",
  description: "경력증명서 발급 거부 시 법적 대응 방법, 노동청 진정 절차, 대체 서류 목록과 폐업한 경우 경력 증명 방법을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/경력증명서-발급-거부-대응" },
  openGraph: {
    title: "경력증명서 발급 거부 대응법과 대체 서류 | 머니위키",
    description: "경력증명서 발급 거부 시 법적 대응 방법, 노동청 진정 절차, 대체 서류와 폐업 시 경력 증명 방법을 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/경력증명서-발급-거부-대응",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
