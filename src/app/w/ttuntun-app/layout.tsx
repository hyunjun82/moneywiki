import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "튼튼머니 앱 설치 사용법 QR 인증 방법 2026",
  description: "튼튼머니 앱 설치부터 QR 인증까지. 국민체육진흥공단 공식 앱 사용법 안내.",
  openGraph: {
    title: "튼튼머니 앱 설치 사용법 QR 인증 방법 2026",
    description: "튼튼머니 앱 설치부터 QR 인증까지. 국민체육진흥공단 공식 앱 사용법 안내.",
    url: "https://jjyu.co.kr/w/ttuntun-app",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/ttuntun-app",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
