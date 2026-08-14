import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "단시간근로자 초과근무 강요: 초과근무 금지 및 법적 보호 방법",
  description: "단시간근로자는 계약 시간 외 초과근무를 거부할 수 있어요. 강요하면 위법이고, 법적 보호를 받을 수 있어요",
  openGraph: { title: "단시간근로자 초과근무 강요: 초과근무 금지 및 법적 보호 방법", description: "단시간근로자는 계약 시간 외 초과근무를 거부할 수 있어요. 강요하면 위법이고, 법적 보호를 받을 수 있어요", url: "https://jjyu.co.kr/w/단시간근로자-초과근무-강요" },
  alternates: { canonical: "https://jjyu.co.kr/w/단시간근로자-초과근무-강요" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
