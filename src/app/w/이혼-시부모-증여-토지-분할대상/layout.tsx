import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "이혼 시부모 증여 토지 분할대상: 증여 토지 법적 판정 및 분할 포함 여부",
  description: "시부모에게 받은 토지가 이혼할 때 재산분할 대상인지 알려드려요. 원칙은 안 되지만 배우자 기여도에 따라 분할 대상이 될 수 있어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-시부모-증여-토지-분할대상" },
  openGraph: { title: "이혼 시부모 증여 토지 분할대상: 증여 토지 법적 판정 및 분할 포함 여부 | 머니위키", description: "시부모에게 받은 토지가 이혼할 때 재산분할 대상인지 알려드려요. 원칙은 안 되지만 배우자 기여도에 따라 분할 대상이 될 수 있어요", url: "https://www.jjyu.co.kr/w/이혼-시부모-증여-토지-분할대상", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
