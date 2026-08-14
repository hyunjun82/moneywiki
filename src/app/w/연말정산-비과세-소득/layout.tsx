import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 비과세 소득",
  description: "비과세 소득은 총급여에서 제외되어 세금이 안 붙어요. 식대 20만원, 자가운전보조금 20만원 등 한도를 확인하세요.",
  openGraph: { title: "연말정산 비과세 소득", description: "비과세 소득은 총급여에서 제외되어 세금이 안 붙어요. 식대 20만원, 자가운전보조금 20만원 등 한도를 확인하세요.", url: "https://jjyu.co.kr/w/연말정산-비과세-소득" },
  alternates: { canonical: "https://jjyu.co.kr/w/연말정산-비과세-소득" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
