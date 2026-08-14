import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "K-패스 청년 환급 30% — 내 나이로 자격 확인하고 바로 가입",
  description: "만 19~34세면 K-패스 교통비 30% 환급 대상이에요. 나이 계산기로 바로 자격 확인하고, 일반(20%) 대비 연간 얼마를 더 받는지 비교했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/K-패스-청년-환급" },
  openGraph: {
    title: "K-패스 청년 환급 30% — 내 나이로 자격 확인하고 바로 가입",
    description: "만 19~34세면 K-패스 교통비 30% 환급 대상이에요. 나이 계산기로 바로 자격 확인하고, 일반 대비 연간 절감액을 비교했어요.",
    url: "https://www.jjyu.co.kr/w/K-패스-청년-환급",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
