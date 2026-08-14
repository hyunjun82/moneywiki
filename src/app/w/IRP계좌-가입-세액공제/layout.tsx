import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "IRP 계좌 가입과 세액공제 — 조건·한도·공제율",
  description: "소득 있으면 누구나 IRP 가입 가능해요. 연 900만원 납입 시 최대 148만 5천원 환급, 총급여 5,500만원 이하 16.5% / 초과 13.2% 세액공제율이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/IRP계좌-가입-세액공제" },
  openGraph: {
    title: "IRP 계좌 가입과 세액공제 — 조건·한도·공제율 | 머니위키",
    description: "소득 있으면 누구나 IRP 가입 가능해요. 연 900만원 납입 시 최대 148만 5천원 환급, 총급여 5,500만원 이하 16.5% / 초과 13.2% 세액공제율이에요.",
    url: "https://www.jjyu.co.kr/w/IRP계좌-가입-세액공제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
