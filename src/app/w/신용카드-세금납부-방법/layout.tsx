import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "신용카드 세금납부 방법 수수료 홈택스",
  description: "홈택스·카드로택스에서 신용카드 0.8%, 체크카드 0.5% 수수료로 세금 납부. 할부 가능, 가족카드 허용. 이용 방법 안내.",
  openGraph: {
    title: "신용카드 세금납부 방법 수수료 홈택스",
    description: "공인인증서 없이도 카드로택스에서 세금 납부 가능. 수수료 0.5~0.8%.",
    url: "https://jjyu.co.kr/w/신용카드-세금납부-방법",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/신용카드-세금납부-방법",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
