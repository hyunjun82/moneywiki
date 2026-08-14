import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "ISA 계좌 만기 3년 해지 연장 재가입 방법",
  description: "ISA 만기 후 즉시 해지·5년 연장·재가입 선택 방법. 서민형 총 800만원 비과세, 만기금 IRP 이전 추가 세액공제 방법.",
  openGraph: {
    title: "ISA 계좌 만기 3년 해지 연장 재가입 방법",
    description: "자동 해지 안됨. 즉시 해지, 5년 연장, 재가입 3가지 선택지 비교.",
    url: "https://jjyu.co.kr/w/ISA계좌-만기",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/ISA계좌-만기",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
