import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "개인하수처리시설 관리기준 의무사항 방류수 측정",
  description: "개인하수처리시설이 있는 건물 관리하는데 기준이 뭔가요? 방류수 수질 측정, 내부청소, 전원 끄면 안 되는 것까지 총정리예요.",
  openGraph: { title: "개인하수처리시설 관리기준 의무사항 방류수 측정", description: "개인하수처리시설이 있는 건물 관리하는데 기준이 뭔가요? 방류수 수질 측정, 내부청소, 전원 끄면 안 되는 것까지 총정리예요.", url: "https://jjyu.co.kr/w/개인하수처리시설-관리기준" },
  alternates: { canonical: "https://jjyu.co.kr/w/개인하수처리시설-관리기준" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
