import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "임대차분쟁조정 신청",
  description: "임대차분쟁조정위원회 신청 방법과 절차를 알아봅니다. 보증금, 수리, 갱신 등 분쟁을 무료로 조정받을 수 있습니다.",
  openGraph: { title: "임대차분쟁조정 신청", description: "임대차분쟁조정위원회 신청 방법과 절차를 알아봅니다. 보증금, 수리, 갱신 등 분쟁을 무료로 조정받을 수 있습니다.", url: "https://jjyu.co.kr/w/임대차분쟁조정-신청" },
  alternates: { canonical: "https://jjyu.co.kr/w/임대차분쟁조정-신청" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
