import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "ISA 계좌 가입 세제혜택 한도",
  description: "ISA 만능통장이 좋다는데 뭐가 좋은지 모르겠다고요? ISA 계좌 가입 방법부터 비과세 혜택, 납입한도까지 쉽게 정리해드릴게요.",
  openGraph: { title: "ISA 계좌 가입 세제혜택 한도", description: "ISA 만능통장이 좋다는데 뭐가 좋은지 모르겠다고요? ISA 계좌 가입 방법부터 비과세 혜택, 납입한도까지 쉽게 정리해드릴게요.", url: "https://jjyu.co.kr/w/ISA-계좌-가입-세제혜택" },
  alternates: { canonical: "https://jjyu.co.kr/w/ISA-계좌-가입-세제혜택" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
