import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "재산분할 청구 기한 제한: 소멸시효 2년 및 규정 해설 | 머니위키",
  description: "이혼 후 재산분할을 청구할 수 있는 기한은 2년이에요. 이 기간이 지나면 권리가 사라지니, 제척기간의 의미와 예외 사항을 알려드려요",
  openGraph: { title: "재산분할 청구 기한 제한: 소멸시효 2년 및 규정 해설", description: "이혼 후 재산분할을 청구할 수 있는 기한은 2년이에요. 이 기간이 지나면 권리가 사라지니, 제척기간의 의미와 예외 사항을 알려드려요", url: "https://jjyu.co.kr/w/재산분할-청구-기한-제한" },
  alternates: { canonical: "https://jjyu.co.kr/w/재산분할-청구-기한-제한" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
